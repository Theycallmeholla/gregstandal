import { TEMPLATE_REGISTRY } from "@/landing/templates/registry";
import type { LandingTemplateKey } from "@/landing/templates/types";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { z } from "zod";

export const dynamic = "force-dynamic";

function parseOptionalJson(raw: string | null) {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  return JSON.parse(trimmed);
}

const addVariantSchema = z.object({
  experimentId: z.string().min(1),
  key: z.string().min(1),
  name: z.string().min(1),
  weightPercent: z.coerce.number().int().min(0).max(100),
  isControl: z.coerce.boolean().optional(),
  templateKey: z.string().min(1),
  templateConfigJson: z.string().optional(),
  redirectPath: z.string().optional(),
  redirectUrl: z.string().optional(),
});

async function addVariantAction(formData: FormData) {
  "use server";

  const data = addVariantSchema.parse({
    experimentId: String(formData.get("experimentId") ?? ""),
    key: String(formData.get("key") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    weightPercent: formData.get("weightPercent"),
    isControl: formData.get("isControl") === "on",
    templateKey: String(formData.get("templateKey") ?? "").trim(),
    templateConfigJson: String(formData.get("templateConfigJson") ?? ""),
    redirectPath: String(formData.get("redirectPath") ?? "").trim(),
    redirectUrl: String(formData.get("redirectUrl") ?? "").trim(),
  });

  const templateKey = data.templateKey as LandingTemplateKey;
  const templateConfig = parseOptionalJson(data.templateConfigJson ?? "") ?? TEMPLATE_REGISTRY[templateKey]?.defaultConfig;

  await prisma.variant.create({
    data: {
      experimentId: data.experimentId,
      key: data.key,
      name: data.name,
      weightPercent: data.weightPercent,
      isControl: !!data.isControl,
      templateKey,
      templateConfig,
      redirectPath: data.redirectPath || null,
      redirectUrl: data.redirectUrl || null,
    },
  });

  revalidatePath(`/admin/experiments/${data.experimentId}`);
}

const updateVariantSchema = z.object({
  id: z.string().min(1),
  weightPercent: z.coerce.number().int().min(0).max(100),
  name: z.string().min(1),
  templateKey: z.string().min(1),
  templateConfigJson: z.string().optional(),
  redirectPath: z.string().optional(),
  redirectUrl: z.string().optional(),
});

async function updateVariantAction(formData: FormData) {
  "use server";

  const data = updateVariantSchema.parse({
    id: String(formData.get("id") ?? ""),
    weightPercent: formData.get("weightPercent"),
    name: String(formData.get("name") ?? "").trim(),
    templateKey: String(formData.get("templateKey") ?? "").trim(),
    templateConfigJson: String(formData.get("templateConfigJson") ?? ""),
    redirectPath: String(formData.get("redirectPath") ?? "").trim(),
    redirectUrl: String(formData.get("redirectUrl") ?? "").trim(),
  });

  const templateKey = data.templateKey as LandingTemplateKey;
  const templateConfig = parseOptionalJson(data.templateConfigJson ?? "");

  const updated = await prisma.variant.update({
    where: { id: data.id },
    data: {
      name: data.name,
      weightPercent: data.weightPercent,
      templateKey,
      templateConfig,
      redirectPath: data.redirectPath || null,
      redirectUrl: data.redirectUrl || null,
    },
    select: { experimentId: true },
  });

  revalidatePath(`/admin/experiments/${updated.experimentId}`);
}

async function deleteVariantAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  const v = await prisma.variant.delete({ where: { id }, select: { experimentId: true } });
  revalidatePath(`/admin/experiments/${v.experimentId}`);
}

async function setStateAction(formData: FormData) {
  "use server";
  const experimentId = String(formData.get("experimentId") ?? "");
  const state = String(formData.get("state") ?? "");

  const experiment = await prisma.experiment.findUnique({
    where: { id: experimentId },
    include: { variants: true },
  });
  if (!experiment) return;

  if (state === "RUNNING") {
    if (experiment.variants.length < 2) throw new Error("Need at least 2 variants to start.");
    const total = experiment.variants.reduce((sum, v) => sum + v.weightPercent, 0);
    if (total !== 100) throw new Error("Variant weights must sum to 100 to start.");
    const controlCount = experiment.variants.filter((v) => v.isControl).length;
    if (controlCount !== 1) throw new Error("Exactly one control variant is required.");
  }

  await prisma.experiment.update({
    where: { id: experimentId },
    data:
      state === "RUNNING"
        ? { state: "RUNNING", startedAt: experiment.startedAt ?? new Date(), pausedAt: null }
        : state === "PAUSED"
          ? { state: "PAUSED", pausedAt: new Date() }
          : state === "ARCHIVED"
            ? { state: "ARCHIVED", archivedAt: new Date() }
            : { state: "DRAFT" },
  });

  revalidatePath(`/admin/experiments/${experimentId}`);
  revalidatePath("/admin/experiments");
}

async function updateExperimentConfigAction(formData: FormData) {
  "use server";
  const experimentId = String(formData.get("experimentId") ?? "");
  const assignmentMode = String(formData.get("assignmentMode") ?? "");
  const routingMode = String(formData.get("routingMode") ?? "");

  await prisma.experiment.update({
    where: { id: experimentId },
    data: {
      assignmentMode: assignmentMode === "TESTING" ? "TESTING" : "STICKY",
      routingMode: routingMode === "REDIRECT" ? "REDIRECT" : "REWRITE",
    },
  });

  revalidatePath(`/admin/experiments/${experimentId}`);
  revalidatePath("/admin/experiments");
}

async function promoteWinnerAction(formData: FormData) {
  "use server";
  const experimentId = String(formData.get("experimentId") ?? "");
  const winnerVariantId = String(formData.get("winnerVariantId") ?? "");

  await prisma.$transaction(async (tx) => {
    const variants = await tx.variant.findMany({ where: { experimentId } });
    if (variants.length === 0) return;
    for (const v of variants) {
      await tx.variant.update({
        where: { id: v.id },
        data: { weightPercent: v.id === winnerVariantId ? 100 : 0 },
      });
    }
  });

  revalidatePath(`/admin/experiments/${experimentId}`);
}

export default async function ExperimentDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const experiment = await prisma.experiment.findUnique({
    where: { id },
    include: { route: true, variants: { orderBy: [{ key: "asc" }] } },
  });
  if (!experiment) notFound();

  const templateKeys = Object.keys(TEMPLATE_REGISTRY) as LandingTemplateKey[];
  const since = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d;
  })();

  const grouped = await prisma.event.groupBy({
    by: ["variantId", "type"],
    where: {
      experimentId: experiment.id,
      occurredAt: { gte: since },
      variantId: { not: null },
    },
    _count: { _all: true },
  });

  type EventType = "page_view" | "cta_click" | "lead_submit" | "conversion";
  const validTypes: EventType[] = ["page_view", "cta_click", "lead_submit", "conversion"];

  const statsByVariant = new Map<string, Record<EventType, number>>();
  for (const v of experiment.variants) {
    statsByVariant.set(v.id, { page_view: 0, cta_click: 0, lead_submit: 0, conversion: 0 });
  }
  for (const row of grouped) {
    const vid = row.variantId;
    if (!vid) continue;
    const s = statsByVariant.get(vid);
    if (!s) continue;
    const eventType = row.type as EventType;
    if (validTypes.includes(eventType)) {
      s[eventType] = row._count._all;
    }
  }

  return (
    <div className="grid gap-8">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold">{experiment.name}</h1>
            <p className="mt-1 text-sm text-slate-600 font-mono">
              {experiment.route.host}
              {experiment.route.path}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <form action={setStateAction}>
              <input type="hidden" name="experimentId" value={experiment.id} />
              <input type="hidden" name="state" value="RUNNING" />
              <button
                type="submit"
                className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold disabled:opacity-40"
                disabled={experiment.state === "RUNNING"}
              >
                Start
              </button>
            </form>
            <form action={setStateAction}>
              <input type="hidden" name="experimentId" value={experiment.id} />
              <input type="hidden" name="state" value="PAUSED" />
              <button
                type="submit"
                className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold disabled:opacity-40"
                disabled={experiment.state !== "RUNNING"}
              >
                Pause
              </button>
            </form>
            <form action={setStateAction}>
              <input type="hidden" name="experimentId" value={experiment.id} />
              <input type="hidden" name="state" value="RUNNING" />
              <button
                type="submit"
                className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold disabled:opacity-40"
                disabled={experiment.state !== "PAUSED"}
              >
                Resume
              </button>
            </form>
            <form action={setStateAction}>
              <input type="hidden" name="experimentId" value={experiment.id} />
              <input type="hidden" name="state" value="ARCHIVED" />
              <button
                type="submit"
                className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold disabled:opacity-40"
                disabled={experiment.state === "ARCHIVED"}
              >
                Archive
              </button>
            </form>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-700">
          State: <span className="font-semibold">{experiment.state}</span>
        </p>

        <form action={updateExperimentConfigAction} className="mt-4 flex flex-wrap items-end gap-3">
          <input type="hidden" name="experimentId" value={experiment.id} />
          <label className="grid gap-1">
            <span className="text-xs font-semibold text-slate-600">Assignment Mode</span>
            <select
              name="assignmentMode"
              defaultValue={experiment.assignmentMode}
              className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm"
            >
              <option value="STICKY">STICKY</option>
              <option value="TESTING">TESTING</option>
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-semibold text-slate-600">Routing Mode</span>
            <select
              name="routingMode"
              defaultValue={experiment.routingMode}
              className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm"
            >
              <option value="REWRITE">REWRITE (same-URL)</option>
              <option value="REDIRECT">REDIRECT</option>
            </select>
          </label>
          <button
            type="submit"
            className="inline-flex h-9 items-center justify-center rounded-md bg-slate-900 px-3 text-sm font-semibold text-white"
          >
            Save mode
          </button>
        </form>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Last 30 days</h2>
        <p className="mt-1 text-sm text-slate-600">Tracked: page_view, cta_click, lead_submit, conversion.</p>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="py-2 pr-4">Variant</th>
                <th className="py-2 pr-4">Views</th>
                <th className="py-2 pr-4">CTAs</th>
                <th className="py-2 pr-4">Leads</th>
                <th className="py-2 pr-4">Conversions</th>
                <th className="py-2 pr-4">Lead CVR</th>
              </tr>
            </thead>
            <tbody>
              {experiment.variants.map((v) => {
                const s = statsByVariant.get(v.id) ?? {
                  page_view: 0,
                  cta_click: 0,
                  lead_submit: 0,
                  conversion: 0,
                };
                const leadCvr = s.page_view > 0 ? (s.lead_submit / s.page_view) * 100 : 0;
                return (
                  <tr key={v.id} className="border-b border-slate-100">
                    <td className="py-2 pr-4 font-mono text-xs">
                      {v.key} ({v.name})
                    </td>
                    <td className="py-2 pr-4">{s.page_view}</td>
                    <td className="py-2 pr-4">{s.cta_click}</td>
                    <td className="py-2 pr-4">{s.lead_submit}</td>
                    <td className="py-2 pr-4">{s.conversion}</td>
                    <td className="py-2 pr-4">{leadCvr.toFixed(2)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Variants</h2>
        <p className="mt-1 text-sm text-slate-600">Weights must sum to 100 to start.</p>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="py-2 pr-4">Key</th>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Control</th>
                <th className="py-2 pr-4">Weight</th>
                <th className="py-2 pr-4">Template</th>
                <th className="py-2 pr-4">Config</th>
                <th className="py-2 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {experiment.variants.map((v) => (
                <tr key={v.id} className="border-b border-slate-100 align-top">
                  <td className="py-2 pr-4 font-mono text-xs">{v.key}</td>
                  <td className="py-2 pr-4">
                    <form action={updateVariantAction} className="grid gap-2">
                      <input type="hidden" name="id" value={v.id} />
                      <input
                        name="name"
                        defaultValue={v.name}
                        className="h-9 rounded-md border border-slate-300 px-2 text-sm"
                      />
                      <div className="flex gap-2">
                        <input
                          name="weightPercent"
                          defaultValue={v.weightPercent}
                          className="h-9 w-24 rounded-md border border-slate-300 px-2 text-sm font-mono"
                        />
                        <select
                          name="templateKey"
                          defaultValue={v.templateKey}
                          className="h-9 rounded-md border border-slate-300 px-2 text-sm"
                        >
                          {templateKeys.map((k) => (
                            <option key={k} value={k}>
                              {k}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid gap-2 md:grid-cols-2">
                        <input
                          name="redirectPath"
                          defaultValue={v.redirectPath ?? ""}
                          className="h-9 rounded-md border border-slate-300 px-2 font-mono text-xs"
                          placeholder="redirectPath (for REDIRECT)"
                        />
                        <input
                          name="redirectUrl"
                          defaultValue={v.redirectUrl ?? ""}
                          className="h-9 rounded-md border border-slate-300 px-2 font-mono text-xs"
                          placeholder="redirectUrl (for REDIRECT)"
                        />
                      </div>
                      <textarea
                        name="templateConfigJson"
                        defaultValue={v.templateConfig ? JSON.stringify(v.templateConfig, null, 2) : ""}
                        className="min-h-[84px] rounded-md border border-slate-300 px-2 py-2 font-mono text-xs"
                        placeholder="JSON config (optional)"
                      />
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="submit"
                          className="inline-flex h-9 items-center justify-center rounded-md bg-slate-900 px-3 text-sm font-semibold text-white"
                        >
                          Save
                        </button>
                        <button
                          formAction={deleteVariantAction}
                          className="text-xs font-semibold text-red-700 underline"
                        >
                          Delete
                        </button>
                      </div>
                    </form>
                  </td>
                  <td className="py-2 pr-4">{v.isControl ? "Yes" : "No"}</td>
                  <td className="py-2 pr-4 font-mono text-xs">{v.weightPercent}%</td>
                  <td className="py-2 pr-4">{v.templateKey}</td>
                  <td className="py-2 pr-4 font-mono text-xs whitespace-pre-wrap">
                    {v.templateConfig ? JSON.stringify(v.templateConfig, null, 2) : "—"}
                  </td>
                  <td className="py-2 pr-4">
                    <form action={promoteWinnerAction}>
                      <input type="hidden" name="experimentId" value={experiment.id} />
                      <input type="hidden" name="winnerVariantId" value={v.id} />
                      <button type="submit" className="text-xs font-semibold text-slate-700 underline">
                        Make winner
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {experiment.variants.length === 0 ? (
                <tr>
                  <td className="py-4 text-sm text-slate-500" colSpan={7}>
                    No variants yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Add Variant</h2>
        <form action={addVariantAction} className="mt-5 grid gap-4 md:grid-cols-3">
          <input type="hidden" name="experimentId" value={experiment.id} />

          <label className="grid gap-1">
            <span className="text-sm font-medium">Key</span>
            <input name="key" placeholder="A" className="h-10 rounded-md border border-slate-300 px-3 font-mono" required />
          </label>

          <label className="grid gap-1 md:col-span-2">
            <span className="text-sm font-medium">Name</span>
            <input name="name" className="h-10 rounded-md border border-slate-300 px-3" required />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Weight %</span>
            <input
              name="weightPercent"
              defaultValue={0}
              className="h-10 rounded-md border border-slate-300 px-3 font-mono"
              required
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Template</span>
            <select name="templateKey" className="h-10 rounded-md border border-slate-300 px-3">
              {templateKeys.map((k) => (
                <option key={k} value={k}>
                  {TEMPLATE_REGISTRY[k].name} ({k})
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Control</span>
            <div className="flex h-10 items-center gap-2 rounded-md border border-slate-300 px-3">
              <input name="isControl" type="checkbox" />
              <span className="text-sm text-slate-700">Is control variant</span>
            </div>
          </label>

          <label className="grid gap-1 md:col-span-3">
            <span className="text-sm font-medium">Template Config (JSON, optional)</span>
            <textarea
              name="templateConfigJson"
              className="min-h-[96px] rounded-md border border-slate-300 px-3 py-2 font-mono text-xs"
              placeholder='{"headline":"...","subhead":"..."}'
            />
          </label>

          <label className="grid gap-1 md:col-span-2">
            <span className="text-sm font-medium">Redirect Path (optional, REDIRECT mode)</span>
            <input
              name="redirectPath"
              className="h-10 rounded-md border border-slate-300 px-3 font-mono text-sm"
              placeholder="/variant-b"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">Redirect URL (optional, REDIRECT mode)</span>
            <input
              name="redirectUrl"
              className="h-10 rounded-md border border-slate-300 px-3 font-mono text-xs"
              placeholder="https://..."
            />
          </label>

          <div className="md:col-span-3">
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-5 text-sm font-medium text-white"
            >
              Add Variant
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
