import React from 'react';
import { Rocket, Star, ShieldCheck, Trophy } from 'lucide-react';

const AboutTimeline = ({ 
  sectionTitle = "Our", 
  sectionHighlight = "Journey", 
  sectionSubtext = "A decade of perfecting homes and building trust through innovation and relentless dedication.",
  timelineSteps 
}) => {
  
  const defaultSteps = [
    { 
      year: "2014", 
      title: "The Humble Start", 
      desc: "Founded with a vision to simplify home maintenance for everyone.", 
      icon: <Rocket className="w-4 h-4" /> 
    },
    { 
      year: "2018", 
      title: "1,000+ Homes Served", 
      desc: "Hit our first major milestone, becoming the neighborhood favorite.", 
      icon: <Star className="w-4 h-4" /> 
    },
    { 
      year: "2022", 
      title: "Tech-First Approach", 
      desc: "Launched our AI booking platform for real-time service tracking.", 
      icon: <ShieldCheck className="w-4 h-4" /> 
    },
    { 
      year: "2026", 
      title: "Future of Services", 
      desc: "Scaling globally with eco-friendly and smart home solutions.", 
      icon: <Trophy className="w-4 h-4" /> 
    }
  ];

  const steps = Array.isArray(timelineSteps) && timelineSteps.length > 0 ? timelineSteps : defaultSteps;

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* 🔥 Updated: Centered Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="max-w-3xl">
            <div className="flex flex-col items-center gap-3 mb-4">
               <span className="text-primary-600 font-black text-xs uppercase tracking-widest">History of Excellence</span>
               <div className="w-16 h-[2px] bg-primary-500"></div>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
              {sectionTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-500">{sectionHighlight}</span>
            </h2>
            <p className="text-slate-500 mt-6 text-lg font-medium leading-relaxed italic max-w-2xl mx-auto">
              "{sectionSubtext}"
            </p>
          </div>
        </div>

        {/* Timeline Path Container */}
        <div className="relative">
          
          {/* Main Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[40px] left-0 w-full h-[3px] bg-slate-100 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[80%] bg-gradient-to-r from-primary-500 to-emerald-400"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                
                {/* Visual Connector Node */}
                <div className="hidden lg:flex absolute top-[30px] left-0 z-20 w-6 h-6 rounded-full bg-white border-4 border-slate-200 group-hover:border-primary-500 group-hover:scale-125 transition-all duration-500">
                   <div className="m-auto w-1 h-1 rounded-full bg-slate-300 group-hover:bg-primary-500"></div>
                </div>
                
                {/* Card Layout */}
                <div className="lg:pt-20">
                  <div className="relative p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 group-hover:-translate-y-3 h-full">
                    
                    {/* Floating Icon Badge */}
                    <div className="absolute -top-6 left-8 w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary-500 border border-slate-100 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500">
                      {step.icon || <Rocket className="w-4 h-4" />}
                    </div>

                    {/* Massive Watermark Year */}
                    <span className="absolute bottom-4 right-6 text-7xl font-black text-slate-900/[0.03] group-hover:text-primary-500/[0.08] transition-colors leading-none pointer-events-none">
                      {step.year}
                    </span>

                    {/* Content */}
                    <div className="mt-4">
                      <span className="text-primary-600 font-black text-xs uppercase tracking-[0.2em] block mb-2 text-left">
                        Phase 0{idx + 1}
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-primary-600 transition-colors text-left">
                        {step.title}
                      </h3>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed text-left">
                        {step.desc}
                      </p>
                    </div>

                    {/* Year Label */}
                    <div className="mt-6 flex items-start">
                      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest">
                        Est. {step.year}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Connector */}
                {idx !== steps.length - 1 && (
                  <div className="lg:hidden w-[2px] h-12 bg-gradient-to-b from-primary-500 to-transparent mx-auto mt-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Future Vision Banner */}
        <div className="mt-24 relative rounded-[3rem] bg-slate-900 p-1 overflow-hidden group">
          <div className="bg-slate-900 rounded-[2.8rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="space-y-4 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                   The journey doesn't <br /> <span className="text-primary-500">stop here.</span>
                </h3>
                <p className="text-slate-400 font-medium">We are constantly expanding our horizons to serve you better.</p>
             </div>
             
             <button className="relative px-10 py-4 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-500 transition-all shadow-xl shadow-primary-600/30 group-hover:scale-105 overflow-hidden">
                <span className="relative z-10 uppercase text-xs tracking-[0.2em]">Join the Legacy</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
             </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutTimeline;