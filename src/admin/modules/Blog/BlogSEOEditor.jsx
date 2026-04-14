import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent, fetchSections } from '../../../store/index'; 
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Globe, Type, AlignLeft, Image as ImageIcon,
  Monitor, Undo, Hash, Loader2, UploadCloud
} from 'lucide-react';

import SEOPreview from '../../../pages/Blog/SEOPreview'; 

const BlogSEOEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Redux Selectors
  const sections = useSelector((state) => state.sections.items);
  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const currentSection = sections.find(s => s.slug === 'blog-seo');
  const subsectionId = id || currentSection?.id; 

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false); 
  const [viewMode, setViewMode] = useState('split'); 

  const [formData, setFormData] = useState({
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    ogImage: ''
  });

  useEffect(() => {
    if (sections.length === 0) {
      dispatch(fetchSections(5)); 
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
        metaTitle: content.titleLine1 || '',
        metaDescription: content.description || '',
        metaKeywords: content.badgeText || '', 
        ogImage: content.images?.[0] || '' // Stores only the relative path
      });
    }
  }, [content]);

  // Helper to resolve the correct URL for UI rendering
  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    
    // Convert http://localhost:5000/api to http://localhost:5000/
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    const domain = apiBase.replace('/api', ''); 
    return `${domain}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('heroImage', file); 

      const uploadRes = await fetch('http://localhost:5000/api/upload/upload-hero', {
        method: 'POST',
        body: formDataUpload,
      });
      
      const uploadData = await uploadRes.json();
      
      if (uploadData.success) {
        // Save ONLY the relative path to state (and eventually DB)
        const relativePath = uploadData.imageUrl; 
        setFormData(prev => ({ ...prev, ogImage: relativePath }));
      } else {
        alert("Upload Failed: " + uploadData.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    if(window.confirm('Reset SEO settings to saved values?')) {
      setFormData({
        metaTitle: content.titleLine1 || '',
        metaDescription: content.description || '',
        metaKeywords: content.badgeText || '',
        ogImage: content.images?.[0] || ''
      });
    }
  };

  const handleSave = async () => {
    if (!subsectionId) {
      alert("Error: Missing Subsection ID.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        titleLine1: formData.metaTitle,
        description: formData.metaDescription,
        badgeText: formData.metaKeywords,
        images: formData.ogImage ? [formData.ogImage] : [] // Relative path saved to DB
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();

      alert('Blog SEO settings updated successfully!');
    } catch (error) {
      console.error("Failed to update SEO:", error);
      alert("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> Loading SEO Settings...
      </div>
    );
  }

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
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-3 lg:px-5 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs font-bold transition-all whitespace-nowrap ${viewMode === mode.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
              <mode.icon size={12} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className={`${viewMode === mode.id ? 'inline' : 'hidden sm:inline'}`}>{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave} 
          disabled={isSaving || isUploading}
          className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-indigo-600 transition-all flex-shrink-0 disabled:opacity-70 active:scale-95"
        >
          {(isSaving || isUploading) ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {isSaving ? "Publishing..." : isUploading ? "Uploading..." : "Publish SEO"}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-4xl mx-auto border-x' : 'w-full lg:w-[460px] border-r'} bg-white border-slate-200 flex flex-col h-full relative z-20 shadow-2xl shadow-slate-200/50 transition-all duration-300`}>
            
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 scrollbar-hide">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Global Blog SEO</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage search engine visibility</p>
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
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2"><Hash size={12} /> Keywords</label>
                  <input type="text" name="metaKeywords" value={formData.metaKeywords} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all shadow-inner" placeholder="cleaning, hygiene, facility management..." />
                </div>

                {/* IMAGE UPLOAD SECTION */}
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2"><ImageIcon size={12} /> Social Share Image</label>
                  <div className="relative group h-40 rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
                    <img src={getImageUrl(formData.ogImage)} alt="OG Cover" className="w-full h-full object-cover" />
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white font-bold text-xs pointer-events-none">
                       <UploadCloud size={20} className="mr-2"/> Replace Image
                    </div>

                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" 
                    />
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

        {/* RIGHT PANEL */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'hidden lg:flex flex-1'} flex-col h-full bg-zinc-50 relative transition-all duration-300 min-w-0`}>
            <div className="h-12 flex items-center justify-between px-6 bg-white border-b border-slate-200 shadow-sm shrink-0">
              <div className="flex items-center gap-2">
                <Monitor size={14} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Previews</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto w-full p-6 lg:p-12 flex flex-col items-center">
              <SEOPreview 
                title={formData.metaTitle} 
                description={formData.metaDescription} 
                image={getImageUrl(formData.ogImage)}
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