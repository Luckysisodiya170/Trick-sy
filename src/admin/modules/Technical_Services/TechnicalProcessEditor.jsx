import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent, fetchPageSections } from '../../redux/slices/adminSlice';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Type, AlignLeft, Monitor, Undo, Plus, Trash2, 
  MoveUp, MoveDown, Zap, LayoutList, Settings, Search, 
  ShieldCheck, Cpu, Clock, Wrench, CheckCircle, ClipboardCheck, Loader2
} from 'lucide-react';

const TechnicalProcessEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const sidebarTree = useSelector((state) => state.adminData?.sidebarTree || []);
  const sections = useSelector((state) => state.adminData?.pageSections || []);
  const reduxContent = useSelector((state) => state.adminData?.activeSubsection);
  const status = useSelector((state) => state.adminData?.status || '');

  const techSectionInfo = sidebarTree.find(sec => sec.slug === 'technical');
  const sectionId = techSectionInfo?.id || 4;

  const currentSection = sections.find(s => s.slug === 'tech-process');
  const subsectionId = id || currentSection?.id || 25;

  const [viewMode, setViewMode] = useState('split'); 
  const [isSaving, setIsSaving] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

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
    if (reduxContent && Object.keys(reduxContent).length > 0 && !hasLoaded) {
      if (reduxContent.id == subsectionId || reduxContent.subsectionId == subsectionId) {
        const fetchedSteps = reduxContent.listItems?.length > 0 
          ? reduxContent.listItems.map((item, i) => ({
              id: item.id || Date.now() + i, 
              dbId: item.id, 
              stepNum: (i + 1 < 10 ? `0${i + 1}` : `${i + 1}`),
              title: item.itemTitle ?? '',
              desc: item.itemDescription ?? '',
              icon: item.itemIcon ?? 'Zap'
            })) 
          : defaultSteps;

        setPageData({
          mainHeading: reduxContent.titleLine1 ?? "The Execution",
          highlightWord: reduxContent.titleHighlight ?? "Flow.",
          steps: fetchedSteps
        });
        setHasLoaded(true);
      }
    }
  }, [reduxContent, subsectionId, hasLoaded]);

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

  const addStep = () => {
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

  const handleReset = () => {
    if(window.confirm('Reset all steps to saved values?')) {
      if (reduxContent) {
        const fetchedSteps = reduxContent.listItems?.length > 0 
          ? reduxContent.listItems.map((item, i) => ({
              id: item.id || Date.now() + i,
              dbId: item.id,
              stepNum: (i + 1 < 10 ? `0${i + 1}` : `${i + 1}`),
              title: item.itemTitle ?? '',
              desc: item.itemDescription ?? '',
              icon: item.itemIcon ?? 'Zap'
            })) 
          : defaultSteps;

        setPageData({
          mainHeading: reduxContent.titleLine1 ?? "The Execution",
          highlightWord: reduxContent.titleHighlight ?? "Flow.",
          steps: fetchedSteps
        });
      } else {
        setPageData({ mainHeading: "The Execution", highlightWord: "Flow.", steps: defaultSteps });
      }
    }
  };

  const handleSave = async () => {
    if (!subsectionId) return alert("Error: Missing Subsection ID.");

    setIsSaving(true);
    try {
      const listItemsPayload = pageData.steps.map((step, index) => ({
        id: step.dbId || undefined,
        itemTitle: step.title,
        itemDescription: step.desc,
        itemIcon: step.icon,
        itemOrder: index + 1
      }));

      const payload = {
        titleLine1: pageData.mainHeading,
        titleHighlight: pageData.highlightWord,
        listItems: listItemsPayload
      };

      await dispatch(updateSingleSubsectionContent({
        subsectionId: subsectionId,
        updateData: payload
      })).unwrap();

      await dispatch(fetchSingleSubsectionContent(subsectionId)).unwrap();
      navigate('/admin/pages/technical');

      alert("Process Flow Deployed Successfully! 🚀");
    } catch (error) {
      console.error(error);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const safeText = (text) => text === '' ? '\u00A0' : text;

  if (status.includes('loading') && !hasLoaded) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest text-xs bg-[#F8FAFC]">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING PROCESS LAB...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden selection:bg-emerald-100">
      
      <nav className="sticky top-0 z-[50] bg-white/80 backdrop-blur-md border-b border-slate-100 px-3 lg:px-6 py-3 flex items-center justify-between shadow-sm gap-2 shrink-0">
        <div className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-slate-900">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm lg:text-[13px] font-black italic flex items-center gap-1.5 uppercase tracking-[0.2em] text-slate-800">
            <LayoutList size={16} className="text-emerald-600 lg:w-4 lg:h-4" /> 
            Process <span className="text-emerald-400">Lab</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100 flex-shrink-1 mx-2">
          {[
            { id: 'edit', icon: Edit3, label: 'Edit' }, 
            { id: 'split', icon: Columns, label: 'Split' }, 
            { id: 'preview', icon: Eye, label: 'Preview' }
          ].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} 
              className={`flex items-center gap-1.5 px-3 lg:px-5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'
              }`}>
              <mode.icon size={12} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className={`${viewMode === mode.id ? 'inline' : 'hidden sm:inline'}`}>{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-slate-900 text-white p-2.5 lg:px-8 lg:py-2 rounded-xl font-black text-[10px] tracking-widest flex items-center gap-2 hover:bg-emerald-600 transition-all flex-shrink-0 active:scale-95 disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={14} className="animate-spin lg:w-[14px] lg:h-[14px]" /> : <Save size={14} className="lg:w-[14px] lg:h-[14px]" />}
          <span className="hidden md:inline">{isSaving ? 'DEPLOYING...' : 'DEPLOY'}</span>
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-700 h-[calc(100vh-64px)] flex ${viewMode === 'split' ? 'flex-row w-full max-w-[1700px]' : 'flex-col max-w-4xl'} overflow-hidden relative`}>
        
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-4/12 border-r border-slate-100' : 'w-full mx-auto mt-8 border rounded-[2rem] shadow-2xl shadow-slate-200/50'} bg-white flex flex-col h-full shrink-0 z-20 transition-all duration-300`}>
            
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 custom-scrollbar">
              <div>
                <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase mb-1">Execution Flow</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage process steps</p>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-5 rounded-[2rem] border border-slate-100 shadow-inner">
                <input name="mainHeading" value={pageData.mainHeading} onChange={handleHeaderChange} placeholder="Main Heading" className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold outline-none focus:border-emerald-400 transition-all shadow-sm" />
                <input name="highlightWord" value={pageData.highlightWord} onChange={handleHeaderChange} placeholder="Highlight" className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 text-emerald-700 rounded-xl text-xs font-black outline-none focus:border-emerald-400 transition-all shadow-sm" />
              </div>

              <div className="space-y-4">
                {pageData.steps.map((step, idx) => (
                  <div key={step.id} className="p-5 border border-slate-100 rounded-[2rem] bg-white hover:border-emerald-300 transition-all duration-300 group relative shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-xl font-black text-emerald-500 italic opacity-30">{step.stepNum}</span>
                       <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => moveStep(idx, -1)} disabled={idx === 0} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 disabled:opacity-10"><MoveUp size={14}/></button>
                          <button onClick={() => moveStep(idx, 1)} disabled={idx === pageData.steps.length - 1} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 disabled:opacity-10"><MoveDown size={14}/></button>
                          <button onClick={() => deleteStep(step.id)} className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-400"><Trash2 size={14}/></button>
                       </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex gap-2">
                          <select value={step.icon} onChange={(e) => handleStepUpdate(step.id, 'icon', e.target.value)}
                            className="bg-slate-50 border border-slate-100 text-[9px] font-black uppercase rounded-xl px-3 outline-none text-slate-600 focus:border-emerald-400 transition-all">
                            {Object.keys(iconLibrary).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                          </select>
                          <input placeholder='New Phase' value={step.title} onChange={(e) => handleStepUpdate(step.id, 'title', e.target.value)}
                              className="flex-1 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl font-bold text-xs outline-none focus:border-emerald-400 focus:bg-white transition-all" />
                        </div>
                        <textarea placeholder='New Desciption Here......' value={step.desc} onChange={(e) => handleStepUpdate(step.id, 'desc', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-[11px] font-medium text-slate-500 outline-none h-16 resize-none focus:border-emerald-400 focus:bg-white transition-all" />
                    </div>
                  </div>
                ))}
                <button onClick={addStep} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-black text-[10px] uppercase hover:border-emerald-400 hover:text-emerald-600 transition-all hover:bg-emerald-50">
                   + Add New Step
                </button>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end shrink-0">
              <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-all hover:bg-amber-50 rounded-xl">
                <Undo size={14} /> Reset Workflow
              </button>
            </div>
          </div>
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'flex-1'} flex flex-col h-full bg-slate-50 relative overflow-hidden transition-all duration-300`}>
            
            <div className="h-8 flex items-center justify-center gap-2 bg-slate-900 border-b border-slate-800 shrink-0 z-10 mx-8 mt-8 rounded-t-[2.5rem]">
              <div className="flex gap-1.5 absolute left-12">
                <div className="w-2 h-2 rounded-full bg-rose-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
              </div>
              <Monitor size={10} className="text-slate-500" />
              <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">tricksy-tech.io/process</span>
            </div>

            <div className="flex-1 overflow-y-auto w-full flex items-start justify-center p-4 lg:p-8 custom-scrollbar bg-slate-900 mx-8 mb-8 rounded-b-[2.5rem] shadow-2xl border-[10px] border-slate-900 border-t-0">
              
              <div className={`w-full max-w-[1200px] transition-all duration-500 transform ${viewMode === 'preview' ? 'scale-100' : 'scale-[0.85] origin-top'}`}>
                
                <div className="relative overflow-y-auto h-full bg-[#f1f5f9] rounded-3xl p-8 lg:p-12 flex flex-col">
                  
                  <div className="absolute top-6 right-6 z-[100] flex gap-3 opacity-0 hover:opacity-100 transition-all duration-300">
                    <button onClick={() => setViewMode('edit')} className="flex items-center gap-2 bg-white/50 hover:bg-white backdrop-blur-md border border-slate-200 text-slate-700 px-4 py-2 rounded-full shadow-lg transition-all">
                      <Edit3 size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Edit Content</span>
                    </button>
                    {viewMode !== 'split' && (
                      <button onClick={() => setViewMode('split')} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-full shadow-lg shadow-emerald-500/30 transition-all">
                        <Columns size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Split View</span>
                      </button>
                    )}
                  </div>

                  <div className="w-full max-w-[1200px] mx-auto bg-white p-14 rounded-[3.5rem] shadow-sm border border-slate-100 relative">
                     <div className="text-center mb-16">
                        <h2 className="text-5xl font-black text-zinc-950 uppercase">
                          {safeText(pageData.mainHeading)} <span className="text-emerald-500 italic underline decoration-zinc-100">{safeText(pageData.highlightWord)}</span>
                        </h2>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {pageData.steps.map((step) => (
                          <div key={step.id} className="relative group">
                            <div className="text-[85px] font-black text-zinc-50 absolute -top-12 -left-3 italic pointer-events-none">
                              {step.stepNum}
                            </div>
                            <div className="relative z-10">
                              <div className="w-14 h-14 bg-white rounded-[1.25rem] flex items-center justify-center text-emerald-600 shadow-2xl mb-6 border border-zinc-50 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                  {iconLibrary[step.icon] || <Zap size={24} />}
                              </div>
                              <h3 className="text-base font-black text-zinc-900 mb-2.5">{safeText(step.title)}</h3>
                              <p className="text-zinc-500 font-medium text-[12px] leading-relaxed">{safeText(step.desc)}</p>
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

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default TechnicalProcessEditor;