import React from 'react';
import { Hammer, Drill, PenTool, Lightbulb, Check } from 'lucide-react';

const TechnicalSpecs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="w-full max-w-[1300px] mx-auto px-6">
        
        {/*  Center Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tighter uppercase mb-4">
            THE <span className="text-emerald-500">HARDWARE.</span>
          </h2>
          <p className="text-zinc-500 font-medium text-sm uppercase tracking-[0.3em]">Industrial Standards • Precision Tools</p>
        </div>

        {/*   Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Main Hero*/}
          <div className="md:col-span-8 bg-zinc-950 rounded-[2rem] p-10 relative overflow-hidden group min-h-[350px] flex flex-col justify-between">
            <Drill size={320} strokeWidth={0.5} className="absolute -bottom-10 -right-10 text-white/5 transition-all duration-700 -rotate-12 group-hover:rotate-0 group-hover:text-emerald-500/10" />
            
            <div className="relative z-10">
              <h3 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter mb-6">
                BUILT FOR <br/> <span className="text-emerald-500">PRECISION.</span>
              </h3>
              <p className="text-zinc-400 font-medium text-lg max-w-sm">
                We utilize world-class diagnostic and repair machinery to ensure every fix is surgical and permanent.
              </p>
            </div>

            <div className="flex gap-4 relative z-10">
              {['Hilti', 'Makita', 'Fluke'].map((brand) => (
                <span key={brand} className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border border-zinc-800 px-3 py-1 rounded-lg">
                  {brand} Approved
                </span>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-4 grid grid-cols-1 gap-4">
            {/* Tooling */}
            <div className="bg-zinc-50 rounded-[2rem] p-8 border border-zinc-100 flex items-center gap-6 group hover:bg-white hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-zinc-900 shadow-sm border border-zinc-100 group-hover:bg-zinc-950 group-hover:text-emerald-500 transition-all">
                <Hammer size={22} />
              </div>
              <div>
                <h4 className="font-black text-xl text-zinc-950">Heavy Tooling</h4>
                <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-1">Impact Ready</p>
              </div>
            </div>

            {/* Diagnostics */}
            <div className="bg-emerald-500 rounded-[2rem] p-8 flex items-center gap-6 group relative overflow-hidden">
              <div className="w-12 h-12 bg-zinc-950 rounded-2xl flex items-center justify-center text-emerald-500 shadow-lg">
                <Lightbulb size={22} />
              </div>
              <div>
                <h4 className="font-black text-xl text-zinc-950">Smart Testing</h4>
                <p className="text-zinc-950/60 text-[10px] font-bold uppercase tracking-widest mt-1">Accurate Audits</p>
              </div>
            </div>
          </div>

          {/* Bottom  Cards */}
          <div className="md:col-span-12 bg-zinc-50 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between border border-zinc-100 group hover:border-emerald-500/20 transition-all">
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm group-hover:rotate-12 transition-transform">
                <PenTool size={28} />
              </div>
              <div>
                <h4 className="text-2xl font-black text-zinc-950 tracking-tight">Custom Installation Standards</h4>
                <p className="text-zinc-500 font-medium text-sm mt-1">Bespoke technical adjustments for Dubai’s premium villa layouts.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6 md:mt-0">
               {[ 'Certified', 'Tested', 'Guaranteed'].map(tag => (
                 <div key={tag} className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{tag}</span>
                 </div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecs;