import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, ShieldCheck, Users, Upload, 
  Plus, Trash2, Smartphone, Layout, CheckCircle,
  Edit3, Columns, Eye, Monitor, Settings2,
  Award, Heart, Star, Wrench, PenTool, Type 
} from 'lucide-react';

const TechnicalTrustEditor = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [viewMode, setViewMode] = useState('split'); 
  const [isSaving, setIsSaving] = useState(false);

  const availableIcons = [
    { name: 'Shield', icon: ShieldCheck },
    { name: 'Award', icon: Award },
    { name: 'Star', icon: Star },
    { name: 'Heart', icon: Heart },
    { name: 'Tool', icon: Wrench },
    { name: 'Pro', icon: PenTool }
  ];

  const [trustData, setTrustData] = useState({
    title: "Verified Force.",
    desc: "Every technician in our squad is background-checked and Dubai Municipality certified.",
    count: "5,000+",
    ctaText: "Book Callback",
    selectedIcon: 'Shield',
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    ]
  });

  const ActiveIcon = availableIcons.find(i => i.name === trustData.selectedIcon)?.icon || ShieldCheck;

  const handleUpdate = (field, value) => {
    setTrustData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTrustData(prev => ({ ...prev, avatars: [url, ...prev.avatars].slice(0, 5) }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden text-slate-900">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-3 lg:px-6 py-3 flex items-center justify-between shadow-sm gap-2 shrink-0">
        <div className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm lg:text-lg font-black tracking-tighter italic flex items-center gap-1.5">
            <Settings2 size={18} className="text-emerald-600 lg:w-5 lg:h-5" /> 
            <span className="tracking-tight uppercase">TRUST CMS EDITOR</span> 
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full flex-shrink-1 mx-2">
          {[
            { id: 'edit', icon: Edit3, label: 'Edit' }, 
            { id: 'split', icon: Columns, label: 'Split' }, 
            { id: 'preview', icon: Eye, label: 'Preview' }
          ].map((mode) => (
            <button 
              key={mode.id} 
              onClick={() => setViewMode(mode.id)} 
              className={`flex items-center gap-1.5 px-3 lg:px-5 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs font-bold transition-all whitespace-nowrap ${
                viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <mode.icon size={12} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className={`${viewMode === mode.id ? 'inline' : 'hidden sm:inline'}`}>{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave} disabled={isSaving}
          className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-emerald-600 transition-all flex-shrink-0 disabled:opacity-70 active:scale-95"
        >
          {isSaving ? <span className="animate-pulse">Syncing...</span> : <><Save size={16} className="lg:w-[14px] lg:h-[14px]" /> <span className="hidden md:inline">Save Changes</span></>}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDE: EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-3xl mx-auto border-x' : 'w-full lg:w-[450px] border-r'} bg-white flex flex-col h-full shrink-0 z-20`}>
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              
              {/* Icon Selection Card */}
              <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4 shadow-sm">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Layout size={12}/> Badge Icon selection
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {availableIcons.map((item) => (
                    <button 
                      key={item.name} 
                      onClick={() => handleUpdate('selectedIcon', item.name)}
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all border-2 ${
                        trustData.selectedIcon === item.name 
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg' 
                        : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200'
                      }`}
                    >
                      <item.icon size={18} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Fields */}
              <div className="space-y-6">
                <div className="group">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 block px-1">Main Heading</label>
                  <input value={trustData.title} onChange={(e) => handleUpdate('title', e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-black outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all" />
                </div>

                <div className="group">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 block px-1">Trust Description</label>
                  <textarea value={trustData.desc} onChange={(e) => handleUpdate('desc', e.target.value)} rows="3" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-slate-500 outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 block px-1">Metric Value</label>
                    <input value={trustData.count} onChange={(e) => handleUpdate('count', e.target.value)} className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black text-emerald-600 outline-none focus:bg-white focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 block px-1">CTA Label</label>
                    <input value={trustData.ctaText} onChange={(e) => handleUpdate('ctaText', e.target.value)} className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black outline-none focus:bg-white focus:border-emerald-500" />
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block">Technician Profiles</label>
                  <div className="flex flex-wrap gap-3">
                    {trustData.avatars.map((img, i) => (
                      <div key={i} className="relative group/avatar">
                        <img src={img} className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm ring-1 ring-slate-200" alt="tech" />
                        <button onClick={() => handleUpdate('avatars', trustData.avatars.filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 opacity-0 group-hover/avatar:opacity-100 transition-opacity"><Trash2 size={10} /></button>
                      </div>
                    ))}
                    {trustData.avatars.length < 5 && (
                      <button onClick={() => fileInputRef.current.click()} className="w-12 h-12 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:border-emerald-500 hover:text-emerald-500 bg-white"><Plus size={20} /></button>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleAvatarUpload} accept="image/*" />
                </div>
              </div>
            </div>
          </div>
        )}

      {/* RIGHT SIDE: PREVIEW */}
{(viewMode === 'preview' || viewMode === 'split') && (
  <div className={`${viewMode === 'preview' ? 'w-full' : 'flex-1'} flex flex-col h-full bg-slate-100/50 relative overflow-hidden`}>
    <div className="h-12 flex items-center px-6 bg-white border-b border-slate-200 shrink-0 z-10">
      <div className="flex items-center gap-2">
        <Monitor size={14} className="text-slate-400" />
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Banner Preview</span>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto flex items-center justify-center p-4 lg:p-8">
      <div className={`w-full transition-all duration-300 ${viewMode === 'split' ? 'max-w-[95%]' : 'max-w-[1200px]'}`}>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-[2.5rem] lg:rounded-[4rem] blur-xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
          
          <div className={`relative bg-[#09090b] border border-white/10 shadow-2xl transition-all duration-500
            ${viewMode === 'split' 
              ? 'rounded-[2rem] p-6 grid grid-cols-1 lg:grid-cols-3 items-center gap-6' 
              : 'rounded-[4rem] p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10'}`}
          >
            
            {/* 1. Left Section: Icon & Text */}
            <div className={`flex items-center gap-5 lg:gap-8 ${viewMode === 'split' ? 'lg:col-span-1' : ''}`}>
              <div className={`bg-emerald-500 text-zinc-950 flex items-center justify-center transform -rotate-3 shrink-0 shadow-lg shadow-emerald-500/20
                ${viewMode === 'split' ? 'w-14 h-14 rounded-2xl' : 'w-24 h-24 lg:w-32 lg:h-32 rounded-[2.5rem]'}`}
              >
                <ActiveIcon size={viewMode === 'split' ? 28 : 56} strokeWidth={2.5} />
              </div>

              <div className="text-left">
                <h4 className={`text-white font-black tracking-tighter mb-1 uppercase italic leading-[0.9]
                  ${viewMode === 'split' ? 'text-xl lg:text-2xl' : 'text-4xl lg:text-5xl'}`}
                >
                  {trustData.title}
                </h4>
                <p className={`text-zinc-500 font-medium leading-tight
                  ${viewMode === 'split' ? 'text-[10px] max-w-[180px]' : 'text-sm lg:text-base max-w-[320px]'}`}
                >
                  {trustData.desc}
                </p>
              </div>
            </div>

            {/* 2. Middle Section: Avatars */}
            <div className={`flex flex-col items-center gap-3 shrink-0 ${viewMode === 'split' ? 'lg:col-span-1' : ''}`}>
              <div className="flex -space-x-3 lg:-space-x-4">
                {trustData.avatars.map((img, i) => (
                  <img key={i} src={img} className={`rounded-full border-[3px] border-[#09090b] object-cover ring-1 ring-white/10
                    ${viewMode === 'split' ? 'w-10 h-10' : 'w-16 h-16 lg:w-20 lg:h-20'}`} 
                  alt="tech" />
                ))}
                <div className={`rounded-full border-[3px] border-[#09090b] bg-zinc-900 flex items-center justify-center text-emerald-400 font-black shadow-xl ring-1 ring-white/10
                  ${viewMode === 'split' ? 'w-10 h-10 text-[9px]' : 'w-16 h-16 lg:w-20 lg:h-20 text-xs'}`}
                >
                  +45
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle size={10} className="text-emerald-500" />
                <span className="text-emerald-500 text-[9px] font-black uppercase tracking-widest leading-none">
                  {trustData.count} Requests
                </span>
              </div>
            </div>

            {/* 3. Right Section: CTA Button */}
            <div className={`flex items-center justify-center lg:justify-end ${viewMode === 'split' ? 'lg:col-span-1' : ''}`}>
              <button className={`bg-white text-zinc-950 font-black uppercase tracking-[0.15em] hover:bg-emerald-500 hover:text-white transition-all shadow-xl active:scale-95 whitespace-nowrap
                ${viewMode === 'split' 
                  ? 'px-6 py-4 text-[9px] rounded-2xl w-full lg:w-auto' 
                  : 'px-14 py-6 text-[10px] rounded-[2.5rem]'}`}
              >
                  {trustData.ctaText}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
)}      </div>
    </div>
  );
};

export default TechnicalTrustEditor;