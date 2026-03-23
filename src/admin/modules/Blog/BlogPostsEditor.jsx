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
          <div className={`${viewMode === 'edit' ? 'w-full max-w-4xl mx-auto' : 'w-[460px] border-r'} bg-white flex flex-col h-full overflow-hidden`}>
            {!editingPostId ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Articles</h2>
                    <button onClick={handleAddNewPost} className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all"><Plus size={20}/></button>
                  </div>
                  <div className="relative">
                    <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold focus:ring-2 ring-indigo-100 outline-none" />
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
                  {filteredPosts.map(post => (
                    <div key={post.id} onClick={() => setEditingPostId(post.id)} className="bg-white border p-3 rounded-2xl shadow-sm hover:border-indigo-300 transition-all flex items-center gap-4 cursor-pointer group">
                      <img src={post.image} className="w-14 h-14 rounded-xl object-cover border" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600">{post.title}</h4>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mt-1">
                          <span className={post.status === 'Published' ? 'text-emerald-500' : 'text-amber-500'}>{post.status}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <button onClick={(e) => handleDeletePost(post.id, e)} className="p-2 text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-4 border-b bg-slate-50/50 flex items-center justify-between">
                  <button onClick={() => setEditingPostId(null)} className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"><ChevronLeft size={16}/> Back</button>
                  <select value={activePost.status} onChange={(e) => handleFieldChange('status', e.target.value)} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border outline-none">
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-20">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Article Title</label>
                      <input type="text" value={activePost.title} onChange={(e) => handleFieldChange('title', e.target.value)} className="w-full p-4 bg-slate-50 border rounded-2xl font-bold text-slate-800 focus:ring-2 ring-indigo-100 outline-none" />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                          <input type="text" value={activePost.category} onChange={(e) => handleFieldChange('category', e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-sm" />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Read Time</label>
                          <input type="text" value={activePost.readTime} onChange={(e) => handleFieldChange('readTime', e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-sm" />
                        </div>
                      </div>

                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Excerpt</label>
                      <textarea value={activePost.excerpt} onChange={(e) => handleFieldChange('excerpt', e.target.value)} rows="4" className="w-full p-4 bg-slate-50 border rounded-2xl text-sm font-medium resize-none outline-none focus:ring-2 ring-indigo-100" />
                    </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* RIGHT PANEL: FIXED PREVIEW GRID */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className="flex-1 bg-zinc-50 flex flex-col h-full overflow-hidden relative">
            <div className="h-10 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
              <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                <Monitor size={14} /> Blog Grid Preview
              </div>
            </div>

            {/* SCROLLABLE GRID CONTAINER */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
              <div className="max-w-[1200px] mx-auto pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {posts.filter(p => p.status === 'Published').map((post) => (
                    <div key={post.id} className={`${editingPostId === post.id ? 'ring-4 ring-indigo-500 ring-offset-4 scale-[1.02]' : ''} transition-all duration-300 rounded-[2rem]`}>
                      <BlogCard post={post} />
                    </div>
                  ))}
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