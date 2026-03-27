import React, { useState, useMemo } from 'react';
import {
  Send, Sparkles, X, ChevronRight, Search, Filter, AlertCircle
} from 'lucide-react';

const ContactEnquiries = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const [enquiries] = useState([
    { id: 1, sender: "Arjun Mehta", subject: "Bulk AC Servicing", message: "Hi Tricksy Team, we have 15 split ACs in our office in JLT. Can you provide a quotation for a seasonal maintenance contract?", tag: "Partner", time: "10:45 AM", priority: "High", email: "arjun@office.com" },
    { id: 2, sender: "Sarah Jenkins", subject: "Emergency Leak", message: "There is a major leak in my kitchen. Need someone urgently within the next 2 hours. Please confirm if available.", tag: "Urgent", time: "Just Now", priority: "Urgent", email: "sarah.j@web.com" },
    { id: 3, sender: "Vikram Singh", subject: "Partnership Query", message: "I am interested in joining your platform as a service provider for painting works.", tag: "Partner", time: "24 Mar", priority: "Normal", email: "vikram@paint.pro" }
  ]);

  const filteredData = useMemo(() => {
    return enquiries.filter(item => {
      const matchesSearch = item.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === "All" || item.tag === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter, enquiries]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 p-6 lg:p-12 font-sans relative overflow-x-hidden">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">

        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 border-b border-slate-100 pb-10">
          <div className="space-y-1">
            <div className="brand-icon-label">
               <Sparkles size={14} className="fill-brand-primary" />
               <span className="t-subtitle">Operation Intelligence</span>
             </div>

            <h1 className="page-title text-4xl md:text-5xl">
              CONTACT <span>QUERIES.</span>
            </h1>
            <p className="page-subtitle">
              Managing incoming signals and partner requests
            </p>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80 border-2 border-slate-100 rounded-2xl focus-within:border-brand-primary/50 transition-colors" >
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="text"
                placeholder="Search signals..."
                className="w-full pl-14 pr-6 py-3 rounded-2xl outline-none transition-all font-bold text-sm bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* --- FILTERS --- */}
        <div className="flex flex-wrap gap-4 mb-12">
          {['All', 'Urgent', 'Partner'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-8 py-4 rounded-2xl t-nav transition-all border ${
                activeFilter === f
                  ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/30 -translate-y-1'
                  : 'bg-white text-slate-400 border-slate-100 hover:border-brand-primary/30 shadow-sm'
              }`}
            >
              {f} Signals
            </button>
          ))}
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedEnquiry(item)}
              className="group bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-brand-primary/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-8">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary font-black text-xl group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                  {item.sender[0]}
                </div>
                <div className="text-right">
                  <p className="t-subtitle leading-none mb-2">{item.time}</p>
                  <span className={`t-nav text-[9px] px-3 py-1.5 rounded-xl ${
                    item.tag === 'Urgent' ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {item.tag}
                  </span>
                </div>
              </div>

              <h3 className="t-accent text-2xl tracking-tight mb-3 group-hover:text-brand-primary transition-colors line-clamp-1">
                {item.subject}
              </h3>
              
              <p className="t-body line-clamp-2 mb-8 italic">
                "{item.message}"
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <span className="t-subtitle italic">{item.sender}</span>
                <div className="w-10 h-10 rounded-xl bg-brand-dark text-white flex items-center justify-center group-hover:bg-brand-primary transition-all shadow-lg active:scale-90">
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-20 bg-white/50 rounded-[3rem] border-2 border-dashed border-slate-100 mt-8">
            <AlertCircle size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="t-subtitle">No signals detected</p>
          </div>
        )}
      </div>

      {/* --- DETAIL MODAL --- */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setSelectedEnquiry(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-slate-100">
            <div className="p-10 lg:p-14">
              
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-5">
                  {/* Avatar Modal */}
                  <div className="w-16 h-16 rounded-2xl bg-brand-primary text-white flex items-center justify-center text-2xl font-black shadow-xl shadow-brand-primary/30">
                    {selectedEnquiry.sender[0]}
                  </div>
                  <div>
                    <h2 className="t-title text-3xl leading-none mb-1">{selectedEnquiry.sender}</h2>
                    <p className="t-nav text-brand-primary mt-1.5">{selectedEnquiry.email}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedEnquiry(null)} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-300 hover:text-brand-dark transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                  <p className="t-body text-base text-slate-700 italic">"{selectedEnquiry.message}"</p>
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button className="flex-1 bg-brand-dark text-white py-5 rounded-2xl t-nav hover:bg-brand-primary transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-[0.98]">
                  <Send size={16} fill="currentColor" /> Dispatch Reply
                </button>
                <button className="px-8 py-5 border border-slate-100 rounded-2xl t-nav text-slate-400 hover:bg-slate-50 hover:text-brand-dark transition-all active:scale-95">
                  Archive
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactEnquiries;