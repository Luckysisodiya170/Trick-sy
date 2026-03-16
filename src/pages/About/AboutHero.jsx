import React from 'react';
import { ShieldCheck, Star, Users } from 'lucide-react';

// 🔥 PRODUCTION RULE: Imported Local Images for Avatars
import avatar1 from "../../assets/aboutsectionimg/profileabout.jpeg"; 
import avatar2 from "../../assets/aboutsectionimg/profileabout2.jpeg"; 
import avatar3 from "../../assets/aboutsectionimg/profileabout3.jpeg"; 

const AboutHero = ({ 
  badgeText = "Established 2014", 
  mainTitle = "The Team That", 
  highlightTitle = "Perfects Your Space.",
  subtext = "We’re not just a service company; we’re your partners in maintaining a lifestyle of comfort and uncompromising hygiene." 
}) => {

  // Local images ka array
  const avatars = [avatar1, avatar2, avatar3];

  return (
    // Compact Height (py-12 lg:py-16) so it fits without scrolling
    <section className="relative mt-[72px] lg:mt-[80px] py-12 lg:py-16 bg-zinc-950 overflow-hidden">
      
      {/* Crisp Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, backgroundSize: '48px 48px' }}
      ></div>

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7">
            
            {/* Solid Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-zinc-300 font-bold text-[10px] uppercase tracking-[0.2em]">
                {badgeText}
              </span>
            </div>

            {/* Compact Heading */}
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-4">
              {mainTitle} <br />
              <span className="text-emerald-500">
                {highlightTitle}
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-zinc-400 text-base lg:text-lg max-w-xl font-medium leading-relaxed mb-8">
              {subtext}
            </p>

            {/* Bottom Info Cards */}
            <div className="flex flex-wrap gap-8 border-t border-zinc-800 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Certified Experts</p>
                  <p className="text-zinc-500 text-xs font-medium mt-0.5">Vetted Professionals</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800">
                  <Star className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Top Rated</p>
                  <p className="text-zinc-500 text-xs font-medium mt-0.5">4.9/5 User Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE CARD */}
          <div className="hidden lg:col-span-5 lg:flex justify-end">
             <div className="relative w-full max-w-[380px]">
                
                {/* Solid Offset Box */}
                <div className="absolute top-3 left-3 w-full h-full bg-emerald-500 rounded-[2rem]"></div>
                
                <div className="relative bg-zinc-900 border-2 border-zinc-800 p-8 rounded-[2rem] text-center transform hover:-translate-y-1 transition-transform duration-300">
                   
                   <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-5 border-4 border-zinc-900">
                      <Users className="w-8 h-8 text-white" />
                   </div>
                   
                   <h3 className="text-5xl font-black text-white mb-1">10+</h3>
                   <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] mb-6">Years of Legacy</p>
                   
                   {/* Local Avatars Grid */}
                   <div className="flex justify-center items-center -space-x-3 mb-5">
                      {avatars.map((imgSrc, i) => (
                        <img 
                          key={i} 
                          className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 object-cover relative z-10" 
                          src={imgSrc} 
                          alt={`team-avatar-${i}`} 
                          loading="lazy"
                        />
                      ))}
                      {/* Premium +5k Badge inside avatar stack */}
                      <div className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-emerald-500 flex items-center justify-center text-[10px] font-black text-white relative z-20">
                        +5k
                      </div>
                   </div>
                   
                   <div className="inline-block px-3 py-1.5 bg-zinc-950 rounded-md border border-zinc-800">
                     <p className="text-emerald-500 font-bold text-[10px] tracking-widest uppercase">Trusted by Families</p>
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