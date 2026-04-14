import React, { useState } from 'react';
import { 
  ShieldCheck, Leaf, BadgeDollarSign, Zap, 
  Headphones, CheckCircle2, Star, ArrowRight 
} from 'lucide-react';

const iconOptions = {
  shield: ShieldCheck,
  leaf: Leaf,
  dollar: BadgeDollarSign,
  zap: Zap,
  headphones: Headphones,
  check: CheckCircle2,
  star: Star,
};

const AboutChooseUs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const data = {
    badge: "Our Philosophy",
    titleLine1: "The TRICKSY",
    titleHighlight: "Difference",
    description: "We don't just provide a service; we deliver peace of mind. Our standards are built on trust and quality.",
    features: [
      { 
        id: 1, 
        title: 'Vetted Professionals', 
        iconName: 'shield', 
        desc: 'Every team member undergoes rigorous background checks and technical training before they ever step foot in your home.' 
      },
      { 
        id: 2, 
        title: 'Eco-Friendly Care', 
        iconName: 'leaf', 
        desc: 'We utilize sustainable, non-toxic products that are tough on dirt but completely safe for your children, pets, and the environment.' 
      },
      { 
        id: 3, 
        title: 'Transparent Pricing', 
        iconName: 'dollar', 
        desc: 'No hidden fees or surprise charges. We provide detailed, upfront quotes so you know exactly what you are paying for.' 
      }
    ]
  };

  return (
    <section className="w-full py-20 bg-[#FDFDFD] font-sans">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* --- CENTERED HEADER (MATCHING SCREENSHOT) --- */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-black tracking-widest uppercase rounded-full mb-6 bg-white border border-slate-200 shadow-sm text-emerald-600">
            <Star size={12} className="fill-emerald-500 text-emerald-500" /> {data.badge}
          </div>
          <h2 className="text-4xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tighter">
            {data.titleLine1} <span className="text-emerald-500">{data.titleHighlight}</span>
          </h2>
          <p className="text-slate-500 font-medium mt-4 text-base lg:text-lg">
            {data.description}
          </p>
        </div>

        {/* --- INTERACTIVE LAYOUT --- */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          
          {/* LEFT: TABS (MATCHING SCREENSHOT) */}
          <div className="w-full lg:w-[420px] flex flex-col gap-6">
            {data.features.map((f, index) => {
              const isActive = activeTab === index;
              const IconComp = iconOptions[f.iconName] || CheckCircle2;

              return (
                <button
                  key={f.id}
                  onClick={() => setActiveTab(index)}
                  className={`group text-left p-6 rounded-2xl transition-all duration-500 flex items-center gap-5 border-2 ${
                    isActive 
                    ? 'bg-white border-emerald-400 shadow-[0_20px_60px_rgba(16,185,129,0.1)] scale-105 z-10' 
                    : 'bg-transparent border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    isActive ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <IconComp size={22} strokeWidth={2.5} />
                  </div>
                  
                  <div>
                    <h4 className={`font-black text-xl ${isActive ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {f.title}
                    </h4>
                    {isActive && (
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1 mt-0.5 animate-in fade-in slide-in-from-left-2">
                        Viewing Details <ArrowRight size={10} />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: DARK CARD (MATCHING SCREENSHOT) */}
          <div className="w-full lg:w-[650px] aspect-[1/0.75] relative group">
            <div className="absolute inset-0 bg-[#0F172A] rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col justify-center p-12 lg:p-20">
              
              {/* Background Watermark Icon */}
              <div className="absolute -right-16 -bottom-16 opacity-[0.04] text-white pointer-events-none transform rotate-12 transition-transform duration-1000">
                 {React.createElement(iconOptions[data.features[activeTab].iconName] || CheckCircle2, { size: 450 })}
              </div>

              {/* Card Content */}
              <div key={activeTab} className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-[1.2rem] flex items-center justify-center mb-10">
                  {React.createElement(iconOptions[data.features[activeTab].iconName] || CheckCircle2, { size: 28 })}
                </div>
                
                <h3 className="text-4xl lg:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">
                  {data.features[activeTab].title}
                </h3>
                
                <p className="text-slate-400 text-lg lg:text-xl font-medium leading-relaxed mb-12 max-w-md">
                  {data.features[activeTab].desc}
                </p>

                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-black text-white uppercase tracking-widest backdrop-blur-sm">
                  <CheckCircle2 size={16} className="text-emerald-500" /> Professional Standard
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutChooseUs;