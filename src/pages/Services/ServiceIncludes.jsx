import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const colorfulIcons = [
  "bg-emerald-100 text-emerald-600 border-emerald-200",
  "bg-blue-100 text-blue-600 border-blue-200",
  "bg-amber-100 text-amber-600 border-amber-200",
  "bg-rose-100 text-rose-600 border-rose-200"
];

const ServiceIncludes = ({ serviceInfo }) => {
  if (!serviceInfo || !serviceInfo.includes) return null;

  return (
    <section className="py-24 bg-zinc-50 relative overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight mb-4">What's Included</h2>
          <p className="text-zinc-500 text-lg font-medium">Everything you need for a spotless space, handled by pros.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceInfo.includes.map((item, idx) => (
            <div key={idx} className="p-8 bg-white border border-zinc-100 rounded-[2rem] hover:border-emerald-200 transition-all duration-300 group">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${colorfulIcons[idx % 4]}`}>
                {item.icon || <CheckCircle2 className="w-8 h-8" />}
              </div>
              <h3 className="text-2xl font-black text-zinc-950 mb-3">{item.title}</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceIncludes;