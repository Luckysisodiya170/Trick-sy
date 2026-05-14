import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice'; 
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Monitor, Undo, MapPin, Loader2, Info, Globe
} from 'lucide-react';
import ContactMap from '../../../pages/Contact/ContactMap'; 

const ContactMapEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const subsectionId = id ? parseInt(id, 10) : 37; 

  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 

  const [formData, setFormData] = useState({
    address: ""
  });

  useEffect(() => {
    if (subsectionId) dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setFormData({
        address: content.address || "Dubai, UAE"
      });
    }
  }, [content]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    if(window.confirm('Reset map location to saved values?')) {
      setFormData({
        address: content.address || "Dubai, UAE"
      });
    }
  };

  const handleSave = async () => {
    if (!subsectionId) return alert("Error: Missing Subsection ID.");

    setIsSaving(true);
    try {
      const payload = { address: formData.address };

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();
      
      navigate('/admin/pages/contact');
      alert('Map location updated successfully! 🚀');
    } catch (error) {
      alert('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const encodedAddress = encodeURIComponent(formData.address || 'Dubai, UAE');
  const mapConfig = {
    embedUrl: `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`,
    directionUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING MAP LAB...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden selection:bg-indigo-100">
      
      <nav className="h-16 sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-900">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-[12px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <Settings2 size={16} className="text-indigo-600" /> Map <span className="text-indigo-400">Lab</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <mode.icon size={12} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          <span>{isSaving ? 'UPDATING...' : 'SYNC LOCATION'}</span>
        </button>
      </nav>

      <div className={`mx-auto w-full transition-all duration-700 h-[calc(100vh-64px)] flex ${viewMode === 'split' ? 'flex-row' : 'flex-col'} overflow-hidden`}>
        
        {/* LEFT PANEL: EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-4/12 border-r border-slate-100' : 'w-full max-w-4xl mx-auto mt-8 border rounded-[2rem]'} bg-white flex flex-col h-full overflow-hidden z-10 transition-all duration-300 shadow-2xl shadow-slate-200/50`}>
            
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 custom-scrollbar">
              <div>
                <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase mb-1">Business Location</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Mapping Config</p>
              </div>

              <div className="space-y-5">
                <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 space-y-4 shadow-inner">
                  <label className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    <MapPin size={12} className="text-indigo-500" /> Physical Address String
                  </label>
                  <textarea 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-800 outline-none focus:border-indigo-400 transition-all shadow-sm resize-none leading-relaxed" 
                    placeholder="e.g. Dubai Marina, United Arab Emirates"
                  />
                </div>

                <div className="bg-indigo-50/50 border border-indigo-100 rounded-[1.5rem] p-5 flex gap-4">
                  <Info size={18} className="text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-1">Map the location</h4>
                   
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end pb-20">
                <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                  <Undo size={14} /> Reset to Saved
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT PANEL: BROWSER MOCKUP */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-8/12' : 'w-full'} bg-slate-50 flex flex-col items-center justify-center p-8 relative overflow-hidden`}>
            
            <div className="w-full max-w-[1100px] h-full bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 flex flex-col overflow-hidden">
              
              <div className="flex h-8 bg-slate-900 items-center px-4 gap-1.5 border-b border-slate-800/50 shrink-0">
                 <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" /><div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" /></div>
                 <div className="flex-1 text-center flex items-center justify-center gap-1.5">
                    <Globe size={10} className="text-slate-600" />
                    <span className="text-[6px] font-bold uppercase tracking-widest text-slate-500">tricksy-location.map</span>
                 </div>
              </div>

              <div className="flex-1 bg-white rounded-xl overflow-hidden relative pointer-events-auto">
                 <div className="w-full h-full scale-[1.01] origin-center">
                    <ContactMap mapConfig={mapConfig} />
                 </div>
              </div>
            </div>
            
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-6 flex items-center gap-2">
               <Globe size={12} /> Interactive Real-time Preview
            </p>
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

export default ContactMapEditor;