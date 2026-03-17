"use client";
import React, { useState } from 'react';
import {
  ArrowRight, Users, Zap, Play,
  Star, ChevronDown, Target, TrendingUp
} from 'lucide-react';

const App = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const features = [
    {
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      title: "Avatar-Driven Copy",
      desc: "We don't just write words. We interview your best customers and mirror their exact language back to your prospects."
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-600" />,
      title: "Frictionless UX/UI",
      desc: "Every button, form, and layout element is placed based on heatmaps of top-converting B2B funnels."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      title: "The Escalation Offer",
      desc: "A strategically designed 'Risk-Reversal' offer that makes saying NO feel silly to your ideal buyer."
    },
    {
      icon: <Target className="w-6 h-6 text-emerald-600" />,
      title: "Omni-Channel Retargeting",
      desc: "They visited but didn't book? We launch a 7-day surround-sound ad sequence to pull them back in."
    }
  ];

  const processSteps = [
    {
      title: "The 'Tear Down' Call",
      desc: "We rip apart your current funnel, find the bottleneck (Traffic, Offer, or Copy), and map the fix."
    },
    {
      title: "Rapid Assembly",
      desc: "Our team builds your custom landing page, writes the VSL script, and sets up the automations in 14 days."
    },
    {
      title: "The Stress Test",
      desc: "We run initial traffic, measure the drop-off points, and tweak the headlines until the conversion rate stabilizes above benchmark."
    },
    {
      title: "Scale & Automate",
      desc: "Once the math works, we hand you the keys to scale ad spend, knowing every $1 in equals $3+ out."
    }
  ];

  const faqs = [
    {
      q: "We're a B2B SaaS. Will this work for us?",
      a: "Yes. Complex sales cycles actually benefit the most from this approach because we break down the trust-building into micro-commitments on the landing page."
    },
    {
      q: "Do I have to change my whole website?",
      a: "No. We build this as a standalone 'Growth Funnel' that acts as an aggressive acquisition arm, sitting independently from your main corporate site."
    },
    {
      q: "What's the typical timeline?",
      a: "From kickoff to first leads flowing in: 14 to 21 days maximum."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-emerald-200">
      
      {/* Navbar Minimal */}
      <nav className="fixed w-full top-0 bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/gregory-standal-sig-logo-blue.svg" 
              alt="Gregory Standal" 
              className="h-8 md:h-10" 
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#framework" className="hover:text-emerald-600 transition">The Framework</a>
            <a href="#results" className="hover:text-emerald-600 transition">Results</a>
            <a href="#audit" className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-emerald-600 transition">
              Get an Audit
            </a>
          </div>
        </div>
      </nav>

      {/* Extreme Focus Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Subtle background grids/blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-3xl opacity-50 -z-10" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8 animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-slate-600">Accepting 3 new partners this month</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight max-w-4xl leading-[1.1] mb-6">
          Stop Sending Expensive Ad Traffic to a <span className="relative">
            <span className="relative z-10 text-emerald-600">Dead Website.</span>
            <svg className="absolute w-full h-4 -bottom-1 left-0 text-emerald-200 z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" />
            </svg>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mb-12 leading-relaxed font-medium">
          We engineer high-velocity acquisition funnels that convert clicks into qualified sales calls at <strong className="text-slate-900">2x the industry average.</strong>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md mx-auto relative z-10">
          <button className="bg-emerald-600 text-white w-full py-4 px-8 rounded-xl font-bold text-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 group">
            Claim Your Free Funnel Audit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-500 font-medium">
          Includes a 45-min teardown of your current traffic & offer.
        </p>

        {/* VSL / Video Placeholder - The Core Conversion Mechanism */}
        <div className="mt-20 w-full max-w-4xl relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white group cursor-pointer">
          <div className="aspect-video relative">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" 
              alt="Dashboard visualization" 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center transition-background group-hover:bg-slate-900/30">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50 mb-4 transform group-hover:scale-110 transition">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
              <p className="text-white font-bold text-lg drop-shadow-md">Watch how we do it entirely in-house</p>
            </div>
          </div>
        </div>

        {/* Authority Logos */}
        <div className="mt-20 pt-10 border-t border-slate-200 w-full max-w-5xl">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Driving Growth For</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-40 grayscale pointer-events-none">
            {/* Using text blocks as standard logo placeholders */}
            <h3 className="text-2xl font-black">ACME CORP</h3>
            <h3 className="text-2xl font-black">GLOBEX</h3>
            <h3 className="text-2xl font-black">SOYUZ</h3>
            <h3 className="text-2xl font-black">INITECH</h3>
          </div>
        </div>
      </section>

      {/* The Problem / Shift Section */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-emerald-600 font-bold tracking-wider text-sm uppercase mb-3">The Hard Truth</div>
            <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
              A pretty website doesn&apos;t pay the payroll. 
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Most businesses treat their website like a digital brochure. It has About pages, Mission Statements, and confusing navigation menus.
              </p>
              <p>
                When you pay $15 for a click from Google or LinkedIn, sending them to a &quot;brochure&quot; is burning cash. 
              </p>
              <p className="font-semibold text-slate-900 border-l-4 border-emerald-500 pl-4 py-2 bg-slate-50">
                You need a highly-focused landing environment where the only logical next step is booking a call or requesting out more info.
              </p>
            </div>
          </div>
          
          {/* Visual Shift Diagram */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <h3 className="text-xl font-bold mb-6 text-center">The Architecture Shift</h3>
            
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-rose-500">The Old Way</span>
              <span className="text-slate-400 text-sm">Leaking Leads</span>
            </div>
            <div className="flex gap-2 mb-8">
               <div className="h-16 flex-1 bg-white border border-rose-200 rounded-lg flex items-center justify-center text-xs font-bold text-slate-400">Ad</div>
               <ArrowRight className="w-4 text-slate-300 my-auto" />
               <div className="h-16 flex-1 bg-white border border-rose-200 rounded-lg flex items-center justify-center text-xs font-bold text-rose-500 flex-col">
                 Website
                 <span className="text-[10px] font-normal text-slate-400 mt-1 flex gap-1"><ChevronDown className="w-3 h-3"/> Distractions</span>
               </div>
               <ArrowRight className="w-4 text-slate-300 my-auto" />
               <div className="h-16 flex-[0.5] bg-slate-200 rounded-lg flex items-center justify-center text-xs font-bold text-slate-400">Bounce</div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-emerald-600">The Growth System</span>
              <span className="text-slate-400 text-sm">Capturing Demand</span>
            </div>
            <div className="flex gap-2">
               <div className="h-20 flex-1 bg-white border border-emerald-200 justify-center rounded-lg flex items-center text-xs font-bold text-slate-600">Targeted Ad</div>
               <ArrowRight className="w-4 text-emerald-500 my-auto" />
               <div className="h-20 flex-[1.5] bg-emerald-50 border border-emerald-500 rounded-lg flex items-center justify-center text-sm font-bold text-emerald-700 shadow-inner px-2 text-center">
                 Isolated Offer Funnel
               </div>
               <ArrowRight className="w-4 text-emerald-500 my-auto" />
               <div className="h-20 flex-1 bg-slate-900 rounded-lg flex items-center justify-center text-xs font-bold text-emerald-400 text-center px-1">
                 Qualified<br/>Call
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features / Pillars */}
      <section id="framework" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">How We Guarantee Results</h2>
            <p className="text-lg text-slate-600">We don&apos;t guess. We deploy these 4 core pillars into every campaign.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data/Stats Banner */}
      <section className="bg-emerald-600 py-16 text-white text-center px-6">
         <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-emerald-500/50">
            <div>
              <div className="text-4xl md:text-5xl font-black mb-1">3.8x</div>
              <div className="text-emerald-100 text-sm font-medium">Avg. Conversion Lift</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-1">14<span className="text-2xl">d</span></div>
              <div className="text-emerald-100 text-sm font-medium">Launch Timeline</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-1">$40m+</div>
              <div className="text-emerald-100 text-sm font-medium">Client Revenue Generated</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-1">Guaranteed</div>
              <div className="text-emerald-100 text-sm font-medium">Performance SLA</div>
            </div>
         </div>
      </section>

      {/* The Process */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative line connecting numbers */}
        <div className="absolute left-1/2 top-40 bottom-24 w-0.5 bg-slate-100 hidden md:block" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black mb-4">The Pipeline Factory Process</h2>
            <p className="text-slate-600">Exactly what happens when you partner with us.</p>
          </div>

          <div className="space-y-12">
            {processSteps.map((step, i) => (
              <div key={i} className="relative flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="md:w-1/2 flex justify-end md:text-right">
                  {i % 2 === 0 && (
                    <div className="hidden md:block">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600">{step.desc}</p>
                    </div>
                  )}
                </div>
                
                <div className="w-16 h-16 rounded-full bg-white border-4 border-slate-100 shadow-sm flex items-center justify-center font-black text-emerald-600 text-xl shrink-0 mx-auto md:mx-0 relative z-10">
                  0{i+1}
                </div>
                
                <div className="md:w-1/2">
                   {i % 2 !== 0 && (
                    <div className="hidden md:block">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600">{step.desc}</p>
                    </div>
                  )}
                  {/* Mobile View */}
                  <div className="block md:hidden text-center">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Highlight */}
      <section id="results" className="py-24 bg-slate-900 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif italic font-medium leading-tight mb-4">
              Results That Speak For Themselves
            </h2>
            <div className="flex justify-center gap-1 text-yellow-500">
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
          <h2 className="text-3xl font-black text-center mb-12">Straight Answers.</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 font-bold text-slate-900 flex justify-between items-center focus:outline-none"
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

      {/* Massive CTA */}
      <section id="audit" className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Stop Leaving Money on the Table.</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Book a free 45-minute Funnel Audit. We&apos;ll show you exactly where your current process is leaking revenue and how to fix it.
          </p>
          <div className="bg-slate-50 border border-slate-200 p-8 md:p-12 rounded-3xl shadow-sm">
            <form className="max-w-md mx-auto space-y-4 text-left">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Company Website</label>
                <input 
                  type="url" 
                  placeholder="https://" 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Monthly Ad Spend</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white">
                    <option>&lt; $5k</option>
                    <option>$5k - $20k</option>
                    <option>$20k+</option>
                  </select>
                </div>
              </div>
              <button 
                type="button"
                className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/20 mt-4"
              >
                Request Deep-Dive Audit
              </button>
              <p className="text-xs text-center text-slate-500 mt-4">
                No commitment. If we can&apos;t help, we&apos;ll tell you upfront.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200 text-center text-slate-500 text-sm">
        <div className="flex justify-center mb-6">
          <img 
            src="/gregory-standal-sig-logo-blue.svg" 
            alt="Gregory Standal" 
            className="h-8" 
          />
        </div>
        <p>© {new Date().getFullYear()} gregorystandal.com.</p>
      </footer>
    </div>
  );
};

export default App;
