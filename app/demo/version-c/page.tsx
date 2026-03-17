"use client";
import React, { useState } from 'react';
import { PlayCircle, Play, CheckCircle, ArrowRight, ShieldCheck, Star, Calendar, Zap, Check } from 'lucide-react';

const colors = {
  primary: '#002542',
  accent: '#F70118',
};

const homeServiceLogos = [
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-spectrum.jpg", alt: "Spectrum" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-bella.jpg", alt: "Bella" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-housemaster.jpg", alt: "HouseMaster" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-valley.jpg", alt: "Valley" },
];

const stats = [
  { value: "20-30%", label: "Increase in qualified lead volume" },
  { value: "5:1", label: "Average ROI within 3-6 months" },
  { value: "25%", label: "Higher close rates from video educated leads" },
];

const caseStudies = [
  {
    title: "AG Williams Painting",
    quote: "“Added 28k plus in a single month with our video strategy”",
    tag: "Painting",
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "Jan Fence",
    quote: "“Increased lead generation over 20 percent, hundreds of thousands in new business”",
    tag: "Fencing",
    img: "https://images.unsplash.com/photo-1588691866336-61845bb08f65?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "Spectrum Painting",
    quote: "“20 percent lift in lead form conversion while increasing lead volume”",
    tag: "Painting",
    img: "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=600&auto=format&fit=crop&q=60"
  }
];

export default function VersionCLandingPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const scrollToCTA = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("cta-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white text-slate-900 antialiased font-sans selection:bg-[#F70118]/20">
      
      {/* Stripped Nav - Very minimal */}
      <header className="absolute top-0 w-full z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-center md:justify-start">
          <img src="/gregory-standal-sig-logo-blue.svg" alt="Gregory Standal" className="h-8 md:h-10 opacity-90" />
        </div>
      </header>

      {/* Section 1: Hero + VSL */}
      <section className="pt-28 md:pt-36 pb-16 px-4 md:px-8 relative overflow-hidden border-b border-slate-100 bg-slate-50">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F70118]/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Headline, subhead, bullets, CTA */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6" style={{ color: colors.primary }}>
                Turn Home Improvement Videos Into Booked Estimates In 90 Days Or Less
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed font-medium">
                We build and run a Constructive Video Funnel for home improvement companies so your best projects turn into a steady flow of qualified estimate requests, not just likes.
              </p>

              <ul className="text-left space-y-4 mb-10 max-w-xl mx-auto lg:mx-0">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" style={{ color: colors.accent }}/>
                  <span className="text-slate-700 font-medium text-lg">Stop paying for pretty videos that do nothing for your pipeline.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" style={{ color: colors.accent }}/>
                  <span className="text-slate-700 font-medium text-lg">Turn one or two shoot days into 3 to 6 months of lead driving content.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" style={{ color: colors.accent }}/>
                  <span className="text-slate-700 font-medium text-lg">Track exactly how your videos turn into revenue so you know it is working.</span>
                </li>
              </ul>

              <div className="flex flex-col items-center lg:items-start">
                <a
                  href="#cta-section"
                  onClick={scrollToCTA}
                  className="group text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 flex items-center gap-3 w-full sm:w-auto justify-center"
                  style={{ backgroundColor: colors.accent, boxShadow: `0 15px 35px -10px ${colors.accent}60` }}
                >
                  Book Your Free Brand Strategy Call
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-sm font-bold text-slate-500 mt-4 text-center lg:text-left">
                  20 minute call to map your Video Funnel Plan. No cost. No obligation.
                </p>
              </div>
            </div>

            {/* Right/Top: VSL */}
            <div className="order-1 lg:order-2 w-full">
              <div 
                className="relative aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer group"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <img 
                  src="https://images.unsplash.com/photo-1541888081638-3475cd1db9ec?auto=format&fit=crop&q=80&w=1200" 
                  alt="Constructive Video Funnel" 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-60 transition duration-500" 
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#F70118] flex items-center justify-center shadow-[0_0_30px_rgba(247,1,24,0.5)] group-hover:scale-110 transition duration-300 mb-4">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                  <span className="text-white font-bold tracking-wider uppercase text-sm drop-shadow-md">Click to Watch</span>
                </div>
              </div>

              {/* Duplicate CTA under VSL for mobile only */}
              <div className="mt-6 flex flex-col items-center lg:hidden">
                <a
                  href="#cta-section"
                  onClick={scrollToCTA}
                  className="text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-md w-full text-center"
                  style={{ backgroundColor: colors.accent }}
                >
                  Book Your Free Brand Strategy Call
                </a>
                <p className="text-xs font-bold text-slate-500 mt-2 text-center">
                  20 minute call to map your Video Funnel Plan. No cost. No obligation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Strip */}
      <section className="py-8 bg-white border-b border-slate-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            Trusted by growth minded home improvement brands
          </p>
          <div className="flex justify-center gap-12 items-center opacity-60">
            {homeServiceLogos.map((logo, idx) => (
              <img
                key={idx}
                src={logo.src}
                alt={logo.alt}
                className="h-8 md:h-12 w-auto object-contain grayscale"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Proof + Blueprint + Highlight Reel */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight" style={{ color: colors.primary }}>
              What Happens When You Install A Constructive Video Funnel
            </h2>
          </div>

          {/* Stats That Slap */}
          <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200 grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200 mb-8 relative">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center p-4">
                <div className="text-4xl md:text-5xl font-black mb-3" style={{ color: colors.accent }}>{stat.value}</div>
                <div className="text-sm font-bold tracking-wide text-slate-700 uppercase max-w-[200px]">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-lg text-slate-500 font-medium mb-20 max-w-2xl mx-auto italic">
            Not promises. These are typical results from real campaigns we run for contractors and home improvement brands.
          </p>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Blueprint & Case Studies */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Mechanism Block */}
              <div className="bg-[#002542] text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#F70118]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-2xl font-black mb-6 uppercase tracking-wide flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#F70118] rounded flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  The Constructive Video Funnel Blueprint
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="font-black text-[#F70118] text-xl">1.</span>
                    <span className="text-lg font-medium opacity-90">Position you as the trusted local authority</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="font-black text-[#F70118] text-xl">2.</span>
                    <span className="text-lg font-medium opacity-90">Produce cinematic trust content from one or two shoot days</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="font-black text-[#F70118] text-xl">3.</span>
                    <span className="text-lg font-medium opacity-90">Deploy that content across your website, YouTube, and paid ads so you stay in front of serious buyers until they are ready to book an estimate</span>
                  </li>
                </ul>
              </div>

              {/* Case Studies */}
              <div className="grid sm:grid-cols-3 gap-6">
                {caseStudies.map((study, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition group">
                    <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden">
                       <img src={study.img} alt={study.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col text-center">
                      <h4 className="font-bold text-[#002542] mb-3 text-sm">{study.title}</h4>
                      <p className="text-xs text-slate-600 font-medium italic mb-4 flex-1">{study.quote}</p>
                      <button className="text-xs font-bold text-[#F70118] uppercase hover:underline">View full results</button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right: Highlight Reel & 9:16 Pattern Interrupt (Optional) */}
            <div className="lg:col-span-5 relative">
              <div 
                className="relative aspect-[9/16] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-[6px] border-slate-100 cursor-pointer group max-w-[360px] mx-auto lg:max-w-none lg:w-full"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <img 
                  src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop&q=80" 
                  alt="Highlight Reel" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition duration-500" 
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 group-hover:scale-110 transition border border-white/50">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                  <span className="text-white font-black tracking-wider uppercase text-sm drop-shadow-lg text-center px-4">60-Second<br/>Highlight Reel</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Social Proof + Risk Reversal + Booking */}
      <section id="cta-section" className="py-24 bg-slate-50 border-t border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Fit + What they get + Guarantee */}
          <div className="lg:col-span-6">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-10 leading-[1.1]" style={{ color: colors.primary }}>
              Is This Right For Your Home Improvement Business
            </h2>
            
            <div className="mb-10 space-y-4">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-4">You are a fit if:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 shrink-0 mt-0.5" style={{ color: colors.accent }}/>
                  <span className="text-slate-700 font-bold text-lg">You sell high ticket home improvement projects and want more booked estimates, not vanity views</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 shrink-0 mt-0.5" style={{ color: colors.accent }}/>
                  <span className="text-slate-700 font-bold text-lg">You can handle 5 to 20 additional projects a month without breaking operations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 shrink-0 mt-0.5" style={{ color: colors.accent }}/>
                  <span className="text-slate-700 font-bold text-lg">You are willing to invest in video plus ads for at least 3 months</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 mb-10 shadow-sm">
              <h3 className="text-lg font-bold text-[#002542] mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#F70118]"/> What you get on your free strategy call:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F70118] mt-2.5 shrink-0"></div>
                  <span className="text-slate-600 font-medium">A custom Video Funnel Plan for your service area</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F70118] mt-2.5 shrink-0"></div>
                  <span className="text-slate-600 font-medium">A quick audit of your current marketing and where video can plug in immediately</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F70118] mt-2.5 shrink-0"></div>
                  <span className="text-slate-600 font-medium">A clear scope and ROI focused path, so you know what to expect before you invest</span>
                </li>
              </ul>
            </div>

            {/* Risk Reversal / Soft Guarantee */}
            <div className="bg-amber-50 border border-amber-200 p-8 rounded-3xl relative shadow-inner">
              <h3 className="font-black text-xl text-amber-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-amber-600" />
                Our Promise To You
              </h3>
              <p className="text-amber-800 text-lg font-medium leading-relaxed italic">
                &ldquo;If you do not leave this call with at least three clear ideas you can use immediately to improve your marketing, you can tell us and we will donate 100 dollars to a charity of your choice.&rdquo;
              </p>
            </div>
          </div>

          {/* Right: Booking Form + Reviews */}
          <div className="lg:col-span-6 space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 relative">
              <h3 className="text-2xl font-black text-center mb-8" style={{ color: colors.primary }}>Schedule Your Strategy Session</h3>
              
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition focus:border-[#002542] focus:bg-white"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition focus:border-[#002542] focus:bg-white"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition focus:border-[#002542] focus:bg-white"
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Website URL</label>
                  <input
                    type="url"
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition focus:border-[#002542] focus:bg-white"
                    placeholder="https://"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full text-white py-5 rounded-xl font-black text-xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 uppercase tracking-wide"
                    style={{ backgroundColor: colors.accent, boxShadow: `0 15px 35px -10px ${colors.accent}60` }}
                  >
                    Book My Free Brand Strategy Call
                  </button>
                </div>
              </form>
            </div>

            {/* Micro Reviews below form */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2 justify-center">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />)}
                <span className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest">Recent Feedback</span>
              </div>
              
              <div className="space-y-4 divide-y divide-slate-100">
                <div className="pt-3 first:pt-0">
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    "The new videos immediately made us feel more established and gave prospects far more confidence."
                  </p>
                  <p className="text-xs font-bold text-[#002542] mt-2">— AG Williams Painting</p>
                </div>
                <div className="pt-3">
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    "Our close rate jumped by 20% in the first month implementing the trust-stack on our estimate page."
                  </p>
                  <p className="text-xs font-bold text-[#002542] mt-2">— Spectrum Painting</p>
                </div>
                <div className="pt-3">
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    "If you run a home service business and aren't using this system, you're lighting money on fire every day."
                  </p>
                  <p className="text-xs font-bold text-[#002542] mt-2">— Bella Contracting</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-200 text-center">
        <div className="mb-6 flex justify-center">
          <img src="/gregory-standal-sig-logo-blue.svg" alt="Gregory Standal" className="h-6 opacity-50 grayscale" />
        </div>
        <div className="flex justify-center gap-6 mb-4">
          <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition uppercase tracking-wider">Privacy Policy</a>
          <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition uppercase tracking-wider">Terms of Service</a>
        </div>
        <p className="font-medium text-slate-400 text-xs">© {new Date().getFullYear()} gregorystandal.com. All rights reserved.</p>
      </footer>

      {/* Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex justify-center items-center p-4" onClick={() => setIsVideoModalOpen(false)}>
            <div className="w-full max-w-5xl bg-black rounded-2xl overflow-hidden relative shadow-2xl" onClick={e => e.stopPropagation()}>
                <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-4 right-4 text-white z-10 w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-white/20 transition">
                    ✕
                </button>
                <div className="aspect-video flex items-center justify-center text-white/50 text-sm">
                   <Play className="w-12 h-12 mb-2 opacity-50" />
                </div>
            </div>
        </div>
      )}

    </div>
  );
}
