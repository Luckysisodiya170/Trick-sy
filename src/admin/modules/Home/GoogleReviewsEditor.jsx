import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { 
  ArrowLeft, Plus, Trash2, Star, CheckCircle2, 
  ArrowUpRight, User, Settings2, Save, Loader2, Globe, ChevronDown
} from 'lucide-react';

const GoogleLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const GoogleReviewsEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const subsectionId = location.state?.sectionId || 9;
  const contentData = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [viewMode, setViewMode] = useState('split');
  const [activeCard, setActiveCard] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);

  const [stats, setStats] = useState({
    ratingText: "", totalReviews: "", reviewLink: "#", trustBarText: "", certifications: ""
  });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (contentData) {
      setStats({
        ratingText: contentData.mainTitle || "Excellent",
        totalReviews: contentData.reviewCount || "482 reviews",
        reviewLink: contentData.reviewLink || "#",
        trustBarText: contentData.badge || "TRUSTED BY DUBAI'S BEST",
        certifications: contentData.certifications || ""
      });
      if (contentData.reviews) {
        setReviews(contentData.reviews.map((rev, idx) => ({
          ...rev,
          id: rev.id || `review-${idx}`,
          text: rev.text || rev.comment || '',
        })));
      }
    }
  }, [contentData]);

  const handleLimitChange = (field, val, limit) => {
    if (val.length <= limit) setStats({ ...stats, [field]: val });
  };

  const updateReview = (id, field, value) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      const payload = {
        mainTitle: stats.ratingText,
        reviewCount: stats.totalReviews,
        reviewLink: stats.reviewLink,
        badge: stats.trustBarText,
        certifications: stats.certifications,
        reviews: reviews.map(({ id, ...rest }) => rest),
        images: contentData?.images || [] 
      };
      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      dispatch(fetchSingleSubsectionContent(subsectionId));
      alert("Google Reviews Deployed! 🚀");
    } catch (error) { alert(`Error: ${error.message}`); } finally { setIsDeploying(false); }
  };

  if (status === 'loading' && !contentData) {
    return <div className="h-screen flex items-center justify-center font-black text-slate-400 text-xs animate-pulse">SYNCING REVIEWS LAB...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-indigo-100">
      
      {/* 1. SAVAGE NAVBAR */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-slate-900"><ArrowLeft size={18} /></button>
          <h1 className="text-[12px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <Settings2 size={16} className="text-blue-600" /> Reviews <span className="text-blue-400">Lab</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {['edit', 'split', 'preview'].map(m => (
            <button key={m} onClick={() => setViewMode(m)} className={`px-5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === m ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>{m}</button>
          ))}
        </div>

        <button onClick={handleDeploy} disabled={isDeploying} className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-blue-600 transition-all">
          {isDeploying ? <Loader2 className="animate-spin" size={14} /> : "DEPLOY"}
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-700 ${viewMode === 'split' ? 'max-w-[1800px] px-8 py-8 grid grid-cols-12 gap-8' : 'max-w-4xl py-12 px-6'}`}>
        
        {/* 2. EDITOR PANEL */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-4' : 'w-full'} space-y-6`}>
            
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-5">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2 block">Global Stats</span>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                   <input value={stats.ratingText} onChange={e => handleLimitChange('ratingText', e.target.value, 15)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-blue-500" placeholder="Rating Text" />
                   <input value={stats.totalReviews} onChange={e => handleLimitChange('totalReviews', e.target.value, 20)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-blue-500" placeholder="Review Count" />
                </div>
                <input value={stats.trustBarText} onChange={e => handleLimitChange('trustBarText', e.target.value, 40)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-blue-500" placeholder="Trust Bar Text" />
                <textarea value={stats.certifications} onChange={e => setStats({...stats, certifications: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl font-medium text-[10px] outline-none h-16 resize-none" placeholder="Certifications (Comma separated)" />
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
               <span className="text-[10px] font-black uppercase text-slate-400">Feedback Cards ({reviews.length})</span>
               <button onClick={() => setReviews([...reviews, { id: Date.now(), author: "New User", time: "Just Now", text: "", rating: 5 }])} className="text-[9px] font-black text-blue-600">+ ADD FEEDBACK</button>
            </div>

            <div className="space-y-3 pb-10">
              {reviews.map((rev) => (
                <div key={rev.id} className={`bg-white rounded-2xl border transition-all ${activeCard === rev.id ? 'border-blue-500 shadow-md' : 'border-slate-100 shadow-sm'}`}>
                  <div onClick={() => setActiveCard(activeCard === rev.id ? null : rev.id)} className="p-4 flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><User size={16}/></div>
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">{rev.author || "Unnamed"}</span>
                    </div>
                    <ChevronDown size={14} className={`text-slate-300 transition-transform ${activeCard === rev.id ? 'rotate-180' : ''}`} />
                  </div>
                  {activeCard === rev.id && (
                    <div className="p-4 pt-0 space-y-3 border-t border-slate-50 animate-in fade-in">
                      <div className="grid grid-cols-2 gap-3">
                        <input value={rev.author} onChange={e => updateReview(rev.id, 'author', e.target.value.substring(0, 20))} className="w-full p-2 bg-slate-50 rounded-lg text-[10px] font-bold outline-none" placeholder="Name" />
                        <input value={rev.time} onChange={e => updateReview(rev.id, 'time', e.target.value.substring(0, 15))} className="w-full p-2 bg-slate-50 rounded-lg text-[10px] font-bold outline-none uppercase" placeholder="Time" />
                      </div>
                      <textarea value={rev.text} onChange={e => updateReview(rev.id, 'text', e.target.value.substring(0, 150))} className="w-full p-2 bg-slate-50 rounded-lg text-[10px] font-medium outline-none h-20 resize-none" placeholder="Feedback Text..." />
                      <div className="flex items-center justify-between">
                         <div className="flex gap-1">
                            {[1,2,3,4,5].map(n => <Star key={n} size={14} onClick={() => updateReview(rev.id, 'rating', n)} className={`cursor-pointer ${rev.rating >= n ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />)}
                         </div>
                         <button onClick={() => setReviews(reviews.filter(x => x.id !== rev.id))} className="text-rose-500"><Trash2 size={14}/></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. LIVE PREVIEW (BALANCED SPACE) */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-8' : 'w-full'} sticky top-24`}>
            <div className="relative mx-auto bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 overflow-hidden">
               {/* Browser UI */}
               <div className="flex items-center gap-2 mb-3 px-3">
                  <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-slate-700" /><div className="w-1.5 h-1.5 rounded-full bg-slate-700" /><div className="w-1.5 h-1.5 rounded-full bg-slate-700" /></div>
                  <div className="flex-1 max-w-[120px] mx-auto h-3.5 bg-slate-800 rounded-full flex items-center justify-center text-[6px] text-slate-500 font-bold uppercase tracking-widest">Reviews Preview</div>
               </div>

               <div className="bg-white rounded-xl overflow-hidden min-h-[500px] flex flex-col items-center justify-center px-10 relative py-12">
                 <div className="w-full scale-[0.85] -mt-10 animate-in fade-in duration-700">
                    
                    <div className="bg-[#F8F9FA] rounded-[2.5rem] p-10 flex flex-col lg:flex-row gap-10 border border-slate-100 shadow-sm relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                       
                       <div className="min-w-[200px] flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-200 pb-8 lg:pb-0 lg:pr-10">
                          <GoogleLogo className="w-10 h-10 mb-5" />
                          <h2 className="text-3xl font-black text-slate-800 mb-1">{stats.ratingText}</h2>
                          <div className="flex gap-0.5 mb-3">
                             {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-[#FBBF24] text-[#FBBF24]" />)}
                          </div>
                          <p className="text-[10px] font-medium text-slate-400 mb-6 uppercase tracking-tighter">Based on <span className="text-slate-900 font-bold underline">{stats.totalReviews}</span></p>
                          <div className="text-[9px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-2 group cursor-pointer">
                            WRITE REVIEW <ArrowUpRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                       </div>

                       <div className="flex-1 flex overflow-x-auto gap-5 pb-4 custom-scrollbar snap-x no-scrollbar">
                          {reviews.map(rev => (
                            <div className="min-w-[280px] bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-50 snap-center flex flex-col" key={rev.id}>
                               <div className="flex justify-between items-start mb-4">
                                  <div className="flex items-center gap-2">
                                     <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><User size={14}/></div>
                                     <div className="leading-tight">
                                        <div className="flex items-center gap-1"><span className="font-bold text-[11px] text-slate-800 uppercase">{rev.author}</span><CheckCircle2 size={10} className="text-blue-500" /></div>
                                        <span className="text-[7px] font-black text-slate-400 uppercase">{rev.time}</span>
                                     </div>
                                  </div>
                                  <GoogleLogo className="w-4 h-4 opacity-30" />
                               </div>
                               <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic mb-4 flex-1 line-clamp-3">"{rev.text}"</p>
                               <div className="flex gap-0.5">
                                  {[...Array(rev.rating)].map((_, i) => <Star key={i} size={10} className="fill-[#FBBF24] text-[#FBBF24]" />)}
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>

                    {/* Trust Bar */}
                    <div className="mt-8 flex items-center justify-center gap-4">
                       <span className="text-slate-400 font-black uppercase text-[8px] tracking-[0.2em] italic">{stats.trustBarText}</span>
                       <div className="h-3 w-[1px] bg-slate-200" />
                       <div className="flex gap-3 overflow-hidden">
                          {stats.certifications?.split(',').map((c, i) => (
                            <span key={i} className="text-[8px] font-bold text-slate-500 uppercase whitespace-nowrap">{c.trim()}</span>
                          ))}
                       </div>
                    </div>

                 </div>
               </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; height: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default GoogleReviewsEditor;