import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice';
import { AdminService } from '../../services/adminService';
import { 
  ArrowLeft, Save, Image as ImageIcon, Type, Upload, Settings2, 
  Loader2, Star, CheckCircle, Edit2, Users, ListChecks, Award, ChevronRight
} from 'lucide-react';

const AboutEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const mainImageRef = useRef(null);
  const detailImageRef = useRef(null);
  
  const subsectionId = location.state?.sectionId || 2;
  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [viewMode, setViewMode] = useState('split'); 
  const [activeField, setActiveField] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  
  const [mainFile, setMainFile] = useState(null);
  const [detailFile, setDetailFile] = useState(null);
  const [profileFiles, setProfileFiles] = useState([null, null, null]);

  const [aboutData, setAboutData] = useState({
    badge: "", title: "", highlightText: "", titleSuffix: "", description: "",
    features: ["", "", "", ""], yearsExp: "", customersText: "",
    btnText: "More About Us",
    mainImage: null, detailImage: null, profileImages: [null, null, null] 
  });

  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content) {
      setAboutData({
        badge: content.badge || "",
        title: content.title || "",
        highlightText: content.highlightText || "",
        titleSuffix: content.titleSuffix || "Solutions", 
        description: content.description || "",
        features: content.features?.length > 0 ? [...content.features] : ["", "", "", ""],
        yearsExp: content.yearsExp || "",
        customersText: content.customersText || "",
        btnText: content.btnText || "More About Us",
        mainImage: content.images?.[0] || null,
        detailImage: content.images?.[1] || null,
        profileImages: [content.images?.[2], content.images?.[3], content.images?.[4]]
      });
    }
  }, [content]);

  const handleLimitChange = (field, val, limit) => {
    if (val.length <= limit) setAboutData({ ...aboutData, [field]: val });
  };

  const handleImageUpload = (e, type, index = 0) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (type === 'main') { setMainFile(file); setAboutData(p => ({ ...p, mainImage: previewUrl })); }
      else if (type === 'detail') { setDetailFile(file); setAboutData(p => ({ ...p, detailImage: previewUrl })); }
      else if (type === 'profile') {
        const newFiles = [...profileFiles]; newFiles[index] = file; setProfileFiles(newFiles);
        const newProfiles = [...aboutData.profileImages]; newProfiles[index] = previewUrl;
        setAboutData(p => ({ ...p, profileImages: newProfiles }));
      }
    }
  };

  const getImageUrl = (path) => {
    if (!path) return "";
    return (path.startsWith('blob:') || path.startsWith('http')) ? path : `http://localhost:5000${path}`;
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      let updatedImages = [...(content.images || [])];
      const uploadImg = async (file) => {
        const fd = new FormData(); fd.append('image', file);
        const data = await AdminService.uploadHeroImage(fd);
        return data.imageUrl;
      };
      if (mainFile) updatedImages[0] = await uploadImg(mainFile);
      if (detailFile) updatedImages[1] = await uploadImg(detailFile);
      for(let i=0; i<3; i++) { if(profileFiles[i]) updatedImages[i+2] = await uploadImg(profileFiles[i]); }

      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: { ...aboutData, images: updatedImages.filter(Boolean) } })).unwrap();
      dispatch(fetchSingleSubsectionContent(subsectionId));
      alert("About Section Deployed! 🚀");
    } catch (err) { alert(`Error: ${err.message}`); } finally { setIsDeploying(false); }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-indigo-100">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[100] bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-900 transition-colors"><ArrowLeft size={18} /></button>
          <h1 className="text-[12px] font-black tracking-widest text-slate-800 uppercase italic">About <span className="text-indigo-600">Lab</span></h1>
        </div>

        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
          {['edit', 'split', 'preview'].map(m => (
            <button key={m} onClick={() => setViewMode(m)} className={`px-5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === m ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}>{m}</button>
          ))}
        </div>

        <button onClick={handleDeploy} disabled={isDeploying} className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-2">
          {isDeploying ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />} {isDeploying ? 'SAVING...' : 'DEPLOY'}
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-700 ${viewMode === 'split' ? 'max-w-[1800px] px-8 py-8 grid grid-cols-12 gap-8' : 'max-w-4xl py-12 px-6'}`}>
        
        {/* LEFT EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-4' : 'w-full'} space-y-6`}>
            
            {/* CONTENT CARD */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2 block">Typography</span>
              <div className="space-y-3">
                <input value={aboutData.badge} onFocus={() => setActiveField('badge')} onChange={e => handleLimitChange('badge', e.target.value, 30)} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-indigo-500" placeholder="Badge" />
                <div className="grid grid-cols-2 gap-3">
                  <input value={aboutData.title} onFocus={() => setActiveField('title')} onChange={e => handleLimitChange('title', e.target.value, 40)} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-indigo-500" placeholder="Title Start" />
                  <input value={aboutData.highlightText} onFocus={() => setActiveField('title')} onChange={e => handleLimitChange('highlightText', e.target.value, 40)} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs text-indigo-600 outline-none focus:border-indigo-500" placeholder="Highlight" />
                </div>
                {/*  TITLE SUFFIX FIELD */}
                <input value={aboutData.titleSuffix} onFocus={() => setActiveField('title')} onChange={e => handleLimitChange('titleSuffix', e.target.value, 30)} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-indigo-500" placeholder="Title Suffix (e.g. Solutions)" />
                
                <textarea rows="3" value={aboutData.description} onFocus={() => setActiveField('desc')} onChange={e => handleLimitChange('description', e.target.value, 200)} className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl font-medium text-xs leading-relaxed outline-none focus:border-indigo-500 resize-none" placeholder="Description..." />
              </div>
            </div>

            {/* FEATURES & ACTION BUTTON */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2 block">Features & Button</span>
               <div className="grid grid-cols-2 gap-3">
                  {aboutData.features.map((f, i) => (
                    <input key={i} value={f} onChange={e => { const n = [...aboutData.features]; n[i] = e.target.value.substring(0, 25); setAboutData({...aboutData, features: n})} } className="px-4 py-2 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-[10px] outline-none" placeholder={`Point ${i+1}`} />
                  ))}
               </div>
               <input value={aboutData.btnText} onChange={e => handleLimitChange('btnText', e.target.value, 15)} className="w-full px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl font-black text-[10px] text-indigo-600 uppercase outline-none" placeholder="Button Text" />
            </div>

            {/* MEDIA ASSETS */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div onClick={() => mainImageRef.current.click()} className="aspect-square bg-slate-50 rounded-2xl border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden group relative">
                        <input type="file" ref={mainImageRef} hidden onChange={e => handleImageUpload(e, 'main')} />
                        {aboutData.mainImage ? <img src={getImageUrl(aboutData.mainImage)} className="w-full h-full object-cover" /> : <ImageIcon className="text-slate-200" />}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all underline text-white font-black text-[8px]">REPLACE</div>
                  </div>
                  <div onClick={() => detailImageRef.current.click()} className="aspect-square bg-slate-50 rounded-2xl border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden group relative border-indigo-100">
                        <input type="file" ref={detailImageRef} hidden onChange={e => handleImageUpload(e, 'detail')} />
                        {aboutData.detailImage ? <img src={getImageUrl(aboutData.detailImage)} className="w-full h-full object-cover" /> : <ImageIcon className="text-slate-200" />}
                        <div className="absolute inset-0 bg-indigo-600/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all underline text-white font-black text-[8px]">REPLACE</div>
                  </div>
               </div>
               <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <input value={aboutData.yearsExp} onChange={e => handleLimitChange('yearsExp', e.target.value, 5)} className="w-20 p-2 bg-slate-50 rounded-lg font-black text-indigo-600 text-center outline-none" placeholder="10+" />
                  <div className="flex -space-x-2">
                    {[0, 1, 2].map(i => (
                      <label key={i} className="w-8 h-8 bg-slate-100 rounded-full border-2 border-white flex items-center justify-center cursor-pointer overflow-hidden shadow-sm">
                        <input type="file" hidden onChange={e => handleImageUpload(e, 'profile', i)} />
                        {aboutData.profileImages[i] ? <img src={getImageUrl(aboutData.profileImages[i])} className="w-full h-full object-cover" /> : <Users size={10} className="text-slate-400" />}
                      </label>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-8' : 'w-full'} sticky top-24`}>
            <div className="relative mx-auto bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 overflow-hidden">
               <div className="bg-white rounded-xl overflow-hidden min-h-[500px] flex items-center px-12 relative">
                 <div className="grid grid-cols-12 gap-8 items-center w-full relative z-10 scale-90">
                   
                   <div className="col-span-6 relative">
                      <div className="relative">
                        <div className="absolute -top-3 -left-3 w-full h-full bg-[#0F172A] rounded-[1.5rem] -z-10" />
                        <div className="relative rounded-[1.5rem] overflow-hidden border-4 border-white shadow-xl h-[320px]">
                           <img src={getImageUrl(aboutData.mainImage)} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute top-1/2 -left-6 bg-white p-2 rounded-xl shadow-xl flex items-center gap-2 border border-slate-50 z-20">
                           <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white"><Award size={14}/></div>
                           <div className="leading-tight"><p className="text-xs font-black text-slate-900">{aboutData.yearsExp}</p><p className="text-[7px] font-bold text-slate-400 uppercase">Years Exp.</p></div>
                        </div>
                        <div className="absolute -bottom-6 -right-2 w-[200px] h-[120px] rounded-[1rem] border-4 border-white shadow-xl overflow-hidden z-20">
                           <img src={getImageUrl(aboutData.detailImage)} className="w-full h-full object-cover" />
                        </div>
                      </div>
                   </div>

                   <div className="col-span-6 space-y-4">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0F172A] text-white">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                         <span className="text-[8px] font-black uppercase tracking-wider">{aboutData.badge}</span>
                      </div>
                      
                      <h1 className="text-[30px] font-black text-slate-900 leading-[1.1] tracking-tighter">
                        {aboutData.title} <br/>
                        <span className="text-emerald-500">{aboutData.highlightText}</span> <span className="block">{aboutData.titleSuffix}</span>
                      </h1>

                      <p className="text-[9px] text-slate-500 font-medium leading-relaxed max-w-[280px]">{aboutData.description}</p>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {aboutData.features.map((f, i) => f && (
                          <div key={i} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <div className="w-5 h-5 rounded-full bg-[#0F172A] flex items-center justify-center text-emerald-500"><CheckCircle size={10} /></div>
                            <span className="text-[8px] font-black text-slate-800">{f}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <button className="px-5 py-3 bg-emerald-500 text-white rounded-lg font-black text-[9px] uppercase flex items-center gap-2 shadow-lg shadow-emerald-100">
                          {aboutData.btnText} <ChevronRight size={12} />
                        </button>
                        <div className="flex items-center gap-2">
                           <div className="flex -space-x-2">
                             {aboutData.profileImages.map((img, i) => (
                               <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                                 {img && <img src={getImageUrl(img)} className="w-full h-full object-cover" />}
                               </div>
                             ))}
                           </div>
                           <div className="leading-none text-[8px] font-black text-slate-900 uppercase">Happy Customers</div>
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