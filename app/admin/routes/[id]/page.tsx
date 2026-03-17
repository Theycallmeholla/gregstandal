import { TEMPLATE_REGISTRY } from "@/landing/templates/registry";
import type { LandingTemplateKey } from "@/landing/templates/types";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

export const dynamic = "force-dynamic";

function formatJson(value: unknown) {
  if (value === null || value === undefined) return "";
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return "";
  }
}

function parseOptionalJson(raw: string | null) {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  return JSON.parse(trimmed);
}

const updateSchema = z.object({
  id: z.string().min(1),
  defaultTemplateKey: z.string().min(1),
  defaultConfigJson: z.string().optional(),
});

async function updateRouteAction(formData: FormData) {
  "use server";
  const data = updateSchema.parse({
    id: String(formData.get("id") ?? ""),
    defaultTemplateKey: String(formData.get("defaultTemplateKey") ?? "").trim(),
    defaultConfigJson: String(formData.get("defaultConfigJson") ?? ""),
  });

  const defaultTemplateKey = data.defaultTemplateKey as LandingTemplateKey;
  const defaultConfig = parseOptionalJson(data.defaultConfigJson ?? "") ?? TEMPLATE_REGISTRY[defaultTemplateKey]?.defaultConfig;

  await prisma.pageRoute.update({
    where: { id: data.id },
    data: { defaultTemplateKey, defaultConfig },
  });

  revalidatePath("/admin/routes");
  revalidatePath(`/admin/routes/${data.id}`);
  redirect(`/admin/routes/${data.id}`);
}

export default async function RouteDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const route = await prisma.pageRoute.findUnique({
    where: { id },
    include: { experiment: true },
  });
  if (!route) notFound();

  const templateKeys = Object.keys(TEMPLATE_REGISTRY) as LandingTemplateKey[];

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Edit Route</h1>
          <p className="mt-1 text-sm text-slate-600 font-mono">
            {route.host}
            {route.path}
          </p>
        </div>
        <Link href="/admin/routes" className="text-sm font-semibold underline text-slate-700">
          Back
        </Link>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="grid gap-2 text-sm">
          <div>
            Experiment:{" "}
            {route.experiment ? (
              <Link href={`/admin/experiments/${route.experiment.id}`} className="underline">
                {route.experiment.name} ({route.experiment.state})
              </Link>
            ) : (
              <span className="text-slate-400">—</span>
            )}
          </div>
        </div>

        <form action={updateRouteAction} className="mt-6 grid gap-4">
          <input type="hidden" name="id" value={route.id} />
          <label className="grid gap-1">
            <span className="text-sm font-medium">Default Template</span>
            <select name="defaultTemplateKey" defaultValue={route.defaultTemplateKey} className="h-10 rounded-md border border-slate-300 px-3">
              {templateKeys.map((k) => (
                <option key={k} value={k}>
                  {TEMPLATE_REGISTRY[k].name} ({k})
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">Default Config (JSON)</span>
            <textarea
              name="defaultConfigJson"
              className="min-h-[180px] rounded-md border border-slate-300 px-3 py-2 font-mono text-xs"
              defaultValue={formatJson(route.defaultConfig)}
              placeholder={formatJson(TEMPLATE_REGISTRY[route.defaultTemplateKey as LandingTemplateKey]?.defaultConfig)}
            />
          </label>

          <div className="flex items-center gap-3">
            <button type="submit" className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-5 text-sm font-medium text-white">
              Save
            </button>
            <Link href={`${route.path}`} className="text-sm font-semibold underline text-slate-700">
              View public page
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

