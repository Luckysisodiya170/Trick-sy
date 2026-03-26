import React, { useState } from 'react';
import { 
  User, Shield, Bell, Globe, 
  Save, Mail, Lock, CheckCircle2, 
  Trash2, ArrowRight, Zap, Settings,
  ShieldCheck, Activity, ChevronRight,
  Menu, Search, Command
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('Identity');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'Identity', icon: <User size={18}/>, label: 'Admin Identity' },
    { id: 'Security', icon: <Shield size={18}/>, label: 'System Security' },
    { id: 'Alerts', icon: <Bell size={18}/>, label: 'Notification Hub' },
    { id: 'Global', icon: <Globe size={18}/>, label: 'Global Config' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-800 antialiased flex flex-col">
      
      {/* --- TOP FULL-WIDTH NAV --- */}
      <nav className="w-full h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <Command size={22} strokeWidth={2.5} />
          </div>
          <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />
          <h1 className="text-xl font-bold tracking-tight text-slate-900 hidden md:block">Core Control</h1>
        </div>

        <div className="flex-1 max-w-xl px-10 hidden lg:block">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search system parameters..." 
              className="w-full bg-slate-50 border border-transparent rounded-xl py-2.5 pl-12 pr-4 text-xs font-bold uppercase tracking-wider focus:bg-white focus:border-indigo-100 outline-none transition-all"
            />
          </div>
        </div>

        <button 
          onClick={() => { setIsSaving(true); setTimeout(() => setIsSaving(false), 1200); }}
          className={`group flex items-center gap-3 px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95
            ${isSaving ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-xl shadow-slate-200'}`}
        >
          {isSaving ? 'Syncing...' : 'Save Updates'}
        </button>
      </nav>

      <div className="flex flex-1">
        
        {/* --- LEFT SIDEBAR (FIXED WIDTH) --- */}
        <aside className="w-72 bg-white border-r border-slate-100 p-6 hidden md:block">
          <div className="space-y-1">
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Main Configuration</p>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all font-bold text-xs uppercase tracking-wider
                  ${activeTab === tab.id 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-12 p-6 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="flex items-center gap-2 mb-3 text-slate-900">
              <Activity size={16} className="text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Server Load</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
               <div className="h-full w-2/3 bg-emerald-500 rounded-full" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase">Performance Stable</p>
          </div>
        </aside>

        {/* --- MAIN CONTENT (EXPANDED TO FULL WIDTH) --- */}
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
          <div className="w-full max-w-none">
            
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{activeTab} Details</h2>
                <p className="text-sm font-medium text-slate-400 mt-1">Manage your administrative footprint and access keys.</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Auth</p>
                    <p className="text-xs font-bold text-slate-900">12:45 PM Today</p>
                 </div>
                 <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                    <User size={24} />
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Form Section */}
              <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Master Username</label>
                    <input 
                      type="text" 
                      defaultValue="TRICKSY_ADMIN_001"
                      className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-100 focus:bg-white focus:ring-4 focus:ring-indigo-50/50 outline-none font-bold text-sm transition-all text-slate-900"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Access Protocol</label>
                    <input 
                      type="text" 
                      defaultValue="LEVEL_07_ENCRYPTED"
                      disabled
                      className="w-full px-6 py-4 bg-slate-100 border-2 border-transparent rounded-2xl font-bold text-sm text-slate-400 cursor-not-allowed uppercase"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">System Mail Endpoint</label>
                    <input 
                      type="email" 
                      defaultValue="ROOT@TRICKSY_CORE.IO"
                      className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-100 focus:bg-white focus:ring-4 focus:ring-indigo-50/50 outline-none font-bold text-sm transition-all text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Status Section */}
              <div className="lg:col-span-1 space-y-8">
                <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
                  <Zap className="mb-6 opacity-50 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-indigo-200">Encryption Pulse</h4>
                  <div className="text-3xl font-bold tracking-tighter">Active Sync</div>
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
                </div>

                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-50 pb-4 italic">Security Logs</h4>
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase">Login Success - IP: 192.168.1.{i}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* --- FULL-WIDTH DANGER BAR --- */}
            <div className="w-full bg-rose-50/50 border border-rose-100 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between transition-all hover:bg-rose-50">
              <div className="flex items-center gap-6 mb-4 md:mb-0">
                <div className="w-14 h-14 bg-white text-rose-500 rounded-2xl flex items-center justify-center shadow-sm">
                  <Trash2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-sm">Emergency System Purge</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Destroy all database connections and clear session cache</p>
                </div>
              </div>
              <button className="px-10 py-4 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-rose-100">
                Execute Purge
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;