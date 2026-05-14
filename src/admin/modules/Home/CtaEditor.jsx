import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { 
  ArrowLeft, Sparkles, Calendar, Phone, ArrowRight, Shield, 
  Edit3, Columns, Eye, Type, Settings2, Save,
  Monitor, Smartphone, Loader2
} from 'lucide-react';

const CtaEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Use sectionId from location state if available, else default to 8
  const subsectionId = location.state?.sectionId || 8; 

  const contentData = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [viewMode, setViewMode] = useState('split');
  const [isDeploying, setIsDeploying] = useState(false);
  
  const [content, setContent] = useState({
    badge: "We Are Ready To Help",
    titleLine1: "Need Professional",
    titleHighlight: "Cleaning & Repairs?",
    description: "",
    primaryButtonText: "Book Appointment",
    secondaryButtonText: "Call Us Now",
    phoneNumber: "+18001234567",
    verifiedText: "Verified Quality"
  });

  // 1. Fetch data on Mount
  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  // 2. Sync DB Content to Local State
  useEffect(() => {
    if (contentData && Object.keys(contentData).length > 0) {
      setContent({
        badge: contentData.badge || "We Are Ready To Help",
        titleLine1: contentData.titleLine1 || "Need Professional",
        titleHighlight: contentData.titleHighlight || "Cleaning & Repairs?",
        description: contentData.description || "",
        primaryButtonText: contentData.primaryButtonText || "Book Appointment",
        secondaryButtonText: contentData.secondaryButtonText || "Call Us Now",
        phoneNumber: contentData.phoneNumber || "+18001234567",
        verifiedText: contentData.verifiedText || "Verified Quality" 
      });
    }
  }, [contentData]);

  const handleUpdate = (field, value) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      const payload = {
        ...content,
        images: [] 
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();

      alert("CTA Section Deployed Successfully! 🚀");
      navigate('/admin/pages/home');
    } catch (error) {
      alert(`Deploy Failed: ${error.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  // Consistent Loading State UI
  if (status === 'loading' && !contentData) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> INITIALIZING CTA LAB...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#F1F5F9] font-sans selection:bg-pink-100">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[50] bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic">
            <Settings2 size={20} className="text-pink-600" /> CTA <span className="text-pink-500">LAB</span>
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-full shadow-inner">
          {['edit', 'split', 'preview'].map(mode => (
            <button key={mode} onClick={() => setViewMode(mode)} className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${viewMode === mode ? 'bg-white shadow-md text-pink-600' : 'text-slate-500 hover:text-slate-700'}`}>
              {mode.toUpperCase()}
            </button>
          ))}
        </div>

        <button onClick={handleDeploy} disabled={isDeploying} className="bg-slate-900 text-white px-8 py-2.5 rounded-full font-black text-xs flex items-center gap-2 shadow-lg hover:bg-pink-600 transition-all disabled:opacity-50">
          {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} {isDeploying ? 'DEPLOYING...' : 'DEPLOY'}
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        
        {/* EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-full lg:w-[420px] lg:border-r border-slate-200 lg:h-full lg:overflow-y-auto' : 'w-full h-full lg:overflow-y-auto'} p-8 bg-[#F8FAFC] custom-scrollbar`}>
            <div className="max-w-3xl mx-auto space-y-8 pb-10">
              
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-50 pb-4"><Type size={14} className="text-pink-500" /> Typography</h3>
                
                <div className="space-y-4">
                   <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Badge</label>
                    <input value={content.badge} onChange={(e) => handleUpdate('badge', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:bg-white" />
                  </div>
                  <div className="space-y-4">
                    <input value={content.titleLine1} placeholder="Title Part 1" onChange={(e) => handleUpdate('titleLine1', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:bg-white" />
                    <input value={content.titleHighlight} placeholder="Highlight" onChange={(e) => handleUpdate('titleHighlight', e.target.value)} className="w-full px-4 py-3 bg-pink-50 border border-pink-100 text-pink-700 rounded-xl font-black text-sm outline-none" />
                  </div>
                  <div>
                    <textarea value={content.description} placeholder="Description" onChange={(e) => handleUpdate('description', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm h-32 resize-none outline-none leading-relaxed" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-50 pb-4"><Settings2 size={14} className="text-pink-500" /> Action & Identity</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Main Button</label>
                    <input value={content.primaryButtonText} onChange={(e) => handleUpdate('primaryButtonText', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-black text-[10px] outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Sub Button</label>
                    <input value={content.secondaryButtonText} onChange={(e) => handleUpdate('secondaryButtonText', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-black text-[10px] outline-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Trust Text</label>
                    <input value={content.verifiedText} onChange={(e) => handleUpdate('verifiedText', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:flex-1' : 'w-full h-full'} bg-slate-200 p-8 flex items-center justify-center relative`}>
            <div className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[10px] border-slate-900 relative">
               <div className="h-10 bg-slate-900 flex items-center px-6 gap-2">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div></div>
               </div>
               
               <div className="p-12 flex items-center justify-center min-h-[500px] bg-slate-50">
                  <div className="w-full bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-200 flex flex-col md:flex-row">
                    <div className="md:w-3/5 p-10 flex flex-col justify-center">
                       <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full mb-6 w-fit uppercase tracking-tighter italic">
                         <Sparkles size={12} className="inline mr-1" /> {content.badge}
                       </div>
                       <h2 className="text-4xl font-black leading-[1.1] mb-4">
                         {content.titleLine1} <br/>
                         <span className="text-emerald-500 italic">{content.titleHighlight}</span>
                       </h2>
                       <p className="text-xs text-slate-500 leading-relaxed max-w-sm">{content.description}</p>
                    </div>
                    <div className="md:w-2/5 bg-slate-900 p-10 flex flex-col justify-center items-center relative">
                       <div className="absolute inset-0 bg-emerald-500/10 blur-[80px]" />
                       <div className="relative z-10 w-full space-y-3">
                          <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                            <Calendar size={14} /> {content.primaryButtonText}
                          </button>
                          <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase shadow-lg flex items-center justify-center gap-2">
                            <Phone size={14} /> {content.secondaryButtonText}
                          </button>
                          <div className="pt-4 flex items-center justify-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                            <Shield size={12} className="text-emerald-500" /> {content.verifiedText}
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default CtaEditor;