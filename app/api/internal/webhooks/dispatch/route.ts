import { prisma } from "@/server/db";
import crypto from "crypto";
import { NextResponse } from "next/server";

function backoffMs(attempt: number) {
  // 1m, 2m, 4m, ... capped at 12h
  const ms = Math.min(12 * 60 * 60 * 1000, 60 * 1000 * Math.pow(2, Math.max(0, attempt)));
  return ms;
}

function isRetryable(status: number) {
  return status === 429 || (status >= 500 && status <= 599);
}

export async function POST(req: Request) {
  const expected = process.env.INTERNAL_DISPATCH_SECRET;
  if (expected) {
    const auth = req.headers.get("authorization") ?? "";
    if (auth !== `Bearer ${expected}`) return NextResponse.json({ ok: false }, { status: 401 });
  }

  const integration = await prisma.integrationConfig.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });
  const webhookUrl = integration.ghlWebhookUrl ?? process.env.GHL_WEBHOOK_URL ?? undefined;
  const webhookSecret = integration.ghlWebhookSecret ?? process.env.GHL_WEBHOOK_SECRET ?? undefined;

  if (!webhookUrl) return NextResponse.json({ ok: false, error: "no_webhook_url_configured" }, { status: 400 });

  const now = new Date();
  const deliveries = await prisma.webhookDelivery.findMany({
    where: {
      provider: "GHL",
      status: { in: ["PENDING", "FAILED"] },
      nextAttemptAt: { lte: now },
    },
    orderBy: [{ nextAttemptAt: "asc" }],
    take: 25,
  });

  let sent = 0;
  let failed = 0;

  for (const d of deliveries) {
    const body = JSON.stringify(d.payload);
    const signature = webhookSecret ? crypto.createHmac("sha256", webhookSecret).update(body).digest("hex") : null;

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(signature ? { "x-signature": signature } : {}),
          "x-idempotency-key": d.dedupeKey,
        },
        body,
      });

      if (res.ok) {
        await prisma.webhookDelivery.update({
          where: { id: d.id },
          data: {
            status: "SENT",
            attemptCount: d.attemptCount + 1,
            lastStatus: res.status,
            lastError: null,
            sentAt: new Date(),
            nextAttemptAt: new Date(8640000000000000), // effectively never
          },
        });
        sent += 1;
        continue;
      }

      const nextAttempt = new Date(Date.now() + backoffMs(d.attemptCount));
      const responseText = await res.text().catch(() => "");
      const terminal = !isRetryable(res.status) || d.attemptCount + 1 >= 10;

      await prisma.webhookDelivery.update({
        where: { id: d.id },
        data: {
          status: terminal ? "DEAD" : "FAILED",
          attemptCount: d.attemptCount + 1,
          lastStatus: res.status,
          lastError: responseText.slice(0, 1000) || `HTTP ${res.status}`,
          nextAttemptAt: terminal ? new Date(8640000000000000) : nextAttempt,
        },
      });
      failed += 1;
    } catch (err) {
      const nextAttempt = new Date(Date.now() + backoffMs(d.attemptCount));
      const terminal = d.attemptCount + 1 >= 10;
      await prisma.webhookDelivery.update({
        where: { id: d.id },
        data: {
          status: terminal ? "DEAD" : "FAILED",
          attemptCount: d.attemptCount + 1,
          lastError: err instanceof Error ? err.message : "network_error",
          nextAttemptAt: terminal ? new Date(8640000000000000) : nextAttempt,
        },
      });
      failed += 1;
    }
  }

  return NextResponse.json({ ok: true, attempted: deliveries.length, sent, failed });
}

