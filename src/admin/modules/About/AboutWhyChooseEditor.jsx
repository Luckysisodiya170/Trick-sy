import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { 
  Save, ArrowLeft, ShieldCheck, Leaf, BadgeDollarSign, 
  Zap, Headphones, Sparkles, CheckCircle2, Plus, 
  Trash2, Type, Eye, Edit3, Columns, Settings2, ArrowRight, Loader2, Star
} from 'lucide-react';

const AboutWhyChooseEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const subsectionId = id ? parseInt(id, 10) : 15; 

  // Fixed Redux Paths
  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [viewMode, setViewMode] = useState('split'); 
  const [isDeploying, setIsDeploying] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState(0); 
  
  const [sectionData, setSectionData] = useState({
    badge: "", title: "", highlightText: "", description: "",
    features: [
      { id: 1, title: 'Vetted Professionals', iconName: 'shield', desc: 'Every single member of our team undergoes rigorous background checks.' },
      { id: 2, title: 'Transparent Pricing', iconName: 'dollar', desc: 'No hidden fees, no surprise charges. Detailed upfront quotes.' },
      { id: 3, title: 'Eco-Friendly', iconName: 'leaf', desc: 'We utilize sustainable, non-toxic products that are completely safe.' }
    ]
  });

  const iconOptions = [
    { name: 'shield', icon: ShieldCheck }, { name: 'leaf', icon: Leaf },
    { name: 'dollar', icon: BadgeDollarSign }, { name: 'zap', icon: Zap },
    { name: 'headphones', icon: Headphones }, { name: 'check', icon: CheckCircle2 },
    { name: 'star', icon: Star },
  ];

  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setSectionData({
        badge: content.badge || "Our Philosophy",
        title: content.titleLine1 || "The TRICKSY",
        highlightText: content.titleHighlight || "Difference",
        description: content.description || "We don't just provide a service; we deliver peace of mind. Here is how our standards separate us from the rest of the industry.",
        features: content.features?.length > 0 
          ? content.features.map((f, idx) => ({ ...f, id: f.id || Date.now() + idx })) 
          : [
              { id: 1, title: 'Vetted Professionals', iconName: 'shield', desc: 'Every single member of our team undergoes rigorous background checks.' },
              { id: 2, title: 'Transparent Pricing', iconName: 'dollar', desc: 'No hidden fees, no surprise charges. Detailed upfront quotes.' },
              { id: 3, title: 'Eco-Friendly Approach', iconName: 'leaf', desc: 'We utilize sustainable, non-toxic products that are completely safe.' }
            ]
      });
    }
  }, [content]);

  // Strict Limits Handlers
  const handleLimitChange = (field, val, limit) => {
    if (val.length <= limit) setSectionData({ ...sectionData, [field]: val });
  };

  const updateFeature = (id, field, value, limit) => {
    if (!limit || value.length <= limit) {
      setSectionData({
        ...sectionData,
        features: sectionData.features.map(f => f.id === id ? { ...f, [field]: value } : f)
      });
    }
  };

  const addFeature = () => {
    if (sectionData.features.length >= 6) return alert("Maximum 6 promises allowed for optimal design.");
    const newFeature = { id: Date.now(), title: 'Our Promise', iconName: 'check', desc: 'Detail your commitment to the customer here...' };
    setSectionData({ ...sectionData, features: [...sectionData.features, newFeature] });
  };

  const removeFeature = (id) => {
    setSectionData({ ...sectionData, features: sectionData.features.filter(f => f.id !== id) });
    setActivePreviewTab(0); 
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      const finalFeatures = sectionData.features.map(({ id, ...rest }) => rest);
      const payload = {
        badge: sectionData.badge,
        titleLine1: sectionData.title,
        titleHighlight: sectionData.highlightText,
        description: sectionData.description,
        features: finalFeatures,
        images: [] 
      };

      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      dispatch(fetchSingleSubsectionContent(subsectionId)); // Re-sync

      alert("Philosophy Section Deployed Successfully! 🚀");
    } catch (error) {
      alert(`Deploy Failed: ${error.message}`);
    } finally { setIsDeploying(false); }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING PHILOSOPHY LAB...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 pb-20 selection:bg-emerald-100">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-900"><ArrowLeft size={18} /></button>
          <h1 className="text-[12px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <Settings2 size={16} className="text-emerald-600" /> Philosophy <span className="text-emerald-400">Lab</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <mode.icon size={12} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button onClick={handleDeploy} disabled={isDeploying} className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50">
          {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
          <span>{isDeploying ? "DEPLOYING..." : "DEPLOY"}</span>
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-700 ${viewMode === 'split' ? 'max-w-[1800px] px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8' : 'max-w-4xl py-12 px-6'}`}>
    
        {/* --- EDITOR SIDE --- */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-4' : 'w-full'} space-y-6`}>
            
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 space-y-5">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2 block flex items-center gap-2"><Type size={14} className="text-emerald-500" /> Header Content</span>
              <div className="space-y-3">
                <input value={sectionData.badge} onChange={(e) => handleLimitChange('badge', e.target.value, 30)} placeholder="Badge Label" className="w-full p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-emerald-500 transition-all" />
                <div className="grid grid-cols-2 gap-3">
                  <input value={sectionData.title} onChange={(e) => handleLimitChange('title', e.target.value, 40)} placeholder="Main Title" className="w-full p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-emerald-500 transition-all" />
                  <input value={sectionData.highlightText} onChange={(e) => handleLimitChange('highlightText', e.target.value, 40)} placeholder="Highlight Text" className="w-full p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl font-black text-emerald-700 outline-none focus:border-emerald-300 transition-all" />
                </div>
                <textarea rows="3" value={sectionData.description} onChange={(e) => handleLimitChange('description', e.target.value, 200)} placeholder="Philosophy Intro..." className="w-full p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-medium outline-none resize-none leading-relaxed focus:border-emerald-500 transition-all" />
              </div>
            </div>

            <div className="space-y-4 pb-10">
              <div className="flex items-center justify-between px-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">The Promises ({sectionData.features.length})</span>
                <button onClick={addFeature} className="text-[9px] font-black text-emerald-600 hover:text-emerald-700">+ ADD POINT</button>
              </div>

              {sectionData.features.map((f, index) => (
                <div key={f.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-4 animate-in slide-in-from-left-2 hover:border-emerald-200 transition-all">
                  <div className="flex justify-between items-start mb-2 border-b border-slate-50 pb-3">
                    <div className="flex gap-1.5 bg-slate-50/50 p-1.5 rounded-xl border border-slate-100">
                      {iconOptions.map(opt => (
                        <button key={opt.name} onClick={() => updateFeature(f.id, 'iconName', opt.name)} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${f.iconName === opt.name ? 'bg-emerald-500 text-white shadow-md' : 'bg-transparent text-slate-400 hover:bg-white hover:shadow-sm'}`}>
                          <opt.icon size={14} />
                        </button>
                      ))}
                    </div>
                    <button onClick={() => removeFeature(f.id)} className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={14} /></button>
                  </div>
                  <div className="space-y-2">
                    <input value={f.title} onChange={(e) => updateFeature(f.id, 'title', e.target.value, 40)} className="w-full font-black text-sm text-slate-900 outline-none border-b border-transparent focus:border-slate-200 pb-1" placeholder="Title (e.g. Vetted Experts)" />
                    <textarea value={f.desc} onChange={(e) => updateFeature(f.id, 'desc', e.target.value, 150)} className="w-full text-[10px] font-medium text-slate-500 bg-slate-50 p-3 rounded-xl outline-none resize-none h-16 border border-transparent focus:border-emerald-100 transition-all" placeholder="Detailed promise..." />
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* --- PREVIEW --- */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-8' : 'w-full'} h-fit sticky top-24`}>
            
            {/* BLACK MACBOOK MOCKUP FRAME */}
            <div className="relative mx-auto bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 overflow-hidden">
              
              {/* Browser Toolbar UI */}
              <div className="flex h-8 bg-slate-900 items-center px-4 gap-1.5 border-b border-slate-800/50">
                 <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                 </div>
                 <div className="flex-1 text-center"><span className="text-[6px] font-bold uppercase tracking-widest text-slate-500">Philosophy Preview</span></div>
              </div>

              {/* Inner Page Canvas */}
              <div className="bg-slate-50 rounded-xl overflow-hidden min-h-[520px] max-h-[75vh] overflow-y-auto custom-scrollbar relative">
                <div className="w-full scale-95 origin-top animate-in fade-in duration-500">
                  
                  {/* USER'S DESIGN STARTS HERE */}
                  <div className="py-12 px-8">
                    
                    <div className="text-center mb-12">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 text-[9px] font-black tracking-widest uppercase rounded-full mb-4 bg-white border border-slate-200 shadow-sm text-emerald-600">
                        <Star size={12} className="text-emerald-500" /> {sectionData.badge}
                      </div>
                      <h2 className="text-3xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                          {sectionData.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">{sectionData.highlightText}</span>
                      </h2>
                      <p className="text-xs text-slate-500 font-medium mt-4 leading-relaxed max-w-xl mx-auto">
                          {sectionData.description}
                      </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                      
                      {/* Left: Tab Navigation */}
                      <div className="w-full lg:w-5/12 flex flex-col gap-2">
                        {sectionData.features.map((f, index) => {
                          const isActive = activePreviewTab === index;
                          const IconComp = iconOptions.find(o => o.name === f.iconName)?.icon || CheckCircle2;
                          
                          return (
                            <button 
                              key={f.id}
                              onClick={() => setActivePreviewTab(index)}
                              className={`text-left p-4 rounded-2xl transition-all flex items-center gap-4 border ${isActive ? 'bg-white border-emerald-500 shadow-lg scale-[1.02] z-10' : 'bg-transparent border-transparent hover:bg-white hover:border-slate-200'}`}
                            >
                              <div className={`w-10 h-10 rounded-xl flex flex-shrink-0 items-center justify-center transition-colors ${isActive ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-200 text-slate-500'}`}>
                                <IconComp size={18} />
                              </div>
                              <div>
                                <h4 className={`font-black text-sm uppercase tracking-tight ${isActive ? 'text-emerald-600' : 'text-slate-700'}`}>{f.title}</h4>
                                {isActive && <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold block mt-1">Viewing Details <ArrowRight size={10} className="inline mb-0.5"/></span>}
                              </div>
                            </button>
                          )
                        })}
                      </div>

                      {/* Right: Dynamic Display Area */}
                      <div className="w-full lg:w-7/12 relative">
                        {sectionData.features.length > 0 && (
                          <div className="bg-slate-900 rounded-[2rem] p-8 h-full min-h-[300px] relative overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-center animate-in fade-in duration-500" key={activePreviewTab}>
                            
                            <div className="absolute -right-8 -bottom-8 opacity-[0.03] text-white pointer-events-none">
                              {React.createElement(iconOptions.find(o => o.name === sectionData.features[activePreviewTab]?.iconName)?.icon || CheckCircle2, { size: 240 })}
                            </div>

                            <div className="relative z-10">
                              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/30">
                                {React.createElement(iconOptions.find(o => o.name === sectionData.features[activePreviewTab]?.iconName)?.icon || CheckCircle2, { size: 24 })}
                              </div>
                              
                              <h3 className="text-2xl font-black text-white mb-4 leading-tight">
                                {sectionData.features[activePreviewTab]?.title}
                              </h3>
                              
                              <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-sm">
                                {sectionData.features[activePreviewTab]?.desc}
                              </p>

                              <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-white uppercase tracking-widest backdrop-blur-sm">
                                <CheckCircle2 size={12} className="text-emerald-500" /> Verified Standard
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                  {/* USER'S DESIGN ENDS HERE */}

                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AboutWhyChooseEditor;