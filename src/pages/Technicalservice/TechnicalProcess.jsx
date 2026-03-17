import React from 'react';
import { Search, Settings, ShieldCheck, Zap } from 'lucide-react';

const steps = [
  { id: '01', title: 'Site Inspection', desc: 'Our experts analyze the technical fault with advanced diagnostic tools.', icon: <Search /> },
  { id: '02', title: 'Precision Repair', desc: 'Swift execution using industrial-grade materials and genuine parts.', icon: <Settings /> },
  { id: '03', title: 'Quality Audit', desc: 'Multiple safety checks to ensure the fix is permanent and safe.', icon: <ShieldCheck /> },
  { id: '04', title: 'Post-Fix Care', desc: 'We provide maintenance tips and 24/7 support after every job.', icon: <Zap /> },
];

const TechnicalProcess = () => {
  return (
    <section className="py-24 bg-zinc-50">
      <div className="w-full max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-zinc-950 tracking-tighter uppercase">
            The Execution <span className="text-emerald-500">Flow.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step) => (
            <div key={step.id} className="relative group">
              <div className="text-[120px] font-black text-zinc-200/50 leading-none absolute -top-10 -left-4 group-hover:text-emerald-500/10 transition-colors">
                {step.id}
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-zinc-950 shadow-xl mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  {React.cloneElement(step.icon, { size: 24 })}
                </div>
                <h3 className="text-2xl font-black text-zinc-950 mb-3">{step.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalProcess;