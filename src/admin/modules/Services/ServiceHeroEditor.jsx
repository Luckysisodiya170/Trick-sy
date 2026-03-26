import React, { useRef } from 'react';
import { 
  Type, AlignLeft, Upload, ShieldCheck, Clock, ThumbsUp, Star
} from 'lucide-react';

import defaultBg from "../../../assets/contact/contact.png"; 

const ServiceHeroEditor = ({ fullServiceData, setFullServiceData }) => {
  const fileInputRef = useRef(null);

  if (!fullServiceData) return <div className="p-10 text-center animate-pulse text-slate-400">Loading...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFullServiceData({
      ...fullServiceData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFullServiceData({
        ...fullServiceData,
        bgImage: imageUrl
      });
    }
  };

  const titleParts = (fullServiceData.title || "").split(' ');
  const mainTitle = titleParts[0] || "";
  const highlightTitle = titleParts.slice(1).join(' ') || "";

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      
      {/* LEFT SIDE: FORM */}
      <div className="w-full lg:w-[350px] shrink-0">
        <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
          
          <div className="mb-4 pb-3 border-b border-slate-200">
             <h2 className="text-base font-black text-slate-900 tracking-tight">Hero Content</h2>
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Manage banner details</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1 flex items-center gap-1.5">
                <Type size={10} /> Badge Text
              </label>
              <input 
                name="subtitle" 
                value={fullServiceData.subtitle || ""} 
                onChange={handleChange} 
                placeholder="e.g. Complete Sanitization" 
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-xs outline-none focus:border-emerald-400 transition-all shadow-sm" 
              />
            </div>
            
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1 flex items-center gap-1.5">
                <Type size={10} /> Service Title
              </label>
              <input 
                name="title" 
                value={fullServiceData.title || ""} 
                onChange={handleChange} 
                placeholder="e.g. Professional Deep Cleaning" 
                className="w-full px-3 py-1.5 bg-emerald-50/50 border border-emerald-100 rounded-lg font-black text-emerald-700 text-xs outline-none focus:border-emerald-300 transition-all shadow-sm" 
              />
              <p className="text-[8px] font-bold text-slate-400 mt-1 ml-1">First word white, rest emerald.</p>
            </div>
            
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1 flex items-center gap-1.5">
                <AlignLeft size={10} /> Short Description
              </label>
              <textarea 
                name="description" 
                rows="3" 
                value={fullServiceData.description || ""} 
                onChange={handleChange} 
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium outline-none resize-none focus:border-emerald-400 transition-all shadow-sm leading-relaxed" 
              />
            </div>

            <div className="pt-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1 flex items-center gap-1.5">
                <Upload size={10} /> Background Image
              </label>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
              <div onClick={() => fileInputRef.current.click()} className="w-full h-16 border-2 border-dashed border-slate-200 bg-white rounded-xl flex flex-col items-center justify-center group hover:border-emerald-400 transition-all cursor-pointer overflow-hidden relative shadow-sm">
                {fullServiceData.bgImage ? (
                  <>
                    <img src={fullServiceData.bgImage} className="w-full h-full object-cover opacity-60" alt="bg" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Change Image</div>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">Click to Upload</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE: LIVE PREVIEW */}
      <div className="flex-1 bg-slate-100 rounded-3xl overflow-hidden relative border-4 border-slate-200 shadow-inner h-[450px]">
         
         {/* Normal width aur bina kisi scale property ke perfect chota preview */}
         <div className="w-full h-full bg-slate-950 relative overflow-hidden pointer-events-none rounded-[1.2rem]">
            
            {/* Background Images & Overlay */}
            <div className="absolute inset-0 z-0">
              <img src={fullServiceData.bgImage || defaultBg} alt="Preview" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40"></div>
            </div>

            {/* Content Area */}
            <div className="relative z-10 px-6 py-8 flex items-center h-full">
              <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                {/* LEFT CONTENT */}
                <div className="md:col-span-7 text-left">
                  
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-sm backdrop-blur-md mb-4">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-500 font-black text-[9px] uppercase tracking-[0.2em]">
                      {fullServiceData.subtitle || "No Subtitle"}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tighter mb-4">
                    {mainTitle} <br />
                    <span className="text-emerald-500 relative inline-block mt-0.5">
                      {highlightTitle}
                      <svg className="absolute -bottom-1.5 left-0 w-full h-2 text-emerald-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                      </svg>
                    </span>
                  </h1>

                  <p className="text-zinc-300 text-xs max-w-sm font-medium leading-relaxed opacity-90 drop-shadow-md mb-6 line-clamp-3">
                    {fullServiceData.description || "Enter a description in the editor to see it here."}
                  </p>

                  {/* BADGES ROW */}
                  <div className="flex flex-row items-center gap-3 w-full max-w-md">
                    <div className="flex flex-1 items-center gap-2 bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/10">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-white font-black text-[9px] uppercase tracking-wide">Certified</p>
                        <p className="text-zinc-400 text-[8px] font-medium">Vetted Pros</p>
                      </div>
                    </div>

                    <div className="flex flex-1 items-center gap-2 bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/10">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                        <Clock className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-white font-black text-[9px] uppercase tracking-wide">Fast Resp.</p>
                        <p className="text-zinc-400 text-[8px] font-medium">Under 60 Mins</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE FLOATING CARD PREVIEW (Scaled Down natively) */}
                <div className="md:col-span-5 hidden md:flex justify-end">
                  <div className="relative w-full max-w-[200px]">
                    <div className="absolute top-2 left-2 w-full h-full bg-emerald-500 rounded-3xl"></div>
                    <div className="relative bg-white border border-zinc-100 p-6 rounded-3xl text-center shadow-2xl">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3 border border-emerald-100">
                        <ThumbsUp className="w-5 h-5 text-emerald-500" />
                      </div>
                      <h3 className="text-4xl font-black text-zinc-950 mb-1">4.9</h3>
                      <p className="text-zinc-500 font-bold uppercase tracking-widest text-[8px] mb-4 flex items-center justify-center gap-1">
                        <Star size={8} className="fill-amber-400 text-amber-400" /> Avg Rating
                      </p>
                      <div className="inline-block px-2 py-1 bg-emerald-50 rounded-lg border border-emerald-100">
                        <p className="text-emerald-600 font-black text-[7px] tracking-widest uppercase">Happy Customers</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

         </div>
      </div>

    </div>
  );
};

export default ServiceHeroEditor;