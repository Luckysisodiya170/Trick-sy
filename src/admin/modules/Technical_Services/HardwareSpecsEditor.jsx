import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent, fetchSections } from '../../../store/index';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye, 
  CheckCircle2, Hammer, Zap, PenTool, Drill, 
  Layout, Activity, Loader2, Monitor
} from 'lucide-react';

const HardwareSpecsEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const sections = useSelector((state) => state.sections.items);
  const reduxContent = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const currentSection = sections.find(s => s.slug === 'tech-specs');
  const subsectionId = id || currentSection?.id || 24;

  const [viewMode, setViewMode] = useState('split'); 
  const [isSaving, setIsSaving] = useState(false);

  // Detailed State Management
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
      brands: ['Hilti Approved', 'Makita Approved', 'Fluke Approved']
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

  useEffect(() => {
    if (sections.length === 0) {
      dispatch(fetchSections(4));
    }
  }, [dispatch, sections.length]);

  useEffect(() => {
    if (subsectionId) {
      dispatch(fetchSingleSubsectionContent(subsectionId));
    }
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (reduxContent && reduxContent.description) {
      try {
        const parsedData = JSON.parse(reduxContent.description);
        if (parsedData && parsedData.header) {
          setContent(parsedData);
        }
      } catch (error) {
        console.error("Failed to parse content JSON");
      }
    }
  }, [reduxContent]);

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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        titleLine1: content.header.prefix,
        titleHighlight: content.header.highlight,
        badgeText: content.header.subText,
        description: JSON.stringify(content) 
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();

      alert("Hardware Specs Updated Successfully!");
    } catch (error) {
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' && !reduxContent) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest text-xs bg-[#F8FAFC]">
        <Loader2 className="animate-spin mr-2" size={16} /> Syncing Data...
      </div>
    );
  }

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
            <button 
              key={mode.id} 
              onClick={() => setViewMode(mode.id)} 
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <mode.icon size={14} /> <span className="capitalize">{mode.id}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-zinc-950 text-white px-8 py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg active:scale-95 disabled:opacity-70"
        >
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
          {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        
        {/* 1. LEFT SIDE: THE DETAILED EDIT FORM */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'flex-1 max-w-4xl mx-auto border-x' : 'w-[400px] shrink-0 border-r'} bg-white flex flex-col h-full z-20`}>
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-10 custom-scrollbar">
              
              {/* Header Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Layout size={16} className="text-emerald-500"/>
                  <h3 className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Header Settings</h3>
                </div>
                <input value={content.header.prefix} onChange={(e) => handleUpdate('header', 'prefix', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" placeholder="Prefix (THE )" />
                <input value={content.header.highlight} onChange={(e) => handleUpdate('header', 'highlight', e.target.value)} className="w-full px-4 py-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-sm font-bold outline-none" placeholder="Highlight" />
                <input value={content.header.subText} onChange={(e) => handleUpdate('header', 'subText', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase outline-none" placeholder="Subtext" />
              </div>

              {/* Hero Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Drill size={16} className="text-emerald-500"/>
                  <h3 className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Main Card</h3>
                </div>
                <input value={content.hero.prefix} onChange={(e) => handleUpdate('hero', 'prefix', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
                <input value={content.hero.highlight} onChange={(e) => handleUpdate('hero', 'highlight', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-emerald-100 text-emerald-600 rounded-xl text-sm font-bold outline-none" />
                <textarea value={content.hero.desc} onChange={(e) => handleUpdate('hero', 'desc', e.target.value)} rows="3" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium resize-none outline-none focus:bg-white" />
              </div>

              {/* Mini Cards Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Activity size={16} className="text-emerald-500"/>
                  <h3 className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Stat Cards</h3>
                </div>
                <div className="space-y-3">
                  {/* Card 1 */}
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2 relative">
                    <span className="absolute top-2 right-3 text-[9px] font-bold text-slate-300 uppercase">Card 1</span>
                    <input value={content.miniCard1.title} onChange={(e) => handleUpdate('miniCard1', 'title', e.target.value)} className="w-full text-xs font-bold bg-white px-3 py-2 rounded-lg outline-none" placeholder="Title" />
                    <input value={content.miniCard1.sub} onChange={(e) => handleUpdate('miniCard1', 'sub', e.target.value)} className="w-full text-[9px] font-black uppercase text-slate-400 bg-transparent px-3 outline-none" placeholder="Subtitle" />
                  </div>
                  {/* Card 2 */}
                  <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-2 relative">
                     <span className="absolute top-2 right-3 text-[9px] font-bold text-emerald-200 uppercase">Card 2</span>
                    <input value={content.miniCard2.title} onChange={(e) => handleUpdate('miniCard2', 'title', e.target.value)} className="w-full text-xs font-bold bg-white px-3 py-2 rounded-lg outline-none" placeholder="Title" />
                    <input value={content.miniCard2.sub} onChange={(e) => handleUpdate('miniCard2', 'sub', e.target.value)} className="w-full text-[9px] font-black uppercase text-emerald-600 bg-transparent px-3 outline-none" placeholder="Subtitle" />
                  </div>
                  {/* Card 3 - FIXED & ADDED */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 relative shadow-xl">
                    <span className="absolute top-2 right-3 text-[9px] font-bold text-slate-700 uppercase">Card 3 (Dark)</span>
                    <input value={content.miniCard3.title} onChange={(e) => handleUpdate('miniCard3', 'title', e.target.value)} className="w-full text-xs font-bold italic bg-slate-800 text-white px-3 py-2 rounded-lg border-none outline-none" placeholder="DIAGNOSTIC UNIT" />
                    <input value={content.miniCard3.sub} onChange={(e) => handleUpdate('miniCard3', 'sub', e.target.value)} className="w-full text-[9px] font-black uppercase text-slate-500 bg-transparent px-3 outline-none" placeholder="ULTRA-FAST" />
                  </div>
                </div>
              </div>

              {/* Footer Tags */}
              <div className="space-y-4 pb-10">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <PenTool size={16} className="text-emerald-500"/>
                  <h3 className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Footer Strip</h3>
                </div>
                <input value={content.footer.title} onChange={(e) => handleUpdate('footer', 'title', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white" />
                <div className="flex flex-col gap-2">
                  {content.footer.tags.map((tag, idx) => (
                    <input key={idx} value={tag} onChange={(e) => updateArray('footer', 'tags', idx, e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold outline-none focus:border-emerald-400" />
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. RIGHT SIDE: THE PROFESSIONAL ZOOMED-OUT PREVIEW */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'flex-1'} flex flex-col h-full bg-slate-100 relative overflow-hidden transition-all duration-300`}>
            
            <div className="h-12 flex items-center justify-center bg-white border-b border-slate-200 shrink-0 z-10 shadow-sm">
              <div className="flex items-center gap-2">
                <Monitor size={14} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">High-Resolution Desktop View</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar flex justify-center items-start overflow-x-hidden">
              
              <div 
                className="transition-all duration-500 origin-top flex justify-center"
                style={{
                  transform: viewMode === 'split' ? 'scale(0.8)' : 'scale(1)',
                  width: viewMode === 'split' ? '125%' : '100%',
                  marginBottom: viewMode === 'split' ? '-15%' : '0'
                }}
              >
                {/* BLACK BROWSER FRAME */}
                <div className="w-full max-w-[1400px] mx-auto bg-slate-900 rounded-[2.5rem] border-[10px] border-slate-900 shadow-2xl overflow-hidden relative">
                  
                  {/* Browser Bar */}
                  <div className="h-10 bg-slate-800 flex items-center px-6 gap-2 shrink-0">
                    <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div></div>
                    <div className="mx-auto w-64 h-5 bg-slate-700 rounded-md text-[9px] text-slate-500 flex items-center justify-center font-bold uppercase tracking-widest">tricksy-preview.io/hardware</div>
                  </div>

                  {/* PREVIEW CONTENT */}
                  <div className="relative overflow-y-auto h-[80vh] bg-white custom-scrollbar p-12 lg:p-20 flex flex-col items-center">
                    
                    <div className="w-full max-w-[1100px]">
                      {/* Section Header */}
                      <div className="text-center mb-16">
                        <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                          {content.header.prefix} <span className="text-emerald-500">{content.header.highlight}</span>
                        </h2>
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em] mt-3">{content.header.subText}</p>
                      </div>

                      {/* Main UI Grid */}
                      <div className="grid grid-cols-12 gap-6">
                        
                        {/* Dark Hero Card */}
                        <div className="col-span-7 bg-zinc-950 rounded-[2.5rem] p-10 relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[380px]">
                          <Drill size={350} className="absolute -bottom-10 -right-10 text-white/5 -rotate-12 pointer-events-none" />
                          <div className="relative z-10">
                            <h3 className="text-5xl font-black text-white leading-none uppercase italic mb-6 tracking-tight">
                              {content.hero.prefix} <br />
                              <span className="text-emerald-500">{content.hero.highlight}</span>
                            </h3>
                            <p className="text-zinc-400 font-medium text-sm max-w-sm leading-relaxed">{content.hero.desc}</p>
                          </div>
                          <div className="flex gap-3 relative z-10">
                            {content.hero.brands.map((b, i) => (
                              <span key={i} className="text-[8px] font-black text-zinc-500 border border-zinc-800 px-3 py-1 rounded-lg uppercase tracking-wider">{b}</span>
                            ))}
                          </div>
                        </div>

                        {/* Stat Column */}
                        <div className="col-span-5 grid gap-5">
                          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 flex items-center gap-4 shadow-sm">
                            <div className="w-12 h-12 bg-zinc-950 text-emerald-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg"><Hammer size={20} /></div>
                            <div className="min-w-0">
                              <h4 className="font-black text-sm text-slate-900 truncate">{content.miniCard1.title}</h4>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{content.miniCard1.sub}</p>
                            </div>
                          </div>
                          <div className="bg-emerald-500 rounded-[2.5rem] p-8 flex items-center gap-4 shadow-xl shadow-emerald-500/10">
                            <div className="w-12 h-12 bg-zinc-950 text-emerald-500 rounded-xl flex items-center justify-center shrink-0"><Zap size={20} /></div>
                            <div className="min-w-0">
                              <h4 className="font-black text-sm text-zinc-950 truncate">{content.miniCard2.title}</h4>
                              <p className="text-zinc-950/50 text-[11px] font-black uppercase tracking-widest">{content.miniCard2.sub}</p>
                            </div>
                          </div>
                          {/* Third Card Preview */}
                          <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 flex flex-col justify-center shadow-sm">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{content.miniCard3.sub}</span>
                            <h5 className="text-xl font-black italic text-slate-900 tracking-tight leading-none">{content.miniCard3.title}</h5>
                          </div>
                        </div>

                        {/* Bottom Warranty Strip */}
                        <div className="col-span-12 bg-white rounded-[2.5rem] p-8 flex items-center justify-between border border-slate-100 shadow-md mt-2">
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 bg-slate-50 text-emerald-500 rounded-2xl flex items-center justify-center shrink-0 shadow-inner border border-slate-50"><PenTool size={24} /></div>
                              <div>
                                <h4 className="text-lg font-black text-slate-900 tracking-tight leading-none mb-1">{content.footer.title}</h4>
                                <p className="text-slate-400 text-xs font-medium">{content.footer.desc}</p>
                              </div>
                           </div>
                           <div className="flex gap-4">
                              {content.footer.tags.map((t, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle2 size={14} className="text-emerald-500" />
                                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t}</span>
                                </div>
                              ))}
                           </div>
                        </div>
                      </div>
                    </div>

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