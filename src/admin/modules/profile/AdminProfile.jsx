import React, { useState, useRef, useEffect } from 'react';
import { 
  User, ShieldCheck, Camera, Save, 
  Clock, MapPin, Smartphone, Sparkles,
  Mail, Phone, X
} from 'lucide-react';

const AdminProfile = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('adminProfileImage');
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfileImage(base64String);
        localStorage.setItem('adminProfileImage', base64String);
        window.dispatchEvent(new Event('profileImageChanged'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setProfileImage(null);
    localStorage.removeItem('adminProfileImage');
    window.dispatchEvent(new Event('profileImageChanged'));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-12 font-sans relative">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 border-b border-slate-100 pb-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-brand-primary mb-1">
              <Sparkles size={14} className="fill-brand-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">User Identity</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
              ADMIN <span className="italic text-brand-primary">PROFILE.</span>
            </h1>
            <p className="text-[13px] italic text-slate-400 font-medium">
              Manage your personal credentials
            </p>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center gap-3 px-8 py-4 rounded-[1.2rem] font-black text-[10px] uppercase tracking-[0.15em] transition-all active:scale-95 shadow-md ${
                isSaving 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-brand-dark text-white hover:bg-brand-primary shadow-slate-900/10'
              }`}
            >
              {isSaving ? 'Updating Identity...' : 'Save Profile'}
              {!isSaving && <Save size={16} />}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/3 space-y-8">
            <div className="bg-brand-dark p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-primary/30 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative group cursor-pointer mb-6" onClick={() => fileInputRef.current?.click()}>
                  {profileImage && (
                    <button
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 rounded-full border-4 border-brand-dark flex items-center justify-center text-white hover:bg-rose-600 transition-colors z-20 shadow-lg"
                    >
                      <X size={12} />
                    </button>
                  )}
                  <div className="w-28 h-28 rounded-[2rem] bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-4xl font-black shadow-xl overflow-hidden group-hover:border-brand-primary transition-all duration-300 relative">
                     {profileImage ? (
                       <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                     ) : (
                       <span className="group-hover:opacity-0 transition-opacity duration-300">A</span>
                     )}
                     <div className="absolute inset-0 bg-brand-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Camera size={24} className="text-white" />
                     </div>
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-brand-dark flex items-center justify-center z-10">
                    <ShieldCheck size={14} className="text-white" />
                  </div>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                <h2 className="text-2xl font-black tracking-tight mb-1">Admin User</h2>
                <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-2">Super Administrator</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
               <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-5 border-b border-slate-50 pb-3 flex items-center gap-2">
                 <Clock size={14} className="text-brand-primary" /> Recent Sessions
               </h3>
               <div className="space-y-4">
                 <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                      <Smartphone size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">iPhone 14 Pro • Safari</p>
                      <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        <MapPin size={10} /> Mumbai, IND • Active Now
                      </div>
                    </div>
                 </div>
                 <div className="flex items-start gap-3 opacity-60">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
                      <Clock size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-600">MacBook Air • Chrome</p>
                      <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        <MapPin size={10} /> Delhi, IND • 2 days ago
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3 space-y-6">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden h-full">
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                    <div className="relative group">
                       <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors">
                         <User size={16} />
                       </div>
                       <input type="text" defaultValue="Admin" className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.2rem] focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none font-bold text-sm text-slate-900 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                    <div className="relative group">
                       <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors">
                         <User size={16} />
                       </div>
                       <input type="text" defaultValue="User" className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.2rem] focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none font-bold text-sm text-slate-900 transition-all" />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative opacity-60">
                       <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"><Mail size={16} /></div>
                       <input type="email" value="admin@tricksy.com" readOnly className="w-full pl-14 pr-6 py-4 bg-slate-100 border border-slate-200 rounded-[1.2rem] outline-none font-bold text-sm text-slate-500 cursor-not-allowed" />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <div className="relative opacity-60">
                       <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"><Phone size={16} /></div>
                       <input type="tel" value="+91 98765 43210" readOnly className="w-full pl-14 pr-6 py-4 bg-slate-100 border border-slate-200 rounded-[1.2rem] outline-none font-bold text-sm text-slate-500 cursor-not-allowed" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;