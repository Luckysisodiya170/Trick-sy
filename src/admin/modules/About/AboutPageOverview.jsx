import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutTemplate, Target, Heart, Milestone, Users, 
  ShieldCheck, Sparkles, Plus, X, Box, Trash2, Edit3,
  ArrowRight, Save, RotateCcw 
} from 'lucide-react';

const iconLibrary = {
  hero: LayoutTemplate, mission: Target, values: Heart,
  timeline: Milestone, team: Users, whyus: ShieldCheck, box: Box
};

const defaultSections = [
  { id: 'about-hero', name: 'About Hero', status: 'Live', iconKey: 'hero', path: '/admin/pages/about/hero', color: 'text-blue-500', bg: 'bg-blue-50', theme: 'blue' },
  { id: 'about-mission', name: 'Our Mission', status: 'Live', iconKey: 'mission', path: '/admin/pages/about/mission', color: 'text-indigo-500', bg: 'bg-indigo-50', theme: 'indigo' },
  { id: 'about-values', name: 'Core Values', status: 'Live', iconKey: 'values', path: '/admin/pages/about/values', color: 'text-rose-500', bg: 'bg-rose-50', theme: 'rose' },
  { id: 'about-timeline', name: 'History Timeline', status: 'Live', iconKey: 'timeline', path: '/admin/pages/about/timeline', color: 'text-amber-500', bg: 'bg-amber-50', theme: 'amber' },
  { id: 'about-team', name: 'Our Team', status: 'Live', iconKey: 'team', path: '/admin/pages/about/team', color: 'text-emerald-500', bg: 'bg-emerald-50', theme: 'emerald' },
  { id: 'about-why-us', name: 'Why Choose Us', status: 'Live', iconKey: 'whyus', path: '/admin/pages/about/why-us', color: 'text-sky-500', bg: 'bg-sky-50', theme: 'sky' },
];

const themeOptions = {
  blue: { color: 'text-blue-500', bg: 'bg-blue-50', hex: 'bg-blue-500' },
  indigo: { color: 'text-indigo-500', bg: 'bg-indigo-50', hex: 'bg-indigo-500' },
  rose: { color: 'text-rose-500', bg: 'bg-rose-50', hex: 'bg-rose-500' },
  amber: { color: 'text-amber-500', bg: 'bg-amber-50', hex: 'bg-amber-500' },
  emerald: { color: 'text-emerald-500', bg: 'bg-emerald-50', hex: 'bg-emerald-500' },
  sky: { color: 'text-sky-500', bg: 'bg-sky-50', hex: 'bg-sky-500' },
  violet: { color: 'text-violet-500', bg: 'bg-violet-50', hex: 'bg-violet-500' },
};

const AboutPageOverview = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  const [sections, setSections] = useState(() => {
    const saved = localStorage.getItem('tricksy_about_modules');
    return saved ? JSON.parse(saved) : defaultSections;
  });

  useEffect(() => {
    localStorage.setItem('tricksy_about_modules', JSON.stringify(sections));
  }, [sections]);

  const [formData, setFormData] = useState({ name: '', path: '', status: 'Draft', theme: 'blue', iconKey: 'box' });

  const handleDeleteModule = (id, e) => {
    e.stopPropagation(); 
    setSections(sections.filter(sec => sec.id !== id));
  };

  const handleRestoreDefaults = () => {
    if(window.confirm("Restore default About Page sections?")) setSections(defaultSections);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({ name: '', path: '', status: 'Draft', theme: 'blue', iconKey: 'box' });
    setIsModalOpen(true);
  };

  const openEditModal = (sec, e) => {
    e.stopPropagation();
    setEditingId(sec.id);
    setFormData({ name: sec.name, path: sec.path, status: sec.status, theme: sec.theme || 'blue', iconKey: sec.iconKey || 'box' });
    setIsModalOpen(true);
  };

  const handleSaveModule = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    const finalPath = formData.path.trim() || `/admin/pages/about/${formData.name.toLowerCase().replace(/\s+/g, '-')}`;
    const moduleData = {
      name: formData.name, status: formData.status, iconKey: formData.iconKey, path: finalPath,
      theme: formData.theme, color: themeOptions[formData.theme].color, bg: themeOptions[formData.theme].bg
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
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <Sparkles size={14} className="fill-indigo-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Editor</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">About Page</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">{sections.length} Sections Active</p>
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
            <div key={sec.id} onClick={() => navigate(sec.path)} className="group relative bg-white p-4 md:p-5 rounded-[1.5rem] border border-slate-100 shadow-sm hover:border-indigo-500/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 cursor-pointer overflow-hidden min-h-[95px] animate-in fade-in zoom-in-95">
              <div className={`w-12 h-12 rounded-2xl ${sec.bg} ${sec.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0`}>
                <IconComponent size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <h3 className="text-[14px] md:text-[15px] font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight break-words">
                    {sec.name}
                  </h3>
                  {sec.status === 'Draft' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>}
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none italic">{sec.status}</p>
              </div>
              <div className="relative shrink-0 w-6 h-8 flex items-center justify-end">
                <div className="absolute right-0 text-slate-300 transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-2">
                  <ArrowRight size={18} />
                </div>
                <div className="absolute right-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <button onClick={(e) => openEditModal(sec, e)} className="p-2 text-slate-400 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl"><Edit3 size={14} /></button>
                  <button onClick={(e) => handleDeleteModule(sec.id, e)} className="p-2 text-slate-400 bg-slate-50 hover:bg-rose-50 hover:text-rose-500 rounded-xl"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="absolute inset-x-6 bottom-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
            </div>
          );
        })}
        {/* Add Section Card */}
        <div onClick={openCreateModal} className="group p-4 md:p-5 rounded-[1.5rem] border-2 border-dashed border-slate-200 flex items-center gap-4 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50/50 transition-all cursor-pointer min-h-[95px]">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-white transition-all shrink-0">
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          </div>
          <div className="flex-1"><h3 className="text-[14px] font-bold text-slate-700">Add Section</h3></div>
        </div>
      </div>
      {/* Modal logic remains same... */}
    </div>
  );
};

export default AboutPageOverview;