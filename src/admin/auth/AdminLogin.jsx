import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Dummy login check
    if (email === 'admin@tricksy.com' && password === 'admin123') {
      localStorage.setItem('tricksyAdminAuth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid admin credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 mb-6 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]">
          <ShieldCheck className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
          Tricksy <span className="text-emerald-500 italic">Command_</span>
        </h2>
        <p className="mt-2 text-sm text-slate-400 font-medium tracking-widest uppercase">
          Authorized Personnel Only
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/5 py-8 px-4 shadow-2xl shadow-black sm:rounded-[2.5rem] sm:px-10 border border-white/10 backdrop-blur-xl">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold text-center uppercase tracking-widest">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Admin Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-3 py-3 border border-white/10 rounded-2xl bg-zinc-900/50 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder="admin@tricksy.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Security Key</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-3 py-3 border border-white/10 rounded-2xl bg-zinc-900/50 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder="admin123"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-2xl text-xs font-black uppercase tracking-widest text-zinc-950 bg-emerald-500 hover:bg-emerald-400 transition-all hover:-translate-y-1"
            >
              Authenticate <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;