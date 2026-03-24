import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ServiceFaq = ({ serviceInfo }) => {
  const [openFaq, setOpenFaq] = useState(0);

  if (!serviceInfo || !serviceInfo.faqs) return null;

  return (
    <section className="py-24 bg-white border-t border-zinc-100">
      <div className="w-full max-w-[800px] mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-zinc-950 mb-12 text-center tracking-tight">Got Questions?</h2>
        <div className="space-y-4">
          {serviceInfo.faqs.map((faq, idx) => (
            <div 
              key={idx} 
              onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                openFaq === idx 
                ? 'border-emerald-500 bg-emerald-50/50 shadow-md' 
                : 'border-zinc-100 bg-white'
              }`}
            >
              <div className="flex justify-between items-center gap-4">
                <h4 className={`font-bold text-lg ${openFaq === idx ? 'text-emerald-700' : 'text-zinc-900'}`}>{faq.q}</h4>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === idx ? 'bg-emerald-500 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <p className="text-zinc-600 font-medium leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFaq;