import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function saveIntegrationsAction(formData: FormData) {
  "use server";
  await prisma.integrationConfig.upsert({
    where: { id: 1 },
    update: {
      gtmContainerId: String(formData.get("gtmContainerId") ?? "").trim() || null,
      ga4MeasurementId: String(formData.get("ga4MeasurementId") ?? "").trim() || null,
      hotjarSiteId: String(formData.get("hotjarSiteId") ?? "").trim() || null,
      ghlWebhookUrl: String(formData.get("ghlWebhookUrl") ?? "").trim() || null,
      ghlWebhookSecret: String(formData.get("ghlWebhookSecret") ?? "").trim() || null,
    },
    create: {
      id: 1,
      gtmContainerId: String(formData.get("gtmContainerId") ?? "").trim() || null,
      ga4MeasurementId: String(formData.get("ga4MeasurementId") ?? "").trim() || null,
      hotjarSiteId: String(formData.get("hotjarSiteId") ?? "").trim() || null,
      ghlWebhookUrl: String(formData.get("ghlWebhookUrl") ?? "").trim() || null,
      ghlWebhookSecret: String(formData.get("ghlWebhookSecret") ?? "").trim() || null,
    },
  });

  revalidatePath("/admin/integrations");
}

export default async function IntegrationsAdmin() {
  const cfg = await prisma.integrationConfig.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <h1 className="text-lg font-semibold">Integrations</h1>
      <p className="mt-1 text-sm text-slate-600">
        Note: GTM/GA4/Hotjar scripts load from env vars in <span className="font-mono">src/app/layout.tsx</span>. This
        page stores config for webhooks and future enhancements.
      </p>

      <form action={saveIntegrationsAction} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-sm font-medium">GTM Container ID</span>
          <input
            name="gtmContainerId"
            defaultValue={cfg.gtmContainerId ?? ""}
            className="h-10 rounded-md border border-slate-300 px-3 font-mono text-sm"
            placeholder="GTM-XXXXXXX"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium">GA4 Measurement ID</span>
          <input
            name="ga4MeasurementId"
            defaultValue={cfg.ga4MeasurementId ?? ""}
            className="h-10 rounded-md border border-slate-300 px-3 font-mono text-sm"
            placeholder="G-XXXXXXXXXX"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium">Hotjar Site ID</span>
          <input
            name="hotjarSiteId"
            defaultValue={cfg.hotjarSiteId ?? ""}
            className="h-10 rounded-md border border-slate-300 px-3 font-mono text-sm"
            placeholder="1234567"
          />
        </label>

        <div className="md:col-span-2 h-px bg-slate-200 my-2" />

        <label className="grid gap-1 md:col-span-2">
          <span className="text-sm font-medium">GoHighLevel Webhook URL</span>
          <input
            name="ghlWebhookUrl"
            defaultValue={cfg.ghlWebhookUrl ?? ""}
            className="h-10 rounded-md border border-slate-300 px-3 font-mono text-xs"
            placeholder="https://..."
          />
        </label>
        <label className="grid gap-1 md:col-span-2">
          <span className="text-sm font-medium">GoHighLevel Webhook Secret (optional)</span>
          <input
            name="ghlWebhookSecret"
            defaultValue={cfg.ghlWebhookSecret ?? ""}
            className="h-10 rounded-md border border-slate-300 px-3 font-mono text-xs"
            placeholder="Used to sign requests (HMAC SHA256)"
          />
        </label>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-5 text-sm font-medium text-white"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
