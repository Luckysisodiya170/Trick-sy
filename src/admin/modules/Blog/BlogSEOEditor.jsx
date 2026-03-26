import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Globe, Type, AlignLeft, Image as ImageIcon,
  Monitor, Undo, Hash
} from 'lucide-react';

// NAYA IMPORT: Component for live SEO visual testing
import SEOPreview from '../../../pages/Blog/SEOPreview'; 

const BlogSEOEditor = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 

  const defaultData = {
    metaTitle: 'Blog & Insights | Premium Maintenance Tips by TRICKSY',
    metaDescription: 'Discover expert tips, industry news, and comprehensive guides on premium maintenance, deep cleaning, and property hygiene from the TRICKSY professionals.',
    metaKeywords: 'maintenance tips, deep cleaning, hygiene, facility management, tricksy blog',
    ogImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop'
  };

  const [formData, setFormData] = useState(defaultData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    if(window.confirm('Reset SEO settings to default?')) {
      setFormData(defaultData);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Saved SEO Data:', formData);
    setIsSaving(false);
    alert('Blog SEO settings updated successfully!');
  };

  const titleColor = formData.metaTitle.length > 60 ? 'text-rose-500' : 'text-emerald-500';
  const descColor = formData.metaDescription.length > 160 ? 'text-rose-500' : 'text-emerald-500';

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
            <span className="tracking-tight uppercase">SEO EDITOR</span> 
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
          className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-indigo-600 transition-all flex-shrink-0 disabled:opacity-70"
        >
          {isSaving ? <span className="animate-pulse">Saving...</span> : <><Save size={16} className="lg:w-[14px] lg:h-[14px]" /> <span className="hidden md:inline">Publish SEO</span></>}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-3xl mx-auto border-x' : 'w-full lg:w-[460px] border-r'} bg-white border-slate-200 flex flex-col h-full relative z-20 shadow-2xl shadow-slate-200/50 transition-all duration-300`}>
            
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 scrollbar-hide">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Global Blog SEO</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage search engine visibility</p>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex gap-3">
                <Globe size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-900/80 font-semibold leading-relaxed">
                  These settings apply to your main <strong>/blog</strong> page. Individual articles will automatically generate their own SEO based on their content.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"><Type size={12} /> Meta Title</label>
                    <span className={`text-[10px] font-black ${titleColor}`}>{formData.metaTitle.length} / 60</span>
                  </div>
                  <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all shadow-inner" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"><AlignLeft size={12} /> Meta Description</label>
                    <span className={`text-[10px] font-black ${descColor}`}>{formData.metaDescription.length} / 160</span>
                  </div>
                  <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows="4" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all shadow-inner resize-none leading-relaxed" ></textarea>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2"><Hash size={12} /> Keywords (Comma Separated)</label>
                  <input type="text" name="metaKeywords" value={formData.metaKeywords} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all shadow-inner" placeholder="cleaning, hygiene, facility management..." />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2"><ImageIcon size={12} /> Social Share Image (Open Graph)</label>
                  <div className="relative group rounded-2xl overflow-hidden border border-slate-200">
                    <img src={formData.ogImage} alt="OG Cover" className="w-full h-32 object-cover opacity-80 group-hover:opacity-40 transition-opacity bg-slate-100" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 backdrop-blur-sm p-4">
                      <input type="text" name="ogImage" value={formData.ogImage} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 ring-indigo-500 shadow-xl" placeholder="Paste image URL here..." />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                <Undo size={14} /> Reset Data
              </button>
            </div>
          </div>
        )}

        {/* RIGHT PANEL: LIVE COMPONENT PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'hidden lg:flex flex-1'} flex-col h-full bg-zinc-50 relative transition-all duration-300 min-w-0`}>
            
            <div className="h-12 flex items-center justify-between px-6 bg-white border-b border-slate-200 shadow-sm shrink-0">
              <div className="flex items-center gap-2">
                <Monitor size={14} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Search Engine Previews</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto w-full p-6 lg:p-12 flex flex-col items-center">
              
              {/* HUMARA NAYA REUSABLE PREVIEW COMPONENT YAHAN CALL HUA HAI */}
              <SEOPreview 
                title={formData.metaTitle} 
                description={formData.metaDescription} 
                image={formData.ogImage}
                pagePath="blog"
              />

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogSEOEditor;