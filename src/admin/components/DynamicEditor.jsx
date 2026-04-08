import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../store/index'; 
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye, 
  LayoutTemplate, Plus, Trash2, Type, AlignLeft, Image as ImageIcon, Upload,
  Link as LinkIcon, List as ListIcon, Minus, GripVertical, ChevronUp, ChevronDown, Loader2
} from 'lucide-react';

const DynamicEditor = () => {
  const { slug, id } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subsectionId = id;

  // --- Redux States ---
  const contentData = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const [viewMode, setViewMode] = useState('split');
  const [draggedIdx, setDraggedIdx] = useState(null); 
  const [isDeploying, setIsDeploying] = useState(false);

  // Local State
  const [moduleData, setModuleData] = useState({ fields: [] });

  // 1. Fetch data on Mount
  useEffect(() => {
    if (subsectionId) {
      dispatch(fetchSingleSubsectionContent(subsectionId));
    }
  }, [dispatch, subsectionId]);

  // 2. Sync Redux to Local State
  useEffect(() => {
    if (contentData && Object.keys(contentData).length > 0) {
      setModuleData({
fields: contentData.fields || (contentData.textContent && contentData.textContent.fields) || []      });
    }
  }, [contentData]);

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

  // Drag handlers
  const handleDragStart = (e, index) => { setDraggedIdx(index); e.dataTransfer.effectAllowed = 'move'; };
  const handleDragOver = (e) => { e.preventDefault(); };
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

  const handleImageUpload = async (id, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('heroImage', file);
    try {
      const token = localStorage.getItem('tricksyAdminToken');
      const res = await fetch('http://localhost:5000/api/upload/upload-hero', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        updateFieldValue(id, 'value', data.imageUrl);
      }
    } catch (err) { alert("Upload failed!"); }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      const payload = {
        fields: moduleData.fields,
        images: moduleData.fields.filter(f => f.type === 'image').map(f => f.value)
      };
      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      alert("Custom Module Deployed! 🚀");
    } catch (error) { alert("Deploy Failed: " + error.message); }
    finally { setIsDeploying(false); }
  };

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith('http') || path.startsWith('blob:')) return path;
    return `http://localhost:5000${path}`;
  };

  if (status === 'loading' && !contentData) {
    return <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
      <Loader2 className="animate-spin mr-2" size={16} /> Loading Custom Lab...
    </div>;
  }

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] font-sans">
      <nav className="sticky top-0 z-[50] bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 w-1/4 sm:w-1/3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><ArrowLeft size={18} /></button>
          <h1 className="hidden lg:flex text-lg font-black tracking-tight items-center gap-2 italic truncate">
            <Settings2 size={20} className="text-slate-600 shrink-0" /> <span className="truncate">{slug?.toUpperCase()}</span> <span className="text-slate-400">LAB</span>
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 sm:p-1.5 rounded-full shadow-inner w-auto justify-center">
          <button onClick={() => setViewMode('edit')} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${viewMode === 'edit' ? 'bg-white shadow-md text-slate-800' : 'text-slate-500'}`}>Edit</button>
          <button onClick={() => setViewMode('split')} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${viewMode === 'split' ? 'bg-white shadow-md text-slate-800' : 'text-slate-500'}`}>Split</button>
          <button onClick={() => setViewMode('preview')} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${viewMode === 'preview' ? 'bg-white shadow-md text-slate-800' : 'text-slate-500'}`}>Preview</button>
        </div>

        <div className="w-1/4 sm:w-1/3 flex justify-end">
          <button onClick={handleDeploy} disabled={isDeploying} className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-extrabold text-xs flex items-center gap-2 shadow-lg hover:bg-emerald-600 transition-all disabled:opacity-50">
            {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
            {isDeploying ? 'DEPLOYING...' : 'DEPLOY'}
          </button>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row">
        
        {/* --- EDITOR PANEL --- */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-full lg:w-[42%] lg:border-r border-slate-200 lg:h-full lg:overflow-y-auto' : 'w-full h-full lg:overflow-y-auto'} p-4 md:p-8 custom-scrollbar bg-[#F1F5F9]/40`}>
            <div className="max-w-2xl mx-auto space-y-6 pb-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-2xl font-black text-slate-800">Blocks</h2>
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
                  <p className="text-slate-500 font-medium text-sm">Empty module. Click buttons above to build.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {moduleData.fields.map((field, index) => (
                    <div key={field.id} draggable onDragStart={(e) => handleDragStart(e, index)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, index)} className={`bg-white p-5 rounded-2xl border ${draggedIdx === index ? 'border-blue-400 opacity-50' : 'border-slate-200 shadow-sm'} relative group transition-all`}>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                         <div className="flex items-center gap-2 w-full">
                           <div className="cursor-grab text-slate-300 hover:text-slate-600"><GripVertical size={18} /></div>
                           <input value={field.label} onChange={(e) => updateFieldValue(field.id, 'label', e.target.value)} className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none w-full" />
                         </div>
                         <div className="flex items-center gap-1 ml-4 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                           <button onClick={() => moveField(index, 'up')} disabled={index === 0} className="text-slate-400 hover:text-blue-500 disabled:opacity-30"><ChevronUp size={16} /></button>
                           <button onClick={() => moveField(index, 'down')} disabled={index === moduleData.fields.length - 1} className="text-slate-400 hover:text-blue-500 disabled:opacity-30"><ChevronDown size={16} /></button>
                           <button onClick={() => deleteField(field.id)} className="text-slate-400 hover:text-rose-500 p-1"><Trash2 size={16} /></button>
                         </div>
                      </div>
                      
                      {/* Dynamic Inputs Based on Type */}
                      {field.type === 'text' && <input value={field.value} onChange={(e) => updateFieldValue(field.id, 'value', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm font-bold outline-none" placeholder="Heading..." />}
                      {field.type === 'textarea' && <textarea value={field.value} onChange={(e) => updateFieldValue(field.id, 'value', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm h-24 outline-none" placeholder="Paragraph..." />}
                      {field.type === 'list' && <textarea value={field.value} onChange={(e) => updateFieldValue(field.id, 'value', e.target.value)} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm h-24 outline-none" placeholder="Bullet points (New line for each)..." />}
                      {field.type === 'button' && (
                        <div className="grid grid-cols-2 gap-3">
                          <input value={field.value} onChange={(e) => updateFieldValue(field.id, 'value', e.target.value)} className="px-4 py-2 bg-slate-50 rounded-lg text-xs font-bold" placeholder="Btn Text" />
                          <input value={field.link} onChange={(e) => updateFieldValue(field.id, 'link', e.target.value)} className="px-4 py-2 bg-slate-50 rounded-lg text-xs" placeholder="URL" />
                        </div>
                      )}
                      {field.type === 'image' && (
                        <div className="space-y-3">
                          <input type="file" id={`f-${field.id}`} hidden onChange={(e) => handleImageUpload(field.id, e)} />
                          <button onClick={() => document.getElementById(`f-${field.id}`).click()} className="w-full py-3 border-2 border-dashed border-blue-100 rounded-xl text-xs font-bold text-blue-500 bg-blue-50/50">Upload Visual</button>
                          {field.value && <img src={getImageUrl(field.value)} className="w-full h-32 object-cover rounded-xl border border-slate-100" alt="Preview" />}
                        </div>
                      )}
                      {field.type === 'divider' && <div className="py-2 text-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Section Divider</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- PREVIEW PANEL --- */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-full lg:flex-1 min-h-[700px] lg:min-h-0' : 'w-full h-full'} bg-slate-200 p-4 lg:p-10 flex items-center justify-center relative overflow-hidden`}>
            <div className={`w-full h-full max-w-5xl bg-white shadow-2xl rounded-3xl md:rounded-[3rem] overflow-hidden flex flex-col border-[4px] md:border-[10px] border-slate-900 transition-all duration-500 ${viewMode === 'split' ? 'lg:scale-[0.95]' : 'scale-100'}`}>
                <div className="h-8 md:h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 md:px-6 gap-2 shrink-0">
                    <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-500" /><div className="w-2.5 h-2.5 rounded-full bg-amber-500" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /></div>
                </div>
                <div className="flex-1 overflow-y-auto bg-white p-8 md:p-16 custom-scrollbar text-center md:text-left">
                    <div className="max-w-3xl mx-auto flex flex-col gap-6">
                      {moduleData.fields.map((field) => (
                        <React.Fragment key={field.id}>
                          {field.type === 'text' && <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">{field.value || field.label}</h2>}
                          {field.type === 'textarea' && <p className="text-slate-500 text-sm md:text-base leading-relaxed whitespace-pre-line">{field.value}</p>}
                          {field.type === 'list' && (
                            <ul className="list-disc ml-5 space-y-2 text-slate-600 text-sm md:text-base text-left">
                              {field.value.split('\n').filter(i => i.trim()).map((li, i) => <li key={i}>{li}</li>)}
                            </ul>
                          )}
                          {field.type === 'button' && (
                            <div><a href={field.link} className="inline-flex px-8 py-4 bg-emerald-500 text-white rounded-full font-black uppercase text-xs shadow-lg">{field.value || 'Action'}</a></div>
                          )}
                          {field.type === 'image' && field.value && <img src={getImageUrl(field.value)} className="w-full rounded-[2rem] shadow-lg border border-slate-100" alt="content" />}
                          {field.type === 'divider' && <hr className="my-4 border-t-2 border-slate-100" />}
                        </React.Fragment>
                      ))}
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