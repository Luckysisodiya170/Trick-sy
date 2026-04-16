import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../../store/index'; 
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
  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const [viewMode, setViewMode] = useState('split'); 
  const [sectionHeader, setSectionHeader] = useState({ title: "", description: "" });
  const [includes, setIncludes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [activeField, setActiveField] = useState(null);

  useImperativeHandle(ref, () => ({
    handleAutoSave: async () => {
      return await handleSave();
    }
  }));

  useEffect(() => {
    if (numericId) { dispatch(fetchSingleSubsectionContent(numericId)); }
  }, [dispatch, numericId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setSectionHeader({
        title: content.includesTitle || "What's Included",
        description: content.includesDesc || "Everything you need for a spotless space."
      });
      setIncludes(content.features || []);
    }
  }, [content]);

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
      return true;
    } catch (error) { return false; } finally { setIsSaving(false); }
  };

  const IconRenderer = ({ iconName, className }) => {
    const found = availableIcons.find(i => i.name === iconName);
    const IconComponent = found ? found.icon : CheckCircle2;
    return <IconComponent className={className} />;
  };

  if (status === 'loading' && (!content || Object.keys(content).length === 0)) {
    return <div className="h-full flex items-center justify-center font-black text-slate-300 uppercase text-xs tracking-widest italic">Syncing Interface...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden">
      
      {/* TOOLBAR */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-emerald-50 rounded-xl"><ListChecks size={22} className="text-emerald-600" /></div>
          <h2 className="hidden sm:block text-base font-black text-slate-900 uppercase tracking-tight italic">Includes <span className="text-emerald-500">Studio</span></h2>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-2xl shadow-inner mx-2">
          {[
            { id: 'edit', icon: Edit3, label: 'Edit' },
            { id: 'split', icon: Columns, label: 'Split' },
            { id: 'preview', icon: Eye, label: 'Preview' }
          ].map(m => (
            <button key={m.id} onClick={() => setViewMode(m.id)} className={`flex items-center gap-2 px-4 md:px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all duration-300 ${viewMode === m.id ? 'bg-white text-emerald-600 shadow-sm scale-105' : 'text-slate-500 hover:text-slate-700'}`}>
              <m.icon size={14} /> <span className="hidden md:inline">{m.label}</span>
            </button>
          ))}
        </div>
        
        <button onClick={() => setIncludes([...includes, { title: "", desc: "", icon: "Wind" }])} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-lg active:scale-95">
          <Plus size={16} /> <span className="hidden sm:inline">Add Card</span>
        </button>
      </div>

      <div className={`flex-1 transition-all duration-500 overflow-y-auto custom-scrollbar ${viewMode === 'split' ? 'grid grid-cols-1 xl:grid-cols-12 gap-0' : 'flex justify-center'}`}>
        
        {/* EDITOR PANEL */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-4 border-r border-slate-200' : 'w-full max-w-3xl'} bg-[#F8FAFC] p-6 sm:p-8 space-y-8 h-full overflow-y-auto custom-scrollbar`}>
            
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-xs uppercase tracking-tight border-b pb-5">
                  <Sparkles size={18} className="text-emerald-500" /> Branding
              </h3>
              <div className="space-y-5">
                  <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">Main Heading</label>
                      <input value={sectionHeader.title} onFocus={() => setActiveField('header')} onBlur={() => setActiveField(null)} onChange={e => setSectionHeader({...sectionHeader, title: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-800 text-sm focus:bg-white focus:border-emerald-400 outline-none transition-all shadow-inner"/>
                  </div>
                  <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">Description</label>
                      <textarea value={sectionHeader.description} onFocus={() => setActiveField('header')} onBlur={() => setActiveField(null)} onChange={e => setSectionHeader({...sectionHeader, description: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-slate-600 outline-none focus:bg-white focus:border-emerald-400 h-24 resize-none transition-all shadow-inner"/>
                  </div>
              </div>
            </div>

            <div className="space-y-6 pb-20">
              <h3 className="font-black text-[10px] uppercase text-slate-400 ml-4 tracking-[0.2em]">Items ({includes.length})</h3>
              {includes.map((item, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all relative group animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <button onClick={() => setIncludes(includes.filter((_, i) => i !== idx))} className="absolute top-6 right-6 p-2 bg-slate-50 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all">
                      <Trash2 size={16} />
                  </button>
                  
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
                     <span className={`w-8 h-8 rounded-xl text-[12px] font-black flex items-center justify-center border shadow-sm ${colorfulIcons[idx % 4]}`}>{idx + 1}</span>
                     <span className="text-[10px] font-black text-slate-900 uppercase">Card Settings</span>
                  </div>

                  <div className="space-y-6">
                    {/* COMPACT ICON PICKER */}
                    <div>
                      <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">Choose Icon</label>
                      <div className="flex flex-wrap gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                        {availableIcons.map(iconObj => (
                          <button key={iconObj.name} onClick={() => handleIncludeChange(idx, 'icon', iconObj.name)} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${item.icon === iconObj.name ? 'bg-emerald-500 text-white shadow-md scale-105' : 'bg-white text-slate-400 hover:text-emerald-500 border border-slate-100'}`}>
                            <iconObj.icon size={16} />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <input value={item.title} onChange={e => handleIncludeChange(idx, 'title', e.target.value)} onFocus={() => setActiveField(idx)} onBlur={() => setActiveField(null)} placeholder="Feature Title" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-800 text-sm focus:bg-white focus:border-emerald-400 outline-none transition-all shadow-inner" />
                    <textarea rows="2" value={item.desc} onChange={e => handleIncludeChange(idx, 'desc', e.target.value)} placeholder="Description..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-slate-600 outline-none focus:bg-white focus:border-emerald-400 h-20 resize-none transition-all shadow-inner" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREVIEW PANEL */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-8 bg-[#F1F5F9] p-4 sm:p-8' : 'w-full p-4 sm:p-8'} flex items-start justify-center overflow-y-auto custom-scrollbar h-full`}>
             <div className="w-full max-w-[1200px] bg-zinc-50 rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] border-8 border-slate-900 overflow-hidden relative flex flex-col shrink-0 scale-[0.95] xl:scale-100 origin-top">
              
              <div className="h-10 bg-slate-900 flex items-center px-6 gap-2 shrink-0">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div></div>
                  <div className="mx-auto w-48 h-4 bg-slate-800 rounded text-[8px] text-slate-500 flex items-center justify-center font-bold tracking-widest uppercase italic">tricksy-preview.io/services</div>
              </div>

              <section className="py-20 sm:py-24 px-8 lg:px-16 bg-zinc-50 relative min-h-full">
                <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-500 ${activeField === 'header' ? 'scale-105' : ''}`}>
                  <h2 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight mb-4">{sectionHeader.title}</h2>
                  <p className="text-zinc-500 text-lg font-medium leading-relaxed">{sectionHeader.description}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  {includes.map((item, idx) => (
                    <div key={idx} className={`p-6 bg-white border border-zinc-100 rounded-[2.5rem] hover:border-emerald-200 transition-all duration-500 group shadow-sm flex flex-col overflow-hidden ${activeField === idx ? 'ring-4 ring-emerald-100 scale-105 border-emerald-300 shadow-xl' : ''}`}>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border shrink-0 transition-transform duration-500 group-hover:rotate-6 ${colorfulIcons[idx % 4]}`}>
                        <IconRenderer iconName={item.icon} className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-black text-zinc-950 mb-3 break-words leading-[1.1]">{item.title || "Untitled"}</h3>
                      <p className="text-zinc-500 font-medium leading-relaxed text-[13px] break-words">
                        {item.desc || "Details will appear here..."}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 5px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }`}</style>
    </div>
  );
});

export default ServiceIncludesEditor;