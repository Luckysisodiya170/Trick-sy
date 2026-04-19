import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../../store/index'; 
import { Image as ImageIcon, Sparkles, ArrowRight, ShieldCheck, Clock, Loader2, Edit3, Target, Layout } from 'lucide-react';

const ServiceHeroEditor = forwardRef(({ numericId, viewMode: parentViewMode }, ref) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const content = useSelector((state) => state.content.activeSubsection);
    const status = useSelector((state) => state.content.status);

    const [viewMode, setViewMode] = useState(parentViewMode || 'split'); 
    const [isDeploying, setIsDeploying] = useState(false);
    const [imageFile, setImageFile] = useState(null); 
    
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
        return `http://localhost:5000${imagePath}`;
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
                images: finalImageUrl?.startsWith('blob:') ? (content?.images || []) : [finalImageUrl].filter(Boolean)
            };
            await dispatch(updateSingleSubsectionContent({ subsectionId: numericId, updateData: payload })).unwrap();
            return true;
        } catch (error) { return false; } finally { setIsDeploying(false); }
    };

    const safeTitle = heroData.title || "";
    const titleFirstWord = safeTitle.split(' ')[0];
    const titleRest = safeTitle.includes(' ') ? safeTitle.substring(safeTitle.indexOf(' ') + 1) : '';

    return (
        <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden">
            <div className={`flex-1 transition-all duration-500 overflow-y-auto custom-scrollbar ${viewMode === 'split' ? 'grid grid-cols-1 xl:grid-cols-12 gap-0' : 'flex justify-center'}`}>
                
                {/* --- ENHANCED EDITOR SIDE --- */}
                {(viewMode === 'edit' || viewMode === 'split') && (
                    <div className={`${viewMode === 'split' ? 'xl:col-span-4 border-r border-slate-200' : 'w-full max-w-2xl p-8'} bg-[#F8FAFC] p-6 space-y-6`}>
                        
                        {/* Section Title */}
                        <div className="px-2 mb-2">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                <Layout className="w-5 h-5 text-emerald-500" /> Hero Content
                            </h2>
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Live Editor Interface</p>
                        </div>

                        {/* Main Text Content Card */}
                        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 mb-2">
                                <Edit3 size={14} className="text-emerald-500"/>
                                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Typography</span>
                            </div>
                            <input 
                                value={heroData.badgeText} 
                                onChange={e => setHeroData({...heroData, badgeText: e.target.value})} 
                                placeholder="Hero Badge" 
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-emerald-400 transition-all shadow-inner" 
                            />
                            <input 
                                value={heroData.title} 
                                onChange={e => setHeroData({...heroData, title: e.target.value})} 
                                placeholder="Main Title" 
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-800 text-sm outline-none focus:border-emerald-400 transition-all shadow-inner" 
                            />
                            <textarea 
                                rows="3" 
                                value={heroData.description} 
                                onChange={e => setHeroData({...heroData, description: e.target.value})} 
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-slate-600 outline-none focus:border-emerald-400 resize-none transition-all shadow-inner" 
                                placeholder="Description..." 
                            />
                        </div>

                        {/* Conversion & Trust Card */}
                        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Target size={14} className="text-emerald-500"/>
                                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Actions & Trust</span>
                            </div>
                            <input 
                                value={heroData.primaryBtnText} 
                                onChange={e => setHeroData({...heroData, primaryBtnText: e.target.value})} 
                                placeholder="Button Text" 
                                className="w-full p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 rounded-2xl font-black text-xs uppercase tracking-widest outline-none focus:border-emerald-500 transition-all" 
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative group">
                                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                    <input 
                                        value={heroData.trustBadge1} 
                                        onChange={e => setHeroData({...heroData, trustBadge1: e.target.value})} 
                                        placeholder="Trust 1" 
                                        className="w-full pl-9 p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold outline-none focus:border-emerald-400" 
                                    />
                                </div>
                                <div className="relative group">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                    <input 
                                        value={heroData.trustBadge2} 
                                        onChange={e => setHeroData({...heroData, trustBadge2: e.target.value})} 
                                        placeholder="Trust 2" 
                                        className="w-full pl-9 p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold outline-none focus:border-emerald-400" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image Uploader Card */}
                        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-4">
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} />
                            <div 
                                onClick={() => fileInputRef.current.click()} 
                                className="w-full h-32 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-emerald-50/50 transition-all overflow-hidden group"
                            >
                                {heroData.mainImage ? (
                                    <div className="relative w-full h-full">
                                        <img src={getImageUrl(heroData.mainImage)} className="w-full h-full object-cover" alt="preview" />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <ImageIcon className="text-white" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-1">
                                        <ImageIcon size={20} className="text-slate-300"/>
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Change Image</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                
                {/* --- PREVIEW SIDE (NO CHANGES MADE HERE) --- */}
                {(viewMode === 'preview' || viewMode === 'split') && (
                    <div className={`${viewMode === 'split' ? 'xl:col-span-8 bg-[#F1F5F9] p-8' : 'w-full p-8'} flex items-start justify-center`}>
                         <div className="w-full max-w-[1200px] h-[600px] bg-slate-900 rounded-[2.5rem] border-8 border-slate-900 shadow-2xl overflow-hidden relative flex flex-col scale-[0.95] xl:scale-100 origin-top">
                            <section className="relative flex-1 flex items-center overflow-hidden bg-zinc-950">
                                <div className="absolute inset-0 z-0">
                                    {heroData.mainImage && <img src={getImageUrl(heroData.mainImage)} className="w-full h-full object-cover opacity-60 transition-transform duration-1000" alt="hero" />}
                                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>
                                </div>
                                <div className="w-full mx-auto px-12 relative z-10">
                                    <div className="max-w-2xl">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-6 backdrop-blur-md">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                            <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em]">{heroData.badgeText || "Section"}</span>
                                        </div>
                                        
                                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tighter mb-6">
                                            {titleFirstWord} <br/>
                                            <span className="text-emerald-500">{titleRest}</span>
                                        </h1>
                                        
                                        <p className="text-zinc-200 text-lg md:text-xl font-medium leading-relaxed mb-8 max-w-lg drop-shadow-md">
                                            {heroData.description || "Start adding content..."}
                                        </p>
                                        
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <button className="px-8 py-4 bg-emerald-500 text-zinc-950 font-black rounded-xl hover:bg-emerald-400 transition-all shadow-xl uppercase text-xs tracking-widest flex items-center gap-2">
                                                {heroData.primaryBtnText || "Book Appointment"} <ArrowRight className="w-4 h-4" />
                                            </button>
                                            <div className="flex items-center gap-6 ml-4">
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                                    <span className="text-white font-bold text-xs uppercase tracking-widest">{heroData.trustBadge1 || "Certified"}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-5 h-5 text-emerald-500" />
                                                    <span className="text-white font-bold text-xs uppercase tracking-widest">{heroData.trustBadge2 || "60m Response"}</span>
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
        </div>
    );
});

export default ServiceHeroEditor;