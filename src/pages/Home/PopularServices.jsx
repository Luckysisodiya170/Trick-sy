import React, { useState } from 'react';
import { Home, Building2, Briefcase, Utensils, Dumbbell, Factory, Sparkles, ArrowRight } from 'lucide-react';

const PopularServices = () => {
  const popularServices = [
    { id: 1, title: 'Villa Cleaning', desc: 'Premium deep cleaning for luxury homes.', icon: Home, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200' },
    { id: 2, title: 'Office Cleaning', desc: 'Sanitized workspaces to boost productivity.', icon: Briefcase, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200' },
    { id: 3, title: 'Apartment Cleaning', desc: 'Quick, detailed, and flawless cleaning services.', icon: Building2, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200' },
    { id: 4, title: 'Restaurant Cleaning', desc: 'Hygiene-focused cleaning for commercial kitchens.', icon: Utensils, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200' },
    { id: 5, title: 'Gym Cleaning', desc: 'Heavy-duty sanitization for fitness zones.', icon: Dumbbell, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200' },
    { id: 6, title: 'Warehouse Cleaning', desc: 'Industrial-grade sweeping for large facilities.', icon: Factory, image: 'https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=1200' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    /* py-8 aur py-12 se section ka upar/niche ka space kam kar diya */
    <section className="py-8 lg:py-12 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        
        {/* Header - Margin bottom kam kiya (mb-6) */}
        <div className="mb-6 lg:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-800 font-bold text-[11px] mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary-500" />
            <span className="uppercase tracking-wide">Categories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-500">Services</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          
          {/* Left Side: List - Items ke beech ka gap kam kiya (gap-1) */}
          <div className="w-full lg:w-5/12 flex flex-col gap-1">
            {popularServices.map((service, index) => {
              const isActive = activeIndex === index;
              const IconComponent = service.icon;
              
              return (
                <div 
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  /* padding kam ki (p-3) aur margin-bottom hataya */
                  className={`group cursor-pointer p-3 sm:p-4 rounded-xl transition-all duration-300 border-l-4 ${
                    isActive 
                      ? 'bg-slate-50 border-primary-500 shadow-sm scale-[1.01]' 
                      : 'bg-transparent border-transparent hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ${
                      isActive ? 'bg-primary-500 text-white shadow-md' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>

                    <div className="flex-grow">
                      <h3 className={`font-bold leading-none transition-all duration-300 ${
                        isActive ? 'text-lg sm:text-xl text-slate-900 mb-1' : 'text-base sm:text-lg text-slate-500'
                      }`}>
                        {service.title}
                      </h3>
                      
                      {isActive && (
                        <p className="text-slate-500 font-medium leading-snug text-[13px] sm:text-[14px] animate-in fade-in slide-in-from-top-1">
                          {service.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side Image - Height match karne ke liye lg:h-[450px] kiya */}
          <div className="w-full lg:w-7/12 h-[300px] sm:h-[400px] lg:h-[450px] relative rounded-[2rem] overflow-hidden shadow-xl border-4 border-slate-50">
            {popularServices.map((service, index) => (
              <div 
                key={service.id}
                className={`absolute inset-0 transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PopularServices;