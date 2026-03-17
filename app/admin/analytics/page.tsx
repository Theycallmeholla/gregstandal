import { prisma } from "@/server/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AnalyticsAdmin() {
  const since = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d;
  })();

  const [experiments, grouped] = await Promise.all([
    prisma.experiment.findMany({ include: { route: true }, orderBy: [{ createdAt: "desc" }] }),
    prisma.event.groupBy({
      by: ["experimentId", "type"],
      where: { occurredAt: { gte: since }, experimentId: { not: null } },
      _count: { _all: true },
    }),
  ]);

  const byExperiment = new Map<
    string,
    { page_view: number; cta_click: number; lead_submit: number; conversion: number }
  >();
  for (const e of experiments) byExperiment.set(e.id, { page_view: 0, cta_click: 0, lead_submit: 0, conversion: 0 });
  for (const row of grouped) {
    const id = row.experimentId;
    if (!id) continue;
    const s = byExperiment.get(id);
    if (!s) continue;
    s[row.type] = row._count._all;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <h1 className="text-lg font-semibold">Analytics</h1>
      <p className="mt-1 text-sm text-slate-600">
        Last 7 days. Narrow events only: page_view, cta_click, lead_submit, conversion.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="py-2 pr-4">Experiment</th>
              <th className="py-2 pr-4">State</th>
              <th className="py-2 pr-4">Route</th>
              <th className="py-2 pr-4">Views</th>
              <th className="py-2 pr-4">CTAs</th>
              <th className="py-2 pr-4">Leads</th>
              <th className="py-2 pr-4">Conversions</th>
            </tr>
          </thead>
          <tbody>
            {experiments.map((e) => {
              const s = byExperiment.get(e.id) ?? { page_view: 0, cta_click: 0, lead_submit: 0, conversion: 0 };
              return (
                <tr key={e.id} className="border-b border-slate-100">
                  <td className="py-2 pr-4">
                    <Link className="underline" href={`/admin/experiments/${e.id}`}>
                      {e.name}
                    </Link>
                  </td>
                  <td className="py-2 pr-4">{e.state}</td>
                  <td className="py-2 pr-4 font-mono text-xs">
                    {e.route.host}
                    {e.route.path}
                  </td>
                  <td className="py-2 pr-4">{s.page_view}</td>
                  <td className="py-2 pr-4">{s.cta_click}</td>
                  <td className="py-2 pr-4">{s.lead_submit}</td>
                  <td className="py-2 pr-4">{s.conversion}</td>
                </tr>
              );
            })}
            {experiments.length === 0 ? (
              <tr>
                <td className="py-4 text-sm text-slate-500" colSpan={7}>
                  No experiments yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
