// src/pages/Services/ServiceDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ChevronDown, ChevronUp, Loader2, ShieldCheck, Star, Clock } from 'lucide-react';

import SEO from '../../components/SEO';
import { servicesData } from '../../data/servicesData';

// 🔥 LOCAL ASSETS IMPORT (SEO aur UI ke liye zaroori)
import deepclean from "../../assets/serviceimage/Deep-cleaning.png";
import acmaintain from "../../assets/serviceimage/ac-maintainance.png";
import plumbing from "../../assets/serviceimage/plumbing.png";
import Electric from "../../assets/serviceimage/electric.png";
import pest from "../../assets/serviceimage/pest.png";
import handy from "../../assets/serviceimage/image.png";

const ServiceDetail = () => {
  const { serviceId } = useParams(); 
  
  const [serviceInfo, setServiceInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  // 🖼️ Mapping function: Taki error na aaye aur sahi image dikhe
  const getServiceImage = (id) => {
    switch (id) {
      case 'deep-cleaning': return deepclean;
      case 'ac-duct-cleaning': return acmaintain;
      case 'commercial-cleaning': return plumbing;
      case 'upholstery-cleaning': return Electric;
      case 'painting-services': return pest;
      case 'handyman-services': return handy;
      default: return deepclean;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    let isMounted = true; 
    setIsLoading(true);

    const fetchServiceData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 300)); 
        if (isMounted) {
          setServiceInfo(servicesData[serviceId] || null);
        }
      } catch (error) {
        console.log("Error loading service data:", error.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchServiceData();

    return () => { isMounted = false; };
  }, [serviceId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 pt-20">
         <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
            <p className="font-black text-zinc-950 uppercase tracking-widest text-sm animate-pulse">
              Loading Service...
            </p>
         </div>
      </div>
    );
  }

  if (!serviceInfo) return <Navigate to="/404" />;

  // 🔥 Is variable ko define na karne ki wajah se error aa raha tha
  const currentHeroImage = getServiceImage(serviceId);

  const colorfulIcons = [
    "bg-emerald-100 text-emerald-600 border-emerald-200",
    "bg-blue-100 text-blue-600 border-blue-200",
    "bg-amber-100 text-amber-600 border-amber-200",
    "bg-rose-100 text-rose-600 border-rose-200"
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      
      <SEO 
        title={serviceInfo.title} 
        description={serviceInfo.description} 
        keywords={`${serviceInfo.title}, deep cleaning services, home cleaning, office cleaning, AC duct cleaning, maintenance services`} 
      />
      
      {/* --- 🟢 COMPACT & CLEAN HERO BANNER (Fixed Error) --- */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center overflow-hidden bg-zinc-950">
        
        <div className="absolute inset-0 z-0">
          <img 
            src={currentHeroImage} 
            alt={serviceInfo.title} 
            className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-6 backdrop-blur-md">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em]">{serviceInfo.subtitle}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tighter mb-6">
              {serviceInfo.title.split(' ')[0]} <br/>
              <span className="text-emerald-500">{serviceInfo.title.substring(serviceInfo.title.indexOf(' ') + 1)}</span>
            </h1>
            
            <p className="text-zinc-200 text-lg md:text-xl font-medium leading-relaxed mb-8 max-w-lg drop-shadow-md">
              {serviceInfo.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-emerald-500 text-zinc-950 font-black rounded-xl hover:bg-emerald-400 hover:-translate-y-1 transition-all shadow-xl uppercase text-xs tracking-widest flex items-center gap-2">
                Book Appointment <ArrowRight className="w-4 h-4" />
              </button>
              <div className="hidden sm:flex items-center gap-6 ml-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span className="text-white font-bold text-xs uppercase tracking-widest">Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-500" />
                  <span className="text-white font-bold text-xs uppercase tracking-widest">60m Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. SERVICE INCLUDES --- */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden">
        <div className="w-full max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight mb-4">What's Included</h2>
            <p className="text-zinc-500 text-lg font-medium">Everything you need for a spotless space, handled by pros.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceInfo.includes?.map((item, idx) => (
              <div key={idx} className="p-8 bg-white border border-zinc-100 rounded-[2rem] hover:border-emerald-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border transition-transform group-hover:scale-110 group-hover:rotate-3 ${colorfulIcons[idx % 4]}`}>
                  {item.icon || <CheckCircle2 className="w-8 h-8" />}
                </div>
                <h3 className="text-2xl font-black text-zinc-950 mb-3">{item.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. THE PROCESS --- */}
      <section className="py-24 bg-white border-y border-zinc-100">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-zinc-950 mb-20 text-center tracking-tight">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
            <div className="hidden md:block absolute top-[40px] left-[10%] w-[80%] h-[2px] bg-gradient-to-r from-emerald-100 via-emerald-400 to-emerald-100 z-0"></div>
            {serviceInfo.process?.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-2xl bg-white border-4 border-emerald-50 flex items-center justify-center text-2xl font-black text-emerald-500 mb-6 shadow-xl group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-600 transition-all duration-300 transform group-hover:-translate-y-2">
                  {step.step}
                </div>
                <h3 className="text-xl font-black text-zinc-950 mb-3">{step.title}</h3>
                <p className="text-zinc-500 font-medium text-sm px-4 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. PRICING TABLE --- */}
      <section className="py-24 bg-zinc-50">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight">Transparent Pricing</h2>
            <p className="text-zinc-500 mt-4 font-medium text-lg">No hidden fees. Pay for what you get.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
            {serviceInfo.pricing?.map((plan, idx) => (
              <div key={idx} className={`relative p-8 rounded-[2.5rem] transition-all duration-300 ${
                plan.isPopular 
                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl shadow-emerald-500/30 transform md:-translate-y-4 border-none' 
                : 'bg-white border border-zinc-200 text-zinc-950 hover:border-emerald-200 hover:shadow-xl'
              }`}>
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    Most Popular Choice
                  </div>
                )}
                <h3 className="text-2xl font-black mb-2 mt-4">{plan.plan}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black">{plan.price}</span>
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
                  ? 'bg-white text-emerald-600 hover:bg-zinc-50 hover:shadow-lg' 
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
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="w-full max-w-[800px] mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-zinc-950 mb-12 text-center tracking-tight">Got Questions?</h2>
          <div className="space-y-4">
            {serviceInfo.faqs?.map((faq, idx) => (
              <div 
                key={idx} 
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                  openFaq === idx 
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-md' 
                  : 'border-zinc-100 bg-white hover:border-emerald-200 hover:bg-emerald-50/20'
                }`}
              >
                <div className="flex justify-between items-center gap-4">
                  <h4 className={`font-bold text-lg ${openFaq === idx ? 'text-emerald-700' : 'text-zinc-900'}`}>{faq.q}</h4>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === idx ? 'bg-emerald-500 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                    {openFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <p className="text-zinc-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServiceDetail;