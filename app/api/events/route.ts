import { prisma } from "@/server/db";
import type { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  type: z.enum(["cta_click", "page_view", "lead_submit", "conversion"]),
  visitorId: z.string().min(1),
  sessionId: z.string().min(1),
  routeHost: z.string().min(1),
  routePath: z.string().min(1),
  experimentId: z.string().optional().nullable(),
  variantId: z.string().optional().nullable(),
  properties: z.record(z.string(), z.unknown()).optional().nullable(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const data = schema.safeParse(json);
  if (!data.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const {
    type,
    visitorId,
    sessionId,
    routeHost,
    routePath,
    experimentId,
    variantId,
    properties,
  } = data.data;

  const host = routeHost.toLowerCase().split(":")[0] ?? routeHost.toLowerCase();

  const route = await prisma.pageRoute.findUnique({
    where: { host_path: { host, path: routePath } },
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

  await prisma.event.create({
    data: {
      type,
      occurredAt: new Date(),
      properties: (properties ?? undefined) as Prisma.InputJsonValue | undefined,
      pageRouteId: route.id,
      experimentId: experimentId ?? undefined,
      variantId: variantId ?? undefined,
      visitorId,
      sessionId,
    },
  });

  return NextResponse.json({ ok: true });
}
