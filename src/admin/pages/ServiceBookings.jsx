import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, MoreHorizontal, 
  CheckCircle2, Clock, XCircle, 
  Download, Eye, Trash2, ChevronRight,
  User, Calendar, CreditCard,
} from 'lucide-react';

const ServiceBookings = () => {
  // Production State Management
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Mock Data: Real world projects mein ye API se aayega
  const [bookings] = useState([
    { id: 'TR-9921', customer: 'Aryan Khan', service: 'AC Maintenance', date: '26 Mar, 2026', time: '10:00 AM', status: 'Pending', amount: '₹1,499', location: 'Bhopal, MP' },
    { id: 'TR-9922', customer: 'Sneha Patel', service: 'Deep Cleaning', date: '25 Mar, 2026', time: '02:30 PM', status: 'Confirmed', amount: '₹4,200', location: 'Indore, MP' },
    { id: 'TR-9923', customer: 'Kabir Das', service: 'Plumbing Works', date: '25 Mar, 2026', time: '09:00 AM', status: 'Completed', amount: '₹850', location: 'Dewas, MP' },
    { id: 'TR-9924', customer: 'Meera Bai', service: 'Electrical Repair', date: '24 Mar, 2026', time: '11:15 AM', status: 'Cancelled', amount: '₹1,200', location: 'Ujjain, MP' },
  ]);

  // Performance Optimization: Memoized Filtering
  const filteredData = useMemo(() => {
    return bookings.filter(item => {
      const matchesSearch = item.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "All" || item.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterStatus, bookings]);

  const getStatusStyles = (status) => {
    const styles = {
      'Confirmed': 'bg-emerald-50 text-emerald-600 border-emerald-100',
      'Completed': 'bg-indigo-50 text-indigo-600 border-indigo-100',
      'Cancelled': 'bg-rose-50 text-rose-500 border-rose-100',
      'Pending': 'bg-amber-50 text-amber-600 border-amber-100'
    };
    return styles[status] || 'bg-slate-50 text-slate-500';
  };

  return (
    <div className="p-4 lg:p-10 bg-[#F8FAFC] min-h-screen font-sans">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-1 w-8 bg-indigo-600 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Operations Control</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
            Service <span className="text-indigo-600">Leads</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="group flex items-center gap-2 bg-white border-2 border-slate-100 px-6 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-indigo-600 transition-all shadow-sm">
            <Download size={16} className="group-hover:translate-y-0.5 transition-transform" /> Export Data
          </button>
        </div>
      </div>

      {/* --- CONTROLS: SEARCH & FILTERS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
        <div className="lg:col-span-8 relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by Client Name or Order ID..." 
            className="w-full pl-14 pr-6 py-4 bg-white border-2 border-slate-100 rounded-[1.5rem] text-sm font-bold focus:border-indigo-600/20 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="lg:col-span-4">
          <select 
            className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-[1.5rem] text-sm font-black uppercase tracking-widest outline-none cursor-pointer hover:border-indigo-600 transition-all shadow-sm"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-white rounded-[3rem] border-2 border-slate-50 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-left">Order Detail</th>
                <th className="px-6 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-left">Customer</th>
                <th className="px-6 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-left">Logistics</th>
                <th className="px-6 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-left">Status</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((item) => (
                <tr key={item.id} className="group hover:bg-indigo-50/30 transition-all cursor-pointer">
                  <td className="px-10 py-7">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-indigo-600 mb-1">{item.id}</span>
                      <span className="text-sm font-bold text-slate-800 uppercase tracking-tight">{item.service}</span>
                    </div>
                  </td>
                  <td className="px-6 py-7">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-black group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        {item.customer[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-800">{item.customer}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-7">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-600 font-bold text-xs">
                        <Calendar size={12} className="text-indigo-500" /> {item.date}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 font-medium text-[10px]">
                        <Clock size={12} /> {item.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-7">
                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase border-2 tracking-widest ${getStatusStyles(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <div className="flex items-center justify-end gap-6">
                      <div className="text-right">
                        <p className="text-sm font-black text-slate-900 leading-none mb-1">{item.amount}</p>
                        <p className="text-[9px] font-bold text-emerald-500 uppercase">Paid via UPI</p>
                      </div>
                      <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredData.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-slate-200" />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-widest italic text-xs">No bookings found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceBookings;