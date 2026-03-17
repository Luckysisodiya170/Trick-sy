// src/pages/Contact/ContactHero.jsx
import React from 'react';

// 🔥 IMPORT YOUR LOCAL IMAGE HERE
// Make sure this path is correct based on your folder structure!
import contactImage from '../../assets/contact/contact.png';
// Pure JavaScript component with default props (Dynamic & Safe)
const ContactHero = ({
  badgeText = 'Contact tricksy',
  titlePart1 = 'Premium Care',
  titleAccent = 'Your Space.',
  paragraphText = 'Need a personalized quote or have a query? We are here to provide 5-star maintenance support. Reach us within minutes.'
}) => {
  return (
    <section className="relative pt-24 pb-40 overflow-hidden bg-zinc-950">
      
      {/* 🟢 Dynamic Local Asset Background Image */}
      <img
        src={contactImage}
        alt="Tricksy Contact Page Hero Background"
        // 🔥 Image opacity badha di hai (20 se 40 kar di) taaki image zyada clear dikhe
        className="absolute inset-0 w-full h-full object-cover opacity-40" 
      />
      
      {/* 🔥 Gradient ko thoda light kar diya hai (950/70 instead of full 950) */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/50 to-transparent"></div>

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
           <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
           <span className="text-zinc-300 font-bold text-xs uppercase tracking-[0.2em]">{badgeText}</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-white leading-[1.05] tracking-tighter mb-6">
          {titlePart1}<br/> for <span className="text-emerald-500">{titleAccent}</span>
        </h1>
        <p className="text-zinc-300 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
          {paragraphText}
        </p>
      </div>
    </section>
  );
};

export default ContactHero;