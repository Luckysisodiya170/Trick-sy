import React from 'react';
import { MessageCircle, Headset, X } from 'lucide-react';

const FloatingActions = () => {
  const whatsappNumber = "+971XXXXXXXXX";
  const message = "Hi Tricksy! I need a quote for maintenance services.";

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      
      {/* WhatsApp Button */}
      <a 
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all hover:scale-110 active:scale-95"
      >
        <MessageCircle size={28} fill="currentColor" />
        {/* Tooltip */}
        <span className="absolute right-16 px-4 py-2 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp Us
        </span>
      </a>

      {/* Live Chat Button  */}
      <button 
        onClick={() => console.log("Open Live Chat")}
        className="group relative flex items-center justify-center w-14 h-14 bg-zinc-950 text-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-white/10 transition-all hover:scale-110 active:scale-95"
      >
        <Headset size={26} />
        <span className="absolute right-16 px-4 py-2 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Live Support
        </span>
      </button>

    </div>
  );
};

export default FloatingActions;