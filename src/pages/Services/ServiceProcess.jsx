import React from 'react';

const ServiceProcess = ({ serviceInfo }) => {
  if (!serviceInfo || !serviceInfo.process) return null;

  return (
    <section className="py-24 bg-white border-y border-zinc-100">
      <div className="w-full max-w-[1280px] mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-zinc-950 mb-20 text-center tracking-tight">How It Works</h2>
        
        {/* gap-10 ki jagah gap-y-16 add kiya hai taaki rows ke beech thoda accha gap mile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-10 gap-y-16 relative">
          
          {serviceInfo.process.map((step, idx) => {
            // Logic to check if it's the last item overall or last in the current row (4 items per row)
            const isLastItem = idx === serviceInfo.process.length - 1;
            const isLastInRowMd = (idx + 1) % 4 === 0;

            return (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                
                {/* 🔥 DYNAMIC CONNECTING LINE 🔥 */}
                {/* Ye line har item ke center se start hokar right ki taraf jayegi */}
                {!isLastItem && (
                  <div className={`hidden md:block absolute top-[40px] left-[50%] w-full h-[2px] bg-gradient-to-r from-emerald-100 to-emerald-300 -z-10 ${isLastInRowMd ? '!hidden' : ''}`}></div>
                )}

                <div className="relative z-10 w-20 h-20 rounded-2xl bg-white border-4 border-emerald-50 flex items-center justify-center text-2xl font-black text-emerald-500 mb-6 shadow-xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  {step.step}
                </div>
                
                <h3 className="text-xl font-black text-zinc-950 mb-3">{step.title}</h3>
                <p className="text-zinc-500 font-medium text-sm px-4 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
          
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;