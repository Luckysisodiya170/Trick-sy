import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { AdminService } from '../../services/adminService';
import { 
  Image as ImageIcon, Sparkles, ArrowRight, ShieldCheck, Clock, 
  Loader2, Edit3, Target, Layout, Columns, Eye,Upload
} from 'lucide-react';

const ServiceHeroEditor = forwardRef(({ numericId, viewMode: parentViewMode }, ref) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const content = useSelector((state) => state.adminData?.activeSubsection);
    const status = useSelector((state) => state.adminData?.status || '');

    const [viewMode, setViewMode] = useState(parentViewMode || 'split'); 
    const [isDeploying, setIsDeploying] = useState(false);
    const [imageFile, setImageFile] = useState(null); 
    const [hasLoaded, setHasLoaded] = useState(false);
    
    const [heroData, setHeroData] = useState({
        badgeText: "", title: "", description: "", primaryBtnText: "",
        trustBadge1: "", trustBadge2: "", mainImage: null 
    });

    useImperativeHandle(ref, () => ({
        handleAutoSave: async () => { return await handleSave(); }
    }));

    useEffect(() => {
        if (numericId) { dispatch(fetchSingleSubsectionContent(numericId)); }
    }, [dispatch, numericId]);

    useEffect(() => {
        if (content && Object.keys(content).length > 0 && !hasLoaded) {
            if (content.id == numericId || content.subsectionId == numericId) {
                setHeroData({
                    badgeText: content.badgeText ?? "",
                    title: content.titleLine1 ?? "",
                    description: content.description ?? "",
                    primaryBtnText: content.primaryBtnText ?? "",
                    trustBadge1: content.trustBadge1 ?? "",
                    trustBadge2: content.trustBadge2 ?? "",
                    mainImage: content.images?.[0] ?? null 
                });
                setHasLoaded(true);
            }
        }
    }, [content, numericId, hasLoaded]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "";
        if (imagePath.startsWith('http') || imagePath.startsWith('blob:') || imagePath.startsWith('data:')) return imagePath;
        const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
        const domain = apiBase.replace('/api', ''); 
        return `${domain}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (heroData.mainImage && heroData.mainImage.startsWith('blob:')) {
                URL.revokeObjectURL(heroData.mainImage);
            }
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
                formData.append('image', imageFile); 
                const uploadData = await AdminService.uploadHeroImage(formData);
                if (uploadData.success || uploadData.imageUrl) {
                    finalImageUrl = uploadData.imageUrl;
                    setImageFile(null);
                } else {
                    throw new Error("Image Upload Failed");
                }
            }
            
            const payload = {
                badgeText: heroData.badgeText,
                titleLine1: heroData.title,
                description: heroData.description,
                primaryBtnText: heroData.primaryBtnText,
                trustBadge1: heroData.trustBadge1,
                trustBadge2: heroData.trustBadge2,
                images: finalImageUrl?.startsWith('blob:') ? (content?.images || []) : [finalImageUrl].filter(Boolean)
            };
            
            await dispatch(updateSingleSubsectionContent({ subsectionId: numericId, updateData: payload })).unwrap();
            await dispatch(fetchSingleSubsectionContent(numericId)).unwrap();
            return true;
        } catch (error) { 
            console.error("Save failed:", error);
            return false; 
        } finally { 
            setIsDeploying(false); 
        }
    };

    const safeText = (text) => text === '' ? '\u00A0' : text;

    const safeTitle = safeText(heroData.title);
    const titleFirstWord = safeTitle.split(' ')[0];
    const titleRest = safeTitle.includes(' ') ? safeTitle.substring(safeTitle.indexOf(' ') + 1) : '';

    if (status.includes('loading') && !hasLoaded) {
      return (
        <div className="h-full flex items-center justify-center font-black text-slate-300 uppercase text-xs tracking-widest italic">
          <Loader2 className="animate-spin mr-2" size={14}/> Syncing Hero Studio...
        </div>
      );
    }

    return (
        <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden selection:bg-emerald-100">
            
            {/* TOOLBAR */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between shrink-0 z-20 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-50 rounded-xl"><Layout size={18} className="text-emerald-600" /></div>
                    <h2 className="hidden sm:block text-[13px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
                        Service <span className="text-emerald-400">Hero</span>
                    </h2>
                </div>

                <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100 mx-2">
                    {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map(m => (
                        <button key={m.id} onClick={() => setViewMode(m.id)} className={`flex items-center gap-1.5 px-5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${viewMode === m.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                            <m.icon size={12} /> <span className="hidden md:inline">{m.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className={`flex-1 transition-all duration-500 overflow-y-auto custom-scrollbar ${viewMode === 'split' ? 'grid grid-cols-1 xl:grid-cols-12 gap-0' : 'flex justify-center'}`}>
                
                {/* ---  EDITOR SIDE --- */}
                {(viewMode === 'edit' || viewMode === 'split') && (
                    <div className={`${viewMode === 'split' ? 'xl:col-span-4 border-r border-slate-100' : 'w-full max-w-3xl p-8'} bg-white p-6 space-y-6 overflow-y-auto custom-scrollbar shadow-2xl shadow-slate-200/50 z-10`}>
                        
                        <div className="px-2 mb-2">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Content Configurator</p>
                        </div>

                        {/* Main Text Content Card */}
                        <div className="bg-slate-50/50 rounded-[2rem] border border-slate-100 shadow-inner p-6 space-y-4 hover:shadow-sm transition-shadow">
                            <div className="flex items-center gap-2 mb-2">
                                <Edit3 size={14} className="text-emerald-500"/>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Typography</span>
                            </div>
                            <input 
                                value={heroData.badgeText} 
                                onChange={e => setHeroData({...heroData, badgeText: e.target.value})} 
                                placeholder="Hero Badge" 
                                className="w-full p-4 bg-white border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm" 
                            />
                            <input 
                                value={heroData.title} 
                                onChange={e => setHeroData({...heroData, title: e.target.value})} 
                                placeholder="Main Title" 
                                className="w-full p-4 bg-white border border-slate-100 rounded-xl font-black text-slate-800 text-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm" 
                            />
                            <textarea 
                                rows="3" 
                                value={heroData.description} 
                                onChange={e => setHeroData({...heroData, description: e.target.value})} 
                                className="w-full p-4 bg-white border border-slate-100 rounded-xl text-sm font-medium text-slate-600 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 resize-none transition-all shadow-sm" 
                                placeholder="Description..." 
                            />
                        </div>

                        {/* Conversion & Trust Card */}
                        <div className="bg-slate-50/50 rounded-[2rem] border border-slate-100 shadow-inner p-6 space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Target size={14} className="text-emerald-500"/>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Actions & Trust</span>
                            </div>
                            <input 
                                value={heroData.primaryBtnText} 
                                onChange={e => setHeroData({...heroData, primaryBtnText: e.target.value})} 
                                placeholder="Button Text" 
                                className="w-full p-4 bg-emerald-50/50 border border-emerald-100 text-emerald-700 rounded-xl font-black text-xs uppercase tracking-widest outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm" 
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative group">
                                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                    <input 
                                        value={heroData.trustBadge1} 
                                        onChange={e => setHeroData({...heroData, trustBadge1: e.target.value})} 
                                        placeholder="Trust 1" 
                                        className="w-full pl-9 p-3 bg-white border border-slate-100 rounded-xl text-[11px] font-bold outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 shadow-sm" 
                                    />
                                </div>
                                <div className="relative group">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                    <input 
                                        value={heroData.trustBadge2} 
                                        onChange={e => setHeroData({...heroData, trustBadge2: e.target.value})} 
                                        placeholder="Trust 2" 
                                        className="w-full pl-9 p-3 bg-white border border-slate-100 rounded-xl text-[11px] font-bold outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 shadow-sm" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image Uploader Card */}
                        <div className="bg-slate-50/50 rounded-[2rem] border border-slate-100 shadow-inner p-5 pb-10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Hero Background Image</span>
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                            <div 
                                onClick={() => fileInputRef.current.click()} 
                                className="w-full h-36 border-2 border-dashed border-slate-200 bg-white rounded-2xl flex items-center justify-center cursor-pointer hover:border-emerald-300 transition-all overflow-hidden group relative"
                            >
                                {heroData.mainImage ? (
                                    <div className="relative w-full h-full">
                                        <img src={getImageUrl(heroData.mainImage)} className="w-full h-full object-cover" alt="preview" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white">
                                            <ImageIcon size={20} className="mb-1" />
                                            <span className="text-[9px] font-black uppercase tracking-widest">Change</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-1">
                                        <Upload size={20} className="text-slate-300 group-hover:text-emerald-400 transition-colors"/>
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">Upload Image</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                
                {/* --- PREVIEW SIDE --- */}
                {(viewMode === 'preview' || viewMode === 'split') && (
                    <div className={`${viewMode === 'split' ? 'xl:col-span-8 bg-[#f1f5f9]' : 'w-full bg-[#f1f5f9]'} flex items-start justify-center overflow-y-auto h-full custom-scrollbar relative p-4 sm:p-12`}>
                        <div className="w-full max-w-[1200px] h-[600px] bg-slate-900 rounded-[3rem] border-[10px] border-slate-900 shadow-2xl overflow-hidden relative flex flex-col scale-[0.95] xl:scale-100 origin-top">
                            
                            {/* Browser Bar */}
                            <div className="h-8 bg-slate-900 flex items-center px-4 gap-1.5 shrink-0 z-20">
                                <div className="flex gap-1.5 absolute left-6">
                                    <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                </div>
                                <div className="mx-auto w-48 h-4 bg-slate-800 rounded text-[7px] text-slate-500 flex items-center justify-center font-bold tracking-widest uppercase">
                                    tricksy-preview.io
                                </div>
                            </div>

                            {/* Hero Content */}
                            <section className="relative flex-1 flex items-center overflow-hidden bg-zinc-950">
                                <div className="absolute inset-0 z-0">
                                    {heroData.mainImage && <img src={getImageUrl(heroData.mainImage)} className="w-full h-full object-cover opacity-50 transition-transform duration-1000 scale-105" alt="hero" />}
                                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent"></div>
                                </div>
                                
                                <div className="w-full mx-auto px-12 lg:px-20 relative z-10">
                                    <div className="max-w-3xl">
                                        
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 backdrop-blur-md">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                                            <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em]">{safeText(heroData.badgeText)}</span>
                                        </div>
                                        
                                        <h1 className="text-5xl md:text-7xl lg:text-[80px] font-black text-white leading-[1.05] tracking-tighter mb-6">
                                            {safeText(titleFirstWord)} <br/>
                                            <span className="text-emerald-500">{safeText(titleRest)}</span>
                                        </h1>
                                        
                                        <p className="text-zinc-300 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-xl drop-shadow-md">
                                            {safeText(heroData.description)}
                                        </p>
                                        
                                        <div className="flex flex-wrap gap-6 items-center">
                                            <button className="px-8 py-4 bg-emerald-500 text-zinc-950 font-black rounded-2xl hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] uppercase text-xs tracking-widest flex items-center gap-3">
                                                {safeText(heroData.primaryBtnText)} <ArrowRight className="w-4 h-4" />
                                            </button>
                                            
                                            <div className="flex items-center gap-6 md:ml-4">
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                                    <span className="text-white font-bold text-[11px] uppercase tracking-widest">{safeText(heroData.trustBadge1)}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-5 h-5 text-emerald-500" />
                                                    <span className="text-white font-bold text-[11px] uppercase tracking-widest">{safeText(heroData.trustBadge2)}</span>
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
            <style>{`.custom-scrollbar::-webkit-scrollbar { width: 3px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }`}</style>
        </div>
    );
});

export default ServiceHeroEditor;