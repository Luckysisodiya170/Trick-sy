import React, { useState } from 'react';
import { 
  Save, ArrowLeft, Image as ImageIcon, 
  Sparkles, Type, Globe, ShieldCheck, Star, Users 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutHeroEditor = () => {
  const navigate = useNavigate();
  
  // Initial State (In real app, fetch this from your DB/API)
  const [formData, setFormData] = useState({
    badgeText: "Established 2014",
    mainTitle: "The Team That",
    highlightTitle: "Perfects Your Space.",
    subtext: "We’re not just a service company; we’re your partners in maintaining a lifestyle of comfort and uncompromising hygiene.",
    yearsOfLegacy: "10+",
    trustedCount: "+5k",
    certifiedLabel: "Certified Experts",
    ratingLabel: "4.9/5 User Rating"
  });

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving About Hero Data:", formData);
    // Add your API call here to update the database
    alert("About Hero updated successfully!");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-12 font-sans">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8">
        <div className="space-y-1">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors text-xs font-bold uppercase tracking-widest mb-4"
          >
            <ArrowLeft size={14} /> Back to Overview
          </button>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit About Hero</h1>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest italic">Update main banner and statistics</p>
        </div>
        
        <button 
          onClick={handleSave}
          className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center gap-2"
        >
          <Save size={18} /> SAVE CHANGES
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Main Text Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
              <Type className="text-indigo-500" size={20} />
              <h2 className="font-black text-slate-800 uppercase tracking-wider text-sm">Text Content</h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Badge Text (Green Label)</label>
                <input 
                  value={formData.badgeText}
                  onChange={(e) => setFormData({...formData, badgeText: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 ring-indigo-100 outline-none" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Main Title (White)</label>
                  <input 
                    value={formData.mainTitle}
                    onChange={(e) => setFormData({...formData, mainTitle: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 ring-indigo-100 outline-none" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Highlight Title (Green)</label>
                  <input 
                    value={formData.highlightTitle}
                    onChange={(e) => setFormData({...formData, highlightTitle: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 ring-indigo-100 outline-none text-emerald-600" 
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Subtext / Description</label>
                <textarea 
                  rows={4}
                  value={formData.subtext}
                  onChange={(e) => setFormData({...formData, subtext: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium leading-relaxed focus:ring-2 ring-indigo-100 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Media Section */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
              <ImageIcon className="text-indigo-500" size={20} />
              <h2 className="font-black text-slate-800 uppercase tracking-wider text-sm">Media & Background</h2>
            </div>
            
            <div className="flex items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem] p-12 bg-slate-50 hover:bg-slate-100/50 transition-colors cursor-pointer group">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <ImageIcon className="text-slate-300" />
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Change Background Image</p>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">Recommended: 1920x1080 (JPG/PNG)</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Stats & Cards */}
        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Sparkles className="text-emerald-400" size={20} />
              <h2 className="font-black uppercase tracking-wider text-sm text-white">Floating Stats</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Legacy Years</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
                  <input 
                    value={formData.yearsOfLegacy}
                    onChange={(e) => setFormData({...formData, yearsOfLegacy: e.target.value})}
                    className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-black outline-none focus:bg-white/10 transition-all" 
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Trusted Counter</label>
                <input 
                  value={formData.trustedCount}
                  onChange={(e) => setFormData({...formData, trustedCount: e.target.value})}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-black outline-none focus:bg-white/10 transition-all" 
                />
              </div>

              <div className="pt-4 space-y-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                    <ShieldCheck className="text-emerald-400" size={18} />
                    <span className="text-[11px] font-bold uppercase tracking-widest">Certified Labels Active</span>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                    <Star className="text-amber-400" size={18} />
                    <span className="text-[11px] font-bold uppercase tracking-widest">Live Rating Sync</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100">
             <h3 className="font-black text-indigo-900 text-xs uppercase tracking-widest mb-4">Pro Tip</h3>
             <p className="text-indigo-700/70 text-[11px] font-medium leading-relaxed">
               Title aur Subtext ko short rakhein taaki mobile devices par layout clean dikhe. Banner image hamesha "Dark" tone ki use karein taaki white text easily read ho sake.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutHeroEditor;