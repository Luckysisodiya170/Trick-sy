import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Menu, X, User, LogOut, Settings } from 'lucide-react';

const Topbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('tricksyAdminAuth');
    navigate('/admin-login');
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 relative z-40">
      
      {/* Sidebar Toggle Button */}
      <div className="flex items-center gap-4">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Right Side Icons (Notifications & Profile) */}
      <div className="flex items-center gap-4 relative">
        <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        {/* Profile Icon (Clickable) */}
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="w-10 h-10 rounded-full bg-slate-900 border-2 border-emerald-500 overflow-hidden flex items-center justify-center font-black text-white hover:shadow-lg hover:shadow-emerald-500/20 transition-all focus:outline-none"
        >
          A
        </button>

        {/* Profile Dropdown Menu */}
        {isProfileOpen && (
          <div className="absolute top-14 right-0 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
              <p className="text-sm font-black text-slate-900">Admin User</p>
              <p className="text-xs text-slate-500 font-medium truncate">admin@tricksy.com</p>
            </div>
            <div className="py-1">
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors">
                <User size={16} /> My Profile
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors">
                <Settings size={16} /> Account Settings
              </button>
            </div>
            <div className="border-t border-slate-100 py-1">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
      
    </header>
  );
};

export default Topbar;