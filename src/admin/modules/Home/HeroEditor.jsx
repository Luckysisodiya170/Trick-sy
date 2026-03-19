import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, ArrowLeft, Image as ImageIcon, Sparkles, 
  Type, MousePointer2, Zap, Eye, CheckCircle, MapPin, Layout 
} from 'lucide-react';

const HeroEditor = () => {
  const navigate = useNavigate();
  const [activeField, setActiveField] = useState(null);

  const [heroData, setHeroData] = useState({
    badgeText: "Your Trusted Service Partner",
    titleLine1: "Professional",
    titleHighlight: "Cleaning & Maintenance",
    titleLine3: "Services",
    description: "Your ultimate destination for all home and office services. Explore our extensive collection.",
    primaryBtnText: "Book Service",
    secondaryBtnText: "Get Free Quote",
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100">
      
      {/* --- Header Navigation --- */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/pages/home')} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Layout size={18} className="text-primary-600" /> Hero Section <span className="text-primary-600 font-black">Circle Studio</span>
          </h1>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm hover:shadow-2xl transition-all active:scale-95">
          <Save size={18} /> Update Live Site
        </button>
      </nav>

      <div className="max-w-[1700px] mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* --- LEFT: Configurator --- */}
        <div className="lg:col-span-7 space-y-8 pb-20">
          
          {/* 1. Branding */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
              <Sparkles size={14} className="text-primary-500" /> Branding & Title
            </h3>
            
            <div className="space-y-6">
              <div onFocus={() => setActiveField('badge')}>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Top Badge</label>
                <input 
                  value={heroData.badgeText}
                  onChange={(e) => setHeroData({...heroData, badgeText: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-primary-500 outline-none transition-all"
                />
              </div>

              <div onFocus={() => setActiveField('title')} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input value={heroData.titleLine1} onChange={(e) => setHeroData({...heroData, titleLine1: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:bg-white" placeholder="Line 1" />
                <div className="relative">
                  <input value={heroData.titleHighlight} onChange={(e) => setHeroData({...heroData, titleHighlight: e.target.value})} className="w-full p-4 bg-primary-50/50 border border-primary-100 rounded-2xl font-black text-primary-700 outline-none" placeholder="Highlight" />
                  <Zap size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-400" />
                </div>
              </div>

              <div onFocus={() => setActiveField('desc')}>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Description</label>
                <textarea 
                  rows="3"
                  value={heroData.description}
                  onChange={(e) => setHeroData({...heroData, description: e.target.value})}
                  className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm font-medium leading-relaxed outline-none focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>
          </section>

          {/* 2. Actions */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
             <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                <MousePointer2 size={14} className="text-blue-500" /> Button Configuration
             </h3>
             <div className="grid grid-cols-2 gap-6" onFocus={() => setActiveField('buttons')}>
                <input value={heroData.primaryBtnText} onChange={(e) => setHeroData({...heroData, primaryBtnText: e.target.value})} className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl font-bold text-blue-700" />
                <input value={heroData.secondaryBtnText} onChange={(e) => setHeroData({...heroData, secondaryBtnText: e.target.value})} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700" />
             </div>
          </section>

          {/* 3. Circular Image Media */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm relative">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
              <ImageIcon size={14} className="text-orange-500" /> Circle Image Asset
            </h3>
            <div 
              onFocus={() => setActiveField('media')}
              className="w-full py-12 border-2 border-dashed border-slate-200 bg-slate-50 rounded-[2rem] flex flex-col items-center group hover:bg-orange-50 hover:border-orange-200 transition-all cursor-pointer"
            >
               <div className="w-24 h-24 rounded-full bg-white border-8 border-slate-100 shadow-xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                  <ImageIcon size={40} />
               </div>
               <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Update Circular Avatar</p>
            </div>
          </section>
        </div>

        {/* --- RIGHT: THE SMART CIRCLE PREVIEW --- */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-28 space-y-6">
            <div className="flex items-center justify-between px-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Eye size={14} /> Live View (Circular)
              </span>
              <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse"></div>
            </div>

            {/* Desktop Frame Mockup */}
            <div className="w-full bg-white rounded-[3rem] border-[12px] border-slate-900 shadow-2xl aspect-[4/5] relative overflow-hidden group">
               <div className="p-8 h-full flex flex-col justify-center relative z-10">
                  
                  {/* Badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black mb-4 transition-all duration-500 ${activeField === 'badge' ? 'bg-primary-600 text-white scale-110 shadow-lg' : 'bg-primary-50 text-primary-600'}`}>
                    <Sparkles size={10} /> {heroData.badgeText}
                  </div>

                  {/* Headline */}
                  <h2 className={`text-2xl font-black text-slate-900 leading-[1.2] mb-4 transition-all duration-500 ${activeField === 'title' ? 'translate-x-2' : ''}`}>
                    {heroData.titleLine1} <br/>
                    <span className="text-primary-600">{heroData.titleHighlight}</span>
                  </h2>

                  {/* Desc */}
                  <p className={`text-[11px] text-slate-500 leading-relaxed mb-6 max-w-[200px] transition-all ${activeField === 'desc' ? 'text-slate-900 font-medium' : ''}`}>
                    {heroData.description}
                  </p>

                  {/* Circle Image Concept (The Main Part) */}
                  <div className="absolute right-[-20%] top-1/2 -translate-y-1/2 w-64 h-64">
                    
                    {/* Background Pulse Circle */}
                    <div className="absolute inset-0 bg-primary-100 rounded-full opacity-40 scale-[1.1] animate-pulse"></div>
                    
                    {/* The Main Circle Frame */}
                    <div className={`absolute inset-0 rounded-full border-4 border-white bg-slate-100 shadow-2xl overflow-hidden transition-all duration-700 ${activeField === 'media' ? 'scale-110 ring-4 ring-primary-400' : ''}`}>
                       <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <ImageIcon size={40} />
                       </div>
                    </div>

                    {/* Floating Badge 1 (100% Quality) */}
                    <div className={`absolute top-0 -left-10 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-2 transition-all duration-700 ${activeField === 'media' ? '-translate-y-4 scale-110' : ''}`}>
                       <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                          <CheckCircle size={14} />
                       </div>
                       <div>
                          <p className="text-[8px] font-black text-slate-900 leading-none">100% Quality</p>
                          <p className="text-[7px] text-slate-400">Guaranteed</p>
                       </div>
                    </div>

                    {/* Floating Badge 2 (Fast Service) */}
                    <div className={`absolute bottom-0 -right-4 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-2 transition-all duration-700 ${activeField === 'media' ? 'translate-y-4 scale-110' : ''}`}>
                       <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                          <MapPin size={14} />
                       </div>
                       <div>
                          <p className="text-[8px] font-black text-slate-900 leading-none">Fast Service</p>
                          <p className="text-[7px] text-slate-400">Across City</p>
                       </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className={`flex gap-2 transition-all ${activeField === 'buttons' ? 'scale-110 origin-left' : ''}`}>
                    <div className="px-4 py-2 bg-primary-600 rounded-lg text-[9px] font-black text-white shadow-lg shadow-primary-100">
                       {heroData.primaryBtnText}
                    </div>
                    <div className="px-4 py-2 bg-slate-100 rounded-lg text-[9px] font-black text-slate-400">
                       {heroData.secondaryBtnText}
                    </div>
                  </div>
               </div>

               {/* Background Decorative Circles */}
               <div className="absolute top-10 right-20 w-4 h-4 bg-primary-400 rounded-full opacity-30"></div>
               <div className="absolute bottom-20 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-30"></div>
            </div>

            {/* Editor Tip */}
            <div className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/20 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform"></div>
               <h4 className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-2">Pro Customizer Tip</h4>
               <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Aapka circular image aur floating badges <span className="text-white font-bold underline italic">"Visual Hierarchy"</span> create karte hain. Inhe hamesha high-quality WebP format mein rakhein.
               </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroEditor;