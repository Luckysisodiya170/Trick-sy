import React, { useState, useMemo } from 'react';
import { 
  Mail, Download, Trash2, Search, 
  CheckCircle, Send, Users, X, 
  Sparkles, AlertCircle, CalendarClock
} from 'lucide-react';

const NewsletterSubscribers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSub, setSelectedSub] = useState(null);
  const [subs, setSubs] = useState([
    { id: 1, email: 'amit.verma@gmail.com', date: '26 Mar, 2026', status: 'Active', source: 'Direct Search' },
    { id: 2, email: 'priya.indore@outlook.com', date: '24 Mar, 2026', status: 'Active', source: 'Google Ads' },
    { id: 3, email: 'rocky_dev@tricksy.in', date: '20 Mar, 2026', status: 'Unsubscribed', source: 'Referral' },
    { id: 4, email: 'sneha_12@gmail.com', date: '18 Mar, 2026', status: 'Active', source: 'Direct Search' },
  ]);

  const deleteSub = (id) => {
    setSubs(prev => prev.filter(s => s.id !== id));
    setSelectedSub(null);
  };

  const filteredData = useMemo(() => {
    return subs.filter(item => 
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, subs]);

  return (
    <div className="p-6 lg:p-12 bg-[#FDFDFD] min-h-screen font-sans text-slate-900 relative">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 border-b border-slate-100 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-brand-primary mb-1">
            <Sparkles size={14} className="fill-brand-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Operation Intelligence</span>
          </div>

          <h1 className="text-4xl md:text-4xl font-black tracking-tight text-slate-900">
            EMAIL <span className="italic text-brand-primary">LIST.</span>
          </h1>
          <p className="text-[13px] italic text-slate-400 font-medium">
            Targeting {subs.length} Active Broadcast Channels
          </p>
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 lg:w-80 border-2 rounded-2xl border-slate-100 group focus-within:border-brand-primary transition-all">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search subscribers..."
              className="w-full pl-14 pr-6 py-2.5 rounded-2xl outline-none bg-transparent font-bold text-sm uppercase tracking-tight text-slate-700 placeholder:text-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Export Button*/}
          <button className="p-3 border-2 border-slate-100 rounded-2xl text-slate-400 hover:text-brand-primary hover:border-brand-primary transition-all active:scale-90">
            <Download size={18} />
          </button>
        </div>
      </div>

  
      <div className="max-w-7xl mx-auto">
        
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6 px-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Signal Database ({filteredData.length})</p>
            <button className="text-[10px] font-black uppercase text-brand-primary flex items-center gap-2 hover:opacity-70 transition-opacity bg-brand-primary/10 px-4 py-2 rounded-xl">
               <CheckCircle size={14} /> Sync Now
            </button>
        </div>

        {/* List Container */}
        <div className="space-y-3">
          {filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
              <AlertCircle size={40} className="mx-auto text-slate-200 mb-3" />
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">No subscribers found</p>
            </div>
          ) : (
            filteredData.map((s) => (
              <div 
                key={s.id} 
                onClick={() => setSelectedSub(s)}
                className="group bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-primary/30 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 cursor-pointer"
              >
                {/* 1. Identity (Avatar & Email) */}
                <div className="flex items-center gap-4 md:w-[40%]">
                  <div className="w-12 h-12 rounded-[1rem] bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary group-hover:text-white transition-all shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-base font-bold text-slate-900 truncate group-hover:text-brand-primary transition-colors">
                      {s.email}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                      ID: #{s.id}
                    </p>
                  </div>
                </div>

                {/* 2. Source & Date Info */}
                <div className="flex flex-col gap-1.5 md:w-[30%] bg-slate-50/50 p-2.5 rounded-xl border border-slate-50">
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Users size={14} className="text-brand-primary/70 shrink-0" /> 
                      <span className="truncate">Source: {s.source}</span>
                   </div>
                   <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                      <CalendarClock size={13} className="text-slate-400 shrink-0" /> 
                      Joined {s.date}
                   </div>
                </div>

                {/* 3. Status & Actions */}
                <div className="flex items-center justify-between md:justify-end gap-6 md:w-[30%]">
                  <span className={`text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-lg border ${
                    s.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}>
                    {s.status}
                  </span>
                  
                  <div className="flex items-center gap-2">
                     <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-sm">
                       <Send size={16} />
                     </button>
                     <button 
                       onClick={(e) => { e.stopPropagation(); deleteSub(s.id); }} 
                       className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all shadow-sm"
                     >
                       <Trash2 size={16} />
                     </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* --- MODAL --- */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSelectedSub(null)} />
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 lg:p-10 animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-brand-primary/20 shrink-0">
                  {selectedSub.email[0].toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase truncate">
                    {selectedSub.email.split('@')[0]}
                  </h2>
                  <p className="text-xs font-bold text-brand-primary truncate">{selectedSub.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedSub(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400">
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-8">
               <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <p className={`text-sm font-bold ${selectedSub.status === 'Active' ? 'text-emerald-600' : 'text-slate-600'}`}>
                    {selectedSub.status}
                  </p>
               </div>
               <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Acquisition</p>
                  <p className="text-sm font-bold text-slate-800">{selectedSub.source}</p>
               </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-slate-900 text-white py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-brand-primary hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2">
                <Send size={16} /> Broadcast Mail
              </button>
              <button 
                onClick={() => deleteSub(selectedSub.id)}
                className="px-6 py-4 border border-slate-200 rounded-xl text-[11px] font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-50 hover:border-rose-200 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterSubscribers;