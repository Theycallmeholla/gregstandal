"use client";
import React, { useState, useEffect } from 'react';
import { Phone, Play, CheckCircle, ArrowRight, Star, Quote, BarChart3, Users, Clock } from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { label: "Lead Increase", value: "178%", sub: "Avg. for Roofers" },
    { label: "Booked Jobs", value: "20-40", sub: "Extra Per Month" },
    { label: "Ad ROI", value: "10X", sub: "Average Return" },
    { label: "Retention", value: "98%", sub: "Contractor Success" }
  ];

  const testimonials = [
    {
      name: "Mike Thompson",
      company: "Thompson Roofing & Exteriors",
      stat: "+134 qualified leads / 60 days",
      quote: "Most marketers just send 'traffic'. These guys send us actual footage of our jobs that makes people trust us before we even show up for the estimate."
    },
    {
      name: "Sarah Chen",
      company: "Coastal Remodeling Group",
      stat: "6.4x ROI on Ad Spend",
      quote: "The video leadflow plan gave us a clear roadmap. We stopped wasting money on generic Facebook ads and started winning higher-value projects."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      {/* Header - No Nav, Pure CTA */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src={isScrolled ? '/gregory-standal-sig-logo-blue.svg' : '/gregory-standal-sig-logo-white.svg'} 
              alt="Gregory Standal" 
              className="h-8 md:h-10" 
            />
          </div>
          
          <div className="flex items-center gap-6">
            <a href="tel:5551234567" className={`hidden md:flex items-center gap-2 font-bold ${isScrolled ? 'text-slate-700' : 'text-white'}`}>
              <Phone className="w-4 h-4 text-red-600" />
              (555) 123-4567
            </a>
            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-lg shadow-red-600/20">
              Get My Leadflow Plan
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen min-h-[700px] flex items-center pt-20 overflow-hidden">
        {/* Background Video Placeholder Logic */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/70 z-10" />
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80"
          >
            {/* Using a high-quality stock video source for demo */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-construction-worker-at-a-site-using-a-drill-40455-large.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 w-full grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 text-red-400 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Now Partnering with HVAC & Roofing Contractors
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Home Improvement Contractors: <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-400">
                Turn Job-Site Videos Into 20–40 More Booked Jobs Each Month
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed">
              We film, edit, and deploy customer-getting videos that plug straight into your ads and website so your calendar fills with <span className="text-white font-semibold">higher-value projects, not price-shoppers.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-5 rounded-2xl font-black text-xl transition-all transform hover:scale-105 shadow-xl shadow-red-600/40 flex items-center justify-center gap-3">
                Get My Free Video Leadflow Plan
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-slate-400 font-medium flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-red-500" />
                15-minute call to map the 3 videos that will add the most booked jobs in 90 days.
              </p>
              <p className="text-slate-500 text-sm ml-7">No cost, no obligation, no pushy sales pitch.</p>
            </div>

            <div className="pt-8 border-t border-white/10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i+10}`} 
                    className="w-12 h-12 rounded-full border-4 border-slate-900" 
                    alt="Client"
                  />
                ))}
              </div>
              <p className="text-slate-400 text-sm font-medium">
                Used by <span className="text-white font-bold">27+ roofing, HVAC, and remodeling companies</span> across the US to add six figures in booked work.
              </p>
            </div>
          </div>

          {/* Right Side Visual Proof */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/5 bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                alt="Job site success"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />
              
              {/* Overlaid Stat Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-bold text-lg tracking-tight">RoofCo Case Study</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
                <div className="text-4xl font-black text-white mb-1">+178% Leads</div>
                <div className="text-slate-300 text-sm font-medium">Generated in the first 60 days of deployment</div>
                
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                    <Play className="text-white w-5 h-5 fill-white" />
                  </div>
                  <span className="text-white text-sm font-bold uppercase tracking-widest">Watch Results Video</span>
                </div>
              </div>

              {/* Float badge */}
              <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg animate-bounce">
                Live Result
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Logotypes - Neutral/Grayscale */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mb-8">Trusted by industry leaders nationwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale">
             {/* Mock SVGs for logos */}
             <div className="h-8 w-32 bg-slate-300 rounded"></div>
             <div className="h-8 w-24 bg-slate-300 rounded"></div>
             <div className="h-8 w-40 bg-slate-300 rounded"></div>
             <div className="h-8 w-28 bg-slate-300 rounded"></div>
             <div className="h-8 w-36 bg-slate-300 rounded"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-black text-red-500">{stat.value}</div>
                <div className="text-lg font-bold">{stat.label}</div>
                <div className="text-slate-400 text-sm">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Section - Behind the scenes results */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                Real Footage. <br/>Real Numbers. <br/>Real Results.
              </h2>
              <p className="text-xl text-slate-600 font-medium">
                We don&apos;t just &quot;make videos.&quot; We build a machine that captures your craftsmanship and converts it into profit.
              </p>
            </div>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
              See All Case Studies
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <Quote className="w-10 h-10 text-red-600 mb-6" />
                <p className="text-slate-700 leading-relaxed text-lg mb-6">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.company}</p>
                  <p className="text-sm font-semibold text-red-600">{testimonial.stat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mechanism Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black mb-6">How We Fill Your Pipeline</h2>
            <p className="text-lg text-slate-600">The 3-step engine that separates you from the price-shoppers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Clock />, title: "The Job-Site Capture", desc: "Our field crews capture the high-value 'money shots' of your team in action, proving you do the work you say you do." },
              { icon: <Play />, title: "Strategic Retargeting", desc: "We edit these clips into high-intent hooks that follow prospects around the web until they book with you." },
              { icon: <Users />, title: "The Closer System", desc: "We deploy these videos to your sales team to use during estimates to kill objections before they arise." }
            ].map((step, idx) => (
              <div key={idx} className="space-y-4">
                <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center text-red-600 border border-slate-100">
                  {React.cloneElement(step.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
                </div>
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-red-600/20 to-transparent pointer-events-none" />
             
             <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10 leading-tight">
               Ready to stop chasing leads and start booking jobs?
             </h2>
             <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto relative z-10">
               Claim your free Video Leadflow Plan. We&apos;ll show you exactly which 3 videos will move the needle for your business in the next 90 days.
             </p>

             <div className="flex flex-col items-center gap-6 relative z-10">
                <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-12 py-6 rounded-2xl font-black text-2xl transition-all transform hover:scale-105 shadow-2xl shadow-red-600/40">
                  Get My Leadflow Plan Now
                </button>
                <div className="flex items-center gap-8 text-slate-400 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" /> No Pitch
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" /> No Obligation
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" /> Real Value
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 bg-slate-50 text-slate-500 text-sm border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <img 
              src="/gregory-standal-sig-logo-blue.svg" 
              alt="Gregory Standal" 
              className="h-8" 
            />
          </div>
          <p>© {new Date().getFullYear()} Gregory Standal. Built for Home Improvement Pros.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
