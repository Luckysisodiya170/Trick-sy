import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Menu, User, LogOut, 
  CheckCircle2, AlertCircle, Zap 
} from 'lucide-react';

const Topbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Static Data for Notifications
  const notifications = [
    { id: 1, title: 'New Booking Request', desc: 'Aryan booked AC Maintenance.', time: '2 mins ago', icon: <CheckCircle2 size={14} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 2, title: 'Urgent System Alert', desc: 'High CPU load detected on Node-1.', time: '1 hr ago', icon: <AlertCircle size={14} />, color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 3, title: 'Protocol Updated', desc: 'Security protocols synced successfully.', time: '3 hrs ago', icon: <Zap size={14} />, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-[50]">
      
      {/* Left side (Hamburger for Mobile) */}
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-all active:scale-95"
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      {/* Right side (Icons & Profile) */}
      <div className="flex items-center gap-5">
        
        {/* -notification button & dropdown --- */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsProfileOpen(false); 
            }}
            className={`relative p-2.5 rounded-xl transition-all ${isNotifOpen ? 'bg-brand-primary/10 text-brand-primary' : 'hover:bg-slate-100 text-slate-500'}`}
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
          </button>

          {isNotifOpen && (
            <div className="absolute top-[3.5rem] right-0 w-80 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden z-[500] animate-in fade-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800">Signals</span>
                <button className="text-[9px] font-bold text-brand-primary uppercase tracking-widest hover:underline">Mark Read</button>
              </div>
              
              {/* List */}
              <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                {notifications.map(n => (
                  <div key={n.id} className="p-4 border-b border-slate-50 hover:bg-slate-50/80 transition-colors cursor-pointer flex gap-4 group">
                    <div className={`w-10 h-10 rounded-[0.8rem] flex items-center justify-center shrink-0 ${n.bg} ${n.color} transition-transform group-hover:scale-110`}>
                      {n.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-0.5 group-hover:text-brand-primary transition-colors">{n.title}</h4>
                      <p className="text-[11px] font-medium text-slate-500 line-clamp-1">{n.desc}</p>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-3 text-center bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">View All Signals</span>
              </div>
            </div>
          )}
        </div>
        
        {/* --- PROFILE BUTTON & DROPDOWN --- */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotifOpen(false); 
            }}
            className="w-10 h-10 rounded-[1rem] bg-brand-dark border border-slate-800 flex items-center justify-center font-black text-white text-sm hover:shadow-lg hover:bg-black transition-all focus:outline-none"
          >
            A
          </button>

          {isProfileOpen && (
            <div className="absolute top-[3.5rem] right-0 w-64 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden z-[500] animate-in fade-in zoom-in-95 duration-200">
              
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-[1rem] bg-brand-primary/10 text-brand-primary flex items-center justify-center font-black text-xl">
                  A
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 leading-tight">Admin User</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 truncate">admin@tricksy.com</p>
                </div>
              </div>

              <div className="py-2">
                <button 
                  onClick={() => {
                    navigate('/admin/profile');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-5 py-3 text-xs font-bold text-slate-600 hover:bg-brand-primary/5 hover:text-brand-primary transition-colors"
                >
                  <User size={16} /> Admin Identity
                </button>
              </div>

              <div className="border-t border-slate-100 py-2">
                <button 
                  onClick={() => { 
                    localStorage.removeItem('tricksyAdminToken'); 
                    navigate('/admin-login'); 
                  }} 
                  className="w-full flex items-center gap-3 px-5 py-3 text-xs font-black text-rose-500 hover:bg-rose-50 transition-colors"
                >
                  <LogOut size={16} /> Secure Logout
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Topbar;