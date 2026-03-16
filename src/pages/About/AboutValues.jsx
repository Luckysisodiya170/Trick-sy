import React from 'react';
import { Eye, ShieldCheck, Zap, HeartHandshake, ArrowUpRight } from 'lucide-react';

const AboutValues = ({ title, highlight, subtitle, valuesData }) => {
  
  // 🔥 PRODUCTION RULE: Default data for safety and consistency
  const defaultValues = [
    { 
      title: "Transparency", 
      desc: "No hidden costs. Detailed quotes provided upfront for total peace of mind.", 
      icon: <Eye className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    { 
      title: "Safety First", 
      desc: "Every technician is background-verified and strictly follows safety protocols.", 
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "bg-emerald-500"
    },
    { 
      title: "Speedy Service", 
      desc: "We value your time. Our rapid response team ensures on-time arrival every time.", 
      icon: <Zap className="w-6 h-6" />,
      color: "bg-amber-500"
    },
    { 
      title: "Quality Care", 
      desc: "Professional handling of your property with 100% satisfaction guarantee.", 
      icon: <HeartHandshake className="w-6 h-6" />,
      color: "bg-primary-500"
    }
  ];

  const values = valuesData || defaultValues;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur Background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT SIDE: STICKY HEADER --- */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-primary-600 font-bold text-[10px] uppercase tracking-widest mb-6">
              Core Principles
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              {title || "The Principles That"} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-500">
                {highlight || "Drive TRICKSY."}
              </span>
            </h2>
            <p className="text-slate-500 mt-8 text-lg lg:text-xl font-medium leading-relaxed max-w-md">
              {subtitle || "Hum sirf kaam nahi karte, hum ek standard maintain karte hain jo humein doosron se alag banata hai."}
            </p>
            
            {/* Social Proof / Trust Mini-Section */}
            <div className="mt-12 p-6 rounded-3xl bg-slate-900 text-white flex items-center justify-between group cursor-pointer overflow-hidden relative">
              <div className="relative z-10">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Our Commitment</p>
                <p className="text-lg font-bold">100% Service Integrity</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center relative z-10 group-hover:rotate-45 transition-transform duration-500">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              {/* Animated background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          </div>

          {/* --- RIGHT SIDE: INTERACTIVE VALUE CARDS --- */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div 
                key={i} 
                className="group relative p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500"
              >
                {/* Icon Wrapper with Dynamic Shadow */}
                <div className={`w-14 h-14 rounded-2xl ${v.color || 'bg-primary-500'} text-white flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  {v.icon}
                </div>

                <h4 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {v.title}
                </h4>
                
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {v.desc}
                </p>

                {/* Subtle Hover Element */}
                <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary-500 transition-colors">
                  Learn More <ArrowUpRight className="w-3 h-3" />
                </div>
                
                {/* Card Corner Decoration */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-10 transition-opacity">
                   <div className="w-12 h-12 border-t-2 border-r-2 border-primary-500 rounded-tr-xl"></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutValues;