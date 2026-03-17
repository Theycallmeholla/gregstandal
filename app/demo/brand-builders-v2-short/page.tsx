"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Play,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const colors = {
  primary: '#002542',
  accent: '#F70118',
  yellow: '#f1b40c',
};

const stats = [
  { value: "20-30%", label: "Avg. Lift In Lead Gen" },
  { value: "$12M+", label: "Generated Revenue" },
  { value: "30 Days", label: "Launch Timeline" },
];

const caseStudies = [
  {
    title: "How AG Williams Painting Generates $28k+ Months (15x ROI)",
    tag: "Painting",
    img: "https://newcapepictures.com/wp-content/uploads/2021/11/AG-Williams-Img-2.jpg",
    videoId: "188"
  },
  {
    title: "How Bella Contracting Generated $80k+ In Two Months (12x ROI)",
    tag: "Contracting",
    img: "https://newcapepictures.com/wp-content/uploads/2021/11/bella-contracting.jpg",
    videoId: "187"
  },
  {
    title: "How Jan Fence Increased Lead Gen Over 20%",
    tag: "Fencing",
    img: "https://newcapepictures.com/wp-content/uploads/2025/12/jan-fence.jpg",
    videoId: "186"
  }
];

export default function NewCapeBrandBuildersShort() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="bg-white text-slate-900 antialiased font-sans selection:bg-[#F70118]/20 min-h-screen flex flex-col">
      
      {/* Header */}
      <header className="w-full z-50 bg-white border-b border-slate-200 py-4 fixed top-0 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center md:justify-start">
          <Image src="/gregory-standal-sig-logo-blue.svg" alt="Greg Standal" width={180} height={40} className="h-10 w-auto cursor-pointer hover:opacity-80 transition" />
        </div>
      </header>

      <main className="flex-1 pt-24 pb-0">
        {/* Hero */}
        <section className="px-4 py-12 md:py-20 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-[#002542]">
            Add <span style={{ color: colors.accent }}>20–30% More Booked Estimates</span> in 90 Days…
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed font-medium mx-auto max-w-3xl">
            Using the Constructive Video-Funnel Blueprint built for contractors who already have leads.
          </p>

          <div className="relative w-full max-w-4xl mx-auto aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden mb-10 group cursor-pointer border border-slate-200" onClick={() => setIsVideoModalOpen(true)}>
             <Image src="/greg-video-thumbnail.png" alt="VSL Video Thumbnail" fill className="object-cover opacity-70 group-hover:scale-105 transition duration-500" />
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300" style={{ backgroundColor: colors.yellow }}>
                  <Play className="w-8 h-8 text-black fill-black ml-1" />
                </div>
             </div>
          </div>

          <div className="flex justify-center">
            <Link
              href="/demo/brand-builders-v2-short/apply"
              className="group text-white px-10 py-5 rounded-full font-black text-xl md:text-2xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 flex items-center gap-3 uppercase text-center"
              style={{ backgroundColor: colors.accent }}
            >
              See If This Will Work In Your Market
            </Link>
          </div>
        </section>

        {/* Metric Strip */}
        <section className="bg-slate-50 border-y border-slate-200 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center py-4">
                  <div className="text-4xl md:text-5xl font-black mb-3" style={{ color: colors.accent }}>{stat.value}</div>
                  <div className="text-sm font-bold tracking-wider uppercase text-[#002542]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top 3 Case Studies */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#002542]">
                What This Blueprint Did For Contractors Like You
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-4">
              {caseStudies.map((study, idx) => (
                <div key={idx} className="group flex flex-col bg-slate-50 rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                  <div className="relative aspect-video bg-black overflow-hidden cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
                    <Image src={study.img} alt={study.title} fill className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition duration-500" />
                    <div className="absolute inset-0 bg-[#002542]/20 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300" style={{ backgroundColor: colors.accent }}>
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <span className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: colors.accent }}>{study.tag}</span>
                    <h3 className="font-black text-[#002542] text-xl leading-snug mb-6 flex-1">{study.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Micro-preview of call */}
        <section className="py-20 px-4 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-slate-200">
            <h3 className="text-3xl md:text-4xl font-black mb-8 text-[#002542] text-center">
              On this free 20-min call we will…
            </h3>
            <ul className="space-y-6 text-lg md:text-xl font-bold text-slate-700 max-w-2xl mx-auto">
              <li className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-[#F70118] shrink-0 mt-0.5"/> 
                <span>Pinpoint the 1–2 biggest leaks in your current funnel</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-[#F70118] shrink-0 mt-0.5"/> 
                <span>Show how video can add 20–30% more booked estimates without more ad spend</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-[#F70118] shrink-0 mt-0.5"/> 
                <span>Give you a simple 90‑day rollout plan</span>
              </li>
            </ul>

            <div className="mt-16 flex justify-center">
              <Link
                href="/demo/brand-builders-v2-short/apply"
                className="inline-flex text-white px-10 py-5 md:px-12 md:py-6 rounded-full font-black text-xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 items-center gap-3 uppercase text-center"
                style={{ backgroundColor: colors.accent }}
              >
                Check My Market & Get The 90‑Day Plan <ArrowRight className="w-6 h-6 hidden md:block" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800 text-center">
        <div className="mb-6 flex justify-center">
          <Image src="/gregory-standal-sig-logo-white.svg" alt="Greg Standal" width={216} height={48} className="h-12 w-auto opacity-80" />
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

    </div>
  );
}
