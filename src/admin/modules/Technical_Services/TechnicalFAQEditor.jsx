import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent, fetchPageSections } from '../../redux/slices/adminSlice';
import { 
  ArrowLeft, Save, Plus, Trash2, HelpCircle, 
  MessageSquare, ShieldCheck, Zap, Edit3, 
  Columns, Eye, Monitor, Type, Loader2, Star, Award, Clock, Wrench, CheckCircle
} from 'lucide-react';

const TechnicalFAQEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const sidebarTree = useSelector((state) => state.adminData?.sidebarTree || []);
  const sections = useSelector((state) => state.adminData?.pageSections || []);
  const reduxContent = useSelector((state) => state.adminData?.activeSubsection);
  const status = useSelector((state) => state.adminData?.status || '');

  // Dynamic ID resolution
  const techSectionInfo = sidebarTree.find(sec => sec.slug === 'technical');
  const sectionId = techSectionInfo?.id || 4;

  const currentSection = sections.find(s => s.slug === 'tech-faq');
  const subsectionId = id || currentSection?.id || 27;

  const [viewMode, setViewMode] = useState('split'); 
  const [isSaving, setIsSaving] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const iconLibrary = {
    ShieldCheck: <ShieldCheck size={24} />,
    Zap: <Zap size={24} />,
    Star: <Star size={24} />,
    Award: <Award size={24} />,
    Clock: <Clock size={24} />,
    Wrench: <Wrench size={24} />,
    CheckCircle: <CheckCircle size={24} />,
  };

  const [header, setHeader] = useState({
    main: "Common",
    highlight: "Queries_"
  });

  const [badges, setBadges] = useState([
    { icon: 'ShieldCheck', text: 'Verified Support' },
    { icon: 'Zap', text: '24/7 Response' }
  ]);

  const defaultFaqs = [
    { q: "How quickly can your team arrive?", a: "For emergencies, our rapid response team can be at your location within 45 minutes anywhere in Dubai." },
    { q: "Are your technicians certified?", a: "Yes, 100%. Every technician holds valid Dubai Municipality certifications." },
    { q: "Do you provide a warranty on repairs?", a: "Absolutely. We offer a standard 6-month warranty on all our technical repairs and installations." },
    { q: "Can I schedule a service for the weekend?", a: "Yes, our technical squad operates 24/7, including weekends and public holidays." }
  ];

  const [faqs, setFaqs] = useState(defaultFaqs);

  useEffect(() => {
    if (sections.length === 0) {
      dispatch(fetchPageSections(sectionId));
    }
  }, [dispatch, sections.length, sectionId]);

  useEffect(() => {
    if (subsectionId) {
      dispatch(fetchSingleSubsectionContent(subsectionId));
    }
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (reduxContent && Object.keys(reduxContent).length > 0 && !hasLoaded) {
      if (reduxContent.id == subsectionId || reduxContent.subsectionId == subsectionId) {
        setHeader({
          main: reduxContent.titleLine1 ?? "Common",
          highlight: reduxContent.titleHighlight ?? "Queries_"
        });

        if (reduxContent.description) {
          try {
            const parsedBadges = JSON.parse(reduxContent.description);
            if (Array.isArray(parsedBadges)) {
              setBadges(parsedBadges);
            }
          } catch (e) {
            console.error("Failed to parse badges data", e);
          }
        }

        const fetchedFaqs = reduxContent.listItems?.length > 0 
          ? reduxContent.listItems.map((item, i) => ({
              id: item.id || Date.now() + i,
              dbId: item.id,
              q: item.itemTitle ?? '',
              a: item.itemDescription ?? ''
            }))
          : defaultFaqs;

        setFaqs(fetchedFaqs);
        setHasLoaded(true);
      }
    }
  }, [reduxContent, subsectionId, hasLoaded]);

  const addFaq = () => setFaqs([...faqs, { id: Date.now(), q: "", a: "" }]);
  const removeFaq = (index) => faqs.length > 1 && setFaqs(faqs.filter((_, i) => i !== index));
  
  const updateFaq = (index, field, value) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const handleSave = async () => {
    if (!subsectionId) {
      alert("Error: Missing Subsection ID.");
      return;
    }

    setIsSaving(true);
    try {
      const listItemsPayload = faqs.map((faq, index) => ({
        id: faq.dbId || undefined,
        itemTitle: faq.q,
        itemDescription: faq.a,
        itemOrder: index + 1
      }));

      const payload = {
        titleLine1: header.main,
        titleHighlight: header.highlight,
        description: JSON.stringify(badges), 
        listItems: listItemsPayload
      };

      await dispatch(updateSingleSubsectionContent({
        subsectionId: subsectionId,
        updateData: payload
      })).unwrap();

      await dispatch(fetchSingleSubsectionContent(subsectionId)).unwrap();
      navigate('/admin/pages/technical');

      alert("FAQ Module Deployed Successfully! 🚀");
    } catch (error) {
      console.error(error);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const safeText = (text) => text === '' ? '\u00A0' : text;

  if (status.includes('loading') && !hasLoaded) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest text-xs bg-[#F8FAFC]">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING FAQ LAB...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden text-slate-900 selection:bg-emerald-100">
      
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><ArrowLeft size={18} /></button>
          <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>
          <h1 className="text-lg font-black tracking-tighter italic flex items-center gap-1.5">
            <HelpCircle size={18} className="text-emerald-600" /> <span className="uppercase text-slate-800">FAQ LAB</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-200 shadow-inner">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button 
              key={mode.id} 
              onClick={() => setViewMode(mode.id)} 
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <mode.icon size={14} /> <span className="hidden md:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave} disabled={isSaving}
          className="bg-slate-900 text-white px-8 py-2.5 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg active:scale-95 disabled:opacity-70"
        >
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
          {isSaving ? 'DEPLOYING...' : 'DEPLOY'}
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-700 h-[calc(100vh-64px)] flex ${viewMode === 'split' ? 'flex-row' : 'flex-col'} overflow-hidden w-full`}>
        
        {/* LEFT SIDE: EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-4/12 border-r border-slate-100' : 'w-full max-w-4xl mx-auto mt-8 border rounded-[2rem]'} bg-white flex flex-col h-full shrink-0 z-20 shadow-2xl shadow-slate-200/50 transition-all duration-300`}>
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 custom-scrollbar">
              
              <div className="p-6 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 shadow-inner space-y-4">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Type size={12}/> Title Config</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 ml-1">Main Text</label>
                    <input value={header.main} onChange={(e) => setHeader({...header, main: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm" placeholder="Common" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 ml-1">Highlight</label>
                    <input value={header.highlight} onChange={(e) => setHeader({...header, highlight: e.target.value})} className="w-full px-4 py-2.5 bg-emerald-50/50 border border-emerald-100 text-emerald-600 rounded-xl font-bold text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm" placeholder="Queries_" />
                  </div>
                </div>
              </div>

              {/* Editable Badges Section */}
              <div className="p-6 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 shadow-inner space-y-4">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><ShieldCheck size={12}/> Trust Badges (Footer)</div>
                <div className="grid grid-cols-1 gap-4">
                  {badges.map((badge, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-400 ml-1">Badge {idx + 1}</label>
                      <div className="flex gap-2">
                        <select 
                          value={badge.icon} 
                          onChange={(e) => {
                            const newB = [...badges]; newB[idx].icon = e.target.value; setBadges(newB);
                          }} 
                          className="bg-white border border-slate-100 rounded-xl px-2 text-slate-600 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs font-bold shadow-sm"
                        >
                          {Object.keys(iconLibrary).map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                        <input 
                          value={badge.text} 
                          onChange={(e) => {
                            const newB = [...badges]; newB[idx].text = e.target.value; setBadges(newB);
                          }} 
                          className="flex-1 px-4 py-2 bg-white border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm transition-all" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Questions List</h2>
                  <button onClick={addFaq} className="text-[10px] font-black text-emerald-600 uppercase flex items-center gap-1 hover:underline transition-all"><Plus size={12}/> Add Question</button>
                </div>
                {faqs.map((faq, idx) => (
                  <div key={faq.id || idx} className="p-6 border border-slate-100 rounded-[2.5rem] bg-white hover:border-emerald-500 transition-all group relative shadow-sm">
                    <button onClick={() => removeFaq(idx)} className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                    <div className="space-y-4">
                      <input value={faq.q} onChange={(e) => updateFaq(idx, 'q', e.target.value)} className="w-full px-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:bg-white focus:ring-1 focus:ring-emerald-500 transition-all" placeholder="Question" />
                      <textarea value={faq.a} onChange={(e) => updateFaq(idx, 'a', e.target.value)} rows="2" className="w-full px-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-medium text-slate-500 outline-none focus:bg-white focus:ring-1 focus:ring-emerald-500 resize-none transition-all" placeholder="Answer" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RIGHT SIDE: PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-8/12' : 'w-full'} bg-slate-50 flex flex-col items-center justify-center p-8 relative overflow-hidden`}>
            
            <div className="w-full max-w-[1200px] h-full bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 flex flex-col overflow-hidden">
                
                {/* Browser bar */}
                <div className="flex h-8 bg-slate-900 items-center px-4 gap-1.5 border-b border-slate-800/50 shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  </div>
                  <div className="mx-auto w-64 h-5 bg-slate-800 rounded-full text-[6px] text-slate-500 flex items-center justify-center font-bold uppercase tracking-widest">
                    tricksy-tech.io/faq
                  </div>
                </div>

                <div className="relative bg-[#f1f5f9] flex flex-col h-full overflow-y-auto custom-scrollbar">
                  
                  {/* PREVIEW CONTAINER */}
                  <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-white m-4 lg:m-8">
                      
                      <div className="text-center mb-20">
                        <h2 className="text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                          {safeText(header.main)} <span className="text-emerald-500 italic underline decoration-slate-100 underline-offset-8">{safeText(header.highlight)}</span>
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {faqs.map((faq, i) => (
                          <div key={faq.id || i} className="p-10 rounded-[3.5rem] bg-slate-50 border border-slate-100 hover:border-emerald-500/30 transition-all duration-500">
                            <div className="w-14 h-14 bg-white rounded-2xl mb-8 flex items-center justify-center text-emerald-500 shadow-sm border border-slate-50">
                              <MessageSquare size={24} />
                            </div>
                            <h4 className="text-2xl font-black text-slate-900 mb-4 leading-tight">{safeText(faq.q)}</h4>
                            <p className="text-slate-500 text-base leading-relaxed font-medium">{safeText(faq.a)}</p>
                          </div>
                        ))}
                      </div>

                      {/* DYNAMIC BADGES */}
                      <div className="mt-20 pt-10 border-t border-slate-100 flex justify-center gap-16">
                        {badges.map((badge, idx) => (
                          <div key={idx} className="flex items-center gap-3 opacity-60">
                            <div className="text-emerald-500">
                              {iconLibrary[badge.icon] || <ShieldCheck size={24} />}
                            </div>
                            <span className="text-xs font-black uppercase text-slate-400 tracking-[0.2em]">{safeText(badge.text)}</span>
                          </div>
                        ))}
                      </div>
                  </div>
                  
                </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default TechnicalFAQEditor;