import { NextResponse, type NextRequest } from "next/server";
import { adminCookieName, verifyAdminSession } from "@/lib/adminSession";

const VISITOR_COOKIE = "lp_vid";
const SESSION_COOKIE = "lp_sid";
const ADMIN_LOGIN_PATH = "/login";

function shouldSkip(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/ab") ||
    pathname.startsWith("/demo") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap")
  );
}

type AbContextResponse =
  | { ok: true; experiment: null }
  | {
      ok: true;
      experiment: {
        id: string;
        name: string;
        assignmentMode: "TESTING" | "STICKY";
        routingMode: "REWRITE" | "REDIRECT";
        variants: Array<{
          id: string;
          key: string;
          name: string;
          weightPercent: number;
          redirectPath: string | null;
          redirectUrl: string | null;
        }>;
        assignedVariantId: string | null;
      };
    };

function pickWeightedVariant(variants: Array<{ weightPercent: number }>) {
  const total = variants.reduce((sum, v) => sum + v.weightPercent, 0);
  const r = Math.random() * (total > 0 ? total : variants.length);
  let acc = 0;
  for (const v of variants) {
    acc += total > 0 ? v.weightPercent : 1;
    if (r < acc) return v;
  }
  return variants[variants.length - 1];
}

function setAbHeaders(res: NextResponse, ctx: { experimentId: string; variantId: string; variantKey: string; variantName: string; mode: string }) {
  res.headers.set("X-AB-Experiment-ID", ctx.experimentId);
  res.headers.set("X-AB-Variant-ID", ctx.variantId);
  res.headers.set("X-AB-Variant-Key", ctx.variantKey);
  res.headers.set("X-AB-Variant-Name", ctx.variantName);
  res.headers.set("X-AB-Mode", ctx.mode);
}

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const token = req.cookies.get(adminCookieName())?.value ?? null;
    const secret = process.env.AUTH_SECRET ?? "";
    if (!token || !secret) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = ADMIN_LOGIN_PATH;
      loginUrl.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(loginUrl, 303);
    }

    return (async () => {
      const payload = await verifyAdminSession(token, secret);
      if (payload) return NextResponse.next();
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = ADMIN_LOGIN_PATH;
      loginUrl.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(loginUrl, 303);
    })();
  }

  if (shouldSkip(req.nextUrl.pathname)) return NextResponse.next();

  const visitorId = req.cookies.get(VISITOR_COOKIE)?.value ?? crypto.randomUUID();
  const sessionId = req.cookies.get(SESSION_COOKIE)?.value ?? crypto.randomUUID();

  // We'll decide later whether we need to return next/rewrite/redirect; start with a default passthrough response.
  const res: NextResponse = NextResponse.next();

  if (!req.cookies.get(VISITOR_COOKIE)?.value) {
    res.cookies.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      sameSite: "lax",
      secure: req.nextUrl.protocol === "https:",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1y
    });
  }

  if (!req.cookies.get(SESSION_COOKIE)?.value) {
    res.cookies.set(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      secure: req.nextUrl.protocol === "https:",
      path: "/",
      maxAge: 60 * 30, // 30m
    });
  }

  const forcedVariantKey = req.nextUrl.searchParams.get("variant")?.trim() || null;

  // Ask the server (DB-backed) for experiment config (and assignment if STICKY).
  const ctxUrl = new URL("/api/internal/ab/context", req.nextUrl.origin);
  ctxUrl.searchParams.set("host", req.nextUrl.hostname);
  ctxUrl.searchParams.set("path", req.nextUrl.pathname);
  ctxUrl.searchParams.set("visitorId", visitorId);

  const secret = process.env.INTERNAL_AB_SECRET;

  return (async () => {
    let ctx: AbContextResponse | null = null;
    try {
      const r = await fetch(ctxUrl, {
        headers: secret ? { authorization: `Bearer ${secret}` } : {},
      });
      if (r.ok) ctx = (await r.json()) as AbContextResponse;
    } catch {
      // If config lookup fails, fall back to normal rendering.
      return res;
    }

    if (!ctx || !ctx.ok || !ctx.experiment) return res;

    const exp = ctx.experiment;
    if (exp.variants.length === 0) return res;

    const forced = forcedVariantKey
      ? exp.variants.find((v) => v.key.toLowerCase() === forcedVariantKey.toLowerCase()) ?? null
      : null;

    const chosen =
      forced ??
      (exp.assignmentMode === "STICKY" && exp.assignedVariantId
        ? exp.variants.find((v) => v.id === exp.assignedVariantId) ?? null
        : null) ??
      (pickWeightedVariant(exp.variants) as (typeof exp.variants)[number]);

    // Persist assignment only in STICKY mode (and only when needed).
    if (exp.assignmentMode === "STICKY") {
      const needsPersist = !exp.assignedVariantId || exp.assignedVariantId !== chosen.id;
      if (needsPersist) {
        const assignUrl = new URL("/api/internal/ab/assign", req.nextUrl.origin);
        try {
          await fetch(assignUrl, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              ...(secret ? { authorization: `Bearer ${secret}` } : {}),
            },
            body: JSON.stringify({ experimentId: exp.id, visitorId, variantId: chosen.id }),
          });
        } catch {
          // Non-fatal; we'll still route based on chosen variant for this request.
        }
      }
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-ab-experiment-id", exp.id);
    requestHeaders.set("x-ab-variant-id", chosen.id);
    requestHeaders.set("x-ab-variant-key", chosen.key);
    requestHeaders.set("x-ab-variant-name", chosen.name);
    requestHeaders.set("x-ab-mode", exp.assignmentMode);
    requestHeaders.set("x-lp-visitor-id", visitorId);
    requestHeaders.set("x-lp-session-id", sessionId);

    if (exp.routingMode === "REDIRECT") {
      const base = chosen.redirectUrl ? new URL(chosen.redirectUrl) : new URL(req.nextUrl.origin);
      const target = chosen.redirectUrl
        ? base
        : new URL(chosen.redirectPath ?? req.nextUrl.pathname, req.nextUrl.origin);

      // Preserve all query params and force variant on the redirected request to keep selection stable in TESTING mode.
      for (const [k, v] of req.nextUrl.searchParams.entries()) {
        if (!target.searchParams.has(k)) target.searchParams.set(k, v);
      }
      if (!target.searchParams.has("variant")) target.searchParams.set("variant", chosen.key);
      if (!target.searchParams.has("ab_experiment_id")) target.searchParams.set("ab_experiment_id", exp.id);
      if (!target.searchParams.has("ab_variant_id")) target.searchParams.set("ab_variant_id", chosen.id);
      if (!target.searchParams.has("ab_variant_key")) target.searchParams.set("ab_variant_key", chosen.key);
      if (!target.searchParams.has("ab_variant_name")) target.searchParams.set("ab_variant_name", chosen.name);
      if (!target.searchParams.has("ab_mode")) target.searchParams.set("ab_mode", exp.assignmentMode);

      const redirectRes = NextResponse.redirect(target, 307);
      setAbHeaders(redirectRes, {
        experimentId: exp.id,
        variantId: chosen.id,
        variantKey: chosen.key,
        variantName: chosen.name,
        mode: exp.assignmentMode,
      });
      return redirectRes;
    }

    // Same-URL mode: rewrite internally while keeping the visible URL unchanged.
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = `/ab/${encodeURIComponent(exp.id)}/${encodeURIComponent(chosen.key)}${req.nextUrl.pathname}`;
    // search params are preserved automatically on clone()

    const rewriteRes = NextResponse.rewrite(rewriteUrl, { request: { headers: requestHeaders } });
    // Keep any Set-Cookie that we already added
    for (const c of res.cookies.getAll()) rewriteRes.cookies.set(c);

    setAbHeaders(rewriteRes, {
      experimentId: exp.id,
      variantId: chosen.id,
      variantKey: chosen.key,
      variantName: chosen.name,
      mode: exp.assignmentMode,
    });
    return rewriteRes;
  })();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
