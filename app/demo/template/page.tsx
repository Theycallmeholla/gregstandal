"use client";

import React, { useState } from "react";
import {
  Play,
  Star,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  XCircle,
  FileMinus,
  Check,
  AlertCircle
} from "lucide-react";

export default function WireframePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const placeholderImg = (label: string = "[Image Placeholder]") => (
    <div className="bg-gray-200 border-2 border-dashed border-gray-300 w-full h-full flex items-center justify-center text-gray-400 font-medium p-4 text-center uppercase tracking-widest text-xs">
      {label}
    </div>
  );

  const placeholderVideo = (label: string = "[Video Placeholder]") => (
    <div className="bg-gray-800 w-full h-full flex items-center justify-center relative group cursor-pointer overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-black/20" />
      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm z-10 transition-transform group-hover:scale-110">
        <Play className="w-8 h-8 text-white fill-white ml-1" />
      </div>
      <div className="absolute bottom-4 left-0 w-full text-center z-10">
        <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Header */}
      <header className="py-6 px-4 max-w-7xl mx-auto flex items-center justify-center lg:justify-start">
        <div className="w-48 h-12">
          {placeholderImg("[Logo Placeholder]")}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-8 pb-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              [Headline Placeholder: Main Value Proposition]
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              [Subheadline Placeholder: Detailed explanation of the offer, supporting the main headline and building trust without giving specifics away.]
            </p>
            <div className="mb-6">
              <button className="w-full sm:w-auto px-10 py-4 rounded bg-[#0047AB] text-white font-bold text-lg hover:bg-blue-800 transition-colors">
                [CTA Button Placeholder]
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-8">
              [Minor subtext placeholder below button]
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-bold text-gray-500">G</span>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600">[Rating Text Placeholder]</span>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-gray-100">
              {placeholderImg("[Hero Dashboard Image Placeholder]")}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof (Real Results) */}
      <section className="py-20 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              [Section Title Placeholder]
            </h2>
            <p className="text-gray-500">
              [Section Subtitle Placeholder]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                      {placeholderImg("[]")}
                    </div>
                    <span className="font-bold text-sm">[Name Placeholder]</span>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic mb-6 flex-grow leading-relaxed">
                  &quot;[Testimonial quote placeholder text describing their specific problem and how the service solved it for them.]&quot;
                </p>
                <div className="aspect-[16/9] rounded-lg overflow-hidden border border-gray-100 bg-gray-100">
                  {placeholderVideo(`[Video ${i} Placeholder]`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points (Costing You Money) */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              [Pain Point Section Title Placeholder]
            </h2>
            <p className="text-gray-500">
              [Pain Point Section Subtitle Placeholder]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <BarChart3 className="w-6 h-6 text-red-500" /> },
              { icon: <AlertTriangle className="w-6 h-6 text-red-500" /> },
              { icon: <FileMinus className="w-6 h-6 text-red-500" /> }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 rounded bg-red-50 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">[Pain Point Title {i+1}]</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  [Description of the pain point placeholder, explaining exactly what is costing them or hurting them.]
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Reveal (2 columns) */}
      <section className="py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              [Analysis Title Placeholder]
            </h2>
            <p className="text-gray-500">
              [Analysis Subtitle Placeholder]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-bold">[Positive Column Title]</h3>
              </div>
              <ul className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">[Positive item placeholder text]</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold">[Negative Column Title]</h3>
              </div>
              <ul className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <li key={i} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">[Negative item placeholder text]</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="px-10 py-4 rounded bg-[#0047AB] text-white font-bold text-lg hover:bg-blue-800 transition-colors">
              [CTA Button Placeholder]
            </button>
          </div>
        </div>
      </section>

      {/* Grid Features (What You'll Get) */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              [Grid Section Title Placeholder]
            </h2>
            <p className="text-gray-500">
              [Grid Section Subtitle Placeholder]
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-3">[Feature Title Placeholder {i}]</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  [Description of what the user receives in this specific feature placeholder.]
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button className="px-10 py-4 rounded bg-[#0047AB] text-white font-bold text-lg hover:bg-blue-800 transition-colors">
              [CTA Button Placeholder]
            </button>
          </div>
        </div>
      </section>

      {/* Detailed Success Stories Container */}
      <section className="py-20 px-4 bg-blue-50/30 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              [Case Study Section Title Placeholder]
            </h2>
            <p className="text-gray-500">
              [Case Study Section Subtitle Placeholder]
            </p>
          </div>

          {/* Story 1 */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col">
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black mb-6">
                   {placeholderVideo("[Main Video Placeholder]")}
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                    [Initials]
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">[Name Placeholder]</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">[Location Placeholder]</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="relative mb-10">
                  <span className="text-6xl text-gray-200 absolute -top-6 -left-4 font-serif leading-none">&ldquo;</span>
                  <p className="text-lg font-medium text-gray-700 italic relative z-10 leading-relaxed">
                    [Detailed testimonial quote placeholder. Describes their situation before, the process, and the outcome.]
                  </p>
                </div>
                <div>
                  <h5 className="font-bold text-sm text-gray-900 mb-4">[Result List Title Placeholder]:</h5>
                  <ul className="space-y-3">
                    {[1, 2, 3].map(j => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-gray-600">[Result bullet point placeholder]</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Story 2 */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative mb-10">
                  <span className="text-6xl text-gray-200 absolute -top-6 -left-4 font-serif leading-none">&ldquo;</span>
                  <p className="text-lg font-medium text-gray-700 italic relative z-10 leading-relaxed">
                    [Detailed testimonial quote placeholder. Describes their situation before, the process, and the outcome.]
                  </p>
                </div>
                <div>
                  <h5 className="font-bold text-sm text-gray-900 mb-4">[Result List Title Placeholder]:</h5>
                  <ul className="space-y-3">
                    {[1, 2, 3, 4].map(j => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-gray-600">[Result bullet point placeholder]</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col order-1 lg:order-2">
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black mb-6">
                   {placeholderVideo("[Video Placeholder]")}
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                    [Initials]
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">[Name Placeholder]</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">[Location Placeholder]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story 3 */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col">
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black mb-6">
                   {placeholderVideo("[Video Placeholder]")}
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                    [Initials]
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">[Name Placeholder]</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">[Location Placeholder]</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="relative mb-10">
                  <span className="text-6xl text-gray-200 absolute -top-6 -left-4 font-serif leading-none">&ldquo;</span>
                  <p className="text-lg font-medium text-gray-700 italic relative z-10 leading-relaxed">
                    [Detailed testimonial quote placeholder. Describes their situation before, the process, and the outcome.]
                  </p>
                </div>
                <div>
                  <h5 className="font-bold text-sm text-gray-900 mb-4">[Result List Title Placeholder]:</h5>
                  <ul className="space-y-3">
                    {[1, 2, 3, 4].map(j => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-gray-600">[Result bullet point placeholder]</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              [Process Section Title Placeholder]
            </h2>
            <p className="text-gray-500">
              [Process Section Subtitle Placeholder]
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="w-full max-w-sm aspect-[1/2] rounded-3xl overflow-hidden">
                 {placeholderImg("[Process Infographic Image Placeholder]")}
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              {[
                { step: "1", title: "[Step 1 Title Placeholder]", desc: "[Description of the first phase of the service.]" },
                { step: "2", title: "[Step 2 Title Placeholder]", desc: "[Description of the second phase of the service.]" },
                { step: "3", title: "[Step 3 Title Placeholder]", desc: "[Description of the third phase of the service.]" },
                { step: "4", title: "[Step 4 Title Placeholder]", desc: "[Description of the fourth phase of the service.]" },
                { step: "5", title: "[Step 5 Title Placeholder]", desc: "[Description of the final phase and success state.]", icon: true }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-blue-800 bg-blue-100">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                      {item.title}
                      {item.icon && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <button className="px-10 py-4 rounded bg-[#0047AB] text-white font-bold text-lg hover:bg-blue-800 transition-colors">
              [CTA Button Placeholder]
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              [FAQ Section Title Placeholder]
            </h2>
            <p className="text-gray-500">
              [FAQ Section Subtitle Placeholder]
            </p>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border-b border-gray-200">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left"
                >
                  <span className="font-bold text-gray-900">[Frequently asked question {i} placeholder?]</span>
                  {openFaq === i ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                </button>
                {openFaq === i && (
                  <div className="pb-6">
                    <p className="text-gray-600 leading-relaxed text-sm">[Detailed answer placeholder content. Explaining the specifics to resolve user doubts or objections.]</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-[#002B5B] text-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            [Final CTA Headline Placeholder]
          </h2>
          <p className="text-blue-100 mb-10 max-w-2xl mx-auto">
            [Final CTA subheadline placeholder providing one last push for conversion.]
          </p>
          <div className="flex flex-col items-center gap-4">
            <button className="px-10 py-4 rounded bg-white text-[#002B5B] font-bold text-lg hover:bg-gray-100 transition-colors">
              [Final CTA Button Placeholder]
            </button>
            <p className="text-sm text-blue-200/80">
              [Minor risk reversal or guarantee placeholder]
            </p>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 bg-[#001D3D] border-t border-white/5 px-4 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="w-32 h-8 opacity-50">
            {placeholderImg("[Logo Placeholder]")}
          </div>
          <div className="flex gap-8">
            <span className="text-blue-200/40 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">[Privacy]</span>
            <span className="text-blue-200/40 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">[Terms]</span>
            <span className="text-blue-200/40 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">[Contact]</span>
          </div>
          <p className="text-blue-200/40 text-[10px] font-bold uppercase tracking-[0.2em]">
            © 2026 [Company Name Placeholder]
          </p>
        </div>
      </footer>
    </div>
  );
}
