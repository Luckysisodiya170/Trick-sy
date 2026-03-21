import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Type, Eye, ShieldCheck, Star, 
  Upload, Settings2, Edit3, Columns, Users 
} from 'lucide-react';

const AboutHeroEditor = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [viewMode, setViewMode] = useState('split'); 
  
  const [heroData, setHeroData] = useState({
    badgeText: "Established 2014",
    mainTitle: "The Team That",
    highlightTitle: "Perfects Your Space.",
    subtext: "We’re not just a service company; we’re your partners in maintaining a lifestyle of comfort and uncompromising hygiene.",
    certifiedTitle: "Certified Experts",
    certifiedSub: "Vetted Professionals",
    topRatedTitle: "Top Rated",
    topRatedSub: "4.9/5 User Rating",
    legacyYears: "10+",
    trustedCount: "+5k",
    bgImage: null 
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setHeroData({ ...heroData, bgImage: imageUrl });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      
      {/* --- ULTRA-RESPONSIVE NAVBAR --- */}
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-3 lg:px-6 py-3 flex items-center justify-between shadow-sm gap-2">
        <div className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm lg:text-lg font-black tracking-tighter italic flex items-center gap-1.5">
            <Settings2 size={18} className="text-indigo-600 lg:w-5 lg:h-5" /> 
            <span className="tracking-tight uppercase">ABOUT</span> 
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full flex-shrink-1 mx-2">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, 
             { id: 'split', icon: Columns, label: 'Split' }, 
             { id: 'preview', icon: Eye, label: 'Preview' }
          ].map((mode) => (
            <button 
              key={mode.id} 
              onClick={() => setViewMode(mode.id)} 
              className={`flex items-center gap-1.5 px-3 lg:px-5 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs font-bold transition-all whitespace-nowrap ${
                viewMode === mode.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'
              }`}
            >
              <mode.icon size={12} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className={`${viewMode === mode.id ? 'inline' : 'hidden sm:inline'}`}>{mode.label}</span>
            </button>
          ))}
        </div>

        <button className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-indigo-600 transition-all flex-shrink-0">
          <Save size={16} className="lg:w-[14px] lg:h-[14px]" /> 
          <span className="hidden md:inline">Save Changes</span>
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-500 ${viewMode === 'split' ? 'max-w-[1800px] p-6 grid grid-cols-1 lg:grid-cols-12 gap-10' : 'max-w-4xl p-6'}`}>

        {/* --- EDITOR SIDE --- */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : ''} space-y-6`}>
            {/* Header Text Editor */}
            <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm uppercase tracking-tight border-b pb-4">
                <Type size={16} className="text-indigo-500" /> Header & Text
              </h3>
              <div className="space-y-4">
                <input value={heroData.badgeText} onChange={(e) => setHeroData({...heroData, badgeText: e.target.value})} placeholder="Badge Text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-indigo-400" />
                <input value={heroData.mainTitle} onChange={(e) => setHeroData({...heroData, mainTitle: e.target.value})} placeholder="Main Title" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-t-xl font-bold text-sm outline-none" />
                <input value={heroData.highlightTitle} onChange={(e) => setHeroData({...heroData, highlightTitle: e.target.value})} placeholder="Highlight Title" className="w-full p-4 bg-emerald-50/50 border border-emerald-100 rounded-b-xl font-black text-emerald-700 outline-none" />
                <textarea rows="3" value={heroData.subtext} onChange={(e) => setHeroData({...heroData, subtext: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium outline-none resize-none" />
              </div>
            </section>

            {/* Badges Editor */}
            <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm uppercase tracking-tight border-b pb-4">
                <ShieldCheck size={16} className="text-emerald-500" /> Feature Badges
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                   <p className="text-[10px] font-black text-emerald-600 uppercase">Expert Badge</p>
                   <input value={heroData.certifiedTitle} onChange={(e) => setHeroData({...heroData, certifiedTitle: e.target.value})} className="w-full bg-transparent font-bold text-sm outline-none" />
                   <input value={heroData.certifiedSub} onChange={(e) => setHeroData({...heroData, certifiedSub: e.target.value})} className="w-full bg-transparent text-xs text-slate-500 outline-none" />
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                   <p className="text-[10px] font-black text-amber-600 uppercase">Rating Badge</p>
                   <input value={heroData.topRatedTitle} onChange={(e) => setHeroData({...heroData, topRatedTitle: e.target.value})} className="w-full bg-transparent font-bold text-sm outline-none" />
                   <input value={heroData.topRatedSub} onChange={(e) => setHeroData({...heroData, topRatedSub: e.target.value})} className="w-full bg-transparent text-xs text-slate-500 outline-none" />
                </div>
              </div>
            </section>

            {/* Image Upload */}
            <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-4">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">Banner Background</h3>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
              <div onClick={() => fileInputRef.current.click()} className="w-full h-40 border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl flex flex-col items-center justify-center group hover:bg-indigo-50 transition-all cursor-pointer overflow-hidden relative">
                {heroData.bgImage ? (
                  <>
                    <img src={heroData.bgImage} className="w-full h-full object-cover opacity-50" alt="bg" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">Change Image</div>
                  </>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto text-slate-300 mb-2" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Banner Image</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* --- LIVE PREVIEW --- */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-7' : 'w-full'} h-fit animate-in fade-in max-w-full overflow-hidden`}>
            <div className="w-full bg-slate-900 rounded-[2rem] border-[6px] border-slate-950 shadow-2xl overflow-hidden relative">
              <div className="flex h-6 bg-slate-800/50 items-center px-4 gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
              </div>

              {/* LIVE HERO SECTION */}
              <section className="relative min-h-[450px] lg:min-h-[550px] bg-black overflow-hidden flex items-center py-10 lg:py-14 px-5 lg:px-8">
                {heroData.bgImage && <img src={heroData.bgImage} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="hero-bg" />}
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 w-full flex flex-col lg:flex-row gap-8 items-center">
                  
                  {/* Left Preview Content */}
                  <div className="w-full lg:w-[60%] space-y-4 lg:space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-emerald-500 font-bold text-[8px] lg:text-[10px] uppercase tracking-widest">{heroData.badgeText}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white leading-[1.1] tracking-tighter">
                      {heroData.mainTitle} <br />
                      <span className="text-emerald-500">{heroData.highlightTitle}</span>
                    </h1>
                    <p className="text-zinc-400 text-[10px] lg:text-sm max-w-md font-medium leading-relaxed">{heroData.subtext}</p>
                    
                    {/* 🟢 SMALLER PREVIEW BADGES 🟢 */}
                    <div className="flex flex-row items-center gap-2 lg:gap-3 pt-2 w-full">
                      <div className="flex flex-1 items-center gap-2 bg-white p-2 lg:p-2.5 rounded-xl shadow-lg border border-zinc-100 min-w-0">
                        <div className="flex-shrink-0 w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                          <ShieldCheck size={14} className="text-emerald-500 lg:w-4 lg:h-4" />
                        </div>
                        <div className="min-w-0 overflow-hidden">
                          <p className="text-zinc-950 font-black text-[8px] lg:text-[9.5px] uppercase truncate leading-none">{heroData.certifiedTitle}</p>
                          <p className="text-zinc-500 text-[7px] lg:text-[8px] font-medium mt-1 truncate">{heroData.certifiedSub}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-center gap-2 bg-white p-2 lg:p-2.5 rounded-xl shadow-lg border border-zinc-100 min-w-0">
                        <div className="flex-shrink-0 w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                          <Star size={14} className="text-amber-500 lg:w-4 lg:h-4" />
                        </div>
                        <div className="min-w-0 overflow-hidden">
                          <p className="text-zinc-950 font-black text-[8px] lg:text-[9.5px] uppercase truncate leading-none">{heroData.topRatedTitle}</p>
                          <p className="text-zinc-500 text-[7px] lg:text-[8px] font-medium mt-1 truncate">{heroData.topRatedSub}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Preview Card */}
                  <div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-[200px] lg:max-w-[240px]">
                      <div className="absolute top-2 left-2 w-full h-full bg-emerald-500 rounded-[2rem]"></div>
                      <div className="relative bg-white p-5 lg:p-6 rounded-[2rem] text-center shadow-xl">
                        <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-2 border border-emerald-100">
                          <Users size={18} className="text-emerald-500 lg:w-5 lg:h-5" />
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-black text-zinc-950 mb-1">{heroData.legacyYears}</h3>
                        <p className="text-zinc-400 font-bold uppercase tracking-widest text-[7px] lg:text-[8px] mb-4">Years Legacy</p>
                        <div className="flex justify-center items-center -space-x-2 mb-4">
                          {[1, 2, 3].map(i => <div key={i} className="w-7 h-7 lg:w-9 lg:h-9 rounded-full border-2 border-white bg-slate-200" />)}
                          <div className="w-7 h-7 lg:w-9 lg:h-9 rounded-full border-2 border-white bg-zinc-950 flex items-center justify-center text-[7px] lg:text-[9px] font-black text-white relative z-10">{heroData.trustedCount}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutHeroEditor;