import React, { useState, useMemo } from 'react';
import { 
  Mail, MailOpen, Trash2, Reply, 
  Star, Search, Filter, CheckCircle, 
  AlertCircle, MoreVertical, Archive
} from 'lucide-react';

const ContactEnquiries = () => {
  const [selectedMail, setSelectedMail] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Production-grade Mock Data
  const [enquiries, setEnquiries] = useState([
    { 
      id: 1, 
      sender: "Arjun Mehta", 
      email: "arjun.m@example.com", 
      subject: "Bulk AC Servicing for Office", 
      message: "Hi Tricksy Team, we have 15 split ACs in our office in JLT. Can you provide a quotation for a seasonal maintenance contract?", 
      date: "10:45 AM", 
      read: false, 
      priority: "high",
      category: "Commercial"
    },
    { 
      id: 2, 
      sender: "Sarah Jenkins", 
      email: "sarah.j@outlook.com", 
      subject: "Emergency Plumbing Issue", 
      message: "There is a major leak in my kitchen. Need someone urgently within the next 2 hours. Please confirm if available.", 
      date: "Yesterday", 
      read: true, 
      priority: "urgent",
      category: "Residential"
    },
    { 
      id: 3, 
      sender: "Vikram Singh", 
      email: "vikram.v@gmail.com", 
      subject: "Partnership Query", 
      message: "I am interested in joining your platform as a service provider for painting works. What is the onboarding process?", 
      date: "24 Mar", 
      read: true, 
      priority: "medium",
      category: "Partnership"
    }
  ]);

  // Filtering Logic (Future Ready: Easily extendable)
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(item => 
      item.sender.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, enquiries]);

  const toggleReadStatus = (id) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, read: !e.read } : e));
  };

  return (
    <div className="flex flex-col h-[calc(100-20px)] bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden m-4 lg:m-8">
      
      {/* --- TOP TOOLBAR --- */}
      <div className="p-6 border-b border-slate-50 flex flex-wrap items-center justify-between gap-4 bg-slate-50/30">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search enquiries..."
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm text-slate-600">
            <Filter size={18} />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2">Quick Actions</span>
          <button className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
            <Trash2 size={18} />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <Archive size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden min-h-[600px]">
        
        {/* --- LEFT: ENQUIRY LIST --- */}
        <div className="w-full lg:w-[400px] border-r border-slate-50 overflow-y-auto bg-white">
          {filteredEnquiries.map((mail) => (
            <div 
              key={mail.id}
              onClick={() => { setSelectedMail(mail); toggleReadStatus(mail.id); }}
              className={`p-6 border-b border-slate-50 cursor-pointer transition-all relative group
                ${selectedMail?.id === mail.id ? 'bg-indigo-50/50' : 'hover:bg-slate-50/80'}
                ${!mail.read ? 'border-l-4 border-l-indigo-600' : 'border-l-4 border-l-transparent'}
              `}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className={`text-sm tracking-tight ${!mail.read ? 'font-black text-slate-900' : 'font-bold text-slate-600'}`}>
                  {mail.sender}
                </h4>
                <span className="text-[10px] font-bold text-slate-400">{mail.date}</span>
              </div>
              <p className={`text-xs mb-2 truncate ${!mail.read ? 'font-bold text-slate-800' : 'text-slate-500'}`}>
                {mail.subject}
              </p>
              <div className="flex gap-2">
                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border 
                  ${mail.priority === 'urgent' ? 'bg-rose-50 text-rose-500 border-rose-100' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                  {mail.priority}
                </span>
                <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                  {mail.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* --- RIGHT: MESSAGE VIEW --- */}
        <div className="hidden lg:flex flex-1 bg-slate-50/20 flex-col">
          {selectedMail ? (
            <div className="p-10 flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2 italic uppercase tracking-tight leading-tight">
                    {selectedMail.subject}
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-100">
                      {selectedMail.sender[0]}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">{selectedMail.sender}</p>
                      <p className="text-xs text-slate-400 font-medium italic">From: {selectedMail.email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:scale-105 transition-all">
                    <Reply size={14} /> Reply Now
                  </button>
                  <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-rose-50 hover:text-rose-500 transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex-1 mb-6">
                <p className="text-slate-700 leading-relaxed font-medium">
                  {selectedMail.message}
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 bg-white border border-slate-100 p-4 rounded-3xl flex items-center justify-between shadow-sm">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 italic">Mark as resolved?</span>
                  <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-md">
                    <CheckCircle size={12} /> Resolve
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
              <Mail size={80} strokeWidth={0.5} className="mb-4 opacity-20" />
              <p className="font-black uppercase tracking-[0.3em] italic text-xs">Select an enquiry to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactEnquiries;