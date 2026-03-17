import { TEMPLATE_REGISTRY } from "@/landing/templates/registry";
import type { LandingTemplateKey } from "@/landing/templates/types";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { z } from "zod";

export const dynamic = "force-dynamic";

function parseOptionalJson(raw: string | null) {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  return JSON.parse(trimmed);
}

const createRouteSchema = z.object({
  host: z.string().min(1),
  path: z.string().min(1).refine((p) => p.startsWith("/"), "Path must start with '/'"),
  defaultTemplateKey: z.string().min(1),
  defaultConfigJson: z.string().optional(),
});

async function createRouteAction(formData: FormData) {
  "use server";

  const data = createRouteSchema.parse({
    host: String(formData.get("host") ?? "").trim().toLowerCase(),
    path: String(formData.get("path") ?? "").trim(),
    defaultTemplateKey: String(formData.get("defaultTemplateKey") ?? "").trim(),
    defaultConfigJson: String(formData.get("defaultConfigJson") ?? ""),
  });

  const defaultTemplateKey = data.defaultTemplateKey as LandingTemplateKey;
  const defaultConfig = parseOptionalJson(data.defaultConfigJson ?? "") ?? TEMPLATE_REGISTRY[defaultTemplateKey]?.defaultConfig;

  await prisma.pageRoute.create({
    data: {
      host: data.host,
      path: data.path,
      defaultTemplateKey,
      defaultConfig,
    },
  });

  revalidatePath("/admin/routes");
}

async function toggleArchiveAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  const isArchived = String(formData.get("isArchived") ?? "") === "true";
  await prisma.pageRoute.update({ where: { id }, data: { isArchived: !isArchived } });
  revalidatePath("/admin/routes");
}

export default async function RoutesAdmin() {
  const routes = await prisma.pageRoute.findMany({
    orderBy: [{ host: "asc" }, { path: "asc" }],
    include: { experiment: true },
  });

  const templateKeys = Object.keys(TEMPLATE_REGISTRY) as LandingTemplateKey[];

  return (
    <div className="grid gap-10">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-lg font-semibold">Routes</h1>
        <p className="mt-1 text-sm text-slate-600">
          Register existing developer-managed templates and map them to URLs.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="py-2 pr-4">Host</th>
                <th className="py-2 pr-4">Path</th>
                <th className="py-2 pr-4">Default Template</th>
                <th className="py-2 pr-4">Experiment</th>
                <th className="py-2 pr-4">State</th>
                <th className="py-2 pr-4">Archived</th>
                <th className="py-2 pr-4"></th>
                <th className="py-2 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {routes.map((r) => (
                <tr key={r.id} className="border-b border-slate-100">
                  <td className="py-2 pr-4 font-mono text-xs">{r.host}</td>
                  <td className="py-2 pr-4 font-mono text-xs">{r.path}</td>
                  <td className="py-2 pr-4">{r.defaultTemplateKey}</td>
                  <td className="py-2 pr-4">
                    {r.experiment ? (
                      <Link className="text-slate-900 underline" href={`/admin/experiments/${r.experiment.id}`}>
                        {r.experiment.name}
                      </Link>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-2 pr-4">{r.experiment?.state ?? "—"}</td>
                  <td className="py-2 pr-4">{r.isArchived ? "Yes" : "No"}</td>
                  <td className="py-2 pr-4">
                    <form action={toggleArchiveAction}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="isArchived" value={String(r.isArchived)} />
                      <button className="text-xs font-semibold text-slate-700 underline" type="submit">
                        {r.isArchived ? "Unarchive" : "Archive"}
                      </button>
                    </form>
                  </td>
                  <td className="py-2 pr-4">
                    <Link className="text-xs font-semibold text-slate-700 underline" href={`/admin/routes/${r.id}`}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Register Route</h2>
        <form action={createRouteAction} className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Host</span>
            <input
              name="host"
              placeholder="example.com"
              className="h-10 rounded-md border border-slate-300 px-3"
              required
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">Path</span>
            <input
              name="path"
              placeholder="/offer"
              className="h-10 rounded-md border border-slate-300 px-3 font-mono text-sm"
              required
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">Default Template</span>
            <select name="defaultTemplateKey" className="h-10 rounded-md border border-slate-300 px-3">
              {templateKeys.map((k) => (
                <option key={k} value={k}>
                  {TEMPLATE_REGISTRY[k].name} ({k})
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">Default Config (JSON, optional)</span>
            <textarea
              name="defaultConfigJson"
              className="min-h-[40px] rounded-md border border-slate-300 px-3 py-2 font-mono text-xs"
              placeholder='{"headline":"...","subhead":"..."}'
            />
          </label>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-5 text-sm font-medium text-white"
            >
              Create Route
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
