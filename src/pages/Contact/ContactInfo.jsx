import React from 'react';
import { 
  Phone, MessageSquareQuote, Mail, Clock, 
  MapPin, Globe, Link2 
} from 'lucide-react';

const iconMap = {
  Phone: Phone,
  MessageSquare: MessageSquareQuote, 
  Mail: Mail,
  Clock: Clock,
  MapPin: MapPin,
  Globe: Globe,
  Link2: Link2
};

const ContactInfo = ({ infoData }) => {
  
  const defaultInfo = [
    { id: 1, iconKey: "Phone", title: "Phone Support", info: "+971 50 123 4567", sub: "Toll-Free UAE", type: "call" },
    { id: 2, iconKey: "MessageSquare", title: "Chat on WhatsApp", info: "+971 50 123 4567", sub: "Instant Reply", type: "whatsapp" },
    { id: 3, iconKey: "Mail", title: "Email Address", info: "support@tricksy.com", sub: "Reply within 2 hours", type: "email" },
    { id: 4, iconKey: "Clock", title: "Working Hours", info: "08:00 AM - 08:00 PM", sub: "Mon - Sat (Sunday Emergency)", type: "time" }
  ];
  
  const displayData = infoData?.length ? infoData : defaultInfo;

  const getLinkProps = (item) => {
    const type = item.type || item.iconKey?.toLowerCase(); 
    const cleanInfo = item.info ? item.info.replace(/\s+/g, '') : '';
    
    if (type === 'call' || type === 'phone') {
      return { as: 'a', href: `tel:${cleanInfo}` };
    } 
    if (type === 'whatsapp' || type === 'messagesquare') {
      const waNumber = item.info ? item.info.replace(/\D/g, '') : '';
      return { as: 'a', href: `https://wa.me/${waNumber}`, target: "_blank", rel: "noreferrer" };
    } 
    if (type === 'email' || type === 'mail') {
      return { as: 'a', href: `mailto:${cleanInfo}` };
    }
    if (type === 'mappin') {
       return { as: 'a', href: `https://maps.google.com/?q=${encodeURIComponent(item.info)}`, target: "_blank", rel: "noreferrer" };
    }
    if (type === 'globe' || type === 'link2') {
       let url = cleanInfo.startsWith('http') ? cleanInfo : `https://${cleanInfo}`;
       return { as: 'a', href: url, target: "_blank", rel: "noreferrer" };
    }
    
    return { as: 'div' }; 
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-zinc-950 uppercase tracking-wide mb-2">Connect Directly</h2>
      
      {displayData.map((item) => {
        const { as: Component, ...linkProps } = getLinkProps(item);
        
        const IconComponent = item.iconKey ? iconMap[item.iconKey] : item.icon; 
        
        const SafeIcon = IconComponent || Phone; 
        
        return (
          <Component 
            key={item.id} 
            {...linkProps}
            className={`p-6 bg-white rounded-3xl group flex gap-5 items-center shadow-lg shadow-zinc-200/50 transition-all duration-300 border border-zinc-100 ${
              Component === 'a' ? 'hover:shadow-xl hover:shadow-emerald-200/50 hover:-translate-y-1 cursor-pointer' : ''
            }`}
          >
            <div className="w-16 h-16 shrink-0 bg-zinc-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-zinc-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <SafeIcon size={24} />
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