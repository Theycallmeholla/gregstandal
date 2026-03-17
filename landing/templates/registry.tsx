import { BasicLeadTemplate, type BasicLeadConfig } from "./basic-lead";
import { AcquisitionDemoTemplate, type AcquisitionDemoConfig } from "./acquisition-demo";
import type { LandingTemplateKey, LandingTemplateProps } from "./types";
import type React from "react";

export type LandingTemplateDefinition = {
  key: LandingTemplateKey;
  name: string;
  render: (props: LandingTemplateProps<unknown>) => React.ReactNode;
  defaultConfig: unknown;
};

export const TEMPLATE_REGISTRY: Record<LandingTemplateKey, LandingTemplateDefinition> = {
  "basic-lead": {
    key: "basic-lead",
    name: "Basic Lead (V1)",
    render: (props) => <BasicLeadTemplate {...(props as LandingTemplateProps<BasicLeadConfig>)} />,
    defaultConfig: {
      headline: "A fast V1 landing page experiment",
      subhead: "Developer-managed templates. Same-URL A/B tests. Server-side lead capture.",
      ctaText: "Request info",
    } satisfies BasicLeadConfig,
  },
  "acquisition-demo": {
    key: "acquisition-demo",
    name: "Acquisition Demo",
    render: (props) =>
      <AcquisitionDemoTemplate {...(props as LandingTemplateProps<AcquisitionDemoConfig>)} />,
    defaultConfig: {
      topBadgeText: "Live In-Person Workshop | Las Vegas",
      heroTitle: "ARE YOU THE THING LIMITING YOUR BUSINESS?",
      heroSubtitle: "Join Our Scaling Workshop — Remove Yourself as the Single Point of Failure",
      heroVideoPosterUrl:
        "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=1200",
      accentColor: "#8b31ff",
    } satisfies AcquisitionDemoConfig,
  },
};
