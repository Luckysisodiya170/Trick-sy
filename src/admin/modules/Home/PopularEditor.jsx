import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { AdminService } from '../../services/adminService';
import { 
  ArrowLeft, Save, Image as ImageIcon, Sparkles, 
  Settings2, Home, Briefcase, Building2, Utensils, 
  Plus, Trash2, Upload, ChevronDown, 
  Type, ArrowRight, Loader2
} from 'lucide-react';

const iconMap = { Home, Briefcase, Building2, Utensils, Sparkles };

const PopularEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const subsectionId = id || 4; 

  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [viewMode, setViewMode] = useState('split'); 
  const [activeCard, setActiveCard] = useState(null); 
  const [previewIndex, setPreviewIndex] = useState(0); 
  const [isDeploying, setIsDeploying] = useState(false);

  const [headerSettings, setHeaderSettings] = useState({
    badge: "Categories",
    title: "",
    highlightText: "Services",
    description: ""
  });

  const [services, setServices] = useState([]);

  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setHeaderSettings({
        badge: content.badge || "Categories",
        title: content.title || "",
        highlightText: content.highlightText || "Services", 
        description: content.description || ""
      });

      if (content.categories) {
        setServices(content.categories.map((cat, idx) => ({
          ...cat,
          id: cat.id || `popular-${idx}`,
          title: cat.title || '',
          desc: cat.desc || '',
          icon: cat.icon || 'Home',
          image: content.images?.[idx] || null,
          file: null
        })));
      }
    }
  }, [content]);

  const handleLimitChange = (field, val, limit) => {
    if (val.length <= limit) setHeaderSettings({ ...headerSettings, [field]: val });
  };

  const updateService = (id, field, value) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setServices(services.map(s => s.id === id ? { ...s, image: imageUrl, file: file } : s));
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      const finalImages = [...(content.images || [])];
      const uploadImg = async (file) => {
        const fd = new FormData();
        fd.append('image', file); 
        const data = await AdminService.uploadHeroImage(fd);
        return data.imageUrl;
      };

      for (let i = 0; i < services.length; i++) {
        if (services[i].file) finalImages[i] = await uploadImg(services[i].file);
        else finalImages[i] = services[i].image;
      }

      const payload = {
        ...headerSettings,
        categories: services.map(({image, file, ...rest}) => rest),
        images: finalImages.filter(Boolean)
      };

      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      dispatch(fetchSingleSubsectionContent(subsectionId));
      alert("Popular Lab Deployed! 🚀");
    } catch (err) { alert(`Error: ${err.message}`); } finally { setIsDeploying(false); }
  };

  const getImageUrl = (path) => {
    if (!path) return "";
    return (path.startsWith('blob:') || path.startsWith('http')) ? path : `http://localhost:5000${path}`;
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-indigo-100">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[100] bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-900 transition-colors"><ArrowLeft size={18} /></button>
          <h1 className="text-[12px] font-black tracking-widest text-slate-800 uppercase italic">Popular <span className="text-indigo-600">Lab</span></h1>
        </div>

        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
          {['edit', 'split', 'preview'].map(m => (
            <button key={m} onClick={() => setViewMode(m)} className={`px-5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === m ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}>{m}</button>
          ))}
        </div>

        <button onClick={handleDeploy} disabled={isDeploying} className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-2 disabled:opacity-50">
          {isDeploying ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />} {isDeploying ? 'DEPLOYING...' : 'DEPLOY'}
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-700 ${viewMode === 'split' ? 'max-w-[1800px] px-8 py-8 grid grid-cols-12 gap-10' : 'max-w-4xl py-12 px-6'}`}>
        
        {/* LEFT EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-4' : 'w-full'} space-y-6`}>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-5">
              <span className="text-[9px] font-black uppercase text-slate-400 border-b border-slate-50 pb-2 block">Header Branding</span>
              <div className="space-y-3">
                <input value={headerSettings.badge} onChange={e => handleLimitChange('badge', e.target.value, 20)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-indigo-500" placeholder="Badge" />
                <div className="grid grid-cols-2 gap-3">
                  <input value={headerSettings.title} onChange={e => handleLimitChange('title', e.target.value, 30)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-indigo-500" placeholder="Title" />
                  <input value={headerSettings.highlightText} onChange={e => handleLimitChange('highlightText', e.target.value, 30)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xs text-indigo-600 outline-none focus:border-indigo-500" placeholder="Highlight" />
                </div>
                <textarea rows="2" value={headerSettings.description} onChange={e => handleLimitChange('description', e.target.value, 150)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-medium text-xs leading-relaxed outline-none focus:border-indigo-500 resize-none" placeholder="Description..." />
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
               <span className="text-[10px] font-black uppercase text-slate-400">Categories ({services.length})</span>
               <button onClick={() => setServices([...services, { id: Date.now(), title: 'New Category', desc: '', icon: 'Home' }])} className="text-[9px] font-black text-indigo-600">+ ADD NEW</button>
            </div>

            <div className="space-y-3">
              {services.map((s, idx) => (
                <div key={s.id} className={`bg-white rounded-2xl border transition-all ${activeCard === s.id ? 'border-indigo-500 shadow-md' : 'border-slate-100 shadow-sm'}`}>
                  <div onClick={() => {setActiveCard(activeCard === s.id ? null : s.id); setPreviewIndex(idx)}} className="p-4 flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center text-indigo-600">
                         {React.createElement(iconMap[s.icon] || Home, { size: 16 })}
                      </div>
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">{s.title || "Untitled"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <button onClick={(e) => { e.stopPropagation(); setServices(services.filter(x => x.id !== s.id)); }} className="text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
                       <ChevronDown size={14} className={`text-slate-300 transition-transform ${activeCard === s.id ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {activeCard === s.id && (
                    <div className="p-4 pt-0 space-y-4 border-t border-slate-50 animate-in fade-in duration-300">
                      <input value={s.title} onChange={e => updateService(s.id, 'title', e.target.value.substring(0, 30))} className="w-full p-2.5 bg-slate-50 rounded-xl text-[10px] font-bold outline-none" placeholder="Category Name" />
                      <textarea value={s.desc} onChange={e => updateService(s.id, 'desc', e.target.value.substring(0, 80))} className="w-full p-2.5 bg-slate-50 rounded-xl text-[10px] font-medium outline-none h-16 resize-none" placeholder="Short description..." />
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div onClick={() => document.getElementById(`img-${s.id}`).click()} className="aspect-video bg-slate-50 rounded-xl border-2 border-dashed border-slate-100 flex items-center justify-center cursor-pointer overflow-hidden relative group">
                           <input type="file" id={`img-${s.id}`} hidden onChange={e => handleImageUpload(e, s.id)} />
                           {s.image ? <img src={getImageUrl(s.image)} className="w-full h-full object-cover" /> : <Upload size={16} className="text-slate-200" />}
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all underline text-white font-black text-[8px]">REPLACE</div>
                        </div>
                        <select value={s.icon} onChange={e => updateService(s.id, 'icon', e.target.value)} className="w-full p-2 bg-slate-50 rounded-lg text-[9px] font-bold outline-none border border-slate-100 h-10">
                            {Object.keys(iconMap).map(k => <option key={k} value={k}>{k.toUpperCase()}</option>)}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RIGHT PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-8' : 'w-full'} sticky top-24`}>
            <div className="relative mx-auto bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[12px] border-slate-800 overflow-hidden">
               {/* Browser UI dots */}
               <div className="flex items-center gap-2 mb-3 px-3">
                  <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-slate-700" /><div className="w-1.5 h-1.5 rounded-full bg-slate-700" /><div className="w-1.5 h-1.5 rounded-full bg-slate-700" /></div>
                  <div className="flex-1 max-w-[120px] mx-auto h-3.5 bg-slate-800 rounded-full flex items-center justify-center text-[6px] text-slate-500 font-bold uppercase tracking-widest">Tricksy Live Popular</div>
               </div>

               {/* Inner Canvas */}
               <div className="bg-white rounded-xl overflow-hidden min-h-[500px] p-12 relative flex flex-col justify-center">
                  <div className="scale-95 animate-in fade-in duration-500">
                     
                     <div className="text-center mb-10 space-y-2">
                        <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest border border-indigo-100 px-3 py-1 rounded-full bg-indigo-50">#{headerSettings.badge}</span>
                        <h2 className="text-[34px] font-black text-slate-900 leading-tight">
                           {headerSettings.title} <span className="text-emerald-500">{headerSettings.highlightText}</span>
                        </h2>
                        <p className="text-[10px] text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">{headerSettings.description}</p>
                     </div>

                     <div className="grid grid-cols-12 gap-10 items-center h-[320px]">
                        {/* Tab List */}
                        <div className="col-span-5 space-y-2.5">
                           {services.map((s, i) => (
                             <div 
                               key={i} 
                               onMouseEnter={() => setPreviewIndex(i)}
                               className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${previewIndex === i ? 'bg-white border-emerald-500 shadow-xl translate-x-1.5' : 'bg-slate-50/50 border-transparent text-slate-400'}`}
                             >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${previewIndex === i ? 'bg-emerald-500 text-white' : 'bg-slate-100'}`}>
                                   {React.createElement(iconMap[s.icon] || Home, { size: 14 })}
                                </div>
                                <div>
                                   <h4 className="text-[11px] font-black uppercase tracking-tight text-slate-900">{s.title}</h4>
                                   <p className="text-[8px] font-medium line-clamp-1">{s.desc}</p>
                                </div>
                                {previewIndex === i && <ArrowRight size={12} className="ml-auto text-emerald-500 animate-in slide-in-from-left-2" />}
                             </div>
                           ))}
                        </div>

                        {/* Visual Display */}
                        <div className="col-span-7 h-full relative rounded-3xl overflow-hidden shadow-2xl bg-slate-100 border-4 border-white">
                           {services.map((s, i) => (
                              <div key={i} className={`absolute inset-0 transition-all duration-700 ${previewIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
                                 {s.image ? (
                                   <img src={getImageUrl(s.image)} className="w-full h-full object-cover" />
                                 ) : (
                                   <div className="h-full flex items-center justify-center text-slate-300 font-black text-[9px] uppercase">No Visual Found</div>
                                 )}
                                 {/* Gradient Overlay */}
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                 <div className="absolute bottom-6 left-6 right-6 animate-in slide-in-from-bottom-2 duration-500">
                                    <h3 className="text-white font-black text-xl mb-1 uppercase italic tracking-tight">{s.title}</h3>
                                    <p className="text-white/70 text-[9px] leading-tight line-clamp-2 max-w-sm">{s.desc}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Style for custom scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default PopularEditor;