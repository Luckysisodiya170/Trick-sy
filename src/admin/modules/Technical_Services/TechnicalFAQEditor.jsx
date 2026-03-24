import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Plus, Trash2, HelpCircle, 
  MessageSquare, LayoutGrid, Zap, ShieldCheck 
} from 'lucide-react';

const TechnicalFAQEditor = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [faqs, setFaqs] = useState([
    { q: "How quickly can your team arrive?", a: "For emergencies, our rapid response team can be at your location within 45 minutes anywhere in Dubai." },
    { q: "Are your technicians certified?", a: "Yes, 100%. Every technician holds valid Dubai Municipality certifications and undergoes rigorous background checks." },
    { q: "Do you provide a warranty on repairs?", a: "Absolutely. We offer a standard 6-month warranty on all our technical repairs and installations." },
    { q: "Can I schedule a service for the weekend?", a: "Yes, our technical squad operates 24/7, including weekends and public holidays, at no extra premium charge." }
  ]);

  const addFaq = () => {
    setFaqs([...faqs, { q: "New Question?", a: "Enter the answer here." }]);
  };

  const removeFaq = (index) => {
    if (faqs.length > 1) {
      setFaqs(faqs.filter((_, i) => i !== index));
    }
  };

  const updateFaq = (index, field, value) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    alert("FAQ Section Published Successfully!");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col h-screen overflow-hidden text-slate-900">
      <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-slate-900">
            <ArrowLeft size={20} />
          </button>
          <div className="h-6 w-[1px] bg-slate-200"></div>
          <h1 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <HelpCircle size={18} className="text-emerald-500" /> FAQ Manager
          </h1>
        </div>
        <button onClick={handleSave} disabled={isSaving} className="bg-zinc-950 text-white px-8 py-2.5 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg active:scale-95">
          <Save size={14} /> {isSaving ? 'UPDATING...' : 'SAVE FAQ'}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[450px] border-r border-slate-200 bg-white overflow-y-auto p-8 space-y-6 custom-scrollbar">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Knowledge Base</h2>
            <button onClick={addFaq} className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-500 hover:text-white transition-all">
              <Plus size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 border border-slate-100 rounded-[2rem] bg-slate-50/50 hover:bg-white hover:border-emerald-200 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">Entry #{idx + 1}</span>
                  <button onClick={() => removeFaq(idx)} className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2 block">Question</label>
                    <input value={faq.q} onChange={(e) => updateFaq(idx, 'q', e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-sm font-bold outline-none focus:border-emerald-500 transition-all" />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2 block">Answer</label>
                    <textarea value={faq.a} onChange={(e) => updateFaq(idx, 'a', e.target.value)} rows="3" className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-[13px] font-medium text-slate-500 outline-none focus:border-emerald-500 resize-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center p-12 overflow-y-auto relative">
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
            Live Preview <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
          </div>
          
          <div className="w-full max-w-[900px] bg-white p-16 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-white">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
                Common <span className="text-emerald-500 italic">Queries_</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, i) => (
                <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-50/50 transition-all group duration-500">
                  <div className="w-10 h-10 bg-white rounded-xl mb-6 flex items-center justify-center text-emerald-500 shadow-sm group-hover:bg-zinc-950 transition-all">
                    <MessageSquare size={18} />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-3">{faq.q}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 flex gap-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-500" size={16} />
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Certified Answers</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="text-emerald-500" size={16} />
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Instant Updates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalFAQEditor;