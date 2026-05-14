import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { 
  ArrowLeft, Plus, Trash2, Settings2, HelpCircle, 
  MessageSquare, ArrowRight, ChevronDown, Type, Save,
  List, Eye, Edit3, Columns, Loader2
} from 'lucide-react';

const FAQEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Use sectionId from location state if available, else default to 7
  const subsectionId = location.state?.sectionId || 7; 

  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [activeCard, setActiveCard] = useState(null); 
  const [viewMode, setViewMode] = useState('split'); 
  const [isDeploying, setIsDeploying] = useState(false);

  const [headerSettings, setHeaderSettings] = useState({
    badgeText: "Support Center",
    headingNormal: "FAQ",
    headingHighlight: ".",
    contactTitle: "Still unsure?",
    contactCta: "Chat with our team"
  });

  const [faqs, setFaqs] = useState([]);

  // 1. Fetch data on Mount
  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  // 2. Sync DB Content to Local State
  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setHeaderSettings({
        badgeText: content.badge || "Support Center",
        headingNormal: content.titleLine1 || content.title || "FAQ",
        headingHighlight: content.titleHighlight || ".",
        contactTitle: content.contactTitle || "Still unsure?",
        contactCta: content.contactCta || "Chat with our team"
      });

      if (content.faqs && content.faqs.length > 0) {
        const loadedFaqs = content.faqs.map((faqItem, idx) => ({
          ...faqItem,
          id: faqItem.id || `faq-${Date.now()}-${idx}`, 
        }));
        setFaqs(loadedFaqs);
      }
    }
  }, [content]);

  // --- Handlers ---
  const handleAddFaq = () => {
    const newId = Date.now();
    setFaqs([...faqs, { id: newId, question: 'New Question?', answer: '' }]);
    setActiveCard(newId);
  };

  const updateFaq = (id, field, value) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const updateHeader = (field, value) => {
    setHeaderSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      const finalFaqs = faqs.map(({ id, ...rest }) => rest);

      const payload = {
        badge: headerSettings.badgeText,
        title: headerSettings.headingNormal,
        titleLine1: headerSettings.headingNormal, 
        titleHighlight: headerSettings.headingHighlight,
        contactTitle: headerSettings.contactTitle,
        contactCta: headerSettings.contactCta,
        faqs: finalFaqs,
        images: [] 
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();

      alert("FAQ Section Updated Successfully! 🚀");
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
        <Loader2 className="animate-spin mr-2" size={16} /> INITIALIZING FAQ LAB...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] font-sans selection:bg-purple-100">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[50] bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 w-1/3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic">
            <Settings2 size={20} className="text-purple-600" /> FAQ <span className="text-purple-500">LAB</span>
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-full shadow-inner">
          {['edit', 'split', 'preview'].map(mode => (
            <button key={mode} onClick={() => setViewMode(mode)} className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${viewMode === mode ? 'bg-white shadow-md text-purple-600' : 'text-slate-500 hover:text-slate-700'}`}>
              {mode.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="w-1/3 flex justify-end">
          <button onClick={handleDeploy} disabled={isDeploying} className="bg-slate-900 text-white px-8 py-2.5 rounded-full font-black text-xs flex items-center gap-2 shadow-lg hover:bg-purple-600 transition-all disabled:opacity-50">
            {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} {isDeploying ? 'DEPLOYING...' : 'DEPLOY'}
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        
        {/* EDITOR PANEL */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-full lg:w-[42%] lg:border-r border-slate-200 lg:h-full lg:overflow-y-auto' : 'w-full h-full lg:overflow-y-auto'} p-8 bg-[#F8FAFC] custom-scrollbar`}>
            <div className="max-w-4xl mx-auto space-y-8 pb-10">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h2 className="text-xl font-black text-slate-900 uppercase">Configuration</h2>
                <button onClick={handleAddFaq} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase hover:bg-slate-900 transition-all shadow-md">
                  <Plus size={16} /> ADD QUESTION
                </button>
              </div>

              {/* Header Settings */}
              <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                  <Settings2 size={16} /> Header Content
                </h3>
                <div className="grid grid-cols-2 gap-4">
                   <input value={headerSettings.headingNormal} onChange={(e) => updateHeader('headingNormal', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none" placeholder="Normal Title" />
                   <input value={headerSettings.headingHighlight} onChange={(e) => updateHeader('headingHighlight', e.target.value)} className="w-full px-4 py-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl font-black text-sm outline-none" placeholder="Highlight" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input value={headerSettings.badgeText} onChange={(e) => updateHeader('badgeText', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none" placeholder="Badge Text" />
                  <input value={headerSettings.contactCta} onChange={(e) => updateHeader('contactCta', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none" placeholder="Chat Link Text" />
                </div>
              </section>

              {/* FAQ Cards */}
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className={`bg-white rounded-[1.8rem] border transition-all ${activeCard === faq.id ? 'ring-4 ring-emerald-50 border-emerald-200 shadow-xl' : 'border-slate-200 shadow-sm'}`}>
                    <div onClick={() => setActiveCard(activeCard === faq.id ? null : faq.id)} className="p-6 flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeCard === faq.id ? 'bg-emerald-600 text-white rotate-6' : 'bg-slate-50 text-slate-400'}`}>
                          <List size={20} />
                        </div>
                        <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{faq.question || 'New Question Added'}</h4>
                      </div>
                      <ChevronDown size={20} className={`text-slate-300 transition-transform ${activeCard === faq.id ? 'rotate-180 text-emerald-500' : ''}`} />
                    </div>

                    {activeCard === faq.id && (
                      <div className="px-10 pb-8 pt-2 space-y-6 border-t border-slate-50 animate-in slide-in-from-top-2">
                        <div className="space-y-4">
                          <input value={faq.question} onChange={(e) => updateFaq(faq.id, 'question', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none" placeholder="Question" />
                          <textarea value={faq.answer} onChange={(e) => updateFaq(faq.id, 'answer', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm h-32 resize-none outline-none leading-relaxed" placeholder="Answer" />
                        </div>
                        <button onClick={() => setFaqs(faqs.filter(x => x.id !== faq.id))} className="text-rose-500 font-black text-[10px] hover:underline uppercase tracking-widest">
                          Delete FAQ Item
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LIVE PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:w-[58%]' : 'w-full'} bg-slate-200 p-8 flex items-center justify-center`}>
            <div className="w-full h-full bg-white shadow-2xl rounded-[3rem] overflow-hidden flex flex-col border-[12px] border-slate-900 relative">
                <div className="h-10 bg-slate-900 flex items-center px-6 gap-2">
                   <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div></div>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-white p-12">
                   <div className="flex justify-between items-end mb-16">
                      <div>
                        <div className="px-3 py-1 bg-slate-100 border rounded-full text-[10px] font-black uppercase mb-4">{headerSettings.badgeText}</div>
                        <h2 className="text-7xl font-black text-slate-900 leading-[0.85] tracking-tighter">
                          {headerSettings.headingNormal}<span className="text-emerald-600">{headerSettings.headingHighlight}</span>
                        </h2>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 flex items-center gap-4">
                         <div className="bg-slate-900 p-3 rounded-xl text-white"><MessageSquare size={20} /></div>
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{headerSettings.contactTitle}</p>
                            <p className="text-sm font-black text-slate-900 flex items-center gap-1">{headerSettings.contactCta} <ArrowRight size={14}/></p>
                         </div>
                      </div>
                   </div>

                   <div className={`grid gap-8 ${viewMode === 'split' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      {faqs.map((faq, i) => (
                        <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                           <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">{faq.question}</h3>
                           <p className="text-slate-500 font-medium text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
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

export default FAQEditor;