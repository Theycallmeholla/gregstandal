"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { CheckCircle, Clock, Calendar, AlertCircle, ArrowRight } from 'lucide-react';

export default function ApplyPage() {
  const [step, setStep] = useState('qualify'); // 'qualify' or 'calendar'
  const [formData, setFormData] = useState({
    revenue: '',
    teamSize: '',
    leadVolume: '',
    monthlySales: '',
    bottleneck: '',
    service: '',
    timeline: '',
    commitment: ''
  });

  const handleQualifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('calendar');
  };

  const revenueOptions = ['$0 - $50k', '$50k - $150k', '$150k - $500k', '$500k - $1M', '$1M+'];
  const timelineOptions = ['Immediately', 'Within 30 days', '30 - 90 days', 'Just researching'];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans flex flex-col">
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
          <Image src="/gregory-standal-sig-logo-blue.svg" alt="Greg Standal" width={180} height={40} className="h-10 w-auto" />
        </div>
      </header>

      <main className="flex-1 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Application</span>
            </div>
            <div className="w-12 h-px bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 'calendar' ? 'bg-green-500 text-white' : 'bg-[#FF6B00] text-white'}`}>
                {step === 'calendar' ? <CheckCircle className="w-5 h-5" /> : '2'}
              </div>
              <span className={`text-xs font-black uppercase tracking-widest ${step === 'calendar' ? 'text-slate-400' : 'text-[#002542]'}`}>Qualification</span>
            </div>
            <div className="w-12 h-px bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 'calendar' ? 'bg-[#FF6B00] text-white' : 'bg-slate-200 text-slate-400'}`}>3</div>
              <span className={`text-xs font-black uppercase tracking-widest ${step === 'calendar' ? 'text-[#002542]' : 'text-slate-400'}`}>Booking</span>
            </div>
          </div>

          {step === 'qualify' ? (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-black text-[#002542] mb-4 uppercase tracking-tight">Qualify Your Business</h1>
                <p className="text-slate-600 font-medium">Please answer these 8 questions to unlock the calendar.</p>
              </div>

              <form onSubmit={handleQualifySubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Revenue Range (Monthly)</label>
                    <select required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition bg-white" value={formData.revenue} onChange={(e) => setFormData({...formData, revenue: e.target.value})}>
                      <option value="">Select Range</option>
                      {revenueOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Team Size</label>
                    <input required type="text" placeholder="e.g. 5 employees" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition" value={formData.teamSize} onChange={(e) => setFormData({...formData, teamSize: e.target.value})} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Monthly Lead Volume</label>
                    <input required type="text" placeholder="e.g. 50 leads" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition" value={formData.leadVolume} onChange={(e) => setFormData({...formData, leadVolume: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Monthly Sales / Booked Calls</label>
                    <input required type="text" placeholder="e.g. 20 calls" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition" value={formData.monthlySales} onChange={(e) => setFormData({...formData, monthlySales: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Biggest Bottleneck in Growth</label>
                  <textarea required placeholder="What is holding you back right now?" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition min-h-[100px]" value={formData.bottleneck} onChange={(e) => setFormData({...formData, bottleneck: e.target.value})} />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">What service do you want help with?</label>
                  <input required type="text" placeholder="e.g. Lead Gen, Branding, Video" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition" value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Timeline to Start</label>
                    <select required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition bg-white" value={formData.timeline} onChange={(e) => setFormData({...formData, timeline: e.target.value})}>
                      <option value="">Select Timeline</option>
                      {timelineOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Are you willing to follow a proven process?</label>
                    <div className="flex gap-4">
                      {['Yes', 'No'].map(opt => (
                        <button key={opt} type="button" onClick={() => setFormData({...formData, commitment: opt})} className={`flex-1 py-3 rounded-lg border font-bold transition ${formData.commitment === opt ? 'bg-[#002542] text-white border-[#002542]' : 'bg-white text-slate-600 border-slate-200 hover:border-[#FF6B00]'}`}>{opt}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full bg-[#FF6B00] text-white py-5 rounded-lg font-black uppercase tracking-wider hover:-translate-y-1 transition shadow-xl flex items-center justify-center gap-2 text-xl">
                  Unlock Calendar <ArrowRight className="w-6 h-6" />
                </button>
              </form>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-[#002542] text-white p-8 md:p-10 rounded-3xl shadow-xl">
                  <h1 className="text-2xl md:text-3xl font-black mb-6 uppercase tracking-tight">Book Your Strategy Call</h1>
                  <p className="text-slate-300 font-medium mb-8">This call is for contractors ready to scale their brand and lead flow using strategic video systems.</p>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Clock className="w-6 h-6 text-[#FF6B00] shrink-0" />
                      <div>
                        <h3 className="font-black uppercase text-sm tracking-widest mb-1">Duration</h3>
                        <p className="text-slate-400 text-sm font-medium">30 Minutes - We respect your time.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Calendar className="w-6 h-6 text-[#FF6B00] shrink-0" />
                      <div>
                        <h3 className="font-black uppercase text-sm tracking-widest mb-1">What to Expect</h3>
                        <p className="text-slate-400 text-sm font-medium">A customized 90-day growth roadmap for your specific business.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-[#FF6B00] shrink-0" />
                      <div>
                        <h3 className="font-black uppercase text-sm tracking-widest mb-1">No-Show Policy</h3>
                        <p className="text-slate-400 text-sm font-medium">Cancellations must be made 24h in advance to maintain priority.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 bg-white rounded-3xl shadow-2xl border border-slate-200 p-2 min-h-[800px] relative">
                <iframe src="https://link.cursivecrm.com/widget/booking/tRgGOQiQsmjldJZwy3JE" style={{ width: '100%', border: 'none', minHeight: '800px' }} title="Booking Calendar" />
                <Script src="https://link.cursivecrm.com/js/form_embed.js" strategy="afterInteractive" />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 bg-white border-t border-slate-200 text-center">
        <p className="font-medium text-slate-500 text-xs uppercase tracking-widest">© {new Date().getFullYear()} New Cape Pictures. All rights reserved.</p>
      </footer>
    </div>
  );
}
