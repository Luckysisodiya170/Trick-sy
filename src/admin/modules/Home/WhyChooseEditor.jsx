import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, ArrowLeft, ShieldCheck, Leaf, BadgeDollarSign, 
  Zap, Headphones, Sparkles, CheckCircle2, Plus, 
  Trash2, LayoutGrid, MessageSquare, Type, Monitor, Globe
} from 'lucide-react';

const WhyChooseEditor = () => {
  const navigate = useNavigate();
  
  const [sectionData, setSectionData] = useState({
    badge: "The TRICKSY Standard",
    title: "Why People",
    highlightText: "Choose Us?",
    description: "We bring perfection to your doorstep with our certified process and a team that actually cares about your comfort.",
    features: [
      { id: 1, title: 'Professional Team', iconName: 'shield', desc: 'Certified & verified experts.' },
      { id: 2, title: 'Eco-Friendly Products', iconName: 'leaf', desc: 'Safe for kids and pets.' },
      { id: 3, title: 'Affordable Prices', iconName: 'dollar', desc: 'No hidden or extra costs.' },
      { id: 4, title: 'Fast Service', iconName: 'zap', desc: 'Quick & on-time response.' },
      { id: 5, title: '24/7 Support', iconName: 'headphones', desc: 'Always here to help you.' },
    ]
  });

  const iconOptions = [
    { name: 'shield', icon: ShieldCheck },
    { name: 'leaf', icon: Leaf },
    { name: 'dollar', icon: BadgeDollarSign },
    { name: 'zap', icon: Zap },
    { name: 'headphones', icon: Headphones },
    { name: 'check', icon: CheckCircle2 },
  ];

  const updateFeature = (id, field, value) => {
    setSectionData({
      ...sectionData,
      features: sectionData.features.map(f => f.id === id ? { ...f, [field]: value } : f)
    });
  };

  const addFeature = () => {
    if (sectionData.features.length >= 6) return alert("Maximum 6 features allowed.");
    const newFeature = { id: Date.now(), title: 'New Feature', iconName: 'check', desc: 'Short description...' };
    setSectionData({ ...sectionData, features: [...sectionData.features, newFeature] });
  };

  const removeFeature = (id) => {
    setSectionData({ ...sectionData, features: sectionData.features.filter(f => f.id !== id) });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-20">
      {/* Navbar */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><ArrowLeft size={20} /></button>
          <h1 className="text-xl font-black flex items-center gap-2 tracking-tighter uppercase italic">
            <LayoutGrid className="text-emerald-500" /> SECTION <span className="text-emerald-500">STAIRS</span>
          </h1>
        </div>
        <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:shadow-emerald-200 transition-all active:scale-95 flex items-center gap-2">
          <Save size={14} /> Save Changes
        </button>
      </nav>

      <div className="max-w-[1700px] mx-auto p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT: Editor Side */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight text-slate-800">Content <span className="text-emerald-500 text-shadow-sm">Architect</span></h2>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">Configure your "Why Choose Us" section</p>
          </div>

          {/* Section Header Inputs */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
                <Type size={18} className="text-emerald-500" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Section Typography</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Main Title</label>
                <input 
                  value={sectionData.title} 
                  onChange={(e) => setSectionData({...sectionData, title: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-emerald-500/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Highlight Word</label>
                <input 
                  value={sectionData.highlightText} 
                  onChange={(e) => setSectionData({...sectionData, highlightText: e.target.value})}
                  className="w-full p-4 bg-emerald-50 text-emerald-700 rounded-2xl font-black border-2 border-emerald-100 outline-none"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Sub-description</label>
              <textarea 
                value={sectionData.description} 
                onChange={(e) => setSectionData({...sectionData, description: e.target.value})}
                className="w-full p-4 bg-slate-50 rounded-2xl font-medium text-sm h-24 resize-none border-2 border-transparent focus:border-emerald-500/20 outline-none"
              />
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Feature Breakdown</h3>
              <button onClick={addFeature} className="bg-emerald-500 text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-2 hover:bg-slate-900 shadow-lg shadow-emerald-100 transition-all">
                <Plus size={14}/> Add Feature
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {sectionData.features.map((f, index) => (
                <div key={f.id} className={`bg-white p-6 rounded-[2.2rem] border-2 transition-all ${index === 0 ? 'border-slate-800 shadow-md' : 'border-slate-200 opacity-90'}`}>
                  <div className="flex items-start gap-6">
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        {iconOptions.slice(0, 4).map(opt => (
                          <button 
                            key={opt.name}
                            onClick={() => updateFeature(f.id, 'iconName', opt.name)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${f.iconName === opt.name ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-50 text-slate-400'}`}
                          >
                            <opt.icon size={16} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex gap-4">
                        <input 
                          value={f.title} 
                          onChange={(e) => updateFeature(f.id, 'title', e.target.value)}
                          className="flex-1 p-3 bg-slate-50 rounded-xl font-bold text-sm border-none outline-none focus:ring-2 focus:ring-emerald-500/20"
                          placeholder="Title"
                        />
                        <button onClick={() => removeFeature(f.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <input 
                        value={f.desc} 
                        onChange={(e) => updateFeature(f.id, 'desc', e.target.value)}
                        className="w-full p-3 bg-slate-50 rounded-xl text-[11px] font-medium border-none outline-none"
                        placeholder="Description..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Desktop Environment Preview */}
        <div className="lg:col-span-6 h-fit lg:sticky lg:top-28">
           <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-200">
                  <Monitor size={20} className="text-slate-800" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-800">Desktop View</h4>
                  <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Live Rendering</p>
                </div>
              </div>
              <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                 <div className="w-2 h-2 rounded-full bg-slate-300"></div>
              </div>
           </div>

           {/* The Mockup Frame */}
           <div className="relative group">
              {/* Background Gradient "Wallpaper" */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-white rounded-[3rem] blur-2xl -m-4 opacity-50 group-hover:opacity-80 transition-opacity"></div>
              
              <div className="relative z-10 w-full bg-[#1e293b] rounded-t-[3rem] p-3 shadow-2xl border-x-[12px] border-t-[12px] border-[#1e293b]">
                {/* Browser Header */}
                <div className="bg-[#f1f5f9] h-10 rounded-t-[2rem] border-b border-slate-200 flex items-center px-6 gap-3">
                   <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                   </div>
                   <div className="flex-1 max-w-xs h-6 bg-white rounded-md border border-slate-200 flex items-center px-3 gap-2 ml-4">
                      <Globe size={10} className="text-slate-400" />
                      <div className="w-32 h-1.5 bg-slate-100 rounded-full"></div>
                   </div>
                </div>

                {/* Website Content Area */}
                <div className="bg-white min-h-[500px] overflow-y-auto p-10 custom-scrollbar relative">
                   {/* This is the "Why Choose Us" section inside the mockup */}
                   <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-[100px] opacity-60"></div>
                   
                   <div className="relative z-10 max-w-lg">
                      <div className="inline-block px-4 py-1.5 bg-slate-900 text-[10px] font-black text-white rounded-full uppercase tracking-widest mb-6">
                         {sectionData.badge}
                      </div>
                      <h2 className="text-5xl font-black leading-[1.1] text-slate-900">
                        {sectionData.title} <br/>
                        <span className="text-emerald-500 italic">{sectionData.highlightText}</span>
                      </h2>
                      <p className="text-sm text-slate-500 font-medium mt-6 leading-relaxed max-w-sm">
                        {sectionData.description}
                      </p>

                      <div className="mt-12 grid grid-cols-2 gap-4">
                        {sectionData.features.map((f, index) => {
                          const IconComp = iconOptions.find(o => o.name === f.iconName)?.icon || CheckCircle2;
                          return (
                            <div 
                              key={f.id} 
                              className={`p-5 rounded-3xl transition-all ${index === 0 ? 'col-span-2 bg-slate-900 text-white shadow-2xl shadow-emerald-900/20' : 'bg-slate-50 border border-slate-100 group-hover:bg-white'}`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${index === 0 ? 'bg-emerald-500 text-slate-900' : 'bg-white text-emerald-600 shadow-sm border border-slate-100'}`}>
                                  <IconComp size={18} />
                                </div>
                                <div className="flex-1">
                                  <h4 className={`text-xs font-black tracking-tight ${index === 0 ? 'text-white' : 'text-slate-900'}`}>{f.title}</h4>
                                  {index === 0 && <p className="text-[10px] text-slate-400 mt-1 font-medium">{f.desc}</p>}
                                </div>
                                <CheckCircle2 size={16} className={index === 0 ? 'text-emerald-400 opacity-100' : 'text-emerald-600 opacity-20'} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                   </div>
                </div>
              </div>
              
              {/* Laptop Base Shadow */}
              <div className="h-4 w-full bg-[#0f172a] rounded-b-[3rem] shadow-2xl relative z-20">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/30 rounded-b-xl"></div>
              </div>
           </div>

           <div className="mt-8 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Preview Enabled</span>
              </div>
           </div>
        </div>

      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .text-shadow-sm { text-shadow: 0 2px 4px rgba(16, 185, 129, 0.1); }
      `}</style>
    </div>
  );
};

export default WhyChooseEditor;