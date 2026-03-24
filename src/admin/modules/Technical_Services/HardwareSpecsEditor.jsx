import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Drill, Hammer, Lightbulb, PenTool, 
  Type, LayoutGrid, CheckCircle2, Award, Settings2
} from 'lucide-react';

const HardwareSpecsEditor = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const [content, setContent] = useState({
    hero: {
      title: "BUILT FOR PRECISION.",
      highlight: "PRECISION.",
      desc: "We utilize world-class diagnostic and repair machinery to ensure every fix is surgical and permanent.",
      brands: ['Hilti', 'Makita', 'Fluke']
    },
    miniCard1: { title: "Heavy Tooling", sub: "Impact Ready" },
    miniCard2: { title: "Smart Testing", sub: "Accurate Audits" },
    bottomBar: {
      title: "Custom Installation Standards",
      desc: "Bespoke technical adjustments for Dubai’s premium villa layouts.",
      tags: ['Certified', 'Tested', 'Guaranteed']
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    alert("Hardware Specs Published!");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col h-screen overflow-hidden text-slate-900">
      {/* --- NAVBAR --- */}
      <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={20} />
          </button>
          <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>
          <h1 className="text-sm font-black tracking-widest uppercase flex items-center gap-2">
            <Settings2 size={16} className="text-emerald-500" /> Hardware CMS
          </h1>
        </div>
        <button onClick={handleSave} disabled={isSaving} className="bg-zinc-950 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-600 transition-all flex items-center gap-2">
          <Save size={14} /> {isSaving ? 'PUBLISHING...' : 'SAVE HARDWARE'}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: FORM SIDE */}
        <div className="w-[500px] border-r border-slate-200 bg-white overflow-y-auto p-8 space-y-10 custom-scrollbar">
          
          {/* 1. HERO BLOCK EDITOR */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-1.5 h-6 bg-zinc-950 rounded-full"></div>
               <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Main Hero Block</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-2">Main Headline</label>
                <input 
                  value={content.hero.title} 
                  onChange={(e) => setContent({...content, hero: {...content.hero, title: e.target.value}})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:border-emerald-500" 
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-2">Description</label>
                <textarea 
                  value={content.hero.desc} 
                  onChange={(e) => setContent({...content, hero: {...content.hero, desc: e.target.value}})}
                  rows="3" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-500 outline-none focus:border-emerald-500 resize-none" 
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* 2. MINI CARDS & BOTTOM BAR */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
               <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Feature Cards & Standards</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block">Card 1 Title</label>
                  <input value={content.miniCard1.title} onChange={(e) => setContent({...content, miniCard1: {...content.miniCard1, title: e.target.value}})} className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold" />
               </div>
               <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block">Card 2 Title</label>
                  <input value={content.miniCard2.title} onChange={(e) => setContent({...content, miniCard2: {...content.miniCard2, title: e.target.value}})} className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold" />
               </div>
            </div>

            <div className="pt-4">
                <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Bottom Bar Title</label>
                <input 
                  value={content.bottomBar.title} 
                  onChange={(e) => setContent({...content, bottomBar: {...content.bottomBar, title: e.target.value}})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold" 
                />
            </div>
          </div>
        </div>

        {/* RIGHT: LIVE BENTO PREVIEW */}
        <div className="flex-1 bg-slate-100 flex items-center justify-center p-12 overflow-y-auto">
          <div className="w-full max-w-[1000px] scale-90">
            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10 italic">Interactive Bento Preview</p>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Main Hero */}
              <div className="md:col-span-8 bg-zinc-950 rounded-[2.5rem] p-10 relative overflow-hidden group min-h-[300px]">
                <Drill size={240} className="absolute -bottom-10 -right-10 text-white/5 -rotate-12 transition-transform duration-700 group-hover:rotate-0" />
                <h3 className="text-4xl md:text-5xl font-black text-white leading-[0.9] tracking-tighter mb-6 uppercase">
                  {content.hero.title.split(content.hero.highlight)[0]}
                  <span className="text-emerald-500">{content.hero.highlight}</span>
                </h3>
                <p className="text-zinc-400 font-medium text-sm max-w-sm leading-relaxed mb-8">{content.hero.desc}</p>
                <div className="flex gap-2">
                  {content.hero.brands.map(b => (
                    <span key={b} className="text-[8px] font-black text-zinc-600 uppercase border border-zinc-800 px-2 py-1 rounded-md">{b}</span>
                  ))}
                </div>
              </div>

              {/* Right Mini Cards */}
              <div className="md:col-span-4 grid grid-cols-1 gap-4">
                <div className="bg-white rounded-[2rem] p-6 border border-zinc-200 flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-950 text-emerald-500 rounded-xl flex items-center justify-center"><Hammer size={18} /></div>
                  <div>
                    <h4 className="font-black text-sm text-zinc-900">{content.miniCard1.title}</h4>
                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">{content.miniCard1.sub}</p>
                  </div>
                </div>
                <div className="bg-emerald-500 rounded-[2rem] p-6 flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-950 text-emerald-500 rounded-xl flex items-center justify-center"><Lightbulb size={18} /></div>
                  <div>
                    <h4 className="font-black text-sm text-zinc-950">{content.miniCard2.title}</h4>
                    <p className="text-zinc-950/60 text-[8px] font-black uppercase tracking-widest">{content.miniCard2.sub}</p>
                  </div>
                </div>
              </div>

              {/* Bottom Wide Bar */}
              <div className="md:col-span-12 bg-white rounded-[2rem] p-6 flex items-center justify-between border border-zinc-200 shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-emerald-500"><PenTool size={20} /></div>
                  <div>
                    <h4 className="text-lg font-black text-zinc-950 tracking-tight">{content.bottomBar.title}</h4>
                    <p className="text-zinc-400 text-[10px] font-medium">{content.bottomBar.desc}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  {content.bottomBar.tags.map(t => (
                    <div key={t} className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-500" />
                      <span className="text-[8px] font-black uppercase text-zinc-400">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HardwareSpecsEditor;