import React, { useState } from 'react';
import { Home, Building2, Briefcase, Utensils, Dumbbell, Factory, Sparkles } from 'lucide-react';

// 🔥 PRODUCTION RULE: Sabhi images ko assets se import karein
import villaImg from "../../assets/popularimage/Villa.png";
import officeImg from "../../assets/popularimage/Office.png";
import apartmentImg from "../../assets/popularimage/Apartment.png";
import restaurantImg from "../../assets/popularimage/Restaurant.png";
import gymImg from "../../assets/popularimage/Gym.png";
import warehouseImg from "../../assets/popularimage/Warehouse.png";
import placeholderImg from "../../assets/herosection-img/hero-img.avif"; 

const PopularServices = ({ servicesData }) => {
  
  // Default data with specific images for each category
  const defaultServices = [
    { 
      id: 1, 
      title: 'Villa Cleaning', 
      desc: 'Premium deep cleaning for luxury homes and large estates.', 
      icon: Home, 
      image: villaImg 
    },
    { 
      id: 2, 
      title: 'Office Cleaning', 
      desc: 'Sanitized workspaces to boost productivity and maintain hygiene.', 
      icon: Briefcase, 
      image: officeImg 
    },
    { 
      id: 3, 
      title: 'Apartment Cleaning', 
      desc: 'Quick, detailed, and flawless cleaning services for modern flats.', 
      icon: Building2, 
      image: apartmentImg 
    },
    { 
      id: 4, 
      title: 'Restaurant Cleaning', 
      desc: 'Hygiene-focused cleaning for commercial kitchens and dining areas.', 
      icon: Utensils, 
      image: restaurantImg 
    },
    { 
      id: 5, 
      title: 'Gym Cleaning', 
      desc: 'Heavy-duty sanitization for fitness zones and workout equipment.', 
      icon: Dumbbell, 
      image: gymImg 
    },
    { 
      id: 6, 
      title: 'Warehouse Cleaning', 
      desc: 'Industrial-grade sweeping and maintenance for large facilities.', 
      icon: Factory, 
      image: warehouseImg 
    },
  ];

  // Defensive array checking to prevent crash
  const displayServices = Array.isArray(servicesData) && servicesData.length > 0 
    ? servicesData 
    : defaultServices;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-8 lg:py-16 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-10 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-800 font-bold text-[11px] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary-500" />
            <span className="uppercase tracking-wide">Categories</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">
            Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-500">Services</span>
          </h2>
          <p className="mt-4 text-slate-500 font-medium text-sm md:text-base max-w-xl mx-auto">
            Choose from our highly-rated maintenance and cleaning categories tailored for your specific property needs.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          
          {/* Left Side: Services List */}
          <div className="w-full lg:w-5/12 flex flex-col gap-1">
            {displayServices.map((service, index) => {
              const isActive = activeIndex === index;
              const IconComponent = service?.icon || Sparkles; 
              
              return (
                <div 
                  key={service?.id || `service-${index}`} 
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
                        {service?.title || "Service Title"}
                      </h3>
                      
                      {isActive && (
                        <p className="text-slate-500 font-medium leading-snug text-[13px] sm:text-[14px] animate-in fade-in slide-in-from-top-1">
                          {service?.desc || "Service description loading..."}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Image Display */}
          <div className="w-full lg:w-7/12 h-[350px] sm:h-[400px] lg:h-[500px] relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-slate-50 bg-slate-100">
            {displayServices.map((service, index) => (
              <div 
                key={service?.id || `img-${index}`}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  activeIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                <img 
                  src={service?.image || placeholderImg} 
                  alt={service?.title || "Service"} 
                  loading="lazy"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white max-w-sm">
                  <h3 className="text-3xl font-black mb-2">{service?.title}</h3>
                  <p className="text-sm font-medium text-white/80">{service?.desc}</p>
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