import React from 'react';

const TechnicalHero = ({
  badgeText = 'Precision Squad',
  titlePart1 = 'TECHNICAL',
  titleAccent = 'EXPERTS.',
  description = 'From emergency repairs to bespoke installations, we handle the technical heavy lifting for your home.',
  bgImage
}) => {
  return (
    <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden bg-zinc-950 pt-20">
      <div className="absolute inset-0 z-0">
        {bgImage && (
          <img 
            src={bgImage} 
            alt="Technical Hero Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-50" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/60 to-zinc-950"></div>
      </div>
      <div className="relative z-10 text-center px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em]">{badgeText}</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter mb-4">
          {titlePart1} <span className="text-emerald-500">{titleAccent}</span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
};

export default TechnicalHero;