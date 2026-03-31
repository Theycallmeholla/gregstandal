/**
 * Cloudflare Pages Function - GHL Webhook Proxy
 * POST /api/lead
 *
 * Receives form data from frontend and forwards to GHL webhook server-side,
 * avoiding browser CORS restrictions.
 */

const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/57pQj4H29OMJVaQ75R5q/webhook-trigger/ebdb2d0d-bea7-4cea-b7ed-103b8e4d8ed7";

interface LeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
  trade?: string;
  monthlyRevenue?: string;
  leadSources?: string[];
  biggestBottleneck?: string;
  formType: "step1_form" | "full_application";
  landingPage: string;
  experimentVariant?: string;
}

interface CFContext {
  request: Request;
}

export async function onRequestPost(context: CFContext): Promise<Response> {
  try {
    const body: LeadPayload = await context.request.json();

    // Validate required fields
    if (!body.firstName || !body.email || !body.formType) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Build tags
    const tags: string[] = [];
    if (body.formType === "step1_form") {
      tags.push("step1-lead");
    } else {
      tags.push("full-application");
    }
    if (body.experimentVariant) {
      tags.push(body.experimentVariant);
    }
    if (body.trade) {
      tags.push(body.trade.toLowerCase().replace(/\s+/g, "-"));
    }

    // Build webhook payload
    const webhookPayload = {
      first_name: body.firstName,
      last_name: body.lastName || body.firstName,
      full_name: `${body.firstName} ${body.lastName || ""}`.trim(),
      email: body.email,
      phone: body.phone || "",
      company_name: body.companyName || "",
      trade: body.trade || "",
      monthly_revenue: body.monthlyRevenue || "",
      lead_sources: body.leadSources?.join(", ") || "",
      what_are_your_biggest_challengesobstacles_youre_facing_right_now_in_your_business_please_be_as_detailed_as_possible: body.biggestBottleneck || "",
      form_type: body.formType,
      landing_page: body.landingPage,
      experiment_variant: body.experimentVariant || "",
      tags: tags.join(","),
    };

    // Forward to GHL webhook (server-side, no CORS)
    const webhookResponse = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      console.error("GHL webhook error:", webhookResponse.status);
      // Still return success to client - don't block user flow
      return new Response(
        JSON.stringify({ success: true, warning: "CRM sync pending" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Lead API error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
