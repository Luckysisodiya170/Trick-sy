import React, { useState, useMemo } from 'react';
import { 
  Mail, Download, Trash2, Search, 
  CheckCircle, Send, Users, X, 
  Filter, MoreHorizontal, ExternalLink,
  ShieldCheck, AlertCircle
} from 'lucide-react';

const NewsletterSubscribers = () => {
  // --- STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSub, setSelectedSub] = useState(null);
  const [subs, setBookings] = useState([
    { id: 1, email: 'amit.verma@gmail.com', date: '26 Mar, 2026', status: 'Active', source: 'Direct Search' },
    { id: 2, email: 'priya.indore@outlook.com', date: '24 Mar, 2026', status: 'Active', source: 'Google Ads' },
    { id: 3, email: 'rocky_dev@tricksy.in', date: '20 Mar, 2026', status: 'Unsubscribed', source: 'Referral' },
    { id: 4, email: 'sneha_12@gmail.com', date: '18 Mar, 2026', status: 'Active', source: 'Direct Search' },
  ]);

  // --- LOGIC: Delete ---
  const deleteSub = (id) => {
    setBookings(prev => prev.filter(s => s.id !== id));
    setSelectedSub(null);
  };

  // --- LOGIC: Search ---
  const filteredData = useMemo(() => {
    return subs.filter(item => 
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, subs]);

  return (
    <div className="p-6 lg:p-10 bg-[#F8FAFC] min-h-screen font-sans text-slate-900 relative">
      
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
            Email <span className="text-indigo-600">List.</span>
          </h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-3">
            Targeting {subs.length} Active Broadcast Channels
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white px-8 py-4 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
             <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <Users size={20} />
             </div>
             <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Growth</p>
                <p className="text-xl font-black italic text-slate-900 leading-none">+1.2K</p>
             </div>
          </div>
          <button className="bg-slate-900 text-white px-8 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
            <Download size={16} /> Export Data
          </button>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="max-w-7xl mx-auto bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
        
        {/* TABLE TOOLBAR */}
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="FILTER BY EMAIL ADDRESS..." 
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-indigo-600 transition-colors">
              Blacklist Check
            </button>
            <div className="h-4 w-[1px] bg-slate-200" />
            <button className="text-indigo-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
               <CheckCircle size={14} /> Sync Database
            </button>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-50">
                <th className="px-12 py-8">Identity</th>
                <th className="px-8 py-8">Subscription Date</th>
                <th className="px-8 py-8">Channel Status</th>
                <th className="px-12 py-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((s) => (
                <tr 
                  key={s.id} 
                  onClick={() => setSelectedSub(s)}
                  className="group hover:bg-indigo-50/30 transition-all cursor-pointer"
                >
                  <td className="px-12 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner border border-slate-100/50">
                        <Mail size={18} />
                      </div>
                      <div>
                        <span className="text-sm font-black text-slate-800 italic">{s.email}</span>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">Origin: {s.source}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[11px] font-bold text-slate-500 italic uppercase tracking-tighter">{s.date}</td>
                  <td className="px-8 py-6">
                    <span className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-xl border-2 ${
                      s.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-600 border-white shadow-sm' 
                      : 'bg-slate-50 text-slate-400 border-white shadow-sm'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-12 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                       <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:shadow-md transition-all">
                         <Send size={16} />
                       </button>
                       <button 
                        onClick={(e) => { e.stopPropagation(); deleteSub(s.id); }}
                        className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-rose-500 hover:shadow-md transition-all"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- BLUR MODAL --- */}
      {selectedSub && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={() => setSelectedSub(null)} />
          
          <div className="relative bg-white w-full max-w-xl rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
             <div className="p-10 lg:p-16">
                <div className="flex justify-between items-start mb-12">
                   <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200">
                      <Mail size={32} />
                   </div>
                   <button onClick={() => setSelectedSub(null)} className="p-4 bg-slate-50 rounded-2xl hover:bg-slate-900 hover:text-white transition-all">
                      <X size={20} />
                   </button>
                </div>

                <div className="space-y-8">
                   <div>
                      <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-3">Subscriber Profile</p>
                      <h2 className="text-3xl font-black italic tracking-tighter text-slate-900 break-all leading-tight uppercase">
                        {selectedSub.email}
                      </h2>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100/50">
                         <p className="text-[9px] font-black text-slate-400 uppercase mb-2 flex items-center gap-2 tracking-widest"><ShieldCheck size={12} /> Verification</p>
                         <p className="text-xs font-black text-slate-900 italic uppercase">Email Verified</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100/50">
                         <p className="text-[9px] font-black text-slate-400 uppercase mb-2 flex items-center gap-2 tracking-widest"><AlertCircle size={12} /> Activity</p>
                         <p className="text-xs font-black text-slate-900 italic uppercase">High Engagement</p>
                      </div>
                   </div>

                   <div className="space-y-4 pt-4">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center italic">Personalized Broadcast</p>
                      <button className="w-full py-6 bg-slate-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
                         <Send size={16} /> Send Direct Newsletter
                      </button>
                      <button 
                        onClick={() => deleteSub(selectedSub.id)}
                        className="w-full py-6 border border-slate-100 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 transition-all flex items-center justify-center gap-3"
                      >
                         <Trash2 size={16} /> Remove Subscriber
                      </button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterSubscribers;