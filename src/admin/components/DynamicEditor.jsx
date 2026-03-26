import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye, 
  LayoutTemplate, Plus, Trash2, Type, AlignLeft, Image as ImageIcon, Upload,
  Link as LinkIcon, List as ListIcon, Minus, GripVertical, ChevronUp, ChevronDown
} from 'lucide-react';

const DynamicEditor = () => {
  const { moduleName } = useParams(); 
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('split');
  const [draggedIdx, setDraggedIdx] = useState(null); 
  
  const formattedName = moduleName 
    ? moduleName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') 
    : 'Custom Module';

  const storageKey = `tricksy_custom_module_${moduleName}`;

  const [moduleData, setModuleData] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : { fields: [] };
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(moduleData));
  }, [moduleData, storageKey]);

  const addField = (type) => {
    const newField = {
      id: `field_${Date.now()}`,
      type: type, 
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      value: '',
      link: '' 
    };
    setModuleData(prev => ({ ...prev, fields: [...prev.fields, newField] }));
  };

  const updateFieldValue = (id, key, newValue) => {
    setModuleData(prev => ({
      ...prev,
      fields: prev.fields.map(f => f.id === id ? { ...f, [key]: newValue } : f)
    }));
  };

  const deleteField = (id) => {
    setModuleData(prev => ({ ...prev, fields: prev.fields.filter(f => f.id !== id) }));
  };

  const moveField = (index, direction) => {
    const newFields = [...moduleData.fields];
    if (direction === 'up' && index > 0) {
      [newFields[index - 1], newFields[index]] = [newFields[index], newFields[index - 1]];
    } else if (direction === 'down' && index < newFields.length - 1) {
      [newFields[index + 1], newFields[index]] = [newFields[index], newFields[index + 1]];
    }
    setModuleData({ ...moduleData, fields: newFields });
  };

  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === dropIndex) return;
    
    const newFields = [...moduleData.fields];
    const draggedItem = newFields[draggedIdx];
    
    newFields.splice(draggedIdx, 1);
    newFields.splice(dropIndex, 0, draggedItem);
    
    setModuleData({ ...moduleData, fields: newFields });
    setDraggedIdx(null);
  };

  const handleImageUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateFieldValue(id, 'value', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] font-sans">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[50] bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 w-1/4 sm:w-1/3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic truncate">
            <Settings2 size={20} className="text-slate-600 shrink-0" /> <span className="truncate">{formattedName.toUpperCase()}</span> <span className="text-slate-400">LAB</span>
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 sm:p-1.5 rounded-full shadow-inner w-auto justify-center">
          <button onClick={() => setViewMode('edit')} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'edit' ? 'bg-white shadow-md text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
            <Edit3 size={14} className="hidden sm:block" /> Edit
          </button>
          <button onClick={() => setViewMode('split')} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'split' ? 'bg-white shadow-md text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
            <Columns size={14} className="hidden sm:block" /> Split
          </button>
          <button onClick={() => setViewMode('preview')} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${viewMode === 'preview' ? 'bg-white shadow-md text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
            <Eye size={14} className="hidden sm:block" /> Preview
          </button>
        </div>

        <div className="w-1/4 sm:w-1/3 flex justify-end">
          <button className="bg-slate-900 text-white px-4 sm:px-8 py-2.5 rounded-full font-extrabold text-[10px] sm:text-xs flex items-center gap-2 shadow-lg hover:bg-slate-800 transition-all hover:-translate-y-0.5">
            <Save size={14} className="hidden sm:block" /> Save Draft
          </button>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row">
        
        {/* EDITOR PANEL */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-full lg:w-[42%] lg:border-r border-slate-200 lg:h-full lg:overflow-y-auto' : 'w-full h-full lg:overflow-y-auto'} p-4 md:p-8 custom-scrollbar bg-[#F1F5F9]/40`}>
            <div className="max-w-2xl mx-auto space-y-6 pb-10">
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-2xl font-black text-slate-800">Blocks</h2>
                
                {/* TOOLBAR */}
                <div className="flex gap-1.5 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 flex-wrap justify-end">
                  <button onClick={() => addField('text')} className="text-slate-600 p-2 rounded-lg font-bold text-[10px] flex items-center gap-1 hover:bg-slate-50 transition-all"><Type size={14}/> Text</button>
                  <button onClick={() => addField('textarea')} className="text-slate-600 p-2 rounded-lg font-bold text-[10px] flex items-center gap-1 hover:bg-slate-50 transition-all"><AlignLeft size={14}/> Para</button>
                  <button onClick={() => addField('image')} className="text-blue-600 p-2 rounded-lg font-bold text-[10px] flex items-center gap-1 hover:bg-blue-50 transition-all"><ImageIcon size={14}/> Image</button>
                  <button onClick={() => addField('button')} className="text-emerald-600 p-2 rounded-lg font-bold text-[10px] flex items-center gap-1 hover:bg-emerald-50 transition-all"><LinkIcon size={14}/> Button</button>
                  <button onClick={() => addField('list')} className="text-amber-600 p-2 rounded-lg font-bold text-[10px] flex items-center gap-1 hover:bg-amber-50 transition-all"><ListIcon size={14}/> List</button>
                  <button onClick={() => addField('divider')} className="text-slate-400 p-2 rounded-lg font-bold text-[10px] flex items-center gap-1 hover:bg-slate-50 transition-all"><Minus size={14}/> Line</button>
                </div>
              </div>

              {moduleData.fields.length === 0 ? (
                <div className="text-center p-12 border-2 border-dashed border-slate-300 rounded-[2rem] bg-slate-50/50">
                  <LayoutTemplate size={40} className="text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium text-sm">No content added yet. Click buttons above to start building.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {moduleData.fields.map((field, index) => (
                    
                    /* DRAGGABLE BLOCK CONTAINER */
                    <div 
                      key={field.id} 
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                      className={`bg-white p-5 rounded-2xl border ${draggedIdx === index ? 'border-blue-400 shadow-xl opacity-60 scale-[0.98]' : 'border-slate-200 shadow-sm'} relative group transition-all duration-200`}
                    >
                      
                      {/* BLOCK HEADER (Controls) */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                         
                         <div className="flex items-center gap-2 w-full">
                           {/* DRAG HANDLE */}
                           <div className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-600 p-1 -ml-2 rounded transition-colors">
                              <GripVertical size={18} />
                           </div>
                           
                           {/* LABEL INPUT */}
                           <input 
                              value={field.label} 
                              onChange={(e) => updateFieldValue(field.id, 'label', e.target.value)} 
                              className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none hover:text-slate-600 focus:text-blue-500 w-full"
                           />
                         </div>

                         {/* ACTION BUTTONS (Up, Down, Delete) */}
                         <div className="flex items-center gap-1 ml-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                           <button onClick={() => moveField(index, 'up')} disabled={index === 0} className="text-slate-400 hover:text-blue-500 disabled:opacity-30 disabled:hover:text-slate-400 p-1"><ChevronUp size={16} /></button>
                           <button onClick={() => moveField(index, 'down')} disabled={index === moduleData.fields.length - 1} className="text-slate-400 hover:text-blue-500 disabled:opacity-30 disabled:hover:text-slate-400 p-1"><ChevronDown size={16} /></button>
                           <div className="w-[1px] h-4 bg-slate-200 mx-1"></div>
                           <button onClick={() => deleteField(field.id)} className="text-slate-400 hover:text-rose-500 p-1 transition-colors"><Trash2 size={16} /></button>
                         </div>
                      </div>

                      {/* TEXT INPUT */}
                      {field.type === 'text' && (
                        <input placeholder="Type your heading here..." value={field.value} onChange={(e) => updateFieldValue(field.id, 'value', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-blue-100" />
                      )}
                      
                      {/* TEXTAREA INPUT */}
                      {field.type === 'textarea' && (
                        <textarea placeholder="Type your paragraph here..." value={field.value} onChange={(e) => updateFieldValue(field.id, 'value', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm h-28 resize-none outline-none leading-relaxed focus:ring-2 ring-blue-100" />
                      )}

                      {/* LIST INPUT */}
                      {field.type === 'list' && (
                        <div>
                          <p className="text-[10px] text-slate-400 mb-2 font-semibold">Press Enter to add a new bullet point</p>
                          <textarea placeholder="Feature 1&#10;Feature 2&#10;Feature 3" value={field.value} onChange={(e) => updateFieldValue(field.id, 'value', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm h-28 resize-none outline-none leading-relaxed focus:ring-2 ring-amber-100" />
                        </div>
                      )}

                      {/* BUTTON INPUT */}
                      {field.type === 'button' && (
                        <div className="space-y-3">
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Button Text</label>
                            <input placeholder="Click Here" value={field.value} onChange={(e) => updateFieldValue(field.id, 'value', e.target.value)} className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-emerald-100" />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Destination URL</label>
                            <input placeholder="https://..." value={field.link || ''} onChange={(e) => updateFieldValue(field.id, 'link', e.target.value)} className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 ring-emerald-100" />
                          </div>
                        </div>
                      )}

                      {/* DIVIDER INPUT */}
                      {field.type === 'divider' && (
                        <div className="py-4 text-center border-t-2 border-dashed border-slate-200">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Section Divider</span>
                        </div>
                      )}

                      {/* IMAGE UPLOADER UI */}
                      {field.type === 'image' && (
                        <div className="space-y-3">
                          <input type="file" id={`file-${field.id}`} hidden accept="image/*" onChange={(e) => handleImageUpload(field.id, e)} />
                          <button onClick={() => document.getElementById(`file-${field.id}`).click()} className="w-full py-4 border-2 border-dashed border-blue-200 rounded-xl text-xs font-bold text-blue-500 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-all flex items-center justify-center gap-2">
                            <Upload size={16} /> {field.value ? 'Change Image' : 'Upload New Image'}
                          </button>
                          {field.value && (
                            <div className="w-full h-32 rounded-xl overflow-hidden border border-slate-100 shadow-sm relative">
                              <img src={field.value} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

        {/* PREVIEW PANEL */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-full lg:flex-1 min-h-[700px] lg:min-h-0' : 'w-full h-full'} bg-slate-200 p-4 lg:p-10 flex items-center justify-center relative overflow-hidden`}>
            
            <div className={`w-full h-full max-w-5xl bg-white shadow-2xl rounded-3xl md:rounded-[3rem] overflow-hidden flex flex-col border-[4px] md:border-[10px] border-slate-900 transition-all duration-500 ${viewMode === 'split' ? 'lg:scale-[0.95]' : 'scale-100'}`}>
                
                {/* Browser-like Header bar */}
                <div className="h-8 md:h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 md:px-6 gap-2 shrink-0">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-white p-8 md:p-16 custom-scrollbar text-center md:text-left">
                    <div className="max-w-3xl mx-auto">
                      
                      {moduleData.fields.length === 0 ? (
                        <div className="opacity-30 text-center py-20">
                          <LayoutTemplate size={80} className="mx-auto mb-6 text-slate-400" strokeWidth={1} />
                          <h3 className="text-3xl font-black text-slate-500">Live Preview</h3>
                          <p className="mt-2 text-slate-500 font-medium">Add some content in the editor to see it here.</p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-6">
                          {moduleData.fields.map((field, index) => (
                            <React.Fragment key={field.id}>
                              
                              {field.type === 'text' && (
                                <h2 className={`font-black text-slate-900 tracking-tight leading-tight ${index === 0 ? 'text-4xl md:text-6xl mb-2' : 'text-2xl md:text-3xl mt-4'}`}>
                                  {field.value || field.label}
                                </h2>
                              )}

                              {field.type === 'textarea' && (
                                <p className="text-slate-500 text-sm md:text-base leading-relaxed whitespace-pre-line">
                                  {field.value || "This is a placeholder paragraph. Type something in the editor to update this text."}
                                </p>
                              )}

                              {field.type === 'list' && (
                                <ul className="list-disc list-outside ml-5 space-y-2 text-slate-600 text-sm md:text-base text-left">
                                  {(field.value || "Sample Bullet 1\nSample Bullet 2").split('\n').filter(item => item.trim() !== '').map((item, i) => (
                                    <li key={i} className="pl-2">{item}</li>
                                  ))}
                                </ul>
                              )}

                              {field.type === 'button' && (
                                <div className="mt-4 mb-2">
                                  <a 
                                    href={field.link || '#'} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    onClick={(e) => { if(!field.link) e.preventDefault(); }}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all hover:-translate-y-1 shadow-[0_10px_20px_-10px_rgba(16,185,129,0.5)]"
                                  >
                                    {field.value || 'Click Here'}
                                  </a>
                                </div>
                              )}

                              {field.type === 'divider' && (
                                <hr className="my-8 border-t-2 border-slate-100" />
                              )}

                              {field.type === 'image' && (
                                <div className="w-full rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 bg-slate-50 aspect-video flex items-center justify-center relative group mt-2">
                                  {field.value ? (
                                    <img src={field.value} className="w-full h-full object-cover" alt="Module visual" />
                                  ) : (
                                    <ImageIcon size={48} className="text-slate-300" strokeWidth={1} />
                                  )}
                                </div>
                              )}
                              
                            </React.Fragment>
                          ))}
                        </div>
                      )}

                    </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicEditor;