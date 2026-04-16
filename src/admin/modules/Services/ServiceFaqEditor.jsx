import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../../store/index'; 
import { 
  Plus, Trash2, MessageCircleQuestion, Type, AlignLeft, Loader2, Sparkles, 
  Edit3, Columns, Eye, ChevronDown, ChevronUp, Layout
} from 'lucide-react';

const ServiceFaqEditor = forwardRef(({ numericId }, ref) => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const [viewMode, setViewMode] = useState('split');
  const [sectionHeader, setSectionHeader] = useState({ title: "", description: "" });
  const [faqs, setFaqs] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  
  const [openFaq, setOpenFaq] = useState(0); 
  const [activeIdx, setActiveIdx] = useState(null);

  useImperativeHandle(ref, () => ({
    handleAutoSave: async () => {
      return await handleSave();
    }
  }));

  useEffect(() => {
    if (numericId) { dispatch(fetchSingleSubsectionContent(numericId)); }
  }, [dispatch, numericId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setSectionHeader({
        title: content.faqTitle || "Got Questions?",
        description: content.faqDesc || "" 
      });
      setFaqs(content.faqs || []);
    }
  }, [content]);

  const handleFaqChange = (index, field, value) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, { q: "New Question?", a: "Enter detailed answer here." }]);
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
      return true;
    } catch (error) { 
      console.error("FAQ save failed:", error);
      return false; 
    } finally { 
      setIsSaving(false); 
    }
  };

  if (status === 'loading' && (!content || Object.keys(content).length === 0)) {
    return <div className="h-full flex items-center justify-center font-black text-slate-300 uppercase text-xs tracking-widest italic">Syncing FAQ Studio...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden">
      
      {/* TOOLBAR */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-emerald-50 rounded-xl"><MessageCircleQuestion size={22} className="text-emerald-600" /></div>
          <h2 className="hidden sm:block text-base font-black text-slate-900 uppercase tracking-tight">FAQ Studio</h2>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-2xl shadow-inner mx-2">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map(m => (
            <button key={m.id} onClick={() => setViewMode(m.id)} className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all duration-300 ${viewMode === m.id ? 'bg-white text-emerald-600 shadow-sm scale-105' : 'text-slate-500 hover:text-slate-700'}`}>
              <m.icon size={14} /> <span className="hidden md:inline">{m.label}</span>
            </button>
          ))}
        </div>
        
        <button onClick={handleAddFaq} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-lg active:scale-95">
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      <div className={`flex-1 transition-all duration-500 overflow-y-auto custom-scrollbar ${viewMode === 'split' ? 'grid grid-cols-1 xl:grid-cols-12 gap-0' : 'flex justify-center'}`}>
        
        {/* EDITOR SIDE */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-4 border-r border-slate-200' : 'w-full max-w-4xl p-8'} bg-[#F8FAFC] p-6 sm:p-8 space-y-8 h-full overflow-y-auto custom-scrollbar`}>
            
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-xs uppercase tracking-tight border-b pb-5">
                  <Sparkles size={18} className="text-emerald-500" /> FAQ Branding
              </h3>
              <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">Section Heading</label>
                  <input value={sectionHeader.title} onChange={e => setSectionHeader({...sectionHeader, title: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-800 text-sm focus:bg-white focus:border-emerald-400 outline-none transition-all shadow-inner"/>
              </div>
            </div>

            <div className="space-y-6 pb-20">
              <h3 className="font-black text-[10px] uppercase text-slate-400 ml-4 tracking-[0.2em]">Questions ({faqs.length})</h3>
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all relative animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <button onClick={() => handleRemoveFaq(idx)} className="absolute top-6 right-6 p-2 bg-slate-50 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all">
                      <Trash2 size={16} />
                  </button>
                  
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
                     <span className="w-8 h-8 rounded-lg bg-emerald-500 text-white text-[12px] font-black flex items-center justify-center shadow-md shadow-emerald-100">{idx + 1}</span>
                     <span className="text-[10px] font-black text-slate-900 uppercase">Q&A Module</span>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">The Question</label>
                      <input value={faq.q} onFocus={() => { setOpenFaq(idx); setActiveIdx(idx); }} onBlur={() => setActiveIdx(null)} onChange={e => handleFaqChange(idx, 'q', e.target.value)} placeholder="e.g. Do you provide same day service?" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-800 text-sm focus:bg-white focus:border-emerald-400 outline-none transition-all shadow-inner" />
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">The Answer</label>
                      <textarea rows="3" value={faq.a} onFocus={() => { setOpenFaq(idx); setActiveIdx(idx); }} onBlur={() => setActiveIdx(null)} onChange={e => handleFaqChange(idx, 'a', e.target.value)} placeholder="Write the response..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-slate-600 outline-none focus:bg-white focus:border-emerald-400 h-24 resize-none transition-all shadow-inner" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREVIEW PANEL (EXACT USER DESIGN) */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-8 bg-[#F1F5F9] p-4 sm:p-12' : 'w-full p-4 sm:p-12'} flex items-start justify-center overflow-y-auto h-full`}>
             <div className="w-full max-w-[900px] bg-white rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border-8 border-slate-900 overflow-hidden relative flex flex-col shrink-0 scale-[0.95] lg:scale-100 origin-top">
              
              <div className="h-10 bg-slate-900 flex items-center px-6 gap-2 shrink-0">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div></div>
                  <div className="mx-auto w-48 h-4 bg-slate-800 rounded text-[8px] text-slate-500 flex items-center justify-center font-bold tracking-widest uppercase">tricksy-preview.io/faq</div>
              </div>

              <section className="py-24 px-6 sm:px-12 bg-white min-h-full">
                <h2 className="text-4xl md:text-5xl font-black text-zinc-950 mb-12 text-center tracking-tight">{sectionHeader.title}</h2>
                
                <div className="space-y-4 max-w-[800px] mx-auto">
                  {faqs.map((faq, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                        openFaq === idx 
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-md' 
                        : activeIdx === idx ? 'border-emerald-300 bg-emerald-50/20' : 'border-zinc-100 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center gap-4">
                        <h4 className={`font-bold text-lg transition-colors duration-300 ${openFaq === idx ? 'text-emerald-700' : 'text-zinc-900'}`}>{faq.q || "Untitled Question"}</h4>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === idx ? 'bg-emerald-500 text-white rotate-0' : 'bg-zinc-100 text-zinc-500'}`}>
                          {openFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                        <p className="text-zinc-600 font-medium leading-relaxed">
                          {faq.a || "No answer provided yet."}
                        </p>
                      </div>
                    </div>
                  ))}

                  {faqs.length === 0 && (
                     <div className="py-20 text-center opacity-10 border-2 border-dashed border-slate-300 rounded-[3rem]">
                        <h3 className="text-4xl font-black italic uppercase">FAQ Preview Empty</h3>
                     </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 5px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }`}</style>
    </div>
  );
});

export default ServiceFaqEditor;