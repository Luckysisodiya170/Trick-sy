import React from 'react';
import { ShieldCheck, Star, Users } from 'lucide-react';

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
        <section className="relative mt-0 pt-16 lg:pt-20 pb-16 lg:pb-24 bg-black overflow-hidden flex items-center h-fit min-h-[500px] lg:min-h-[650px]">
            {/* Background Layer */}
            <img
                src={bgImage}
                alt="Tricksy Premium Clean Space"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-black/70"></div>

            <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-7 space-y-5 lg:space-y-7 text-left">
                        
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-sm">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-emerald-500 font-black text-[9px] lg:text-[10px] uppercase tracking-[0.2em]">
                                {badgeText}
                            </span>
                        </div>

                        {/* Responsive Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                            {mainTitle} <br />
                            <span className="text-emerald-500 relative inline-block mt-1">
                                {highlightTitle}
                                <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                                </svg>
                            </span>
                        </h1>

                        <p className="text-zinc-300 text-sm lg:text-base max-w-xl font-medium leading-relaxed opacity-90">
                            {subtext}
                        </p>

                        {/* 🟢 SMALLER BADGES ROW 🟢 */}
                        <div className="flex flex-row items-center gap-3 lg:gap-4 pt-2 w-full max-w-lg overflow-hidden">
                            
                            {/* Expert Badge */}
                            <div className="flex flex-1 items-center gap-2.5 bg-white p-2.5 lg:p-3 pr-4 lg:pr-6 rounded-xl shadow-lg border border-zinc-100 min-w-0">
                                <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                    <ShieldCheck className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-500" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-zinc-950 font-black text-[9px] lg:text-[11px] uppercase tracking-wide truncate">Certified Experts</p>
                                    <p className="text-zinc-500 text-[8px] lg:text-[9px] font-medium mt-0.5 truncate">Vetted Professionals</p>
                                </div>
                            </div>

                            {/* Rating Badge */}
                            <div className="flex flex-1 items-center gap-2.5 bg-white p-2.5 lg:p-3 pr-4 lg:pr-6 rounded-xl shadow-lg border border-zinc-100 min-w-0">
                                <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-100">
                                    <Star className="w-4 h-4 lg:w-5 lg:h-5 text-amber-500" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-zinc-950 font-black text-[9px] lg:text-[11px] uppercase tracking-wide truncate">Top Rated</p>
                                    <p className="text-zinc-500 text-[8px] lg:text-[9px] font-medium mt-0.5 truncate">4.9/5 User Rating</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT SIDE CARD */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end mt-10 lg:mt-0">
                        <div className="relative w-full max-w-[280px] lg:max-w-[320px]">
                            <div className="absolute top-3 left-3 lg:top-4 lg:left-4 w-full h-full bg-emerald-500 rounded-[2.5rem]"></div>
                            <div className="relative bg-white border border-zinc-100 p-8 lg:p-10 rounded-[2.5rem] text-center shadow-2xl">
                                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                                    <Users className="w-7 h-7 lg:w-8 lg:h-8 text-emerald-500" />
                                </div>
                                <h3 className="text-5xl lg:text-6xl font-black text-zinc-950 mb-1">10+</h3>
                                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[9px] lg:text-[10px] mb-6">Years of Legacy</p>
                                <div className="flex justify-center items-center -space-x-3 lg:-space-x-4 mb-6">
                                    {avatars.map((imgSrc, i) => (
                                        <img key={i} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-4 border-white bg-zinc-100 object-cover relative z-10 shadow-sm" src={imgSrc} alt={`team-avatar-${i}`} />
                                    ))}
                                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-4 border-white bg-zinc-950 flex items-center justify-center text-[9px] lg:text-xs font-black text-white relative z-20">+5k</div>
                                </div>
                                <div className="inline-block px-4 py-1.5 bg-emerald-50 rounded-xl border border-emerald-100">
                                    <p className="text-emerald-600 font-black text-[8px] lg:text-[9px] tracking-widest uppercase">Trusted by Families</p>
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