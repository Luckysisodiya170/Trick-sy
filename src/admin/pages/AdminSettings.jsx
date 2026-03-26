import React from 'react';
import { Settings as SettingsIcon, Shield, User, Globe, Bell, Save, Lock } from 'lucide-react';

const AdminSettings = () => {
  return (
    <div className="p-6 lg:p-10 bg-[#F8FAFC] min-h-screen">
      <div className="mb-12">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
          System <span className="text-indigo-600">Settings</span>
        </h1>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-3">Configure Tricksy_Admin Core Preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Navigation Tabs (Vertical) */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { label: 'Profile Info', icon: <User size={18}/>, active: true },
            { label: 'Security', icon: <Shield size={18}/>, active: false },
            { label: 'Notifications', icon: <Bell size={18}/>, active: false },
            { label: 'Site Config', icon: <Globe size={18}/>, active: false },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${item.active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-slate-400 hover:bg-slate-50'}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* Section: Profile */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
             <h3 className="text-xl font-black italic uppercase mb-8 flex items-center gap-3">
               <User className="text-indigo-600" /> Identity Details
             </h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Admin Name</label>
                   <input type="text" defaultValue="Tricksy Master" className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:border-indigo-600/20 outline-none font-bold text-sm transition-all" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Contact Email</label>
                   <input type="email" defaultValue="admin@tricksy.com" className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:border-indigo-600/20 outline-none font-bold text-sm transition-all" />
                </div>
             </div>
          </div>

          {/* Section: Password/Security */}
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden">
             <h3 className="text-xl font-black italic uppercase mb-8 flex items-center gap-3">
               <Lock className="text-indigo-400" /> Security Override
             </h3>
             <div className="space-y-6 max-w-md">
                <input type="password" placeholder="Current Password" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-[1.5rem] outline-none font-bold text-sm focus:bg-white/10" />
                <input type="password" placeholder="New Strong Password" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-[1.5rem] outline-none font-bold text-sm focus:bg-white/10" />
                
                <button className="bg-indigo-500 hover:bg-emerald-500 text-white w-full py-4 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-2">
                   <Save size={14} /> Update Credentials
                </button>
             </div>
             <Shield className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;