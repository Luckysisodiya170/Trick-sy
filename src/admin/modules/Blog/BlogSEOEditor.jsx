import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { AdminService } from '../../services/adminService';
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

  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const subsectionId = parseInt(id, 10);

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
        ogImage: content.images?.[0] || ''
      });
    }
  }, [content]);

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith('http') || path.startsWith('data:')) return path;
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
      formDataUpload.append('image', file); 

      const uploadData = await AdminService.uploadHeroImage(formDataUpload);
      
      if (uploadData.success) {
        setFormData(prev => ({ ...prev, ogImage: uploadData.imageUrl }));
      } else {
        alert("Upload Failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
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
    if (!subsectionId || isNaN(subsectionId)) return alert("Error: Missing Subsection ID.");

    setIsSaving(true);
    try {
      const payload = {
        titleLine1: formData.metaTitle,
        description: formData.metaDescription,
        badgeText: formData.metaKeywords,
        images: formData.ogImage ? [formData.ogImage] : []
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();
      
      navigate('/admin/pages/blog');
      alert('Blog SEO settings updated successfully! 🚀');
    } catch (error) {
      alert("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING SEO LAB...
      </div>
    );
  }

  const titleColor = formData.metaTitle.length > 60 ? 'text-rose-500' : 'text-emerald-500';
  const descColor = formData.metaDescription.length > 160 ? 'text-rose-500' : 'text-emerald-500';

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans overflow-hidden selection:bg-indigo-100">
      
      <nav className="h-16 sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-900">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-[12px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <Settings2 size={16} className="text-indigo-600" /> SEO <span className="text-indigo-400">Lab</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <mode.icon size={12} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave} 
          disabled={isSaving || isUploading}
          className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {(isSaving || isUploading) ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          <span>{isSaving ? "SAVING..." : "PUBLISH SEO"}</span>
        </button>
      </nav>

      <div className={`mx-auto w-full transition-all duration-700 h-[calc(100vh-64px)] flex ${viewMode === 'split' ? 'flex-row' : 'flex-col'} overflow-hidden`}>
        
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-4/12 border-r border-slate-100' : 'w-full max-w-4xl mx-auto mt-8 border rounded-[2rem]'} bg-white flex flex-col h-full relative z-20 shadow-2xl shadow-slate-200/50 transition-all duration-300 overflow-hidden`}>
            
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 custom-scrollbar">
              <div>
                <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase mb-1">Global Blog SEO</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Search Engine Optimization</p>
              </div>

              <div className="space-y-5">
                <div className="bg-slate-50/50 p-5 rounded-[2rem] border border-slate-100 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Type size={12} className="text-indigo-500" /> Meta Title</label>
                      <span className={`text-[9px] font-black ${titleColor}`}>{formData.metaTitle.length} / 60</span>
                    </div>
                    <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-indigo-400 transition-all shadow-inner" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><AlignLeft size={12} className="text-indigo-500" /> Meta Description</label>
                      <span className={`text-[9px] font-black ${descColor}`}>{formData.metaDescription.length} / 160</span>
                    </div>
                    <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows="4" className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-medium text-slate-800 outline-none focus:border-indigo-400 transition-all shadow-inner resize-none leading-relaxed" ></textarea>
                  </div>

                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2"><Hash size={12} className="text-indigo-500" /> Focus Keywords</label>
                    <input type="text" name="metaKeywords" value={formData.metaKeywords} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-medium text-slate-800 outline-none focus:border-indigo-400 transition-all shadow-inner" placeholder="service, maintenance, hygiene..." />
                  </div>
                </div>

                <div className="bg-slate-50/50 p-5 rounded-[2rem] border border-slate-100 space-y-4">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1"><ImageIcon size={12} className="text-indigo-500" /> Social Share Image (OG)</label>
                  <div className="relative group aspect-video rounded-2xl overflow-hidden bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer">
                    <img src={getImageUrl(formData.ogImage)} alt="OG Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white font-bold text-[10px] uppercase tracking-widest">
                       <UploadCloud size={20} className="mr-2"/> Replace Image
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end pb-20">
                <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                  <Undo size={14} /> Reset SEO Data
                </button>
              </div>
            </div>
          </div>
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-8/12' : 'w-full'} bg-slate-50 flex flex-col items-center justify-center p-8 relative overflow-hidden`}>
            <div className="w-full max-w-[1000px] h-full flex flex-col items-center justify-center">
              <div className="w-full pointer-events-none scale-95 origin-center animate-in fade-in duration-500">
                <SEOPreview 
                  title={formData.metaTitle} 
                  description={formData.metaDescription} 
                  image={getImageUrl(formData.ogImage)}
                  pagePath="blog"
                />
              </div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-8 italic">
                * Real-time search engine snippet simulation
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default BlogSEOEditor;