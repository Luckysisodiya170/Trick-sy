import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, ShieldCheck, Users, Upload, 
  Plus, Trash2, Smartphone, Layout, CheckCircle
} from 'lucide-react';

const TechnicalTrustEditor = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);

  const [trustData, setTrustData] = useState({
    title: "Verified Force.",
    desc: "Every technician in our squad is background-checked and Dubai Municipality certified.",
    count: "5,000+",
    ctaText: "Book Callback",
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    ]
  });

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

  const removeAvatar = (index) => {
    setTrustData(prev => ({ 
      ...prev, 
      avatars: prev.avatars.filter((_, i) => i !== index) 
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    alert("Trust Banner Synced!");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col h-screen overflow-hidden text-slate-900">
      <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-xl transition-all text-slate-400">
            <ArrowLeft size={20} />
          </button>
          <div className="h-6 w-[1px] bg-slate-200"></div>
          <h1 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-500" /> Trust CMS
          </h1>
        </div>
        <button onClick={handleSave} disabled={isSaving} className="bg-zinc-950 text-white px-8 py-2.5 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg shadow-emerald-100">
          <Save size={14} /> {isSaving ? 'UPLOADING...' : 'SAVE CHANGES'}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[450px] border-r border-slate-200 bg-white overflow-y-auto p-8 space-y-8 custom-scrollbar">
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Main Title</label>
              <input value={trustData.title} onChange={(e) => handleUpdate('title', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-black outline-none focus:border-emerald-500" />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Trust Statement</label>
              <textarea value={trustData.desc} onChange={(e) => handleUpdate('desc', e.target.value)} rows="3" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-slate-500 outline-none focus:border-emerald-500 resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Stat Number</label>
                <input value={trustData.count} onChange={(e) => handleUpdate('count', e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black text-emerald-600 uppercase" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">CTA Label</label>
                <input value={trustData.ctaText} onChange={(e) => handleUpdate('ctaText', e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black uppercase" />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block">Technician Profiles (Max 5)</label>
              <div className="flex flex-wrap gap-3">
                {trustData.avatars.map((img, i) => (
                  <div key={i} className="relative group/avatar">
                    <img src={img} className="w-12 h-12 rounded-xl object-cover border-2 border-slate-100" alt="tech" />
                    <button onClick={() => removeAvatar(i)} className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                      <Trash2 size={10} />
                    </button>
                  </div>
                ))}
                {trustData.avatars.length < 5 && (
                  <button onClick={() => fileInputRef.current.click()} className="w-12 h-12 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:border-emerald-500 hover:text-emerald-500 transition-all">
                    <Plus size={20} />
                  </button>
                )}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleAvatarUpload} accept="image/*" />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-slate-100 p-12 flex items-center justify-center relative">
          <div className="absolute top-10 flex gap-4">
            <div className="px-4 py-2 bg-white rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest shadow-sm flex items-center gap-2 border border-slate-200">
              <Layout size={12} /> Desktop Mode
            </div>
            <div className="px-4 py-2 bg-slate-200 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Smartphone size={12} /> Mobile View
            </div>
          </div>

          <div className="w-full max-w-[1100px] relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[3.5rem] blur opacity-10"></div>
            <div className="relative bg-zinc-950 rounded-[3.5rem] p-12 border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-3xl bg-emerald-500 text-zinc-950 flex items-center justify-center shadow-[0_25px_50px_-12px_rgba(16,185,129,0.5)] transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <ShieldCheck size={48} strokeWidth={2.5} />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-white text-4xl font-black tracking-tight mb-2 uppercase italic">{trustData.title}</h4>
                  <p className="text-zinc-500 font-medium max-w-sm leading-relaxed text-[13px]">{trustData.desc}</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-5">
                <div className="flex -space-x-5">
                  {trustData.avatars.map((img, i) => (
                    <img key={i} src={img} className="w-16 h-16 rounded-full border-4 border-zinc-950 object-cover ring-2 ring-emerald-500/10" alt="tech" />
                  ))}
                  <div className="w-16 h-16 rounded-full border-4 border-zinc-950 bg-zinc-900 flex items-center justify-center text-emerald-400 font-black text-xs">+45</div>
                </div>
                <div className="flex items-center gap-2 px-5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle size={10} className="text-emerald-500" />
                  <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em]">{trustData.count} Requests Completed</span>
                </div>
              </div>

              <button className="bg-white text-zinc-950 px-14 py-6 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all shadow-xl hover:-translate-y-2 active:scale-95">
                  {trustData.ctaText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalTrustEditor;