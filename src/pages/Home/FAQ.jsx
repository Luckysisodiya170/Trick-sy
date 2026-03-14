import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, Sparkles } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How much does cleaning cost?",
      answer: "Pricing depends on the area size and service type. We offer competitive flat rates for standard apartments and custom quotes for luxury villas."
    },
    {
      question: "How long does deep cleaning take?",
      answer: "Typically, a deep clean takes 4-6 hours depending on the property condition. Our team works efficiently to ensure every corner sparkles."
    },
    {
      question: "Do you provide free estimates?",
      answer: "Absolutely! We provide transparent, no-obligation estimates via WhatsApp or a quick site visit to give you the most accurate pricing."
    },
    {
      question: "How often should cleaning be done?",
      answer: "For Dubai homes, we recommend a professional deep clean every 3-4 months, with regular maintenance cleaning once or twice a week."
    }
  ];

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Static Content */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-primary-600 border border-slate-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Support</span>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Got <span className="text-primary-500">Questions?</span> <br/> We've Got Answers.
            </h2>
            
            <p className="text-slate-500 font-medium text-sm max-w-xs">
              Everything you need to know about our premium maintenance services in Dubai.
            </p>

            <div className="p-6 bg-slate-900 rounded-[2rem] text-white flex items-center justify-between group cursor-pointer hover:bg-primary-600 transition-all">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-400">Still confused?</p>
                <h4 className="font-bold">Chat with us now</h4>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform">
                <HelpCircle className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`group border transition-all duration-300 rounded-[1.5rem] overflow-hidden ${
                  openIndex === index 
                  ? 'bg-white border-primary-200 shadow-xl shadow-primary-500/5' 
                  : 'bg-transparent border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-6 text-left transition-all"
                >
                  <span className={`font-bold text-lg tracking-tight ${
                    openIndex === index ? 'text-primary-600' : 'text-slate-700'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    openIndex === index ? 'bg-primary-500 text-white rotate-180' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out px-6 overflow-hidden ${
                    openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-slate-500 text-sm leading-relaxed font-medium border-t border-slate-50 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;