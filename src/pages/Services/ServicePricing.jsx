import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const ServicePricing = ({ serviceInfo }) => {
  if (!serviceInfo || !serviceInfo.pricing) return null;

  return (
    <section className="py-24 bg-zinc-50">
      <div className="w-full max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight">Transparent Pricing</h2>
          <p className="text-zinc-500 mt-4 font-medium text-lg">No hidden fees. Pay for what you get.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {serviceInfo.pricing.map((plan, idx) => (
            <div key={idx} className={`relative p-8 rounded-[2.5rem] transition-all duration-300 ${
              plan.isPopular 
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl shadow-emerald-500/30 md:-translate-y-4 border-none z-10' 
              : 'bg-white border border-zinc-200 text-zinc-950 mt-0 lg:mt-4'
            }`}>
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg whitespace-nowrap">
                  Most Popular Choice
                </div>
              )}
              <h3 className="text-2xl font-black mb-2 mt-4">{plan.plan}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl lg:text-5xl font-black">{plan.price}</span>
                {plan.price !== "Custom" && <span className={`text-sm font-bold ${plan.isPopular ? 'text-emerald-100' : 'text-zinc-400'}`}>/visit</span>}
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features?.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.isPopular ? 'text-white' : 'text-emerald-500'}`} />
                    <span className={`font-medium text-sm ${plan.isPopular ? 'text-emerald-50' : 'text-zinc-600'}`}>{feat}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${
                plan.isPopular 
                ? 'bg-white text-emerald-600 hover:bg-zinc-100' 
                : 'bg-zinc-100 text-zinc-950 hover:bg-zinc-200'
              }`}>
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePricing;