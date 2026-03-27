import React, { useState } from 'react';
import { 
  User, Shield, Bell, Globe, 
  Trash2, Zap, Activity, Search, Command,
  ArrowRight, ShieldCheck, Save, CheckCircle2, Settings, Lock,
  Sparkles, Key, HardDrive, Cpu,Mail,
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('Identity');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'Identity', icon: <User size={16}/>, label: 'Admin Identity', desc: 'Manage access & credentials' },
    { id: 'Security', icon: <Shield size={16}/>, label: 'System Security', desc: 'Firewall & encryption rules' },
    { id: 'Alerts', icon: <Bell size={16}/>, label: 'Notification Hub', desc: 'Configure system alerts' },
    { id: 'Global', icon: <Globe size={16}/>, label: 'Global Config', desc: 'Base application settings' },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-12 font-sans relative">
      
      {/* Background Subtle Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER  --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 border-b border-slate-100 pb-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-brand-primary mb-1">
              <Sparkles size={14} className="fill-brand-primary" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Core Configuration Engine</span>
            </div>

            <h1 className="text-4xl md:text-4xl font-black tracking-tight text-slate-900">
              SYSTEM <span className="italic text-brand-primary">SETTINGS.</span>
            </h1>
            <p className="text-[13px] italic text-slate-400 font-medium">
              Manage high-level parameters and authentication protocols
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
              {isSaving ? 'Synchronizing...' : 'Commit Changes'}
              {!isSaving && <Save size={16} />}
            </button>
          </div>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT SIDEBAR (Tabs & System Health) */}
          <div className="w-full lg:w-1/3 xl:w-1/4 space-y-8">
            
            {/* Tabs Navigation */}
            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Control Panels</p>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-4 rounded-[1.5rem] border transition-all duration-300 flex items-start gap-4 group ${
                    activeTab === tab.id 
                      ? 'bg-white border-brand-primary/20 shadow-lg shadow-brand-primary/5 ring-4 ring-brand-primary/5' 
                      : 'bg-transparent border-transparent hover:bg-white hover:border-slate-100 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    activeTab === tab.id ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-400 group-hover:text-brand-primary group-hover:bg-brand-primary/10'
                  }`}>
                    {tab.icon}
                  </div>
                  <div>
                     <h3 className={`text-sm font-bold tracking-wide mb-0.5 ${activeTab === tab.id ? 'text-brand-primary' : 'text-slate-700'}`}>
                        {tab.label}
                     </h3>
                     <p className="text-[10px] font-semibold text-slate-400 leading-tight">{tab.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* System Health Widget */}
            <div className="bg-brand-dark p-6 rounded-[2rem] text-white relative overflow-hidden shadow-2xl">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-brand-primary/20 blur-[50px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-brand-primary">
                    <Activity size={14} className="animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Engine Load</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                </div>
                <div className="text-4xl font-black mb-1 italic tracking-tighter">98<span className="text-2xl text-slate-500">.2%</span></div>
                <p className="text-[10px] text-slate-400 font-medium mb-4">All systems operational</p>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[98%] bg-brand-primary rounded-full shadow-[0_0_10px_#4f46e5]" />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT CONTENT AREA (Settings Forms) */}
          <div className="w-full lg:w-2/3 xl:w-3/4 space-y-6">
            
            {/* Context Header */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-50 text-brand-primary rounded-2xl flex items-center justify-center">
                     <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{activeTab} Configuration</h2>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Master Node: <span className="text-brand-primary font-bold">US-EAST-01</span></p>
                  </div>
               </div>
               <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest">
                  <CheckCircle2 size={14} /> Secured
               </div>
            </div>

            {/* Dynamic Form Area */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
                <Command size={180} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                
                {/* Input 1 */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin ID (Root)</label>
                  <div className="relative group">
                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors">
                       <User size={16} />
                     </div>
                     <input 
                       type="text" 
                       defaultValue="TRICKSY_ROOT_X"
                       className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.2rem] focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none font-bold text-sm text-slate-900 uppercase tracking-wider transition-all"
                     />
                  </div>
                </div>

                {/* Input 2 (Read Only) */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Clearance</label>
                  <div className="w-full pl-5 pr-6 py-4 bg-slate-100 border border-slate-200 rounded-[1.2rem] font-bold text-sm text-slate-500 uppercase tracking-widest flex items-center justify-between opacity-80 cursor-not-allowed">
                    <div className="flex items-center gap-3">
                       <Key size={16} className="text-slate-400" />
                       Level 09 (Max)
                    </div>
                    <Lock size={14} className="text-rose-400" />
                  </div>
                </div>

                {/* Input 3 */}
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Recovery Endpoint (Email)</label>
                  <div className="relative group">
                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors">
                       <Mail size={16} />
                     </div>
                     <input 
                       type="email" 
                       defaultValue="SYSTEM@TRICKSY.IO"
                       className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.2rem] focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none font-bold text-sm text-slate-900 uppercase tracking-widest transition-all"
                     />
                  </div>
                </div>

              </div>

              {/* Server Stats Mini Cards */}
              <div className="grid grid-cols-2 gap-4 mt-10 pt-10 border-t border-slate-50">
                 <div className="bg-slate-50 p-5 rounded-2xl flex items-center gap-4 border border-slate-100/50">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                      <HardDrive size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Storage Cache</p>
                      <p className="text-sm font-black text-slate-800">42.8 GB Used</p>
                    </div>
                 </div>
                 <div className="bg-slate-50 p-5 rounded-2xl flex items-center gap-4 border border-slate-100/50">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                      <Cpu size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">CPU Threads</p>
                      <p className="text-sm font-black text-slate-800">16 Cores Active</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* DANGER ZONE */}
            <div className="w-full bg-white border border-rose-100 p-8 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg hover:shadow-rose-50/50 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center shrink-0">
                  <Trash2 size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-xl tracking-tight mb-1">System Purge Protocol</h4>
                  <p className="text-xs font-semibold text-slate-500">Irreversibly clear all cached assets, logs, and session tokens.</p>
                </div>
              </div>
              <button className="w-full md:w-auto px-8 py-4 bg-rose-50 text-rose-600 border border-rose-200 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">
                Execute Purge
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;