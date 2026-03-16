import React from 'react';
import { Play, ArrowRight, Star, CheckCircle, MapPin } from 'lucide-react';
import Button from "../../components/common/Button"

// 🔥 PRODUCTION RULE: Local Image Import
import heroimg from "../../assets/herosection-img/hero-img.avif" 

// 'heroData' prop backend se aane wale data ke liye
const Hero = ({ heroData }) => {
  
  // Default Fallback Content
  const defaultContent = {
    badgeText: "Your Trusted Service Partner",
    titleLine1: "Professional",
    titleHighlight: "Cleaning & Maintenance",
    titleLine3: "Services",
    description: "Your ultimate destination for all home and office services. Explore our extensive collection of expert solutions for a spotless and well-maintained space.",
    primaryBtnText: "Book Service",
    secondaryBtnText: "Get Free Quote",
    mainImage: heroimg // Local Asset fallback
  };

  const content = heroData ? { ...defaultContent, ...heroData } : defaultContent;

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50/40 overflow-hidden min-h-[90vh] flex items-center pt-24 lg:pt-28 pb-16 lg:pb-20">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-100/60 rounded-full mix-blend-multiply filter blur-[80px]"></div>
        <div className="absolute -bottom-32 -right-32 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-green-100/50 rounded-full mix-blend-multiply filter blur-[100px]"></div>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 2xl:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Content Area */}
          <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start mt-4 lg:mt-0">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white text-primary-700 font-semibold text-xs sm:text-sm mb-6 lg:mb-8 border border-primary-100 shadow-sm transition-transform hover:scale-105">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-primary-500 text-primary-500" />
              {content.badgeText}
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold text-slate-900 leading-[1.2] mb-4 sm:mb-6 tracking-tight max-w-2xl">
              {content.titleLine1} <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">
                {content.titleHighlight}
              </span> <br className="hidden lg:block" />
              {content.titleLine3}
            </h1>
            
            {/* Subtext */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-8 lg:mb-10 max-w-xl 2xl:max-w-2xl leading-relaxed font-light px-2 sm:px-0">
              {content.description}
            </p>
            
            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
              <Button 
                variant="primary" 
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 text-base rounded-xl font-semibold hover:-translate-y-1 transition-transform"
                onClick={() => console.log("Primary CTA")}
              >
                {content.primaryBtnText}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <button 
                onClick={(e) => { e.preventDefault(); console.log("Secondary CTA"); }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 text-base text-slate-700 font-semibold rounded-xl bg-white border border-slate-200 hover:border-primary-200 hover:bg-primary-50 transition-all hover:-translate-y-1"
              >
                {content.secondaryBtnText}
              </button>
            </div>
          </div>

          {/* Right Image/Visual Area */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0 relative px-4 sm:px-0">
            <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] xl:w-[550px] xl:h-[550px] flex-shrink-0">
              
              <div className="absolute inset-0 bg-primary-100 rounded-full opacity-50 scale-[1.05] animate-pulse-slow"></div>
              
              <div className="absolute inset-0 rounded-full overflow-hidden border-[4px] sm:border-[6px] lg:border-[8px] border-white shadow-2xl z-10 bg-white">
                <img 
                  src={content.mainImage} 
                  alt="Hero Services" 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badges */}
              <div className="absolute top-2 -left-2 sm:top-10 sm:-left-6 lg:-left-10 bg-white/95 backdrop-blur-sm px-3 sm:px-5 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 animate-bounce-slow border border-white z-20">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">100% Quality</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Guaranteed</p>
                </div>
              </div>

              <div className="absolute bottom-2 -right-2 sm:bottom-10 sm:-right-6 lg:-right-8 bg-white/95 backdrop-blur-sm px-3 sm:px-5 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 border border-white hover:-translate-y-2 transition-transform duration-300 z-20">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Fast Service</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Across City</p>
                </div>
              </div>
              
              <div className="absolute top-0 right-6 sm:right-16 w-3 h-3 sm:w-5 sm:h-5 bg-primary-500 rounded-full opacity-80 z-0"></div>
              <div className="absolute bottom-8 -left-2 sm:-left-4 w-5 h-5 sm:w-8 sm:h-8 bg-primary-400 rounded-full opacity-60 z-0"></div>
              <div className="absolute top-1/2 -right-3 sm:-right-8 w-2 h-2 sm:w-4 sm:h-4 bg-primary-600 rounded-full opacity-90 z-0"></div>

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