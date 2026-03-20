import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Trash2, Settings2, HelpCircle, 
  MessageSquare, ArrowRight, ChevronDown, Type, Save,
  List, Eye, Edit3, Columns
} from 'lucide-react';

const FAQEditor = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null); 
  const [viewMode, setViewMode] = useState('split'); 

  const [headerSettings, setHeaderSettings] = useState({
    badgeText: "Support Center",
    headingNormal: "Frequently Asked",
    headingHighlight: "Questions",
    contactTitle: "Still have doubts?",
    contactCta: "Talk to our experts"
  });

  const [faqs, setFaqs] = useState([
    { id: 1, question: "How much does cleaning cost?", answer: "We offer competitive flat rates for standard apartments and custom quotes for luxury villas. Pricing depends entirely on the area size and service type." },
    { id: 2, question: "How long does deep cleaning take?", answer: "Typically, a deep clean takes 4-6 hours depending on the property's condition. Our team works efficiently to ensure every corner sparkles." },
  ]);

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

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
      
      {/* --- NAVBAR --- */}
       <nav className="sticky top-0 z-[20] bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 w-1/4 sm:w-1/3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic">
            <Settings2 size={20} className="text-purple-600" /> FAQ <span className="text-purple-500">LAB</span>
          </h1>
        </div>

        {/* 3-Way View Mode Toggle */}
        <div className="flex bg-slate-100 p-1 sm:p-1.5 rounded-full shadow-inner w-auto justify-center">
          <button 
            onClick={() => setViewMode('edit')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'edit' ? 'bg-white shadow-md text-purple-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Edit3 size={14} className="hidden sm:block" /> Edit
          </button>
          <button 
            onClick={() => setViewMode('split')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'split' ? 'bg-white shadow-md text-purple-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Columns size={14} className="hidden sm:block" /> Split
          </button>
          <button 
            onClick={() => setViewMode('preview')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'preview' ? 'bg-white shadow-md text-purple-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Eye size={14} className="hidden sm:block" /> Preview
          </button>
        </div>

        <div className="w-1/4 sm:w-1/3 flex justify-end">
          <button className="bg-slate-900 text-white px-4 sm:px-8 py-2.5 rounded-full font-extrabold text-[10px] sm:text-xs flex items-center gap-2 shadow-lg hover:bg-purple-600 transition-all hover:-translate-y-0.5">
            <Save size={14} className="hidden sm:block" /> Deploy
          </button>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        
        {/* --- EDITOR PANEL --- */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-[42%] border-r' : 'w-full'} overflow-y-auto p-8 lg:p-12 bg-[#F8FAFC] custom-scrollbar`}>
            <div className={`${viewMode === 'split' ? 'w-full' : 'max-w-5xl'} mx-auto space-y-8`}>
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Configuration</h2>
                  <p className="text-slate-500 text-sm font-medium">Update your FAQ section content and style.</p>
                </div>
                <button onClick={handleAddFaq} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-900 transition-all shadow-md active:scale-90">
                  <Plus size={16} /> ADD NEW QUESTION
                </button>
              </div>

              {/* Header Settings */}
              <section className="bg-white p-6 lg:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 mb-6 flex items-center gap-2">
                  <Settings2 size={16} /> Global Header Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Main Heading</label>
                      <input value={headerSettings.headingNormal} onChange={(e) => updateHeader('headingNormal', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-emerald-100 focus:bg-white transition-all" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Highlight Text</label>
                      <input value={headerSettings.headingHighlight} onChange={(e) => updateHeader('headingHighlight', e.target.value)} className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 text-emerald-700 rounded-xl text-sm font-black outline-none focus:ring-2 ring-emerald-200 focus:bg-white transition-all" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Badge Text</label>
                      <input value={headerSettings.badgeText} onChange={(e) => updateHeader('badgeText', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-emerald-100 focus:bg-white transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <div>
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">CTA Title</label>
                         <input value={headerSettings.contactTitle} onChange={(e) => updateHeader('contactTitle', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium outline-none" />
                       </div>
                       <div>
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">CTA Button</label>
                         <input value={headerSettings.contactCta} onChange={(e) => updateHeader('contactCta', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium outline-none" />
                       </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Questions Manager Cards */}
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className={`bg-white rounded-[1.8rem] border transition-all duration-300 ${activeCard === faq.id ? 'ring-4 ring-emerald-50 border-emerald-200 shadow-xl' : 'border-slate-200 hover:border-slate-300'}`}>
                    <div onClick={() => setActiveCard(activeCard === faq.id ? null : faq.id)} className="p-5 lg:p-6 flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all ${activeCard === faq.id ? 'bg-emerald-600 text-white rotate-6' : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500'}`}>
                          <List size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{faq.question || 'New Question Added'}</h4>
                          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.15em] mt-1">Status: Live</p>
                        </div>
                      </div>
                      <ChevronDown size={20} className={`text-slate-300 transition-transform duration-300 ${activeCard === faq.id ? 'rotate-180 text-emerald-500' : ''}`} />
                    </div>

                    {activeCard === faq.id && (
                      <div className="px-6 lg:px-10 pb-8 pt-2 space-y-6 border-t border-slate-50 animate-in fade-in slide-in-from-top-2">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                          <div className="md:col-span-12">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">The Question</label>
                            <input value={faq.question} onChange={(e) => updateFaq(faq.id, 'question', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-emerald-100 focus:bg-white transition-all shadow-inner" placeholder="Enter question..." />
                          </div>
                          <div className="md:col-span-12">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Detailed Answer</label>
                            <textarea value={faq.answer} onChange={(e) => updateFaq(faq.id, 'answer', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm h-32 resize-none outline-none focus:ring-2 ring-emerald-100 focus:bg-white transition-all shadow-inner leading-relaxed" placeholder="Enter answer..." />
                          </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                          <button onClick={() => setFaqs(faqs.filter(x => x.id !== faq.id))} className="px-6 py-2.5 rounded-xl text-[10px] font-black text-rose-500 bg-rose-50 hover:bg-rose-100 transition-colors tracking-widest uppercase">
                            Delete FAQ
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- PREVIEW --- */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-[58%]' : 'w-full'} bg-slate-200 p-6 flex items-center justify-center`}>
            <div className="w-full h-full bg-white shadow-2xl rounded-[3rem] overflow-hidden flex flex-col border-[10px] border-slate-900">
                <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2 shrink-0">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-white p-12">
                   <div className="max-w-4xl mx-auto">
                      <div className="mb-12">
                         <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">{headerSettings.badgeText}</span>
                         <h2 className="text-6xl font-black text-slate-900 mt-6 tracking-tighter leading-none">
                           {headerSettings.headingNormal} <span className="text-emerald-600">{headerSettings.headingHighlight}</span>
                         </h2>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        {faqs.map(f => (
                          <div key={f.id} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
                             <h3 className="text-xl font-black mb-3">{f.question}</h3>
                             <p className="text-slate-500 text-sm leading-relaxed">{f.answer}</p>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default FAQEditor;