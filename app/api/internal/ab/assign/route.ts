import { prisma } from "@/server/db";
import { NextResponse } from "next/server";
import { z } from "zod";

function requireAuth(req: Request) {
  const expected = process.env.INTERNAL_AB_SECRET;
  if (!expected) return true;
  const auth = req.headers.get("authorization") ?? "";
  return auth === `Bearer ${expected}`;
}

const schema = z.object({
  experimentId: z.string().min(1),
  visitorId: z.string().min(1),
  variantId: z.string().min(1),
});

export async function POST(req: Request) {
  if (!requireAuth(req)) return NextResponse.json({ ok: false }, { status: 401 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });

  const { experimentId, visitorId, variantId } = parsed.data;

  // Ensure variant belongs to experiment
  const variant = await prisma.variant.findUnique({ where: { id: variantId }, select: { experimentId: true } });
  if (!variant || variant.experimentId !== experimentId) {
    return NextResponse.json({ ok: false, error: "variant_mismatch" }, { status: 400 });
  }

  await prisma.visitor.upsert({
    where: { id: visitorId },
    update: { lastSeenAt: new Date() },
    create: { id: visitorId },
  });

  await prisma.experimentAssignment.upsert({
    where: { experimentId_visitorId: { experimentId, visitorId } },
    update: { variantId, assignedAt: new Date() },
    create: { experimentId, visitorId, variantId },
  });

  return NextResponse.json({ ok: true });
}

