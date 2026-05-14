import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { AdminService } from '../../services/adminService';
import { 
  ArrowLeft, Plus, Trash2, Image as ImageIcon, Sparkles, 
  Settings2, Droplets, Snowflake, Wrench, Zap, Home, 
  Shield, ChevronDown, Upload, Type, Loader2, Save
} from 'lucide-react';

const iconMap = { 
  droplets: Droplets, snowflake: Snowflake, wrench: Wrench, 
  zap: Zap, home: Home, shield: Shield, sparkles: Sparkles 
};

const ServiceEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const subsectionId = id || 3; 

  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [activeCard, setActiveCard] = useState(null); 
  const [viewMode, setViewMode] = useState('split'); 
  const [isDeploying, setIsDeploying] = useState(false);

  const [headerSettings, setHeaderSettings] = useState({ sectionTitle: "", sectionDesc: "" });
  const [services, setServices] = useState([]);

  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setHeaderSettings({
        sectionTitle: content.sectionTitle || "",
        sectionDesc: content.sectionDesc || ""
      });
      if (content.services) {
        setServices(content.services.map((s, index) => ({
          ...s,
          img: content.images?.[index] || null, 
          file: null 
        })));
      }
    }
  }, [content]);

  const updateService = (id, field, value) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setServices(services.map(s => s.id === id ? { ...s, img: imageUrl, file: file } : s));
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
        else finalImages[i] = services[i].img;
      }

      const payload = { 
        ...headerSettings, 
        services: services.map(({file, img, ...rest}) => rest), 
        images: finalImages.filter(Boolean) 
      };

      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      dispatch(fetchSingleSubsectionContent(subsectionId));
      alert("Services Grid Deployed! 🚀");
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
          <h1 className="text-[12px] font-black tracking-widest text-slate-800 uppercase italic">Service <span className="text-indigo-600">Lab</span></h1>
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

      <div className={`mx-auto transition-all duration-700 ${viewMode === 'split' ? 'max-w-[1700px] px-8 py-8 grid grid-cols-12 gap-8' : 'max-w-4xl py-12 px-6'}`}>
        
        {/* LEFT EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-4' : 'w-full'} space-y-6`}>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
              <span className="text-[9px] font-black uppercase text-slate-400 border-b border-slate-50 pb-2 block">Header Branding</span>
              <div className="space-y-3">
                <input value={headerSettings.sectionTitle} onChange={e => handleLimitChange('sectionTitle', e.target.value, 60)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-indigo-500" placeholder="Section Title" />
                <textarea rows="2" value={headerSettings.sectionDesc} onChange={e => handleLimitChange('sectionDesc', e.target.value, 150)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-medium text-xs leading-relaxed outline-none focus:border-indigo-500 resize-none" placeholder="Description..." />
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
               <span className="text-[10px] font-black uppercase text-slate-400">Services ({services.length})</span>
               <button onClick={() => setServices([...services, { id: Date.now(), title: 'New Service', desc: '', icon: 'sparkles', color: 'indigo' }])} className="text-[9px] font-black text-indigo-600">+ ADD NEW</button>
            </div>

            <div className="space-y-3">
              {services.map((s) => (
                <div key={s.id} className={`bg-white rounded-2xl border transition-all ${activeCard === s.id ? 'border-indigo-500 shadow-md' : 'border-slate-100 shadow-sm'}`}>
                  <div onClick={() => setActiveCard(activeCard === s.id ? null : s.id)} className="p-4 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-indigo-600">
                         {React.createElement(iconMap[s.icon] || Sparkles, { size: 16 })}
                      </div>
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">{s.title || "Untitled"}</span>
                    </div>
                    <ChevronDown size={14} className={`text-slate-300 transition-transform ${activeCard === s.id ? 'rotate-180' : ''}`} />
                  </div>

                  {activeCard === s.id && (
                    <div className="p-4 pt-0 space-y-4 border-t border-slate-50 animate-in fade-in duration-300">
                      <input value={s.title} onChange={e => updateService(s.id, 'title', e.target.value.substring(0, 30))} className="w-full p-2.5 bg-slate-50 rounded-xl text-[10px] font-bold outline-none" placeholder="Service Name" />
                      <textarea value={s.desc} onChange={e => updateService(s.id, 'desc', e.target.value.substring(0, 100))} className="w-full p-2.5 bg-slate-50 rounded-xl text-[10px] font-medium outline-none h-16 resize-none" placeholder="Short description..." />
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div onClick={() => document.getElementById(`img-${s.id}`).click()} className="h-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-100 flex items-center justify-center cursor-pointer overflow-hidden">
                           <input type="file" id={`img-${s.id}`} hidden onChange={e => handleImageUpload(e, s.id)} />
                           {s.img ? <img src={getImageUrl(s.img)} className="w-full h-full object-cover" /> : <Upload className="text-slate-200" />}
                        </div>
                        <div className="flex flex-col justify-between">
                           <select value={s.icon} onChange={e => updateService(s.id, 'icon', e.target.value)} className="w-full p-2 bg-slate-50 rounded-lg text-[9px] font-bold outline-none border border-slate-100">
                              {Object.keys(iconMap).map(k => <option key={k} value={k}>{k.toUpperCase()}</option>)}
                           </select>
                           <button onClick={() => setServices(services.filter(x => x.id !== s.id))} className="text-[9px] font-bold text-rose-500 flex items-center gap-1 justify-center transition-colors hover:text-rose-700"><Trash2 size={12}/> REMOVE</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RIGHT: PREVIEW  */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-8' : 'w-full'} sticky top-24`}>
            <div className="relative mx-auto bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[12px] border-slate-800 overflow-hidden">
               {/* Browser Toolbar UI */}
               <div className="flex items-center gap-2 mb-3 px-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
                  </div>
                  <div className="flex-1 max-w-[120px] mx-auto h-3.5 bg-slate-800 rounded-full flex items-center justify-center text-[6px] text-slate-500 font-bold uppercase tracking-widest">Tricksy Services</div>
               </div>

               {/* Inner Page Canvas */}
               <div className="bg-white rounded-xl overflow-hidden min-h-[520px] max-h-[70vh] overflow-y-auto custom-scrollbar p-10 relative">
                  <div className="scale-95 animate-in fade-in duration-500 origin-top">
                    <div className="text-center mb-10">
                       <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest border border-indigo-100 px-3 py-1 rounded-full bg-indigo-50">What We Offer</span>
                       <h2 className="text-[32px] font-black text-slate-900 leading-tight mt-3">{headerSettings.sectionTitle || "Our Services"}</h2>
                       <p className="text-[10px] text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">{headerSettings.sectionDesc || "Discover our premium solutions."}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-5 pb-5">
                       {services.map((s, i) => (
                         <div key={i} className="group bg-white p-5 rounded-[1.5rem] border border-slate-100 hover:shadow-xl transition-all">
                            <div className="w-full h-28 bg-slate-50 rounded-xl mb-4 overflow-hidden relative">
                               {s.img && <img src={getImageUrl(s.img)} className="w-full h-full object-cover group-hover:scale-105 transition-all" />}
                               <div className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-indigo-600">
                                  {React.createElement(iconMap[s.icon] || Sparkles, { size: 14 })}
                               </div>
                            </div>
                            <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-tight">{s.title || "New Service"}</h4>
                            <p className="text-[9px] text-slate-400 mt-1 line-clamp-2 leading-snug">{s.desc || "Description goes here..."}</p>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ServiceEditor;