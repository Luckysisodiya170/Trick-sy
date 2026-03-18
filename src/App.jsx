import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; 

import MainLayout from './components/layout/MainLayout';
import Home from "./pages/Home/Home";
import AboutPage from './pages/About/About';
import ServiceDetail from './pages/Services/ServiceDetail';
import BlogDetail from './pages/Blog/BlogDetail';
import NotFound from './pages/NotFound/NotFound';
import Contact from './pages/Contact/Contact';
import Blog from './pages/Blog/Blog';
import TechnicalServices from './pages/Technicalservice/TechnicalServices';
import TechnicalDetail from './pages/Technicalservice/TechnicalDetail';

// Dummy Pages
const Login = () => <div className="flex h-screen items-center justify-center bg-gray-100">Login Page (No Header/Footer)</div>;

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* home Routes */}

          <Route path="/" element={<MainLayout><Home /></MainLayout>} />

          {/* About Routes */}

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
          <Route path="/technical-services/:serviceId" element={<MainLayout><TechnicalDetail /></MainLayout>} />

          {/* --Auth Pages --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<div>Register Page</div>} />

          {/* 404 ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;