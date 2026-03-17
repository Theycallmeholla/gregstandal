import { prisma } from "@/server/db";
import type { Prisma } from "@/generated/prisma/client";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";

const schema = z.object({
  visitorId: z.string().min(1),
  sessionId: z.string().min(1),
  routeHost: z.string().min(1),
  routePath: z.string().min(1),
  experimentId: z.string().optional().nullable(),
  variantId: z.string().optional().nullable(),
  conversionType: z.string().min(1),
  value: z.number().optional().nullable(),
  properties: z.record(z.string(), z.unknown()).optional().nullable(),
});

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  const d = parsed.data;

  const routeHost = d.routeHost.toLowerCase().split(":")[0] ?? d.routeHost.toLowerCase();
  const route = await prisma.pageRoute.findUnique({
    where: { host_path: { host: routeHost, path: d.routePath } },
    select: { id: true },
  });
  if (!route) return NextResponse.json({ ok: false, error: "route_not_registered" }, { status: 404 });

  const event = await prisma.event.create({
    data: {
      type: "conversion",
      occurredAt: new Date(),
      properties: { ...d.properties, conversionType: d.conversionType, value: d.value ?? undefined },
      pageRouteId: route.id,
      experimentId: d.experimentId ?? undefined,
      variantId: d.variantId ?? undefined,
      visitorId: d.visitorId,
      sessionId: d.sessionId,
    },
  });

  const dedupeKey = sha256(
    ["GHL", d.conversionType, d.visitorId, routeHost, d.routePath, d.experimentId ?? "no_exp"].join("|"),
  );

  await prisma.conversion.create({
    data: {
      eventId: event.id,
      conversionType: d.conversionType,
      value: d.value ?? undefined,
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
    const existing = await prisma.webhookDelivery.findFirst({
      where: { provider: "GHL", dedupeKey, status: { in: ["PENDING", "FAILED", "SENT"] } },
      select: { id: true },
    });
    if (!existing) {
      const payload: Prisma.InputJsonValue = {
        event_id: event.id,
        event_type: "conversion",
        conversion_type: d.conversionType,
        value: d.value ?? null,
        occurred_at: new Date().toISOString(),
        experiment_id: d.experimentId ?? null,
        variant_id: d.variantId ?? null,
        route: { host: routeHost, path: d.routePath },
        visitor_id: d.visitorId,
        session_id: d.sessionId,
        properties: (d.properties ?? null) as Prisma.InputJsonValue,
      };

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

  return NextResponse.json({ ok: true, eventId: event.id });
}
