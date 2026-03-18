import React from 'react';
import { Star, CheckCircle2, ArrowUpRight } from 'lucide-react'; 
import googlelogo from "../../assets/Google.webp"
import reviewpic1 from "../../assets/aboutsectionimg/profileabout.jpeg";
import reviewpic2 from "../../assets/aboutsectionimg/profileabout2.jpeg";

const GoogleReviews = ({ reviewsData }) => {
  const defaultReviews = [
    {
      id: 1,
      author: "Omar Al-Sayed",
      time: "2 days ago",
      text: "Best maintenance team in Dubai. Fixed my AC in 30 mins! Super professional and polite staff.",
      rating: 5,
      avatar: reviewpic1 
    },
    {
      id: 2,
      author: "Jessica M.",
      time: "1 week ago",
      text: "Highly recommend for deep cleaning. Every corner was spotless. Worth every dirham!",
      rating: 5,
      avatar: reviewpic2 
    }
  ];

  const reviewsToDisplay = Array.isArray(reviewsData) && reviewsData.length > 0 ? reviewsData : defaultReviews;

  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-12 w-full">
        
        {/* Main Card */}
        <div className="bg-slate-50 rounded-[2.5rem] p-6 md:p-10 flex flex-col lg:flex-row items-center gap-10">
          
          {/* Left side */}
          <div className="w-full lg:w-1/3 text-center lg:text-left space-y-4 lg:border-r border-slate-200 lg:pr-10">
            <div className="flex justify-center lg:justify-start">
              <img src={googlelogo} alt="Google" loading="lazy" className="w-12 h-12 mb-2 object-contain" />
            </div>
            <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">Excellent</h3>
            <div className="flex items-center justify-center lg:justify-start gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[#FBBC05] text-[#FBBC05]" />
              ))}
            </div>
            <p className="text-slate-500 text-sm font-bold">
              Based on <span className="text-slate-900 underline underline-offset-2">482 reviews</span>
            </p>
            <button 
              onClick={(e) => { e.preventDefault(); console.log("Write review clicked"); }}
              className="flex items-center gap-2 text-primary-600 font-black text-[11px] uppercase tracking-widest hover:gap-3 transition-all mx-auto lg:mx-0 mt-2"
            >
              Write a review <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right*/}
          <div className="w-full lg:w-2/3 grid sm:grid-cols-2 gap-4">
            {reviewsToDisplay.map((rev, index) => (
              <div key={rev?.id || index} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3 items-center">
                      <img src={rev?.avatar || reviewpic1} loading="lazy" className="w-10 h-10 rounded-full object-cover" alt={rev?.author || "User"} />
                      <div>
                        <h4 className="text-sm font-black text-slate-900 flex items-center gap-1">
                          {rev?.author || "Verified Customer"} <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" />
                        </h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{rev?.time || "Recently"}</p>
                      </div>
                    </div>
                    <img src={googlelogo} alt="Google" loading="lazy" className="w-5 h-5 opacity-80 object-contain" />
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    "{rev?.text || "Great service, highly recommended!"}"
                  </p>
                </div>
                
                <div className="mt-5 flex gap-0.5">
                  {[...Array(rev?.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Small Trust Bar */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="font-black text-xl tracking-tighter italic">TRUSTED BY DUBAI'S BEST</span>
          <div className="h-4 w-px bg-slate-400 hidden md:block" />
          <span className="text-xs font-bold uppercase tracking-widest">Property Finder Approved</span>
          <span className="text-xs font-bold uppercase tracking-widest">Dubai Municipality Certified</span>
        </div>

      </div>
    </section>
  );
};

export default GoogleReviews;