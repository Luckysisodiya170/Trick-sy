import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { AdminService } from '../../services/adminService';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Plus, Trash2, Search, Type, AlignLeft, ChevronLeft, Globe, Lock, Monitor, Loader2, UploadCloud,ImageIcon
} from 'lucide-react';

import BlogCard from '../../../pages/Blog/BlogCard'; 

const BlogPostsEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);
  const subsectionId = parseInt(id, 10);

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 
  const [editingPostId, setEditingPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (subsectionId) dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content?.posts) {
      setPosts(content.posts.map(post => ({ ...post, status: post.status || 'Published' })));
    }
  }, [content]);

  const activePost = posts.find(p => p.id.toString() === editingPostId?.toString());

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    const domain = apiBase.replace('/api', ''); 
    return `${domain}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  const handleAddNewPost = () => {
    const newPost = {
      id: `new-${Date.now()}`,
      slug: `new-post-${Date.now()}`,
      title: 'New Draft Article',
      category: 'Uncategorized',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: '/upload/images/default-hero.png', 
      status: 'Draft',
      excerpt: '',
      blocks: []
    };
    setPosts([newPost, ...posts]);
    setEditingPostId(newPost.id);
  };

  const handleDeletePost = (id, e) => {
    e.stopPropagation();
    if(window.confirm('Delete this article?')) {
      setPosts(posts.filter(p => p.id !== id));
      if (editingPostId === id) setEditingPostId(null);
    }
  };

  const handleFieldChange = (field, value, limit) => {
    if (limit && value.length > limit) return;
    setPosts(posts.map(p => p.id.toString() === editingPostId?.toString() ? { ...p, [field]: value } : p));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await AdminService.uploadHeroImage(formData);
      if (res.success || res.imageUrl) {
        handleFieldChange('image', res.imageUrl);
      }
    } catch (error) {
      alert("Upload failed.");
    } finally { setIsUploading(false); }
  };

  const handleSave = async () => {
    if (!subsectionId || isNaN(subsectionId)) return alert("Error: Invalid Subsection ID.");
    setIsSaving(true);
    try {
      const allImages = posts.map(p => p.image).filter(img => img && !img.startsWith('http'));
      const payload = { posts, images: [...new Set(allImages)] };
      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      navigate('/admin/pages/blog');
      alert('Posts synced successfully! 🚀');
    } catch (error) {
      alert('Save failed.');
    } finally { setIsSaving(false); }
  };

  const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (status === 'loading' && posts.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING ARTICLES...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#FDFDFD] font-sans overflow-hidden selection:bg-indigo-100">
      
      <nav className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between shadow-sm z-50 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-900">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-[12px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <Settings2 size={16} className="text-indigo-600" /> Posts <span className="text-indigo-400">Manager</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <mode.icon size={12} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button onClick={handleSave} disabled={isSaving || isUploading} className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-2 disabled:opacity-50">
          {(isSaving || isUploading) ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          <span>{isSaving ? 'SAVING...' : 'SYNC POSTS'}</span>
        </button>
      </nav>

      <div className={`mx-auto w-full transition-all duration-700 h-[calc(100vh-64px)] flex ${viewMode === 'split' ? 'flex-row' : 'flex-col'} overflow-hidden`}>
        
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-4/12 border-r border-slate-100' : 'w-full max-w-4xl mx-auto mt-8 border rounded-[2rem]'} bg-white flex flex-col h-full overflow-hidden z-10 transition-all duration-300 shadow-2xl shadow-slate-200/50`}>
            
            {!editingPostId ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-6 border-b border-slate-50 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">Articles Library</h2>
                    <button onClick={handleAddNewPost} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100 active:scale-95">
                      <Plus size={14}/> Add New
                    </button>
                  </div>
                  <div className="relative">
                    <input type="text" placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 focus:border-indigo-400 focus:bg-white outline-none transition-all" />
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50/30 custom-scrollbar">
                  {filteredPosts.map(post => (
                    <div key={post.id} onClick={() => setEditingPostId(post.id)} className="bg-white border border-slate-100 p-3 rounded-2xl shadow-sm hover:border-indigo-300 hover:shadow-md transition-all flex items-center gap-3 cursor-pointer group">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-50">
                         <img src={getImageUrl(post.image)} className="w-full h-full object-cover" alt="cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-black text-slate-800 truncate mb-1 group-hover:text-indigo-600 transition-colors">{post.title}</h4>
                        <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-400">
                          <span className={post.status === 'Published' ? 'text-emerald-500' : 'text-amber-500'}>{post.status}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <button onClick={(e) => handleDeletePost(post.id, e)} className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/30">
                <div className="p-5 border-b border-slate-100 bg-white flex items-center justify-between shrink-0">
                  <button onClick={() => setEditingPostId(null)} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-all px-3 py-1.5 rounded-lg">
                    <ChevronLeft size={14}/> Back to list
                  </button>
                  <button onClick={handleAddNewPost} className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                    + New Article
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
                    {/* INPUT BOX 1: TITLE */}
                    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mb-1"><Type size={12} className="text-indigo-500"/> Article Title</label>
                      <input type="text" value={activePost.title} onChange={(e) => handleFieldChange('title', e.target.value, 80)} className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-400 transition-all outline-none" />
                    </div>
                    
                    {/* INPUT BOX 2: CATEGORY */}
                    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mb-1"><Globe size={12} className="text-indigo-500"/> Category</label>
                      <input type="text" value={activePost.category} onChange={(e) => handleFieldChange('category', e.target.value, 30)} className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-400 transition-all outline-none" />
                    </div>

                    {/* INPUT BOX 3: IMAGE UPLOAD */}
                    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5"><ImageIcon size={12} className="text-indigo-500"/> Cover Photo</label>
                      <div className="relative group aspect-video rounded-2xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-300 transition-all">
                        <img src={getImageUrl(activePost.image)} className="w-full h-full object-cover" alt="cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white font-bold text-[10px] uppercase tracking-widest">
                           {isUploading ? <Loader2 size={16} className="animate-spin" /> : <><UploadCloud size={20} className="mr-2"/> Change Image</>}
                        </div>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      </div>
                    </div>

                    {/* INPUT BOX 4: EXCERPT */}
                    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mb-1"><AlignLeft size={12} className="text-indigo-500"/> Excerpt (Short Intro)</label>
                      <textarea value={activePost.excerpt} placeholder="Brief summary of the article..." onChange={(e) => handleFieldChange('excerpt', e.target.value, 200)} rows="3" className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-medium text-slate-600 resize-none focus:bg-white focus:border-indigo-400 transition-all outline-none leading-relaxed" />
                    </div>

                    {/* STATUS SELECT: AT THE BOTTOM */}
                    <div className="flex items-center justify-between px-4 pb-20">
                       <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Publishing Control —</span>
                       <select value={activePost.status} onChange={(e) => handleFieldChange('status', e.target.value)} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-slate-100 bg-white text-indigo-600 shadow-sm outline-none focus:ring-2 ring-indigo-100 cursor-pointer">
                        <option value="Draft">Draft Mode</option>
                        <option value="Published">Live Status</option>
                      </select>
                    </div>
                </div>
              </div>
            )}
          </div>
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-8/12' : 'w-full'} bg-slate-50 flex flex-col items-center justify-center p-8 relative overflow-hidden`}>
            <div className="w-full max-w-[1200px] h-full bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 flex flex-col">
              <div className="flex h-8 bg-slate-900 items-center px-4 gap-1.5 border-b border-slate-800/50 shrink-0">
                 <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" /></div>
                 <div className="flex-1 text-center"><span className="text-[6px] font-bold uppercase tracking-widest text-slate-500">Live Grid Preview</span></div>
              </div>
              <div className="flex-1 bg-zinc-50 rounded-xl overflow-y-auto custom-scrollbar relative p-10 pointer-events-none">
                 <div className="scale-95 origin-top w-full mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                      {posts.filter(p => p.status === 'Published').map((post) => (
                        <div key={post.id} className="transition-all"><BlogCard post={{...post, image: getImageUrl(post.image)}} /></div>
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

export default BlogPostsEditor;