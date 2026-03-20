import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Sparkles, Calendar, Phone, ArrowRight, Shield, 
  Edit3, Columns, Eye, Type, MousePointer2, Settings2,Save,
  Monitor, Smartphone
} from 'lucide-react';

const CtaEditor = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('split');
  
  const [content, setContent] = useState({
    badge: "We Are Ready To Help",
    titleLine1: "Need Professional",
    titleHighlight: "Cleaning & Repairs?",
    description: "Book your service today and experience top-notch quality from our certified expert team. Your flawless space is just a click away.",
    primaryButtonText: "Book Appointment",
    secondaryButtonText: "Call Us Now",
    phoneNumber: "+18001234567"
  });

  const handleUpdate = (field, value) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-screen flex flex-col bg-[#F1F5F9] overflow-hidden font-sans">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[20] bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 w-1/4 sm:w-1/3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic">
            <Settings2 size={20} className="text-pink-600" /> CTA <span className="text-pink-500">LAB</span>
          </h1>
        </div>

        {/* 3-WAY Toggle */}
        <div className="flex bg-slate-100 p-1 sm:p-1.5 rounded-full shadow-inner w-auto justify-center">
          <button 
            onClick={() => setViewMode('edit')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'edit' ? 'bg-white shadow-md text-pink-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Edit3 size={14} className="hidden sm:block" /> Edit
          </button>
          <button 
            onClick={() => setViewMode('split')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'split' ? 'bg-white shadow-md text-pink-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Columns size={14} className="hidden sm:block" /> Split
          </button>
          <button 
            onClick={() => setViewMode('preview')} 
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'preview' ? 'bg-white shadow-md text-pink-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Eye size={14} className="hidden sm:block" /> Preview
          </button>
        </div>

        <div className="w-1/4 sm:w-1/3 flex justify-end">
          <button className="bg-slate-900 text-white px-4 sm:px-8 py-2.5 rounded-full font-extrabold text-[10px] sm:text-xs flex items-center gap-2 shadow-lg hover:bg-pink-600 transition-all hover:-translate-y-0.5">
            <Save size={14} className="hidden sm:block" /> Deploy
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT: EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-[420px]' : 'w-full'} overflow-y-auto p-6 lg:p-10 bg-[#F8FAFC] custom-scrollbar border-r border-slate-200`}>
            <div className="max-w-3xl mx-auto space-y-8">
              
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-black text-slate-900">CTA Settings</h2>
                <p className="text-xs text-slate-500 font-medium">Edit the content of your Call-to-Action section.</p>
              </div>

              {/* Main Content Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest border-b border-slate-50 pb-4">
                  <Type size={14} /> Typography
                </div>
                
                <div className="space-y-4">
                   <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Badge</label>
                    <input value={content.badge} onChange={(e) => handleUpdate('badge', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-emerald-100" />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Main Title</label>
                      <input value={content.titleLine1} onChange={(e) => handleUpdate('titleLine1', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-emerald-100" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Highlight Title</label>
                      <input value={content.titleHighlight} onChange={(e) => handleUpdate('titleHighlight', e.target.value)} className="w-full px-4 py-2.5 bg-emerald-50/50 border border-emerald-100 text-emerald-700 rounded-xl text-sm font-black outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Description</label>
                    <textarea value={content.description} onChange={(e) => handleUpdate('description', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm h-24 resize-none outline-none leading-relaxed" />
                  </div>
                </div>
              </div>

              {/* Buttons Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest border-b border-slate-50 pb-4">
                  <MousePointer2 size={14} /> Actions
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Primary Btn</label>
                      <input value={content.primaryButtonText} onChange={(e) => handleUpdate('primaryButtonText', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Secondary Btn</label>
                      <input value={content.secondaryButtonText} onChange={(e) => handleUpdate('secondaryButtonText', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Phone Number</label>
                    <input value={content.phoneNumber} onChange={(e) => handleUpdate('phoneNumber', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* RIGHT: PREVIEW  */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className="flex-1 bg-[#CBD5E1] p-4 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden">
            
            <div className="absolute top-4 flex bg-white/50 backdrop-blur-md p-1 rounded-xl border border-white/50 z-20">
              <button className="p-1.5 bg-white shadow-sm rounded-lg text-slate-900"><Monitor size={14}/></button>
              <button className="p-1.5 text-slate-500 hover:text-slate-900 transition-all"><Smartphone size={14}/></button>
            </div>

            <div className={`w-full h-full max-w-[1200px] bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border-[8px] border-slate-900 transition-all duration-500 ${viewMode === 'split' ? 'scale-[0.8] lg:scale-[0.85]' : 'scale-100'}`}>
              
              <div className="h-8 bg-slate-900 flex items-center px-6 gap-1.5 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50 p-6 flex items-center justify-center">
                   <div className="w-full max-w-5xl scale-[0.9] lg:scale-100 transition-transform">
                      <div className="relative bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-200 flex flex-col lg:flex-row">
                        
                        {/* Left Side */}
                        <div className="w-full lg:w-[58%] px-10 py-12 flex flex-col justify-center text-center lg:text-left">
                           <div className="mx-auto lg:mx-0 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-800 font-black text-[9px] uppercase tracking-widest mb-4 w-fit">
                             <Sparkles size={12} className="text-emerald-500" /> {content.badge}
                           </div>
                           <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tighter mb-4">
                              {content.titleLine1} <br />
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-primary-500">
                                 {content.titleHighlight}
                              </span>
                           </h2>
                           <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm mx-auto lg:mx-0">{content.description}</p>
                        </div>

                        {/* Right Side */}
                        <div className="w-full lg:w-[42%] bg-slate-900 p-10 flex flex-col items-center justify-center relative overflow-hidden text-center">
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-[60px]" />
                           <div className="relative z-10 w-full space-y-3">
                              <div className="bg-emerald-600 text-white px-6 py-4 rounded-xl font-black text-xs flex items-center justify-between shadow-lg">
                                 <span className="flex items-center gap-2"><Calendar size={16}/> {content.primaryButtonText}</span>
                                 <ArrowRight size={16} />
                              </div>
                              <div className="bg-white text-slate-900 px-6 py-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-lg">
                                 <Phone size={16} className="text-emerald-600"/> {content.secondaryButtonText}
                              </div>
                           </div>
                           <div className="relative z-10 mt-6 text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                              <Shield size={12} className="text-emerald-500"/> Verified Quality
                           </div>
                        </div>
                      </div>
                   </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default CtaEditor;