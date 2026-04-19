import React from 'react';
import { ArrowRight, Star, CheckCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroimg from "../../assets/herosection-img/hero-img.avif"; 

const Hero = ({ heroData }) => {
  const defaultContent = {
    badgeText: "Your Trusted Service Partner",
    titleLine1: "Professional",
    titleHighlight: "Cleaning & Maintenance",
    titleLine3: "Services",
    description: "Your ultimate destination for all home and office services.",
    primaryBtnText: "Book Service",
    secondaryBtnText: "Get Free Quote",
    mainImage: heroimg 
  };


  const content = {
    badgeText: heroData?.badgeText || defaultContent.badgeText,
    titleLine1: heroData?.titleLine1 || defaultContent.titleLine1,
    titleHighlight: heroData?.titleHighlight || defaultContent.titleHighlight,
    titleLine3: heroData?.titleLine3 || defaultContent.titleLine3,
    description: heroData?.description || defaultContent.description,
    primaryBtnText: heroData?.primaryBtnText || defaultContent.primaryBtnText,
    secondaryBtnText: heroData?.secondaryBtnText || defaultContent.secondaryBtnText,
    mainImage: (heroData?.backendImages && heroData.backendImages.length > 0) 
      ? heroData.backendImages[0] 
      : defaultContent.mainImage
  };

  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-white to-indigo-50/40 overflow-hidden min-h-[calc(100vh-80px)] flex items-center pb-16 lg:pb-20">
      
      {/* Background Shapes */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-100/60 rounded-full mix-blend-multiply filter blur-[80px]"></div>
        <div className="absolute -bottom-32 -right-32 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-emerald-100/50 rounded-full mix-blend-multiply filter blur-[100px]"></div>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 2xl:px-24 relative z-10 pt-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start mt-4 lg:mt-0">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white text-indigo-700 font-semibold text-xs sm:text-sm mb-6 lg:mb-8 border border-indigo-100 shadow-sm transition-transform hover:scale-105">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-indigo-500 text-indigo-500" />
              {content.badgeText}
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold text-slate-900 leading-[1.2] mb-4 sm:mb-6 tracking-tight max-w-2xl">
              {content.titleLine1} <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">
                {content.titleHighlight}
              </span> <br className="hidden lg:block" />
              {content.titleLine3}
            </h1>
            
            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-8 lg:mb-10 max-w-xl 2xl:max-w-2xl leading-relaxed font-light px-2 sm:px-0">
              {content.description}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
              <Link to="/services" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 sm:py-4 text-white bg-brand-primary rounded-xl font-black uppercase tracking-widest text-[11px] hover:-translate-y-1 transition-all shadow-lg shadow-brand-primary/20 active:scale-95">
                  {content.primaryBtnText}
                  <ArrowRight className="w-4 h-4 ml-2 stroke-[3]" />
                </button>
              </Link>
              
              <Link to="/contact" className="w-full sm:w-auto">
                <button className="w-full flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 text-[11px] font-black uppercase tracking-widest text-brand-dark rounded-xl bg-white border-2 border-slate-100 hover:border-brand-primary transition-all hover:-translate-y-1 active:scale-95">
                  {content.secondaryBtnText}
                </button>
              </Link>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0 relative px-4 sm:px-0">
            <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] xl:w-[550px] xl:h-[550px] flex-shrink-0">
              <div className="absolute inset-0 bg-indigo-100 rounded-full opacity-50 scale-[1.05] animate-pulse-slow"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden border-[4px] sm:border-[6px] lg:border-[8px] border-white shadow-2xl z-10 bg-white">
                <img 
                  src={content.mainImage} 
                  alt="Hero Services" 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute top-2 -left-2 sm:top-10 sm:-left-6 lg:-left-10 bg-white/95 backdrop-blur-sm px-3 sm:px-5 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 animate-bounce-slow border border-white z-20">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">100% Quality</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Guaranteed</p>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute bottom-2 -right-2 sm:bottom-10 sm:-right-6 lg:-right-8 bg-white/95 backdrop-blur-sm px-3 sm:px-5 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 border border-white hover:-translate-y-2 transition-transform duration-300 z-20">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Fast Service</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Across City</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(-3%); } 50% { transform: translateY(3%); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.4; transform: scale(1.05); } 50% { opacity: 0.2; transform: scale(1.02); } }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
        .animate-pulse-slow { animation: pulse-slow 6s infinite ease-in-out; }
      `}</style>
    </section>
  );
};

export default Hero;