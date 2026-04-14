import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchSingleSubsectionContent, 
  updateSingleSubsectionContent, 
  fetchSections 
} from '../../../store/index'; 
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Plus, Trash2, Folder, Monitor, Info, Loader2
} from 'lucide-react';

import BlogCategories from '../../../pages/Blog/BlogCategories'; 

const BlogCategoriesEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const sections = useSelector((state) => state.sections.items);
  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const currentSection = sections.find(s => s.slug === 'blog-categories');
  const subsectionId = currentSection?.id;

  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 

  const [categories, setCategories] = useState([]);
  const [newInput, setNewInput] = useState('');
  const [activePreviewCat, setActivePreviewCat] = useState('All');

  useEffect(() => {
    if (sections.length === 0) dispatch(fetchSections(5));
  }, [dispatch, sections.length]);

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
    if (!newInput.trim()) return;

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
    }
  };

  const handleSave = async () => {
    if (!subsectionId) return alert("Error: Missing Subsection ID.");

    setIsSaving(true);
    try {
      const payload = {
        categories: categories 
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();
      
      alert('Categories synced successfully!');
    } catch (error) {
      console.error("Failed to sync categories:", error);
      alert('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' && categories.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> Loading Categories...
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
            <span className="tracking-tight uppercase">CATEGORY EDITOR</span> 
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
                viewMode === mode.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <mode.icon size={12} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className={`${viewMode === mode.id ? 'inline' : 'hidden sm:inline'}`}>{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave} 
          disabled={isSaving} 
          className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-indigo-600 transition-all flex-shrink-0 disabled:opacity-70 active:scale-95"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin lg:w-[14px] lg:h-[14px]" /> : <Save size={16} className="lg:w-[14px] lg:h-[14px]" />}
          {isSaving ? <span className="hidden md:inline">Syncing...</span> : <span className="hidden md:inline">Sync Data</span>}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-3xl mx-auto border-x' : 'w-full lg:w-[400px] border-r'} bg-white border-slate-200 flex flex-col h-full relative z-20 shadow-2xl shadow-slate-200/50 transition-all duration-300`}>
            
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 scrollbar-hide">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Categories</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage blog filters</p>
              </div>

              <form onSubmit={handleAdd} className="relative flex items-center">
                <input 
                  type="text" placeholder="Type new category..." value={newInput} onChange={(e) => setNewInput(e.target.value)}
                  className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 ring-indigo-100 transition-all shadow-inner"
                />
                <button type="submit" className="absolute right-2 w-9 h-9 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-all shadow-md active:scale-95">
                  <Plus size={16} />
                </button>
              </form>

              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 flex gap-3">
                <Info size={16} className="text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-indigo-900/80 font-semibold leading-relaxed">
                  These categories will appear as horizontal scrollable filters on the main Blog page.
                </p>
              </div>

              <div className="space-y-3">
                {categories.map(cat => (
                  <div key={cat.id} className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <Folder size={16} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                      <h4 className="text-sm font-bold text-slate-900 leading-tight truncate">{cat.name}</h4>
                    </div>
                    <button onClick={() => handleDelete(cat.id)} className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 shrink-0">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                
                {categories.length === 0 && (
                  <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No Categories Found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* RIGHT PANEL */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'hidden lg:flex flex-1'} flex-col h-full bg-zinc-50 relative transition-all duration-300 min-w-0`}>
            
            <div className="h-12 flex items-center justify-center px-6 bg-white border-b border-slate-200 shadow-sm shrink-0">
              <div className="flex items-center gap-2">
                <Monitor size={14} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Component Output</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto w-full p-4 lg:p-10 flex flex-col items-center">
              <div className="w-full max-w-[1000px] space-y-4">
                <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4">How it looks on your website</h3>
                
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-zinc-100">
                   <BlogCategories 
                     categories={categories} 
                     activeCategory={activePreviewCat} 
                     onCategorySelect={(cat) => setActivePreviewCat(cat)} 
                   />
                </div>

                <p className="text-[11px] text-zinc-400 font-medium italic mt-4 pl-4">
                  * Live interactive preview. Click tags to test state changes.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogCategoriesEditor;