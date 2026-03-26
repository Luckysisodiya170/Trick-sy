import React from 'react';
import { 
  Plus, Trash2, MessageCircleQuestion, Type, AlignLeft
} from 'lucide-react';

import ServiceDetail from '../../../pages/Services/ServiceDetail'; 

const ServiceFaqEditor = ({ fullServiceData, setFullServiceData }) => {

  if (!fullServiceData) return <div className="p-10 text-center animate-pulse text-slate-400">Loading...</div>;

  // --- HANDLERS ---
  const handleFaqChange = (index, field, value) => {
    const newFaqs = [...fullServiceData.faqs];
    newFaqs[index][field] = value;
    setFullServiceData({ ...fullServiceData, faqs: newFaqs });
  };

  const handleAddFaq = () => {
    setFullServiceData({
      ...fullServiceData,
      faqs: [
        ...(fullServiceData.faqs || []), 
        { q: "New Question?", a: "Write the answer to your new question here." }
      ]
    });
  };

  const handleRemoveFaq = (index) => {
    const newFaqs = [...fullServiceData.faqs];
    newFaqs.splice(index, 1);
    setFullServiceData({ ...fullServiceData, faqs: newFaqs });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      
      {/* LEFT SIDE: FORM */}
      <div className="w-full lg:w-[400px] space-y-6 shrink-0">
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight mb-1 flex items-center gap-2">
                <MessageCircleQuestion size={20} className="text-emerald-500" /> FAQ Items
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage common questions</p>
            </div>
            <button 
              onClick={handleAddFaq}
              className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-200 hover:scale-105 transition-all shadow-sm"
            >
              <Plus size={14} /> Add Q&A
            </button>
          </div>

          <div className="space-y-5">
            {fullServiceData.faqs?.map((faq, idx) => (
              <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl relative group transition-all hover:border-emerald-200 shadow-sm hover:shadow-md">
                
                <button 
                  onClick={() => handleRemoveFaq(idx)}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200 shadow-md opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
                >
                  <Trash2 size={14} />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center text-xs shrink-0 shadow-md shadow-emerald-500/30">
                    Q{idx + 1}
                  </div>
                  <div className="flex-1">
                     <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">
                      <Type size={12} /> Question
                    </label>
                    <input 
                      type="text" value={faq.q} onChange={(e) => handleFaqChange(idx, 'q', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all shadow-inner" 
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">
                    <AlignLeft size={12} /> Answer
                  </label>
                  <textarea 
                    value={faq.a} onChange={(e) => handleFaqChange(idx, 'a', e.target.value)} rows="3"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-600 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all shadow-inner resize-none leading-relaxed" 
                  ></textarea>
                </div>
              </div>
            ))}

            {(!fullServiceData.faqs || fullServiceData.faqs.length === 0) && (
              <div className="text-center p-8 bg-white border-2 border-dashed border-slate-200 rounded-2xl">
                <MessageCircleQuestion className="mx-auto text-slate-300 mb-3 w-8 h-8" />
                <p className="text-sm font-bold text-slate-500">No FAQs added yet.</p>
                <button onClick={handleAddFaq} className="mt-3 text-emerald-500 font-black text-xs uppercase tracking-widest hover:underline">Add the first question</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: LIVE PREVIEW */}
      <div className="flex-1 bg-slate-100 rounded-[2rem] overflow-hidden relative border-4 border-slate-200 shadow-inner h-[600px] overflow-y-auto">
         <div className="w-full min-h-full bg-white relative">
            <div className="pointer-events-none transform scale-90 origin-top">
               <ServiceDetail previewData={fullServiceData} previewSection="faq" />
            </div>
         </div>
      </div>

    </div>
  );
};

export default ServiceFaqEditor;