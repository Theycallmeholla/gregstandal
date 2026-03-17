import { TEMPLATE_REGISTRY } from "@/landing/templates/registry";
import { TrackingRuntime } from "@/landing/runtime/TrackingRuntime";
import type { LandingTemplateKey, LandingTemplateRenderContext } from "@/landing/templates/types";
import { prisma } from "@/server/db";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Variant } from "@/generated/prisma/client";

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

export default async function AbLandingPage({
  params,
  searchParams,
}: {
  params: Promise<{ experimentId: string; variantKey: string; path?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ experimentId, variantKey, path }, sp] = await Promise.all([params, searchParams]);

  const hostHeader = (await headers()).get("host");
  if (!hostHeader) notFound();
  const host = normalizeHost(hostHeader);
  const routePath = normalizePath(path);

  const route = await prisma.pageRoute.findUnique({
    where: { host_path: { host, path: routePath } },
  });
  if (!route || route.isArchived) notFound();

  const h = await headers();
  const cookieStore = await cookies();
  const visitorId = h.get("x-lp-visitor-id") ?? cookieStore.get("lp_vid")?.value ?? crypto.randomUUID();
  const sessionId = h.get("x-lp-session-id") ?? cookieStore.get("lp_sid")?.value ?? crypto.randomUUID();

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

  const referrer = h.get("referer") ?? undefined;

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

  const experiment = await prisma.experiment.findUnique({
    where: { id: experimentId },
    include: { variants: true },
  });
  if (!experiment || experiment.state !== "RUNNING" || experiment.routeId !== route.id) notFound();

  const variant = experiment.variants.find((v: Variant) => v.key.toLowerCase() === variantKey.toLowerCase());
  if (!variant) notFound();

  const templateKey: LandingTemplateKey = variant.templateKey as LandingTemplateKey;
  const templateConfig: unknown = variant.templateConfig ?? TEMPLATE_REGISTRY[templateKey]?.defaultConfig;

  const template = TEMPLATE_REGISTRY[templateKey];
  if (!template) notFound();

  const ctx: LandingTemplateRenderContext = {
    route: { host, path: routePath },
    experiment: { id: experiment.id, name: experiment.name },
    variant: { id: variant.id, key: variant.key, name: variant.name },
    visitorId,
    sessionId,
  };

  await prisma.event.create({
    data: {
      type: "page_view",
      occurredAt: new Date(),
      pageRouteId: route.id,
      experimentId: experiment.id,
      variantId: variant.id,
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
          experimentId: experiment.id,
          variantId: variant.id,
        }}
      />
    </>
  );
}
