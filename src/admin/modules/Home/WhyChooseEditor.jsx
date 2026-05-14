import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { 
  Save, ArrowLeft, ShieldCheck, Leaf, BadgeDollarSign, 
  Zap, Headphones, Sparkles, CheckCircle2, Plus, 
  Trash2, Type, Eye, Edit3, Columns, Settings2, ArrowRight, Loader2
} from 'lucide-react';

const WhyChooseEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  
  // Use sectionId from location state if available, else use id param if available, else default to 5
  const subsectionId = location.state?.sectionId || id || 5; 

  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [viewMode, setViewMode] = useState('split'); 
  const [activeField, setActiveField] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  
  const [sectionData, setSectionData] = useState({
    badge: "The TRICKSY Standard",
    title: "Why People",
    highlightText: "Choose Us?",
    description: "",
    features: []
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
              id: f.id || `feat-${Date.now()}-${idx}` 
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
    const newFeature = { id: `feat-${Date.now()}`, title: 'New Feature', iconName: 'check', desc: 'Short description...' };
    setSectionData({ ...sectionData, features: [...sectionData.features, newFeature] });
  };

  const removeFeature = (id) => {
    setSectionData({ ...sectionData, features: sectionData.features.filter(f => f.id !== id) });
  };

  // 3. Deployment Logic
  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      // Cleaning temporary frontend IDs before sending to DB
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

      alert("Why Choose Us Updated Successfully! 🚀");
      navigate('/admin/pages/home');
    } catch (error) {
      alert(`Deploy Failed: ${error.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> INITIALIZING WHY US LAB...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-emerald-100 pb-20">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[50] bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 w-1/3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic">
            <Settings2 size={20} className="text-emerald-600" /> WHY US <span className="text-emerald-500">LAB</span>
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-full shadow-inner">
          {['edit', 'split', 'preview'].map(mode => (
            <button key={mode} onClick={() => setViewMode(mode)} className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${viewMode === mode ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}>
              {mode.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="w-1/3 flex justify-end">
          <button onClick={handleDeploy} disabled={isDeploying} className="bg-slate-900 text-white px-8 py-2.5 rounded-full font-black text-xs flex items-center gap-2 shadow-lg hover:bg-emerald-600 transition-all disabled:opacity-50">
            {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} {isDeploying ? 'DEPLOYING...' : 'DEPLOY'}
          </button>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <div className={`mx-auto transition-all duration-500 ${
        viewMode === 'split' 
          ? 'max-w-[1800px] p-8 grid grid-cols-1 lg:grid-cols-12 gap-8' 
          : 'max-w-4xl p-4 mt-4' 
      }`}>
    
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : ''} space-y-8 animate-in fade-in zoom-in-95 duration-300`}>
            
            {/* Header Content */}
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 space-y-6">
              <h3 className="font-black text-slate-400 text-[10px] uppercase flex items-center gap-2 tracking-widest border-b border-slate-50 pb-4">
                <Type size={16} className="text-emerald-500" /> Section Header
              </h3>
              
              <div className="space-y-4">
                <input value={sectionData.badge} onFocus={() => setActiveField('badge')} onChange={(e) => setSectionData({...sectionData, badge: e.target.value})} placeholder="Badge Text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-emerald-400 focus:bg-white" />
                <div className="grid grid-cols-2 gap-4">
                  <input value={sectionData.title} onFocus={() => setActiveField('title')} onChange={(e) => setSectionData({...sectionData, title: e.target.value})} placeholder="Normal Heading" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-emerald-400" />
                  <input value={sectionData.highlightText} onFocus={() => setActiveField('title')} onChange={(e) => setSectionData({...sectionData, highlightText: e.target.value})} placeholder="Highlight Text" className="w-full p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl font-black text-sm outline-none" />
                </div>
                <textarea value={sectionData.description} onFocus={() => setActiveField('desc')} onChange={(e) => setSectionData({...sectionData, description: e.target.value})} placeholder="Main Description" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm h-28 outline-none focus:border-emerald-400 focus:bg-white resize-none" />
              </div>
            </div>

            {/* Features Management */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Unique <span className="text-emerald-600">Features</span></h2>
              <button onClick={addFeature} className="bg-slate-900 text-white px-4 py-2 rounded-xl font-black text-[10px] hover:bg-emerald-600 transition-all flex items-center gap-2">
                <Plus size={16} strokeWidth={3} /> ADD FEATURE
              </button>
            </div>

            <div className="space-y-4" onFocus={() => setActiveField('features')}>
              {sectionData.features.map((f) => (
                <div key={f.id} className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm hover:border-emerald-300 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      {iconOptions.map(opt => (
                        <button key={opt.name} onClick={() => updateFeature(f.id, 'iconName', opt.name)} className={`p-2 rounded-lg transition-all ${f.iconName === opt.name ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:bg-white'}`}>
                          <opt.icon size={14} />
                        </button>
                      ))}
                    </div>
                    <button onClick={() => removeFeature(f.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <input value={f.title} onChange={(e) => updateFeature(f.id, 'title', e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl font-bold text-sm outline-none border border-transparent focus:border-emerald-400 focus:bg-white" placeholder="Feature Title" />
                    <input value={f.desc} onChange={(e) => updateFeature(f.id, 'desc', e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl text-xs border border-transparent outline-none focus:border-emerald-400 focus:bg-white" placeholder="Short Description" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-7 sticky top-24' : ''}`}>
             <div className="w-full bg-white min-h-[600px] rounded-[3rem] shadow-2xl border-[12px] border-slate-900 overflow-hidden relative">
                <div className="h-10 bg-slate-100 flex items-center px-6 gap-2">
                   <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div></div>
                </div>
                
                <div className="p-12 overflow-y-auto max-h-[80vh] custom-scrollbar relative">
                   <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-emerald-50/50 rounded-full blur-[100px] -z-10" />
                   
                   <div className="text-center max-w-xl mx-auto mb-16">
                      <div className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 transition-all ${activeField === 'badge' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'}`}>{sectionData.badge}</div>
                      <h2 className="text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                        {sectionData.title} <span className="text-emerald-500">{sectionData.highlightText}</span>
                      </h2>
                      <p className="text-sm text-slate-500 mt-4 leading-relaxed">{sectionData.description}</p>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      {sectionData.features.map((f, index) => {
                        const IconComp = iconOptions.find(o => o.name === f.iconName)?.icon || CheckCircle2;
                        const isFirst = index === 0;
                        return (
                          <div key={f.id} className={`p-8 rounded-[2.5rem] transition-all ${isFirst ? 'col-span-2 bg-slate-900 text-white shadow-2xl' : 'bg-slate-50 border border-slate-100 shadow-sm'}`}>
                             <div className="flex items-center gap-5">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isFirst ? 'bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/30' : 'bg-white text-emerald-600 shadow-sm'}`}>
                                   <IconComp size={24} />
                                </div>
                                <div>
                                   <h4 className="font-black text-lg tracking-tight mb-1">{f.title}</h4>
                                   <p className={`text-xs ${isFirst ? 'text-slate-300' : 'text-slate-500'}`}>{f.desc}</p>
                                </div>
                             </div>
                          </div>
                        );
                      })}
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default WhyChooseEditor;