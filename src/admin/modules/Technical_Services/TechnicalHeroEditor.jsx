import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent, fetchSections } from '../../../store/index'; 
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Type, AlignLeft, Monitor, Undo, Upload, Loader2
} from 'lucide-react';

import TechnicalHero from '../../../pages/Technicalservice/TechnicalHero'; 

const TechnicalHeroEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const fileInputRef = useRef(null);
  
  const sections = useSelector((state) => state.sections.items);
  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const currentSection = sections.find(s => s.slug === 'tech-hero');
  const subsectionId = id || currentSection?.id || 22;

  const [viewMode, setViewMode] = useState('split'); 
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    badgeText: '',
    titlePart1: '',
    titleAccent: '',
    description: '',
    bgImage: null 
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
        description: content.description || '',
        bgImage: content.images?.[0] || null
      });
    }
  }, [content]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith('http') || imagePath.startsWith('blob:') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    return `http://localhost:5000${imagePath}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (formData.bgImage && formData.bgImage.startsWith('blob:')) {
        URL.revokeObjectURL(formData.bgImage);
      }
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, bgImage: imageUrl }));
    }
  };

  const handleReset = () => {
    if(window.confirm('Reset to saved values?')) {
      setFormData({
        badgeText: content.badgeText || '',
        titlePart1: content.titleLine1 || '',
        titleAccent: content.titleHighlight || '',
        description: content.description || '',
        bgImage: content.images?.[0] || null
      });
      setImageFile(null);
    }
  };

  const handleSave = async () => {
    if (!subsectionId) {
      alert("Error: Missing Subsection ID. Please check routing.");
      return;
    }

    setIsSaving(true);
    try {
      let finalImageUrl = formData.bgImage;

      if (imageFile) {
        const formDataUpload = new FormData();
        formDataUpload.append('heroImage', imageFile); 
        
        const token = localStorage.getItem('tricksyAdminToken');

        const uploadRes = await fetch('http://localhost:5000/api/upload/upload-hero', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}` 
          },
          body: formDataUpload,
        });
        
        const uploadData = await uploadRes.json();
        
        if (uploadData.success) {
          finalImageUrl = uploadData.imageUrl; 
        } else {
          throw new Error(uploadData.message || "Upload Failed");
        }
      }

      const payload = {
        badgeText: formData.badgeText,
        titleLine1: formData.titlePart1,
        titleHighlight: formData.titleAccent,
        description: formData.description,
        images: finalImageUrl?.startsWith('blob:') ? content.images : [finalImageUrl].filter(Boolean)
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();

      setImageFile(null);
      alert("Technical Hero Content Updated Successfully!");
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> Loading Technical Hero...
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
            <Settings2 size={18} className="text-emerald-600 lg:w-5 lg:h-5" /> 
            <span className="tracking-tight uppercase">TECH HERO EDITOR</span> 
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
                viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <mode.icon size={12} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className={`${viewMode === mode.id ? 'inline' : 'hidden sm:inline'}`}>{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave} disabled={isSaving}
          className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-emerald-600 transition-all flex-shrink-0 disabled:opacity-70 disabled:hover:bg-slate-900 active:scale-95"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin lg:w-[14px] lg:h-[14px]" /> : <Save size={16} className="lg:w-[14px] lg:h-[14px]" />}
          {isSaving ? <span className="hidden md:inline">Saving...</span> : <span className="hidden md:inline">Save Changes</span>}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden relative">
        
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'flex-1 bg-[#F1F3F5] flex items-center justify-center p-6 lg:p-10' : 'w-full lg:w-[420px] border-r bg-white'} flex flex-col h-full shrink-0 z-20 transition-all duration-300`}>
            
            <div className={`${viewMode === 'edit' ? 'w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl flex flex-col h-full overflow-hidden border border-slate-200' : 'w-full h-full flex flex-col shadow-inner'}`}>
              <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 custom-scrollbar">
                
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Technical Hero</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage banner details</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                      <Type size={12} /> Badge Text
                    </label>
                    <input 
                      type="text" name="badgeText" value={formData.badgeText} onChange={handleChange} 
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-emerald-100 focus:bg-white transition-all shadow-inner" 
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                      <Type size={12} /> Main Title (White Text)
                    </label>
                    <input 
                      type="text" name="titlePart1" value={formData.titlePart1} onChange={handleChange} 
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-emerald-100 focus:bg-white transition-all shadow-inner uppercase" 
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                      <Type size={12} /> Highlighted Title (Emerald)
                    </label>
                    <input 
                      type="text" name="titleAccent" value={formData.titleAccent} onChange={handleChange} 
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-emerald-100 focus:bg-white transition-all shadow-inner uppercase" 
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                      <AlignLeft size={12} /> Description Paragraph
                    </label>
                    <textarea 
                      name="description" value={formData.description} onChange={handleChange} rows="4" 
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-emerald-100 focus:bg-white transition-all shadow-inner resize-none leading-relaxed"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                     <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                      <Upload size={12} /> Background Image (Optional)
                    </label>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                    <div onClick={() => fileInputRef.current.click()} className="w-full h-32 border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl flex flex-col items-center justify-center group hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer overflow-hidden relative">
                      {formData.bgImage ? (
                        <>
                          <img src={getImageUrl(formData.bgImage)} className="w-full h-full object-cover opacity-60" alt="bg" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">Change Image</div>
                        </>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto text-slate-300 mb-2 group-hover:text-emerald-400 transition-colors" />
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">Upload Custom Cover</p>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end shrink-0">
                <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                  <Undo size={14} /> Reset Form
                </button>
              </div>
            </div>
          </div>
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'hidden lg:flex flex-1'} flex-col h-full bg-slate-100/50 relative transition-all duration-300`}>
            
            <div className="h-12 flex items-center justify-center gap-2 bg-white border-b border-slate-200 shadow-sm shrink-0 z-10">
              <Monitor size={14} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Output</span>
            </div>

            <div className="flex-1 overflow-y-auto w-full flex items-start justify-center p-4 lg:p-8 custom-scrollbar">
              <div className={`w-full max-w-[1400px] bg-slate-900 rounded-[2.5rem] border-[10px] border-slate-900 shadow-2xl overflow-hidden relative transition-all duration-500 transform ${viewMode === 'preview' ? 'scale-100' : 'scale-[0.85] origin-top'}`}>
                
                {/* BLACK BROWSER BAR */}
                <div className="h-10 bg-slate-800 flex items-center px-6 gap-2">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div></div>
                  <div className="mx-auto w-64 h-5 bg-slate-700 rounded-md text-[9px] text-slate-500 flex items-center justify-center font-bold uppercase tracking-widest">tricksy-preview.io</div>
                </div>

                <div className="relative overflow-y-auto max-h-[80vh] bg-white custom-scrollbar">
                  <div className="absolute top-6 right-6 z-[100] flex gap-3 opacity-0 hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={() => setViewMode('edit')} 
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full shadow-lg transition-all"
                    >
                      <Edit3 size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Edit Content</span>
                    </button>
                    {viewMode !== 'split' && (
                      <button 
                        onClick={() => setViewMode('split')} 
                        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-full shadow-lg shadow-emerald-500/30 transition-all"
                      >
                        <Columns size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Split View</span>
                      </button>
                    )}
                  </div>

                  <TechnicalHero {...formData} bgImage={getImageUrl(formData.bgImage)} />
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TechnicalHeroEditor;