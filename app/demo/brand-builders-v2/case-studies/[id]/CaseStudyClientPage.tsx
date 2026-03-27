"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { CheckCircle, ShieldCheck, Target, Layers, Trophy, ThumbsUp, BarChart, ArrowRight, Play } from 'lucide-react';

import type { CaseStudy } from '../data';
import { InlineVideoPlayer } from '../../video-player';

const colors = {
  primary: '#002542',
  accent: '#FF6B00',
  yellow: '#ff6b00',
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
  relatedStudies,
}: {
  currentStudy: CaseStudy;
  relatedStudies: CaseStudy[];
}) {
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
            className="hidden items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:scale-105 active:scale-95 sm:flex"
            style={{ backgroundColor: colors.accent }}
          >
            Book Your Strategy Call
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-white px-4 pb-24 pt-32 lg:pt-40">
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <div className="mb-8 inline-flex items-center gap-3 rounded-lg px-8 py-3 text-lg md:text-xl font-black uppercase tracking-wide text-white shadow-xl" style={{ backgroundColor: colors.accent }}>
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
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-[#FF6B00] px-10 py-5 text-center text-[clamp(16px,4.5vw,20px)] font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1"
            >
              Book Your Strategy Call
            </Link>
          </div>

          <InlineVideoPlayer
            src={currentStudy.videoSrc}
            poster={currentStudy.thumbnail || currentStudy.img}
            thumbnail={currentStudy.thumbnail}
            hoverVideoSrc={currentStudy.thumbnailVideo}
            accentColor={colors.accent}
            className="w-full max-w-5xl mx-auto shadow-2xl mb-16 border border-slate-200"
          />

          <div className="rounded-3xl shadow-lg bg-[#002542] grid md:grid-cols-3 gap-8 p-10 md:p-12 mx-auto max-w-5xl relative overflow-hidden divide-y md:divide-y-0 md:divide-x divide-white/20">
            {currentStudy.heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center text-center py-4"
              >
                <div className="text-4xl md:text-5xl font-black mb-3 text-[#ff6b00]">
                  {stat.value}
                </div>
                <div className="text-sm font-bold tracking-wider uppercase text-white">
                  {stat.label}
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
            <Trophy className="h-12 w-12 text-[#ff6b00]" />
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
              <p className="relative z-10 mt-8 text-base font-black uppercase tracking-[0.2em] text-[#ff6b00]">
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
                <CheckCircle className="mt-1 h-8 w-8 shrink-0 text-[#ff6b00]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </SectionShell>

      <section id="cta-section" className="bg-white px-4 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-8 inline-block rounded-lg border border-[#FF6B00]/20 bg-[#FF6B00]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.24em] text-[#FF6B00]">
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

      {relatedStudies.length > 0 && (
        <section className="bg-slate-100 px-4 py-24 md:py-32 border-t border-slate-200">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-[#FF6B00]">
                Keep Reading
              </p>
              <h2 className="text-4xl font-black tracking-tight text-[#002542] md:text-5xl">
                More Success Stories
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedStudies.map((study) => (
                <Link
                  key={study.videoId}
                  href={`/demo/brand-builders-v2/case-studies/${study.videoId}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-200">
                    {study.thumbnailVideo ? (
                      <video
                        src={study.thumbnailVideo}
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                        poster={study.img}
                      />
                    ) : (
                      <Image
                        src={study.img}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <span className="rounded-full bg-[#FF6B00] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                        {study.tag}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl">
                        <Play className="h-6 w-6 fill-[#002542] text-[#002542] ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-4 text-lg font-black leading-tight text-[#002542] line-clamp-3 group-hover:text-[#FF6B00] transition-colors">
                      {study.title}
                    </h3>

                    <div className="mt-auto flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#FF6B00]">
                      View Case Study
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
    </div>
  );
}
