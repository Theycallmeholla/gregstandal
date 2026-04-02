"use client";

import React, { FormEvent, useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { trackFormStart, trackFormSubmit, trackFormAbandon } from "@/lib/ab-test/experiment";
import type { ExperimentContext } from "@/lib/ab-test/types";

const colors = {
  primary: "#002542",
  accent: "#FF6B00",
};

const tradeOptions = [
  "Roofing", "Remodeling", "Flooring", "HVAC", "Plumbing", "Electrical",
  "Painting", "Fencing", "Windows & Doors", "Landscaping", "General Contractor", "Other",
];

// Updated to match GHL custom field options
const revenueOptions = [
  "Less Than $10K Per Month (Do Not Apply)",
  "$10-$25k Per Month",
  "$25-$50k Per Month",
  "$50k+ Per Month",
];

const leadSourceOptions = [
  "Google Ads", "Facebook Ads", "Referrals", "Home Advisor / Angi", "Organic / SEO", "Direct Mail", "Other",
];

type FormData = {
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

const STORAGE_KEY = "bb-v5-funnel";

function writeFullApplication(data: FormData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ fullApplication: data }));
}

interface TwoStepFormProps {
  className?: string;
  context: ExperimentContext | null;
  redirectPath: string;
}

export function TwoStepForm({ className = "", context, redirectPath }: TwoStepFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [step, setStep] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    trade: "",
    monthlyRevenue: "",
    leadSources: [],
    biggestBottleneck: "",
  });
  const formCompletedRef = useRef(false);
  const currentStepRef = useRef(1);

  // Keep step ref in sync
  useEffect(() => {
    currentStepRef.current = step;
  }, [step]);

  // Track form abandonment when user leaves page
  useEffect(() => {
    if (!context) return;

    const handleBeforeUnload = () => {
      // Only track abandonment if form was started but not completed
      if (hasStarted && !formCompletedRef.current) {
        trackFormAbandon(context, "two_step_application", currentStepRef.current, 2);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [context, hasStarted]);

  const handleFieldFocus = () => {
    if (!hasStarted && context) {
      trackFormStart(context, "two_step_application");
      setHasStarted(true);
    }
  };

  const handleStep1Submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit Step 1 data to webhook (creates contact in GHL)
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          companyName: form.companyName,
          formType: 'step1_form',
          landingPage: pathname,
          experimentVariant: context?.variant?.id,
        }),
      });
    } catch (err) {
      console.error('Step 1 submission error:', err);
    }

    if (context) {
      trackFormSubmit(context, "two_step_application", { step: 1 });
    }

    setIsSubmitting(false);
    setStep(2);
  };

  const handleStep2Submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Save to localStorage as backup
    writeFullApplication(form);

    try {
      // Submit to Pages Function proxy (avoids CORS)
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          companyName: form.companyName,
          trade: form.trade,
          monthlyRevenue: form.monthlyRevenue,
          leadSources: form.leadSources,
          biggestBottleneck: form.biggestBottleneck,
          formType: 'full_application',
          landingPage: pathname,
          experimentVariant: context?.variant?.id,
        }),
      });
    } catch (err) {
      // Log but don't block - let user continue
      console.error('Lead submission error:', err);
    }

    if (context) {
      trackFormSubmit(context, "two_step_application", { step: 2 });
    }

    // Mark form as completed to prevent abandonment tracking
    formCompletedRef.current = true;

    // Always redirect regardless of API result
    router.push(redirectPath);
  };

  const toggleLeadSource = (source: string) => {
    setForm((current) => ({
      ...current,
      leadSources: current.leadSources.includes(source)
        ? current.leadSources.filter((s) => s !== source)
        : [...current.leadSources, source],
    }));
  };

  // Step 1: Basic Info
  if (step === 1) {
    return (
      <form
        onSubmit={handleStep1Submit}
        className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8 ${className}`}
      >
        <div className="mb-6">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.2em]" style={{ color: colors.accent }}>
            Step 1 of 2
          </p>
          <h3 className="text-xl font-black sm:text-2xl" style={{ color: colors.primary }}>
            Apply For Your 90-Day Plan
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Start with your basic info so we can see if this is a fit.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">First Name</span>
            <input
              type="text"
              required
              placeholder="John"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
              value={form.firstName}
              onFocus={handleFieldFocus}
              onChange={(e) => setForm((current) => ({ ...current, firstName: e.target.value }))}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Last Name</span>
            <input
              type="text"
              required
              placeholder="Smith"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
              value={form.lastName}
              onChange={(e) => setForm((current) => ({ ...current, lastName: e.target.value }))}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Company Name</span>
            <input
              type="text"
              required
              placeholder="Acme Contracting"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
              value={form.companyName}
              onChange={(e) => setForm((current) => ({ ...current, companyName: e.target.value }))}
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Email</span>
              <input
                type="email"
                required
                placeholder="john@company.com"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
                value={form.email}
                onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Mobile Phone</span>
              <input
                type="tel"
                required
                placeholder="(555) 555-5555"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
                value={form.phone}
                onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))}
              />
            </label>
          </div>
        </div>

        <label className="mt-6 flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-5 w-5 rounded border-slate-300 text-[#FF6B00] focus:ring-[#FF6B00] cursor-pointer"
          />
          <span className="text-xs text-slate-500 leading-relaxed">
            By submitting this form, I consent to receive SMS, emails, and calls from Brand Builders regarding my inquiry.
            Message and data rates may apply. I can opt out at any time by replying STOP.
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting || !consent}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg px-8 py-4 text-center text-lg font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          style={{ backgroundColor: colors.accent }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            "Continue"
          )}
        </button>
        <p className="mt-3 text-center text-xs text-slate-400">
          We'll use this to personalize the next step.
        </p>
      </form>
    );
  }

  // Step 2: Business Info
  return (
    <form
      onSubmit={handleStep2Submit}
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8 ${className}`}
    >
      <div className="mb-6">
        <p className="mb-2 text-xs font-black uppercase tracking-[0.2em]" style={{ color: colors.accent }}>
          Step 2 of 2
        </p>
        <h3 className="text-xl font-black sm:text-2xl" style={{ color: colors.primary }}>
          Tell us about {form.companyName || "your business"}, {form.firstName || "there"}.
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          A few quick questions so we can see if this is the right fit.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Trade</span>
            <select
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
              value={form.trade}
              onChange={(e) => setForm((current) => ({ ...current, trade: e.target.value }))}
              disabled={isSubmitting}
            >
              <option value="">Select your trade</option>
              {tradeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Monthly Revenue</span>
            <select
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
              value={form.monthlyRevenue}
              onChange={(e) => setForm((current) => ({ ...current, monthlyRevenue: e.target.value }))}
              disabled={isSubmitting}
            >
              <option value="">Select revenue range</option>
              {revenueOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">Main Lead Sources</span>
          <p className="mb-2 text-xs text-slate-400">Select all that apply</p>
          <div className="grid grid-cols-2 gap-2">
            {leadSourceOptions.map((source) => (
              <button
                key={source}
                type="button"
                onClick={() => toggleLeadSource(source)}
                disabled={isSubmitting}
                className={`rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition ${
                  form.leadSources.includes(source)
                    ? "border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {source}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Biggest Bottleneck Right Now?
          </span>
          <textarea
            required
            rows={3}
            placeholder="What's the #1 thing keeping you from booking more estimates?"
            className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
            value={form.biggestBottleneck}
            onChange={(e) => setForm((current) => ({ ...current, biggestBottleneck: e.target.value }))}
            disabled={isSubmitting}
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => setStep(1)}
          disabled={isSubmitting}
          className="order-2 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 sm:order-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="order-1 inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-8 py-4 text-center text-lg font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1 sm:order-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          style={{ backgroundColor: colors.accent }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </button>
      </div>
    </form>
  );
}
