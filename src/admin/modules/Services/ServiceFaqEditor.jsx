import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { 
  Plus, Trash2, MessageCircleQuestion, Type, Loader2, Sparkles, 
  Edit3, Columns, Eye, ChevronDown, ChevronUp
} from 'lucide-react';

const ServiceFaqEditor = forwardRef(({ numericId }, ref) => {
  const dispatch = useDispatch();
  
  const content = useSelector((state) => state.adminData?.activeSubsection);
  const status = useSelector((state) => state.adminData?.status || '');

  const [viewMode, setViewMode] = useState('split');
  const [sectionHeader, setSectionHeader] = useState({ title: "", description: "" });
  const [faqs, setFaqs] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  
  const [openFaq, setOpenFaq] = useState(0); 
  const [activeIdx, setActiveIdx] = useState(null);

  useImperativeHandle(ref, () => ({
    handleAutoSave: async () => {
      return await handleSave();
    }
  }));

  useEffect(() => {
    if (numericId) { 
      dispatch(fetchSingleSubsectionContent(numericId)); 
    }
  }, [dispatch, numericId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0 && !hasLoaded) {
      if (content.id == numericId || content.subsectionId == numericId) {
        setSectionHeader({
          title: content.faqTitle ?? "Got Questions?",
          description: content.faqDesc ?? "" 
        });
        setFaqs(content.faqs || []);
        setHasLoaded(true);
      }
    }
  }, [content, numericId, hasLoaded]);

  const handleFaqChange = (index, field, value) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, { q: "", a: "" }]);
    setOpenFaq(faqs.length);  
  };

  const handleRemoveFaq = (index) => {
    setFaqs(faqs.filter((_, i) => i !== index));
    if (openFaq === index) setOpenFaq(-1);
  };

  const handleSave = async () => {
    if (!numericId) return false;
    setIsSaving(true);
    try {
      const payload = {
        faqTitle: sectionHeader.title,
        faqDesc: sectionHeader.description,
        faqs: faqs 
      };
      await dispatch(updateSingleSubsectionContent({ subsectionId: numericId, updateData: payload })).unwrap();
      await dispatch(fetchSingleSubsectionContent(numericId)).unwrap();
      return true;
    } catch (error) { 
      console.error("FAQ save failed:", error);
      return false; 
    } finally { 
      setIsSaving(false); 
    }
  };

  const safeText = (text) => text === '' ? '\u00A0' : text;

  if (status.includes('loading') && !hasLoaded) {
    return <div className="h-full flex items-center justify-center font-black text-slate-300 uppercase text-xs tracking-widest italic"><Loader2 className="animate-spin mr-2" size={14}/> Syncing FAQ Studio...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] overflow-hidden selection:bg-emerald-100">
      
      {/* TOOLBAR */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-emerald-50 rounded-xl"><MessageCircleQuestion size={18} className="text-emerald-600" /></div>
          <h2 className="hidden sm:block text-[13px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            FAQ <span className="text-emerald-400">Lab</span>
          </h2>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100 mx-2">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map(m => (
            <button key={m.id} onClick={() => setViewMode(m.id)} className={`flex items-center gap-1.5 px-5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${viewMode === m.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
              <m.icon size={12} /> <span className="hidden md:inline">{m.label}</span>
            </button>
          ))}
        </div>
        
        <button onClick={handleAddFaq} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg active:scale-95 disabled:opacity-50">
          <Plus size={14} /> Add FAQ
        </button>
      </div>

      <div className={`flex-1 transition-all duration-500 overflow-y-auto custom-scrollbar ${viewMode === 'split' ? 'grid grid-cols-1 xl:grid-cols-12 gap-0' : 'flex justify-center'}`}>
        
        {/* EDITOR SIDE */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-4 border-r border-slate-100' : 'w-full max-w-4xl p-8'} bg-white p-6 sm:p-8 space-y-8 h-full overflow-y-auto custom-scrollbar shadow-2xl shadow-slate-200/50 z-10`}>
            
            <div className="bg-slate-50/50 rounded-[2rem] border border-slate-100 p-8 shadow-inner space-y-6">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-[10px] uppercase tracking-widest border-b border-slate-100 pb-5">
                  <Sparkles size={14} className="text-emerald-500" /> FAQ Branding
              </h3>
              <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">Section Heading</label>
                  <input value={sectionHeader.title} onChange={e => setSectionHeader({...sectionHeader, title: e.target.value})} className="w-full p-4 bg-white border border-slate-100 rounded-xl font-bold text-slate-800 text-xs focus:border-emerald-400 outline-none transition-all shadow-sm"/>
              </div>
            </div>

            <div className="space-y-6 pb-20">
              <h3 className="font-black text-[10px] uppercase text-slate-400 ml-4 tracking-[0.2em]">Questions ({faqs.length})</h3>
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50/50 rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:border-emerald-200 transition-all relative animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <button onClick={() => handleRemoveFaq(idx)} className="absolute top-6 right-6 p-2 bg-white text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all shadow-sm">
                      <Trash2 size={14} />
                  </button>
                  
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                     <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center shadow-md shadow-emerald-500/30">{idx + 1}</span>
                     <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase">Q&A Module</span>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">The Question</label>
                      <input value={faq.q} onFocus={() => { setOpenFaq(idx); setActiveIdx(idx); }} onBlur={() => setActiveIdx(null)} onChange={e => handleFaqChange(idx, 'q', e.target.value)} placeholder="e.g. Do you provide same day service?" className="w-full p-4 bg-white border border-slate-100 rounded-xl font-bold text-slate-800 text-xs focus:border-emerald-400 outline-none transition-all shadow-sm" />
                    </div>

                    <div>
                      <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">The Answer</label>
                      <textarea rows="3" value={faq.a} onFocus={() => { setOpenFaq(idx); setActiveIdx(idx); }} onBlur={() => setActiveIdx(null)} onChange={e => handleFaqChange(idx, 'a', e.target.value)} placeholder="Write the response..." className="w-full p-4 bg-white border border-slate-100 rounded-xl text-xs font-medium text-slate-600 outline-none focus:border-emerald-400 h-24 resize-none transition-all shadow-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREVIEW PANEL */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-8 bg-slate-50 p-4 sm:p-12' : 'w-full p-4 sm:p-12 bg-slate-50'} flex items-start justify-center overflow-y-auto h-full relative`}>
             <div className="w-full max-w-[1000px] bg-white rounded-[3rem] shadow-2xl border-[10px] border-slate-900 overflow-hidden relative flex flex-col shrink-0 scale-[0.95] lg:scale-100 origin-top">
              
              <div className="h-8 bg-slate-900 flex items-center px-6 gap-2 shrink-0">
                  <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div><div className="w-2 h-2 rounded-full bg-amber-500"></div><div className="w-2 h-2 rounded-full bg-emerald-500"></div></div>
                  <div className="mx-auto w-48 h-4 bg-slate-800 rounded text-[6px] text-slate-500 flex items-center justify-center font-bold tracking-widest uppercase">tricksy-preview.io/faq</div>
              </div>

              <section className="py-24 px-6 sm:px-12 bg-[#FDFDFD] min-h-[80vh]">
                <h2 className="text-4xl md:text-5xl font-black text-zinc-950 mb-12 text-center tracking-tight">{safeText(sectionHeader.title)}</h2>
                
                <div className="space-y-4 max-w-[800px] mx-auto">
                  {faqs.map((faq, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                      className={`p-6 border-2 rounded-[2rem] cursor-pointer transition-all duration-300 ${
                        openFaq === idx 
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-md shadow-emerald-500/10' 
                        : activeIdx === idx ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-center gap-4">
                        <h4 className={`font-black text-lg transition-colors duration-300 ${openFaq === idx ? 'text-emerald-700' : 'text-zinc-900'}`}>{safeText(faq.q)}</h4>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === idx ? 'bg-emerald-500 text-white rotate-0' : 'bg-slate-100 text-slate-400'}`}>
                          {openFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">
                          {safeText(faq.a)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {faqs.length === 0 && (
                     <div className="py-20 text-center opacity-10 border-2 border-dashed border-slate-300 rounded-[3rem]">
                        <h3 className="text-2xl font-black italic uppercase">FAQ Preview Empty</h3>
                     </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 3px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }`}</style>
    </div>
  );
});

export default ServiceFaqEditor;