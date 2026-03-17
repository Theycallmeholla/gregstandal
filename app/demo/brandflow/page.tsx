"use client";

import React, { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import {
  Play,
  PlayCircle,
  Star,
  ShieldCheck,
  MessageSquare,
  Zap,
  ArrowRight,
  Video,
  Users,
  Smartphone,
  Camera,
  Calendar,
  Plus,
  Check,
  Instagram,
  Linkedin,
  Youtube,
  X
} from 'lucide-react';

// Color scheme
const colors = {
  primary: '#002542',
  accent: '#F70118',
};

// Video URLs mapping
const videoUrls: Record<string, string> = {
  'reel': 'https://vz-4623b833-cb9.b-cdn.net/a2c94234-b4c8-4e31-85e7-da43f7d0150e/playlist.m3u8',
  'work1': 'https://vz-4623b833-cb9.b-cdn.net/bca3f26c-e637-4a54-8e2f-3e33a69c9655/playlist.m3u8',
  'work2': 'https://vz-4623b833-cb9.b-cdn.net/288f32f9-b936-49c1-a45f-3ac63ed0fe60/playlist.m3u8',
  'work3': 'https://vz-4623b833-cb9.b-cdn.net/15e0cfe3-7948-466f-bbd7-a4afbdcbfe62/playlist.m3u8',
  'vsl-strategy': 'https://vz-4623b833-cb9.b-cdn.net/7541fba0-3276-4bed-a2ca-c352e5b9e68f/playlist.m3u8',
  'work4': 'https://vz-4623b833-cb9.b-cdn.net/78e50419-bb02-4258-ae94-4ed2aba985ab/playlist.m3u8',
  'work5': 'https://vz-4623b833-cb9.b-cdn.net/278c90b5-a038-4f23-a0e4-92bc2f2119a7/playlist.m3u8',
};

// Client logos
const clientLogos = [
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-verizon.jpg", alt: "Verizon" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-coldwell-banker.jpg", alt: "Coldwell Banker" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-bissel.jpg", alt: "Bissell" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-masterchef.jpg", alt: "MasterChef" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-spectrum.jpg", alt: "Spectrum" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-bella.jpg", alt: "Bella" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-sensor-brite.jpg", alt: "Sensor Brite" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-general-steel.jpg", alt: "General Steel" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-housemaster.jpg", alt: "HouseMaster" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-valley.jpg", alt: "Valley" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-marmon-crane.jpg", alt: "Marmon Crane" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-topilow.jpg", alt: "Topilow" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-jan-fence.jpg", alt: "Jan Fence" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-george-apap.jpg", alt: "George Apap" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-ag-williams.jpg", alt: "AG Williams" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-gemstone.jpg", alt: "Gemstone" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-my-fence-railing.jpg", alt: "My Fence & Railing" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-hetherington.jpg", alt: "Hetherington" },
  { src: "https://newcapepictures.com/wp-content/uploads/2025/07/logo-roof-shark.jpg", alt: "Roof Shark" },
];

export default function BrandflowLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const openModal = (videoId: string) => {
    setActiveVideo(videoId);
    setIsModalOpen(true);
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    // Cleanup HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    setIsModalOpen(false);
    setActiveVideo(null);
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  };

  // Initialize HLS player when modal opens
  useEffect(() => {
    if (isModalOpen && activeVideo && videoRef.current) {
      const videoUrl = videoUrls[activeVideo];
      if (!videoUrl) return;

      const video = videoRef.current;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {
            // Autoplay may be blocked, user can click play
          });
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari native HLS support
        video.src = videoUrl;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(() => {});
        });
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [isModalOpen, activeVideo]);

  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
    return () => {
      document.documentElement.classList.remove('scroll-smooth');
    };
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 antialiased font-sans">
      {/* 1. Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/gregory-standal-sig-logo-blue.svg" alt="Gregory Standal" className="h-8 md:h-10" />
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium" style={{ color: colors.primary }}>
            <a href="#portfolio" className="hover:opacity-70 transition">Portfolio</a>
            <a href="#process" className="hover:opacity-70 transition">Process</a>
            <a href="#pricing" className="hover:opacity-70 transition">Pricing</a>
            <a href="#faq" className="hover:opacity-70 transition">FAQs</a>
          </div>
          <a
            href="#cta"
            className="text-white px-5 py-2.5 rounded-full text-sm font-semibold transition hover:opacity-90"
            style={{ backgroundColor: colors.primary }}
          >
            Book a Call
          </a>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: colors.primary + '10', color: colors.primary }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: colors.accent }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: colors.accent }}></span>
              </span>
              Premium Brand Video Production
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6" style={{ color: colors.primary }}>
              Brand Videos That Make You Look Like the Clear Choice.
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              We help established businesses create trust-building brand videos and content assets that make them look more credible, more premium, and easier to choose online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#cta"
                className="text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg text-center hover:opacity-90"
                style={{ backgroundColor: colors.accent, boxShadow: `0 10px 25px -5px ${colors.accent}40` }}
              >
                Start Your Project
              </a>
              <button
                onClick={() => openModal('reel')}
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition text-center"
                style={{ color: colors.primary }}
              >
                <PlayCircle className="w-6 h-6" />
                Watch Our Reel
              </button>
            </div>
          </div>
          <div className="relative group cursor-pointer" onClick={() => openModal('reel')}>
            <div
              className="absolute -inset-1 rounded-2xl blur opacity-20 group-hover:opacity-40 transition"
              style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}
            ></div>
            <div className="relative aspect-video bg-slate-200 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="/greg-video-thumbnail.png"
                alt="Highlight Reel Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent flex items-center justify-center group-hover:from-black/40 transition">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition duration-300"
                  style={{ backgroundColor: colors.accent }}
                >
                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                </div>
              </div>
              <p className="absolute bottom-4 left-4 text-white/80 text-sm font-medium">
                See how we turn attention into trust in under 60 seconds.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Logo / Social Proof Strip */}
      <section className="border-y border-slate-200 bg-white py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by ambitious brands and service businesses
          </p>

          {/* Logo Carousel */}
          <div className="relative">
            <div className="flex animate-scroll gap-12 items-center">
              {[...clientLogos, ...clientLogos].map((logo, idx) => (
                <img
                  key={idx}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition duration-300 shrink-0"
                />
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="flex" style={{ color: colors.accent }}>
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="text-sm font-medium text-slate-600">
              5-star client feedback from businesses that needed to look more premium online.
            </span>
          </div>
        </div>
      </section>

      {/* 4. Problem / Benefits Section */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: colors.primary }}>
            Stop losing good prospects to competitors who look more credible online.
          </h2>
          <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
            Most businesses do solid work. But when their website, content, and videos feel outdated, generic, or inconsistent, the market assumes the business is smaller, weaker, or less premium than it really is.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 mx-auto"
                style={{ backgroundColor: colors.primary + '10' }}
              >
                <ShieldCheck className="w-7 h-7" style={{ color: colors.primary }} />
              </div>
              <h3 className="font-bold mb-3 text-xl" style={{ color: colors.primary }}>Instant Credibility</h3>
              <p className="text-slate-600">
                Look established, trustworthy, and professional the moment someone lands on your site or profile.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 mx-auto"
                style={{ backgroundColor: colors.primary + '10' }}
              >
                <MessageSquare className="w-7 h-7" style={{ color: colors.primary }} />
              </div>
              <h3 className="font-bold mb-3 text-xl" style={{ color: colors.primary }}>Stronger Trust</h3>
              <p className="text-slate-600">
                Use video to answer unspoken buyer questions faster and make the sales process feel safer.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 mx-auto"
                style={{ backgroundColor: colors.primary + '10' }}
              >
                <Zap className="w-7 h-7" style={{ color: colors.primary }} />
              </div>
              <h3 className="font-bold mb-3 text-xl" style={{ color: colors.primary }}>Sales Assets That Last</h3>
              <p className="text-slate-600">
                Get content you can use across your website, ads, social media, presentations, and follow-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Portfolio / Work Section */}
      <section id="portfolio" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
                See how we turn businesses into brands.
              </h2>
              <p className="text-slate-600 max-w-xl">
                From founder stories to customer proof to premium brand visuals, we create video assets that help businesses look sharper, sell easier, and stand out in crowded markets.
              </p>
            </div>
            <a
              href="#cta"
              className="font-bold flex items-center gap-2 hover:gap-3 transition-all"
              style={{ color: colors.accent }}
            >
              View Full Portfolio <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative aspect-4/5 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer" onClick={() => openModal('work1')}>
              <img src="https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&q=80&w=600" alt="Work 1" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <p className="text-white font-bold text-xl">Brand Story Video</p>
                <p className="text-white/70 text-sm">Home Services</p>
              </div>
            </div>
            <div className="group relative aspect-4/5 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer" onClick={() => openModal('work2')}>
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600" alt="Work 2" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <p className="text-white font-bold text-xl">Testimonial Series</p>
                <p className="text-white/70 text-sm">Professional Services</p>
              </div>
            </div>
            <div className="group relative aspect-4/5 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer" onClick={() => openModal('work3')}>
              <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=600" alt="Work 3" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <p className="text-white font-bold text-xl">Social Content Package</p>
                <p className="text-white/70 text-sm">Consumer Brand</p>
              </div>
            </div>
            <div className="group relative aspect-4/5 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer" onClick={() => openModal('work4')}>
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" alt="Work 4" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <p className="text-white font-bold text-xl">Corporate Overview</p>
                <p className="text-white/70 text-sm">B2B Services</p>
              </div>
            </div>
            <div className="group relative aspect-4/5 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer" onClick={() => openModal('work5')}>
              <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=600" alt="Work 5" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <p className="text-white font-bold text-xl">Product Launch</p>
                <p className="text-white/70 text-sm">E-commerce</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Process Section */}
      <section id="process" className="py-24 px-4 text-white" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">A simple process built for maximum leverage.</h2>
            <p className="text-white/60">We make it easy to get high-end brand content without wasting your team&apos;s time.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="text-8xl font-black text-white/5 absolute -top-8 -left-4">1</div>
              <h3 className="text-xl font-bold mb-4 relative z-10">Strategy Call</h3>
              <p className="text-white/60">We map the brand, the offer, and the message so the shoot is built around what actually drives trust.</p>
            </div>
            <div className="relative">
              <div className="text-8xl font-black text-white/5 absolute -top-8 -left-4">2</div>
              <h3 className="text-xl font-bold mb-4 relative z-10">Shoot + Production</h3>
              <p className="text-white/60">We film your core footage, direct the messaging, and produce polished assets designed to work across channels.</p>
            </div>
            <div className="relative">
              <div className="text-8xl font-black text-white/5 absolute -top-8 -left-4">3</div>
              <h3 className="text-xl font-bold mb-4 relative z-10">Launch Ready</h3>
              <p className="text-white/60">You receive finished videos and content that are ready to publish across your site, ads, and social platforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why Our Process Is Different Section */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-16">
              <h2 className="text-3xl font-bold mb-8" style={{ color: colors.primary }}>
                Why our process gets stronger results than a normal video shoot.
              </h2>
              <ul className="space-y-6 mb-8">
                <li className="flex gap-4">
                  <div
                    className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: colors.primary + '15' }}
                  >
                    <Check className="w-4 h-4" style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: colors.primary }}>Strategy First</p>
                    <p className="text-slate-600 text-sm">We do not just show up with cameras. Every shoot is built around positioning, trust, and how the content will actually be used.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div
                    className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: colors.primary + '15' }}
                  >
                    <Check className="w-4 h-4" style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: colors.primary }}>Minimal Founder Time</p>
                    <p className="text-slate-600 text-sm">We keep the process efficient so you get premium content without endless meetings or production chaos.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div
                    className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: colors.primary + '15' }}
                  >
                    <Check className="w-4 h-4" style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: colors.primary }}>Multi-Platform Assets</p>
                    <p className="text-slate-600 text-sm">Your footage is turned into usable content for your website, ads, social media, and sales process.</p>
                  </div>
                </li>
              </ul>
              <a
                href="#cta"
                className="inline-block text-white px-8 py-3 rounded-xl font-bold transition hover:opacity-90"
                style={{ backgroundColor: colors.primary }}
              >
                Book a Strategy Call
              </a>
            </div>
            <div className="bg-slate-100 flex items-center justify-center p-8 relative">
              <div
                className="w-full aspect-video bg-white rounded-xl shadow-lg overflow-hidden relative group cursor-pointer"
                onClick={() => openModal('vsl-strategy')}
              >
                <img src="/greg-video-thumbnail.png" alt="VSL Thumb" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent flex items-center justify-center">
                  <div
                    className="p-4 rounded-full shadow-xl"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 rounded-lg">
                  <p className="text-xs font-bold uppercase mb-1" style={{ color: colors.accent }}>Watch</p>
                  <p className="text-sm font-semibold" style={{ color: colors.primary }}>How a single shoot becomes months of trust-building content.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Results / Testimonials Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Results we&apos;ve created for businesses that needed to look the part.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The biggest shift is not just better content. It is better perception, stronger trust, and an easier sales process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <div className="flex mb-4" style={{ color: colors.accent }}>
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-slate-700 mb-6 italic">
                &ldquo;Before working with Gregory, our business looked smaller online than it actually was. The new videos immediately made us feel more established and gave prospects far more confidence before the first conversation.&rdquo;
              </p>
              <p className="font-bold" style={{ color: colors.primary }}>Founder, Service Business</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <div className="flex mb-4" style={{ color: colors.accent }}>
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-slate-700 mb-6 italic">
                &ldquo;The content changed how people responded to us. Our brand felt more premium, our website made more sense, and leads came in warmer.&rdquo;
              </p>
              <p className="font-bold" style={{ color: colors.primary }}>Owner, Professional Services Firm</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <div className="flex mb-4" style={{ color: colors.accent }}>
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-slate-700 mb-6 italic">
                &ldquo;This was more than a video shoot. It gave us a full library of assets we could use across our site, ads, and social channels.&rdquo;
              </p>
              <p className="font-bold" style={{ color: colors.primary }}>CEO, Local Brand</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Package / Offer Section */}
      <section id="pricing" className="py-24 px-4 text-white" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Brand Authority Package</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              A done-for-you content package designed to help your business look more premium, build trust faster, and get more mileage from every shoot day.
            </p>
          </div>
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Video style={{ color: colors.accent }} />
                <div>
                  <span className="font-bold">1 Hero Brand Story Video</span>
                  <p className="text-white/50 text-sm">Built for your website and core brand message</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Users style={{ color: colors.accent }} />
                <div>
                  <span className="font-bold">3 Customer Testimonial Videos</span>
                  <p className="text-white/50 text-sm">Trust-building proof from real clients</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Smartphone style={{ color: colors.accent }} />
                <div>
                  <span className="font-bold">10 Social Cutdowns</span>
                  <p className="text-white/50 text-sm">Short-form edits for ongoing content</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Camera style={{ color: colors.accent }} />
                <div>
                  <span className="font-bold">Thumbnail + Still Image Selection</span>
                  <p className="text-white/50 text-sm">Usable visuals for web, ads, and posts</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl border flex items-center justify-between" style={{ backgroundColor: colors.accent + '20', borderColor: colors.accent + '50' }}>
              <div className="flex items-center gap-4">
                <Calendar style={{ color: colors.accent }} />
                <div>
                  <span className="font-bold">Strategy + Scripting Included</span>
                  <p className="text-white/50 text-sm">Messaging support before production day</p>
                </div>
              </div>
              <span className="text-sm font-bold" style={{ color: colors.accent }}>INCLUDED</span>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-white/50 text-sm mb-6">
              Designed to create a full month-plus of premium brand content from one focused production process.
            </p>
            <a
              href="#cta"
              className="text-white px-10 py-5 rounded-2xl font-black text-xl transition shadow-xl inline-block hover:opacity-90"
              style={{ backgroundColor: colors.accent }}
            >
              Secure Your Shoot Date
            </a>
          </div>
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section id="faq" className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-4xl font-bold mb-16" style={{ color: colors.primary }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="group p-6 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg list-none [&::-webkit-details-marker]:hidden" style={{ color: colors.primary }}>
                How much does this cost?
                <Plus className="w-5 h-5 group-open:rotate-45 transition" />
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Pricing depends on scope, shoot complexity, and how many final assets you need. We will give you a clear quote after a short strategy call.
              </p>
            </details>
            <details className="group p-6 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg list-none [&::-webkit-details-marker]:hidden" style={{ color: colors.primary }}>
                Do I need to be on camera?
                <Plus className="w-5 h-5 group-open:rotate-45 transition" />
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Usually, yes—but not for every asset. We guide you through what to say, how to show up, and how to make the process feel natural.
              </p>
            </details>
            <details className="group p-6 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg list-none [&::-webkit-details-marker]:hidden" style={{ color: colors.primary }}>
                How long does it take?
                <Plus className="w-5 h-5 group-open:rotate-45 transition" />
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Most projects move from planning to delivery within a few weeks, depending on scheduling and edit scope.
              </p>
            </details>
            <details className="group p-6 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-lg list-none [&::-webkit-details-marker]:hidden" style={{ color: colors.primary }}>
                Will this work for my business?
                <Plus className="w-5 h-5 group-open:rotate-45 transition" />
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">
                This works best for established businesses that already do good work but need to look more credible, premium, and trustworthy online.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 11. Final CTA & Form */}
      <section id="cta" className="py-24 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-8" style={{ color: colors.primary }}>
              Ready to look like the market leader?
            </h2>
            <p className="text-xl text-slate-600 mb-10">
              If your business does great work but your brand does not reflect it yet, we&apos;ll help you create the video assets that make trust easier and sales conversations smoother.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.primary + '15' }}
                >
                  <Check className="w-5 h-5" style={{ color: colors.primary }} />
                </div>
                <span className="font-bold" style={{ color: colors.primary }}>Guaranteed Delivery Timeline</span>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.primary + '15' }}
                >
                  <Check className="w-5 h-5" style={{ color: colors.primary }} />
                </div>
                <span className="font-bold" style={{ color: colors.primary }}>Done-For-You Production</span>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.primary + '15' }}
                >
                  <Check className="w-5 h-5" style={{ color: colors.primary }} />
                </div>
                <span className="font-bold" style={{ color: colors.primary }}>Built for Long-Term Use</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-2xl border border-slate-100" style={{ boxShadow: `0 25px 50px -12px ${colors.primary}15` }}>
            <h3 className="text-xl font-bold mb-6" style={{ color: colors.primary }}>Book Your Strategy Call</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition"
                    onFocus={(e) => { e.target.style.borderColor = colors.primary; e.target.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Company Name</label>
                  <input
                    type="text"
                    placeholder="Acme Inc."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition"
                    onFocus={(e) => { e.target.style.borderColor = colors.primary; e.target.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Work Email</label>
                  <input
                    type="email"
                    placeholder="john@acme.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition"
                    onFocus={(e) => { e.target.style.borderColor = colors.primary; e.target.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition"
                    onFocus={(e) => { e.target.style.borderColor = colors.primary; e.target.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Project Type</label>
                <select
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition"
                  onFocus={(e) => { e.target.style.borderColor = colors.primary; e.target.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                  onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                >
                  <option>Brand Story Package</option>
                  <option>Testimonial Videos</option>
                  <option>Social Content</option>
                  <option>Full Brand Authority Package</option>
                  <option>Custom Project</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Estimated Budget</label>
                <select
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition"
                  onFocus={(e) => { e.target.style.borderColor = colors.primary; e.target.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                  onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                >
                  <option>$3k - $5k</option>
                  <option>$5k - $10k</option>
                  <option>$10k - $20k</option>
                  <option>$20k+</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full text-white py-4 rounded-xl font-bold text-lg transition shadow-lg hover:opacity-90"
                style={{ backgroundColor: colors.accent, boxShadow: `0 10px 25px -5px ${colors.accent}40` }}
              >
                Check Availability
              </button>
              <p className="text-center text-xs text-slate-500">
                We&apos;ll review your goals, see if the fit is right, and map the best next step.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="py-12 px-4 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <img src="/gregory-standal-sig-logo-blue.svg" alt="Gregory Standal" className="h-8" />
              <p className="text-slate-500 text-sm">
                Premium brand video production for businesses that want to look more credible online.
              </p>
            </div>
            <div className="flex gap-8 text-sm font-medium" style={{ color: colors.primary }}>
              <a href="#portfolio" className="hover:opacity-70 transition">Portfolio</a>
              <a href="#process" className="hover:opacity-70 transition">Process</a>
              <a href="#pricing" className="hover:opacity-70 transition">Pricing</a>
              <a href="#faq" className="hover:opacity-70 transition">FAQs</a>
              <a href="#cta" className="hover:opacity-70 transition">Contact</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-200">
            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} Gregory Standal. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:opacity-70 transition" style={{ color: colors.primary }}><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:opacity-70 transition" style={{ color: colors.primary }}><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:opacity-70 transition" style={{ color: colors.primary }}><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <a
          href="#cta"
          className="w-full text-white py-4 rounded-2xl font-bold text-lg shadow-2xl flex items-center justify-center gap-2"
          style={{ backgroundColor: colors.accent }}
        >
          Book Strategy Call <ArrowRight className="w-5 h-5" />
        </a>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl z-10">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-slate-300 z-20"
            >
              <X className="w-8 h-8" />
            </button>
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              controls
              playsInline
              autoPlay
            />
          </div>
        </div>
      )}

      {/* CSS for logo carousel animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
