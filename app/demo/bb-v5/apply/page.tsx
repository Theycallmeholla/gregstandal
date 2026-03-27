"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { CheckCircle, X, ShieldCheck } from "lucide-react";
import {
  colors,
  applyHeadline,
  applyDescription,
  perfectFit,
  notAFit,
  tradeOptions,
  revenueOptions,
  leadSourceOptions,
  StepOneData,
} from "../funnel-data";
import { readFunnelData, writeStepOne } from "../funnel-storage";

export default function BrandBuildersV5ApplyPage() {
  const router = useRouter();
  const [form, setForm] = useState<StepOneData>({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    trade: "",
    monthlyRevenue: "",
    mainLeadSource: "",
    biggestBottleneck: "",
  });

  // Pre-fill from mini form if available
  useEffect(() => {
    const data = readFunnelData();
    if (data.miniForm) {
      setForm((current) => ({
        ...current,
        firstName: data.miniForm?.firstName || "",
        companyName: data.miniForm?.companyName || "",
        email: data.miniForm?.email || "",
        phone: data.miniForm?.phone || "",
        trade: data.miniForm?.trade || "",
      }));
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    writeStepOne(form);
    router.push("/demo/bb-v5/thank-you");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-[#FF6B00]/20">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4">
          <Image
            src="/gregory-standal-sig-logo-blue.svg"
            alt="Greg Standal"
            width={180}
            height={40}
            className="h-10 w-auto"
          />
        </div>
      </header>

      <main className="px-4 pb-20 pt-28">
        <div className="mx-auto max-w-4xl">
          {/* ============================================ */}
          {/* TOP: SHORT TEXT + GUARANTEE */}
          {/* ============================================ */}
          <div className="mb-10 text-center">
            <h1
              className="mb-4 text-3xl font-black tracking-tight md:text-4xl lg:text-5xl"
              style={{ color: colors.primary }}
            >
              {applyHeadline}
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-slate-600 md:text-xl">
              {applyDescription}
            </p>
          </div>

          {/* Guarantee badge */}
          <div className="relative mb-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div
              className="absolute -top-6 left-8 flex h-12 w-12 rotate-12 items-center justify-center rounded-xl text-white shadow-lg"
              style={{ backgroundColor: colors.accent }}
            >
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3
              className="mb-3 ml-2 mt-2 text-xl font-black md:text-2xl"
              style={{ color: colors.primary }}
            >
              Our 90-Day Guarantee
            </h3>
            <p className="ml-2 text-lg font-medium italic leading-relaxed text-slate-600">
              &ldquo;If we don&apos;t increase your monthly booked estimates by at least 20%
              within 90 days of going live, we&apos;ll work for free until we do.&rdquo;
            </p>
          </div>

          {/* ============================================ */}
          {/* MIDDLE: FULL FORM */}
          {/* ============================================ */}
          <form
            onSubmit={handleSubmit}
            className="mb-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg md:p-10"
          >
            <div className="mb-8">
              <p
                className="mb-2 text-xs font-black uppercase tracking-[0.24em]"
                style={{ color: colors.accent }}
              >
                Application
              </p>
              <h2
                className="text-2xl font-black md:text-3xl"
                style={{ color: colors.primary }}
              >
                Tell Us About Your Business
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* First Name */}
              <label className="grid gap-2">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  First Name
                </span>
                <input
                  type="text"
                  required
                  className="rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm((current) => ({ ...current, firstName: e.target.value }))
                  }
                />
              </label>

              {/* Last Name */}
              <label className="grid gap-2">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Last Name
                </span>
                <input
                  type="text"
                  required
                  className="rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm((current) => ({ ...current, lastName: e.target.value }))
                  }
                />
              </label>

              {/* Company Name */}
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Company Name
                </span>
                <input
                  type="text"
                  required
                  className="rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
                  value={form.companyName}
                  onChange={(e) =>
                    setForm((current) => ({ ...current, companyName: e.target.value }))
                  }
                />
              </label>

              {/* Email */}
              <label className="grid gap-2">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Email
                </span>
                <input
                  type="email"
                  required
                  className="rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
                  value={form.email}
                  onChange={(e) =>
                    setForm((current) => ({ ...current, email: e.target.value }))
                  }
                />
              </label>

              {/* Mobile Phone */}
              <label className="grid gap-2">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Mobile Phone
                </span>
                <input
                  type="tel"
                  required
                  className="rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((current) => ({ ...current, phone: e.target.value }))
                  }
                />
              </label>

              {/* Trade */}
              <label className="grid gap-2">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Trade
                </span>
                <select
                  required
                  className="rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
                  value={form.trade}
                  onChange={(e) =>
                    setForm((current) => ({ ...current, trade: e.target.value }))
                  }
                >
                  <option value="">Select your trade</option>
                  {tradeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              {/* Monthly Revenue */}
              <label className="grid gap-2">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Monthly Revenue
                </span>
                <select
                  required
                  className="rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
                  value={form.monthlyRevenue}
                  onChange={(e) =>
                    setForm((current) => ({ ...current, monthlyRevenue: e.target.value }))
                  }
                >
                  <option value="">Select revenue range</option>
                  {revenueOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              {/* Main Lead Source */}
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Main Lead Source
                </span>
                <select
                  required
                  className="rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
                  value={form.mainLeadSource}
                  onChange={(e) =>
                    setForm((current) => ({ ...current, mainLeadSource: e.target.value }))
                  }
                >
                  <option value="">Where do most of your leads come from?</option>
                  {leadSourceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              {/* Biggest Bottleneck */}
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Biggest bottleneck right now?
                </span>
                <textarea
                  required
                  rows={3}
                  placeholder="What's the #1 thing keeping you from booking more estimates?"
                  className="rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
                  value={form.biggestBottleneck}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      biggestBottleneck: e.target.value,
                    }))
                  }
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex w-full items-center justify-center rounded-lg px-8 py-5 text-center text-[clamp(16px,4.5vw,22px)] font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1"
              style={{ backgroundColor: colors.accent }}
            >
              Submit Application
            </button>
          </form>

          {/* ============================================ */}
          {/* BOTTOM: WHO THIS IS FOR / NOT FOR */}
          {/* ============================================ */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Perfect Fit */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3
                className="mb-6 text-xl font-black"
                style={{ color: colors.primary }}
              >
                Perfect Fit If…
              </h3>
              <ul className="space-y-4">
                {perfectFit.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-base font-medium text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not A Fit */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-black text-slate-500">Not A Fit If…</h3>
              <ul className="space-y-4">
                {notAFit.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                    <span className="text-base font-medium text-slate-500">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 py-12 text-center">
        <div className="mb-6 flex justify-center">
          <Image
            src="/gregory-standal-sig-logo-white.svg"
            alt="Greg Standal"
            width={216}
            height={48}
            className="h-12 w-auto opacity-80"
          />
        </div>
        <p className="text-sm font-medium text-slate-500">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </div>
  );
}
