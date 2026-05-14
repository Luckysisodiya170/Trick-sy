import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { apiRequest } from '../api/api'; 

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const data = await apiRequest('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      if (data && data.success) {
        localStorage.setItem('tricksyAdminToken', data.token);
        localStorage.setItem('tricksyAdminRole', data.role || 'admin');
        navigate('/admin'); 
      } else {
        setError(data?.message || 'Invalid Credentials');
      }
    } catch (err) {
      setError(err.message || 'Backend server is offline');
    } finally {
      setIsLoading(false);
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
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white/5 py-8 px-6 shadow-2xl sm:rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold text-center uppercase">
                {error}
              </div>
            )}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3 h-5 w-5 text-slate-500" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} 
                className="block w-full pl-12 pr-4 py-3 border border-white/10 rounded-2xl bg-zinc-900/50 text-white focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="admin@tricksy.com" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3 h-5 w-5 text-slate-500" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 border border-white/10 rounded-2xl bg-zinc-900/50 text-white focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 py-4 rounded-2xl text-xs font-black uppercase bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-all disabled:opacity-50">
              {isLoading ? 'Authenticating...' : 'Authenticate'} <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;