// src/pages/Contact/ContactForm.jsx
import React, { useState } from 'react';
import { Send, Mail, User, Phone, MessageSquare, ShieldCheck, Loader2 } from 'lucide-react';

// 🔥 1. LOCAL ASSET IMPORT: Path check kar lena apne folder structure ke hisaab se
import formImage from '../../assets/contact/form.png';

// 🔥 2. DYNAMIC PROPS: Content ko dynamic banaya gaya hai with safe fallbacks
const ContactForm = ({
  title = "Request",
  titleHighlight = "Service",
  subtitle = "Fill the details below and get a response within minutes.",
  onSubmitAction
}) => {
  const inputStyle = "w-full bg-zinc-50/50 border border-zinc-200 rounded-2xl px-6 py-4 font-semibold text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition-all shadow-inner";

  // 🔥 3. PRODUCTION SAFE: Form submission state handle karne ke liye
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Page reload hone se rokega
    setIsSubmitting(true);

    try {
      // Agar backend action prop pass kiya gaya hai, toh usko call karo
      if (onSubmitAction) {
        await onSubmitAction();
      } else {
        // Dummy delay for UI testing (1.5 seconds)
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Form submitted successfully!");
      }
      
      // Form reset karne ka logic yahan aayega future mein
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-zinc-300/40 border border-zinc-100 grid grid-cols-1 md:grid-cols-12 gap-10">
      
      {/* 🟢 LEFT PART (Form Fields) - Takes 8 Columns */}
      <div className="md:col-span-8 space-y-8">
        <div>
          <h3 className="text-4xl font-bold text-zinc-950 mb-2 tracking-tight">{title} <span className="text-emerald-500">{titleHighlight}</span></h3>
          <p className="text-zinc-500 font-semibold mb-10">{subtitle}</p>
        </div>
        
        {/* Safe Form Tag with handleFormSubmit */}
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative">
              <input type="text" placeholder="Full Name" required className={inputStyle} />
              <User className="w-5 h-5 text-zinc-300 absolute right-6 top-1/2 -translate-y-1/2"/>
            </div>
            <div className="relative">
              <input type="email" placeholder="john@example.com" required className={inputStyle} />
              <Mail className="w-5 h-5 text-zinc-300 absolute right-6 top-1/2 -translate-y-1/2"/>
            </div>
          </div>

          <div className="relative">
            <input type="tel" placeholder="+971 50 123 4567" required className={inputStyle} />
            <Phone className="w-5 h-5 text-zinc-300 absolute right-6 top-1/2 -translate-y-1/2"/>
          </div>

          <div className="relative">
            <textarea rows="4" placeholder="How can we help you today? E.g. AC Repair query..." required className={`${inputStyle} resize-none`}></textarea>
            <MessageSquare className="w-5 h-5 text-zinc-300 absolute right-6 top-6"/>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full mt-4 py-5 bg-zinc-950 text-white font-black text-lg rounded-full hover:bg-emerald-500 transition-colors uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg hover:shadow-emerald-300/50 hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-zinc-950"
          >
            {isSubmitting ? (
              <><Loader2 className="w-6 h-6 animate-spin" /> Processing...</>
            ) : (
              <><Send className="w-6 h-6" /> Blast Message</>
            )}
          </button>
        </form>
      </div>

      {/* 🟢 RIGHT PART (Image & Badges) - Takes 4 Columns */}
      <div className="md:col-span-4 bg-zinc-50 rounded-3xl p-6 border border-zinc-100 flex flex-col items-center justify-between">
         
         {/* 🔴 DYNAMIC LOCAL IMAGE */}
         <img 
            src={formImage}
            alt="TRICKSY Professional Support"
            className="w-full h-52 object-cover rounded-2xl mb-6 shadow-md"
         />
         
         {/* Badges and Logo */}
         <div className="flex-1 w-full space-y-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-emerald-500"/>
                <div>
                    <p className="font-bold text-zinc-950 text-sm">Insured & Vetted</p>
                    <p className="text-xs text-zinc-500">Fully compliant service pros.</p>
                </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                <div className="font-black text-3xl text-emerald-500">5★</div>
                <div>
                    <p className="font-bold text-zinc-950 text-sm">Top Rated Support</p>
                    <p className="text-xs text-zinc-500">Based on 2000+ client reviews.</p>
                </div>
            </div>
         </div>

         {/* 🔴 THE TRICKSY CERTIFIED BADGE/LOGO */}
         <div className="mt-8 pt-6 border-t border-zinc-100 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-zinc-950 rounded-full flex items-center justify-center border-4 border-emerald-500 shadow-xl mb-3">
               <span className="text-white font-black text-3xl">T</span>
            </div>
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">certified service provider</p>
         </div>
      </div>
    </div>
  );
};

export default ContactForm;