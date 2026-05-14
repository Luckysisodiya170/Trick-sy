import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent, fetchPageSections } from '../../redux/slices/adminSlice';
import { AdminService } from '../../services/adminService';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye, Plus, Trash2, 
  ChevronRight, Undo, Wrench, Zap, Droplets, LayoutGrid, 
  Hammer, Lightbulb, ShieldCheck, PenTool, Smartphone, Monitor, Loader2, Upload,Star
} from 'lucide-react';

const availableIcons = [
  { id: 'wrench', component: <Wrench size={18} />, label: 'Repair' },
  { id: 'zap', component: <Zap size={18} />, label: 'Electric' },
  { id: 'droplets', component: <Droplets size={18} />, label: 'Plumbing' },
  { id: 'grid', component: <LayoutGrid size={18} />, label: 'General' },
  { id: 'hammer', component: <Hammer size={18} />, label: 'Build' },
  { id: 'bulb', component: <Lightbulb size={18} />, label: 'Idea' },
  { id: 'shield', component: <ShieldCheck size={18} />, label: 'Safety' },
  { id: 'pen', component: <PenTool size={18} />, label: 'Design' },
  { id: 'phone', component: <Smartphone size={18} />, label: 'Mobile' },
  { id: 'monitor', component: <Monitor size={18} />, label: 'IT' },
];

const MasterTechnicalEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const fileInputRef = useRef(null);
  
  const sidebarTree = useSelector((state) => state.adminData?.sidebarTree || []);
  const sections = useSelector((state) => state.adminData?.pageSections || []);
  const content = useSelector((state) => state.adminData?.activeSubsection); 
  const status = useSelector((state) => state.adminData?.status || '');

  const techSectionInfo = sidebarTree.find(sec => sec.slug === 'technical');
  const sectionId = techSectionInfo?.id || 4;

  const currentSection = sections.find(s => s.slug === 'tech-domains');
  const subsectionId = id || currentSection?.id || 23;

  const [activeTab, setActiveTab] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 
  const [newImageFiles, setNewImageFiles] = useState({}); 
  const [hasLoaded, setHasLoaded] = useState(false);

  const [domains, setDomains] = useState([]);

  useEffect(() => {
    if (sections.length === 0) {
      dispatch(fetchPageSections(sectionId));
    }
  }, [dispatch, sections.length, sectionId]);

  useEffect(() => {
    if (subsectionId) {
      dispatch(fetchSingleSubsectionContent(subsectionId));
    }
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0 && !hasLoaded) {
      if (content.id == subsectionId || content.subsectionId == subsectionId) {
        if (content.listItems && content.listItems.length > 0) {
          const formattedDomains = content.listItems.map(item => ({
            id: item.id,
            title: item.itemTitle ?? "New Service",
            tag: item.itemSubtitle ?? "CATEGORY",
            desc: item.itemDescription ?? "",
            image: item.itemImage ?? null,
            iconId: item.itemIcon ?? 'grid'
          }));
          setDomains(formattedDomains);
        } else {
          setDomains([
            { title: "Handyman Services", tag: "FURNITURE", desc: "Furniture assembly, TV mounting, drilling.", image: null, iconId: 'wrench' }
          ]);
        }
        setHasLoaded(true);
      }
    }
  }, [content, subsectionId, hasLoaded]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith('http') || imagePath.startsWith('blob:') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    const domain = apiBase.replace('/api', ''); 
    return `${domain}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  const handleUpdate = (field, value) => {
    const newDomains = [...domains];
    newDomains[activeTab] = { ...newDomains[activeTab], [field]: value };
    setDomains(newDomains);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const currentDomain = domains[activeTab];
      if (currentDomain.image && currentDomain.image.startsWith('blob:')) {
        URL.revokeObjectURL(currentDomain.image);
      }
      
      setNewImageFiles(prev => ({ ...prev, [activeTab]: file }));
      handleUpdate('image', URL.createObjectURL(file));
    }
  };

  const addSection = () => {
    const newSection = { title: "New Service", tag: "CATEGORY", desc: "", image: null, iconId: 'grid', isNew: true };
    setDomains([...domains, newSection]);
    setActiveTab(domains.length);
  };

  const deleteSection = (index, e) => {
    e.stopPropagation();
    if (domains.length > 1) {
      const filtered = domains.filter((_, i) => i !== index);
      setDomains(filtered);
      
      const newFiles = { ...newImageFiles };
      delete newFiles[index];
      const reindexedFiles = {};
      Object.keys(newFiles).forEach(key => {
        const numKey = parseInt(key);
        if (numKey > index) {
          reindexedFiles[numKey - 1] = newFiles[key];
        } else {
          reindexedFiles[numKey] = newFiles[key];
        }
      });
      setNewImageFiles(reindexedFiles);

      setActiveTab(0);
    }
  };

  const handleReset = () => {
    if(window.confirm('Reset all changes to originally saved values?')) {
        if (content && content.listItems && content.listItems.length > 0) {
            const formattedDomains = content.listItems.map(item => ({
              id: item.id,
              title: item.itemTitle ?? "New Service",
              tag: item.itemSubtitle ?? "CATEGORY",
              desc: item.itemDescription ?? "",
              image: item.itemImage ?? null,
              iconId: item.itemIcon ?? 'grid'
            }));
            setDomains(formattedDomains);
        } else {
            setDomains([{ title: "Handyman Services", tag: "FURNITURE", desc: "Furniture assembly, TV mounting, drilling.", image: null, iconId: 'wrench' }]);
        }
        setNewImageFiles({});
    }
  }

  const handleSave = async () => {
    if (!subsectionId) return alert("Error: Missing Subsection ID.");

    setIsSaving(true);
    try {
      const processedDomains = [...domains];

      for (const [indexStr, file] of Object.entries(newImageFiles)) {
        const index = parseInt(indexStr);
        const formDataUpload = new FormData();
        formDataUpload.append('image', file); 

        const uploadData = await AdminService.uploadHeroImage(formDataUpload);
        
        if (uploadData.success || uploadData.imageUrl) {
          processedDomains[index].image = uploadData.imageUrl;
        } else {
          throw new Error(`Upload failed for item ${index + 1}`);
        }
      }

      const listItemsPayload = processedDomains.map((domain, index) => ({
        id: domain.isNew ? undefined : domain.id,
        itemTitle: domain.title,
        itemSubtitle: domain.tag,
        itemDescription: domain.desc,
        itemIcon: domain.iconId,
        itemImage: domain.image,
        itemOrder: index + 1
      }));

      const payload = { listItems: listItemsPayload };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();
      
      await dispatch(fetchSingleSubsectionContent(subsectionId)).unwrap();
      
      setNewImageFiles({});
      navigate('/admin/pages/technical');
      alert("Services Domains Deployed Successfully! 🚀");
      
    } catch (error) {
      console.error(error);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const getIcon = (id) => availableIcons.find(icon => icon.id === id)?.component || <LayoutGrid size={18} />;
  
  const safeText = (text) => text === '' ? '\u00A0' : text;

  if (status.includes('loading') && !hasLoaded) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest text-xs bg-[#FDFDFD]">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING DOMAINS LAB...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col h-screen overflow-hidden font-sans selection:bg-emerald-100">
      
      <nav className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-900">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-[13px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <Settings2 size={16} className="text-emerald-600" /> Domain <span className="text-emerald-400">Lab</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {['edit', 'split', 'preview'].map((mode) => (
            <button 
              key={mode} 
              onClick={() => setViewMode(mode)} 
              className={`px-5 py-1.5 rounded-lg text-[9px] font-black tracking-widest transition-all ${
                viewMode === mode ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {mode.toUpperCase()}
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave} 
          disabled={isSaving} 
          className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-600 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          <span>{isSaving ? 'DEPLOYING...' : 'DEPLOY'}</span>
        </button>
      </nav>

      <div className={`flex-1 flex overflow-hidden p-6 gap-6 mx-auto w-full transition-all duration-700 ${viewMode === 'split' ? 'max-w-[1700px]' : 'max-w-4xl'}`}>
        
        {/* 1. LEFT SIDE: EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && domains.length > 0 && domains[activeTab] && (
          <div className="flex-1 bg-white rounded-[2rem] overflow-y-auto custom-scrollbar border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col">
            <div className="p-8 space-y-8 flex-1">
              <div className="flex items-center justify-between mb-1 border-b border-slate-100 pb-4">
                 <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">Configure Service Content</h2>
                 <button onClick={handleReset} className="text-[8px] font-black uppercase tracking-widest text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-1">
                    <Undo size={10} /> Reset Config
                 </button>
              </div>

              <div className="space-y-4 bg-slate-50/50 p-5 rounded-[2rem] border border-slate-100 shadow-inner">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Select Domain Icon</label>
                <div className="flex flex-wrap gap-3">
                  {availableIcons.map((icon) => (
                    <button
                      key={icon.id}
                      onClick={() => handleUpdate('iconId', icon.id)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        domains[activeTab].iconId === icon.id 
                        ? 'bg-emerald-600 text-white scale-110 shadow-lg' 
                        : 'bg-white text-slate-400 hover:text-emerald-600 border border-slate-200'
                      }`}
                      title={icon.label}
                    >
                      {icon.component}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50/50 p-5 rounded-[2rem] border border-slate-100 shadow-inner space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Title</label>
                    <input value={domains[activeTab].title} onChange={(e) => handleUpdate('title', e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold outline-none focus:border-emerald-400 transition-all shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-emerald-600 tracking-widest ml-1">Category Tag</label>
                    <input value={domains[activeTab].tag} onChange={(e) => handleUpdate('tag', e.target.value)} className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-[10px] font-black text-emerald-700 uppercase tracking-widest outline-none focus:border-emerald-400 shadow-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Description</label>
                  <textarea value={domains[activeTab].desc} onChange={(e) => handleUpdate('desc', e.target.value)} rows="3" className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-medium text-slate-600 outline-none focus:border-emerald-400 transition-all resize-none shadow-sm" />
                </div>
              </div>

              <div className="bg-slate-50/50 p-5 rounded-[2rem] border border-slate-100 space-y-4">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Feature Image</label>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleImage} accept="image/*" />
                <div onClick={() => fileInputRef.current.click()} className="w-full h-36 border-2 border-dashed border-slate-200 rounded-[1.5rem] bg-white flex flex-col items-center justify-center hover:border-emerald-300 transition-all cursor-pointer overflow-hidden relative group">
                  {domains[activeTab].image ? (
                     <img src={getImageUrl(domains[activeTab].image)} className="w-full h-full object-cover" alt="preview" />
                  ) : (
                     <div className="text-center">
                        <Upload size={20} className="mx-auto text-slate-300 mb-2 group-hover:text-emerald-400 transition-colors" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-500">Upload Photo</p>
                     </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all text-white font-black text-[10px] uppercase tracking-widest">
                     Edit Media
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 shrink-0">
               <button onClick={(e) => deleteSection(activeTab, e)} className="w-full bg-rose-50 text-rose-500 text-[10px] font-black uppercase tracking-widest flex justify-center items-center gap-2 hover:bg-rose-100 hover:text-rose-600 py-3 rounded-xl transition-all">
                 <Trash2 size={14} /> Delete This Domain
               </button>
            </div>
          </div>
        )}

        {/* 2. MIDDLE SIDE: DOMAIN LIST (SIDEBAR) */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className="w-[300px] flex flex-col shrink-0">
             <div className="px-2 mb-4 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Expertise List</span>
             </div>
             
             <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {domains.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveTab(idx)}
                    className={`relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${
                      activeTab === idx ? 'bg-slate-900 border-slate-900 text-white shadow-xl' : 'bg-white border-slate-100 text-slate-900 shadow-sm hover:border-emerald-200'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-[1rem] flex items-center justify-center transition-colors ${activeTab === idx ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' : 'bg-slate-50 text-slate-400'}`}>
                      {getIcon(item.iconId)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-xs truncate">{safeText(item.title) || "New Service"}</h3>
                      <p className={`text-[8px] font-bold tracking-widest uppercase mt-1 ${activeTab === idx ? 'text-emerald-400' : 'text-slate-400'}`}>{safeText(item.tag) || "N/A"}</p>
                    </div>
                    {activeTab === idx && <ChevronRight size={14} className="text-emerald-400" />}
                  </div>
                ))}
             </div>

             <div className="mt-4 pt-4 border-t border-slate-100 shrink-0">
               <button 
                 onClick={addSection} 
                 className="w-full bg-white border-2 border-dashed border-emerald-200 text-emerald-600 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 py-4 rounded-2xl hover:bg-emerald-50 hover:border-emerald-400 transition-all shadow-sm"
                >
                  <Plus size={16} /> Add New Domain
               </button>
             </div>
          </div>
        )}

        {/* 3. RIGHT SIDE: PREVIEW */}
        {(viewMode === 'split' || viewMode === 'preview') && domains.length > 0 && domains[activeTab] && (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 rounded-[2.5rem] overflow-hidden relative shadow-2xl bg-zinc-900 border-[10px] border-slate-800">
              
              {domains[activeTab].image ? (
                 <img src={getImageUrl(domains[activeTab].image)} className="w-full h-full object-cover opacity-60" alt="bg" />
              ) : (
                 <div className="w-full h-full flex items-center justify-center text-slate-700 font-black uppercase tracking-widest bg-zinc-950">No Image Provided</div>
              )}
              
              <div className="absolute top-6 right-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                <Star size={10} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white text-[8px] font-black uppercase tracking-widest">Premium Service</span>
              </div>

              <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-2xl rounded-[2rem] p-10 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                   <div className="text-emerald-500">{getIcon(domains[activeTab].iconId)}</div>
                   <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em]">{safeText(domains[activeTab].tag)}</span>
                </div>
                <h4 className="text-white text-4xl font-black uppercase mb-4 tracking-tighter italic leading-none">{safeText(domains[activeTab].title)}</h4>
                <p className="text-slate-300 text-sm font-medium mb-8 max-w-lg leading-relaxed">{safeText(domains[activeTab].desc)}</p>
                <button className="bg-white text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-500 hover:text-white transition-all">
                  Book This Service <ChevronRight size={14} />
                </button>
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

export default MasterTechnicalEditor;