import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Target, Users, ShieldCheck, Heart, 
  CheckCircle2, Edit3, Columns, Eye, Settings2, Type, Upload 
} from 'lucide-react';

const AboutMissionEditor = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [viewMode, setViewMode] = useState('split'); 
  
  const [missionData, setMissionData] = useState({
    title: "Quality You Can",
    highlight: "Trust Blindly.",
    description: "To provide the most reliable, high-tech, and professional home services through a team of certified experts.",
    mainImage: null,
    stats: [
      { label: "Founded", value: "2014", id: 1 },
      { label: "Team Size", value: "150+", id: 2 },
      { label: "Projects", value: "5k+", id: 3 },
      { label: "Cities", value: "12+", id: 4 },
    ]
  });

  const handleStatChange = (id, field, value) => {
    const updatedStats = missionData.stats.map(s => s.id === id ? { ...s, [field]: value } : s);
    setMissionData({ ...missionData, stats: updatedStats });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMissionData({ ...missionData, mainImage: URL.createObjectURL(file) });
    }
  };

  // Helper icons for stats
  const statIcons = [<Target size={20}/>, <Users size={20}/>, <Heart size={20}/>, <ShieldCheck size={20}/>];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-3 lg:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm lg:text-lg font-black italic flex items-center gap-1.5">
            <Settings2 size={18} className="text-indigo-600" /> MISSION EDITOR
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}>
              <mode.icon size={14} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button className="bg-slate-900 text-white px-5 py-2 rounded-full font-extrabold text-xs flex items-center gap-2 hover:bg-indigo-600 transition-all">
          <Save size={14} /> <span className="hidden md:inline">Save</span>
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-500 ${viewMode === 'split' ? 'max-w-[1800px] p-6 grid grid-cols-1 lg:grid-cols-12 gap-10' : 'max-w-4xl p-6'}`}>
        
        {/* --- EDITOR SIDE --- */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : ''} space-y-6`}>
            <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm uppercase tracking-tight border-b pb-4">
                <Type size={16} className="text-indigo-500" /> Mission Content
              </h3>
              <div className="space-y-4">
                <input value={missionData.title} onChange={(e) => setMissionData({...missionData, title: e.target.value})} placeholder="Title" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none" />
                <input value={missionData.highlight} onChange={(e) => setMissionData({...missionData, highlight: e.target.value})} placeholder="Highlight" className="w-full p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl font-black text-emerald-700 outline-none" />
                <textarea rows="3" value={missionData.description} onChange={(e) => setMissionData({...missionData, description: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium outline-none resize-none" />
              </div>
            </section>

            <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-4">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight border-b pb-4">Stats & Numbers</h3>
              <div className="grid grid-cols-2 gap-4">
                {missionData.stats.map((stat) => (
                  <div key={stat.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <input value={stat.value} onChange={(e) => handleStatChange(stat.id, 'value', e.target.value)} className="w-full bg-transparent font-black text-lg outline-none" />
                    <input value={stat.label} onChange={(e) => handleStatChange(stat.id, 'label', e.target.value)} className="w-full bg-transparent text-[10px] font-bold uppercase text-slate-500 outline-none" />
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight mb-4">Mission Image</h3>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} />
              <div onClick={() => fileInputRef.current.click()} className="w-full h-40 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-indigo-50 transition-all overflow-hidden">
                {missionData.mainImage ? <img src={missionData.mainImage} className="w-full h-full object-cover" alt="preview" /> : <Upload className="text-slate-300" />}
              </div>
            </section>
          </div>
        )}

        {/* --- LIVE PREVIEW (MATCHED TO COMPONENT) --- */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-7' : 'w-full'} h-fit animate-in fade-in`}>
            <div className="w-full bg-white rounded-[2.5rem] border-[6px] border-slate-950 shadow-2xl overflow-hidden relative">
              
              <section className="py-16 lg:py-24 bg-white px-6">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                  
                  {/* Left Image Side */}
                  <div className="w-full lg:w-1/2 relative">
                    <div className="absolute top-4 -left-4 w-full h-full rounded-[2rem]"></div>
                    <div className="relative rounded-[2rem] overflow-hidden border-4 border-zinc-950 bg-zinc-100 z-10 h-[350px] lg:h-[450px]">
                      {missionData.mainImage ? (
                         <img src={missionData.mainImage} className="w-full h-full object-cover grayscale" alt="Mission" />
                      ) : (
                         <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400 font-bold uppercase tracking-widest">Image Placeholder</div>
                      )}
                    </div>
                    
                    {/* Floating Satisfaction Badge */}
                    <div className="absolute -bottom-6 -right-6 hidden md:flex flex-col bg-zinc-950 text-white p-6 rounded-[2rem] border-4 border-zinc-800 z-20 w-[200px]">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                        <span className="text-3xl font-black italic">100%</span>
                      </div>
                      <p className="text-[9px] font-black uppercase tracking-widest mt-2 leading-tight">Satisfaction <br/><span className="text-emerald-500">Guaranteed</span></p>
                    </div>
                  </div>

                  {/* Right Content Side */}
                  <div className="w-full lg:w-1/2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>
                      <span className="text-zinc-900 font-black text-[9px] uppercase tracking-widest">Our Mission</span>
                    </div>

                    <h2 className="text-4xl lg:text-6xl font-black text-zinc-950 leading-[1.1] tracking-tighter mb-4">
                      {missionData.title} <br />
                      <span className="text-emerald-500">{missionData.highlight}</span>
                    </h2>
                    
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed mb-8">
                      {missionData.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {missionData.stats.map((stat, idx) => (
                        <div key={idx} className="p-5 bg-white border-2 border-zinc-200 rounded-[1.5rem] hover:border-zinc-950 transition-all hover:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
                          <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-950 mb-3 border border-zinc-200">
                            {statIcons[idx]}
                          </div>
                          <p className="text-2xl lg:text-3xl font-black text-zinc-950 leading-none">{stat.value}</p>
                          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-2">{stat.label}</p>
                        </div>
                      ))}
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

export default AboutMissionEditor;