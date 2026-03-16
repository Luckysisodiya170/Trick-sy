// src/pages/Services/ServiceDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

// 🔥 Naya Data File Import
import { servicesData } from '../../data/servicesData';

const ServiceDetail = () => {
  const [openFaq, setOpenFaq] = useState(0);
  
  // 1. URL se service ka naam nikalna (jaise "deep-cleaning")
  const { serviceId } = useParams(); 
  
  // 2. Us ID ka data uthana
  const serviceInfo = servicesData[serviceId];

  // 3. Scroll to top jab bhi naya service page khule
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  // 4. Agar URL galat hai toh 404 page par bhej do
  if (!serviceInfo) {
    return <Navigate to="/*" />; // Ye aapke App.jsx ke 404 route par jayega
  }

  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* --- 1. HERO BANNER --- */}
      <section className="bg-zinc-950 py-20 lg:py-28 relative overflow-hidden border-b-8 border-emerald-500">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
        <div className="w-full max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 mb-6">
             <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
             <span className="text-zinc-300 font-bold text-[10px] uppercase tracking-[0.2em]">{serviceInfo.subtitle}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-6">
            {serviceInfo.title}
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
            {serviceInfo.description}
          </p>
          <button className="mt-10 px-8 py-4 bg-emerald-500 text-zinc-950 font-black rounded-xl hover:bg-emerald-400 hover:-translate-y-1 transition-all shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] uppercase text-sm tracking-widest flex items-center gap-2">
            Book This Service <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* --- 2. SERVICE INCLUDES --- */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <h2 className="text-4xl font-black text-zinc-950 mb-12 uppercase tracking-tight border-l-8 border-emerald-500 pl-4">What's Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 🔥 Dynamic Includes Map */}
            {serviceInfo.includes.map((item, idx) => (
              <div key={idx} className="p-8 bg-white border-2 border-zinc-200 rounded-[1.5rem] hover:border-zinc-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] group">
                <div className="w-14 h-14 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-950 mb-6 border border-zinc-200 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-zinc-950 mb-2">{item.title}</h3>
                <p className="text-zinc-500 font-medium text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. THE PROCESS --- */}
      <section className="py-24 bg-zinc-50 border-y-2 border-zinc-200">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <h2 className="text-4xl font-black text-zinc-950 mb-16 text-center tracking-tight">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-[40px] left-[10%] w-[80%] h-[4px] bg-zinc-200 z-0"></div>
            
            {/* 🔥 Dynamic Process Map */}
            {serviceInfo.process.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-white border-4 border-zinc-950 flex items-center justify-center text-2xl font-black text-emerald-500 mb-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
                  {step.step}
                </div>
                <h3 className="text-xl font-black text-zinc-950 mb-2">{step.title}</h3>
                <p className="text-zinc-500 font-medium text-sm px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. PRICING TABLE --- */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-zinc-950 tracking-tight">Transparent Pricing</h2>
            <p className="text-zinc-500 mt-4 font-medium">No hidden fees. Pay for what you get.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
            {/* 🔥 Dynamic Pricing Map */}
            {serviceInfo.pricing.map((plan, idx) => (
              <div key={idx} className={`p-8 rounded-[2rem] border-4 transition-all duration-300 ${
                plan.isPopular 
                ? 'border-zinc-950 bg-zinc-950 text-white shadow-[12px_12px_0px_0px_rgba(16,185,129,1)] transform md:-translate-y-4' 
                : 'border-zinc-200 bg-white text-zinc-950 hover:border-zinc-950 hover:shadow-[8px_8px_0px_0px_rgba(24,24,27,1)]'
              }`}>
                {plan.isPopular && (
                  <div className="inline-block px-3 py-1 bg-emerald-500 text-zinc-950 text-[10px] font-black uppercase tracking-widest rounded-lg mb-6">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-black mb-2">{plan.plan}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black">{plan.price}</span>
                  {plan.price !== "Custom" && <span className={`text-sm font-bold ${plan.isPopular ? 'text-zinc-400' : 'text-zinc-500'}`}>/visit</span>}
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 ${plan.isPopular ? 'text-emerald-500' : 'text-zinc-950'}`} />
                      <span className="font-medium text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${
                  plan.isPopular 
                  ? 'bg-emerald-500 text-zinc-950 hover:bg-white' 
                  : 'bg-zinc-100 text-zinc-950 hover:bg-zinc-950 hover:text-white'
                }`}>
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. FAQS --- */}
      <section className="py-24 bg-zinc-50 border-t-2 border-zinc-200">
        <div className="w-full max-w-[800px] mx-auto px-6">
          <h2 className="text-4xl font-black text-zinc-950 mb-12 text-center tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {/* 🔥 Dynamic FAQs Map */}
            {serviceInfo.faqs.map((faq, idx) => (
              <div 
                key={idx} 
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                  openFaq === idx 
                  ? 'border-zinc-950 bg-white shadow-[6px_6px_0px_0px_rgba(24,24,27,1)]' 
                  : 'border-zinc-200 bg-white hover:border-zinc-950'
                }`}
              >
                <div className="flex justify-between items-center gap-4">
                  <h4 className="font-bold text-lg text-zinc-950">{faq.q}</h4>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 ${openFaq === idx ? 'border-zinc-950 bg-zinc-950 text-white' : 'border-zinc-200 text-zinc-500'}`}>
                    {openFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
                {openFaq === idx && (
                  <p className="mt-4 text-zinc-500 font-medium leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServiceDetail;