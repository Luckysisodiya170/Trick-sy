import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchSingleSubsectionContent, 
  updateSingleSubsectionContent, 
  fetchSections 
} from '../../../store/index'; 
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Type, AlignLeft, Monitor, Undo, FormInput, UploadCloud, Loader2
} from 'lucide-react';
import ContactForm from '../../../pages/Contact/ContactForm'; 

const ContactFormEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  // 1. Redux Selectors
  const sections = useSelector((state) => state.sections.items);
  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const currentSection = sections.find(s => s.slug === 'contact-form');
  const subsectionId = id || currentSection?.id; 

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 

  const [formData, setFormData] = useState({
    title: '',
    titleHighlight: '',
    subtitle: '',
    formImage: ''
  });

  // 2. Initial Fetching
  useEffect(() => {
    if (sections.length === 0) dispatch(fetchSections(6)); 
  }, [dispatch, sections.length]);

  useEffect(() => {
    if (subsectionId) dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  // 3. Map Content to Form State
  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setFormData({
        title: content.title || 'Request',
        titleHighlight: content.titleHighlight || 'Service',
        subtitle: content.description || 'Fill the details below.',
        formImage: content.images?.[0] || '' // Database stores relative path
      });
    }
  }, [content]);

  // Dynamic Image URL Resolver
  const getImageUrl = (path) => {
    if(!path) return "";
    if(path.startsWith('http') || path.startsWith('data:')) return path;
    
    // Use ENV variable but remove /api if it exists for static file serving
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    const domain = apiBase.replace('/api', ''); 
    return `${domain}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 4. FIXED: Image Upload Logic (Saves Relative Path)
  const handleImageChange = async (e) => {
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
        // VVIP: We save ONLY the relative path (e.g., "/upload/images/...")
        const relativePath = uploadData.imageUrl; 
        setFormData(prev => ({ ...prev, formImage: relativePath }));
      } else {
        alert("Upload failed: " + uploadData.message);
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

  // 5. Save Logic (Stores in standard JSON columns)
  const handleSave = async () => {
    if (!subsectionId) return alert("Error: Missing Subsection ID.");

    setIsSaving(true);
    try {
      const payload = {
        title: formData.title,
        titleHighlight: formData.titleHighlight,
        description: formData.subtitle,
        images: formData.formImage ? [formData.formImage] : [] // Relative path goes to DB
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();

      alert('Form settings updated successfully!');
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> Loading Form Configuration...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden">
      
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-3 lg:px-6 py-3 flex items-center justify-between shadow-sm gap-2 shrink-0">
        <div className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm lg:text-lg font-black tracking-tighter italic flex items-center gap-1.5">
            <Settings2 size={18} className="text-indigo-600 lg:w-5 lg:h-5" /> 
            <span className="tracking-tight uppercase">FORM EDITOR</span> 
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full flex-shrink-1 mx-2">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-3 lg:px-5 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs font-bold transition-all whitespace-nowrap ${viewMode === mode.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
              <mode.icon size={12} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className={`${viewMode === mode.id ? 'inline' : 'hidden sm:inline'}`}>{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave} disabled={isSaving || isUploading}
          className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-indigo-600 transition-all flex-shrink-0 disabled:opacity-70 active:scale-95"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>{isSaving ? 'Updating...' : 'Save Changes'}</span>
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden relative">
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-4xl mx-auto border-x' : 'w-full lg:w-[420px] border-r'} bg-white border-slate-200 flex flex-col h-full relative z-20 shadow-2xl transition-all duration-300`}>
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 scrollbar-hide">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Form Header Settings</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage titles and illustrations</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2"><Type size={12} /> Main Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100" />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2"><Type size={12} /> Highlighted Title</label>
                  <input type="text" name="titleHighlight" value={formData.titleHighlight} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-emerald-100" />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2"><AlignLeft size={12} /> Subtitle Description</label>
                  <textarea name="subtitle" value={formData.subtitle} onChange={handleChange} rows="3" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 resize-none leading-relaxed"></textarea>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2"><UploadCloud size={12} /> Side Illustration</label>
                  <div className="relative group h-40 rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
                    <img src={getImageUrl(formData.formImage)} className="w-full h-full object-cover" alt="illustration" />
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white font-bold text-xs pointer-events-none">
                       {isUploading ? 'Uploading...' : 'Replace Image'}
                    </div>

                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" 
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3">
                   <FormInput size={18} className="text-slate-400 mt-0.5" />
                   <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                     Form logic and input fields are pre-configured. Use this editor to customize brand identity.
                   </p>
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

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'hidden lg:flex flex-1'} flex-col h-full bg-slate-100 relative transition-all duration-300`}>
            <div className="h-12 flex items-center justify-center gap-2 bg-white border-b border-slate-200 shadow-sm shrink-0">
              <Monitor size={14} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Output</span>
            </div>
            <div className="flex-1 overflow-y-auto w-full flex items-start justify-center p-6 lg:p-12">
              <div className="w-full max-w-[1100px] origin-top scale-[0.85]">
                <ContactForm 
                  title={formData.title}
                  titleHighlight={formData.titleHighlight}
                  subtitle={formData.subtitle}
                  formImage={getImageUrl(formData.formImage)} // Resolving URL for component
                  onSubmitAction={() => new Promise(res => setTimeout(res, 1000))}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactFormEditor;