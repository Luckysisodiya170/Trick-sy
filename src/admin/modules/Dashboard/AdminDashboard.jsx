import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Wrench, Star, LayoutGrid, Sparkles, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const data = [
  { day: 'Mon', bookings: 400 },
  { day: 'Tue', bookings: 1300 },
  { day: 'Wed', bookings: 600 },
  { day: 'Thu', bookings: 1800 },
  { day: 'Fri', bookings: 2500 },
  { day: 'Sat', bookings: 1950 },
  { day: 'Sun', bookings: 3000 },
];

const recentActivities = [
  {
    id: 1,
    title: 'New Booking Completed',
    description: 'Order #4892 from John Doe',
    time: '2 mins ago',
    icon: <CheckCircle size={18} className="text-emerald-500" />,
    bgColor: 'bg-emerald-50'
  },
  {
    id: 2,
    title: 'System Server Sync',
    description: 'All databases updated successfully',
    time: '1 hour ago',
    icon: <Sparkles size={18} className="text-brand-primary" />,
    bgColor: 'bg-brand-primary/10'
  },
  {
    id: 3,
    title: 'Maintenance Alert Resolved',
    description: 'Unit A-42 cooling system checked',
    time: '3 hours ago',
    icon: <Wrench size={18} className="text-amber-500" />,
    bgColor: 'bg-amber-50'
  }
];

const ColorfulDashboard = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-10 flex flex-col gap-8">
      
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-8">
        <div>
          <div className="flex items-center gap-2 text-brand-primary mb-1">
            <Sparkles size={12} className="fill-brand-primary" />
            <span className="t-subtitle">Performance Tracking</span>
          </div>
          <h1 className="t-title text-4xl">
            Tricksy <span className="text-brand-primary">Dashboard.</span>
          </h1>
          <p className="text-[13px] text-slate-400 font-medium italic">
            System Overview & Real-time Analytics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-5 py-3 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="t-nav text-[10px]">System Live</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm hover:border-brand-primary transition-all cursor-pointer">
             <LayoutGrid size={20} className="text-brand-primary" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Revenue", val: "₹12,480", icon: <Zap />, color: "text-brand-primary" },
          { label: "Active Jobs", val: "84 Units", icon: <Wrench />, color: "text-slate-700" },
          { label: "Rating", val: "4.9 / 5.0", icon: <Star />, color: "text-rose-500" }
        ].map((s, i) => (
          <div key={i} className="group p-[2px] rounded-[1.8rem] bg-gradient-to-br from-white to-slate-50 border border-slate-100 shadow-sm hover:from-brand-primary hover:to-brand-primary/80 transition-all duration-300">
            <div className="bg-white px-6 py-4 rounded-[1.7rem] flex items-center justify-between min-h-[90px]">
              <div className="flex items-center gap-4">
                <div className={`${s.color} bg-slate-50 w-14 h-14 rounded-full flex items-center justify-center border border-slate-100 group-hover:bg-white group-hover:scale-110 transition-transform`}>
                   {React.cloneElement(s.icon, { size: 24, className: s.color })}
                </div>
                <div>
                   <p className="t-nav text-slate-400 italic mb-1 uppercase tracking-widest">{s.label}</p>
                   <h3 className="t-accent text-3xl text-slate-800 tracking-tighter leading-none">{s.val}</h3>
                </div>
              </div>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
          </div>
        ))}
      </div>

      <div className="w-full bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h3 className="t-nav text-slate-800 tracking-normal normal-case text-sm font-black italic">Booking Velocity</h3>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Scale: 0 - 1000 Units</span>
          </div>
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse mt-1.5" />
            <span className="t-nav text-[9px] text-brand-primary uppercase tracking-widest">Real-time Data</span>
          </div>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.12}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="#f8fafc" />
              
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fontWeight: 700, fill: '#334155', letterSpacing: '0.5px'}} 
                dy={10}
              />
              
              <YAxis 
                domain={[0, 'auto']} 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fontWeight: 700, fill: '#334155'}} 
              />
              
              <Tooltip 
                cursor={{ stroke: '#4f46e5', strokeWidth: 1 }}
                contentStyle={{
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', 
                  fontSize: '11px', 
                  fontWeight: '600'
                }}
              />
              
              <Area 
                type="monotone" 
                dataKey="bookings" 
                stroke="#4f46e5" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorBookings)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="w-full bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2 mb-6">
          <Clock size={16} className="text-brand-primary" />
          <h3 className="t-nav text-slate-800 tracking-normal normal-case text-sm font-black italic">Recent Activity</h3>
        </div>
        
        <div className="flex flex-col gap-4">
          {recentActivities.map((activity) => (
            <div 
              key={activity.id} 
              className="group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activity.bgColor}`}>
                  {activity.icon}
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-800">{activity.title}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{activity.description}</p>
                </div>
              </div>
              <div className="mt-3 md:mt-0 ml-16 md:ml-0">
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ColorfulDashboard;