import React from 'react';
import { Linkedin, Twitter, Mail, ArrowUpRight, CheckCircle2 } from 'lucide-react';

// 🔥 LOCAL ASSETS IMPORTED
import member1 from "../../assets/aboutsectionimg/profileabout.jpeg"; 
import member2 from "../../assets/aboutsectionimg/profileabout2.jpeg"; 
import member3 from "../../assets/aboutsectionimg/profileabout3.jpeg"; 

const AboutTeam = ({ teamTitle = "Meet The", teamHighlight = "Masterminds", teamData }) => {
  
  // Default data with a short bio added for a complete professional look
  const defaultTeam = [
    { 
      name: "Saurabh Sharma", 
      role: "Founder & CEO", 
      bio: "Visionary leader with 10+ years in home maintenance tech.",
      img: member1,
      socials: { linkedin: "#", twitter: "#", mail: "saurabh@tricksy.com" }
    },
    { 
      name: "John Doe", 
      role: "Head of Operations", 
      bio: "Ensuring flawless execution and extreme customer satisfaction.",
      img: member2,
      socials: { linkedin: "#", twitter: "#", mail: "john@tricksy.com" }
    },
    { 
      name: "Priya Patel", 
      role: "Quality Assurance", 
      bio: "Strictly maintaining our 100% hygiene and safety protocols.",
      img: member3,
      socials: { linkedin: "#", mail: "priya@tricksy.com" }
    }
  ];

  const team = Array.isArray(teamData) && teamData.length > 0 ? teamData : defaultTeam;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none -mt-40 -mr-40"></div>

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-800 font-bold text-[10px] uppercase tracking-[0.3em]">Our Leadership</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-6">
            {teamTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-500">{teamHighlight}</span>
          </h2>
          <p className="text-slate-500 max-w-2xl text-lg font-medium leading-relaxed">
            A world-class team of certified professionals dedicated to bringing perfection to your space.
          </p>
        </div>

        {/* Team Grid - Clean Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((member, i) => (
            <div 
              key={i} 
              className="group p-3 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 transition-all duration-500"
            >
              {/* Image Framed Container */}
              <div className="relative h-[320px] rounded-[2rem] overflow-hidden bg-slate-100">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Subtle Inner Shadow & Badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider">Verified</span>
                </div>
              </div>

              {/* Text & Details Container */}
              <div className="p-6">
                <p className="text-primary-600 text-[11px] font-black uppercase tracking-[0.2em] mb-2">
                  {member.role}
                </p>
                <h4 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {member.name}
                </h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 line-clamp-2">
                  {member.bio}
                </p>

                {/* Divider */}
                <div className="w-full h-[1px] bg-slate-100 mb-6"></div>

                {/* Social Links & Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {member.socials?.linkedin && (
                      <a href={member.socials.linkedin} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials?.twitter && (
                      <a href={member.socials.twitter} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-sky-50 hover:text-sky-500 transition-colors">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials?.mail && (
                      <a href={`mailto:${member.socials.mail}`} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <button className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-primary-500 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                     <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* Footer CTA - High Contrast Dark Banner */}
        <div className="mt-24 p-2 rounded-[3rem] bg-slate-900 shadow-2xl relative overflow-hidden group">
           {/* Decorative abstract lines inside banner */}
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-400 via-transparent to-transparent"></div>
           
           <div className="bg-[#050A15] rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 border border-slate-800">
             <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500 text-primary-300 font-bold text-[10px] uppercase tracking-widest mb-4">
                  We are Hiring
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-3">Join the A-Team</h3>
                <p className="text-slate-400 font-medium text-lg">We’re always looking for visionary leaders to join us.</p>
             </div>
             
             <button className="whitespace-nowrap px-8 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-primary-500 hover:text-white hover:-translate-y-1 transition-all shadow-xl shadow-white/10 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                Explore Careers <ArrowUpRight className="w-4 h-4" />
             </button>
           </div>
        </div>

      </div>
    </section>
  );
};

export default AboutTeam;