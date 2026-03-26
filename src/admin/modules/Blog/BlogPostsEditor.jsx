import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Plus, Trash2, Search, Calendar, Clock, Image as ImageIcon,
  Type, AlignLeft, ChevronLeft, Globe, Lock, Monitor
} from 'lucide-react';

import BlogCard from '../../../pages/Blog/BlogCard'; 
import { blogPosts as initialData } from '../../../data/blogData';

const BlogPostsEditor = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 
  const [editingPostId, setEditingPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [posts, setPosts] = useState(
    initialData.map(post => ({
      ...post,
      status: post.status || 'Published'
    }))
  );

  const activePost = posts.find(p => p.id.toString() === editingPostId?.toString());

  // Handlers
  const handleAddNewPost = () => {
    const newPost = {
      id: Date.now(),
      slug: `new-post-${Date.now()}`,
      title: 'New Draft Article',
      category: 'Uncategorized',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
      excerpt: 'Write a brief description...',
      status: 'Draft'
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

  const handleFieldChange = (field, value) => {
    setPosts(posts.map(p => p.id.toString() === editingPostId?.toString() ? { ...p, [field]: value } : p));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    alert('Synced successfully!');
  };

  const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="h-screen flex flex-col bg-[#FDFDFD] font-sans overflow-hidden">
      
      {/* NAVBAR */}
      <nav className="h-16 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm z-50 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-black tracking-tighter italic flex items-center gap-1.5 uppercase">
            <Settings2 size={18} className="text-indigo-600" /> 
            <span>POSTS MANAGER</span> 
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}>
              <mode.icon size={12} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button onClick={handleSave} disabled={isSaving} className="bg-slate-900 text-white px-6 py-2 rounded-full font-black text-xs shadow-lg hover:bg-indigo-600 transition-all">
          {isSaving ? 'Saving...' : 'Sync Changes'}
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-4xl mx-auto' : 'w-[320px] shrink-0 border-r border-slate-200'} bg-white flex flex-col h-full overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10`}>
            
            {!editingPostId ? (
              // LIST VIEW
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-3 border-b border-slate-100 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-black text-slate-900 tracking-tight">Articles</h2>
                    <button onClick={handleAddNewPost} className="bg-indigo-50 text-indigo-600 p-1.5 rounded-md hover:bg-indigo-600 hover:text-white transition-all">
                      <Plus size={14}/>
                    </button>
                  </div>
                  <div className="relative">
                    <input type="text" placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-7 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[10px] font-medium focus:border-indigo-400 focus:ring-1 ring-indigo-50 outline-none transition-all" />
                    <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-2 space-y-1.5 bg-slate-50/50">
                  {filteredPosts.map(post => (
                    <div key={post.id} onClick={() => setEditingPostId(post.id)} className="bg-white border border-slate-200 p-1.5 rounded-lg shadow-sm hover:border-indigo-300 transition-all flex items-center gap-2.5 cursor-pointer group">
                      <img src={post.image} className="w-8 h-8 rounded-md object-cover border border-slate-100" alt="cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[11px] font-bold text-slate-800 truncate group-hover:text-indigo-600 mb-0.5">{post.title}</h4>
                        <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-wider text-slate-400">
                          <span className={post.status === 'Published' ? 'text-emerald-500' : 'text-amber-500'}>{post.status}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <button onClick={(e) => handleDeletePost(post.id, e)} className="p-1 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded opacity-0 group-hover:opacity-100 transition-all">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                  
                  {filteredPosts.length === 0 && (
                    <div className="text-center p-6 text-slate-400">
                      <Search size={20} className="mx-auto mb-2 opacity-50" />
                      <p className="text-[10px] font-medium">No posts found.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // EDIT VIEW
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-2.5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between shrink-0">
                  <button onClick={() => setEditingPostId(null)} className="flex items-center gap-1 px-1.5 py-1 rounded hover:bg-white border border-transparent hover:border-slate-200 text-[10px] font-bold text-slate-600 hover:text-indigo-600 transition-all">
                    <ChevronLeft size={12}/> Back
                  </button>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Status:</span>
                    <select value={activePost.status} onChange={(e) => handleFieldChange('status', e.target.value)} className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border border-slate-200 bg-white text-slate-700 outline-none focus:border-indigo-400 cursor-pointer">
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 pb-20">
                    <div className="space-y-3">
                      
                      {/* Title */}
                      <div>
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1 mb-1 ml-0.5"><Type size={9} /> Article Title</label>
                        <input type="text" value={activePost.title} onChange={(e) => handleFieldChange('title', e.target.value)} className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[11px] font-bold text-slate-800 focus:bg-white focus:border-indigo-400 outline-none transition-all" />
                      </div>
                      
                      {/* Grid Inputs */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1 mb-1 ml-0.5"><Globe size={9}/> Category</label>
                          <input type="text" value={activePost.category} onChange={(e) => handleFieldChange('category', e.target.value)} className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[10px] font-bold text-slate-700 focus:bg-white focus:border-indigo-400 outline-none transition-all" />
                        </div>
                        <div>
                          <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1 mb-1 ml-0.5"><Clock size={9}/> Read Time</label>
                          <input type="text" value={activePost.readTime} onChange={(e) => handleFieldChange('readTime', e.target.value)} className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[10px] font-bold text-slate-700 focus:bg-white focus:border-indigo-400 outline-none transition-all" />
                        </div>
                      </div>

                      {/* Cover Image URL */}
                      <div>
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1 mb-1 ml-0.5"><ImageIcon size={9}/> Cover Image URL</label>
                        <input type="text" value={activePost.image} onChange={(e) => handleFieldChange('image', e.target.value)} className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[10px] font-medium text-slate-500 focus:bg-white focus:border-indigo-400 focus:text-slate-800 outline-none transition-all" />
                      </div>

                      {/* Excerpt */}
                      <div>
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1 mb-1 ml-0.5"><AlignLeft size={9}/> Excerpt</label>
                        <textarea value={activePost.excerpt} onChange={(e) => handleFieldChange('excerpt', e.target.value)} rows="4" className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[10px] font-medium text-slate-600 resize-none focus:bg-white focus:border-indigo-400 outline-none transition-all leading-relaxed" />
                      </div>

                    </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* RIGHT PANEL: LIVE PREVIEW GRID */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className="flex-1 bg-slate-50/50 flex flex-col h-full overflow-hidden relative">
            <div className="h-8 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-10">
              <div className="flex items-center gap-1.5 text-slate-400 font-black text-[8px] uppercase tracking-widest">
                <Monitor size={10} /> Live Preview <span className="text-slate-300 font-normal ml-1">(Published Only)</span>
              </div>
            </div>

            {/* SCROLLABLE GRID CONTAINER */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 scroll-smooth">
              <div className="max-w-[1200px] mx-auto pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {posts.filter(p => p.status === 'Published').map((post) => (
                    
                    /* 🔥 YAHAN "DOUBLE BOX" FIX KIYA HAI 🔥 */
                    /* Sirf transparent container rakha hai jo active hone par ring dikhayega */
                    <div key={post.id} className={`transition-all duration-300 ${editingPostId === post.id ? 'ring-2 ring-indigo-500 ring-offset-4 rounded-3xl scale-[1.02]' : ''}`}>
                      <div className="pointer-events-none">
                         <BlogCard post={post} />
                      </div>
                    </div>

                  ))}
                  
                  {posts.filter(p => p.status === 'Published').length === 0 && (
                     <div className="col-span-full text-center py-20 text-slate-400">
                        <Eye size={32} className="mx-auto mb-3 opacity-20" />
                        <p className="text-[11px] font-medium">No published posts to preview.</p>
                     </div>
                  )}
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