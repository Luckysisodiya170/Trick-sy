// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from "./pages/Home/Home";
import AboutPage from './pages/About/About';
import ServiceDetail from './pages/Services/ServiceDetail'; 

// 🔥 404 Component Import Kiya
import NotFound from './pages/NotFound/NotFound';

// Dummy Pages
const Login = () => <div className="flex h-screen items-center justify-center bg-gray-100">Login Page (No Header/Footer)</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Routes JINME Header aur Footer chahiye --- */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
        
        {/* Service Routes */}
       <Route path="/services/:serviceId" element={<MainLayout><ServiceDetail /></MainLayout>} />
        
        {/* --- Routes JINME Header aur Footer NAHI chahiye (Auth Pages) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<div>Register Page</div>} />

        {/* 🔥 404 CATCH-ALL ROUTE (Sabse end mein hi aana chahiye) */}
        {/* Isko bhi MainLayout mein rakha hai taaki Header/Footer dikhe aur user navbar se wapas ja sake */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;