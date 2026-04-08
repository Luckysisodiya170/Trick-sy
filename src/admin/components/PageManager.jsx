import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  Sparkles, Plus, X, Trash2, Edit3, ArrowRight, 
  Save, RotateCcw, Search, Box 
} from 'lucide-react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Import your Redux actions
import { createSubsection, deleteSubsection } from '../../store/index'; 

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

const SortableItem = ({ sec, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sec.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: transform ? 999 : 'auto',
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const PageManager = ({ title, defaultSections, iconLibrary, baseRoute, itemLabel = 'Section', onUpdate, sectionId,onReorder }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  const [formData, setFormData] = useState({ name: '', path: '', status: 'Draft', theme: 'indigo', iconKey: 'box' });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 1 },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = defaultSections.findIndex((items) => items.id === active.id);
      const newIndex = defaultSections.findIndex((items) => items.id === over.id);
      const newOrder = arrayMove(defaultSections, oldIndex, newIndex);
      if (onReorder) onReorder(newOrder);
    }
  };

  const handleDelete = (sec, e) => {
    e.stopPropagation(); 
    if (sec.isSystem) {
      alert("This section is protected and cannot be deleted.");
      return;
    }
    
    if (window.confirm(`Delete this ${itemLabel.toLowerCase()} permanently?`)) {
      dispatch(deleteSubsection(sec.dbId)); 
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingId) {
      const sectionToEdit = defaultSections.find(sec => sec.id === editingId);
      if (sectionToEdit && onUpdate) {
        onUpdate(sectionToEdit.dbId, editingId, {
          subsectionName: formData.name,
          isActive: formData.status === 'Live',
          theme: formData.theme,
          icon: formData.iconKey
        });
      }
    } else {
      // Create new dynamically
      dispatch(createSubsection({
        subsectionName: formData.name,
        section_id: sectionId, 
        icon: formData.iconKey,
        theme: formData.theme,
        isActive: formData.status === 'Live'
      }));
    }
    setIsModalOpen(false);
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

  const handleRestore = () => {
    if(window.confirm("Restore default sections?")) {
      alert("Restore functionality will rely on Database now!");
    }
  };

  const filteredSections = defaultSections.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-12 font-sans relative">
      <div className="w-full mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-brand-primary mb-1">
            <Sparkles size={14} className="fill-brand-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Editor Pages</span>
          </div>
          <h1 className="page-title">
            {typeof title === 'string' ? (
              <>
                {title.split(' ').slice(0, -1).join(' ')} <span className="text-brand-primary">{title.split(' ').pop()}.</span>
              </>
            ) : title}
          </h1>
          <p className="page-subtitle italic">{defaultSections.length} Active {itemLabel}s Configured</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-primary transition-colors" size={16} />
            <input 
              type="text" placeholder="Search..." 
              className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl w-full md:w-[220px] outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all font-bold text-xs shadow-sm"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={handleRestore} className="p-3 text-slate-400 bg-white border border-slate-200 rounded-2xl hover:text-brand-primary hover:border-brand-primary transition-all active:scale-95 shadow-sm">
            <RotateCcw size={18} />
          </button>
          <button className="px-8 py-3.5 text-[11px] font-black uppercase tracking-widest text-white bg-brand-dark rounded-2xl hover:bg-brand-primary hover:shadow-lg transition-all active:scale-95">
            Publish Changes
          </button>
        </div>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={filteredSections.map(s => s.id)} strategy={rectSortingStrategy}>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredSections.map((sec) => {
              const IconComponent = iconLibrary[sec.iconKey] || Box; 
              return (
                <SortableItem key={sec.id} sec={sec}>
                  <div onClick={() => navigate(sec.path)} className="group relative bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:border-brand-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 cursor-pointer overflow-hidden min-h-[100px]">
                    <div className={`w-14 h-14 rounded-2xl ${sec.bg} ${sec.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0`}>
                      <IconComponent size={24} />
                    </div>
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-[15px] font-bold text-brand-dark group-hover:text-brand-primary transition-colors truncate">{sec.name}</h3>
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{sec.status}</p>
                    </div>
                    <div className="relative shrink-0 w-8 h-8 flex items-center justify-end">
                      <div className="absolute right-0 text-slate-300 transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-2">
                        <ArrowRight size={18} />
                      </div>
                      <div className="absolute right-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                        <button onClick={(e) => openEdit(sec, e)} onPointerDown={(e) => e.stopPropagation()} className="p-2 text-slate-400 bg-slate-50 hover:bg-brand-primary/10 hover:text-brand-primary rounded-xl transition-colors"><Edit3 size={14} /></button>
                        {!sec.isSystem && (
                          <button onClick={(e) => handleDelete(sec, e)} className="p-2 text-slate-400 bg-slate-50 hover:bg-rose-50 hover:text-rose-500 rounded-xl transition-colors">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </SortableItem>
              );
            })}

            <div onClick={openCreate} className="group p-5 rounded-[2rem] border-2 border-dashed border-slate-200 flex items-center gap-4 text-slate-400 hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 transition-all cursor-pointer min-h-[100px] active:scale-95">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-white transition-all duration-300 shrink-0">
                <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </div>
              <div className="flex-1"><h3 className="text-[14px] font-bold text-slate-700 group-hover:text-brand-primary">Add {itemLabel}</h3></div>
            </div>
          </div>
        </SortableContext>
      </DndContext>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
            <div className="px-8 pt-8 pb-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-black text-brand-dark">{editingId ? `Edit ${itemLabel}` : `Create New ${itemLabel}`}</h2>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Configure system layout module</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all border border-slate-100"><X size={18} /></button>
            </div>
            <div className="overflow-y-auto flex-1 p-8 sm:p-10 custom-scrollbar-main">
              <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Display Name</label>
                    <input required autoFocus value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 ring-brand-primary/5 transition-all" placeholder="e.g. Hero Module" />
                  </div>
                  <div className="md:col-span-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">System Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none cursor-pointer">
                      <option value="Draft">Draft</option>
                      <option value="Live">Live</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-slate-50">
                  <div className="md:col-span-5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Theme Accent</label>
                    <div className="flex flex-wrap gap-2.5">
                      {Object.keys(themeOptions).map((themeKey) => (
                        <button key={themeKey} type="button" onClick={() => setFormData({...formData, theme: themeKey})} className={`w-7 h-7 rounded-full transition-all ${themeOptions[themeKey].hex} ${formData.theme === themeKey ? 'ring-4 ring-offset-2 ring-brand-primary/20 scale-110 shadow-md' : 'opacity-40 hover:opacity-100'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-7">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Icon Mapping</label>
                    <div className="grid grid-cols-6 gap-2 bg-slate-50 p-4 rounded-[1.5rem] border border-slate-100 max-h-[180px] overflow-y-auto custom-scrollbar-main">
                      {Object.keys(iconLibrary).map((key) => {
                        const IconComponent = iconLibrary[key];
                        return (
                          <button key={key} type="button" onClick={() => setFormData({...formData, iconKey: key})} className={`aspect-square rounded-xl flex items-center justify-center transition-all ${formData.iconKey === key ? 'bg-brand-primary text-white shadow-lg scale-110' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-100'}`}>
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
              <button onClick={handleSave} className="px-8 py-3 rounded-xl text-xs font-black text-white bg-brand-primary hover:bg-brand-dark shadow-lg flex items-center gap-2 transition-all">
                <Save size={18} /> {editingId ? 'UPDATE CONFIG' : 'CREATE MODULE'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageManager;