import { NextRequest, NextResponse } from "next/server";
import { createContact, type LeadData } from "@/lib/ghl";

interface LeadRequestBody {
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

export async function POST(request: NextRequest) {
  try {
    const body: LeadRequestBody = await request.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: firstName, lastName, email" },
        { status: 400 }
      );
    }

    if (!body.formType || !body.landingPage) {
      return NextResponse.json(
        { success: false, error: "Missing required metadata: formType, landingPage" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    const leadData: LeadData = {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim(),
      companyName: body.companyName?.trim(),
      trade: body.trade,
      monthlyRevenue: body.monthlyRevenue,
      leadSources: body.leadSources,
      biggestBottleneck: body.biggestBottleneck?.trim(),
      formType: body.formType,
      landingPage: body.landingPage,
      experimentVariant: body.experimentVariant,
    };

    const result = await createContact(leadData);

    if (!result.success) {
      console.error("Failed to create GHL contact:", result.error);
      // Return success to client even if GHL fails - don't block user flow
      // The lead data is still tracked in analytics
      return NextResponse.json({
        success: true,
        warning: "Lead captured but CRM sync pending",
      });
    }

    return NextResponse.json({
      success: true,
      contactId: result.contactId,
    });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
