"use client";
import React from 'react';
import Image from 'next/image';
import { mainVslVideoSrc } from '../../brand-builders-v2/case-studies/data';
import { InlineVideoPlayer } from '../video-player';
import {
  CheckCircle,
  Calendar,
  Clock,
  Video,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const colors = {
  primary: '#002542',
  accent: '#FF6B00',
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans flex flex-col">
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
          <Image src="/gregory-standal-sig-logo-blue.svg" alt="Greg Standal" width={180} height={40} className="h-10 w-auto" />
        </div>
      </header>

      <main className="flex-1 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#002542] mb-4 uppercase tracking-tight">You&apos;re Booked!</h1>
            <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">Your Brand Strategy Call has been successfully scheduled. We&apos;ve sent a confirmation to your email.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
             <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 space-y-6">
                <h2 className="text-xl font-black text-[#002542] uppercase tracking-widest border-b border-slate-100 pb-4 mb-6">Call Details</h2>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-xs tracking-[0.2em] text-slate-400">Date</h3>
                    <p className="font-bold text-[#002542]">Selected Date (Check Email)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-xs tracking-[0.2em] text-slate-400">Duration</h3>
                    <p className="font-bold text-[#002542]">30 Minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-xs tracking-[0.2em] text-slate-400">Meeting Link</h3>
                    <p className="font-bold text-[#002542]">Check your email for link</p>
                  </div>
                </div>
                <div className="mt-10 p-4 bg-[#FF6B00]/10 rounded-2xl border border-[#FF6B00]/20 flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#FF6B00] shrink-0" />
                  <p className="text-sm font-bold text-[#FF6B00]">Please arrive 5 minutes early. No-shows are not rescheduled.</p>
                </div>
             </div>

             <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 space-y-6">
                <h2 className="text-xl font-black text-[#002542] uppercase tracking-widest border-b border-slate-100 pb-4 mb-6">Prep Steps</h2>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#002542] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">1</div>
                    <p className="text-slate-600 font-medium">Check your inbox and add the call to your calendar.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#002542] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">2</div>
                    <p className="text-slate-600 font-medium">Have your current marketing numbers ready (Lead costs, close rate, etc).</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#002542] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">3</div>
                    <p className="text-slate-600 font-medium">Ensure you have a stable internet connection and are in a quiet place.</p>
                  </li>
                </ul>
                <div className="pt-6">
                   <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-4">Questions before we meet?</p>
                   <p className="text-lg font-bold text-[#002542]">support@newcapepictures.com</p>
                </div>
             </div>
          </div>

          <div className="bg-[#002542] text-white p-10 md:p-16 rounded-[40px] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
             <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6">
                   <h2 className="text-3xl font-black mb-6 uppercase tracking-tight leading-tight">While You Wait...</h2>
                   <p className="text-slate-300 font-medium mb-8 leading-relaxed">Watch this short video to understand exactly how we help contractors scale their booked estimates with trust-building systems.</p>
                   <ul className="space-y-4">
                      <li className="flex items-center gap-3 text-slate-200 font-bold">
                        <CheckCircle className="w-5 h-5 text-[#FF6B00]" />
                        <span>The trust-building blueprint</span>
                      </li>
                      <li className="flex items-center gap-3 text-slate-200 font-bold">
                        <CheckCircle className="w-5 h-5 text-[#FF6B00]" />
                        <span>Why standard ads are failing</span>
                      </li>
                      <li className="flex items-center gap-3 text-slate-200 font-bold">
                        <CheckCircle className="w-5 h-5 text-[#FF6B00]" />
                        <span>Our 90-day growth framework</span>
                      </li>
                   </ul>
                </div>
                <div className="lg:col-span-6">
                   <InlineVideoPlayer
                      src={mainVslVideoSrc}
                      poster="/vsl-cover.png"
                      hoverVideoSrc={mainVslVideoSrc}
                      naturalAspect={true}
                      playOnHover={true}
                      accentColor={colors.accent}
                      className="w-full shadow-2xl border border-white/10"
                    />
                </div>
             </div>
          </div>

        </div>
      </main>

      <footer className="py-8 bg-white border-t border-slate-200 text-center">
        <p className="font-medium text-slate-500 text-xs uppercase tracking-widest">© {new Date().getFullYear()} New Cape Pictures. All rights reserved.</p>
      </footer>
    </div>
  );
}
