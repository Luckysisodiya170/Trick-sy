import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Type, AlignLeft, Monitor, Undo,
  Phone, MessageSquareQuote, Mail, Clock
} from 'lucide-react';

// Adjust the path to wherever your ContactInfo is located
import ContactInfo from '../../../pages/Contact/ContactInfo'; 

const ContactInfoEditor = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // 'edit', 'split', 'preview'

  const defaultData = [
    { id: 1, type: "call", title: "Phone Support", info: "+971 50 123 4567", sub: "Toll-Free UAE" },
    { id: 2, type: "whatsapp", title: "Chat on WhatsApp", info: "+971 50 123 4567", sub: "Instant Reply" },
    { id: 3, type: "email", title: "Email Address", info: "support@tricksy.com", sub: "Reply within 2 hours" },
    { id: 4, type: "time", title: "Working Hours", info: "08:00 AM - 08:00 PM", sub: "Mon - Sat (Sunday Emergency)" }
  ];

  const [formData, setFormData] = useState(defaultData);

  const iconMap = {
    call: <Phone />,
    whatsapp: <MessageSquareQuote />,
    email: <Mail />,
    time: <Clock />
  };

  const handleChange = (id, field, value) => {
    setFormData(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleReset = () => {
    if(window.confirm('Reset all contact info to default values?')) {
      setFormData(defaultData);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Saved Contact Info Data:', formData);
    setIsSaving(false);
    alert('Contact information updated successfully!');
  };

  const previewData = formData.map(item => ({
    ...item,
    icon: iconMap[item.type]
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden">
  
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-3 lg:px-6 py-3 flex items-center justify-between shadow-sm gap-2 shrink-0">
        <div className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm lg:text-lg font-black tracking-tighter italic flex items-center gap-1.5">
            <Settings2 size={18} className="text-indigo-600 lg:w-5 lg:h-5" /> 
            <span className="tracking-tight uppercase">INFO EDITOR</span> 
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
        
        {/* LEFT  */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-3xl mx-auto border-x' : 'w-full lg:w-[450px] border-r'} bg-white border-slate-200 flex flex-col h-full relative z-20 shadow-2xl shadow-slate-200/50 transition-all duration-300`}>
            
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 scrollbar-hide">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Direct Contact Info</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage your communication channels</p>
              </div>

              <div className="space-y-8">
                {formData.map((item, index) => (
                  <div key={item.id} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] space-y-5 relative">
                    
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md flex items-center gap-1.5">
                      {iconMap[item.type]} {item.type === 'time' ? 'Hours' : item.type}
                    </div>

                    <div className="pt-2">
                      <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                        <Type size={12} /> Small Title
                      </label>
                      <input 
                        type="text" 
                        value={item.title} 
                        onChange={(e) => handleChange(item.id, 'title', e.target.value)}
                        className="w-full px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 transition-all shadow-sm" 
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                        <AlignLeft size={12} /> Main Info (Number / Email)
                      </label>
                      <input 
                        type="text" 
                        value={item.info} 
                        onChange={(e) => handleChange(item.id, 'info', e.target.value)}
                        className="w-full px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 transition-all shadow-sm" 
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2">
                        <Type size={12} /> Subtext (Response Time)
                      </label>
                      <input 
                        type="text" 
                        value={item.sub} 
                        onChange={(e) => handleChange(item.id, 'sub', e.target.value)}
                        className="w-full px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-emerald-100 transition-all shadow-sm" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                <Undo size={14} /> Reset Data
              </button>
            </div>
          </div>
        )}

        {/* PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'hidden lg:flex flex-1'} flex-col h-full bg-slate-100 relative transition-all duration-300`}>
            
            <div className="h-12 flex items-center justify-center gap-2 bg-white border-b border-slate-200 shadow-sm shrink-0">
              <Monitor size={14} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Output</span>
            </div>

            <div className="flex-1 overflow-y-auto w-full flex items-start justify-center p-6 lg:p-12">
              <div className="w-full max-w-[500px]">
                <ContactInfo infoData={previewData} />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ContactInfoEditor;