import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function retryDeliveryAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  await prisma.webhookDelivery.update({
    where: { id },
    data: { status: "FAILED", nextAttemptAt: new Date(), lastError: null },
  });
  revalidatePath("/admin/webhooks");
}

export default async function WebhooksAdmin() {
  const deliveries = await prisma.webhookDelivery.findMany({
    orderBy: [{ createdAt: "desc" }],
    take: 100,
  });

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <h1 className="text-lg font-semibold">Webhooks</h1>
      <p className="mt-1 text-sm text-slate-600">
        Outbox-based delivery log. Use a cron to POST <span className="font-mono">/api/internal/webhooks/dispatch</span>.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="py-2 pr-4">Created</th>
              <th className="py-2 pr-4">Provider</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Attempts</th>
              <th className="py-2 pr-4">Next</th>
              <th className="py-2 pr-4">Last</th>
              <th className="py-2 pr-4">Dedupe</th>
              <th className="py-2 pr-4"></th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((d) => (
              <tr key={d.id} className="border-b border-slate-100">
                <td className="py-2 pr-4 font-mono text-xs">{d.createdAt.toISOString()}</td>
                <td className="py-2 pr-4">{d.provider}</td>
                <td className="py-2 pr-4">{d.status}</td>
                <td className="py-2 pr-4">{d.attemptCount}</td>
                <td className="py-2 pr-4 font-mono text-xs">{d.nextAttemptAt.toISOString()}</td>
                <td className="py-2 pr-4">{d.lastStatus ?? "—"}</td>
                <td className="py-2 pr-4 font-mono text-[10px] max-w-[240px] truncate">{d.dedupeKey}</td>
                <td className="py-2 pr-4">
                  {d.status === "SENT" ? null : (
                    <form action={retryDeliveryAction}>
                      <input type="hidden" name="id" value={d.id} />
                      <button type="submit" className="text-xs font-semibold text-slate-700 underline">
                        Retry
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
            {deliveries.length === 0 ? (
              <tr>
                <td className="py-4 text-sm text-slate-500" colSpan={8}>
                  No deliveries yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
