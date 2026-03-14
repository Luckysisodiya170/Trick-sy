// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from "./pages/Home/Home"

// Dummy Pages (Inhe aap apne actual pages se replace kar lena)
const About = () => <div className="max-w-7xl mx-auto px-4">About Page Content</div>;
const Login = () => <div className="flex h-screen items-center justify-center bg-gray-100">Login Page (No Header/Footer)</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes JINME Header aur Footer chahiye */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        
        {/* Routes JINME Header aur Footer NAHI chahiye (Auth Pages) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<div>Register Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;