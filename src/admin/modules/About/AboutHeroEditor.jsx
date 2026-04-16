import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../../store/index'; 
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

  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const [viewMode, setViewMode] = useState('split'); 
  const [isDeploying, setIsDeploying] = useState(false);
  
  // Image States
  const [bgImageFile, setBgImageFile] = useState(null);
  const [avatarFiles, setAvatarFiles] = useState([null, null, null]);
  const [avatars, setAvatars] = useState([null, null, null]);
  
  const [heroData, setHeroData] = useState({
    badgeText: "",
    mainTitle: "",
    highlightTitle: "",
    subtext: "",
    certifiedTitle: "",
    certifiedSub: "",
    topRatedTitle: "",
    topRatedSub: "",
    legacyYears: "",
    trustedCount: "",
    bgImage: null 
  });

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  // Sync Redux state 
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

      // avatars 
      const existingAvatars = content.images ? content.images.slice(1, 4) : [];
      setAvatars([
        existingAvatars[0] || null,
        existingAvatars[1] || null,
        existingAvatars[2] || null
      ]);
    }
  }, [content]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith('http') || imagePath.startsWith('blob:') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    return `http://localhost:5000${imagePath}`;
  };

  const handleBgImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (heroData.bgImage && heroData.bgImage.startsWith('blob:')) {
        URL.revokeObjectURL(heroData.bgImage);
      }
      setBgImageFile(file); 
      const imageUrl = URL.createObjectURL(file);
      setHeroData({ ...heroData, bgImage: imageUrl }); 
    }
  };

  const handleAvatarChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newAvatarFiles = [...avatarFiles];
      const newAvatars = [...avatars];

      if (newAvatars[index] && newAvatars[index].startsWith('blob:')) {
        URL.revokeObjectURL(newAvatars[index]);
      }

      newAvatarFiles[index] = file;
      newAvatars[index] = URL.createObjectURL(file);

      setAvatarFiles(newAvatarFiles);
      setAvatars(newAvatars);
    }
  };

  const handleSave = async () => {
    setIsDeploying(true);
    try {
      const token = localStorage.getItem('tricksyAdminToken');

      const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('heroImage', file); 
        const res = await fetch('http://localhost:5000/api/upload/upload-hero', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Upload Failed");
        return data.imageUrl;
      };

      let finalBgUrl = heroData.bgImage;
      if (bgImageFile) {
        finalBgUrl = await uploadFile(bgImageFile);
      }

      let finalAvatars = [...avatars];
      for (let i = 0; i < 3; i++) {
        if (avatarFiles[i]) {
          finalAvatars[i] = await uploadFile(avatarFiles[i]);
        } else if (finalAvatars[i]?.startsWith('blob:')) {
          finalAvatars[i] = content.images?.[i + 1] || null;
        }
      }

      const finalImagesArray = [finalBgUrl, finalAvatars[0], finalAvatars[1], finalAvatars[2]].filter(Boolean);

      const payload = {
        badgeText: heroData.badgeText,
        mainTitle: heroData.mainTitle,
        highlightTitle: heroData.highlightTitle,
        subtext: heroData.subtext,
        certifiedTitle: heroData.certifiedTitle,
        certifiedSub: heroData.certifiedSub,
        topRatedTitle: heroData.topRatedTitle,
        topRatedSub: heroData.topRatedSub,
        legacyYears: heroData.legacyYears,
        trustedCount: heroData.trustedCount,
        images: finalImagesArray
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();
navigate('/admin/pages/about');
      alert("About Section Updated Successfully! ✅");
      setBgImageFile(null);
      setAvatarFiles([null, null, null]);
      
    } catch (error) {
      console.error("Update failed:", error);
      alert(`Error: ${error.message || "Failed to update database."}`);
    } finally {
      setIsDeploying(false);
    }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> Loading About Lab...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      
      {/* ---  NAVBAR --- */}
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-3 lg:px-6 py-3 flex items-center justify-between shadow-sm gap-2">
        <div className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm lg:text-lg font-black tracking-tighter italic flex items-center gap-1.5">
            <Settings2 size={18} className="text-indigo-600 lg:w-5 lg:h-5" /> 
            <span className="tracking-tight uppercase">ABOUT EDITOR</span> 
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
                viewMode === mode.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'
              }`}
            >
              <mode.icon size={12} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className={`${viewMode === mode.id ? 'inline' : 'hidden sm:inline'}`}>{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave}
          disabled={isDeploying}
          className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-indigo-600 transition-all flex-shrink-0 active:scale-95 disabled:opacity-50"
        >
          {isDeploying ? <Loader2 size={16} className="animate-spin lg:w-[14px] lg:h-[14px]" /> : <Save size={16} className="lg:w-[14px] lg:h-[14px]" />} 
          <span className="hidden md:inline">{isDeploying ? "SAVING..." : "SAVE CHANGES"}</span>
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-500 ${viewMode === 'split' ? 'max-w-[1800px] p-6 grid grid-cols-1 lg:grid-cols-12 gap-10' : 'max-w-4xl p-6'}`}>

        {/* --- EDITOR SIDE --- */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : ''} space-y-6`}>
            
            {/* Header Text Editor */}
            <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm uppercase tracking-tight border-b pb-4">
                <Type size={16} className="text-indigo-500" /> Header & Text
              </h3>
              <div className="space-y-4">
                <input value={heroData.badgeText} onChange={(e) => setHeroData({...heroData, badgeText: e.target.value})} placeholder="Badge Text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-indigo-400" />
                <input value={heroData.mainTitle} onChange={(e) => setHeroData({...heroData, mainTitle: e.target.value})} placeholder="Main Title" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-t-xl font-bold text-sm outline-none" />
                <input value={heroData.highlightTitle} onChange={(e) => setHeroData({...heroData, highlightTitle: e.target.value})} placeholder="Highlight Title" className="w-full p-4 bg-emerald-50/50 border border-emerald-100 rounded-b-xl font-black text-emerald-700 outline-none" />
                <textarea rows="3" value={heroData.subtext} onChange={(e) => setHeroData({...heroData, subtext: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium outline-none resize-none" />
              </div>
            </section>

            {/* Badges Editor */}
            <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm uppercase tracking-tight border-b pb-4">
                <ShieldCheck size={16} className="text-emerald-500" /> Feature Badges
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                   <p className="text-[10px] font-black text-emerald-600 uppercase">Expert Badge</p>
                   <input value={heroData.certifiedTitle} onChange={(e) => setHeroData({...heroData, certifiedTitle: e.target.value})} className="w-full bg-transparent font-bold text-sm outline-none" />
                   <input value={heroData.certifiedSub} onChange={(e) => setHeroData({...heroData, certifiedSub: e.target.value})} className="w-full bg-transparent text-xs text-slate-500 outline-none" />
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                   <p className="text-[10px] font-black text-amber-600 uppercase">Rating Badge</p>
                   <input value={heroData.topRatedTitle} onChange={(e) => setHeroData({...heroData, topRatedTitle: e.target.value})} className="w-full bg-transparent font-bold text-sm outline-none" />
                   <input value={heroData.topRatedSub} onChange={(e) => setHeroData({...heroData, topRatedSub: e.target.value})} className="w-full bg-transparent text-xs text-slate-500 outline-none" />
                </div>
              </div>
            </section>
            
            {/* Stats & Avatar Editor */}
            <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm uppercase tracking-tight border-b pb-4">
                <Users size={16} className="text-indigo-500" /> Stats & Avatars
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 block">Legacy Years</label>
                  <input value={heroData.legacyYears} onChange={(e) => setHeroData({...heroData, legacyYears: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 block">Trusted Count</label>
                  <input value={heroData.trustedCount} onChange={(e) => setHeroData({...heroData, trustedCount: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none" />
                </div>
                
                {/* NEW: Avatar Uploader */}
                <div className="col-span-2 space-y-3 mt-2 border-t border-slate-100 pt-5">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 block">Client Avatars (Optional)</label>
                  <div className="flex gap-4">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="relative group">
                        <input type="file" id={`avatar-${index}`} className="hidden" accept="image/*" onChange={(e) => handleAvatarChange(index, e)} />
                        <label htmlFor={`avatar-${index}`} className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all overflow-hidden shadow-sm">
                           {avatars[index] ? (
                               <img src={getImageUrl(avatars[index])} className="w-full h-full object-cover group-hover:opacity-50 transition-all" alt={`Avatar ${index + 1}`} />
                           ) : (
                               <Upload size={14} className="text-slate-400 group-hover:text-indigo-500" />
                           )}
                        </label>
                        {avatars[index] && (
                           <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all">
                              <Edit3 size={12} className="text-slate-900 drop-shadow-md" />
                           </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* Image Upload */}
            <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-4">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">Banner Background</h3>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleBgImageChange} />
              <div onClick={() => fileInputRef.current.click()} className="w-full h-40 border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl flex flex-col items-center justify-center group hover:bg-indigo-50 transition-all cursor-pointer overflow-hidden relative">
                {heroData.bgImage ? (
                  <>
                    <img src={getImageUrl(heroData.bgImage)} className="w-full h-full object-cover opacity-50" alt="bg" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">Change Image</div>
                  </>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto text-slate-300 mb-2" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Banner Image</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

      {/* --- LIVE PREVIEW --- */}
      {(viewMode === 'preview' || viewMode === 'split') && (
        <div className={`${viewMode === 'split' ? 'lg:col-span-7 lg:sticky lg:top-24' : 'w-full'} h-fit animate-in fade-in max-w-full overflow-hidden`}>
          <div className="w-full bg-slate-900 rounded-[2rem] border-[6px] border-slate-950 shadow-2xl overflow-hidden relative">
            
            {/* Browser Header */}
            <div className="flex h-6 bg-slate-800/50 items-center px-4 gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
            </div>

            {/* --- HERO SECTION  --- */}
            <section className="relative min-h-[500px] lg:min-h-[650px] bg-black overflow-hidden flex items-center py-12 lg:py-20">
              
              {/* Background Layer */}
              {heroData.bgImage && (
                <img src={getImageUrl(heroData.bgImage)} className="absolute inset-0 w-full h-full object-cover opacity-100" alt="Background" />
              )}
              <div className="absolute inset-0 bg-black/70"></div>

              <div className="w-full px-6 lg:px-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  
                  {/* LEFT CONTENT */}
                  <div className="lg:col-span-7 space-y-5 lg:space-y-6 text-left">
                    
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-sm">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      <span className="text-emerald-500 font-black text-[9px] lg:text-[10px] uppercase tracking-[0.2em]">
                        {heroData.badgeText}
                      </span>
                    </div>

                    {/* Responsive Title */}
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter">
                      {heroData.mainTitle} <br />
                      <span className="text-emerald-500 relative inline-block mt-1">
                        {heroData.highlightTitle}
                        <svg className="absolute -bottom-1.5 left-0 w-full h-2 text-emerald-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                          <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                        </svg>
                      </span>
                    </h1>

                    <p className="text-zinc-300 text-[10px] lg:text-sm max-w-lg font-medium leading-relaxed opacity-90">
                      {heroData.subtext}
                    </p>

                    {/* BADGES  */}
                    <div className="flex flex-row items-center gap-3 lg:gap-4 pt-2 w-full max-w-md overflow-hidden">
                      <div className="flex flex-1 items-center gap-2 bg-white p-2 lg:p-2.5 rounded-xl shadow-lg border border-zinc-100 min-w-0">
                        <div className="flex-shrink-0 w-7 h-7 lg:w-9 lg:h-9 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
                          <ShieldCheck size={14} className="text-emerald-500 lg:w-4 lg:h-4" />
                        </div>
                        <div className="min-w-0 overflow-hidden">
                          <p className="text-zinc-950 font-black text-[8px] lg:text-[10px] uppercase truncate leading-none">{heroData.certifiedTitle}</p>
                          <p className="text-zinc-500 text-[7px] lg:text-[8px] font-medium mt-1 truncate">{heroData.certifiedSub}</p>
                        </div>
                      </div>

                      <div className="flex flex-1 items-center gap-2 bg-white p-2 lg:p-2.5 rounded-xl shadow-lg border border-zinc-100 min-w-0">
                        <div className="flex-shrink-0 w-7 h-7 lg:w-9 lg:h-9 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-100">
                          <Star size={14} className="text-amber-500 lg:w-4 lg:h-4" />
                        </div>
                        <div className="min-w-0 overflow-hidden">
                          <p className="text-zinc-950 font-black text-[8px] lg:text-[10px] uppercase truncate leading-none">{heroData.topRatedTitle}</p>
                          <p className="text-zinc-500 text-[7px] lg:text-[8px] font-medium mt-1 truncate">{heroData.topRatedSub}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE CARD */}
                  <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-[200px] lg:max-w-[260px]">
                      <div className="absolute top-2 left-2 w-full h-full bg-emerald-500 rounded-[2rem]"></div>
                      <div className="relative bg-white p-5 lg:p-7 rounded-[2rem] text-center shadow-xl border border-zinc-50">
                        <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3 border border-emerald-100">
                          <Users size={20} className="text-emerald-500 lg:w-6 lg:h-6" />
                        </div>
                        <h3 className="text-3xl lg:text-5xl font-black text-zinc-950 mb-1">{heroData.legacyYears}</h3>
                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-[7px] lg:text-[9px] mb-4">Years Legacy</p>
                        
                        {/* --- NEW: AVATARS PREVIEW MAPPING --- */}
                        <div className="flex justify-center items-center -space-x-2 mb-4">
                          {[0, 1, 2].map((i) => (
                            avatars[i] ? (
                              <img 
                                key={i} 
                                src={getImageUrl(avatars[i])} 
                                className="w-7 h-7 lg:w-10 lg:h-10 rounded-full border-2 border-white object-cover shadow-sm relative z-[1]" 
                                alt={`Client ${i+1}`} 
                              />
                            ) : (
                              <div 
                                key={i} 
                                className="w-7 h-7 lg:w-10 lg:h-10 rounded-full border-2 border-white bg-slate-200 relative z-[1]" 
                              />
                            )
                          ))}
                          <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-full border-2 border-white bg-zinc-950 flex items-center justify-center text-[8px] lg:text-[10px] font-black text-white relative z-10">
                            {heroData.trustedCount}
                          </div>
                        </div>

                        <div className="inline-block px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-100">
                          <p className="text-emerald-600 font-black text-[7px] lg:text-[8px] uppercase tracking-widest">Trusted by Families</p>
                        </div>
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
};

export default AboutHeroEditor;