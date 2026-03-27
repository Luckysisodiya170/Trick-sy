import React, { useState, useMemo } from 'react';
import { 
  Search, MapPin, Clock, Trash2, 
  CheckCircle, Zap, IndianRupee, Phone, 
  User, Sparkles, X, TrendingUp, CheckSquare, Layers
} from 'lucide-react';

const ServiceBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null); 
  
  const [bookings, setBookings] = useState([
    { id: 'TR-9921', customer: 'Aryan Khan', service: 'AC Maintenance', date: '26 Mar', time: '10:00 AM', status: 'Pending', amount: 1499, location: 'Arera Colony, Bhopal', phone: '+91 98765 43210', features: ['Cooling Coil Wash', 'Gas Level Check', 'Filter Deep Clean'] },
    { id: 'TR-9922', customer: 'Sneha Patel', service: 'Deep Cleaning', date: '25 Mar', time: '02:30 PM', status: 'Confirmed', amount: 4200, location: 'Vijay Nagar, Indore', phone: '+91 88888 12345', features: ['Floor Scrubbing', 'Washroom Sanitization', 'Hard Stain Removal', 'Dusting'] },
    { id: 'TR-9923', customer: 'Kabir Das', service: 'Plumbing Works', date: '25 Mar', time: '09:00 AM', status: 'Completed', amount: 850, location: 'AB Road, Dewas', phone: '+91 77777 99999', features: ['Pipe Leakage Fix', 'Tap Replacement'] },
    { id: 'TR-9924', customer: 'Meera Bai', service: 'Sofa Cleaning', date: '24 Mar', time: '11:15 AM', status: 'Pending', amount: 1200, location: 'Freeganj, Ujjain', phone: '+91 90000 11111', features: ['Dry Vacuuming', 'Shampoo Scrub', 'Spot Treatment'] },
  ]);

  const updateStatus = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    if(selectedBooking) setSelectedBooking(prev => ({...prev, status: newStatus}));
  };

  const deleteBooking = (e, id) => {
    e.stopPropagation();
    if(window.confirm("Delete this booking record?")) {
        setBookings(prev => prev.filter(b => b.id !== id));
        setSelectedBooking(null);
    }
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
    <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-10 font-sans relative">
      
      {/* --- HEADER --- */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-8 mb-8">
        <div>
          <div className="flex items-center gap-2 text-brand-primary mb-1">
            <Sparkles size={12} className="fill-brand-primary" />
            <span className="t-subtitle">Transaction Ledger</span>
          </div>
          <h1 className="t-title text-4xl">
            Service <span className="text-brand-primary">Flow.</span>
          </h1>
          <p className="text-[13px] text-slate-400 font-medium italic">
            {bookings.length} Total Bookings Processed
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors" size={16} />
             <input 
               type="text" placeholder="Search data..." 
               className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl w-full md:w-[280px] outline-none focus:border-brand-primary transition-all font-bold text-[11px] shadow-sm uppercase tracking-widest"
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
        </div>
      </div>

      {/* --- METRICS SECTION  --- */}
      <div className="flex flex-col lg:flex-row gap-5 mb-10">
        <div className="w-full lg:w-[30%] bg-brand-dark p-6 rounded-[2rem] shadow-lg relative overflow-hidden flex flex-col justify-center">
           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-[50px] rounded-full -mr-10 -mt-10 pointer-events-none" />
           <div className="flex items-center gap-2 text-brand-primary mb-2 relative z-10">
             <TrendingUp size={14} />
             <h2 className="t-subtitle text-slate-400">Total Revenue</h2>
           </div>
           <div className="t-accent text-4xl text-white relative z-10">₹{totalRevenue.toLocaleString()}</div>
        </div>

        <div className="w-full lg:w-[70%] grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { status: 'All', icon: <Layers size={14} />, textCol: 'text-slate-700', bgCol: 'bg-slate-100', activeBorder: 'border-slate-800 ring-4 ring-slate-800/10' },
            { status: 'Pending', icon: <Clock size={14} />, textCol: 'text-amber-500', bgCol: 'bg-amber-50', activeBorder: 'border-amber-500 ring-4 ring-amber-500/10' },
            { status: 'Confirmed', icon: <Zap size={14} />, textCol: 'text-brand-primary', bgCol: 'bg-brand-primary/10', activeBorder: 'border-brand-primary ring-4 ring-brand-primary/10' },
            { status: 'Completed', icon: <CheckCircle size={14} />, textCol: 'text-emerald-500', bgCol: 'bg-emerald-50', activeBorder: 'border-emerald-500 ring-4 ring-emerald-500/10' }
          ].map(item => {
            const count = item.status === 'All' ? bookings.length : bookings.filter(b => b.status === item.status).length;
            const isActive = activeFilter === item.status;
            return (
              <button 
                key={item.status}
                onClick={() => setActiveFilter(item.status)}
                className={`bg-white p-4 rounded-[1.5rem] border transition-all duration-300 text-left flex flex-col justify-center cursor-pointer shadow-sm ${
                  isActive ? item.activeBorder + ' scale-[1.02] shadow-md' : 'border-slate-100 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-2 w-full">
                   <div className={`text-2xl font-black ${item.textCol}`}>{count}</div>
                   <div className={`w-8 h-8 rounded-full ${item.bgCol} flex items-center justify-center ${item.textCol}`}>
                      {item.icon}
                   </div>
                </div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{item.status}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* --- FULL WIDTH DATA LIST --- */}
      <div className="w-full space-y-4">
        {filteredData.length === 0 ? (
          <div className="text-center py-10 font-bold text-slate-400">No bookings found for "{activeFilter}"</div>
        ) : (
          filteredData.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedBooking(item)}
              className="group bg-white p-5 md:p-6 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-lg hover:border-brand-primary/40 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer"
            >
              {/* Left Data: Avatar, Name & Features */}
              <div className="flex items-start gap-4 lg:w-[40%]">
                <div className="w-14 h-14 rounded-[1rem] bg-slate-50 text-brand-primary flex items-center justify-center text-xl font-black group-hover:bg-brand-primary group-hover:text-white transition-colors shrink-0 border border-slate-100">
                  {item.customer[0]}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-brand-primary transition-colors tracking-tight">
                    {item.service}
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold text-slate-700">{item.customer}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    <span className="font-bold text-brand-primary">{item.id}</span>
                  </div>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {item.features.slice(0, 2).map((feat, idx) => (
                       <span key={idx} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                         {feat}
                       </span>
                    ))}
                    {item.features.length > 2 && (
                       <span className="text-[10px] font-bold px-2 py-0.5 bg-brand-primary/10 text-brand-primary rounded-md">
                         +{item.features.length - 2} more
                       </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Middle Data:(Location & Time) */}
              <div className="flex flex-col gap-2.5 lg:w-[35%] bg-slate-50/50 p-3 rounded-xl border border-slate-50">
                <div className="flex items-start gap-2.5 text-sm font-bold text-slate-700">
                  <MapPin size={16} className="text-brand-primary shrink-0 mt-0.5" /> 
                  <span className="leading-tight">
                    <span className="text-xs text-slate-400 block mb-0.5 uppercase tracking-wider font-extrabold">Requested From</span>
                    {item.location}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-bold text-slate-700">
                  <Clock size={16} className="text-brand-primary shrink-0" /> 
                  <span>{item.date} <span className="text-slate-300 mx-1">|</span> {item.time}</span>
                </div>
              </div>

              {/* Right Data: Amount, Status & Delete */}
              <div className="flex items-center justify-between lg:justify-end gap-8 lg:w-[20%]">
                <div className="text-right">
                  <p className="text-2xl font-black text-slate-900 tracking-tight">₹{item.amount}</p>
                  <div className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md mt-1 text-[10px] font-extrabold uppercase tracking-widest ${
                    item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                    item.status === 'Confirmed' ? 'bg-brand-primary/10 text-brand-primary' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {item.status}
                  </div>
                </div>
                
                <button 
                  onClick={(e) => deleteBooking(e, item.id)}
                  className="w-12 h-12 rounded-[1rem] bg-white text-slate-400 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all border border-slate-200 shadow-sm shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* - BOOKING  MODAL --- */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setSelectedBooking(null)}
          />
          
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 font-sans">
            <div className="p-6 md:p-8 overflow-y-auto no-scrollbar">
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary text-white flex items-center justify-center text-2xl font-black shadow-md shadow-brand-primary/20">
                  {selectedBooking.customer[0]}
                </div>
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="w-10 h-10 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all text-slate-500 flex items-center justify-center"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-extrabold text-brand-primary">{selectedBooking.id}</span>
                  <div className="h-[1px] flex-1 bg-slate-100" />
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    selectedBooking.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                    selectedBooking.status === 'Confirmed' ? 'bg-brand-primary/10 text-brand-primary' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {selectedBooking.status}
                  </span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  {selectedBooking.service}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                  <p className="text-[11px] font-bold text-slate-400 mb-1 flex items-center gap-1.5 uppercase tracking-widest"><User size={12} className="text-brand-primary" /> Client</p>
                  <p className="text-base font-bold text-slate-900">{selectedBooking.customer}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                  <p className="text-[11px] font-bold text-slate-400 mb-1 flex items-center gap-1.5 uppercase tracking-widest"><IndianRupee size={12} className="text-brand-primary" /> Fee</p>
                  <p className="text-base font-bold text-slate-900">₹{selectedBooking.amount}</p>
                </div>
              </div>

              <div className="mb-6">
                 <h3 className="text-sm font-extrabold text-slate-900 mb-3 border-b border-slate-100 pb-2">Service Inclusions</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedBooking.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                         <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                           <CheckSquare size={12} />
                         </div>
                         <span className="text-xs font-bold text-slate-700">{feature}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-4 px-2 mb-8 border-l-2 border-brand-primary/20 pl-4">
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <Phone size={16} className="text-brand-primary shrink-0" /> {selectedBooking.phone}
                 </div>
                 <div className="flex items-start gap-3 text-sm font-bold text-slate-700">
                    <MapPin size={16} className="text-brand-primary shrink-0 mt-0.5" /> 
                    <span>
                      <span className="text-[10px] text-slate-400 block mb-0.5 uppercase tracking-wider font-extrabold">Service Location</span>
                      {selectedBooking.location}
                    </span>
                 </div>
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <Clock size={16} className="text-brand-primary shrink-0" /> {selectedBooking.date} • {selectedBooking.time}
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => updateStatus(selectedBooking.id, 'Completed')}
                  className="py-4 bg-emerald-500 text-white rounded-[1.2rem] text-xs font-extrabold shadow-md shadow-emerald-100 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                >
                  <CheckCircle size={16} /> Mark Done
                </button>
                <button 
                  onClick={() => updateStatus(selectedBooking.id, 'Confirmed')}
                  className="py-4 bg-slate-900 text-white rounded-[1.2rem] text-xs font-extrabold shadow-md shadow-slate-200 hover:bg-black transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                >
                  <Zap size={16} /> Confirm Job
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceBookings;