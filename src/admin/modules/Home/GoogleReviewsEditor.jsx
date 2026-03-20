import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Trash2, Star, CheckCircle2, 
  ArrowUpRight, Upload, User, Eye, Edit3, Columns,
  Globe, MessageSquare, ChevronDown, Settings2,Save,
} from 'lucide-react';

const GoogleReviewsEditor = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('split');
  const [activeCard, setActiveCard] = useState(null);

  const [stats, setStats] = useState({
    ratingText: "Excellent",
    totalReviews: "482",
    reviewLink: "#",
    trustBarText: "TRUSTED BY DUBAI'S BEST",
    certifications: "Property Finder Approved, Dubai Municipality Certified"
  });

  const [reviews, setReviews] = useState([
    { id: 1, author: "Omar Al-Sayed", time: "2 days ago", text: "Best maintenance team in Dubai. Fixed my AC in 30 mins! Super professional and polite staff.", rating: 5, avatar: null },
    { id: 2, author: "Jessica M.", time: "1 week ago", text: "Highly recommend for deep cleaning. Every corner was spotless. Worth every dirham!", rating: 5, avatar: null }
  ]);

  const updateReview = (id, field, value) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleAddReview = () => {
    const newId = Date.now();
    setReviews([...reviews, { id: newId, author: "New Reviewer", time: "Just now", text: "Write your review here...", rating: 5, avatar: null }]);
    setActiveCard(newId);
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden font-sans">
      
      {/* NAVBAR */}
         <nav className="sticky top-0 z-[20] bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 w-1/4 sm:w-1/3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic">
            <Settings2 size={20} className="text-blue-600" /> GOOGLE REVIEWS <span className="text-blue-500">LAB</span>
          </h1>
        </div>

        {/* 3-Way View Mode Toggle */}
        <div className="flex bg-slate-100 p-1 sm:p-1.5 rounded-full shadow-inner w-auto justify-center">
          <button 
            onClick={() => setViewMode('edit')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'edit' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Edit3 size={14} className="hidden sm:block" /> Edit
          </button>
          <button 
            onClick={() => setViewMode('split')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'split' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Columns size={14} className="hidden sm:block" /> Split
          </button>
          <button 
            onClick={() => setViewMode('preview')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'preview' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Eye size={14} className="hidden sm:block" /> Preview
          </button>
        </div>

        <div className="w-1/4 sm:w-1/3 flex justify-end">
          <button className="bg-slate-900 text-white px-4 sm:px-8 py-2.5 rounded-full font-extrabold text-[10px] sm:text-xs flex items-center gap-2 shadow-lg hover:bg-blue-600 transition-all hover:-translate-y-0.5">
            <Save size={14} className="hidden sm:block" /> Deploy
          </button>
        </div>
      </nav>
      <div className="flex-1 flex overflow-hidden">
        
        {/* EDITOR PANEL */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-[420px]' : 'w-full'} overflow-y-auto p-6 lg:p-10 bg-[#F8FAFC] custom-scrollbar border-r border-slate-200`}>
            <div className="max-w-3xl mx-auto space-y-8">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Reviews Content</h2>
                  <p className="text-xs text-slate-500 font-medium">Add or edit customer feedback.</p>
                </div>
                <button onClick={handleAddReview} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-[10px] flex items-center gap-2 hover:bg-slate-900 transition-all shadow-md active:scale-95">
                  <Plus size={16} /> ADD NEW
                </button>
              </div>

              {/* STATS SECTION */}
              <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest border-b border-slate-50 pb-4">
                  <Globe size={14} /> Global Statistics
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">Rating Title</label>
                    <input value={stats.ratingText} onChange={(e) => setStats({...stats, ratingText: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-blue-50 focus:bg-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">Total Reviews</label>
                    <input value={stats.totalReviews} onChange={(e) => setStats({...stats, totalReviews: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-blue-50 focus:bg-white" />
                  </div>
                </div>
              </section>

              {/* REVIEWS LIST */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <MessageSquare size={14} className="text-blue-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Review Cards</span>
                </div>

                {reviews.map((rev) => (
                  <div key={rev.id} className={`bg-white rounded-2xl border transition-all duration-300 ${activeCard === rev.id ? 'ring-4 ring-blue-50 border-blue-200 shadow-lg' : 'border-slate-200 hover:border-slate-300'}`}>
                    <div onClick={() => setActiveCard(activeCard === rev.id ? null : rev.id)} className="p-4 flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-100 overflow-hidden shrink-0">
                          {rev.avatar ? <img src={rev.avatar} className="w-full h-full object-cover" /> : <User className="text-slate-300" size={18} />}
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="font-bold text-xs text-slate-800 truncate">{rev.author}</h4>
                          <p className="text-[9px] font-bold text-blue-500 uppercase">{rev.time}</p>
                        </div>
                      </div>
                      <ChevronDown size={16} className={`text-slate-300 transition-transform ${activeCard === rev.id ? 'rotate-180 text-blue-500' : ''}`} />
                    </div>

                    {activeCard === rev.id && (
                      <div className="px-5 pb-6 pt-2 border-t border-slate-50 space-y-4 animate-in fade-in slide-in-from-top-1">
                        <div className="grid grid-cols-2 gap-3">
                          <input placeholder="Name" value={rev.author} onChange={(e) => updateReview(rev.id, 'author', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold outline-none focus:bg-white" />
                          <input placeholder="Time" value={rev.time} onChange={(e) => updateReview(rev.id, 'time', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold outline-none focus:bg-white" />
                        </div>
                        <textarea placeholder="Write review..." value={rev.text} onChange={(e) => updateReview(rev.id, 'text', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs h-20 resize-none outline-none leading-relaxed" />
                        <div className="flex items-center justify-between pt-2">
                           <div className="flex gap-1">
                              {[1,2,3,4,5].map(n => (
                                <Star key={n} size={16} onClick={() => updateReview(rev.id, 'rating', n)} className={`cursor-pointer transition-all ${rev.rating >= n ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                              ))}
                           </div>
                           <button onClick={() => setReviews(reviews.filter(r => r.id !== rev.id))} className="text-rose-500 p-2 hover:bg-rose-50 rounded-lg transition-colors">
                              <Trash2 size={16} />
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

        {/* PREVIEW PANEL */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className="flex-1 bg-slate-200 p-4 lg:p-10 flex items-center justify-center overflow-hidden">
            <div className={`w-full h-full max-w-6xl bg-white shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col border-[8px] border-slate-900 transition-all duration-500 ${viewMode === 'split' ? 'scale-[0.9]' : 'scale-100'}`}>
                
                {/* Browser Header */}
                <div className="h-8 bg-slate-900 flex items-center px-6 gap-1.5 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>

                {/* SCROLLABLE CONTENT AREA */}
                <div className="flex-1 overflow-y-auto bg-white py-12 px-6 lg:px-12 custom-scrollbar-preview">
                   <div className="max-w-5xl mx-auto space-y-12">
                      
                      <div className="bg-slate-50 rounded-[3.5rem] p-8 lg:p-12 flex flex-col lg:flex-row items-start gap-12 border border-slate-100">
                         
                         {/* Left Sidebar */}
                         <div className="w-full lg:w-[30%] text-center lg:text-left space-y-4 lg:border-r border-slate-200 lg:pr-10 shrink-0 lg:mt-4">
                            <h3 className="text-5xl font-black text-slate-900 tracking-tighter">{stats.ratingText}</h3>
                            <div className="flex items-center justify-center lg:justify-start gap-1">
                               {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-amber-400 text-amber-400" />)}
                            </div>
                            <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em]">
                               {stats.totalReviews} Total Verified Reviews
                            </p>
                            <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest justify-center lg:justify-start pt-2 cursor-pointer hover:gap-3 transition-all">
                               Post a review <ArrowUpRight size={14} />
                            </div>
                         </div>

                         {/* Right Grid  */}
                         <div className="w-full lg:w-[70%] grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {reviews.map((rev) => (
                               <div key={rev.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow animate-in zoom-in-95 duration-300">
                                  <div>
                                     <div className="flex gap-3 items-center mb-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                                           {rev.avatar ? <img src={rev.avatar} className="w-full h-full object-cover" /> : <User size={18} className="text-slate-300"/>}
                                        </div>
                                        <div className="overflow-hidden text-left">
                                           <h4 className="text-[11px] font-black text-slate-900 flex items-center gap-1.5 truncate">
                                              {rev.author} <CheckCircle2 className="w-3 h-3 text-blue-500" fill="currentColor" />
                                           </h4>
                                           <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{rev.time}</p>
                                        </div>
                                     </div>
                                     <p className="text-[11px] text-slate-600 font-medium leading-relaxed italic">"{rev.text || 'No review text provided yet...'}"</p>
                                  </div>
                                  <div className="mt-4 flex gap-0.5">
                                     {[...Array(rev.rating)].map((_, i) => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>

                      {/* Trust Bar */}
                      <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 px-6 py-4">
                         <span className="font-black text-xl tracking-tighter italic text-slate-900">{stats.trustBarText}</span>
                         <div className="h-4 w-px bg-slate-300 hidden sm:block" />
                         {stats.certifications.split(',').map((cert, i) => (
                           <span key={i} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">{cert.trim()}</span>
                         ))}
                      </div>

                   </div>
                </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        
        .custom-scrollbar-preview::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar-preview::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-preview::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar-preview::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default GoogleReviewsEditor;