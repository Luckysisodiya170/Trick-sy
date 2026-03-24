import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye, Monitor, 
  Upload, AlignLeft, Image as ImageIcon, ArrowRight, Star,
  Trash2, RefreshCcw
} from 'lucide-react';

const TechnicalDisplayEditor = () => {
  const navigate = useNavigate();
  const fileInputRefs = useRef({});
  const [viewMode, setViewMode] = useState('split');
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState(0); 

  const [displayData, setDisplayData] = useState([
    { title: "Electrical Services", desc: "Complete electrical troubleshooting, wiring, and panel upgrades handled by certified electricians. Safe and reliable.", image: null },
    { title: "Plumbing Solutions", desc: "Fast and reliable plumbing services from leak detection to full pipe replacements. 24/7 emergency support available.", image: null },
    { title: "HVAC Maintenance", desc: "Ensure optimal cooling and air quality with our expert AC duct cleaning and maintenance.", image: null }
  ]);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    alert('Display Content Updated Successfully!');
  };

  const handleDescChange = (index, value) => {
    const newData = [...displayData];
    newData[index].desc = value;
    setDisplayData(newData);
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newData = [...displayData];
      newData[index].image = URL.createObjectURL(file);
      setDisplayData(newData);
    }
  };

  const removeImage = (index, e) => {
    e.stopPropagation();
    const newData = [...displayData];
    newData[index].image = null;
    setDisplayData(newData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden text-slate-900">
      
      {/* ---  NAVBAR --- */}
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all text-slate-400 hover:text-slate-600">
            <ArrowLeft size={20} />
          </button>
          <div className="h-8 w-[1px] bg-slate-200"></div>
          <div>
            <h1 className="text-sm font-black tracking-widest uppercase flex items-center gap-2">
              <ImageIcon size={16} className="text-emerald-500" /> 
              Display Visuals <span className="text-[10px] text-slate-300 ml-2 font-bold italic">Right Panel</span>
            </h1>
          </div>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50 scale-90">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Full View' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black transition-all ${viewMode === mode.id ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500 hover:text-slate-800'}`}>
              <mode.icon size={14} /> <span>{mode.label}</span>
            </button>
          ))}
        </div>

        <button onClick={handleSave} disabled={isSaving} className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs flex items-center gap-3 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:bg-emerald-600 hover:shadow-emerald-200 transition-all active:scale-95 disabled:opacity-70 group">
          <Save size={16} className="group-hover:rotate-12 transition-transform" /> 
          {isSaving ? 'UPDATING...' : 'PUBLISH CHANGES'}
        </button>
      </nav>

      {/* --- WORKSPACE --- */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT: FORM (IMAGE & DESCRIPTION) */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-4xl mx-auto border-x' : 'w-[500px] border-r'} bg-white border-slate-200 flex flex-col h-full relative z-20 transition-all shrink-0`}>
            <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
              
              <div className="space-y-6">
                {displayData.map((service, idx) => (
                  <div key={idx} onClick={() => setActiveTab(idx)} className={`group p-6 border rounded-[2.5rem] relative cursor-pointer transition-all duration-500 ${activeTab === idx ? 'bg-white border-emerald-400 shadow-2xl ring-8 ring-emerald-50/50' : 'bg-slate-50/50 border-slate-100 opacity-60 hover:opacity-100'}`}>
                    
                    {/* Card Header */}
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className={`w-2 h-2 rounded-full ${activeTab === idx ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                         <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{service.title}</span>
                      </div>
                      {service.image && activeTab === idx && (
                        <button onClick={(e) => removeImage(idx, e)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                           <Trash2 size={14} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-6">
                      {/* Description Input */}
                      <div>
                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase ml-1 mb-2.5 tracking-widest"><AlignLeft size={12} /> Service Summary</label>
                        <textarea value={service.desc} onChange={(e) => handleDescChange(idx, e.target.value)} rows="3" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:border-emerald-500 transition-all resize-none placeholder:text-slate-300" placeholder="Enter service highlights..."></textarea>
                      </div>

                      {/* Image Upload Area */}
                      <div>
                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase ml-1 mb-2.5 tracking-widest"><Upload size={12} /> High-Res Visual</label>
                        <input type="file" ref={el => fileInputRefs.current[idx] = el} className="hidden" accept="image/*" onChange={(e) => handleImageChange(idx, e)} />
                        
                        <div onClick={() => fileInputRefs.current[idx]?.click()} className="w-full h-40 border-2 border-dashed border-slate-200 bg-white rounded-[1.8rem] flex flex-col items-center justify-center group/upload hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer relative overflow-hidden">
                          {service.image ? (
                            <>
                              <img src={service.image} className="w-full h-full object-cover group-hover/upload:scale-105 transition-transform duration-700" alt="display" />
                              <div className="absolute inset-0 bg-zinc-900/60 flex flex-col items-center justify-center opacity-0 group-hover/upload:opacity-100 transition-all">
                                 <RefreshCcw className="text-white mb-2" size={20} />
                                 <span className="text-white font-black text-[10px] uppercase tracking-widest">Replace Media</span>
                              </div>
                            </>
                          ) : (
                            <div className="text-center">
                              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover/upload:bg-white group-hover/upload:scale-110 transition-all shadow-sm">
                                <Upload className="text-slate-300 group-hover/upload:text-emerald-500" size={20} />
                              </div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click to browse media</p>
                              <p className="text-[9px] text-slate-300 mt-1 italic">Recommended: 1200 x 800px</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RIGHT: LIVE PREVIEW  */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'flex-1'} flex flex-col h-full bg-[#f8fafc] relative`}>
            <div className="h-14 flex items-center justify-center gap-3 bg-white border-b border-slate-200 shadow-sm shrink-0 z-10">
              <Monitor size={16} className="text-emerald-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Interactive Component Preview</span>
            </div>

            <div className="flex-1 overflow-hidden w-full flex items-center justify-center p-8 lg:p-16">
              
              {/* THE MOCK-UP COMPONENT */}
              <div className="relative w-full max-w-[900px] aspect-[4/3] max-h-[700px] rounded-[4rem] overflow-hidden bg-zinc-950 border-[12px] border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] group">
                
                {displayData.map((service, index) => {
                  const isActive = activeTab === index;
                  return (
                    <div key={index} className={`absolute inset-0 transition-all duration-[1.2s] ease-[cubic-bezier(0.23,1,0.32,1)] ${isActive ? 'opacity-100 scale-100 blur-0 translate-y-0' : 'opacity-0 scale-110 blur-xl translate-y-10 pointer-events-none'}`}>
                      
                      {/* Background Image */}
                      {service.image ? (
                        <img src={service.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                           <ImageIcon size={60} className="text-zinc-800 animate-pulse" />
                        </div>
                      )}
                      
                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>

                      {/* Floating Badge */}
                      <div className="absolute top-12 right-12 bg-emerald-500 px-6 py-2.5 rounded-full flex items-center gap-3 shadow-2xl animate-bounce">
                        <Star className="text-zinc-950 fill-zinc-950" size={14} />
                        <span className="text-zinc-950 font-black text-[10px] uppercase tracking-widest">Premium Service</span>
                      </div>

                      {/* Content Card */}
                      <div className="absolute bottom-12 left-12 right-12">
                        <div className="max-w-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-[3.5rem] shadow-2xl">
                          <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                               <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
                               <span className="text-emerald-500 font-black text-[11px] uppercase tracking-[0.4em]">Service Detail</span>
                            </div>
                            
                            <h4 className="text-white text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight leading-[0.9] italic">
                               {service.title}
                            </h4>
                            
                            <p className="text-zinc-300 font-medium leading-relaxed mb-10 text-lg lg:text-xl line-clamp-3">
                               {service.desc}
                            </p>
                            
                            <div className="inline-flex items-center gap-6 bg-white text-zinc-950 pl-10 pr-4 py-4 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-xl group/btn hover:bg-emerald-500 hover:scale-105 transition-all">
                              Start Project 
                              <div className="w-12 h-12 bg-zinc-950 text-white rounded-full flex items-center justify-center group-hover/btn:bg-zinc-950">
                                 <ArrowRight size={20}/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalDisplayEditor;