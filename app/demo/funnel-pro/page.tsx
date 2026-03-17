"use client";
import React, { useState } from "react";
import { CheckCircle, ArrowRight, Play, MessageSquare, ShieldCheck, HelpCircle, Star, Quote } from "lucide-react";

const faqs = [
  {
    question: "Who is this for?",
    answer:
      "This is for business owners and marketing teams who want to scale their lead generation without sacrificing their time or technical sanity.",
  },
  {
    question: "What exactly do I get?",
    answer:
      "You get a high-converting landing page, strategic copywriting, technical implementation, and a follow-up automation plan designed for speed and clarity.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Most clients see meaningful progress in the first 7–30 days, assuming they follow the plan and complete the action steps.",
  },
  {
    question: "What if it doesn’t work for me?",
    answer:
      "We back the offer with a performance guarantee: if you do the work and don’t see results, we’ll work with you for free until you win.",
  },
];

const testimonials = [
  {
    quote: "We 3x'd booked calls in 60 days without increasing ad spend. The conversion rate jumped overnight.",
    name: "Sarah Jenkins",
    role: "Founder, GrowthScale",
    avatar: "SJ"
  },
  {
    quote: "Our funnel finally feels simple. One page, one offer, and it converts. No more tech headaches.",
    name: "Marcus Chen",
    role: "CMO, Fintech Solutions",
    avatar: "MC"
  },
  {
    quote: "This paid for itself in the first week with the extra sales we captured from existing traffic.",
    name: "David Ross",
    role: "Owner, Ross Consulting",
    avatar: "DR"
  }
];

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    goal: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Lead submitted:", form);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center md:min-w-[200px]">
            <img 
              src="/gregory-standal-sig-logo-blue.svg" 
              alt="Gregory Standal" 
              className="h-8 md:h-10" 
            />
          </div>
          <button 
            onClick={() => scrollToSection("lead-form-container")}
            className="hidden sm:block text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Book Strategy Session →
          </button>
        </div>
      </nav>

      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-600/20 mb-6">
              <Star size={14} className="fill-indigo-600" />
              For High-Growth Founders
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl leading-[1.1]">
              Get <span className="text-indigo-600 underline decoration-indigo-200 decoration-8 underline-offset-4">Dream Outcome</span> in 30 Days without the Pain.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-xl">
              We help you go from current status to your desired status with a proven, done-for-you system so you never have to worry about lead quality again.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Clear, measurable results: 20–50% more qualified leads",
                "Fast implementation: Launch your campaign in 14 days",
                "Zero tech overwhelm: We do the heavy lifting for you"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700 font-medium">
                  <CheckCircle size={22} className="text-indigo-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("lead-form-container")}
                className="flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Book Your Strategy Session
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="rounded-full bg-white px-8 py-4 text-lg font-bold text-slate-900 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 transition-all"
              >
                See How It Works
              </button>
            </div>

            <div className="mt-12">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Trusted by industry leaders</p>
              <div className="mt-4 flex flex-wrap gap-8 grayscale opacity-60 font-bold text-slate-500 text-xl italic">
                <span>LOGO ONE</span>
                <span>LOGO TWO</span>
                <span>LOGO THREE</span>
                <span>LOGO FOUR</span>
              </div>
            </div>
          </div>

          <div id="lead-form-container" className="mt-16 lg:mt-0 relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-50 -z-10" />
            
            <div className="rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-slate-200">
              <h3 className="text-xl font-bold text-slate-900">Free 30-Min Funnel Audit</h3>
              <p className="mt-2 text-sm text-slate-500">
                Tell us your goals and we&apos;ll map out the shortest path to hit them.
              </p>

              {submitted ? (
                <div className="mt-10 text-center py-12 bg-indigo-50 rounded-xl animate-in fade-in zoom-in duration-300">
                  <div className="mx-auto w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white mb-4">
                    <CheckCircle size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Request Received!</h4>
                  <p className="text-slate-600 mt-2">We&apos;ll reach out within 24 hours.</p>
                </div>
              ) : (
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700">Full Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="mt-1 block w-full rounded-lg border-slate-200 px-4 py-3 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-slate-50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700">Work Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="mt-1 block w-full rounded-lg border-slate-200 px-4 py-3 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700">What is your growth goal?</label>
                    <textarea
                      required
                      name="goal"
                      rows={3}
                      value={form.goal}
                      onChange={handleChange}
                      placeholder="e.g. Scaling to $100k MRR..."
                      className="mt-1 block w-full rounded-lg border-slate-200 px-4 py-3 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-slate-50 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg hover:bg-indigo-700 focus-visible:outline transition-all active:scale-95"
                  >
                    Get My Custom Funnel Plan
                  </button>
                  <p className="text-center text-[11px] text-slate-400">
                    By submitting, you agree to our terms. We value your privacy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">Tired of funnels that leak leads?</h2>
            <p className="mt-4 text-slate-400 text-lg">If this sounds familiar, we should talk.</p>
          </div>
          
          <div className="grid gap-12 sm:grid-cols-2 lg:gap-24">
            <div className="rounded-2xl bg-white/5 p-8 border border-white/10 hover:border-indigo-500/30 transition-all">
              <h3 className="flex items-center gap-2 text-xl font-bold text-red-400">
                <ShieldCheck className="rotate-180" size={24} />
                The Pain
              </h3>
              <ul className="mt-6 space-y-4 text-slate-300">
                <li className="flex gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                  Inconsistent leads or sales from your current funnel.
                </li>
                <li className="flex gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                  Expensive traffic that clicks but never converts.
                </li>
                <li className="flex gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                  Too many tools, not enough clear process or ROI.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-indigo-600/10 p-8 border border-indigo-500/20 hover:border-indigo-500 transition-all">
              <h3 className="flex items-center gap-2 text-xl font-bold text-indigo-400">
                <CheckCircle size={24} />
                The Promise
              </h3>
              <ul className="mt-6 space-y-4 text-slate-200">
                <li className="flex gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                  A single, simple funnel that turns clicks into calls.
                </li>
                <li className="flex gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                  Messaging that speaks directly to your ideal avatar.
                </li>
                <li className="flex gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                  Numbers you can track, improve, and scale with confidence.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">How it works</h2>
            <p className="mt-4 text-slate-600">Our seamless 3-step transition to high conversion.</p>
          </div>
          
          <div className="grid gap-12 lg:grid-cols-3">
            {[
              {
                step: "1",
                title: "Quick discovery call",
                desc: "We diagnose where your funnel leaks: offer, traffic, landing, or follow-up. Then we set a clear, measurable target."
              },
              {
                step: "2",
                title: "Offer & landing redesign",
                desc: "We rebuild your landing page around one irresistible offer, one avatar, and one main CTA to maximize focus."
              },
              {
                step: "3",
                title: "Launch, test, and scale",
                desc: "We launch, track conversion at each step, and iteratively improve copy and layout to hit your target metrics."
              }
            ].map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -inset-2 rounded-2xl bg-indigo-50 scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white shadow-lg shadow-indigo-200 mb-6">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden lg:flex">
            <div className="p-8 lg:p-12 lg:flex-1">
              <h2 className="text-3xl font-bold text-slate-900 leading-tight">Here&apos;s what you get when we build your funnel</h2>
              <ul className="mt-10 space-y-4">
                {[
                  "Done-for-you landing page with offer-focused copy",
                  "Conversion-optimized lead capture forms",
                  "Offer stack section (bonuses, guarantees, scarcity)",
                  "Email / SMS follow-up sequence blueprints",
                  "Full analytics & conversion tracking setup"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="text-indigo-600" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-xl bg-indigo-100/50 p-4 text-sm font-medium text-indigo-800">
                🚀 Bonus: We'll rewrite your main ad copy to ensure 100% message match from click to close.
              </div>
            </div>
            
            <div className="bg-indigo-600 p-8 lg:p-12 text-white lg:w-[400px] flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                  Beta Pricing
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold tracking-tight">$2,499</span>
                  <span className="text-lg font-medium text-indigo-200">setup</span>
                </div>
                <p className="mt-4 text-sm text-indigo-100">
                  Then optional ongoing optimization at $499/month. Guaranteed results or we keep working for free.
                </p>
              </div>

              <div className="mt-12 space-y-4">
                <button 
                  onClick={() => scrollToSection("lead-form-container")}
                  className="w-full rounded-xl bg-white px-6 py-4 text-center font-bold text-indigo-600 shadow-xl shadow-indigo-900/20 hover:bg-slate-50 transition-all"
                >
                  Apply for a Funnel Build
                </button>
                <div className="flex items-center justify-center gap-2 text-xs font-medium text-indigo-100">
                  <ShieldCheck size={14} />
                  30-Day Performance Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Client Results</h2>
              <p className="mt-4 text-slate-600">The numbers don&apos;t lie. Real results for real businesses.</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <Quote className="mb-6 text-indigo-600" size={32} />
                <p className="text-slate-700 leading-relaxed mb-6">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <HelpCircle className="text-indigo-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-2xl border border-slate-200 bg-white transition-all">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-slate-900">
                  {faq.question}
                  <span className="ml-4 shrink-0 transition-transform duration-300 group-open:rotate-180">
                    <ArrowRight size={18} className="rotate-90" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-indigo-600 py-24 sm:py-32">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-indigo-500 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 h-96 w-96 bg-indigo-400 rounded-full blur-3xl opacity-50" />
        
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Ready to turn clicks into customers?
          </h2>
          <p className="mt-6 text-xl leading-8 text-indigo-100">
            Don&apos;t leave your growth to chance. Let us build a funnel that works while you sleep.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-6">
            <button
              onClick={() => scrollToSection("lead-form-container")}
              className="rounded-full bg-white px-10 py-5 text-xl font-bold text-indigo-600 shadow-xl hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
            >
              Get My Funnel Plan Now
            </button>
            <div className="flex items-center gap-6 text-white/80 text-sm font-medium">
              <div className="flex items-center gap-1"><ShieldCheck size={16} /> 100% Secure</div>
              <div className="flex items-center gap-1"><MessageSquare size={16} /> Fast Response</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 py-12 text-slate-400">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/gregory-standal-sig-logo-white.svg" 
              alt="Gregory Standal" 
              className="h-10 opacity-80 hover:opacity-100 transition-opacity" 
            />
          </div>
          <p className="text-sm">© {new Date().getFullYear()} gregorystandal.com. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
