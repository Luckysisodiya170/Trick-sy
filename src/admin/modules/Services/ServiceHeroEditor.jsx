import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../../store/index'; 
import { 
  Save, Image as ImageIcon, Type, AlignLeft, Eye, 
  Upload, Star, Edit3, Columns, Loader2, ArrowRight, ShieldCheck, Clock, MousePointer2, Layout, Sparkles
} from 'lucide-react';

const ServiceHeroEditor = forwardRef(({ numericId }, ref) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const [viewMode, setViewMode] = useState('split'); 
  const [activeField, setActiveField] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [imageFile, setImageFile] = useState(null); 
  
  const [heroData, setHeroData] = useState({
    badgeText: "", title: "", description: "", primaryBtnText: "",
    trustBadge1: "", trustBadge2: "", mainImage: null 
  });

  useImperativeHandle(ref, () => ({
    handleAutoSave: async () => {
      return await handleSave();
    }
  }));

  useEffect(() => {
    if (numericId) {
      dispatch(fetchSingleSubsectionContent(numericId));
    }
  }, [dispatch, numericId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setHeroData({
        badgeText: content.badgeText || "",
        title: content.titleLine1 || "",
        description: content.description || "",
        primaryBtnText: content.primaryBtnText || "",
        trustBadge1: content.trustBadge1 || "",
        trustBadge2: content.trustBadge2 || "",
        mainImage: content.images?.[0] || null 
      });
    }
  }, [content]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith('http') || imagePath.startsWith('blob:') || imagePath.startsWith('data:')) return imagePath;
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    return `${apiBase.replace('/api', '')}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); 
      setHeroData({ ...heroData, mainImage: URL.createObjectURL(file) }); 
    }
  };

  const handleSave = async () => {
    if (!numericId) return false;
    setIsDeploying(true);
    try {
      let finalImageUrl = heroData.mainImage;
      if (imageFile) {
        const formData = new FormData();
        formData.append('heroImage', imageFile); 
        const res = await fetch('http://localhost:5000/api/upload/upload-hero', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success) finalImageUrl = data.imageUrl;
      }
      const payload = {
        badgeText: heroData.badgeText,
        titleLine1: heroData.title,
        description: heroData.description,
        primaryBtnText: heroData.primaryBtnText,
        trustBadge1: heroData.trustBadge1,
        trustBadge2: heroData.trustBadge2,
        images: finalImageUrl?.startsWith('blob:') ? content.images : [finalImageUrl].filter(Boolean)
      };
      await dispatch(updateSingleSubsectionContent({ subsectionId: numericId, updateData: payload })).unwrap();
      return true;
    } catch (error) { return false; } finally { setIsDeploying(false); }
  };

  const safeTitle = heroData.title || "";
  const titleFirstWord = safeTitle.split(' ')[0];
  const titleRest = safeTitle.includes(' ') ? safeTitle.substring(safeTitle.indexOf(' ') + 1) : '';

  if (status === 'loading' && (!content || Object.keys(content).length === 0)) {
    return <div className="h-full flex items-center justify-center font-bold text-slate-400 uppercase text-[10px] tracking-[0.2em]"><Loader2 className="animate-spin mr-2" size={16} /> Syncing Interface...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden">
      
      {/* MODERN TOOLBAR */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-emerald-50 rounded-xl"><Layout size={20} className="text-emerald-600" /></div>
          <div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Hero Customizer</h2>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Service ID: {numericId}</p>
          </div>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-2xl shadow-inner">
          {['edit', 'split', 'preview'].map(m => (
            <button key={m} onClick={() => setViewMode(m)} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all duration-300 ${viewMode === m ? 'bg-white text-emerald-600 shadow-sm scale-105' : 'text-slate-500 hover:text-slate-700'}`}>
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className={`flex-1 transition-all duration-500 overflow-y-auto custom-scrollbar ${viewMode === 'split' ? 'grid grid-cols-1 xl:grid-cols-12 gap-0' : 'flex justify-center'}`}>
        
        {/* ENHANCED EDITOR SIDE */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-4 border-r border-slate-200' : 'w-full max-w-2xl p-8'} bg-[#F8FAFC] p-6 space-y-6`}>
            
            {/* CARD 1: CONTENT */}
            <div className={`group bg-white rounded-[2rem] border p-6 transition-all duration-300 shadow-sm hover:shadow-md ${activeField === 'title' || activeField === 'badge' ? 'border-emerald-200 ring-4 ring-emerald-50/50' : 'border-slate-100'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200"><Sparkles size={16}/></div>
                <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-wider">Visual Branding</h3>
              </div>
              
              <div className="space-y-5">
                <div className="relative">
                  <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-1.5 block tracking-widest">Badge Text</label>
                  <input value={heroData.badgeText} onFocus={() => setActiveField('badge')} onBlur={() => setActiveField(null)} onChange={e => setHeroData({...heroData, badgeText: e.target.value})} placeholder="e.g. Premium Choice" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm focus:bg-white focus:border-emerald-400 outline-none transition-all shadow-inner" />
                </div>
                
                <div className="relative">
                  <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-1.5 block tracking-widest">Main Title</label>
                  <div className="relative">
                    <input value={heroData.title} onFocus={() => setActiveField('title')} onBlur={() => setActiveField(null)} onChange={e => setHeroData({...heroData, title: e.target.value})} placeholder="Professional Cleaning" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-800 text-sm focus:bg-white focus:border-emerald-400 outline-none transition-all pr-10" />
                    <Type size={16} className="absolute right-4 top-4 text-slate-300" />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-1.5 block tracking-widest">Description</label>
                  <textarea rows="3" value={heroData.description} onFocus={() => setActiveField('desc')} onBlur={() => setActiveField(null)} onChange={e => setHeroData({...heroData, description: e.target.value})} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm leading-relaxed outline-none focus:bg-white focus:border-emerald-400 resize-none transition-all" />
                </div>
              </div>
            </div>

            {/* CARD 2: INTERACTION */}
            <div className={`bg-white rounded-[2rem] border p-6 transition-all duration-300 shadow-sm hover:shadow-md ${activeField === 'buttons' || activeField === 'badges' ? 'border-emerald-200 ring-4 ring-emerald-50/50' : 'border-slate-100'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-lg"><MousePointer2 size={16}/></div>
                <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-wider">CTA & Trust</h3>
              </div>
              
              <div className="space-y-4">
                <input value={heroData.primaryBtnText} onFocus={() => setActiveField('buttons')} onBlur={() => setActiveField(null)} onChange={e => setHeroData({...heroData, primaryBtnText: e.target.value})} placeholder="Primary Action" className="w-full p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl font-black text-emerald-700 text-xs focus:bg-white outline-none transition-all tracking-wide" />
                
                <div className="grid grid-cols-2 gap-3">
                  <input value={heroData.trustBadge1} onFocus={() => setActiveField('badges')} onBlur={() => setActiveField(null)} onChange={e => setHeroData({...heroData, trustBadge1: e.target.value})} placeholder="Badge 1" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold outline-none focus:border-emerald-400" />
                  <input value={heroData.trustBadge2} onFocus={() => setActiveField('badges')} onBlur={() => setActiveField(null)} onChange={e => setHeroData({...heroData, trustBadge2: e.target.value})} placeholder="Badge 2" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold outline-none focus:border-emerald-400" />
                </div>
              </div>
            </div>

            {/* CARD 3: MEDIA */}
            <div className={`bg-white rounded-[2rem] border p-6 transition-all duration-300 shadow-sm hover:shadow-md ${activeField === 'media' ? 'border-emerald-200 ring-4 ring-emerald-50/50' : 'border-slate-100'}`}>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} />
                <div onClick={() => !isDeploying && fileInputRef.current.click()} onMouseEnter={() => setActiveField('media')} onMouseLeave={() => setActiveField(null)} className="w-full h-40 border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-[1.5rem] flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition-all overflow-hidden group relative">
                  {heroData.mainImage ? (
                    <>
                      <img src={getImageUrl(heroData.mainImage)} className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110" alt="Preview" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                         <span className="text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2"><ImageIcon size={14}/> Change Media</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload size={24} className="text-slate-300 mb-2 group-hover:text-emerald-500 transition-all" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Drop Hero Media Here</span>
                    </>
                  )}
                </div>
            </div>
          </div>
        )}

        {/* RIGHT PANEL: ZINC PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-8 bg-[#F1F5F9] p-8' : 'w-full p-8'} flex items-start justify-center`}>
             <div className="w-full max-w-[1200px] h-[650px] bg-slate-900 rounded-[2.5rem] border-8 border-slate-900 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] overflow-hidden relative flex flex-col scale-[0.95] xl:scale-100 origin-top">
              <section className="relative flex-1 flex items-center overflow-hidden bg-zinc-950">
                <div className={`absolute inset-0 z-0 transition-transform duration-1000 ${activeField === 'media' ? 'scale-105' : 'scale-100'}`}>
                  <img src={getImageUrl(heroData.mainImage)} className="w-full h-full object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                </div>

                <div className="w-full mx-auto px-12 relative z-10 scale-[0.85] lg:scale-100 origin-left">
                  <div className="max-w-2xl">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-8 backdrop-blur-xl transition-all duration-500 ${activeField === 'badge' ? 'ring-2 ring-emerald-400 scale-110 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : ''}`}>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.25em]">{heroData.badgeText || "Badge Label"}</span>
                    </div>
                    
                    <h1 className={`text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.02] tracking-tighter mb-8 transition-all duration-500 origin-left ${activeField === 'title' ? 'scale-105 translate-x-4 text-emerald-50' : ''}`}>
                      {titleFirstWord}<br/><span className="text-emerald-500">{titleRest}</span>
                    </h1>
                    
                    <p className={`text-zinc-300 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-lg drop-shadow-md transition-all duration-500 ${activeField === 'desc' ? 'text-white translate-x-2' : ''}`}>
                      {heroData.description || "Enter your descriptive text..."}
                    </p>
                    
                    <div className="flex items-center gap-8 pointer-events-none">
                      <button className={`px-10 py-5 bg-emerald-500 text-zinc-950 font-black rounded-2xl shadow-2xl uppercase text-[11px] tracking-widest flex items-center gap-3 transition-all duration-500 ${activeField === 'buttons' ? 'scale-110 ring-8 ring-emerald-500/20' : ''}`}>
                        {heroData.primaryBtnText || "Action Label"} <ArrowRight className="w-5 h-5" />
                      </button>
                      <div className={`flex items-center gap-8 transition-all duration-500 ${activeField === 'badges' ? 'scale-110 translate-x-4' : ''}`}>
                        <div className="flex items-center gap-2.5 text-white font-black text-[11px] uppercase tracking-wider">
                          <ShieldCheck className="w-6 h-6 text-emerald-500" /> {heroData.trustBadge1}
                        </div>
                        <div className="flex items-center gap-2.5 text-white font-black text-[11px] uppercase tracking-wider">
                          <Clock className="w-6 h-6 text-emerald-500" /> {heroData.trustBadge2}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 5px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }`}</style>
    </div>
  );
});

export default ServiceHeroEditor;