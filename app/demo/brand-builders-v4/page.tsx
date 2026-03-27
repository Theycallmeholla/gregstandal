"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { caseStudies, mainVslVideoSrc } from './case-studies/data';
import { HlsVideoModal } from './video-player';
import {
  Play,
  Star,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  X,
  Target,
  Layers,
  Zap,
  Users,
  ShieldCheck,
} from 'lucide-react';

const colors = {
  primary: '#002542',
  accent: '#FF6B00',
};

const clientLogos = [
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-valley.jpg", alt: "Valley" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-coldwell-banker.jpg", alt: "Coldwell Banker" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-bissel.jpg", alt: "Bissell" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-jan-fence.jpg", alt: "Jan Fence" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-general-steel.jpg", alt: "General Steel" },
];

const faqs = [
  { q: "Who is this best for?", a: "Established home service contractors—roofing, painting, remodeling, HVAC, plumbing, landscaping, pools, fencing—who are already getting traffic, referrals, or inbound leads but not converting enough into booked estimates." },
  { q: "Do I need to run ads for this to work?", a: "No. The system works with organic traffic, referrals, and existing lead flow. Paid ads can accelerate results but are not required." },
  { q: "What happens on the strategy call?", a: "We review where booked estimates are dropping off, identify trust and follow-up gaps, and show you the fastest path to more qualified appointments." },
  { q: "How quickly can this impact booked estimates?", a: "Most clients see measurable improvement within 30-60 days. The full system typically hits stride around 90 days." },
  { q: "What if we've hired agencies before?", a: "Most agencies deliver content without a booking strategy. This system is built around booked estimates and close rate—not views or deliverables." },
];

// Section Shell component - matches v2 case study styling
function SectionShell({
  id,
  eyebrow,
  title,
  children,
  className = 'bg-white',
  titleClassName = 'text-[#002542]',
  layout = 'stacked',
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  layout?: 'stacked' | 'offset';
}) {
  if (layout === 'offset') {
    return (
      <section id={id} className={`px-4 py-24 md:py-32 ${className}`}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                {eyebrow && (
                  <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-[#FF6B00]">
                    {eyebrow}
                  </p>
                )}
                <h2 className={`text-4xl font-black tracking-tight md:text-5xl ${titleClassName}`}>
                  {title}
                </h2>
              </div>
            </div>
            <div className="lg:col-span-8 lg:pl-12">
              {children}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={`px-4 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 md:mb-16">
          {eyebrow && (
            <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-[#FF6B00]">
              {eyebrow}
            </p>
          )}
          <h2 className={`max-w-4xl text-4xl font-black tracking-tight md:text-5xl ${titleClassName}`}>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

export default function BrandBuildersV4() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickyHeader(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
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
        window.scrollTo(0, start + (end - start) * easeOutCubic(progress));
        if (progress < 1) requestAnimationFrame(animateScroll);
      };
      requestAnimationFrame(animateScroll);
    }
  };

  const scrollToCTA = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => smoothScrollTo(e, "cta-section");

  return (
    <div className="bg-white font-sans text-slate-900 antialiased selection:bg-[#FF6B00]/20">

      {/* Fixed Header */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <Image src="/gregory-standal-sig-logo-blue.svg" alt="Greg Standal" width={180} height={40} className="h-10 w-auto" />
          <button
            onClick={scrollToCTA}
            className={`items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:scale-105 active:scale-95 ${showStickyHeader ? 'flex' : 'hidden sm:flex'}`}
            style={{ backgroundColor: colors.accent }}
          >
            Book Your Strategy Call
          </button>
        </div>
      </header>

      {/* ========================================
          HERO SECTION
          ======================================== */}
      <section className="relative overflow-hidden bg-white px-4 pb-24 pt-32 lg:pt-40">
        <div className="mx-auto max-w-5xl text-center relative z-10">

          {/* Eyebrow Badge */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-lg px-8 py-3 text-lg md:text-xl font-black uppercase tracking-wide text-white shadow-xl" style={{ backgroundColor: colors.accent }}>
            Contractor Growth System
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-[#002542] mb-6 mx-auto">
            Add <span className="text-[#FF6B00]">20–30%</span> More Booked Estimates in 90 Days
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-2xl text-slate-600 mb-10 leading-relaxed font-medium mx-auto max-w-4xl">
            Using a contractor-specific content, trust, and follow-up system that turns your existing traffic into more qualified booked estimates.
          </p>

          {/* CTA */}
          <div className="flex justify-center mb-16">
            <button
              onClick={scrollToCTA}
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-[#FF6B00] px-10 py-5 text-center text-[clamp(16px,4.5vw,20px)] font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1"
            >
              See Where You&apos;re Losing Booked Estimates
            </button>
          </div>

          {/* VSL Video */}
          <div
            className="relative w-full max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl mb-16 group cursor-pointer border border-slate-200"
            onClick={() => setIsVideoModalOpen(true)}
          >
            <Image src="/vsl-cover.png" alt="Watch how it works" fill className="object-cover group-hover:scale-[1.02] transition duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition duration-300 bg-[#FF6B00]">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="rounded-3xl shadow-lg bg-[#002542] grid md:grid-cols-3 gap-8 p-10 md:p-12 mx-auto max-w-5xl relative overflow-hidden divide-y md:divide-y-0 md:divide-x divide-white/20">
            {[
              { value: "$120K+", label: "Pipeline Generated" },
              { value: "20–30%", label: "More Booked Estimates" },
              { value: "30–90 Days", label: "Implementation Window" },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center py-4">
                <div className="text-4xl md:text-5xl font-black mb-3 text-[#FF6B00]">{stat.value}</div>
                <div className="text-sm font-bold tracking-wider uppercase text-white">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          SOCIAL PROOF - Logos + Testimonial
          ======================================== */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-10">
            Trusted by contractors across the country
          </p>

          {/* Logos */}
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 mb-16">
            {clientLogos.map((logo, idx) => (
              <Image
                key={idx}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={48}
                className="h-10 md:h-14 w-auto object-contain grayscale opacity-50 hover:opacity-80 transition duration-300"
              />
            ))}
          </div>

          {/* Featured Testimonial */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-[#f1b40c] text-[#f1b40c]" />)}
            </div>
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-[#002542] mb-8">
              &ldquo;We were already getting traffic, but not enough of it turned into booked estimates. This system helped us tighten trust, follow-up, and conversion—now we&apos;re booking more qualified appointments.&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center font-black text-slate-400 text-xl">BR</div>
              <div>
                <p className="font-black text-[#002542] text-lg">Ben Raabe</p>
                <p className="text-slate-500 font-medium">Bella Contracting — General Contracting, NJ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          THE PROBLEM - Offset Layout
          ======================================== */}
      <SectionShell
        title={
          <span className="flex flex-col gap-4">
            <Target className="h-12 w-12 text-[#FF6B00]" />
            Why Good Contractors Still Struggle
          </span>
        }
        className="bg-white"
        layout="offset"
        eyebrow="The Problem"
      >
        <div className="space-y-6">
          {[
            { icon: Zap, title: "Homeowners don't trust you fast enough", desc: "Your work may be strong, but if trust is not built before the call, fewer leads turn into booked estimates." },
            { icon: Users, title: "Follow-up gaps kill good opportunities", desc: "Most contractors lose booked jobs because response time, nurture, and consistency break down." },
            { icon: Target, title: "Generic marketing creates attention, not appointments", desc: "Views, clicks, and random content do not automatically translate into qualified booked estimates." },
            { icon: Layers, title: "You are relying on reputation without a system", desc: "Word of mouth helps, but without a repeatable estimate-booking process, growth stays inconsistent." },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-6 p-8 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <div>
                <h3 className="font-black text-[#002542] text-xl mb-2">{item.title}</h3>
                <p className="text-slate-600 font-medium text-lg leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border-l-[6px] border-[#FF6B00] bg-[#FF6B00]/5 p-8 md:p-12">
          <p className="text-xl md:text-2xl font-bold text-slate-700 leading-relaxed">
            The issue usually is not lead volume alone. It is <span className="text-[#FF6B00]">trust, positioning, and follow-up conversion.</span>
          </p>
        </div>
      </SectionShell>

      {/* ========================================
          THE MECHANISM - Offset Layout
          ======================================== */}
      <SectionShell
        title={
          <span className="flex flex-col gap-4">
            <Layers className="h-12 w-12 text-[#002542]" />
            How We Help You Book More Estimates
          </span>
        }
        className="bg-slate-50 border-y border-slate-200"
        layout="offset"
        eyebrow="The System"
      >
        <div className="space-y-6">
          {[
            { step: "1", title: "Authority Positioning", desc: "We help you look like the obvious trusted choice before the homeowner even speaks to you." },
            { step: "2", title: "Trust-Building Content", desc: "We use strategic content that answers doubts, builds credibility, and reduces hesitation." },
            { step: "3", title: "Conversion Points", desc: "We improve the places where traffic turns into inquiries, calls, and estimate requests." },
            { step: "4", title: "Follow-Up System", desc: "We tighten speed-to-lead, reminders, and nurture so opportunities do not slip away." },
            { step: "5", title: "Booked Estimate Focus", desc: "Everything is optimized around qualified appointments, not vanity metrics." },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 md:items-center hover:shadow-md transition duration-300 group">
              <div className="w-16 h-16 rounded-xl shrink-0 flex items-center justify-center font-black text-3xl shadow-inner group-hover:scale-105 transition transform text-white bg-[#002542]">
                {item.step}
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2 text-[#002542]">{item.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed text-lg">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border-l-8 p-8 md:p-12 rounded-r-3xl shadow-lg mt-12 text-xl md:text-2xl font-black text-slate-700 italic" style={{ borderColor: colors.accent }}>
          &ldquo;This works best for contractors already getting some traffic, referrals, or leads but not converting enough into booked estimates.&rdquo;
        </div>
      </SectionShell>

      {/* ========================================
          WHAT YOU GET - Strategy Call
          ======================================== */}
      <SectionShell
        title="What We'll Map Out on Your Strategy Call"
        className="bg-white"
        eyebrow="The Offer"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
            <div className="bg-slate-100 border-b border-slate-200 px-6 py-3 -mx-8 md:-mx-10 -mt-8 md:-mt-10 mb-8 rounded-t-3xl">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">What We&apos;ll Review</span>
            </div>
            <ul className="space-y-5">
              {[
                "Where booked estimates are dropping off",
                "What is hurting trust before the appointment",
                "Lead response and follow-up gaps",
                "Current traffic and conversion path",
                "Biggest revenue bottleneck in the booking process",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-lg font-bold text-[#002542] leading-snug">
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
            <div className="bg-slate-100 border-b border-slate-200 px-6 py-3 -mx-8 md:-mx-10 -mt-8 md:-mt-10 mb-8 rounded-t-3xl">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">What You&apos;ll Leave With</span>
            </div>
            <ul className="space-y-5">
              {[
                "A clear diagnosis of the bottleneck",
                "The fastest opportunities to improve booked estimates",
                "A practical 30–90 day action path",
                "Clarity on whether this system fits your business",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-lg font-bold text-[#002542] leading-snug">
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-[#FF6B00]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={scrollToCTA}
            className="inline-flex items-center justify-center rounded-lg bg-[#FF6B00] px-10 py-5 text-center text-xl font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1"
          >
            Book Your Fit + Strategy Call
          </button>
        </div>
      </SectionShell>

      {/* ========================================
          CASE STUDIES
          ======================================== */}
      <SectionShell
        title="Real Results from Real Contractors"
        className="bg-slate-50 border-y border-slate-200"
        eyebrow="Proof"
      >
        <div className="space-y-8">
          {caseStudies.slice(0, 3).map((study, idx) => (
            <div key={idx} className="group flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition duration-300">
              <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto md:min-h-[300px]">
                <Image src={study.img} alt={study.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider text-white bg-[#FF6B00]">
                    {study.tag}
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                <h3 className="font-black text-[#002542] text-2xl md:text-3xl leading-snug mb-4">{study.title}</h3>

                <div className="flex flex-wrap gap-4 mb-6">
                  {study.heroStats.slice(0, 3).map((stat, statIdx) => (
                    <div key={statIdx} className="bg-slate-50 px-4 py-2 rounded-xl">
                      <span className="text-xl font-black text-[#FF6B00]">{stat.value}</span>
                      <span className="text-sm text-slate-500 font-bold ml-2">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {study.quote && (
                  <p className="text-slate-600 italic text-lg mb-6 leading-relaxed">
                    &ldquo;{study.quote.text}&rdquo;
                  </p>
                )}

                <Link
                  href={`/demo/brand-builders-v4/case-studies/${study.videoId}`}
                  className="inline-flex items-center gap-2 text-[#FF6B00] font-black text-lg group-hover:gap-3 transition-all"
                >
                  View Full Case Study <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ========================================
          COMPARISON - Us vs Generic
          ======================================== */}
      <SectionShell
        title="Why This Works Better Than Generic Marketing"
        className="bg-white"
        eyebrow="The Difference"
      >
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Generic Vendor */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm flex flex-col">
            <h3 className="text-2xl font-black text-slate-400 mb-8 uppercase tracking-widest border-b border-slate-100 pb-6">Generic Marketing Vendor</h3>
            <ul className="space-y-6 flex-1 text-lg font-bold text-slate-600">
              {[
                "A polished video with no real conversion plan",
                "Content disconnected from your sales process",
                "Messaging that doesn't separate you from competitors",
                "Traffic coming in without enough trust to book",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-slate-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Our System */}
          <div className="bg-[#002542] rounded-3xl p-8 md:p-12 shadow-xl flex flex-col relative overflow-hidden border-4 border-[#FF6B00]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <h3 className="text-2xl font-black text-white mb-8 border-b border-white/10 pb-6 leading-snug">Contractor Estimate-Booking System</h3>
            <ul className="space-y-6 flex-1 text-lg font-bold text-slate-200">
              {[
                "A trust-building system that supports your sales process",
                "Proof assets that make homeowners feel confident booking",
                "Messaging that separates you from the cheaper quote",
                "A rollout plan that improves booked estimates over time",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-[#FF6B00] shrink-0 mt-0.5" />
                  <span className="text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      {/* ========================================
          NO PRESSURE SECTION
          ======================================== */}
      <section className="py-24 px-4 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200 p-10 md:p-14 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-24 h-24 rounded-2xl bg-slate-100 relative overflow-hidden border border-slate-200 shrink-0">
                <Image
                  src="/greg-founder.jpg"
                  alt="Greg Standal - Founder"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                  <span className="text-3xl font-black text-slate-300">GS</span>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-black text-[#002542] mb-4">
                  This Is Not a High-Pressure Sales Call
                </h2>
                <p className="text-xl text-slate-600 font-medium leading-relaxed mb-6">
                  We&apos;ll look at where your estimate-booking process is leaking, what is likely holding back conversion, and whether this system is a fit. If it&apos;s not, we&apos;ll tell you directly.
                </p>
                <ul className="flex flex-wrap gap-x-8 gap-y-2">
                  {["No hard close", "No dragged-out pitch", "No pretending it fits everyone"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[#002542] font-bold">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-black text-[#002542]">— Greg Standal, Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          CTA SECTION
          ======================================== */}
      <section id="cta-section" className="bg-white px-4 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-8 inline-block rounded-lg border border-[#FF6B00]/20 bg-[#FF6B00]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.24em] text-[#FF6B00]">
              Book Your Call
            </div>
            <h2 className="mb-8 text-5xl font-black leading-tight tracking-tight text-[#002542] lg:text-6xl">
              Find Out Where You&apos;re Losing Booked Estimates
            </h2>
            <p className="mb-12 max-w-2xl text-xl font-medium leading-relaxed text-slate-600">
              Best fit for established home service contractors already getting traffic, referrals, or inbound leads.
            </p>

            <ul className="mb-12 space-y-5 text-xl font-bold text-slate-700">
              <li className="flex items-center gap-4"><CheckCircle className="h-8 w-8 text-[#FF6B00]" /> Identify the biggest booking bottleneck</li>
              <li className="flex items-center gap-4"><CheckCircle className="h-8 w-8 text-[#FF6B00]" /> See where trust is breaking</li>
              <li className="flex items-center gap-4"><CheckCircle className="h-8 w-8 text-[#FF6B00]" /> Get clarity on the fastest path forward</li>
            </ul>

            <div className="relative mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm md:p-10">
              <div className="absolute -top-6 left-8 flex h-14 w-14 rotate-12 items-center justify-center rounded-xl text-white shadow-lg" style={{ backgroundColor: colors.accent }}>
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="mb-3 ml-2 mt-2 text-2xl font-black text-[#002542]">
                15-Minute Fit Call
              </h3>
              <p className="ml-2 text-xl font-medium leading-relaxed text-slate-600">
                Quick call. Clear next steps. No pressure.
              </p>
            </div>
          </div>

          <div className="relative min-h-[900px] rounded-3xl border border-slate-200 bg-white p-2 shadow-xl">
            <iframe
              src="https://link.cursivecrm.com/widget/booking/tRgGOQiQsmjldJZwy3JE"
              style={{ width: '100%', border: 'none', minHeight: '880px' }}
              id="booking-calendar"
              title="Booking Calendar"
            />
            <Script src="https://link.cursivecrm.com/js/form_embed.js" strategy="afterInteractive" />
          </div>
        </div>
      </section>

      {/* ========================================
          FAQ
          ======================================== */}
      <section className="py-24 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-[#002542] text-center mb-12">Questions Before Booking</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition"
                >
                  <span className="font-bold text-[#002542] text-lg pr-4">{faq.q}</span>
                  <ChevronDown className={`w-6 h-6 text-slate-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600 font-medium text-lg leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          FINAL CTA
          ======================================== */}
      <section className="py-24 px-4 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#002542] mb-6">
            Ready to See What&apos;s Costing You Booked Estimates?
          </h2>
          <p className="text-xl text-slate-600 font-medium mb-10">
            Quick fit call. Clear next steps. No pressure.
          </p>
          <button
            onClick={scrollToCTA}
            className="inline-flex items-center justify-center rounded-lg bg-[#FF6B00] px-12 py-6 text-center text-xl font-black uppercase leading-none text-white shadow-xl transition hover:-translate-y-1"
          >
            Book Your Strategy Call
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800 text-center">
        <div className="mb-6 flex justify-center">
          <Image src="/gregory-standal-sig-logo-white.svg" alt="Greg Standal" width={216} height={48} className="h-12 w-auto opacity-80" />
        </div>
        <p className="font-medium text-slate-500 text-sm">© {new Date().getFullYear()} New Cape Pictures. All rights reserved.</p>
      </footer>

      {/* Video Modal */}
      <HlsVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        src={mainVslVideoSrc}
        poster="/vsl-cover.png"
      />
    </div>
  );
}
