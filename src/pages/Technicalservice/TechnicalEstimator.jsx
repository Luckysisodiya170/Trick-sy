import React, { useState } from 'react';
import { Home, Zap, Droplets, Wrench, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { HashLink as Link } from 'react-router-hash-link';

const TechnicalEstimator = () => {
  const [size, setSize] = useState(2); 
  const [selectedService, setSelectedService] = useState('electrical');
  const [isEmergency, setIsEmergency] = useState(false);

  // Data maps
  const sizeMap = { 1: "Studio / 1BHK", 2: "2-3 BHK Apt", 3: "Townhouse", 4: "Standard Villa", 5: "Large Mansion" };
  const basePrices = {
    electrical: 149,
    plumbing: 129,
    handyman: 99,
    ac: 199
  };

  // Calculation Logic
  const calculatePrice = () => {
    let price = basePrices[selectedService] * (size * 0.8);
    if (isEmergency) price += 150; 
    return Math.round(price);
  };

  return (
    <section className="py-32 px-6 bg-zinc-950 text-white relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-emerald-500 mb-6">
            <Zap size={14} className="fill-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">Interactive Tool</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
            Smart <span className="text-emerald-500 italic">Estimator_</span>
          </h2>
          <p className="text-zinc-400 font-medium">Calculate your rough service cost instantly. No hidden fees.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT */}
          <div className="lg:col-span-7 space-y-8 bg-white/5 p-8 md:p-12 rounded-[3rem] border border-white/10 backdrop-blur-xl">
            
            {/*  Service Type */}
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">01. Select Issue Domain</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'electrical', icon: <Zap size={20}/>, label: 'Electrical' },
                  { id: 'plumbing', icon: <Droplets size={20}/>, label: 'Plumbing' },
                  { id: 'handyman', icon: <Wrench size={20}/>, label: 'Handyman' },
                  { id: 'ac', icon: <AlertCircle size={20}/>, label: 'AC Repair' }
                ].map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => setSelectedService(srv.id)}
                    className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                      selectedService === srv.id 
                        ? 'bg-emerald-500 border-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/20 scale-105 font-black' 
                        : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white font-bold'
                    }`}
                  >
                    {srv.icon}
                    <span className="text-xs uppercase tracking-tight">{srv.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/*  Slider */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex justify-between items-end mb-6">
                 <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">02. Property Scale</p>
                 <span className="text-sm font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                   {sizeMap[size]}
                 </span>
              </div>
              <input 
                type="range" 
                min="1" max="5" 
                value={size} 
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-zinc-600 text-[10px] font-bold uppercase mt-3">
                <span>Studio</span>
                <span>Mansion</span>
              </div>
            </div>

            {/* Toggle */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
               <div>
                 <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">03. Response Time</p>
                 <p className="text-sm text-zinc-300 font-medium">Do you need a technician within 45 mins?</p>
               </div>
               <button 
                 onClick={() => setIsEmergency(!isEmergency)}
                 className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out ${isEmergency ? 'bg-emerald-500' : 'bg-zinc-800'}`}
               >
                 <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isEmergency ? 'translate-x-6' : 'translate-x-0'}`}></div>
               </button>
            </div>

          </div>

          {/* RIGHt */}
          <div className="lg:col-span-5 bg-emerald-500 p-8 md:p-12 rounded-[3rem] text-zinc-950 flex flex-col justify-between shadow-[0_0_50px_-12px_rgba(16,185,129,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-20 -mt-20"></div>

            <div>
              <div className="flex items-center gap-2 mb-8">
                <CheckCircle2 size={20} className="text-zinc-950" />
                <span className="font-black uppercase tracking-widest text-xs">Estimated Quote</span>
              </div>
              
              <p className="text-emerald-950 font-bold mb-2">Starting from</p>
              <div className="flex items-start gap-2 mb-6">
                <span className="text-3xl font-black mt-2">AED</span>
                <span className="text-8xl font-black tracking-tighter leading-none">{calculatePrice()}</span>
              </div>

              <ul className="space-y-3 mb-12">
                <li className="flex items-center gap-2 text-sm font-bold text-zinc-900"><span className="w-1.5 h-1.5 bg-zinc-950 rounded-full"></span> Call-out fee included</li>
                <li className="flex items-center gap-2 text-sm font-bold text-zinc-900"><span className="w-1.5 h-1.5 bg-zinc-950 rounded-full"></span> Minor consumables included</li>
                {isEmergency && <li className="flex items-center gap-2 text-sm font-black text-red-700"><span className="w-1.5 h-1.5 bg-red-700 rounded-full animate-ping"></span> Priority Dispatch Active</li>}
              </ul>
            </div>

            <Link 
              smooth to="#contact-form"
              className="w-full py-5 bg-zinc-950 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors hover:-translate-y-1"
            >
              Lock this Price <ArrowRight size={16}/>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechnicalEstimator;