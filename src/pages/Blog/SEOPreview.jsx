import React from 'react';
import { Search, Share2, Image as ImageIcon } from 'lucide-react';

const SEOPreview = ({ title, description, image, url = 'https://www.tricksy.com', pagePath = '' }) => {
  const fullUrl = `${url} ${pagePath ? `› ${pagePath}` : ''}`;
  const displayTitle = title || 'Enter a meta title';
  const displayDesc = description || 'Enter a meta description to see how it will look on search engines.';

  return (
    <div className="w-full max-w-[650px] space-y-12">
      
      {/* 1. GOOGLE PREVIEW */}
      <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-zinc-200/50 border border-zinc-100">
        <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 pb-4">
           <Search className="text-[#4285F4]" size={20} />
           <h3 className="text-lg font-black text-zinc-950">Google Search Result</h3>
        </div>
     
        <div className="max-w-[600px] font-sans">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 bg-zinc-100 rounded-full flex items-center justify-center font-black text-xs text-emerald-600">T</div>
            <div className="flex flex-col">
              <span className="text-sm text-[#202124] leading-tight font-medium">TRICKSY</span>
              <span className="text-xs text-[#4d5156] leading-tight">{fullUrl}</span>
            </div>
          </div>
          <h3 className="text-xl text-[#1a0dab] group-hover:underline cursor-pointer mb-1 leading-tight truncate">
            {displayTitle}
          </h3>
          <p className="text-sm text-[#4d5156] leading-snug line-clamp-2">
            {displayDesc}
          </p>
        </div>
      </div>

      {/* 2. SOCIAL PREVIEW (Twitter/LinkedIn) */}
      <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-zinc-200/50 border border-zinc-100">
        <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 pb-4">
           <Share2 className="text-indigo-500" size={20} />
           <h3 className="text-lg font-black text-zinc-950">Social Media Share Card</h3>
        </div>
        
        <div className="max-w-[500px] border border-zinc-200 rounded-2xl overflow-hidden cursor-pointer hover:bg-zinc-50 transition-colors shadow-sm">
          <div className="w-full h-[260px] bg-zinc-100 border-b border-zinc-200 overflow-hidden relative">
            {image ? (
              <img src={image} alt="Social Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400 bg-zinc-50">
                <ImageIcon size={40} />
              </div>
            )}
          </div>
          <div className="p-4 bg-[#f8f9fa]">
            <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-bold mb-1 block">
              tricksy.com
            </span>
            <h4 className="text-[15px] font-bold text-zinc-950 leading-tight mb-1 truncate">
              {displayTitle}
            </h4>
            <p className="text-[13px] text-zinc-500 line-clamp-1">
              {displayDesc}
            </p>
          </div>
        </div>
        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-4 text-center">
          Preview for X (Twitter), LinkedIn & Facebook
        </p>
      </div>

    </div>
  );
};

export default SEOPreview;