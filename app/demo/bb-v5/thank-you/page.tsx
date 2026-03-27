"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, Mail, ShieldCheck } from "lucide-react";
import { clientLogos, offerBullets, colors, applyDescription, testimonialVideos } from "../funnel-data";
import { InlineVideoPlayer } from "../video-player";

export default function BrandBuildersV5ThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-[#FF6B00]/20">
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
          {/* Success Header */}
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1
              className="mb-4 text-3xl font-extrabold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl"
              style={{ color: colors.primary }}
            >
              Application Received
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600 md:text-xl">
              We&apos;ll review your application and reach out within 24-48 hours if you&apos;re a fit for the 90-Day Booked Estimate Plan.
            </p>
          </div>

          {/* Trust Logos */}
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
              Trusted by contractors nationwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {clientLogos.slice(0, 6).map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={100}
                  height={40}
                  className="h-8 w-auto object-contain opacity-50 grayscale"
                />
              ))}
            </div>
          </div>

          {/* Highlight Reel Video */}
          <div className="mb-8">
            <InlineVideoPlayer
              src={testimonialVideos.highlightReel}
              poster="/vsl-cover.png"
              naturalAspect={true}
              accentColor={colors.accent}
              className="w-full rounded-2xl border border-slate-200 shadow-lg"
            />
          </div>

          <div className="grid gap-6">
            {/* What You'll Get */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2
                className="mb-6 flex items-center gap-3 text-xl font-black md:text-2xl"
                style={{ color: colors.primary }}
              >
                <ShieldCheck className="h-6 w-6" style={{ color: colors.accent }} />
                What&apos;s Included in Your 90-Day Plan
              </h2>
              <ul className="space-y-4">
                {offerBullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-base font-medium text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantee Reminder */}
            <div
              className="rounded-2xl p-8 text-white shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              <h2 className="mb-4 flex items-center gap-3 text-lg font-black md:text-xl">
                <Clock className="h-6 w-6" style={{ color: colors.gold }} />
                Our Guarantee
              </h2>
              <p className="text-base font-medium leading-relaxed text-slate-200">
                {applyDescription}
              </p>
            </div>

            {/* Next Steps */}
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-8 text-center">
              <div className="mb-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500">
                <Mail className="h-4 w-4" />
                Check your inbox
              </div>
              <p className="text-base font-medium text-slate-600">
                If you&apos;re a fit, you&apos;ll receive a link to schedule your strategy call.
              </p>
              <Link
                href="/demo/bb-v5"
                className="mt-6 inline-flex rounded-lg border px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition hover:bg-slate-50"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-10 text-center">
        <div className="mb-4 flex justify-center">
          <Image
            src="/gregory-standal-sig-logo-blue.svg"
            alt="Greg Standal"
            width={160}
            height={36}
            className="h-8 w-auto opacity-60"
          />
        </div>
        <p className="text-sm font-medium text-slate-400">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </div>
  );
}
