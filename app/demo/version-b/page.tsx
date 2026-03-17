"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Star,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  Video,
  Wrench,
  TrendingUp,
  XCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const colors = {
  primary: '#002542',
  accent: '#F70118', // New Cape Pictures Red
  yellow: '#f1b40c', // New Cape Pictures Yellow
};

const faqs = [
  {
    question: "What is the typical pricing ballpark?",
    answer: "Every market and business is different, but our video-funnel system is an investment designed to yield a 5x-10x return. We'll give you exact numbers on our strategy call once we understand your capacity."
  },
  {
    question: "Do you offer area exclusivity?",
    answer: "Yes. We only work with one contractor per trade in a specific geographic radius to ensure we aren't competing against ourselves for your leads."
  },
  {
    question: "What are the filming logistics like?",
    answer: "We spend a single, highly-focused day on-site capturing your team, your jobs, and customer stories. We handle all the direction so you can keep running your business."
  },
  {
    question: "How much should we expect to spend on ads?",
    answer: "We recommend starting with a minimum ad budget of $1,500 - $3,000/month to feed the funnel enough data to optimize quickly."
  },
  {
    question: "Is there a long-term contract?",
    answer: "No long-term traps. We build the assets, launch the funnel, and prove the ROI in the first 90 days. If you want us to keep managing and scaling it after that, it's month-to-month."
  }
];

export default function NewCapeVersionB() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById("booking-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white text-slate-900 antialiased font-sans selection:bg-[#F70118]/20">
      
      {/* 1. Header (Minimal for funnel focus) */}
      <header className="w-full z-50 bg-white border-b border-slate-200 py-4 fixed top-0 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center md:justify-start">
          <div className="flex items-center gap-2">
            <Image 
              src="https://newcapepictures.com/wp-content/uploads/2025/07/header-logo-glow.png" 
              alt="New Cape Pictures" 
              width={200}
              height={64}
              className="h-12 md:h-16 w-auto cursor-pointer hover:opacity-80 transition" 
            />
          </div>
        </div>
      </header>

      {/* 2. Hero: Call out, pain, concrete promise */}
      <section className="pt-32 pb-20 px-4 bg-[#002542] relative overflow-hidden text-white">
        <div className="absolute inset-0 z-0 opacity-20">
             <Image 
               src="https://newcapepictures.com/wp-content/uploads/2025/12/spectrum-case-studt-hero-1024x572.jpg" 
               alt="Contractor Job Site" 
               fill
               className="object-cover grayscale mix-blend-overlay" 
             />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm md:text-base font-black tracking-wide uppercase mb-8 border-2" style={{ backgroundColor: colors.accent, borderColor: colors.accent, color: 'white' }}>
            Home Improvement Contractors
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-8">
            Turn Job-Site Video Into <span style={{ color: colors.yellow }}>15–30 More Booked Estimates</span> Per Month
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-medium mx-auto max-w-4xl">
            You&apos;ve been burned by &apos;lead gen&apos; agencies sending fake numbers and uncontactable &apos;leads.&apos; We film your real jobs, build video ads and follow-up systems, and don&apos;t stop until your team is taking more qualified calls.
          </p>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={scrollToForm}
              className="group text-white px-10 py-5 md:px-12 md:py-6 rounded-full font-black text-xl md:text-2xl transition-all shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center gap-3 uppercase border-2 border-transparent hover:border-white"
              style={{ backgroundColor: colors.accent }}
            >
              Book Your Free Pipeline Planning Call
            </button>
            <p className="text-sm font-bold text-slate-400 mt-2">
              See exactly how many extra estimates we can realistically add in the next 90 days.
            </p>
          </div>
        </div>
      </section>

      {/* 3. "Why contractors hire us" (outcomes, not "why video") */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-[#002542] tracking-tight">
              Why The Best Contractors Hire Us
            </h2>
            <p className="text-xl text-slate-600 font-medium max-w-3xl mx-auto">
              We know you&apos;ve likely dealt with agencies that promise the world and deliver spreadsheets full of bad numbers. Here is what we measure and guarantee that they don&apos;t.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner" style={{ backgroundColor: colors.primary + '15', color: colors.primary }}>
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-[#002542]">More Booked Estimates</h3>
              <p className="text-slate-600 font-medium text-lg leading-relaxed">
                We squeeze more juice out of the traffic you already have by building an ironclad trust layer on your landing pages.
              </p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner" style={{ backgroundColor: colors.primary + '15', color: colors.primary }}>
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-[#002542]">Fewer No-Shows</h3>
              <p className="text-slate-600 font-medium text-lg leading-relaxed">
                With automated video reminders and follow-up sequences built into the funnel, prospects actually show up to the estimate ready to buy.
              </p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner" style={{ backgroundColor: colors.primary + '15', color: colors.primary }}>
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-[#002542]">No Chasing Dead Leads</h3>
              <p className="text-slate-600 font-medium text-lg leading-relaxed">
                We optimize for contact rate, show rate, and closed jobs—not just cheap form fills that waste your sales team&apos;s time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Simple 3-step process */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-[#002542] tracking-tight">
              A Simple, Bulletproof Process
            </h2>
            <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
              We do the heavy lifting. You keep running your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-12 h-1 bg-slate-100 z-0" style={{ width: '66%', left: '16.66%' }}></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center font-black text-3xl shadow-xl border-4 border-white mb-6 text-white" style={{ backgroundColor: colors.primary }}>
                <Video className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-[#002542]">1. Film</h3>
              <p className="text-slate-600 font-medium text-lg">
                We spend a day on-site capturing jobs, team, and customer stories.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center font-black text-3xl shadow-xl border-4 border-white mb-6 text-white" style={{ backgroundColor: colors.accent }}>
                <Wrench className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-[#002542]">2. Build</h3>
              <p className="text-slate-600 font-medium text-lg">
                We turn that footage into video ads, a brand story, and a high-converting &apos;book-an-estimate&apos; funnel.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center font-black text-3xl shadow-xl border-4 border-white mb-6 text-[#002542]" style={{ backgroundColor: colors.yellow }}>
                <TrendingUp className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black mb-3 text-[#002542]">3. Fill</h3>
              <p className="text-slate-600 font-medium text-lg">
                We launch, track calls and form-fills, and keep iterating until your calendar is full of qualified estimates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Concrete deliverables tied to money */}
      <section className="py-24 bg-[#002542] text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white/5 border border-white/10 p-8 md:p-16 rounded-[2.5rem] shadow-2xl backdrop-blur-sm">
            <h2 className="text-3xl md:text-5xl font-black mb-10 tracking-tight text-center">
              The Arsenal That Drives Revenue
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-lg font-bold text-slate-200">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-[#f1b40c] shrink-0 mt-0.5" />
                <span>3–5 scroll-stopping video ads to generate new estimate requests</span>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-[#f1b40c] shrink-0 mt-0.5" />
                <span>1 brand story video to use on your site and in follow-up</span>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-[#f1b40c] shrink-0 mt-0.5" />
                <span>Retargeting clips to convert past visitors</span>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-[#f1b40c] shrink-0 mt-0.5" />
                <span>Done-for-you landing page and booking flow</span>
              </div>
              <div className="flex items-start gap-4 md:col-span-2 md:justify-center">
                <CheckCircle className="w-8 h-8 text-[#f1b40c] shrink-0 mt-0.5" />
                <span>Lead handling playbook so your office turns more calls into jobs</span>
              </div>
            </div>
            <div className="mt-12 flex justify-center">
              <button
                onClick={scrollToForm}
                className="text-[#002542] px-10 py-5 rounded-full font-black text-xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 uppercase border-2 border-transparent hover:border-white"
                style={{ backgroundColor: colors.yellow }}
              >
                Get This System Built For You
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Proof section (before/after + numbers) */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-[#002542] tracking-tight">
              Real Numbers from Real Contractors
            </h2>
            <div className="flex items-center justify-center gap-2 text-[#f1b40c] mb-10">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-8 h-8 fill-current drop-shadow-sm" />)}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16 max-w-5xl mx-auto">
            {/* Mini Case Tile 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#F70118] text-white px-4 py-1 text-xs font-black uppercase tracking-widest rounded-bl-xl">Roofing</div>
              <div className="flex items-center gap-4 mb-2">
                <Image 
                  src="https://newcapepictures.com/wp-content/uploads/2021/11/bella-contracting.jpg" 
                  alt="Roofing case study" 
                  width={64}
                  height={64}
                  className="rounded-full object-cover shadow-sm" 
                />
                <div>
                  <h4 className="font-black text-xl text-[#002542]">Roofing Company in NJ</h4>
                  <div className="text-[#f1b40c] flex gap-1"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
                </div>
              </div>
              <ul className="space-y-2 font-bold text-slate-700 text-lg">
                <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-green-500" /> 28 booked estimates in 30 days</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-green-500" /> 37% close rate</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-green-500" /> +$92K in pipeline</li>
              </ul>
            </div>

            {/* Mini Case Tile 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#F70118] text-white px-4 py-1 text-xs font-black uppercase tracking-widest rounded-bl-xl">Remodeling</div>
              <div className="flex items-center gap-4 mb-2">
                <Image 
                  src="https://newcapepictures.com/wp-content/uploads/2025/12/pb-innovations.jpg" 
                  alt="Remodeling case study" 
                  width={64}
                  height={64}
                  className="rounded-full object-cover shadow-sm" 
                />
                <div>
                  <h4 className="font-black text-xl text-[#002542]">Remodeler in PA</h4>
                  <div className="text-[#f1b40c] flex gap-1"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
                </div>
              </div>
              <ul className="space-y-2 font-bold text-slate-700 text-lg">
                <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-green-500" /> From 0 video presence</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-green-500" /> To 2–3 extra kitchen leads per week</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-green-500" /> Achieved in 8 weeks</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={scrollToForm}
              className="text-white px-10 py-5 rounded-full font-black text-xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 uppercase"
              style={{ backgroundColor: colors.accent }}
            >
              See If We Can Fill Your Estimate Calendar
            </button>
          </div>
        </div>
      </section>

      {/* 7. "Who this is for" / "Who this is not for" */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-[#002542] tracking-tight">
              We Cannot Help Everyone
            </h2>
            <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
              This system is powerful, but it requires a solid operational foundation to actually work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For */}
            <div className="bg-green-50/50 border-2 border-green-200 rounded-3xl p-8 md:p-12 shadow-sm">
              <h3 className="text-2xl font-black text-green-800 mb-8 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" /> Who This Is For
              </h3>
              <ul className="space-y-4 text-lg font-bold text-green-900">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2.5 rounded-full bg-green-500 shrink-0"></div>
                  Roofing, remodeling, windows/doors, siding, and flooring contractors
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2.5 rounded-full bg-green-500 shrink-0"></div>
                  Doing at least $50k/month in revenue
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2.5 rounded-full bg-green-500 shrink-0"></div>
                  Can operationally handle 10+ extra estimates per month
                </li>
              </ul>
            </div>

            {/* Not For */}
            <div className="bg-red-50/50 border-2 border-red-200 rounded-3xl p-8 md:p-12 shadow-sm">
              <h3 className="text-2xl font-black text-red-800 mb-8 flex items-center gap-3">
                <XCircle className="w-8 h-8 text-red-600" /> Who This Is NOT For
              </h3>
              <ul className="space-y-4 text-lg font-bold text-red-900">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2.5 rounded-full bg-red-500 shrink-0"></div>
                  One-man handymen or brand new startups
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2.5 rounded-full bg-red-500 shrink-0"></div>
                  Contractors with terrible reviews and no customer proof
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2.5 rounded-full bg-red-500 shrink-0"></div>
                  No capacity to take on more work right now
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Offer + guarantee block & Form + scheduler */}
      <section id="booking-section" className="py-24 bg-[#002542] relative">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Offer & Guarantee */}
          <div className="text-white lg:sticky lg:top-32">
            <div className="inline-block px-4 py-1.5 bg-[#f1b40c]/20 text-[#f1b40c] font-black uppercase text-sm rounded-full mb-8 tracking-widest border border-[#f1b40c]/30">
              The Brand & Booked-Estimate System
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight">
              We plan, film, build your video funnel, and optimize...
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed mb-12">
              ...until you&apos;re consistently getting more booked estimates from qualified homeowners.
            </p>

            <div className="bg-white/10 border-2 border-[#f1b40c]/50 p-8 md:p-10 rounded-3xl relative shadow-2xl backdrop-blur-md">
              <div className="absolute -top-6 left-8 bg-[#f1b40c] text-[#002542] w-14 h-14 flex items-center justify-center rounded-2xl shadow-xl rotate-12 border-2 border-white">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-black text-2xl md:text-3xl text-white mb-4 ml-2 mt-2">The 90-Day Risk Reversal</h3>
              <p className="text-slate-200 text-xl font-bold leading-relaxed italic ml-2">
                &quot;If at the end of 90 days you haven&apos;t seen a meaningful increase in <span className="underline decoration-[#f1b40c] decoration-4 underline-offset-4">contactable</span> estimate requests, we&apos;ll work for free until you do.&quot;
              </p>
            </div>
          </div>

          {/* Right Side: Form / Booking */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative border-4" style={{ borderColor: colors.accent }}>
            <h3 className="text-3xl font-black mb-3 text-[#002542]">Book Your Pipeline Call</h3>
            <p className="text-slate-600 font-bold mb-8 text-lg">Tell us about your business, and we&apos;ll see if the math makes sense for a partnership.</p>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Name</label>
                  <input type="text" required className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl outline-none transition focus:border-[#002542] text-[#002542] font-bold" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Company</label>
                  <input type="text" required className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl outline-none transition focus:border-[#002542] text-[#002542] font-bold" placeholder="Acme Roofing" />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Trade</label>
                  <input type="text" required className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl outline-none transition focus:border-[#002542] text-[#002542] font-bold" placeholder="e.g. Roofing, Windows" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">City</label>
                  <input type="text" required className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl outline-none transition focus:border-[#002542] text-[#002542] font-bold" placeholder="Dallas, TX" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest block">How many new jobs could you actually handle in the next 60 days?</label>
                <select className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl outline-none transition focus:border-[#002542] text-[#002542] font-bold appearance-none cursor-pointer">
                  <option>1 - 5 jobs</option>
                  <option>6 - 15 jobs</option>
                  <option>16 - 30+ jobs</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest block">How soon are you looking to improve your marketing?</label>
                <div className="grid sm:grid-cols-3 gap-3">
                  <label className="border-2 border-slate-200 rounded-xl p-3 text-center cursor-pointer hover:bg-slate-50 transition has-checked:border-[#002542] has-checked:bg-[#002542]/5">
                    <input type="radio" name="timeline" className="hidden" />
                    <span className="font-bold text-sm text-[#002542]">Right now</span>
                  </label>
                  <label className="border-2 border-slate-200 rounded-xl p-3 text-center cursor-pointer hover:bg-slate-50 transition has-checked:border-[#002542] has-checked:bg-[#002542]/5">
                    <input type="radio" name="timeline" className="hidden" />
                    <span className="font-bold text-sm text-[#002542]">1–3 months</span>
                  </label>
                  <label className="border-2 border-slate-200 rounded-xl p-3 text-center cursor-pointer hover:bg-slate-50 transition has-checked:border-[#002542] has-checked:bg-[#002542]/5">
                    <input type="radio" name="timeline" className="hidden" />
                    <span className="font-bold text-sm text-[#002542]">Just browsing</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest block">Are you the decision-maker?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-[#002542]">
                    <input type="radio" name="dm" className="w-5 h-5 accent-[#002542]" /> Yes
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-[#002542]">
                    <input type="radio" name="dm" className="w-5 h-5 accent-[#002542]" /> No, I&apos;ll bring them
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white py-6 rounded-2xl font-black text-2xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 uppercase mt-8"
                style={{ backgroundColor: colors.accent }}
              >
                Proceed To Calendar
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 9. Final CTA section + FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-[#002542]">
              Ready to stop paying for &apos;leads&apos; that don&apos;t pick up?
            </h2>
            <button
              onClick={scrollToForm}
              className="text-white px-12 py-6 rounded-full font-black text-2xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 uppercase border-2 border-transparent hover:border-[#002542]"
              style={{ backgroundColor: colors.accent }}
            >
              See If We Can Fill Your Estimate Calendar
            </button>
          </div>

          <div className="mt-24">
            <h3 className="text-3xl font-black text-center mb-10 text-[#002542] uppercase tracking-widest">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="overflow-hidden border-2 border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left transition-all hover:bg-slate-50 focus:outline-none"
                  >
                    <span className="text-lg font-black text-[#002542] pr-8">{faq.question}</span>
                    {openFaq === index ? <ChevronUp size={24} className="text-slate-400 shrink-0" /> : <ChevronDown size={24} className="text-slate-400 shrink-0" />}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6 text-slate-600 font-medium text-lg leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-200 text-center">
        <div className="mb-6 flex justify-center">
          <Image 
            src="https://newcapepictures.com/wp-content/uploads/2025/07/header-logo-glow.png" 
            alt="New Cape Pictures" 
            width={120}
            height={40}
            className="h-10 w-auto opacity-80" 
          />
        </div>
        <p className="font-bold text-slate-500 text-sm">© {new Date().getFullYear()} New Cape Pictures. All rights reserved.</p>
      </footer>
    </div>
  );
}