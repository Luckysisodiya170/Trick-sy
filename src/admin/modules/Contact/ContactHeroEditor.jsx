import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Type, AlignLeft, Monitor, Undo, Upload 
} from 'lucide-react';

import ContactHero from '../../../pages/Contact/ContactHero'; 

const ContactHeroEditor = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);  
    const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 

  const defaultData = {
    badgeText: 'Contact tricksy',
    titlePart1: 'Premium Care',
    titleAccent: 'Your Space.',
    paragraphText: 'Need a personalized quote or have a query? We are here to provide 5-star maintenance support. Reach us within minutes.',
    bgImage: null
  };

  const [formData, setFormData] = useState(defaultData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, bgImage: imageUrl }));
    }
  };

  const handleReset = () => {
    if(window.confirm('Reset to default values?')) {
      setFormData(defaultData);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Saved Hero Data:', formData);
    setIsSaving(false);
    alert('Hero section updated successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-3 lg:px-6 py-3 flex items-center justify-between shadow-sm gap-2 shrink-0">
        <div className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm lg:text-lg font-black tracking-tighter italic flex items-center gap-1.5">
            <Settings2 size={18} className="text-indigo-600 lg:w-5 lg:h-5" /> 
            <span className="tracking-tight uppercase">CONTACT EDITOR</span> 
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
                viewMode === mode.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <mode.icon size={12} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className={`${viewMode === mode.id ? 'inline' : 'hidden sm:inline'}`}>{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave} disabled={isSaving}
          className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-indigo-600 transition-all flex-shrink-0 disabled:opacity-70 disabled:hover:bg-slate-900"
        >
          {isSaving ? <span className="animate-pulse">Saving...</span> : <><Save size={16} className="lg:w-[14px] lg:h-[14px]" /> <span className="hidden md:inline">Save Changes</span></>}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT SIDE: FORM */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-3xl mx-auto border-x' : 'w-full lg:w-[420px] border-r'} bg-white border-slate-200 flex flex-col h-full relative z-20 shadow-2xl shadow-slate-200/50 transition-all duration-300`}>
            
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 scrollbar-hide">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Hero Content</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage module settings</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                    <Type size={12} /> Badge Text
                  </label>
                  <input type="text" name="badgeText" value={formData.badgeText} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all shadow-inner" />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                    <Type size={12} /> Main Title (White Text)
                  </label>
                  <input type="text" name="titlePart1" value={formData.titlePart1} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all shadow-inner" />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                    <Type size={12} /> Highlighted Title (Emerald)
                  </label>
                  <input type="text" name="titleAccent" value={formData.titleAccent} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-emerald-100 focus:bg-white transition-all shadow-inner" />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                    <AlignLeft size={12} /> Subtitle Paragraph
                  </label>
                  <textarea name="paragraphText" value={formData.paragraphText} onChange={handleChange} rows="4" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all shadow-inner resize-none leading-relaxed"></textarea>
                </div>

                {/* --- IMAGE UPLOAD SECTION --- */}
                <div className="pt-2">
                   <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                    <Upload size={12} /> Background Image
                  </label>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                  <div onClick={() => fileInputRef.current.click()} className="w-full h-32 border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl flex flex-col items-center justify-center group hover:bg-indigo-50 hover:border-indigo-200 transition-all cursor-pointer overflow-hidden relative">
                    {formData.bgImage ? (
                      <>
                        <img src={formData.bgImage} className="w-full h-full object-cover opacity-60" alt="bg" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">Change Image</div>
                      </>
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto text-slate-300 mb-2 group-hover:text-indigo-400 transition-colors" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">Upload Custom Cover</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                <Undo size={14} /> Reset Form
              </button>
            </div>
          </div>
        )}

        {/* RIGHT SIDE: PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'hidden lg:flex flex-1'} flex-col h-full bg-slate-100/50 relative transition-all duration-300`}>
            
            <div className="h-12 flex items-center justify-center gap-2 bg-white border-b border-slate-200 shadow-sm shrink-0">
              <Monitor size={14} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Output</span>
            </div>

            <div className="flex-1 overflow-y-auto w-full flex items-start justify-center p-4 lg:p-8">
              <div className="w-full max-w-[1400px] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300/50 border-4 border-white/50 bg-zinc-950">
                {/* PREVIEW COMPONENT */}
                <ContactHero {...formData} />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ContactHeroEditor;