import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { ArrowLeft, Save, Loader2, Settings2, Edit3, Columns, Eye, ShieldCheck, Globe, Lock } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const ContactPrivacyEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const subsectionId = id ? parseInt(id, 10) : 1311; 

  // 1. Redux Selectors
  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 
  const [formData, setFormData] = useState({ title: '', content: '' });

  // 2. Initial Fetching
  useEffect(() => {
    if (subsectionId) {
      dispatch(fetchSingleSubsectionContent(subsectionId));
    }
  }, [dispatch, subsectionId]);

  // 3. Map Content to Form State
  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      if (content.id == subsectionId || content.subsectionId == subsectionId) {
        setFormData({ 
          title: content.titleLine1 || content.title || 'Privacy Policy', 
          content: content.description || '' 
        });
      }
    }
  }, [content, subsectionId]);

  // 4. Save & Navigate Logic
  const handleSave = async () => {
    if (!formData.content.trim()) return alert("Content cannot be empty!");
    
    setIsSaving(true);
    try {
      const payload = {
        titleLine1: formData.title,
        description: formData.content // RAW HTML STRING
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();

      navigate('/admin/pages/contact');
      alert('Privacy Policy Updated! 🛡️');
    } catch (err) { 
      console.error("Save Error:", err);
      alert('Error saving privacy data'); 
    } finally { 
      setIsSaving(false); 
    }
  };

  if (status === 'loading' && !formData.content) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> LOADING EDITOR...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#FDFDFD] font-sans overflow-hidden selection:bg-emerald-100">
      
      {/* NAVBAR */}
      <nav className="h-16 sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-900">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-[12px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <ShieldCheck size={16} className="text-emerald-600" /> Privacy <span className="text-emerald-400">Lab</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <mode.icon size={12} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave} 
          disabled={isSaving} 
          className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          <span>{isSaving ? 'SAVING...' : 'DEPLOY'}</span>
        </button>
      </nav>

      <div className={`mx-auto w-full transition-all duration-700 h-[calc(100vh-64px)] flex ${viewMode === 'split' ? 'flex-row' : 'flex-col'} overflow-hidden`}>
        
        {/* EDITOR SIDE */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-5/12 border-r border-slate-100' : 'w-full max-w-5xl mx-auto mt-8 border rounded-[2rem]'} bg-white flex flex-col h-full overflow-hidden z-10 transition-all duration-300 shadow-2xl shadow-slate-200/50`}>
            <div className="p-8 space-y-6 flex-1 flex flex-col overflow-hidden custom-scrollbar">
              <div>
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Privacy Document Title</label>
                 <input 
                  type="text" 
                  name="title"
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  className="w-full text-2xl font-black outline-none border-b-2 border-slate-100 focus:border-emerald-600 pb-2 transition-all" 
                  placeholder="Enter policy title..."
                />
              </div>

              <div className="flex-1 flex flex-col min-h-0 bg-slate-50/30 rounded-2xl border border-slate-100 overflow-hidden">
                <ReactQuill 
                  theme="snow" 
                  value={formData.content} 
                  onChange={(value) => setFormData({...formData, content: value})} 
                  className="h-full flex flex-col"
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      ['link', 'clean']
                    ],
                  }}
                />
              </div>
              <div className="h-10 shrink-0" />
            </div>
          </div>
        )}

        {/* PREVIEW SIDE (MACBOOK MOCKUP) */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-7/12' : 'w-full'} bg-slate-50 flex flex-col items-center justify-start p-8 relative overflow-y-auto no-scrollbar`}>
            
            <div className="w-full max-w-[850px] bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 flex flex-col shrink-0 mb-20">
              <div className="flex h-8 bg-slate-900 items-center px-4 gap-1.5 border-b border-slate-800/50 shrink-0">
                 <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                 </div>
                 <div className="flex-1 text-center flex items-center justify-center gap-1.5">
                    <Globe size={10} className="text-slate-600" />
                    <span className="text-[6px] font-bold uppercase tracking-widest text-slate-500">tricksy.ae/legal/privacy</span>
                 </div>
              </div>

              <div className="flex-1 bg-white rounded-xl overflow-y-auto custom-scrollbar relative h-[600px] pointer-events-none">
                 {/* Page Header (Emerald) */}
                 <div className="bg-emerald-600 px-8 py-16 text-center text-white">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
                      {formData.title || "Privacy Policy"}
                    </h1>
                    <div className="mt-4 flex justify-center items-center gap-2 opacity-60 text-[9px] font-black tracking-widest uppercase">
                       <Lock size={12} /> Data Protection Protocol
                    </div>
                 </div>

                 {/* Body Content */}
                 <div className="p-10 md:p-16 max-w-3xl mx-auto">
                    <div 
                      className="prose prose-slate prose-emerald max-w-none w-full whitespace-normal break-words prose-p:text-slate-600 prose-p:text-base prose-p:leading-relaxed prose-headings:text-slate-900 prose-headings:font-black" 
                      dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-slate-300 italic text-center">Drafting privacy protocol...</p>' }} 
                    />
                 </div>

                 <div className="bg-slate-50 px-8 py-10 text-center border-t border-slate-100">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      TRICKSY Privacy Oversight <br/>
                      <span className="text-emerald-600 mt-2 block">privacy@tricksy.ae</span>
                    </p>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .ql-container.ql-snow { border: none !important; min-height: 300px; }
        .ql-toolbar.ql-snow { border: none !important; border-bottom: 1px solid #f1f5f9 !important; background: white; border-radius: 1rem 1rem 0 0; }
        .ql-editor { font-size: 14px; color: #334155; line-height: 1.6; }
      `}</style>
    </div>
  );
};

export default ContactPrivacyEditor;