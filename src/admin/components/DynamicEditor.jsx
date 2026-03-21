import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye, 
  LayoutTemplate, Plus, Trash2, Type, AlignLeft, Image as ImageIcon, Upload
} from 'lucide-react';

const DynamicEditor = () => {
  const { moduleName } = useParams(); 
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('split');
  
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
      value: ''
    };
    setModuleData(prev => ({ ...prev, fields: [...prev.fields, newField] }));
  };

  const updateFieldValue = (id, key, newValue) => {
    setModuleData(prev => ({
      ...prev,
      fields: prev.fields.map(f => f.id === id ? { ...f, [key]: newValue } : f)
    }));
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

  const deleteField = (id) => {
    setModuleData(prev => ({ ...prev, fields: prev.fields.filter(f => f.id !== id) }));
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
                {/* PHOTO UPLOAD BUTTON  */}
                <div className="flex gap-2 bg-white p-1 rounded-xl shadow-sm border border-slate-200">
                  <button onClick={() => addField('text')} className="text-slate-600 p-2 rounded-lg font-bold text-[10px] flex items-center gap-1.5 hover:bg-slate-50 transition-all"><Type size={16}/> Text</button>
                  <button onClick={() => addField('textarea')} className="text-slate-600 p-2 rounded-lg font-bold text-[10px] flex items-center gap-1.5 hover:bg-slate-50 transition-all"><AlignLeft size={16}/> Para</button>
                  <button onClick={() => addField('image')} className="text-blue-600 p-2 rounded-lg font-bold text-[10px] flex items-center gap-1.5 hover:bg-blue-50 transition-all"><ImageIcon size={16}/> Image</button>
                </div>
              </div>

              {moduleData.fields.length === 0 ? (
                <div className="text-center p-12 border-2 border-dashed border-slate-300 rounded-[2rem] bg-slate-50/50">
                  <LayoutTemplate size={40} className="text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium text-sm">No content added yet. Click buttons above to start building.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {moduleData.fields.map((field) => (
                    <div key={field.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative group animate-in fade-in zoom-in-95">
                      
                      <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-3">
                         <input 
                            value={field.label} 
                            onChange={(e) => updateFieldValue(field.id, 'label', e.target.value)} 
                            className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none hover:text-slate-600 focus:text-blue-500 w-full"
                         />
                         <button onClick={() => deleteField(field.id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                           <Trash2 size={16} />
                         </button>
                      </div>

                      {field.type === 'text' && (
                        <input placeholder="Type your heading here..." value={field.value} onChange={(e) => updateFieldValue(field.id, 'value', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 ring-blue-100" />
                      )}
                      
                      {field.type === 'textarea' && (
                        <textarea placeholder="Type your paragraph here..." value={field.value} onChange={(e) => updateFieldValue(field.id, 'value', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm h-28 resize-none outline-none leading-relaxed focus:ring-2 ring-blue-100" />
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
                
                <div className="h-8 md:h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 md:px-6 gap-2 shrink-0">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-white p-8 md:p-16 custom-scrollbar text-center md:text-left">
                    <div className="max-w-3xl mx-auto space-y-6">
                      
                      {moduleData.fields.length === 0 ? (
                        <div className="opacity-30 text-center py-20">
                          <LayoutTemplate size={80} className="mx-auto mb-6 text-slate-400" strokeWidth={1} />
                          <h3 className="text-3xl font-black text-slate-500">Live Preview</h3>
                          <p className="mt-2 text-slate-500 font-medium">Add some content in the editor to see it here.</p>
                        </div>
                      ) : (
                        moduleData.fields.map((field, index) => (
                          <React.Fragment key={field.id}>
                            {field.type === 'text' && (
                              <h2 className={`font-black text-slate-900 tracking-tight leading-tight ${index === 0 ? 'text-4xl md:text-6xl mb-6' : 'text-2xl md:text-3xl mt-8'}`}>
                                {field.value || field.label}
                              </h2>
                            )}
                            {field.type === 'textarea' && (
                              <p className="text-slate-500 text-sm md:text-base leading-relaxed whitespace-pre-line">
                                {field.value || "This is a placeholder paragraph. Type something in the editor to update this text."}
                              </p>
                            )}
                            {/* PREVIEW FOR IMAGES */}
                            {field.type === 'image' && (
                              <div className="w-full rounded-[2rem] overflow-hidden my-6 shadow-lg border border-slate-100 bg-slate-50 aspect-video flex items-center justify-center relative group">
                                {field.value ? (
                                  <img src={field.value} className="w-full h-full object-cover" alt="Module visual" />
                                ) : (
                                  <ImageIcon size={48} className="text-slate-300" strokeWidth={1} />
                                )}
                              </div>
                            )}
                          </React.Fragment>
                        ))
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