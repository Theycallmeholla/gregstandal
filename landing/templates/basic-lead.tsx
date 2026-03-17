import type { LandingTemplateProps } from "./types";

export type BasicLeadConfig = {
  headline: string;
  subhead?: string;
  ctaText?: string;
};

export function BasicLeadTemplate({ ctx, config }: LandingTemplateProps<BasicLeadConfig>) {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-xs uppercase tracking-wider text-slate-500">
          {ctx.route.host}
          {ctx.route.path}
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight">{config.headline}</h1>
        {config.subhead ? <p className="mt-4 text-lg text-slate-700">{config.subhead}</p> : null}

        <div className="mt-10 rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold">Get in touch</h2>
          <p className="mt-1 text-sm text-slate-600">This V1 form must POST to our server.</p>

          <form className="mt-5 grid gap-3" method="post" action="/api/lead">
            <input type="hidden" name="visitorId" value={ctx.visitorId} />
            <input type="hidden" name="sessionId" value={ctx.sessionId} />
            <input type="hidden" name="routeHost" value={ctx.route.host} />
            <input type="hidden" name="routePath" value={ctx.route.path} />
            <input type="hidden" name="experimentId" value={ctx.experiment?.id ?? ""} />
            <input type="hidden" name="variantId" value={ctx.variant?.id ?? ""} />

            <label className="grid gap-1">
              <span className="text-sm">Email</span>
              <input
                name="email"
                type="email"
                required
                className="h-11 rounded-md border border-slate-300 px-3"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm">Phone</span>
              <input name="phone" className="h-11 rounded-md border border-slate-300 px-3" />
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-slate-900 px-5 text-sm font-medium text-white"
              data-cta-id="primary_lead_submit"
            >
              {config.ctaText ?? "Request info"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

