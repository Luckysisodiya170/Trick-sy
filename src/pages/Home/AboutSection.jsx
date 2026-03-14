import React from 'react';
import { CheckCircle2, Award, ArrowRight, Sparkles } from 'lucide-react';
import propic from "../../assets/aboutsectionimg/profileabout.jpeg"
import propic1 from "../../assets/aboutsectionimg/profileabout2.jpeg"
import propic2 from "../../assets/aboutsectionimg/profileabout3.jpeg"
import aboutmain from "../../assets/aboutsectionimg/aboutmain.png"
import aboutmain2 from "../../assets/aboutsectionimg/aboutmain2.png"

const AboutSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-slate-50 overflow-hidden relative">
      
      {/* Light Decorative Background */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-50/50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 2xl:px-16">
        
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* Left Side: Compact & Beautiful Image Composition */}
          <div className="w-full lg:w-1/2 relative px-4 sm:px-8 lg:px-0 mt-6 lg:mt-0">
            
            <div className="relative max-w-lg mx-auto lg:max-w-none lg:ml-auto lg:mr-8">
              {/* Sleek Dark Accent Behind */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-3/4 h-3/4 bg-slate-900 rounded-[2rem] z-0 opacity-95"></div>
              
              {/* Main Image */}
              <div className="rounded-[2rem] overflow-hidden shadow-xl border-4 border-white relative z-10 w-full bg-slate-100">
                <img 
                  src={aboutmain}
                  alt="Professional Service Team" 
                  className="w-full h-[350px] sm:h-[450px] object-cover"
                />
              </div>

              {/* Smaller Overlapping Image */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-1/2 rounded-[1.5rem] overflow-hidden shadow-2xl border-[4px] sm:border-[6px] border-white z-20 bg-slate-100">
                <img 
                  src={aboutmain2}
                  className="w-full h-40 sm:h-48 object-cover"
                  alt="Service Detail"
                />
              </div>

              {/* Floating Badge (FIXED VISIBILITY) */}
              <div className="absolute top-1/2 -left-6 sm:-left-12 -translate-y-1/2 bg-white p-4 sm:p-5 rounded-2xl shadow-xl z-30 flex items-center gap-4 animate-bounce-slow border border-slate-100">
                {/* Changed to Vibrant Green Background with White Icon */}
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/30">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none mb-1">10+</h4>
                  <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide">Years Exp.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Tightly Packed Content */}
          <div className="w-full lg:w-1/2 mt-16 lg:mt-0 relative z-10">
            
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white font-semibold text-xs sm:text-sm mb-5 shadow-md">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="tracking-wide">About TRICKSY</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-[1.2] tracking-tight">
              We Provide The Best <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">
                Home Maintenance
              </span> Solutions
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 mb-6 leading-relaxed font-light max-w-xl">
              TRICKSY is your premium destination for home and office maintenance. From deep cleaning to expert repairs, our certified professionals ensure your space remains pristine.
            </p>

            {/* Key Features - (FIXED VISIBILITY) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
              {[
                "100% Satisfaction",
                "Verified Professionals",
                "Transparent Pricing",
                "24/7 Support"
              ].map((text, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-colors">
                  {/* Changed to Black Circle with Bright Green Icon for maximum contrast */}
                  <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center shrink-0 shadow-md">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[14px] sm:text-[15px] font-bold text-slate-800">{text}</span>
                </div>
              ))}
            </div>

            {/* Action Area */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-slate-200/60">
              
              {/* Vibrant Green Button */}
              <button className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-7 py-3.5 sm:py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-green-500/30 text-[15px] hover:-translate-y-1">
                More About Us
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Trust Indicator */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <img src={propic} alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
                  <img src={propic1} alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
                  <img src={propic2} alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                    5k+
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-extrabold text-slate-900 leading-none mb-0.5">Happy</span>
                  <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wide">Customers</span>
                </div>
              </div>
              
            </div>

          </div>
        </div>
      </div>
      
      {/* Custom Animations */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-3%); }
          50% { transform: translateY(3%); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;