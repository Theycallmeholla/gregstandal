"use client";
import React from 'react';

export default function LeadflowVideoPage() {
  return (
    <div className="bg-slate-50 text-[#002542] font-sans selection:bg-[#f70118]/20 min-h-screen">
      <style jsx global>{`
        .gradient-border-custom {
            border: 2px solid transparent;
            background: linear-gradient(white, white) padding-box, linear-gradient(to right, #002542, #f70118) border-box;
        }
      `}</style>

      {/* Header */}
      <header className="bg-white text-[#002542] py-4 fixed w-full top-0 z-50 border-b border-slate-200/80 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center">
                <img src="/gregory-standal-sig-logo-blue.svg" alt="Gregory Standal" className="h-8 md:h-10" />
            </div>
            <a href="#application" className="bg-[#002542] text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-lg transition-transform hover:scale-105 border-b-2 border-[#f70118]">
                Apply For A Custom Build
            </a>
        </div>
      </header>

      {/* Hero / VSL Section */}
      <section className="pt-32 pb-32 px-6 bg-white relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0 opacity-[0.03]">
             <img src="https://images.unsplash.com/photo-1541888081638-3475cd1db9ec?auto=format&fit=crop&q=80" alt="Constructor looking at site" className="w-full h-full object-cover grayscale" />
             <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#f70118]/10 border border-[#f70118]/20 text-[#f70118] font-bold tracking-widest uppercase mb-6 text-xs drop-shadow-sm">
              For Home Service & Remodeling Businesses
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#002542] leading-[1.1] mb-6 tracking-tight">
                How We Turn Contractor Websites Into Booked-Estimate Machines Using One <span className="text-[#f70118]">&quot;Trust-Stack&quot;</span> Video
            </h1>

            <p className="text-slate-600 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mb-10">
                In this short training, Greg shows how a single trust-building video and landing page system can turn existing website traffic, ad clicks, and referrals into more qualified estimate requests without posting content every day.
            </p>
            
            {/* VSL Wrapper */}
            <div className="relative w-full max-w-4xl mx-auto aspect-video bg-slate-900 rounded-4xl shadow-2xl border-4 border-slate-100 overflow-hidden mb-8 group cursor-pointer ring-1 ring-slate-200 isolate">
                <img src="/greg-video-thumbnail.png" className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity mix-blend-overlay" alt="Video thumbnail" />
                <div className="absolute inset-0 bg-[#002542]/20 mix-blend-multiply"></div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-24 h-24 bg-[#002542] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,37,66,0.5)] animate-pulse border-b-4 border-[#f70118]">
                        <svg className="w-10 h-10 text-white fill-white ml-2" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                </div>
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs text-[#002542] font-black rounded-full shadow-sm">VSL Presentation</div>
            </div>

            <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed mb-6">
                Make sure your volume is up. This training breaks down the exact &quot;Trust-Stack&quot; video we&apos;ve used with contractors and remodelers to drive millions in tracked job revenue.
            </p>
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="py-10 bg-[#002542] text-white text-center font-bold text-lg border-y-4 border-[#f70118]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 mb-4">
            <div className="flex items-center gap-3"><svg className="w-6 h-6 text-[#f70118]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <span className="tracking-wide">24+ Active Clients</span></div>
            <div className="flex items-center gap-3"><svg className="w-6 h-6 text-[#f70118]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <span className="tracking-wide">$12M+ Client Revenue Attributed To This System</span></div>
            <div className="flex items-center gap-3" title="If we accept you and your Trust-Stack video isn't live within 30 days of your shoot date, we'll keep working at no extra cost until it is."><svg className="w-6 h-6 text-[#f70118]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> <span className="tracking-wide border-b border-dashed border-[#f70118]/50 cursor-help">30-Day Setup Guarantee</span></div>
        </div>
        <div className="text-white/50 text-xs font-normal max-w-6xl mx-auto px-6">
            All numbers are client-reported and tracked inside their CRMs or ad accounts.
        </div>
      </section>

      {/* Application Section */}
      <section id="application" className="py-24 px-6 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f70118]/5 rounded-full blur-3xl -z-10 bg-blend-multiply"></div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-2xl gradient-border-custom relative z-10">
              <h2 className="text-4xl font-black text-center mb-4 text-[#002542]">Apply For Your Custom &quot;Trust-Stack&quot; Video Build</h2>
              <p className="text-center text-slate-500 mb-10 font-medium text-lg max-w-xl mx-auto">Fill out this brief application to see if your trade and market are a fit. If it&apos;s not, we&apos;ll point you to better options.</p>
              
              <div className="bg-[#002542]/5 border border-[#002542]/10 rounded-xl p-4 mb-10 text-sm md:text-base text-center font-medium text-[#002542]/80">
                  <strong className="text-[#002542]">Our 30-Day Guarantee:</strong> If we accept you and your Trust-Stack video isn&apos;t live within 30 days of your shoot date, we&apos;ll keep working at no extra cost until it is.
              </div>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                          <label className="block font-black text-[#002542] text-sm uppercase tracking-widest mb-3">First Name</label>
                          <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#002542] focus:ring-2 focus:ring-[#002542]/20 outline-none font-medium transition-all" required />
                      </div>
                      <div>
                          <label className="block font-black text-[#002542] text-sm uppercase tracking-widest mb-3">Last Name</label>
                          <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#002542] focus:ring-2 focus:ring-[#002542]/20 outline-none font-medium transition-all" required />
                      </div>
                  </div>
                  
                  <div>
                      <label className="block font-black text-[#002542] text-sm uppercase tracking-widest mb-3">Phone Number</label>
                      <input type="tel" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#002542] focus:ring-2 focus:ring-[#002542]/20 outline-none font-medium transition-all" required />
                  </div>

                  <div>
                      <label className="block font-black text-[#002542] text-sm uppercase tracking-widest mb-3">Primary Trade / Service</label>
                      <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#002542] focus:ring-2 focus:ring-[#002542]/20 outline-none font-medium transition-all appearance-none cursor-pointer">
                          <option>Roofing</option>
                          <option>HVAC</option>
                          <option>Kitchen/Bath Remodel</option>
                          <option>Solar</option>
                          <option>Other</option>
                      </select>
                  </div>

                  <div>
                      <label className="block font-black text-[#002542] text-sm uppercase tracking-widest mb-1">Current Monthly Revenue</label>
                      <p className="text-sm font-bold text-slate-400 mb-4">Be honest. This helps us see what kind of lift is realistic and whether we can actually help.</p>
                      <div className="space-y-3">
                          <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors font-bold text-[#002542]">
                            <input type="radio" name="rev" className="w-5 h-5 text-[#f70118] focus:ring-[#f70118] border-slate-300" /> 
                            Under $20k/mo
                          </label>
                          <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors font-bold text-[#002542]">
                            <input type="radio" name="rev" className="w-5 h-5 text-[#f70118] focus:ring-[#f70118] border-slate-300" /> 
                            $20k - $50k/mo
                          </label>
                          <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors font-bold text-[#002542]">
                            <input type="radio" name="rev" className="w-5 h-5 text-[#f70118] focus:ring-[#f70118] border-slate-300" /> 
                            $50k - $150k/mo
                          </label>
                          <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors font-bold text-[#002542]">
                            <input type="radio" name="rev" className="w-5 h-5 text-[#f70118] focus:ring-[#f70118] border-slate-300" /> 
                            Over $150k/mo
                          </label>
                      </div>
                  </div>

                  <button type="button" className="w-full mt-4 bg-[#002542] hover:bg-[#002542]/90 text-white font-black text-2xl py-6 rounded-2xl border-b-4 border-[#f70118] shadow-2xl hover:-translate-y-1 transition-all">
                      Apply For A Custom Build
                  </button>
                  <p className="text-center text-sm font-bold text-slate-400 mt-6 pt-2">Your information is 100% secure. If you&apos;re not a fit, we&apos;ll tell you straight and share what we&apos;d do instead.</p>
              </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-200 flex flex-col items-center">
        <div className="mb-6">
          <img src="/gregory-standal-sig-logo-blue.svg" alt="Gregory Standal" className="h-8" />
        </div>
        <p className="font-bold text-slate-400 text-sm">© {new Date().getFullYear()} gregorystandal.com. All rights reserved.</p>
      </footer>
    </div>
  );
}
