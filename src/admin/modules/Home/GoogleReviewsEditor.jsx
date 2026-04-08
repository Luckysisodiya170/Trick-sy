import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../../store/index'; 
import { 
  ArrowLeft, Plus, Trash2, Star, CheckCircle2, 
  ArrowUpRight, User, Eye, Edit3, Columns,
  Globe, MessageSquare, ChevronDown, Settings2, Save, Loader2
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
  const { id } = useParams();
  const subsectionId = id || 9;

  const contentData = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const [viewMode, setViewMode] = useState('split');
  const [activeCard, setActiveCard] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);

  const [stats, setStats] = useState({
    ratingText: "Excellent",
    totalReviews: "482 reviews",
    reviewLink: "#",
    trustBarText: "TRUSTED BY DUBAI'S BEST",
    certifications: "Property Finder Approved, Dubai Municipality Certified"
  });

  const [reviews, setReviews] = useState([
    { id: 1, author: "Omar Al-Sayed", time: "2 DAYS AGO", text: "Best maintenance team in Dubai. Fixed my AC in 30 mins! Super professional and polite staff.", rating: 5, avatar: null },
    { id: 2, author: "Jessica M.", time: "1 WEEK AGO", text: "Highly recommend for deep cleaning. Every corner was spotless. Worth every dirham!", rating: 5, avatar: null }
  ]);

  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (contentData && Object.keys(contentData).length > 0) {
      setStats({
        ratingText: contentData.mainTitle || "Excellent",
        totalReviews: contentData.reviewCount || "482 reviews",
        reviewLink: contentData.reviewLink || "#",
        trustBarText: contentData.trustBarText || contentData.badge || "TRUSTED BY DUBAI'S BEST",
        certifications: contentData.certifications || "Property Finder Approved, Dubai Municipality Certified"
      });

      if (contentData.reviews && contentData.reviews.length > 0) {
        const loadedReviews = contentData.reviews.map((rev, idx) => ({
          ...rev,
          id: rev.id || Date.now() + idx,
          text: rev.text || rev.comment || '',
        }));
        setReviews(loadedReviews);
      }
    }
  }, [contentData]);

  const updateReview = (id, field, value) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleAddReview = () => {
    const newId = Date.now();
    setReviews([...reviews, { id: newId, author: "New Reviewer", time: "JUST NOW", text: "Write your review here...", rating: 5 }]);
    setActiveCard(newId);
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      const finalReviews = reviews.map(({ id, avatar, ...rest }) => rest);
      const payload = {
        mainTitle: stats.ratingText,
        reviewCount: stats.totalReviews,
        reviewLink: stats.reviewLink,
        trustBarText: stats.trustBarText,
        certifications: stats.certifications,
        badge: stats.trustBarText,
        reviews: finalReviews,
        images: contentData?.images || [] 
      };

      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      alert("Google Reviews Deployed Successfully! 🚀");
    } catch (error) {
      console.error("Deploy Error:", error);
      alert(`Deploy Failed: ${error.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  if (status === 'loading' && !contentData) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> Loading Reviews Lab...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] font-sans">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[50] bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 w-1/4 sm:w-1/3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic">
            <Settings2 size={20} className="text-blue-600" /> GOOGLE REVIEWS <span className="text-blue-500">LAB</span>
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 sm:p-1.5 rounded-full shadow-inner w-auto justify-center">
          <button onClick={() => setViewMode('edit')} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'edit' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
            <Edit3 size={14} className="hidden sm:block" /> Edit
          </button>
          <button onClick={() => setViewMode('split')} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'split' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
            <Columns size={14} className="hidden sm:block" /> Split
          </button>
          <button onClick={() => setViewMode('preview')} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'preview' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
            <Eye size={14} className="hidden sm:block" /> Preview
          </button>
        </div>

        <div className="w-1/4 sm:w-1/3 flex justify-end">
          <button onClick={handleDeploy} disabled={isDeploying} className="bg-slate-900 text-white px-4 sm:px-8 py-2.5 rounded-full font-extrabold text-[10px] sm:text-xs flex items-center gap-2 shadow-lg hover:bg-blue-600 transition-all hover:-translate-y-0.5 disabled:opacity-50">
            {isDeploying ? <Loader2 size={14} className="animate-spin hidden sm:block" /> : <Save size={14} className="hidden sm:block" />} 
            {isDeploying ? 'DEPLOYING...' : 'DEPLOY'}
          </button>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row">
        
        {/* EDITOR PANEL */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-full lg:w-[420px] lg:border-r border-slate-200 lg:h-full lg:overflow-y-auto' : 'w-full h-full lg:overflow-y-auto'} p-4 md:p-6 lg:p-10 bg-[#F8FAFC] custom-scrollbar`}>
            <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 pb-10">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 md:pb-6">
                <div>
                  <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Reviews Content</h2>
                  <p className="text-[10px] md:text-xs text-slate-500 font-medium mt-0.5">Add or edit customer feedback.</p>
                </div>
                <button onClick={handleAddReview} className="bg-blue-600 text-white px-3 py-2 md:px-4 md:py-2.5 rounded-xl font-bold text-[10px] flex items-center gap-1.5 hover:bg-slate-900 transition-all shadow-md active:scale-95 shrink-0">
                  <Plus size={16} /> <span className="hidden sm:inline">ADD NEW</span>
                </button>
              </div>

              {/* STATS SECTION */}
              <section className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 md:space-y-6">
                <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest border-b border-slate-50 pb-3 md:pb-4">
                  <Globe size={14} /> Global Statistics
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">Rating Title</label>
                    <input value={stats.ratingText} onChange={(e) => setStats({...stats, ratingText: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-blue-50 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">Total Reviews</label>
                    <input value={stats.totalReviews} onChange={(e) => setStats({...stats, totalReviews: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-blue-50 focus:bg-white transition-all" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">Trust Bar Highlight (Italic)</label>
                    <input value={stats.trustBarText} onChange={(e) => setStats({...stats, trustBarText: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-blue-50 focus:bg-white transition-all" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">Certifications (Comma separated)</label>
                    <input value={stats.certifications} onChange={(e) => setStats({...stats, certifications: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-blue-50 focus:bg-white transition-all" />
                  </div>
                </div>
              </section>

              {/* REVIEWS LIST */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-1 pb-1">
                  <MessageSquare size={14} className="text-blue-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Review Cards</span>
                </div>

                {reviews.map((rev) => (
                  <div key={rev.id} className={`bg-white rounded-2xl md:rounded-[1.5rem] border transition-all duration-300 ${activeCard === rev.id ? 'ring-4 ring-blue-50 border-blue-200 shadow-lg' : 'border-slate-200 hover:border-slate-300'}`}>
                    <div onClick={() => setActiveCard(activeCard === rev.id ? null : rev.id)} className="p-3 md:p-4 flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3 w-full pr-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-100 overflow-hidden shrink-0">
                          <User className="text-slate-300" size={18} />
                        </div>
                        <div className="overflow-hidden w-full">
                          <h4 className="font-bold text-xs text-slate-800 truncate">{rev.author}</h4>
                          <p className="text-[9px] font-bold text-blue-500 uppercase mt-0.5 truncate">{rev.time}</p>
                        </div>
                      </div>
                      <ChevronDown size={16} className={`text-slate-300 transition-transform shrink-0 ${activeCard === rev.id ? 'rotate-180 text-blue-500' : ''}`} />
                    </div>

                    {activeCard === rev.id && (
                      <div className="px-4 md:px-5 pb-5 md:pb-6 pt-2 border-t border-slate-50 space-y-4 animate-in fade-in slide-in-from-top-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input placeholder="Name" value={rev.author} onChange={(e) => updateReview(rev.id, 'author', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold outline-none focus:bg-white focus:ring-1 ring-blue-100 transition-all" />
                          <input placeholder="Time (e.g. 2 DAYS AGO)" value={rev.time} onChange={(e) => updateReview(rev.id, 'time', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold outline-none focus:bg-white focus:ring-1 ring-blue-100 transition-all uppercase" />
                        </div>
                        <textarea placeholder="Write review..." value={rev.text} onChange={(e) => updateReview(rev.id, 'text', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs h-20 resize-none outline-none leading-relaxed focus:bg-white focus:ring-1 ring-blue-100 transition-all" />
                        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                           <div className="flex gap-1 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                              {[1,2,3,4,5].map(n => (
                                <Star key={n} size={14} onClick={() => updateReview(rev.id, 'rating', n)} className={`cursor-pointer transition-all ${rev.rating >= n ? 'fill-amber-400 text-amber-400' : 'text-slate-200 hover:text-amber-200'}`} />
                              ))}
                           </div>
                           <button onClick={() => setReviews(reviews.filter(r => r.id !== rev.id))} className="text-rose-500 p-2 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors flex items-center justify-center gap-1.5 px-3">
                              <Trash2 size={14} /> <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">Delete</span>
                           </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PREVIEW PANEL - MATCHING THE GOOGLE REVIEWS DESIGN */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-full lg:flex-1 min-h-[700px] lg:min-h-0' : 'w-full h-full'} bg-slate-200 p-3 sm:p-4 lg:p-10 flex items-center justify-center overflow-hidden`}>
            
            <div className={`w-full h-full max-w-6xl bg-white shadow-2xl rounded-3xl md:rounded-[2.5rem] overflow-hidden flex flex-col border-[4px] md:border-[8px] border-slate-900 transition-all duration-500 ${viewMode === 'split' ? 'lg:scale-[0.95] xl:scale-[0.9]' : 'scale-100'}`}>
                
                {/* Browser Header */}
                <div className="h-8 md:h-10 bg-slate-900 flex items-center px-4 md:px-6 gap-1.5 md:gap-2 shrink-0">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-500" />
                </div>

                {/* SCROLLABLE CONTENT AREA */}
                <div className="flex-1 overflow-y-auto bg-white py-10 md:py-16 px-4 md:px-8 lg:px-12 custom-scrollbar-preview flex flex-col items-center">
                   
                   <div className="w-full max-w-[1100px] bg-[#F8F9FA] rounded-[2rem] p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12 shadow-sm border border-slate-100">
                      
                      {/* Left: Overall Rating Box */}
                      <div className="flex flex-col justify-center min-w-[220px] shrink-0">
                        <GoogleLogo className="w-10 h-10 mb-4" />
                        <h2 className="text-3xl lg:text-4xl font-black text-[#1F2937] tracking-tight mb-3">{stats.ratingText}</h2>
                        <div className="flex gap-1 mb-3">
                           {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-[#FBBF24] text-[#FBBF24]" />)}
                        </div>
                        <p className="text-sm font-medium text-slate-500 mb-6">Based on <span className="font-bold text-slate-900 underline underline-offset-2">{stats.totalReviews}</span></p>
                        
                        <a href={stats.reviewLink} className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-1.5 hover:text-blue-600 transition-colors w-fit">
                          WRITE A REVIEW <ArrowUpRight size={16} strokeWidth={3} />
                        </a>
                      </div>

                      {/* Divider */}
                      <div className="hidden lg:block w-px bg-slate-200 shrink-0" />

                      {/* Right: Scrollable Cards */}
                      <div className="flex overflow-x-auto gap-4 md:gap-6 pb-4 custom-scrollbar snap-x w-full">
                        {reviews.map(rev => (
                          <div className="min-w-[280px] md:min-w-[340px] bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 snap-center flex flex-col justify-between hover:shadow-lg transition-shadow" key={rev.id}>
                            
                            {/* Card Header */}
                            <div className="flex items-start justify-between mb-4">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                    {rev.avatar ? <img src={rev.avatar} className="w-full h-full rounded-full object-cover" /> : <User size={16} className="text-slate-400" />}
                                  </div>
                                  <div>
                                     <div className="flex items-center gap-1 mb-0.5">
                                        <span className="font-bold text-sm text-slate-900 leading-none">{rev.author}</span>
                                        <CheckCircle2 size={14} className="text-[#4285F4] fill-blue-50" />
                                     </div>
                                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none">{rev.time}</span>
                                  </div>
                               </div>
                               <GoogleLogo className="w-5 h-5 shrink-0" />
                            </div>
                            
                            {/* Card Text */}
                            <p className="text-[13px] md:text-sm text-slate-600 font-medium mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">
                              "{rev.text}"
                            </p>
                            
                            {/* Card Stars */}
                            <div className="flex gap-1 mt-auto">
                               {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} className="fill-[#FBBF24] text-[#FBBF24]" />)}
                            </div>
                          </div>
                        ))}
                      </div>

                   </div>

                   {/* Trust Bar Bottom */}
                   <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 text-center px-4">
                      <span className="text-slate-500 text-sm md:text-base tracking-tighter italic">{stats.trustBarText}</span>
                      <span className="h-4 w-px bg-slate-300 hidden sm:block"></span>
                      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                        {stats.certifications?.split(',').map((cert, i) => (
                          <span key={i}>{cert.trim()}</span>
                        ))}
                      </div>
                   </div>

                </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        @media (min-width: 768px) { .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; } }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        
        .custom-scrollbar-preview::-webkit-scrollbar { width: 5px; height: 6px; }
        .custom-scrollbar-preview::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-preview::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar-preview::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default GoogleReviewsEditor;