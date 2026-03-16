import React from 'react';
import { Sparkles } from 'lucide-react'; // Default icon

const SectionHeader = ({ 
  tagText, 
  titlePart1, 
  titleHighlight, 
  titlePart2 = "", 
  description,
  alignment = "center", // "center" ya "left" ho sakta hai
  icon: Icon = Sparkles // Default icon Sparkles rahega
}) => {
  
  // Alignment ke hisaab se classes
  const alignClasses = alignment === "center" 
    ? "flex flex-col items-center text-center mx-auto" 
    : "flex flex-col items-start text-left";

  return (
    <div className={`max-w-3xl mb-12 lg:mb-16 ${alignClasses}`}>
      
      {/* Top Pill / Badge */}
      {tagText && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-800 font-bold text-[10px] sm:text-[11px] mb-4 shadow-sm uppercase tracking-widest">
          <Icon className="w-3.5 h-3.5 text-primary-500" />
          {tagText}
        </div>
      )}
      
      {/* Main Bold Heading */}
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-4 lg:mb-6">
        {titlePart1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-500">{titleHighlight}</span> {titlePart2}
      </h2>
      
      {/* Subtitle Description */}
      {description && (
        <p className="text-sm sm:text-base lg:text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
      
    </div>
  );
};

export default SectionHeader;