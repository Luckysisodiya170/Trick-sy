import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../../store/index'; 
import { 
  ArrowLeft, Save, Image as ImageIcon, Sparkles, 
  CheckCircle2, Award, Users, Upload, ArrowRight, 
  Settings2, Edit3, Columns, Eye, Type, ListChecks, Loader2 
} from 'lucide-react';

const AboutEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mainImageRef = useRef(null);
  const detailImageRef = useRef(null);
  const { id } = useParams();
  const subsectionId = 2; // About Section ID is 2

  // Redux States
  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const [viewMode, setViewMode] = useState('split'); 
  const [activeField, setActiveField] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  
  // Image Files for Uploading to Server
  const [mainFile, setMainFile] = useState(null);
  const [detailFile, setDetailFile] = useState(null);
  const [profileFiles, setProfileFiles] = useState([null, null, null]);

  // Local State for Form
  const [aboutData, setAboutData] = useState({
    badge: "",
    title: "",
    highlightText: "",
    description: "",
    features: ["", "", "", ""],
    yearsExp: "",
    customersText: "",
    mainImage: null,
    detailImage: null,
    profileImages: [null, null, null] 
  });

  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setAboutData({
        badge: content.badge || "About TRICKSY",
        title: content.title || "We Provide The Best",
        highlightText: content.highlightText || "Home Maintenance",
        description: content.description || "",
        features: content.features?.length > 0 ? content.features : ["", "", "", ""],
        yearsExp: content.yearsExp || "10+",
        customersText: content.customersText || "5k+",
        mainImage: content.images?.[0] || null,
        detailImage: content.images?.[1] || null,
        profileImages: [
          content.images?.[2] || null,
          content.images?.[3] || null,
          content.images?.[4] || null
        ]
      });
    }
  }, [content]);

  const updateField = (field, value) => setAboutData({ ...aboutData, [field]: value });

  const handleImageUpload = (e, type, index = 0) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === 'main') {
        setMainFile(file);
        setAboutData(prev => ({ ...prev, mainImage: imageUrl }));
      } else if (type === 'detail') {
        setDetailFile(file);
        setAboutData(prev => ({ ...prev, detailImage: imageUrl }));
      } else if (type === 'profile') {
        const newFiles = [...profileFiles];
        newFiles[index] = file;
        setProfileFiles(newFiles);

        const newProfiles = [...aboutData.profileImages];
        newProfiles[index] = imageUrl;
        setAboutData(prev => ({ ...prev, profileImages: newProfiles }));
      }
    }
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...aboutData.features];
    updatedFeatures[index] = value;
    setAboutData({ ...aboutData, features: updatedFeatures });
  };

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith('blob:') || path.startsWith('data:') || path.startsWith('http')) return path;
    return `http://localhost:5000${path}`;
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    const token = localStorage.getItem('tricksyAdminToken');

    try {
      let finalMainImage = content.images?.[0] || null;
      let finalDetailImage = content.images?.[1] || null;
      let finalProfiles = [
        content.images?.[2] || null,
        content.images?.[3] || null,
        content.images?.[4] || null
      ];

      const uploadImg = async (file) => {
        const fd = new FormData();
        fd.append('heroImage', file); 
        const res = await fetch('http://localhost:5000/api/upload/upload-hero', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: fd
        });
        const data = await res.json();
        if (!data.success) throw new Error("Image Upload Failed");
        return data.imageUrl;
      };

      if (mainFile) finalMainImage = await uploadImg(mainFile);
      if (detailFile) finalDetailImage = await uploadImg(detailFile);
      
      for (let i = 0; i < 3; i++) {
        if (profileFiles[i]) {
          finalProfiles[i] = await uploadImg(profileFiles[i]);
        }
      }

      const imagesArray = [finalMainImage, finalDetailImage, ...finalProfiles].filter(Boolean);

      const payload = {
        badge: aboutData.badge,
        title: aboutData.title,
        highlightText: aboutData.highlightText,
        description: aboutData.description,
        features: aboutData.features, 
        yearsExp: aboutData.yearsExp,
        customersText: aboutData.customersText,
        images: imagesArray 
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();
navigate('/admin/pages/home');

      alert("About Section Deployed! 🚀");
      setMainFile(null);
      setDetailFile(null);
      setProfileFiles([null, null, null]);
      
    } catch (err) {
      console.error("Deploy Error:", err);
      alert(`Deploy Failed: ${err.message || "Database update error"}`);
    } finally {
      setIsDeploying(false);
    }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> Loading About Lab...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-emerald-100 pb-20">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-[50] bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 w-1/4 sm:w-1/3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic">
            <Settings2 size={20} className="text-emerald-600" /> ABOUT <span className="text-emerald-500">LAB</span>
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 sm:p-1.5 rounded-full shadow-inner w-auto justify-center">
          <button onClick={() => setViewMode('edit')} className={`px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all ${viewMode === 'edit' ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500'}`}>Edit</button>
          <button onClick={() => setViewMode('split')} className={`px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all ${viewMode === 'split' ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500'}`}>Split</button>
          <button onClick={() => setViewMode('preview')} className={`px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all ${viewMode === 'preview' ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500'}`}>Preview</button>
        </div>

        <div className="w-1/4 sm:w-1/3 flex justify-end">
          <button 
            onClick={handleDeploy} 
            disabled={isDeploying}
            className="bg-slate-900 text-white px-4 sm:px-8 py-2.5 rounded-full font-extrabold text-[10px] sm:text-xs flex items-center gap-2 shadow-lg hover:bg-emerald-600 transition-all disabled:opacity-50"
          >
            {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {isDeploying ? 'DEPLOYING...' : 'DEPLOY'}
          </button>
        </div>
      </nav>

      <div className={`mx-auto transition-all duration-500 ${viewMode === 'split' ? 'max-w-[1800px] p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4' : 'max-w-4xl p-4 mt-4'}`}>
        
        {/* EDIT PANEL */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : ''} space-y-6 sm:space-y-8 animate-in fade-in duration-300`}>
            
            {/* Typography */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-tight border-b border-slate-100 pb-4">
                <Type size={16} className="text-emerald-500" /> Typography & Copy
              </h3>
              <div className="space-y-5">
                <div onFocus={() => setActiveField('badge')}>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Badge Text</label>
                  <input value={aboutData.badge} onChange={(e) => updateField('badge', e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-emerald-400 focus:bg-white transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-5" onFocus={() => setActiveField('title')}>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Headline</label>
                    <input value={aboutData.title} onChange={(e) => updateField('title', e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-emerald-400 focus:bg-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2 block ml-1">Highlight</label>
                    <input value={aboutData.highlightText} onChange={(e) => updateField('highlightText', e.target.value)} className="w-full p-3.5 bg-emerald-50/50 border border-emerald-200 rounded-xl font-black text-emerald-700 outline-none" />
                  </div>
                </div>
                <div onFocus={() => setActiveField('desc')}>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Description</label>
                  <textarea rows="3" value={aboutData.description} onChange={(e) => updateField('description', e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium outline-none focus:border-emerald-400 focus:bg-white resize-none" />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8" onFocus={() => setActiveField('features')}>
              <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-tight border-b border-slate-100 pb-4">
                <ListChecks size={16} className="text-emerald-500" /> Feature Points
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aboutData.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 focus-within:border-emerald-400 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <input value={f} onChange={(e) => handleFeatureChange(i, e.target.value)} className="w-full bg-transparent font-bold text-slate-700 text-sm outline-none" />
                  </div>
                ))}
              </div>
            </div>

            {/* Stats & Media */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm" onFocus={() => setActiveField('stats')}>
                  <h3 className="font-black text-slate-900 mb-4 text-xs uppercase tracking-tight">Stats & Details</h3>
                  <div className="space-y-4">
                    <input value={aboutData.yearsExp} onChange={(e) => updateField('yearsExp', e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl font-black text-xl border border-slate-100" placeholder="Years Exp" />
                    <input value={aboutData.customersText} onChange={(e) => updateField('customersText', e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl font-black text-xl border border-slate-100" placeholder="Customers" />
                    
                    {/* NEW: Uploaders for the 3 small Avatars */}
                    <div className="pt-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Client Avatars (3 Images)</label>
                       <div className="flex gap-3">
                         {[0, 1, 2].map((idx) => (
                           <label key={idx} className="w-12 h-12 bg-slate-100 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer overflow-hidden relative group hover:border-emerald-400 transition-all">
                              <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, 'profile', idx)} />
                              {aboutData.profileImages[idx] ? (
                                  <img src={getImageUrl(aboutData.profileImages[idx])} className="w-full h-full object-cover" alt="Profile" />
                              ) : (
                                  <Upload size={14} className="text-slate-400 group-hover:text-emerald-500" />
                              )}
                           </label>
                         ))}
                       </div>
                    </div>
                  </div>
               </div>
               
               <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm" onFocus={() => setActiveField('media')}>
                  <h3 className="font-black text-slate-900 mb-4 text-xs uppercase tracking-tight">Main Media</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div onClick={() => mainImageRef.current.click()} className="h-24 bg-slate-100 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden">
                      <input type="file" ref={mainImageRef} hidden onChange={(e) => handleImageUpload(e, 'main')} />
                      {aboutData.mainImage ? <img src={getImageUrl(aboutData.mainImage)} className="w-full h-full object-cover" /> : <Upload size={18} />}
                    </div>
                    <div onClick={() => detailImageRef.current.click()} className="h-24 bg-slate-100 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden">
                      <input type="file" ref={detailImageRef} hidden onChange={(e) => handleImageUpload(e, 'detail')} />
                      {aboutData.detailImage ? <img src={getImageUrl(aboutData.detailImage)} className="w-full h-full object-cover" /> : <Upload size={18} />}
                    </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* PREVIEW PANEL */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-7 lg:sticky lg:top-24 h-fit' : ''} animate-in fade-in zoom-in-95 duration-500`}>
            <div className="w-full bg-white rounded-3xl border-8 border-slate-900 shadow-2xl overflow-hidden relative">
              
              <div className="h-10 bg-slate-100 border-b flex items-center px-4 gap-2">
                <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div><div className="w-2.5 h-2.5 rounded-full bg-green-400"></div></div>
              </div>

              <div className="relative p-10 bg-white overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  
                  {/* Preview Left */}
                  <div className="relative">
                    <div className="w-full h-[300px] bg-slate-100 rounded-[2rem] overflow-hidden border-4 border-white shadow-lg">
                      {aboutData.mainImage ? <img src={getImageUrl(aboutData.mainImage)} className="w-full h-full object-cover" /> : <ImageIcon size={40} className="m-auto text-slate-300" />}
                    </div>
                    <div className="absolute -bottom-6 -right-4 w-32 h-32 bg-white rounded-2xl p-1.5 shadow-xl">
                      <div className="w-full h-full bg-slate-50 rounded-xl overflow-hidden">
                         {aboutData.detailImage ? <img src={getImageUrl(aboutData.detailImage)} className="w-full h-full object-cover" /> : <ImageIcon size={20} className="m-auto text-slate-300" />}
                      </div>
                    </div>
                    <div className="absolute top-1/2 -left-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white"><Award size={18} /></div>
                      <div><p className="text-xl font-black leading-none">{aboutData.yearsExp}</p><p className="text-[8px] font-bold text-slate-400 uppercase">Years</p></div>
                    </div>
                  </div>

                  {/* Preview Right */}
                  <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                      <Sparkles size={10} /> {aboutData.badge}
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 leading-tight">
                      {aboutData.title} <span className="text-emerald-500">{aboutData.highlightText}</span>
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed">{aboutData.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {aboutData.features.filter(f => f.trim() !== "").map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          <span className="text-xs font-bold text-slate-700">{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* --- UPDATED CUSTOMERS/AVATARS SECTION HERE --- */}
                    <div className={`pt-6 sm:pt-8 flex items-center gap-4 sm:gap-6 border-t border-slate-100 transition-all ${activeField === 'stats' ? 'translate-x-2' : ''}`}>
                       <div className="flex -space-x-3">
                          {aboutData.profileImages.map((img, i) => (
                             <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                                {img ? (
                                   <img src={getImageUrl(img)} className="w-full h-full object-cover" alt="Client" />
                                ) : (
                                   <Users size={16} className="text-slate-400" />
                                )}
                             </div>
                          ))}
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0">+</div>
                       </div>
                       <div>
                          <p className="text-lg sm:text-xl font-black text-slate-900 leading-none">{aboutData.customersText}</p>
                          <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Active Clients</p>
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

export default AboutEditor;