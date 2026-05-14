import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { AdminService } from '../../services/adminService';
import { 
  ArrowLeft, Save, Settings2, Columns, Eye,   
  Trash2, Type, AlignLeft, Quote, Image as ImageIcon,
  Monitor, UploadCloud, Search, ChevronLeft, LayoutDashboard, Loader2, Plus, PenTool
} from 'lucide-react';
import BlogDetail from '../../../pages/Blog/BlogDetail';

const BlogDetailEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const targetSubsectionId = 30; 

  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [viewMode, setViewMode] = useState('split');
  const [isSelecting, setIsSelecting] = useState(true); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false); 
  
  const [allBlogs, setAllBlogs] = useState([]);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(targetSubsectionId));
  }, [dispatch]);

  useEffect(() => {
    if (content?.posts) {
      setAllBlogs(content.posts);
    }
  }, [content]);

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
      blocks: article.blocks || [],
      detailTitle: article.detailTitle || article.title,
      detailIntro: article.detailIntro || article.excerpt,
      detailBanner: article.detailBanner || article.image 
    });
    setIsSelecting(false);
  };

  const handleSaveAndSync = async () => {
    if (!postData) return;
    const postIndex = allBlogs.findIndex(b => b.id === postData.id);
    let updatedBlogs = [...allBlogs];
    if (postIndex !== -1) updatedBlogs[postIndex] = postData;
    
    setAllBlogs(updatedBlogs);
    await saveToDatabase(updatedBlogs);
    setIsSelecting(true); 
  };

  const saveToDatabase = async (blogsArray) => {
    setIsSaving(true);
    try {
      const assetList = [];
      blogsArray.forEach(blog => {
        if (blog.image && !blog.image.startsWith('http')) assetList.push(blog.image);
        if (blog.detailBanner && !blog.detailBanner.startsWith('http')) assetList.push(blog.detailBanner);
        blog.blocks?.forEach(blk => {
          if (blk.type === 'image' && blk.value && !blk.value.startsWith('http')) assetList.push(blk.value);
        });
      });

      const payload = { posts: blogsArray, images: [...new Set(assetList)] };
      await dispatch(updateSingleSubsectionContent({ subsectionId: targetSubsectionId, updateData: payload })).unwrap();
      alert("Article Deep-Synced Successfully! 🚀");
    } catch (error) {
      alert("Sync Failed.");
    } finally { setIsSaving(false); }
  };

  const addBlock = (type) => setPostData({ ...postData, blocks: [...postData.blocks, { type, value: '' }] });
  
  const updateBlock = (index, val) => {
    const newBlocks = [...postData.blocks];
    newBlocks[index] = { ...newBlocks[index], value: val };
    setPostData({ ...postData, blocks: newBlocks });
  };

  const removeBlock = (index) => setPostData({ ...postData, blocks: postData.blocks.filter((_, i) => i !== index) });

  const handleImageUpload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file); 
      const res = await AdminService.uploadHeroImage(formData);
      
      if (res.success || res.imageUrl) {
        if (index === 'detailBanner') {
          setPostData(prev => ({ ...prev, detailBanner: res.imageUrl }));
        } else {
          updateBlock(index, res.imageUrl);
        }
      }
    } catch (error) { console.error(error); } finally { setIsUploading(false); }
  };

  if (isSelecting) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] p-8 lg:p-12 font-sans overflow-y-auto selection:bg-violet-100">
        <div className="max-w-7xl mx-auto">
          <button onClick={() => navigate('/admin/pages/blog')} className="mb-10 flex items-center gap-2 text-zinc-400 font-black text-[10px] uppercase tracking-widest hover:text-indigo-600 transition-all">
            <ArrowLeft size={16} /> Back to Modules
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-violet-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-violet-200">
                <PenTool size={28} />
              </div>
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Article Designer</h1>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Design Internal Content & Layout</p>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search articles..." className="pl-11 pr-6 py-3 bg-white border border-slate-200 rounded-2xl w-[320px] outline-none focus:border-violet-500 shadow-sm font-bold text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {allBlogs.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).map((article) => (
              <div key={article.id} onClick={() => handleSelectToEdit(article)} className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer relative flex flex-col h-full">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img src={getImageUrl(article.image)} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="" />
                </div>
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-violet-600 bg-violet-50 px-3 py-1 rounded-full">{article.category}</span>
                    <h3 className="text-lg font-black text-slate-900 mt-4 leading-tight group-hover:text-violet-600 transition-colors line-clamp-2">{article.title}</h3>
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t pt-5 border-slate-50 text-[10px] font-black uppercase text-slate-400">
                    <span>{article.date}</span>
                    <span className="text-slate-900 flex items-center gap-1 font-black">Edit Detail <ChevronLeft size={12} className="rotate-180" /></span>
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
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] h-screen overflow-hidden font-sans">
      <nav className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between shadow-sm z-[100] shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSelecting(true)} className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-900"><ChevronLeft size={18} /></button>
          <div className="flex flex-col">
            <h1 className="text-[10px] font-black tracking-widest text-violet-600 uppercase">Internal Layout</h1>
            <p className="text-sm font-bold text-slate-900 truncate max-w-[250px]">{postData.detailTitle}</p>
          </div>
        </div>
        
        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {['edit', 'split', 'preview'].map(m => (
            <button key={m} onClick={() => setViewMode(m)} className={`px-5 py-1.5 rounded-lg text-[9px] font-black transition-all uppercase tracking-widest ${viewMode === m ? 'bg-white shadow-sm text-violet-600' : 'text-slate-400 hover:text-slate-600'}`}>{m}</button>
          ))}
        </div>

        <button onClick={handleSaveAndSync} disabled={isSaving || isUploading} className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50">
          {isSaving || isUploading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} <span>{isSaving ? "SAVING..." : "DEPLOY DETAIL"}</span>
        </button>
      </nav>

      <div className={`flex-1 flex overflow-hidden ${viewMode === 'split' ? 'flex-row' : 'flex-col'}`}>
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-5/12 border-r border-slate-100' : 'w-full max-w-4xl mx-auto'} bg-white h-full overflow-y-auto p-8 space-y-8 custom-scrollbar pb-40`}>
            
            {/* Internal Detail Title & Intro Fields */}
            <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 space-y-5">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block border-b border-slate-100 pb-2">Page Header Content</span>
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Detail Heading</label>
                <input value={postData.detailTitle} onChange={(e) => setPostData({...postData, detailTitle: e.target.value})} className="w-full p-4 bg-white border border-slate-100 rounded-2xl font-black text-xl outline-none focus:border-violet-400 transition-all" />
              </div>
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Detail Intro Para</label>
                <textarea value={postData.detailIntro} onChange={(e) => setPostData({...postData, detailIntro: e.target.value})} rows="3" className="w-full p-4 bg-white border border-slate-100 rounded-2xl text-xs font-medium outline-none resize-none leading-relaxed" />
              </div>
            </div>

            <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block border-b border-slate-100 pb-2">Internal Page Banner</span>
              <div className="relative group aspect-video rounded-[2rem] overflow-hidden bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer">
                {postData.detailBanner ? <img src={getImageUrl(postData.detailBanner)} className="w-full h-full object-cover" /> : <ImageIcon className="text-slate-300" />}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white font-bold text-[10px] uppercase tracking-widest">Change Banner</div>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload('detailBanner', e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Post Content Blocks</h2>
                <div className="flex gap-1">
                   {['paragraph', 'subheading', 'quote', 'image'].map(type => (
                     <button key={type} onClick={() => addBlock(type)} className="p-2 bg-slate-50 hover:bg-violet-600 hover:text-white rounded-lg text-[8px] font-black uppercase transition-all border border-slate-100">+{type}</button>
                   ))}
                </div>
              </div>

              {postData.blocks.map((block, idx) => (
                <div key={idx} className="group bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm relative hover:border-violet-200 transition-all">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-violet-600">{block.type}</span>
                    <button onClick={() => removeBlock(idx)} className="text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={14}/></button>
                  </div>
                  {block.type === 'image' ? (
                    <div className="relative h-32 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden cursor-pointer">
                      {block.value ? <img src={getImageUrl(block.value)} className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-slate-300" />}
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(idx, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    </div>
                  ) : (
                    <textarea value={block.value} onChange={(e) => updateBlock(idx, e.target.value)} rows={3} className="w-full p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-violet-400 transition-all resize-none" placeholder={`Type ${block.type} content...`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREVIEW SIDE */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-7/12' : 'w-full'} bg-slate-50 flex flex-col items-center justify-start p-8 relative overflow-y-auto no-scrollbar`}>
            <div className="w-full max-w-[900px] bg-slate-900 rounded-[2.5rem] p-2.5 shadow-2xl border-[10px] border-slate-800 flex flex-col shrink-0">
               <div className="flex h-8 bg-slate-900 items-center px-4 gap-1.5 border-b border-slate-800/50 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
               </div>
               <div className="bg-white rounded-xl overflow-hidden pointer-events-none origin-top scale-[1.0] w-full">
                  {/* Passing Detail Data to Preview Component */}
                  <BlogDetail previewData={{
                    ...postData, 
                    title: postData.detailTitle, 
                    excerpt: postData.detailIntro, 
                    image: getImageUrl(postData.detailBanner || postData.image),
                    blocks: postData.blocks.map(b => b.type === 'image' ? {...b, value: getImageUrl(b.value)} : b)
                  }} />
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetailEditor;