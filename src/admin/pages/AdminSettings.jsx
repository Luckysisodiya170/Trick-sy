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


// import React, { useState } from 'react';
// import { 
//   Search, Plus, Edit3, Trash2, 
//   Sparkles, Layers, IndianRupee, 
//   ToggleLeft, ToggleRight, CheckSquare, X
// } from 'lucide-react';

// const ServiceManager = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
//   const [services, setServices] = useState([
//     { id: 'SRV-01', name: 'Premium Deep Cleaning', category: 'Cleaning', price: 4200, status: 'Active', features: ['Floor Scrubbing', 'Washroom Deep Clean', 'Dusting', 'Stain Removal'] },
//     { id: 'SRV-02', name: 'AC Seasonal Maintenance', category: 'Appliance', price: 1499, status: 'Active', features: ['Coil Wash', 'Gas Check', 'Filter Clean'] },
//     { id: 'SRV-03', name: 'Plumbing Emergency Fix', category: 'Repairs', price: 850, status: 'Draft', features: ['Leak Fix', 'Tap Replacement'] },
//     { id: 'SRV-04', name: 'Sofa Spa & Dry Clean', category: 'Cleaning', price: 1200, status: 'Active', features: ['Vacuuming', 'Shampoo Scrub', 'Spot Treatment'] },
//   ]);

//   const toggleStatus = (id) => {
//     setServices(services.map(s => 
//       s.id === id ? { ...s, status: s.status === 'Active' ? 'Draft' : 'Active' } : s
//     ));
//   };

//   const deleteService = (id) => {
//     if(window.confirm("Delete this service package?")) {
//       setServices(services.filter(s => s.id !== id));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-12 font-sans relative">
      
//       {/* Background Glow */}
//       <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

//       <div className="max-w-7xl mx-auto">
        
//         {/* --- HEADER --- */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 border-b border-slate-100 pb-10">
//           <div className="space-y-1">
//             <div className="flex items-center gap-2 text-brand-primary mb-1">
//               <Sparkles size={14} className="fill-brand-primary" />
//               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Catalog Management</span>
//             </div>
//             <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
//               SERVICE <span className="italic text-brand-primary">PACKAGES.</span>
//             </h1>
//             <p className="text-[13px] italic text-slate-400 font-medium">
//               Manage your offerings, pricing, and feature inclusions.
//             </p>
//           </div>

//           <div className="flex items-center gap-4 w-full lg:w-auto">
//              <div className="relative flex-1 lg:w-72 border-2 border-slate-100 rounded-2xl focus-within:border-brand-primary transition-colors">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//               <input
//                 type="text"
//                 placeholder="Search catalog..."
//                 className="w-full pl-12 pr-4 py-3.5 rounded-2xl outline-none font-bold text-xs uppercase tracking-widest text-slate-700 bg-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <button 
//               onClick={() => setIsAddModalOpen(true)}
//               className="flex items-center gap-2 px-6 py-4 bg-brand-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] hover:bg-brand-primary transition-all shadow-lg active:scale-95 shrink-0"
//             >
//               <Plus size={16} /> Add New
//             </button>
//           </div>
//         </div>

//         {/* --- STATS ROW --- */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
//            <div className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm flex items-center gap-4">
//               <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center shrink-0"><Layers size={18} /></div>
//               <div>
//                 <p className="text-2xl font-black text-slate-800 leading-none">{services.length}</p>
//                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Packages</p>
//               </div>
//            </div>
//            <div className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm flex items-center gap-4">
//               <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center shrink-0"><CheckSquare size={18} /></div>
//               <div>
//                 <p className="text-2xl font-black text-slate-800 leading-none">{services.filter(s => s.status === 'Active').length}</p>
//                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Active Services</p>
//               </div>
//            </div>
//         </div>

//         {/* --- SERVICE CARDS GRID --- */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {services.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((service) => (
//             <div key={service.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-primary/20 transition-all duration-300 p-6 flex flex-col relative group">
              
//               {/* Card Header */}
//               <div className="flex justify-between items-start mb-4">
//                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
//                    {service.category}
//                  </span>
//                  <button 
//                    onClick={() => toggleStatus(service.id)}
//                    className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${
//                      service.status === 'Active' ? 'text-emerald-500' : 'text-slate-400'
//                    }`}
//                  >
//                    {service.status === 'Active' ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
//                    {service.status}
//                  </button>
//               </div>

//               {/* Title & Price */}
//               <div className="mb-6 flex-1">
//                 <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight mb-2 group-hover:text-brand-primary transition-colors">
//                   {service.name}
//                 </h3>
//                 <div className="flex items-center gap-1 text-slate-600">
//                   <IndianRupee size={16} className="text-brand-primary" />
//                   <span className="text-2xl font-black italic tracking-tighter">{service.price}</span>
//                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">/ Service</span>
//                 </div>
//               </div>

//               {/* Features List */}
//               <div className="space-y-2 mb-8 bg-slate-50/50 p-4 rounded-[1.2rem] border border-slate-50">
//                 {service.features.map((feat, idx) => (
//                   <div key={idx} className="flex items-center gap-2">
//                     <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/50" />
//                     <span className="text-xs font-bold text-slate-600">{feat}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Actions Footer */}
//               <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
//                  <span className="text-[10px] font-black text-slate-300 tracking-widest">{service.id}</span>
//                  <div className="flex items-center gap-2">
//                    <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
//                      <Edit3 size={16} />
//                    </button>
//                    <button 
//                      onClick={() => deleteService(service.id)}
//                      className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"
//                    >
//                      <Trash2 size={16} />
//                    </button>
//                  </div>
//               </div>

//             </div>
//           ))}
//         </div>

//       </div>

//       {/* --- ADD NEW SERVICE MODAL --- */}
//       {isAddModalOpen && (
//         <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
//           <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-8 lg:p-10 animate-in zoom-in-95 duration-200 border border-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
//             <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-6">
//               <div>
//                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">Add New Service</h2>
//                 <p className="text-xs font-bold text-slate-500 mt-1">Configure pricing and features for your new package.</p>
//               </div>
//               <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400">
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="space-y-6">
//                <div className="space-y-2">
//                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Service Title</label>
//                  <input type="text" placeholder="e.g. Premium Car Wash" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-brand-primary transition-colors" />
//                </div>

//                <div className="grid grid-cols-2 gap-5">
//                  <div className="space-y-2">
//                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
//                    <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-brand-primary transition-colors appearance-none">
//                      <option>Cleaning</option>
//                      <option>Appliance Repair</option>
//                      <option>Plumbing</option>
//                    </select>
//                  </div>
//                  <div className="space-y-2">
//                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Base Price (₹)</label>
//                    <input type="number" placeholder="0.00" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-brand-primary transition-colors" />
//                  </div>
//                </div>

//                <div className="space-y-2">
//                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Feature Inclusions (Comma Separated)</label>
//                  <textarea rows="3" placeholder="Feature 1, Feature 2, Feature 3..." className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-brand-primary transition-colors resize-none" />
//                </div>
//             </div>

//             <div className="mt-10 flex gap-4">
//               <button className="flex-1 bg-brand-dark text-white py-4 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-primary transition-all shadow-lg">
//                 Save & Publish
//               </button>
//               <button onClick={() => setIsAddModalOpen(false)} className="px-8 py-4 border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
//                 Cancel
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ServiceManager;