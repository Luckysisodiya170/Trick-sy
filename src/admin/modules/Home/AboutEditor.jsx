import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, ArrowLeft, Image as ImageIcon, Sparkles, 
  CheckCircle2, Plus, Trash2, Eye, Award, Users, Layout
} from 'lucide-react';

const AboutEditor = () => {
  const navigate = useNavigate();
  const [activeField, setActiveField] = useState(null);

  const [aboutData, setAboutData] = useState({
    badge: "About TRICKSY",
    title: "We Provide The Best",
    highlightText: "Home Maintenance",
    titleSuffix: "Solutions",
    description: "TRICKSY is your premium destination for home and office maintenance.",
    features: ["100% Satisfaction", "Verified Professionals", "Transparent Pricing"],
    yearsExp: "10+",
    customersText: "5k+",
  });

  const addFeature = () => setAboutData({...aboutData, features: [...aboutData.features, "New Feature"]});
  const removeFeature = (index) => {
    const updated = aboutData.features.filter((_, i) => i !== index);
    setAboutData({...aboutData, features: updated});
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      
      {/* --- Header --- */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/pages/home')} className="p-2 hover:bg-slate-100 rounded-full transition-all">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Layout size={18} className="text-emerald-600" /> About Section <span className="text-emerald-500 font-black">Layout Studio</span>
          </h1>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm hover:shadow-2xl transition-all active:scale-95">
          <Save size={18} /> Update Live Site
        </button>
      </nav>

      <div className="max-w-[1700px] mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* --- LEFT: Controls --- */}
        <div className="lg:col-span-7 space-y-8 pb-20">
          
          {/* 1. Content & Headlines */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
              <Sparkles size={14} className="text-emerald-500" /> Story & Headlines
            </h3>
            <div className="space-y-6">
              <div onFocus={() => setActiveField('badge')}>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Badge</label>
                <input value={aboutData.badge} onChange={(e) => setAboutData({...aboutData, badge: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-emerald-500 outline-none transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4" onFocus={() => setActiveField('title')}>
                <input value={aboutData.title} onChange={(e) => setAboutData({...aboutData, title: e.target.value})} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none" placeholder="Title" />
                <input value={aboutData.highlightText} onChange={(e) => setAboutData({...aboutData, highlightText: e.target.value})} className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl font-black text-emerald-700 outline-none" placeholder="Highlight" />
              </div>
              <textarea 
                onFocus={() => setActiveField('desc')}
                rows="3"
                value={aboutData.description}
                onChange={(e) => setAboutData({...aboutData, description: e.target.value})}
                className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm font-medium outline-none focus:bg-white transition-all"
              />
            </div>
          </section>

          {/* 2. Features List */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-500" /> Features Configuration
              </h3>
              <button onClick={addFeature} className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Plus size={20} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" onFocus={() => setActiveField('features')}>
              {aboutData.features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 group">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <input value={f} onChange={(e) => {
                      let nf = [...aboutData.features]; nf[i] = e.target.value;
                      setAboutData({...aboutData, features: nf});
                  }} className="w-full bg-transparent font-bold text-slate-700 outline-none text-sm" />
                  <button onClick={() => removeFeature(i)} className="opacity-0 group-hover:opacity-100 text-red-400 transition-all"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Stats & Media */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm" onFocus={() => setActiveField('stats')}>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2"><Award size={14} className="text-amber-500" /> Trust Stats</h3>
                <div className="space-y-4">
                  <input value={aboutData.yearsExp} onChange={(e) => setAboutData({...aboutData, yearsExp: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-xl" />
                  <input value={aboutData.customersText} onChange={(e) => setAboutData({...aboutData, customersText: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-xl" />
                </div>
             </section>
             <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm" onFocus={() => setActiveField('media')}>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2"><ImageIcon size={14} className="text-purple-500" /> Media Assets</h3>
                <div className="flex gap-4">
                   <div className="w-full h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center hover:bg-emerald-50 cursor-pointer transition-all">
                      <ImageIcon size={20} className="text-slate-300" />
                      <span className="text-[8px] font-black text-slate-400 uppercase mt-1">Main</span>
                   </div>
                   <div className="w-full h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center hover:bg-blue-50 cursor-pointer transition-all">
                      <ImageIcon size={20} className="text-slate-300" />
                      <span className="text-[8px] font-black text-slate-400 uppercase mt-1">Detail</span>
                   </div>
                </div>
             </section>
          </div>
        </div>

        {/* --- RIGHT: THE DYNAMIC ABOUT PREVIEW --- */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-6">
            <div className="flex items-center justify-between px-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Eye size={14} /> Desktop Preview (Home Section 2)
              </span>
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>

            <div className="bg-white rounded-[3rem] shadow-2xl border-[12px] border-slate-900 aspect-[4/5] relative overflow-hidden group">
               <div className="p-8 h-full flex flex-col relative z-10">
                  
                  {/* Visual Layout Mockup */}
                  <div className="flex flex-col h-full">
                    
                    {/* Left Side Equivalent (Image Stack) */}
                    <div className="relative w-full h-48 mb-10">
                       {/* Background Shape */}
                       <div className="absolute -top-2 -left-2 w-[80%] h-full bg-slate-900 rounded-[1.5rem] opacity-90"></div>
                       
                       {/* Main Image Block */}
                       <div className={`absolute inset-0 bg-slate-100 rounded-[1.5rem] border-2 border-white shadow-lg flex items-center justify-center text-slate-300 transition-all duration-500 ${activeField === 'media' ? 'scale-105 border-emerald-400 ring-4 ring-emerald-100' : ''}`}>
                          <ImageIcon size={30} />
                       </div>

                       {/* Overlapping Detail Image Block */}
                       <div className={`absolute -bottom-6 -right-2 w-1/2 h-24 bg-slate-200 rounded-[1rem] border-4 border-white shadow-2xl flex items-center justify-center text-slate-400 transition-all duration-700 ${activeField === 'media' ? 'translate-x-2 -translate-y-2 border-blue-400' : ''}`}>
                          <ImageIcon size={20} />
                       </div>

                       {/* Floating Exp Badge */}
                       <div className={`absolute top-1/2 -left-6 -translate-y-1/2 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-50 transition-all duration-500 ${activeField === 'stats' ? 'scale-110 shadow-emerald-200 border-emerald-500' : 'animate-bounce-slow'}`}>
                          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                             <Award size={18} />
                          </div>
                          <div>
                             <p className="text-xs font-black text-slate-900">{aboutData.yearsExp}</p>
                             <p className="text-[7px] font-bold text-slate-400 uppercase">Experience</p>
                          </div>
                       </div>
                    </div>

                    {/* Right Side Equivalent (Content) */}
                    <div className="space-y-4">
                       <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-white rounded-full text-[8px] font-black transition-all ${activeField === 'badge' ? 'bg-emerald-600 scale-110 shadow-lg' : ''}`}>
                          <Sparkles size={8} className="text-emerald-400" /> {aboutData.badge}
                       </div>

                       <h2 className={`text-xl font-black text-slate-900 leading-tight transition-all ${activeField === 'title' ? 'translate-x-2' : ''}`}>
                          {aboutData.title} <br/>
                          <span className="text-emerald-500">{aboutData.highlightText}</span>
                       </h2>

                       <p className={`text-[10px] text-slate-500 leading-relaxed line-clamp-2 transition-all ${activeField === 'desc' ? 'text-slate-900' : ''}`}>
                          {aboutData.description}
                       </p>

                       {/* Features Grid */}
                       <div className={`grid grid-cols-2 gap-2 transition-all ${activeField === 'features' ? 'bg-emerald-50 p-3 rounded-2xl scale-105' : ''}`}>
                          {aboutData.features.slice(0, 4).map((f, i) => (
                             <div key={i} className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                                <CheckCircle2 size={10} className="text-emerald-500" />
                                <span className="text-[8px] font-bold text-slate-700 truncate">{f}</span>
                             </div>
                          ))}
                       </div>

                       {/* Customer Stack */}
                       <div className="pt-4 flex items-center gap-2 border-t border-slate-100">
                          <div className="flex -space-x-2">
                             {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>)}
                             <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[6px] font-black text-white">{aboutData.customersText}</div>
                          </div>
                          <p className="text-[8px] font-black text-slate-900 uppercase">Happy Customers</p>
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Layout Hint */}
            <div className="bg-emerald-900 rounded-[2rem] p-6 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/20 rounded-full -mr-10 -mt-10"></div>
               <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <Layout size={12} /> Design Architecture
               </h4>
               <p className="text-xs text-emerald-100/80 leading-relaxed font-medium">
                  Ye section <span className="text-white font-bold italic">"Asymmetric Balance"</span> use karta hai. Badi image ke saath choti image ka overlap modern feel deta hai.
               </p>
            </div>
          </div>
        </div>

      </div>
      
      {/* Global Animation for Bounce */}
      <style>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(-50%) translateY(-3px); } 50% { transform: translateY(-50%) translateY(3px); } }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default AboutEditor;