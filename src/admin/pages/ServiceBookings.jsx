import React, { useState, useMemo } from 'react';
import { 
  Search, Calendar, Clock, MapPin, 
  TrendingUp, ChevronRight, X, 
  Trash2, CheckCircle, Zap,
  IndianRupee, Phone, User, Settings
} from 'lucide-react';

const ServiceBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null); // Modal State
  const [bookings, setBookings] = useState([
    { id: 'TR-9921', customer: 'Aryan Khan', service: 'AC Maintenance', date: '26 Mar', time: '10:00 AM', status: 'Pending', amount: 1499, location: 'Bhopal', phone: '+91 98765 43210' },
    { id: 'TR-9922', customer: 'Sneha Patel', service: 'Deep Cleaning', date: '25 Mar', time: '02:30 PM', status: 'Confirmed', amount: 4200, location: 'Indore', phone: '+91 88888 12345' },
    { id: 'TR-9923', customer: 'Kabir Das', service: 'Plumbing Works', date: '25 Mar', time: '09:00 AM', status: 'Completed', amount: 850, location: 'Dewas', phone: '+91 77777 99999' },
    { id: 'TR-9924', customer: 'Meera Bai', service: 'Electrical Repair', date: '24 Mar', time: '11:15 AM', status: 'Cancelled', amount: 1200, location: 'Ujjain', phone: '+91 90000 11111' },
  ]);

  // --- ACTIONS ---
  const updateStatus = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    if(selectedBooking) setSelectedBooking(prev => ({...prev, status: newStatus}));
  };

  const deleteBooking = (e, id) => {
    e.stopPropagation();
    setBookings(prev => prev.filter(b => b.id !== id));
    setSelectedBooking(null);
  };

  const filteredData = useMemo(() => {
    return bookings.filter(item => {
      const matchesSearch = item.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.service.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === "All" || item.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter, bookings]);

  const totalRevenue = useMemo(() => {
    return bookings.filter(b => b.status === 'Completed').reduce((sum, b) => sum + b.amount, 0);
  }, [bookings]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-10 font-sans text-slate-900 relative">
      
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
              Service <span className="text-indigo-600">Flow</span>
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-3">Central Intelligence Unit</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 w-full md:w-auto group focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
            <Search className="ml-3 text-slate-300 group-focus-within:text-indigo-600" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH DATA..." 
              className="bg-transparent outline-none p-2 text-xs font-black uppercase tracking-widest w-full md:w-48"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {['All', 'Pending', 'Confirmed', 'Completed'].map(t => (
                <button 
                  key={t}
                  onClick={() => setActiveFilter(t)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === t ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-400 border border-slate-100 hover:border-indigo-200'}`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredData.map((item) => (
                <div 
                  key={item.id}
                  className="group relative bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.status === 'Completed' ? 'bg-emerald-500' : item.status === 'Pending' ? 'bg-amber-400' : 'bg-indigo-500'}`} />

                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-indigo-600 font-black text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      {item.customer[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 uppercase italic leading-none">{item.service}</h3>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{item.customer} • {item.id}</p>
                    </div>
                  </div>

                  {/* QUICK ACTIONS */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setSelectedBooking(item)}
                      className="px-6 py-3 bg-slate-50 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-900 hover:text-white transition-all border border-slate-100"
                    >
                      Open Details
                    </button>
                    <button 
                      onClick={(e) => deleteBooking(e, item.id)}
                      className="p-3 bg-white text-rose-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm border border-slate-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="text-xl font-black text-slate-900 leading-none tracking-tighter italic">₹{item.amount}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{item.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR STATS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
              <TrendingUp className="text-indigo-400 mb-6" size={32} />
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Earnings</h2>
              <div className="text-5xl font-black italic tracking-tighter mb-4">₹{totalRevenue.toLocaleString()}</div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full -mr-20 -mt-20" />
            </div>

            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-50 pb-4 italic">Insights</h3>
              <div className="space-y-4">
                {['Pending', 'Confirmed', 'Completed'].map(s => (
                  <div key={s} className="flex justify-between items-center">
                    <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">{s}</span>
                    <span className="text-xs font-black text-slate-900 bg-slate-50 px-3 py-1 rounded-lg italic">
                      {bookings.filter(b => b.status === s).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CENTER MODAL WITH BLUR --- */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          {/* Blur Overlay */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl transition-all"
            onClick={() => setSelectedBooking(null)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-lg rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white">
            <div className="p-10 lg:p-14">
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 rounded-3xl bg-indigo-600 text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-indigo-100 italic">
                  {selectedBooking.customer[0]}
                </div>
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="p-4 bg-slate-50 rounded-2xl hover:bg-slate-900 hover:text-white transition-all text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{selectedBooking.id}</span>
                    <div className="h-[1px] flex-1 bg-slate-100" />
                  </div>
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">
                    {selectedBooking.service}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100/50">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-2 flex items-center gap-1"><User size={10} /> Client</p>
                    <p className="text-sm font-black text-slate-900 italic">{selectedBooking.customer}</p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100/50">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-2 flex items-center gap-1"><IndianRupee size={10} /> Price</p>
                    <p className="text-sm font-black text-slate-900 italic">₹{selectedBooking.amount}</p>
                  </div>
                </div>

                <div className="space-y-3 px-2">
                   <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600"><Phone size={14} /></div>
                      {selectedBooking.phone}
                   </div>
                   <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600"><MapPin size={14} /></div>
                      {selectedBooking.location}
                   </div>
                   <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600"><Clock size={14} /></div>
                      {selectedBooking.date} • {selectedBooking.time}
                   </div>
                </div>

                <div className="pt-8 grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => updateStatus(selectedBooking.id, 'Completed')}
                    className="py-5 bg-emerald-500 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-100 hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={14} /> Complete
                  </button>
                  <button 
                    onClick={() => updateStatus(selectedBooking.id, 'Confirmed')}
                    className="py-5 bg-slate-900 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <Zap size={14} /> Confirm
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

export default ServiceBookings;