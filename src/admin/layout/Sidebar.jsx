import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShieldCheck, MonitorPlay, UserCircle,
  Briefcase, FileText, Layout, Layers, MessageSquare,
  Inbox, Mail, Settings, LogOut, ChevronLeft, AlertTriangle
} from 'lucide-react';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('tricksyAdminToken');
    navigate('/admin-login');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center ${isSidebarOpen ? 'justify-start px-4' : 'justify-center px-0'} py-2.5 rounded-xl text-[11.5px] font-black uppercase tracking-[0.1em] transition-all duration-300 relative group mb-0.5 ${isActive
      ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
      : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    <>
      <aside
        className={`bg-[#0a0a0a] border-r border-white/5 h-full transition-all duration-500 flex flex-col z-[100] fixed inset-y-0 left-0 lg:static shrink-0
          ${isSidebarOpen ? 'w-64 lg:w-[260px] translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}
        `}
      >
        {/* --- LOGO SECTION --- */}
        <div className={`h-20 flex items-center shrink-0 transition-all duration-300 ${isSidebarOpen ? 'justify-between px-6' : 'justify-center px-0'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 bg-brand-primary rounded-[0.8rem] flex items-center justify-center text-white shadow-lg shadow-brand-primary/40 shrink-0">
              <ShieldCheck size={18} strokeWidth={2.5} />
            </div>
            <h1 className={`text-xl font-black text-white tracking-tighter uppercase italic transition-all duration-300 ${isSidebarOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'}`}>
              Tricksy<span className="text-brand-primary">.</span>
            </h1>
          </div>

          {isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:bg-brand-primary hover:text-white transition-all active:scale-90"
            >
              <ChevronLeft size={16} strokeWidth={3} />
            </button>
          )}
        </div>

        <div className="flex-1 py-2 overflow-y-auto flex flex-col gap-5 px-3.5 [&::-webkit-scrollbar]:hidden">

          {/* Core Section */}
          <div>
            <p className={`text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2 px-4 ${!isSidebarOpen && 'opacity-0'}`}>Platform</p>
            <NavLink to="/admin" end className={linkClass}>
              <LayoutDashboard size={18} />
              <span className={`ml-3.5 transition-all ${isSidebarOpen ? 'opacity-100' : 'hidden'}`}>Dashboard</span>
            </NavLink>
          </div>

          {/* Interface */}
          <div>
            <p className={`text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2 px-4 ${!isSidebarOpen && 'opacity-0'}`}>Interface</p>
            <div className="space-y-0.5">
              {[
                { to: "/admin/pages/home", icon: MonitorPlay, label: "Home" },
                { to: "/admin/pages/about", icon: UserCircle, label: "About" },
                { to: "/admin/pages/services", icon: Briefcase, label: "Services" },
                { to: "/admin/pages/technical", icon: Layout, label: "Technical" },
                { to: "/admin/pages/blog", icon: FileText, label: "Blog" },
                { to: "/admin/pages/contact", icon: Layers, label: "Contact" },

              ].map((item) => (
                <NavLink key={item.to} to={item.to} className={linkClass}>
                  <item.icon size={18} />
                  <span className={`ml-3.5 transition-all ${isSidebarOpen ? 'opacity-100' : 'hidden'}`}>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/*  Interactions */}
          <div>
            <p className={`text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2 px-4 ${!isSidebarOpen && 'opacity-0'}`}>Signals</p>
            <div className="space-y-0.5">
              <NavLink to="/admin/leads" className={linkClass}>
                <MessageSquare size={18} />
                <span className={`ml-3.5 transition-all ${isSidebarOpen ? 'opacity-100' : 'hidden'}`}>Bookings</span>
              </NavLink>
              <NavLink to="/admin/enquiries" className={linkClass}>
                <Inbox size={18} />
                <span className={`ml-3.5 transition-all ${isSidebarOpen ? 'opacity-100' : 'hidden'}`}>Queries</span>
              </NavLink>
              <NavLink to="/admin/newsletter" className={linkClass}>
                <Mail size={18} />
                <span className={`ml-3.5 transition-all ${isSidebarOpen ? 'opacity-100' : 'hidden'}`}>Newsletter</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* --- FOOTER  --- */}
        <div className="p-4 border-t border-white/5 space-y-1 shrink-0 mt-auto bg-[#0a0a0a] relative z-10">
          {/* <NavLink to="/admin/settings" className={linkClass}>
            <Settings size={18} />
            <span className={`ml-3.5 transition-all ${isSidebarOpen ? 'opacity-100' : 'hidden'}`}>Settings</span>
          </NavLink> */}

          <button
            onClick={() => setShowLogoutModal(true)}
            className={`flex items-center ${isSidebarOpen ? 'justify-start px-4' : 'justify-center px-0'} py-2.5 w-full rounded-xl text-[11.5px] font-black uppercase tracking-[0.1em] text-rose-500 hover:bg-rose-500/10 transition-all mt-1`}
          >
            <LogOut size={18} />
            <span className={`ml-3.5 transition-all ${isSidebarOpen ? 'opacity-100' : 'hidden'}`}>Exit System</span>
          </button>
        </div>
      </aside>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] w-full max-w-md p-10 border border-slate-100 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] relative z-10 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-rose-500 blur-2xl opacity-20 rounded-full" />
                <div className="relative w-16 h-16 bg-rose-100 rounded-[1.2rem] flex items-center justify-center text-rose-600 border-2 border-rose-200">
                  <AlertTriangle size={24} strokeWidth={2.5} />
                </div>
              </div>
              <h3 className="t-title normal-case text-2xl text-slate-900 mb-1.5">
                Terminate <span className="text-rose-600">Session?</span>
              </h3>
              <p className="t-nav text-slate-400 tracking-normal normal-case mb-8">
                This action will end your current administrative session. Please confirm.
              </p>
              <div className="flex flex-row gap-3 w-full">
                <button
                  onClick={handleLogout}
                  className="flex-1 py-4 bg-rose-600 text-white rounded-xl t-nav text-[11px] shadow-lg shadow-rose-200 hover:bg-rose-700 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                >
                  Yes, Terminate
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-xl t-nav text-[10px] border border-slate-100 hover:bg-slate-200 transition-all active:scale-[0.98]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;