"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

interface BBV5HeroProps {
  colors: {
    primary: string;
    accent: string;
  };
  formComponent: React.ReactNode;
  onPillClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const heroLabel = "STOP WASTING MONEY ON ADS";



const heroSubheadline = "We turn your marketing into a system that makes your estimate a formality";

const heroBullets = [
  "More Booked Estimates",
  "Higher Close Rates",
  "More Trust Before the First Appointment",
  "No long-term contracts. Contractors only.",
];

export function BBV5Hero({ colors, formComponent, onPillClick }: BBV5HeroProps) {
  const handlePillClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onPillClick) {
      onPillClick(e);
    } else {
      e.preventDefault();
      const el = document.getElementById('apply-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="overflow-hidden bg-white px-4 pb-20 pt-28 lg:pt-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        {/* LEFT (copy) */}
        <div className="text-center lg:text-left">
          {/* Orange pill label - clickable with wobble animation */}
          <a
            href="#apply-form"
            onClick={handlePillClick}
            className="mb-6 inline-flex items-center gap-3 rounded-lg px-10 py-5 text-xl font-black uppercase tracking-wider text-white shadow-xl animate-wobble cursor-pointer hover:scale-105 transition md:text-2xl"
            style={{ backgroundColor: colors.accent }}
          >
            {heroLabel}
          </a>

          {/* Headline with accent-colored highlight */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-black"
            style={{ color: colors.primary }}
          >
            Turn Your Marketing Into a System That Makes Your Estimate a Formality and Books{' '}
            <span style={{ color: colors.accent }}>20–30% More Qualified Jobs</span> in 90 Days.
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
          {formComponent}
        </div>
      </div>

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
    </section>
  );
}
