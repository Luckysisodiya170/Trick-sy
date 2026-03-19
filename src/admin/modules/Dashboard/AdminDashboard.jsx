import React from 'react';
import { ArrowUpRight, CheckCircle2, Clock, Users, Wrench } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: "Total Bookings", value: "1,248", trend: "+12%", icon: <CheckCircle2 className="text-emerald-500" /> },
    { title: "Active Services", value: "24", trend: "+2", icon: <Wrench className="text-blue-500" /> },
    { title: "Pending Leads", value: "18", trend: "-5%", icon: <Clock className="text-amber-500" /> },
    { title: "Available Techs", value: "45", trend: "Stable", icon: <Users className="text-purple-500" /> }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 font-medium">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <button className="bg-slate-950 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-500 transition-colors shadow-lg">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                {stat.icon}
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {stat.trend} <ArrowUpRight size={12} />
              </span>
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.title}</p>
            <h3 className="text-4xl font-black text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;