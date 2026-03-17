import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { z } from "zod";

export const dynamic = "force-dynamic";

const createExperimentSchema = z.object({
  name: z.string().min(1),
  routeId: z.string().min(1),
});

async function createExperimentAction(formData: FormData) {
  "use server";

  const data = createExperimentSchema.parse({
    name: String(formData.get("name") ?? "").trim(),
    routeId: String(formData.get("routeId") ?? "").trim(),
  });

  await prisma.experiment.create({
    data: {
      name: data.name,
      routeId: data.routeId,
      state: "DRAFT",
    },
  });

  revalidatePath("/admin/experiments");
}

export default async function ExperimentsAdmin() {
  const [experiments, availableRoutes] = await Promise.all([
    prisma.experiment.findMany({
      orderBy: [{ createdAt: "desc" }],
      include: { route: true, variants: true },
    }),
    prisma.pageRoute.findMany({
      where: { experiment: null, isArchived: false },
      orderBy: [{ host: "asc" }, { path: "asc" }],
    }),
  ]);

  return (
    <div className="grid gap-10">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-lg font-semibold">Experiments</h1>
        <p className="mt-1 text-sm text-slate-600">
          V1 supports one route per experiment, manual weights, sticky assignment, manual winner selection.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">State</th>
                <th className="py-2 pr-4">Route</th>
                <th className="py-2 pr-4">Variants</th>
              </tr>
            </thead>
            <tbody>
              {experiments.map((e) => (
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
                  <td className="py-2 pr-4">{e.variants.length}</td>
                </tr>
              ))}
              {experiments.length === 0 ? (
                <tr>
                  <td className="py-4 text-sm text-slate-500" colSpan={4}>
                    No experiments yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Create Experiment</h2>
        <form action={createExperimentAction} className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Name</span>
            <input name="name" className="h-10 rounded-md border border-slate-300 px-3" required />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Route</span>
            <select name="routeId" className="h-10 rounded-md border border-slate-300 px-3" required>
              {availableRoutes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.host}
                  {r.path}
                </option>
              ))}
            </select>
          </label>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-5 text-sm font-medium text-white"
              disabled={availableRoutes.length === 0}
            >
              Create Experiment
            </button>
            {availableRoutes.length === 0 ? (
              <p className="mt-2 text-xs text-slate-500">All routes already have experiments (or are archived).</p>
            ) : null}
          </div>
        </form>
      </section>
    </div>
  );
}
