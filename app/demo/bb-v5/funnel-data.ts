export const colors = {
  primary: "#002542",
  accent: "#FF6B00",
  gold: "#f1b40c",
};

// Video sources
export const mainVslVideoSrc =
  "https://assets.cdn.filesafe.space/57pQj4H29OMJVaQ75R5q/media/69c5409f22e1ed2ab8e72506.mp4";

export const testimonialVideos = {
  agWilliams: "https://assets.cdn.filesafe.space/57pQj4H29OMJVaQ75R5q/media/69c5770d8bf31c0b31ad7321.mp4",
  janFence: "https://assets.cdn.filesafe.space/57pQj4H29OMJVaQ75R5q/media/69c5770de2498147ab15d366.mp4",
  spectrum: "https://assets.cdn.filesafe.space/57pQj4H29OMJVaQ75R5q/media/69c5770da916741576dd1622.mp4",
  highlightReel: "https://assets.cdn.filesafe.space/57pQj4H29OMJVaQ75R5q/media/69c57a11ffe25a5d64f5f062.mp4",
};

// ============================================
// SECTION 1 – HERO (ATF)
// ============================================
export const heroLabel = "STOP WASTING MONEY ON ADS";

export const heroHeadline = {
  prefix: "Add ",
  highlight: "20–30% More Booked Estimates",
  suffix: " in 90 Days for Home Improvement & Home Service Contractors",
};

export const heroSubheadline =
  "We turn your marketing into a system that makes your estimate a formality. Our system is built to help home improvement and home service contractors turn the attention they already have into more qualified booked estimates, better close rates, and stronger trust before the estimate.";

export const heroBullets = [
  "More Booked Estimates",
  "Higher Close Rates",
  "More Trust Before the First Appointment",
  "No long-term contracts. Contractors only.",
];

export const heroCta = "Apply For Your 90-Day Plan";

export const heroTrustLine = "";

// ============================================
// SECTION 2 – VSL + HOW IT WORKS
// ============================================
export const vslHeadline = "More Booked Estimates Without More 'Leads'";

export const processSteps = [
  {
    number: "1",
    title: "Audit your current lead flow & calendar",
    desc: "We analyze where leads are falling through the cracks and identify quick wins.",
  },
  {
    number: "2",
    title: "Install your booking & follow-up system",
    desc: "We build automated sequences that turn inquiries into booked estimates.",
  },
  {
    number: "3",
    title: "Launch, track, and scale what's working",
    desc: "We optimize based on real data so you get more booked estimates every month.",
  },
];

// ============================================
// SECTION 3 – PROOF + FINAL CTA
// ============================================
export const proofHeadline = "Real Contractors, Real Booked Estimates";

export const caseTiles = [
  {
    trade: "Roofing",
    location: "Dallas, TX",
    result: "+27% booked estimates in 60 days",
    revenue: "~$58k in extra quoted work",
  },
  {
    trade: "Painting",
    location: "New York",
    result: "+31% booked estimates in 45 days",
    revenue: "~$28k/month recurring",
  },
  {
    trade: "Fencing",
    location: "New Jersey",
    result: "+20% lead gen increase",
    revenue: "$100k+ in new business",
  },
];

// Who this is for / not for
export const perfectFit = [
  "You're doing at least ~$80k/month",
  "You already get leads but hate no-shows and unbooked inquiries",
  "You're willing to follow up with qualified homeowners",
];

export const notAFit = [
  "You're just starting and have no lead flow yet",
  "You only compete on price",
  "You're looking for a 'set and forget' magic trick",
];

// ============================================
// PAGE 2 – APPLICATION
// ============================================
export const applyHeadline = "Apply For Your 90-Day Booked Estimate Plan";

export const applyDescription =
  "We don't sell 'leads.' We build you a booked estimate system. If we don't increase your monthly booked estimates by at least 20% within 90 days of going live, we'll work for free until we do.";

// Form dropdown options
export const tradeOptions = [
  "Roofing",
  "Remodeling",
  "Flooring",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Painting",
  "Fencing",
  "Windows & Doors",
  "Landscaping",
  "General Contractor",
  "Other",
];

export const revenueOptions = [
  "Under $80k/month",
  "$80k–$150k/month",
  "$150k–$300k/month",
  "$300k–$500k/month",
  "$500k+/month",
];

export const leadSourceOptions = [
  "Google Ads",
  "Facebook Ads",
  "Referrals",
  "Home Advisor / Angi",
  "Organic / SEO",
  "Direct Mail",
  "Other",
];

// ============================================
// THANK YOU PAGE
// ============================================
export const clientLogos = [
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-valley.jpg", alt: "Valley" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-coldwell-banker.jpg", alt: "Coldwell Banker" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/08/logo-spectrum.jpg", alt: "Spectrum" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-jan-fence.jpg", alt: "Jan Fence" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-ag-williams.jpg", alt: "AG Williams" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-general-steel.jpg", alt: "General Steel" },
];

export const offerBullets = [
  "More booked estimates from your existing leads",
  "A follow-up system that works automatically",
  "Tracking so you know exactly what's working",
  "No long-term contracts or hidden fees",
];

// ============================================
// STORAGE
// ============================================
export const STORAGE_KEY = "bb-v5-funnel";

// Mini form (hero)
export type MiniFormData = {
  firstName: string;
  companyName: string;
  email: string;
  phone: string;
  trade: string;
};

// Full application form
export type FullApplicationData = {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  trade: string;
  monthlyRevenue: string;
  leadSources: string[];
  biggestBottleneck: string;
};

export type FunnelData = {
  miniForm?: MiniFormData;
  fullApplication?: FullApplicationData;
};
