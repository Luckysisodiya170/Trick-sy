import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Plus, Trash2, Folder, Monitor, Info, Loader2
} from 'lucide-react';

const BlogCategoriesEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const subsectionId = id ? parseInt(id, 10) : 31; 

  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 

  const [categories, setCategories] = useState([]);
  const [newInput, setNewInput] = useState('');
  const [activePreviewCat, setActivePreviewCat] = useState('All');

  useEffect(() => {
    if (subsectionId) dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content?.categories) {
      setCategories(content.categories);
    }
  }, [content]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newInput.trim() || newInput.length > 20) return;

    const newCat = {
      id: `new-${Date.now()}`, 
      name: newInput.trim()
    };
    
    setCategories([...categories, newCat]);
    setNewInput('');
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
      if (categories.find(c => c.id === id)?.name === activePreviewCat) setActivePreviewCat('All');
    }
  };

  const handleSave = async () => {
    if (!subsectionId) return alert("Error: Missing Subsection ID.");

    setIsSaving(true);
    try {
      const payload = { categories: categories };
      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      navigate('/admin/pages/blog');
      alert('Categories synced successfully! 🚀');
    } catch (error) {
      alert('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' && categories.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING CATEGORY LAB...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#FDFDFD] font-sans overflow-hidden selection:bg-indigo-100">
      
      {/* NAVBAR */}
      <nav className="h-16 sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-900">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-[12px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <Settings2 size={16} className="text-indigo-600" /> Category <span className="text-indigo-400">Lab</span>
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
          disabled={isSaving} 
          className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          <span>{isSaving ? 'SAVING...' : 'SYNC DATA'}</span>
        </button>
      </nav>

      <div className={`mx-auto w-full transition-all duration-700 h-[calc(100vh-64px)] flex ${viewMode === 'split' ? 'flex-row' : 'flex-col'} overflow-hidden`}>
        
        {/* LEFT PANEL */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-4/12 border-r border-slate-100' : 'w-full max-w-4xl mx-auto mt-8 border rounded-[2rem]'} bg-white flex flex-col h-full relative z-20 shadow-2xl shadow-slate-200/50 transition-all duration-300 overflow-hidden`}>
            
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 custom-scrollbar">
              <div>
                <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase mb-1">Categories</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage blog filters</p>
              </div>

              <form onSubmit={handleAdd} className="relative flex items-center">
                <input 
                  type="text" placeholder="Type new category..." value={newInput} onChange={(e) => setNewInput(e.target.value)} maxLength={20}
                  className="w-full pl-5 pr-12 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-indigo-400 transition-all shadow-inner"
                />
                <button type="submit" className="absolute right-1 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-all shadow-md active:scale-95">
                  <Plus size={16} />
                </button>
              </form>

              <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex gap-3">
                <Info size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-indigo-900/80 font-bold leading-relaxed">
                  These categories appear as horizontal scrollable filters on the main Blog page.
                </p>
              </div>

              <div className="space-y-3 pb-20">
                {categories.map(cat => (
                  <div key={cat.id} className="bg-white border border-slate-100 p-3 rounded-xl shadow-sm flex items-center justify-between group hover:border-indigo-200 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 transition-colors">
                         <Folder size={14} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                      </div>
                      <h4 className="text-xs font-black text-slate-800 leading-tight truncate">{cat.name}</h4>
                    </div>
                    <button onClick={() => handleDelete(cat.id)} className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                
                {categories.length === 0 && (
                  <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-[2rem]">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">No Categories Found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* RIGHT PANEL: MOCKUP PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-8/12' : 'w-full'} bg-slate-50 flex flex-col items-center justify-center p-8 relative overflow-hidden`}>
            
            <div className="w-full max-w-[1000px] h-[500px] bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 flex flex-col">
              
              <div className="flex h-8 bg-slate-900 items-center px-4 gap-1.5 border-b border-slate-800/50 shrink-0">
                 <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                 </div>
                 <div className="flex-1 text-center"><span className="text-[6px] font-bold uppercase tracking-widest text-slate-500">Live Component Output</span></div>
              </div>

              <div className="flex-1 bg-white rounded-xl overflow-hidden relative flex flex-col pointer-events-auto">
                 <div className="p-10 w-full h-full flex flex-col items-center justify-center bg-slate-50/50">
                    
                    <div className="w-full max-w-2xl bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 text-center">
                       <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Website Filter Simulation</h3>
                       
                       <div className="flex flex-wrap items-center justify-center gap-3">
                          <button 
                             onClick={() => setActivePreviewCat('All')} 
                             className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${activePreviewCat === 'All' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-indigo-300'}`}
                          >
                             All
                          </button>
                          {categories.map(cat => (
                             <button 
                                key={cat.id} 
                                onClick={() => setActivePreviewCat(cat.name)} 
                                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${activePreviewCat === cat.name ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-indigo-300'}`}
                             >
                                {cat.name}
                             </button>
                          ))}
                       </div>
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-8">Click tags to test state</p>
                    </div>

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

export default BlogCategoriesEditor;