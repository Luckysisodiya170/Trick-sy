import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { AdminService } from '../../services/adminService';
import { 
  ArrowLeft, Save, Target, Users, ShieldCheck, Heart, 
  CheckCircle2, Edit3, Columns, Eye, Settings2, Type, Upload, Sparkles, Image as ImageIcon, Loader2
} from 'lucide-react';

const AboutMissionEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { id } = useParams();
  
  const subsectionId = id || 11; 

  // Standardized Redux Paths
  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [viewMode, setViewMode] = useState('split'); 
  const [isDeploying, setIsDeploying] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  
  const [missionData, setMissionData] = useState({
    title: "", highlight: "", description: "", mainImage: null,
    stats: [
      { label: "Founded", value: "2014", id: 1 },
      { label: "Team Size", value: "150+", id: 2 },
      { label: "Projects", value: "5k+", id: 3 },
      { label: "Cities", value: "12+", id: 4 },
    ]
  });

  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setMissionData({
        title: content.title || "Quality You Can",
        highlight: content.highlight || "Trust Blindly.",
        description: content.description || "To provide the most reliable, high-tech, and professional home services through a team of certified experts.",
        mainImage: content.images?.[0] || null,
        stats: content.stats || [
          { label: "Founded", value: "2014", id: 1 },
          { label: "Team Size", value: "150+", id: 2 },
          { label: "Projects", value: "5k+", id: 3 },
          { label: "Cities", value: "12+", id: 4 },
        ]
      });
    }
  }, [content]);

  // Character Limit Handler
  const handleLimitChange = (field, val, limit) => {
    if (val.length <= limit) setMissionData({ ...missionData, [field]: val });
  };

  const handleStatChange = (statId, field, value) => {
    const updatedStats = missionData.stats.map(s => s.id === statId ? { ...s, [field]: value } : s);
    setMissionData({ ...missionData, stats: updatedStats });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith('http') || imagePath.startsWith('blob:') || imagePath.startsWith('data:')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (missionData.mainImage && missionData.mainImage.startsWith('blob:')) {
        URL.revokeObjectURL(missionData.mainImage);
      }
      setImageFile(file);
      setMissionData({ ...missionData, mainImage: URL.createObjectURL(file) });
    }
  };

  const handleSave = async () => {
    setIsDeploying(true);
    try {
      let finalImageUrl = missionData.mainImage;

      // Centralized Upload Logic
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile); 
        const uploadData = await AdminService.uploadHeroImage(formData);
        
        if (uploadData.success || uploadData.imageUrl) {
          finalImageUrl = uploadData.imageUrl; 
        } else {
          throw new Error("Image Upload Failed");
        }
      }

      const payload = {
        title: missionData.title,
        highlight: missionData.highlight,
        description: missionData.description,
        stats: missionData.stats,
        images: finalImageUrl?.startsWith('blob:') ? content.images : [finalImageUrl].filter(Boolean)
      };

      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      
      alert("Mission Section Deployed Successfully! 🚀");
      setImageFile(null);
      dispatch(fetchSingleSubsectionContent(subsectionId)); // Re-sync state
      
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally { setIsDeploying(false); }
  };

  const statIcons = [<Target size={20}/>, <Users size={20}/>, <Heart size={20}/>, <ShieldCheck size={20}/>];

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING MISSION LAB...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans pb-20 selection:bg-indigo-100">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-900"><ArrowLeft size={18} /></button>
          <h1 className="text-[12px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <Settings2 size={16} className="text-indigo-600" /> Mission <span className="text-indigo-400">Lab</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <mode.icon size={12} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button onClick={handleSave} disabled={isDeploying} className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-2 disabled:opacity-50">
          {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
          <span>{isDeploying ? "DEPLOYING..." : "DEPLOY"}</span>
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-700 ${viewMode === 'split' ? 'max-w-[1800px] px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8' : 'max-w-4xl py-12 px-6'}`}>
        
        {/* --- EDITOR SIDE --- */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-4' : 'w-full'} space-y-6`}>
            
            <section className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm space-y-5">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2 block flex items-center gap-2"><Type size={14} className="text-indigo-500" /> Typography</span>
              <div className="space-y-3">
                <input value={missionData.title} onChange={(e) => handleLimitChange('title', e.target.value, 40)} placeholder="Main Title" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-indigo-500 transition-all" />
                <input value={missionData.highlight} onChange={(e) => handleLimitChange('highlight', e.target.value, 40)} placeholder="Highlight Text" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-black text-indigo-600 text-xs outline-none focus:border-indigo-500 transition-all" />
                <textarea rows="4" value={missionData.description} onChange={(e) => handleLimitChange('description', e.target.value, 250)} className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-medium outline-none resize-none leading-relaxed focus:border-indigo-500 transition-all" placeholder="Description..." />
              </div>
            </section>

            <section className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm space-y-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2 block flex items-center gap-2"><Sparkles size={14} className="text-amber-500"/> Stats Grid</span>
              <div className="grid grid-cols-2 gap-3">
                {missionData.stats.map((stat) => (
                  <div key={stat.id} className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 space-y-1 hover:border-indigo-200 transition-all">
                    <input value={stat.value} onChange={(e) => handleStatChange(stat.id, 'value', e.target.value.substring(0, 10))} className="w-full bg-transparent font-black text-sm outline-none text-slate-800 focus:text-indigo-600" placeholder="Value" />
                    <input value={stat.label} onChange={(e) => handleStatChange(stat.id, 'label', e.target.value.substring(0, 20))} className="w-full bg-transparent text-[9px] font-bold uppercase text-slate-500 outline-none focus:text-slate-900" placeholder="Label" />
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm space-y-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2 block flex items-center gap-2"><ImageIcon size={14} className="text-indigo-500"/> Visual Asset</span>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} accept="image/*" />
              
              <div className="relative group w-full aspect-video border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl overflow-hidden">
                <div onClick={() => fileInputRef.current.click()} className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 transition-all">
                  {missionData.mainImage ? (
                    <>
                      <img src={getImageUrl(missionData.mainImage)} className="w-full h-full object-cover" alt="preview" />
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                        <span className="text-white text-[10px] font-black uppercase tracking-widest border border-white/40 px-4 py-2 rounded-full backdrop-blur-md">REPLACE IMAGE</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-300 group-hover:text-indigo-500">
                      <Upload size={20} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Upload Photo</span>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* --- RIGHT: LIVE PREVIEW (MACBOOK MOCKUP) --- */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-8' : 'w-full'} sticky top-24`}>
            {/* BLACK MACBOOK MOCKUP FRAME */}
            <div className="relative mx-auto bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 overflow-hidden">
              
              {/* Browser Toolbar UI */}
              <div className="flex items-center gap-2 mb-3 px-3">
                 <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                   <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
                 </div>
                 <div className="flex-1 max-w-[120px] mx-auto h-3.5 bg-slate-800 rounded-full flex items-center justify-center text-[6px] text-slate-500 font-bold uppercase tracking-widest">Mission Preview</div>
              </div>

              {/* Inner Page Canvas (Your custom design scaled perfectly) */}
              <div className="bg-white rounded-xl overflow-hidden min-h-[520px] max-h-[75vh] overflow-y-auto custom-scrollbar relative flex items-center justify-center">
                <div className="w-full scale-95 origin-center animate-in fade-in duration-500">
                  
                  {/* USER'S DESIGN STARTS HERE */}
                  <section className="py-12 bg-white px-8">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                      
                      <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">
                        <div className="relative rounded-[2rem] overflow-hidden border-[6px] border-zinc-950 bg-zinc-100 z-10 w-[300px] h-[400px]">
                          {missionData.mainImage ? (
                             <img src={getImageUrl(missionData.mainImage)} className="w-full h-full object-cover" alt="Mission" />
                          ) : (
                             <div className="w-full h-full flex flex-col items-center justify-center text-zinc-300 gap-2"><ImageIcon size={40} strokeWidth={1} /><span className="font-bold uppercase tracking-widest text-[10px]">No Image</span></div>
                          )}
                        </div>
                        
                        <div className="absolute -bottom-6 -right-2 flex flex-col bg-zinc-950 text-white p-5 rounded-[1.5rem] border-4 border-zinc-800 z-20 w-[180px] shadow-2xl">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 className="w-6 h-6 text-indigo-500" />
                            <span className="text-2xl font-black italic">100%</span>
                          </div>
                          <p className="text-[8px] font-black uppercase tracking-widest leading-tight">Satisfaction <br/><span className="text-indigo-500">Guaranteed</span></p>
                        </div>
                      </div>

                      <div className="w-full lg:w-1/2 text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 mb-6">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>
                          <span className="text-zinc-900 font-black text-[9px] uppercase tracking-widest leading-none">Our Mission</span>
                        </div>

                        <h2 className="text-[38px] font-black text-zinc-950 leading-[1.1] tracking-tighter mb-4">
                          {missionData.title} <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-400">
                            {missionData.highlight}
                          </span>
                        </h2>
                        
                        <p className="text-zinc-500 text-[11px] font-medium leading-relaxed mb-8 max-w-sm">
                          {missionData.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                          {missionData.stats.map((stat, idx) => (
                            <div key={idx} className="p-4 bg-white border-2 border-zinc-200 rounded-[1.5rem] hover:border-zinc-950 transition-all hover:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] group">
                              <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 mb-3 border border-zinc-100 transition-colors">
                                {statIcons[idx]}
                              </div>
                              <p className="text-2xl font-black text-zinc-950 leading-none">{stat.value}</p>
                              <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-1.5">{stat.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* USER'S DESIGN ENDS HERE */}

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

export default AboutMissionEditor;