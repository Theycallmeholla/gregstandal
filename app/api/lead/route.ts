import { prisma } from "@/server/db";
import { NextResponse } from "next/server";
import crypto from "crypto";

function normalizeHost(rawHost: string) {
  return rawHost.toLowerCase().split(":")[0] ?? rawHost.toLowerCase();
}

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export async function POST(req: Request) {
  const form = await req.formData();

  const visitorId = String(form.get("visitorId") ?? "").trim();
  const sessionId = String(form.get("sessionId") ?? "").trim();
  const routeHostRaw = String(form.get("routeHost") ?? "").trim();
  const routePath = String(form.get("routePath") ?? "").trim();
  const experimentId = String(form.get("experimentId") ?? "").trim() || undefined;
  const variantId = String(form.get("variantId") ?? "").trim() || undefined;

  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const phone = String(form.get("phone") ?? "").trim();
  const firstName = String(form.get("firstName") ?? "").trim() || undefined;
  const lastName = String(form.get("lastName") ?? "").trim() || undefined;
  const redirectTo = String(form.get("redirectTo") ?? "").trim() || undefined;

  if (!visitorId || !sessionId || !routeHostRaw || !routePath || !email) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const routeHost = normalizeHost(routeHostRaw);
  const route = await prisma.pageRoute.findUnique({
    where: { host_path: { host: routeHost, path: routePath } },
    select: { id: true },
  });
  if (!route) return NextResponse.json({ ok: false, error: "route_not_registered" }, { status: 404 });

  await prisma.visitor.upsert({
    where: { id: visitorId },
    update: { lastSeenAt: new Date() },
    create: { id: visitorId },
  });
  await prisma.lpSession.upsert({
    where: { id: sessionId },
    update: { lastSeenAt: new Date() },
    create: { id: sessionId, visitorId },
  });

  const event = await prisma.event.create({
    data: {
      type: "lead_submit",
      occurredAt: new Date(),
      properties: { email, phone, firstName, lastName },
      pageRouteId: route.id,
      experimentId,
      variantId,
      visitorId,
      sessionId,
    },
  });

  const dedupeKey = sha256(
    [
      "GHL",
      "lead",
      email || phone || "unknown",
      routeHost,
      routePath,
      experimentId ?? "no_exp",
    ].join("|"),
  );

  await prisma.conversion.create({
    data: {
      eventId: event.id,
      conversionType: "lead",
      dedupeKey,
    },
  });

  const integration = await prisma.integrationConfig.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  const webhookUrl = integration.ghlWebhookUrl ?? process.env.GHL_WEBHOOK_URL ?? undefined;

  if (webhookUrl) {
    const payload = {
      event_id: event.id,
      event_type: "lead_submit",
      occurred_at: new Date().toISOString(),
      experiment_id: experimentId ?? null,
      variant_id: variantId ?? null,
      route: { host: routeHost, path: routePath },
      visitor_id: visitorId,
      session_id: sessionId,
      lead: { email, phone, first_name: firstName, last_name: lastName },
    };

    const existing = await prisma.webhookDelivery.findFirst({
      where: { provider: "GHL", dedupeKey, status: { in: ["PENDING", "FAILED", "SENT"] } },
      select: { id: true },
    });

    if (!existing) {
      await prisma.webhookDelivery.create({
        data: {
          provider: "GHL",
          eventId: event.id,
          dedupeKey,
          payload,
          status: "PENDING",
          nextAttemptAt: new Date(),
        },
      });
    }
  }

  const accept = req.headers.get("accept") ?? "";
  if (accept.includes("text/html")) {
    const back = redirectTo ?? `${routePath}?submitted=1`;
    const origin = new URL(req.url).origin;
    return NextResponse.redirect(new URL(back, origin), { status: 303 });
  }

  return NextResponse.json({ ok: true, eventId: event.id });
}
