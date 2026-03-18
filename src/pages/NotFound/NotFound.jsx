import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-zinc-50 px-6 py-24">
      <div className="w-full max-w-2xl text-center relative z-10">
        
        {/*404 Text */}
        <h1 className="text-[120px] md:text-[180px] font-black text-zinc-950 leading-none tracking-tighter drop-shadow-sm">
          4<span className="text-emerald-500">0</span>4
        </h1>
        
        {/*Content Box */}
        <div className="bg-white border-4 border-zinc-950 p-8 md:p-12 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] transform -translate-y-6 relative z-20 mx-auto max-w-xl">
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 border-2 border-zinc-200 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-zinc-950" />
          </div>
          
          <h2 className="text-3xl font-black text-zinc-950 uppercase tracking-tight mb-4">
            Page Not Found
          </h2>
          <p className="text-zinc-500 font-medium text-lg leading-relaxed mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-zinc-950 font-black rounded-xl hover:bg-white hover:text-zinc-950 border-2 border-transparent hover:border-zinc-950 transition-all shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 uppercase text-sm tracking-widest w-full sm:w-auto"
          >
            <Home className="w-5 h-5" /> Back to Home
          </Link>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.03] -z-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #000 2px, transparent 2px), linear-gradient(to bottom, #000 2px, transparent 2px)', backgroundSize: '64px 64px' }}></div>
      </div>
    </div>
  );
};

export default NotFound;