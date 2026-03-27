"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { caseStudies, mainVslVideoSrc } from '../brand-builders-v2/case-studies/data';
import { InlineVideoPlayer } from './video-player';
import {
  CheckCircle,
  ArrowRight,
  Plus,
  Minus,
} from 'lucide-react';

const colors = {
  primary: '#002542',
  accent: '#FF6B00',
};

const clientLogos = [
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-valley.jpg", alt: "Valley" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-sensor-brite.jpg", alt: "Sensor Brite" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-coldwell-banker.jpg", alt: "Coldwell Banker" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-bissel.jpg", alt: "Bissell" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-bella.jpg", alt: "Bella" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-marmon-crane.jpg", alt: "Marmon Crane" },
];

function Step1Form({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/demo/bb-v6/apply');
  };

  return (
    <form onSubmit={handleSubmit} className={`bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-200 ${className}`}>
      <h3 className="text-xl font-black text-[#002542] mb-6 uppercase tracking-tight text-center">Step 1: Get Your Free Assessment</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Full Name</label>
          <input 
            required
            type="text" 
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Email Address</label>
          <input 
            required
            type="email" 
            placeholder="john@company.com"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Phone Number</label>
          <input 
            required
            type="tel" 
            placeholder="(555) 000-0000"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Company / Trade</label>
          <input 
            required
            type="text" 
            placeholder="Roofing / Windows / HVAC"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#FF6B00] text-white py-4 rounded-lg font-black uppercase tracking-wider hover:-translate-y-1 transition shadow-lg flex items-center justify-center gap-2 mt-4"
        >
          Next Step: Answer 5 Quick Questions <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-center text-sm text-slate-500 mt-4">
          Takes ~30 seconds. We'll review and show you if we can add 20–30% more booked estimates in 90 days.
        </p>
      </div>
    </form>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-black text-[#002542] group-hover:text-[#FF6B00] transition">{question}</span>
        {isOpen ? <Minus className="w-5 h-5 shrink-0 text-[#FF6B00]" /> : <Plus className="w-5 h-5 shrink-0 text-slate-400" />}
      </button>
      {isOpen && (
        <div className="pb-6">
          <p className="text-slate-600 font-medium leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function BBV6LandingPage() {
  const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-slate-900 antialiased font-sans selection:bg-[#FF6B00]/20">
      
      {/* 1. SECTION 1: HERO + FIRST CAPTURE */}
      <section className="pt-32 pb-24 px-4 bg-white relative overflow-hidden">
        <header className="absolute top-0 left-0 w-full py-8 px-4">
          <div className="max-w-7xl mx-auto flex justify-center">
            <Image src="/gregory-standal-sig-logo-blue.svg" alt="Greg Standal" width={180} height={40} className="h-10 w-auto" />
          </div>
        </header>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start relative z-10">
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-[#002542]">
              Add <span className="text-[#FF6B00]">20–30% More Booked Estimates</span> in 90 Days for Contractors
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed font-medium max-w-2xl">
              We build the trust, follow-up, and booking system that turns more of your existing leads into qualified booked estimates.
            </p>
            <ul className="space-y-4 mb-6">
              {["More Booked Estimates", "Higher Close Rates", "More Trust Before the First Appointment"].map((bullet, idx) => (
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
            <p className="text-center text-sm font-black uppercase tracking-widest text-[#FF6B00] mb-3">Start Here ↓</p>
            <Step1Form />
          </div>
        </div>
      </section>

      {/* 2. SECTION 2: PROOF + OFFER */}
      <section className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-[#002542]">
              Real Transformations, Real Results.
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium mb-8">
              See how contractors are using trust-building content to separate from the cheaper quote and generate more qualified booked estimates.
            </p>

            {/* Results bar */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-black text-[#FF6B00]">+27%</span>
                <span className="text-sm text-slate-500 font-medium">avg. increase in booked estimates</span>
              </div>
              <div className="hidden md:block w-px bg-slate-200 self-stretch" />
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-black text-[#FF6B00]">42%</span>
                <span className="text-sm text-slate-500 font-medium">avg. lift in lead-to-estimate conversion</span>
              </div>
              <div className="hidden md:block w-px bg-slate-200 self-stretch" />
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-black text-[#FF6B00]">21 days</span>
                <span className="text-sm text-slate-500 font-medium">avg. time to first booked estimate</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-20 opacity-60">
              {clientLogos.map((logo, idx) => (
                <Image key={idx} src={logo.src} alt={logo.alt} width={140} height={56} className="h-8 md:h-10 w-auto object-contain grayscale" />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {caseStudies.slice(0, 3).map((study, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                <InlineVideoPlayer
                  src={study.videoSrc}
                  poster={study.img}
                  thumbnail={study.thumbnail}
                  hoverVideoSrc={study.thumbnailVideo}
                  thumbnailFit="cover"
                  accentColor={colors.accent}
                  className="rounded-none aspect-video"
                />
                <div className="p-8">
                  <span className="text-xs font-black uppercase tracking-widest mb-3 block" style={{ color: colors.accent }}>{study.tag}</span>
                  <h3 className="font-black text-[#002542] text-xl leading-snug mb-6">{study.title}</h3>
                  <Link href={`/demo/brand-builders-v2/case-studies/${study.videoId}`} className="block text-center text-sm font-black border border-[#002542] rounded-lg py-3 bg-[#002542] text-white hover:bg-transparent hover:text-[#002542] transition uppercase tracking-wider w-full">
                    View Case Study
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-xl border border-slate-200">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-6 text-[#002542]">What Happens on Your Growth Plan Call?</h2>
                <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed">
                  We don&apos;t just show you pretty videos. We map out a contractor-specific system built to earn trust and book estimates on auto-pilot.
                </p>
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">You'll leave with:</p>
                <ul className="space-y-4">
                  {[
                    "Custom lead-flow map for your business",
                    "Estimate booking bottleneck diagnosis",
                    "90-day booked-estimate growth plan",
                    "Trust-building video asset roadmap",
                    "Clear next steps (whether we work together or not)"
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
                <p className="text-slate-300 font-medium mb-6">Home Improvement & Home Service contractors who have a real business but are tired of chasing low-quality leads.</p>

                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Not for:</p>
                <ul className="text-slate-300 space-y-2 mb-6">
                  <li className="flex items-start gap-2"><span className="text-slate-500">✕</span> Brand-new contractors without proven demand</li>
                  <li className="flex items-start gap-2"><span className="text-slate-500">✕</span> Owners unwilling to follow a process</li>
                  <li className="flex items-start gap-2"><span className="text-slate-500">✕</span> Businesses looking for cheap leads only</li>
                </ul>

                <Link
                  href="#hero"
                  onClick={(e) => smoothScrollTo(e, 'hero')}
                  className="w-full bg-[#FF6B00] text-white py-4 rounded-lg font-black uppercase tracking-wider hover:-translate-y-1 transition text-center block"
                >
                  Apply for Your Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION 3: OBJECTIONS + CLOSE + BACKUP CAPTURE */}
      <section className="py-24 px-4 bg-white" id="cta-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-8 text-[#002542]">Frequently Asked Questions</h2>
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
            If we're not a fit, we'll tell you straight and point you to the next best step. No pressure, no games.
          </p>

          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-[#002542]">Take the First Step Toward More Booked Estimates</h2>
            <p className="text-xl text-slate-600 font-medium">Complete Step 1 below to see if you qualify.</p>
          </div>

          {/* Founder note */}
          <div className="max-w-2xl mx-auto mb-8 bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <p className="text-slate-600 font-medium leading-relaxed text-center">
              "I started working with contractors because I saw how hard you work—and how little marketing actually earns your trust. My standard is simple: if we can't get you results, we'll tell you before we take your money." <span className="font-bold text-[#002542]">— Greg Standal</span>
            </p>
          </div>

          {/* Scarcity */}
          <p className="text-center text-sm text-slate-400 font-medium mb-8">
            We review 15 new Growth Plan applications per week to protect client results.
          </p>

          <div className="max-w-xl mx-auto">
            <Step1Form />
          </div>
        </div>
      </section>

      <footer className="py-12 bg-slate-900 text-center text-slate-500 text-sm font-medium">
        <Image src="/gregory-standal-sig-logo-white.svg" alt="Greg Standal" width={180} height={40} className="h-8 w-auto mx-auto mb-6 opacity-50" />
        <p>© {new Date().getFullYear()} New Cape Pictures. All rights reserved.</p>
      </footer>

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
