import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../redux/slices/adminSlice';
import { AdminService } from '../services/adminService';
import { 
  ArrowLeft, Save, Plus, Trash2, GripVertical, 
  Type, Image as ImageIcon, MousePointer2, List as ListIcon, Heading, Loader2, Upload, Monitor
} from 'lucide-react';

import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const BlockWrapper = ({ id, onRemove, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="group relative bg-white border border-slate-200 rounded-2xl p-6 mb-4 shadow-sm hover:border-indigo-500/50 transition-all">
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all cursor-grab" {...attributes} {...listeners}>
        <GripVertical className="text-slate-400" size={20} />
      </div>
      <button onClick={onRemove} className="absolute -right-3 -top-3 w-8 h-8 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-rose-100 z-10">
        <Trash2 size={14} />
      </button>
      {children}
    </div>
  );
};

const DynamicBlockEditor = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [blocks, setBlocks] = useState([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [viewMode, setViewMode] = useState('split');

  const contentData = useSelector((state) => state.adminData.activeSubsection);

  useEffect(() => {
    if (id) dispatch(fetchSingleSubsectionContent(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (contentData?.content) {
      setBlocks(typeof contentData.content === 'string' ? JSON.parse(contentData.content) : contentData.content);
    }
  }, [contentData]);

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      value: type === 'list' ? [''] : '',
      settings: type === 'button' ? { link: '', style: 'solid' } : {}
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id, newValue, newSettings = {}) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, value: newValue, settings: { ...b.settings, ...newSettings } } : b));
  };

  const handleImageUpload = async (e, blockId) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      updateBlock(blockId, previewUrl, { file }); // Temp preview
    }
  };

  const removeBlock = (id) => setBlocks(blocks.filter(b => b.id !== id));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      const processedBlocks = await Promise.all(blocks.map(async (block) => {
        if (block.type === 'image' && block.settings?.file) {
          const formData = new FormData();
          formData.append('image', block.settings.file);
          const res = await AdminService.uploadHeroImage(formData);
          return { ...block, value: res.imageUrl, settings: {} };
        }
        return block;
      }));

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: id, 
        updateData: { content: processedBlocks } 
      })).unwrap();
      alert("Custom Module Deployed! 🚀");
    } catch (err) {
      alert("Deploy Error: " + err.message);
    } finally { setIsDeploying(false); }
  };

  const getImageUrl = (path) => {
    if (!path) return "";
    return (path.startsWith('blob:') || path.startsWith('http')) ? path : `http://localhost:5000${path}`;
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-indigo-100">
      {/* Savage Navbar */}
      <nav className="sticky top-0 z-[100] bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-[13px] font-black italic uppercase tracking-[0.2em] text-slate-800">
            {contentData?.subsectionName || slug?.replace(/-/g, ' ')} <span className="text-indigo-600">LAB</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {['edit', 'split', 'preview'].map(m => (
            <button key={m} onClick={() => setViewMode(m)} className={`px-6 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === m ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}>{m}</button>
          ))}
        </div>

        <button onClick={handleDeploy} disabled={isDeploying} className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-2">
          {isDeploying ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />} 
          {isDeploying ? 'DEPLOYING...' : 'DEPLOY'}
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-700 ${viewMode === 'split' ? 'max-w-[1800px] px-8 py-8 grid grid-cols-12 gap-8' : 'max-w-4xl py-12 px-6'}`}>
        
        {/* LEFT: EDITOR PANEL */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-4' : 'w-full'} space-y-6`}>
            
            {/* Toolbar Area */}
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-wrap gap-2 justify-center sticky top-24 z-50">
               {[
                 { type: 'heading', icon: Heading, label: 'Heading' },
                 { type: 'text', icon: Type, label: 'Text' },
                 { type: 'list', icon: ListIcon, label: 'List' },
                 { type: 'image', icon: ImageIcon, label: 'Image' },
                 { type: 'button', icon: MousePointer2, label: 'Button' }
               ].map(btn => (
                 <button key={btn.type} onClick={() => addBlock(btn.type)} className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-all">
                    <btn.icon size={16} />
                    <span className="text-[8px] font-black uppercase tracking-tighter">{btn.label}</span>
                 </button>
               ))}
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                <div className="pb-20">
                {blocks.map((block) => (
                  <BlockWrapper key={block.id} id={block.id} onRemove={() => removeBlock(block.id)}>
                    {block.type === 'heading' && (
                      <input className="w-full text-xl font-black outline-none text-slate-800 placeholder:text-slate-200" placeholder="Main Heading..." value={block.value} onChange={(e) => updateBlock(block.id, e.target.value)} />
                    )}
                    {block.type === 'text' && (
                      <textarea className="w-full text-xs text-slate-500 font-medium leading-relaxed outline-none resize-none min-h-[80px] placeholder:text-slate-200" placeholder="Write content..." value={block.value} onChange={(e) => updateBlock(block.id, e.target.value)} />
                    )}
                    {block.type === 'image' && (
                       <div className="space-y-3">
                         <div onClick={() => document.getElementById(`img-${block.id}`).click()} className="w-full aspect-video bg-slate-50 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden group relative">
                            <input type="file" id={`img-${block.id}`} hidden onChange={(e) => handleImageUpload(e, block.id)} />
                            {block.value ? <img src={getImageUrl(block.value)} className="w-full h-full object-cover" /> : <Upload className="text-slate-300" />}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all underline text-white font-black text-[8px]">CHANGE IMAGE</div>
                         </div>
                       </div>
                    )}
                    {block.type === 'button' && (
                      <div className="grid grid-cols-2 gap-3">
                        <input className="px-3 py-2 bg-slate-50 rounded-lg outline-none font-bold text-[10px] uppercase" placeholder="Text" value={block.value} onChange={(e) => updateBlock(block.id, e.target.value)} />
                        <input className="px-3 py-2 bg-slate-50 rounded-lg outline-none text-slate-400 text-[10px]" placeholder="Link" value={block.settings.link} onChange={(e) => updateBlock(block.id, block.value, { link: e.target.value })} />
                      </div>
                    )}
                    {block.type === 'list' && (
                       <div className="space-y-2">
                         {block.value.map((item, idx) => (
                           <div key={idx} className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                             <input className="flex-1 outline-none font-medium text-[11px] text-slate-600" value={item} onChange={(e) => {
                               const newList = [...block.value]; newList[idx] = e.target.value; updateBlock(block.id, newList);
                             }} />
                             {idx === block.value.length - 1 && <button onClick={() => updateBlock(block.id, [...block.value, ''])} className="text-indigo-600 text-[9px] font-black">+ ADD</button>}
                           </div>
                         ))}
                       </div>
                    )}
                  </BlockWrapper>
                ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}

        {/* RIGHT: LIVE PREVIEW (MACBOOK MOCKUP) */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'col-span-8' : 'w-full'} sticky top-24`}>
            <div className="relative mx-auto bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 overflow-hidden">
               <div className="h-8 bg-slate-900 flex items-center px-4 gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
                  <div className="flex-1 max-w-[150px] mx-auto h-3.5 bg-slate-800 rounded-full flex items-center justify-center text-[6px] text-slate-500 font-bold uppercase tracking-widest">Preview Mode</div>
               </div>

               <div className="bg-white rounded-xl overflow-hidden min-h-[550px] max-h-[70vh] overflow-y-auto custom-scrollbar p-12 relative flex flex-col items-center">
                 <div className="w-full max-w-2xl space-y-8 animate-in fade-in duration-500">
                    {blocks.map((block) => (
                       <div key={block.id} className="animate-in slide-in-from-bottom-2 duration-300">
                          {block.type === 'heading' && <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight">{block.value || "Enter Heading"}</h1>}
                          
                          {block.type === 'text' && <p className="text-sm text-slate-500 leading-relaxed font-medium">{block.value || "Start typing your content here..."}</p>}
                          
                          {block.type === 'image' && block.value && (
                             <div className="rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
                                <img src={getImageUrl(block.value)} className="w-full h-full object-cover" alt="Custom block" />
                             </div>
                          )}

                          {block.type === 'list' && (
                             <ul className="space-y-3">
                               {block.value.map((item, i) => item && (
                                 <li key={i} className="flex items-start gap-3">
                                   <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mt-0.5"><Plus size={12}/></div>
                                   <span className="text-[13px] font-bold text-slate-700">{item}</span>
                                 </li>
                               ))}
                             </ul>
                          )}

                          {block.type === 'button' && block.value && (
                             <button className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase shadow-lg shadow-indigo-100 hover:scale-105 transition-all">
                               {block.value}
                             </button>
                          )}
                       </div>
                    ))}
                    {blocks.length === 0 && (
                       <div className="h-[400px] flex flex-col items-center justify-center text-slate-300 opacity-50">
                          <Monitor size={48} strokeWidth={1} className="mb-4" />
                          <p className="text-[10px] font-black uppercase tracking-[0.2em]">Build your experience</p>
                       </div>
                    )}
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default DynamicBlockEditor;