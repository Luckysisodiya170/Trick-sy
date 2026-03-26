import React from 'react';
import { HelpCircle, ArrowRight, MessageSquare } from 'lucide-react';

const FAQ = ({ faqData }) => {
  const defaultFaqs = [
    { question: "How much does cleaning cost?", answer: "We offer competitive flat rates for standard apartments and custom quotes for luxury villas. Pricing depends entirely on the area size and service type." },
    { question: "How long does deep cleaning take?", answer: "Typically, a deep clean takes 4-6 hours depending on the property's condition. Our team works efficiently to ensure every corner sparkles." },
    { question: "Do you provide free estimates?", answer: "Absolutely! We provide transparent, no-obligation estimates via WhatsApp or a quick site visit to give you the most accurate pricing." },
    { question: "How often should cleaning be done?", answer: "For Dubai homes, we recommend a professional deep clean every 3-4 months, with regular maintenance cleaning once or twice a week." }
  ];
  const faqsToDisplay = Array.isArray(faqData) && faqData.length > 0 ? faqData : defaultFaqs;

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-12 w-full">
        
        {/* header section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 font-bold text-[10px] uppercase tracking-[0.2em] mb-6 shadow-sm">
              <HelpCircle className="w-3.5 h-3.5 text-primary-500" />
              Support Center
            </div>
            
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              FAQ<span className="text-primary-500">.</span>
            </h2>
          </div>
          
          {/* Quick Contact Box */}
          <div className="bg-white p-4 lg:p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-slate-900 p-3 rounded-xl text-white">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Still unsure?</p>
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); console.log("Open Contact Chat API"); }} 
                className="text-sm font-black text-slate-900 flex items-center gap-1.5 hover:text-primary-600 transition-colors group"
              >
                Chat with our team <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {faqsToDisplay.map((faq, index) => (
            <div 
              key={faq?.id || `faq-item-${index}`} 
              className="bg-white p-8 lg:p-10 rounded-[2rem] border border-slate-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 group"
            >
              <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-primary-600 transition-colors leading-tight">
                {faq?.question || "Question Placeholder"}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {faq?.answer || "Answer placeholder. Content will load here from the API."}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;