"use client";

import React, { useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import type { ExperimentContext } from '@/lib/ab-test/types';
import { trackFormStart, trackFormSubmit } from '@/lib/ab-test/experiment';

interface Step1FormProps {
  className?: string;
  context?: ExperimentContext | null;
  redirectTo?: string;
}

export function Step1Form({ className = '', context, redirectTo = '/contractors/apply' }: Step1FormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasTrackedStart = useRef(false);

  const handleFieldFocus = () => {
    if (hasTrackedStart.current || !context) return;
    hasTrackedStart.current = true;
    trackFormStart(context, 'step1_form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Split name into first/last
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || firstName; // Use first name as last if only one word

    try {
      // Submit to GHL API
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.company,
          formType: 'step1_form',
          landingPage: pathname,
          experimentVariant: context?.variant?.id,
        }),
      });
    } catch (err) {
      // Log but don't block - let user continue to next step
      console.error('Lead submission error:', err);
    }

    // Track form submit
    if (context) {
      trackFormSubmit(context, 'step1_form');
    }

    // Always redirect regardless of API result
    router.push(redirectTo);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-200 ${className}`}
    >
      <h3 className="text-xl font-black text-[#002542] mb-6 uppercase tracking-tight text-center">
        Step 1: Get Your Free Assessment
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
            Full Name
          </label>
          <input
            required
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onFocus={handleFieldFocus}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
            Email Address
          </label>
          <input
            required
            type="email"
            placeholder="john@company.com"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onFocus={handleFieldFocus}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
            Phone Number
          </label>
          <input
            required
            type="tel"
            placeholder="(555) 000-0000"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            onFocus={handleFieldFocus}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
            Company / Trade
          </label>
          <input
            required
            type="text"
            placeholder="Roofing / Windows / HVAC"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            onFocus={handleFieldFocus}
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#FF6B00] text-white py-4 rounded-lg font-black uppercase tracking-wider hover:-translate-y-1 transition shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Next Step: Answer 5 Quick Questions <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
        <p className="text-center text-sm text-slate-500 mt-4">
          Takes ~30 seconds. We&apos;ll review and show you if we can add 20–30% more booked estimates
          in 90 days.
        </p>
      </div>
    </form>
  );
}
