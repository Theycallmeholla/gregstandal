"use client";

type TrackingContext = {
  visitorId: string;
  sessionId: string;
  routeHost: string;
  routePath: string;
  experimentId?: string;
  variantId?: string;
};

export function TrackingRuntime({ ctx }: { ctx: TrackingContext }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(() => {
  const ctx = ${JSON.stringify(ctx)};
  window.__LP_CTX = ctx;

  function send(type, properties) {
    const payload = JSON.stringify({ type, ...ctx, properties });
    try {
      if (navigator.sendBeacon) {
        const ok = navigator.sendBeacon("/api/events", new Blob([payload], { type: "application/json" }));
        if (ok) return;
      }
    } catch (_) {}

    fetch("/api/events", { method: "POST", headers: { "content-type": "application/json" }, body: payload, keepalive: true }).catch(() => {});
  }

  document.addEventListener("click", (e) => {
    const el = e.target instanceof Element ? e.target.closest("[data-cta-id]") : null;
    if (!el) return;
    const ctaId = el.getAttribute("data-cta-id");
    if (!ctaId) return;
    send("cta_click", { ctaId });
  }, { capture: true });
})();
        `,
      }}
    />
  );
}
