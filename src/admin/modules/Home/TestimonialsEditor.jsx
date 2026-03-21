import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Trash2, Star, Quote, Sparkles, 
  Eye, Edit3, Columns, User, Upload, MessageSquare, Type, ChevronDown, Settings2, Save,
} from 'lucide-react';

const TestimonialsEditor = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('split'); 
  const [activeCard, setActiveCard] = useState(null);

  // --- Header State ---
  const [headerSettings, setHeaderSettings] = useState({
    badgeText: "Verified Client Stories",
    headingNormal: "Real People.",
    headingHighlight: "Real Results.",
    description: "Don't just take our word for it. See why 5,000+ property owners trust the TRICKSY standard."
  });

  // --- Testimonials Data ---
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'Ahmed Khan', role: 'Villa Owner', comment: 'Absolutely brilliant service. The team arrived on time and my villa looks spotless. Highly recommended!', rating: 5, image: null },
    { id: 2, name: 'Sarah W.', role: 'Office Manager', comment: 'TRICKSY transformed our workspace. We love that they use eco-friendly products. Will be booking monthly.', rating: 5, image: null },
    { id: 3, name: 'Rahul Sharma', role: 'Property Head', comment: 'Unmatched quality! I manage 10+ properties in Dubai and TRICKSY is my go-to for all maintenance.', rating: 5, image: null }
  ]);

  // --- Handlers ---
  const handleAddReview = () => {
    const newId = Date.now();
    setTestimonials([...testimonials, { id: newId, name: 'New Client', role: 'Verified Client', comment: '', rating: 5, image: null }]);
    setActiveCard(newId);
  };

  const updateReview = (id, field, value) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  return (
    // Changed: Removed fixed overflow-hidden so mobile can scroll the entire page
    <div className="h-screen flex flex-col bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[50] bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 w-1/4 sm:w-1/3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic">
            <Settings2 size={20} className="text-blue-600" /> TESTIMONIAL <span className="text-blue-500">LAB</span>
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

      {/* MAIN CONTENT AREA - Added flex-col for mobile stacking, lg:flex-row for desktop side-by-side */}
      <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row">
        
        {/* EDITOR SECTION */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          // Fixed width logic: 100% on mobile, 38% on desktop
          <div className={`${viewMode === 'split' ? 'w-full lg:w-[38%] lg:border-r border-slate-200 lg:h-full lg:overflow-y-auto' : 'w-full h-full lg:overflow-y-auto'} p-4 md:p-6 bg-[#F8FAFC] custom-scrollbar`}>
            <div className="max-w-xl mx-auto space-y-6 pb-10">
              
              {/* Header Settings */}
              <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-3">
                  <Type size={14} className="text-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Section Header</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input value={headerSettings.badgeText} onChange={(e) => setHeaderSettings({...headerSettings, badgeText: e.target.value})} className="sm:col-span-2 w-full px-3 py-2 bg-slate-50 rounded-lg text-xs font-bold outline-none" placeholder="Badge Text" />
                  <input value={headerSettings.headingNormal} onChange={(e) => setHeaderSettings({...headerSettings, headingNormal: e.target.value})} className="w-full px-3 py-2 bg-slate-50 rounded-lg text-xs font-bold outline-none" placeholder="Normal Heading" />
                  <input value={headerSettings.headingHighlight} onChange={(e) => setHeaderSettings({...headerSettings, headingHighlight: e.target.value})} className="w-full px-3 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-black outline-none" placeholder="Highlight Text" />
                  <textarea value={headerSettings.description} onChange={(e) => setHeaderSettings({...headerSettings, description: e.target.value})} className="sm:col-span-2 w-full px-3 py-2 bg-slate-50 rounded-lg text-xs h-16 resize-none outline-none leading-snug" placeholder="Description..." />
                </div>
              </section>

              {/* Reviews Manager */}
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-black flex items-center gap-2 uppercase tracking-tight text-slate-500">
                  <MessageSquare size={14} /> Client Reviews
                </h2>
                <button onClick={handleAddReview} className="bg-emerald-600 text-white p-1.5 rounded-lg hover:bg-slate-900 transition-all shadow-md active:scale-90">
                  <Plus size={16} />
                </button>
              </div>

              <div className="space-y-3">
                {testimonials.map((t, idx) => (
                  <div key={t.id} className={`bg-white rounded-xl border transition-all ${activeCard === t.id ? 'ring-2 ring-emerald-50 border-emerald-200 shadow-md' : 'border-slate-200 shadow-sm'}`}>
                    <div onClick={() => setActiveCard(activeCard === t.id ? null : t.id)} className="p-3 flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 shrink-0">
                          {t.image ? <img src={t.image} className="w-full h-full object-cover" /> : <User size={14} className="text-slate-400" />}
                        </div>
                        <h4 className="font-bold text-[11px] text-slate-700 line-clamp-1">{t.name || 'New Review'}</h4>
                      </div>
                      <ChevronDown size={14} className={`text-slate-300 transition-transform shrink-0 ${activeCard === t.id ? 'rotate-180 text-emerald-500' : ''}`} />
                    </div>

                    {activeCard === t.id && (
                      <div className="px-4 pb-5 pt-2 border-t border-slate-50 space-y-4 animate-in fade-in duration-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input value={t.name} onChange={(e) => updateReview(t.id, 'name', e.target.value)} className="w-full p-2.5 bg-slate-50 rounded-lg text-xs font-bold outline-none focus:ring-1 ring-emerald-400 transition-all" placeholder="Client Name" />
                          <input value={t.role} onChange={(e) => updateReview(t.id, 'role', e.target.value)} className="w-full p-2.5 bg-slate-50 rounded-lg text-[10px] font-bold outline-none focus:ring-1 ring-emerald-400 transition-all" placeholder="Role (e.g. Villa Owner)" />
                        </div>
                        
                        <textarea value={t.comment} onChange={(e) => updateReview(t.id, 'comment', e.target.value)} className="w-full p-2.5 bg-slate-50 rounded-lg text-[11px] h-20 resize-none outline-none leading-normal shadow-inner focus:ring-1 ring-emerald-400 transition-all" placeholder="The testimonial text..." />

                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex gap-1 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                            {[1,2,3,4,5].map(num => (
                              <Star key={num} size={14} onClick={() => updateReview(t.id, 'rating', num)} className={`cursor-pointer transition-colors ${t.rating >= num ? 'fill-amber-400 text-amber-400' : 'text-slate-300 hover:text-amber-200'}`} />
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                             <input type="file" id={`p-${t.id}`} hidden onChange={(e) => {
                               const file = e.target.files[0];
                               if(file) updateReview(t.id, 'image', URL.createObjectURL(file));
                             }} />
                             <button onClick={() => document.getElementById(`p-${t.id}`).click()} className="px-3 py-2 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all flex items-center gap-1.5"><Upload size={12} /> Photo</button>
                             <button onClick={() => setTestimonials(testimonials.filter(x => x.id !== t.id))} className="p-2 bg-rose-50 rounded-lg text-rose-500 hover:bg-rose-100 transition-all"><Trash2 size={14} /></button>
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

        {/* PREVIEW SECTION */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-full lg:w-[62%] min-h-[800px] lg:min-h-0 lg:h-full' : 'w-full h-full'} bg-slate-200 p-3 sm:p-4 md:p-6 flex items-center justify-center relative`}>
            
            {/* The "Device" Frame */}
            <div className="w-full h-full bg-white shadow-2xl rounded-3xl md:rounded-[2.5rem] overflow-hidden flex flex-col border-[4px] md:border-[8px] border-slate-900 relative">
              
              {/* Fake Browser Tab Bar */}
              <div className="h-8 md:h-10 bg-slate-900 flex items-center px-4 md:px-6 gap-1.5 md:gap-2 shrink-0">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-rose-500"></div>
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-amber-500"></div>
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-500"></div>
              </div>

              {/* Website Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-white p-4 sm:p-6 md:p-8">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                   
                   {/* Header Preview */}
                   <div className="text-center mb-8 md:mb-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm">
                        <Sparkles size={12} className="md:w-3.5 md:h-3.5" /> {headerSettings.badgeText}
                      </div>
                      <h2 className={`font-black text-slate-900 mt-4 md:mt-5 tracking-tighter leading-tight text-3xl md:text-4xl lg:${viewMode === 'split' ? 'text-3xl' : 'text-5xl'}`}>
                        {headerSettings.headingNormal} <span className="text-emerald-500">{headerSettings.headingHighlight}</span>
                      </h2>
                      <p className={`text-slate-500 mt-3 md:mt-4 font-medium max-w-md mx-auto leading-relaxed text-sm lg:${viewMode === 'split' ? 'text-[11px]' : 'text-sm'}`}>{headerSettings.description}</p>
                   </div>

                   {/* Grid Preview */}
                   <div className={`grid w-full gap-5 grid-cols-1 md:grid-cols-2 lg:${viewMode === 'split' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-3'}`}>
                      {testimonials.map((item, idx) => (
                        <div key={item.id} className={`relative p-5 md:p-6 rounded-2xl md:rounded-[1.5rem] border transition-all duration-300 ${idx % 2 !== 0 ? 'bg-slate-900 text-white border-slate-800 shadow-xl' : 'bg-slate-50 border-slate-100 shadow-sm'}`}>
                           <Quote className={`absolute top-4 right-4 w-5 h-5 opacity-20 ${idx % 2 !== 0 ? 'text-white' : 'text-emerald-500'}`} />
                           
                           <div className="flex gap-0.5 mb-4">
                             {[...Array(item.rating)].map((_, i) => (
                               <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                             ))}
                           </div>

                           <p className={`font-bold leading-relaxed mb-6 text-xs md:text-sm lg:${viewMode === 'split' ? 'text-[11px]' : 'text-sm'} ${idx % 2 !== 0 ? 'text-slate-200' : 'text-slate-600'}`}>
                             "{item.comment || 'The service was excellent!'}"
                           </p>

                           <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: idx % 2 !== 0 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>
                              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-200 overflow-hidden shrink-0 border-2 border-white/10">
                                {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <User size={16} className="m-auto mt-1.5 md:mt-2.5 text-slate-400" />}
                              </div>
                              <div className="overflow-hidden">
                                <h4 className={`text-xs font-black truncate ${idx % 2 !== 0 ? 'text-white' : 'text-slate-900'}`}>{item.name}</h4>
                                <p className={`text-[9px] font-black uppercase tracking-widest mt-0.5 ${idx % 2 !== 0 ? 'text-emerald-400' : 'text-slate-400'}`}>{item.role}</p>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        @media (min-width: 768px) { .custom-scrollbar::-webkit-scrollbar { width: 6px; } }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

export default TestimonialsEditor;