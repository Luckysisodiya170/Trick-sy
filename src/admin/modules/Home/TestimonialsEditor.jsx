import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { AdminService } from '../../services/adminService';
import { 
  ArrowLeft, Plus, Trash2, Star, Quote, Sparkles, 
  Eye, Edit3, Columns, User, Upload, MessageSquare, Type, ChevronDown, Settings2, Save, Loader2
} from 'lucide-react';

const TestimonialsEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const subsectionId = location.state?.sectionId || 6; 

  // Fixed Selector
  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [viewMode, setViewMode] = useState('split'); 
  const [activeCard, setActiveCard] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);

  const [headerSettings, setHeaderSettings] = useState({
    badgeText: "Verified Client Stories",
    headingNormal: "Real People.",
    headingHighlight: "Real Results.",
    description: ""
  });

  const [testimonials, setTestimonials] = useState([]);

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith('blob:') || path.startsWith('http')) return path;
    return `http://localhost:5000${path}`;
  };

  // 1. Fetch initial data 
  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  // 2. Sync DB Content to Local State
  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setHeaderSettings({
        badgeText: content.badge || "Verified Client Stories",
        headingNormal: content.title || "Real People.",
        headingHighlight: content.highlightText || "Real Results.",
        description: content.description || ""
      });

      if (content.reviews) {
        const loadedReviews = content.reviews.map((rev, idx) => ({
          ...rev,
          id: rev.id || `testimonial-${Date.now()}-${idx}`, 
          image: content.images?.[idx] || null, 
          file: null
        }));
        setTestimonials(loadedReviews);
      }
    }
  }, [content]);

  const updateReview = (id, field, value) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setTestimonials(testimonials.map(t => t.id === id ? { ...t, image: previewUrl, file: file } : t));
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      const finalImages = [...(content.images || [])];
      
      const uploadImg = async (file) => {
        const fd = new FormData();
        fd.append('image', file); 
        const data = await AdminService.uploadHeroImage(fd);
        if (!data.success) throw new Error("Image Upload Failed");
        return data.imageUrl;
      };

      // Parallel Uploading
      const uploadPromises = testimonials.map(async (t, index) => {
        if (t.file) {
          const url = await uploadImg(t.file);
          finalImages[index] = url;
        } else {
          finalImages[index] = t.image;
        }
      });

      await Promise.all(uploadPromises);

      const payload = {
        badge: headerSettings.badgeText,
        title: headerSettings.headingNormal,
        highlightText: headerSettings.headingHighlight,
        description: headerSettings.description,
        reviews: testimonials.map(t => {
            const clean = { ...t };
            delete clean.image;
            delete clean.file;
            delete clean.id;
            return clean;
        }), 
        images: finalImages.filter(Boolean)
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();

      alert("Testimonials Updated! 🚀");
      navigate('/admin/pages/home');

    } catch (error) {
      alert(`Deploy Failed: ${error.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> INITIALIZING TESTIMONIAL LAB...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[50] bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 w-1/3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-black tracking-tight flex items-center gap-2 italic">
            <Settings2 size={20} className="text-blue-600" /> TESTIMONIAL <span className="text-blue-500">LAB</span>
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-full shadow-inner">
          {['edit', 'split', 'preview'].map(mode => (
            <button key={mode} onClick={() => setViewMode(mode)} className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${viewMode === mode ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
              {mode.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="w-1/3 flex justify-end">
          <button onClick={handleDeploy} disabled={isDeploying} className="bg-slate-900 text-white px-8 py-2.5 rounded-full font-black text-xs flex items-center gap-2 shadow-lg hover:bg-blue-600 transition-all disabled:opacity-50">
            {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} {isDeploying ? 'DEPLOYING...' : 'DEPLOY'}
          </button>
        </div>
      </nav>

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        
        {/* EDITOR SECTION */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-full lg:w-[38%] lg:border-r border-slate-200 lg:h-full lg:overflow-y-auto' : 'w-full h-full lg:overflow-y-auto'} p-8 bg-[#F8FAFC] custom-scrollbar`}>
            <div className="max-w-xl mx-auto space-y-8 pb-10">
              
              <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 border-b border-slate-50 pb-4">
                  <Type size={14} className="text-emerald-500" /> Section Header
                </h3>
                <div className="space-y-4">
                  <input value={headerSettings.badgeText} onChange={(e) => setHeaderSettings({...headerSettings, badgeText: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs font-bold outline-none border border-transparent focus:border-emerald-400" placeholder="Badge Text" />
                  <div className="grid grid-cols-2 gap-3">
                    <input value={headerSettings.headingNormal} onChange={(e) => setHeaderSettings({...headerSettings, headingNormal: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs font-bold outline-none border border-transparent focus:border-emerald-400" placeholder="Heading Normal" />
                    <input value={headerSettings.headingHighlight} onChange={(e) => setHeaderSettings({...headerSettings, headingHighlight: e.target.value})} className="w-full px-4 py-3 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black outline-none border border-transparent focus:border-emerald-400" placeholder="Heading Highlight" />
                  </div>
                  <textarea value={headerSettings.description} onChange={(e) => setHeaderSettings({...headerSettings, description: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs h-24 resize-none outline-none leading-snug border border-transparent focus:border-emerald-400" placeholder="Description..." />
                </div>
              </section>

              <div className="flex items-center justify-between">
                <h2 className="text-xs font-black flex items-center gap-2 uppercase tracking-widest text-slate-500">
                  <MessageSquare size={14} /> Reviews ({testimonials.length})
                </h2>
                <button onClick={() => {
                  const newId = Date.now();
                  setTestimonials([...testimonials, { id: newId, name: 'New Client', role: 'Client', comment: '', rating: 5, image: null, file: null }]);
                  setActiveCard(newId);
                }} className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-slate-900 shadow-md">
                  <Plus size={20} strokeWidth={3} />
                </button>
              </div>

              <div className="space-y-4">
                {testimonials.map((t) => (
                  <div key={t.id} className={`bg-white rounded-2xl border transition-all ${activeCard === t.id ? 'ring-4 ring-emerald-50 border-emerald-200 shadow-xl' : 'border-slate-200'}`}>
                    <div onClick={() => setActiveCard(activeCard === t.id ? null : t.id)} className="p-4 flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                          {t.image ? <img src={getImageUrl(t.image)} className="w-full h-full object-cover" /> : <User size={16} className="text-slate-400" />}
                        </div>
                        <h4 className="font-bold text-xs text-slate-700">{t.name || 'New Review'}</h4>
                      </div>
                      <ChevronDown size={18} className={`text-slate-300 transition-transform ${activeCard === t.id ? 'rotate-180 text-emerald-500' : ''}`} />
                    </div>

                    {activeCard === t.id && (
                      <div className="px-6 pb-6 pt-2 border-t border-slate-50 space-y-4 animate-in fade-in duration-300">
                        <div className="grid grid-cols-2 gap-4">
                          <input value={t.name} onChange={(e) => updateReview(t.id, 'name', e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl text-xs font-bold outline-none" placeholder="Name" />
                          <input value={t.role} onChange={(e) => updateReview(t.id, 'role', e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl text-[10px] font-bold outline-none" placeholder="Role" />
                        </div>
                        <textarea value={t.comment} onChange={(e) => updateReview(t.id, 'comment', e.target.value)} className="w-full p-4 bg-slate-50 rounded-xl text-xs h-24 resize-none outline-none leading-relaxed" placeholder="Comment..." />
                        
                        <div className="flex items-center justify-between">
                           <div className="flex gap-1">
                             {[1,2,3,4,5].map(n => (
                               <Star key={n} size={16} onClick={() => updateReview(t.id, 'rating', n)} className={`cursor-pointer ${t.rating >= n ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                             ))}
                           </div>
                           <div className="flex gap-2">
                             <input type="file" id={`f-${t.id}`} hidden onChange={(e) => handleImageUpload(e, t.id)} />
                             <button onClick={() => document.getElementById(`f-${t.id}`).click()} className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:text-emerald-600 transition-all"><Upload size={16}/></button>
                             <button onClick={() => setTestimonials(testimonials.filter(x => x.id !== t.id))} className="p-2 bg-rose-50 rounded-lg text-rose-500"><Trash2 size={16}/></button>
                           </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PREVIEW SECTION */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:flex-1' : 'w-full h-full'} bg-slate-200 p-8 flex items-center justify-center`}>
            <div className="w-full h-full max-w-5xl bg-white shadow-2xl rounded-[3rem] overflow-hidden flex flex-col border-[12px] border-slate-900 relative">
              <div className="h-10 bg-slate-900 flex items-center px-6 gap-2">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div></div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar bg-white p-12">
                   <div className="text-center mb-16">
                      <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm">{headerSettings.badgeText}</div>
                      <h2 className="text-5xl font-black text-slate-900 mt-6 tracking-tighter leading-tight">
                        {headerSettings.headingNormal} <span className="text-emerald-500">{headerSettings.headingHighlight}</span>
                      </h2>
                      <p className="text-slate-500 mt-4 font-medium max-w-lg mx-auto text-sm">{headerSettings.description}</p>
                   </div>

                   <div className={`grid gap-6 ${viewMode === 'split' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-3'}`}>
                      {testimonials.map((item, idx) => (
                        <div key={idx} className={`p-8 rounded-[2rem] border relative overflow-hidden flex flex-col ${idx % 2 !== 0 ? 'bg-slate-900 text-white border-slate-800 shadow-2xl' : 'bg-slate-50 border-slate-100 shadow-sm'}`}>
                           <Quote className={`absolute top-6 right-8 w-8 h-8 opacity-10 ${idx % 2 !== 0 ? 'text-white' : 'text-emerald-500'}`} />
                           <div className="flex gap-1 mb-6">
                              {[...Array(item.rating)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                           </div>
                           <p className={`font-bold leading-relaxed mb-8 flex-1 text-sm ${idx % 2 !== 0 ? 'text-slate-300' : 'text-slate-600'}`}>"{item.comment}"</p>
                           <div className="flex items-center gap-4 pt-6 border-t" style={{borderColor: idx % 2 !== 0 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}}>
                              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0 border-2 border-white/10">
                                {item.image ? <img src={getImageUrl(item.image)} className="w-full h-full object-cover" /> : <User size={20} className="m-auto mt-3 text-slate-400" />}
                              </div>
                              <div className="overflow-hidden">
                                 <h4 className={`font-black text-sm truncate ${idx % 2 !== 0 ? 'text-white' : 'text-slate-900'}`}>{item.name}</h4>
                                 <p className={`text-[10px] font-black uppercase tracking-widest ${idx % 2 !== 0 ? 'text-emerald-400' : 'text-slate-400'}`}>{item.role}</p>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default TestimonialsEditor;