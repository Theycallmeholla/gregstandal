"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, Star, ChevronDown, ArrowRight, X, Pause } from 'lucide-react';

const colors = {
  primary: '#002542',
  accent: '#F70118',
};

// Video URLs
const videos = {
  vsl: 'https://vz-4623b833-cb9.b-cdn.net/a2c94234-b4c8-4e31-85e7-da43f7d0150e/playlist.m3u8',
  testimonials: [
    'https://vz-4623b833-cb9.b-cdn.net/bca3f26c-e637-4a54-8e2f-3e33a69c9655/playlist.m3u8',
    'https://vz-4623b833-cb9.b-cdn.net/288f32f9-b936-49c1-a45f-3ac63ed0fe60/playlist.m3u8',
    'https://vz-4623b833-cb9.b-cdn.net/15e0cfe3-7948-466f-bbd7-a4afbdcbfe62/playlist.m3u8',
    'https://vz-4623b833-cb9.b-cdn.net/7541fba0-3276-4bed-a2ca-c352e5b9e68f/playlist.m3u8',
  ],
};

// HLS Video Player Component
function HLSVideo({
  src,
  poster,
  className = '',
  autoPlay = false,
  muted = false,
  controls = true,
  onPlay,
  onPause,
}: {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if HLS is supported natively (Safari)
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    } else {
      // Use hls.js for other browsers
      import('hls.js').then(({ default: Hls }) => {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia(video);
        }
      });
    }
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setShowControls(true);
      onPlay?.();
    } else {
      video.pause();
      setIsPlaying(false);
      onPause?.();
    }
  };

  return (
    <div className={`relative ${className}`} onClick={togglePlay}>
      <video
        ref={videoRef}
        poster={poster}
        className="w-full h-full object-cover"
        playsInline
        muted={muted}
        autoPlay={autoPlay}
        controls={showControls && controls}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      {!isPlaying && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center cursor-pointer">
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
            style={{ backgroundColor: colors.accent }}
          >
            <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" />
          </div>
        </div>
      )}
    </div>
  );
}

// Video Modal Component
function VideoModal({
  isOpen,
  onClose,
  videoSrc,
  poster,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  poster?: string;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl z-10">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-slate-300 transition"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="aspect-video rounded-2xl overflow-hidden bg-black">
          <HLSVideo src={videoSrc} poster={poster} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}

export default function FunnelAuditPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [vslModalOpen, setVslModalOpen] = useState(false);
  const [testimonialModal, setTestimonialModal] = useState<number | null>(null);

  const scrollToForm = () => {
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const testimonialData = [
    { type: "Remodeling Company", result: "Leads came in more informed and easier to close." },
    { type: "Home Service Business", result: "The biggest difference was better-fit inquiries." },
    { type: "Roofing Contractor", result: "Higher trust before we even showed up for the estimate." },
    { type: "HVAC Company", result: "Sales calls went smoother after they watched the video." },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen">
      {/* Minimal Header */}
      <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <img src="/gregory-standal-sig-logo-blue.svg" alt="Gregory Standal" className="h-8 md:h-10" />
          <button
            onClick={scrollToForm}
            className="text-white font-bold text-sm px-6 py-2.5 rounded-full transition hover:opacity-90"
            style={{ backgroundColor: colors.accent }}
          >
            Book Your Audit
          </button>
        </div>
      </header>

      {/* SECTION 1: Hero - Two Column */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
              style={{ backgroundColor: colors.accent + '15', color: colors.accent }}
            >
              For Established Contractors
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-[3.25rem] font-black leading-[1.1] mb-6"
              style={{ color: colors.primary }}
            >
              Turn Existing Traffic Into More Qualified Booked Estimates
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              We help established contractors turn website traffic, ad clicks, and referrals into more estimate requests using a trust-building video, stronger proof, and a conversion-focused landing page.
            </p>

            {/* 3 Bullets */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold" style={{ color: colors.primary }}>More qualified booked estimates</span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold" style={{ color: colors.primary }}>Higher trust before the sales call</span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold" style={{ color: colors.primary }}>Less wasted traffic</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={scrollToForm}
              className="text-white font-bold text-lg px-8 py-4 rounded-xl transition hover:opacity-90 flex items-center gap-2 group"
              style={{ backgroundColor: colors.accent, boxShadow: `0 10px 30px -5px ${colors.accent}50` }}
            >
              Book Your Free Audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: VSL */}
          <div>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: colors.primary }}>
              Watch This Before You Book
            </p>
            <div
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
              style={{ border: `3px solid ${colors.primary}20` }}
              onClick={() => setVslModalOpen(true)}
            >
              <img
                src="/greg-video-thumbnail.png"
                alt="VSL Video"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center group-hover:from-black/50 transition">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: colors.accent }}
                >
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-3 text-center">
              In this short video, we&apos;ll show you how the system works, who it&apos;s for, and whether it fits your business.
            </p>
          </div>
        </div>
      </section>

      {/* VSL Modal */}
      <VideoModal
        isOpen={vslModalOpen}
        onClose={() => setVslModalOpen(false)}
        videoSrc={videos.vsl}
        poster="/greg-video-thumbnail.png"
      />

      {/* SECTION 2: Google Reviews Proof */}
      <section className="py-16 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-10" style={{ color: colors.primary }}>
            Trusted by businesses that wanted better leads, not more noise.
          </h2>

          {/* Google Reviews */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_92x30dp.png" alt="Google" className="h-6" />
              <span className="font-bold text-slate-700">Reviews</span>
            </div>
            <div className="flex" style={{ color: colors.accent }}>
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="text-sm font-medium text-slate-600">5.0 Rating</span>
          </div>

          {/* Review Snippets */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "/Christine_Thares_review.png",
              "/John_Stahl_review.png",
              "/Thomas_Miller_review.png",
            ].map((src, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-white">
                <img src={src} alt="Client Review" className="w-full h-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Video Testimonials */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-4" style={{ color: colors.primary }}>
            Proof From Businesses That Wanted Better Leads
          </h2>
          <p className="text-center text-slate-600 mb-10">
            Real results from contractors who needed better-fit inquiries, not more noise.
          </p>

          {/* 9:16 Testimonial Videos Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {testimonialData.map((testimonial, idx) => (
              <div
                key={idx}
                className="relative aspect-[9/16] rounded-xl overflow-hidden bg-slate-900 shadow-lg group cursor-pointer"
                onClick={() => setTestimonialModal(idx)}
              >
                <HLSVideo
                  src={videos.testimonials[idx]}
                  className="w-full h-full"
                  controls={false}
                  muted
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 pointer-events-none">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                  </div>
                  <p className="text-white font-bold text-sm">{testimonial.type}</p>
                  <p className="text-white/80 text-xs mt-1">&ldquo;{testimonial.result}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Video Modals */}
      {testimonialData.map((_, idx) => (
        <VideoModal
          key={idx}
          isOpen={testimonialModal === idx}
          onClose={() => setTestimonialModal(null)}
          videoSrc={videos.testimonials[idx]}
        />
      ))}

      {/* SECTION 4: What You Get */}
      <section className="py-16 px-6 text-white" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
            What You Get
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Funnel audit and opportunity analysis",
              "Trust-building sales video",
              "Conversion-focused landing page",
              "Testimonial and proof integration",
              "Estimate-request form or booking flow",
              "Launch support",
              "Recommendations for follow-up",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.accent }}
                >
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Form */}
      <section id="form" className="py-20 px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3" style={{ color: colors.primary }}>
              Book Your Free Funnel Audit
            </h2>
            <p className="text-center text-slate-600 mb-8">
              We&apos;ll review your current page, message, and conversion path and show you what to fix first.
            </p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.primary }}>First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none transition focus:border-[#002542] focus:ring-2 focus:ring-[#002542]/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.primary }}>Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none transition focus:border-[#002542] focus:ring-2 focus:ring-[#002542]/20"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.primary }}>Company Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none transition focus:border-[#002542] focus:ring-2 focus:ring-[#002542]/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.primary }}>Website</label>
                  <input
                    type="url"
                    placeholder="https://"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none transition focus:border-[#002542] focus:ring-2 focus:ring-[#002542]/20"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.primary }}>Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none transition focus:border-[#002542] focus:ring-2 focus:ring-[#002542]/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: colors.primary }}>Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none transition focus:border-[#002542] focus:ring-2 focus:ring-[#002542]/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: colors.primary }}>Monthly Revenue or Ad Spend</label>
                <select className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none transition focus:border-[#002542] focus:ring-2 focus:ring-[#002542]/20 bg-white">
                  <option>Under $20k/month</option>
                  <option>$20k - $50k/month</option>
                  <option>$50k - $100k/month</option>
                  <option>$100k+/month</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: colors.primary }}>What kind of jobs do you want more of?</label>
                <input
                  type="text"
                  placeholder="e.g., Kitchen remodels, roof replacements, etc."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none transition focus:border-[#002542] focus:ring-2 focus:ring-[#002542]/20"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white font-bold text-lg py-4 rounded-xl transition hover:opacity-90"
                style={{ backgroundColor: colors.accent, boxShadow: `0 10px 30px -5px ${colors.accent}40` }}
              >
                See If We&apos;re a Fit
              </button>

              <p className="text-center text-xs text-slate-500">
                Your information is 100% secure. We&apos;ll reach out within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-10" style={{ color: colors.primary }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Who is this for?",
                a: "This is for established contractors and home service businesses already getting some traffic, referrals, or attention—but not converting enough of it into qualified booked estimates."
              },
              {
                q: "How is this different from a normal agency?",
                a: "Most agencies sell traffic or content. We focus on the trust and conversion layer that turns attention into actual booked estimates. We don't just make things look pretty—we build assets that sell."
              },
              {
                q: "Do I need ads for this to work?",
                a: "No. This works with paid traffic, organic traffic, referrals, direct visits, and existing brand attention. The goal is to help more of your current traffic convert."
              },
              {
                q: "What happens after I book?",
                a: "We'll review your current funnel, identify where you're losing trust and leads, and show you a clear plan to fix it. If we're a fit, we'll discuss next steps."
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold transition hover:bg-slate-50"
                  style={{ color: colors.primary }}
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-slate-600">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Final CTA */}
      <section className="py-20 px-6" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stop Letting Good Traffic Slip Away
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Book your audit and we&apos;ll show you where your current funnel is losing trust, leads, and booked estimates.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-white font-bold text-lg px-10 py-4 rounded-xl transition hover:opacity-90 inline-flex items-center gap-2 group"
            style={{ color: colors.primary }}
          >
            Book Your Free Audit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 bg-white border-t border-slate-200 text-center">
        <img src="/gregory-standal-sig-logo-blue.svg" alt="Gregory Standal" className="h-8 mx-auto mb-4" />
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Gregory Standal. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
