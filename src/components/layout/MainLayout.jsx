import React from 'react';
import Header from './Navbar'; 
import Footer from './Footer'; 
import FloatingActions from '../Shared/FloatingActions';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingActions/>
    </div>
  );
};

export default MainLayout;