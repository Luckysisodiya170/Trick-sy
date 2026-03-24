import React from 'react';
import { ArrowRight, ShieldCheck, Clock } from 'lucide-react';

const ServiceHero = ({ serviceInfo, currentHeroImage }) => {
  if (!serviceInfo) return null;

  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-center overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 z-0">
        <img 
          src={currentHeroImage} 
          alt={serviceInfo.title} 
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="max-w-2xl lg:max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-6 backdrop-blur-md">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em]">{serviceInfo.subtitle}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tighter mb-6">
            {serviceInfo.title.split(' ')[0]} <br/>
            <span className="text-emerald-500">{serviceInfo.title.substring(serviceInfo.title.indexOf(' ') + 1)}</span>
          </h1>
          
          <p className="text-zinc-200 text-lg md:text-xl font-medium leading-relaxed mb-8 max-w-lg drop-shadow-md">
            {serviceInfo.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-emerald-500 text-zinc-950 font-black rounded-xl hover:bg-emerald-400 transition-all shadow-xl uppercase text-xs tracking-widest flex items-center gap-2">
              Book Appointment <ArrowRight className="w-4 h-4" />
            </button>
            <div className="hidden sm:flex items-center gap-6 ml-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-white font-bold text-xs uppercase tracking-widest">Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                <span className="text-white font-bold text-xs uppercase tracking-widest">60m Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;