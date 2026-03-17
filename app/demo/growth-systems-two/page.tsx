"use client";
import React, { useState } from 'react';
import {
  ArrowRight, Users, Zap, Play,
  Star, ChevronDown, Target, TrendingUp,
  Video, Award, CheckCircle2, XCircle
} from 'lucide-react';

// Color scheme
const colors = {
  primary: '#002542',    // Deep blue
  accent: '#F70118',     // Red accent
};

const App = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const features = [
    {
      icon: <Target className="w-6 h-6" style={{ color: colors.primary }} />,
      title: "Positioning That Makes You the Easy Choice",
      desc: "Most contractors sound the same. We help clarify your message so homeowners immediately understand why you're different, what kind of jobs you do best, and why they should trust you."
    },
    {
      icon: <Video className="w-6 h-6" style={{ color: colors.primary }} />,
      title: "A Video Sales Message That Builds Trust Fast",
      desc: "We create a core video that does the selling your website usually fails to do—explaining your process, answering objections, and making people feel confident taking the next step."
    },
    {
      icon: <Award className="w-6 h-6" style={{ color: colors.primary }} />,
      title: "Proof That Lowers Buying Resistance",
      desc: "We turn your best work, best clients, and best results into testimonials, project breakdowns, and trust assets that make the estimate request feel safer."
    },
    {
      icon: <TrendingUp className="w-6 h-6" style={{ color: colors.primary }} />,
      title: "A Conversion-Focused Funnel",
      desc: "We rebuild the page flow, calls-to-action, and follow-up so your existing traffic is more likely to turn into qualified booked estimates."
    }
  ];

  const processSteps = [
    {
      title: "The Funnel Audit",
      desc: "We review your current website, traffic flow, messaging, offer, and calls-to-action to find where leads are dropping off."
    },
    {
      title: "Message + Offer Refinement",
      desc: "We sharpen the positioning so your business stands out clearly in your market and speaks directly to the jobs you actually want more of."
    },
    {
      title: "Video + Proof Asset Production",
      desc: "We create the core trust-building assets—your VSL, testimonial videos, project proof, and supporting content that helps prospects feel confident before they ever talk to you."
    },
    {
      title: "Funnel Build + Launch",
      desc: "We install the new page structure, trust sequence, and conversion path so traffic has a better chance of becoming a booked estimate."
    }
  ];

  const faqs = [
    {
      q: "Who is this best for?",
      a: "This is best for established contractors and home service businesses already getting some traffic, referrals, or word-of-mouth—but not converting enough of it into qualified booked estimates."
    },
    {
      q: "Is this just video production?",
      a: "No. Video is part of the system, but the real goal is conversion. We help improve the message, page structure, proof assets, and next steps so your traffic turns into more opportunities."
    },
    {
      q: "Do I need to run ads for this to work?",
      a: "No. This works with paid traffic, organic traffic, referrals, direct visits, and existing brand attention. The goal is to help more of your current traffic convert."
    },
    {
      q: "How long does this take?",
      a: "Most builds are installed in about 30 days, with performance improvements expected over the following 90 days depending on traffic quality and sales process."
    },
    {
      q: "What if we already have a website?",
      a: "That's fine. In many cases, we improve what's already there—or rebuild the parts that are hurting conversion."
    },
    {
      q: "Do you work with every kind of business?",
      a: "No. This offer is best for high-trust service businesses, especially contractors and home service companies with real proof, solid fulfillment, and a desire to grow."
    },
    {
      q: "What makes this different from a normal agency?",
      a: "Most agencies sell traffic or content. We focus on the trust and conversion layer that turns attention into actual booked estimates."
    }
  ];

  const deliverables = [
    "Funnel audit and opportunity analysis",
    "Offer/message refinement",
    "Core VSL script + production",
    "Testimonial / proof asset strategy",
    "Contractor-specific landing page structure",
    "CTA and estimate-request flow",
    "Trust-building section copy",
    "Basic follow-up recommendations",
    "Launch support"
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans" style={{ '--color-primary': colors.primary, '--color-accent': colors.accent } as React.CSSProperties}>

      {/* Navbar */}
      <nav className="fixed w-full top-0 bg-white/95 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/gregory-standal-sig-logo-blue.svg"
              alt="Gregory Standal"
              className="h-8 md:h-10"
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold" style={{ color: colors.primary }}>
            <a href="#framework" className="hover:opacity-70 transition">The Framework</a>
            <a href="#results" className="hover:opacity-70 transition">Case Studies</a>
            <a
              href="#audit"
              className="text-white px-5 py-2.5 rounded-full transition hover:opacity-90"
              style={{ backgroundColor: colors.primary }}
            >
              Get a Funnel Audit
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-6 flex flex-col items-center text-center relative overflow-hidden">

        {/* Subtle background gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-[600px] -z-10 opacity-5"
          style={{ background: `linear-gradient(180deg, ${colors.primary} 0%, transparent 100%)` }}
        />

        {/* Pre-headline strip */}
        <div
          className="inline-flex items-center px-4 py-2 rounded-full border mb-6"
          style={{ borderColor: colors.primary + '20', backgroundColor: colors.primary + '08' }}
        >
          <span className="text-sm font-medium" style={{ color: colors.primary }}>
            For established contractors and home service businesses
          </span>
        </div>

        {/* Headline - clean, single color */}
        <h1
          className="text-4xl md:text-6xl font-black tracking-tight max-w-4xl leading-[1.1] mb-5"
          style={{ color: colors.primary }}
        >
          Turn More of Your Existing Traffic Into Qualified Booked Estimates.
        </h1>

        {/* Subhead - compact single paragraph */}
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-8 leading-relaxed">
          We install a video-driven Booked Estimate Engine so your website, ads, and attention turn into more high-quality estimates in the next 90 days.
        </p>

        {/* CTA Button */}
        <a
          href="#audit"
          className="py-4 px-8 rounded-xl font-bold text-lg text-white transition shadow-lg flex items-center justify-center gap-2 group hover:opacity-90"
          style={{
            backgroundColor: colors.accent,
            boxShadow: `0 10px 25px -5px ${colors.accent}40`
          }}
        >
          Claim Your Free Funnel Audit
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>

        {/* Microcopy - smaller and lighter */}
        <p className="mt-3 text-sm text-slate-500 max-w-md">
          In a 45-minute audit, we&apos;ll show you exactly where your current funnel is leaking booked estimates.
        </p>

        {/* 3 Supporting benefit lines - visually quiet */}
        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" style={{ color: colors.primary }} />
            <span>More qualified booked estimates</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" style={{ color: colors.primary }} />
            <span>Higher trust before the sales call</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" style={{ color: colors.primary }} />
            <span>No need to post content every day</span>
          </div>
        </div>

        {/* Hero Visual - Greg on camera */}
        <div className="mt-12 w-full max-w-3xl relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white group cursor-pointer">
          <div className="aspect-video relative">
            <img
              src="/greg-video-thumbnail.png"
              alt="Greg Standal"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col items-center justify-center transition group-hover:from-black/40">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-3 transform group-hover:scale-110 transition"
                style={{
                  backgroundColor: colors.accent,
                  boxShadow: `0 8px 20px -4px ${colors.accent}60`
                }}
              >
                <Play className="w-6 h-6 text-white fill-white ml-0.5" />
              </div>
              <p className="text-white font-semibold text-sm drop-shadow-md">See How the Booked Estimate Engine Works</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="font-bold tracking-wider text-sm uppercase mb-3" style={{ color: colors.accent }}>The Hard Truth</div>
            <h2 className="text-4xl font-black mb-6 leading-tight" style={{ color: colors.primary }}>
              A pretty website won&apos;t book estimates.
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Most contractor websites look fine—but they don&apos;t do the one thing that matters: <strong style={{ color: colors.primary }}>build enough trust to get the right prospect to take the next step.</strong>
              </p>
              <p>
                So traffic comes in. People browse. They compare you to three other companies. And then they leave without calling, booking, or requesting an estimate.
              </p>
              <p>
                The problem usually isn&apos;t traffic alone. It&apos;s that your site doesn&apos;t clearly answer:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span style={{ color: colors.primary }} className="mt-1">•</span>
                  Why choose you?
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: colors.primary }} className="mt-1">•</span>
                  Why trust you?
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: colors.primary }} className="mt-1">•</span>
                  What makes you different?
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: colors.primary }} className="mt-1">•</span>
                  What happens next?
                </li>
              </ul>
              <p className="font-semibold pl-4 py-2 bg-slate-50" style={{ color: colors.primary, borderLeft: `4px solid ${colors.primary}` }}>
                You don&apos;t need &quot;more marketing.&quot; You need a site and sales message that turns attention into booked estimates.
              </p>
            </div>
          </div>

          {/* Visual Shift Diagram */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <h3 className="text-xl font-bold mb-6 text-center" style={{ color: colors.primary }}>The Conversion Shift</h3>

            <div className="flex justify-between items-center mb-4">
              <span className="font-bold" style={{ color: colors.accent }}>The Old Way</span>
              <span className="text-slate-400 text-sm">Leaking Leads</span>
            </div>
            <div className="flex gap-2 mb-8">
               <div className="h-16 flex-1 bg-white border rounded-lg flex items-center justify-center text-xs font-bold text-slate-500" style={{ borderColor: colors.accent + '40' }}>Traffic</div>
               <ArrowRight className="w-4 text-slate-300 my-auto" />
               <div className="h-16 flex-1 bg-white border rounded-lg flex items-center justify-center text-xs font-bold text-slate-500 flex-col" style={{ borderColor: colors.accent + '40' }}>
                 Generic Website
               </div>
               <ArrowRight className="w-4 text-slate-300 my-auto" />
               <div className="h-16 flex-1 bg-white border rounded-lg flex items-center justify-center text-xs font-bold flex-col" style={{ borderColor: colors.accent + '40', color: colors.accent }}>
                 Confusion
               </div>
               <ArrowRight className="w-4 text-slate-300 my-auto" />
               <div className="h-16 flex-[0.7] bg-slate-200 rounded-lg flex items-center justify-center text-xs font-bold text-slate-400">Bounce</div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="font-bold" style={{ color: colors.primary }}>The New Way</span>
              <span className="text-slate-400 text-sm">Converting Traffic</span>
            </div>
            <div className="flex gap-2">
               <div className="h-20 flex-1 bg-white border justify-center rounded-lg flex items-center text-xs font-bold text-slate-600 text-center px-1" style={{ borderColor: colors.primary + '30' }}>Ad / Google / Referral</div>
               <ArrowRight className="w-4 my-auto" style={{ color: colors.primary }} />
               <div className="h-20 flex-1 bg-white border rounded-lg flex items-center justify-center text-xs font-bold text-slate-600 text-center px-1" style={{ borderColor: colors.primary + '30' }}>
                 Contractor Landing Page
               </div>
               <ArrowRight className="w-4 my-auto" style={{ color: colors.primary }} />
               <div className="h-20 flex-1 border rounded-lg flex items-center justify-center text-xs font-bold text-center px-1" style={{ backgroundColor: colors.primary + '10', borderColor: colors.primary, color: colors.primary }}>
                 Trust Video + Proof
               </div>
               <ArrowRight className="w-4 my-auto" style={{ color: colors.primary }} />
               <div className="h-20 flex-1 rounded-lg flex items-center justify-center text-xs font-bold text-white text-center px-1" style={{ backgroundColor: colors.primary }}>
                 Estimate Request
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features / How We Build */}
      <section id="framework" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black mb-4" style={{ color: colors.primary }}>How We Build Your Booked Estimate Engine</h2>
            <p className="text-lg text-slate-600">We don&apos;t just make videos. We install the trust and conversion assets that help the right prospects book.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: colors.primary + '10' }}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg text-slate-700 mt-12 font-medium max-w-3xl mx-auto">
            <strong style={{ color: colors.primary }}>Translation:</strong> more trust before the call, fewer weak leads, and more estimate requests from the traffic you already have.
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 text-white text-center px-6" style={{ backgroundColor: colors.primary }}>
         <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
            <div>
              <div className="text-2xl md:text-3xl font-black mb-1">Qualified Leads</div>
              <div className="text-white/70 text-sm font-medium">Better-fit prospects</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black mb-1">Higher Trust</div>
              <div className="text-white/70 text-sm font-medium">Before the first call</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black mb-1">90-Day Window</div>
              <div className="text-white/70 text-sm font-medium">Expect measurable results</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black mb-1">Risk-Reversed</div>
              <div className="text-white/70 text-sm font-medium">Implementation guarantee</div>
            </div>
         </div>
      </section>

      {/* The Process */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative line connecting numbers */}
        <div className="absolute left-1/2 top-40 bottom-24 w-0.5 bg-slate-100 hidden md:block" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black mb-4" style={{ color: colors.primary }}>The Booked Estimate Engine Process</h2>
            <p className="text-slate-600">A simple, done-for-you process that turns your current traffic into more qualified estimate requests.</p>
          </div>

          <div className="space-y-12">
            {processSteps.map((step, i) => (
              <div key={i} className="relative flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="md:w-1/2 flex justify-end md:text-right">
                  {i % 2 === 0 && (
                    <div className="hidden md:block">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>{step.title}</h3>
                      <p className="text-slate-600">{step.desc}</p>
                    </div>
                  )}
                </div>

                <div className="w-16 h-16 rounded-full bg-white border-4 border-slate-100 shadow-sm flex items-center justify-center font-black text-xl shrink-0 mx-auto md:mx-0 relative z-10" style={{ color: colors.primary }}>
                  0{i+1}
                </div>

                <div className="md:w-1/2">
                   {i % 2 !== 0 && (
                    <div className="hidden md:block">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>{step.title}</h3>
                      <p className="text-slate-600">{step.desc}</p>
                    </div>
                  )}
                  {/* Mobile View */}
                  <div className="block md:hidden text-center">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>{step.title}</h3>
                      <p className="text-slate-600">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 mt-16 text-sm max-w-2xl mx-auto border-t border-slate-200 pt-8">
            This is built for established businesses already getting some traffic, referrals, or attention—but not converting enough of it into qualified opportunities.
          </p>
        </div>
      </section>

      {/* What You Get Stack */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4" style={{ color: colors.primary }}>What We Build For You</h2>
            <p className="text-slate-600">A complete system—not just a video or a website tweak.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-4">
              {deliverables.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
                  <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: colors.primary }} />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For / Not For */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4" style={{ color: colors.primary }}>Is This Right For You?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* This Is For */}
            <div className="border rounded-2xl p-8" style={{ backgroundColor: colors.primary + '08', borderColor: colors.primary + '20' }}>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: colors.primary }}>
                <CheckCircle2 className="w-6 h-6" />
                This Is For You If...
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: colors.primary }} />
                  <span>You&apos;re an established contractor or service business</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: colors.primary }} />
                  <span>You have real work quality and good customer experience</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: colors.primary }} />
                  <span>You&apos;re already getting some traffic, referrals, or market attention</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: colors.primary }} />
                  <span>You want better leads, not just more content</span>
                </li>
              </ul>
            </div>

            {/* This Is Not For */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                <XCircle className="w-6 h-6" />
                This Is NOT For You If...
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-600">
                  <XCircle className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <span>You&apos;re a brand new business with no proof or track record</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <XCircle className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <span>You&apos;re looking for cheap video production only</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <XCircle className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <span>You don&apos;t have capacity to take on more jobs right now</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Highlight */}
      <section id="results" className="py-24 text-white px-6" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif italic font-medium leading-tight mb-4">
              Results That Made the Sales Process Easier
            </h2>
            <p className="text-white/60 text-lg">Proof from businesses that needed better leads—not more noise.</p>
            <div className="flex justify-center gap-1 mt-4" style={{ color: colors.accent }}>
              <Star className="fill-current w-6 h-6"/>
              <Star className="fill-current w-6 h-6"/>
              <Star className="fill-current w-6 h-6"/>
              <Star className="fill-current w-6 h-6"/>
              <Star className="fill-current w-6 h-6"/>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "/Christine_Thares_review.png",
              "/Irwin_Stromeyer_review.png",
              "/Joe_Abela_review.png",
              "/John_Stahl_review.png",
              "/Natalie_M_review.png",
              "/Thomas_Miller_review.png"
            ].map((src, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-white/5">
                <img src={src} alt="Client Review" className="w-full h-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-4" style={{ color: colors.primary }}>Straight Answers Before You Book</h2>
          <p className="text-center text-slate-600 mb-12">Common questions about the Booked Estimate Engine.</p>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 font-bold flex justify-between items-center focus:outline-none"
                  style={{ color: colors.primary }}
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-6 text-slate-600 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="audit" className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: colors.primary }}>Stop Letting Good Traffic Slip Away.</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Book a free 45-minute Funnel Audit and we&apos;ll show you where your current website, message, and follow-up are costing you qualified estimate requests.
          </p>
          <div className="bg-slate-50 border border-slate-200 p-8 md:p-12 rounded-3xl shadow-sm">
            <form className="max-w-md mx-auto space-y-4 text-left">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  placeholder="Your business name"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none transition"
                  style={{ '--tw-ring-color': colors.primary } as React.CSSProperties}
                  onFocus={(e) => { e.target.style.borderColor = colors.primary; e.target.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                  onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Website</label>
                <input
                  type="url"
                  placeholder="https://"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none transition"
                  onFocus={(e) => { e.target.style.borderColor = colors.primary; e.target.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                  onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none transition"
                    onFocus={(e) => { e.target.style.borderColor = colors.primary; e.target.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                    onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none transition"
                    onFocus={(e) => { e.target.style.borderColor = colors.primary; e.target.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                    onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Monthly Revenue or Ad Spend</label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none transition bg-white"
                  onFocus={(e) => { e.target.style.borderColor = colors.primary; e.target.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                  onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
                >
                  <option>Under $50k/month</option>
                  <option>$50k - $100k/month</option>
                  <option>$100k - $250k/month</option>
                  <option>$250k+/month</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">What kind of jobs do you want more of? (optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Kitchen remodels, exterior painting, etc."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none transition"
                  onFocus={(e) => { e.target.style.borderColor = colors.primary; e.target.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                  onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <button
                type="button"
                className="w-full text-white font-bold py-4 rounded-xl transition mt-4 hover:opacity-90"
                style={{
                  backgroundColor: colors.accent,
                  boxShadow: `0 10px 25px -5px ${colors.accent}30`
                }}
              >
                Request My Free Funnel Audit
              </button>
              <p className="text-xs text-center text-slate-500 mt-4">
                No hard pitch. Just a direct breakdown of what&apos;s helping, what&apos;s hurting, and what we&apos;d fix first.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <img
                src="/gregory-standal-sig-logo-blue.svg"
                alt="Gregory Standal"
                className="h-8"
              />
              <p className="text-sm text-slate-500 font-medium">Booked Estimate Engine for Contractors</p>
            </div>
            <div className="flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#framework" className="hover:opacity-70 transition" style={{ color: colors.primary }}>Framework</a>
              <a href="#results" className="hover:opacity-70 transition" style={{ color: colors.primary }}>Case Studies</a>
              <a href="#audit" className="hover:opacity-70 transition" style={{ color: colors.primary }}>Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} Greg Standal. Helping service businesses turn trust into revenue.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
