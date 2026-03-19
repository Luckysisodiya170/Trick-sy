import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, ArrowLeft, Image as ImageIcon, Sparkles, 
  Type, MousePointer2, Eye, CheckCircle, MapPin, 
  Upload, ArrowRight, Star 
} from 'lucide-react';

const HeroEditor = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
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
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-emerald-100">
      
      {/* Editor Header */}
      <nav className="sticky top-0 z-[100] bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div className="h-8 w-[1px] bg-slate-200 mx-2" />
          <h1 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
            Hero <span className="text-emerald-500">Customizer</span>
          </h1>
        </div>
        <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs flex items-center gap-2 hover:shadow-2xl hover:shadow-slate-200 transition-all active:scale-95">
          <Save size={16} /> SAVE CHANGES
        </button>
      </nav>

      <div className="max-w-[1700px] mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: Configurator */}
        <div className="lg:col-span-5 space-y-8 pb-20">
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 flex items-center gap-2">
              <Type size={14} className="text-emerald-500" /> Typography & Copy
            </h3>
            
            <div className="space-y-4">
              <div onFocus={() => setActiveField('badge')}>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block">Badge Text</label>
                <input 
                  value={heroData.badgeText}
                  onChange={(e) => setHeroData({...heroData, badgeText: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:bg-white focus:border-emerald-400 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" onFocus={() => setActiveField('title')}>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block">Line 1</label>
                  <input value={heroData.titleLine1} onChange={(e) => setHeroData({...heroData, titleLine1: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:bg-white focus:border-emerald-400" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block">Highlight</label>
                  <input value={heroData.titleHighlight} onChange={(e) => setHeroData({...heroData, titleHighlight: e.target.value})} className="w-full p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl font-black text-emerald-700 outline-none focus:bg-white focus:border-emerald-400" />
                </div>
              </div>

              <div onFocus={() => setActiveField('desc')}>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block">Description</label>
                <textarea 
                  rows="3"
                  value={heroData.description}
                  onChange={(e) => setHeroData({...heroData, description: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium leading-relaxed outline-none focus:bg-white focus:border-emerald-400 transition-all shadow-inner"
                />
              </div>
            </div>
          </section>

          {/* Media Section - Circle Fix */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
              <ImageIcon size={14} className="text-blue-500" /> Hero Media
            </h3>
            
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
            <div 
              onClick={() => fileInputRef.current.click()}
              onMouseEnter={() => setActiveField('media')}
              className="w-full py-10 border-2 border-dashed border-slate-200 bg-slate-50 rounded-[2rem] flex flex-col items-center group hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer relative overflow-hidden"
            >
              {heroData.mainImage ? (
                <div className="text-center">
                  {/* Circle Image Wrapper */}
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mb-3 mx-auto">
                    <img src={heroData.mainImage} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase">Change Image</p>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:text-emerald-500 transition-all">
                    <Upload size={24} />
                  </div>
                  <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Click to upload main image</p>
                </>
              )}
            </div>
          </section>

          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
              <MousePointer2 size={14} className="text-purple-500" /> Action Buttons
            </h3>
            <div className="grid grid-cols-2 gap-4" onFocus={() => setActiveField('buttons')}>
               <div className="space-y-1">
                 <label className="text-[9px] font-black text-slate-300 uppercase ml-1">Primary</label>
                 <input value={heroData.primaryBtnText} onChange={(e) => setHeroData({...heroData, primaryBtnText: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:bg-white" />
               </div>
               <div className="space-y-1">
                 <label className="text-[9px] font-black text-slate-300 uppercase ml-1">Secondary</label>
                 <input value={heroData.secondaryBtnText} onChange={(e) => setHeroData({...heroData, secondaryBtnText: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:bg-white" />
               </div>
            </div>
          </section>
        </div>

        {/* RIGHT: LIVE PREVIEW - Perfect Circle Fix */}
        <div className="lg:col-span-7 relative">
          <div className="sticky top-28">
            <div className="flex items-center justify-between mb-4 px-6">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Eye size={14} /> Design Preview
               </span>
               <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
               </div>
            </div>

            <div className="relative bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 rounded-[3rem] border-[1px] border-slate-200 shadow-2xl min-h-[600px] overflow-hidden flex items-center p-12 group">
              
              <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-emerald-100/60 rounded-full blur-[80px]" />
              <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-green-100/50 rounded-full blur-[100px]" />

              <div className="grid grid-cols-12 w-full items-center gap-8 relative z-10">
                <div className="col-span-12 lg:col-span-6 space-y-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 shadow-sm transition-all duration-500 ${activeField === 'badge' ? 'scale-110 ring-2 ring-emerald-400' : ''}`}>
                    <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    <span className="text-xs font-bold text-emerald-700">{heroData.badgeText}</span>
                  </div>

                  <h1 className={`text-4xl xl:text-5xl font-extrabold text-slate-900 leading-[1.2] transition-all duration-500 ${activeField === 'title' ? 'translate-x-2' : ''}`}>
                    {heroData.titleLine1} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500">
                      {heroData.titleHighlight}
                    </span> <br/>
                    {heroData.titleLine3}
                  </h1>

                  <p className={`text-sm text-slate-600 leading-relaxed transition-all duration-500 ${activeField === 'desc' ? 'text-slate-900 font-medium' : ''}`}>
                    {heroData.description}
                  </p>

                  <div className={`flex gap-3 pt-4 transition-all duration-500 ${activeField === 'buttons' ? 'scale-105' : ''}`}>
                    <div className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2">
                      {heroData.primaryBtnText} <ArrowRight size={14} />
                    </div>
                    <div className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-xs shadow-sm">
                      {heroData.secondaryBtnText}
                    </div>
                  </div>
                </div>

                {/* Right Side - THE CIRCLE FIX */}
                <div className="col-span-12 lg:col-span-6 relative flex justify-center">
                  {/* Fixed aspect ratio container (square) */}
                  <div className="relative aspect-square w-full max-w-[320px] lg:max-w-[400px]">
                    <div className="absolute inset-0 bg-emerald-100 rounded-full opacity-40 scale-[1.05] animate-pulse" />
                    
                    {/* Perfect Circle Frame */}
                    <div className={`absolute inset-0 rounded-full border-[8px] border-white shadow-2xl overflow-hidden bg-white z-10 transition-all duration-700 ${activeField === 'media' ? 'scale-105 ring-4 ring-emerald-200' : ''}`}>
                      {heroData.mainImage ? (
                        <img src={heroData.mainImage} className="w-full h-full object-cover" alt="Hero" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-200">
                          <ImageIcon size={64} strokeWidth={1} />
                        </div>
                      )}
                    </div>

                    {/* Quality Badge */}
                    <div className="absolute top-6 -left-8 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white z-20 animate-bounce">
                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-900 leading-none mb-1">100% Quality</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Guaranteed</p>
                      </div>
                    </div>

                    {/* Map Badge */}
                    <div className="absolute bottom-6 -right-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white z-20 hover:-translate-y-2 transition-transform duration-300">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-900 leading-none mb-1">Fast Service</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Across City</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-slate-900/5 backdrop-blur-md rounded-full border border-slate-900/10">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[9px] font-black text-slate-900 tracking-widest uppercase">Live Component Preview</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroEditor;