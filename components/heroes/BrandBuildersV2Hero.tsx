"use client";

import { CheckCircle } from 'lucide-react';
import { InlineVideoPlayer } from '@/components/shared/video-player';
import type { ExperimentContext } from '@/lib/ab-test/types';

interface BrandBuildersV2HeroProps {
  colors: {
    primary: string;
    accent: string;
  };
  mainVslVideoSrc: string;
  onCtaClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  context?: ExperimentContext | null;
}

export function BrandBuildersV2Hero({
  colors,
  mainVslVideoSrc,
  onCtaClick,
  context,
}: BrandBuildersV2HeroProps) {
  return (
    <section className="pt-32 pb-16 px-4 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Wobble Badge - Clickable */}
        <a
          href="#cta-section"
          onClick={onCtaClick}
          className="inline-flex text-white px-10 py-5 rounded-lg font-black text-xl md:text-2xl shadow-xl items-center gap-3 uppercase mb-6 animate-wobble cursor-pointer hover:scale-105 transition"
          style={{ backgroundColor: colors.accent }}
        >
          Stop Wasting Money on Ads
        </a>

        {/* Headline */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-black"
          style={{ color: colors.primary }}
        >
          Add <span style={{ color: colors.accent }}>20–30% More Booked Estimates</span> in 90 Days
          for Home Improvement &amp; Home Service Contractors
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed font-medium mx-auto max-w-4xl">
          We turn your marketing into a system that makes your estimate a formality
        </p>

        {/* VSL Video */}
        <InlineVideoPlayer
          src={mainVslVideoSrc}
          poster="/vsl-cover.png"
          thumbnail="/vsl-cover.png"
          hoverVideoSrc={mainVslVideoSrc}
          naturalAspect={true}
          playOnHover={true}
          accentColor={colors.accent}
          className="w-full max-w-4xl mx-auto shadow-2xl mb-10 border border-slate-200"
          context={context}
          videoTitle="Hero VSL"
        />

        {/* Primary CTA */}
        <div className="flex flex-col items-center gap-4">
          <a
            href="#cta-section"
            onClick={onCtaClick}
            className="bg-[#FF6B00] text-white px-10 py-5 rounded-lg font-black transition shadow-xl hover:-translate-y-1 text-center uppercase w-full md:w-auto inline-flex items-center justify-center text-[clamp(16px,4.5vw,22px)] leading-none mx-auto"
          >
            Book Your Brand Strategy Call
          </a>

          {/* Benefits */}
          <div className="w-full max-w-4xl mx-auto mt-4">
            <p className="text-sm font-bold text-slate-400 mb-3 text-center uppercase tracking-widest">
              Built for contractors who want
            </p>
            <ul className="text-[#002542] font-bold text-[14px] sm:text-[15px] md:text-lg flex flex-col md:flex-row gap-4 md:gap-6 justify-center max-w-[320px] md:max-w-none mx-auto">
              <li className="flex items-start md:items-center gap-2 text-left">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-[2px] md:mt-0" />
                <span>More Booked Estimates</span>
              </li>
              <li className="flex items-start md:items-center gap-2 text-left">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-[2px] md:mt-0" />
                <span>Higher Close Rates</span>
              </li>
              <li className="flex items-start md:items-center gap-2 text-left w-full md:w-auto">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-[2px] md:mt-0" />
                <span className="leading-tight">More Trust Before the First Appointment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
