import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Type, AlignLeft, Monitor, Undo, Plus, Trash2,
  Phone, MessageSquare, Mail, Clock, MapPin, Globe, Link2
} from 'lucide-react';
import ContactInfo from '../../../pages/Contact/ContactInfo'; 

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
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 

  const defaultData = [
    { id: 1, iconKey: "Phone", title: "Phone Support", info: "+971 50 123 4567", sub: "Toll-Free UAE" },
    { id: 2, iconKey: "MessageSquare", title: "Chat on WhatsApp", info: "+971 50 123 4567", sub: "Instant Reply" },
    { id: 3, iconKey: "Mail", title: "Email Address", info: "support@tricksy.com", sub: "Reply within 2 hours" },
    { id: 4, iconKey: "Clock", title: "Working Hours", info: "08:00 AM - 08:00 PM", sub: "Mon - Sat" }
  ];

  const [formData, setFormData] = useState(defaultData);

  const handleChange = (id, field, value) => {
    setFormData(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      iconKey: "MapPin",
      title: "New Contact Method",
      info: "Details",
      sub: "Subtext"
    };
    setFormData(prev => [...prev, newItem]);
  };

  const handleRemoveItem = (id) => {
    setFormData(prev => prev.filter(item => item.id !== id));
  };

  const handleReset = () => {
    if(window.confirm('Reset all contact info to default values?')) {
      setFormData(defaultData);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Replace this timeout with your actual Backend API call (e.g., axios.post('/api/contact', formData))
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    alert('Contact information saved successfully!');
  };

  const previewData = formData.map(item => ({
    ...item,
    icon: iconOptions[item.iconKey] || Phone
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
          className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-indigo-600 transition-all flex-shrink-0 disabled:opacity-70"
        >
          {isSaving ? <span className="animate-pulse">Saving...</span> : <><Save size={16} className="lg:w-[14px] lg:h-[14px]" /> <span className="hidden md:inline">Save Changes</span></>}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT SIDE: FORM EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-3xl mx-auto border-x' : 'w-full lg:w-[450px] border-r'} bg-white border-slate-200 flex flex-col h-full relative z-20 transition-all duration-300`}>
            
            <div className="p-5 border-b border-slate-100 bg-white flex items-center justify-between shrink-0">
               <div>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">Contact Methods</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Manage support options</p>
               </div>
               <button onClick={handleAddItem} className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                  <Plus size={14} /> Add New
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 lg:p-6 space-y-6 scrollbar-hide bg-slate-50/30">
              <div className="space-y-6">
                {formData.map((item) => {
                  const IconComponent = iconOptions[item.iconKey] || Phone;
                  return (
                    <div key={item.id} className="p-5 bg-white border border-slate-200 rounded-2xl relative shadow-sm group hover:border-indigo-200 transition-all">
                      
                      <button onClick={() => handleRemoveItem(item.id)} className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200 shadow-md opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 z-10">
                        <Trash2 size={12} />
                      </button>

                      <div className="mb-5">
                         <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">
                            <IconComponent size={10} /> Select Icon
                         </label>
                         <select value={item.iconKey} onChange={(e) => handleChange(item.id, 'iconKey', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 outline-none focus:ring-2 ring-indigo-100 transition-all">
                            {Object.keys(iconOptions).map(key => (
                               <option key={key} value={key}>{key} Icon</option>
                             ))}
                         </select>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5"><Type size={10} /> Label</label>
                          <input type="text" value={item.title} onChange={(e) => handleChange(item.id, 'title', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 transition-all" />
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5"><AlignLeft size={10} /> Information</label>
                          <input type="text" value={item.info} onChange={(e) => handleChange(item.id, 'info', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 ring-indigo-100 transition-all" />
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5"><Type size={10} /> Status / Subtext</label>
                          <input type="text" value={item.sub} onChange={(e) => handleChange(item.id, 'sub', e.target.value)} className="w-full px-4 py-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs font-bold text-emerald-600 outline-none focus:ring-2 ring-emerald-200 transition-all" />
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-white flex justify-end shrink-0">
              <button onClick={handleReset} className="flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-amber-600 transition-all"><Undo size={12} /> Reset Defaults</button>
            </div>
          </div>
        )}

        {/* RIGHT SIDE: LIVE PREVIEW */}
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