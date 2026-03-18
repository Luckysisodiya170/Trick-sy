import React from 'react';
import { CheckCircle2, Star } from 'lucide-react';

const TechnicalPricing = () => {
  const plans = [
    { name: "Basic Fix", price: "199", desc: "One-time technical visit for minor repairs.", features: ["1 Hour Service", "Basic Tools Required", "No Materials Included", "Standard Response (24h)"] },
    { name: "Pro AMC", price: "899", desc: "Annual maintenance for complete peace of mind.", features: ["Unlimited Emergency Visits", "Priority Response (45m)", "Free Consumables", "Quarterly Deep Checks"], popular: true },
    { name: "Premium Villa", price: "2499", desc: "Dedicated technical team for large properties.", features: ["24/7 Standby Squad", "Full Parts Coverage", "Smart Home Support", "Dedicated Manager"] }
  ];

  return (
    <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter">
            Service <span className="text-emerald-500 italic">Packages_</span>
          </h2>
          <p className="text-slate-500 mt-4 font-medium">Transparent pricing. No hidden charges. 100% satisfaction.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <div key={i} className={`relative p-8 rounded-[3rem] ${plan.popular ? 'bg-slate-950 text-white shadow-2xl scale-105 border border-emerald-500/30' : 'bg-white text-slate-900 border border-slate-200 shadow-sm'} transition-all hover:-translate-y-2`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                  <Star size={12} className="fill-white" /> Most Popular
                </div>
              )}
              <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>{plan.desc}</p>
              <div className="mb-8">
                <span className="text-5xl font-black">AED {plan.price}</span>
                <span className={`text-sm ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>/ starting</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    <span className="font-semibold text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-colors ${plan.popular ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                Select Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalPricing;