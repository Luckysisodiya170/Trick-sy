import React from 'react';
import { Target, Users, ShieldCheck, Heart, CheckCircle2 } from 'lucide-react';

import aboutMain from "../../assets/aboutsectionimg/aboutmain.png";

const AboutMission = ({ 
  title = "Quality You Can",
  highlight = "Trust Blindly.",
  description = "To provide the most reliable, high-tech, and professional home services through a team of certified experts.",
  statsData 
}) => {
  
  const defaultStats = [
    { label: "Founded", value: "2014", icon: <Target className="w-6 h-6" /> },
    { label: "Team Size", value: "150+", icon: <Users className="w-6 h-6" /> },
    { label: "Projects", value: "5k+", icon: <Heart className="w-6 h-6" /> },
    { label: "Cities", value: "12+", icon: <ShieldCheck className="w-6 h-6" /> },
  ];

  const stats = Array.isArray(statsData) && statsData.length > 0 ? statsData : defaultStats;

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute top-6 -left-6 w-full h-full0 rounded-[2rem] hidden sm:block"></div>
                        <div className="relative rounded-[2rem] overflow-hidden border-4 border-zinc-950 bg-zinc-100 z-10 h-[400px] sm:h-[500px]">
              <img 
                src={aboutMain} 
                alt="TRICKSY Mission Team" 
                loading="lazy"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              />
            </div>
            
            <div className="absolute -bottom-8 -right-8 hidden md:flex flex-col bg-zinc-950 text-white p-8 rounded-[2rem] border-4 border-zinc-800 z-20 w-[260px] transform hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                <span className="text-5xl font-black text-white">100%</span>
              </div>
              <p className="text-zinc-400 font-bold text-sm leading-snug mt-2 uppercase tracking-widest">
                Satisfaction <br/><span className="text-emerald-500">Guaranteed</span>
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 mb-6">
              <span className="w-2 h-2 rounded-full bg-zinc-950"></span>
              <span className="text-zinc-900 font-black text-[10px] uppercase tracking-[0.2em]">Our Mission</span>
            </div>

            <h2 className="text-5xl lg:text-7xl font-black text-zinc-950 leading-[1.05] tracking-tighter mb-6">
              {title} <br />
              <span className="text-emerald-500">{highlight}</span>
            </h2>
            
            <p className="text-zinc-500 text-lg font-medium leading-relaxed mb-12 max-w-lg">
              {description}
            </p>

            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="group p-6 bg-white border-2 border-zinc-200 hover:border-zinc-950 rounded-[1.5rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]"
                >
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 group-hover:bg-emerald-500 flex items-center justify-center text-zinc-950 group-hover:text-white transition-colors duration-300 mb-4 border border-zinc-200 group-hover:border-emerald-500">
                    {stat.icon}
                  </div>
                  
                  {/* Text Data */}
                  <p className="text-4xl font-black text-zinc-950 mb-1 leading-none">{stat.value}</p>
                  <p className="text-[11px] font-black text-zinc-500 uppercase tracking-widest mt-2 group-hover:text-emerald-600 transition-colors">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;