import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { AdminService } from '../../services/adminService';
import { 
  ArrowLeft, Save, Image as ImageIcon, Type, Undo, Loader2, Upload, Settings2, Columns, Eye, Globe
} from 'lucide-react';

const TechnicalHeroEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const fileInputRef = useRef(null);
  
  const sidebarTree = useSelector((state) => state.adminData?.sidebarTree || []);
  const content = useSelector((state) => state.adminData?.activeSubsection);
  const status = useSelector((state) => state.adminData?.status || '');

  const currentSection = sidebarTree.find(s => s.slug === 'technical');
  const subsectionId = id || location.state?.sectionId || 22; 

  const [viewMode, setViewMode] = useState('split'); 
  const [activeField, setActiveField] = useState(null);
  
  const [isDeploying, setIsDeploying] = useState(false);
  const [isUploading, setIsUploading] = useState(false); 
  
  const [imageFile, setImageFile] = useState(null); 
  const [hasLoaded, setHasLoaded] = useState(false);
  
  const [formData, setFormData] = useState({
    badgeText: "", 
    titlePart1: "", 
    titleAccent: "", 
    description: "", 
    mainImage: null 
  });

  useEffect(() => {
    if (subsectionId) {
      dispatch(fetchSingleSubsectionContent(subsectionId));
    }
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0 && !hasLoaded) {
      if (content.id == subsectionId || content.subsectionId == subsectionId) {
        setFormData({
          badgeText: content.badgeText ?? "",
          titlePart1: content.titleLine1 ?? "",
          titleAccent: content.titleHighlight ?? "",
          description: content.description ?? "",
          mainImage: content.images?.[0] ?? null 
        });
        setHasLoaded(true);
      }
    }
  }, [content, subsectionId, hasLoaded]);

  const handleLimitChange = (field, val, limit) => {
    if (val.length <= limit) setFormData(prev => ({ ...prev, [field]: val }));
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith('http') || imagePath.startsWith('blob:') || imagePath.startsWith('data:')) return imagePath;
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    const domain = apiBase.replace('/api', ''); 
    return `${domain}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (formData.mainImage && formData.mainImage.startsWith('blob:')) {
        URL.revokeObjectURL(formData.mainImage);
      }
      setImageFile(file); 
      setFormData(prev => ({ ...prev, mainImage: URL.createObjectURL(file) })); 
    }
  };

  const handleReset = () => {
    if(window.confirm('Reset to saved values?')) {
      setFormData({
        badgeText: content.badgeText ?? "",
        titlePart1: content.titleLine1 ?? "",
        titleAccent: content.titleHighlight ?? "",
        description: content.description ?? "",
        mainImage: content.images?.[0] ?? null
      });
      setImageFile(null);
    }
  };

  const handleSave = async () => {
    if (!subsectionId) return alert("Error: Missing Subsection ID.");
    setIsDeploying(true);
    try {
      let finalImageUrl = formData.mainImage;
      
      if (imageFile) {
        setIsUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append('image', imageFile); 
        
        const uploadData = await AdminService.uploadHeroImage(uploadFormData);
        
        if (uploadData.success || uploadData.imageUrl) {
            finalImageUrl = uploadData.imageUrl;
            setImageFile(null);
        } else {
            throw new Error("Image Upload Failed");
        }
        setIsUploading(false);
      }

      const payload = { 
        badgeText: formData.badgeText,
        titleLine1: formData.titlePart1,
        titleHighlight: formData.titleAccent,
        description: formData.description,
        images: finalImageUrl?.startsWith('blob:') ? content.images : [finalImageUrl].filter(Boolean) 
      };

      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      await dispatch(fetchSingleSubsectionContent(subsectionId)).unwrap();
      
      navigate('/admin/pages/technical');
      alert("Technical Hero Deployed! 🚀");
    } catch (error) {
      console.error(error);
      setIsUploading(false);
      alert(`Error: ${error.message}`);
    } finally { 
      setIsDeploying(false); 
    }
  };

  const safeText = (text) => text === '' ? '\u00A0' : text;

  if (status.includes('loading') && !hasLoaded) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING HERO LAB...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans overflow-hidden selection:bg-emerald-100">
      
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-900">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-[13px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <Settings2 size={16} className="text-emerald-600" /> Tech Hero <span className="text-emerald-400">Lab</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {['edit', 'split', 'preview'].map((mode) => (
            <button key={mode} onClick={() => setViewMode(mode)} className={`px-5 py-1.5 rounded-lg text-[9px] font-black tracking-widest transition-all ${viewMode === mode ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
              {mode.toUpperCase()}
            </button>
          ))}
        </div>

        <button onClick={handleSave} disabled={isDeploying || isUploading} className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-600 transition-all disabled:opacity-50 flex items-center gap-2">
          {(isDeploying || isUploading) ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
          <span>{(isDeploying || isUploading) ? "DEPLOYING..." : "DEPLOY"}</span>
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-700 ${viewMode === 'split' ? 'max-w-[1700px] px-8 py-8 grid grid-cols-12 gap-8' : 'max-w-4xl py-12 px-6'}`}>
        
        {/* LEFT: EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-4' : 'w-full'} space-y-6`}>
            
            <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm space-y-5">
              <div className="flex items-center justify-between mb-2">
                 <div className="flex items-center gap-2 text-slate-400">
                    <Type size={14}/> <span className="text-[9px] font-black uppercase tracking-[0.2em]">Text Content</span>
                 </div>
                 <button onClick={handleReset} className="text-[8px] font-black uppercase tracking-widest text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-1">
                    <Undo size={10} /> Reset
                 </button>
              </div>
              
              <div className="space-y-4">
                <div className="group">
                  <label className="text-[8px] font-black text-slate-400 uppercase ml-1 mb-1 block">Badge Text</label>
                  <input value={formData.badgeText} onFocus={() => setActiveField('badge')} onChange={(e) => handleLimitChange('badgeText', e.target.value, 30)} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-sm" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[8px] font-black text-slate-400 uppercase ml-1 mb-1 block">Title Part 1</label>
                    <input value={formData.titlePart1} onFocus={() => setActiveField('title')} onChange={(e) => handleLimitChange('titlePart1', e.target.value, 40)} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-emerald-500 transition-all shadow-sm" />
                  </div>
                  <div>
                    <label className="text-[8px] font-black text-emerald-600 uppercase ml-1 mb-1 block underline italic">Highlight</label>
                    <input value={formData.titleAccent} onFocus={() => setActiveField('title')} onChange={(e) => handleLimitChange('titleAccent', e.target.value, 40)} className="w-full px-4 py-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl font-black text-xs text-emerald-700 outline-none focus:border-emerald-500 transition-all shadow-sm" />
                  </div>
                </div>
                
                <div>
                   <label className="text-[8px] font-black text-slate-400 uppercase ml-1 mb-1 block">Description</label>
                   <textarea rows="4" value={formData.description} onFocus={() => setActiveField('desc')} onChange={(e) => handleLimitChange('description', e.target.value, 200)} className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl font-medium text-xs leading-relaxed outline-none focus:border-emerald-500 resize-none shadow-sm" />
                </div>
              </div>
            </div>

            {/* VISUAL ASSET */}
            <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><ImageIcon size={14}/> Background Cover</span>
                  <button onClick={() => fileInputRef.current.click()} className="text-[8px] font-black text-emerald-600 border-b border-emerald-200 pb-0.5">CHANGE</button>
               </div>
               <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
               <div className="w-full aspect-video bg-slate-50 rounded-2xl overflow-hidden group relative border border-slate-100 cursor-pointer" onClick={() => fileInputRef.current.click()}>
                 {formData.mainImage ? (
                    <img src={getImageUrl(formData.mainImage)} className="w-full h-full object-cover" alt="Hero Background" />
                 ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 group-hover:text-emerald-400 transition-all">
                       <Upload size={24} className="mb-2" />
                       <span className="text-[9px] font-bold uppercase tracking-widest">Optional Image</span>
                    </div>
                 )}
                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all text-white font-black text-[10px] uppercase tracking-widest">
                    Edit Media
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* RIGHT: DARK PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-8' : 'w-full'} sticky top-24`}>
            <div className="relative mx-auto bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 overflow-hidden">
               {/* Browser bar */}
               <div className="flex h-8 bg-slate-900 items-center px-4 gap-1.5 border-b border-white/5 shrink-0 relative z-20">
                  <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" /></div>
                  <div className="flex-1 text-center flex items-center justify-center gap-1.5">
                     <Globe size={10} className="text-white/40" />
                     <span className="text-[6px] font-bold uppercase tracking-widest text-white/30">tricksy-tech.io</span>
                  </div>
               </div>

               {/* Component Preview */}
               <div className="flex-1 bg-[#0a0a0a] rounded-xl overflow-hidden relative flex flex-col items-center justify-center px-10 py-32 text-center custom-scrollbar">
                 
                 {formData.mainImage && (
                    <div className="absolute inset-0 z-0">
                       <img src={getImageUrl(formData.mainImage)} className="w-full h-full object-cover opacity-10" alt="Background" />
                    </div>
                 )}

                 <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">
                    <div className={`inline-flex items-center px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 mb-6 transition-all ${activeField === 'badge' ? 'scale-105 border-emerald-400 bg-emerald-500/10' : ''}`}>
                       <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500">
                         {safeText(formData.badgeText)}
                       </span>
                    </div>

                    <h1 className={`text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6 transition-all ${activeField === 'title' ? 'scale-[1.02]' : ''}`}>
                       {safeText(formData.titlePart1)}{" "}
                       <span className="text-emerald-500">{safeText(formData.titleAccent)}</span>
                    </h1>

                    <p className={`text-sm md:text-base text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed transition-all ${activeField === 'desc' ? 'scale-105 text-white' : ''}`}>
                       {safeText(formData.description)}
                    </p>
                 </div>
                 
               </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default TechnicalHeroEditor;