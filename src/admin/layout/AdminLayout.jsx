import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const AdminLayout = () => {
  // Yeh state batayegi ki sidebar khula hai ya band
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* 1. Sidebar Component */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. Topbar Component */}
        <Topbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* 3. Main Content (Dashboard, Settings, etc.) */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default AdminLayout;