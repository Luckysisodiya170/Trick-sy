// src/pages/About/AboutHero.jsx
import React from 'react';
import { ShieldCheck, Star, Users } from 'lucide-react';

// 🔥 LOCAL ASSETS IMPORT
import avatar1 from "../../assets/aboutsectionimg/profileabout.jpeg"; 
import avatar2 from "../../assets/aboutsectionimg/profileabout2.jpeg"; 
import avatar3 from "../../assets/aboutsectionimg/profileabout3.jpeg"; 
import bgImage from "../../assets/contact/contact.png"; 

const AboutHero = ({ 
  badgeText = "Established 2014", 
  mainTitle = "The Team That", 
  highlightTitle = "Perfects Your Space.",
  subtext = "We’re not just a service company; we’re your partners in maintaining a lifestyle of comfort and uncompromising hygiene." 
}) => {

  const avatars = [avatar1, avatar2, avatar3];

  return (
    // Section container now black to anchor dark theme
    <section className="relative mt-[72px] lg:mt-[80px] py-16 lg:py-24 bg-black overflow-hidden">
      
      {/* 1. Full Opacity Background Image */}
      <img 
        src={bgImage} 
        alt="Tricksy Premium Clean Space" 
        className="absolute inset-0 w-full h-full object-cover" 
      />
      
      {/* 🟢 NEW DARK ELEMENT: Pure Black with Opacity Overlay */}
      {/* Old white gradient removed, pure black added for sophistication */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7">
            
            {/* Emerald Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-700 font-bold text-xs uppercase tracking-[0.2em]">
                {badgeText}
              </span>
            </div>

            {/* Heading: text-zinc-950 updated to white for dark contrast */}
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-6">
              {mainTitle} <br />
              <span className="text-emerald-500 relative">
                {highlightTitle}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-200" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg>
              </span>
            </h1>

            {/* Subtext: zinc-600 updated to zinc-300 for visibility */}
            <p className="text-zinc-300 text-lg max-w-xl font-medium leading-relaxed mb-10">
              {subtext}
            </p>

            {/* Bottom Info Cards (Pop-out Light Style against dark bg) */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-4 bg-white p-3 pr-6 rounded-2xl border border-zinc-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-zinc-950 font-black text-sm uppercase tracking-wide">Certified Experts</p>
                  <p className="text-zinc-500 text-xs font-medium mt-0.5">Vetted Professionals</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white p-3 pr-6 rounded-2xl border border-zinc-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100">
                  <Star className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-zinc-950 font-black text-sm uppercase tracking-wide">Top Rated</p>
                  <p className="text-zinc-500 text-xs font-medium mt-0.5">4.9/5 User Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE CARD (Pop-out Light Style) */}
          <div className="hidden lg:col-span-5 lg:flex justify-end relative">
             <div className="relative w-full max-w-[380px]">
                
                {/* Emerald Offset Shadow Box */}
                <div className="absolute top-4 left-4 w-full h-full bg-emerald-500 rounded-[2.5rem]"></div>
                
                {/* 🟢 FIX: Main right card now fully white against dark bg for pop */}
                <div className="relative bg-white border border-zinc-100 p-10 rounded-[2.5rem] text-center shadow-2xl transform hover:-translate-y-2 transition-transform duration-300">
                   
                   <div className="w-20 h-20 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-inner">
                      <Users className="w-10 h-10 text-emerald-500" />
                   </div>
                   
                   <h3 className="text-6xl font-black text-zinc-950 mb-2">10+</h3>
                   <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-8">Years of Legacy</p>
                   
                   {/* Local Avatars Grid */}
                   <div className="flex justify-center items-center -space-x-4 mb-6">
                      {avatars.map((imgSrc, i) => (
                        <img 
                          key={i} 
                          className="w-14 h-14 rounded-full border-4 border-white bg-zinc-100 object-cover relative z-10 shadow-sm hover:scale-110 transition-transform" 
                          src={imgSrc} 
                          alt={`team-avatar-${i}`} 
                          loading="lazy"
                        />
                      ))}
                      {/* Premium +5k Badge inside avatar stack (zinc-950 keeps standard) */}
                      <div className="w-14 h-14 rounded-full border-4 border-white bg-zinc-950 flex items-center justify-center text-xs font-black text-white relative z-20 shadow-sm">
                        +5k
                      </div>
                   </div>
                   
                   <div className="inline-block px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-100">
                     <p className="text-emerald-600 font-black text-[11px] tracking-widest uppercase">Trusted by Families</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutHero;