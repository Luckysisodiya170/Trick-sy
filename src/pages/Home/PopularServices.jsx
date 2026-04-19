import React, { useState, useMemo } from 'react';
import { Home, Building2, Briefcase, Utensils, Dumbbell, Factory, Sparkles } from 'lucide-react';

// Default assets imports
import villaImg from "../../assets/popularimage/Villa.png";
import officeImg from "../../assets/popularimage/Office.png";
import apartmentImg from "../../assets/popularimage/Apartment.png";
import restaurantImg from "../../assets/popularimage/Restaurant.png";
import gymImg from "../../assets/popularimage/Gym.png";
import warehouseImg from "../../assets/popularimage/Warehouse.png";
import placeholderImg from "../../assets/herosection-img/hero-img.avif"; 

const PopularServices = ({ servicesData }) => {
  
  const defaultServices = [
    { id: 1, title: 'Villa Cleaning', desc: 'Premium deep cleaning for luxury homes.', icon: Home, image: villaImg },
    { id: 2, title: 'Office Cleaning', desc: 'Sanitized workspaces to boost productivity.', icon: Briefcase, image: officeImg },
    { id: 3, title: 'Apartment Cleaning', desc: 'Quick, detailed, and flawless cleaning services.', icon: Building2, image: apartmentImg },
  ];

  const getIconComponent = (iconName) => {
    switch (iconName?.toLowerCase()) {
      case 'home': return Home;
      case 'building2': return Building2;
      case 'briefcase': return Briefcase;
      case 'utensils': return Utensils;
      case 'dumbbell': return Dumbbell;
      case 'factory': return Factory;
      default: return Sparkles; 
    }
  };

  const displayServices = useMemo(() => {
    if (!servicesData?.categories || servicesData.categories.length === 0) {
      return defaultServices;
    }

    return servicesData.categories.map((category, index) => ({
      id: category.id || index,
      title: category.title || "Service",
      desc: category.desc || "",
      icon: getIconComponent(category.icon),
      image: servicesData.backendImages?.[index] || defaultServices[index]?.image || placeholderImg
    }));
  }, [servicesData]);

  const [activeIndex, setActiveIndex] = useState(0);

  if (!servicesData && displayServices.length === 0) return null;

  return (
    <section className="py-8 lg:py-16 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-10 lg:px-12">
        
        {/* --- Dynamic Header Section --- */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-800 font-bold text-[11px] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary-500" />
            <span className="uppercase tracking-wide">
              {servicesData?.badge || "Categories"}
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">
            {servicesData?.title || "Popular "}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-emerald-600">
              {servicesData?.highlightText || "Services"}
            </span>
          </h2>
          
          <p className="mt-4 text-slate-500 font-medium text-sm md:text-base max-w-xl mx-auto">
            {servicesData?.description || "Choose from our highly-rated maintenance and cleaning categories."}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          
          {/* --- Left Side: Services List --- */}
          <div className="w-full lg:w-5/12 flex flex-col gap-1">
            {displayServices.map((service, index) => {
              const isActive = activeIndex === index;
              const IconComponent = service.icon; 
              
              return (
                <div 
                  key={service.id} 
                  onMouseEnter={() => setActiveIndex(index)}
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
                        <p className="text-slate-500 font-medium leading-snug text-[13px] sm:text-[14px] animate-in fade-in slide-in-from-top-1 mt-1">
                          {service.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- Right Side: Image Display --- */}
          <div className="w-full lg:w-7/12 h-[350px] sm:h-[400px] lg:h-[500px] relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-slate-50 bg-slate-100">
            {displayServices.map((service, index) => (
              <div 
                key={`img-${service.id}`}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  activeIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  loading="lazy"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white max-w-sm">
                  <h3 className="text-3xl font-black mb-2">{service.title}</h3>
                  <p className="text-sm font-medium text-white/80">{service.desc}</p>
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