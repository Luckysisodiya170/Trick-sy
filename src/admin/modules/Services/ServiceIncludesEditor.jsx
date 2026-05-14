import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { 
  Plus, Trash2, ListChecks, Type, AlignLeft, Loader2, Sparkles, 
  CheckCircle2, ShieldCheck, Wind, Fan, Sparkle, Search,
  Droplets, HardHat, Hammer, PenTool, Lightbulb, Box, Zap, Recycle, 
  Edit3, Columns, Eye
} from 'lucide-react';

const availableIcons = [
  { name: 'Wind', icon: Wind }, { name: 'Fan', icon: Fan },
  { name: 'Shield', icon: ShieldCheck }, { name: 'Sparkles', icon: Sparkle },
  { name: 'Droplets', icon: Droplets }, { name: 'Check', icon: CheckCircle2 },
  { name: 'Tools', icon: PenTool }, { name: 'Safety', icon: HardHat },
  { name: 'Repair', icon: Hammer }, { name: 'Idea', icon: Lightbulb },
  { name: 'Package', icon: Box }, { name: 'Energy', icon: Zap },
  { name: 'Eco', icon: Recycle },
];

const colorfulIcons = [
  "bg-emerald-100 text-emerald-600 border-emerald-200",
  "bg-blue-100 text-blue-600 border-blue-200",
  "bg-amber-100 text-amber-600 border-amber-200",
  "bg-rose-100 text-rose-600 border-rose-200"
];

const ServiceIncludesEditor = forwardRef(({ numericId }, ref) => {
  const dispatch = useDispatch();
  
  const content = useSelector((state) => state.adminData?.activeSubsection);
  const status = useSelector((state) => state.adminData?.status || '');

  const [viewMode, setViewMode] = useState('split'); 
  const [sectionHeader, setSectionHeader] = useState({ title: "", description: "" });
  const [includes, setIncludes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useImperativeHandle(ref, () => ({
    handleAutoSave: async () => {
      return await handleSave();
    }
  }));

  useEffect(() => {
    if (numericId) { 
      dispatch(fetchSingleSubsectionContent(numericId)); 
    }
  }, [dispatch, numericId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0 && !hasLoaded) {
      if (content.id == numericId || content.subsectionId == numericId) {
        setSectionHeader({
          title: content.includesTitle ?? "What's Included",
          description: content.includesDesc ?? "Everything you need for a spotless space."
        });
        setIncludes(content.features || []);
        setHasLoaded(true);
      }
    }
  }, [content, numericId, hasLoaded]);

  const handleIncludeChange = (index, field, value) => {
    const updated = [...includes];
    updated[index] = { ...updated[index], [field]: value };
    setIncludes(updated);
  };

  const handleSave = async () => {
    if (!numericId) return false;
    setIsSaving(true);
    try {
      const payload = {
        includesTitle: sectionHeader.title,
        includesDesc: sectionHeader.description,
        features: includes 
      };
      await dispatch(updateSingleSubsectionContent({ subsectionId: numericId, updateData: payload })).unwrap();
      await dispatch(fetchSingleSubsectionContent(numericId)).unwrap();
      return true;
    } catch (error) { 
      console.error("Save failed:", error);
      return false; 
    } finally { 
      setIsSaving(false); 
    }
  };

  const IconRenderer = ({ iconName, className }) => {
    const found = availableIcons.find(i => i.name === iconName);
    const IconComponent = found ? found.icon : CheckCircle2;
    return <IconComponent className={className} />;
  };

  const safeText = (text) => text === '' ? '\u00A0' : text;

  if (status.includes('loading') && !hasLoaded) {
    return (
      <div className="h-full flex items-center justify-center font-black text-slate-400 uppercase text-xs tracking-widest italic">
        <Loader2 className="animate-spin mr-2" size={14}/> Syncing Includes Studio...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden selection:bg-emerald-100">
      
      {/* TOOLBAR */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-emerald-50 rounded-xl"><ListChecks size={18} className="text-emerald-600" /></div>
          <h2 className="hidden sm:block text-[13px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            Includes <span className="text-emerald-400">Lab</span>
          </h2>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100 mx-2">
          {[
            { id: 'edit', icon: Edit3, label: 'Edit' },
            { id: 'split', icon: Columns, label: 'Split' },
            { id: 'preview', icon: Eye, label: 'Preview' }
          ].map(m => (
            <button key={m.id} onClick={() => setViewMode(m.id)} className={`flex items-center gap-1.5 px-4 md:px-5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${viewMode === m.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
              <m.icon size={12} /> <span className="hidden md:inline">{m.label}</span>
            </button>
          ))}
        </div>
        
        <button onClick={() => setIncludes([...includes, { title: "", desc: "", icon: "Check" }])} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg active:scale-95">
          <Plus size={14} /> <span className="hidden sm:inline">Add Card</span>
        </button>
      </div>

      <div className={`flex-1 transition-all duration-500 overflow-y-auto custom-scrollbar ${viewMode === 'split' ? 'grid grid-cols-1 xl:grid-cols-12 gap-0' : 'flex justify-center'}`}>
        
        {/* EDITOR PANEL */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-4 border-r border-slate-100' : 'w-full max-w-3xl'} bg-white p-6 sm:p-8 space-y-8 h-full overflow-y-auto custom-scrollbar shadow-2xl shadow-slate-200/50 z-10`}>
            
            <div className="bg-slate-50/50 rounded-[2rem] border border-slate-100 p-8 shadow-inner space-y-6">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-[10px] uppercase tracking-widest border-b border-slate-100 pb-5">
                  <Sparkles size={14} className="text-emerald-500" /> Branding
              </h3>
              <div className="space-y-5">
                  <div>
                      <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">Main Heading</label>
                      <input value={sectionHeader.title} onFocus={() => setActiveField('header')} onBlur={() => setActiveField(null)} onChange={e => setSectionHeader({...sectionHeader, title: e.target.value})} className="w-full p-4 bg-white border border-slate-100 rounded-xl font-black text-slate-800 text-xs focus:border-emerald-400 outline-none transition-all shadow-sm"/>
                  </div>
                  <div>
                      <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">Description</label>
                      <textarea value={sectionHeader.description} onFocus={() => setActiveField('header')} onBlur={() => setActiveField(null)} onChange={e => setSectionHeader({...sectionHeader, description: e.target.value})} className="w-full p-4 bg-white border border-slate-100 rounded-xl text-xs font-medium text-slate-600 outline-none focus:border-emerald-400 h-24 resize-none transition-all shadow-sm"/>
                  </div>
              </div>
            </div>

            <div className="space-y-6 pb-20">
              <h3 className="font-black text-[10px] uppercase text-slate-400 ml-4 tracking-[0.2em]">Items ({includes.length})</h3>
              {includes.map((item, idx) => (
                <div key={idx} className="bg-slate-50/50 rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:border-emerald-200 transition-all relative group animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <button onClick={() => setIncludes(includes.filter((_, i) => i !== idx))} className="absolute top-6 right-6 p-2 bg-white text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all shadow-sm">
                      <Trash2 size={14} />
                  </button>
                  
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                     <span className={`w-6 h-6 rounded-lg text-[10px] font-black flex items-center justify-center shadow-md ${colorfulIcons[idx % 4]}`}>{idx + 1}</span>
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Card Settings</span>
                  </div>

                  <div className="space-y-6">
                    {/* COMPACT ICON PICKER */}
                    <div>
                      <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">Choose Icon</label>
                      <div className="flex flex-wrap gap-2 p-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        {availableIcons.map(iconObj => (
                          <button key={iconObj.name} onClick={() => handleIncludeChange(idx, 'icon', iconObj.name)} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${item.icon === iconObj.name ? 'bg-emerald-500 text-white shadow-md scale-105' : 'bg-slate-50 text-slate-400 hover:text-emerald-500 border border-slate-100'}`}>
                            <iconObj.icon size={16} />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <input value={item.title} onChange={e => handleIncludeChange(idx, 'title', e.target.value)} onFocus={() => setActiveField(idx)} onBlur={() => setActiveField(null)} placeholder="Feature Title" className="w-full p-4 bg-white border border-slate-100 rounded-xl font-bold text-slate-800 text-xs focus:border-emerald-400 outline-none transition-all shadow-sm" />
                    <textarea rows="2" value={item.desc} onChange={e => handleIncludeChange(idx, 'desc', e.target.value)} placeholder="Description..." className="w-full p-4 bg-white border border-slate-100 rounded-xl text-xs font-medium text-slate-600 outline-none focus:border-emerald-400 h-20 resize-none transition-all shadow-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREVIEW PANEL */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-8 bg-[#F1F5F9] p-4 sm:p-12' : 'w-full p-4 sm:p-12 bg-slate-50'} flex items-start justify-center overflow-y-auto h-full custom-scrollbar`}>
             <div className="w-full max-w-[1200px] bg-zinc-50 rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border-[10px] border-slate-900 overflow-hidden relative flex flex-col shrink-0 scale-[0.95] xl:scale-100 origin-top">
              
              <div className="h-8 bg-slate-900 flex items-center px-6 gap-2 shrink-0 relative z-20">
                  <div className="flex gap-1.5 absolute left-6"><div className="w-2 h-2 rounded-full bg-rose-500"></div><div className="w-2 h-2 rounded-full bg-amber-500"></div><div className="w-2 h-2 rounded-full bg-emerald-500"></div></div>
                  <div className="mx-auto w-48 h-4 bg-slate-800 rounded text-[7px] text-slate-500 flex items-center justify-center font-bold tracking-widest uppercase">tricksy-preview.io/includes</div>
              </div>

              <section className="py-20 sm:py-24 px-8 lg:px-16 bg-[#FDFDFD] min-h-full">
                <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-500 ${activeField === 'header' ? 'scale-105' : ''}`}>
                  <h2 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight mb-4 uppercase">{safeText(sectionHeader.title)}</h2>
                  <p className="text-zinc-500 text-base md:text-lg font-medium leading-relaxed">{safeText(sectionHeader.description)}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  {includes.map((item, idx) => (
                    <div key={idx} className={`p-8 bg-white border border-zinc-100 rounded-[2.5rem] hover:border-emerald-200 transition-all duration-500 group shadow-sm flex flex-col overflow-hidden ${activeField === idx ? 'ring-4 ring-emerald-100 scale-105 border-emerald-300 shadow-xl' : ''}`}>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border shrink-0 transition-transform duration-500 group-hover:rotate-6 ${colorfulIcons[idx % 4]}`}>
                        <IconRenderer iconName={item.icon} className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-black text-zinc-950 mb-3 break-words leading-[1.1]">{safeText(item.title)}</h3>
                      <p className="text-zinc-500 font-medium leading-relaxed text-[13px] break-words">
                        {safeText(item.desc)}
                      </p>
                    </div>
                  ))}
                  
                  {includes.length === 0 && (
                     <div className="col-span-full py-20 text-center opacity-10 border-2 border-dashed border-slate-300 rounded-[3rem]">
                        <h3 className="text-2xl font-black italic uppercase">Preview Empty</h3>
                     </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 3px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }`}</style>
    </div>
  );
});

export default ServiceIncludesEditor;