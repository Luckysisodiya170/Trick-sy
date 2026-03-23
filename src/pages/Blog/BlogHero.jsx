import React from 'react';

const BlogHero = ({
  badgeText = "Tricksy Insights",
  titlePart1 = "Tips, News &",
  titleAccent = "Guides.",
  paragraphText = "Expert advice on keeping your home and office spotless. Read our latest articles to learn the secrets of professional maintenance."
}) => {
  return (
    <section className="bg-zinc-950 py-20 lg:py-28 relative overflow-hidden border-b-[8px] border-emerald-500">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
      
      <div className="w-full max-w-[1280px] mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 mb-6">
           <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
           <span className="text-zinc-300 font-bold text-xs uppercase tracking-[0.2em]">{badgeText}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-6">
          {titlePart1} <span className="text-emerald-500">{titleAccent}</span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          {paragraphText}
        </p>
      </div>
    </section>
  );
};

export default BlogHero;