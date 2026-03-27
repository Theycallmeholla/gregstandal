"use client";

import Image from "next/image";
import { CheckCircle, Calendar, ShieldCheck } from "lucide-react";
import { colors } from "../funnel-data";
import { InlineVideoPlayer } from "../video-player";

const highlightReelSrc = "https://assets.cdn.filesafe.space/57pQj4H29OMJVaQ75R5q/media/69c57a11ffe25a5d64f5f062.mp4";

export default function BrandBuildersV5ThankYouPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased selection:bg-[#FF6B00]/20">
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

      <main className="px-4 pb-24 pt-32">
        <div className="mx-auto max-w-4xl">
          {/* Success Header */}
          <div className="mb-12 text-center">
            <div
              className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full text-white shadow-xl"
              style={{ backgroundColor: "#22c55e" }}
            >
              <CheckCircle className="h-12 w-12" />
            </div>
            <h1
              className="mb-4 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
              style={{ color: colors.primary }}
            >
              Application Received
            </h1>
            <p className="mx-auto max-w-2xl text-xl font-medium leading-relaxed text-slate-600 md:text-2xl">
              We&apos;ll review your application and reach out within 24 hours if you&apos;re a fit for the 90-Day Booked Estimate Plan.
            </p>
          </div>

          {/* What Happens Next */}
          <div className="mb-10 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm md:p-12">
            <h2
              className="mb-8 text-2xl font-black tracking-tight md:text-3xl"
              style={{ color: colors.primary }}
            >
              What Happens Next
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl font-black text-white shadow-inner"
                  style={{ backgroundColor: colors.primary }}
                >
                  1
                </div>
                <div>
                  <p className="text-xl font-black text-slate-800 md:text-2xl">We review your application</p>
                  <p className="text-lg font-medium text-slate-500">Usually within 24 hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl font-black text-white shadow-inner"
                  style={{ backgroundColor: colors.primary }}
                >
                  2
                </div>
                <div>
                  <p className="text-xl font-black text-slate-800 md:text-2xl">If you&apos;re a fit, we send a calendar link</p>
                  <p className="text-lg font-medium text-slate-500">Check your email for next steps.</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl font-black text-white shadow-inner"
                  style={{ backgroundColor: colors.primary }}
                >
                  3
                </div>
                <div>
                  <p className="text-xl font-black text-slate-800 md:text-2xl">We hop on a strategy call</p>
                  <p className="text-lg font-medium text-slate-500">No pressure, just a conversation about your business.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Guarantee Box */}
          <div className="relative mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm md:p-10">
            <div
              className="absolute -top-6 left-8 flex h-12 w-12 rotate-12 items-center justify-center rounded-xl text-white shadow-lg"
              style={{ backgroundColor: colors.accent }}
            >
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3
              className="mb-3 ml-2 mt-2 text-2xl font-black"
              style={{ color: colors.primary }}
            >
              Ironclad Performance Guarantee
            </h3>
            <p className="ml-2 text-xl font-medium italic leading-relaxed text-slate-600">
              &ldquo;If we don&apos;t increase your booked estimates by at least 20% within 90 days, we work for free until we do.&rdquo;
            </p>
          </div>

          {/* Video Section - Autoplay like case studies */}
          <div className="mb-12">
            <p
              className="mb-6 text-center text-xs font-black uppercase tracking-[0.24em]"
              style={{ color: colors.accent }}
            >
              While You Wait
            </p>
            <InlineVideoPlayer
              src={highlightReelSrc}
              poster="https://newcapepictures.com/wp-content/uploads/2025/12/spectrum-case-studt-hero-1024x572.jpg"
              hoverVideoSrc={highlightReelSrc}
              thumbnailFit="cover"
              accentColor={colors.accent}
              className="w-full max-w-4xl mx-auto shadow-2xl border border-slate-200"
            />
          </div>

          {/* Check Inbox CTA */}
          <div className="text-center">
            <div
              className="inline-flex items-center gap-3 rounded-lg px-10 py-5 text-[clamp(16px,4.5vw,22px)] font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1"
              style={{ backgroundColor: colors.accent }}
            >
              <Calendar className="h-6 w-6" />
              Check Your Inbox
            </div>
            <p className="mt-4 text-sm font-bold uppercase tracking-widest text-slate-400">
              You&apos;ll receive next steps via email
            </p>
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
