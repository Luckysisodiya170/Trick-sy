import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../../store/index'; 
import { 
  ArrowLeft, Save, Image as ImageIcon, Sparkles, 
  Type, MousePointer2, Eye, CheckCircle, MapPin, 
  Upload, ArrowRight, Star, Settings2, Edit3, Columns, Loader2 
} from 'lucide-react';

const HeroEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const subsectionId = id || 1;

  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const [viewMode, setViewMode] = useState('split'); 
  const [activeField, setActiveField] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [imageFile, setImageFile] = useState(null); 
  
  const [heroData, setHeroData] = useState({
    badgeText: "", titleLine1: "", titleHighlight: "", titleLine3: "",
    description: "", primaryBtnText: "", secondaryBtnText: "", mainImage: null 
  });

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  // Sync Redux state to local state
  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
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

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith('http') || imagePath.startsWith('blob:') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    return `http://localhost:5000${imagePath}`;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (heroData.mainImage && heroData.mainImage.startsWith('blob:')) {
        URL.revokeObjectURL(heroData.mainImage);
      }
      
      setImageFile(file); 
      const imageUrl = URL.createObjectURL(file);
      setHeroData({ ...heroData, mainImage: imageUrl }); 
    }
  };

  const handleSave = async () => {
    setIsDeploying(true);
    try {
      let finalImageUrl = heroData.mainImage;

      if (imageFile) {
        const formData = new FormData();
        formData.append('heroImage', imageFile); 
        
        const token = localStorage.getItem('tricksyAdminToken');

        const uploadRes = await fetch('http://localhost:5000/api/upload/upload-hero', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}` 
          },
          body: formData,
        });
        
        const uploadData = await uploadRes.json();
        
        if (uploadData.success) {
          finalImageUrl = uploadData.imageUrl; 
        } else {
          throw new Error(uploadData.message || "Upload Failed");
        }
      }

      const payload = {
        badgeText: heroData.badgeText,
        titleLine1: heroData.titleLine1,
        titleHighlight: heroData.titleHighlight,
        titleLine3: heroData.titleLine3,
        description: heroData.description,
        primaryBtnText: heroData.primaryBtnText,
        secondaryBtnText: heroData.secondaryBtnText,
        images: finalImageUrl?.startsWith('blob:') ? content.images : [finalImageUrl].filter(Boolean)
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();

      alert("Hero Section Updated Successfully! ✅");
      setImageFile(null);
      
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
        <Loader2 className="animate-spin mr-2" size={16} /> Loading Hero Lab...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-100 pb-20">
      {/* ... Your JSX remains the same ... */}
      <nav className="sticky top-0 z-[50] bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 w-1/4 sm:w-1/3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic">
            <Settings2 size={20} className="text-indigo-600" /> HERO <span className="text-indigo-500">LAB</span>
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 sm:p-1.5 rounded-full shadow-inner w-auto justify-center">
          <button onClick={() => setViewMode('edit')} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'edit' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
            <Edit3 size={14} className="hidden sm:block" /> Edit
          </button>
          <button onClick={() => setViewMode('split')} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'split' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
            <Columns size={14} className="hidden sm:block" /> Split
          </button>
          <button onClick={() => setViewMode('preview')} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'preview' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
            <Eye size={14} className="hidden sm:block" /> Preview
          </button>
        </div>

        <div className="w-1/4 sm:w-1/3 flex justify-end">
          <button 
            onClick={handleSave} 
            disabled={isDeploying} 
            className="bg-slate-900 text-white px-4 sm:px-8 py-2.5 rounded-full font-extrabold text-[10px] sm:text-xs flex items-center gap-2 shadow-lg hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-50"
          >
            {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} className="hidden sm:block" />} 
            {isDeploying ? "DEPLOYING..." : "DEPLOY"}
          </button>
        </div>
      </nav>

      <div className={`mx-auto transition-all duration-500 ${viewMode === 'split' ? 'max-w-[1800px] p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4' : 'max-w-4xl p-4 mt-4'}`}>
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : ''} space-y-8 animate-in fade-in slide-in-from-left-4 duration-300`}>
            
            <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-tight border-b border-slate-100 pb-4">
                <Type size={16} className="text-indigo-500" /> Typography & Copy
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block">Badge Label</label>
                  <input value={heroData.badgeText} onFocus={() => setActiveField('badge')} onChange={(e) => setHeroData({...heroData, badgeText: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm focus:bg-white focus:border-indigo-400 outline-none transition-all" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block">Title Top</label>
                      <input placeholder="Title Line 1" value={heroData.titleLine1} onFocus={() => setActiveField('title')} onChange={(e) => setHeroData({...heroData, titleLine1: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:bg-white" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block">Title Bottom</label>
                      <input placeholder="Title Line 3" value={heroData.titleLine3} onFocus={() => setActiveField('title')} onChange={(e) => setHeroData({...heroData, titleLine3: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:bg-white" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block">Highlight Gradient Text</label>
                    <textarea placeholder="Highlight Text" value={heroData.titleHighlight} onFocus={() => setActiveField('title')} onChange={(e) => setHeroData({...heroData, titleHighlight: e.target.value})} className="w-full flex-1 min-h-[124px] p-4 bg-indigo-50/50 border border-indigo-200 rounded-xl font-black text-indigo-700 outline-none focus:bg-white resize-none transition-all" />
                  </div>
                </div>

                <div onFocus={() => setActiveField('desc')}>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block">Main Description</label>
                  <textarea rows="3" value={heroData.description} onChange={(e) => setHeroData({...heroData, description: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm leading-relaxed outline-none focus:bg-white resize-none" />
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h3 className="font-black text-[10px] uppercase text-slate-400 mb-6 flex items-center gap-2">
                   <MousePointer2 size={16} className="text-emerald-500" /> Interaction Buttons
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" onFocus={() => setActiveField('buttons')}>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 ml-1 uppercase">Primary Action Label</label>
                    <input value={heroData.primaryBtnText} onChange={(e) => setHeroData({...heroData, primaryBtnText: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs focus:bg-white transition-all outline-none" placeholder="Primary Action" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 ml-1 uppercase">Secondary Action Label</label>
                    <input value={heroData.secondaryBtnText} onChange={(e) => setHeroData({...heroData, secondaryBtnText: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs focus:bg-white transition-all outline-none" placeholder="Secondary Action" />
                  </div>
                </div>
            </section>

            <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h3 className="font-black text-[10px] uppercase text-slate-400 mb-6 flex items-center gap-2">
                   <ImageIcon size={16} className="text-rose-500" /> Hero Media
                </h3>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block">Display Image</label>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                <div onClick={() => fileInputRef.current.click()} onMouseEnter={() => setActiveField('media')} className="w-full border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-[2rem] flex flex-col items-center justify-center p-10 cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-all">
                  {heroData.mainImage ? (
                    <div className="text-center group">
                      <img src={getImageUrl(heroData.mainImage)} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl mx-auto mb-4 group-hover:scale-110 transition-transform" alt="Preview" />
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Tap to Replace</p>
                    </div>
                  ) : (
                    <>
                      <Upload size={32} className="text-slate-300 mb-2" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Image</span>
                    </>
                  )}
                </div>
            </section>
          </div>
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-7 lg:sticky lg:top-24 h-fit' : ''} animate-in fade-in duration-500`}>
             {/* ... Same Preview logic as your original code ... */}
             <div className="w-full bg-slate-900 rounded-[2.5rem] border-[10px] border-slate-900 shadow-2xl overflow-hidden relative">
              <div className="h-10 bg-slate-800 flex items-center px-6 gap-2">
                <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div></div>
                <div className="mx-auto w-64 h-5 bg-slate-700 rounded-md text-[9px] text-slate-500 flex items-center justify-center font-bold uppercase tracking-widest">tricksy-preview.io</div>
              </div>
              <div className="relative overflow-y-auto max-h-[75vh] bg-white custom-scrollbar">
                <div className="relative bg-gradient-to-br from-indigo-50 via-white to-indigo-50/40 py-20 px-10 min-h-[600px] flex items-center overflow-hidden">
                  <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-100 rounded-full blur-[100px] opacity-60"></div>
                  <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-100 rounded-full blur-[100px] opacity-50"></div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full z-10">
                    <div className={`space-y-8 ${viewMode === 'split' ? 'text-center' : 'text-left'}`}>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm transition-all ${activeField === 'badge' ? 'scale-110 ring-4 ring-indigo-100' : ''}`}><Star className="w-4 h-4 fill-indigo-500 text-indigo-500" /><span className="text-xs font-black text-indigo-700 uppercase tracking-wide">{heroData.badgeText || "BADGE LABEL"}</span></div>
                      <h1 className={`text-5xl font-extrabold text-slate-900 leading-[1.1] transition-all ${activeField === 'title' ? 'scale-[1.02] translate-x-2' : ''}`}>{heroData.titleLine1} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">{heroData.titleHighlight}</span> <br/>{heroData.titleLine3}</h1>
                      <p className={`text-slate-600 leading-relaxed transition-all ${activeField === 'desc' ? 'text-slate-900 font-medium' : ''}`}>{heroData.description}</p>
                      <div className={`flex gap-4 ${viewMode === 'split' ? 'justify-center' : 'justify-start'} transition-all ${activeField === 'buttons' ? 'scale-105' : ''}`}>
                        <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-xs shadow-xl active:scale-95 transition-transform">{heroData.primaryBtnText || "Action 1"}</button>
                        <button className="bg-white border-2 border-slate-100 text-slate-700 px-8 py-4 rounded-2xl font-bold text-xs shadow-sm">{heroData.secondaryBtnText || "Action 2"}</button>
                      </div>
                    </div>
                    <div className="flex justify-center relative">
                        <div className={`relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-[10px] border-white shadow-2xl overflow-hidden bg-slate-50 transition-all duration-500 ${activeField === 'media' ? 'scale-110 ring-8 ring-indigo-50' : ''}`}>
                          {heroData.mainImage ? ( <img src={getImageUrl(heroData.mainImage)} className="w-full h-full object-cover" alt="Hero" /> ) : ( <div className="w-full h-full flex flex-col items-center justify-center text-slate-200"><ImageIcon size={64} /></div> )}
                        </div>
                        <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce shadow-indigo-100"><div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500"><CheckCircle size={20}/></div><div className="font-black text-[10px] text-slate-800 uppercase leading-none">100% Quality<br/><span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Guaranteed</span></div></div>
                        <div className="absolute bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 shadow-indigo-100"><div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><MapPin size={20}/></div><div className="font-black text-[10px] text-slate-800 uppercase leading-none">Fast Service<br/><span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Across City</span></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default HeroEditor;