import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Droplets, Snowflake, Wrench, Zap, Home, Shield } from 'lucide-react';
import deepclean from "../../assets/serviceimage/Deep-cleaning.png";
import acmaintain from "../../assets/serviceimage/ac-maintainance.png";
import plumbing from "../../assets/serviceimage/plumbing.png";
import Electric from "../../assets/serviceimage/electric.png";
import pest from "../../assets/serviceimage/pest.png";
import handy from "../../assets/serviceimage/image.png";

const ServicesSection = ({ servicesData }) => {
  const defaultServices = [
    { id: 'deep-cleaning', title: 'Deep Cleaning', desc: 'Complete deep cleaning for homes and offices.', icon: 'droplets', image: deepclean, color: 'blue' },
    { id: 'ac-duct-cleaning', title: 'AC Maintenance', desc: 'Expert AC repair, servicing, duct cleaning.', icon: 'snowflake', image: acmaintain, color: 'cyan' },
    { id: 'plumbing', title: 'Plumbing Solutions', desc: 'Quick fixes for leaks, blockages, and fittings.', icon: 'wrench', image: plumbing, color: 'orange' },
    { id: 'electrical-services', title: 'Electrical Repairs', desc: 'Safe electrical wiring and switchboard repairs.', icon: 'zap', image: Electric, color: 'yellow' },
    { id: 'handyman-services', title: 'Handyman Services', desc: 'Furniture assembly, TV mounting, and general repairs.', icon: 'home', image: handy, color: 'indigo' },
    { id: 'pest-control', title: 'Pest Control', desc: 'Effective eco-friendly pest removal services.', icon: 'shield', image: pest, color: 'red' },
  ];

  const displayServices = servicesData?.length ? servicesData : defaultServices;

  const renderIcon = (iconName) => {
    const iconProps = { className: `w-6 h-6 text-white` };
    switch (iconName?.toLowerCase()) {
      case 'droplets': return <Droplets {...iconProps} />;
      case 'snowflake': return <Snowflake {...iconProps} />;
      case 'wrench': return <Wrench {...iconProps} />;
      case 'zap': return <Zap {...iconProps} />;
      case 'home': return <Home {...iconProps} />;
      case 'shield': return <Shield {...iconProps} />;
      default: return <Sparkles {...iconProps} />; 
    }
  };

  const getColorStyle = (colorName) => {
    const styles = {
      blue: { gradient: 'from-blue-500 to-blue-600', light: 'bg-blue-50', text: 'group-hover:text-blue-600' },
      cyan: { gradient: 'from-cyan-400 to-cyan-500', light: 'bg-cyan-50', text: 'group-hover:text-cyan-500' },
      orange: { gradient: 'from-orange-400 to-orange-500', light: 'bg-orange-50', text: 'group-hover:text-orange-500' },
      yellow: { gradient: 'from-yellow-400 to-amber-500', light: 'bg-yellow-50', text: 'group-hover:text-amber-500' },
      indigo: { gradient: 'from-indigo-500 to-indigo-600', light: 'bg-indigo-50', text: 'group-hover:text-indigo-600' },
      red: { gradient: 'from-rose-400 to-rose-500', light: 'bg-rose-50', text: 'group-hover:text-rose-500' },
    };
    return styles[colorName?.toLowerCase()] || styles.blue; 
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 2xl:px-24 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-indigo-600 font-bold text-sm mb-6 shadow-md border border-slate-100">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            What We Offer
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">Premium Services</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 font-light max-w-2xl mx-auto">
            We provide a wide range of professional services to keep your home and office in perfect condition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-10">
          {displayServices.map((service, index) => {
            const style = getColorStyle(service.color);
            return (
              <div key={index} className="group bg-white rounded-[2rem] shadow-lg hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 relative flex flex-col h-full border border-slate-100 overflow-hidden hover:-translate-y-2">
                <div className="relative w-full h-60 overflow-hidden">
                    <img src={service.image || deepclean} alt={service.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60"></div>
                </div>

                <div className="absolute top-52 right-8 z-20">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-lg border-4 border-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                        {renderIcon(service.icon)}
                    </div>
                </div>

                <div className="relative z-10 p-6 sm:p-8 pt-10 flex flex-col flex-grow">
                  <h3 className={`text-2xl font-bold text-slate-900 mb-3 transition-colors duration-300 ${style.text}`}>
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light text-[15px] sm:text-base mb-2">
                    {service.desc}
                  </p>
                  
                  <div className="mt-auto pt-6">
                    <Link to={`/services/${service.id}`} className="flex items-center gap-2 text-[15px] font-bold text-slate-700 transition-colors">
                      <span className={`${style.text} transition-colors duration-300`}>View Service Details</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-current transition-colors duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
                <div className={`absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link to="/services" className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl hover:-translate-y-1">
            View All Services <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;