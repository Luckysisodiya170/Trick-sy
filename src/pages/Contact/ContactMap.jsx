// src/pages/Contact/ContactMap.jsx
import React from 'react';
import { Navigation } from 'lucide-react';

// 🔥 PRODUCTION SAFE: Props accept karega, aur data na hone par safely fallback karega.
const ContactMap = ({ mapConfig }) => {
  
  // Safe Fallback Data (Business Bay, Dubai ka real working map link)
  const defaultEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14442.888562725801!2d55.2631326!3d25.1822453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682c201e5201%3A0x6a2c286dce81e649!2sBusiness%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1710660000000!5m2!1sen!2sin";
  
  const defaultDirectionUrl = "https://www.google.com/maps/dir//Business+Bay+-+Dubai+-+United+Arab+Emirates/";

  // Dynamic values assign kar rahe hain (Agar backend se mapConfig aayega toh wo use hoga, warna default)
  const embedSrc = mapConfig?.embedUrl || defaultEmbedUrl;
  const directionHref = mapConfig?.directionUrl || defaultDirectionUrl;

  return (
    <section className="pb-24 px-6 relative w-full max-w-[1400px] mx-auto">
      <div className="w-full h-[500px] rounded-[2.5rem] border-4 border-white shadow-2xl overflow-hidden shadow-zinc-300/50 relative bg-zinc-100 group">
        
        {/* 🔥 FIX: Button moved to BOTTOM-CENTER. Ye map ke kisi function ko block nahi karega aur bohot aesthetic lagega. */}
        <a 
          href={directionHref} 
          target="_blank" 
          rel="noreferrer" 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 bg-zinc-950 text-emerald-500 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-emerald-500 hover:text-white hover:-translate-y-1 transition-all flex items-center gap-3"
        >
          <Navigation className="w-5 h-5" /> Get Directions
        </a>

        {/* Dynamic & Safe iFrame */}
        <iframe 
          src={embedSrc} 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'contrast(1.1) brightness(0.95)' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="TRICKSY Location Map"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactMap;