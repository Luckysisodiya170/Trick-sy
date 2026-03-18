import React, { useState, useEffect } from 'react';
import { Wrench, Zap, Droplets, LayoutGrid, Scissors, Ruler, Loader2 } from 'lucide-react';
import { technicalServices } from '../../data/technicalData';

// Avatars
import avatar1 from "../../assets/aboutsectionimg/profileabout.jpeg"; 
import avatar2 from "../../assets/aboutsectionimg/profileabout2.jpeg"; 
import avatar3 from "../../assets/aboutsectionimg/profileabout3.jpeg"; 

// Components
import SEO from '../../components/SEO';

import TechnicalCard from './TechnicalCard';
import TechnicalDisplay from './TechnicalDisplay';
import TechnicalProcess from './TechnicalProcess';
import TechnicalSpecs from './TechnicalSpecs';
import TechnicalHero from './TechnicalHero';
import TechnicalTrustFooter from './TechnicalTrustFooter';

import TechnicalPricing from './TechnicalPricing'; 
import TechnicalFAQ from './TechnicalFAQ';
import TechnicalTestimonials from './TechnicalTestimonials';
import TechnicalEstimator from './TechnicalEstimator';

const TechnicalServices = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const avatars = [avatar1, avatar2, avatar3];
  const icons = [<Wrench/>, <Zap/>, <Droplets/>, <LayoutGrid/>, <Scissors/>, <Ruler/>];

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <SEO title="Technical Services | Tricksy Dubai" description="Expert services." />
      
      {/* 1. HERO */}
      <TechnicalHero />

      {/* 2. MAIN SELECTOR */}
      <section className="py-16 relative z-20 -mt-16">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <div className="bg-white rounded-[3.5rem] shadow-2xl border border-zinc-100 p-4 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-3">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 px-2">Expertise Domains</h2>
              {technicalServices?.map((service, index) => (
                <TechnicalCard 
                  key={service.id || index}
                  service={service}
                  isActive={activeTab === index}
                  onHover={() => setActiveTab(index)}
                  icon={icons[index % icons.length]}
                  index={index}
                />
              ))}
            </div>
            <div className="lg:col-span-8 relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden bg-zinc-900 border-[8px] border-zinc-50 shadow-inner">
               {technicalServices?.map((service, index) => (
                <TechnicalDisplay 
                  key={service.id || index}
                  service={service}
                  isActive={activeTab === index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROCESS & SPECS */}
      <div className="w-full max-w-[1400px] mx-auto px-6">
           <TechnicalSpecs />
        <TechnicalProcess />
     
      </div>

      <TechnicalPricing />
      <TechnicalFAQ />

      {/* 5. FOOTER */}
      <div className="w-full max-w-[1400px] mx-auto px-6 pb-24">
        <TechnicalTrustFooter avatars={avatars} />
      </div>
      
    </div>
  );
};

export default TechnicalServices;