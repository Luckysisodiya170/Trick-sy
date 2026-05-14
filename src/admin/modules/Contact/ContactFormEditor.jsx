import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { AdminService } from '../../services/adminService';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Type, AlignLeft, Monitor, Undo, FormInput, UploadCloud, Loader2, Image as ImageIcon, Globe
} from 'lucide-react';
import ContactForm from '../../../pages/Contact/ContactForm'; 

const ContactFormEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const subsectionId = id ? parseInt(id, 10) : 36; 

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 
  const [hasLoaded, setHasLoaded] = useState(false); 

  const [formData, setFormData] = useState({
    title: '',
    titleHighlight: '',
    subtitle: '',
    formImage: ''
  });

  useEffect(() => {
    if (subsectionId) {
      dispatch(fetchSingleSubsectionContent(subsectionId));
    }
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0 && !hasLoaded) {
      if (content.id == subsectionId || content.subsectionId == subsectionId) {
        setFormData({
          title: content.title || 'Request',
          titleHighlight: content.titleHighlight || 'Service',
          subtitle: content.description || 'Fill the details below.',
          formImage: content.images?.[0] || '' 
        });
        setHasLoaded(true); 
      }
    }
  }, [content, subsectionId, hasLoaded]);

  const getImageUrl = (path) => {
    if(!path) return "";
    if(path.startsWith('http') || path.startsWith('data:')) return path;
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    const domain = apiBase.replace('/api', ''); 
    return `${domain}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file); 

      const res = await AdminService.uploadHeroImage(uploadFormData);
      
      if (res.success || res.imageUrl) {
        setFormData(prev => ({ ...prev, formImage: res.imageUrl }));
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    if(window.confirm('Reset to saved values?')) {
      setFormData({
        title: content.title || '',
        titleHighlight: content.titleHighlight || '',
        subtitle: content.description || '',
        formImage: content.images?.[0] || ''
      });
    }
  };

  const handleSave = async () => {
    if (!subsectionId) return alert("Error: Missing Subsection ID.");

    setIsSaving(true);
    try {
      const payload = {
        title: formData.title,
        titleHighlight: formData.titleHighlight,
        description: formData.subtitle,
        images: formData.formImage ? [formData.formImage] : [] 
      };

      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      
      await dispatch(fetchSingleSubsectionContent(subsectionId)).unwrap();
      
      navigate('/admin/pages/contact');
      alert('Form settings updated successfully! 🚀');
    } catch (error) {
      alert('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' && !hasLoaded) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING FORM LAB...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden selection:bg-emerald-100">
      
      {/* NAVBAR */}
      <nav className="h-16 sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-900">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-[12px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <Settings2 size={16} className="text-emerald-600" /> Form <span className="text-emerald-400">Lab</span>
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
          onClick={handleSave} disabled={isSaving || isUploading}
          className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          <span>{isSaving ? 'SAVING...' : 'DEPLOY'}</span>
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-700 h-[calc(100vh-64px)] flex ${viewMode === 'split' ? 'flex-row' : 'flex-col'} overflow-hidden`}>
        
        {/* EDITOR SIDE */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-4/12 border-r border-slate-100' : 'w-full max-w-4xl mx-auto mt-8 border rounded-[2rem]'} bg-white flex flex-col h-full overflow-hidden z-10 transition-all duration-300 shadow-2xl shadow-slate-200/50`}>
            
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 custom-scrollbar">
              <div>
                <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase mb-1">Form Header</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Brand Titles & Visuals</p>
              </div>

              <div className="space-y-5">
                <div className="bg-slate-50/50 p-5 rounded-[2rem] border border-slate-100 space-y-4 shadow-inner">
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block flex items-center gap-1.5"><Type size={12} className="text-emerald-500" /> Main Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-emerald-400 transition-all shadow-sm" />
                  </div>

                  <div>
                    <label className="text-[9px] font-black text-emerald-600 uppercase tracking-widest ml-1 mb-2 block italic underline">Highlighted Word</label>
                    <input type="text" name="titleHighlight" value={formData.titleHighlight} onChange={handleChange} className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs font-black text-emerald-700 outline-none focus:border-emerald-400 transition-all shadow-sm" />
                  </div>

                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block flex items-center gap-1.5"><AlignLeft size={12} className="text-emerald-500" /> Description</label>
                    <textarea name="subtitle" value={formData.subtitle} onChange={handleChange} rows="3" className="w-full px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-medium text-slate-600 outline-none focus:border-emerald-400 transition-all shadow-sm resize-none leading-relaxed" />
                  </div>
                </div>

                <div className="bg-slate-50/50 p-5 rounded-[2rem] border border-slate-100 space-y-4">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 block flex items-center gap-1.5"><ImageIcon size={12} className="text-emerald-500" /> Side Illustration</label>
                  <div className="relative group h-44 rounded-2xl overflow-hidden bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-300 transition-all">
                    {formData.formImage ? (
                      <img src={getImageUrl(formData.formImage)} className="w-full h-full object-cover" alt="illustration" />
                    ) : (
                      <ImageIcon className="text-slate-300" size={32} />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white font-black text-[10px] uppercase tracking-widest">
                       {isUploading ? <Loader2 className="animate-spin" size={20} /> : <><UploadCloud size={20} className="mr-2"/> Change Illustration</>}
                    </div>
                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  </div>
                </div>

              
              </div>

              <div className="pt-4 flex justify-end pb-20">
                <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                  <Undo size={14} /> Reset Form
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT PANEL: LIVE MOCKUP PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-8/12' : 'w-full'} bg-slate-50 flex flex-col items-center justify-center p-8 relative overflow-hidden`}>
            
            <div className="w-full max-w-[1200px] h-full bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 flex flex-col">
              
              <div className="flex h-8 bg-slate-900 items-center px-4 gap-1.5 border-b border-slate-800/50 shrink-0">
                 <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" /></div>
                 <div className="flex-1 text-center flex items-center justify-center gap-1.5">
                    <Globe size={10} className="text-slate-600" />
                    <span className="text-[6px] font-bold uppercase tracking-widest text-slate-500">Form Preview</span>
                 </div>
              </div>

              <div className="flex-1 bg-white rounded-xl overflow-y-auto custom-scrollbar relative pointer-events-none origin-top">
                 <div className="scale-90 w-full">
                    <ContactForm 
                      title={formData.title}
                      titleHighlight={formData.titleHighlight}
                      subtitle={formData.subtitle}
                      formImage={getImageUrl(formData.formImage)} 
                      onSubmitAction={() => new Promise(res => setTimeout(res, 500))}
                    />
                 </div>
              </div>
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

export default ContactFormEditor;