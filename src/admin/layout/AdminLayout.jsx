import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';


const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden relative">
      
      {/* Sidebar  */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative z-10 w-full">
        <Topbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar-main bg-slate-50">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay - Only visible on small screens when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

    </div>
  );
};

export default AdminLayout;