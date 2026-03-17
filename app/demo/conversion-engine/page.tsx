"use client";
import React from "react";

export default function ConversionEnginePage() {
  return (
    <div className="bg-slate-50 text-[#002542] font-sans min-h-screen selection:bg-[#f70118]/20">
      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(90deg, #002542, #f70118);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/gregory-standal-sig-logo-blue.svg" 
              alt="Gregory Standal" 
              className="h-8 md:h-10" 
            />
          </div>
          <a
            href="#cta"
            className="bg-[#002542] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#002542]/90 transition shadow-md border-b-2 border-[#f70118] hover:-translate-y-0.5"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="pt-32 pb-20 px-6 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#002542]/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-bold tracking-wide text-[#f70118] uppercase bg-[#f70118]/10 rounded-full border border-[#f70118]/20">
            <span className="flex h-2 w-2 rounded-full bg-[#f70118] animate-pulse"></span>
            For SaaS Founders &amp; Agency Owners
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#002542] mb-6 leading-tight">
            Stop Losing Traffic. <br />
            <span className="gradient-text">Start Winning Customers.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            We build high-performance landing pages that turn cold clicks into loyal customers in 14 days. No guesswork. Just growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#cta"
              className="bg-[#002542] text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-[#002542]/90 transition shadow-xl shadow-[#002542]/20 border-b-4 border-[#f70118] hover:-translate-y-1"
            >
              Build My Landing Page
            </a>
            <a
              href="#how"
              className="bg-white border-2 border-slate-200 text-[#002542] px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition hover:-translate-y-1"
            >
              View Case Studies
            </a>
          </div>
          <p className="mt-8 text-sm text-slate-400 font-bold uppercase tracking-widest">Limited to 3 new clients per month</p>
        </div>
      </header>

      {/* 2. CREDIBILITY / PROOF UP TOP */}
      <section className="py-12 border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
            Trusted by industry leaders at
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale saturate-0 text-[#002542]">
            <div className="flex items-center text-2xl font-black italic tracking-tighter">STRIPE</div>
            <div className="flex items-center text-2xl font-black tracking-tight">Loom</div>
            <div className="flex items-center text-2xl font-black">Linear</div>
            <div className="flex items-center text-2xl font-black italic tracking-tight">Intercom</div>
            <div className="flex items-center text-2xl font-black tracking-tighter">Notion</div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM + DESIRED OUTCOME */}
      <section className="py-24 px-6 bg-white border-b border-slate-200 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[#f70118] font-black tracking-widest text-sm uppercase mb-4 bg-[#f70118]/10 inline-block px-4 py-1.5 rounded-full">The Problem</div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-[1.1] text-[#002542]">
                You're spending thousands on ads, yet your conversion rate is flatlining.
              </h2>
              <p className="text-slate-600 font-medium text-lg mb-8 leading-relaxed">
                Most landing pages are designed to "look pretty," but they fail at the one thing that matters: persuasion. You don't need another generic template; you need a system that articulates your value.
              </p>
              <ul className="space-y-4 font-bold text-[#002542] text-lg">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-[#f70118] shrink-0" />
                  <span>Confused visitors leaving in under 3 seconds.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-[#f70118] shrink-0" />
                  <span>Vague copy that doesn't solve a real problem.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-[#f70118] shrink-0" />
                  <span>A complicated path to purchase that creates friction.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 border-2 border-[#002542] p-8 md:p-12 rounded-[2.5rem] relative shadow-xl overflow-hidden">
              <div className="absolute -top-4 -right-4 bg-[#f70118] text-white px-6 py-2 rounded-full font-black text-sm rotate-10 shadow-lg border-2 border-white">
                THE DREAM
              </div>
              <h3 className="text-3xl font-black mb-4 text-[#002542]">The Conversion Engine Way</h3>
              <p className="text-slate-600 font-medium mb-8 text-lg">Imagine a page where visitors immediately feel "this is exactly for me."</p>
              
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-[#002542]/60 text-xs font-black uppercase tracking-widest">Impact</div>
                  <div className="font-black text-xl text-[#002542]">2.5x Increase in Opt-ins</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-[#002542]/60 text-xs font-black uppercase tracking-widest">Time Delay</div>
                  <div className="font-black text-xl text-[#002542]">Ready to launch in 14 days</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-[#002542]/60 text-xs font-black uppercase tracking-widest">Effort</div>
                  <div className="font-black text-xl text-[#002542]">Zero design skills required</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how" className="py-24 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#002542]">A Simple Path to Scale</h2>
            <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">Complex processes lead to hesitation. Ours is built for speed and clarity.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "1", title: "Strategy Deep-Dive", text: "We extract the core value of your product and identify your customer's deepest pain points." },
              { num: "2", title: "Persuasive Build", text: "Our writers and designers build your high-converting page using our proprietary 9-section framework." },
              { num: "3", title: "Launch & Optimize", text: "We launch your page and monitor initial data, ensuring you get the outcome you were promised." }
            ].map((step, idx) => (
              <div key={idx} className="p-10 rounded-4xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-[#002542] text-white rounded-2xl flex items-center justify-center font-black text-2xl mb-8 shadow-lg border-b-4 border-[#f70118] group-hover:-translate-y-2 transition-transform">
                  {step.num}
                </div>
                <h3 className="text-2xl font-black mb-4 text-[#002542]">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OFFER STACK */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-[#002542]/5 rounded-[3rem] shadow-sm overflow-hidden border border-slate-200">
          <div className="p-10 md:p-16 border-b border-slate-200 bg-white">
            <h2 className="text-4xl font-black mb-4 text-[#002542]">The Full Conversion Stack</h2>
            <p className="text-xl text-slate-600 font-medium">Everything you need to turn visitors into revenue. No hidden fees.</p>
          </div>
          <div className="p-10 md:p-16 grid gap-8 bg-slate-50">
            {[
              { title: "Conversion-First Copywriting", text: "Words that sell. We handle the research, the hooks, and the objection handling." },
              { title: "Mobile-Responsive Custom Design", text: "A unique design tailored to your brand, optimized for lightning-fast mobile loads." },
              { title: "A/B Testing Integration", text: "Setup of tracking tools so you can see exactly how much revenue the page is generating." }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="mt-1 w-8 h-8 rounded-full bg-[#f70118]/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#f70118]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-[#002542] text-xl mb-2">{feature.title}</h4>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* 6. RISK REVERSAL */}
          <div className="bg-[#002542] p-12 text-center text-white border-t-8 border-[#f70118]">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <svg className="w-4 h-4 text-[#f70118]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              100% ROI Guarantee
            </div>
            <h3 className="text-3xl font-black mb-4">Our "No-Regret" Promise</h3>
            <p className="text-white/80 max-w-2xl mx-auto mb-2 text-lg font-medium leading-relaxed">
              If your new landing page doesn't outperform your old one within 30 days, we'll work for free until it does, or refund your entire investment.
            </p>
          </div>
        </div>
      </section>

      {/* 7. DEEPER SOCIAL PROOF */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-[#002542]">Specific Results for Real Founders</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "/Christine_Thares_review.png",
              "/Irwin_Stromeyer_review.png",
              "/Joe_Abela_review.png",
              "/John_Stahl_review.png",
              "/Natalie_M_review.png",
              "/Thomas_Miller_review.png"
            ].map((src, idx) => (
              <div key={idx} className="rounded-4xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col justify-center">
                <img src={src} alt="Client Review" className="w-full h-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. OBJECTION HANDLING / FAQ */}
      <section className="py-24 px-6 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black mb-16 text-center text-[#002542]">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Will this work for my niche?", a: "While we specialize in SaaS and high-ticket services, the psychology of conversion is universal. If you solve a real problem for real people, our framework will work for you." },
              { q: "Is this worth the investment?", a: "If your customer lifetime value is $500, you only need a handful of extra sales to break even. Most clients see a 10x return within the first quarter." },
              { q: "Is it too complicated to switch?", a: "No. We handle the hosting migration or provide the code/design for your current stack. It's a 'hands-off' experience for you." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-4xl border border-slate-200">
                <h4 className="font-black mb-3 text-xl text-[#002542]">"{faq.q}"</h4>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section id="cta" className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center bg-[#002542] rounded-[3rem] py-20 px-8 text-white relative overflow-hidden shadow-2xl border-b-8 border-[#f70118]">
          {/* Background element */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none flex items-center justify-between">
            <div className="w-96 h-96 bg-[#f70118] rounded-full blur-[120px] -translate-x-1/2"></div>
            <div className="w-96 h-96 bg-white rounded-full blur-[120px] translate-x-1/2"></div>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 tracking-tight leading-tight">Ready to double your conversion rate?</h2>
          <p className="text-2xl text-white/80 font-medium mb-12 relative z-10 max-w-2xl mx-auto leading-relaxed">
            Don't let another day of traffic go to waste. Get a landing page that works as hard as you do.
          </p>
          <div className="relative z-10 flex flex-col items-center">
            <a
              href="#"
              className="inline-block bg-white text-[#002542] px-12 py-6 rounded-2xl font-black text-2xl hover:bg-slate-50 transition shadow-xl hover:-translate-y-1"
            >
              Get Your Free Conversion Audit
            </a>
            <p className="mt-8 text-white/60 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <svg className="w-4 h-4 text-[#f70118]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              One clear path. No ambiguity. Results guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <img 
              src="/gregory-standal-sig-logo-blue.svg" 
              alt="Gregory Standal" 
              className="h-8" 
            />
          </div>
          <div className="text-slate-400 font-bold text-sm">
            © {new Date().getFullYear()} gregorystandal.com. Built on conversion principles.
          </div>
        </div>
      </footer>
    </div>
  );
}
