import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../../store/index';
import { 
  ArrowLeft, Save, Edit3, Columns, Eye, Settings2, Type, 
  Rocket, Star, ShieldCheck, Trophy, Plus, Trash2, Calendar, Loader2
} from 'lucide-react';

const AboutTimelineEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const subsectionId = id ? parseInt(id, 10) : 13; 

  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const [viewMode, setViewMode] = useState('split');
  const [isDeploying, setIsDeploying] = useState(false);
  
  const [timelineData, setTimelineData] = useState({
    sectionTitle: "Our",
    sectionHighlight: "Journey",
    sectionSubtext: "A decade of perfecting homes and building trust through innovation and relentless dedication.",
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

  const handleStepUpdate = (index, field, val) => {
    const updated = [...timelineData.steps];
    updated[index][field] = val;
    setTimelineData({ ...timelineData, steps: updated });
  };

  const addStep = () => {
    const newStep = { 
      year: "202X", 
      title: "New Milestone", 
      desc: "Describe this achievement..." 
    };
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

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();

      alert("Journey Section Deployed Successfully! ✅");
    } catch (error) {
      console.error("Update failed:", error);
      alert(`Error: ${error.message || "Failed to deploy to database."}`);
    } finally {
      setIsDeploying(false);
    }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> Loading Journey Lab...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><ArrowLeft size={18} /></button>
          <h1 className="text-sm lg:text-lg font-black italic flex items-center gap-1.5 uppercase tracking-tighter">
            <Settings2 size={18} className="text-emerald-600" /> Journey Editor
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}>
              <mode.icon size={14} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave}
          disabled={isDeploying}
          className="bg-slate-900 text-white px-5 py-2 rounded-full font-extrabold text-xs flex items-center gap-2 hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50"
        >
          {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
          <span className="hidden md:inline">{isDeploying ? "SAVING..." : "Save Journey"}</span>
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-500 ${viewMode === 'split' ? 'max-w-[1800px] p-6 grid grid-cols-1 lg:grid-cols-12 gap-10' : 'max-w-4xl p-6'}`}>
        
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-4' : ''} space-y-6`}>
            <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-xs uppercase tracking-widest border-b pb-4">
                <Type size={16} className="text-emerald-500" /> Section Header
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                   <input value={timelineData.sectionTitle} onChange={(e) => setTimelineData({...timelineData, sectionTitle: e.target.value})} placeholder="Title" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none" />
                   <input value={timelineData.sectionHighlight} onChange={(e) => setTimelineData({...timelineData, sectionHighlight: e.target.value})} placeholder="Highlight" className="w-full p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl font-black text-emerald-700 outline-none" />
                </div>
                <textarea rows="3" value={timelineData.sectionSubtext} onChange={(e) => setTimelineData({...timelineData, sectionSubtext: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium outline-none resize-none" />
              </div>
            </section>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest">Milestones</h3>
                <button onClick={addStep} className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200">
                  <Plus size={16} />
                </button>
              </div>

              {timelineData.steps.map((step, i) => (
                <div key={i} className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm space-y-4 group animate-in slide-in-from-left-2 transition-all hover:border-emerald-200">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-black text-xs">
                        {i + 1}
                      </div>
                      <input value={step.year} onChange={(e) => handleStepUpdate(i, 'year', e.target.value)} className="font-black text-emerald-600 bg-transparent outline-none w-20" placeholder="Year" />
                    </div>
                    <button onClick={() => deleteStep(i)} className="text-slate-300 hover:text-red-500 p-1 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <input value={step.title} onChange={(e) => handleStepUpdate(i, 'title', e.target.value)} className="w-full font-bold text-slate-900 outline-none text-sm" placeholder="Milestone Title" />
                  <textarea value={step.desc} onChange={(e) => handleStepUpdate(i, 'desc', e.target.value)} className="w-full text-xs font-medium text-slate-500 bg-slate-50 p-3 rounded-xl outline-none resize-none border border-transparent focus:border-emerald-100" rows="2" placeholder="Description" />
                </div>
              ))}
            </div>
          </div>
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-8' : 'w-full'} h-fit sticky top-24`}>
            <div className="w-full bg-white rounded-[3rem] border-[8px] border-slate-950 shadow-2xl overflow-hidden relative pb-16">
              <section className="pt-16 px-8 relative overflow-hidden">
                <div className="text-center mb-16">
                   <div className="flex flex-col items-center gap-2 mb-4">
                      <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">History of Excellence</span>
                      <div className="w-12 h-[2px] bg-emerald-500"></div>
                   </div>
                   <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter">
                     {timelineData.sectionTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">{timelineData.sectionHighlight}</span>
                   </h2>
                   <p className="text-slate-500 mt-4 text-xs lg:text-sm font-medium italic max-w-xl mx-auto">"{timelineData.sectionSubtext}"</p>
                </div>

                <div className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {timelineData.steps.map((step, idx) => (
                      <div key={idx} className="relative lg:pt-14 group">
                        
                        <div className="hidden lg:block absolute top-[28px] left-[20px] w-[calc(100%+2rem)] h-[3px] bg-slate-100 z-0">
                           {idx < timelineData.steps.length - 1 && (
                              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-emerald-500 to-teal-400"></div>
                           )}
                        </div>

                        <div className="hidden lg:flex absolute top-[20px] left-0 z-20 w-5 h-5 rounded-full bg-white border-4 border-slate-200 group-hover:border-emerald-500 transition-all"></div>
                        
                        <div className="relative mt-10 p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full z-10">
                          
                          <div className="absolute -top-6 left-8 w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-emerald-500 border border-slate-50 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 transition-all duration-500 z-30">
                            {iconLibrary[idx % iconLibrary.length]}
                          </div>

                          <div className="mt-4">
                            <span className="text-emerald-600 font-black text-[9px] uppercase tracking-widest block mb-1">{step.year}</span>
                            <h3 className="text-base font-black text-slate-900 mb-2 leading-tight group-hover:text-emerald-600 transition-colors">{step.title}</h3>
                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                          </div>

                          <span className="absolute bottom-4 right-6 text-4xl font-black text-slate-900/[0.03] group-hover:text-emerald-500/[0.05] transition-colors select-none">
                            {step.year.slice(-2)}
                          </span>
                            <div className="mt-5">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 text-white text-[8px] font-bold uppercase tracking-widest">
                              Est. {step.year}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-16 rounded-[2.5rem] bg-slate-900 p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
                   <div className="text-center md:text-left">
                      <h3 className="text-xl lg:text-2xl font-black text-white">The journey doesn't <span className="text-emerald-500">stop here.</span></h3>
                      <p className="text-slate-400 text-[10px] font-medium mt-1">Expanding horizons to serve you better.</p>
                   </div>
                   <div className="px-6 py-3 bg-emerald-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest cursor-pointer hover:bg-emerald-500 transition-all active:scale-95">Join the Legacy</div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutTimelineEditor;