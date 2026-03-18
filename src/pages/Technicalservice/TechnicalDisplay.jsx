import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const TechnicalDisplay = ({ service, isActive }) => {
  return (
    <div
      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
      }`}
    >
      <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
      
      {/* Floating Star Badge */}
      <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl flex items-center gap-2">
        <Star className="text-amber-400 fill-amber-400" size={16} />
        <span className="text-white font-black text-[10px] uppercase tracking-widest">Top Rated Service</span>
      </div>

      <div className="absolute bottom-10 left-10 right-10">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group/box">
          
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover/box:bg-emerald-500/20 transition-all"></div>

          <div className="relative z-10">
            <h4 className="text-white text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter leading-none">
              {service.title}
            </h4>
            <p className="text-zinc-300 font-medium leading-relaxed mb-8 max-w-lg text-lg">
              {service.desc}
            </p>
            
            <Link 
              to={`/technical-services/${service.id}`}
              className="inline-flex items-center gap-4 bg-white text-zinc-950 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all shadow-xl hover:-translate-y-1"
            >
              Explore Details <ArrowRight size={18}/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalDisplay;