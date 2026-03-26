import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Zap, Users, Wrench, Star, LayoutGrid 
} from 'lucide-react';

const data = [
  { name: 'Mon', bookings: 400 },
  { name: 'Tue', bookings: 300 },
  { name: 'Wed', bookings: 600 },
  { name: 'Thu', bookings: 800 },
  { name: 'Fri', bookings: 500 },
  { name: 'Sat', bookings: 900 },
  { name: 'Sun', bookings: 700 },
];

const serviceData = [
  { name: 'AC', value: 45, color: '#10b981' },
  { name: 'Clean', value: 30, color: '#3b82f6' },
  { name: 'Plumb', value: 15, color: '#f59e0b' },
  { name: 'Paint', value: 10, color: '#8b5cf6' },
];

const ColorfulDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 font-sans text-slate-900">
      
      {/* --- MINIMAL TOP BAR --- */}
      <div className="flex justify-between items-center mb-10 px-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">System Live</span>
          </div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-800">
            Tricksy <span className="text-indigo-600">Dashboard</span>
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Access Node</p>
            <p className="text-[11px] font-bold text-slate-700">DXB_ADMIN_MAIN</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
             <LayoutGrid size={18} className="text-indigo-600" />
          </div>
        </div>
      </div>

      {/* --- STATS ROW --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Revenue", val: "₹12,480", icon: <Zap size={16}/>, color: "bg-amber-500" },
          { label: "Active Jobs", val: "84", icon: <Wrench size={16}/>, color: "bg-indigo-600" },
          { label: "Rating", val: "4.9/5", icon: <Star size={16}/>, color: "bg-rose-500" }
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4 hover:translate-y-[-2px] transition-all">
            <div className={`${s.color} w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-inner shrink-0`}>
              {s.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{s.label}</p>
              <h3 className="text-xl font-black text-slate-800">{s.val}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* --- GRAPHS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Area Chart */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-black italic uppercase text-sm tracking-widest text-slate-400">Booking Velocity</h3>
            <div className="flex gap-2">
               <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase">Weekly</span>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  itemStyle={{fontWeight: '800', color: '#6366f1', fontSize: '12px'}}
                />
                <Area type="monotone" dataKey="bookings" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorBookings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Bar Chart / Distribution */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="font-black italic uppercase text-sm tracking-widest text-slate-400 mb-8">Service Split</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceData}>
                  <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={28}>
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 space-y-3">
              {serviceData.map((s, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: s.color}} />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-800">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Card - Minimal Version */}
          <div className="bg-indigo-600 p-8 rounded-[3rem] text-white relative overflow-hidden shadow-xl shadow-indigo-100">
            <div className="relative z-10">
              <h4 className="font-black text-xl italic uppercase leading-tight mb-4 tracking-tighter">Team<br/>Expansion</h4>
              <p className="text-indigo-100 text-[11px] font-medium mb-6 leading-relaxed opacity-80">3 new requests pending in Marina district. Boost fleet?</p>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
                Dispatch Pro
              </button>
            </div>
            <Users className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-10" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ColorfulDashboard;