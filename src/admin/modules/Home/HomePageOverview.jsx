import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutTemplate, Type, Wrench, Star, ShieldCheck, 
  MessageSquare, HelpCircle, MousePointerClick, 
  ArrowRight, Globe, Sparkles, Plus, X, Box, Trash2, Edit3,
  Image as ImageIcon, FileText, Smartphone, Camera, 
  Calendar, ShoppingBag, Tag, MapPin, Zap, Users, PlayCircle, Code, Save,
  RotateCcw 
} from 'lucide-react';

const iconLibrary = {
  layout: LayoutTemplate, type: Type, wrench: Wrench, star: Star, 
  shield: ShieldCheck, message: MessageSquare, help: HelpCircle, 
  click: MousePointerClick, globe: Globe, box: Box, image: ImageIcon, 
  file: FileText, phone: Smartphone, camera: Camera, calendar: Calendar, 
  shop: ShoppingBag, tag: Tag, map: MapPin, zap: Zap, users: Users, 
  play: PlayCircle, code: Code
};

const defaultSections = [
  { id: 'hero', name: 'Hero Banner', status: 'Live', iconKey: 'layout', path: '/admin/pages/home/hero', color: 'text-blue-500', bg: 'bg-blue-50', theme: 'blue' },
  { id: 'about', name: 'About Us', status: 'Live', iconKey: 'type', path: '/admin/pages/home/about', color: 'text-indigo-500', bg: 'bg-indigo-50', theme: 'indigo' },
  { id: 'services', name: 'Services Grid', status: 'Live', iconKey: 'wrench', path: '/admin/pages/home/services', color: 'text-emerald-500', bg: 'bg-emerald-50', theme: 'emerald' },
  { id: 'popular', name: 'Popular Services', status: 'Live', iconKey: 'star', path: '/admin/pages/home/popular', color: 'text-amber-500', bg: 'bg-amber-50', theme: 'amber' },
  { id: 'why-us', name: 'Why Us Section', status: 'Live', iconKey: 'shield', path: '/admin/pages/home/why-us', color: 'text-rose-500', bg: 'bg-rose-50', theme: 'rose' },
  { id: 'testimonials', name: 'Testimonials', status: 'Live', iconKey: 'message', path: '/admin/pages/home/testimonials', color: 'text-sky-500', bg: 'bg-sky-50', theme: 'sky' },
  { id: 'faq', name: 'FAQ Section', status: 'Live', iconKey: 'help', path: '/admin/pages/home/faq', color: 'text-violet-500', bg: 'bg-violet-50', theme: 'violet' },
  { id: 'cta', name: 'Call to Action', status: 'Live', iconKey: 'click', path: '/admin/pages/home/cta', color: 'text-fuchsia-500', bg: 'bg-fuchsia-50', theme: 'fuchsia' },
  { id: 'google', name: 'Google Reviews', status: 'Live', iconKey: 'globe', path: '/admin/pages/home/reviews', color: 'text-cyan-500', bg: 'bg-cyan-50', theme: 'cyan' },
];

const themeOptions = {
  slate: { color: 'text-slate-500', bg: 'bg-slate-100', hex: 'bg-slate-500' },
  red: { color: 'text-red-500', bg: 'bg-red-50', hex: 'bg-red-500' },
  rose: { color: 'text-rose-500', bg: 'bg-rose-50', hex: 'bg-rose-500' },
  orange: { color: 'text-orange-500', bg: 'bg-orange-50', hex: 'bg-orange-500' },
  amber: { color: 'text-amber-500', bg: 'bg-amber-50', hex: 'bg-amber-500' },
  yellow: { color: 'text-yellow-500', bg: 'bg-yellow-50', hex: 'bg-yellow-500' },
  lime: { color: 'text-lime-500', bg: 'bg-lime-50', hex: 'bg-lime-500' },
  emerald: { color: 'text-emerald-500', bg: 'bg-emerald-50', hex: 'bg-emerald-500' },
  teal: { color: 'text-teal-500', bg: 'bg-teal-50', hex: 'bg-teal-500' },
  cyan: { color: 'text-cyan-500', bg: 'bg-cyan-50', hex: 'bg-cyan-500' },
  sky: { color: 'text-sky-500', bg: 'bg-sky-50', hex: 'bg-sky-500' },
  blue: { color: 'text-blue-500', bg: 'bg-blue-50', hex: 'bg-blue-500' },
  indigo: { color: 'text-indigo-500', bg: 'bg-indigo-50', hex: 'bg-indigo-500' },
  violet: { color: 'text-violet-500', bg: 'bg-violet-50', hex: 'bg-violet-500' },
  fuchsia: { color: 'text-fuchsia-500', bg: 'bg-fuchsia-50', hex: 'bg-fuchsia-500' },
  pink: { color: 'text-pink-500', bg: 'bg-pink-50', hex: 'bg-pink-500' },
};

const HomePageOverview = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); 

  const [sections, setSections] = useState(() => {
    const saved = localStorage.getItem('tricksy_home_modules');
    return saved ? JSON.parse(saved) : defaultSections;
  });

  useEffect(() => {
    localStorage.setItem('tricksy_home_modules', JSON.stringify(sections));
  }, [sections]);

  const [formData, setFormData] = useState({
    name: '', path: '', status: 'Draft', theme: 'blue', iconKey: 'box' 
  });

  const handleDeleteModule = (id, e) => {
    e.stopPropagation(); 
    setSections(sections.filter(sec => sec.id !== id));
  };

  const handleRestoreDefaults = () => {
    if(window.confirm("Restore default modules?")) {
      setSections(defaultSections);
      localStorage.setItem('tricksy_home_modules', JSON.stringify(defaultSections));
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({ name: '', path: '', status: 'Draft', theme: 'blue', iconKey: 'box' });
    setIsModalOpen(true);
  };

  const openEditModal = (sec, e) => {
    e.stopPropagation();
    setEditingId(sec.id);
    setFormData({
      name: sec.name,
      path: sec.path,
      status: sec.status,
      theme: sec.theme || 'blue',
      iconKey: sec.iconKey || 'box'
    });
    setIsModalOpen(true);
  };

  const handleSaveModule = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const finalPath = formData.path.trim() || `/admin/pages/home/${formData.name.toLowerCase().replace(/\s+/g, '-')}`;
    
    const moduleData = {
      name: formData.name,
      status: formData.status,
      iconKey: formData.iconKey,
      path: finalPath,
      theme: formData.theme,
      color: themeOptions[formData.theme].color,
      bg: themeOptions[formData.theme].bg
    };

    if (editingId) {
      setSections(sections.map(sec => sec.id === editingId ? { ...sec, ...moduleData } : sec));
    } else {
      setSections([...sections, { id: `custom-${Date.now()}`, ...moduleData }]);
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-12 font-sans relative">
      <div className="w-full mb-10 md:mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Sparkles size={14} className="fill-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Editor</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Home Section</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">{sections.length} Modules Active</p>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={handleRestoreDefaults} className="px-4 py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-2 shadow-sm">
            <RotateCcw size={14} /> Restore Defaults
          </button>
          <button className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 rounded-xl hover:shadow-xl transition-all active:scale-95">
            Publish Changes
          </button>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        {sections.map((sec) => {
          const IconComponent = iconLibrary[sec.iconKey] || Box; 
          return (
            <div key={sec.id} onClick={() => navigate(sec.path)} className="group relative bg-white p-4 md:p-5 rounded-[1.5rem] border border-slate-100 shadow-sm hover:border-blue-500/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 cursor-pointer overflow-hidden min-h-[90px] animate-in fade-in zoom-in-95">
              
              <div className={`w-12 h-12 rounded-2xl ${sec.bg} ${sec.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0`}>
                <IconComponent size={20} />
              </div>
              
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <h3 className="text-[14px] md:text-[15px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
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
                  <button onClick={(e) => openEditModal(sec, e)} className="p-2 text-slate-400 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={(e) => handleDeleteModule(sec.id, e)} className="p-2 text-slate-400 bg-slate-50 hover:bg-rose-50 hover:text-rose-500 rounded-xl">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="absolute inset-x-6 bottom-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            </div>
          );
        })}

        <div onClick={openCreateModal} className="group p-4 md:p-5 rounded-[1.5rem] border-2 border-dashed border-slate-200 flex items-center gap-4 text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer min-h-[90px] active:scale-95">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-white transition-all duration-300 shrink-0">
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-[14px] font-bold text-slate-700 group-hover:text-blue-600">Add Module</h3>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-8 pt-8 pb-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{editingId ? 'Edit Module' : 'Create Custom Module'}</h2>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Configure your section block</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all border border-slate-100"><X size={18} /></button>
            </div>
            
            <div className="overflow-y-auto flex-1 p-8 sm:p-10">
              <form onSubmit={handleSaveModule} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Module Name</label>
                    <input required autoFocus placeholder="e.g. Hero Banner" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 ring-blue-100" />
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
                        <button key={themeKey} type="button" onClick={() => setFormData({...formData, theme: themeKey})} className={`w-7 h-7 rounded-full transition-all ${themeOptions[themeKey].hex} ${formData.theme === themeKey ? 'ring-4 ring-offset-2 ring-blue-100 scale-110 shadow-md' : 'opacity-40 hover:opacity-100'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-7">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Icon</label>
                    <div className="grid grid-cols-6 gap-2 bg-slate-50 p-4 rounded-[1.5rem] border border-slate-100">
                      {Object.keys(iconLibrary).map((key) => {
                        const IconComponent = iconLibrary[key];
                        return (
                          <button key={key} type="button" onClick={() => setFormData({...formData, iconKey: key})} className={`aspect-square rounded-xl flex items-center justify-center transition-all ${formData.iconKey === key ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100'}`}>
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
              <button onClick={handleSaveModule} className="px-8 py-3 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-lg flex items-center gap-2">
                <Save size={18} /> {editingId ? 'SAVE CHANGES' : 'CREATE MODULE'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageOverview;