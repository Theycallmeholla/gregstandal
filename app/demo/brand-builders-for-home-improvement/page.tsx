"use client";
import React, { useState } from 'react';
import {
  PlayCircle,
  Play,
  Star,
  ShieldCheck,
  MessageSquare,
  Zap,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  Check,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

const colors = {
  primary: '#002542',
  accent: '#F70118',
};

const clientLogos = [
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-verizon.jpg", alt: "Verizon" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-coldwell-banker.jpg", alt: "Coldwell Banker" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-bissel.jpg", alt: "Bissell" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-masterchef.jpg", alt: "MasterChef" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-spectrum.jpg", alt: "Spectrum" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-bella.jpg", alt: "Bella" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-housemaster.jpg", alt: "HouseMaster" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-valley.jpg", alt: "Valley" },
];

const stats = [
  { value: "20-30%", label: "Avg. Lift In Lead Gen" },
  { value: "$12M+", label: "Generated Revenue" },
  { value: "30 Days", label: "Launch Timeline" },
];

const caseStudies = [
  {
    title: "How AG Williams Painting Generates $28k+ Months (15x ROI)",
    tag: "Painting",
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "How Bella Contracting Generated $80k+ In Two Months (12x ROI)",
    tag: "Contracting",
    img: "https://images.unsplash.com/photo-1541888081638-3475cd1db9ec?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "How Jan Fence Increased Lead Gen Over 20%",
    tag: "Fencing",
    img: "https://images.unsplash.com/photo-1588691866336-61845bb08f65?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "How Spectrum Painting Boosted Conversion Rates By 20%",
    tag: "Painting",
    img: "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "How PB Innovations Scaled Using Our Video Strategy (30x ROI)",
    tag: "Remodeling",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop&q=60"
  }
];

export default function BrandBuildersLandingPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const scrollToCTA = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("cta-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-slate-50 text-slate-900 antialiased font-sans selection:bg-[#F70118]/20">
      
      {/* 1. Header (No Nav Links as instructed to improve conversions) */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/gregory-standal-sig-logo-blue.svg" alt="Gregory Standal" className="h-8 md:h-10 cursor-pointer hover:opacity-80 transition" />
          </div>
          <a
            href="#cta-section"
            onClick={scrollToCTA}
            className="text-white px-5 py-2.5 rounded-full text-sm font-semibold transition hover:scale-105 active:scale-95 shadow-md flex items-center gap-2"
            style={{ backgroundColor: colors.accent }}
          >
            Book Strategy Call <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* 2. Rebuilt Hero Section (The Money Layer) */}
      <section className="pt-32 pb-16 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F70118]/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          {/* Header (Attention Avatar) */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-6 shadow-sm border border-[#F70118]/20 drop-shadow-sm bg-white"
            style={{ color: colors.accent }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: colors.accent }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: colors.accent }}></span>
            </span>
            For Home Improvement & Home Service Contractors
          </div>

          {/* Headline (Outcome Promise) */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight mb-8" style={{ color: colors.primary }}>
            Add <span className="underline decoration-[#F70118] decoration-4 underline-offset-4">20–30% More Booked Estimates</span> In 90 Days With The Constructive Video‑Funnel Blueprint™
          </h1>

          {/* Subheadline (Mechanism + De-risk) */}
          <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed font-medium mx-auto max-w-3xl">
            We turn your brand film and case study videos into a 24/7 trust engine so homeowners choose you before they ever get another quote.
          </p>

          {/* Primary CTA Button */}
          <div className="flex flex-col items-center gap-4 animate-in slide-in-from-bottom-6 duration-700 ease-out fade-in fill-mode-both">
            <a
              href="#cta-section"
              onClick={scrollToCTA}
              className="group text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 flex items-center gap-3 relative overflow-hidden"
              style={{ backgroundColor: colors.accent, boxShadow: `0 15px 35px -10px ${colors.accent}60` }}
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
              Book Your Brand Strategy Call
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            
            {/* Added instruction: Under Hero clarification */}
            <p className="text-sm font-bold text-slate-500 max-w-lg mt-4 flex items-center gap-2 justify-center">
              Built specifically for home service companies who want...
            </p>
            <ul className="text-slate-600 font-medium text-sm flex gap-4 md:gap-8 justify-center flex-wrap">
              <li className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500"/> Higher Quality Leads</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500"/> Better Close Rates</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500"/> Unfair Trust Advantage</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Social Proof Single Block Immediately Under Hero */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by ambitious brands across the country
          </p>

          {/* Logos Carousel */}
          <div className="relative mb-12 overflow-hidden mask-image-edges">
            <div className="flex animate-scroll gap-12 items-center">
              {[...clientLogos, ...clientLogos].map((logo, idx) => (
                <img
                  key={idx}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition duration-300 opacity-60 hover:opacity-100 shrink-0"
                />
              ))}
            </div>
          </div>

          {/* "Stats That Slap" */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100 mb-10 relative overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="absolute inset-0 bg-linear-to-br from-[#002542]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center p-4">
                <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: colors.accent }}>{stat.value}</div>
                <div className="text-sm font-bold tracking-widest text-[#002542] uppercase">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Proof Block Repeated CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#video-case-study"
              className="flex items-center justify-center gap-2 bg-white border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition shadow-sm w-full sm:w-auto"
              style={{ color: colors.primary }}
            >
              <PlayCircle className="w-5 h-5 shrink-0" style={{ color: colors.accent }} />
              See how it works (3-min case study)
            </a>
            <span className="text-slate-400 font-medium hidden sm:block">or</span>
            <a
              href="#cta-section"
              onClick={scrollToCTA}
              className="text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-md hover:opacity-90 w-full sm:w-auto text-center"
              style={{ backgroundColor: colors.primary }}
            >
              Book Your Brand Strategy Call
            </a>
          </div>
        </div>
      </section>

      {/* Case Study Grid (with interlaced CTAs) */}
      <section className="py-24 px-4 bg-white" id="video-case-study">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight" style={{ color: colors.primary }}>
              Real Transformations, Real Results.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We build demand for the trusted choice. View the case studies of contractors who scaled aggressively by positioning themselves perfectly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {caseStudies.slice(0, 3).map((study, idx) => (
              <div key={idx} className="group flex flex-col bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                <div className="relative aspect-video bg-slate-200 overflow-hidden cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
                  <img src={study.img} alt={study.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition duration-500 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-[#002542]/20 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-[#F70118] flex items-center justify-center shadow-[0_0_20px_rgba(247,1,24,0.4)] group-hover:scale-110 transition duration-300">
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs font-bold text-[#F70118] uppercase tracking-wider mb-2">{study.tag}</span>
                  <h3 className="font-extrabold text-[#002542] text-xl leading-tight mb-4 flex-1">{study.title}</h3>
                  <button className="text-sm font-bold border border-slate-300 rounded-lg py-3 hover:bg-[#002542] hover:text-white hover:border-[#002542] transition" style={{ color: colors.primary }}>
                    View Case Study
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA break after 3 cards */}
          <div className="bg-[#002542]/5 rounded-3xl p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#002542]/10 shadow-sm">
            <div>
              <h3 className="text-2xl font-black text-[#002542] mb-2">Want to replicate these results in your market?</h3>
              <p className="text-slate-600 font-medium">Stop losing premium jobs to competitors with better marketing.</p>
            </div>
            <a
              href="#cta-section"
              onClick={scrollToCTA}
              className="text-white px-8 py-4 rounded-xl font-bold transition shadow-lg w-full md:w-auto text-center shrink-0 hover:-translate-y-0.5 active:scale-95"
              style={{ backgroundColor: colors.accent }}
            >
              Get Your Blueprint
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 lg:max-w-4xl lg:mx-auto gap-8 mb-12">
            {caseStudies.slice(3, 5).map((study, idx) => (
              <div key={idx} className="group flex flex-col bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                <div className="relative aspect-video bg-slate-200 overflow-hidden cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
                  <img src={study.img} alt={study.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition duration-500 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-[#002542]/20 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-[#F70118] flex items-center justify-center shadow-[0_0_20px_rgba(247,1,24,0.4)] group-hover:scale-110 transition duration-300">
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs font-bold text-[#F70118] uppercase tracking-wider mb-2">{study.tag}</span>
                  <h3 className="font-extrabold text-[#002542] text-xl leading-tight mb-4 flex-1">{study.title}</h3>
                  <button className="text-sm font-bold border border-slate-300 rounded-lg py-3 hover:bg-[#002542] hover:text-white hover:border-[#002542] transition" style={{ color: colors.primary }}>
                    View Case Study
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Tightened "How it works" section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6" style={{ color: colors.primary }}>
              What We&apos;ll Map Out On Your Strategy Call
            </h2>
            <p className="text-lg text-slate-600">
              The exact 5-step system that makes homeowners choose you confidently.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {[
              { title: "Step 1 — Position You as the Local Authority", desc: "Define the exact customer profile, the painful problem, and the solution they're desperate for." },
              { title: "Step 2 — High-Difference Offer + Website Overhaul", desc: "Give homeowners a clear, undeniable reason to choose you over 5 other quotes." },
              { title: "Step 3 — Cinematic Trust Content", desc: "Brand film + story-driven case studies showing real transformations and results." },
              { title: "Step 4 — YouTube Authority + SEO", desc: "Build a perpetual pipeline of warm, inbound leads searching for your expertise." },
              { title: "Step 5 — Paid Traffic + Retargeting (Fuel the System)", desc: "Ads become wildly profitable when they drive traffic to a brand that actually converts." }
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-6 hover:border-[#002542]/20 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center font-black text-xl text-white shadow-inner" style={{ backgroundColor: colors.primary }}>
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#002542]">{step.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border-l-4 p-6 md:p-8 rounded-r-2xl shadow-md mb-8 text-lg font-medium text-slate-700 italic border-[#F70118]">
            &ldquo;On your free 30‑minute call, we&apos;ll show you exactly where video is leaking revenue today and what your Constructive Video‑Funnel would look like over the next 90 days.&rdquo;
          </div>

          <div className="flex justify-center">
            <a
              href="#cta-section"
              onClick={scrollToCTA}
              className="group text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 flex items-center gap-3 animate-pulse-slow w-full sm:w-auto justify-center"
              style={{ backgroundColor: colors.accent }}
            >
              Book Your Brand Strategy Call <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. Google Review Wall / Bottom Proof Section */}
      <section className="py-24 bg-[#002542] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight max-w-4xl mx-auto">
              Hundreds of thousands in trackable revenue generated for contractors just like you
            </h2>
            <div className="flex items-center justify-center gap-2 text-yellow-500 mb-8">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
            </div>
            
            <a
              href="#cta-section"
              onClick={scrollToCTA}
              className="inline-flex text-white px-10 py-4 rounded-xl font-bold text-lg transition shadow-xl hover:-translate-y-0.5"
              style={{ backgroundColor: colors.accent, boxShadow: `0 10px 30px -5px ${colors.accent}80` }}
            >
              Book Your Brand Strategy Call
            </a>
          </div>

          {/* Dummy Review Grid representing the "Review Wall" */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-90 mx-auto max-w-5xl">
            {[
              "The new videos immediately made us feel more established and gave prospects far more confidence before the first conversation.",
              "Our close rate jumped by 20% in the first month implementing the trust-stack on our estimate page.",
              "This was more than a video shoot. It gave us a full library of assets we use at every stage of the sales pipeline.",
              "We actually lowered our ad spend by $2k/mo and somehow generated MORE booked calls.",
              "The brand authority package positioned us perfectly. Price shoppers filter themselves out, and ready-buyers trust us instantly.",
              "If you run a home service business and aren't using this system, you're lighting money on fire every day."
            ].map((review, idx) => (
              <div key={idx} className="bg-white/10 border border-white/20 p-6 rounded-2xl backdrop-blur-sm">
                <div className="flex text-yellow-400 mb-3 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-200 text-sm leading-relaxed mb-4">{review}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 shrink-0"></div>
                  <div>
                    <div className="font-bold text-sm text-white">Verified Client</div>
                    <div className="text-xs text-white/50">Home Services Owner</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Guarantee & Final Form Registration */}
      <section id="cta-section" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 font-bold uppercase text-xs rounded-full mb-6 tracking-wider">
              Limited Availability
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight tracking-tight" style={{ color: colors.primary }}>
              The next step is simple.
            </h2>
            <ul className="space-y-4 mb-8 text-lg font-bold text-slate-700">
              <li className="flex items-center gap-3"><Check className="w-6 h-6 text-[#F70118]"/> More booked estimates</li>
              <li className="flex items-center gap-3"><Check className="w-6 h-6 text-[#F70118]"/> Higher close rates</li>
              <li className="flex items-center gap-3"><Check className="w-6 h-6 text-[#F70118]"/> Homeowners choosing you without hesitation</li>
              <li className="flex items-center gap-3"><Check className="w-6 h-6 text-[#F70118]"/> Predictable revenue month after month</li>
              <li className="flex items-center gap-3"><Check className="w-6 h-6 text-[#F70118]"/> Envious competitors</li>
            </ul>

            {/* Risk Reversal Guarantee */}
            <div className="bg-slate-50 border-2 border-indigo-100 p-8 rounded-3xl mt-12 relative shadow-sm">
              <div className="absolute -top-6 left-8 bg-indigo-600 text-white w-12 h-12 flex items-center justify-center rounded-xl shadow-lg rotate-12">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-black text-xl text-[#002542] mb-3 ml-2 mt-2">Ironclad Performance Guarantee</h3>
              <p className="text-slate-600 text-lg font-medium leading-relaxed italic ml-2">
                &ldquo;If we don&apos;t create a measurable lift in qualified leads or close rates within 6 months, we&apos;ll continue working with you for free until we do.&rdquo;
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-12 rounded-4xl shadow-2xl border border-slate-100 relative">
            <h3 className="text-2xl font-extrabold mb-2" style={{ color: colors.primary }}>Book Your Free Strategy Session</h3>
            <p className="text-slate-500 font-medium mb-8">If you are looking to make a significant impact in your business and skyrocket your brand, book your call below.</p>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none transition focus:border-[#002542] focus:ring-2 focus:ring-[#002542]/20"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none transition focus:border-[#002542] focus:ring-2 focus:ring-[#002542]/20"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none transition focus:border-[#002542] focus:ring-2 focus:ring-[#002542]/20"
                  placeholder="john@company.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none transition focus:border-[#002542] focus:ring-2 focus:ring-[#002542]/20"
                  placeholder="(555) 555-5555"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white py-5 rounded-xl font-black text-xl transition-all shadow-xl hover:-translate-y-1 active:scale-95"
                style={{ backgroundColor: colors.accent, boxShadow: `0 15px 35px -10px ${colors.accent}60` }}
              >
                Schedule Setup Call
              </button>
              <p className="text-center text-xs font-medium text-slate-400">
                100% confidential. No high-pressure sales pitch.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800 text-center">
        <div className="mb-6 flex justify-center">
          <img src="/gregory-standal-sig-logo-white.svg" alt="Gregory Standal" className="h-8 opacity-80" />
        </div>
        <p className="font-medium text-slate-500 text-sm">© {new Date().getFullYear()} gregorystandal.com. All rights reserved.</p>
      </footer>

      {/* Basic Video Modal representation */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-100 bg-black/90 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="w-full max-w-4xl bg-black rounded-lg overflow-hidden relative shadow-2xl">
                <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-4 right-4 text-white z-10 w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-white/20 transition">
                    ✕
                </button>
                <div className="aspect-video flex items-center justify-center text-white/50 text-sm">
                   [Video content would load here]
                </div>
            </div>
        </div>
      )}

      {/* Standard global css overrides for this page demo */}
      <style dangerouslySetInnerHTML={{__html: `
        .mask-image-edges {
            -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .animate-scroll {
            animation: scroll 40s linear infinite;
        }
        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-250px * 8)); }
        }
        .animate-pulse-slow {
            animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-slow {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: .95; transform: scale(0.98); }
        }
      `}} />
    </div>
  );
}
