import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Droplets, Snowflake, Wrench, Zap, Home, Shield } from 'lucide-react';
import deepclean from "../../assets/serviceimage/Deep-cleaning.png"
import acmaintain from "../../assets/serviceimage/ac-maintainance.png"
import plumbing from "../../assets/serviceimage/plumbing.png"
import Electric from "../../assets/serviceimage/electric.png"
import pest from "../../assets/serviceimage/pest.png"
import handy from "../../assets/serviceimage/image.png"

const ServicesSection = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServicesFromBackend = () => {
      const backendData = [
        {
          id: 1,
          title: 'Deep Cleaning',
          desc: 'Complete deep cleaning for homes and offices to ensure a spotless environment.',
          icon: 'droplets',
          image: deepclean,
          color: 'blue'
        },
        {
          id: 2,
          title: 'AC Maintenance',
          desc: 'Expert AC repair, servicing, duct cleaning, and installation by certified pros.',
          icon: 'snowflake',
          image: acmaintain, 
          color: 'cyan'
        },
        {
          id: 3,
          title: 'Plumbing Solutions',
          desc: 'Quick fixes for leaks, pipe bursts, blockages, and new bathroom fittings.',
          icon: 'wrench',
          image: plumbing,
          color: 'orange'
        },
        {
          id: 4,
          title: 'Electrical Repairs',
          desc: 'Safe and reliable electrical wiring, switchboard repairs, and installations.',
          icon: 'zap',
          image: Electric,
          color: 'yellow'
        },
        {
          id: 5,
          title: 'Handyman Services',
          desc: 'Furniture assembly, TV mounting, drilling, and general home repairs.',
          icon: 'home',
          image: handy,
          color: 'indigo'
        },
        {
          id: 6,
          title: 'Pest Control',
          desc: 'Effective and eco-friendly pest removal and long-term prevention services.',
          icon: 'shield',
          image: pest,
          color: 'red'
        },
      ];
      setServices(backendData);
    };

    fetchServicesFromBackend();
  }, []);

  const renderIcon = (iconName) => {
    const iconProps = { className: `w-6 h-6 text-white` };
    switch (iconName) {
      case 'droplets': return <Droplets {...iconProps} />;
      case 'snowflake': return <Snowflake {...iconProps} />;
      case 'wrench': return <Wrench {...iconProps} />;
      case 'zap': return <Zap {...iconProps} />;
      case 'home': return <Home {...iconProps} />;
      case 'shield': return <Shield {...iconProps} />;
      default: return <Sparkles {...iconProps} />;
    }
  };

  // Naye aur vibrant gradient colors har card ke liye
  const getColorStyle = (colorName) => {
    const styles = {
      blue: { gradient: 'from-blue-500 to-blue-600', light: 'bg-blue-50', text: 'group-hover:text-blue-600' },
      cyan: { gradient: 'from-cyan-400 to-cyan-500', light: 'bg-cyan-50', text: 'group-hover:text-cyan-500' },
      orange: { gradient: 'from-orange-400 to-orange-500', light: 'bg-orange-50', text: 'group-hover:text-orange-500' },
      yellow: { gradient: 'from-yellow-400 to-amber-500', light: 'bg-yellow-50', text: 'group-hover:text-amber-500' },
      indigo: { gradient: 'from-indigo-500 to-indigo-600', light: 'bg-indigo-50', text: 'group-hover:text-indigo-600' },
      red: { gradient: 'from-rose-400 to-rose-500', light: 'bg-rose-50', text: 'group-hover:text-rose-500' },
    };
    return styles[colorName] || styles.blue;
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      
      {/* Colorful Background Glows for attractiveness */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-primary-400/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3"></div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 2xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-primary-600 font-bold text-sm mb-6 shadow-md border border-slate-100">
            <Sparkles className="w-4 h-4 text-primary-500" />
            What We Offer
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-500">Premium Services</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 font-light max-w-2xl mx-auto">
            We provide a wide range of professional services to keep your home and office in perfect condition. Quality and satisfaction guaranteed.
          </p>
        </div>

        {/* Dynamic Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-10">
          
          {services.map((service) => {
            const style = getColorStyle(service.color);
            
            return (
              <div 
                key={service.id} 
                className="group bg-white rounded-[2rem] shadow-lg hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 relative flex flex-col h-full border border-slate-100 overflow-hidden hover:-translate-y-2"
              >
                {/* Edge-to-Edge Image */}
                <div className="relative w-full h-60 overflow-hidden">
                    <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60"></div>
                </div>

                {/* Floating Vibrant Icon */}
                <div className="absolute top-52 right-8 z-20">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-lg shadow-${service.color}-500/30 border-4 border-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                        {renderIcon(service.icon)}
                    </div>
                </div>

                {/* Content Container - Tight Spacing */}
                <div className="relative z-10 p-6 sm:p-8 pt-10 flex flex-col flex-grow">
                  <h3 className={`text-2xl font-bold text-slate-900 mb-3 transition-colors duration-300 ${style.text}`}>
                    {service.title}
                  </h3>
                  {/* Reduced margin below description to fix the extra space issue */}
                  <p className="text-slate-600 leading-relaxed font-light text-[15px] sm:text-base mb-2">
                    {service.desc}
                  </p>
                  
                  {/* Bottom Action Button - Pushed to bottom naturally without huge gaps */}
                  <div className="mt-auto pt-6">
                    <button className="flex items-center gap-2 text-[15px] font-bold text-slate-700 transition-colors">
                      <span className={`${style.text} transition-colors duration-300`}>View Service Details</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-current transition-colors duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
                
                {/* Subtle colorful bottom border on hover */}
                <div className={`absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            );
          })}

        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-primary-600 text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl hover:shadow-primary-500/30 text-base hover:-translate-y-1">
            View All Services
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;