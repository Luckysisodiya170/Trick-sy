import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Image as ImageIcon, Sparkles, 
  Type, MousePointer2, Eye, CheckCircle, MapPin, 
  Upload, ArrowRight, Star, Settings2, Edit3, Columns 
} from 'lucide-react';

const HeroEditor = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [viewMode, setViewMode] = useState('split'); // 'edit', 'split', or 'preview'
  const [activeField, setActiveField] = useState(null);
  
  const [heroData, setHeroData] = useState({
    badgeText: "Your Trusted Service Partner",
    titleLine1: "Professional",
    titleHighlight: "Cleaning & Maintenance",
    titleLine3: "Services",
    description: "Your ultimate destination for all home and office services. Explore our extensive collection of expert solutions for a spotless and well-maintained space.",
    primaryBtnText: "Book Service",
    secondaryBtnText: "Get Free Quote",
    mainImage: null 
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setHeroData({ ...heroData, mainImage: imageUrl });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-emerald-100 pb-20">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-[100] bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 w-1/4 sm:w-1/3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic">
            <Settings2 size={20} className="text-blue-600" /> HERO <span className="text-blue-500">LAB</span>
          </h1>
        </div>

        {/* 3-Way View Mode Toggle */}
        <div className="flex bg-slate-100 p-1 sm:p-1.5 rounded-full shadow-inner w-auto justify-center">
          <button 
            onClick={() => setViewMode('edit')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'edit' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Edit3 size={14} className="hidden sm:block" /> Edit
          </button>
          <button 
            onClick={() => setViewMode('split')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'split' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Columns size={14} className="hidden sm:block" /> Split
          </button>
          <button 
            onClick={() => setViewMode('preview')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'preview' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Eye size={14} className="hidden sm:block" /> Preview
          </button>
        </div>

        <div className="w-1/4 sm:w-1/3 flex justify-end">
          <button className="bg-slate-900 text-white px-4 sm:px-8 py-2.5 rounded-full font-extrabold text-[10px] sm:text-xs flex items-center gap-2 shadow-lg hover:bg-blue-600 transition-all hover:-translate-y-0.5">
            <Save size={14} className="hidden sm:block" /> Deploy
          </button>
        </div>
      </nav>

      {/* DYNAMIC LAYOUT CONTAINER */}
      <div className={`mx-auto transition-all duration-500 ${
        viewMode === 'split' 
          ? 'max-w-[1800px] p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-4' 
          : viewMode === 'edit' 
            ? 'max-w-4xl p-4 lg:p-10 mt-4' // FIX: Slightly wider max-width for edit mode to reduce side spaces
            : 'max-w-6xl p-4 lg:p-10 mt-4'
      }`}>

        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : ''} space-y-8 animate-in fade-in zoom-in-95 duration-300`}>
            
            {viewMode === 'edit' && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manage Hero Section</h2>
                <p className="text-slate-500 text-sm mt-2">Update your main landing area to capture user attention immediately.</p>
              </div>
            )}

            {/* Typography & Copy Section */}
            <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-tight border-b border-slate-100 pb-4">
                <Type size={16} className="text-emerald-500" /> Typography & Copy
              </h3>
              
              <div className="space-y-5">
                <div onFocus={() => setActiveField('badge')}>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Badge Text (Top Label)</label>
                  <input 
                    value={heroData.badgeText}
                    onChange={(e) => setHeroData({...heroData, badgeText: e.target.value})}
                    placeholder="e.g. Your Trusted Service Partner"
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm focus:bg-white focus:border-emerald-400 outline-none transition-all"
                  />
                </div>

                <div className={`grid grid-cols-1 ${viewMode === 'split' ? 'xl:grid-cols-2' : 'md:grid-cols-2'} gap-5`} onFocus={() => setActiveField('title')}>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Heading Line 1</label>
                      <input value={heroData.titleLine1} onChange={(e) => setHeroData({...heroData, titleLine1: e.target.value})} placeholder="Professional" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:bg-white focus:border-emerald-400 transition-all" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Heading Line 3</label>
                      <input value={heroData.titleLine3} onChange={(e) => setHeroData({...heroData, titleLine3: e.target.value})} placeholder="Services" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:bg-white focus:border-emerald-400 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1 mb-2 block">Highlight Text (Green)</label>
                    <textarea 
                      value={heroData.titleHighlight} 
                      onChange={(e) => setHeroData({...heroData, titleHighlight: e.target.value})} 
                      placeholder="Cleaning & Maintenance" 
                      className="w-full h-[124px] p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl font-black text-emerald-700 outline-none focus:bg-white focus:border-emerald-400 resize-none transition-all" 
                    />
                  </div>
                </div>

                <div onFocus={() => setActiveField('desc')}>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Main Description</label>
                  <textarea 
                    rows="3"
                    value={heroData.description}
                    onChange={(e) => setHeroData({...heroData, description: e.target.value})}
                    placeholder="Enter hero description..."
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium leading-relaxed outline-none focus:bg-white focus:border-emerald-400 transition-all resize-none"
                  />
                </div>
              </div>
            </section>

            <div className={`grid grid-cols-1 ${viewMode === 'edit' ? 'md:grid-cols-2' : ''} gap-8`}>
              {/* Action Buttons Section */}
              <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-tight border-b border-slate-100 pb-4">
                  <MousePointer2 size={16} className="text-emerald-500" /> Action Buttons
                </h3>
                <div className={`grid ${viewMode === 'split' ? 'grid-cols-1 gap-4' : 'grid-cols-1 sm:grid-cols-2 gap-5'}`} onFocus={() => setActiveField('buttons')}>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Primary Button</label>
                    <input value={heroData.primaryBtnText} onChange={(e) => setHeroData({...heroData, primaryBtnText: e.target.value})} placeholder="Book Service" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:bg-white focus:border-emerald-400 transition-all" />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Secondary Button</label>
                    <input value={heroData.secondaryBtnText} onChange={(e) => setHeroData({...heroData, secondaryBtnText: e.target.value})} placeholder="Get Free Quote" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:bg-white focus:border-emerald-400 transition-all" />
                  </div>
                </div>
              </section>

              {/* Media Section */}
              <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col">
                <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-tight border-b border-slate-100 pb-4">
                  <ImageIcon size={16} className="text-emerald-500" /> Hero Media
                </h3>
                
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                <div 
                  onClick={() => fileInputRef.current.click()}
                  onMouseEnter={() => setActiveField('media')}
                  className="flex-1 w-full border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl flex flex-col items-center justify-center p-6 group hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer relative overflow-hidden min-h-[200px]"
                >
                  {heroData.mainImage ? (
                    <div className="text-center">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mb-3 mx-auto transition-transform group-hover:scale-105">
                        <img src={heroData.mainImage} className="w-full h-full object-cover" alt="Preview" />
                      </div>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Change Image</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:text-emerald-500 transition-all">
                        <Upload size={20} />
                      </div>
                      <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Click to upload main image</p>
                    </>
                  )}
                </div>
              </section>
            </div>
          </div>
        )}
{/* Preview Section */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-7 lg:sticky lg:top-24 h-fit' : ''} animate-in fade-in zoom-in-95 duration-500`}>
            <div className="w-full bg-white rounded-3xl sm:rounded-[3rem] border-4 sm:border-[12px] border-slate-900 shadow-2xl overflow-hidden relative">
              
              {/* Browser Mockup Header */}
              <div className="h-8 sm:h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 sm:px-6 gap-2 relative z-50">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
                  </div>
                  <div className="flex-1 max-w-md h-6 sm:h-7 bg-white rounded-lg mx-auto border border-slate-200/70 flex items-center justify-center px-3 text-[10px] sm:text-[11px] text-slate-400 font-bold tracking-tight">
                    {viewMode === 'split' ? 'Live Split View' : 'Full Screen Preview'}
                  </div>
              </div>

              {/* Exact Hero Design */}
              <div className="relative overflow-y-auto max-h-[80vh] custom-scrollbar bg-slate-50">
                  
                  <div className={`relative bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 min-h-[500px] sm:min-h-[600px] overflow-hidden flex items-center ${viewMode === 'split' ? 'py-12 px-6 lg:px-8' : 'py-16 px-6 sm:px-12 lg:px-20'} group`}>
                    
                    {/* Background Blurs */}
                    <div className="absolute -top-20 -left-20 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-emerald-100/60 rounded-full blur-[80px] pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-green-100/50 rounded-full blur-[100px] pointer-events-none" />

                    <div className={`grid grid-cols-1 lg:grid-cols-12 w-full max-w-[1400px] mx-auto items-center gap-10 lg:gap-8 relative z-10`}>
                      
                      {/* Left Content Area */}
                      <div className={`col-span-1 lg:col-span-6 space-y-5 sm:space-y-6 ${viewMode === 'split' ? 'text-center' : 'text-center lg:text-left'}`}>
                        <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-emerald-100 shadow-sm transition-all duration-500 hover:scale-105 ${activeField === 'badge' ? 'ring-2 ring-emerald-400' : ''}`}>
                          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-emerald-500 text-emerald-500" />
                          <span className="text-[11px] sm:text-xs font-bold text-emerald-700">{heroData.badgeText || "Badge Text"}</span>
                        </div>

                        <h1 className={`text-4xl sm:text-5xl ${viewMode === 'split' ? 'xl:text-5xl' : 'xl:text-6xl'} font-extrabold text-slate-900 leading-[1.1] tracking-tight transition-all duration-500`}>
                          {heroData.titleLine1} <br className="hidden sm:block"/>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
                            {heroData.titleHighlight || "Highlighted Text"}
                          </span> <br className="hidden sm:block"/>
                          {heroData.titleLine3}
                        </h1>

                        <p className={`text-sm sm:text-base ${viewMode === 'split' ? 'lg:text-base' : 'lg:text-lg'} text-slate-600 leading-relaxed max-w-xl mx-auto ${viewMode === 'split' ? '' : 'lg:mx-0'} transition-colors duration-500 ${activeField === 'desc' ? 'text-slate-900' : ''}`}>
                          {heroData.description || "Enter a compelling description here."}
                        </p>

                  
                        <div className={`flex flex-row items-center justify-center ${viewMode === 'split' ? '' : 'lg:justify-start'} gap-3 sm:gap-4 pt-2 sm:pt-4 transition-transform duration-500 ${activeField === 'buttons' ? 'scale-105' : ''}`}>
                          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-[11px] sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-all shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-1 whitespace-nowrap">
                            {heroData.primaryBtnText || "Primary"} <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                          </button>
                          <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-[11px] sm:text-sm shadow-sm transition-all hover:-translate-y-1 whitespace-nowrap">
                            {heroData.secondaryBtnText || "Secondary"}
                          </button>
                        </div>
                      </div>

                      {/* Right Content Area */}
                      <div className="col-span-1 lg:col-span-6 relative flex justify-center mt-6 lg:mt-0">
                        <div className={`relative aspect-square w-full max-w-[280px] sm:max-w-[360px] ${viewMode === 'split' ? 'xl:max-w-[380px]' : 'xl:max-w-[480px]'}`}>
                          <div className="absolute inset-0 bg-emerald-100 rounded-full opacity-40 scale-[1.05] animate-pulse" />
                          
                          <div className={`absolute inset-0 rounded-full border-[6px] sm:border-[10px] border-white shadow-2xl overflow-hidden bg-white z-10 transition-all duration-700 hover:scale-[1.02] ${activeField === 'media' ? 'scale-[1.03] ring-4 ring-emerald-200' : ''}`}>
                            {heroData.mainImage ? (
                              <img src={heroData.mainImage} className="w-full h-full object-cover" alt="Hero" />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-300 gap-2">
                                <ImageIcon size={48} className="sm:w-16 sm:h-16" strokeWidth={1} />
                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">No Image</span>
                              </div>
                            )}
                          </div>

                          {/* Quality Badge */}
                          <div className="absolute top-2 sm:top-8 -left-2 sm:-left-6 bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 border border-white z-20 animate-bounce">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                              <CheckCircle size={16} className="sm:w-5 sm:h-5" />
                            </div>
                            <div>
                              <p className="text-[9px] sm:text-[10px] font-black text-slate-900 leading-none mb-1">100% Quality</p>
                              <p className="text-[8px] sm:text-[9px] text-slate-400 font-bold uppercase tracking-tight">Guaranteed</p>
                            </div>
                          </div>

                          {/* Map Badge */}
                          <div className="absolute bottom-2 sm:bottom-8 -right-2 sm:-right-4 bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 border border-white z-20 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                              <MapPin size={16} className="sm:w-5 sm:h-5" />
                            </div>
                            <div>
                              <p className="text-[9px] sm:text-[10px] font-black text-slate-900 leading-none mb-1">Fast Service</p>
                              <p className="text-[8px] sm:text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Across City</p>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

export default HeroEditor;