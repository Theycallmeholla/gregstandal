export type LandingTemplateKey = "basic-lead" | "acquisition-demo";

export type LandingTemplateRenderContext = {
  route: { host: string; path: string };
  experiment?: { id: string; name: string };
  variant?: { id: string; key: string; name: string };
  visitorId: string;
  sessionId: string;
};

export type LandingTemplateProps<TConfig = unknown> = {
  ctx: LandingTemplateRenderContext;
  config: TConfig;
};
