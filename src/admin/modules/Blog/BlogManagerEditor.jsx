import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Monitor, LayoutTemplate, FileText, Plus, Search,
  Trash2, MoreVertical, Globe, Lock, Info, Type
} from 'lucide-react';

// Adjust the path to wherever your main Blog component is located
import Blog from '../../../pages/Blog/Blog'; 

const BlogManagerEditor = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // 'edit', 'split', 'preview'
  const [activeTab, setActiveTab] = useState('posts'); // 'posts', 'hero'

  // Dummy state for Blog Posts (To simulate CMS functionality)
  const [posts, setPosts] = useState([
    { id: 1, title: 'The Future of Premium Maintenance Care', status: 'Published', date: 'Oct 12, 2026', views: '1.2k' },
    { id: 2, title: '5 Signs Your Space Needs Deep Sanitization', status: 'Published', date: 'Oct 05, 2026', views: '840' },
    { id: 3, title: 'How TRICKSY Vets Its Top Professionals', status: 'Draft', date: 'Pending', views: '-' },
  ]);

  // Dummy state for Hero Settings
  const [heroData, setHeroData] = useState({
    badgeText: 'Latest Updates',
    mainTitle: 'Insights &',
    highlightTitle: 'Expertise.',
    subtitle: 'Stay updated with the latest trends, maintenance tips, and company news from the TRICKSY team.'
  });

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setHeroData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Saved Blog Settings:', heroData);
    setIsSaving(false);
    alert('Blog settings updated successfully!');
  };

  const handleDeletePost = (id) => {
    if(window.confirm('Move this post to trash?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden">
      
   {/* navbar */}
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
          className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-indigo-600 transition-all flex-shrink-0 disabled:opacity-70 disabled:hover:bg-slate-900"
        >
          {isSaving ? (
            <span className="animate-pulse">Saving...</span>
          ) : (
            <>
              <Save size={16} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className="hidden md:inline">Save Changes</span>
            </>
          )}
        </button>
      </nav>


      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-4xl mx-auto border-x' : 'w-full lg:w-[480px] border-r'} bg-white border-slate-200 flex flex-col h-full relative z-20 shadow-2xl shadow-slate-200/50 transition-all duration-300`}>
            
            {/* Custom Tab Navigation */}
            <div className="flex px-6 pt-6 border-b border-slate-100 gap-6">
               <button 
                 onClick={() => setActiveTab('posts')}
                 className={`pb-4 text-[11px] font-black uppercase tracking-widest flex items-center gap-2 border-b-2 transition-all ${activeTab === 'posts' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-700'}`}
               >
                 <FileText size={16} /> Articles & Content
               </button>
               <button 
                 onClick={() => setActiveTab('hero')}
                 className={`pb-4 text-[11px] font-black uppercase tracking-widest flex items-center gap-2 border-b-2 transition-all ${activeTab === 'hero' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-700'}`}
               >
                 <LayoutTemplate size={16} /> Hero Layout
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide bg-slate-50/30">
              
              {/* --- TAB 1: POSTS MANAGER --- */}
              {activeTab === 'posts' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-black text-slate-900 tracking-tight mb-0.5">All Articles</h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{posts.length} Total Posts</p>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-md hover:bg-indigo-700 transition-all flex items-center gap-1.5 active:scale-95">
                      <Plus size={14} /> New Post
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search articles..." 
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:ring-2 ring-indigo-100 transition-all shadow-sm"
                    />
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>

                  {/* Posts List */}
                  <div className="space-y-3">
                    {posts.map(post => (
                      <div key={post.id} className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${post.status === 'Published' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 text-slate-400'}`}>
                            {post.status === 'Published' ? <Globe size={16} /> : <Lock size={16} />}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 mb-1 leading-tight line-clamp-1 group-hover:text-indigo-600 transition-colors cursor-pointer">{post.title}</h4>
                            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              <span className={post.status === 'Published' ? 'text-emerald-500' : 'text-amber-500'}>{post.status}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                              <span>{post.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit3 size={14} /></button>
                          <button onClick={() => handleDeletePost(post.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB 2: HERO LAYOUT --- */}
              {activeTab === 'hero' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight mb-0.5">Blog Header</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customize the main landing area</p>
                  </div>

                  <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex gap-3">
                    <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-blue-900/80 font-semibold leading-relaxed">
                      Changes made here will update the main `<BlogHero />` component at the top of the page.
                    </p>
                  </div>

                  <div className="space-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <div>
                      <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                        <Type size={12} /> Badge Text
                      </label>
                      <input 
                        type="text" name="badgeText" value={heroData.badgeText} onChange={handleHeroChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all shadow-inner" 
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                        <Type size={12} /> Main Title
                      </label>
                      <input 
                        type="text" name="mainTitle" value={heroData.mainTitle} onChange={handleHeroChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all shadow-inner" 
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                        <Type size={12} /> Highlighted Word (Emerald)
                      </label>
                      <input 
                        type="text" name="highlightTitle" value={heroData.highlightTitle} onChange={handleHeroChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 ring-emerald-100 focus:bg-white transition-all shadow-inner" 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* RIGHT PANEL */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'hidden lg:flex flex-1'} flex-col h-full bg-slate-100/50 relative transition-all duration-300`}>
            
            <div className="h-12 flex items-center justify-between px-6 bg-white border-b border-slate-200 shadow-sm shrink-0">
              <div className="flex items-center gap-2">
                <Monitor size={14} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Output</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                <Info size={12} /> Preview relies on API data
              </div>
            </div>

            <div className="flex-1 overflow-y-auto w-full flex items-start justify-center p-0 lg:p-4">
              <div className="w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300/50 border-4 border-white/50 bg-zinc-50 relative h-full">
                
                <div className="absolute inset-0 overflow-y-auto no-scrollbar pointer-events-none opacity-80 hover:opacity-100 transition-opacity">
                   <Blog />
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