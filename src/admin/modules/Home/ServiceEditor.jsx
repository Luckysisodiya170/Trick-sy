import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Trash2, Image as ImageIcon, Sparkles, 
  Settings2, Droplets, Snowflake, Wrench, Zap, Home, 
  Shield, ChevronDown, Upload, ArrowRight, Type, 
  Eye, Edit3, Columns
} from 'lucide-react';

const ServiceEditor = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null); 
  const [viewMode, setViewMode] = useState('split'); 

  // --- Dynamic Section Header State ---
  const [headerSettings, setHeaderSettings] = useState({
    badgeText: "What We Offer",
    headingNormal: "Explore Our",
    headingHighlight: "Premium Services",
    description: "We provide a wide range of professional services to keep your home and office in perfect condition. Quality and satisfaction guaranteed."
  });

  const iconMap = {
    droplets: Droplets,
    snowflake: Snowflake,
    wrench: Wrench,
    zap: Zap,
    home: Home,
    shield: Shield,
    sparkles: Sparkles
  };

  const getColorStyle = (colorName) => {
    const style = {
      green: { gradient: 'from-emerald-500 to-emerald-600', light: 'bg-emerald-50', text: 'group-hover:text-emerald-600' },
      cyan: { gradient: 'from-cyan-400 to-cyan-500', light: 'bg-cyan-50', text: 'group-hover:text-cyan-500' },
      orange: { gradient: 'from-orange-400 to-orange-500', light: 'bg-orange-50', text: 'group-hover:text-orange-500' },
      yellow: { gradient: 'from-yellow-400 to-amber-500', light: 'bg-yellow-50', text: 'group-hover:text-amber-500' },
      indigo: { gradient: 'from-indigo-500 to-indigo-600', light: 'bg-indigo-50', text: 'group-hover:text-indigo-600' },
      red: { gradient: 'from-rose-400 to-rose-500', light: 'bg-rose-50', text: 'group-hover:text-rose-500' },
      blue: { gradient: 'from-blue-500 to-blue-600', light: 'bg-blue-50', text: 'group-hover:text-blue-600' }
    };
    return style[colorName?.toLowerCase()] || style.blue; 
  };

  const [services, setServices] = useState([
    { id: 1, title: 'Deep Cleaning', desc: 'Complete deep cleaning for homes and offices to ensure a spotless environment.', icon: 'droplets', color: 'blue', img: null },
    { id: 2, title: 'AC Maintenance', desc: 'Expert AC repair, servicing, duct cleaning, and installation by certified pros.', icon: 'snowflake', color: 'cyan', img: null },
    { id: 3, title: 'Plumbing Solutions', desc: 'Quick fixes for leaks, pipe bursts, blockages, and new bathroom fittings.', icon: 'wrench', color: 'orange', img: null },
  ]);

  // --- Handlers ---
  const handleAddService = () => {
    const newId = Date.now();
    setServices([...services, { id: newId, title: 'New Service', desc: '', icon: 'sparkles', color: 'indigo', img: null }]);
    setActiveCard(newId);  
  };

  const updateService = (id, field, value) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const updateHeader = (field, value) => {
    setHeaderSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateService(id, 'img', imageUrl);
    }
  };

  const RenderIcon = ({ name, size = 24, className = "" }) => {
    const IconComponent = iconMap[name] || Sparkles;
    return <IconComponent size={size} className={className} />;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-20 font-sans selection:bg-indigo-100">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-[50] bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 w-1/4 sm:w-1/3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic leading-tight">
            <Settings2 size={20} className="text-indigo-600" /> SERVICE <span className="text-indigo-500 leading-tight">LAB</span>
          </h1>
        </div>

        {/* 3-Way Toggle Switch */}
        <div className="flex bg-slate-100 p-1 sm:p-1.5 rounded-full shadow-inner w-auto justify-center">
          <button 
            onClick={() => setViewMode('edit')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'edit' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Edit3 size={14} className="hidden sm:block" /> Edit
          </button>
          <button 
            onClick={() => setViewMode('split')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'split' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Columns size={14} className="hidden sm:block" /> Split
          </button>
          <button 
            onClick={() => setViewMode('preview')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'preview' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Eye size={14} className="hidden sm:block" /> Preview
          </button>
        </div>

        <div className="w-1/4 sm:w-1/3 flex justify-end">
          <button className="bg-slate-900 text-white px-4 sm:px-8 py-2.5 rounded-full font-extrabold text-[10px] sm:text-xs shadow-lg hover:bg-indigo-600 transition-all hover:-translate-y-0.5">
            Deploy
          </button>
        </div>
      </nav>

      {/* --- DYNAMIC LAYOUT CONTAINER --- */}
      <div className={`mx-auto transition-all duration-500 ${
        viewMode === 'split' 
          ? 'max-w-[1800px] p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-4' 
          : viewMode === 'edit' 
            ? 'max-w-5xl p-4 lg:p-10 mt-4' 
            : 'max-w-6xl p-4 lg:p-10 mt-4'
      }`}>
        
        {/* --- EDITOR (Left Panel) --- */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : ''} space-y-8 animate-in fade-in zoom-in-95 duration-300`}>
            
            {viewMode === 'edit' && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manage Services</h2>
                <p className="text-slate-500 text-sm mt-2">Update texts, icons, images, and colors for your services section.</p>
              </div>
            )}

            {/* Header Content Section */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-tight border-b border-slate-100 pb-4">
                 <Type size={18} className="text-indigo-500" /> Section Header Content
              </h3>
              <div className="space-y-5">
                <div className={`grid grid-cols-1 ${viewMode === 'split' ? 'xl:grid-cols-2' : 'sm:grid-cols-2'} gap-5`}>
                  <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Normal Heading</label>
                    <input value={headerSettings.headingNormal} onChange={(e) => updateHeader('headingNormal', e.target.value)} placeholder="Explore Our" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-indigo-400 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Indigo Highlight</label>
                    <input value={headerSettings.headingHighlight} onChange={(e) => updateHeader('headingHighlight', e.target.value)} placeholder="Premium Services" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-indigo-400 focus:bg-white transition-all" />
                  </div>
                </div>
                <div className={`grid grid-cols-1 ${viewMode === 'split' ? 'xl:grid-cols-2' : 'sm:grid-cols-2'} gap-5`}>
                  <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Badge Text (Small Tag)</label>
                    <input value={headerSettings.badgeText} onChange={(e) => updateHeader('badgeText', e.target.value)} placeholder="What We Offer" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-indigo-400 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Main Description</label>
                    <textarea value={headerSettings.description} onChange={(e) => updateHeader('description', e.target.value)} placeholder="Enter description..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs h-20 outline-none focus:border-indigo-400 focus:bg-white resize-none leading-relaxed" />
                  </div>
                </div>
              </div>
            </div>

            {/* Services Cards List Header */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 leading-tight">Service <span className="text-indigo-600 leading-tight">Cards</span></h2>
              <button 
                onClick={handleAddService}
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl font-black text-xs hover:bg-indigo-600 shadow-md transition-all active:scale-95 hover:-translate-y-1"
              >
                <Plus size={16} strokeWidth={3} /> ADD NEW SERVICE
              </button>
            </div>

            {/* Individual Service Cards Editor List */}
            <div className="space-y-4">
              {services.map((s) => {
                const cardStyle = getColorStyle(s.color);
                const isActive = activeCard === s.id;
                
                return (
                <div key={s.id} className={`bg-white rounded-[2rem] border transition-all duration-300 ${isActive ? 'border-indigo-300 ring-4 ring-indigo-50 shadow-xl scale-[1.01]' : 'border-slate-200 shadow-sm hover:border-slate-300'}`}>
                  
                  {/* Card Editor Header Toggle */}
                  <div onClick={() => setActiveCard(isActive ? null : s.id)} className="p-5 sm:p-6 flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow bg-gradient-to-br ${cardStyle.gradient}`}>
                        <RenderIcon name={s.icon} size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-base lg:text-lg text-slate-900 line-clamp-1 leading-snug">{s.title || "Untitled Service"}</h3>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-indigo-500' : 'text-slate-400 group-hover:text-indigo-500'}`}>Click to {isActive ? 'Close' : 'Configure'}</span>
                      </div>
                    </div>
                    <ChevronDown size={20} className={`transition-transform duration-300 ${isActive ? 'rotate-180 text-indigo-500' : 'text-slate-300 group-hover:text-slate-600'}`} />
                  </div>

                  {/* Card Editor Content */}
                  {isActive && (
                    <div className="px-6 sm:px-8 pb-8 pt-2 space-y-6 animate-in slide-in-from-top-4 duration-300 border-t border-slate-50 mt-1">
                      
                      <div className={`grid grid-cols-1 ${viewMode === 'split' ? '' : 'sm:grid-cols-12'} gap-6`}>
                        {/* Image Upload */}
                        <div className={viewMode === 'split' ? '' : 'sm:col-span-4'}>
                          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Cover Photo</label>
                          <div 
                            onClick={() => document.getElementById(`file-${s.id}`).click()}
                            className="w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center relative overflow-hidden cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-all group"
                          >
                            <input type="file" id={`file-${s.id}`} hidden onChange={(e) => handleImageUpload(e, s.id)} accept="image/*" />
                            {s.img ? (
                                <>
                                    <img src={s.img} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="service" />
                                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">Change Image</div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-indigo-600">
                                    <Upload size={24} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Upload</span>
                                </div>
                            )}
                          </div>
                        </div>

                        {/* Title & Desc Inputs */}
                        <div className={`${viewMode === 'split' ? '' : 'sm:col-span-8'} space-y-4`}>
                          <div>
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Service Name</label>
                            <input value={s.title} onChange={(e) => updateService(s.id, 'title', e.target.value)} placeholder="e.g. Deep Cleaning" className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-indigo-400 focus:bg-white transition-all" />
                          </div>
                          <div>
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Description</label>
                            <textarea value={s.desc} onChange={(e) => updateService(s.id, 'desc', e.target.value)} placeholder="Service description..." className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs h-20 outline-none focus:border-indigo-400 focus:bg-white resize-none leading-relaxed transition-all" />
                          </div>
                        </div>
                      </div>

                      {/* Icon & Color Settings */}
                      <div className={`flex ${viewMode === 'split' ? 'flex-col' : 'flex-col sm:flex-row'} gap-6 p-5 bg-slate-50 rounded-2xl border border-slate-100`}>
                        
                        <div className={`w-full ${viewMode === 'split' ? '' : 'sm:w-1/2'}`}>
                          <label className="text-[11px] font-black text-slate-400 uppercase mb-3 block text-center sm:text-left tracking-widest">1. Theme Color</label>
                          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                            {['blue', 'cyan', 'orange', 'yellow', 'indigo', 'red'].map(c => (
                              <button key={c} onClick={() => updateService(s.id, 'color', c)} className={`w-8 h-8 rounded-full border-[3px] transition-all hover:scale-110 ${s.color === c ? 'border-slate-900 shadow-lg scale-110' : 'border-white shadow-sm'}`} style={{ backgroundColor: c }} />
                            ))}
                          </div>
                        </div>

                        {viewMode === 'split' && <div className="w-full h-px bg-slate-200"></div>}
                        {viewMode !== 'split' && <div className="h-full w-px bg-slate-200"></div>}

                        <div className={`w-full ${viewMode === 'split' ? '' : 'sm:w-1/2'}`}>
                          <label className="text-[11px] font-black text-slate-400 uppercase mb-3 block text-center sm:text-left tracking-widest">2. Select Icon</label>
                          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                            {Object.keys(iconMap).map(i => (
                              <button key={i} onClick={() => updateService(s.id, 'icon', i)} className={`p-2.5 w-11 h-11 rounded-xl border flex items-center justify-center transition-all ${s.icon === i ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-110' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}`}>
                                <RenderIcon name={i} size={18} />
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Remove Service Button */}
                      <button onClick={() => setServices(services.filter(x => x.id !== s.id))} className="w-full bg-rose-50 text-rose-600 py-4 rounded-xl font-black text-[10px] sm:text-xs flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors uppercase tracking-widest">
                        <Trash2 size={16}/> REMOVE SERVICE FROM CATALOG
                      </button>
                    </div>
                  )}
                </div>
              )})}
            </div>
          </div>
        )}

        {/* --- PREVIEW (Right Panel) --- */}
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
                  <div className="flex-1 max-w-md h-6 sm:h-7 bg-white rounded-lg mx-auto border border-slate-200/70 flex items-center justify-center px-3 text-[10px] sm:text-[11px] text-slate-400 font-bold tracking-tight uppercase">
                    {viewMode === 'split' ? 'Live Split View' : 'Live Full Preview'}
                  </div>
              </div>

              {/* Exact Service Section Preview Design (Responsive naturally) */}
              <div className="relative overflow-y-auto h-[85vh] custom-scrollbar bg-slate-50 pb-10">
                  
                  {/* Subtle Background Elements */}
                  <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-indigo-400/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-emerald-400/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3"></div>

                  <div className={`py-10 sm:py-16 relative z-10 w-full max-w-[1600px] mx-auto px-5 lg:px-8`}>
                      
                      {/* Live Header Preview */}
                      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-indigo-600 font-bold text-xs sm:text-sm mb-5 shadow-md border border-slate-100">
                          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
                          {headerSettings.badgeText}
                        </div>
                        <h2 className={`text-3xl sm:text-5xl ${viewMode === 'split' ? 'lg:text-4xl xl:text-5xl' : 'lg:text-5xl xl:text-6xl'} font-extrabold text-slate-900 mb-4 sm:mb-6 tracking-tight leading-tight`}>
                          {headerSettings.headingNormal} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">{headerSettings.headingHighlight}</span>
                        </h2>
                        <p className="text-sm sm:text-lg text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                          {headerSettings.description}
                        </p>
                      </div>

                      {/* Live Cards Grid Preview */}
                      <div className={`grid grid-cols-1 md:grid-cols-2 ${viewMode === 'split' ? 'xl:grid-cols-2' : 'xl:grid-cols-3'} gap-6 sm:gap-8 xl:gap-10`}>
                        {services.map((service, index) => {
                          const style = getColorStyle(service.color);
                          const isActive = activeCard === service.id;
                          
                          return (
                            <div 
                              key={service.id || `service-${index}`} 
                              className={`group bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 relative flex flex-col h-full border overflow-hidden hover:-translate-y-2 ${isActive ? 'border-indigo-300 ring-4 ring-indigo-50 scale-[1.02]' : 'border-slate-100'}`}
                            >
                              <div className={`relative w-full ${viewMode === 'split' ? 'h-40 sm:h-48' : 'h-48 sm:h-60'} overflow-hidden bg-slate-100`}>
                                  {service.img ? (
                                      <img 
                                        src={service.img} 
                                        alt={service.title} 
                                        loading="lazy" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                      />
                                  ) : (
                                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-100/50">
                                        <ImageIcon size={64} className="sm:w-16 sm:h-16 w-12 h-12 mb-2" strokeWidth={1} />
                                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">No Image</span>
                                      </div>
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60"></div>
                              </div>

                              <div className={`absolute ${viewMode === 'split' ? 'top-[135px] sm:top-[165px]' : 'top-[165px] sm:top-[215px]'} right-6 sm:right-8 z-20`}>
                                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-lg shadow-${service.color || 'blue'}-500/30 border-4 border-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                                      <RenderIcon name={service.icon} size={20} className="sm:w-6 sm:h-6 w-5 h-5 text-white" />
                                  </div>
                              </div>

                              <div className="relative z-10 p-5 sm:p-8 pt-8 sm:pt-10 flex flex-col flex-grow">
                                <h3 className={`text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 transition-colors duration-300 ${style.text} leading-snug`}>
                                  {service.title || "Premium Service"}
                                </h3>
                                <p className="text-slate-600 leading-relaxed font-light text-[13px] sm:text-[15px] mb-4 whitespace-pre-line line-clamp-3">
                                  {service.desc || "Description is not available at the moment."}
                                </p>
                                
                                <div className="mt-auto pt-4 sm:pt-6 border-t border-slate-100">
                                  <div className="flex items-center gap-2 text-[13px] sm:text-[14px] font-bold text-slate-700 transition-colors cursor-pointer leading-tight">
                                    <span className={`${style.text} transition-colors duration-300 leading-tight`}>View Details</span>
                                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-current transition-colors duration-300 group-hover:translate-x-1" />
                                  </div>
                                </div>
                              </div>
                              
                              <div className={`absolute bottom-0 left-0 h-1 sm:h-1.5 w-full bg-gradient-to-r ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-12 sm:mt-16 text-center">
                        <button className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all shadow-xl hover:-translate-y-1">
                          View All Services <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
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

export default ServiceEditor;