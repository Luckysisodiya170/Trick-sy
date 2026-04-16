import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../../store/index'; 
import { 
  Plus, Trash2, ListOrdered, Type, AlignLeft, Loader2, Sparkles, 
  Hash, Edit3, Columns, Eye, PlayCircle
} from 'lucide-react';

const ServiceProcessEditor = forwardRef(({ numericId }, ref) => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const [viewMode, setViewMode] = useState('split');
  const [processSteps, setProcessSteps] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [activeField, setActiveField] = useState(null);

  // WIZARD AUTO-SAVE CONNECT
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
      setProcessSteps(content.process || []);
    }
  }, [content]);

  const handleStepChange = (index, field, value) => {
    const updated = [...processSteps];
    updated[index] = { ...updated[index], [field]: value };
    setProcessSteps(updated);
  };

  const handleAddStep = () => {
    const nextStepNum = (processSteps.length + 1).toString().padStart(2, '0');
    setProcessSteps([...processSteps, { step: nextStepNum, title: "New Step", desc: "Short explanation..." }]);
  };

  const handleRemoveStep = (index) => {
    const updated = processSteps.filter((_, i) => i !== index);
    const reordered = updated.map((item, i) => ({
      ...item,
      step: (i + 1).toString().padStart(2, '0')
    }));
    setProcessSteps(reordered);
  };

  const handleSave = async () => {
    if (!numericId) return false;
    setIsSaving(true);
    try {
      const payload = { process: processSteps };
      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: numericId, 
        updateData: payload 
      })).unwrap();
      return true;
    } catch (error) { return false; } finally { setIsSaving(false); }
  };

  if (status === 'loading' && (!content || Object.keys(content).length === 0)) {
    return <div className="h-full flex items-center justify-center font-black text-slate-300 uppercase text-xs tracking-widest italic">Syncing Process...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden">
      
      {/* MODERN TOOLBAR */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-emerald-50 rounded-xl"><PlayCircle size={22} className="text-emerald-600" /></div>
          <div>
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">Process Flow</h2>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Designing Service Journey</p>
          </div>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-2xl shadow-inner mx-2">
          {[
            { id: 'edit', icon: Edit3, label: 'Edit' },
            { id: 'split', icon: Columns, label: 'Split' },
            { id: 'preview', icon: Eye, label: 'Preview' }
          ].map(m => (
            <button key={m.id} onClick={() => setViewMode(m.id)} className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all duration-300 ${viewMode === m.id ? 'bg-white text-emerald-600 shadow-sm scale-105' : 'text-slate-500 hover:text-slate-700'}`}>
              <m.icon size={14} /> <span className="hidden md:inline">{m.label}</span>
            </button>
          ))}
        </div>
        
        <button onClick={handleAddStep} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-lg active:scale-95">
          <Plus size={16} /> Add Step
        </button>
      </div>

      <div className={`flex-1 transition-all duration-500 overflow-y-auto custom-scrollbar ${viewMode === 'split' ? 'grid grid-cols-1 xl:grid-cols-12 gap-0' : 'flex justify-center'}`}>
        
        {/* EDITOR PANEL (Bigger inputs like Hero) */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-4 border-r border-slate-200' : 'w-full max-w-3xl p-8'} bg-[#F8FAFC] p-6 space-y-6 h-full overflow-y-auto custom-scrollbar`}>
            
            <div className="space-y-6 pb-20">
              <h3 className="font-black text-[10px] uppercase text-slate-400 ml-4 tracking-[0.2em]">Journey Steps ({processSteps.length})</h3>
              
              {processSteps.map((item, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all relative group animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <button onClick={() => handleRemoveStep(idx)} className="absolute top-6 right-6 p-2 bg-slate-50 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all">
                      <Trash2 size={16} />
                  </button>
                  
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
                     <span className="w-10 h-10 rounded-xl bg-emerald-500 text-white text-[14px] font-black flex items-center justify-center border shadow-lg shadow-emerald-100">{item.step}</span>
                     <span className="text-[10px] font-black text-slate-900 uppercase">Edit Step</span>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-1 block tracking-widest">Step No.</label>
                            <input value={item.step} onChange={e => handleStepChange(idx, 'step', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-emerald-600 text-center text-sm outline-none focus:bg-white shadow-inner" />
                        </div>
                        <div className="col-span-3">
                            <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-1 block tracking-widest">Title</label>
                            <input value={item.title} onFocus={() => setActiveField(idx)} onBlur={() => setActiveField(null)} onChange={e => handleStepChange(idx, 'title', e.target.value)} placeholder="Step Title" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-800 text-sm focus:bg-white focus:border-emerald-400 outline-none transition-all shadow-inner" />
                        </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-1 block tracking-widest">Brief Explanation</label>
                      <textarea rows="2" value={item.desc} onFocus={() => setActiveField(idx)} onBlur={() => setActiveField(null)} onChange={e => handleStepChange(idx, 'desc', e.target.value)} placeholder="Describe what happens..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-slate-600 outline-none focus:bg-white focus:border-emerald-400 h-20 resize-none transition-all shadow-inner" />
                    </div>
                  </div>
                </div>
              ))}

              {processSteps.length === 0 && (
                <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[3rem] bg-white text-center p-8">
                  <PlayCircle className="text-slate-200 mb-4" size={48} />
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-relaxed">Workflow empty.<br/>Click 'Add Step' to begin.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* RIGHT PANEL: EXACT REAL PREVIEW (HORIZONTAL) */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-8 bg-[#F1F5F9] p-4 sm:p-12' : 'w-full p-4 sm:p-12'} flex items-start justify-center overflow-y-auto custom-scrollbar h-full`}>
             <div className="w-full max-w-[1200px] min-h-[500px] bg-white rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border-8 border-slate-900 overflow-hidden relative flex flex-col shrink-0">
              
              {/* Fake Browser Bar */}
              <div className="h-10 bg-slate-900 flex items-center px-6 gap-2 shrink-0">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div></div>
                  <div className="mx-auto w-48 h-4 bg-slate-800 rounded text-[8px] text-slate-500 flex items-center justify-center font-bold tracking-widest uppercase italic">tricksy-preview.io/process</div>
              </div>

              {/* EXACT USER-SIDE REPLICA */}
              <section className="py-20 px-8 bg-white relative min-h-full">
                <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 mb-20 text-center tracking-tight">How It Works</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 relative">
                  {processSteps.map((step, idx) => {
                    const isLastItem = idx === processSteps.length - 1;
                    const isLastInRowMd = (idx + 1) % 4 === 0;

                    return (
                      <div key={idx} className={`relative z-10 flex flex-col items-center text-center group transition-all duration-500 ${activeField === idx ? 'scale-110' : ''}`}>
                        
                        {/* THE STEP CONNECTOR LINE */}
                        {!isLastItem && (
                          <div className={`hidden lg:block absolute top-[40px] left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-emerald-100 to-emerald-300 -z-10 ${isLastInRowMd ? '!hidden' : ''}`}></div>
                        )}

                        <div className={`relative z-10 w-20 h-20 rounded-2xl bg-white border-4 flex items-center justify-center text-2xl font-black transition-all duration-300 shadow-xl mb-6 ${activeField === idx ? 'bg-emerald-500 text-white border-emerald-400' : 'border-emerald-50 text-emerald-500'}`}>
                          {step.step}
                        </div>
                        
                        <h3 className={`text-xl font-black text-zinc-950 mb-3 transition-colors ${activeField === idx ? 'text-emerald-600' : ''}`}>{step.title || "Step Title"}</h3>
                        <p className="text-zinc-500 font-medium text-xs px-2 leading-relaxed">
                          {step.desc || "Description for this step will appear here."}
                        </p>
                      </div>
                    );
                  })}

                  {processSteps.length === 0 && (
                     <div className="col-span-full py-20 text-center opacity-10 border-2 border-dashed border-slate-200 rounded-[3rem]">
                        <h3 className="text-4xl font-black text-slate-300 italic uppercase tracking-tighter">Workflow Visualization Empty</h3>
                     </div>
                  )}
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

export default ServiceProcessEditor;