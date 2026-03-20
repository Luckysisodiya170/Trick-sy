import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Wrench, MessageSquare, LogOut, 
  MonitorPlay, Layout, Layers, Settings, ShieldCheck,
  UserCircle, FileText, Briefcase, Inbox, Mail, ChevronLeft
} from 'lucide-react';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const linkClass = ({ isActive }) => 
    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-semibold transition-all ${
      isActive 
        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
        : 'text-slate-500 hover:text-white hover:bg-white/5'
    }`;

  return (
    <aside className={`bg-[#0a0a0a] border-r border-white/5 w-80 flex-shrink-0 transition-all duration-300 flex flex-col fixed lg:relative z-50 h-full ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:hidden'}`}>
      
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 shrink-0">
        <div className="flex items-center">
          <ShieldCheck className="w-5 h-5 text-emerald-500 mr-2" />
          <h1 className="text-lg font-black text-white tracking-tighter uppercase">
            Tricksy<span className="text-emerald-500">_Admin</span>
          </h1>
        </div>
        
        {/* Drawer Close Button */}
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="p-1.5 rounded-lg bg-white text-slate-900 hover:bg-emerald-500 hover:text-white transition-all shadow-lg active:scale-95"
          title="Close Sidebar"
        >
          <ChevronLeft size={18} strokeWidth={3} />
        </button>
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto custom-scrollbar space-y-5">
        <div className="px-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-700 mb-2 px-2">Core</p>
          <NavLink to="/admin" end className={linkClass}><LayoutDashboard size={16} /> Dashboard</NavLink>
        </div>

        <div className="px-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-700 mb-2 px-2">Site Layout</p>
          <div className="grid grid-cols-1 gap-0.5">
            <NavLink to="/admin/pages/home" className={linkClass}><MonitorPlay size={16} /> Home Page</NavLink>
            <NavLink to="/admin/pages/about" className={linkClass}><UserCircle size={16} /> About Us</NavLink>
            <NavLink to="/admin/pages/services" className={linkClass}><Briefcase size={16} /> Services Page</NavLink>
            <NavLink to="/admin/pages/blog" className={linkClass}><FileText size={16} /> Blog Page</NavLink>
            <NavLink to="/admin/pages/technical" className={linkClass}><Layout size={16} /> Technical Detail</NavLink>
            <NavLink to="/admin/pages/contact" className={linkClass}><Layers size={16} /> Contact Page</NavLink>
          </div>
        </div>

        <div className="px-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-700 mb-2 px-2">Interactions</p>
          <div className="space-y-0.5">
            <NavLink to="/admin/leads" className={linkClass}><MessageSquare size={16} /> Service Bookings</NavLink>
            <NavLink to="/admin/enquiries" className={linkClass}><Inbox size={16} /> Contact Enquiries</NavLink>
            <NavLink to="/admin/newsletter" className={linkClass}><Mail size={16} /> Newsletter Subs</NavLink>
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-white/5 shrink-0 space-y-0.5">
        <NavLink to="/admin/settings" className={linkClass}><Settings size={16} /> Settings</NavLink>
        <button className="flex items-center gap-2.5 px-3 py-2 w-full rounded-lg text-[13px] font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;