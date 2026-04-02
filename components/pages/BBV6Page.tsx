"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Plus, Minus } from 'lucide-react';
import { InlineVideoPlayer } from '@/components/shared/video-player';
import { BrandBuildersV2Hero } from '@/components/heroes/BrandBuildersV2Hero';
import { BBV6Hero } from '@/components/heroes/BBV6Hero';
import { Step1Form } from '@/components/shared/Step1Form';
import { trackCtaClick } from '@/lib/ab-test/experiment';
import { useScrollTracking } from '@/lib/ab-test/useScrollTracking';
import type { ExperimentContext } from '@/lib/ab-test/types';

// Data
import { caseStudies, mainVslVideoSrc } from '@/lib/data/case-studies';

const colors = {
  primary: '#002542',
  accent: '#FF6B00',
};

const clientLogos = [
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-valley.jpg', alt: 'Valley' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-sensor-brite.jpg', alt: 'Sensor Brite' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-coldwell-banker.jpg', alt: 'Coldwell Banker' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-bissel.jpg', alt: 'Bissell' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-bella.jpg', alt: 'Bella' },
  { src: 'https://newcapepictures.com/wp-content/uploads/2025/07/logo-marmon-crane.jpg', alt: 'Marmon Crane' },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-black text-[#002542] group-hover:text-[#FF6B00] transition">
          {question}
        </span>
        {isOpen ? (
          <Minus className="w-5 h-5 shrink-0 text-[#FF6B00]" />
        ) : (
          <Plus className="w-5 h-5 shrink-0 text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="pb-6">
          <p className="text-slate-600 font-medium leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

interface BBV6PageProps {
  heroVariant: 'original' | 'swapped';
  context: ExperimentContext | null;
}

export function BBV6Page({ heroVariant, context }: BBV6PageProps) {
  // Track scroll depth
  useScrollTracking(context);

  const smoothScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, location: string) => {
    if (context) {
      trackCtaClick(context, location);
    }
    smoothScrollTo(e, 'cta-section');
  };

  return (
    <div className="bg-white text-slate-900 antialiased font-sans selection:bg-[#FF6B00]/20">
      {/* Hero - Swappable */}
      {heroVariant === 'original' ? (
        <BBV6Hero
          colors={colors}
          mainVslVideoSrc={mainVslVideoSrc}
          formComponent={<Step1Form context={context} />}
          context={context}
        />
      ) : (
        <>
          {/* Fixed header for swapped hero */}
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
          <BrandBuildersV2Hero
            colors={colors}
            mainVslVideoSrc={mainVslVideoSrc}
            onCtaClick={(e) => handleCtaClick(e, 'hero_primary')}
          />
        </>
      )}

      {/* Proof + Offer Section */}
      <section className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-[#002542]">
              Real Transformations, Real Results.
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium mb-8">
              See how contractors are using trust-building content to separate from the cheaper
              quote and generate more qualified booked estimates.
            </p>

            {/* Results bar */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-black text-[#FF6B00]">+27%</span>
                <span className="text-sm text-slate-500 font-medium">
                  avg. increase in booked estimates
                </span>
              </div>
              <div className="hidden md:block w-px bg-slate-200 self-stretch" />
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-black text-[#FF6B00]">42%</span>
                <span className="text-sm text-slate-500 font-medium">
                  avg. lift in lead-to-estimate conversion
                </span>
              </div>
              <div className="hidden md:block w-px bg-slate-200 self-stretch" />
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-black text-[#FF6B00]">
                  21 days
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  avg. time to first booked estimate
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-20 opacity-60">
              {clientLogos.map((logo, idx) => (
                <Image
                  key={idx}
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={56}
                  className="h-8 md:h-10 w-auto object-contain grayscale"
                />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {caseStudies.slice(0, 3).map((study, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200"
              >
                <InlineVideoPlayer
                  src={study.videoSrc}
                  poster={study.img}
                  thumbnail={study.thumbnail}
                  hoverVideoSrc={study.thumbnailVideo}
                  thumbnailFit="cover"
                  accentColor={colors.accent}
                  className="rounded-none aspect-video"
                  context={context}
                  videoTitle={`Case Study: ${study.title}`}
                />
                <div className="p-8">
                  <span
                    className="text-xs font-black uppercase tracking-widest mb-3 block"
                    style={{ color: colors.accent }}
                  >
                    {study.tag}
                  </span>
                  <h3 className="font-black text-[#002542] text-xl leading-snug mb-6">
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

          {/* What Happens on Call */}
          <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-xl border border-slate-200">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-6 text-[#002542]">
                  What Happens on Your Growth Plan Call?
                </h2>
                <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed">
                  We don&apos;t just show you pretty videos. We map out a contractor-specific system
                  built to earn trust and book estimates on auto-pilot.
                </p>
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                  You&apos;ll leave with:
                </p>
                <ul className="space-y-4">
                  {[
                    'Custom lead-flow map for your business',
                    'Estimate booking bottleneck diagnosis',
                    '90-day booked-estimate growth plan',
                    'Trust-building video asset roadmap',
                    'Clear next steps (whether we work together or not)',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-bold text-[#002542]">
                      <CheckCircle className="w-5 h-5 text-[#FF6B00] shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#002542] text-white p-8 rounded-3xl">
                <h3 className="text-2xl font-black mb-4">Who This Is For:</h3>
                <p className="text-slate-300 font-medium mb-6">
                  Home Improvement & Home Service contractors who have a real business but are tired
                  of chasing low-quality leads.
                </p>

                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Not for:
                </p>
                <ul className="text-slate-300 space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-500">✕</span> Brand-new contractors without proven
                    demand
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-500">✕</span> Owners unwilling to follow a process
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-500">✕</span> Businesses looking for cheap leads
                    only
                  </li>
                </ul>

                <a
                  href="#cta-section"
                  onClick={(e) => handleCtaClick(e, 'who_for_card')}
                  className="w-full bg-[#FF6B00] text-white py-4 rounded-lg font-black uppercase tracking-wider hover:-translate-y-1 transition text-center block"
                >
                  Apply for Your Plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + CTA Section */}
      <section className="py-24 px-4 bg-white" id="cta-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-8 text-[#002542]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-2 mb-12">
            <FAQItem
              question="Will this work for my specific trade?"
              answer="Yes. We have successfully implemented this system for painting, fencing, roofing, windows, HVAC, and general contracting. If homeowners need to trust you before they buy, this works."
            />
            <FAQItem
              question="What happens after I apply?"
              answer="First, you'll fill out a short qualification form so we can understand your numbers. If we're a fit, you'll be able to book a call directly on our calendar."
            />
            <FAQItem
              question="How much time does this take to set up?"
              answer="Our goal is to have your system live and generating leads within 30 days of our strategy session."
            />
            <FAQItem
              question="Who is this NOT a fit for?"
              answer="New startups with no track record or contractors looking for 'cheap leads' without building a real brand."
            />
          </div>

          {/* Risk reversal */}
          <p className="text-center text-slate-500 font-medium mb-24 max-w-2xl mx-auto">
            If we&apos;re not a fit, we&apos;ll tell you straight and point you to the next best step. No
            pressure, no games.
          </p>

          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-[#002542]">
              Take the First Step Toward More Booked Estimates
            </h2>
            <p className="text-xl text-slate-600 font-medium">
              Complete Step 1 below to see if you qualify.
            </p>
          </div>

          {/* Founder note */}
          <div className="max-w-2xl mx-auto mb-8 bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <p className="text-slate-600 font-medium leading-relaxed text-center">
              &quot;I started working with contractors because I saw how hard you work—and how little
              marketing actually earns your trust. My standard is simple: if we can&apos;t get you
              results, we&apos;ll tell you before we take your money.&quot;{' '}
              <span className="font-bold text-[#002542]">— Greg Standal</span>
            </p>
          </div>

          {/* Scarcity */}
          <p className="text-center text-sm text-slate-400 font-medium mb-8">
            We review 15 new Growth Plan applications per week to protect client results.
          </p>

          <div className="max-w-xl mx-auto">
            <Step1Form context={context} />
          </div>
        </div>
      </section>

      <footer className="py-12 bg-slate-900 text-center text-slate-500 text-sm font-medium">
        <Image
          src="/gregory-standal-sig-logo-white.svg"
          alt="Greg Standal"
          width={180}
          height={40}
          className="h-8 w-auto mx-auto mb-6 opacity-50"
        />
        <p>© {new Date().getFullYear()} New Cape Pictures. All rights reserved.</p>
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
