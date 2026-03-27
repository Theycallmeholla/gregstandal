"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { CheckCircle, X } from "lucide-react";
import { InlineVideoPlayer } from "./video-player";
import {
  colors,
  heroLabel,
  heroHeadline,
  heroSubheadline,
  heroBullets,
  heroCta,
  heroTrustLine,
  vslHeadline,
  mainVslVideoSrc,
  processSteps,
  proofHeadline,
  caseTiles,
  perfectFit,
  notAFit,
  tradeOptions,
  MiniFormData,
} from "./funnel-data";
import { writeMiniForm } from "./funnel-storage";

function MiniForm({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<MiniFormData>({
    firstName: "",
    companyName: "",
    email: "",
    phone: "",
    trade: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    writeMiniForm(form);
    router.push("/demo/bb-v5/apply");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl border border-slate-200 bg-white p-8 shadow-xl ${className}`}
    >
      <div className="mb-6">
        <p
          className="mb-2 text-xs font-black uppercase tracking-[0.24em]"
          style={{ color: colors.accent }}
        >
          Free Application
        </p>
        <h3 className="text-2xl font-black" style={{ color: colors.primary }}>
          {heroCta}
        </h3>
      </div>

      <div className="grid gap-4">
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

        <label className="grid gap-2">
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
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center rounded-lg px-8 py-4 text-center text-[clamp(16px,4.5vw,20px)] font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1"
        style={{ backgroundColor: colors.accent }}
      >
        {heroCta}
      </button>
    </form>
  );
}

export default function BrandBuildersV5LandingPage() {
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
          <Link
            href="/demo/bb-v5/apply"
            className="hidden items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:scale-105 active:scale-95 sm:flex"
            style={{ backgroundColor: colors.accent }}
          >
            {heroCta}
          </Link>
        </div>
      </header>

      {/* ============================================ */}
      {/* SECTION 1 – HERO (ATF) */}
      {/* ============================================ */}
      <section className="overflow-hidden bg-white px-4 pb-20 pt-28 lg:pt-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* LEFT (copy) */}
          <div>
            {/* Tiny label */}
            <p className="mb-6 text-xs font-black uppercase tracking-[0.15em] text-slate-400">
              {heroLabel}
            </p>

            {/* Headline */}
            <h1
              className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
              style={{ color: colors.primary }}
            >
              {heroHeadline}
            </h1>

            {/* Subheadline */}
            <p className="mb-8 text-xl font-medium leading-relaxed text-slate-600 md:text-2xl">
              {heroSubheadline}
            </p>

            {/* 3 bullets */}
            <ul className="mb-8 space-y-4">
              {heroBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-green-500" />
                  <span className="text-lg font-medium text-slate-700">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Primary button (mobile only - desktop uses form) */}
            <Link
              href="/demo/bb-v5/apply"
              className="mb-4 inline-flex w-full items-center justify-center rounded-lg px-10 py-5 text-center text-[clamp(16px,4.5vw,22px)] font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1 lg:hidden"
              style={{ backgroundColor: colors.accent }}
            >
              {heroCta}
            </Link>

            {/* Tiny trust line */}
            <p className="text-sm font-medium text-slate-400">{heroTrustLine}</p>
          </div>

          {/* RIGHT (form) */}
          <div className="lg:pt-4">
            <MiniForm />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 2 – VSL + HOW IT WORKS */}
      {/* ============================================ */}
      <section className="border-y border-slate-200 bg-slate-50 px-4 py-24">
        <div className="mx-auto max-w-7xl">
          {/* Section headline */}
          <h2
            className="mb-12 text-center text-3xl font-black tracking-tight md:text-5xl"
            style={{ color: colors.primary }}
          >
            {vslHeadline}
          </h2>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            {/* LEFT: VSL embed */}
            <InlineVideoPlayer
              src={mainVslVideoSrc}
              poster="/vsl-cover.png"
              hoverVideoSrc={mainVslVideoSrc}
              naturalAspect={true}
              playOnHover={true}
              accentColor={colors.accent}
              className="w-full shadow-2xl border border-slate-200"
            />

            {/* RIGHT: 3 steps */}
            <div className="space-y-6">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="flex items-start gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl font-black text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {step.number}
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-black" style={{ color: colors.primary }}>
                      {step.title}
                    </h3>
                    <p className="text-base font-medium leading-relaxed text-slate-600">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* CTA button under steps */}
              <Link
                href="/demo/bb-v5/apply"
                className="inline-flex w-full items-center justify-center rounded-lg px-10 py-5 text-center text-[clamp(16px,4.5vw,22px)] font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1"
                style={{ backgroundColor: colors.accent }}
              >
                {heroCta}
              </Link>
            </div>
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
            <Link
              href="/demo/bb-v5/apply"
              className="inline-flex items-center justify-center rounded-lg px-10 py-5 text-center text-[clamp(16px,4.5vw,22px)] font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1"
              style={{ backgroundColor: colors.accent }}
            >
              {heroCta}
            </Link>
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
    </div>
  );
}
