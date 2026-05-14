import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice';
import { 
  ArrowLeft, Save, Edit3, Columns, Eye, Settings2, Type, 
  Eye as EyeIcon, ShieldCheck, Zap, HeartHandshake, ArrowUpRight, Loader2, Target
} from 'lucide-react';

const AboutValuesEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const subsectionId = id ? parseInt(id, 10) : 12;

  // Fixed Redux Paths
  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [viewMode, setViewMode] = useState('split');
  const [isDeploying, setIsDeploying] = useState(false);
  
  const [valuesData, setValuesData] = useState({
    title: "", highlight: "", subtitle: "",
    values: [
      { title: "Transparency", desc: "No hidden costs. Detailed quotes provided upfront.", color: "bg-blue-500", iconName: "EyeIcon" },
      { title: "Safety First", desc: "Every technician is background-verified.", color: "bg-emerald-500", iconName: "ShieldCheck" },
      { title: "Speedy Service", desc: "Our rapid response team ensures on-time arrival.", color: "bg-amber-500", iconName: "Zap" },
      { title: "Quality Care", desc: "Professional handling with 100% satisfaction.", color: "bg-emerald-500", iconName: "HeartHandshake" }
    ]
  });

  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setValuesData({
        title: content.title || "The Principles That",
        highlight: content.highlight || "Drive TRICKSY.",
        subtitle: content.subtitle || "Hum sirf kaam nahi karte, hum ek standard maintain karte hain jo humein doosron se alag banata hai.",
        values: content.values || [
          { title: "Transparency", desc: "No hidden costs. Detailed quotes provided upfront.", color: "bg-blue-500", iconName: "EyeIcon" },
          { title: "Safety First", desc: "Every technician is background-verified.", color: "bg-emerald-500", iconName: "ShieldCheck" },
          { title: "Speedy Service", desc: "Our rapid response team ensures on-time arrival.", color: "bg-amber-500", iconName: "Zap" },
          { title: "Quality Care", desc: "Professional handling with 100% satisfaction.", color: "bg-emerald-500", iconName: "HeartHandshake" }
        ]
      });
    }
  }, [content]);

  // Strict Limit Handlers
  const handleLimitChange = (field, val, limit) => {
    if (val.length <= limit) setValuesData({ ...valuesData, [field]: val });
  };

  const handleValueUpdate = (index, field, val, limit) => {
    if (val.length <= limit) {
      const updated = [...valuesData.values];
      updated[index][field] = val;
      setValuesData({ ...valuesData, values: updated });
    }
  };

  const handleSave = async () => {
    setIsDeploying(true);
    try {
      const payload = {
        title: valuesData.title,
        highlight: valuesData.highlight,
        subtitle: valuesData.subtitle,
        values: valuesData.values
      };

      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      dispatch(fetchSingleSubsectionContent(subsectionId)); // Re-sync

      alert("Values Section Deployed Successfully! 🚀");
    } catch (error) {
      alert(`Error: ${error.message || "Failed to deploy to database."}`);
    } finally { setIsDeploying(false); }
  };

  const renderIcon = (name) => {
    switch(name) {
      case 'EyeIcon': return <EyeIcon size={20} />;
      case 'ShieldCheck': return <ShieldCheck size={20} />;
      case 'Zap': return <Zap size={20} />;
      case 'HeartHandshake': return <HeartHandshake size={20} />;
      case 'Target': return <Target size={20} />;
      default: return <ShieldCheck size={20} />;
    }
  };

  const iconOptions = ['EyeIcon', 'ShieldCheck', 'Zap', 'HeartHandshake', 'Target'];
  const colorOptions = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-indigo-500'];

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING VALUES LAB...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans pb-20 selection:bg-blue-100">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-900"><ArrowLeft size={18} /></button>
          <h1 className="text-[12px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <Settings2 size={16} className="text-blue-600" /> Values <span className="text-blue-400">Lab</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <mode.icon size={12} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button onClick={handleSave} disabled={isDeploying} className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-blue-600 transition-all flex items-center gap-2 disabled:opacity-50">
          {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
          <span>{isDeploying ? "DEPLOYING..." : "DEPLOY"}</span>
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-700 ${viewMode === 'split' ? 'max-w-[1800px] px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8' : 'max-w-4xl py-12 px-6'}`}>
        
        {/* --- EDITOR SIDE --- */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-4' : 'w-full'} space-y-6`}>
            
            <section className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm space-y-5">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2 block flex items-center gap-2"><Type size={14} className="text-blue-500" /> Header Styling</span>
              <div className="space-y-3">
                <input value={valuesData.title} onChange={(e) => handleLimitChange('title', e.target.value, 40)} placeholder="Main Title" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-blue-500 transition-all" />
                <input value={valuesData.highlight} onChange={(e) => handleLimitChange('highlight', e.target.value, 40)} placeholder="Highlight Text" className="w-full px-4 py-2.5 bg-blue-50/50 border border-blue-100 rounded-xl font-black text-blue-700 outline-none focus:border-emerald-300 transition-all" />
                <textarea rows="2" value={valuesData.subtitle} onChange={(e) => handleLimitChange('subtitle', e.target.value, 150)} className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-medium outline-none resize-none leading-relaxed focus:border-blue-500 transition-all" placeholder="Subtitle description..." />
              </div>
            </section>

            <div className="space-y-4 pb-10">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-2 block">Core Principles Cards (4)</span>
              {valuesData.values.map((v, i) => (
                <section key={i} className="bg-white rounded-[2rem] border border-slate-100 p-5 shadow-sm space-y-4 hover:border-blue-200 transition-all">
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl ${v.color} flex items-center justify-center text-white flex-shrink-0 shadow-inner`}>
                      {renderIcon(v.iconName)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <input value={v.title} onChange={(e) => handleValueUpdate(i, 'title', e.target.value, 25)} className="w-full font-black text-sm text-slate-900 outline-none border-b border-transparent focus:border-slate-200 pb-1" placeholder="Card Title" />
                      <textarea value={v.desc} onChange={(e) => handleValueUpdate(i, 'desc', e.target.value, 100)} className="w-full text-[10px] font-medium text-slate-500 bg-slate-50 p-2.5 rounded-xl outline-none resize-none h-16" placeholder="Description" />
                      
                      {/* Icon & Color Selector */}
                      <div className="grid grid-cols-2 gap-2 pt-2">
                         <select value={v.iconName} onChange={e => handleValueUpdate(i, 'iconName', e.target.value, 50)} className="w-full p-2 bg-slate-50 rounded-lg text-[9px] font-bold outline-none border border-slate-100">
                            {iconOptions.map(opt => <option key={opt} value={opt}>{opt.replace('Icon', '')}</option>)}
                         </select>
                         <select value={v.color} onChange={e => handleValueUpdate(i, 'color', e.target.value, 50)} className="w-full p-2 bg-slate-50 rounded-lg text-[9px] font-bold outline-none border border-slate-100">
                            {colorOptions.map(opt => <option key={opt} value={opt}>{opt.replace('bg-', '').replace('-500', '').toUpperCase()}</option>)}
                         </select>
                      </div>
                    </div>
                  </div>
                </section>
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
                 <div className="flex-1 text-center"><span className="text-[6px] font-bold uppercase tracking-widest text-slate-500">Values Preview</span></div>
              </div>

              {/* Inner Page Canvas */}
              <div className="bg-white rounded-xl overflow-hidden min-h-[520px] max-h-[75vh] overflow-y-auto custom-scrollbar relative flex items-center justify-center">
                <div className="w-full scale-95 origin-center animate-in fade-in duration-500">
                  
                  {/* USER'S DESIGN STARTS HERE */}
                  <section className="py-12 px-8 relative overflow-hidden">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                      
                      {/* Left: Text & Header */}
                      <div className="lg:col-span-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-blue-600 font-bold text-[8px] uppercase tracking-widest mb-4">
                          Core Principles
                        </div>
                        <h2 className="text-[34px] font-black text-slate-900 leading-[1.1] tracking-tighter">
                          {valuesData.title} <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-400">
                            {valuesData.highlight}
                          </span>
                        </h2>
                        <p className="text-slate-500 mt-4 text-[11px] font-medium leading-relaxed italic max-w-sm">
                          "{valuesData.subtitle}"
                        </p>

                        <div className="mt-8 p-4 rounded-[1.5rem] bg-slate-900 text-white flex items-center justify-between overflow-hidden relative shadow-xl">
                          <div className="relative z-10">
                            <p className="text-slate-400 text-[7px] font-bold uppercase tracking-widest mb-0.5">Our Commitment</p>
                            <p className="text-[11px] font-black">100% Service Integrity</p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <ArrowUpRight size={14} />
                          </div>
                        </div>
                      </div>

                      {/* Right: Grid Cards */}
                      <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                        {valuesData.values.map((v, i) => (
                          <div key={i} className="group p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl">
                            <div className={`w-10 h-10 rounded-xl ${v.color} text-white flex items-center justify-center mb-4 shadow-lg transition-transform group-hover:scale-110`}>
                              {renderIcon(v.iconName)}
                            </div>
                            <h4 className="text-sm font-black text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">{v.title}</h4>
                            <p className="text-[9px] text-slate-500 leading-relaxed font-medium line-clamp-3">{v.desc}</p>
                            <div className="mt-3 flex items-center gap-1.5 text-[7px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-500">
                              Learn More <ArrowUpRight size={10} />
                            </div>
                          </div>
                        ))}
                      </div>

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

export default AboutValuesEditor;