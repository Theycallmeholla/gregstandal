"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Clock, ShieldCheck, Mail, Play } from 'lucide-react';

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

export default function ThankYouPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="bg-slate-50 text-slate-900 antialiased font-sans selection:bg-[#F70118]/20 min-h-screen flex flex-col">
      
      {/* Header */}
      <header className="w-full z-50 bg-white border-b border-slate-200 py-4 fixed top-0 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center md:justify-start">
          <Image src="/gregory-standal-sig-logo-blue.svg" alt="Greg Standal" width={160} height={40} className="cursor-pointer hover:opacity-80 transition" />
        </div>
      </header>

      <main className="flex-1 pt-32 pb-20 px-4">
        
        <div className="max-w-3xl mx-auto">
          
          {/* 1. Thank You / Confirmation */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-8">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-4 text-[#002542]">
              Thanks — Your Call Is Booked
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-medium">
              We&apos;re looking forward to speaking with you.
            </p>
          </div>

          <div className="grid gap-8">
            
            {/* Trust Logo Strip */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
               <p className="text-center text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8">
                 Trusted by ambitious brands
               </p>
               <div className="relative overflow-hidden mask-image-edges">
                 <div className="flex animate-scroll gap-12 items-center">
                   {[...clientLogos, ...clientLogos].map((logo, idx) => (
                     <div key={idx} className="relative h-8 md:h-12 w-32 shrink-0 grayscale hover:grayscale-0 transition duration-300 opacity-60 hover:opacity-100">
                       <Image
                         src={logo.src}
                         alt={logo.alt}
                         fill
                         className="object-contain"
                       />
                     </div>
                   ))}
                 </div>
               </div>
            </div>

            {/* 2. What Happens Next */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200">
              <h2 className="text-2xl md:text-3xl font-black text-[#002542] mb-8 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-blue-600" />
                What Happens Next
              </h2>
              <p className="text-lg text-slate-600 mb-8 font-medium">On the call, we&apos;ll look at:</p>
              <ul className="space-y-6">
                {[
                  "Where your funnel is leaking",
                  "Why your current traffic isn&apos;t converting",
                  "How to increase qualified booked estimates"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-xl font-bold text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Reminder */}
            <div className="bg-[#002542] p-8 md:p-12 rounded-3xl shadow-xl text-white">
               <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-3 text-[#f1b40c]">
                 <Clock className="w-8 h-8" />
                 Important Reminder
               </h2>
               <p className="text-lg md:text-xl leading-relaxed text-slate-200 font-medium mb-6">
                 Please show up on time and be ready to talk through your current marketing, lead flow, and sales process.
               </p>
               <div className="p-6 rounded-2xl bg-white/10 border border-white/10 italic text-lg">
                 &ldquo;The more honest and accurate you are, the more valuable this call will be.&rdquo;
               </div>
            </div>

            {/* 4. Final Note */}
            <div className="text-center py-12 px-8 bg-white rounded-3xl border-2 border-dashed border-slate-200">
               <p className="text-xl md:text-2xl font-black text-slate-700 leading-relaxed">
                 Whether we work together or not, you&apos;ll leave with more clarity on what&apos;s actually broken — and what to fix first.
               </p>
               <div className="mt-8 flex justify-center items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-sm">
                 <Mail className="w-4 h-4" />
                 Check your inbox for the calendar invite.
               </div>
            </div>

            {/* Case Study Block */}
            <div className="group flex flex-col bg-slate-50 rounded-3xl overflow-hidden shadow-xl border border-slate-200 hover:shadow-2xl transition duration-300">
              <div className="relative aspect-video bg-black overflow-hidden cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
                <Image src="https://newcapepictures.com/wp-content/uploads/2021/11/bella-contracting.jpg" alt="Case Study" fill className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition duration-500" />
                <div className="absolute inset-0 bg-[#002542]/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300" style={{ backgroundColor: colors.accent }}>
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <span className="text-xs font-black uppercase tracking-widest mb-3 text-[#F70118]">Contracting</span>
                <h3 className="font-black text-[#002542] text-xl leading-snug">How Bella Contracting Generated $80k+ In Two Months (12x ROI)</h3>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800 text-center text-white">
        <div className="mb-6 flex justify-center">
          <Image src="/gregory-standal-sig-logo-white.svg" alt="Greg Standal" width={192} height={48} className="opacity-80" />
        </div>
        <p className="font-medium text-slate-500 text-sm mb-4">© {new Date().getFullYear()} Greg Standal. All rights reserved.</p>
        <div className="flex justify-center gap-6">
            <span className="text-slate-600 hover:text-slate-400 text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-slate-600 hover:text-slate-400 text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </footer>

      {/* Video Modal representation */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-100 bg-black/90 backdrop-blur-sm flex justify-center items-center p-4">
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
