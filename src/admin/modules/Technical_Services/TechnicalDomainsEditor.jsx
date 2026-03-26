import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye, Plus, Trash2, 
  Type, ChevronRight, Upload, AlignLeft, Wand2, Wrench, Zap, 
  Droplets, LayoutGrid, Scissors, Ruler, Star, Hammer, Lightbulb, 
  ShieldCheck, PenTool, Smartphone, Monitor
} from 'lucide-react';

const availableIcons = [
  { id: 'wrench', component: <Wrench size={18} />, label: 'Repair' },
  { id: 'zap', component: <Zap size={18} />, label: 'Electric' },
  { id: 'droplets', component: <Droplets size={18} />, label: 'Plumbing' },
  { id: 'grid', component: <LayoutGrid size={18} />, label: 'General' },
  { id: 'hammer', component: <Hammer size={18} />, label: 'Build' },
  { id: 'bulb', component: <Lightbulb size={18} />, label: 'Idea' },
  { id: 'shield', component: <ShieldCheck size={18} />, label: 'Safety' },
  { id: 'pen', component: <PenTool size={18} />, label: 'Design' },
  { id: 'phone', component: <Smartphone size={18} />, label: 'Mobile' },
  { id: 'monitor', component: <Monitor size={18} />, label: 'IT' },
];

const MasterTechnicalEditor = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 

  const [domains, setDomains] = useState([
    { 
      title: "Handyman Services", 
      tag: "FURNITURE", 
      desc: "Furniture assembly, TV mounting, drilling, and general home repairs.",
      image: null,
      iconId: 'wrench'
    },
    { 
      title: "Electrical Services", 
      tag: "WIRING", 
      desc: "Complete electrical troubleshooting and panel upgrades.",
      image: null,
      iconId: 'zap'
    }
  ]);

  const handleUpdate = (field, value) => {
    const newDomains = [...domains];
    newDomains[activeTab][field] = value;
    setDomains(newDomains);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUpdate('image', URL.createObjectURL(file));
    }
  };

  const addSection = () => {
    const newSection = { title: "New Service", tag: "CATEGORY", desc: "", image: null, iconId: 'grid' };
    setDomains([...domains, newSection]);
    setActiveTab(domains.length);
  };

  const deleteSection = (index, e) => {
    e.stopPropagation();
    if (domains.length > 1) {
      const filtered = domains.filter((_, i) => i !== index);
      setDomains(filtered);
      setActiveTab(0);
    }
  };

  const getIcon = (id) => availableIcons.find(icon => icon.id === id)?.component || <LayoutGrid size={18} />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col h-screen overflow-hidden font-sans text-slate-900">
      
      {/* NAVBAR */}
      <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-slate-400">
             SERVICE EDITOR
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
          {['edit', 'split', 'preview'].map((mode) => (
            <button 
              key={mode} 
              onClick={() => setViewMode(mode)} 
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all capitalize ${
                viewMode === mode ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <button onClick={() => { setIsSaving(true); setTimeout(() => setIsSaving(false), 1000); }} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-600 transition-all">
          {isSaving ? 'Saving...' : 'Save All'}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden p-4 gap-4">
        
        {/* SIDEBAR */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className="w-[320px] flex flex-col shrink-0 animate-in slide-in-from-left duration-300">
             <div className="px-2 mb-4 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Expertise Domains</span>
                <Plus size={16} onClick={addSection} className="cursor-pointer text-slate-400 hover:text-indigo-600" />
             </div>
             <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                {domains.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveTab(idx)}
                    className={`relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                      activeTab === idx ? 'bg-black border-black text-white shadow-xl' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${activeTab === idx ? 'bg-[#1DB954] text-black' : 'bg-slate-50 text-slate-400'}`}>
                      {getIcon(item.iconId)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm truncate">{item.title || "New Service"}</h3>
                      <p className={`text-[9px] font-bold tracking-widest uppercase ${activeTab === idx ? 'text-[#1DB954]' : 'text-slate-400'}`}>{item.tag || "N/A"}</p>
                    </div>
                    {activeTab === idx && <ChevronRight size={14} className="text-[#1DB954]" />}
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`flex-1 bg-white rounded-[2rem] overflow-y-auto custom-scrollbar border border-slate-200 shadow-sm ${viewMode === 'edit' ? 'max-w-4xl mx-auto' : ''}`}>
            <div className="p-10 space-y-8">
              <h2 className="text-xl font-black uppercase italic border-b border-slate-100 pb-4">Configure Content</h2>

              {/* Icon Selector Section */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Select Domain Icon</label>
                <div className="flex flex-wrap gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  {availableIcons.map((icon) => (
                    <button
                      key={icon.id}
                      onClick={() => handleUpdate('iconId', icon.id)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        domains[activeTab].iconId === icon.id 
                        ? 'bg-indigo-600 text-white scale-110 shadow-lg' 
                        : 'bg-white text-slate-400 hover:text-indigo-600 border border-slate-200'
                      }`}
                      title={icon.label}
                    >
                      {icon.component}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Title</label>
                  <input value={domains[activeTab].title} onChange={(e) => handleUpdate('title', e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-indigo-50 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Tagline</label>
                  <input value={domains[activeTab].tag} onChange={(e) => handleUpdate('tag', e.target.value)} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black text-indigo-600 uppercase tracking-widest outline-none focus:ring-2 ring-indigo-50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Description</label>
                <textarea value={domains[activeTab].desc} onChange={(e) => handleUpdate('desc', e.target.value)} rows="3" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-600 outline-none focus:ring-2 ring-indigo-50 transition-all resize-none" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Image</label>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleImage} accept="image/*" />
                <div onClick={() => fileInputRef.current.click()} className="w-full h-32 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center hover:bg-slate-50 transition-all cursor-pointer overflow-hidden">
                  {domains[activeTab].image ? <img src={domains[activeTab].image} className="w-full h-full object-cover" alt="preview" /> : <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Update Photo</p>}
                </div>
              </div>
              
              <button onClick={(e) => deleteSection(activeTab, e)} className="text-rose-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-70">
                <Trash2 size={14} /> Delete this domain
              </button>
            </div>
          </div>
        )}

        {/* VISUAL PREVIEW */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className="flex-1 flex flex-col animate-in fade-in duration-500">
            <div className="flex-1 rounded-[2.5rem] overflow-hidden relative shadow-2xl bg-zinc-900 border border-white/5">
              {domains[activeTab].image && <img src={domains[activeTab].image} className="w-full h-full object-cover opacity-70" alt="bg" />}
              
              <div className="absolute top-6 right-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white text-[9px] font-black uppercase tracking-widest">Premium Service</span>
              </div>

              <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-2xl rounded-[2rem] p-10 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                   <div className="text-[#1DB954]">{getIcon(domains[activeTab].iconId)}</div>
                   <span className="text-[#1DB954] text-[10px] font-black uppercase tracking-[0.2em]">{domains[activeTab].tag}</span>
                </div>
                <h4 className="text-white text-5xl font-black uppercase mb-4 tracking-tighter italic leading-none">{domains[activeTab].title}</h4>
                <p className="text-slate-300 text-sm font-medium mb-8 max-w-lg leading-relaxed">{domains[activeTab].desc}</p>
                <button className="bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-4 hover:bg-[#1DB954] transition-all">
                  Book This Service <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MasterTechnicalEditor;