/**
 * GoHighLevel API client for contact management
 */

const GHL_API_URL = "https://services.leadconnectorhq.com";
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

// Custom field keys from GHL
const CUSTOM_FIELDS = {
  monthlyRevenue: "contact.whats_your_current_monthly_revenue",
  biggestBottleneck:
    "contact.what_are_your_biggest_challengesobstacles_youre_facing_right_now_in_your_business_please_be_as_detailed_as_possible",
  trade: "contact.trade",
  leadSources: "contact.lead_sources",
  landingPage: "contact.landing_page",
  experimentVariant: "contact.experiment_variant",
  formType: "contact.form_type",
} as const;

export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
  // Business fields
  trade?: string;
  monthlyRevenue?: string;
  leadSources?: string[];
  biggestBottleneck?: string;
  // Tracking metadata
  formType: "step1_form" | "full_application";
  landingPage: string;
  experimentVariant?: string;
}

interface GHLCustomField {
  key: string;
  field_value: string | string[];
}

interface GHLContactPayload {
  locationId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
  source: string;
  tags: string[];
  customFields: GHLCustomField[];
}

interface GHLResponse {
  contact?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  error?: string;
  message?: string;
}

export interface CreateContactResult {
  success: boolean;
  contactId?: string;
  error?: string;
}

function buildCustomFields(data: LeadData): GHLCustomField[] {
  const fields: GHLCustomField[] = [];

  // Always include tracking fields
  fields.push({ key: CUSTOM_FIELDS.formType, field_value: data.formType });
  fields.push({ key: CUSTOM_FIELDS.landingPage, field_value: data.landingPage });

  if (data.experimentVariant) {
    fields.push({ key: CUSTOM_FIELDS.experimentVariant, field_value: data.experimentVariant });
  }

  // Business fields (only if provided)
  if (data.trade) {
    fields.push({ key: CUSTOM_FIELDS.trade, field_value: data.trade });
  }

  if (data.monthlyRevenue) {
    fields.push({ key: CUSTOM_FIELDS.monthlyRevenue, field_value: data.monthlyRevenue });
  }

  if (data.leadSources && data.leadSources.length > 0) {
    fields.push({ key: CUSTOM_FIELDS.leadSources, field_value: data.leadSources });
  }

  if (data.biggestBottleneck) {
    fields.push({ key: CUSTOM_FIELDS.biggestBottleneck, field_value: data.biggestBottleneck });
  }

  return fields;
}

function buildTags(data: LeadData): string[] {
  const tags: string[] = [];

  // Tag by form type
  if (data.formType === "step1_form") {
    tags.push("step1-lead");
  } else {
    tags.push("full-application");
  }

  // Tag by variant if available
  if (data.experimentVariant) {
    tags.push(data.experimentVariant);
  }

  // Tag by trade if available
  if (data.trade) {
    tags.push(data.trade.toLowerCase().replace(/\s+/g, "-"));
  }

  return tags;
}

export async function createContact(data: LeadData): Promise<CreateContactResult> {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    console.error("GHL credentials not configured");
    return { success: false, error: "GHL not configured" };
  }

  const payload: GHLContactPayload = {
    locationId: GHL_LOCATION_ID,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    source: data.landingPage || "Landing Page",
    tags: buildTags(data),
    customFields: buildCustomFields(data),
  };

  if (data.phone) {
    payload.phone = data.phone;
  }

  if (data.companyName) {
    payload.companyName = data.companyName;
  }

  try {
    const response = await fetch(`${GHL_API_URL}/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result: GHLResponse = await response.json();

    if (!response.ok) {
      console.error("GHL API error:", result);
      return {
        success: false,
        error: result.message || result.error || `HTTP ${response.status}`,
      };
    }

    return {
      success: true,
      contactId: result.contact?.id,
    };
  } catch (err) {
    console.error("GHL API request failed:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
