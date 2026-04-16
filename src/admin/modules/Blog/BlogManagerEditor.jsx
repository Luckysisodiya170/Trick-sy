import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent, fetchSections } from '../../../store/index'; 
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Monitor, LayoutTemplate, FileText, Search,
  Trash2, Globe, Lock, Type, Loader2
} from 'lucide-react';

import BlogHero from '../../../pages/Blog/BlogHero'; 
import BlogCard from '../../../pages/Blog/BlogCard'; 

const BlogManagerEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Redux Selectors
  const sections = useSelector((state) => state.sections.items);
  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const currentSection = sections.find(s => s.slug === 'blog-hero');
  const subsectionId = id || currentSection?.id; 

  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState('split');
  const [activeTab, setActiveTab] = useState('posts'); 

  const [posts, setPosts] = useState([]);

  const [heroData, setHeroData] = useState({
    badgeText: '',
    mainTitle: '',
    highlightTitle: '',
    subtitle: ''
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
      setHeroData({
        badgeText: content.badgeText || '',
        mainTitle: content.titleLine1 || '',
        highlightTitle: content.titleHighlight || '',
        subtitle: content.description || ''
      });
      
      if (content.posts) {
        setPosts(content.posts);
      }
    }
  }, [content]);

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setHeroData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!subsectionId) {
      alert("Error: Missing Subsection ID. Please check routing.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        badgeText: heroData.badgeText,
        titleLine1: heroData.mainTitle,
        titleHighlight: heroData.highlightTitle,
        description: heroData.subtitle,
        posts: posts 
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();
navigate('/admin/pages/blog');

      alert("Blog Manager settings updated successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePost = (postId) => {
    if(window.confirm('Move this post to trash?')) {
      setPosts(posts.filter(p => p.id !== postId));
    }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> Loading Blog Manager...
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
            <span className="tracking-tight uppercase">BLOG MANAGER</span> 
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full flex-shrink-1 mx-2">
          {[
            { id: 'edit', icon: Edit3, label: 'Edit' }, 
            { id: 'split', icon: Columns, label: 'Split' }, 
            { id: 'preview', icon: Eye, label: 'Preview' }
          ].map((mode) => (
            <button 
              key={mode.id} onClick={() => setViewMode(mode.id)} 
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
          className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-indigo-600 transition-all flex-shrink-0 disabled:opacity-70 disabled:hover:bg-slate-900 active:scale-95"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin lg:w-[14px] lg:h-[14px]" /> : <Save size={16} className="lg:w-[14px] lg:h-[14px]" />}
          {isSaving ? <span className="hidden md:inline">Saving...</span> : <span className="hidden md:inline">Save Changes</span>}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-4xl mx-auto border-x' : 'w-full lg:w-[480px] border-r'} bg-white border-slate-200 flex flex-col h-full relative z-20 shadow-2xl shadow-slate-200/50 transition-all duration-300`}>
            
            <div className="flex px-6 pt-6 border-b border-slate-100 gap-6">
               <button onClick={() => setActiveTab('posts')} className={`pb-4 text-[11px] font-black uppercase tracking-widest flex items-center gap-2 border-b-2 transition-all ${activeTab === 'posts' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>
                 <FileText size={16} /> Articles
               </button>
               <button onClick={() => setActiveTab('hero')} className={`pb-4 text-[11px] font-black uppercase tracking-widest flex items-center gap-2 border-b-2 transition-all ${activeTab === 'hero' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>
                 <LayoutTemplate size={16} /> Hero Layout
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide bg-slate-50/30">
              
              {/* TAB 1: POSTS */}
              {activeTab === 'posts' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-black text-slate-900 tracking-tight mb-0.5">All Articles</h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{posts.length} Posts</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {posts.map(post => (
                      <div key={post.id} className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${post.status === 'Published' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 text-slate-400'}`}>
                            {post.status === 'Published' ? <Globe size={16} /> : <Lock size={16} />}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 mb-1 leading-tight line-clamp-1 group-hover:text-indigo-600 cursor-pointer">{post.title}</h4>
                            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              <span className={post.status === 'Published' ? 'text-emerald-500' : 'text-amber-500'}>{post.status}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                              <span>{post.date}</span>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => handleDeletePost(post.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={14} /></button>
                      </div>
                    ))}
                    
                    {posts.length === 0 && (
                       <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl">
                         <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No Articles Found</p>
                       </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: HERO */}
              {activeTab === 'hero' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="space-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <div>
                      <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2"><Type size={12} /> Badge Text</label>
                      <input type="text" name="badgeText" value={heroData.badgeText} onChange={handleHeroChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all shadow-inner" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2"><Type size={12} /> Main Title</label>
                      <input type="text" name="mainTitle" value={heroData.mainTitle} onChange={handleHeroChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all shadow-inner" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2"><Type size={12} /> Highlighted Word</label>
                      <input type="text" name="highlightTitle" value={heroData.highlightTitle} onChange={handleHeroChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 ring-emerald-100 focus:bg-white transition-all shadow-inner" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2"><Type size={12} /> Subtitle Description</label>
                      <textarea name="subtitle" value={heroData.subtitle} onChange={handleHeroChange} rows="3" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all shadow-inner resize-none"></textarea>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* RIGHT PANEL: PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'hidden lg:flex flex-1'} flex-col h-full bg-slate-100/50 relative transition-all duration-300`}>
            
            <div className="h-12 flex items-center justify-between px-6 bg-white border-b border-slate-200 shadow-sm shrink-0">
              <div className="flex items-center gap-2">
                <Monitor size={14} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Output</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto w-full flex flex-col items-center justify-start p-0 lg:p-4">
              <div className="w-full max-w-[1200px] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300/50 border-4 border-white/50 bg-zinc-50 relative h-full flex flex-col pointer-events-none">
                
                {/* HERO COMPONENT PREVIEW */}
                <div className="shrink-0 bg-white">
                   <BlogHero {...heroData} />
                </div>

                {/* POSTS GRID PREVIEW */}
                <div className="p-10 flex-1 bg-zinc-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {posts.map(post => (
                        <BlogCard key={post.id} post={post} />
                     ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogManagerEditor;