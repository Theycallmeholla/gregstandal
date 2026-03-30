"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Star, ShieldCheck, CheckCircle } from 'lucide-react';
import { InlineVideoPlayer } from '@/components/shared/video-player';
import { BrandBuildersV2Hero } from '@/components/heroes/BrandBuildersV2Hero';
import { BBV5Hero } from '@/components/heroes/BBV5Hero';
import { TwoStepForm } from '@/components/shared/TwoStepForm';
import { trackCtaClick } from '@/lib/ab-test/experiment';
import type { ExperimentContext } from '@/lib/ab-test/types';

// Data
import {
  caseStudies,
  mainVslVideoSrc,
  testimonialVideos,
} from '@/lib/data/case-studies';

const colors = {
  primary: '#002542',
  accent: '#FF6B00',
  yellow: '#ff6b00',
};

const clientLogos = [
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-valley.jpg', alt: 'Valley' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-sensor-brite.jpg', alt: 'Sensor Brite' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-coldwell-banker.jpg', alt: 'Coldwell Banker' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-bissel.jpg', alt: 'Bissell' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-bella.jpg', alt: 'Bella' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-marmon-crane.jpg', alt: 'Marmon Crane' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-topilow.jpg', alt: 'Topilow' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/08/logo-spectrum.jpg', alt: 'Spectrum' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-jan-fence.jpg', alt: 'Jan Fence' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-housemaster.jpg', alt: 'HouseMaster' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-general-steel.jpg', alt: 'General Steel' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-george-apap.jpg', alt: 'George Apap' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-ag-williams.jpg', alt: 'AG Williams' },
];

const stats = [
  { value: '20-30%', label: 'Avg. Lift In Lead Gen' },
  { value: '$12M+', label: 'Generated Revenue' },
  { value: '30 Days', label: 'Launch Timeline' },
];

const reviewScreenshots = [
  { src: '/Irwin_Stromeyer_review.png', width: 1304, height: 628 },
  { src: '/Joe_Abela_review.png', width: 1304, height: 348 },
  { src: '/Thomas_Miller_review.png', width: 1304, height: 588 },
  { src: '/Natalie_M_review.png', width: 1304, height: 508 },
  { src: '/Christine_Thares_review.png', width: 1304, height: 348 },
  { src: '/John_Stahl_review.png', width: 1304, height: 428 },
];

interface BrandBuildersV2PageProps {
  heroVariant: 'original' | 'swapped';
  context: ExperimentContext | null;
  category?: string;
}

export function BrandBuildersV2Page({ heroVariant, context, category = 'contractors' }: BrandBuildersV2PageProps) {
  const smoothScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetId: string
  ) => {
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

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, location: string) => {
    if (context) {
      trackCtaClick(context, location);
    }
    smoothScrollTo(e, 'cta-section');
  };

  return (
    <div className="bg-white text-slate-900 antialiased font-sans selection:bg-[#FF6B00]/20">
      {/* Header */}
      <header className="w-full z-50 bg-white border-b border-slate-200 py-4 fixed top-0 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
          <Image
            src="/gregory-standal-sig-logo-blue.svg"
            alt="Greg Standal"
            width={180}
            height={40}
            className="h-10 w-auto cursor-pointer hover:opacity-80 transition"
          />
        </div>
      </header>

      {/* Hero - Swappable */}
      {heroVariant === 'original' ? (
        <BrandBuildersV2Hero
          colors={colors}
          mainVslVideoSrc={mainVslVideoSrc}
          onCtaClick={(e) => handleCtaClick(e, 'hero_primary')}
        />
      ) : (
        <BBV5Hero
          colors={colors}
          formComponent={<TwoStepForm context={context} redirectPath={`/${category}/thank-you`} />}
        />
      )}

      {/* VSL + Phases Section - Only show when hero is swapped (since swapped hero has no video) */}
      {heroVariant === 'swapped' && (
        <section className="border-y border-slate-200 bg-slate-50 px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <h2
              className="mb-12 text-center text-3xl font-black tracking-tight md:text-5xl"
              style={{ color: colors.primary }}
            >
              More Booked Estimates Without More &apos;Leads&apos;
            </h2>

            <InlineVideoPlayer
              src={mainVslVideoSrc}
              poster="/vsl-cover.png"
              thumbnail="/vsl-cover.png"
              hoverVideoSrc={mainVslVideoSrc}
              naturalAspect={true}
              playOnHover={true}
              accentColor={colors.accent}
              className="w-full max-w-4xl mx-auto shadow-2xl mb-16 border border-slate-200"
            />

            <div className="mb-12 space-y-6">
              {[
                { title: "Phase 1 — Position You as the Local Authority", desc: "Define the exact customer profile, the painful problem, and the solution they're desperate for." },
                { title: "Phase 2 — Core Video Assets", desc: "Brand film + story-driven case studies showing real transformations and results." },
                { title: "Phase 3 — Custom Booking System Building", desc: "Give homeowners a clear, undeniable reason to choose you over 5 other quotes." },
                { title: "Phase 4 — YouTube Authority + Email Newsletter", desc: "Build authority and humanize your brand while constantly nurturing new and existing audiences." },
                { title: "Phase 5 — Run Ads", desc: "We drive paid traffic to this trust building content ecosystem to generate sales opportunities on auto-pilot." },
              ].map((step, idx) => (
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

            <div className="flex justify-center">
              <a
                href="#cta-section"
                onClick={(e) => handleCtaClick(e, 'vsl_section')}
                className="inline-flex w-full items-center justify-center rounded-lg px-10 py-5 text-center text-[clamp(16px,4.5vw,22px)] font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1 md:w-auto"
                style={{ backgroundColor: colors.accent }}
              >
                Book Your Brand Strategy Call
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Social Proof Section */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-10">
            Trusted by ambitious brands across the country
          </p>

          {/* Logos Carousel */}
          <div className="relative mb-16 overflow-hidden mask-image-edges">
            <div className="flex animate-scroll gap-12 items-center">
              {[...clientLogos, ...clientLogos].map((logo, idx) => (
                <Image
                  key={idx}
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={56}
                  className="h-10 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition duration-300 opacity-60 hover:opacity-100 shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-3xl shadow-sm border border-slate-200 bg-white grid md:grid-cols-3 gap-8 p-10 md:p-12 mb-10 relative overflow-hidden group divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center py-4">
                <div
                  className="text-4xl md:text-5xl font-black mb-3"
                  style={{ color: colors.accent }}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-bold tracking-wider uppercase text-[#002542]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-8">
            <a
              href="#cta-section"
              onClick={(e) => handleCtaClick(e, 'proof_section')}
              className="bg-[#FF6B00] text-white px-10 py-5 rounded-lg font-black transition shadow-xl hover:-translate-y-1 text-center uppercase w-full md:w-auto inline-flex items-center justify-center text-[clamp(16px,4.5vw,22px)] leading-none mx-auto"
            >
              Book Your Brand Strategy Call
            </a>
          </div>
        </div>
      </section>

      {/* Case Study Grid */}
      <section className="py-24 px-4 bg-white" id="video-case-study">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-[#002542]">
              Real Transformations, Real Results.
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
              See how contractors are using trust-building content and better positioning to
              generate more booked estimates, better-fit leads, and stronger close rates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {caseStudies.slice(0, 3).map((study, idx) => (
              <div
                key={idx}
                className="group flex flex-col bg-slate-50 rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition duration-300"
              >
                <InlineVideoPlayer
                  src={study.videoSrc}
                  poster={study.img}
                  thumbnail={study.thumbnail}
                  hoverVideoSrc={study.thumbnailVideo}
                  thumbnailFit="cover"
                  accentColor={colors.accent}
                  className="rounded-none rounded-t-2xl"
                />
                <div className="p-8 flex-1 flex flex-col">
                  <span
                    className="text-xs font-black uppercase tracking-widest mb-3"
                    style={{ color: colors.accent }}
                  >
                    {study.tag}
                  </span>
                  <h3 className="font-black text-[#002542] text-xl leading-snug mb-6 flex-1">
                    {study.title}
                  </h3>
                  <Link
                    href={`/contractors/case-studies/${study.videoId}`}
                    className="block text-center text-sm font-black border border-[#002542] rounded-lg py-3 bg-[#002542] text-white hover:bg-transparent hover:text-[#002542] transition uppercase tracking-wider w-full"
                  >
                    View Case Study
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Mid-page CTA */}
          <div className="bg-[#002542] rounded-3xl p-10 md:p-16 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div>
              <h3 className="text-3xl font-black text-white mb-3">
                Want results like these for your business?
              </h3>
              <p className="text-slate-300 font-medium text-lg">
                Book your Brand Strategy Call and we&apos;ll map out how your contractor brand can
                earn more trust, book more estimates, and close more jobs.
              </p>
            </div>
            <a
              href="#cta-section"
              onClick={(e) => handleCtaClick(e, 'midpage_cta')}
              className="bg-[#FF6B00] text-white px-10 py-5 rounded-lg font-black transition shadow-xl hover:-translate-y-1 text-center uppercase w-full md:w-auto inline-flex items-center justify-center text-[clamp(16px,4.5vw,22px)] leading-none mx-auto"
            >
              Book Your Brand Strategy Call
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {caseStudies.slice(3, 5).map((study, idx) => (
              <div
                key={idx}
                className="group flex flex-col bg-slate-50 rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition duration-300"
              >
                <InlineVideoPlayer
                  src={study.videoSrc}
                  poster={study.img}
                  thumbnail={study.thumbnail}
                  hoverVideoSrc={study.thumbnailVideo}
                  thumbnailFit="cover"
                  accentColor={colors.accent}
                  className="rounded-none rounded-t-2xl"
                />
                <div className="p-8 flex-1 flex flex-col">
                  <span
                    className="text-xs font-black uppercase tracking-widest mb-3"
                    style={{ color: colors.accent }}
                  >
                    {study.tag}
                  </span>
                  <h3 className="font-black text-[#002542] text-xl leading-snug mb-6 flex-1">
                    {study.title}
                  </h3>
                  <Link
                    href={`/contractors/case-studies/${study.videoId}`}
                    className="block text-center text-sm font-black border border-[#002542] rounded-lg py-3 bg-[#002542] text-white hover:bg-transparent hover:text-[#002542] transition uppercase tracking-wider w-full"
                  >
                    View Case Study
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section
        className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://newcapepictures.com/wp-content/uploads/2025/12/landingsteps-blueprint.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-white/95"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#002542]">
              What We Map Out on Your Strategy Call
            </h2>
            <p className="text-xl text-slate-600 font-medium">
              The contractor-specific growth system that helps homeowners trust you sooner, book
              faster, and choose you over lower-priced competitors.
            </p>
          </div>

          <InlineVideoPlayer
            src={testimonialVideos.highlightReel}
            poster="https://newcapepictures.com/wp-content/uploads/2025/12/spectrum-case-studt-hero-1024x572.jpg"
            hoverVideoSrc={testimonialVideos.highlightReel}
            thumbnailFit="cover"
            accentColor={colors.yellow}
            className="w-full max-w-4xl mx-auto shadow-2xl mb-16 border border-slate-200"
          />

          <div className="space-y-6 mb-16">
            {[
              {
                title: 'Phase 1 — Position You as the Local Authority',
                desc: "Define the exact customer profile, the painful problem, and the solution they're desperate for.",
              },
              {
                title: 'Phase 2 — Core Video Assets',
                desc: 'Brand film + story-driven case studies showing real transformations and results.',
              },
              {
                title: 'Phase 3 — Custom Booking System Building',
                desc: 'Give homeowners a clear, undeniable reason to choose you over 5 other quotes.',
              },
              {
                title: 'Phase 4 — YouTube Authority + Email Newsletter',
                desc: 'Build authority and humanize your brand while constantly nurturing new and existing audiences.',
              },
              {
                title: 'Phase 5 — Run Ads',
                desc: 'We drive paid traffic to this trust building content ecosystem to generate sales opportunities on auto-pilot.',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 md:items-center hover:shadow-md transition duration-300 group"
              >
                <div
                  className="w-16 h-16 rounded-xl shrink-0 flex items-center justify-center font-black text-3xl shadow-inner group-hover:scale-105 transition transform text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-2 text-[#002542]">{step.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="bg-white border-l-8 p-8 md:p-12 rounded-r-3xl shadow-lg mb-12 text-xl md:text-2xl font-black text-slate-700 italic"
            style={{ borderColor: colors.accent }}
          >
            &ldquo;On your free 30‑minute strategy call, we&apos;ll show you where homeowners are
            dropping off, where trust is being lost, and what your 90-day contractor growth plan
            could look like.&rdquo;
          </div>

          <div className="flex justify-center">
            <a
              href="#cta-section"
              onClick={(e) => handleCtaClick(e, 'how_it_works')}
              className="bg-[#FF6B00] text-white px-10 py-5 rounded-lg font-black transition shadow-xl hover:-translate-y-1 text-center uppercase w-full md:w-auto inline-flex items-center justify-center text-[clamp(16px,4.5vw,22px)] leading-none mx-auto"
            >
              Book Your Brand Strategy Call
            </a>
          </div>
        </div>
      </section>

      {/* Review Wall */}
      <section className="py-24 bg-[#002542] text-white overflow-hidden flex flex-col items-center">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight max-w-4xl mx-auto">
              Millions in trackable revenue generated for contractors just like you
            </h2>
            <div className="flex items-center justify-center gap-2 text-[#f1b40c]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-current drop-shadow-sm" />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full relative py-8 mb-16">
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, #002542 0%, transparent 10%, transparent 90%, #002542 100%)',
            }}
          ></div>
          <div className="flex animate-scroll-reviews gap-8 items-center w-max px-8">
            {[...reviewScreenshots, ...reviewScreenshots].map((review, idx) => (
              <div
                key={`${review.src}-${idx}`}
                className="shrink-0 rounded-2xl overflow-hidden shadow-2xl transform transition duration-500 hover:scale-[1.02] hover:-rotate-1 cursor-pointer bg-white"
              >
                <Image
                  src={review.src}
                  alt="Google Review Screenshot"
                  width={review.width}
                  height={review.height}
                  className="h-auto w-[380px] md:w-[500px] lg:w-[650px]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center w-full">
          <a
            href="#cta-section"
            onClick={(e) => handleCtaClick(e, 'review_wall')}
            className="bg-[#FF6B00] text-white px-8 py-4 rounded-lg font-black transition shadow-md hover:-translate-y-1 text-center uppercase w-full md:w-auto inline-flex items-center justify-center text-[clamp(14px,4.5vw,18px)] leading-none mx-auto"
          >
            Book Your Brand Strategy Call
          </a>
        </div>
      </section>

      {/* Contrast Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#002542] tracking-tight">
              More Than Video — A Contractor-Specific System Built to Turn Existing Attention Into
              More Booked Estimates
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
              Most video vendors hand over assets and call it a day. Our system is built to help
              home improvement and home service contractors turn the attention they already have
              into more qualified booked estimates, better close rates, and stronger trust before
              the estimate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto mb-12">
            {/* Old Way */}
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm flex flex-col">
              <h3 className="text-2xl font-black text-slate-400 mb-8 uppercase tracking-widest border-b border-slate-100 pb-6">
                What Most Video Vendors Deliver
              </h3>
              <ul className="space-y-6 flex-1 text-lg font-bold text-slate-600">
                {[
                  'A polished video with no real conversion plan',
                  'Content disconnected from your sales process',
                  "Messaging that doesn't separate you from competitors",
                  'Traffic coming in without enough trust to book',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-slate-400 font-black">X</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* New Way */}
            <div
              className="bg-[#002542] rounded-3xl p-8 md:p-12 shadow-xl flex flex-col relative overflow-hidden"
              style={{ border: `4px solid ${colors.accent}` }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <h3 className="text-2xl font-black text-white mb-8 border-b border-white/10 pb-6 leading-snug">
                What You Get With Our Constructive Video Funnel Blueprint
              </h3>
              <ul className="space-y-6 flex-1 text-lg font-bold text-slate-200">
                {[
                  'A trust-building system that supports your sales process',
                  'Project stories and proof assets that make homeowners feel confident booking',
                  'Messaging that separates you from the cheaper quote',
                  'A rollout plan that improves booked estimates and close rate over time',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle className="w-8 h-8 text-[#ff6b00] shrink-0 mt-0.5" />
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="#cta-section"
              onClick={(e) => handleCtaClick(e, 'contrast_section')}
              className="bg-[#FF6B00] text-white px-10 py-5 rounded-lg font-black transition shadow-xl hover:-translate-y-1 text-center uppercase w-full md:w-auto inline-flex items-center justify-center text-[clamp(16px,4.5vw,22px)] leading-none mx-auto"
            >
              Book Your Brand Strategy Call
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta-section" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-1.5 bg-[#FF6B00]/10 text-[#FF6B00] font-black uppercase text-xs rounded-lg mb-8 tracking-widest border border-[#FF6B00]/20">
              Limited Availability
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight text-[#002542]">
              Add 20–30% More Booked Estimates in 90 Days — Starting With One Strategy Call
            </h2>
            <ul className="space-y-5 mb-12 text-xl font-bold text-slate-700">
              <li className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-[#FF6B00]" /> More booked estimates
              </li>
              <li className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-[#FF6B00]" /> Higher close rates
              </li>
              <li className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-[#FF6B00]" /> Better-fit homeowners
              </li>
              <li className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-[#FF6B00]" /> More predictable revenue
              </li>
            </ul>

            <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl mt-12 relative shadow-sm">
              <div
                className="absolute -top-6 left-8 text-white w-12 h-12 flex items-center justify-center rounded-xl shadow-lg rotate-12"
                style={{ backgroundColor: colors.accent }}
              >
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-black text-2xl text-[#002542] mb-3 ml-2 mt-2">
                Ironclad Performance Guarantee
              </h3>
              <p className="text-slate-600 text-xl font-medium leading-relaxed italic ml-2">
                &ldquo;If we don&apos;t create a measurable lift in qualified leads or close rate within
                6 months, we&apos;ll keep working for free until we do.&rdquo;
              </p>
            </div>
          </div>

          <div className="bg-white p-2 rounded-2xl shadow-xl relative border border-slate-200 min-h-[900px]">
            <iframe
              src="https://link.cursivecrm.com/widget/booking/tRgGOQiQsmjldJZwy3JE"
              style={{ width: '100%', border: 'none', minHeight: '880px' }}
              id="ghYJkHL5Fkodr2z79LN0_1774367714803"
              title="Booking Calendar"
            />
            <Script
              src="https://link.cursivecrm.com/js/form_embed.js"
              strategy="afterInteractive"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800 text-center">
        <div className="mb-6 flex justify-center">
          <Image
            src="/gregory-standal-sig-logo-white.svg"
            alt="Greg Standal"
            width={216}
            height={48}
            className="h-12 w-auto opacity-80"
          />
        </div>
        <p className="font-medium text-slate-500 text-sm">
          © {new Date().getFullYear()} New Cape Pictures. All rights reserved.
        </p>
      </footer>

      {/* Global CSS for Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        .mask-image-edges {
            -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .animate-scroll {
            animation: scroll 40s linear infinite;
        }
        .animate-scroll-reviews {
            animation: scroll-reviews 120s linear infinite;
        }
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
        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-250px * 8)); }
        }
        @keyframes scroll-reviews {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
