import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice';
import { AdminService } from '../../services/adminService';
import { 
  ArrowLeft, Save, Image as ImageIcon, Type, MousePointer2, 
  Upload, Settings2, Loader2, Star, CheckCircle, MapPin, Edit2, ChevronRight
} from 'lucide-react';

const HeroEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const fileInputRef = useRef(null);
  
  const subsectionId = location.state?.sectionId || 1;
  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [viewMode, setViewMode] = useState('split'); 
  const [activeField, setActiveField] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [imageFile, setImageFile] = useState(null); 
  
  const [heroData, setHeroData] = useState({
    badgeText: "", titleLine1: "", titleHighlight: "", titleLine3: "",
    description: "", primaryBtnText: "", secondaryBtnText: "", mainImage: null 
  });

  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content) {
      setHeroData({
        badgeText: content.badgeText || "",
        titleLine1: content.titleLine1 || "",
        titleHighlight: content.titleHighlight || "",
        titleLine3: content.titleLine3 || "",
        description: content.description || "",
        primaryBtnText: content.primaryBtnText || "",
        secondaryBtnText: content.secondaryBtnText || "",
        mainImage: content.images?.[0] || null 
      });
    }
  }, [content]);

  const handleLimitChange = (field, val, limit) => {
    if (val.length <= limit) setHeroData({ ...heroData, [field]: val });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith('http') || imagePath.startsWith('blob:')) return imagePath;
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
    setIsDeploying(true);
    try {
      let finalImageUrl = heroData.mainImage;
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile); 
        const uploadData = await AdminService.uploadHeroImage(formData);
        if (uploadData.success) {
            finalImageUrl = uploadData.imageUrl;
            setImageFile(null);
        }
      }
      const payload = { ...heroData, images: [finalImageUrl].filter(Boolean) };
      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      dispatch(fetchSingleSubsectionContent(subsectionId));
      alert("Changes Deployed! 🚀");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally { setIsDeploying(false); }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-indigo-100">
      
      {/* MINIMAL NAVBAR */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-900">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-[13px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <Settings2 size={16} className="text-indigo-600" /> Hero <span className="text-indigo-400">Lab</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {['edit', 'split', 'preview'].map((mode) => (
            <button key={mode} onClick={() => setViewMode(mode)} className={`px-5 py-1.5 rounded-lg text-[9px] font-black tracking-widest transition-all ${viewMode === mode ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>{mode.toUpperCase()}</button>
          ))}
        </div>

        <button onClick={handleSave} disabled={isDeploying} className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-indigo-600 transition-all disabled:opacity-50">
          {isDeploying ? <Loader2 className="animate-spin" size={14} /> : "DEPLOY"}
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-700 ${viewMode === 'split' ? 'max-w-[1700px] px-8 py-8 grid grid-cols-12 gap-8' : 'max-w-4xl py-12 px-6'}`}>
        
        {/* LEFT: EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-4' : 'w-full'} space-y-6`}>
            
            {/* TYPOGRAPHY CARD */}
            <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                 <Type size={14}/> <span className="text-[9px] font-black uppercase tracking-[0.2em]">Text Content</span>
              </div>
              
              <div className="space-y-4">
                <div className="group">
                  <label className="text-[8px] font-black text-slate-400 uppercase ml-1 mb-1 block">Badge</label>
                  <input value={heroData.badgeText} onFocus={() => setActiveField('badge')} onChange={(e) => handleLimitChange('badgeText', e.target.value, 25)} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-indigo-500 focus:bg-white transition-all" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Title 1" value={heroData.titleLine1} onFocus={() => setActiveField('title')} onChange={(e) => handleLimitChange('titleLine1', e.target.value, 30)} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-indigo-500" />
                  <input placeholder="Title 2" value={heroData.titleLine3} onFocus={() => setActiveField('title')} onChange={(e) => handleLimitChange('titleLine3', e.target.value, 30)} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-indigo-500" />
                </div>

                <input value={heroData.titleHighlight} onFocus={() => setActiveField('title')} onChange={(e) => handleLimitChange('titleHighlight', e.target.value, 40)} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs text-indigo-600 outline-none focus:border-indigo-500" />
                
                <textarea rows="3" value={heroData.description} onFocus={() => setActiveField('desc')} onChange={(e) => handleLimitChange('description', e.target.value, 160)} className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl font-medium text-xs leading-relaxed outline-none focus:border-indigo-500 resize-none" />
              </div>
            </div>

            {/* BUTTONS CARD (UPGRADED UI) */}
            <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
               <div className="flex items-center gap-2 text-slate-400">
                  <MousePointer2 size={14}/> <span className="text-[9px] font-black uppercase tracking-[0.2em]">Button Actions</span>
               </div>
               <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-slate-50/50 p-2 rounded-2xl border border-slate-50">
                    <input value={heroData.primaryBtnText} onFocus={() => setActiveField('btns')} onChange={(e) => handleLimitChange('primaryBtnText', e.target.value, 15)} className="flex-1 bg-transparent outline-none font-bold text-[11px] uppercase" />
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50/50 p-2 rounded-2xl border border-slate-50">
                    <input value={heroData.secondaryBtnText} onFocus={() => setActiveField('btns')} onChange={(e) => handleLimitChange('secondaryBtnText', e.target.value, 15)} className="flex-1 bg-transparent outline-none font-bold text-[11px] uppercase" />
                  </div>
               </div>
            </div>

            {/* VISUAL ASSET */}
            <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><ImageIcon size={14}/> Media</span>
                  <button onClick={() => fileInputRef.current.click()} className="text-[8px] font-black text-indigo-600 border-b border-indigo-200 pb-0.5">CHANGE IMAGE</button>
               </div>
               <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} />
               <div className="w-full aspect-video bg-slate-50 rounded-2xl overflow-hidden group relative">
                 <img src={getImageUrl(heroData.mainImage)} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <Edit2 size={16} className="text-white" />
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* RIGHT: COMPACT PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-8' : 'w-full'} sticky top-24`}>
            <div className="relative mx-auto bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 overflow-hidden">
               {/* Browser bar */}
               <div className="flex items-center gap-2 mb-3 px-3">
                  <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" /></div>
                  <div className="flex-1 max-w-[120px] mx-auto h-3.5 bg-slate-800 rounded-full flex items-center justify-center text-[6px] text-slate-500 font-bold uppercase tracking-widest">Tricksy Live Lab</div>
               </div>

               <div className="bg-white rounded-xl overflow-hidden min-h-[480px] flex items-center px-10 relative">
                 <div className="grid grid-cols-12 gap-6 items-center w-full relative z-10">
                   
                   <div className="col-span-7 space-y-4">
                      <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 transition-all ${activeField === 'badge' ? 'scale-105' : ''}`}>
                         <Star size={8} className="fill-indigo-600" />
                         <span className="text-[8px] font-black uppercase tracking-widest">{heroData.badgeText}</span>
                      </div>
                      
                      <h1 className="text-[34px] font-black text-slate-900 leading-[1.1] tracking-tight max-w-[350px]">
                        {heroData.titleLine1} <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-400 block py-1">
                          {heroData.titleHighlight}
                        </span>
                        {heroData.titleLine3}
                      </h1>

                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed max-w-[300px]">
                        {heroData.description}
                      </p>

                      <div className="flex items-center gap-2.5 pt-1">
                        <div className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-black text-[9px] uppercase shadow-md shadow-indigo-100">
                          {heroData.primaryBtnText}
                        </div>
                        <div className="px-5 py-2.5 bg-white border border-slate-200 text-slate-900 rounded-lg font-bold text-[9px] uppercase shadow-sm">
                          {heroData.secondaryBtnText}
                        </div>
                      </div>
                   </div>

                   <div className="col-span-5 flex justify-center">
                      <div className="relative scale-90"> 
                        <div className="w-[260px] h-[260px] rounded-full border-[8px] border-white shadow-2xl overflow-hidden relative z-10">
                          <img src={getImageUrl(heroData.mainImage)} className="w-full h-full object-cover scale-110" />
                        </div>
                        
                        <div className="absolute top-0 -left-2 bg-white px-3 py-2 rounded-xl shadow-lg z-20 flex items-center gap-2 border border-slate-50">
                           <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500"><CheckCircle size={12}/></div>
                           <p className="text-[7px] font-black uppercase text-slate-900">Premium</p>
                        </div>
                        
                        {/* RIGHT POSITION */}
                        <div className="absolute bottom-4 -right-2 bg-white px-3 py-2 rounded-xl shadow-lg z-20 flex items-center gap-2 border border-slate-50">
                           <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><MapPin size={12}/></div>
                           <p className="text-[7px] font-black uppercase text-slate-900">Fast Service</p>
                        </div>
                      </div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroEditor;