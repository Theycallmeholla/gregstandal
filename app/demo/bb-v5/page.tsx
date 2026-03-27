"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { CheckCircle, X, ArrowLeft } from "lucide-react";
import { InlineVideoPlayer } from "./video-player";
import {
  colors,
  heroLabel,
  heroHeadline,
  heroBullets,
  vslHeadline,
  mainVslVideoSrc,
  proofHeadline,
  caseTiles,
  perfectFit,
  notAFit,
  tradeOptions,
  revenueOptions,
  leadSourceOptions,
} from "./funnel-data";
import { writeFullApplication } from "./funnel-storage";

const heroSubheadline = "We turn your marketing into a system that makes your estimate a formality";

const strategyPhases = [
  { title: "Phase 1 — Position You as the Local Authority", desc: "Define the exact customer profile, the painful problem, and the solution they're desperate for." },
  { title: "Phase 2 — Core Video Assets", desc: "Brand film + story-driven case studies showing real transformations and results." },
  { title: "Phase 3 — Custom Booking System Building", desc: "Give homeowners a clear, undeniable reason to choose you over 5 other quotes." },
  { title: "Phase 4 — YouTube Authority + Email Newsletter", desc: "Build authority and humanize your brand while constantly nurturing new and existing audiences." },
  { title: "Phase 5 — Run Ads", desc: "We drive paid traffic to this trust building content ecosystem to generate sales opportunities on auto-pilot." }
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

function TwoStepForm({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
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

  const handleStep1Submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep(2);
  };

  const handleStep2Submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    writeFullApplication(form);
    router.push("/demo/bb-v5/thank-you");
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
          <p
            className="mb-2 text-xs font-black uppercase tracking-[0.2em]"
            style={{ color: colors.accent }}
          >
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
          {/* Row 1: First Name */}
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              First Name
            </span>
            <input
              type="text"
              required
              placeholder="John"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
              value={form.firstName}
              onChange={(e) =>
                setForm((current) => ({ ...current, firstName: e.target.value }))
              }
            />
          </label>

          {/* Row 2: Last Name */}
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Last Name
            </span>
            <input
              type="text"
              required
              placeholder="Smith"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
              value={form.lastName}
              onChange={(e) =>
                setForm((current) => ({ ...current, lastName: e.target.value }))
              }
            />
          </label>

          {/* Row 2: Company Name */}
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Company Name
            </span>
            <input
              type="text"
              required
              placeholder="Acme Contracting"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
              value={form.companyName}
              onChange={(e) =>
                setForm((current) => ({ ...current, companyName: e.target.value }))
              }
            />
          </label>

          {/* Row 3: Email + Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Email
              </span>
              <input
                type="email"
                required
                placeholder="john@company.com"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
                value={form.email}
                onChange={(e) =>
                  setForm((current) => ({ ...current, email: e.target.value }))
                }
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Mobile Phone
              </span>
              <input
                type="tel"
                required
                placeholder="(555) 555-5555"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
                value={form.phone}
                onChange={(e) =>
                  setForm((current) => ({ ...current, phone: e.target.value }))
                }
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg px-8 py-4 text-center text-lg font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1"
          style={{ backgroundColor: colors.accent }}
        >
          Continue
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
        <p
          className="mb-2 text-xs font-black uppercase tracking-[0.2em]"
          style={{ color: colors.accent }}
        >
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
        {/* Row 1: Trade + Revenue */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Trade
            </span>
            <select
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
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

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Monthly Revenue
            </span>
            <select
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-[#FF6B00]"
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
        </div>

        {/* Row 2: Lead Sources Multi-select */}
        <div>
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Main Lead Sources
          </span>
          <p className="mb-2 text-xs text-slate-400">Select all that apply</p>
          <div className="grid grid-cols-2 gap-2">
            {leadSourceOptions.map((source) => (
              <button
                key={source}
                type="button"
                onClick={() => toggleLeadSource(source)}
                className={`rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition ${
                  form.leadSources.includes(source)
                    ? "border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {source}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Biggest Bottleneck */}
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
            onChange={(e) =>
              setForm((current) => ({ ...current, biggestBottleneck: e.target.value }))
            }
          />
        </label>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="order-2 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 sm:order-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="submit"
          className="order-1 inline-flex flex-1 items-center justify-center rounded-lg px-8 py-4 text-center text-lg font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1 sm:order-2"
          style={{ backgroundColor: colors.accent }}
        >
          Submit Application
        </button>
      </div>
    </form>
  );
}

export default function BrandBuildersV5LandingPage() {
  const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const start = window.scrollY;
      const end = el.getBoundingClientRect().top + window.scrollY;
      const duration = 800;
      const startTime = performance.now();

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);

        window.scrollTo(0, start + (end - start) * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    smoothScrollTo(e, "apply-form");
  };

  return (
    <div className="bg-white font-sans text-slate-900 antialiased selection:bg-[#FF6B00]/20">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <Image
            src="/gregory-standal-sig-logo-blue.svg"
            alt="Greg Standal"
            width={180}
            height={40}
            className="h-10 w-auto"
          />
          <a
            href="#apply-form"
            onClick={scrollToForm}
            className="hidden items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:scale-105 active:scale-95 sm:flex"
            style={{ backgroundColor: colors.accent }}
          >
            Book Your Strategy Call
          </a>
        </div>
      </header>

      {/* ============================================ */}
      {/* SECTION 1 – HERO (ATF) */}
      {/* ============================================ */}
      <section className="overflow-hidden bg-white px-4 pb-20 pt-28 lg:pt-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* LEFT (copy) */}
          <div className="text-center lg:text-left">
            {/* Orange pill label - bigger with wobble animation */}
            <span
              className="mb-6 inline-flex items-center gap-3 rounded-lg px-10 py-5 text-xl font-black uppercase tracking-wider text-white shadow-xl animate-wobble md:text-2xl"
              style={{ backgroundColor: colors.accent }}
            >
              {heroLabel}
            </span>

            {/* Headline with accent-colored highlight */}
            <h1
              className="mb-6 text-4xl font-extrabold leading-[1.15] tracking-tight md:text-5xl lg:text-[3.5rem]"
              style={{ color: colors.primary }}
            >
              {heroHeadline.prefix}
              <span style={{ color: colors.accent }}>{heroHeadline.highlight}</span>
              {heroHeadline.suffix}
            </h1>

            {/* Subheadline */}
            <p className="mb-8 text-lg font-medium leading-relaxed text-slate-500 md:text-xl">
              {heroSubheadline}
            </p>

            {/* Bullets - vertical list */}
            <ul className="mb-8 space-y-3">
              {heroBullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 shrink-0 text-green-500" />
                  <span className="text-lg font-medium text-slate-700">{bullet}</span>
                </li>
              ))}
            </ul>

          </div>

          {/* RIGHT (form) */}
          <div id="apply-form" className="lg:pt-4">
            <TwoStepForm />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 2 – VSL + HOW IT WORKS */}
      {/* ============================================ */}
      <section className="border-y border-slate-200 bg-slate-50 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          {/* Section headline */}
          <h2
            className="mb-12 text-center text-3xl font-black tracking-tight md:text-5xl"
            style={{ color: colors.primary }}
          >
            {vslHeadline}
          </h2>

          {/* Full-width VSL */}
          <InlineVideoPlayer
            src={mainVslVideoSrc}
            poster="/vsl-cover.png"
            thumbnail="/vsl-cover.png"
            hoverVideoSrc={mainVslVideoSrc}
            naturalAspect={true}
            playOnHover={true}
            accentColor={colors.accent}
            className="mx-auto mb-16 w-full max-w-4xl border border-slate-200 shadow-2xl"
          />

          {/* 5 Phase Steps */}
          <div className="mb-12 space-y-6">
            {strategyPhases.map((step, idx) => (
              <div
                key={idx}
                className="group flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-md md:flex-row md:items-center md:p-10"
              >
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-3xl font-black text-white shadow-inner transition group-hover:scale-105"
                  style={{ backgroundColor: colors.primary }}
                >
                  {idx + 1}
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-black" style={{ color: colors.primary }}>
                    {step.title}
                  </h3>
                  <p className="text-lg font-medium leading-relaxed text-slate-600">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div className="flex justify-center">
            <a
              href="#apply-form"
              onClick={scrollToForm}
              className="inline-flex w-full items-center justify-center rounded-lg px-10 py-5 text-center text-[clamp(16px,4.5vw,22px)] font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1 md:w-auto"
              style={{ backgroundColor: colors.accent }}
            >
              Book Your Brand Strategy Call
            </a>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 3 – PROOF + FINAL CTA */}
      {/* ============================================ */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-6xl">
          {/* Headline */}
          <h2
            className="mb-12 text-center text-3xl font-black tracking-tight md:text-5xl"
            style={{ color: colors.primary }}
          >
            {proofHeadline}
          </h2>

          {/* 2-3 case tiles */}
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {caseTiles.map((tile) => (
              <div
                key={tile.trade}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:shadow-md"
              >
                <p className="mb-3 text-sm font-black uppercase tracking-widest text-slate-400">
                  {tile.trade} — {tile.location}
                </p>
                <p
                  className="mb-2 text-2xl font-black"
                  style={{ color: colors.accent }}
                >
                  {tile.result}
                </p>
                <p className="text-base font-medium text-slate-600">{tile.revenue}</p>
              </div>
            ))}
          </div>

          {/* Who this is for / not for */}
          <div className="mb-12 grid gap-8 md:grid-cols-2">
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

          {/* Final CTA */}
          <div className="text-center">
            <a
              href="#apply-form"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center rounded-lg px-10 py-5 text-center text-[clamp(16px,4.5vw,22px)] font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1"
              style={{ backgroundColor: colors.accent }}
            >
              Book Your Brand Strategy Call
            </a>
          </div>
        </div>
      </section>

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

      {/* Wobble Animation CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .animate-wobble {
          animation: wobble 5s ease infinite;
          transform-origin: center center;
        }
        @keyframes wobble {
          0% { transform: rotate(0deg); }
          3% { transform: rotate(3deg); }
          6% { transform: rotate(-3deg); }
          10% { transform: rotate(1.5deg); }
          13% { transform: rotate(-1.5deg); }
          16% { transform: rotate(0.75deg); }
          19% { transform: rotate(-0.75deg); }
          20% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
      `}} />
    </div>
  );
}
