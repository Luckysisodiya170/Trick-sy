import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Trash2, Image as ImageIcon, Sparkles, 
  Settings2, Droplets, Snowflake, Wrench, Zap, Home, 
  Shield, ChevronDown, Monitor, Upload, X
} from 'lucide-react';

const ServiceEditor = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(1); 

  const [services, setServices] = useState([
    { id: 1, title: 'Deep Cleaning', desc: 'Complete deep cleaning for homes and offices with eco-friendly products.', icon: 'droplets', color: 'blue', img: null },
    { id: 2, title: 'AC Maintenance', desc: 'Expert AC repair, cleaning and installation services at your doorstep.', icon: 'snowflake', color: 'cyan', img: null },
    { id: 3, title: 'Plumbing Solutions', desc: 'Quick fixes for leaks, pipe bursts and bathroom installations.', icon: 'wrench', color: 'orange', img: null },
  ]);

  const colorThemes = {
    blue: 'from-blue-600 to-indigo-600',
    cyan: 'from-cyan-500 to-blue-500',
    orange: 'from-orange-500 to-red-500',
    yellow: 'from-amber-400 to-orange-500',
    indigo: 'from-indigo-600 to-purple-600',
    red: 'from-rose-500 to-pink-600',
  };

  const iconOptions = [
    { name: 'droplets', lib: <Droplets size={18} /> },
    { name: 'snowflake', lib: <Snowflake size={18} /> },
    { name: 'wrench', lib: <Wrench size={18} /> },
    { name: 'zap', lib: <Zap size={18} /> },
    { name: 'home', lib: <Home size={18} /> },
    { name: 'shield', lib: <Shield size={18} /> },
  ];

  const updateService = (id, field, value) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateService(id, 'img', imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans text-slate-800 pb-10">
      
      {/* Sleek Header */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-black tracking-tight flex items-center gap-2 italic">
            <Settings2 size={18} className="text-blue-600" /> SERVICE <span className="text-blue-500">LAB</span>
          </h1>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-xs shadow-lg shadow-blue-200 hover:scale-105 transition-all">
          Deploy Changes
        </button>
      </nav>

      <div className="max-w-[1600px] mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: Editor Area */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight">Catalog <span className="text-blue-600">Manager</span></h2>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Update service cards live</p>
            </div>
            <button 
              onClick={() => setServices([...services, { id: Date.now(), title: 'New Service', desc: '', icon: 'sparkles', color: 'indigo', img: null }])}
              className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-black text-xs hover:bg-slate-50 transition-all shadow-sm"
            >
              <Plus size={16} /> ADD SERVICE
            </button>
          </div>

          <div className="space-y-4">
            {services.map((s) => (
              <div key={s.id} className={`bg-white rounded-[2rem] border transition-all duration-300 ${activeCard === s.id ? 'border-blue-400 ring-4 ring-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                {/* Accordion Header */}
                <div onClick={() => setActiveCard(s.id)} className="p-5 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${colorThemes[s.color]}`}>
                      {iconOptions.find(i => i.name === s.icon)?.lib || <Sparkles size={20}/>}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-800">{s.title || "Untitled Service"}</h3>
                      <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Active Card</span>
                    </div>
                  </div>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${activeCard === s.id ? 'rotate-180 text-blue-500' : 'text-slate-300'}`} />
                </div>

                {/* Edit Fields */}
                {activeCard === s.id && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                        <input value={s.title} onChange={(e) => updateService(s.id, 'title', e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm focus:bg-white focus:border-blue-400 outline-none transition-all" placeholder="e.g. Home Cleaning" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                        <textarea value={s.desc} onChange={(e) => updateService(s.id, 'desc', e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs h-24 outline-none focus:bg-white focus:border-blue-400 resize-none font-medium leading-relaxed" placeholder="Describe the service..." />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Upload Cover</label>
                        <div 
                          onClick={() => document.getElementById(`file-${s.id}`).click()}
                          className="w-full h-28 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all"
                        >
                          <input type="file" id={`file-${s.id}`} hidden onChange={(e) => handleImageUpload(e, s.id)} accept="image/*" />
                          {s.img ? (
                            <>
                              <img src={s.img} className="w-full h-full object-cover" alt="preview" />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-black transition-all backdrop-blur-[2px]">CHANGE IMAGE</div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center gap-1 text-slate-400 group-hover:text-blue-500 transition-colors">
                              <Upload size={24} />
                              <span className="text-[9px] font-black">DROP IMAGE HERE</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Theme Color</label>
                           <div className="flex gap-2.5">
                              {Object.keys(colorThemes).map(color => (
                                <button key={color} onClick={() => updateService(s.id, 'color', color)} className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${s.color === color ? 'border-slate-800 scale-110 shadow-md' : 'border-white shadow-sm'}`} style={{ backgroundColor: color === 'cyan' ? '#22d3ee' : color === 'indigo' ? '#4f46e5' : color }} />
                              ))}
                           </div>
                        </div>
                        <button onClick={() => setServices(services.filter(x => x.id !== s.id))} className="bg-red-50 text-red-500 p-2.5 rounded-xl hover:bg-red-100 transition-all"><Trash2 size={18}/></button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Laptop Preview (ENHANCED SIZE) */}
        <div className="lg:col-span-6 h-fit lg:sticky lg:top-24">
          <div className="flex items-center justify-between px-6 mb-4">
             <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
               <Monitor size={16} className="text-blue-500"/> Live Component Preview
             </span>
             <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[9px] font-black tracking-tighter">DESKTOP v1.2</div>
          </div>

          {/* Screen Body */}
          <div className="w-full aspect-[16/10] bg-white rounded-t-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-x-[12px] border-t-[12px] border-slate-900 overflow-hidden flex flex-col relative">
            
            {/* Webcam Hole */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-800 z-50"></div>

            {/* Browser Nav */}
            <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-5 gap-2">
               <div className="flex gap-1.5 mr-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
               </div>
               <div className="flex-1 max-w-md h-6 bg-white rounded-lg border border-slate-200 flex items-center px-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></div>
                 <div className="text-[10px] text-slate-400 font-bold font-mono">localhost:3000/services</div>
               </div>
            </div>

            {/* Laptop UI Content Area (The actual Service Section) */}
            <div className="flex-1 bg-white overflow-y-auto custom-scrollbar p-8">
               <div className="text-center mb-10">
                 <h4 className="text-3xl font-black text-slate-900 tracking-tight italic">Our Premium Services</h4>
                 <p className="text-slate-400 text-xs mt-2 font-medium">Professional solutions for every need</p>
                 <div className="w-16 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
               </div>

               {/* Services Grid Inside Laptop */}
               <div className="grid grid-cols-2 gap-6">
                 {services.map(s => (
                   <div key={s.id} className={`group bg-white rounded-3xl overflow-hidden border-2 transition-all duration-500 ${activeCard === s.id ? 'border-blue-500 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] scale-105 z-10' : 'border-slate-100 opacity-60'}`}>
                      {/* Card Image */}
                      <div className="h-32 bg-slate-50 relative overflow-hidden">
                        {s.img ? (
                          <img src={s.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                             <ImageIcon size={32} strokeWidth={1}/>
                          </div>
                        )}
                        {/* Floating Icon */}
                        <div className={`absolute -bottom-4 right-4 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl bg-gradient-to-br ${colorThemes[s.color]} z-20`}>
                           {iconOptions.find(i => i.name === s.icon)?.lib || <Sparkles size={20} />}
                        </div>
                      </div>
                      
                      {/* Card Content */}
                      <div className="p-5 pt-6">
                        <h6 className="text-sm font-black text-slate-900 mb-1.5 line-clamp-1">{s.title || 'Untitled Service'}</h6>
                        <p className="text-[10px] text-slate-500 font-medium line-clamp-2 leading-relaxed h-8">{s.desc || 'Waiting for description input...'}</p>
                        <div className="mt-4 flex items-center text-[9px] font-black text-blue-600 gap-1 uppercase tracking-widest">
                          Learn More <Plus size={10} />
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Laptop Bottom Part (The base) */}
          <div className="relative">
            <div className="h-4 w-full bg-slate-800 rounded-b-[2rem] shadow-2xl relative z-10">
              {/* Indent for opening laptop */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-900 rounded-b-xl opacity-40"></div>
            </div>
            {/* Table Shadow */}
            <div className="h-6 w-[90%] bg-slate-400/20 blur-xl mx-auto rounded-full -mt-2"></div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default ServiceEditor;