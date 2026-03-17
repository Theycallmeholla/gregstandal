"use client";
import React, { useState } from 'react';
import { Play } from 'lucide-react';

const colors = {
  primary: '#002542',
  accent: '#F70118',
  yellow: '#f1b40c',
};

const clientLogos = [
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-valley.jpg", alt: "Valley" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-sensor-brite.jpg", alt: "Sensor Brite" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-coldwell-banker.jpg", alt: "Coldwell Banker" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-bissel.jpg", alt: "Bissell" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-bella.jpg", alt: "Bella" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-marmon-crane.jpg", alt: "Marmon Crane" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-topilow.jpg", alt: "Topilow" },
];

const stats = [
  { value: "20-30%", label: "Avg. Lift In Lead Gen" },
  { value: "$12M+", label: "Generated Revenue" },
  { value: "30 Days", label: "Launch Timeline" },
];

export default function BrandBuildersV3Lean() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const scrollToBooking = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("booking-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white text-slate-900 antialiased font-sans selection:bg-[#F70118]/20 min-h-screen flex flex-col">
      
      {/* Header */}
      <header className="w-full z-50 bg-white border-b border-slate-200 py-4 fixed top-0 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center md:justify-start">
          <img src="/gregory-standal-sig-logo-blue.svg" alt="Greg Standal" className="h-10 cursor-pointer hover:opacity-80 transition" />
        </div>
      </header>

      <main className="flex-1 pt-24">
        
        {/* 1. Hero + Video */}
        <section className="px-4 py-16 md:py-24 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-[#002542]">
            Turn The Traffic You Already Get Into More Qualified Booked Estimates
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed font-medium mx-auto max-w-3xl">
            For home improvement and service businesses already spending on marketing but still not getting enough real sales opportunities.
          </p>

          <div className="relative w-full max-w-4xl mx-auto aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden mb-10 group cursor-pointer border border-slate-200" onClick={() => setIsVideoModalOpen(true)}>
             <img src="/greg-video-thumbnail.png" alt="VSL Video Thumbnail" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-500" />
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300" style={{ backgroundColor: colors.yellow }}>
                  <Play className="w-8 h-8 text-black fill-black ml-1" />
                </div>
             </div>
          </div>

          <div className="flex justify-center">
            <a
              href="#booking-section"
              onClick={scrollToBooking}
              className="group text-white px-10 py-5 rounded-full font-black text-xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 uppercase tracking-tight"
              style={{ backgroundColor: colors.accent }}
            >
              Book Your Funnel Review
            </a>
          </div>
        </section>

        {/* 2. Proof Bar / Stats */}
        <section className="bg-slate-50 py-16 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            
            {/* Logos */}
            <div className="relative mb-16 overflow-hidden mask-image-edges">
              <div className="flex animate-scroll gap-12 items-center">
                {[...clientLogos, ...clientLogos].map((logo, idx) => (
                  <img
                    key={idx}
                    src={logo.src}
                    alt={logo.alt}
                    className="h-10 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition duration-300 opacity-60 hover:opacity-100 flex-shrink-0"
                  />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="rounded-3xl shadow-sm border border-slate-200 bg-white grid md:grid-cols-3 gap-8 p-10 md:p-12 max-w-5xl mx-auto divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center text-center py-4">
                  <div className="text-4xl md:text-5xl font-black mb-3" style={{ color: colors.accent }}>{stat.value}</div>
                  <div className="text-sm font-bold tracking-wider uppercase text-[#002542]">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 3. 3-Step Process */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black text-[#002542] mb-16">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-[#002542] flex items-center justify-center font-black text-2xl mb-6 shadow-sm border border-slate-200">1</div>
                <h3 className="text-2xl font-black text-[#002542] mb-4">Film once</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-[#002542] flex items-center justify-center font-black text-2xl mb-6 shadow-sm border border-slate-200">2</div>
                <h3 className="text-2xl font-black text-[#002542] mb-4">Build the funnel</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-[#002542] flex items-center justify-center font-black text-2xl mb-6 shadow-sm border border-slate-200">3</div>
                <h3 className="text-2xl font-black text-[#002542] mb-4 leading-tight">Turn traffic into qualified booked estimates</h3>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CTA / Booking */}
        <section id="booking-section" className="py-24 px-4 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-[#002542] mb-6 leading-tight">
                Book A Call
              </h2>
              <p className="text-xl text-slate-600 font-medium">
                We’ll show you whether your real issue is traffic, trust, or conversion — and where your funnel is leaking.
              </p>
            </div>

            <div className="bg-white p-2 rounded-2xl shadow-2xl border border-slate-200 h-[700px] overflow-hidden">
               <iframe src="https://link.cursivecrm.com/widget/booking/tRgGOQiQsmjldJZwy3JE" className="w-full h-full border-none" title="Booking Calendar"></iframe>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800 text-center text-white">
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

      {/* Global CSS for Animations */}
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
      `}} />

    </div>
  );
}
