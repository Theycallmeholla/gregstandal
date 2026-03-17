"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PlayCircle,
  Play,
  Star,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const colors = {
  primary: '#002542',
  accent: '#F70118', // New Cape Pictures Red
  yellow: '#f1b40c', // New Cape Pictures Yellow
};

const clientLogos = [
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-valley.jpg", alt: "Valley" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-sensor-brite.jpg", alt: "Sensor Brite" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-coldwell-banker.jpg", alt: "Coldwell Banker" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-bissel.jpg", alt: "Bissell" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-bella.jpg", alt: "Bella" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-marmon-crane.jpg", alt: "Marmon Crane" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-topilow.jpg", alt: "Topilow" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/08/logo-spectrum.jpg", alt: "Spectrum" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-jan-fence.jpg", alt: "Jan Fence" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-housemaster.jpg", alt: "HouseMaster" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-general-steel.jpg", alt: "General Steel" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-george-apap.jpg", alt: "George Apap" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-ag-williams.jpg", alt: "AG Williams" },
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
    img: "https://newcapepictures.com/wp-content/uploads/2021/11/AG-Williams-Img-2.jpg",
    videoId: "188"
  },
  {
    title: "How Bella Contracting Generated $80k+ In Two Months (12x ROI)",
    tag: "Contracting",
    img: "https://newcapepictures.com/wp-content/uploads/2021/11/bella-contracting.jpg",
    videoId: "187"
  },
  {
    title: "How Jan Fence Increased Lead Gen Over 20%",
    tag: "Fencing",
    img: "https://newcapepictures.com/wp-content/uploads/2025/12/jan-fence.jpg",
    videoId: "186"
  },
  {
    title: "How Spectrum Painting Boosted Conversion Rates By 20%",
    tag: "Painting",
    img: "https://newcapepictures.com/wp-content/uploads/2025/12/spectrum-case-studt-hero-1024x572.jpg",
    videoId: "185"
  },
  {
    title: "How PB Innovations Scaled Using Our Video Strategy (30x ROI)",
    tag: "Remodeling",
    img: "https://newcapepictures.com/wp-content/uploads/2025/12/pb-innovations.jpg",
    videoId: "190"
  }
];

export default function NewCapeBrandBuilders() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const scrollToCTA = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("cta-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white text-slate-900 antialiased font-sans selection:bg-[#F70118]/20">
      
      {/* 1. Header with New Cape Logo (Distractions removed for funnel focus) */}
      <header className="w-full z-50 bg-white border-b border-slate-200 py-4 fixed top-0 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center md:justify-start">
          <div className="flex items-center gap-2">
            {/* Live site logo */}
            <Image src="/gregory-standal-sig-logo-blue.svg" alt="Greg Standal" width={180} height={40} className="h-10 w-auto cursor-pointer hover:opacity-80 transition" />
          </div>
        </div>
      </header>

      {/* 2. Rebuilt Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          {/* Header (Attention Avatar) */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm md:text-base font-black tracking-wide uppercase mb-6 bg-white border-2" style={{ color: colors.accent, borderColor: colors.accent }}>
            For Home Improvement & Home Service Contractors
          </div>

          {/* Headline (Outcome Promise) */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-black" style={{ color: colors.primary }}>
            Add <span style={{ color: colors.accent }}>20–30% More Booked Estimates</span> In 90 Days With The Constructive Video‑Funnel Blueprint™
          </h1>

          {/* Subheadline (Mechanism + De-risk) */}
          <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed font-medium mx-auto max-w-3xl">
            We turn your brand film and case study videos into a 24/7 trust engine so homeowners choose you before they ever get another quote.
          </p>
          
          {/* Hero VSL Video Emulation */}
          <div className="relative w-full max-w-4xl mx-auto aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden mb-10 group cursor-pointer border border-slate-200" onClick={() => setIsVideoModalOpen(true)}>
             <Image src="/greg-video-thumbnail.png" alt="VSL Video Thumbnail" fill className="object-cover opacity-70 group-hover:scale-105 transition duration-500" />
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300" style={{ backgroundColor: colors.yellow }}>
                  <Play className="w-8 h-8 text-black fill-black ml-1" />
                </div>
             </div>
          </div>

          {/* Primary CTA Button */}
          <div className="flex flex-col items-center gap-4">
            <Link
              href="#cta-section"
              onClick={scrollToCTA}
              className="group text-white px-10 py-5 rounded-full font-black text-xl md:text-2xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 flex items-center gap-3 relative overflow-hidden uppercase"
              style={{ backgroundColor: colors.accent }}
            >
              Book Your Brand Strategy Call
            </Link>
            
            {/* Directly under Hero: Built specifically for... */}
            <div className="max-w-2xl mx-auto mt-4">
              <p className="text-sm font-bold text-slate-400 mb-3 text-center uppercase tracking-widest">
                Built specifically for home service companies who want
              </p>
              <ul className="text-[#002542] font-bold text-base md:text-lg flex gap-4 md:gap-8 justify-center flex-wrap">
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500"/> Better Close Rates</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500"/> Higher Quality Leads</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500"/> Unfair Trust Advantage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Social Proof Single Block Immediately Under Hero */}
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

          {/* "Stats That Slap" */}
          <div className="rounded-3xl shadow-sm border border-slate-200 bg-white grid md:grid-cols-3 gap-8 p-10 md:p-12 mb-10 relative overflow-hidden group divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center py-4">
                <div className="text-4xl md:text-5xl font-black mb-3" style={{ color: colors.accent }}>{stat.value}</div>
                <div className="text-sm font-bold tracking-wider uppercase text-[#002542]">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Proof Block Repeated CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            <Link
              href="#video-case-study"
              className="flex items-center justify-center gap-2 bg-white border border-slate-200 px-8 py-4 rounded-full font-black text-lg hover:bg-slate-50 transition shadow-sm w-full sm:w-auto"
              style={{ color: colors.primary }}
            >
              <PlayCircle className="w-6 h-6 shrink-0 text-[#f1b40c]" />
              See how it works (3-min case study)
            </Link>
            <span className="text-slate-400 font-bold hidden sm:block">OR</span>
            <Link
              href="#cta-section"
              onClick={scrollToCTA}
              className="text-white px-8 py-4 rounded-full font-black text-lg transition shadow-md hover:-translate-y-1 w-full sm:w-auto text-center uppercase"
              style={{ backgroundColor: colors.accent }}
            >
              Book Your Brand Strategy Call
            </Link>
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
              We build demand for the trusted choice. View the case studies of contractors who scaled aggressively by positioning themselves perfectly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {caseStudies.slice(0, 3).map((study, idx) => (
              <div key={idx} className="group flex flex-col bg-slate-50 rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                <div className="relative aspect-video bg-black overflow-hidden cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
                  <Image src={study.img} alt={study.title} fill className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition duration-500" />
                  <div className="absolute inset-0 bg-[#002542]/20 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300" style={{ backgroundColor: colors.accent }}>
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: colors.accent }}>{study.tag}</span>
                  <h3 className="font-black text-[#002542] text-xl leading-snug mb-6 flex-1">{study.title}</h3>
                  <button className="text-sm font-black border border-slate-300 rounded-full py-3 hover:bg-[#002542] hover:text-white hover:border-[#002542] transition uppercase tracking-wider w-full" style={{ color: colors.primary }}>
                    View Case Study
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mid-page Bridge (Unified Label + Specific Text) */}
          <div className="bg-[#002542] rounded-3xl p-10 md:p-16 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div>
              <h3 className="text-3xl font-black text-white mb-3">Want numbers like these in your market?</h3>
              <p className="text-slate-300 font-medium text-lg">Book your Brand Strategy Call and we’ll map out your video‑funnel blueprint.</p>
            </div>
            <Link
              href="#cta-section"
              onClick={scrollToCTA}
              className="text-white px-10 py-5 rounded-full font-black text-lg transition w-full md:w-auto text-center shrink-0 hover:-translate-y-1 active:scale-95 uppercase shadow-xl"
              style={{ backgroundColor: colors.accent }}
            >
              Book Your Brand Strategy Call
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {caseStudies.slice(3, 5).map((study, idx) => (
              <div key={idx} className="group flex flex-col bg-slate-50 rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                <div className="relative aspect-video bg-black overflow-hidden cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
                  <Image src={study.img} alt={study.title} fill className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition duration-500" />
                  <div className="absolute inset-0 bg-[#002542]/20 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300" style={{ backgroundColor: colors.accent }}>
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: colors.accent }}>{study.tag}</span>
                  <h3 className="font-black text-[#002542] text-xl leading-snug mb-6 flex-1">{study.title}</h3>
                  <button className="text-sm font-black border border-slate-300 rounded-full py-3 hover:bg-[#002542] hover:text-white hover:border-[#002542] transition uppercase tracking-wider w-full" style={{ color: colors.primary }}>
                    View Case Study
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Tightened "How it works" section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden" style={{ backgroundImage: `url('https://newcapepictures.com/wp-content/uploads/2025/12/landingsteps-blueprint.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="absolute inset-0 bg-white/95"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#002542]">
              What We&apos;ll Map Out On Your Strategy Call
            </h2>
            <p className="text-xl text-slate-600 font-medium">
              The exact 5-step system that makes homeowners choose you confidently.
            </p>
          </div>

          {/* Highlight Reel Moved from Hero */}
          <div className="relative w-full max-w-4xl mx-auto aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden mb-16 group cursor-pointer border border-slate-200" onClick={() => setIsVideoModalOpen(true)}>
             <Image src="https://newcapepictures.com/wp-content/uploads/2025/12/spectrum-case-studt-hero-1024x572.jpg" alt="Highlight Reel Thumbnail" fill className="object-cover opacity-70 group-hover:scale-105 transition duration-500" />
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300" style={{ backgroundColor: colors.yellow }}>
                  <Play className="w-8 h-8 text-black fill-black ml-1" />
                </div>
             </div>
          </div>

          <div className="space-y-6 mb-16">
            {[
              { title: "Step 1 — Position You as the Local Authority", desc: "Define the exact customer profile, the painful problem, and the solution they're desperate for." },
              { title: "Step 2 — High-Difference Offer + Website Overhaul", desc: "Give homeowners a clear, undeniable reason to choose you over 5 other quotes." },
              { title: "Step 3 — Cinematic Trust Content", desc: "Brand film + story-driven case studies showing real transformations and results." },
              { title: "Step 4 — YouTube Authority + SEO", desc: "Build a perpetual pipeline of warm, inbound leads searching for your expertise." },
              { title: "Step 5 — Paid Traffic + Retargeting (Fuel the System)", desc: "Ads become wildly profitable when they drive traffic to a brand that actually converts." }
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 md:items-center hover:shadow-md transition duration-300 group">
                <div className="w-16 h-16 rounded-xl shrink-0 flex items-center justify-center font-black text-3xl shadow-inner group-hover:scale-105 transition transform text-white" style={{ backgroundColor: colors.primary }}>
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-2 text-[#002542]">{step.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border-l-8 p-8 md:p-12 rounded-r-3xl shadow-lg mb-12 text-xl md:text-2xl font-black text-slate-700 italic" style={{ borderColor: colors.accent }}>
            &ldquo;On your free 30‑minute call, we&apos;ll show you exactly where video is leaking revenue today and what your Constructive Video‑Funnel would look like over the next 90 days.&rdquo;
          </div>

          <div className="flex justify-center">
            <Link
              href="#cta-section"
              onClick={scrollToCTA}
              className="text-white px-12 py-5 rounded-full font-black text-xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 flex items-center gap-3 uppercase"
              style={{ backgroundColor: colors.accent }}
            >
              Book Your Brand Strategy Call <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Google Review Wall / Bottom Proof Section */}
      <section className="py-24 bg-[#002542] text-white overflow-hidden flex flex-col items-center">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight max-w-4xl mx-auto">
              Hundreds of thousands in trackable revenue generated for contractors just like you
            </h2>
            <div className="flex items-center justify-center gap-2 text-[#f1b40c]">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-8 h-8 fill-current drop-shadow-sm" />)}
            </div>
          </div>
        </div>

        {/* Visual Review Marquee */}
        <div className="w-full relative py-8 mb-16">
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #002542 0%, transparent 10%, transparent 90%, #002542 100%)' }}></div>
          <div className="flex animate-scroll-reviews gap-8 items-center w-max px-8">
            {[
              "/Irwin_Stromeyer_review.png",
              "/Joe_Abela_review.png",
              "/Thomas_Miller_review.png",
              "/Natalie_M_review.png",
              "/Christine_Thares_review.png",
              "/John_Stahl_review.png",
              "/Irwin_Stromeyer_review.png",
              "/Joe_Abela_review.png",
              "/Thomas_Miller_review.png",
              "/Natalie_M_review.png",
              "/Christine_Thares_review.png",
              "/John_Stahl_review.png"
            ].map((src, idx) => (
              <div key={idx} className="w-[380px] md:w-[500px] lg:w-[650px] shrink-0 rounded-2xl overflow-hidden shadow-2xl transform transition duration-500 hover:scale-[1.02] hover:-rotate-1 cursor-pointer bg-white relative aspect-4/3">
                <Image src={src} alt="Google Review Screenshot" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center w-full">
          <a
            href="#cta-section"
            onClick={scrollToCTA}
            className="inline-flex text-white px-12 py-5 rounded-full font-black text-xl transition shadow-xl hover:-translate-y-1 uppercase"
            style={{ backgroundColor: colors.accent }}
          >
            Book Your Brand Strategy Call
          </a>
        </div>
      </section>

      {/* 5.5 Contrast Section: Why We Are Not Like Every Other Agency */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#002542] tracking-tight">
              More Than Video Assets -- A System Built to Turn Existing Traffic Into More Booked Estimates
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
              Most video vendors hand over assets and call it a day. The Constructive Video-Funnel Blueprint™ is the system we use to help home improvement companies turn the traffic they already get into more qualified booked estimates, better close rates, and stronger trust before the estimate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto mb-12">
            {/* The Old Way */}
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm flex flex-col">
              <h3 className="text-2xl font-black text-slate-400 mb-8 uppercase tracking-widest border-b border-slate-100 pb-6">What Most Video Vendors Deliver</h3>
              <ul className="space-y-6 flex-1 text-lg font-bold text-slate-600">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-slate-400 font-black">X</span>
                  </div>
                  A polished video with no real conversion plan
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-slate-400 font-black">X</span>
                  </div>
                  Content disconnected from your sales process
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-slate-400 font-black">X</span>
                  </div>
                  Messaging that doesn’t separate you from competitors
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-slate-400 font-black">X</span>
                  </div>
                  Traffic coming in without enough trust to book
                </li>
              </ul>
            </div>

            {/* The New Way */}
            <div className="bg-[#002542] rounded-3xl p-8 md:p-12 shadow-xl flex flex-col relative overflow-hidden" style={{ border: `4px solid ${colors.accent}` }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <h3 className="text-2xl font-black text-white mb-8 border-b border-white/10 pb-6 leading-snug">What You Get With The Constructive Video-Funnel Blueprint™</h3>
              <ul className="space-y-6 flex-1 text-lg font-bold text-slate-200">
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-[#f1b40c] shrink-0 mt-0.5" />
                  <span className="text-white">A system built to convert the traffic you already get</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-[#f1b40c] shrink-0 mt-0.5" />
                  <span className="text-white">Brand film, case studies, and trust content that work together</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-[#f1b40c] shrink-0 mt-0.5" />
                  <span className="text-white">Messaging that helps homeowners choose you before they get another quote</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-[#f1b40c] shrink-0 mt-0.5" />
                  <span className="text-white">A rollout strategy designed to improve booked estimates and close rate over time</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="#cta-section"
              onClick={scrollToCTA}
              className="text-white px-12 py-5 rounded-full font-black text-xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 flex items-center gap-3 uppercase"
              style={{ backgroundColor: colors.accent }}
            >
              Book Your Brand Strategy Call <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. Guarantee & Final Form Registration */}
      <section id="cta-section" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="inline-block px-4 py-1.5 bg-[#f70118]/10 text-[#f70118] font-black uppercase text-xs rounded-full mb-8 tracking-widest border border-[#f70118]/20">
              Limited Availability
            </div>
            {/* Mirror Hook at Bottom */}
            <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight text-[#002542]">
              Add 20–30% More Booked Estimates In 90 Days – Starting With This Call.
            </h2>
            <ul className="space-y-5 mb-12 text-xl font-bold text-slate-700">
              <li className="flex items-center gap-4"><CheckCircle className="w-8 h-8 text-[#F70118]"/> More booked estimates</li>
              <li className="flex items-center gap-4"><CheckCircle className="w-8 h-8 text-[#F70118]"/> Higher close rates</li>
              <li className="flex items-center gap-4"><CheckCircle className="w-8 h-8 text-[#F70118]"/> Predictable revenue month after month</li>
            </ul>

            <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl mt-12 relative shadow-sm">
              <div className="absolute -top-6 left-8 text-white w-12 h-12 flex items-center justify-center rounded-xl shadow-lg rotate-12" style={{ backgroundColor: colors.accent }}>
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-black text-2xl text-[#002542] mb-3 ml-2 mt-2">Ironclad Performance Guarantee</h3>
              <p className="text-slate-600 text-xl font-medium leading-relaxed italic ml-2">
                &ldquo;If we don’t create a measurable lift in qualified leads or close rate within 6 months, we’ll keep working for free until we do.&rdquo;
              </p>
            </div>
          </div>

          {/* New Cape Pictures CRM Booking Form Embed */}
          <div className="bg-white p-2 rounded-2xl shadow-xl relative border border-slate-200 h-[700px] overflow-hidden">
             <iframe src="https://link.cursivecrm.com/widget/booking/tRgGOQiQsmjldJZwy3JE" className="w-full h-full border-none" title="Booking Calendar"></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800 text-center">
        <div className="mb-6 flex justify-center">
          <Image src="/gregory-standal-sig-logo-white.svg" alt="Greg Standal" width={216} height={48} className="h-12 w-auto opacity-80" />
        </div>
        <p className="font-medium text-slate-500 text-sm">© {new Date().getFullYear()} New Cape Pictures. All rights reserved.</p>
      </footer>

      {/* Basic Video Modal representation */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-100 bg-black/90 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="w-full max-w-5xl bg-black rounded-2xl overflow-hidden relative shadow-2xl border border-white/10">
                <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-4 right-4 text-white z-10 w-12 h-12 bg-white/10 flex items-center justify-center rounded-full hover:bg-white/20 transition font-bold text-xl">
                    ✕
                </button>
                <div className="aspect-video flex items-center justify-center text-white/50 text-xl font-bold">
                   [Presto Player Video 361 would load here]
                </div>
            </div>
        </div>
      )}

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


