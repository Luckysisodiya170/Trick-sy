import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../../store/index'; 
import { 
  Save, ArrowLeft, ShieldCheck, Leaf, BadgeDollarSign, 
  Zap, Headphones, Sparkles, CheckCircle2, Plus, 
  Trash2, Type, Eye, Edit3, Columns, Settings2, ArrowRight, Loader2
} from 'lucide-react';

const WhyChooseEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const subsectionId = id || 5; 

  // --- Redux States ---
  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const [viewMode, setViewMode] = useState('split'); // 'edit', 'split', or 'preview'
  const [activeField, setActiveField] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  
  const [sectionData, setSectionData] = useState({
    badge: "The TRICKSY Standard",
    title: "Why People",
    highlightText: "Choose Us?",
    description: "We bring perfection to your doorstep with our certified process and a team that actually cares about your comfort.",
    features: [
      { id: 1, title: 'Professional Team', iconName: 'shield', desc: 'Certified & verified experts.' }
    ]
  });

  const iconOptions = [
    { name: 'shield', icon: ShieldCheck },
    { name: 'leaf', icon: Leaf },
    { name: 'dollar', icon: BadgeDollarSign },
    { name: 'zap', icon: Zap },
    { name: 'headphones', icon: Headphones },
    { name: 'check', icon: CheckCircle2 },
  ];

  // 1. Fetch data on Mount
  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  // 2. Sync DB Content to Local State
  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setSectionData({
        badge: content.badge || "The TRICKSY Standard",
        title: content.titleLine1 || "Why People",
        highlightText: content.titleHighlight || "Choose Us?",
        description: content.description || "",
        features: content.features?.length > 0 
          ? content.features.map((f, idx) => ({ 
              ...f, 
              id: f.id || Date.now() + idx 
            })) 
          : []
      });
    }
  }, [content]);

  // --- Handlers ---
  const updateFeature = (id, field, value) => {
    setSectionData({
      ...sectionData,
      features: sectionData.features.map(f => f.id === id ? { ...f, [field]: value } : f)
    });
  };

  const addFeature = () => {
    if (sectionData.features.length >= 6) return alert("Maximum 6 features allowed.");
    const newFeature = { id: Date.now(), title: 'New Feature', iconName: 'check', desc: 'Short description...' };
    setSectionData({ ...sectionData, features: [...sectionData.features, newFeature] });
  };

  const removeFeature = (id) => {
    setSectionData({ ...sectionData, features: sectionData.features.filter(f => f.id !== id) });
  };

  // 3. Deployment Logic
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

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();

      alert("Why Choose Us Section Deployed Successfully! 🚀");
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
        <Loader2 className="animate-spin mr-2" size={16} /> Loading Why Us Lab...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-emerald-100 pb-20">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-[20] bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 w-1/4 sm:w-1/3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic">
            <Settings2 size={20} className="text-red-600" /> WHY US <span className="text-red-500">LAB</span>
          </h1>
        </div>

        {/* 3-Way View Mode Toggle */}
        <div className="flex bg-slate-100 p-1 sm:p-1.5 rounded-full shadow-inner w-auto justify-center">
          <button 
            onClick={() => setViewMode('edit')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'edit' ? 'bg-white shadow-md text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Edit3 size={14} className="hidden sm:block" /> Edit
          </button>
          <button 
            onClick={() => setViewMode('split')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'split' ? 'bg-white shadow-md text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Columns size={14} className="hidden sm:block" /> Split
          </button>
          <button 
            onClick={() => setViewMode('preview')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'preview' ? 'bg-white shadow-md text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Eye size={14} className="hidden sm:block" /> Preview
          </button>
        </div>

        <div className="w-1/4 sm:w-1/3 flex justify-end">
          <button 
            onClick={handleDeploy}
            disabled={isDeploying}
            className="bg-slate-900 text-white px-4 sm:px-8 py-2.5 rounded-full font-extrabold text-[10px] sm:text-xs flex items-center gap-2 shadow-lg hover:bg-red-600 transition-all hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isDeploying ? <Loader2 size={14} className="animate-spin hidden sm:block" /> : <Save size={14} className="hidden sm:block" />} 
            {isDeploying ? 'DEPLOYING...' : 'DEPLOY'}
          </button>
        </div>
      </nav>

      {/* DYNAMIC LAYOUT CONTAINER */}
      <div className={`mx-auto transition-all duration-500 ${
        viewMode === 'split' 
          ? 'max-w-[1800px] p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-4' 
          : viewMode === 'edit' 
            ? 'max-w-5xl p-4 lg:p-10 mt-4' 
            : 'max-w-6xl p-4 lg:p-10 mt-4' 
      }`}>
    
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : ''} space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-300`}>
            
            {viewMode === 'edit' && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manage "Why Choose Us"</h2>
                <p className="text-slate-500 text-sm mt-2">Update your unique selling propositions and features list.</p>
              </div>
            )}

            {/* Typography & Copy Section */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 transition-all focus-within:ring-2 ring-emerald-100">
              <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-tight border-b border-slate-100 pb-4">
                <Type size={16} className="text-emerald-500" /> Section Content
              </h3>
              
              <div className="space-y-5">
                <div onFocus={() => setActiveField('badge')}>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Badge Text</label>
                  <input value={sectionData.badge} onChange={(e) => setSectionData({...sectionData, badge: e.target.value})} placeholder="The TRICKSY Standard" className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-emerald-400 focus:bg-white transition-all" />
                </div>

                <div className={`grid grid-cols-1 ${viewMode === 'split' ? 'xl:grid-cols-2' : 'sm:grid-cols-2'} gap-5`} onFocus={() => setActiveField('title')}>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Normal Heading</label>
                    <input value={sectionData.title} onChange={(e) => setSectionData({...sectionData, title: e.target.value})} placeholder="Why People" className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-emerald-400 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1 mb-2 block">Highlight (Green Text)</label>
                    <input value={sectionData.highlightText} onChange={(e) => setSectionData({...sectionData, highlightText: e.target.value})} placeholder="Choose Us?" className="w-full p-3.5 bg-emerald-50/50 border border-emerald-200 rounded-xl font-black text-emerald-700 outline-none focus:bg-white focus:border-emerald-400 transition-all" />
                  </div>
                </div>

                <div onFocus={() => setActiveField('desc')}>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Description</label>
                  <textarea value={sectionData.description} onChange={(e) => setSectionData({...sectionData, description: e.target.value})} placeholder="Enter description..." className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs h-20 outline-none focus:border-emerald-400 focus:bg-white resize-none leading-relaxed transition-all" />
                </div>
              </div>
            </div>

            {/* Features List Header */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 leading-tight">Feature <span className="text-emerald-600 leading-tight">List</span></h2>
              <button 
                onClick={addFeature}
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl font-black text-xs hover:bg-emerald-600 shadow-md transition-all active:scale-95 hover:-translate-y-1"
              >
                <Plus size={16} strokeWidth={3} /> ADD FEATURE
              </button>
            </div>

            {/* Features List */}
            <div className={`grid grid-cols-1 ${viewMode === 'edit' ? 'md:grid-cols-2' : ''} gap-4`} onFocus={() => setActiveField('features')}>
              {sectionData.features.map((f, index) => (
                <div key={f.id} className="bg-white p-5 rounded-[1.5rem] border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all group">
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                      {iconOptions.map(opt => (
                        <button 
                          key={opt.name}
                          onClick={() => updateFeature(f.id, 'iconName', opt.name)}
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all ${f.iconName === opt.name ? 'bg-emerald-500 text-white shadow-md' : 'bg-transparent text-slate-400 hover:bg-white hover:shadow-sm'}`}
                        >
                          <opt.icon size={16} />
                        </button>
                      ))}
                    </div>
                    <button onClick={() => removeFeature(f.id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <input 
                      value={f.title} 
                      onChange={(e) => updateFeature(f.id, 'title', e.target.value)}
                      className="w-full p-3 bg-slate-50 rounded-xl font-bold text-sm border border-transparent outline-none focus:bg-white focus:border-emerald-400 transition-all"
                      placeholder="Feature Title"
                    />
                    <input 
                      value={f.desc} 
                      onChange={(e) => updateFeature(f.id, 'desc', e.target.value)}
                      className="w-full p-3 bg-slate-50 rounded-xl text-xs font-medium border border-transparent outline-none focus:bg-white focus:border-emerald-400 transition-all"
                      placeholder="Short Description..."
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

     {/* --- PREVIEW --- */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-7 lg:sticky lg:top-24 h-fit' : ''} animate-in fade-in zoom-in-95 duration-500`}>
            <div className="w-full bg-white rounded-3xl sm:rounded-[3rem] border-4 sm:border-[12px] border-slate-900 shadow-2xl overflow-hidden relative">
              
              {/* Browser Mockup Header */}
              <div className="h-8 sm:h-12 bg-slate-100 border-b border-slate-200 flex items-center px-4 sm:px-6 gap-2 relative z-50">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
                  </div>
                  <div className="flex-1 max-w-md h-6 sm:h-7 bg-white rounded-lg mx-auto border border-slate-200/70 flex items-center justify-center px-3 text-[10px] sm:text-[11px] text-slate-400 font-bold tracking-tight">
                    {viewMode === 'split' ? 'Live Split View' : 'Full Screen Preview'}
                  </div>
              </div>

              <div className="relative overflow-y-auto max-h-[85vh] custom-scrollbar bg-white pb-10">
                  
                  {/* Background Accents */}
                  <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-50 rounded-full blur-[100px] pointer-events-none -translate-y-1/3 translate-x-1/3"></div>

                  <div className={`py-12 sm:py-20 relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12`}>
                      
                      <div className="max-w-xl mx-auto text-center mb-12 sm:mb-16">
                        <div className={`inline-block px-4 py-1.5 text-[10px] sm:text-[11px] font-black tracking-widest uppercase rounded-full mb-6 transition-all duration-300 ${activeField === 'badge' ? 'bg-emerald-600 text-white shadow-md scale-105' : 'bg-emerald-50 text-emerald-600'}`}>
                           <Sparkles size={12} className="inline mr-2 mb-0.5" /> {sectionData.badge}
                        </div>
                        <h2 className={`text-4xl sm:text-5xl font-black text-slate-900 leading-[1.1] transition-all duration-500 ${activeField === 'title' ? 'scale-105' : ''}`}>
                            {sectionData.title} <span className="text-emerald-500">{sectionData.highlightText}</span>
                        </h2>
                        <p className={`text-sm sm:text-base text-slate-500 font-medium mt-5 sm:mt-6 leading-relaxed transition-colors duration-500 ${activeField === 'desc' ? 'text-slate-900' : ''}`}>
                           {sectionData.description}
                        </p>
                      </div>

                      {/* Feature Grid Layout */}
                      <div className={`grid grid-cols-1 md:grid-cols-2 ${viewMode === 'split' ? 'xl:grid-cols-2' : 'xl:grid-cols-2'} gap-4 sm:gap-6 transition-all duration-500 ${activeField === 'features' ? 'opacity-100' : 'opacity-95'}`}>
                        {sectionData.features.map((f, index) => {
                          const IconComp = iconOptions.find(o => o.name === f.iconName)?.icon || CheckCircle2;
                          
                          const isFirst = index === 0;
                          
                          return (
                            <div 
                              key={f.id} 
                              className={`p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] transition-all duration-300 hover:-translate-y-1 
                                ${isFirst 
                                  ? 'md:col-span-2 bg-slate-900 text-white shadow-2xl shadow-emerald-900/20 hover:shadow-emerald-900/40' 
                                  : 'bg-slate-50 border border-slate-100 hover:bg-white hover:border-emerald-200 hover:shadow-xl'
                                }`}
                            >
                              <div className="flex items-start sm:items-center gap-4 sm:gap-5">
                                <div className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-[1rem] flex items-center justify-center transition-colors 
                                  ${isFirst 
                                    ? 'bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/30' 
                                    : 'bg-white text-emerald-600 shadow-sm border border-slate-100'
                                  }`}
                                >
                                  <IconComp size={22} className={isFirst ? "sm:w-6 sm:h-6" : ""} />
                                </div>
                                <div className="flex-1 pt-1 sm:pt-0">
                                  <h4 className={`text-base sm:text-lg font-black tracking-tight mb-1 ${isFirst ? 'text-white' : 'text-slate-900'}`}>{f.title}</h4>
                                  <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isFirst ? 'text-slate-300' : 'text-slate-500'}`}>{f.desc}</p>
                                </div>
                                {isFirst && (
                                  <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-slate-800 items-center justify-center border border-slate-700">
                                    <ArrowRight size={16} className="text-emerald-400" />
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
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
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

export default WhyChooseEditor;