import React, { useState } from 'react';
import { 
  User, Mail, Phone, Lock, ShieldCheck, 
  Camera, Save, Clock, MapPin, Smartphone, 
  Key, ShieldAlert, Sparkles, CheckCircle2
} from 'lucide-react';

const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState('Personal');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-12 font-sans relative">
      
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
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
              Manage your personal credentials and security preferences
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

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT SIDEBAR (Profile Card & Sessions) */}
          <div className="w-full lg:w-1/3 space-y-8">
            
            {/* ID Card */}
            <div className="bg-brand-dark p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-primary/30 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative group cursor-pointer mb-6">
                  <div className="w-28 h-28 rounded-[2rem] bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-4xl font-black shadow-xl overflow-hidden group-hover:border-brand-primary transition-all duration-300">
                     <span className="group-hover:opacity-0 transition-opacity duration-300">A</span>
                     <div className="absolute inset-0 bg-brand-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Camera size={24} className="text-white" />
                     </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-brand-dark flex items-center justify-center">
                    <ShieldCheck size={14} className="text-white" />
                  </div>
                </div>

                <h2 className="text-2xl font-black tracking-tight mb-1">Admin User</h2>
                <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-6">Super Administrator</p>

                <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center backdrop-blur-sm">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clearance</span>
                   <span className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                     <Lock size={12} /> Level 09
                   </span>
                </div>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
               <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-5 border-b border-slate-50 pb-3 flex items-center gap-2">
                 <Clock size={14} className="text-brand-primary" /> Recent Sessions
               </h3>
               
               <div className="space-y-4">
                 {/* Session 1 */}
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
                 {/* Session 2 */}
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

          {/* RIGHT CONTENT AREA (Forms) */}
          <div className="w-full lg:w-2/3 space-y-6">
            
            {/* Tabs */}
            <div className="flex items-center gap-2 bg-slate-50/50 p-2 rounded-[1.5rem] border border-slate-100 w-fit">
               <button 
                 onClick={() => setActiveTab('Personal')}
                 className={`px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                   activeTab === 'Personal' 
                     ? 'bg-white text-brand-primary shadow-sm border border-slate-100' 
                     : 'text-slate-500 hover:text-slate-800'
                 }`}
               >
                 Personal Info
               </button>
               <button 
                 onClick={() => setActiveTab('Security')}
                 className={`px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                   activeTab === 'Security' 
                     ? 'bg-white text-brand-primary shadow-sm border border-slate-100' 
                     : 'text-slate-500 hover:text-slate-800'
                 }`}
               >
                 Security Settings
               </button>
            </div>

            {/* Dynamic Form Area */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden min-h-[400px]">
              
              {activeTab === 'Personal' && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Personal Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                      <div className="relative group">
                         <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors">
                           <User size={16} />
                         </div>
                         <input 
                           type="text" 
                           defaultValue="Admin"
                           className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.2rem] focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none font-bold text-sm text-slate-900 transition-all"
                         />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                      <div className="relative group">
                         <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors">
                           <User size={16} />
                         </div>
                         <input 
                           type="text" 
                           defaultValue="User"
                           className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.2rem] focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none font-bold text-sm text-slate-900 transition-all"
                         />
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative group">
                         <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors">
                           <Mail size={16} />
                         </div>
                         <input 
                           type="email" 
                           defaultValue="admin@tricksy.com"
                           className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.2rem] focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none font-bold text-sm text-slate-900 transition-all"
                         />
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="relative group">
                         <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors">
                           <Phone size={16} />
                         </div>
                         <input 
                           type="tel" 
                           defaultValue="+91 98765 43210"
                           className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.2rem] focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none font-bold text-sm text-slate-900 transition-all"
                         />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Security' && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Password & Security</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                      <div className="relative group">
                         <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors">
                           <Key size={16} />
                         </div>
                         <input 
                           type="password" 
                           placeholder="Enter current password"
                           className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.2rem] focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none font-bold text-sm text-slate-900 transition-all"
                         />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                        <div className="relative group">
                           <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors">
                             <Lock size={16} />
                           </div>
                           <input 
                             type="password" 
                             placeholder="New password"
                             className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.2rem] focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none font-bold text-sm text-slate-900 transition-all"
                           />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                        <div className="relative group">
                           <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors">
                             <CheckCircle2 size={16} />
                           </div>
                           <input 
                             type="password" 
                             placeholder="Confirm new password"
                             className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.2rem] focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none font-bold text-sm text-slate-900 transition-all"
                           />
                        </div>
                      </div>
                    </div>

                    {/* 2FA Toggle Card */}
                    <div className="mt-8 p-6 rounded-[1.5rem] border border-emerald-100 bg-emerald-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-[1rem] flex items-center justify-center text-emerald-500 shadow-sm shrink-0">
                            <ShieldAlert size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">Two-Factor Authentication</h4>
                            <p className="text-[11px] font-semibold text-slate-500 mt-0.5">Protect your account with an extra layer of security.</p>
                          </div>
                       </div>
                       <button className="px-6 py-3 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-all active:scale-95 shrink-0">
                         Enable 2FA
                       </button>
                    </div>

                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;