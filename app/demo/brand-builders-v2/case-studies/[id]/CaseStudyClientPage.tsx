"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Play, CheckCircle, ShieldCheck, Target, Layers, Trophy, ThumbsUp, BarChart } from 'lucide-react';

import type { CaseStudy } from '../data';
import { HlsVideoModal } from '../../video-player';

const colors = {
  primary: '#002542',
  accent: '#FF6B00',
  yellow: '#f1b40c',
};

function SectionShell({
  id,
  eyebrow,
  title,
  children,
  className = 'bg-white',
  titleClassName = 'text-[#002542]',
  layout = 'stacked',
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  layout?: 'stacked' | 'offset';
}) {
  if (layout === 'offset') {
    return (
      <section id={id} className={`px-4 py-24 md:py-32 ${className}`}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                {eyebrow ? (
                  <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-[#FF6B00]">
                    {eyebrow}
                  </p>
                ) : null}
                <h2 className={`text-4xl font-black tracking-tight md:text-5xl lg:text-5xl ${titleClassName}`}>
                  {title}
                </h2>
              </div>
            </div>
            <div className="lg:col-span-8 lg:pl-12">
              {children}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={`px-4 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 md:mb-16">
          {eyebrow ? (
            <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-[#FF6B00]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className={`max-w-4xl text-4xl font-black tracking-tight md:text-5xl lg:text-5xl ${titleClassName}`}>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

export default function CaseStudyClientPage({
  currentStudy,
}: {
  currentStudy: CaseStudy;
}) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

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

  const scrollToCTA = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    smoothScrollTo(e, 'cta-section');
  };

  return (
    <div className="bg-white font-sans text-slate-900 antialiased selection:bg-[#FF6B00]/20">
      <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <Link href="/demo/brand-builders-v2">
            <Image
              src="/gregory-standal-sig-logo-blue.svg"
              alt="Greg Standal"
              width={180}
              height={40}
              className="h-10 w-auto cursor-pointer transition hover:opacity-80"
            />
          </Link>
          <Link
            href="#cta-section"
            onClick={scrollToCTA}
            className="hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:scale-105 active:scale-95 sm:flex"
            style={{ backgroundColor: colors.accent }}
          >
            Book Your Strategy Call
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-white px-4 pb-24 pt-32 lg:pt-40">
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full px-8 py-3 text-lg md:text-xl font-black uppercase tracking-wide text-white shadow-xl" style={{ backgroundColor: colors.accent }}>
            {currentStudy.eyebrow}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-[#002542] mb-6 mx-auto">
            {currentStudy.title}
          </h1>

          <p className="text-lg md:text-2xl text-slate-600 mb-10 leading-relaxed font-medium mx-auto max-w-4xl">
            {currentStudy.subheadline}
          </p>

          <div className="flex justify-center mb-16">
            <Link
              href="#cta-section"
              onClick={scrollToCTA}
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[#FF6B00] px-10 py-5 text-center text-[clamp(16px,4.5vw,20px)] font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1"
            >
              Book Your Strategy Call
            </Link>
          </div>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="group relative mb-16 block w-full max-w-5xl mx-auto cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-black shadow-2xl"
          >
            <div className="relative aspect-video">
              <Image
                src={currentStudy.img}
                alt={currentStudy.title}
                fill
                className="object-cover opacity-70 transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#002542]/10 transition-colors group-hover:bg-transparent" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex h-20 w-20 items-center justify-center rounded-full shadow-2xl transition duration-300 group-hover:scale-110" style={{ backgroundColor: colors.yellow }}>
                  <Play className="ml-1 h-8 w-8 fill-black text-black" />
                </div>
              </div>
            </div>
          </button>

          <div className="rounded-3xl shadow-sm border border-slate-200 bg-white grid grid-cols-2 md:grid-cols-4 gap-4 p-8 mx-auto max-w-5xl relative overflow-hidden group divide-y-0 divide-x md:divide-slate-100">
            {currentStudy.heroStats.map((stat) => (
              <div
                key={stat}
                className="flex flex-col items-center justify-center text-center px-4"
              >
                <div className="text-lg md:text-xl font-black tracking-tight uppercase" style={{ color: colors.primary }}>
                  {stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionShell 
        title="At A Glance" 
        className="bg-slate-50 border-y border-slate-200"
        layout="offset"
        eyebrow="Executive Summary"
      >
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <p className="text-xl md:text-2xl leading-relaxed text-slate-700 font-medium first-letter:text-6xl first-letter:font-black first-letter:text-[#FF6B00] first-letter:float-left first-letter:mr-3 first-letter:mt-2">
            {currentStudy.snapshotCopy}
          </p>
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col h-fit">
            <div className="bg-slate-100 border-b border-slate-200 px-6 py-3">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Key Details</span>
            </div>
            <div className="p-6 md:p-8">
              <ul className="space-y-5">
                {currentStudy.snapshotBullets.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-lg font-bold text-[#002542] leading-snug">
                    <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-[#FF6B00]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell 
        title={
          <span className="flex flex-col gap-4">
            <Target className="h-12 w-12 text-[#FF6B00]" />
            The Problem
          </span>
        } 
        className="bg-white"
        layout="offset"
      >
        <div className="rounded-3xl border-l-[6px] border-[#FF6B00] bg-[#FF6B00]/5 p-8 md:p-12">
          <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-slate-700 font-medium">
            {currentStudy.problemCopy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell 
        title={
          <span className="flex flex-col gap-4">
            <Layers className="h-12 w-12 text-[#002542]" />
            What We Built
          </span>
        } 
        className="bg-slate-50 border-y border-slate-200 relative"
        layout="offset"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="relative rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-xl shadow-slate-200/50 -mt-4 lg:mt-0">
          <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-slate-700 font-medium">
            {currentStudy.strategyCopy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell 
        title={
          <span className="flex flex-col gap-4">
            <Trophy className="h-12 w-12 text-[#f1b40c]" />
            The Result
          </span>
        } 
        className="bg-[#002542] text-white" 
        titleClassName="text-white"
        layout="offset"
      >
        <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-slate-300 font-medium">
          {currentStudy.resultCopy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {currentStudy.quote ? (
            <blockquote className="relative mt-12 rounded-3xl border-l-12 border-[#FF6B00] bg-white/5 p-8 md:p-12 text-white shadow-xl backdrop-blur-sm">
              <div className="absolute top-4 left-6 text-[#FF6B00]/20 text-8xl font-serif leading-none select-none">&quot;</div>
              <p className="relative z-10 text-2xl md:text-3xl font-black leading-relaxed italic">
                &ldquo;{currentStudy.quote.text}&rdquo;
              </p>
              <p className="relative z-10 mt-8 text-base font-black uppercase tracking-[0.2em] text-[#f1b40c]">
                {currentStudy.quote.attribution}
              </p>
            </blockquote>
          ) : null}
        </div>
      </SectionShell>

      <SectionShell 
        title={
          <span className="flex flex-col gap-4">
            <ThumbsUp className="h-12 w-12 text-[#FF6B00]" />
            Why This Worked
          </span>
        } 
        className="bg-slate-50 border-y border-slate-200"
        layout="offset"
      >
        <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-slate-700 font-medium">
          {currentStudy.whyItWorked.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </SectionShell>

      <SectionShell 
        title={
          <span className="flex flex-col gap-4">
            <BarChart className="h-12 w-12 text-[#002542]" />
            Result Highlights
          </span>
        } 
        className="bg-white border-b border-slate-200"
        layout="offset"
      >
        <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-xl">
          <ul className="space-y-6">
            {currentStudy.resultBullets.map((item) => (
              <li key={item} className="flex items-start gap-5 text-xl md:text-2xl font-black text-[#002542] leading-snug">
                <CheckCircle className="mt-1 h-8 w-8 shrink-0 text-[#f1b40c]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </SectionShell>

      <section id="cta-section" className="bg-white px-4 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-8 inline-block rounded-full border border-[#FF6B00]/20 bg-[#FF6B00]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.24em] text-[#FF6B00]">
              Final Step
            </div>
            <h2 className="mb-8 text-5xl font-black leading-tight tracking-tight text-[#002542] lg:text-6xl">
              {currentStudy.ctaHeadline}
            </h2>
            <p className="mb-12 max-w-2xl text-xl font-medium leading-relaxed text-slate-600">
              {currentStudy.ctaCopy}
            </p>

            <ul className="mb-12 space-y-5 text-xl font-bold text-slate-700">
               <li className="flex items-center gap-4"><CheckCircle className="h-8 w-8 text-[#FF6B00]"/> Consistent inbound opportunities</li>
               <li className="flex items-center gap-4"><CheckCircle className="h-8 w-8 text-[#FF6B00]"/> Trust built before the first call</li>
               <li className="flex items-center gap-4"><CheckCircle className="h-8 w-8 text-[#FF6B00]"/> Focus on closing, not chasing</li>
            </ul>

            <div className="relative mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm md:p-10">
              <div className="absolute -top-6 left-8 flex h-14 w-14 rotate-12 items-center justify-center rounded-xl text-white shadow-lg" style={{ backgroundColor: colors.accent }}>
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="mb-3 ml-2 mt-2 text-3xl font-black text-[#002542]">
                Book Your Strategy Call
              </h3>
              <p className="ml-2 text-xl font-medium italic leading-relaxed text-slate-600">
                &ldquo;We&apos;ll map out the exact trust assets and messaging angles you need to convert more attention into qualified quotes.&rdquo;
              </p>
            </div>
          </div>

          <div className="relative min-h-[900px] rounded-3xl border border-slate-200 bg-white p-2 shadow-xl">
            <iframe
              src="https://link.cursivecrm.com/widget/booking/tRgGOQiQsmjldJZwy3JE"
              style={{ width: '100%', border: 'none', minHeight: '880px' }}
              id="ghYJkHL5Fkodr2z79LN0_1774367714803"
              title="Booking Calendar"
            />
            <Script src="https://link.cursivecrm.com/js/form_embed.js" strategy="afterInteractive" />
          </div>
        </div>
      </section>

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
          © {new Date().getFullYear()} New Cape Pictures. All rights reserved.
        </p>
      </footer>

      <HlsVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        src={currentStudy.videoSrc}
        poster={currentStudy.img}
      />
    </div>
  );
}
