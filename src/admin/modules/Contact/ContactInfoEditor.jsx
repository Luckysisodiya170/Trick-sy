import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Type, AlignLeft, Monitor, Undo, Plus, Trash2,
  Phone, MessageSquare, Mail, Clock, MapPin, Globe, Link2, Loader2
} from 'lucide-react';

const iconOptions = {
  Phone: Phone,
  MessageSquare: MessageSquare,
  Mail: Mail,
  Clock: Clock,
  MapPin: MapPin,
  Globe: Globe,
  Link2: Link2
};

const ContactInfoEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const subsectionId = id ? parseInt(id, 10) : 35; 

  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (subsectionId) dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      if (content.id == subsectionId || content.subsectionId == subsectionId) {
        if (content.infoItems && content.infoItems.length > 0) {
          setFormData(content.infoItems);
        } else {
          // Default state if empty
          setFormData([
            { id: 1, iconKey: "Phone", title: "PHONE SUPPORT", info: "+971 50 123 4567", sub: "Toll-Free UAE" },
            { id: 2, iconKey: "MessageSquare", title: "CHAT ON WHATSAPP", info: "+971 50 123 4567", sub: "Instant Reply" },
            { id: 3, iconKey: "Mail", title: "EMAIL ADDRESS", info: "support@tricksy.com", sub: "Reply within 2 hours" }
          ]);
        }
      }
    }
  }, [content, subsectionId]);

  const handleChange = (id, field, value) => {
    setFormData(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleAddItem = () => {
    const newItem = { id: Date.now(), iconKey: "Phone", title: "NEW LABEL", info: "Enter Details", sub: "Subtext" };
    setFormData(prev => [...prev, newItem]);
  };

  const handleRemoveItem = (id) => {
    if(window.confirm('Remove this contact method?')) {
        setFormData(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleReset = () => {
    if(window.confirm('Reset to saved values?')) {
      setFormData(content.infoItems || []);
    }
  };

  const handleSave = async () => {
    if (!subsectionId) return alert("Error: Missing Subsection ID.");
    setIsSaving(true);
    try {
      const payload = { infoItems: formData };
      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      
      navigate('/admin/pages/contact');
      alert('Contact Info Updated! 🚀');
    } catch (error) {
      alert('Failed to save.');
    } finally { 
      setIsSaving(false); 
    }
  };

  if (status === 'loading' && formData.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING INFO LAB...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#FDFDFD] font-sans overflow-hidden selection:bg-emerald-100">
      
      {/* NAVBAR */}
      <nav className="h-16 sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-900">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-[12px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <Settings2 size={16} className="text-emerald-600" /> Info <span className="text-emerald-400">Lab</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <mode.icon size={12} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button onClick={handleSave} disabled={isSaving} className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50">
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          <span>{isSaving ? 'SAVING...' : 'DEPLOY'}</span>
        </button>
      </nav>

      <div className={`mx-auto w-full transition-all duration-700 h-[calc(100vh-64px)] flex ${viewMode === 'split' ? 'flex-row' : 'flex-col'} overflow-hidden`}>
        
        {/* LEFT PANEL: EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-4/12 border-r border-slate-100' : 'w-full max-w-4xl mx-auto mt-8 border rounded-[2rem]'} bg-white flex flex-col h-full overflow-hidden z-10 transition-all duration-300 shadow-2xl shadow-slate-200/50`}>
            
            <div className="p-6 border-b border-slate-50 bg-white flex items-center justify-between shrink-0">
               <div>
                  <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">Contact Methods</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Support Channels</p>
               </div>
               <button onClick={handleAddItem} className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-emerald-100 active:scale-95">
                  <Plus size={14} /> Add New
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 lg:p-6 space-y-4 custom-scrollbar bg-slate-50/30 pb-20">
              {formData.map((item) => {
                const IconComponent = iconOptions[item.iconKey] || Phone;
                return (
                  <div key={item.id} className="p-5 bg-white border border-slate-100 rounded-[2rem] relative shadow-sm group hover:border-emerald-200 transition-all animate-in slide-in-from-left-2">
                    
                    <button onClick={() => handleRemoveItem(item.id)} className="absolute top-4 right-4 p-2 text-slate-300 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100">
                      <Trash2 size={14} />
                    </button>

                    <div className="space-y-4">
                      <div>
                         <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block flex items-center gap-1.5"><IconComponent size={12} className="text-emerald-500" /> Icon Source</label>
                         <select value={item.iconKey} onChange={(e) => handleChange(item.id, 'iconKey', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-emerald-400 cursor-pointer">
                            {Object.keys(iconOptions).map(key => <option key={key} value={key}>{key}</option>)}
                         </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Label</label>
                          <input type="text" value={item.title} onChange={(e) => handleChange(item.id, 'title', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-emerald-400" />
                        </div>
                        <div>
                          <label className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1 block italic">Status Text</label>
                          <input type="text" value={item.sub} onChange={(e) => handleChange(item.id, 'sub', e.target.value)} className="w-full px-4 py-2.5 bg-emerald-50/30 border border-emerald-100 rounded-xl text-xs font-black text-emerald-700 outline-none focus:border-emerald-400" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Primary Information</label>
                        <input type="text" value={item.info} onChange={(e) => handleChange(item.id, 'info', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-emerald-400" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-white flex justify-end shrink-0">
              <button onClick={handleReset} className="flex items-center gap-1.5 px-4 py-2 text-[9px] uppercase tracking-widest font-black text-slate-400 hover:text-amber-600 transition-all"><Undo size={12} /> Reset Data</button>
            </div>
          </div>
        )}

        {/* RIGHT PANEL */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-8/12' : 'w-full'} bg-slate-50 flex flex-col items-center justify-center p-8 relative overflow-hidden`}>
            
            <div className="w-full max-w-[1000px] h-full bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 flex flex-col">
              <div className="flex h-8 bg-slate-900 items-center px-4 gap-1.5 border-b border-slate-800/50 shrink-0">
                 <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" /></div>
                 <div className="flex-1 text-center"><span className="text-[6px] font-bold uppercase tracking-widest text-slate-500">Contact Info Live</span></div>
              </div>

              <div className="flex-1 bg-slate-50/50 rounded-xl overflow-y-auto custom-scrollbar relative p-10 flex flex-col items-center justify-center pointer-events-none origin-top">
                 <div className="w-full max-w-[500px] flex flex-col gap-5 scale-95 origin-top">
                    {formData.map((item) => {
                      const Icon = iconOptions[item.iconKey] || Phone;
                      return (
                        <div key={item.id} className="bg-white p-6 rounded-3xl flex items-center gap-6 shadow-sm border border-slate-100 transition-all">
                           <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                              <Icon strokeWidth={2.5} size={24} />
                           </div>
                           <div className="min-w-0 flex flex-col justify-center">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.title}</span>
                              <h4 className="text-lg font-black text-slate-900 leading-none mb-1.5">{item.info}</h4>
                              <p className="text-[11px] font-bold text-emerald-500">{item.sub}</p>
                           </div>
                        </div>
                      )
                    })}
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ContactInfoEditor;