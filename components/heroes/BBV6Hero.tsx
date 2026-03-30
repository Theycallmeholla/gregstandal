"use client";

import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { InlineVideoPlayer } from '@/components/shared/video-player';

interface BBV6HeroProps {
  colors: {
    primary: string;
    accent: string;
  };
  mainVslVideoSrc: string;
  formComponent: React.ReactNode;
}

export function BBV6Hero({ colors, mainVslVideoSrc, formComponent }: BBV6HeroProps) {
  return (
    <section className="pt-32 pb-24 px-4 bg-white relative overflow-hidden">
      <header className="absolute top-0 left-0 w-full py-8 px-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <Image
            src="/gregory-standal-sig-logo-blue.svg"
            alt="Greg Standal"
            width={180}
            height={40}
            className="h-10 w-auto"
          />
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start relative z-10">
        <div className="lg:col-span-7">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6"
            style={{ color: colors.primary }}
          >
            Add <span style={{ color: colors.accent }}>20–30% More Booked Estimates</span> in 90
            Days for Contractors
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed font-medium max-w-2xl">
            We build the trust, follow-up, and booking system that turns more of your existing
            leads into qualified booked estimates.
          </p>
          <ul className="space-y-4 mb-6">
            {[
              'More Booked Estimates',
              'Higher Close Rates',
              'More Trust Before the First Appointment',
            ].map((bullet, idx) => (
              <li key={idx} className="flex items-center gap-3 text-lg font-bold text-[#002542]">
                <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-500 font-medium mb-10 border-l-2 border-slate-300 pl-4">
            For home improvement & home service contractors only. Not for brand-new businesses.
          </p>
          <InlineVideoPlayer
            src={mainVslVideoSrc}
            poster="/vsl-cover.png"
            hoverVideoSrc={mainVslVideoSrc}
            naturalAspect={true}
            playOnHover={true}
            accentColor={colors.accent}
            className="w-full shadow-2xl border border-slate-200"
          />
        </div>
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <p
            className="text-center text-sm font-black uppercase tracking-widest mb-3"
            style={{ color: colors.accent }}
          >
            Start Here ↓
          </p>
          {formComponent}
        </div>
      </div>
    </section>
  );
}
