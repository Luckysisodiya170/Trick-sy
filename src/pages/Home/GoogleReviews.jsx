import React from 'react';
import { Star, CheckCircle2, ArrowUpRight } from 'lucide-react';

const GoogleReviews = () => {
  const googleReviews = [
    {
      id: 1,
      author: "Omar Al-Sayed",
      time: "2 days ago",
      text: "Best maintenance team in Dubai. Fixed my AC in 30 mins! Super professional and polite staff.",
      rating: 5,
      avatar: "https://i.pravatar.cc/100?img=11"
    },
    {
      id: 2,
      author: "Jessica M.",
      time: "1 week ago",
      text: "Highly recommend for deep cleaning. Every corner was spotless. Worth every dirham!",
      rating: 5,
      avatar: "https://i.pravatar.cc/100?img=5"
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Review Card - Modern & Compact */}
        <div className="bg-slate-50 rounded-[2.5rem] p-4 md:p-8 flex flex-col lg:flex-row items-center gap-10">
          
          {/* Left: Google Trust Score */}
          <div className="w-full lg:w-1/3 text-center lg:text-left space-y-3 lg:border-r border-slate-200 lg:pr-10">
            <div className="flex justify-center lg:justify-start">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Color_Icon.svg" 
                alt="Google" 
                className="w-10 h-10 mb-2"
              />
            </div>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Excellent</h3>
            <div className="flex items-center justify-center lg:justify-start gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FBBC05] text-[#FBBC05]" />
              ))}
            </div>
            <p className="text-slate-500 text-sm font-bold">
              Based on <span className="text-slate-900 underline">482 reviews</span>
            </p>
            <button className="flex items-center gap-2 text-primary-600 font-black text-[10px] uppercase tracking-widest hover:gap-3 transition-all mx-auto lg:mx-0">
              Write a review <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Floating Reviews (Fills the space perfectly) */}
          <div className="w-full lg:w-2/3 grid md:grid-cols-2 gap-4">
            {googleReviews.map((rev) => (
              <div key={rev.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-3 items-center">
                      <img src={rev.avatar} className="w-10 h-10 rounded-full" alt="" />
                      <div>
                        <h4 className="text-sm font-black text-slate-900 flex items-center gap-1">
                          {rev.author} <CheckCircle2 className="w-3 h-3 text-blue-500 fill-blue-500/10" />
                        </h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{rev.time}</p>
                      </div>
                    </div>
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Color_Icon.svg" 
                      className="w-4 h-4" 
                      alt="" 
                    />
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-snug">
                    "{rev.text}"
                  </p>
                </div>
                
                <div className="mt-4 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Small Trust Bar below - kills extra white space */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-8 opacity-40 grayscale hover:grayscale-0 transition-all">
          <span className="font-black text-xl tracking-tighter italic">TRUSTED BY DUBAI'S BEST</span>
          <div className="h-4 w-px bg-slate-300 hidden md:block" />
          <span className="text-xs font-bold uppercase tracking-widest">Property Finder Approved</span>
          <span className="text-xs font-bold uppercase tracking-widest">Dubai Municipality Certified</span>
        </div>

      </div>
    </section>
  );
};

export default GoogleReviews;