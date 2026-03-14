import React from 'react';
import { Phone, Calendar, Sparkles, ArrowRight, Shield } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-slate-50 relative overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 2xl:px-24">

        {/* Main CTA Card - The Perfect Mix of White, Black, and Green */}
        <div className="relative bg-white rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-200 flex flex-col lg:flex-row">

          {/* Left Side: Clean White Background with Black & Green Text */}
          <div className="relative z-10 w-full lg:w-[55%] px-8 py-16 sm:px-12 lg:py-24 lg:pl-20 xl:pl-24 flex flex-col justify-center text-center lg:text-left">

            {/* Subtle Badge */}
            <div className="mx-auto lg:mx-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-sm mb-8">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span>We Are Ready To Help</span>
            </div>

            {/* Headline - Black & Green Mix */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 mb-6 leading-[1.15] tracking-tight">
              Need Professional <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-500">
                Cleaning & Repairs?
              </span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Book your service today and experience top-notch quality from our certified expert team. Your flawless space is just a click away.
            </p>
          </div>

          {/* Right Side: Sleek Black Background with Green Accents */}
          <div className="relative z-10 w-full lg:w-[45%] bg-slate-900 p-10 sm:p-16 lg:p-20 flex flex-col items-center justify-center overflow-hidden">
            
            {/* Glowing Green Orb behind the buttons */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] bg-primary-500/20 rounded-full mix-blend-screen filter blur-[80px] pointer-events-none"></div>

            <div className="relative z-20 flex flex-col gap-5 w-full max-w-sm">
              
              {/* Primary Action Button: Vibrant Green */}
              <button className="group flex items-center justify-between w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white px-8 py-5 rounded-2xl font-bold transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] text-[17px] hover:-translate-y-1">
                <span className="flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </button>

              {/* Secondary Action Button: Pure White */}
              <button className="group flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 px-8 py-5 rounded-2xl font-bold transition-all duration-300 text-[17px] hover:-translate-y-1 shadow-lg">
                <Phone className="w-5 h-5 text-primary-600 transition-transform group-hover:scale-110" />
                Call Us Now
              </button>
            </div>

            {/* Trust Indicator / Guarantee */}
            <p className="relative z-20 mt-10 text-sm text-slate-400 font-medium flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-primary-500" />
              100% Satisfaction Guaranteed
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CtaSection;