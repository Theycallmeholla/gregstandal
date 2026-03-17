"use client";

import React, { useState } from "react";
import {
  Play,
  Star,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  Globe,
  ChevronLeft,
  ChevronRight,
  Volume2,
  CheckCircle2
} from "lucide-react";

import type { LandingTemplateProps } from "./types";

export type AcquisitionDemoConfig = {
  topBadgeText?: string;
  heroTitle?: string; // supports "\n" line breaks
  heroSubtitle?: string;
  heroVideoPosterUrl?: string;
  accentColor?: string; // hex, e.g. "#8b31ff"
};

function renderMultiline(text: string) {
  return text.split("\n").map((line, idx) => (
    <React.Fragment key={idx}>
      {idx > 0 ? <br /> : null}
      {line}
    </React.Fragment>
  ));
}

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "").trim();
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  if (full.length !== 6) return `rgba(139,49,255,${alpha})`; // fallback = #8b31ff
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function AcquisitionDemoTemplate({ ctx, config }: LandingTemplateProps<AcquisitionDemoConfig>) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What's actually happening during these 2 days?",
      answer: "We go deep into your operations. You'll map out your current bottlenecks, build your first 'Self-Operating Map', and leave with the exact hiring scripts and KPIs we use at Acquisition.com to scale our portfolio companies."
    },
    {
      question: "Who is this workshop for?",
      answer: "This is for established business owners who feel like they are the bottleneck. If you are doing $50k+ in monthly revenue but can't take a week off without things falling apart, this is for you."
    },
    {
      question: "Is there a money back guarantee?",
      answer: "Absolutely. If by the end of the first day you don't feel like you've received 10x the value of your investment, tell us and we will refund you 100% on the spot."
    },
    {
      question: "How do I apply for the next one?",
      answer: "Fill out the form below. Our team reviews every application to ensure the cohort is high-level and that we can actually help your specific business model."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1f35] selection:bg-purple-100">

      {/* Top Banner Badge */}
      <div className="bg-black py-3 flex justify-center sticky top-0 z-50">
        <div className="bg-white px-4 py-1.5 rounded-full flex items-center gap-2 border border-gray-200 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-800">
            {config.topBadgeText ?? "Live In-Person Workshop | Las Vegas"}
          </span>
        </div>
      </div>

      {/* Hero Section - Top Dark Part - PADDING BOTTOM REMOVED */}
      <section className="bg-[#1a1f35] text-white pt-16 pb-0 px-4 text-center relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-[1.1] uppercase">
            {config.heroTitle ? renderMultiline(config.heroTitle) : <>ARE YOU THE THING LIMITING <br /> YOUR BUSINESS?</>}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            {config.heroSubtitle ?? "Join Our Scaling Workshop — Remove Yourself as the Single Point of Failure"}
          </p>

          {/* Video Container - Overlapping the split using translation */}
          <div className="relative max-w-3xl mx-auto group cursor-pointer z-20 translate-y-16 md:translate-y-24">
            <div className="rounded-sm overflow-hidden shadow-2xl border-2 border-white/10 bg-black aspect-video relative">
              <img
                src={config.heroVideoPosterUrl ?? "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=1200"}
                alt="Workshop Video"
                className="w-full h-full object-cover opacity-80"
              />

              {/* Purple Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div
                  className="p-6 md:p-8 rounded-xl border border-white/20 backdrop-blur-sm flex flex-col items-center gap-4 transform transition-transform group-hover:scale-105"
                  style={{ backgroundColor: hexToRgba(config.accentColor ?? "#8b31ff", 0.8) }}
                >
                  <Volume2 className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  <div className="text-center">
                    <p className="text-lg md:text-xl font-black uppercase tracking-wide leading-tight">Your Video Is Playing</p>
                    <p className="text-base md:text-lg font-bold">Click To Unmute</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Caption Bubble */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
              <div className="bg-[#8b31ff] text-white px-4 py-1 rounded-md text-xs font-bold shadow-lg whitespace-nowrap">
                can&apos;t wait to meet you
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section - Bottom White Part - Padding top adjusted for the overlap */}
      <section className="bg-white pt-32 md:pt-48 pb-16 px-4 text-center border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
            It&apos;s a 2-day, interactive workshop where you&apos;ll receive personalized, <br />
            <span
              className="text-black font-black italic underline underline-offset-4 decoration-4"
              style={{ textDecorationColor: config.accentColor ?? "#8b31ff" }}
            >
              actionable insights
            </span>{" "}
            from the team that&apos;s scaled Acquisition.com &amp; it&apos;s portfolio companies.
          </p>
        </div>
      </section>

      {/* Application Button */}
      <div className="py-12 bg-gray-50 flex justify-center border-b border-gray-200">
        <button
          className="hover:bg-[#7a2be0] text-white font-black py-5 px-16 rounded-lg text-xl transition-all shadow-xl uppercase tracking-widest hover:-translate-y-1 active:translate-y-0"
          style={{ backgroundColor: config.accentColor ?? "#8b31ff" }}
        >
          FILL OUT FORM
        </button>
      </div>

      {/* Social Proof Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-tight">What people are saying:</h2>

          <div className="flex justify-center mb-12">
            <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-2xl border-8 border-white bg-gray-100 rotate-1">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                alt="Successful Entrepreneur"
                className="w-full grayscale-[0.2]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 px-4">
            <div className="bg-white p-6 rounded shadow-xl border border-gray-100 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center font-bold text-pink-600">JT</div>
                <div>
                  <p className="text-xs font-black uppercase">Julie Teffeteller</p>
                  <div className="flex text-yellow-400 gap-0.5"><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /></div>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-gray-600 italic">
                <span className="bg-yellow-100 px-1">Nearly instant ROI every time we come here.</span> I love how they take care of our business but also how they take care of us personally!
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow-xl border border-gray-100 transform rotate-1 scale-105 hover:rotate-0 transition-transform duration-300 z-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">DN</div>
                <div>
                  <p className="text-xs font-black uppercase">Drew Nuckolls</p>
                  <div className="flex text-yellow-400 gap-0.5"><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /></div>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-gray-600 italic">
                I now have a <span className="bg-yellow-100 px-1 font-bold">clear understanding of the main constraint within my dental practice.</span> The entire team is fantastic.
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow-xl border border-gray-100 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">HW</div>
                <div>
                  <p className="text-xs font-black uppercase">Hunter Wilson</p>
                  <div className="flex text-yellow-400 gap-0.5"><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /></div>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-gray-600 italic">
                <span className="bg-yellow-100 px-1 font-bold">It was at least 10x more insightful than we thought going in.</span> These guys are world class.
              </p>
            </div>
          </div>

          <div className="mt-20 max-w-2xl mx-auto text-center">
            <p className="text-[10px] text-gray-400 font-medium leading-relaxed uppercase tracking-wider">
              Individual experiences presented here may not be typical. Their background, education, effort, and application affected their experience. The information shared here are for example purposes and not a guarantee of a rate of return or a specific result. Your results may vary.
            </p>
          </div>
        </div>
      </section>

      {/* Ripped Edge Section Header */}
      <section className="relative pt-12">
        <div className="bg-[#1f1f1f] py-12 px-4 relative">
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 -translate-y-full">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-[#1f1f1f]">
              <path d="M0,0L30,40L60,20L90,50L120,30L150,60L180,40L210,70L240,50L270,80L300,60L330,90L360,70L390,100L420,80L450,110L480,90L510,120L540,100L570,130L600,110L630,140L660,120L690,150L720,130L750,160L780,140L810,170L840,150L870,180L900,160L930,190L960,170L990,200L1020,180L1050,210L1080,190L1110,220L1140,200L1170,230L1200,210L1200,300L0,300Z"></path>
            </svg>
          </div>

          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-5xl font-black text-white uppercase italic tracking-tight">
              What you&apos;ll get at the{" "}
              <span
                className="underline underline-offset-8"
                style={{ textDecorationColor: config.accentColor ?? "#8b31ff" }}
              >
                in-person
              </span>{" "}
              workshop:
            </h2>
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 translate-y-full rotate-180">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-[#1f1f1f]">
              <path d="M0,0L30,40L60,20L90,50L120,30L150,60L180,40L210,70L240,50L270,80L300,60L330,90L360,70L390,100L420,80L450,110L480,90L510,120L540,100L570,130L600,110L630,140L660,120L690,150L720,130L750,160L780,140L810,170L840,150L870,180L900,160L930,190L960,170L990,200L1020,180L1050,210L1080,190L1110,220L1140,200L1170,230L1200,210L1200,300L0,300Z"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Workshop Details Grid */}
      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="mb-6 rounded-lg overflow-hidden border border-gray-100 shadow-md aspect-video">
                <img src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=600" alt="Training" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-black uppercase mb-3">Live Instruction</h3>
              <p className="text-sm text-gray-500 font-medium">Direct training from the Acquisition.com core team on the frameworks used to scale our portfolio companies.</p>
            </div>
            <div>
              <div className="mb-6 rounded-lg overflow-hidden border border-gray-100 shadow-md aspect-video">
                <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600" alt="Assets" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-black uppercase mb-3">Physical Asset Creation</h3>
              <p className="text-sm text-gray-500 font-medium">You don&apos;t just learn. You build your hiring maps, scripts, and dashboards live with our guidance.</p>
            </div>
            <div>
              <div className="mb-6 rounded-lg overflow-hidden border border-gray-100 shadow-md aspect-video">
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600" alt="Networking" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-black uppercase mb-3">Peer Elite Network</h3>
              <p className="text-sm text-gray-500 font-medium">Be in a room with only high-level operators. No beginners allowed, strictly $1M+ business owners.</p>
            </div>
          </div>
          <div className="mt-20 flex justify-center">
            <button className="bg-[#8b31ff] hover:bg-[#7a2be0] text-white font-black py-5 px-16 rounded-lg text-xl transition-all shadow-xl uppercase tracking-widest">
              FILL OUT FORM
            </button>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <Calendar className="w-12 h-12 text-[#8b31ff]" />
              </div>
              <h2 className="text-3xl font-black uppercase mb-4 italic tracking-tight">Apply for the Next Workshop</h2>
              <p className="text-gray-500 font-medium mb-10">We host these quarterly in Las Vegas. Spots are extremely limited and by application only.</p>

              <form className="space-y-4 text-left max-w-md mx-auto" method="post" action="/api/lead">
                <input type="hidden" name="visitorId" value={ctx.visitorId} />
                <input type="hidden" name="sessionId" value={ctx.sessionId} />
                <input type="hidden" name="routeHost" value={ctx.route.host} />
                <input type="hidden" name="routePath" value={ctx.route.path} />
                <input type="hidden" name="experimentId" value={ctx.experiment?.id ?? ""} />
                <input type="hidden" name="variantId" value={ctx.variant?.id ?? ""} />
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Full Name</label>
                  <input
                    name="firstName"
                    type="text"
                    className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-lg outline-none focus:border-[#8b31ff] transition-colors"
                    placeholder="Alex Smith"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-lg outline-none focus:border-[#8b31ff] transition-colors"
                    placeholder="alex@company.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-lg outline-none focus:border-[#8b31ff] transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Current Monthly Revenue</label>
                  <select className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-lg outline-none focus:border-[#8b31ff] transition-colors">
                    <option>$20k - $50k</option>
                    <option>$50k - $100k</option>
                    <option>$100k - $500k</option>
                    <option>$500k+</option>
                  </select>
                </div>
                <button
                  className="w-full bg-[#8b31ff] py-5 rounded-lg text-white font-black uppercase tracking-widest shadow-lg hover:bg-[#7a2be0] transition-colors mt-6"
                  data-cta-id="acquisition_demo_submit_application"
                  type="submit"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="overflow-hidden border border-gray-100 rounded-lg shadow-sm">
                <button
                  onClick={() => toggleFaq(index)}
                  className={`w-full flex items-center justify-between py-6 px-8 text-left transition-all ${openFaq === index ? 'bg-[#1a1f35] text-white' : 'bg-[#1a1f35] text-white hover:opacity-95'}`}
                >
                  <span className="text-sm md:text-base font-black uppercase tracking-tight italic">{faq.question}</span>
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaq === index && (
                  <div className="p-8 bg-gray-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-gray-600 leading-relaxed font-medium">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#8b31ff] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-[#8b31ff] font-black italic">A</div>
                <span className="text-2xl font-black uppercase tracking-tighter italic">Acquisition.com</span>
              </div>
              <p className="text-purple-100/70 text-sm max-w-sm leading-relaxed">
                We invest in and scale profitable business through our proprietary &quot;Removal Systems&quot; and talent acquisition frameworks.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 md:gap-20 text-left">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">Resources</h4>
                <a href="#" className="block text-sm text-purple-100/70 hover:text-white transition-colors">Apply</a>
                <a href="#" className="block text-sm text-purple-100/70 hover:text-white transition-colors">Success Stories</a>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">Company</h4>
                <a href="#" className="block text-sm text-purple-100/70 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="block text-sm text-purple-100/70 hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-white/10 text-center">
            <p className="text-[10px] font-bold text-purple-100/40 uppercase tracking-[0.3em]">
              © 2026 Acquisition.com — All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
