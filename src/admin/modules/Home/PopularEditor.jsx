import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Image as ImageIcon, Sparkles, 
  Settings2, Home, Briefcase, Building2, Utensils, 
  Dumbbell, Factory, Plus, Trash2, Upload, ChevronDown, 
  Type, Eye, Edit3, Columns, LayoutList, ArrowRight
} from 'lucide-react';

const PopularEditor = () => {
  const navigate = useNavigate();
  
  const [viewMode, setViewMode] = useState('split'); 
  const [activeCard, setActiveCard] = useState(null); 
  const [previewIndex, setPreviewIndex] = useState(0); 

  const [services, setServices] = useState([
    { id: 1, title: 'Villa Cleaning', desc: 'Premium deep cleaning for luxury homes.', icon: 'Home', image: null },
    { id: 2, title: 'Office Cleaning', desc: 'Sanitized workspaces to boost productivity.', icon: 'Briefcase', image: null },
    { id: 3, title: 'Apartment Cleaning', desc: 'Quick and flawless services for modern flats.', icon: 'Building2', image: null },
  ]);

  const [headerSettings, setHeaderSettings] = useState({
    badgeText: "Categories",
    headingNormal: "Popular",
    headingHighlight: "Services",
    description: "Choose from our highly-rated maintenance and cleaning categories tailored for your specific property needs."
  });

  const iconMap = { Home, Briefcase, Building2, Utensils, Dumbbell, Factory, Sparkles };

  const handleAddService = () => {
    const newId = Date.now();
    setServices([...services, { id: newId, title: 'New Service', desc: 'Description...', icon: 'Sparkles', image: null }]);
    setActiveCard(newId); 
    setPreviewIndex(services.length); 
  };

  const updateService = (id, field, value) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeService = (e, id, index) => {
    e.stopPropagation();
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    if (previewIndex >= updated.length) setPreviewIndex(Math.max(0, updated.length - 1));
    if (activeCard === id) setActiveCard(null);
  };

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateService(id, 'image', imageUrl);
    }
  };

  const RenderIcon = ({ name, size = 24, className = "" }) => {
    const IconComponent = iconMap[name] || Sparkles;
    return <IconComponent size={size} className={className} />;
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden font-sans">
      
      {/* NAVBAR */}
     <nav className="sticky top-0 z-[20] bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 sm:gap-3 w-1/4 sm:w-1/3">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                <ArrowLeft size={18} />
              </button>
              <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic">
                <Settings2 size={20} className="text-yellow-600" /> POPULAR <span className="text-yellow-500">LAB</span>
              </h1>
            </div>
    
            {/* 3-Way View Mode Toggle */}
            <div className="flex bg-slate-100 p-1 sm:p-1.5 rounded-full shadow-inner w-auto justify-center">
              <button 
                onClick={() => setViewMode('edit')} 
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'edit' ? 'bg-white shadow-md text-yellow-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Edit3 size={14} className="hidden sm:block" /> Edit
              </button>
              <button 
                onClick={() => setViewMode('split')} 
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'split' ? 'bg-white shadow-md text-yellow-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Columns size={14} className="hidden sm:block" /> Split
              </button>
              <button 
                onClick={() => setViewMode('preview')} 
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'preview' ? 'bg-white shadow-md text-yellow-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Eye size={14} className="hidden sm:block" /> Preview
              </button>
            </div>
    
            <div className="w-1/4 sm:w-1/3 flex justify-end">
              <button className="bg-slate-900 text-white px-4 sm:px-8 py-2.5 rounded-full font-extrabold text-[10px] sm:text-xs flex items-center gap-2 shadow-lg hover:bg-yellow-600 transition-all hover:-translate-y-0.5">
                <Save size={14} className="hidden sm:block" /> Deploy
              </button>
            </div>
          </nav>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* EDITOR (Left Side) */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-[42%] border-r border-slate-200 shadow-2xl z-10' : 'w-full'} overflow-y-auto p-8 custom-scrollbar bg-[#F1F5F9]/40`}>
            <div className="max-w-4xl mx-auto space-y-8 pb-10">
              
              {/* Header Configuration */}
              <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm transition-all focus-within:ring-2 ring-emerald-100">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                   <Type size={14} className="text-emerald-500" /> Header Configuration
                </h3>
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Badge Text</label>
                    <input value={headerSettings.badgeText} onChange={(e) => setHeaderSettings({...headerSettings, badgeText: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-white transition-all shadow-inner" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Title (Normal)</label>
                    <input value={headerSettings.headingNormal} onChange={(e) => setHeaderSettings({...headerSettings, headingNormal: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-white transition-all shadow-inner" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest ml-1 mb-1.5 block">Highlight Text</label>
                    <input value={headerSettings.headingHighlight} onChange={(e) => setHeaderSettings({...headerSettings, headingHighlight: e.target.value})} className="w-full p-4 bg-emerald-50/50 border-none rounded-2xl font-black text-emerald-600 outline-none focus:bg-white transition-all shadow-inner" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Main Description</label>
                    <textarea value={headerSettings.description} onChange={(e) => setHeaderSettings({...headerSettings, description: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm h-28 resize-none outline-none focus:bg-white transition-all shadow-inner leading-relaxed" />
                  </div>
                </div>
              </section>

              {/* Service Cards */}
              <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3 italic">
                   <LayoutList className="text-emerald-600" /> Services <span className="bg-emerald-100 text-emerald-600 text-[10px] px-2 py-0.5 rounded-md not-italic font-black">{services.length}</span>
                </h2>
                <button onClick={handleAddService} className="bg-emerald-600 text-white px-5 py-3 rounded-2xl hover:bg-slate-900 shadow-xl shadow-emerald-100 transition-all flex items-center gap-2 font-black text-xs active:scale-95">
                  <Plus size={18} strokeWidth={3} /> ADD NEW
                </button>
              </div>

              <div className="space-y-5">
                {services.map((s, index) => (
                  <div key={s.id} className={`bg-white rounded-[2rem] border transition-all duration-300 ${activeCard === s.id ? 'ring-8 ring-emerald-50 border-emerald-200 shadow-xl' : 'border-slate-200 shadow-sm hover:border-slate-300'}`}>
                    <div onClick={() => {setActiveCard(activeCard === s.id ? null : s.id); setPreviewIndex(index)}} className="p-6 flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeCard === s.id ? 'bg-emerald-600 text-white shadow-lg rotate-3' : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600'}`}>
                          <RenderIcon name={s.icon} size={24} />
                        </div>
                        <h4 className="font-black text-lg text-slate-900 tracking-tight">{s.title || 'Untitled'}</h4>
                      </div>
                      <div className="flex items-center gap-3">
                         <button onClick={(e) => removeService(e, s.id, index)} className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
                            <Trash2 size={18} />
                         </button>
                         <div className={`p-2 rounded-full transition-all ${activeCard === s.id ? 'bg-emerald-50 text-emerald-600 rotate-180' : 'text-slate-200 group-hover:text-slate-400'}`}>
                            <ChevronDown size={24} />
                         </div>
                      </div>
                    </div>

                    {activeCard === s.id && (
                      <div className="px-8 pb-10 pt-4 border-t border-slate-50 grid grid-cols-2 gap-8 animate-in fade-in zoom-in-95 duration-300">
                        <div className="space-y-6">
                          <input value={s.title} onChange={(e) => updateService(s.id, 'title', e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none focus:bg-white transition-all shadow-inner" placeholder="Service Title" />
                          <textarea value={s.desc} onChange={(e) => updateService(s.id, 'desc', e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl text-sm h-28 resize-none border-none outline-none focus:bg-white transition-all shadow-inner leading-relaxed" placeholder="Brief Description" />
                          <div className="flex flex-wrap gap-2.5">
                            {Object.keys(iconMap).map(i => (
                              <button key={i} onClick={() => updateService(s.id, 'icon', i)} className={`p-3 rounded-xl border-2 transition-all ${s.icon === i ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-110' : 'bg-white text-slate-400 border-slate-100 hover:border-emerald-100 hover:text-emerald-400'}`}>
                                <RenderIcon name={i} size={18} />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="h-full">
                          <div onClick={() => document.getElementById(`file-${s.id}`).click()} className="w-full h-full min-h-[200px] border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center overflow-hidden cursor-pointer bg-slate-50 hover:bg-emerald-50/50 transition-all group relative">
                             <input type="file" id={`file-${s.id}`} hidden onChange={(e) => handleImageUpload(e, s.id)} />
                             {s.image ? (
                                <>
                                  <img src={s.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                     <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white"><Upload size={24} /></div>
                                  </div>
                                </>
                             ) : (
                                <div className="text-center group-hover:scale-110 transition-transform">
                                  <div className="bg-white p-5 rounded-full shadow-sm mb-3 text-slate-300 group-hover:text-emerald-500 transition-colors">
                                    <Upload size={32} />
                                  </div>
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Visual</span>
                                </div>
                             )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LIVE PREVIEW (Right Side) */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-[58%]' : 'w-full'} bg-slate-100 p-8 flex items-center justify-center relative overflow-hidden`}>
            
            {/* The "Device" Frame */}
            <div className="w-full h-full bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] rounded-[3rem] overflow-hidden flex flex-col border-[12px] border-slate-900 relative z-20">
              
              {/* Fake Browser Tab Bar */}
              <div className="h-10 bg-slate-900 flex items-center px-6 gap-2 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>
              </div>

              {/* Website Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-white">
                <div className={`min-h-full flex flex-col items-center ${viewMode === 'split' ? 'py-12 px-8' : 'py-20 px-12'}`}>
                   
                   {/* Header Section */}
                   <div className={`text-center max-w-3xl ${viewMode === 'split' ? 'mb-10' : 'mb-16'}`}>
                      <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm ring-1 ring-emerald-100">{headerSettings.badgeText}</span>
                      <h2 className={`font-black text-slate-900 mt-6 tracking-tight leading-[0.9] ${viewMode === 'split' ? 'text-4xl' : 'text-6xl'}`}>
                        {headerSettings.headingNormal} <span className="text-emerald-600">{headerSettings.headingHighlight}</span>
                      </h2>
                      <p className={`text-slate-500 mt-6 leading-relaxed font-medium ${viewMode === 'split' ? 'text-base' : 'text-xl'}`}>{headerSettings.description}</p>
                   </div>

                   {/* Layout Grid */}
                   <div className="w-full grid grid-cols-12 gap-8 items-stretch max-w-[1200px]">
                      
                      {/* Left Side List */}
                      <div className={`${viewMode === 'split' ? 'col-span-5 space-y-3' : 'col-span-4 space-y-4'}`}>
                        {services.map((s, i) => (
                          <div 
                            key={s.id} 
                            onMouseEnter={() => setPreviewIndex(i)} 
                            className={`rounded-[1.5rem] transition-all duration-500 cursor-pointer flex items-center gap-4 group ${viewMode === 'split' ? 'p-4' : 'p-6'} ${previewIndex === i ? 'bg-emerald-600 text-white shadow-2xl translate-x-3' : 'bg-white border border-slate-100 hover:border-emerald-100'}`}
                          >
                             <div className={`rounded-xl flex items-center justify-center transition-all duration-500 ${viewMode === 'split' ? 'w-10 h-10' : 'w-12 h-12'} ${previewIndex === i ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}`}>
                               <RenderIcon name={s.icon} size={viewMode === 'split' ? 18 : 22} />
                             </div>
                             <div className="flex-1">
                               <h4 className={`font-black leading-tight tracking-tight ${viewMode === 'split' ? 'text-base' : 'text-xl'}`}>{s.title}</h4>
                               <p className={`mt-1 opacity-70 line-clamp-1 ${viewMode === 'split' ? 'text-[10px]' : 'text-xs'}`}>{s.desc}</p>
                             </div>
                             <ArrowRight size={18} className={`transition-all duration-500 ${previewIndex === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} />
                          </div>
                        ))}
                      </div>

                      {/* Right Side Visual */}
                      <div className={`${viewMode === 'split' ? 'col-span-7' : 'col-span-8'} relative min-h-[400px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-50`}>
                        {services.map((s, i) => (
                           <div key={s.id} className={`absolute inset-0 transition-all duration-700 ease-in-out ${previewIndex === i ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'}`}>
                              {s.image ? (
                                <img src={s.image} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-100">
                                   <ImageIcon size={viewMode === 'split' ? 80 : 120} strokeWidth={1} />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent opacity-90" />
                              <div className={`absolute left-8 text-white pr-8 ${viewMode === 'split' ? 'bottom-8' : 'bottom-12'}`}>
                                <h3 className={`font-black mb-2 tracking-tight ${viewMode === 'split' ? 'text-2xl' : 'text-4xl'}`}>{s.title}</h3>
                                <p className={`text-emerald-100 leading-relaxed max-w-md ${viewMode === 'split' ? 'text-xs' : 'text-base'}`}>{s.desc}</p>
                              </div>
                           </div>
                        ))}
                      </div>

                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default PopularEditor;