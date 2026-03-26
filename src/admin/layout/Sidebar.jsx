import React, { useState } from 'react';
// Added useNavigate here for redirecting after logout
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShieldCheck, MonitorPlay, UserCircle,
  Briefcase, FileText, Layout, Layers, MessageSquare,
  Inbox, Mail, Settings, LogOut, ChevronLeft, ChevronRight,AlertTriangle,
} from 'lucide-react';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  
  // Added navigate tool
  const navigate = useNavigate(); 

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('tricksyAdminToken');
    navigate('/admin-login');
  };
  
  const linkClass = ({ isActive }) =>
    `flex items-center ${isSidebarOpen ? 'justify-start px-3' : 'justify-center px-0'} py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-300 relative group ${isActive
      ? 'bg-blue-500/10 text-emerald-400 border border-emerald-500/20'
      : 'text-slate-500 hover:text-white hover:bg-white/5'
    }`;

  return (
    <>
    <aside
      className={`bg-[#0a0a0a] border-r border-white/5 h-full transition-all duration-300 flex flex-col z-[100] fixed inset-y-0 left-0 lg:static shrink-0
        ${isSidebarOpen ? 'w-64 lg:w-72 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}
      `}
    >

      {/* Header */}
      <div className={`h-16 flex items-center border-b border-white/5 shrink-0 transition-all duration-300 ${isSidebarOpen ? 'justify-between px-6' : 'justify-center px-0'}`}>

        {/* Logo Area */}
        <div className="flex items-center overflow-hidden h-full">
          <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
          <h1 className={`text-lg font-black text-white tracking-tighter uppercase whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-2 opacity-100 max-w-[200px]' : 'ml-0 opacity-0 max-w-0'}`}>
            Tricksy<span className="text-emerald-500">_Admin</span>
          </h1>
        </div>

        {isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 rounded-lg bg-white/10 text-slate-300 hover:bg-emerald-500 hover:text-white transition-all shadow-lg active:scale-95 flex items-center justify-center shrink-0"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 overflow-y-auto space-y-6 overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

        {/* Core Section */}
        <div className="px-3">
          <p className={`text-[9px] font-bold uppercase tracking-[0.2em] text-slate-700 whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'px-3 mb-2 opacity-100 max-h-10' : 'px-0 mb-0 opacity-0 max-h-0'}`}>Core</p>
          <NavLink to="/admin" end className={linkClass}>
            <LayoutDashboard size={18} className="shrink-0" />
            <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-2.5 opacity-100 max-w-[200px]' : 'ml-0 opacity-0 max-w-0'}`}>Dashboard</span>
            {!isSidebarOpen && <span className="absolute left-16 bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[200]">Dashboard</span>}
          </NavLink>
        </div>

        {/* Site Layout Section */}
        <div className="px-3">
          <p className={`text-[9px] font-bold uppercase tracking-[0.2em] text-slate-700 whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'px-3 mb-2 opacity-100 max-h-10' : 'px-0 mb-0 opacity-0 max-h-0'}`}>Site Layout</p>
          <div className="grid grid-cols-1 gap-1">
            <NavLink to="/admin/pages/home" className={linkClass}>
              <MonitorPlay size={18} className="shrink-0" />
              <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-2.5 opacity-100 max-w-[200px]' : 'ml-0 opacity-0 max-w-0'}`}>Home Page</span>
              {!isSidebarOpen && <span className="absolute left-16 bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[200]">Home Page</span>}
            </NavLink>

            <NavLink to="/admin/pages/about" className={linkClass}>
              <UserCircle size={18} className="shrink-0" />
              <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-2.5 opacity-100 max-w-[200px]' : 'ml-0 opacity-0 max-w-0'}`}>About Us</span>
              {!isSidebarOpen && <span className="absolute left-16 bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[200]">About Us</span>}
            </NavLink>

            <NavLink
              to="/admin/pages/services"
              className={`flex items-center ${isSidebarOpen ? 'justify-start px-3' : 'justify-center px-0'} py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-300 relative group ${location.pathname.includes('/services')
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
            >
              <Briefcase size={18} className="shrink-0" />
              <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-2.5 opacity-100 max-w-[200px]' : 'ml-0 opacity-0 max-w-0'}`}>
                Services Page
              </span>
              {!isSidebarOpen && <span className="absolute left-16 bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[200]">Services Page</span>}
            </NavLink>

            <NavLink to="/admin/pages/blog" className={linkClass}>
              <FileText size={18} className="shrink-0" />
              <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-2.5 opacity-100 max-w-[200px]' : 'ml-0 opacity-0 max-w-0'}`}>Blog Page</span>
              {!isSidebarOpen && <span className="absolute left-16 bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[200]">Blog Page</span>}
            </NavLink>

            <NavLink to="/admin/pages/technical" className={linkClass}>
              <Layout size={18} className="shrink-0" />
              <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-2.5 opacity-100 max-w-[200px]' : 'ml-0 opacity-0 max-w-0'}`}>Technical Detail</span>
              {!isSidebarOpen && <span className="absolute left-16 bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[200]">Technical Detail</span>}
            </NavLink>

            <NavLink to="/admin/pages/contact" className={linkClass}>
              <Layers size={18} className="shrink-0" />
              <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-2.5 opacity-100 max-w-[200px]' : 'ml-0 opacity-0 max-w-0'}`}>Contact Page</span>
              {!isSidebarOpen && <span className="absolute left-16 bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[200]">Contact Page</span>}
            </NavLink>
          </div>
        </div>

        {/* Interactions Section */}
        <div className="px-3">
          <p className={`text-[9px] font-bold uppercase tracking-[0.2em] text-slate-700 whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'px-3 mb-2 opacity-100 max-h-10' : 'px-0 mb-0 opacity-0 max-h-0'}`}>Interactions</p>
          <div className="grid grid-cols-1 gap-1">
            <NavLink to="/admin/leads" className={linkClass}>
              <MessageSquare size={18} className="shrink-0" />
              <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-2.5 opacity-100 max-w-[200px]' : 'ml-0 opacity-0 max-w-0'}`}>Service Bookings</span>
              {!isSidebarOpen && <span className="absolute left-16 bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[200]">Service Bookings</span>}
            </NavLink>

            <NavLink to="/admin/enquiries" className={linkClass}>
              <Inbox size={18} className="shrink-0" />
              <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-2.5 opacity-100 max-w-[200px]' : 'ml-0 opacity-0 max-w-0'}`}>Contact Enquiries</span>
              {!isSidebarOpen && <span className="absolute left-16 bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[200]">Contact Enquiries</span>}
            </NavLink>

            <NavLink to="/admin/newsletter" className={linkClass}>
              <Mail size={18} className="shrink-0" />
              <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-2.5 opacity-100 max-w-[200px]' : 'ml-0 opacity-0 max-w-0'}`}>Newsletter Subs</span>
              {!isSidebarOpen && <span className="absolute left-16 bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[200]">Newsletter Subs</span>}
            </NavLink>
          </div>
        </div>
      </div>

      {/* Footer Area */}
      <div className="p-3 border-t border-white/5 shrink-0 flex flex-col gap-1">
        <NavLink to="/admin/settings" className={linkClass}>
          <Settings size={18} className="shrink-0" />
          <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-2.5 opacity-100 max-w-[200px]' : 'ml-0 opacity-0 max-w-0'}`}>Settings</span>
          {!isSidebarOpen && <span className="absolute left-16 bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[200]">Settings</span>}
        </NavLink>

        {/* Added onClick function here for Logout */}
        <button 
          onClick={() => setShowLogoutModal(true)}
          className={`flex items-center ${isSidebarOpen ? 'justify-start px-3' : 'justify-center px-0'} py-2.5 w-full rounded-lg text-[13px] font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors relative group`}
        >
          <LogOut size={18} className="shrink-0" />
          <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-2.5 opacity-100 max-w-[200px]' : 'ml-0 opacity-0 max-w-0'}`}>Logout</span>
          {!isSidebarOpen && <span className="absolute left-16 bg-rose-500 text-white text-[10px] px-2.5 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[200]">Logout</span>}
        </button>
      </div>

    </aside>

    


       

      {showLogoutModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Blurred Background Overlay */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setShowLogoutModal(false)} // Close on click outside
          />
          
          {/* Modal Content */}
          <div className="bg-white rounded-[2.5rem] w-full max-w-sm p-8 shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-6">
                <AlertTriangle className="text-rose-500 w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-2">
                Sign <span className="text-rose-500">Out?</span>
              </h3>
              <p className="text-slate-500 text-sm font-medium mb-8">
                Are you sure you want to end your session? You'll need to login again to access the dashboard.
              </p>

              <div className="grid grid-cols-2 gap-3 w-full">
                <button 
                  onClick={() => setShowLogoutModal(false)}
                  className="py-3.5 px-6 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleLogout}
                  className="py-3.5 px-6 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-200 transition-all"
                >
                  Logout
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