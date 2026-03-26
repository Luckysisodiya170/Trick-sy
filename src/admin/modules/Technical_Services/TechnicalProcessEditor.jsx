import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Type, AlignLeft, Monitor, Undo, Plus, Trash2, 
  MoveUp, MoveDown, Zap, LayoutList, Settings, Search, 
  ShieldCheck, Cpu, Clock, Wrench, CheckCircle, ClipboardCheck
} from 'lucide-react';

const TechnicalProcessEditor = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('split'); 
  const [isSaving, setIsSaving] = useState(false);

  // 1. Icon Mapping Fix: Preview ke liye object banaya
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

  // 2. Data Fix: 4 Steps Initial Data
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
    if(window.confirm('Reset all steps to default?')) {
      setPageData({ mainHeading: "The Execution", highlightWord: "Flow.", steps: defaultSteps });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-3 lg:px-6 py-3 flex items-center justify-between shadow-sm gap-2 shrink-0">
        <div className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm lg:text-lg font-black tracking-tighter italic flex items-center gap-1.5">
            <LayoutList size={18} className="text-emerald-600 lg:w-5 lg:h-5" /> 
            <span className="tracking-tight uppercase text-slate-800">PROCESS EDITOR</span> 
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full flex-shrink-1 mx-2">
          {[
            { id: 'edit', icon: Edit3, label: 'Edit' }, 
            { id: 'split', icon: Columns, label: 'Split' }, 
            { id: 'preview', icon: Eye, label: 'Preview' }
          ].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} 
              className={`flex items-center gap-1.5 px-3 lg:px-5 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs font-bold transition-all whitespace-nowrap ${
                viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'
              }`}>
              <mode.icon size={12} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className={`${viewMode === mode.id ? 'inline' : 'hidden sm:inline'}`}>{mode.label}</span>
            </button>
          ))}
        </div>

        <button onClick={() => setIsSaving(true)} className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-emerald-600 transition-all flex-shrink-0 active:scale-95">
          <Save size={16} /> <span className="hidden md:inline">Save Changes</span>
        </button>
      </nav>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT SIDE: FORM */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-3xl mx-auto border-x' : 'w-full lg:w-[420px] border-r'} bg-white border-slate-200 flex flex-col h-full shrink-0 z-20`}>
            
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 custom-scrollbar">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Execution Flow</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage process steps</p>
              </div>

              {/* Header Inputs */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <input name="mainHeading" value={pageData.mainHeading} onChange={handleHeaderChange} placeholder="Main Heading" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                <input name="highlightWord" value={pageData.highlightWord} onChange={handleHeaderChange} placeholder="Highlight" className="w-full px-4 py-3 bg-white border border-emerald-100 text-emerald-600 rounded-xl text-sm font-bold outline-none" />
              </div>

              {/* Steps List */}
              <div className="space-y-4">
                {pageData.steps.map((step, idx) => (
                  <div key={step.id} className="p-5 border border-slate-200 rounded-[2rem] bg-white hover:border-emerald-500 transition-all duration-300 group relative">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-xl font-black text-emerald-500 italic opacity-30">{step.stepNum}</span>
                       <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => moveStep(idx, -1)} disabled={idx === 0} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 disabled:opacity-10"><MoveUp size={14}/></button>
                          <button onClick={() => moveStep(idx, 1)} disabled={idx === pageData.steps.length - 1} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 disabled:opacity-10"><MoveDown size={14}/></button>
                          <button onClick={() => deleteStep(step.id)} className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-400"><Trash2 size={14}/></button>
                       </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex gap-2">
                          <select value={step.icon} onChange={(e) => handleStepUpdate(step.id, 'icon', e.target.value)}
                            className="bg-slate-100 border-none text-[10px] font-black uppercase rounded-xl px-3 outline-none text-slate-600">
                            {Object.keys(iconLibrary).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                          </select>
                          <input placeholder='New Phase' value={step.title} onChange={(e) => handleStepUpdate(step.id, 'title', e.target.value)}
                              className="flex-1 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl font-bold text-sm outline-none" />
                        </div>
                        <textarea placeholder='New Desciption Here......' value={step.desc} onChange={(e) => handleStepUpdate(step.id, 'desc', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-[11px] font-medium text-slate-500 outline-none h-16" />
                    </div>
                  </div>
                ))}
                <button onClick={addStep} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-black text-[10px] uppercase hover:border-emerald-400 hover:text-emerald-600 transition-all">
                   + Add New Step
                </button>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-amber-600 transition-all">
                <Undo size={14} /> Reset Workflow
              </button>
            </div>
          </div>
        )}

        {/* RIGHT SIDE: PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'flex-1'} flex flex-col h-full bg-slate-100/50 transition-all duration-300`}>
            <div className="h-12 flex items-center justify-center gap-2 bg-white border-b border-slate-200 shrink-0">
              <Monitor size={14} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Output</span>
            </div>

            <div className="flex-1 overflow-y-auto w-full flex items-start justify-center p-4 lg:p-8 custom-scrollbar">
              <div className={`w-full max-w-[1200px] bg-white p-14 rounded-[3.5rem] shadow-2xl border border-white relative transition-all duration-500 transform 
                ${viewMode === 'preview' ? 'scale-100' : 'scale-[0.85] origin-top'}`}>
                 
                 <div className="text-center mb-16">
                    <h2 className="text-5xl font-black text-zinc-950 uppercase">
                      {pageData.mainHeading} <span className="text-emerald-500 italic underline decoration-zinc-100">{pageData.highlightWord}</span>
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
                             {/* 3. Icon Preview Fix: Library se fetch kiya */}
                             {iconLibrary[step.icon] || <Zap size={24} />}
                          </div>
                          <h3 className="text-base font-black text-zinc-900 mb-2.5">{step.title}</h3>
                          <p className="text-zinc-500 font-medium text-[12px] leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TechnicalProcessEditor;