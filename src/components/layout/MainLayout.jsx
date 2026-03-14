import React from 'react';
import Header from './Navbar'; 
import Footer from './Footer'; 

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Navbar transparent hover kare isliye padding top hata di hai */}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;