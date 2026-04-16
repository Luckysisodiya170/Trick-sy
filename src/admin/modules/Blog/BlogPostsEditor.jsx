import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent, fetchSections } from '../../../store/index'; 
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Plus, Trash2, Search, Clock, Image as ImageIcon,
  Type, AlignLeft, ChevronLeft, Globe, Lock, Monitor, Loader2, UploadCloud
} from 'lucide-react';

import BlogCard from '../../../pages/Blog/BlogCard'; 

const BlogPostsEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sections = useSelector((state) => state.sections.items);
  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const currentSection = sections.find(s => s.slug === 'blog-posts');
  const subsectionId = currentSection?.id;

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 
  const [editingPostId, setEditingPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (sections.length === 0) dispatch(fetchSections(5)); 
  }, [dispatch, sections.length]);

  useEffect(() => {
    if (subsectionId) dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content?.posts) {
      setPosts(
        content.posts.map(post => ({
          ...post,
          status: post.status || 'Published'
        }))
      );
    }
  }, [content]);

  const activePost = posts.find(p => p.id.toString() === editingPostId?.toString());

  // Helper to resolve clean image URLs for UI
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
      image: '/upload/images/default-hero.png', // Default relative path
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

  const handleFieldChange = (field, value) => {
    setPosts(posts.map(p => p.id.toString() === editingPostId?.toString() ? { ...p, [field]: value } : p));
  };

  const handleImageUpload = async (e) => {
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
        // Save ONLY the relative path to the DB
        const relativePath = uploadData.imageUrl; 
        handleFieldChange('image', relativePath);
      } else {
        alert("Upload Failed: " + uploadData.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!subsectionId) return alert("Error: Missing Subsection ID.");

    setIsSaving(true);
    try {
      // Sync the images array at the top level for DB consistency
      const allImages = posts.map(p => p.image).filter(img => img && !img.startsWith('http'));
      
      const payload = { 
        posts: posts,
        images: [...new Set(allImages)] 
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();
navigate('/admin/pages/blog');

      alert('Posts synced successfully!');
    } catch (error) {
      console.error("Failed to sync posts:", error);
      alert('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (status === 'loading' && posts.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> Loading Articles...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#FDFDFD] font-sans overflow-hidden">
      
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

        <button 
          onClick={handleSave} 
          disabled={isSaving || isUploading} 
          className="bg-slate-900 text-white px-6 py-2 rounded-full font-black text-xs shadow-lg hover:bg-indigo-600 transition-all flex items-center gap-2 disabled:opacity-70 active:scale-95"
        >
          {(isSaving || isUploading) ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {isSaving ? 'Saving...' : isUploading ? 'Uploading...' : 'Sync Changes'}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-4xl mx-auto' : 'w-[320px] shrink-0 border-r border-slate-200'} bg-white flex flex-col h-full overflow-hidden z-10`}>
            
            {!editingPostId ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-3 border-b border-slate-100 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-black text-slate-900 tracking-tight">Articles</h2>
                    <button onClick={handleAddNewPost} className="bg-indigo-50 text-indigo-600 p-1.5 rounded-md hover:bg-indigo-600 hover:text-white transition-all">
                      <Plus size={14}/>
                    </button>
                  </div>
                  <div className="relative">
                    <input type="text" placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-7 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[10px] font-medium focus:border-indigo-400 outline-none" />
                    <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-2 space-y-1.5 bg-slate-50/50">
                  {filteredPosts.map(post => (
                    <div key={post.id} onClick={() => setEditingPostId(post.id)} className="bg-white border border-slate-200 p-1.5 rounded-lg shadow-sm hover:border-indigo-300 transition-all flex items-center gap-2.5 cursor-pointer group">
                      <img src={getImageUrl(post.image)} className="w-8 h-8 rounded-md object-cover" alt="cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[11px] font-bold text-slate-800 truncate mb-0.5">{post.title}</h4>
                        <div className="flex items-center gap-1 text-[8px] font-black uppercase text-slate-400">
                          <span className={post.status === 'Published' ? 'text-emerald-500' : 'text-amber-500'}>{post.status}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <button onClick={(e) => handleDeletePost(post.id, e)} className="p-1 text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-2.5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between shrink-0">
                  <button onClick={() => setEditingPostId(null)} className="flex items-center gap-1 text-[10px] font-bold text-slate-600 hover:text-indigo-600 transition-all">
                    <ChevronLeft size={12}/> Back
                  </button>
                  <select value={activePost.status} onChange={(e) => handleFieldChange('status', e.target.value)} className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded border border-slate-200 bg-white">
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 pb-20">
                    <div className="space-y-4">
                      <div>
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1 mb-1"><Type size={9} /> Article Title</label>
                        <input type="text" value={activePost.title} onChange={(e) => handleFieldChange('title', e.target.value)} className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[11px] font-bold text-slate-800 focus:bg-white outline-none" />
                      </div>
                      
                      <div>
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1 mb-1"><Globe size={9}/> Category</label>
                        <input type="text" value={activePost.category} onChange={(e) => handleFieldChange('category', e.target.value)} className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[10px] font-bold text-slate-700 focus:bg-white outline-none" />
                      </div>

                      <div>
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1 mb-1"><UploadCloud size={9}/> Cover Image</label>
                        <div className="relative group h-32 rounded-xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
                          <img src={getImageUrl(activePost.image)} className="w-full h-full object-cover" alt="Cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white font-bold text-[10px] pointer-events-none">
                             <UploadCloud size={14} className="mr-1"/> Replace Image
                          </div>
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[8px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1 mb-1"><AlignLeft size={9}/> Excerpt</label>
                        <textarea value={activePost.excerpt} placeholder="A short summary." onChange={(e) => handleFieldChange('excerpt', e.target.value)} rows="4" className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[10px] font-medium text-slate-600 resize-none focus:bg-white outline-none" />
                      </div>
                    </div>
                </div>
              </div>
            )}
          </div>
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className="flex-1 bg-slate-50/50 flex flex-col h-full overflow-hidden relative">
            <div className="h-8 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-10">
              <div className="flex items-center gap-1.5 text-slate-400 font-black text-[8px] uppercase tracking-widest">
                <Monitor size={10} /> Live Preview
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 lg:p-6">
              <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
                {posts.filter(p => p.status === 'Published').map((post) => (
                  <div key={post.id} className="pointer-events-none">
                    <BlogCard post={{...post, image: getImageUrl(post.image)}} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostsEditor;