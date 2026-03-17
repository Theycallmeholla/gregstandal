"use client";

import React, { useState } from 'react';
import {
  Star,
  ChevronDown,
  ChevronUp,
  Calendar,
  Volume2,
} from 'lucide-react';
import Image from 'next/image';

const App = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is actually happening during these 2 days?",
      answer: "We go deep into your operations. You will map out your current bottlenecks, build your first Self-Operating Map, and leave with the exact hiring scripts and KPIs we use at GregoryStandal.com to scale our portfolio companies."
    },
    {
      question: "Who is this workshop for?",
      answer: "This is for established business owners who feel like they are the bottleneck. If you are doing $50k+ in monthly revenue but cannot take a week off without things falling apart, this is for you."
    },
    {
      question: "Is there a money back guarantee?",
      answer: "Absolutely. If by the end of the first day you do not feel like you have received 10x the value of your investment, tell us and we will refund you 100% on the spot."
    },
    {
      question: "How do I apply for the next one?",
      answer: "Fill out the form below. Our team reviews every application to ensure the cohort is high-level and that we can actually help your specific business model."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#002542] selection:bg-red-50">

      {/* Top Banner Badge */}
      <div className="bg-black py-3 flex justify-center sticky top-0 z-50">
        <div className="bg-white px-4 py-1.5 rounded-full flex items-center gap-2 border border-gray-200 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#f70118] animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-800">
            Live In-Person Workshop | Las Vegas
          </span>
        </div>
      </div>

      {/* Hero Section - Top Dark Part - Primary Blue #002542 */}
      <section className="bg-[#002542] text-white pt-16 pb-0 px-4 text-center relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-[1.1] uppercase">
            ARE YOU THE THING LIMITING <br /> YOUR BUSINESS?
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Join Our Scaling Workshop — Remove Yourself as the Single Point of Failure
          </p>

          {/* Video Container - Overlapping the split */}
          <div className="relative max-w-3xl mx-auto group cursor-pointer z-20 translate-y-16 md:translate-y-24">
            <div className="rounded-sm overflow-hidden shadow-2xl border-2 border-white/10 bg-black aspect-video relative">
              <Image
                src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=1200"
                alt="Workshop Video"
                fill
                className="w-full h-full object-cover opacity-80"
                unoptimized
              />

              {/* Primary Blue Overlay #002542 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="bg-[#002542]/85 p-6 md:p-8 rounded-xl border border-white/20 backdrop-blur-sm flex flex-col items-center gap-4 transform transition-transform group-hover:scale-105">
                  <Volume2 className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  <div className="text-center">
                    <p className="text-lg md:text-xl font-black uppercase tracking-wide leading-tight">Your Video Is Playing</p>
                    <p className="text-base md:text-lg font-bold">Click To Unmute</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Caption Bubble - Keeping Red Accent */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
              <div className="bg-[#f70118] text-white px-4 py-1 rounded-md text-xs font-bold shadow-lg whitespace-nowrap">
                cannot wait to meet you
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section - Bottom White Part */}
      <section className="bg-white pt-32 md:pt-48 pb-16 px-4 text-center border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
            It&apos;s a 2-day, interactive workshop where you&apos;ll receive personalized, <br />
            <span className="text-black font-black italic underline decoration-[#f70118] underline-offset-4 decoration-4">actionable insights</span> from the team that&apos;s scaled GregoryStandal.com &amp; its portfolio companies.
          </p>
        </div>
      </section>

      {/* Application Button - Primary Blue */}
      <div className="py-12 bg-gray-50 flex justify-center border-b border-gray-200">
        <button className="bg-[#002542] hover:bg-[#001a30] text-white font-black py-5 px-16 rounded-lg text-xl transition-all shadow-xl uppercase tracking-widest hover:-translate-y-1 active:translate-y-0">
          FILL OUT FORM
        </button>
      </div>

      {/* Social Proof Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-tight">What people are saying:</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {[
              "/Christine_Thares_review.png",
              "/Irwin_Stromeyer_review.png",
              "/Joe_Abela_review.png",
              "/John_Stahl_review.png",
              "/Natalie_M_review.png",
              "/Thomas_Miller_review.png"
            ].map((src, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100 transform transition-transform hover:scale-105">
                <img src={src} alt="Client Review" className="w-full h-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ripped Edge Section Header */}
      <section className="relative pt-12">
        <div className="bg-[#1f1f1f] py-12 px-4 relative">
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 -translate-y-full">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-[#1f1f1f]">
              <path d="M0,0L30,40L60,20L90,50L120,30L150,60L180,40L210,70L240,50L270,80L300,60L330,90L360,70L390,100L420,80L450,110L480,90L510,120L540,100L570,130L600,110L630,140L660,120L690,150L720,130L750,160L780,140L810,170L840,150L870,180L900,160L930,190L960,170L990,200L1020,180L1050,210L1080,190L1110,220L1140,200L1170,230L1200,210L1200,300L0,300Z"></path>
            </svg>
          </div>

          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-5xl font-black text-white uppercase italic tracking-tight">
              What you will get at the <span className="underline decoration-[#f70118] underline-offset-8">in-person</span> workshop:
            </h2>
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 translate-y-full rotate-180">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-[#1f1f1f]">
              <path d="M0,0L30,40L60,20L90,50L120,30L150,60L180,40L210,70L240,50L270,80L300,60L330,90L360,70L390,100L420,80L450,110L480,90L510,120L540,100L570,130L600,110L630,140L660,120L690,150L720,130L750,160L780,140L810,170L840,150L870,180L900,160L930,190L960,170L990,200L1020,180L1050,210L1080,190L1110,220L1140,200L1170,230L1200,210L1200,300L0,300Z"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Workshop Details Grid */}
      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="mb-6 rounded-lg overflow-hidden border border-gray-100 shadow-md aspect-video">
                <Image src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=600" alt="Training" width={600} height={338} className="w-full h-full object-cover" unoptimized />
              </div>
              <h3 className="text-lg font-black uppercase mb-3">Live Instruction</h3>
              <p className="text-sm text-gray-500 font-medium">Direct training from the Gregory Standal core team on the frameworks used to scale our portfolio companies.</p>
            </div>
            <div>
              <div className="mb-6 rounded-lg overflow-hidden border border-gray-100 shadow-md aspect-video">
                <Image src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600" alt="Assets" width={600} height={338} className="w-full h-full object-cover" unoptimized />
              </div>
              <h3 className="text-lg font-black uppercase mb-3">Physical Asset Creation</h3>
              <p className="text-sm text-gray-500 font-medium">You do not just learn. You build your hiring maps, scripts, and dashboards live with our guidance.</p>
            </div>
            <div>
              <div className="mb-6 rounded-lg overflow-hidden border border-gray-100 shadow-md aspect-video">
                <Image src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600" alt="Networking" width={600} height={338} className="w-full h-full object-cover" unoptimized />
              </div>
              <h3 className="text-lg font-black uppercase mb-3">Peer Elite Network</h3>
              <p className="text-sm text-gray-500 font-medium">Be in a room with only high-level operators. No beginners allowed, strictly $1M+ business owners.</p>
            </div>
          </div>
          <div className="mt-20 flex justify-center">
            <button className="bg-[#002542] hover:bg-[#001a30] text-white font-black py-5 px-16 rounded-lg text-xl transition-all shadow-xl uppercase tracking-widest">
              FILL OUT FORM
            </button>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <Calendar className="w-12 h-12 text-[#f70118]" />
              </div>
              <h2 className="text-3xl font-black uppercase mb-4 italic tracking-tight">Apply for the Next Workshop</h2>
              <p className="text-gray-500 font-medium mb-10">We host these quarterly in Las Vegas. Spots are extremely limited and by application only.</p>

              <div className="space-y-4 text-left max-w-md mx-auto">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Full Name</label>
                  <input type="text" className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-lg outline-none focus:border-[#002542] transition-colors" placeholder="Alex Smith" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Current Monthly Revenue</label>
                  <select className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-lg outline-none focus:border-[#002542] transition-colors">
                    <option>$20k - $50k</option>
                    <option>$50k - $100k</option>
                    <option>$100k - $500k</option>
                    <option>$500k+</option>
                  </select>
                </div>
                <button className="w-full bg-[#002542] py-5 rounded-lg text-white font-black uppercase tracking-widest shadow-lg hover:bg-[#001a30] transition-colors mt-6">
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="overflow-hidden border border-gray-100 rounded-lg shadow-sm">
                <button
                  onClick={() => toggleFaq(index)}
                  className={`w-full flex items-center justify-between py-6 px-8 text-left transition-all ${openFaq === index ? 'bg-[#002542] text-white' : 'bg-[#002542] text-white hover:opacity-95'}`}
                >
                  <span className="text-sm md:text-base font-black uppercase tracking-tight italic">{faq.question}</span>
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaq === index && (
                  <div className="p-8 bg-gray-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-gray-600 leading-relaxed font-medium">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Primary Blue */}
      <footer className="bg-[#002542] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
            <div>
              <div className="flex items-center justify-center md:justify-start mb-6">
                <img src="/gregory-standal-sig-logo-white.svg" alt="Gregory Standal" className="h-10 md:h-12" />
              </div>
              <p className="text-blue-50 text-sm max-w-sm leading-relaxed opacity-80">
                Building removal systems and talent acquisition frameworks for elite business owners.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 md:gap-20 text-left">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">Resources</h4>
                <a href="#" className="block text-sm text-blue-50/70 hover:text-white transition-colors">Apply</a>
                <a href="#" className="block text-sm text-blue-50/70 hover:text-white transition-colors">Success Stories</a>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">Company</h4>
                <a href="#" className="block text-sm text-blue-50/70 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="block text-sm text-blue-50/70 hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-white/10 text-center">
            <p className="text-[10px] font-bold text-blue-100/40 uppercase tracking-[0.3em]">
              © 2026 GregoryStandal.com — All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;