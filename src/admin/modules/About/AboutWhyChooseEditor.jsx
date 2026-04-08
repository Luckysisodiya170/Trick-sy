import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../../store/index'; 
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

  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const [viewMode, setViewMode] = useState('split'); 
  const [isDeploying, setIsDeploying] = useState(false);
  
  const [activePreviewTab, setActivePreviewTab] = useState(0); 
  
  const [sectionData, setSectionData] = useState({
    badge: "Our Philosophy",
    title: "The TRICKSY",
    highlightText: "Difference",
    description: "We don't just provide a service; we deliver peace of mind. Here is how our standards separate us from the rest of the industry.",
    features: [
      { id: 1, title: 'Vetted Professionals', iconName: 'shield', desc: 'Every single member of our team undergoes rigorous background checks, technical skill assessments, and customer service training before they ever step foot in your home.' },
      { id: 2, title: 'Transparent Pricing', iconName: 'dollar', desc: 'No hidden fees, no surprise charges. We provide detailed, upfront quotes so you know exactly what you are paying for from day one.' },
      { id: 3, title: 'Eco-Friendly Approach', iconName: 'leaf', desc: 'We utilize sustainable, non-toxic products that are tough on dirt but completely safe for your children, pets, and the environment.' }
    ]
  });

  const iconOptions = [
    { name: 'shield', icon: ShieldCheck },
    { name: 'leaf', icon: Leaf },
    { name: 'dollar', icon: BadgeDollarSign },
    { name: 'zap', icon: Zap },
    { name: 'headphones', icon: Headphones },
    { name: 'check', icon: CheckCircle2 },
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
        description: content.description || "We don't just provide a service; we deliver peace of mind.",
        features: content.features?.length > 0 
          ? content.features.map((f, idx) => ({ ...f, id: f.id || Date.now() + idx })) 
          : []
      });
    }
  }, [content]);

  const updateFeature = (id, field, value) => {
    setSectionData({
      ...sectionData,
      features: sectionData.features.map(f => f.id === id ? { ...f, [field]: value } : f)
    });
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

      await dispatch(updateSingleSubsectionContent({ subsectionId: subsectionId, updateData: payload })).unwrap();
      alert("Philosophy Section Deployed Successfully! 🚀");
    } catch (error) {
      console.error(error);
      alert(`Deploy Failed: ${error.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> Loading Philosophy Lab...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-20">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-[20] bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <h1 className="text-sm lg:text-lg font-black tracking-tight items-center gap-2 italic uppercase flex">
            <Settings2 size={20} className="text-emerald-600 mr-2" /> PHILOSOPHY <span className="text-emerald-500 ml-1">EDITOR</span>
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full shadow-inner">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === mode.id ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}>
              <mode.icon size={14} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button onClick={handleDeploy} disabled={isDeploying} className="bg-slate-900 text-white px-5 py-2 rounded-full font-extrabold text-xs flex items-center gap-2 shadow-lg hover:bg-emerald-600 transition-all hover:-translate-y-0.5 disabled:opacity-50">
          {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
          <span className="hidden md:inline">{isDeploying ? 'DEPLOYING...' : 'PUBLISH'}</span>
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-500 ${viewMode === 'split' ? 'max-w-[1800px] p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4' : 'max-w-5xl p-6 mt-4'}`}>
    
        {/* --- EDITOR SIDE --- */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : ''} space-y-6 animate-in fade-in zoom-in-95 duration-300`}>
            
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-tight border-b border-slate-100 pb-4">
                <Type size={16} className="text-emerald-500" /> Core Message
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Badge Label</label>
                  <input value={sectionData.badge} onChange={(e) => setSectionData({...sectionData, badge: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-emerald-400 focus:bg-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Heading</label>
                    <input value={sectionData.title} onChange={(e) => setSectionData({...sectionData, title: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-emerald-400 focus:bg-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1 mb-2 block">Highlight</label>
                    <input value={sectionData.highlightText} onChange={(e) => setSectionData({...sectionData, highlightText: e.target.value})} className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl font-black text-emerald-700 outline-none focus:bg-white focus:border-emerald-400" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Philosophy Intro</label>
                  <textarea value={sectionData.description} onChange={(e) => setSectionData({...sectionData, description: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs h-20 outline-none focus:border-emerald-400 focus:bg-white resize-none leading-relaxed" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <h2 className="text-sm font-black uppercase tracking-tight text-slate-900">The Promises</h2>
              <button onClick={addFeature} className="flex items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-200 px-4 py-2 rounded-xl font-bold text-xs hover:bg-emerald-500 hover:text-white transition-all">
                <Plus size={14} strokeWidth={3} /> Add Point
              </button>
            </div>

            <div className="space-y-4">
              {sectionData.features.map((f, index) => (
                <div key={f.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                      {iconOptions.map(opt => (
                        <button key={opt.name} onClick={() => updateFeature(f.id, 'iconName', opt.name)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${f.iconName === opt.name ? 'bg-emerald-500 text-white shadow-md' : 'bg-transparent text-slate-400 hover:bg-white'}`}>
                          <opt.icon size={16} />
                        </button>
                      ))}
                    </div>
                    <button onClick={() => removeFeature(f.id)} className="p-1.5 text-slate-300 hover:text-red-500 bg-slate-50 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                  </div>
                  <div className="space-y-2">
                    <input value={f.title} onChange={(e) => updateFeature(f.id, 'title', e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl font-bold text-sm border border-transparent outline-none focus:bg-white focus:border-emerald-400 transition-all" placeholder="Title (e.g. Vetted Experts)" />
                    <textarea value={f.desc} onChange={(e) => updateFeature(f.id, 'desc', e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl text-xs font-medium border border-transparent outline-none focus:bg-white focus:border-emerald-400 transition-all resize-none" rows="3" placeholder="Detailed promise..." />
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* --- PREVIEW --- */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-7 lg:sticky lg:top-24 h-fit' : ''} animate-in fade-in zoom-in-95 duration-500`}>
            <div className="w-full bg-white rounded-[3rem] border-[10px] border-slate-900 shadow-2xl overflow-hidden relative">
              
              <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-5 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
                  </div>
                  <div className="flex-1 max-w-sm h-6 bg-white rounded-md mx-auto border border-slate-200/70 flex items-center justify-center px-3 text-[10px] text-slate-400 font-bold">tricksy-about.com</div>
              </div>

              <div className="relative overflow-y-auto max-h-[85vh] custom-scrollbar bg-slate-50 pb-16">
                  
                  {/* Naya Layout: "The Showcase" */}
                  <div className="py-16 px-8 max-w-5xl mx-auto">
                    
                    {/* Centered Header */}
                    <div className="text-center mb-16">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-black tracking-widest uppercase rounded-full mb-6 bg-white border border-slate-200 shadow-sm text-emerald-600">
                        <Star size={12} className="text-emerald-500" /> {sectionData.badge}
                      </div>
                      <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                          {sectionData.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">{sectionData.highlightText}</span>
                      </h2>
                      <p className="text-sm lg:text-base text-slate-500 font-medium mt-6 leading-relaxed max-w-2xl mx-auto">
                          {sectionData.description}
                      </p>
                    </div>

                    {/* Interactive Tab Layout */}
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                      
                      {/* Left: Tab Navigation */}
                      <div className="w-full lg:w-5/12 flex flex-col gap-3">
                        {sectionData.features.map((f, index) => {
                          const isActive = activePreviewTab === index;
                          const IconComp = iconOptions.find(o => o.name === f.iconName)?.icon || CheckCircle2;
                          
                          return (
                            <button 
                              key={f.id}
                              onClick={() => setActivePreviewTab(index)}
                              className={`text-left p-5 rounded-2xl transition-all flex items-center gap-4 border ${isActive ? 'bg-white border-emerald-500 shadow-lg scale-[1.02]' : 'bg-transparent border-transparent hover:bg-white hover:border-slate-200'}`}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                <IconComp size={18} />
                              </div>
                              <div>
                                <h4 className={`font-black text-lg ${isActive ? 'text-emerald-600' : 'text-slate-700'}`}>{f.title}</h4>
                                {isActive && <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold block mt-1">Viewing Details <ArrowRight size={10} className="inline mb-0.5"/></span>}
                              </div>
                            </button>
                          )
                        })}
                      </div>

                      {/* Right: Dynamic Display Area */}
                      <div className="w-full lg:w-7/12 relative">
                        {sectionData.features.length > 0 && (
                          <div className="bg-slate-900 rounded-[2.5rem] p-10 h-full min-h-[350px] relative overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-center animate-in fade-in duration-500" key={activePreviewTab}>
                            
                            {/* Huge faded watermark icon */}
                            <div className="absolute -right-10 -bottom-10 opacity-[0.03] text-white pointer-events-none">
                              {React.createElement(iconOptions.find(o => o.name === sectionData.features[activePreviewTab].iconName)?.icon || CheckCircle2, { size: 300 })}
                            </div>

                            <div className="relative z-10">
                              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/30">
                                {React.createElement(iconOptions.find(o => o.name === sectionData.features[activePreviewTab].iconName)?.icon || CheckCircle2, { size: 28 })}
                              </div>
                              
                              <h3 className="text-3xl font-black text-white mb-6 leading-tight">
                                {sectionData.features[activePreviewTab].title}
                              </h3>
                              
                              <p className="text-slate-400 text-base font-medium leading-relaxed">
                                {sectionData.features[activePreviewTab].desc}
                              </p>

                              <div className="mt-10 inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white uppercase tracking-widest backdrop-blur-sm">
                                <CheckCircle2 size={14} className="text-emerald-500" /> Verified Standard
                              </div>
                            </div>

                          </div>
                        )}
                      </div>

                    </div>
                  </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AboutWhyChooseEditor;