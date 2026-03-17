"use client";
import React, { useState } from 'react';
import {
  Play,
  CheckCircle,
  XCircle,
  ArrowRight,
  TrendingUp,
  Video,
  BarChart3,
  CalendarDays
} from 'lucide-react';

const colors = {
  primary: '#002542',
  accent: '#F70118',
  yellow: '#f1b40c',
};

export default function ApplicationPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const scrollToApply = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("apply-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-slate-50 text-slate-900 antialiased font-sans selection:bg-[#F70118]/20 min-h-screen flex flex-col">
      
      {/* Header */}
      <header className="w-full z-50 bg-white border-b border-slate-200 py-4 fixed top-0 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center md:justify-start">
          <img src="/gregory-standal-sig-logo-blue.svg" alt="Greg Standal" className="h-10 cursor-pointer hover:opacity-80 transition" />
        </div>
      </header>

      <main className="flex-1 pt-24 pb-0">
        {/* Hero */}
        <section className="px-4 py-12 md:py-20 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-[#002542]">
            Turn the Traffic You Already Have into <span style={{ color: colors.accent }}>5–20 More Qualified Estimates</span> per Month
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed font-medium mx-auto max-w-3xl">
            For established home improvement and service businesses already spending on marketing but not seeing their calendar fill with real sales opportunities.
          </p>

          <p className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">
            Watch this 4‑minute breakdown to see if your problem is traffic… or conversion.
          </p>

          <div className="relative w-full max-w-4xl mx-auto aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden mb-10 group cursor-pointer border border-slate-200" onClick={() => setIsVideoModalOpen(true)}>
             <img src="/greg-video-thumbnail.png" alt="4-minute breakdown" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-500" />
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300" style={{ backgroundColor: colors.yellow }}>
                  <Play className="w-8 h-8 text-black fill-black ml-1" />
                </div>
             </div>
          </div>

          <div className="flex justify-center">
            <a
              href="#apply-section"
              onClick={scrollToApply}
              className="group text-white px-10 py-5 rounded-full font-black text-xl md:text-2xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 flex items-center gap-3 uppercase text-center"
              style={{ backgroundColor: colors.accent }}
            >
              Yes, I Want My Funnel Diagnostic
            </a>
          </div>
        </section>

        {/* Results Strip */}
        <section className="bg-[#002542] text-white py-12 px-4 border-y border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left mb-10">
              <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="font-bold text-[#f1b40c] text-lg">AG Williams Painting</span>
                <span className="text-sm text-slate-300">+$28,000 in booked jobs in 30 days</span>
              </div>
              <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="font-bold text-[#f1b40c] text-lg">Bella Contracting</span>
                <span className="text-sm text-slate-300">80% more qualified leads, nearly 12x return in 60 days</span>
              </div>
              <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="font-bold text-[#f1b40c] text-lg">Jan Fence</span>
                <span className="text-sm text-slate-300">30% more lead volume + higher form conversion (hundreds of thousands in booked jobs over time)</span>
              </div>
              <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="font-bold text-[#f1b40c] text-lg">Transworld Business Brokers</span>
                <span className="text-sm text-slate-300">$70,000 in new business in 4 months</span>
              </div>
            </div>
            
            <p className="text-center text-xl md:text-2xl font-black italic tracking-wide">
              &ldquo;Same traffic. Better conversion. That&apos;s the whole game.&rdquo;
            </p>
          </div>
        </section>

        {/* 2-Column Application Area */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Proof & Process */}
            <div className="lg:col-span-5 space-y-16">
              
              {/* How it works */}
              <div>
                <h2 className="text-3xl font-black text-[#002542] mb-8 leading-tight">
                  How the Brand First Video Funnel Fixes Your Conversion Problem
                </h2>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center font-black text-white text-xl shadow-md" style={{ backgroundColor: colors.primary }}>
                      1
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-slate-800 mb-2">Turn visitors into qualified booked estimates</h3>
                      <ul className="space-y-2 text-slate-600 font-medium">
                        <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 shrink-0"/> One focused filming day</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 shrink-0"/> High‑converting video sales page that answers: Who are you, why trust you, how are you different, what happens next</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 shrink-0"/> Short pre‑qualification form with budget + timeline so tire‑kickers filter out</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center font-black text-white text-xl shadow-md" style={{ backgroundColor: colors.primary }}>
                      2
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-slate-800 mb-2">Turn one shoot day into 3–6 months of authority content</h3>
                      <ul className="space-y-2 text-slate-600 font-medium">
                        <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 shrink-0"/> Weekly YouTube show + short clips for social and email</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 shrink-0"/> Stay in front of prospects and make them feel like they already know you before they book</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center font-black text-white text-xl shadow-md" style={{ backgroundColor: colors.primary }}>
                      3
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-slate-800 mb-2">Own everything, track everything</h3>
                      <ul className="space-y-2 text-slate-600 font-medium">
                        <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 shrink-0"/> You keep all accounts, media, and assets</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 shrink-0"/> Within 90 days you have a fully tracked system designed to increase qualified bookings from existing traffic</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Who this is for / isn't for */}
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="p-8 bg-green-50 border-b border-slate-100">
                  <h4 className="font-black text-xl text-green-800 mb-4 flex items-center gap-2"><CheckCircle className="w-6 h-6"/> This is for you if…</h4>
                  <ul className="space-y-3 text-slate-700 font-medium">
                    <li className="flex items-start gap-2"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div> You run a home improvement or service business</li>
                    <li className="flex items-start gap-2"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div> You’re already spending $3k–$10k+ per month on marketing</li>
                    <li className="flex items-start gap-2"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div> You do good work and want more premium jobs, not more tire‑kickers</li>
                  </ul>
                </div>
                <div className="p-8 bg-red-50">
                  <h4 className="font-black text-xl text-red-800 mb-4 flex items-center gap-2"><XCircle className="w-6 h-6"/> This is NOT for you if…</h4>
                  <ul className="space-y-3 text-slate-700 font-medium">
                    <li className="flex items-start gap-2"><div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div> You’re looking for a “viral video” or six figures in two weeks</li>
                    <li className="flex items-start gap-2"><div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div> You’re just starting out with no marketing or track record</li>
                    <li className="flex items-start gap-2"><div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div> You aren’t willing to invest to fix conversion</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Right Column: Application + Calendar */}
            <div id="apply-section" className="lg:col-span-7 bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 md:p-10 sticky top-24">
              <h2 className="text-3xl font-black text-[#002542] mb-4">
                Book Your Free Brand First Funnel Diagnostic
              </h2>
              <p className="text-slate-600 font-medium mb-8 leading-relaxed italic">
                Answer 5 quick questions so we can come prepared with ideas for your market.
              </p>

              {/* Step 1: Form */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#002542] text-white flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="font-bold text-xl text-slate-800">Your Business Details</h3>
                </div>
                
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Full Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#002542] transition" placeholder="John Smith" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Company Name</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#002542] transition" placeholder="Smith Contracting" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Website URL</label>
                      <input type="url" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#002542] transition" placeholder="https://" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Best Phone Number</label>
                      <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#002542] transition" placeholder="(555) 123-4567" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Best Email</label>
                      <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#002542] transition" placeholder="john@company.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Roughly how much do you spend on marketing each month?</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#002542] transition text-slate-700 font-medium">
                      <option>Under $3k</option>
                      <option>$3k – $10k</option>
                      <option>$10k – $25k</option>
                      <option>$25k+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">How soon do you want more qualified estimates coming in?</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#002542] transition text-slate-700 font-medium">
                      <option>ASAP</option>
                      <option>30–60 days</option>
                      <option>Just looking / no rush</option>
                    </select>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">If we show you a clear path to 5–20 more qualified estimates a month, are you willing to invest to implement it?</label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-600"><input type="radio" name="invest" className="w-5 h-5 text-[#002542] focus:ring-[#002542]" /> Yes</label>
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-600"><input type="radio" name="invest" className="w-5 h-5 text-[#002542] focus:ring-[#002542]" /> No</label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Step 2: Calendar Embed */}
              <div className="pt-8 border-t border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#002542] text-white flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="font-bold text-xl text-slate-800">Pick a time that works for you.</h3>
                </div>
                
                <div className="bg-slate-50 rounded-xl overflow-hidden h-[600px] border border-slate-200 relative">
                   {/* Real calendar would go here. Reusing the CRM iframe to mimic functionality */}
                   <iframe src="https://link.cursivecrm.com/widget/booking/tRgGOQiQsmjldJZwy3JE" className="w-full h-full border-none" title="Booking Calendar"></iframe>
                </div>
              </div>

              {/* Risk Reversal / Expectations */}
              <div className="mt-8 bg-blue-50/50 p-6 md:p-8 rounded-2xl border border-blue-100">
                <p className="font-bold text-[#002542] mb-3 uppercase tracking-tight">On this 20‑minute call, we&apos;ll:</p>
                <ul className="space-y-2 text-sm md:text-base text-slate-700 font-bold mb-6">
                  <li className="flex items-start gap-2">• Find the 1–2 biggest leaks in your current funnel</li>
                  <li className="flex items-start gap-2">• Estimate how many extra qualified estimates per month you&apos;re leaving on the table</li>
                  <li className="flex items-start gap-2">• Show you what a Brand First Video Funnel would look like for your business</li>
                </ul>

                <p className="text-sm text-slate-600 font-medium">
                  If it&apos;s a fit, we&apos;ll talk about working together. If not, you still leave with clarity.
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800 text-center">
        <div className="mb-6 flex justify-center">
          <img src="/gregory-standal-sig-logo-white.svg" alt="Greg Standal" className="h-12 opacity-80" />
        </div>
        <p className="font-medium text-slate-500 text-sm mb-4">© {new Date().getFullYear()} Greg Standal. All rights reserved.</p>
        <div className="flex justify-center gap-6">
            <span className="text-slate-600 hover:text-slate-400 text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-slate-600 hover:text-slate-400 text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </footer>

      {/* Video Modal representation */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="w-full max-w-5xl bg-black rounded-2xl overflow-hidden relative shadow-2xl border border-white/10">
                <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-4 right-4 text-white z-10 w-12 h-12 bg-white/10 flex items-center justify-center rounded-full hover:bg-white/20 transition font-bold text-xl">
                    ✕
                </button>
                <div className="aspect-video flex items-center justify-center text-white/50 text-xl font-bold">
                   [Video would load here]
                </div>
            </div>
        </div>
      )}

    </div>
  );
}
