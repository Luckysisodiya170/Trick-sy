import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice';
import { 
  ArrowLeft, Save, Edit3, Columns, Eye, Settings2, Type, 
  Rocket, Star, ShieldCheck, Trophy, Plus, Trash2, Calendar, Loader2
} from 'lucide-react';

const AboutTimelineEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const subsectionId = id ? parseInt(id, 10) : 13; 

  // Fixed Redux Paths
  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [viewMode, setViewMode] = useState('split');
  const [isDeploying, setIsDeploying] = useState(false);
  
  const [timelineData, setTimelineData] = useState({
    sectionTitle: "", sectionHighlight: "", sectionSubtext: "",
    steps: [
      { year: "2014", title: "The Humble Start", desc: "Founded with a vision to simplify home maintenance." },
      { year: "2018", title: "1,000+ Homes Served", desc: "Hit our first major milestone, becoming the favorite." },
      { year: "2022", title: "Tech-First Approach", desc: "Launched our AI booking platform for real-time tracking." },
      { year: "2026", title: "Future of Services", desc: "Scaling globally with eco-friendly smart solutions." }
    ]
  });

  const iconLibrary = [<Rocket size={18}/>, <Star size={18}/>, <ShieldCheck size={18}/>, <Trophy size={18}/>, <Calendar size={18}/>];

  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setTimelineData({
        sectionTitle: content.sectionTitle || "Our",
        sectionHighlight: content.sectionHighlight || "Journey",
        sectionSubtext: content.sectionSubtext || "A decade of perfecting homes and building trust through innovation and relentless dedication.",
        steps: content.steps || [
          { year: "2014", title: "The Humble Start", desc: "Founded with a vision to simplify home maintenance." },
          { year: "2018", title: "1,000+ Homes Served", desc: "Hit our first major milestone, becoming the favorite." },
          { year: "2022", title: "Tech-First Approach", desc: "Launched our AI booking platform for real-time tracking." },
          { year: "2026", title: "Future of Services", desc: "Scaling globally with eco-friendly smart solutions." }
        ]
      });
    }
  }, [content]);

  // Character Limit Handlers
  const handleLimitChange = (field, val, limit) => {
    if (val.length <= limit) setTimelineData({ ...timelineData, [field]: val });
  };

  const handleStepUpdate = (index, field, val, limit) => {
    if (val.length <= limit) {
      const updated = [...timelineData.steps];
      updated[index][field] = val;
      setTimelineData({ ...timelineData, steps: updated });
    }
  };

  const addStep = () => {
    const newStep = { year: "202X", title: "New Milestone", desc: "Describe this achievement..." };
    setTimelineData({ ...timelineData, steps: [...timelineData.steps, newStep] });
  };

  const deleteStep = (index) => {
    if(timelineData.steps.length > 1) {
        const updated = timelineData.steps.filter((_, i) => i !== index);
        setTimelineData({ ...timelineData, steps: updated });
    }
  };

  const handleSave = async () => {
    setIsDeploying(true);
    try {
      const payload = {
        sectionTitle: timelineData.sectionTitle,
        sectionHighlight: timelineData.sectionHighlight,
        sectionSubtext: timelineData.sectionSubtext,
        steps: timelineData.steps
      };

      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      dispatch(fetchSingleSubsectionContent(subsectionId)); // Re-sync

      alert("Journey Section Deployed Successfully! 🚀");
    } catch (error) {
      alert(`Error: ${error.message || "Failed to deploy to database."}`);
    } finally { setIsDeploying(false); }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING JOURNEY LAB...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans pb-20 selection:bg-emerald-100">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-900"><ArrowLeft size={18} /></button>
          <h1 className="text-[12px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <Settings2 size={16} className="text-emerald-600" /> Timeline <span className="text-emerald-400">Lab</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <mode.icon size={12} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button onClick={handleSave} disabled={isDeploying} className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50">
          {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
          <span>{isDeploying ? "DEPLOYING..." : "DEPLOY"}</span>
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-700 ${viewMode === 'split' ? 'max-w-[1800px] px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8' : 'max-w-4xl py-12 px-6'}`}>
        
        {/* --- EDITOR SIDE --- */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-4' : 'w-full'} space-y-6`}>
            
            <section className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm space-y-5">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2 block flex items-center gap-2"><Type size={14} className="text-emerald-500" /> Header Styling</span>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                   <input value={timelineData.sectionTitle} onChange={(e) => handleLimitChange('sectionTitle', e.target.value, 40)} placeholder="Main Title" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-emerald-500 transition-all" />
                   <input value={timelineData.sectionHighlight} onChange={(e) => handleLimitChange('sectionHighlight', e.target.value, 40)} placeholder="Highlight" className="w-full px-4 py-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl font-black text-emerald-700 outline-none focus:border-emerald-300 transition-all" />
                </div>
                <textarea rows="3" value={timelineData.sectionSubtext} onChange={(e) => handleLimitChange('sectionSubtext', e.target.value, 150)} className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-medium outline-none resize-none leading-relaxed focus:border-emerald-500 transition-all" placeholder="Subtitle description..." />
              </div>
            </section>

            <div className="space-y-4 pb-10">
              <div className="flex items-center justify-between px-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Milestones ({timelineData.steps.length})</span>
                <button onClick={addStep} className="text-[9px] font-black text-emerald-600 hover:text-emerald-700">+ ADD MILESTONE</button>
              </div>

              {timelineData.steps.map((step, i) => (
                <div key={i} className="bg-white rounded-[2rem] border border-slate-100 p-5 shadow-sm space-y-4 animate-in slide-in-from-left-2 transition-all hover:border-emerald-200">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs">
                        {i + 1}
                      </div>
                      <input value={step.year} onChange={(e) => handleStepUpdate(i, 'year', e.target.value, 10)} className="font-black text-emerald-600 bg-transparent outline-none w-24 text-sm" placeholder="Year" />
                    </div>
                    <button onClick={() => deleteStep(i)} className="text-slate-300 hover:text-rose-500 p-1 transition-colors"><Trash2 size={14} /></button>
                  </div>
                  <input value={step.title} onChange={(e) => handleStepUpdate(i, 'title', e.target.value, 40)} className="w-full font-black text-slate-900 outline-none text-xs border-b border-transparent focus:border-slate-200 pb-1" placeholder="Milestone Title" />
                  <textarea value={step.desc} onChange={(e) => handleStepUpdate(i, 'desc', e.target.value, 120)} className="w-full text-[10px] font-medium text-slate-500 bg-slate-50 p-3 rounded-xl outline-none resize-none h-16" placeholder="Description" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- RIGHT: LIVE PREVIEW (MACBOOK MOCKUP) --- */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-8' : 'w-full'} sticky top-24`}>
            
            {/* BLACK MACBOOK MOCKUP FRAME */}
            <div className="relative mx-auto bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 overflow-hidden">
              
              {/* Browser Toolbar UI */}
              <div className="flex h-8 bg-slate-900 items-center px-4 gap-1.5 border-b border-slate-800/50">
                 <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                 </div>
                 <div className="flex-1 text-center"><span className="text-[6px] font-bold uppercase tracking-widest text-slate-500">Timeline Preview</span></div>
              </div>

              {/* Inner Page Canvas */}
              <div className="bg-white rounded-xl overflow-hidden min-h-[520px] max-h-[75vh] overflow-y-auto custom-scrollbar relative flex flex-col">
                <div className="w-full scale-95 origin-top animate-in fade-in duration-500 pb-10">
                  
                  {/* USER'S DESIGN STARTS HERE */}
                  <section className="pt-12 px-8 relative overflow-hidden">
                    <div className="text-center mb-16">
                       <div className="flex flex-col items-center gap-2 mb-4">
                          <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">History of Excellence</span>
                          <div className="w-12 h-[2px] bg-emerald-500"></div>
                       </div>
                       <h2 className="text-[36px] font-black text-slate-900 tracking-tighter leading-tight">
                         {timelineData.sectionTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">{timelineData.sectionHighlight}</span>
                       </h2>
                       <p className="text-slate-500 mt-4 text-[11px] font-medium italic max-w-lg mx-auto">"{timelineData.sectionSubtext}"</p>
                    </div>

                    <div className="relative">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {timelineData.steps.map((step, idx) => (
                          <div key={idx} className="relative lg:pt-14 group">
                            
                            {/* Horizontal Line */}
                            <div className="hidden lg:block absolute top-[28px] left-[20px] w-[calc(100%+1.5rem)] h-[3px] bg-slate-100 z-0">
                               {idx < timelineData.steps.length - 1 && (
                                  <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-emerald-500 to-teal-400"></div>
                               )}
                            </div>

                            {/* Node Dot */}
                            <div className="hidden lg:flex absolute top-[20px] left-0 z-20 w-5 h-5 rounded-full bg-white border-4 border-slate-200 group-hover:border-emerald-500 transition-all"></div>
                            
                            {/* Card */}
                            <div className="relative mt-8 p-5 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full z-10 flex flex-col">
                              
                              <div className="absolute -top-6 left-6 w-10 h-10 rounded-[1rem] bg-white shadow-xl flex items-center justify-center text-emerald-500 border border-slate-50 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 transition-all duration-500 z-30">
                                {iconLibrary[idx % iconLibrary.length]}
                              </div>

                              <div className="mt-2 flex-1">
                                <span className="text-emerald-600 font-black text-[8px] uppercase tracking-widest block mb-1">{step.year}</span>
                                <h3 className="text-sm font-black text-slate-900 mb-1.5 leading-tight group-hover:text-emerald-600 transition-colors">{step.title}</h3>
                                <p className="text-[9px] text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                              </div>

                              <span className="absolute bottom-3 right-5 text-3xl font-black text-slate-900/[0.03] group-hover:text-emerald-500/[0.05] transition-colors select-none">
                                {step.year.slice(-2)}
                              </span>
                              <div className="mt-4">
                                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-900 text-white text-[7px] font-bold uppercase tracking-widest">
                                  Est. {step.year}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-12 rounded-[2rem] bg-slate-900 p-6 flex flex-col md:flex-row items-center justify-between gap-5 border border-slate-800">
                       <div className="text-center md:text-left">
                          <h3 className="text-lg lg:text-xl font-black text-white">The journey doesn't <span className="text-emerald-500">stop here.</span></h3>
                          <p className="text-slate-400 text-[9px] font-medium mt-1">Expanding horizons to serve you better.</p>
                       </div>
                       <div className="px-5 py-2.5 bg-emerald-600 text-white font-black rounded-xl text-[9px] uppercase tracking-widest cursor-pointer hover:bg-emerald-500 transition-all">Join the Legacy</div>
                    </div>
                  </section>
                  {/* USER'S DESIGN ENDS HERE */}

                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AboutTimelineEditor;