import React, { useState } from 'react';
import { Mail, Download, Trash2, Search, CheckCircle, Send, Users } from 'lucide-react';

const NewsletterSubscribers = () => {
  const [subs] = useState([
    { id: 1, email: 'amit.verma@gmail.com', date: '26 Mar, 2026', status: 'Active' },
    { id: 2, email: 'priya.indore@outlook.com', date: '24 Mar, 2026', status: 'Active' },
    { id: 3, email: 'rocky_dev@tricksy.in', date: '20 Mar, 2026', status: 'Unsubscribed' },
  ]);

  return (
    <div className="p-6 lg:p-10 bg-[#F8FAFC] min-h-screen">
      {/* Header with Stats */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900">
            Email <span className="text-indigo-600">List</span>
          </h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Broadcast your updates to {subs.length} users</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
             <Users size={18} className="text-indigo-600" />
             <span className="text-xl font-black italic">1.2K</span>
          </div>
          <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Find subscriber..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500/10" />
          </div>
          <button className="text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:underline">Mark all as seen</button>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-50">
              <th className="px-10 py-6">Subscriber Email</th>
              <th className="px-6 py-6">Joined Date</th>
              <th className="px-6 py-6">Status</th>
              <th className="px-10 py-6 text-right">Manage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {subs.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-10 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Mail size={14} className="text-indigo-600" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{s.email}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-xs font-medium text-slate-400">{s.date}</td>
                <td className="px-6 py-5">
                  <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border ${s.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-10 py-5 text-right">
                  <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsletterSubscribers;