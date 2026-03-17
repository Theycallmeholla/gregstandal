"use client";

import React, { useState } from "react";
import {
  Play,
  Star,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  XCircle,
  FileMinus,
  Check,
  AlertCircle,
  Target,
  TrendingUp,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function WireframePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const placeholderImg = (label: string = "[Image Placeholder]") => (
    <div className="bg-gray-200 border-2 border-dashed border-gray-300 w-full h-full flex items-center justify-center text-gray-400 font-medium p-4 text-center uppercase tracking-widest text-xs">
      {label}
    </div>
  );

  const placeholderVideo = (label: string = "[Video Placeholder]") => (
    <div className="bg-gray-800 w-full h-full flex items-center justify-center relative group cursor-pointer overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-black/20" />
      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm z-10 transition-transform group-hover:scale-110">
        <Play className="w-8 h-8 text-white fill-white ml-1" />
      </div>
      <div className="absolute bottom-4 left-0 w-full text-center z-10">
        <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Header */}
      <header className="py-6 px-4 max-w-7xl mx-auto flex items-center justify-center lg:justify-start">
        <div className="w-48 h-12">
          {placeholderImg("[Logo Placeholder]")}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-8 pb-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Build a Brand That Fills Your Calendar With High‑Value Home‑Improvement Jobs
            </h1>
            <p className="text-lg text-gray-600 mb-4 max-w-xl mx-auto lg:mx-0 leading-relaxed font-bold">
              Most contractors depend on Angi, HomeAdvisor, and discounts… then wonder why they get price‑shoppers.
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We build a cinematic video system that makes homeowners <span className="italic font-semibold">choose you before they ever get another quote</span> and turns your best projects into a lead‑gen engine.
            </p>
            <p className="text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Book a free 30‑minute Brand Builder Strategy Call and walk away with a clear video‑funnel blueprint for your company, whether we work together or not.
            </p>
            <div className="mb-4">
              <button className="w-full sm:w-auto px-10 py-4 rounded bg-[#0047AB] text-white font-bold text-lg hover:bg-blue-800 transition-colors uppercase tracking-tight">
                Book My Free Strategy Call
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-8 font-medium">
              For home‑improvement companies doing $1M–$10M / year • No obligation • 30‑minute Zoom
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
              </div>
              <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">Trusted by growth‑minded contractors across the US</span>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-gray-100">
              {placeholderImg("[Hero Dashboard Image Placeholder]")}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof (Real Results) */}
      <section className="py-20 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Real Contractors, Real Pipelines Built On Video
            </h2>
            <p className="text-gray-500 font-medium">
              See how our video systems have helped others dominate their local market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "“We stopped buying shared leads and filled 3 months of work from the brand film and case‑study videos alone.”",
              "“Homeowners show up to the estimate saying, ‘We already watched your videos, we just need the numbers.’ Our close rate jumped and our prices did too.”",
              "“The system paid for itself in the first quarter. Now every ad, email, and sales call uses the same videos.”"
            ].map((quote, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                      {placeholderImg("")}
                    </div>
                    <span className="font-bold text-sm">[Contractor Name]</span>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
                  </div>
                </div>
                <p className="text-gray-600 italic mb-8 flex-grow leading-relaxed">
                  {quote}
                </p>
                <div className="aspect-[16/9] rounded-lg overflow-hidden border border-gray-100 bg-gray-100">
                  {placeholderVideo(`[Project Video ${i+1}]`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points (Costing You Money) */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Why Your Current Marketing Is Costing You The Best Jobs
            </h2>
            <p className="text-gray-500 font-medium">
              Most contractors are stuck in a race to the bottom because they lack differentiation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: <BarChart3 className="w-6 h-6 text-red-500" />,
                title: "You Look Like Every Other Contractor",
                desc: "Same stock photos, same “free estimate” offer. Homeowners can’t tell you apart, so they pick the cheapest bid."
              },
              { 
                icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
                title: "Great Work, No Proof",
                desc: "You do incredible projects, but there’s no story on camera. Prospects never feel the difference."
              },
              { 
                icon: <FileMinus className="w-6 h-6 text-red-500" />,
                title: "Paying For Leads You Don’t Win",
                desc: "Lead sites sell the same homeowner to 4–5 contractors. You’re in a race to the bottom instead of building your own demand."
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 rounded bg-red-50 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Reveal (2 columns) */}
      <section className="py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tight">
              What You’re Doing Right… And Where Money Is Leaking
            </h2>
            <p className="text-gray-500 font-medium">
              Identify the gaps in your brand that are letting high‑value jobs slip through.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-bold">What’s Already Working</h3>
              </div>
              <ul className="space-y-4">
                {["Reputation & Word of Mouth", "Project Referrals", "Basic Job Site Photos", "Repeat Clients"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold">Where You’re Leaving Money On The Table</h3>
              </div>
              <ul className="space-y-4">
                {["No cohesive brand story", "No on‑camera proof of expertise", "Videos not tied to a lead funnel", "Website not built for high conversion"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="px-10 py-4 rounded bg-[#0047AB] text-white font-bold text-lg hover:bg-blue-800 transition-colors uppercase">
              Get My Brand Builder Blueprint
            </button>
          </div>
        </div>
      </section>

      {/* Grid Features (What You'll Get) */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              What You Get With The Brand Builder Sprint
            </h2>
            <p className="text-gray-500 font-medium">
              A comprehensive system designed to turn your company into the local authority.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Brand Story Film", desc: "A cinematic film that sells your mission and values before the sales call." },
              { title: "3 Project Case‑Study Videos", desc: "Show homeowners exactly how you solve their problems with real proof." },
              { title: "6 Short Ads / Reels", desc: "High-impact social content to keep your brand top-of-mind every day." },
              { title: "YouTube & Website Implementation", desc: "Optimizing your digital footprint to capture high-intent searches." },
              { title: "Ad Creative & Funnel Build", desc: "Turning your videos into a systematic lead-generation machine." },
              { title: "90 Days of Optimization & Reporting", desc: "Constant refinement to ensure your pipeline stays full and profitable." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start">
                <div className="w-10 h-1 bg-blue-600 mb-6" />
                <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {feature.desc}
                </p>
                <div className="mt-auto flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                  <Check size={14} /> Included
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-blue-50 p-10 rounded-3xl border border-blue-100 mb-12 text-center">
             <div className="flex justify-center mb-6">
               <ShieldCheck className="w-16 h-16 text-blue-600" />
             </div>
             <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Grand Slam Guarantee:</h3>
             <p className="text-xl text-gray-700 leading-relaxed italic">
               &quot;If your Brand Builder system doesn’t generate at least <span className="font-black">$250,000</span> in new quoted jobs within 6 months, we keep managing and optimizing it for free until it does.&quot;
             </p>
          </div>

          <div className="flex justify-center">
            <button className="px-10 py-4 rounded bg-[#0047AB] text-white font-bold text-lg hover:bg-blue-800 transition-colors uppercase">
              Start My Brand Builder Sprint
            </button>
          </div>
        </div>
      </section>

      {/* Detailed Success Stories Container */}
      <section className="py-20 px-4 bg-blue-50/30 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              See How Contractors Turned Video Into Revenue
            </h2>
            <p className="text-gray-500 font-medium">
              Real results from home-improvement companies just like yours.
            </p>
          </div>

          {/* Story 1 */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col">
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black mb-6">
                   {placeholderVideo("[Contractor Story 1 Video]")}
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                    [MK]
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">[Contractor Name]</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Roofing Contractor • Residential</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="relative mb-10">
                  <span className="text-6xl text-gray-100 absolute -top-6 -left-4 font-serif leading-none">&ldquo;</span>
                  <p className="text-lg font-medium text-gray-700 italic relative z-10 leading-relaxed">
                    &quot;We were doing good work but looking like everyone else on the block. The video system changed how people talk to us before we even show up for the bid.&quot;
                  </p>
                </div>
                <div>
                  <h5 className="font-bold text-sm text-gray-900 mb-4 uppercase tracking-widest">Measurable Outcome:</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600">Starting Point: Stuck at $2M with low margins</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600">System Installed: Cinematic Brand Film + Case Study system</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600">Measurable Outcome: $450k new pipeline in 90 days</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Story 2 */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative mb-10">
                  <span className="text-6xl text-gray-100 absolute -top-6 -left-4 font-serif leading-none">&ldquo;</span>
                  <p className="text-lg font-medium text-gray-700 italic relative z-10 leading-relaxed">
                    &quot;Our sales cycle was long and we got ghosted often. Now, homeowners have already seen our team and our process on camera, so the trust is built instantly.&quot;
                  </p>
                </div>
                <div>
                  <h5 className="font-bold text-sm text-gray-900 mb-4 uppercase tracking-widest">Measurable Outcome:</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600">Starting Point: 25% close rate on luxury remodels</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600">System Installed: Project Walkthroughs + Meet the Team video</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600">Measurable Outcome: Close rate jumped to 42%</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col order-1 lg:order-2">
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black mb-6">
                   {placeholderVideo("[Luxury Remodeler Video]")}
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                    [LR]
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">[Contractor Name]</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Luxury Kitchen & Bath Remodeler</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
             <button className="px-10 py-4 rounded bg-[#0047AB] text-white font-bold text-lg hover:bg-blue-800 transition-colors uppercase">
               View All Success Stories
             </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tight">
              How The Brand Builder Sprint Works
            </h2>
            <p className="text-gray-500 font-medium">
              Our 4-step process to transform your brand and fill your calendar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="w-full max-w-sm aspect-[1/2] rounded-3xl overflow-hidden border-8 border-gray-100 shadow-inner">
                 {placeholderImg("[Process Infographic Placeholder]")}
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-10">
              {[
                { step: "1", title: "Strategy & Positioning", desc: "We map out your unique selling proposition and identify the high-value jobs you want more of." },
                { step: "2", title: "Offer + Funnel Blueprint", desc: "We design the systematic path that turns a first-time viewer into a high-intent consultation." },
                { step: "3", title: "Shoot Days (On‑Site Production)", desc: "Our cinematic crew captures your team and projects in their best light—no cheesy stock footage." },
                { step: "4", title: "Launch & Optimize", desc: "We deploy the system and refine it daily to ensure maximum lead flow and ROI.", icon: true }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-blue-800 bg-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      {item.title}
                      {item.icon && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <button className="px-10 py-5 rounded bg-[#0047AB] text-white font-bold text-xl hover:bg-blue-800 transition-colors uppercase tracking-tight">
              Book My Free Strategy Call
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tight">
              Questions Contractors Ask Before They Jump In
            </h2>
            <p className="text-gray-500 font-medium">
              Everything you need to know about the Brand Builder system.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { q: "How much does the system cost?", a: "We offer tailored packages based on the size of your company and the scope of the project. During our strategy call, we'll provide a clear quote based on your revenue goals." },
              { q: "How long does the timeline take?", a: "Typically, from strategy to launch takes about 30–45 days, including production and funnel setup." },
              { q: "Do I have to be on camera?", a: "Yes, we highly recommend having the owner or key leaders on camera to build authentic trust, but we coach you every step of the way to make it easy." },
              { q: "Where are these videos used?", a: "Everywhere. We optimize them for your website, YouTube, Facebook/Instagram ads, and even your sales presentations." },
              { q: "How is ROI tracked?", a: "We build custom dashboards that track lead source, appointment rates, and quoted job value directly attributed to the video funnel." },
              { q: "Who is this NOT for?", a: "This is not for new startups or contractors doing less than $1M/year. We focus on scaling established businesses with proven work." }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 px-8 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="font-bold text-gray-900">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={20} className="text-blue-600" /> : <ChevronDown size={20} className="text-gray-500" />}
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-8 pt-0 animate-in fade-in duration-300">
                    <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-[#002B5B] text-white text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <Zap className="w-[800px] h-[800px] absolute -top-48 -right-48 text-white rotate-12" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight uppercase tracking-tight">
            Ready To Be The Contractor Homeowners Are Chasing, Not Just Comparing?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium">
            Schedule your free Brand Builder Strategy Call and get a custom video‑funnel plan. If we’re not confident we can build you a profitable system, we won’t invite you into the Sprint.
          </p>
          <div className="flex flex-col items-center gap-6">
            <button className="px-16 py-6 rounded bg-white text-[#002B5B] font-black text-2xl hover:bg-gray-100 transition-all shadow-2xl hover:scale-105 uppercase tracking-tight">
              Book My Free Strategy Call
            </button>
            <p className="text-sm text-blue-200/80 font-bold uppercase tracking-widest">
              No Obligation • 100% Transparent • High-Level Strategy
            </p>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 bg-[#001D3D] border-t border-white/5 px-4 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="w-32 h-8 opacity-50">
            {placeholderImg("[Logo Placeholder]")}
          </div>
          <div className="flex gap-8">
            <span className="text-blue-200/40 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="text-blue-200/40 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Terms of Service</span>
            <span className="text-blue-200/40 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Contact Us</span>
          </div>
          <p className="text-blue-200/40 text-[10px] font-bold uppercase tracking-[0.2em]">
            © 2026 New Cape - Brand Builders for Contractors
          </p>
        </div>
      </footer>
    </div>
  );
}
