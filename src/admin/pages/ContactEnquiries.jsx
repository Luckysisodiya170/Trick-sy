import React, { useState, useMemo } from 'react';
import { 
  Send, Sparkles, Clock, X,
  ChevronRight, Search, Plus, 
  Zap, Star, Filter, MessageSquare, AlertCircle
} from 'lucide-react';

const ContactEnquiries = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null); 

  const [enquiries] = useState([
    { 
      id: 1, 
      sender: "Arjun Mehta", 
      subject: "Bulk AC Servicing", 
      message: "Hi Tricksy Team, we have 15 split ACs in our office in JLT. Can you provide a quotation for a seasonal maintenance contract?", 
      tag: "Partner",
      time: "10:45 AM",
      priority: "High",
      email: "arjun@office.com"
    },
    { 
      id: 2, 
      sender: "Sarah Jenkins", 
      subject: "Emergency Leak", 
      message: "There is a major leak in my kitchen. Need someone urgently within the next 2 hours. Please confirm if available.", 
      tag: "Urgent",
      time: "Just Now",
      priority: "Urgent",
      email: "sarah.j@web.com"
    },
    { 
      id: 3, 
      sender: "Vikram Singh", 
      subject: "Partnership Query", 
      message: "I am interested in joining your platform as a service provider for painting works.", 
      tag: "Partner",
      time: "24 Mar",
      priority: "Normal",
      email: "vikram@paint.pro"
    }
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
    <div className="min-h-screen bg-[#F8FAFF] text-slate-900 p-4 lg:p-10 font-sans relative overflow-x-hidden">
      
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/50 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER & SEARCH --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-none mb-2">
              Contact <span className="text-indigo-600">Queries.</span>
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Operational Intelligence Panel</p>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search signals..." 
                className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-3xl shadow-sm outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all font-bold text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-400 hover:text-indigo-600 hover:shadow-md transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-10">
          {['All', 'Urgent', 'Partner'].map((f) => (
            <button 
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border ${
                activeFilter === f 
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-200 -translate-y-1' 
                : 'bg-white text-slate-400 border-slate-100 hover:border-indigo-200'
              }`}
            >
              {f} Signals
            </button>
          ))}
        </div>

        {/* ---  CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedEnquiry(item)}
              className="group bg-white p-8 rounded-[3rem] border border-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  {item.sender[0]}
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">{item.time}</p>
                  <span className={`text-[8px] font-black px-2 py-1 rounded-md uppercase ${item.tag === 'Urgent' ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-500'}`}>
                    {item.tag}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3 group-hover:text-indigo-600 transition-colors line-clamp-1">
                {item.subject}
              </h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-2 mb-8">
                {item.message}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter italic">{item.sender}</span>
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200">
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-20">
            <AlertCircle size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No signals found matching your filters</p>
          </div>
        )}
      </div>

      {/* --- DETAIL MODAL --- */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setSelectedEnquiry(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-10 lg:p-14">
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 text-white flex items-center justify-center text-2xl font-black shadow-xl shadow-indigo-100">
                    {selectedEnquiry.sender[0]}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedEnquiry.sender}</h2>
                    <p className="text-sm font-bold text-indigo-500">{selectedEnquiry.email}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedEnquiry(null)} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-300 hover:text-slate-900 transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Subject</p>
                  <h4 className="text-xl font-bold text-slate-900 italic">"{selectedEnquiry.subject}"</h4>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                  <p className="text-slate-600 font-medium leading-relaxed">{selectedEnquiry.message}</p>
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button className="flex-1 bg-slate-900 text-white py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3">
                  <Send size={16} fill="white" /> Reply Now
                </button>
                <button className="px-8 py-5 border border-slate-100 rounded-2xl text-xs font-black uppercase text-slate-400 hover:bg-slate-50 transition-all">
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