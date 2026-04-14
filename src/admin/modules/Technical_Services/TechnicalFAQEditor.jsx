import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent, fetchSections } from '../../../store/index';
import { 
  ArrowLeft, Save, Plus, Trash2, HelpCircle, 
  MessageSquare, ShieldCheck, Zap, Edit3, 
  Columns, Eye, Monitor, Type, Loader2, Star, Award, Clock, Wrench, CheckCircle
} from 'lucide-react';

const TechnicalFAQEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const sections = useSelector((state) => state.sections.items);
  const reduxContent = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const currentSection = sections.find(s => s.slug === 'tech-faq');
  const subsectionId = id || currentSection?.id || 27;

  const [viewMode, setViewMode] = useState('split'); 
  const [isSaving, setIsSaving] = useState(false);

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
      dispatch(fetchSections(4));
    }
  }, [dispatch, sections.length]);

  useEffect(() => {
    if (subsectionId) {
      dispatch(fetchSingleSubsectionContent(subsectionId));
    }
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (reduxContent && Object.keys(reduxContent).length > 0) {
      setHeader({
        main: reduxContent.titleLine1 || "Common",
        highlight: reduxContent.titleHighlight || "Queries_"
      });

      if (reduxContent.description) {
        try {
          const parsedBadges = JSON.parse(reduxContent.description);
          if (Array.isArray(parsedBadges)) {
            setBadges(parsedBadges);
          }
        } catch (e) {
          console.error("Failed to parse badges data");
        }
      }

      const fetchedFaqs = reduxContent.listItems?.length > 0 
        ? reduxContent.listItems.map((item, i) => ({
            id: item.id || Date.now() + i,
            dbId: item.id,
            q: item.itemTitle || '',
            a: item.itemDescription || ''
          }))
        : defaultFaqs;

      setFaqs(fetchedFaqs);
    }
  }, [reduxContent]);

  const addFaq = () => setFaqs([...faqs, { id: Date.now(), q: "New Question?", a: "Enter the answer here." }]);
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

      alert("FAQ Module Updated Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' && !reduxContent) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest text-xs bg-[#F8FAFC]">
        <Loader2 className="animate-spin mr-2" size={16} /> Loading FAQ CMS...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden text-slate-900">
      
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><ArrowLeft size={18} /></button>
          <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>
          <h1 className="text-lg font-black tracking-tighter italic flex items-center gap-1.5">
            <HelpCircle size={18} className="text-emerald-600" /> <span className="uppercase text-slate-800">FAQ MANAGER</span>
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}>
              <mode.icon size={14} /> {mode.label}
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave} disabled={isSaving}
          className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-extrabold text-xs flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg active:scale-95 disabled:opacity-70"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
          {isSaving ? 'SYNCING...' : 'PUBLISH FAQ'}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDE: EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-3xl mx-auto border-x' : 'w-full lg:w-[450px] border-r'} bg-white flex flex-col h-full shrink-0 z-20`}>
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              
              <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Type size={12}/> Title Config</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 ml-1">Main Text</label>
                    <input value={header.main} onChange={(e) => setHeader({...header, main: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm outline-none focus:border-emerald-500" placeholder="Common" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 ml-1">Highlight</label>
                    <input value={header.highlight} onChange={(e) => setHeader({...header, highlight: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-emerald-100 text-emerald-600 rounded-xl font-bold text-sm outline-none focus:border-emerald-500" placeholder="Queries_" />
                  </div>
                </div>
              </div>

              {/* NEW: Editable Badges Section */}
              <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
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
                          className="bg-white border border-slate-200 rounded-xl px-2 text-slate-600 outline-none focus:border-emerald-500 text-xs font-bold"
                        >
                          {Object.keys(iconLibrary).map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                        <input 
                          value={badge.text} 
                          onChange={(e) => {
                            const newB = [...badges]; newB[idx].text = e.target.value; setBadges(newB);
                          }} 
                          className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-xs outline-none focus:border-emerald-500" 
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
          <div className={`${viewMode === 'preview' ? 'w-full' : 'flex-1'} flex flex-col h-full bg-[#f1f5f9] transition-all duration-300 relative`}>
            
            <div className="h-12 flex items-center justify-center px-6 bg-white border-b border-slate-200 shrink-0 z-10 shadow-sm">
              <div className="flex items-center gap-2">
                <Monitor size={14} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Desktop Preview</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar bg-slate-200/50 overflow-x-hidden">
              
              {/* SCALING TRICK FOR SPLIT VIEW */}
              <div 
                className="transition-all duration-500 origin-top-left"
                style={{
                  transform: viewMode === 'split' ? 'scale(0.65)' : 'scale(1)',
                  width: viewMode === 'split' ? '153.8%' : '100%',
                  marginBottom: viewMode === 'split' ? '-25%' : '0'
                }}
              >
                {/* BEAUTIFUL DARK BROWSER FRAME */}
                <div className="w-full max-w-[1400px] mx-auto bg-slate-900 rounded-[2.5rem] border-[10px] border-slate-900 shadow-2xl overflow-hidden relative">
                  
                  <div className="h-10 bg-slate-800 flex items-center px-6 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                    </div>
                    <div className="mx-auto w-64 h-5 bg-slate-700 rounded-md text-[9px] text-slate-500 flex items-center justify-center font-bold uppercase tracking-widest">
                      tricksy-preview.io
                    </div>
                  </div>

                  <div className="relative bg-[#f1f5f9] flex flex-col">
                    
                    {/* Floating Action Menu */}
                    <div className="absolute top-6 right-6 z-[100] flex gap-3 opacity-0 hover:opacity-100 transition-all duration-300">
                      <button onClick={() => setViewMode('edit')} className="flex items-center gap-2 bg-white/50 hover:bg-white backdrop-blur-md border border-slate-200 text-slate-700 px-4 py-2 rounded-full shadow-lg transition-all">
                        <Edit3 size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Edit Content</span>
                      </button>
                      {viewMode !== 'split' && (
                        <button onClick={() => setViewMode('split')} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-full shadow-lg shadow-emerald-500/30 transition-all">
                          <Columns size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Split View</span>
                        </button>
                      )}
                    </div>

                    {/* PREVIEW CONTAINER */}
                    <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-white m-4 lg:m-8">
                       
                       <div className="text-center mb-20">
                          <h2 className="text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                            {header.main} <span className="text-emerald-500 italic underline decoration-slate-100 underline-offset-8">{header.highlight}</span>
                          </h2>
                       </div>

                       <div className="grid grid-cols-2 gap-8 lg:gap-12">
                         {faqs.map((faq, i) => (
                           <div key={faq.id || i} className="p-10 rounded-[3.5rem] bg-slate-50 border border-slate-100 hover:border-emerald-500/30 transition-all duration-500">
                              <div className="w-14 h-14 bg-white rounded-2xl mb-8 flex items-center justify-center text-emerald-500 shadow-sm border border-slate-50">
                                <MessageSquare size={24} />
                              </div>
                              <h4 className="text-2xl font-black text-slate-900 mb-4 leading-tight">{faq.q}</h4>
                              <p className="text-slate-500 text-base leading-relaxed font-medium">{faq.a}</p>
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
                              <span className="text-xs font-black uppercase text-slate-400 tracking-[0.2em]">{badge.text}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalFAQEditor;