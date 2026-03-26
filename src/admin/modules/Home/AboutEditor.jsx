import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Image as ImageIcon, Sparkles, 
  CheckCircle2, Award, Users, Upload, ArrowRight, 
  Settings2, Edit3, Columns, Eye, Type, ListChecks
} from 'lucide-react';

const AboutEditor = () => {
  const navigate = useNavigate();
  const mainImageRef = useRef(null);
  const detailImageRef = useRef(null);
  
  const [viewMode, setViewMode] = useState('split'); // 'edit', 'split', or 'preview'
  const [activeField, setActiveField] = useState(null);
  const [images, setImages] = useState({ main: null, detail: null });

  const [aboutData, setAboutData] = useState({
    badge: "About TRICKSY",
    title: "We Provide The Best",
    highlightText: "Home Maintenance",
    description: "TRICKSY is your premium destination for home and office maintenance. We bridge the gap between skilled professionals and homeowners who value quality, reliability, and speed.",
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
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-emerald-100 pb-20">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-[20] bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 w-1/4 sm:w-1/3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic">
            <Settings2 size={20} className="text-purple-600" /> ABOUT <span className="text-purple-500">LAB</span>
          </h1>
        </div>

        {/*  Toggle */}
        <div className="flex bg-slate-100 p-1 sm:p-1.5 rounded-full shadow-inner w-auto justify-center">
          <button 
            onClick={() => setViewMode('edit')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'edit' ? 'bg-white shadow-md text-purple-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Edit3 size={14} className="hidden sm:block" /> Edit
          </button>
          <button 
            onClick={() => setViewMode('split')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'split' ? 'bg-white shadow-md text-purple-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Columns size={14} className="hidden sm:block" /> Split
          </button>
          <button 
            onClick={() => setViewMode('preview')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'preview' ? 'bg-white shadow-md text-purple-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Eye size={14} className="hidden sm:block" /> Preview
          </button>
        </div>

        <div className="w-1/4 sm:w-1/3 flex justify-end">
          <button className="bg-slate-900 text-white px-4 sm:px-8 py-2.5 rounded-full font-extrabold text-[10px] sm:text-xs flex items-center gap-2 shadow-lg hover:bg-purple-600 transition-all hover:-translate-y-0.5">
            <Save size={14} className="hidden sm:block" /> Deploy
          </button>
        </div>
      </nav>

      <div className={`mx-auto transition-all duration-500 ${
        viewMode === 'split' 
          ? 'max-w-[1800px] p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-4' 
          : viewMode === 'edit' 
            ? 'max-w-4xl p-4 lg:p-10 mt-4' 
            : 'max-w-6xl p-4 lg:p-10 mt-4'
      }`}>
   
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : ''} space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-300`}>
            
            {viewMode === 'edit' && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manage About Section</h2>
                <p className="text-slate-500 text-sm mt-2">Update your company description, features, stats, and imagery.</p>
              </div>
            )}

            {/* Text Content */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 transition-all focus-within:ring-2 ring-emerald-100">
              <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-tight border-b border-slate-100 pb-4">
                <Type size={16} className="text-emerald-500" /> Typography & Copy
              </h3>
              
              <div className="space-y-5">
                <div onFocus={() => setActiveField('badge')}>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Badge Text (Top Label)</label>
                  <input value={aboutData.badge} onChange={(e) => updateField('badge', e.target.value)} placeholder="About TRICKSY" className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-emerald-400 focus:bg-white transition-all" />
                </div>
                
                <div className={`grid grid-cols-1 ${viewMode === 'split' ? 'xl:grid-cols-2' : 'md:grid-cols-2'} gap-5`} onFocus={() => setActiveField('title')}>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Headline</label>
                    <input value={aboutData.title} onChange={(e) => updateField('title', e.target.value)} placeholder="We Provide The Best" className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-emerald-400 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1 mb-2 block">Highlight (Green Text)</label>
                    <input value={aboutData.highlightText} onChange={(e) => updateField('highlightText', e.target.value)} placeholder="Home Maintenance" className="w-full p-3.5 bg-emerald-50/50 border border-emerald-200 rounded-xl font-black text-emerald-700 outline-none focus:bg-white focus:border-emerald-400 transition-all" />
                  </div>
                </div>

                <div onFocus={() => setActiveField('desc')}>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Main Description</label>
                  <textarea rows="3" value={aboutData.description} onChange={(e) => updateField('description', e.target.value)} placeholder="Enter description..." className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium outline-none focus:border-emerald-400 focus:bg-white resize-none leading-relaxed transition-all" />
                </div>
              </div>
            </div>

            {/* Features Editor */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8" onFocus={() => setActiveField('features')}>
              <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-tight border-b border-slate-100 pb-4">
                <ListChecks size={16} className="text-emerald-500" /> Feature Points
              </h3>
              <div className={`grid grid-cols-1 ${viewMode === 'split' ? 'xl:grid-cols-2' : 'md:grid-cols-2'} gap-4`}>
                {aboutData.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 focus-within:border-emerald-400 focus-within:bg-white transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-focus-within:bg-emerald-500 group-focus-within:text-white transition-colors">
                      <CheckCircle2 size={16} />
                    </div>
                    <input value={f} onChange={(e) => handleFeatureChange(i, e.target.value)} placeholder={`Feature ${i + 1}`} className="w-full bg-transparent font-bold text-slate-700 text-xs sm:text-sm outline-none" />
                  </div>
                ))}
              </div>
            </div>

            {/* Stats & Images Configurator */}
            <div className={`grid grid-cols-1 ${viewMode === 'edit' ? 'md:grid-cols-2' : ''} gap-6 sm:gap-8`}>
                
                {/* Stats Section */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8" onFocus={() => setActiveField('stats')}>
                  <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-tight border-b border-slate-100 pb-4">
                    <Award size={16} className="text-emerald-500" /> Key Statistics
                  </h3>
                  <div className={`grid grid-cols-1 ${viewMode === 'split' ? 'sm:grid-cols-2' : 'sm:grid-cols-1 gap-4'} gap-4`}>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 focus-within:border-emerald-400 focus-within:bg-white transition-colors">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Exp Years</span>
                      <input value={aboutData.yearsExp} onChange={(e) => updateField('yearsExp', e.target.value)} className="w-full bg-transparent font-black text-2xl text-slate-800 outline-none" />
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 focus-within:border-emerald-400 focus-within:bg-white transition-colors">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Total Customers</span>
                      <input value={aboutData.customersText} onChange={(e) => updateField('customersText', e.target.value)} className="w-full bg-transparent font-black text-2xl text-slate-800 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Images Section */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col" onFocus={() => setActiveField('media')}>
                  <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-tight border-b border-slate-100 pb-4">
                    <ImageIcon size={16} className="text-emerald-500" /> About Imagery
                  </h3>
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    
                    {/* Main Image Upload */}
                    <div className="flex flex-col gap-2 h-full">
                      <label className="text-[10px] font-black text-slate-400 uppercase text-center tracking-widest">Main Image</label>
                      <div 
                        onClick={() => mainImageRef.current.click()}
                        className="flex-1 w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-all overflow-hidden min-h-[120px] group"
                      >
                        <input type="file" ref={mainImageRef} hidden onChange={(e) => handleImageUpload(e, 'main')} accept="image/*" />
                        {images.main ? (
                            <img src={images.main} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        ) : (
                            <Upload size={20} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                        )}
                      </div>
                    </div>

                    {/* Detail Overlap Image Upload */}
                    <div className="flex flex-col gap-2 h-full">
                      <label className="text-[10px] font-black text-slate-400 uppercase text-center tracking-widest">Overlap Detail</label>
                      <div 
                        onClick={() => detailImageRef.current.click()}
                        className="flex-1 w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-all overflow-hidden min-h-[120px] group"
                      >
                        <input type="file" ref={detailImageRef} hidden onChange={(e) => handleImageUpload(e, 'detail')} accept="image/*" />
                        {images.detail ? (
                            <img src={images.detail} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        ) : (
                            <Upload size={20} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                        )}
                      </div>
                    </div>

                  </div>
                </div>
            </div>

          </div>
        )}

      {/* Preview Section */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-7 lg:sticky lg:top-24 h-fit' : ''} animate-in fade-in zoom-in-95 duration-500`}>
            <div className="w-full bg-white rounded-3xl sm:rounded-[3rem] border-4 sm:border-[12px] border-slate-900 shadow-2xl overflow-hidden relative">
              
              {/* Browser Mockup Header */}
              <div className="h-8 sm:h-12 bg-slate-100 border-b border-slate-200 flex items-center px-4 sm:px-6 gap-2 relative z-50">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
                  </div>
                  <div className="flex-1 max-w-md h-6 sm:h-7 bg-white rounded-lg mx-auto border border-slate-200/70 flex items-center justify-center px-3 text-[10px] sm:text-[11px] text-slate-400 font-bold tracking-tight">
                    {viewMode === 'split' ? 'Live Split View' : 'Full Screen Preview'}
                  </div>
              </div>

              {/* Exact About Section Design  */}
              <div className="relative overflow-y-auto max-h-[80vh] custom-scrollbar bg-white pb-10">
                  
                  {/* Background  */}
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-50 rounded-full blur-[80px] pointer-events-none" />

                  <div className={`py-12 sm:py-20 relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 ${viewMode === 'split' ? 'lg:px-8' : 'lg:px-16'}`}>
                      
                      <div className={`grid grid-cols-1 ${viewMode === 'split' ? 'xl:grid-cols-2' : 'lg:grid-cols-2'} gap-12 sm:gap-16 xl:gap-20 items-center`}>
                          
                          {/* Left Column */}
                          <div className={`relative transition-all duration-700 ${activeField === 'media' ? 'scale-105 rotate-1' : ''}`}>
                              {/* Main Background  */}
                              <div className="absolute -top-4 -left-4 w-full h-[280px] sm:h-[400px] bg-emerald-500 rounded-[3rem] opacity-20 blur-2xl" />
                              
                              {/* Main Image Container */}
                              <div className={`relative w-full h-[280px] sm:h-[400px] bg-slate-100 rounded-[2.5rem] border-[6px] sm:border-[8px] border-white shadow-xl overflow-hidden flex items-center justify-center transition-all ${activeField === 'media' ? 'ring-4 ring-emerald-200' : ''}`}>
                                 {images.main ? <img src={images.main} className="w-full h-full object-cover" /> : <ImageIcon size={48} className="text-slate-300" />}
                              </div>

                              {/* Small Overlay Image Container */}
                              <div className={`absolute -bottom-6 -right-4 sm:-bottom-10 sm:-right-8 w-36 h-36 sm:w-56 sm:h-56 bg-white rounded-[1.5rem] sm:rounded-[2rem] p-2 shadow-2xl transition-all duration-500 ${activeField === 'media' ? 'translate-y-[-10px] shadow-emerald-200' : ''}`}>
                                 <div className="w-full h-full bg-slate-50 rounded-[1.2rem] sm:rounded-[1.5rem] overflow-hidden flex items-center justify-center border border-slate-100">
                                    {images.detail ? <img src={images.detail} className="w-full h-full object-cover" /> : <ImageIcon size={32} className="text-slate-300" />}
                                 </div>
                              </div>

                              {/* Floating Stats Badge  */}
                              <div className={`absolute top-1/2 -left-6 sm:-left-12 bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-xl flex items-center gap-3 sm:gap-4 border border-slate-50 transition-all duration-500 ${activeField === 'stats' ? 'scale-110 -rotate-3 border-emerald-400' : ''}`}>
                                 <div className="w-10 h-10 sm:w-14 sm:h-14 bg-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                                    <Award size={20} className="sm:w-6 sm:h-6" />
                                 </div>
                                 <div>
                                    <p className="text-xl sm:text-3xl font-black leading-none text-slate-900">{aboutData.yearsExp}</p>
                                    <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1">Years Working</p>
                                 </div>
                              </div>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-6 sm:space-y-8 mt-8 lg:mt-0">
                              
                              <div className="space-y-4">
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] sm:text-[11px] font-black tracking-widest uppercase transition-all ${activeField === 'badge' ? 'bg-emerald-600 text-white translate-x-2 shadow-md' : 'bg-emerald-50 text-emerald-600'}`}>
                                   <Sparkles size={12} /> {aboutData.badge}
                                </div>

                                <h2 className={`text-3xl sm:text-5xl font-black text-slate-900 leading-[1.1] transition-all duration-500 ${activeField === 'title' ? 'scale-105 origin-left' : ''}`}>
                                    {aboutData.title} <br className="hidden sm:block"/>
                                    <span className="text-emerald-500">{aboutData.highlightText}</span>
                                </h2>

                                <p className={`text-sm sm:text-base text-slate-600 leading-relaxed font-medium transition-all ${activeField === 'desc' ? 'text-slate-900' : ''}`}>
                                   {aboutData.description}
                                </p>
                              </div>

                              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 transition-all ${activeField === 'features' ? 'opacity-100 scale-105 origin-left' : 'opacity-90'}`}>
                                 {aboutData.features.slice(0, 4).map((f, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-colors">
                                       <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                         <CheckCircle2 size={14} className="text-emerald-600" />
                                       </div>
                                       <span className="text-[12px] sm:text-[14px] font-bold text-slate-800 truncate">{f}</span>
                                    </div>
                                 ))}
                              </div>

                              <div className={`pt-6 sm:pt-8 flex items-center gap-4 sm:gap-6 border-t border-slate-100 transition-all ${activeField === 'stats' ? 'translate-x-2' : ''}`}>
                                 <div className="flex -space-x-3">
                                    {[1,2,3].map(i => <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-slate-200" />)}
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-emerald-500 text-white flex items-center justify-center text-xs font-black">+</div>
                                 </div>
                                 <div>
                                    <p className="text-lg sm:text-xl font-black text-slate-900 leading-none">{aboutData.customersText}</p>
                                    <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Active Clients</p>
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

export default AboutEditor;