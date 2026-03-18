import React from 'react';
import { ShieldCheck } from 'lucide-react';

const TechnicalTrustFooter = ({ avatars }) => {
  return (
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
              {avatars?.map((img, i) => (
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
  );
};

export default TechnicalTrustFooter;