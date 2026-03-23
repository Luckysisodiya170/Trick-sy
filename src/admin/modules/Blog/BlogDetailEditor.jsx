import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Columns, Eye, Plus, 
  Trash2, Type, AlignLeft, Quote, Image as ImageIcon,
  Monitor, UploadCloud, Search, ChevronLeft, MoreVertical,
  PlusCircle, LayoutDashboard, AlertCircle
} from 'lucide-react';
import BlogDetail from '../../../pages/Blog/BlogDetail';

import { blogPosts as initialData } from '../../../data/blogData';

const BlogDetailEditor = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('split');
  const [isSelecting, setIsSelecting] = useState(true); 
  const [searchQuery, setSearchQuery] = useState('');
  
  const [allBlogs, setAllBlogs] = useState(() => {
    const saved = localStorage.getItem('tricksy_all_blogs');
    return saved ? JSON.parse(saved) : initialData;
  });

  const [postData, setPostData] = useState(null);

  useEffect(() => {
    localStorage.setItem('tricksy_all_blogs', JSON.stringify(allBlogs));
  }, [allBlogs]);


  const handleCreateNew = () => {
    const newBlog = {
      id: Date.now(),
      title: "Untitled Article",
      slug: `new-article-${Date.now()}`,
      excerpt: "Start with a catchy summary...",
      category: "Uncategorized",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
      blocks: [
        { type: 'subheading', value: 'Welcome to your new post' },
        { type: 'paragraph', value: 'Start typing your story here...' }
      ]
    };
    setPostData(newBlog);
    setIsSelecting(false);
  };

  const handleSelectToEdit = (article) => {
    setPostData({
      ...article,
      blocks: article.blocks || [{ type: 'paragraph', value: article.excerpt }]
    });
    setIsSelecting(false);
  };

  const handleDeleteBlog = (id, e) => {
    e.stopPropagation();
    if(window.confirm("Are you sure you want to delete this blog permanently?")) {
      setAllBlogs(allBlogs.filter(b => b.id !== id));
    }
  };

  const handleSaveAndSync = () => {
    const updatedBlogs = allBlogs.find(b => b.id === postData.id)
      ? allBlogs.map(b => b.id === postData.id ? postData : b)
      : [postData, ...allBlogs];
    
    setAllBlogs(updatedBlogs);
    alert("Article Synced Successfully!");
    setIsSelecting(true); 
  };

  const addBlock = (type) => setPostData({ ...postData, blocks: [...postData.blocks, { type, value: '' }] });
  const updateBlock = (index, val) => {
    const newBlocks = [...postData.blocks];
    newBlocks[index].value = val;
    setPostData({ ...postData, blocks: newBlocks });
  };
  const removeBlock = (index) => setPostData({ ...postData, blocks: postData.blocks.filter((_, i) => i !== index) });

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      index === 'hero' ? setPostData({...postData, image: url}) : updateBlock(index, url);
    }
  };

  if (isSelecting) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-12 font-sans overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => navigate('/admin/pages/blog')} className="mb-10 flex items-center gap-2 text-zinc-400 font-bold hover:text-zinc-900 transition-all">
            <ArrowLeft size={18} /> Back to Overview
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-violet-100 rounded-[1.5rem] flex items-center justify-center text-violet-600">
                <LayoutDashboard size={28} />
              </div>
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Article Designer</h1>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Manage & Design Blog Content</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative mr-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" placeholder="Quick find..." 
                  className="pl-11 pr-6 py-3 bg-white border border-slate-200 rounded-2xl w-[250px] outline-none focus:ring-2 ring-violet-500 shadow-sm text-sm font-bold"
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button onClick={handleCreateNew} className="bg-zinc-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-violet-600 shadow-xl transition-all active:scale-95">
                <PlusCircle size={18} /> New Article
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allBlogs.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).map((article) => (
              <div key={article.id} className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all relative flex flex-col h-full">
                <div className="aspect-video overflow-hidden relative">
                  <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 flex gap-2">
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
                    <button className="text-[10px] font-black uppercase text-zinc-900 flex items-center gap-1 group-hover:gap-2 transition-all">Edit Blocks <ArrowLeft size={12} className="rotate-180" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            <h1 className="text-[10px] font-black tracking-widest text-violet-600 uppercase">Article Designer</h1>
            <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{postData.title}</p>
          </div>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-full">
          {['edit', 'split', 'preview'].map(m => (
            <button key={m} onClick={() => setViewMode(m)} className={`px-5 py-1.5 rounded-full text-[10px] font-black transition-all ${viewMode === m ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}>{m.toUpperCase()}</button>
          ))}
        </div>

        <button onClick={handleSaveAndSync} className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-black text-xs shadow-lg hover:bg-emerald-600 transition-all flex items-center gap-2">
            <Save size={16} /> SAVE & SYNC
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL*/}
        {(viewMode === 'edit' || viewMode === 'split') && (
           <div className={`${viewMode === 'edit' ? 'w-full max-w-4xl mx-auto' : 'w-[480px] border-r'} bg-white flex flex-col h-full overflow-y-auto p-8 space-y-10 no-scrollbar pb-40`}>
              
              <section className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Article Title</label>
                <input value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})} className="w-full p-4 bg-slate-50 border rounded-2xl font-black text-lg outline-none focus:ring-2 ring-violet-500 transition-all" />
                
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mt-4 block">Hero Image</label>
                <div className="relative group aspect-video rounded-[2rem] overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
                  <img src={postData.image} className="w-full h-full object-cover" />
                  <input type="file" onChange={(e) => handleImageUpload('hero', e)} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white font-bold text-xs"><UploadCloud size={20} className="mr-2"/> Replace Image</div>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <h2 className="text-xl font-black text-slate-900">Blocks Manager</h2>
                  <span className="text-[10px] font-black text-slate-400 uppercase">{postData.blocks.length} Components</span>
                </div>

                {postData.blocks.map((block, idx) => (
                    <div key={idx} className="group relative bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[9px] font-black uppercase tracking-widest text-violet-600 bg-violet-50 px-3 py-1 rounded-full">{block.type}</span>
                            <button onClick={() => removeBlock(idx)} className="text-slate-300 hover:text-rose-600 transition-colors"><Trash2 size={16}/></button>
                        </div>
                        {block.type === 'image' ? (
                            <div className="relative h-40 bg-white rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                                {block.value ? <img src={block.value} className="w-full h-full object-cover" /> : <ImageIcon size={24} className="text-slate-300" />}
                                <input type="file" onChange={(e) => handleImageUpload(idx, e)} className="absolute inset-0 opacity-0 cursor-pointer" />
                            </div>
                        ) : (
                            <textarea value={block.value} onChange={(e) => updateBlock(idx, e.target.value)} rows={3} className="w-full p-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium outline-none focus:ring-2 ring-violet-500" placeholder={`Write your ${block.type} content...`} />
                        )}
                    </div>
                ))}

                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => addBlock('subheading')} className="p-4 bg-white border rounded-[1.5rem] text-[9px] font-black uppercase hover:bg-slate-50 shadow-sm transition-all"><Type size={16} className="mx-auto mb-2 text-violet-500"/> Subheading</button>
                    <button onClick={() => addBlock('paragraph')} className="p-4 bg-white border rounded-[1.5rem] text-[9px] font-black uppercase hover:bg-slate-50 shadow-sm transition-all"><AlignLeft size={16} className="mx-auto mb-2 text-violet-500"/> Paragraph</button>
                    <button onClick={() => addBlock('quote')} className="p-4 bg-white border rounded-[1.5rem] text-[9px] font-black uppercase hover:bg-slate-50 shadow-sm transition-all"><Quote size={16} className="mx-auto mb-2 text-violet-500"/> Quote</button>
                    <button onClick={() => addBlock('image')} className="p-4 bg-white border rounded-[1.5rem] text-[9px] font-black uppercase hover:bg-slate-50 shadow-sm transition-all"><ImageIcon size={16} className="mx-auto mb-2 text-violet-500"/> Add Image</button>
                </div>
              </section>
           </div>
        )}

        {/* BLOG PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
           <div className="flex-1 bg-zinc-100 overflow-y-auto no-scrollbar">
              <div className="pointer-events-none origin-top scale-[0.98]">
                <BlogDetail previewData={postData} />
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetailEditor;