import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Type, AlignLeft, Undo, Loader2
} from 'lucide-react';

const BlogHeroEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const subsectionId = id ? parseInt(id, 10) : 29; 

  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [viewMode, setViewMode] = useState('split'); 
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    badgeText: 'TRICKSY INSIGHTS',
    titlePart1: 'Tips, News &',
    titleAccent: 'Guides.',
    paragraphText: 'Expert advice on keeping your home and office spotless. Read our latest articles to learn the secrets of professional maintenance.'
  });

  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setFormData({
        badgeText: content.badgeText || 'TRICKSY INSIGHTS',
        titlePart1: content.titleLine1 || 'Tips, News &',
        titleAccent: content.titleHighlight || 'Guides.',
        paragraphText: content.description || 'Expert advice on keeping your home and office spotless. Read our latest articles to learn the secrets of professional maintenance.' 
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
        badgeText: content.badgeText || 'TRICKSY INSIGHTS',
        titlePart1: content.titleLine1 || 'Tips, News &',
        titleAccent: content.titleHighlight || 'Guides.',
        paragraphText: content.description || 'Expert advice on keeping your home and office spotless. Read our latest articles to learn the secrets of professional maintenance.'
      });
    }
  };

  const handleSave = async () => {
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
      
      dispatch(fetchSingleSubsectionContent(subsectionId));
      alert("Blog Hero Content Updated Successfully! 🚀");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING BLOG HERO LAB...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans pb-20 selection:bg-emerald-100">
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-900">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-[12px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <Settings2 size={16} className="text-emerald-600" /> Blog Hero <span className="text-emerald-400">Lab</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <mode.icon size={12} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button onClick={handleSave} disabled={isSaving} className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50">
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
          <span>{isSaving ? "DEPLOYING..." : "DEPLOY"}</span>
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-700 ${viewMode === 'split' ? 'max-w-[1800px] px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8' : 'max-w-4xl py-12 px-6'}`}>
        
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-4' : 'w-full'} space-y-6`}>
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 space-y-5">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2 flex items-center gap-2">
                <Type size={14} className="text-emerald-500" /> Header Content
              </span>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Badge Text</label>
                  <input type="text" name="badgeText" value={formData.badgeText} onChange={handleChange} maxLength={30} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-emerald-400 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Main Title (White)</label>
                  <input type="text" name="titlePart1" value={formData.titlePart1} onChange={handleChange} maxLength={40} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-emerald-400 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1 mb-2 block">Highlight Title (Green)</label>
                  <input type="text" name="titleAccent" value={formData.titleAccent} onChange={handleChange} maxLength={40} className="w-full p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl font-black text-emerald-700 outline-none focus:bg-white focus:border-emerald-400 transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 flex items-center gap-1"><AlignLeft size={12} /> Description</label>
                  <textarea name="paragraphText" value={formData.paragraphText} onChange={handleChange} maxLength={200} rows="4" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium outline-none focus:border-emerald-400 focus:bg-white transition-all resize-none leading-relaxed"></textarea>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex justify-end">
                <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                  <Undo size={14} /> Reset Values
                </button>
              </div>
            </div>
          </div>
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-8' : 'w-full'} sticky top-24`}>
            <div className="relative mx-auto bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 overflow-hidden">
              <div className="flex h-8 bg-slate-900 items-center px-4 gap-1.5 border-b border-slate-800/50">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                </div>
                <div className="flex-1 text-center"><span className="text-[6px] font-bold uppercase tracking-widest text-slate-500">Blog Hero Preview</span></div>
              </div>

              <div className="bg-[#0a0a0a] bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] rounded-xl overflow-hidden min-h-[450px] relative flex flex-col justify-center py-20 px-8">
                <div className="w-full max-w-4xl mx-auto text-center scale-95 origin-center animate-in fade-in duration-500">
                  
                  {formData.badgeText && (
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                      <span className="text-slate-200 font-bold text-[9px] uppercase tracking-[0.2em]">{formData.badgeText}</span>
                    </div>
                  )}
                  
                  <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6">
                    {formData.titlePart1} <span className="text-emerald-500">{formData.titleAccent}</span>
                  </h1>
                  
                  <p className="text-slate-400 text-sm lg:text-base font-medium leading-relaxed max-w-2xl mx-auto">
                    {formData.paragraphText}
                  </p>
                  
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