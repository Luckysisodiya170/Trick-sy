import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { 
  Plus, Trash2, LayoutList, Type, AlignLeft, Loader2, Sparkles, 
  Edit3, Columns, Eye, PlayCircle, MoveUp, MoveDown,
  Zap, Settings, Search, ShieldCheck, Cpu, Clock, Wrench, CheckCircle, ClipboardCheck
} from 'lucide-react';

const ServiceProcessEditor = forwardRef(({ numericId }, ref) => {
  const dispatch = useDispatch();
  
  const content = useSelector((state) => state.adminData?.activeSubsection);
  const status = useSelector((state) => state.adminData?.status || '');

  const [viewMode, setViewMode] = useState('split');
  const [isSaving, setIsSaving] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const defaultSteps = [
    { id: 1, stepNum: '01', title: 'Site Inspection', desc: 'Advanced diagnostic analysis using premium sensors.', icon: 'Search' },
    { id: 2, stepNum: '02', title: 'Precision Repair', desc: 'Industrial-grade execution with certified parts.', icon: 'Settings' },
    { id: 3, stepNum: '03', title: 'Quality Audit', desc: 'Final safety performance and stress test.', icon: 'ShieldCheck' },
    { id: 4, stepNum: '04', title: 'Handover', desc: 'Complete documentation and maintenance briefing.', icon: 'ClipboardCheck' },
  ];

  const [pageData, setPageData] = useState({
    mainHeading: "The Execution",
    highlightWord: "Flow.",
    steps: defaultSteps
  });

  const iconLibrary = {
    Zap: <Zap size={24} />,
    Settings: <Settings size={24} />,
    Search: <Search size={24} />,
    ShieldCheck: <ShieldCheck size={24} />,
    Cpu: <Cpu size={24} />,
    Clock: <Clock size={24} />,
    Wrench: <Wrench size={24} />,
    CheckCircle: <CheckCircle size={24} />,
    ClipboardCheck: <ClipboardCheck size={24} />
  };

  useImperativeHandle(ref, () => ({
    handleAutoSave: async () => {
      return await handleSave();
    }
  }));

  useEffect(() => {
    if (numericId) { dispatch(fetchSingleSubsectionContent(numericId)); }
  }, [dispatch, numericId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0 && !hasLoaded) {
      if (content.id == numericId || content.subsectionId == numericId) {
        
        const fetchedSteps = content.process?.length > 0 ? content.process : defaultSteps;

        setPageData({
          mainHeading: content.processTitle ?? "The Execution",
          highlightWord: content.processHighlight ?? "Flow.",
          steps: fetchedSteps
        });
        setHasLoaded(true);
      }
    }
  }, [content, numericId, hasLoaded]);

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setPageData(prev => ({ ...prev, [name]: value }));
  };

  const handleStepUpdate = (id, field, value) => {
    setPageData(prev => ({
      ...prev,
      steps: prev.steps.map(step => step.id === id ? { ...step, [field]: value } : step)
    }));
  };

  const reIndex = (stepsArray) => stepsArray.map((s, i) => ({ 
    ...s, 
    stepNum: i + 1 < 10 ? `0${i + 1}` : `${i + 1}` 
  }));

  const handleAddStep = () => {
    const newStep = { id: Date.now(), stepNum: '', title: '', desc: '', icon: 'Zap' };
    setPageData(prev => ({ ...prev, steps: reIndex([...prev.steps, newStep]) }));
  };

  const deleteStep = (id) => {
    setPageData(prev => ({ ...prev, steps: reIndex(prev.steps.filter(s => s.id !== id)) }));
  };

  const moveStep = (index, direction) => {
    const updated = [...pageData.steps];
    const target = index + direction;
    if (target < 0 || target >= updated.length) return;
    [updated[index], updated[target]] = [updated[target], updated[index]];
    setPageData(prev => ({ ...prev, steps: reIndex(updated) }));
  };

  const handleSave = async () => {
    if (!numericId) return false;
    setIsSaving(true);
    try {
    
      const payload = {
        processTitle: pageData.mainHeading,
        processHighlight: pageData.highlightWord,
        process: pageData.steps 
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: numericId, 
        updateData: payload 
      })).unwrap();

      await dispatch(fetchSingleSubsectionContent(numericId)).unwrap();
      return true;
    } catch (error) { 
      console.error("Save failed:", error);
      return false; 
    } finally { 
      setIsSaving(false); 
    }
  };

  const safeText = (text) => text === '' ? '\u00A0' : text;

  if (status.includes('loading') && !hasLoaded) {
    return (
      <div className="h-full flex items-center justify-center font-black text-slate-300 uppercase text-xs tracking-widest italic">
        <Loader2 className="animate-spin mr-2" size={14}/> Syncing Process Flow...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden selection:bg-emerald-100">
      
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-emerald-50 rounded-xl"><PlayCircle size={18} className="text-emerald-600" /></div>
          <h2 className="hidden sm:block text-[13px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            Process <span className="text-emerald-400">Lab</span>
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
        
        <button onClick={handleAddStep} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg active:scale-95 disabled:opacity-50">
          <Plus size={14} /> <span className="hidden sm:inline">Add Step</span>
        </button>
      </div>

      <div className={`flex-1 transition-all duration-500 overflow-y-auto custom-scrollbar ${viewMode === 'split' ? 'grid grid-cols-1 xl:grid-cols-12 gap-0' : 'flex justify-center'}`}>
        
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-4 border-r border-slate-100' : 'w-full max-w-4xl p-8'} bg-white p-6 space-y-6 h-full overflow-y-auto custom-scrollbar shadow-2xl shadow-slate-200/50 z-10`}>
            
            <div className="bg-slate-50/50 rounded-[2rem] border border-slate-100 p-8 shadow-inner space-y-6">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-[10px] uppercase tracking-widest border-b border-slate-100 pb-5">
                  <Sparkles size={14} className="text-emerald-500" /> Header Config
              </h3>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">Main Heading</label>
                      <input name="mainHeading" value={pageData.mainHeading} onChange={handleHeaderChange} className="w-full p-4 bg-white border border-slate-100 rounded-xl font-bold text-slate-800 text-xs focus:border-emerald-400 outline-none transition-all shadow-sm"/>
                  </div>
                  <div>
                      <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">Highlight Word</label>
                      <input name="highlightWord" value={pageData.highlightWord} onChange={handleHeaderChange} className="w-full p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl font-black text-emerald-700 text-xs focus:border-emerald-400 outline-none transition-all shadow-sm"/>
                  </div>
              </div>
            </div>

            <div className="space-y-6 pb-20">
              <h3 className="font-black text-[10px] uppercase text-slate-400 ml-4 tracking-[0.2em]">Journey Steps ({pageData.steps.length})</h3>
              
              {pageData.steps.map((item, idx) => (
                <div key={item.id} className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:border-emerald-200 transition-all relative group animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-4">
                     <span className="w-10 h-10 rounded-xl bg-emerald-500 text-white text-[14px] font-black flex items-center justify-center shadow-lg shadow-emerald-500/30">{item.stepNum}</span>
                     <div className="flex gap-1">
                        <button onClick={() => moveStep(idx, -1)} disabled={idx === 0} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 disabled:opacity-20 transition-all"><MoveUp size={14}/></button>
                        <button onClick={() => moveStep(idx, 1)} disabled={idx === pageData.steps.length - 1} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 disabled:opacity-20 transition-all"><MoveDown size={14}/></button>
                        <button onClick={() => deleteStep(item.id)} className="p-2 hover:bg-rose-50 rounded-xl text-rose-400 hover:text-rose-500 transition-all"><Trash2 size={14}/></button>
                     </div>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">No.</label>
                            <input value={item.stepNum} onChange={e => handleStepUpdate(item.id, 'stepNum', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-black text-emerald-600 text-center text-xs outline-none focus:border-emerald-400 shadow-inner transition-all" />
                        </div>
                        <div className="col-span-3">
                            <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">Title</label>
                            <input value={item.title} onFocus={() => setActiveField(idx)} onBlur={() => setActiveField(null)} onChange={e => handleStepUpdate(item.id, 'title', e.target.value)} placeholder="Step Title" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-800 text-xs focus:bg-white focus:border-emerald-400 outline-none transition-all shadow-inner" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">Choose Icon</label>
                      <select value={item.icon} onChange={(e) => handleStepUpdate(item.id, 'icon', e.target.value)}
                        className="bg-slate-50 border border-slate-100 text-[10px] font-black uppercase rounded-xl p-4 outline-none text-slate-600 focus:border-emerald-400 transition-all shadow-inner mb-4">
                        {Object.keys(iconLibrary).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">Explanation</label>
                      <textarea rows="2" value={item.desc} onFocus={() => setActiveField(idx)} onBlur={() => setActiveField(null)} onChange={e => handleStepUpdate(item.id, 'desc', e.target.value)} placeholder="Describe what happens..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium text-slate-600 outline-none focus:bg-white focus:border-emerald-400 h-20 resize-none transition-all shadow-inner" />
                    </div>
                  </div>
                </div>
              ))}

              {pageData.steps.length === 0 && (
                <div className="h-48 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem] bg-white text-center p-8">
                  <PlayCircle className="text-slate-200 mb-4" size={32} />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Workflow empty.<br/>Click 'Add Step' to begin.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-8 bg-[#F1F5F9] p-4 sm:p-12' : 'w-full p-4 sm:p-12 bg-[#F1F5F9]'} flex items-start justify-center overflow-y-auto custom-scrollbar h-full`}>
             <div className="w-full max-w-[1200px] min-h-[500px] bg-white rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border-[10px] border-slate-900 overflow-hidden relative flex flex-col shrink-0 scale-[0.95] xl:scale-100 origin-top">
              
              <div className="h-8 bg-slate-900 flex items-center px-6 gap-2 shrink-0 z-20">
                  <div className="flex gap-1.5 absolute left-6"><div className="w-2 h-2 rounded-full bg-rose-500"></div><div className="w-2 h-2 rounded-full bg-amber-500"></div><div className="w-2 h-2 rounded-full bg-emerald-500"></div></div>
                  <div className="mx-auto w-48 h-4 bg-slate-800 rounded text-[7px] text-slate-500 flex items-center justify-center font-bold tracking-widest uppercase italic">tricksy-preview.io/process</div>
              </div>

              <section className="py-20 px-8 bg-[#FDFDFD] relative min-h-[80vh]">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-zinc-950 uppercase tracking-tighter leading-none">
                      {safeText(pageData.mainHeading)} <span className="text-emerald-500 italic underline decoration-slate-100 underline-offset-8">{safeText(pageData.highlightWord)}</span>
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 relative max-w-6xl mx-auto">
                  {pageData.steps.map((step, idx) => {
                    const isLastItem = idx === pageData.steps.length - 1;
                    const isLastInRowMd = (idx + 1) % 4 === 0;

                    return (
                      <div key={idx} className={`relative z-10 flex flex-col items-center text-center group transition-all duration-500 ${activeField === idx ? 'scale-110' : ''}`}>
                        
                        {!isLastItem && (
                          <div className={`hidden lg:block absolute top-[40px] left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-emerald-100 to-emerald-300 -z-10 ${isLastInRowMd ? '!hidden' : ''}`}></div>
                        )}

                        <div className={`relative z-10 w-20 h-20 rounded-2xl bg-white border-[3px] flex items-center justify-center text-emerald-500 transition-all duration-300 shadow-xl mb-6 ${activeField === idx ? 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/30' : 'border-emerald-100 text-emerald-500'}`}>
                          {iconLibrary[step.icon] || <Zap size={28} />}
                        </div>
                        
                        <div className={`text-[10px] font-black uppercase tracking-widest mb-2 transition-colors ${activeField === idx ? 'text-emerald-600' : 'text-slate-400'}`}>STEP {safeText(step.stepNum)}</div>
                        <h3 className={`text-lg font-black text-zinc-950 mb-3 transition-colors ${activeField === idx ? 'text-emerald-600' : ''}`}>{safeText(step.title)}</h3>
                        <p className="text-zinc-500 font-medium text-xs px-2 leading-relaxed">
                          {safeText(step.desc)}
                        </p>
                      </div>
                    );
                  })}

                  {pageData.steps.length === 0 && (
                     <div className="col-span-full py-20 text-center opacity-10 border-2 border-dashed border-slate-300 rounded-[3rem]">
                        <h3 className="text-3xl font-black text-slate-400 italic uppercase tracking-tighter">Workflow Empty</h3>
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

export default ServiceProcessEditor;