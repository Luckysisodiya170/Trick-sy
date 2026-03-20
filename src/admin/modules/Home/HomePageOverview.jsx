// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   LayoutTemplate, Type, Wrench, Star, ShieldCheck, 
//   MessageSquare, HelpCircle, MousePointerClick, 
//   ArrowRight, Globe, Sparkles, Plus
// } from 'lucide-react';

// const HomePageOverview = () => {
//   const navigate = useNavigate();

//   const sections = [
//     { id: 'hero', name: 'Hero Banner', status: 'Live', icon: <LayoutTemplate size={20} />, path: '/admin/pages/home/hero', color: 'text-blue-600', bg: 'bg-blue-50' },
//     { id: 'about', name: 'About Section', status: 'Live', icon: <Type size={20} />, path: '/admin/pages/home/about', color: 'text-indigo-600', bg: 'bg-indigo-50' },
//     { id: 'services', name: 'Services Grid', status: 'Live', icon: <Wrench size={20} />, path: '/admin/pages/home/services', color: 'text-emerald-600', bg: 'bg-emerald-50' },
//     { id: 'popular', name: 'Popular Items', status: 'Live', icon: <Star size={20} />, path: '/admin/pages/home/popular', color: 'text-amber-600', bg: 'bg-amber-50' },
//     { id: 'why-us', name: 'Why Choose Us', status: 'Draft', icon: <ShieldCheck size={20} />, path: '/admin/pages/home/why-us', color: 'text-rose-600', bg: 'bg-rose-50' },
//     { id: 'testimonials', name: 'Client Reviews', status: 'Live', icon: <MessageSquare size={20} />, path: '/admin/pages/home/testimonials', color: 'text-sky-600', bg: 'bg-sky-50' },
//     { id: 'faq', name: 'FAQ Support', status: 'Draft', icon: <HelpCircle size={20} />, path: '/admin/pages/home/faq', color: 'text-slate-600', bg: 'bg-slate-100' },
//     { id: 'cta', name: 'Call to Action', status: 'Live', icon: <MousePointerClick size={20} />, path: '/admin/pages/home/cta', color: 'text-purple-600', bg: 'bg-purple-50' },
//     { id: 'google', name: 'Google API', status: 'Live', icon: <Globe size={20} />, path: '/admin/pages/home/reviews', color: 'text-cyan-600', bg: 'bg-cyan-50' },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-10 font-sans relative overflow-hidden">
      
//       {/* --- Background Decorative Pattern --- */}
//       <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none" 
//            style={{ backgroundImage: 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}>
//       </div>

//       <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        
//         {/* --- Header Section --- */}
//         <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-10">
//           <div className="space-y-2">
//             <div className="flex items-center gap-2 text-blue-600 font-black text-[11px] uppercase tracking-[0.2em]">
//               <Sparkles size={16} className="fill-blue-600" />
//               Main Dashboard
//             </div>
//             <h1 className="text-4xl font-black text-slate-900 tracking-tight">Home Page Configuration</h1>
//             <p className="text-slate-500 font-medium italic">Configure and manage your landing page modules in real-time.</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <button className="px-6 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
//               View History
//             </button>
//             <button className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
//               Publish All Changes
//             </button>
//           </div>
//         </div>

//         {/* --- Full Width Grid --- */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {sections.map((sec) => (
//             <div 
//               key={sec.id}
//               onClick={() => navigate(sec.path)}
//               className="group relative bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:border-blue-500/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col h-full"
//             >
//               <div className="flex justify-between items-start mb-8">
//                 {/* Dynamic Colored Icon Box */}
//                 <div className={`w-14 h-14 rounded-2xl ${sec.bg} ${sec.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-inner`}>
//                   {sec.icon}
//                 </div>
//                 <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
//                   sec.status === 'Live' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
//                 }`}>
//                   {sec.status}
//                 </div>
//               </div>

//               <div className="flex-1">
//                 <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">
//                   {sec.name}
//                 </h3>
//                 <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">
//                   Module Configuration
//                 </p>
//               </div>

//               <div className="mt-8 flex items-center justify-between">
//                 <span className="text-xs font-black text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 uppercase tracking-tighter">
//                   Manage Content <ArrowRight size={14} />
//                 </span>
//                 <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
//                   <ArrowRight size={18} />
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* New Module Card */}
//           <div className="group border-2 border-dashed border-slate-200 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer min-h-[220px]">
//             <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center">
//               <Plus size={24} />
//             </div>
//             <span className="text-sm font-black uppercase tracking-widest">Add Module</span>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default HomePageOverview;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutTemplate, Type, Wrench, Star, ShieldCheck, 
  MessageSquare, HelpCircle, MousePointerClick, 
  ArrowRight, Globe, Sparkles, Plus
} from 'lucide-react';

const HomePageOverview = () => {
  const navigate = useNavigate();

  const sections = [
    { id: 'hero', name: 'Hero Banner', status: 'Live', icon: <LayoutTemplate size={18} />, path: '/admin/pages/home/hero', color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'about', name: 'About Us', status: 'Live', icon: <Type size={18} />, path: '/admin/pages/home/about', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { id: 'services', name: 'Services Grid', status: 'Live', icon: <Wrench size={18} />, path: '/admin/pages/home/services', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'popular', name: 'Popular Services', status: 'Live', icon: <Star size={18} />, path: '/admin/pages/home/popular', color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'why-us', name: 'Why Us Section', status: 'Live', icon: <ShieldCheck size={18} />, path: '/admin/pages/home/why-us', color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 'testimonials', name: 'Testimonials', status: 'Live', icon: <MessageSquare size={18} />, path: '/admin/pages/home/testimonials', color: 'text-sky-500', bg: 'bg-sky-50' },
    { id: 'faq', name: 'FAQ Section', status: 'Live', icon: <HelpCircle size={18} />, path: '/admin/pages/home/faq', color: 'text-violet-500', bg: 'bg-violet-50' },
    { id: 'cta', name: 'Call to Action', status: 'Live', icon: <MousePointerClick size={18} />, path: '/admin/pages/home/cta', color: 'text-fuchsia-500', bg: 'bg-fuchsia-50' },
    { id: 'google', name: 'Google Reviews', status: 'Live', icon: <Globe size={18} />, path: '/admin/pages/home/reviews', color: 'text-cyan-500', bg: 'bg-cyan-50' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-12 font-sans selection:bg-blue-100">
      
      {/* --- Compact Header --- */}
      <div className="w-full mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Sparkles size={14} className="fill-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Editor</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Home Section</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">09 Modules Active</p>
        </div>

        <div className="flex items-center gap-3">
          
          <button className="px-6 py-2 text-xs font-bold text-white bg-slate-900 rounded-xl hover:shadow-xl hover:shadow-slate-200 transition-all active:scale-95">
            Publish Changes
          </button>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sections.map((sec) => (
          <div 
            key={sec.id}
            onClick={() => navigate(sec.path)}
            className="group relative bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm hover:border-blue-500/20 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex items-center gap-4"
          >
            {/* Left Side */}
            <div className={`w-12 h-12 rounded-2xl ${sec.bg} ${sec.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
              {sec.icon}
            </div>

            {/* Middle: Content */}
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-[15px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                  {sec.name}
                </h3>
                {sec.status === 'Draft' && (
                   <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                )}
              </div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none italic">
                {sec.status === 'Live' ? 'Active' : 'Draft'}
              </p>
            </div>

            {/* Right Side */}
            <div className="text-slate-200 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300">
              <ArrowRight size={16} />
            </div>
            
            <div className={`absolute inset-x-6 bottom-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-blue-500/20 to-transparent`}></div>
          </div>
        ))}

        {/* Add New Module Card */}
        <div className="group p-4 rounded-[1.5rem] border border-dashed border-slate-200 flex items-center justify-center gap-3 text-slate-300 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer">
          <Plus size={18} />
          <span className="text-[11px] font-black uppercase tracking-widest">Add Module</span>
        </div>
      </div>

    </div>
  );
};

export default HomePageOverview;
