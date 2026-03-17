import React from 'react';
import { ChevronRight } from 'lucide-react';

const TechnicalCard = ({ service, isActive, onHover, icon, index }) => {
  return (
    <div
      onMouseEnter={onHover}
      className="relative group cursor-pointer mb-2" // Margin kam kiya
    >
      <button
        className={`relative w-full pl-6 pr-4 py-4 rounded-xl text-left transition-all duration-300 flex items-center justify-between overflow-hidden border ${
          isActive 
          ? 'bg-zinc-950 border-emerald-500/50 shadow-lg translate-x-2' 
          : 'bg-white border-zinc-100 hover:border-zinc-200 translate-x-0'
        }`}
      >
        {/* Number - Very Subtle */}
        <div className={`absolute right-4 bottom-0 font-black text-5xl transition-all duration-500 pointer-events-none select-none ${
          isActive ? 'text-white/[0.03] translate-y-2' : 'opacity-0'
        }`}>
          0{index + 1}
        </div>

        <div className="flex items-center gap-4 relative z-10">
          {/* Smaller Icon Box */}
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isActive 
            ? 'bg-emerald-500 text-zinc-950' 
            : 'bg-zinc-100 text-zinc-400 group-hover:text-zinc-900'
          }`}>
            {React.cloneElement(icon, { size: 18, strokeWidth: 2.5 })}
          </div>

          <div>
            <h3 className={`text-lg font-bold tracking-tight transition-all duration-300 ${
              isActive ? 'text-white' : 'text-zinc-900'
            }`}>
              {service.title}
            </h3>
            <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${
              isActive ? 'text-emerald-400' : 'text-zinc-400'
            }`}>
              {service.tags[0]}
            </span>
          </div>
        </div>

        <ChevronRight className={`w-5 h-5 transition-all duration-300 ${
          isActive ? 'text-emerald-500 opacity-100' : 'opacity-0'
        }`} />
      </button>
    </div>
  );
};

export default TechnicalCard;