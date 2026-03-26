import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Plus, X, Trash2, Edit3, ArrowRight, 
  Save, RotateCcw, Search, Box 
} from 'lucide-react';

const themeOptions = {
  slate: { color: 'text-slate-500', bg: 'bg-slate-100', hex: 'bg-slate-500' },
  rose: { color: 'text-rose-500', bg: 'bg-rose-50', hex: 'bg-rose-500' },
  amber: { color: 'text-amber-500', bg: 'bg-amber-50', hex: 'bg-amber-500' },
  emerald: { color: 'text-emerald-500', bg: 'bg-emerald-50', hex: 'bg-emerald-500' },
  teal: { color: 'text-teal-500', bg: 'bg-teal-50', hex: 'bg-teal-500' },
  cyan: { color: 'text-cyan-500', bg: 'bg-cyan-50', hex: 'bg-cyan-500' },
  sky: { color: 'text-sky-500', bg: 'bg-sky-50', hex: 'bg-sky-500' },
  blue: { color: 'text-blue-500', bg: 'bg-blue-50', hex: 'bg-blue-500' },
  indigo: { color: 'text-indigo-500', bg: 'bg-indigo-50', hex: 'bg-indigo-500' },
  violet: { color: 'text-violet-500', bg: 'bg-violet-50', hex: 'bg-violet-500' },
  fuchsia: { color: 'text-fuchsia-500', bg: 'bg-fuchsia-50', hex: 'bg-fuchsia-500' },
};

const PageManager = ({ title, storageKey, defaultSections, iconLibrary, baseRoute, itemLabel = 'Section' }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); 

  const [sections, setSections] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : defaultSections;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(sections));
  }, [sections, storageKey]);

  const [formData, setFormData] = useState({ name: '', path: '', status: 'Draft', theme: 'indigo', iconKey: 'box' });

  const handleDelete = (id, e) => {
    e.stopPropagation(); 
    if(window.confirm(`Delete this ${itemLabel.toLowerCase()} permanently?`)) {
      setSections(sections.filter(sec => sec.id !== id));
    }
  };

  const handleRestore = () => {
    if(window.confirm("Restore default sections?")) {
      setSections(defaultSections);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setFormData({ name: '', path: '', status: 'Draft', theme: 'indigo', iconKey: Object.keys(iconLibrary)[0] || 'box' });
    setIsModalOpen(true);
  };

  const openEdit = (sec, e) => {
    e.stopPropagation();
    setEditingId(sec.id);
    setFormData({ 
      name: sec.name, 
      path: sec.path, 
      status: sec.status, 
      theme: sec.theme || 'indigo', 
      iconKey: sec.iconKey || 'box' 
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    const finalPath = formData.path.trim() || `${baseRoute}/${formData.name.toLowerCase().replace(/\s+/g, '-')}`;
    
    const moduleData = {
      name: formData.name, 
      status: formData.status, 
      iconKey: formData.iconKey, 
      path: finalPath,
      theme: formData.theme, 
      color: themeOptions[formData.theme]?.color || 'text-slate-500', 
      bg: themeOptions[formData.theme]?.bg || 'bg-slate-100'
    };

    if (editingId) {
      setSections(sections.map(sec => sec.id === editingId ? { ...sec, ...moduleData } : sec));
    } else {
      setSections([...sections, { id: `mod-${Date.now()}`, ...moduleData }]);
    }
    setIsModalOpen(false);
  };

  const filteredSections = sections.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-12 font-sans relative">
      <div className="w-full mb-10 md:mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <Sparkles size={14} className="fill-indigo-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Editor</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">{sections.length} Active {itemLabel}s</p>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
             <input 
               type="text" placeholder="Search..." 
               className="pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl w-full md:w-[200px] outline-none focus:ring-2 ring-indigo-500/20 focus:border-indigo-400 shadow-sm font-bold text-xs"
               onChange={(e) => setSearch(e.target.value)}
             />
          </div>
          <button onClick={handleRestore} className="px-4 py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-2 shadow-sm">
            <RotateCcw size={14} /> Defaults
          </button>
          <button className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 rounded-xl hover:shadow-xl transition-all active:scale-95">
            Publish Changes
          </button>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        {filteredSections.map((sec) => {
          const IconComponent = iconLibrary[sec.iconKey] || Box; 
          return (
            <div key={sec.id} onClick={() => navigate(sec.path)} className="group relative bg-white p-4 md:p-5 rounded-[1.5rem] border border-slate-100 shadow-sm hover:border-indigo-500/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 cursor-pointer overflow-hidden min-h-[90px] animate-in fade-in zoom-in-95">
              <div className={`w-12 h-12 rounded-2xl ${sec.bg} ${sec.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0`}>
                <IconComponent size={20} />
              </div>
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <h3 className="text-[14px] md:text-[15px] font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight truncate">
                    {sec.name}
                  </h3>
                  {sec.status === 'Draft' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>}
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none italic">{sec.status}</p>
              </div>
              <div className="relative shrink-0 w-8 h-8 flex items-center justify-end">
                <div className="absolute right-0 text-slate-300 transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-2">
                  <ArrowRight size={18} />
                </div>
                <div className="absolute right-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <button onClick={(e) => openEdit(sec, e)} className="p-2 text-slate-400 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl"><Edit3 size={14} /></button>
                  <button onClick={(e) => handleDelete(sec.id, e)} className="p-2 text-slate-400 bg-slate-50 hover:bg-rose-50 hover:text-rose-500 rounded-xl"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          );
        })}

        <div onClick={openCreate} className="group p-4 md:p-5 rounded-[1.5rem] border-2 border-dashed border-slate-200 flex items-center gap-4 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50/50 transition-all cursor-pointer min-h-[90px] active:scale-95">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-white transition-all duration-300 shrink-0">
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </div>
          <div className="flex-1"><h3 className="text-[14px] font-bold text-slate-700 group-hover:text-indigo-600">Add {itemLabel}</h3></div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
            <div className="px-8 pt-8 pb-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{editingId ? `Edit ${itemLabel}` : `Create New ${itemLabel}`}</h2>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Configure your layout block</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all border border-slate-100"><X size={18} /></button>
            </div>
            
            <div className="overflow-y-auto flex-1 p-8 sm:p-10 custom-scrollbar">
              <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Name</label>
                    <input required autoFocus value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-indigo-100 transition-all" placeholder="e.g. Hero Section" />
                  </div>
                  <div className="md:col-span-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none cursor-pointer">
                      <option value="Draft">Draft</option>
                      <option value="Live">Live</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-slate-50">
                  <div className="md:col-span-5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Theme Color</label>
                    <div className="flex flex-wrap gap-2.5">
                      {Object.keys(themeOptions).map((themeKey) => (
                        <button key={themeKey} type="button" onClick={() => setFormData({...formData, theme: themeKey})} className={`w-7 h-7 rounded-full transition-all ${themeOptions[themeKey].hex} ${formData.theme === themeKey ? 'ring-4 ring-offset-2 ring-indigo-100 scale-110 shadow-md' : 'opacity-40 hover:opacity-100'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-7">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Icon Representative</label>
                    <div className="grid grid-cols-6 gap-2 bg-slate-50 p-4 rounded-[1.5rem] border border-slate-100 max-h-[180px] overflow-y-auto custom-scrollbar">
                      {Object.keys(iconLibrary).map((key) => {
                        const IconComponent = iconLibrary[key];
                        return (
                          <button key={key} type="button" onClick={() => setFormData({...formData, iconKey: key})} className={`aspect-square rounded-xl flex items-center justify-center transition-all ${formData.iconKey === key ? 'bg-indigo-600 text-white shadow-lg scale-110' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-100'}`}>
                            <IconComponent size={20} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="px-8 py-5 border-t border-slate-50 flex justify-end gap-4 bg-white">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50">Cancel</button>
              <button onClick={handleSave} className="px-8 py-3 rounded-xl text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg flex items-center gap-2 transition-all">
                <Save size={18} /> {editingId ? 'UPDATE' : 'CREATE'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageManager;