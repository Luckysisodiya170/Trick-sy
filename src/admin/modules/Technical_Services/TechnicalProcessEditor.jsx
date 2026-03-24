import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Search, Settings, ShieldCheck, Zap, 
  MoveUp, MoveDown, Plus, Trash2, LayoutList, Wand2
} from 'lucide-react';

const TechnicalProcessEditor = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const [steps, setSteps] = useState([
    { id: '01', title: 'Site Inspection', desc: 'Our experts analyze the technical fault with advanced diagnostic tools.', icon: 'Search' },
    { id: '02', title: 'Precision Repair', desc: 'Swift execution using industrial-grade materials and genuine parts.', icon: 'Settings' },
    { id: '03', title: 'Quality Audit', desc: 'Multiple safety checks to ensure the fix is permanent and safe.', icon: 'ShieldCheck' },
    { id: '04', title: 'Post-Fix Care', desc: 'We provide maintenance tips and 24/7 support after every job.', icon: 'Zap' },
  ]);

  const iconMap = {
    Search: <Search />,
    Settings: <Settings />,
    ShieldCheck: <ShieldCheck />,
    Zap: <Zap />
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...steps];
    updated[index][field] = value;
    setSteps(updated);
  };

  const moveStep = (index, direction) => {
    const updated = [...steps];
    const target = index + direction;
    if (target < 0 || target >= steps.length) return;
    [updated[index], updated[target]] = [updated[target], updated[index]];
    const final = updated.map((s, i) => ({ ...s, id: `0${i + 1}` }));
    setSteps(final);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setIsSaving(false);
    alert("Execution Flow Updated!");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col h-screen overflow-hidden text-slate-900">
      
      {/* ---  NAVBAR --- */}
      <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400">
            <ArrowLeft size={20} />
          </button>
          <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>
          <h1 className="text-sm font-black tracking-widest uppercase flex items-center gap-2">
            <LayoutList size={16} className="text-emerald-500" /> Process Workflow
          </h1>
        </div>

        <button onClick={handleSave} disabled={isSaving} className="bg-zinc-950 text-white px-8 py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg shadow-emerald-100">
          <Save size={16} /> {isSaving ? 'SYNCING...' : 'PUBLISH FLOW'}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: STEP BUILDER */}
        <div className="w-[550px] border-r border-slate-200 bg-white overflow-y-auto p-8 space-y-8 custom-scrollbar">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">Execution Sequence</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Reorder or edit steps</p>
            </div>
            <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all">
              <Plus size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="group p-6 border border-slate-100 rounded-[2rem] bg-slate-50/50 hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-emerald-500/20 italic">{step.id}</span>
                      <input 
                        value={step.title} 
                        onChange={(e) => handleUpdate(idx, 'title', e.target.value)}
                        className="bg-transparent border-none font-black text-slate-800 outline-none text-lg p-0 focus:ring-0" 
                      />
                   </div>
                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => moveStep(idx, -1)} className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400"><MoveUp size={14}/></button>
                      <button onClick={() => moveStep(idx, 1)} className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400"><MoveDown size={14}/></button>
                      <button className="p-1.5 hover:bg-rose-50 rounded-md text-rose-300"><Trash2 size={14}/></button>
                   </div>
                </div>

                <textarea 
                  value={step.desc}
                  onChange={(e) => handleUpdate(idx, 'desc', e.target.value)}
                  rows="2"
                  className="w-full bg-transparent border-none text-sm font-medium text-slate-500 outline-none p-0 focus:ring-0 resize-none"
                  placeholder="Describe this step..."
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: LIVE COMPONENT PREVIEW */}
        <div className="flex-1 bg-zinc-50 flex items-center justify-center p-12 overflow-y-auto relative">
          
          <div className="w-full max-w-[1200px] bg-white p-20 rounded-[4rem] shadow-2xl border border-white relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50/50 rounded-full blur-[100px] -mr-48 -mt-48"></div>

             <div className="text-center mb-20 relative z-10">
                <h2 className="text-5xl font-black text-zinc-950 tracking-tighter uppercase">
                  The Execution <span className="text-emerald-500">Flow.</span>
                </h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                {steps.map((step) => (
                  <div key={step.id} className="relative group">
                    <div className="text-[100px] font-black text-zinc-100 leading-none absolute -top-10 -left-4 group-hover:text-emerald-500/10 transition-colors pointer-events-none">
                      {step.id}
                    </div>
                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-zinc-950 shadow-xl mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all border border-zinc-50">
                        {iconMap[step.icon] ? React.cloneElement(iconMap[step.icon], { size: 24 }) : <Zap size={24}/>}
                      </div>
                      <h3 className="text-xl font-black text-zinc-950 mb-3">{step.title}</h3>
                      <p className="text-zinc-500 font-medium text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="absolute bottom-8 right-8 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white text-[10px] font-black text-slate-400 tracking-widest uppercase">
            Rendering v2.1 • Dubai Standards
          </div>
        </div>

      </div>
    </div>
  );
};

export default TechnicalProcessEditor;