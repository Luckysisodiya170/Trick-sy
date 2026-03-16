import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

// 🔥 PRODUCTION RULE 1: Local Image Imports (Safe Fallbacks)
import reviewpic1 from "../../assets/aboutsectionimg/profileabout.jpeg";
import reviewpic2 from "../../assets/aboutsectionimg/profileabout2.jpeg";
import reviewpic3 from "../../assets/aboutsectionimg/profileabout3.jpeg";

// 🔥 PRODUCTION RULE 2: Accept dynamic data via props
const Testimonials = ({ testimonialsData }) => {
  
  // Default Data (Fallback agar API data na de)
  const defaultReviews = [
    {
      id: 1, name: 'Ahmed Khan', role: 'Villa Owner',
      comment: 'Absolutely brilliant service. The team arrived on time and my villa looks spotless. Highly recommended!',
      image: reviewpic1, rating: 5
    },
    {
      id: 2, name: 'Sarah W.', role: 'Office Manager',
      comment: 'TRICKSY transformed our workspace. We love that they use eco-friendly products. Will be booking monthly.',
      image: reviewpic2, rating: 5
    },
    {
      id: 3, name: 'Rahul Sharma', role: 'Property Head',
      comment: 'Unmatched quality! I manage 10+ properties in Dubai and TRICKSY is my go-to for all maintenance.',
      image: reviewpic3, rating: 5
    }
  ];

  // 🔥 PRODUCTION RULE 3: Defensive Array Check
  const displayReviews = Array.isArray(testimonialsData) && testimonialsData.length > 0 ? testimonialsData : defaultReviews;

  return (
    // Height aur padding ko control kiya hai taaki ek screen par fit aaye
    <section className="py-12 lg:py-16 bg-white border-y border-slate-50">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-12 w-full">
        
        {/* 🔥 HEADING IN THE CENTER (Beech Mein) 🔥 */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 border border-primary-100 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Verified Client Stories</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-4">
            Real People. <span className="text-primary-500">Real Results.</span>
          </h2>
          
          <p className="text-sm text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
            Don't just take our word for it. See why 5,000+ property owners trust the TRICKSY standard for cleaning and repairs.
          </p>
        </div>

        {/* 3 Cards, 1 Single Row (No Scroll Design) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 🔥 PRODUCTION RULE 4: .slice(0, 3) ensures UI never breaks even if backend sends 100 reviews */}
          {displayReviews.slice(0, 3).map((item, idx) => (
            <div 
              key={item?.id || `testimonial-${idx}`} // Safe Key
              // Beech wala card thoda highlight hoga (Dark theme)
              className={`relative p-6 lg:p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-1 ${
                idx === 1 
                ? 'bg-slate-900 text-white border-slate-800 shadow-xl shadow-slate-900/10' 
                : 'bg-slate-50 border-slate-100 hover:shadow-lg hover:border-primary-200'
              }`}
            >
               <Quote className={`absolute top-6 right-6 w-6 h-6 opacity-20 ${idx === 1 ? 'text-white' : 'text-primary-500'}`} />
               
               <div className="flex gap-1 mb-5">
                {/* Dynamic rating support added */}
                {[...Array(item?.rating || 5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]`} />
                ))}
              </div>
              
              {/* Safe Text Rendering */}
              <p className={`text-sm font-bold leading-relaxed mb-6 ${idx === 1 ? 'text-slate-200' : 'text-slate-600'}`}>
                "{item?.comment || 'Excellent service and great team!'}"
              </p>
              
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-current" style={{ borderColor: idx === 1 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>
                {/* Safe Image Rendering */}
                <img 
                  src={item?.image || reviewpic1} 
                  loading="lazy" // Performance optimization
                  className="w-10 h-10 rounded-full object-cover border-2 border-transparent" 
                  alt={item?.name || "Customer"} 
                />
                <div>
                  <h4 className={`text-sm font-black ${idx === 1 ? 'text-white' : 'text-slate-900'}`}>
                    {item?.name || 'Happy Customer'}
                  </h4>
                  <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${idx === 1 ? 'text-primary-400' : 'text-slate-400'}`}>
                    {item?.role || 'Verified Client'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;