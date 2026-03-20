import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Menu, User, LogOut, Settings } from 'lucide-react';

const Topbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    // 🔥 Header ko absolute top level par rakhne ke liye z-[999]
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 relative z-[999]">
      
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-all"
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="w-9 h-9 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center font-black text-white text-xs hover:shadow-lg transition-all focus:outline-none"
        >
          A
        </button>

        {isProfileOpen && (
          /* 🔥 Fixed position use ki hai taaki ye poori screen ke context mein sabse upar rahe */
          <div className="fixed top-14 right-6 w-48 bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden z-[1000] animate-in fade-in zoom-in-95 duration-150">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
              <p className="text-xs font-black text-slate-900">Admin User</p>
              <p className="text-[10px] text-slate-500 font-medium truncate">admin@tricksy.com</p>
            </div>
            <div className="py-1">
              <button className="w-full flex items-center gap-2 px-4 py-2 text-[12px] text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors">
                <User size={14} /> My Profile
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-[12px] text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors">
                <Settings size={14} /> Settings
              </button>
            </div>
            <div className="border-t border-slate-100 py-1">
              <button 
                onClick={() => { localStorage.removeItem('tricksyAdminAuth'); navigate('/admin-login'); }} 
                className="w-full flex items-center gap-2 px-4 py-2 text-[12px] font-bold text-rose-500 hover:bg-rose-50 transition-colors"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;