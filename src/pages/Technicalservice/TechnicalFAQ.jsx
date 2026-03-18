import React from 'react';

const TechnicalFAQ = () => {
  const faqs = [
    { q: "How quickly can your team arrive?", a: "For emergencies, our rapid response team can be at your location within 45 minutes anywhere in Dubai." },
    { q: "Are your technicians certified?", a: "Yes, 100%. Every technician holds valid Dubai Municipality certifications and undergoes rigorous background checks." },
    { q: "Do you provide a warranty on repairs?", a: "Absolutely. We offer a standard 6-month warranty on all our technical repairs and installations." },
    { q: "Can I schedule a service for the weekend?", a: "Yes, our technical squad operates 24/7, including weekends and public holidays, at no extra premium charge." }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
            Common <span className="text-emerald-500 italic">Queries_</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-emerald-500/50 transition-colors">
              <h4 className="text-lg font-black text-slate-900 mb-3">{faq.q}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalFAQ;