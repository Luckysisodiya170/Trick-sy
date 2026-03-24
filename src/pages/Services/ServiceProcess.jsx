import React from 'react';

const ServiceProcess = ({ serviceInfo }) => {
  if (!serviceInfo || !serviceInfo.process) return null;

  return (
    <section className="py-24 bg-white border-y border-zinc-100">
      <div className="w-full max-w-[1280px] mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-zinc-950 mb-20 text-center tracking-tight">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
          <div className="hidden md:block absolute top-[40px] left-[10%] w-[80%] h-[2px] bg-gradient-to-r from-emerald-100 via-emerald-400 to-emerald-100 z-0"></div>
          {serviceInfo.process.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-2xl bg-white border-4 border-emerald-50 flex items-center justify-center text-2xl font-black text-emerald-500 mb-6 shadow-xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                {step.step}
              </div>
              <h3 className="text-xl font-black text-zinc-950 mb-3">{step.title}</h3>
              <p className="text-zinc-500 font-medium text-sm px-4 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;