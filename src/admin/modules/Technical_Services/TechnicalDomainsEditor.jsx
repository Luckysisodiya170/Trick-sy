import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye, Monitor, 
  Plus, Trash2, Type, ChevronRight, List, Upload, AlignLeft, 
  Image as ImageIcon, Sparkles, Wand2
} from 'lucide-react';

const iconLibrary = {
  wrench: 'Wrench', zap: 'Zap', droplets: 'Droplets', 
  grid: 'LayoutGrid', scissors: 'Scissors', ruler: 'Ruler'
};

const MasterTechnicalEditor = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const [domains, setDomains] = useState([
    { 
      title: "Electrical Services", 
      tag: "Wiring & Power", 
      iconKey: 'zap',
      desc: "Complete electrical troubleshooting and panel upgrades.",
      image: null 
    },
    { 
      title: "Plumbing Solutions", 
      tag: "Pipes & Leaks", 
      iconKey: 'droplets',
      desc: "Fast and reliable plumbing services for all your needs.",
      image: null 
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
    const newSection = { title: "New Service", tag: "Category", iconKey: 'grid', desc: "", image: null };
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col h-screen overflow-hidden">
      {/* Top Navigation */}
      <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <Wand2 size={18} className="text-indigo-600" /> Unified Service Editor
          </h1>
        </div>
        <button onClick={() => { setIsSaving(true); setTimeout(() => setIsSaving(false), 1000); }} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-600 transition-all flex items-center gap-2">
          <Save size={14} /> {isSaving ? 'Saving...' : 'Save All Changes'}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* LEFT COLUMN: The Sidebar List */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Expertise List</span>
            <button onClick={addSection} className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all">
              <Plus size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {domains.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveTab(idx)}
                className={`group p-4 rounded-2xl cursor-pointer transition-all border ${activeTab === idx ? 'bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-100' : 'bg-white border-slate-100 hover:border-indigo-200'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-bold text-sm truncate ${activeTab === idx ? 'text-white' : 'text-slate-700'}`}>{item.title || "Untitled"}</h3>
                  <button onClick={(e) => deleteSection(idx, e)} className={`${activeTab === idx ? 'text-indigo-200 hover:text-white' : 'text-slate-300 hover:text-rose-500'} transition-colors`}>
                    <Trash2 size={14} />
                  </button>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${activeTab === idx ? 'text-indigo-200' : 'text-slate-400'}`}>{item.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE COLUMN: Editor Form */}
        <div className="flex-1 bg-white overflow-y-auto p-10 custom-scrollbar border-r border-slate-200">
          <div className="max-w-2xl mx-auto space-y-10">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <Settings2 size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Configure: {domains[activeTab].title}</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Editing Block {activeTab + 1}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Card Title</label>
                <input value={domains[activeTab].title} onChange={(e) => handleUpdate('title', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Short Tag</label>
                <input value={domains[activeTab].tag} onChange={(e) => handleUpdate('tag', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-indigo-600 uppercase tracking-widest outline-none focus:border-indigo-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Right-Side Description</label>
              <textarea value={domains[activeTab].desc} onChange={(e) => handleUpdate('desc', e.target.value)} rows="4" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 outline-none focus:border-indigo-500 transition-all resize-none" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Display Image</label>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleImage} />
              <div onClick={() => fileInputRef.current.click()} className="w-full h-48 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center hover:bg-slate-50 transition-all cursor-pointer overflow-hidden group">
                {domains[activeTab].image ? (
                  <img src={domains[activeTab].image} className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" alt="preview" />
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto text-slate-300 mb-2" size={32} />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Service Image</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Small Preview */}
        <div className="w-[450px] bg-slate-50 flex flex-col shrink-0">
          <div className="h-12 border-b border-slate-200 bg-white flex items-center justify-center gap-2">
            <Eye size={14} className="text-slate-400" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Component Preview</span>
          </div>
          <div className="flex-1 p-6 flex flex-col items-center justify-center">
            <div className="w-full aspect-[4/5] bg-zinc-950 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
              {domains[activeTab].image ? (
                <img src={domains[activeTab].image} className="w-full h-full object-cover opacity-60" alt="mock" />
              ) : <div className="w-full h-full bg-zinc-900" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h4 className="text-white text-3xl font-black uppercase mb-2 leading-none italic">{domains[activeTab].title}</h4>
                <p className="text-zinc-400 text-[10px] line-clamp-2">{domains[activeTab].desc}</p>
                <div className="mt-4 inline-block px-4 py-2 bg-indigo-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">View Details</div>
              </div>
            </div>
            <p className="mt-4 text-[10px] text-slate-400 font-bold italic uppercase tracking-widest">Live Visual Rendering</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterTechnicalEditor;