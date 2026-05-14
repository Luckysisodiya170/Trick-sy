import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  Sparkles, Plus, X, Trash2, Edit3, Search, Box, Save 
} from 'lucide-react';

import { 
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import { 
  arrayMove, SortableContext, rectSortingStrategy, useSortable 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { createSubsection } from '../redux/slices/adminSlice'; 
import { AdminService } from '../services/adminService';

const themeOptions = {
  slate: { hex: '#64748b' }, rose: { hex: '#f43f5e' }, amber: { hex: '#f59e0b' },
  emerald: { hex: '#10b981' }, teal: { hex: '#14b8a6' }, cyan: { hex: '#06b6d4' },
  sky: { hex: '#0ea5e9' }, blue: { hex: '#3b82f6' }, indigo: { hex: '#6366f1' },
  violet: { hex: '#8b5cf6' }, fuchsia: { hex: '#d946ef' },
};

const SortableItem = ({ sec, children, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: sec.id });
  const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 999 : 'auto', opacity: isDragging ? 0.4 : 1, touchAction: 'none' };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={(e) => { if (!e.defaultPrevented) onClick(e); }}>
      {children}
    </div>
  );
};


const PageManager = ({ title, defaultSections, iconLibrary, itemLabel = 'Section', onUpdate, onDelete, sectionId, onReorder }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  const [formData, setFormData] = useState({ name: '', status: 'Draft', theme: 'indigo', iconKey: 'box' });

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 12 } }));

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = defaultSections.findIndex((item) => item.id === active.id);
      const newIndex = defaultSections.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(defaultSections, oldIndex, newIndex);

      if (onReorder) onReorder(newOrder);

      try {
        const orderedDbIds = newOrder.map(item => Number(item.dbId));
        await AdminService.reorderSubsections(orderedDbIds); 
      } catch (err) {
        console.error("Database Sync Error:", err);
      }
    }
  };

  const openEdit = (sec, e) => {
    e.stopPropagation();
    setEditingId(sec.id);
    setFormData({ name: sec.name, status: sec.status, theme: sec.theme || 'indigo', iconKey: sec.iconKey || 'box' });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const payload = {
      subsectionName: formData.name, isActive: formData.status === 'Live',
      theme: formData.theme, icon: formData.iconKey
    };

    if (editingId) {
      const sectionToEdit = defaultSections.find(sec => sec.id === editingId);
      if (sectionToEdit && onUpdate) onUpdate(sectionToEdit.dbId, editingId, payload);
    } else {
      dispatch(createSubsection({ ...payload, section_id: sectionId }));
    }
    setIsModalOpen(false);
  };

  const filteredSections = defaultSections.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen p-6 lg:p-12 font-sans relative bg-[#f8fafc]">
      <div className="w-full mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-10">
        <div>
          <div className="brand-icon-label"><Sparkles size={14} className="fill-brand-primary" /><span className="t-subtitle">Editor Pages</span></div>
          <h1 className="page-title">{title}</h1>
          <p className="t-body italic">{defaultSections.length} Modules Active</p>
        </div>
        <div className="relative min-w-[240px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input type="text" placeholder="Filter modules..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl w-full outline-none focus:border-brand-primary transition-all font-bold text-[13px] shadow-sm" />
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredSections.map(s => s.id)} strategy={rectSortingStrategy}>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredSections.map((sec) => {
              const IconComponent = iconLibrary[sec.iconKey] || Box; 
              const themeColor = themeOptions[sec.theme]?.hex || '#4f46e5';

              return (
                <SortableItem key={sec.id} sec={sec} onClick={() => navigate(sec.path, { state: { sectionId: sec.dbId } })}>
                  <div className="group relative bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:border-brand-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 cursor-pointer min-h-[100px]">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}><IconComponent size={24} /></div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold text-brand-dark truncate group-hover:text-brand-primary transition-colors">{sec.name}</h3>
                      <p className="t-subtitle">{sec.status}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={(e) => openEdit(sec, e)} className="p-2 text-slate-400 bg-slate-50 hover:bg-brand-primary hover:text-white rounded-xl transition-all"><Edit3 size={14} /></button>
                      
                      {!sec.isSystem && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); 
                            if(onDelete) onDelete(sec.dbId); 
                          }} 
                          className="p-2 text-slate-400 bg-slate-50 hover:bg-rose-500 hover:text-white rounded-xl transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                      
                    </div>
                  </div>
                </SortableItem>
              );
            })}

            <div onClick={() => { setEditingId(null); setIsModalOpen(true); }} className="group p-5 rounded-[2rem] border-2 border-dashed border-slate-200 flex items-center gap-4 text-slate-400 hover:border-brand-primary hover:bg-brand-primary/5 transition-all cursor-pointer min-h-[100px]">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-white transition-all"><Plus size={24} className="group-hover:rotate-90 transition-transform" /></div>
              <h3 className="t-nav text-slate-500">Add Module</h3>
            </div>
          </div>
        </SortableContext>
      </DndContext>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-brand-dark/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-10 py-6 border-b border-slate-50 flex items-center justify-between bg-white">
              <div>
                <h2 className="t-title text-xl text-slate-900">{editingId ? 'Edit Module' : `Create New ${itemLabel}`}</h2>
                <p className="t-subtitle">Configure System Layout Module</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 text-slate-400 rounded-full transition-colors"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-10 space-y-6">
              <div className="flex gap-6 items-end">
                <div className="flex-1">
                  <label className="t-label mb-2 block">Display Name</label>
                  <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-3.5 bg-slate-50/80 border border-slate-100 rounded-2xl outline-none focus:border-brand-primary focus:bg-white transition-all font-bold text-slate-700 placeholder:text-slate-300" placeholder="Enter section name..." />
                </div>
                <div className="w-48">
                  <label className="t-label mb-2 block">System Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-3.5 bg-slate-50/80 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 cursor-pointer focus:border-brand-primary">
                    <option value="Draft">Draft</option>
                    <option value="Live">Live</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-4">
                  <label className="t-label block border-b border-slate-50 pb-2">Theme Accent</label>
                  <div className="flex flex-wrap gap-2.5">
                    {Object.keys(themeOptions).map((color) => (
                      <button key={color} type="button" onClick={() => setFormData({...formData, theme: color})} className={`w-7 h-7 rounded-full transition-all duration-300 ${formData.theme === color ? 'ring-4 ring-offset-2 ring-brand-primary scale-110' : 'opacity-40 hover:opacity-100'}`} style={{ backgroundColor: themeOptions[color].hex }} title={color} />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="t-label block border-b border-slate-50 pb-2">Icon Mapping</label>
                  <div className="grid grid-cols-6 gap-2 p-3 bg-slate-50/50 rounded-2xl border border-slate-100 max-h-[140px] overflow-y-auto custom-scrollbar">
                    {Object.keys(iconLibrary).map((key) => {
                      const Icon = iconLibrary[key];
                      return (
                        <button key={key} type="button" onClick={() => setFormData({...formData, iconKey: key})} className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${formData.iconKey === key ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'text-slate-400 hover:bg-white hover:text-slate-600'}`}>
                          <Icon size={16} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center gap-6 pt-6 border-t border-slate-100 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors uppercase tracking-widest">Cancel</button>
                <button type="submit" className="px-10 py-3.5 bg-brand-primary text-white rounded-2xl font-black flex items-center gap-3 hover:bg-brand-dark hover:-translate-y-1 transition-all shadow-xl shadow-brand-primary/20">
                  <Save size={18} />
                  <span className="uppercase tracking-tight">{editingId ? 'Update Module' : `Create ${itemLabel}`}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageManager;