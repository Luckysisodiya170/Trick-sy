import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Monitor, Undo, MapPin
} from 'lucide-react';
import ContactMap from '../../../pages/Contact/ContactMap'; 

const ContactMapEditor = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 

  const defaultData = {
    address: "Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Dubai"
  };

  const [formData, setFormData] = useState(defaultData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    if(window.confirm('Reset map location to default?')) {
      setFormData(defaultData);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    alert('Map location updated successfully!');
  };

  const encodedAddress = encodeURIComponent(formData.address || 'Dubai, UAE');
  const mapConfig = {
    embedUrl: `https://www.google.com/maps?q=${encodedAddress}&output=embed`,
    directionUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden">
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-3 lg:px-6 py-3 flex items-center justify-between shadow-sm gap-2 shrink-0">
        <div className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm lg:text-lg font-black tracking-tighter italic flex items-center gap-1.5">
            <Settings2 size={18} className="text-indigo-600 lg:w-5 lg:h-5" /> 
            <span className="tracking-tight uppercase">MAP EDITOR</span> 
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
        
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-3xl mx-auto border-x' : 'w-full lg:w-[420px] border-r'} bg-white border-slate-200 flex flex-col h-full relative z-20 shadow-2xl shadow-slate-200/50 transition-all duration-300`}>
            
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 scrollbar-hide">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Location Details</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Set your business address</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                    <MapPin size={12} /> Business Address
                  </label>
                  <textarea 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-semibold text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all shadow-inner resize-none" 
                    placeholder="Enter full address, city, or landmark..."
                  ></textarea>
                </div>

                <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5">
                  <h4 className="text-[11px] font-black text-emerald-900 uppercase tracking-widest mb-1.5">How it works</h4>
                  <p className="text-xs text-emerald-800/80 font-medium leading-relaxed">
                    Just type your physical address or a known landmark. The system will automatically generate the correct interactive map and driving directions link for your customers.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                <Undo size={14} /> Reset Data
              </button>
            </div>
          </div>
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'hidden lg:flex flex-1'} flex-col h-full bg-slate-100/50 relative transition-all duration-300`}>
            
            <div className="h-12 flex items-center justify-center gap-2 bg-white border-b border-slate-200 shadow-sm shrink-0">
              <Monitor size={14} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Output</span>
            </div>

            <div className="flex-1 overflow-y-auto w-full flex items-center justify-center p-4 lg:p-8">
              <div className="w-full h-full">
                <ContactMap mapConfig={mapConfig} />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ContactMapEditor;