import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent, fetchSections } from '../../../store/index'; 
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Type, AlignLeft, Monitor, Undo, Loader2
} from 'lucide-react';

import BlogHero from '../../../pages/Blog/BlogHero'; 

const BlogHeroEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  // Redux Selectors
  const sections = useSelector((state) => state.sections.items);
  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const currentSection = sections.find(s => s.slug === 'blog-hero');
  const subsectionId = id || currentSection?.id || 29; 

  const [viewMode, setViewMode] = useState('split'); 
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form data
  const [formData, setFormData] = useState({
    badgeText: '',
    titlePart1: '',
    titleAccent: '',
    paragraphText: ''
  });

  useEffect(() => {
    if (sections.length === 0) {
      dispatch(fetchSections(4)); 
    }
  }, [dispatch, sections.length]);

  useEffect(() => {
    if (subsectionId) {
      dispatch(fetchSingleSubsectionContent(subsectionId));
    }
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setFormData({
        badgeText: content.badgeText || '',
        titlePart1: content.titleLine1 || '',
        titleAccent: content.titleHighlight || '',
        paragraphText: content.description || '' 
      });
    }
  }, [content]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    if(window.confirm('Reset to saved values?')) {
      setFormData({
        badgeText: content.badgeText || '',
        titlePart1: content.titleLine1 || '',
        titleAccent: content.titleHighlight || '',
        paragraphText: content.description || ''
      });
    }
  };

  const handleSave = async () => {
    if (!subsectionId) {
      alert("Error: Missing Subsection ID. Please check routing.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        badgeText: formData.badgeText,
        titleLine1: formData.titlePart1,
        titleHighlight: formData.titleAccent,
        description: formData.paragraphText
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();
navigate('/admin/pages/blog');

      alert("Blog Hero Content Updated Successfully!");
      
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> Loading Blog Hero...
      </div>
    );
  }

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
            <span className="tracking-tight uppercase">BLOG HERO EDITOR</span> 
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full flex-shrink-1 mx-2">
          {[
            { id: 'edit', icon: Edit3, label: 'Edit' }, 
            { id: 'split', icon: Columns, label: 'Split' }, 
            { id: 'preview', icon: Eye, label: 'Preview' }
          ].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-3 lg:px-5 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs font-bold transition-all whitespace-nowrap ${viewMode === mode.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
              <mode.icon size={12} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className={`${viewMode === mode.id ? 'inline' : 'hidden sm:inline'}`}>{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave} 
          disabled={isSaving} 
          className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-indigo-600 transition-all flex-shrink-0 disabled:opacity-70 disabled:hover:bg-slate-900 active:scale-95"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin lg:w-[14px] lg:h-[14px]" /> : <Save size={16} className="lg:w-[14px] lg:h-[14px]" />}
          {isSaving ? <span className="hidden md:inline">Saving...</span> : <span className="hidden md:inline">Save Changes</span>}
        </button>
      </nav>

      {/* WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'flex-1 bg-[#F1F3F5] flex items-center justify-center p-6 lg:p-10' : 'w-full lg:w-[420px] border-r bg-white'} flex flex-col h-full shrink-0 z-20 transition-all duration-300`}>
            <div className={`${viewMode === 'edit' ? 'w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl flex flex-col h-full overflow-hidden border border-slate-200' : 'w-full h-full flex flex-col shadow-inner'}`}>
              <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 scrollbar-hide">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Blog Header</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage blog landing area</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2"><Type size={12} /> Badge Text</label>
                    <input type="text" name="badgeText" value={formData.badgeText} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all shadow-inner" />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2"><Type size={12} /> Main Title (White Text)</label>
                    <input type="text" name="titlePart1" value={formData.titlePart1} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all shadow-inner" />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2"><Type size={12} /> Highlighted Title (Emerald)</label>
                    <input type="text" name="titleAccent" value={formData.titleAccent} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-emerald-100 focus:bg-white transition-all shadow-inner" />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2"><AlignLeft size={12} /> Subtitle Paragraph</label>
                    <textarea name="paragraphText" value={formData.paragraphText} onChange={handleChange} rows="4" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all shadow-inner resize-none leading-relaxed"></textarea>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end shrink-0">
                <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                  <Undo size={14} /> Reset Data
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT PANEL: PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'hidden lg:flex flex-1'} flex-col h-full bg-slate-100/50 relative transition-all duration-300`}>
            
            <div className="h-12 flex items-center justify-center gap-2 bg-white border-b border-slate-200 shadow-sm shrink-0 z-10">
              <Monitor size={14} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Output</span>
            </div>
            
            <div className="flex-1 overflow-y-auto w-full flex items-start justify-center p-4 lg:p-8 custom-scrollbar">
              <div className={`w-full max-w-[1400px] bg-slate-900 rounded-[2.5rem] border-[10px] border-slate-900 shadow-2xl overflow-hidden relative transition-all duration-500 transform ${viewMode === 'preview' ? 'scale-100' : 'scale-[0.85] origin-top'}`}>
                
                {/* BROWSER BAR (Aligned with Technical Hero Style) */}
                <div className="h-10 bg-slate-800 flex items-center px-6 gap-2">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div></div>
                  <div className="mx-auto w-64 h-5 bg-slate-700 rounded-md text-[9px] text-slate-500 flex items-center justify-center font-bold uppercase tracking-widest">tricksy-preview.io/blog</div>
                </div>

                <div className="relative overflow-y-auto max-h-[80vh] bg-white custom-scrollbar">
                  {/* Floating Action Buttons from Example */}
                  <div className="absolute top-6 right-6 z-[100] flex gap-3 opacity-0 hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={() => setViewMode('edit')} 
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full shadow-lg transition-all"
                    >
                      <Edit3 size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Edit Content</span>
                    </button>
                  </div>
                  
                  <BlogHero {...formData} />
                </div>
                
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogHeroEditor;