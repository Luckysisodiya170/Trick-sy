import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Type, Eye, ShieldCheck, Clock, 
  Upload, Settings2, Edit3, Columns, ThumbsUp, Star, AlignLeft, Monitor
} from 'lucide-react';

import { servicesData as initialData } from '../../../data/servicesData';
import defaultBg from "../../../assets/contact/contact.png"; // Replace with your generic default path

const ServiceHeroEditor = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [viewMode, setViewMode] = useState('split');
  const [isSaving, setIsSaving] = useState(false);
  const [heroData, setHeroData] = useState(null);

  // Load Initial Data
  useEffect(() => {
    const data = initialData[serviceId];
    if (data) {
      setHeroData({
        title: data.title || "",
        subtitle: data.subtitle || "",
        description: data.description || "",
        bgImage: null // Assuming we handle local preview images for edits
      });
    }
  }, [serviceId]);

  if (!heroData) return <div className="p-10 text-center font-black text-slate-400 uppercase tracking-widest text-xs animate-pulse">Loading Editor...</div>;

  // --- HANDLERS ---
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`Saved Hero for ${serviceId}:`, heroData);
    setIsSaving(false);
    alert('Service Hero Section Updated Successfully!');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setHeroData({ ...heroData, bgImage: imageUrl });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeroData(prev => ({ ...prev, [name]: value }));
  };

  // Dynamic Title Splitting for Preview
  const titleParts = heroData.title.split(' ');
  const mainTitle = titleParts[0] || "";
  const highlightTitle = titleParts.slice(1).join(' ') || "";

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20 flex flex-col h-screen overflow-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-3 lg:px-6 py-3 flex items-center justify-between shadow-sm gap-2 shrink-0">
        <div className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm lg:text-lg font-black tracking-tighter italic flex items-center gap-1.5">
            <Settings2 size={18} className="text-emerald-600 lg:w-5 lg:h-5" /> 
            <span className="tracking-tight uppercase">SERVICE HERO</span> 
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full flex-shrink-1 mx-2">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, 
             { id: 'split', icon: Columns, label: 'Split' }, 
             { id: 'preview', icon: Eye, label: 'Preview' }
          ].map((mode) => (
            <button 
              key={mode.id} 
              onClick={() => setViewMode(mode.id)} 
              className={`flex items-center gap-1.5 px-3 lg:px-5 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs font-bold transition-all whitespace-nowrap ${
                viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <mode.icon size={12} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className={`${viewMode === mode.id ? 'inline' : 'hidden sm:inline'}`}>{mode.label}</span>
            </button>
          ))}
        </div>

        <button onClick={handleSave} disabled={isSaving} className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-emerald-600 transition-all flex-shrink-0 active:scale-95 disabled:opacity-70 disabled:hover:bg-slate-900">
          <Save size={16} className="lg:w-[14px] lg:h-[14px]" /> 
          <span className="hidden md:inline">{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden relative">

        {/* --- EDITOR SIDE (Left Panel) --- */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-3xl mx-auto border-x' : 'w-full lg:w-[420px] border-r'} bg-white border-slate-200 flex flex-col h-full relative z-20 shadow-2xl shadow-slate-200/50 transition-all duration-300 shrink-0`}>
            
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 scrollbar-hide">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Service Hero</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage banner details</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1 block flex items-center gap-2">
                    <Type size={12} /> Badge Text
                  </label>
                  <input name="subtitle" value={heroData.subtitle} onChange={handleChange} placeholder="e.g. Complete Sanitization" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-emerald-400 focus:bg-white transition-all shadow-inner" />
                </div>
                
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1 block flex items-center gap-2">
                    <Type size={12} /> Service Title
                  </label>
                  <input name="title" value={heroData.title} onChange={handleChange} placeholder="e.g. Professional Deep Cleaning" className="w-full p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl font-black text-emerald-700 outline-none focus:bg-emerald-50 focus:border-emerald-300 transition-all shadow-inner" />
                  <p className="text-[9px] font-bold text-slate-400 mt-1 ml-1">First word will be white, rest emerald.</p>
                </div>
                
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1 block flex items-center gap-2">
                    <AlignLeft size={12} /> Short Description
                  </label>
                  <textarea name="description" rows="4" value={heroData.description} onChange={handleChange} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium outline-none resize-none focus:border-emerald-400 focus:bg-white transition-all shadow-inner leading-relaxed" />
                </div>

                {/* Background Image Upload */}
                <div className="pt-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block flex items-center gap-2">
                    <Upload size={12} /> Background Image
                  </label>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                  <div onClick={() => fileInputRef.current.click()} className="w-full h-32 lg:h-40 border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl flex flex-col items-center justify-center group hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer overflow-hidden relative">
                    {heroData.bgImage ? (
                      <>
                        <img src={heroData.bgImage} className="w-full h-full object-cover opacity-60" alt="bg" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">Change Image</div>
                      </>
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto text-slate-300 mb-2 group-hover:text-emerald-400 transition-colors" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">Upload Custom Cover</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'hidden lg:flex flex-1'} flex-col h-full bg-slate-100/50 relative transition-all duration-300`}>
            
            <div className="h-12 flex items-center justify-center gap-2 bg-white border-b border-slate-200 shadow-sm shrink-0">
              <Monitor size={14} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Output</span>
            </div>

            {/* Scrollable Preview Area */}
            <div className="flex-1 overflow-y-auto w-full flex items-start justify-center p-4 lg:p-8 custom-scrollbar relative">
              
              {/*  PREVIEW  */}
              <div className="w-full max-w-[1400px] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300/50 border-4 border-white/50 bg-zinc-950 origin-top animate-in zoom-in-95 duration-300 relative group">
                  
                  <div className="absolute top-6 right-6 z-[100] flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
                    <button 
                      onClick={() => setViewMode('edit')} 
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full shadow-lg transition-all"
                    >
                      <Edit3 size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Edit Content</span>
                    </button>
                    {viewMode !== 'split' && (
                      <button 
                        onClick={() => setViewMode('split')} 
                        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-full shadow-lg shadow-emerald-500/30 transition-all"
                      >
                        <Columns size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Split View</span>
                      </button>
                    )}
                  </div>

                  <section className="relative min-h-[400px] lg:min-h-[550px] bg-black overflow-hidden flex items-center py-12 lg:py-20">
                    
                    <div className="absolute inset-0 z-0">
                      <img src={heroData.bgImage || defaultBg} alt="Preview" className="w-full h-full object-cover opacity-60 scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40"></div>
                    </div>

                    <div className="w-full px-6 lg:px-12 relative z-10">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                        {/* LEFT CONTENT */}
                        <div className="lg:col-span-7 text-left">
                          
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-sm backdrop-blur-md mb-5 lg:mb-6">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-emerald-500 font-black text-[9px] lg:text-[10px] uppercase tracking-[0.2em]">
                              {heroData.subtitle || "No Subtitle"}
                            </span>
                          </div>

                          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-4 lg:mb-6">
                            {mainTitle} <br className="hidden sm:block"/>
                            <span className="text-emerald-500 relative inline-block sm:mt-1">
                              {highlightTitle}
                              <svg className="absolute -bottom-1.5 lg:-bottom-2 left-0 w-full h-2 lg:h-3 text-emerald-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                              </svg>
                            </span>
                          </h1>

                          <p className="text-zinc-300 text-xs lg:text-base max-w-xl font-medium leading-relaxed opacity-90 drop-shadow-md mb-6 lg:mb-8">
                            {heroData.description || "Enter a description in the editor to see it here."}
                          </p>

                          {/* SMALLER BADGES ROW */}
                          <div className="flex flex-row items-center gap-2 lg:gap-4 pt-2 w-full max-w-lg overflow-hidden">
                            <div className="flex flex-1 items-center gap-2.5 bg-white/5 backdrop-blur-sm p-2 lg:p-3 rounded-xl border border-white/10 min-w-0">
                              <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                                <ShieldCheck className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-white font-black text-[8px] lg:text-[11px] uppercase tracking-wide truncate">Certified</p>
                                <p className="text-zinc-400 text-[7px] lg:text-[9px] font-medium mt-0.5 truncate">Vetted Pros</p>
                              </div>
                            </div>

                            <div className="flex flex-1 items-center gap-2.5 bg-white/5 backdrop-blur-sm p-2 lg:p-3 rounded-xl border border-white/10 min-w-0">
                              <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                                <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-amber-400" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-white font-black text-[8px] lg:text-[11px] uppercase tracking-wide truncate">Fast Resp.</p>
                                <p className="text-zinc-400 text-[7px] lg:text-[9px] font-medium mt-0.5 truncate">Under 60 Mins</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT SIDE FLOATING CARD PREVIEW */}
                        <div className="lg:col-span-5 hidden lg:flex justify-end mt-12 lg:mt-0">
                          <div className="relative w-full max-w-[240px] xl:max-w-[280px]">
                            <div className="absolute top-3 left-3 w-full h-full bg-emerald-500 rounded-[2rem]"></div>
                            <div className="relative bg-white border border-zinc-100 p-6 xl:p-8 rounded-[2rem] text-center shadow-2xl">
                              <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-3 xl:mb-4 border border-emerald-100">
                                <ThumbsUp className="w-6 h-6 xl:w-7 xl:h-7 text-emerald-500" />
                              </div>
                              <h3 className="text-4xl xl:text-5xl font-black text-zinc-950 mb-1">4.9</h3>
                              <p className="text-zinc-500 font-bold uppercase tracking-widest text-[8px] xl:text-[9px] mb-5 flex items-center justify-center gap-1">
                                <Star size={10} className="fill-amber-400 text-amber-400" /> Avg Rating
                              </p>
                              <div className="inline-block px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-100">
                                <p className="text-emerald-600 font-black text-[7px] xl:text-[8px] tracking-widest uppercase">Happy Customers</p>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </section>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ServiceHeroEditor;