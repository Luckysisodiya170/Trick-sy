import React from 'react';
import { Phone, Mail, Clock, MessageSquareQuote } from 'lucide-react';

const ContactInfo = ({ infoData }) => {
  
  const defaultInfo = [
    { id: 1, icon: <Phone/>, title: "Phone Support", info: "+971 50 123 4567", sub: "Toll-Free UAE", type: "call" },
    { id: 2, icon: <MessageSquareQuote/>, title: "Chat on WhatsApp", info: "+971 50 123 4567", sub: "Instant Reply", type: "whatsapp" },
    { id: 3, icon: <Mail/>, title: "Email Address", info: "support@tricksy.com", sub: "Reply within 2 hours", type: "email" },
    { id: 4, icon: <Clock/>, title: "Working Hours", info: "08:00 AM - 08:00 PM", sub: "Mon - Sat (Sunday Emergency)", type: "time" }
  ];
  const displayData = Array.isArray(infoData) && infoData.length > 0 ? infoData : defaultInfo;

  const getLinkProps = (type, info) => {
    const cleanInfo = info ? info.replace(/\s+/g, '') : '';
    
    switch(type) {
      case 'call': 
        return { as: 'a', href: `tel:${cleanInfo}` };
      case 'whatsapp': 
        const waNumber = info ? info.replace(/\D/g, '') : '';
        return { as: 'a', href: `https://wa.me/${waNumber}`, target: "_blank", rel: "noreferrer" };
      case 'email': 
        return { as: 'a', href: `mailto:${cleanInfo}` };
      default: 
        return { as: 'div' }; 
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-zinc-950 uppercase tracking-wide mb-2">Connect Directly</h2>
      
      {displayData.map((item) => {
        const { as: Component, ...linkProps } = getLinkProps(item.type, item.info);
        
        return (
          <Component 
            key={item.id} 
            {...linkProps}
            className={`p-6 bg-white rounded-3xl group flex gap-5 items-center shadow-lg shadow-zinc-200/50 transition-all duration-300 border border-zinc-100 ${
              Component === 'a' ? 'hover:shadow-xl hover:shadow-emerald-200/50 hover:-translate-y-1 cursor-pointer' : ''
            }`}
          >
            <div className="w-16 h-16 shrink-0 bg-zinc-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-zinc-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              {item.icon}
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{item.title}</h4>
              <p className="text-lg font-bold text-zinc-950 leading-tight mb-0.5">{item.info}</p>
              <p className="text-sm font-medium text-emerald-600">{item.sub}</p>
            </div>
          </Component>
        );
      })}
    </div>
  );
};

export default ContactInfo;