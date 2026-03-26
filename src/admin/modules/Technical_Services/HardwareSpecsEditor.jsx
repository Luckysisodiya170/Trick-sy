import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye, 
  CheckCircle2, Hammer, Zap, PenTool, Drill, 
  Layout, Activity
} from 'lucide-react';

const HardwareSpecsEditor = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('split'); 
  const [isSaving, setIsSaving] = useState(false);

  const [content, setContent] = useState({
    header: {
      prefix: "THE ",
      highlight: "HARDWARE.",
      subText: "Industrial Standards • Precision Tools"
    },
    hero: {
      prefix: "BUILT FOR ",
      highlight: "PRECISION.",
      desc: "We utilize world-class diagnostic and repair machinery to ensure every fix is surgical and permanent.",
      brands: ['Hilti', 'Makita', 'Fluke']
    },
    miniCard1: { title: "Heavy Tooling", sub: "IMPACT READY" },
    miniCard2: { title: "Smart Testing", sub: "ACCURATE AUDITS" },
    miniCard3: { title: "ULTRA-FAST", sub: "DIAGNOSTIC UNIT" },
    footer: {
      title: "Custom Installation Standards",
      desc: "Bespoke technical adjustments for Dubai’s premium villa layouts.",
      tags: ['Certified', 'Tested', 'Guaranteed']
    }
  });

  const handleUpdate = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const updateArray = (section, field, index, value) => {
    const newArr = [...content[section][field]];
    newArr[index] = value;
    handleUpdate(section, field, newArr);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col h-screen overflow-hidden font-sans text-slate-900">
      
      {/* NAVBAR */}
      <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
            <Settings2 size={14} /> HARDWARE CMS PRO
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200 shadow-inner">
          {[{ id: 'edit', icon: Edit3 }, { id: 'split', icon: Columns }, { id: 'preview', icon: Eye }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-2 px-5 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}>
              <mode.icon size={14} /> <span className="capitalize">{mode.id}</span>
            </button>
          ))}
        </div>

        <button onClick={() => { setIsSaving(true); setTimeout(() => setIsSaving(false), 1000); }} className="bg-zinc-950 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg">
          <Save size={14} /> {isSaving ? 'PUBLISHING...' : 'SAVE CHANGES'}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        
        {/* --- EDITOR PANEL --- */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className="w-[500px] bg-white border-r border-slate-200 overflow-y-auto p-8 space-y-12 custom-scrollbar shadow-inner">
            
            {/* Header Control */}
            <div className="space-y-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-4">
                  <Layout size={14} className="text-emerald-500"/>
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Main Header</h3>
               </div>
               <div className="grid grid-cols-2 gap-2">
                 <input value={content.header.prefix} onChange={(e) => handleUpdate('header', 'prefix', e.target.value)} className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold" placeholder="Prefix (THE )" />
                 <input value={content.header.highlight} onChange={(e) => handleUpdate('header', 'highlight', e.target.value)} className="px-4 py-3 bg-white border border-emerald-200 rounded-xl text-sm font-bold text-emerald-600" placeholder="Green Word" />
               </div>
               <input value={content.header.subText} onChange={(e) => handleUpdate('header', 'subText', e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest" />
            </div>

            {/* Hero Control */}
            <div className="space-y-4">
               <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-2">
                  <Drill size={14} className="text-emerald-500"/>
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Hero Section</h3>
               </div>
               <div className="grid grid-cols-2 gap-2">
                 <input value={content.hero.prefix} onChange={(e) => handleUpdate('hero', 'prefix', e.target.value)} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" />
                 <input value={content.hero.highlight} onChange={(e) => handleUpdate('hero', 'highlight', e.target.value)} className="px-4 py-3 bg-slate-50 border border-emerald-200 rounded-xl text-sm font-bold text-emerald-600" />
               </div>
               <textarea value={content.hero.desc} onChange={(e) => handleUpdate('hero', 'desc', e.target.value)} rows="2" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium resize-none" />
               <div className="grid grid-cols-3 gap-2">
                 {content.hero.brands.map((brand, idx) => (
                   <input key={idx} value={brand} onChange={(e) => updateArray('hero', 'brands', idx, e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-[9px] font-black uppercase text-center" />
                 ))}
               </div>
            </div>

            {/* Diagnostic Card (MiniCard3) */}
            <div className="space-y-4">
               <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-2">
                  <Activity size={14} className="text-emerald-500"/>
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Diagnostic Settings</h3>
               </div>
               <div className="p-4 bg-slate-900 rounded-2xl space-y-3">
                  <input value={content.miniCard3.title} onChange={(e) => handleUpdate('miniCard3', 'title', e.target.value)} className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border-none text-sm font-bold italic" placeholder="Title (e.g. ULTRA-FAST)" />
                  <input value={content.miniCard3.sub} onChange={(e) => handleUpdate('miniCard3', 'sub', e.target.value)} className="w-full bg-slate-800 text-slate-400 px-4 py-2 rounded-xl border-none text-[10px] font-black uppercase" placeholder="Sub-text (e.g. DIAGNOSTIC)" />
               </div>
            </div>

            {/* Footer Control */}
            <div className="space-y-4">
               <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <PenTool size={14} className="text-emerald-500"/>
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Bottom Standards</h3>
               </div>
               <input value={content.footer.title} onChange={(e) => handleUpdate('footer', 'title', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" />
               <textarea value={content.footer.desc} onChange={(e) => handleUpdate('footer', 'desc', e.target.value)} rows="2" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-500 resize-none" />
               <div className="flex gap-2">
                  {content.footer.tags.map((tag, idx) => (
                    <input key={idx} value={tag} onChange={(e) => updateArray('footer', 'tags', idx, e.target.value)} className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-[9px] font-black text-center" />
                  ))}
               </div>
            </div>
          </div>
        )}

        {/* --- PREVIEW PANEL --- */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className="flex-1 bg-[#F1F3F5] overflow-y-auto flex items-center justify-center p-8">
            <div className="w-full max-w-[1000px] transform scale-[0.8] origin-center pt-10">
              
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-zinc-950 uppercase tracking-tighter mb-2">
                  {content.header.prefix}
                  <span className="text-emerald-500">{content.header.highlight}</span>
                </h2>
                <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.3em]">{content.header.subText}</p>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 bg-[#0B0B0B] rounded-[2.5rem] p-10 relative overflow-hidden min-h-[350px] flex flex-col justify-between shadow-2xl">
                  <Drill size={350} className="absolute -bottom-10 -right-10 text-white/5 -rotate-12" />
                  <div className="relative z-10">
                    <h3 className="text-6xl font-black text-white leading-none uppercase italic mb-6">
                      {content.hero.prefix}
                      <span className="text-emerald-500">{content.hero.highlight}</span>
                    </h3>
                    <p className="text-zinc-400 font-medium text-sm max-w-sm leading-relaxed">{content.hero.desc}</p>
                  </div>
                  <div className="flex gap-3 relative z-10">
                    {content.hero.brands.map(b => (
                      <span key={b} className="text-[9px] font-black text-zinc-500 border border-zinc-800 px-3 py-1 rounded-lg uppercase">{b} Approved</span>
                    ))}
                  </div>
                </div>

                <div className="col-span-4 grid gap-4">
                  <div className="bg-white rounded-[2rem] p-6 border border-slate-200 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 bg-zinc-950 text-emerald-500 rounded-xl flex items-center justify-center"><Hammer size={20} /></div>
                    <div><h4 className="font-black text-sm">{content.miniCard1.title}</h4><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{content.miniCard1.sub}</p></div>
                  </div>
                  <div className="bg-emerald-500 rounded-[2rem] p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-950 text-emerald-500 rounded-xl flex items-center justify-center"><Zap size={20} /></div>
                    <div><h4 className="font-black text-sm text-zinc-950">{content.miniCard2.title}</h4><p className="text-zinc-950/50 text-[9px] font-black uppercase tracking-widest">{content.miniCard2.sub}</p></div>
                  </div>
                  <div className="bg-white rounded-[2rem] p-6 border border-slate-200 flex flex-col justify-center">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{content.miniCard3.sub}</span>
                    <h5 className="text-xl font-black italic">{content.miniCard3.title}</h5>
                  </div>
                </div>

                <div className="col-span-12 bg-white rounded-[2rem] p-8 flex items-center justify-between border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-slate-50 text-emerald-500 rounded-xl flex items-center justify-center"><PenTool size={24} /></div>
                    <div>
                      <h4 className="text-xl font-black text-zinc-950 tracking-tight">{content.footer.title}</h4>
                      <p className="text-zinc-400 text-xs font-medium">{content.footer.desc}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {content.footer.tags.map(t => (
                      <div key={t} className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-emerald-500" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HardwareSpecsEditor;