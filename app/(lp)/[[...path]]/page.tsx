import { TEMPLATE_REGISTRY } from "@/landing/templates/registry";
import { TrackingRuntime } from "@/landing/runtime/TrackingRuntime";
import type { LandingTemplateKey, LandingTemplateRenderContext } from "@/landing/templates/types";
import { prisma } from "@/server/db";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function normalizeHost(rawHost: string) {
  return rawHost.toLowerCase().split(":")[0] ?? rawHost.toLowerCase();
}

function normalizePath(pathParts: string[] | undefined) {
  if (!pathParts || pathParts.length === 0) return "/";
  return `/${pathParts.join("/")}`;
}

function getSearchParam(searchParams: Record<string, string | string[] | undefined>, key: string) {
  const v = searchParams[key];
  return Array.isArray(v) ? v[0] : v;
}

export default async function LandingPage({
  params,
  searchParams,
}: {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ path }, sp] = await Promise.all([params, searchParams]);

  const hostHeader = (await headers()).get("host");
  if (!hostHeader) notFound();
  const host = normalizeHost(hostHeader);
  const routePath = normalizePath(path);

  const route = await prisma.pageRoute.findUnique({
    where: { host_path: { host, path: routePath } },
  });

  if (!route || route.isArchived) notFound();

  const cookieStore = await cookies();
  const visitorId = cookieStore.get("lp_vid")?.value ?? crypto.randomUUID();
  const sessionId = cookieStore.get("lp_sid")?.value ?? crypto.randomUUID();

  const landingUrl = (() => {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(sp)) {
      if (v === undefined) continue;
      if (Array.isArray(v)) v.forEach((vv) => qs.append(k, vv));
      else qs.set(k, v);
    }
    const q = qs.toString();
    return q ? `https://${host}${routePath}?${q}` : `https://${host}${routePath}`;
  })();

  const referrer = (await headers()).get("referer") ?? undefined;

  await prisma.visitor.upsert({
    where: { id: visitorId },
    update: { lastSeenAt: new Date() },
    create: { id: visitorId },
  });

  await prisma.lpSession.upsert({
    where: { id: sessionId },
    update: { lastSeenAt: new Date() },
    create: {
      id: sessionId,
      visitorId,
      landingUrl,
      initialReferrer: referrer,
      utmSource: getSearchParam(sp, "utm_source"),
      utmMedium: getSearchParam(sp, "utm_medium"),
      utmCampaign: getSearchParam(sp, "utm_campaign"),
      utmTerm: getSearchParam(sp, "utm_term"),
      utmContent: getSearchParam(sp, "utm_content"),
      gclid: getSearchParam(sp, "gclid"),
      gbraid: getSearchParam(sp, "gbraid"),
      wbraid: getSearchParam(sp, "wbraid"),
    },
  });

  const templateKey: LandingTemplateKey = route.defaultTemplateKey as LandingTemplateKey;
  const templateConfig: unknown = route.defaultConfig ?? TEMPLATE_REGISTRY[templateKey]?.defaultConfig;

  const template = TEMPLATE_REGISTRY[templateKey];
  if (!template) {
    notFound();
  }

  const ctx: LandingTemplateRenderContext = {
    route: { host, path: routePath },
    experiment: (() => {
      const id = getSearchParam(sp, "ab_experiment_id");
      if (!id) return undefined;
      return { id, name: "redirect-mode" };
    })(),
    variant: (() => {
      const id = getSearchParam(sp, "ab_variant_id");
      const key = getSearchParam(sp, "ab_variant_key");
      const name = getSearchParam(sp, "ab_variant_name");
      if (!id || !key) return undefined;
      return { id, key, name: name ?? key };
    })(),
    visitorId,
    sessionId,
  };

  await prisma.event.create({
    data: {
      type: "page_view",
      occurredAt: new Date(),
      pageRouteId: route.id,
      experimentId: ctx.experiment?.id,
      variantId: ctx.variant?.id,
      visitorId,
      sessionId,
    },
  });

  return (
    <>
      {template.render({ ctx, config: templateConfig })}
      <TrackingRuntime
        ctx={{
          visitorId,
          sessionId,
          routeHost: host,
          routePath,
          experimentId: ctx.experiment?.id,
          variantId: ctx.variant?.id,
        }}
      />
    </>
  );
}
