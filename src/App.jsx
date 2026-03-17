// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // 🔥 SEO ke liye add kiya

import MainLayout from './components/layout/MainLayout';
import Home from "./pages/Home/Home";
import AboutPage from './pages/About/About';
import ServiceDetail from './pages/Services/ServiceDetail';
import BlogDetail from './pages/Blog/BlogDetail';
// 404 Component Import Kiya
import NotFound from './pages/NotFound/NotFound';
import Contact from './pages/Contact/Contact';
import Blog from './pages/Blog/Blog';
import TechnicalServices from './pages/Technicalservice/TechnicalServices';

// Dummy Pages
const Login = () => <div className="flex h-screen items-center justify-center bg-gray-100">Login Page (No Header/Footer)</div>;

function App() {
  return (
    // 🔥 Poori app ko HelmetProvider mein wrap kar diya
    <HelmetProvider>
      <Router>
        <Routes>
          {/* --- Routes JINME Header aur Footer chahiye --- */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />

          {/* Service Routes */}
          <Route path="/services/:serviceId" element={<MainLayout><ServiceDetail /></MainLayout>} />

          {/* Contact Routes */}
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />

          {/* Blog Routes */}
          <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />

          {/* Single Blog Article Route */}
          <Route path="/blog/:slug" element={<MainLayout><BlogDetail /></MainLayout>} />

          {/* Technical Route */}
          <Route path="/technical" element={<MainLayout><TechnicalServices /></MainLayout>} />
          

          {/* --- Routes JINME Header aur Footer NAHI chahiye (Auth Pages) --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<div>Register Page</div>} />

          {/* 404 CATCH-ALL ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;