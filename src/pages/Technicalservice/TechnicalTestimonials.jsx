import React from 'react';
import { Star, Quote, BadgeCheck } from 'lucide-react';

import avatar1 from "../../assets/aboutsectionimg/profileabout.jpeg"; 
import avatar2 from "../../assets/aboutsectionimg/profileabout2.jpeg"; 
import avatar3 from "../../assets/aboutsectionimg/profileabout3.jpeg"; 

const TechnicalTestimonials = () => {
  const reviews = [
    {
      name: "Ahmed Al Maktoum",
      role: "Villa Owner, Emirates Hills",
      text: "The response time was incredible. Their electrical team diagnosed and fixed a complex short-circuit issue in my smart-home system within an hour. Highly professional.",
      rating: 5,
      highlight: true,
      image: avatar1 
    },
    {
      name: "Sarah Jenkins",
      role: "Operations Manager, DIFC",
      text: "We use Tricksy for all our office maintenance. From plumbing emergencies to AC servicing, their AMC package has saved us thousands. The technicians are always spotless.",
      rating: 5,
      highlight: false,
      image: avatar3 
    },
    {
      name: "Rahul Verma",
      role: "Resident, Downtown Dubai",
      text: "Booked them for a complete apartment repaint and wallpaper fixing. The precision and cleanliness were top-notch. They left the place cleaner than they found it!",
      rating: 5,
      highlight: false,
      image: avatar2 
    }
  ];

  return (
    <section className="py-32 px-6 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-[100%] pointer-events-none"></div>

      <div className="max-w-[1300px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
              <Star className="w-3 h-3 text-emerald-500 fill-emerald-500" />
              <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em]">Client Feedback</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              Verified <br />
              <span className="text-emerald-500 italic">Excellence_</span>
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest mb-1">Average Rating</p>
            <p className="text-4xl font-black text-white italic">4.9<span className="text-emerald-500 text-2xl">/5</span></p>
          </div>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className={`relative p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between ${
                review.highlight 
                  ? 'bg-gradient-to-br from-emerald-900/40 to-zinc-900 border border-emerald-500/30 shadow-2xl shadow-emerald-500/10' 
                  : 'bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-white/10'
              }`}
            >
              {/* Quote Mark */}
              <Quote className="absolute top-8 right-8 w-16 h-16 text-white/5 rotate-12" />

              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, index) => (
                    <Star key={index} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                
                <p className="text-zinc-300 text-lg leading-relaxed font-medium mb-10 relative z-10">
                  "{review.text}"
                </p>
              </div>

              {/* Client Info with Images */}
              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-emerald-500/50 overflow-hidden shrink-0 shadow-lg shadow-emerald-500/20">
                    <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-black text-white uppercase tracking-tight">{review.name}</h5>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{review.role}</p>
                  </div>
                </div>
                <BadgeCheck className="text-emerald-500 w-6 h-6 shrink-0" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechnicalTestimonials;