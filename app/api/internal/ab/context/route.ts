import { prisma } from "@/server/db";
import { NextResponse } from "next/server";

function normalizeHost(rawHost: string) {
  return rawHost.toLowerCase().split(":")[0] ?? rawHost.toLowerCase();
}

function requireAuth(req: Request) {
  const expected = process.env.INTERNAL_AB_SECRET;
  if (!expected) return true;
  const auth = req.headers.get("authorization") ?? "";
  return auth === `Bearer ${expected}`;
}

export async function GET(req: Request) {
  if (!requireAuth(req)) return NextResponse.json({ ok: false }, { status: 401 });

  const url = new URL(req.url);
  const host = normalizeHost(url.searchParams.get("host") ?? "");
  const path = url.searchParams.get("path") ?? "";
  const visitorId = url.searchParams.get("visitorId") ?? "";

  if (!host || !path.startsWith("/") || !visitorId) {
    return NextResponse.json({ ok: false, error: "invalid_params" }, { status: 400 });
  }

  const route = await prisma.pageRoute.findUnique({
    where: { host_path: { host, path } },
    include: {
      experiment: {
        include: {
          variants: true,
        },
      },
    },
  });

  const experiment = route?.experiment;
  if (!experiment || experiment.state !== "RUNNING") {
    return NextResponse.json({ ok: true, experiment: null });
  }

  let assignedVariantId: string | null = null;
  if (experiment.assignmentMode === "STICKY") {
    const existing = await prisma.experimentAssignment.findUnique({
      where: { experimentId_visitorId: { experimentId: experiment.id, visitorId } },
      select: { variantId: true },
    });
    assignedVariantId = existing?.variantId ?? null;
  }

  return NextResponse.json({
    ok: true,
    experiment: {
      id: experiment.id,
      name: experiment.name,
      assignmentMode: experiment.assignmentMode,
      routingMode: experiment.routingMode,
      variants: experiment.variants.map((v) => ({
        id: v.id,
        key: v.key,
        name: v.name,
        weightPercent: v.weightPercent,
        redirectPath: v.redirectPath ?? null,
        redirectUrl: v.redirectUrl ?? null,
      })),
      assignedVariantId,
    },
  });
}
