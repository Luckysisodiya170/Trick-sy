import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Wrench, MessageSquare, LogOut, 
  MonitorPlay, Layout, Layers, Settings, ShieldCheck
} from 'lucide-react';

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('tricksyAdminAuth');
    navigate('/admin-login');
  };

  // Naya Sleek Design Classes
  const linkClass = ({ isActive }) => 
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
      isActive 
        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    // 🔥 Width w-64 se w-72 kar di gayi hai for a wider, spacious look
    <aside className={`bg-[#0a0a0a] border-r border-white/5 w-72 flex-shrink-0 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full absolute z-50 h-full'}`}>
      
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-white/5 shrink-0">
        <ShieldCheck className="w-6 h-6 text-emerald-500 mr-2" />
        {/* 🔥 Text CMS se Admin kar diya */}
        <h1 className="text-xl font-black text-white tracking-tighter uppercase">
          Tricksy<span className="text-emerald-500">_Admin</span>
        </h1>
      </div>
      
      <div className="flex-1 py-6 overflow-y-auto">
        
        {/* Core Management */}
        <div className="px-4 mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-3 px-2">Core</p>
          <div className="space-y-1">
            <NavLink to="/admin" end className={linkClass}>
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
            <NavLink to="/admin/services" className={linkClass}>
              <Wrench size={18} /> Services Catalog
            </NavLink>
            <NavLink to="/admin/leads" className={linkClass}>
              <MessageSquare size={18} /> Bookings & Leads
            </NavLink>
          </div>
        </div>

        {/* Frontend Pages */}
        <div className="px-4 mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-3 px-2">Frontend Control</p>
          <div className="space-y-1">
            <NavLink to="/admin/pages/home" className={linkClass}>
              <MonitorPlay size={18} /> Home Page
            </NavLink>
            <NavLink to="/admin/pages/technical" className={linkClass}>
              <Layout size={18} /> Technical Detail
            </NavLink>
            <NavLink to="/admin/pages/contact" className={linkClass}>
              <Layers size={18} /> Contact Page
            </NavLink>
          </div>
        </div>

      </div>

      {/* Footer Area */}
      <div className="p-4 border-t border-white/5 shrink-0 space-y-1">
        <NavLink to="/admin/settings" className={linkClass}>
          <Settings size={18} /> Settings
        </NavLink>
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-colors">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;