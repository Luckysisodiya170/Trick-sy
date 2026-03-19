import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, ArrowLeft, Image as ImageIcon, Sparkles, 
  CheckCircle2, Plus, Trash2, Eye, Award, 
  MousePointer2, Globe, Upload, Smartphone, Laptop
} from 'lucide-react';

const AboutEditor = () => {
  const navigate = useNavigate();
  const mainImageRef = useRef(null);
  const detailImageRef = useRef(null);
  const [activeField, setActiveField] = useState(null);
  const [images, setImages] = useState({ main: null, detail: null });

  const [aboutData, setAboutData] = useState({
    badge: "About TRICKSY",
    title: "We Provide The Best",
    highlightText: "Home Maintenance",
    description: "TRICKSY is your premium destination for home and office maintenance. We bridge the gap between skilled professionals and homeowners who value quality.",
    features: ["100% Satisfaction", "Verified Professionals", "Transparent Pricing", "Emergency Support"],
    yearsExp: "10+",
    customersText: "5k+",
  });

  const updateField = (field, value) => setAboutData({ ...aboutData, [field]: value });

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages(prev => ({ ...prev, [type]: imageUrl }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...aboutData.features];
    updatedFeatures[index] = value;
    setAboutData({ ...aboutData, features: updatedFeatures });
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans text-slate-900">
      
      {/* Header */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black tracking-tighter">ABOUT <span className="text-emerald-600">EDITOR</span></h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client: Tricksy Home Services</p>
          </div>
        </div>
        <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-50">
          <Save size={16} /> PUBLISH SECTION
        </button>
      </nav>

      <div className="max-w-[1700px] mx-auto p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: Editor Panel */}
        <div className="lg:col-span-5 space-y-6 pb-20">
          
          {/* Text Content Card */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm transition-all focus-within:shadow-xl focus-within:ring-1 ring-emerald-100">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-emerald-600 mb-6 flex items-center gap-2">
              <Sparkles size={14} /> Main Content
            </h3>
            <div className="space-y-5">
               <div onFocus={() => setActiveField('badge')}>
                  <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Section Badge</label>
                  <input value={aboutData.badge} onChange={(e) => updateField('badge', e.target.value)} className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-emerald-50/30 transition-all" />
               </div>
               <div className="grid grid-cols-2 gap-4" onFocus={() => setActiveField('title')}>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Headline</label>
                    <input value={aboutData.title} onChange={(e) => updateField('title', e.target.value)} className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Highlight</label>
                    <input value={aboutData.highlightText} onChange={(e) => updateField('highlightText', e.target.value)} className="w-full p-4 bg-emerald-50 text-emerald-700 border-none rounded-2xl font-black text-sm outline-none" />
                  </div>
               </div>
               <div onFocus={() => setActiveField('desc')}>
                  <label className="text-[9px] font-black text-slate-400 uppercase ml-2">Description</label>
                  <textarea rows="3" value={aboutData.description} onChange={(e) => updateField('description', e.target.value)} className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-medium outline-none resize-none" />
               </div>
            </div>
          </div>

          {/* Features Editor */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm" onFocus={() => setActiveField('features')}>
            <h3 className="text-[11px] font-black uppercase tracking-widest text-blue-600 mb-6 flex items-center gap-2">
              <CheckCircle2 size={14} /> Feature Points
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aboutData.features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-transparent hover:border-blue-100 transition-all group">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 size={12} />
                  </div>
                  <input value={f} onChange={(e) => handleFeatureChange(i, e.target.value)} className="w-full bg-transparent font-bold text-slate-700 outline-none text-xs" />
                </div>
              ))}
            </div>
          </div>

          {/* Stats & Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm" onFocus={() => setActiveField('stats')}>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-orange-500 mb-5 flex items-center gap-2"><Award size={14} /> Stats</h3>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Exp Years</span>
                    <input value={aboutData.yearsExp} onChange={(e) => updateField('yearsExp', e.target.value)} className="w-full bg-transparent font-black text-xl outline-none" />
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Total Users</span>
                    <input value={aboutData.customersText} onChange={(e) => updateField('customersText', e.target.value)} className="w-full bg-transparent font-black text-xl outline-none" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm" onFocus={() => setActiveField('media')}>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-purple-600 mb-5 flex items-center gap-2"><ImageIcon size={14} /> Images</h3>
                <div className="grid grid-cols-2 gap-3">
                  <label className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 overflow-hidden">
                    <input type="file" hidden onChange={(e) => handleImageUpload(e, 'main')} accept="image/*" />
                    {images.main ? <img src={images.main} className="w-full h-full object-cover" /> : <Upload size={16} className="text-slate-300" />}
                  </label>
                  <label className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 overflow-hidden">
                    <input type="file" hidden onChange={(e) => handleImageUpload(e, 'detail')} accept="image/*" />
                    {images.detail ? <img src={images.detail} className="w-full h-full object-cover" /> : <Upload size={16} className="text-slate-300" />}
                  </label>
                </div>
              </div>
          </div>
        </div>

        {/* RIGHT: Laptop Mockup Preview */}
        <div className="lg:col-span-7 relative">
          <div className="sticky top-28">
            <div className="flex items-center justify-between px-6 mb-4">
               <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-400/20" />
                     <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20" />
                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20" />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">About Section Live Mockup</span>
               </div>
               <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                  <button className="p-2 bg-slate-900 text-white rounded-lg"><Laptop size={14}/></button>
                  <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><Smartphone size={14}/></button>
               </div>
            </div>

            {/* The Laptop Device Wrapper */}
            <div className="bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 relative">
               <div className="bg-white rounded-[1.8rem] overflow-hidden min-h-[600px] flex flex-col relative">
                  
                  <div className="p-12 h-full">
                    <div className="grid grid-cols-2 gap-12 items-center">
                        
                        {/* Image Stack Mockup */}
                        <div className={`relative transition-all duration-700 ${activeField === 'media' ? 'scale-105 rotate-1' : ''}`}>
                            {/* Main Background Box */}
                            <div className="absolute -top-4 -left-4 w-full h-[320px] bg-emerald-600 rounded-[3rem] opacity-10 blur-2xl" />
                            
                            {/* Main Image Container */}
                            <div className="relative w-full h-[320px] bg-slate-100 rounded-[2.5rem] border-[6px] border-white shadow-xl overflow-hidden flex items-center justify-center">
                               {images.main ? <img src={images.main} className="w-full h-full object-cover" /> : <ImageIcon size={48} className="text-slate-200" />}
                            </div>

                            {/* Small Overlay Image Container */}
                            <div className={`absolute -bottom-8 -right-4 w-44 h-44 bg-white rounded-[2rem] p-2 shadow-2xl transition-all duration-500 ${activeField === 'media' ? 'translate-y-[-10px] shadow-emerald-200' : ''}`}>
                               <div className="w-full h-full bg-slate-50 rounded-[1.5rem] overflow-hidden flex items-center justify-center border border-slate-100">
                                  {images.detail ? <img src={images.detail} className="w-full h-full object-cover" /> : <ImageIcon size={24} className="text-slate-200" />}
                               </div>
                            </div>

                            {/* Floating Badge Exp */}
                            <div className={`absolute top-1/2 -left-10 bg-white p-5 rounded-3xl shadow-xl flex items-center gap-4 border border-slate-50 transition-all duration-500 ${activeField === 'stats' ? 'scale-110 -rotate-3 border-emerald-500' : ''}`}>
                               <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                                  <Award size={22} />
                               </div>
                               <div>
                                  <p className="text-2xl font-black leading-none">{aboutData.yearsExp}</p>
                                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mt-1">Years Working</p>
                               </div>
                            </div>
                        </div>

                        {/* Text Mockup Section */}
                        <div className="space-y-6">
                            <div className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all ${activeField === 'badge' ? 'bg-emerald-600 text-white translate-x-2' : 'bg-emerald-50 text-emerald-600'}`}>
                               <Sparkles size={10} className="inline mr-2 mb-0.5" /> {aboutData.badge}
                            </div>

                            <h2 className={`text-4xl font-black text-slate-900 leading-[1.1] transition-all duration-500 ${activeField === 'title' ? 'scale-105 origin-left' : ''}`}>
                                {aboutData.title} <span className="text-emerald-500">{aboutData.highlightText}</span>
                            </h2>

                            <p className={`text-xs text-slate-500 leading-relaxed font-medium transition-all ${activeField === 'desc' ? 'text-slate-800' : ''}`}>
                               {aboutData.description}
                            </p>

                            <div className={`grid grid-cols-2 gap-3 transition-all ${activeField === 'features' ? 'opacity-100' : 'opacity-80'}`}>
                               {aboutData.features.slice(0, 4).map((f, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                     <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                                     <span className="text-[10px] font-bold text-slate-700 truncate">{f}</span>
                                  </div>
                               ))}
                            </div>

                            <div className="pt-8 flex items-center gap-6 border-t border-slate-50">
                               <div className="flex -space-x-3">
                                  {[1,2,3].map(i => <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-200" />)}
                                  <div className="w-9 h-9 rounded-full border-2 border-white bg-emerald-500 text-white flex items-center justify-center text-[8px] font-black">+</div>
                               </div>
                               <div>
                                  <p className="text-sm font-black text-slate-900 leading-none">{aboutData.customersText}</p>
                                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Active Clients</p>
                               </div>
                            </div>
                        </div>
                    </div>
                  </div>

                  {/* UI Tooltip */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900/5 backdrop-blur-md rounded-full border border-slate-900/10 flex items-center gap-3">
                     <MousePointer2 size={12} className="text-emerald-600 animate-pulse" />
                     <span className="text-[9px] font-black text-slate-600 tracking-widest uppercase">Select field to focus preview</span>
                  </div>

               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutEditor;