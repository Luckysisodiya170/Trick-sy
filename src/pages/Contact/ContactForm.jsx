import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Mail, User, Phone, MessageSquare, ShieldCheck, Loader2 } from 'lucide-react';

import formImage from '../../assets/contact/form.png';

const ContactForm = ({
  title = "Request",
  titleHighlight = "Service",
  subtitle = "Fill the details below and get a response within minutes.",
  onSubmitAction
}) => {
  const { hash } = useLocation();
  const inputStyle = "w-full bg-zinc-50/50 border border-zinc-200 rounded-2xl px-6 py-4 font-semibold text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 transition-all shadow-inner";

  useEffect(() => {
    if (hash === '#contact-form') {
      const element = document.getElementById('contact-form');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 200); 
      }
    }
  }, [hash]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (onSubmitAction) {
        await onSubmitAction(formData);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Submitted:", formData);
      }
      setFormData({ fullName: '', email: '', phone: '', message: '' });
      alert("Message sent!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      id="contact-form" 
      className="scroll-mt-32 bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-zinc-300/40 border border-zinc-100 grid grid-cols-1 md:grid-cols-12 gap-10"
    >
      {/*LEFT PART*/}
      <div className="md:col-span-8 space-y-8">
        <div>
          <h3 className="text-4xl font-bold text-zinc-950 mb-2 tracking-tight">
            {title} <span className="text-emerald-500">{titleHighlight}</span>
          </h3>
          <p className="text-zinc-500 font-semibold mb-10">{subtitle}</p>
        </div>
        
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative">
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required className={inputStyle} />
              <User className="w-5 h-5 text-zinc-300 absolute right-6 top-1/2 -translate-y-1/2"/>
            </div>
            <div className="relative">
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className={inputStyle} />
              <Mail className="w-5 h-5 text-zinc-300 absolute right-6 top-1/2 -translate-y-1/2"/>
            </div>
          </div>
          <div className="relative">
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className={inputStyle} />
            <Phone className="w-5 h-5 text-zinc-300 absolute right-6 top-1/2 -translate-y-1/2"/>
          </div>
          <div className="relative">
            <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="How can we help?" required className={`${inputStyle} resize-none`}></textarea>
            <MessageSquare className="w-5 h-5 text-zinc-300 absolute right-6 top-6"/>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full mt-4 py-5 bg-zinc-950 text-white font-black text-lg rounded-full hover:bg-emerald-500 transition-all uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-70">
            {isSubmitting ? <><Loader2 className="w-6 h-6 animate-spin" /> Processing...</> : <><Send className="w-6 h-6" /> Blast Message</>}
          </button>
        </form>
      </div>

      {/* RIGHT PART  */}
      <div className="md:col-span-4 bg-zinc-50 rounded-3xl p-6 border border-zinc-100 flex flex-col items-center justify-between">
         <img src={formImage} alt="TRICKSY Support" className="w-full h-52 object-cover rounded-2xl mb-6 shadow-md" />
         <div className="flex-1 w-full space-y-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-emerald-500"/>
                <div><p className="font-bold text-zinc-950 text-sm">Insured & Vetted</p></div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                <div className="font-black text-3xl text-emerald-500">5★</div>
                <div><p className="font-bold text-zinc-950 text-sm">Top Rated</p></div>
            </div>
         </div>
         <div className="mt-8 pt-6 border-t border-zinc-100 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-zinc-950 rounded-full flex items-center justify-center border-4 border-emerald-500 shadow-xl mb-3">
               <span className="text-white font-black text-3xl">T</span>
            </div>
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">certified provider</p>
         </div>
      </div>
    </div>
  );
};

export default ContactForm;