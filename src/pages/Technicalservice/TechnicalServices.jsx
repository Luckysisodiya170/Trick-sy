import React, { useState, useEffect } from 'react';
import { Wrench, Zap, Droplets, LayoutGrid, Scissors, Ruler, Plus, ShieldCheck, Clock, PhoneCall, Loader2 } from 'lucide-react';
import { technicalServices } from '../../data/technicalData';

import avatar1 from "../../assets/aboutsectionimg/profileabout.jpeg"; 
import avatar2 from "../../assets/aboutsectionimg/profileabout2.jpeg"; 
import avatar3 from "../../assets/aboutsectionimg/profileabout3.jpeg"; 

import TechnicalCard from './TechnicalCard';
import TechnicalDisplay from './TechnicalDisplay';
import TechnicalProcess from './TechnicalProcess';
import TechnicalSpecs from './TechnicalSpecs';
import SEO from '../../components/SEO';

const TechnicalServices = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const avatars = [avatar1, avatar2, avatar3];
  const icons = [<Wrench/>, <Zap/>, <Droplets/>, <LayoutGrid/>, <Scissors/>, <Ruler/>];

  // Production Rule: Always handle scroll and loading
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <SEO title="Technical Services | Tricksy Dubai" description="Expert Handyman, Electrical, and Plumbing services in Dubai." />
      
      {/* --- 1. PREMIUM TOP BANNER --- */}
      <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden bg-zinc-950 pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/60 to-zinc-950"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em]">Precision Squad</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter mb-4">
            TECHNICAL <span className="text-emerald-500">EXPERTS.</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
            From emergency repairs to bespoke installations, we handle the technical heavy lifting for your home.
          </p>
        </div>
      </section>

      {/* --- 2. MAIN INTERACTIVE CONTENT --- */}
      <section className="py-16 relative z-20 -mt-16">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <div className="bg-white rounded-[3.5rem] shadow-2xl border border-zinc-100 p-4 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Selector */}
            <div className="lg:col-span-4 space-y-3">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 px-2">Expertise Domains</h2>
              {technicalServices?.map((service, index) => (
                <TechnicalCard 
                  key={service.id || index}
                  service={service}
                  isActive={activeTab === index}
                  onHover={() => setActiveTab(index)}
                  icon={icons[index % icons.length]}
                  index={index}
                />
              ))}
            </div>

            {/* Right: Display */}
            <div className="lg:col-span-8 relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden bg-zinc-900 border-[8px] border-zinc-50 shadow-inner">
               {technicalServices?.map((service, index) => (
                <TechnicalDisplay 
                  key={service.id || index}
                  service={service}
                  isActive={activeTab === index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. SUB-SECTIONS --- */}
      <div className="w-full max-w-[1400px] mx-auto px-6 pb-24">
        <TechnicalProcess />
        <TechnicalSpecs />

        {/* --- 4. ULTIMATE TRUST FOOTER --- */}
        <div className="relative mt-24 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[3rem] blur opacity-20"></div>
          <div className="relative bg-zinc-950 rounded-[3rem] p-10 md:p-14 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-3xl bg-emerald-500 text-zinc-950 flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(16,185,129,0.5)]">
                <ShieldCheck size={42} strokeWidth={2.5} />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-white text-3xl font-black tracking-tight mb-2 uppercase">Verified Force.</h4>
                <p className="text-zinc-500 font-medium max-w-sm leading-relaxed text-sm">Every technician in our squad is background-checked and Dubai Municipality certified.</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
               <div className="flex -space-x-5">
                  {avatars.map((img, i) => (
                    <img key={i} src={img} className="w-14 h-14 rounded-full border-4 border-zinc-900 object-cover ring-2 ring-emerald-500/20" alt="tech" />
                  ))}
                  <div className="w-14 h-14 rounded-full border-4 border-zinc-900 bg-zinc-800 flex items-center justify-center text-emerald-400 font-black text-xs">+45</div>
               </div>
               <span className="px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">5,000+ Requests Completed</span>
            </div>

            <button className="bg-white text-zinc-950 px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-500 transition-all shadow-xl hover:-translate-y-1">
               Book Callback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalServices;