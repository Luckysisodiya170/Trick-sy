import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../../store/index'; 
import { Save, Image as ImageIcon, Type, AlignLeft, Eye, Upload, Edit3, Columns, Loader2, Layout, Sparkles, ArrowRight, ShieldCheck, Clock, MousePointer2 } from 'lucide-react';

const ServiceHeroEditor = forwardRef(({ numericId, viewMode: parentViewMode }, ref) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const content = useSelector((state) => state.content.activeSubsection);
    const status = useSelector((state) => state.content.status);

    const [viewMode, setViewMode] = useState(parentViewMode || 'split'); 
    const [activeField, setActiveField] = useState(null);
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

    if (status === 'loading' && !content) {
        return (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-400">
                <Loader2 className="animate-spin text-emerald-500" size={32}/>
                <p className="font-black text-[10px] uppercase tracking-widest animate-pulse">Syncing Interface...</p>
            </div>
        );
    }

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
                {(viewMode === 'edit' || viewMode === 'split') && (
                    <div className={`${viewMode === 'split' ? 'xl:col-span-4 border-r border-slate-200' : 'w-full max-w-2xl p-8'} bg-[#F8FAFC] p-6 space-y-6`}>
                        <div className="bg-white rounded-[2rem] border p-6 border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles size={16} className="text-emerald-500"/>
                                <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-wider">Visual Branding</h3>
                            </div>
                            <div className="space-y-5">
                                <input value={heroData.badgeText} onChange={e => setHeroData({...heroData, badgeText: e.target.value})} placeholder="Badge" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-emerald-400 transition-all shadow-inner" />
                                <input value={heroData.title} onChange={e => setHeroData({...heroData, title: e.target.value})} placeholder="Main Title" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-800 text-sm outline-none focus:border-emerald-400 transition-all shadow-inner" />
                                <textarea rows="3" value={heroData.description} onChange={e => setHeroData({...heroData, description: e.target.value})} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-emerald-400 resize-none transition-all shadow-inner" placeholder="Description..." />
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] border p-6 border-slate-100 shadow-sm">
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} />
                            <div onClick={() => fileInputRef.current.click()} className="w-full h-40 border-2 border-dashed border-slate-100 rounded-3xl flex items-center justify-center cursor-pointer hover:bg-emerald-50/50 transition-all overflow-hidden group">
                                {heroData.mainImage ? <img src={getImageUrl(heroData.mainImage)} className="w-full h-full object-cover" /> : <div className="flex flex-col items-center gap-2"><ImageIcon size={24} className="text-slate-200"/><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Media</span></div>}
                            </div>
                        </div>
                    </div>
                )}
                
                {(viewMode === 'preview' || viewMode === 'split') && (
                    <div className={`${viewMode === 'split' ? 'xl:col-span-8 bg-[#F1F5F9] p-8' : 'w-full p-8'} flex items-start justify-center`}>
                         <div className="w-full max-w-[1200px] h-[600px] bg-slate-900 rounded-[2.5rem] border-8 border-slate-900 shadow-2xl overflow-hidden relative flex flex-col scale-[0.95] xl:scale-100 origin-top">
                            <section className="relative flex-1 flex items-center overflow-hidden bg-zinc-950">
                                <div className="absolute inset-0 z-0 opacity-60">
                                    {heroData.mainImage && <img src={getImageUrl(heroData.mainImage)} className="w-full h-full object-cover" />}
                                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
                                </div>
                                <div className="w-full mx-auto px-12 relative z-10">
                                    <div className="max-w-2xl">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-8"><span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">{heroData.badgeText || "Section"}</span></div>
                                        <h1 className="text-6xl font-black text-white leading-[0.9] tracking-tighter mb-8">{titleFirstWord}<br/><span className="text-emerald-500">{titleRest}</span></h1>
                                        <p className="text-zinc-300 text-lg mb-10 max-w-lg leading-relaxed">{heroData.description || "Start adding content..."}</p>
                                        <button className="px-10 py-5 bg-emerald-500 text-zinc-950 font-black rounded-2xl uppercase text-[11px] tracking-widest shadow-xl">{heroData.primaryBtnText || "Action"}</button>
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