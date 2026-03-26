import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Plus, Trash2, HelpCircle, 
  MessageSquare, ShieldCheck, Zap, Edit3, 
  Columns, Eye, Monitor, Type 
} from 'lucide-react';

const TechnicalFAQEditor = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('split'); 
  const [isSaving, setIsSaving] = useState(false);

  // Editable Header State
  const [header, setHeader] = useState({
    main: "Common",
    highlight: "Queries_"
  });

  const [faqs, setFaqs] = useState([
    { q: "How quickly can your team arrive?", a: "For emergencies, our rapid response team can be at your location within 45 minutes anywhere in Dubai." },
    { q: "Are your technicians certified?", a: "Yes, 100%. Every technician holds valid Dubai Municipality certifications." },
    { q: "Do you provide a warranty on repairs?", a: "Absolutely. We offer a standard 6-month warranty on all our technical repairs and installations." },
    { q: "Can I schedule a service for the weekend?", a: "Yes, our technical squad operates 24/7, including weekends and public holidays." }
  ]);

  const addFaq = () => setFaqs([...faqs, { q: "New Question?", a: "Enter the answer here." }]);
  const removeFaq = (index) => faqs.length > 1 && setFaqs(faqs.filter((_, i) => i !== index));
  const updateFaq = (index, field, value) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden text-slate-900">
      
      {/* --- NAVBAR --- */}
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

        <button onClick={() => { setIsSaving(true); setTimeout(() => setIsSaving(false), 1000); }} className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-extrabold text-xs flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg active:scale-95">
          <Save size={16} /> {isSaving ? 'SYNCING...' : 'PUBLISH FAQ'}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDE: EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-3xl mx-auto border-x' : 'w-full lg:w-[450px] border-r'} bg-white flex flex-col h-full shrink-0 z-20`}>
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              
              {/* Header Editor Section - INPUTS CONNECTED */}
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

              {/* Questions List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Questions List</h2>
                  <button onClick={addFaq} className="text-[10px] font-black text-emerald-600 uppercase flex items-center gap-1 hover:underline transition-all"><Plus size={12}/> Add Question</button>
                </div>
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-6 border border-slate-100 rounded-[2.5rem] bg-white hover:border-emerald-500 transition-all group relative shadow-sm">
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
            <div className="h-12 flex items-center px-6 bg-white border-b border-slate-200 shrink-0 z-10 shadow-sm">
              <div className="flex items-center gap-2">
                <Monitor size={14} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Desktop Preview</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar bg-slate-200/50">
              <div 
                className="transition-all duration-500 origin-top-left"
                style={{
                  transform: viewMode === 'split' ? 'scale(0.65)' : 'scale(1)',
                  width: viewMode === 'split' ? '153.8%' : '100%',
                  marginBottom: viewMode === 'split' ? '-20%' : '0'
                }}
              >
                <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-white min-h-[800px]">
                   
                   {/* PREVIEW HEADER CONNECTED TO STATE */}
                   <div className="text-center mb-20">
                      <h2 className="text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                        {header.main} <span className="text-emerald-500 italic underline decoration-slate-100 underline-offset-8">{header.highlight}</span>
                      </h2>
                   </div>

                   {/* FAQ Grid */}
                   <div className="grid grid-cols-2 gap-8 lg:gap-12">
                     {faqs.map((faq, i) => (
                       <div key={i} className="p-10 rounded-[3.5rem] bg-slate-50 border border-slate-100 hover:border-emerald-500/30 transition-all duration-500">
                          <div className="w-14 h-14 bg-white rounded-2xl mb-8 flex items-center justify-center text-emerald-500 shadow-sm border border-slate-50">
                            <MessageSquare size={24} />
                          </div>
                          <h4 className="text-2xl font-black text-slate-900 mb-4 leading-tight">{faq.q}</h4>
                          <p className="text-slate-500 text-base leading-relaxed font-medium">{faq.a}</p>
                       </div>
                     ))}
                   </div>

                   {/* Badges */}
                   <div className="mt-20 pt-10 border-t border-slate-100 flex justify-center gap-16">
                      <div className="flex items-center gap-3 opacity-60">
                        <ShieldCheck className="text-emerald-500" size={24} />
                        <span className="text-xs font-black uppercase text-slate-400 tracking-[0.2em]">Verified Support</span>
                      </div>
                      <div className="flex items-center gap-3 opacity-60">
                        <Zap className="text-emerald-500" size={24} />
                        <span className="text-xs font-black uppercase text-slate-400 tracking-[0.2em]">24/7 Response</span>
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