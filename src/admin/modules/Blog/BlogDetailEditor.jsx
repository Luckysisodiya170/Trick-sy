import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchSingleSubsectionContent, 
  updateSingleSubsectionContent, 
  fetchSections 
} from '../../../store/index'; 
import { 
  ArrowLeft, Save, Settings2, Columns, Eye,   
  Trash2, Type, AlignLeft, Quote, Image as ImageIcon,
  Monitor, UploadCloud, Search, ChevronLeft, LayoutDashboard, Loader2
} from 'lucide-react';
import BlogDetail from '../../../pages/Blog/BlogDetail';

const BlogDetailEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const sections = useSelector((state) => state.sections.items);
  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const currentSection = sections.find(s => s.slug === 'blog-posts');
  const subsectionId = currentSection?.id;

  const [viewMode, setViewMode] = useState('split');
  const [isSelecting, setIsSelecting] = useState(true); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false); 
  
  const [allBlogs, setAllBlogs] = useState([]);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    if (sections.length === 0) dispatch(fetchSections(5)); 
  }, [dispatch, sections.length]);

  useEffect(() => {
    if (subsectionId) dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content?.posts) {
      setAllBlogs(content.posts);
    }
  }, [content]);

  // FIXED: Standard image resolver using your .env (strips /api for images)
  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    const domain = apiBase.replace('/api', ''); 
    return `${domain}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  const handleSelectToEdit = (article) => {
    setPostData({
      ...article,
      blocks: article.blocks || [] 
    });
    setIsSelecting(false);
  };

  const handleDeleteBlog = async (id, e) => {
    e.stopPropagation();
    if(window.confirm("Are you sure you want to delete this blog permanently?")) {
      const updatedBlogs = allBlogs.filter(b => b.id !== id);
      setAllBlogs(updatedBlogs);
      await saveToDatabase(updatedBlogs);
    }
  };

  const handleSaveAndSync = async () => {
    const postIndex = allBlogs.findIndex(b => b.id === postData.id);
    let updatedBlogs = [...allBlogs];

    if (postIndex !== -1) {
      updatedBlogs[postIndex] = postData;
    } else {
      updatedBlogs.push(postData);
    }
    
    setAllBlogs(updatedBlogs);
    await saveToDatabase(updatedBlogs);
    setIsSelecting(true); 
  };

  const saveToDatabase = async (blogsArray) => {
    if (!subsectionId) return alert("Error: Missing Subsection ID.");

    setIsSaving(true);
    try {
      // Collect all relative paths from all articles to sync the "images" column
      const assetList = [];
      blogsArray.forEach(blog => {
        if (blog.image && !blog.image.startsWith('http')) assetList.push(blog.image);
        blog.blocks?.forEach(blk => {
          if (blk.type === 'image' && blk.value && !blk.value.startsWith('http')) {
            assetList.push(blk.value);
          }
        });
      });

      const payload = { 
        posts: blogsArray,
        images: [...new Set(assetList)] // Unique relative paths only
      };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();
navigate('/admin/pages/blog');

      alert("Article Updated Successfully!");
    } catch (error) {
      console.error("Failed to save blog:", error);
      alert("Failed to save article.");
    } finally {
      setIsSaving(false);
    }
  };

  const addBlock = (type) => setPostData({ ...postData, blocks: [...postData.blocks, { type, value: '' }] });
  
  const updateBlock = (index, val) => {
    setPostData(prev => {
      const newBlocks = [...prev.blocks];
      newBlocks[index].value = val;
      return { ...prev, blocks: newBlocks };
    });
  };
  
  const removeBlock = (index) => setPostData({ ...postData, blocks: postData.blocks.filter((_, i) => i !== index) });

  const handleImageUpload = async (index, e) => {
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
        // Save ONLY the relative path to state
        const relativePath = uploadData.imageUrl; 
        if (index === 'hero') {
          setPostData(prev => ({ ...prev, image: relativePath }));
        } else {
          updateBlock(index, relativePath);
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (isSelecting) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-12 font-sans overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => navigate(-1)} className="mb-10 flex items-center gap-2 text-zinc-400 font-bold hover:text-zinc-900 transition-all">
            <ArrowLeft size={18} /> Back to Overview
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-violet-100 rounded-[1.5rem] flex items-center justify-center text-violet-600">
                <LayoutDashboard size={28} />
              </div>
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Article Designer</h1>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Update Existing Blog Content</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative mr-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" placeholder="Search articles..." 
                  className="pl-11 pr-6 py-3 bg-white border border-slate-200 rounded-2xl w-[300px] outline-none focus:ring-2 ring-violet-500 shadow-sm text-sm font-bold"
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {status === 'loading' && allBlogs.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-slate-400 font-bold text-xs uppercase tracking-widest">
              <Loader2 className="animate-spin mr-2" size={18} /> Loading Articles...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allBlogs.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).map((article) => (
                <div key={article.id} className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all relative flex flex-col h-full">
                  <div className="aspect-video overflow-hidden relative">
                    <img src={getImageUrl(article.image)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 right-4">
                      <button onClick={(e) => handleDeleteBlog(article.id, e)} className="p-2.5 bg-white/90 backdrop-blur-md rounded-xl text-slate-400 hover:text-rose-600 shadow-sm opacity-0 group-hover:opacity-100 transition-all">
                         <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between" onClick={() => handleSelectToEdit(article)}>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-violet-600 bg-violet-50 px-3 py-1 rounded-full">{article.category}</span>
                      <h3 className="text-[16px] font-black text-slate-900 mt-3 leading-tight group-hover:text-violet-600 transition-colors cursor-pointer line-clamp-2">{article.title}</h3>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t pt-4 border-slate-50">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{article.date}</span>
                      <button className="text-[10px] font-black uppercase text-zinc-900 flex items-center gap-1 group-hover:gap-2 transition-all">Edit Page <ArrowLeft size={12} className="rotate-180" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] h-screen overflow-hidden font-sans">
      <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSelecting(true)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><ChevronLeft size={18} /></button>
          <div className="flex flex-col">
            <h1 className="text-[10px] font-black tracking-widest text-violet-600 uppercase">Updating Article</h1>
            <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{postData.title}</p>
          </div>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-full">
          {['edit', 'split', 'preview'].map(m => (
            <button key={m} onClick={() => setViewMode(m)} className={`px-5 py-1.5 rounded-full text-[10px] font-black transition-all ${viewMode === m ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}>{m.toUpperCase()}</button>
          ))}
        </div>

        <button 
          onClick={handleSaveAndSync} 
          disabled={isSaving || isUploading}
          className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-black text-xs shadow-lg hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-70 active:scale-95"
        >
          {(isSaving || isUploading) ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {isSaving ? "UPDATING..." : "UPDATE & SYNC"}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <div className={`${viewMode === 'edit' || viewMode === 'split' ? 'block' : 'hidden'} ${viewMode === 'edit' ? 'w-full max-w-4xl mx-auto' : 'w-[480px] border-r'} bg-white h-full overflow-y-auto p-8 space-y-10 no-scrollbar pb-40`}>
          <section className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Article Title</label>
            <input value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})} className="w-full p-4 bg-slate-50 border rounded-2xl font-black text-lg outline-none focus:ring-2 ring-violet-500 transition-all" />
            
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Intro Excerpt</label>
            <textarea value={postData.excerpt} onChange={(e) => setPostData({...postData, excerpt: e.target.value})} rows="3" className="w-full p-4 bg-slate-50 border rounded-2xl text-sm outline-none focus:ring-2 ring-violet-500 transition-all resize-none" />

            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Main Banner Image</label>
            <div className="relative group aspect-video rounded-[2rem] overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
              <img src={getImageUrl(postData.image)} className="w-full h-full object-cover" alt="Hero"/>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white font-bold text-xs pointer-events-none">
                <UploadCloud size={20} className="mr-2"/> Replace Image
              </div>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload('hero', e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black text-slate-900 border-b pb-4">Content Blocks</h2>
            {postData.blocks.map((block, idx) => (
                <div key={idx} className="group bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-violet-600 bg-violet-50 px-3 py-1 rounded-full">{block.type}</span>
                        <button onClick={() => removeBlock(idx)} className="text-slate-300 hover:text-rose-600 transition-colors"><Trash2 size={16}/></button>
                    </div>
                    {block.type === 'image' ? (
                        <div className="relative h-40 bg-white rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                            {block.value ? <img src={getImageUrl(block.value)} className="w-full h-full object-cover" alt="Block" /> : <ImageIcon size={24} className="text-slate-300" />}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white font-bold text-[10px] pointer-events-none">
                               <UploadCloud size={14} className="mr-1"/> Replace Image
                            </div>
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(idx, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50" />
                        </div>
                    ) : (
                        <textarea value={block.value} onChange={(e) => updateBlock(idx, e.target.value)} rows={3} className="w-full p-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium outline-none focus:ring-2 ring-violet-500" />
                    )}
                </div>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-4">
                <button onClick={() => addBlock('subheading')} className="p-4 bg-white border rounded-[1.5rem] text-[9px] font-black uppercase hover:bg-slate-50 transition-all">Add Subheading</button>
                <button onClick={() => addBlock('paragraph')} className="p-4 bg-white border rounded-[1.5rem] text-[9px] font-black uppercase hover:bg-slate-50 transition-all">Add Paragraph</button>
                <button onClick={() => addBlock('quote')} className="p-4 bg-white border rounded-[1.5rem] text-[9px] font-black uppercase hover:bg-slate-50 transition-all">Add Quote</button>
                <button onClick={() => addBlock('image')} className="p-4 bg-white border rounded-[1.5rem] text-[9px] font-black uppercase hover:bg-slate-50 transition-all">Add Image</button>
            </div>
          </section>
        </div>

        <div className={`${viewMode === 'preview' || viewMode === 'split' ? 'flex' : 'hidden'} flex-1 bg-zinc-100 overflow-y-auto no-scrollbar`}>
           <div className="pointer-events-none origin-top scale-[0.98] w-full">
             <BlogDetail previewData={{...postData, image: getImageUrl(postData.image)}} />
           </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailEditor;