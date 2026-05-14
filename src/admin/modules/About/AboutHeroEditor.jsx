import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { AdminService } from '../../services/adminService';
import { 
  ArrowLeft, Save, Type, Eye, ShieldCheck, Star, 
  Upload, Settings2, Edit3, Columns, Users, Loader2 
} from 'lucide-react';

const AboutHeroEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { id } = useParams();
  
  const subsectionId = id || 10; 

  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [viewMode, setViewMode] = useState('split'); 
  const [isDeploying, setIsDeploying] = useState(false);
  
  // Image States
  const [bgImageFile, setBgImageFile] = useState(null);
  const [avatarFiles, setAvatarFiles] = useState([null, null, null]);
  const [avatars, setAvatars] = useState([null, null, null]);
  
  const [heroData, setHeroData] = useState({
    badgeText: "", mainTitle: "", highlightTitle: "", subtext: "",
    certifiedTitle: "", certifiedSub: "", topRatedTitle: "", topRatedSub: "",
    legacyYears: "", trustedCount: "", bgImage: null 
  });

  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setHeroData({
        badgeText: content.badgeText || "Established 2014",
        mainTitle: content.mainTitle || "The Team That",
        highlightTitle: content.highlightTitle || "Perfects Your Space.",
        subtext: content.subtext || "We’re not just a service company; we’re your partners in maintaining a lifestyle of comfort and uncompromising hygiene.",
        certifiedTitle: content.certifiedTitle || "Certified Experts",
        certifiedSub: content.certifiedSub || "Vetted Professionals",
        topRatedTitle: content.topRatedTitle || "Top Rated",
        topRatedSub: content.topRatedSub || "4.9/5 User Rating",
        legacyYears: content.legacyYears || "10+",
        trustedCount: content.trustedCount || "+5k",
        bgImage: content.images?.[0] || null
      });

      const existingAvatars = content.images ? content.images.slice(1, 4) : [];
      setAvatars([
        existingAvatars[0] || null, existingAvatars[1] || null, existingAvatars[2] || null
      ]);
    }
  }, [content]);

  // Character Limit Handler
  const handleLimitChange = (field, val, limit) => {
    if (val.length <= limit) setHeroData({ ...heroData, [field]: val });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith('http') || imagePath.startsWith('blob:') || imagePath.startsWith('data:')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  const handleBgImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (heroData.bgImage && heroData.bgImage.startsWith('blob:')) URL.revokeObjectURL(heroData.bgImage);
      setBgImageFile(file); 
      setHeroData({ ...heroData, bgImage: URL.createObjectURL(file) }); 
    }
  };

  const handleAvatarChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newAvatarFiles = [...avatarFiles];
      const newAvatars = [...avatars];
      if (newAvatars[index] && newAvatars[index].startsWith('blob:')) URL.revokeObjectURL(newAvatars[index]);
      newAvatarFiles[index] = file;
      newAvatars[index] = URL.createObjectURL(file);
      setAvatarFiles(newAvatarFiles);
      setAvatars(newAvatars);
    }
  };

  const handleSave = async () => {
    setIsDeploying(true);
    try {
      const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('image', file); 
        const res = await AdminService.uploadHeroImage(formData); // Centralized API Service
        if (!res.success) throw new Error("Upload Failed");
        return res.imageUrl;
      };

      let finalBgUrl = heroData.bgImage;
      if (bgImageFile) finalBgUrl = await uploadFile(bgImageFile);

      let finalAvatars = [...avatars];
      for (let i = 0; i < 3; i++) {
        if (avatarFiles[i]) finalAvatars[i] = await uploadFile(avatarFiles[i]);
        else if (finalAvatars[i]?.startsWith('blob:')) finalAvatars[i] = content.images?.[i + 1] || null;
      }

      const finalImagesArray = [finalBgUrl, finalAvatars[0], finalAvatars[1], finalAvatars[2]].filter(Boolean);

      const payload = { ...heroData, images: finalImagesArray };

      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      dispatch(fetchSingleSubsectionContent(subsectionId)); // Re-fetch to sync state

      alert("About Hero Updated Successfully! 🚀");
      setBgImageFile(null);
      setAvatarFiles([null, null, null]);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally { setIsDeploying(false); }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING ABOUT HERO LAB...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-emerald-100 pb-20">
      
      {/* MINIMAL NAVBAR */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-900 transition-colors"><ArrowLeft size={18} /></button>
          <h1 className="text-[12px] font-black tracking-widest text-slate-800 uppercase italic">About Hero <span className="text-emerald-600">Lab</span></h1>
        </div>

        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
          {['edit', 'split', 'preview'].map(m => (
            <button key={m} onClick={() => setViewMode(m)} className={`px-5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === m ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}>{m}</button>
          ))}
        </div>

        <button onClick={handleSave} disabled={isDeploying} className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50">
          {isDeploying ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />} {isDeploying ? 'DEPLOYING...' : 'DEPLOY'}
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-700 ${viewMode === 'split' ? 'max-w-[1800px] px-8 py-8 grid grid-cols-12 gap-8' : 'max-w-4xl py-12 px-6'}`}>

        {/* --- LEFT: EDITOR PANEL --- */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-4' : 'w-full'} space-y-6`}>
            
            {/* Typography */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2 block">Header & Text</span>
              <div className="space-y-3">
                <input value={heroData.badgeText} onChange={(e) => handleLimitChange('badgeText', e.target.value, 30)} placeholder="Badge Text" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-emerald-500" />
                <div className="grid grid-cols-2 gap-3">
                   <input value={heroData.mainTitle} onChange={(e) => handleLimitChange('mainTitle', e.target.value, 40)} placeholder="Main Title" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-emerald-500" />
                   <input value={heroData.highlightTitle} onChange={(e) => handleLimitChange('highlightTitle', e.target.value, 40)} placeholder="Highlight Title" className="w-full px-4 py-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl font-bold text-xs text-emerald-700 outline-none focus:border-emerald-500" />
                </div>
                <textarea rows="3" value={heroData.subtext} onChange={(e) => handleLimitChange('subtext', e.target.value, 200)} className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-medium outline-none resize-none focus:border-emerald-500" placeholder="Hero Description..." />
              </div>
            </div>

            {/* Badges Editor */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2 block">Feature Badges</span>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                   <p className="text-[9px] font-black text-emerald-600 uppercase flex items-center gap-1"><ShieldCheck size={12}/> Expert Badge</p>
                   <input value={heroData.certifiedTitle} onChange={(e) => handleLimitChange('certifiedTitle', e.target.value, 20)} className="w-full bg-transparent font-bold text-xs outline-none" placeholder="Title" />
                   <input value={heroData.certifiedSub} onChange={(e) => handleLimitChange('certifiedSub', e.target.value, 30)} className="w-full bg-transparent text-[10px] text-slate-500 outline-none" placeholder="Subtitle" />
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                   <p className="text-[9px] font-black text-amber-600 uppercase flex items-center gap-1"><Star size={12}/> Rating Badge</p>
                   <input value={heroData.topRatedTitle} onChange={(e) => handleLimitChange('topRatedTitle', e.target.value, 20)} className="w-full bg-transparent font-bold text-xs outline-none" placeholder="Title" />
                   <input value={heroData.topRatedSub} onChange={(e) => handleLimitChange('topRatedSub', e.target.value, 30)} className="w-full bg-transparent text-[10px] text-slate-500 outline-none" placeholder="Subtitle" />
                </div>
              </div>
            </div>
            
            {/* Stats & Media */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2 block">Stats & Visuals</span>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                 <div onClick={() => fileInputRef.current.click()} className="aspect-video border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl flex flex-col items-center justify-center group hover:border-emerald-400 transition-all cursor-pointer overflow-hidden relative">
                   <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleBgImageChange} />
                   {heroData.bgImage ? (
                     <><img src={getImageUrl(heroData.bgImage)} className="w-full h-full object-cover" /><div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold text-[8px] opacity-0 group-hover:opacity-100 transition-all">REPLACE BG</div></>
                   ) : (<Upload className="text-slate-300" size={16} />)}
                 </div>
                 <div className="space-y-3">
                   <input value={heroData.legacyYears} onChange={(e) => handleLimitChange('legacyYears', e.target.value, 5)} className="w-full p-2 bg-slate-50 rounded-lg font-black text-center text-sm outline-none text-emerald-600" placeholder="e.g. 10+" />
                   <input value={heroData.trustedCount} onChange={(e) => handleLimitChange('trustedCount', e.target.value, 10)} className="w-full p-2 bg-slate-50 rounded-lg font-black text-center text-sm outline-none text-slate-800" placeholder="e.g. +5k" />
                 </div>
              </div>

              <div className="border-t border-slate-50 pt-3">
                 <p className="text-[8px] font-black text-slate-400 uppercase mb-2">Customer Avatars</p>
                 <div className="flex gap-3">
                   {[0, 1, 2].map((index) => (
                     <div key={index} className="relative group">
                       <input type="file" id={`avatar-${index}`} className="hidden" accept="image/*" onChange={(e) => handleAvatarChange(index, e)} />
                       <label htmlFor={`avatar-${index}`} className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer overflow-hidden group-hover:border-emerald-400 transition-all">
                          {avatars[index] ? <img src={getImageUrl(avatars[index])} className="w-full h-full object-cover group-hover:opacity-50" /> : <Users size={12} className="text-slate-400" />}
                       </label>
                       {avatars[index] && <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all"><Edit3 size={10} className="text-slate-900" /></div>}
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* --- RIGHT: LIVE PREVIEW (MACBOOK MOCKUP) --- */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-8' : 'w-full'} sticky top-24`}>
            {/* MACBOOK FRAME */}
            <div className="relative mx-auto bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 overflow-hidden">
               <div className="flex h-8 bg-slate-900 items-center px-4 gap-1.5 border-b border-slate-800/50">
                 <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                 <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                 <div className="flex-1 text-center"><span className="text-[6px] font-bold uppercase tracking-widest text-slate-500">About Hero Lab Preview</span></div>
               </div>

               {/* INNER CANVAS */}
               <div className="bg-black rounded-xl overflow-hidden min-h-[500px] relative flex flex-col justify-center">
                  {heroData.bgImage && (
                    <img src={getImageUrl(heroData.bgImage)} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Background" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-0"></div>

                  <div className="relative z-10 w-full px-10 py-12 scale-95 origin-left">
                    <div className="grid grid-cols-12 gap-8 items-center">
                      
                      {/* Left Content Preview */}
                      <div className="col-span-7 space-y-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span></span>
                          <span className="text-emerald-500 font-black text-[8px] uppercase tracking-[0.2em]">{heroData.badgeText}</span>
                        </div>

                        <h1 className="text-[38px] font-black text-white leading-[1.1] tracking-tighter">
                          {heroData.mainTitle} <br />
                          <span className="text-emerald-500 relative inline-block">
                            {heroData.highlightTitle}
                          </span>
                        </h1>

                        <p className="text-zinc-300 text-[10px] max-w-sm font-medium leading-relaxed opacity-90">{heroData.subtext}</p>

                        <div className="flex gap-3 pt-2">
                          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm p-2.5 rounded-xl border border-white/10">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30"><ShieldCheck size={14} className="text-emerald-400" /></div>
                            <div>
                              <p className="text-white font-black text-[9px] uppercase leading-none">{heroData.certifiedTitle}</p>
                              <p className="text-zinc-400 text-[8px] font-medium mt-1">{heroData.certifiedSub}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm p-2.5 rounded-xl border border-white/10">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center border border-amber-500/30"><Star size={14} className="text-amber-400" /></div>
                            <div>
                              <p className="text-white font-black text-[9px] uppercase leading-none">{heroData.topRatedTitle}</p>
                              <p className="text-zinc-400 text-[8px] font-medium mt-1">{heroData.topRatedSub}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Content Preview */}
                      <div className="col-span-5 flex justify-center">
                        <div className="relative w-full max-w-[220px]">
                          <div className="absolute top-2 left-2 w-full h-full bg-emerald-500 rounded-[2rem]"></div>
                          <div className="relative bg-white p-6 rounded-[2rem] text-center shadow-2xl border border-zinc-100">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3 border border-emerald-100"><Users size={20} className="text-emerald-500" /></div>
                            <h3 className="text-4xl font-black text-zinc-950 mb-1">{heroData.legacyYears}</h3>
                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[8px] mb-4">Years Legacy</p>
                            
                            <div className="flex justify-center items-center -space-x-2 mb-3">
                              {[0, 1, 2].map((i) => avatars[i] ? (
                                <img key={i} src={getImageUrl(avatars[i])} className="w-8 h-8 rounded-full border-2 border-white object-cover relative z-[1]" />
                              ) : (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 relative z-[1]" />
                              ))}
                              <div className="w-8 h-8 rounded-full border-2 border-white bg-zinc-950 flex items-center justify-center text-[8px] font-black text-white relative z-10">{heroData.trustedCount}</div>
                            </div>
                            <div className="inline-block px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-100"><p className="text-emerald-600 font-black text-[7px] uppercase tracking-widest">Trusted by Families</p></div>
                          </div>
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

export default AboutHeroEditor;