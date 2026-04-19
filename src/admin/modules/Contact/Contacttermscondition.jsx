import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../../store/index'; 
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

const ContactTermsEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = 1310; 

  const content = useSelector((state) => state.content.activeSubsection);
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState('split'); 
  const [formData, setFormData] = useState({ title: '', content: '' });

  // 1. Initial Fetch
  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(id));
  }, [dispatch]);

  // 2. Data Sync 
  useEffect(() => {
    if (content && content.subsectionId == id) {
      let mappedText = "";
      if (content.listItems && Array.isArray(content.listItems)) {
        mappedText = content.listItems
          .map(item => `${item.itemTitle}:${item.itemDescription}`)
          .join('\n');
      } else if (content.description) {
        mappedText = content.description;
      }
      setFormData({ title: content.title || 'Terms & Conditions', content: mappedText });
    }
  }, [content]);

  // 3. Save Logic
  const handleSave = async () => {
    if (!formData.content) return alert("Content khali hai!");
    setIsSaving(true);
    try {
     
      const lines = formData.content.split('\n');
      const listItems = lines.map(line => {
        const parts = line.split(':');
        const title = parts[0] ? parts[0] : "Point";
        const desc = parts.length > 1 ? parts.slice(1).join(':') : line;
        return { itemTitle: title, itemDescription: desc };
      });

      const updateData = {
        title: formData.title,
        listItems: listItems,
        description: "" 
      };

      await dispatch(updateSingleSubsectionContent({ subsectionId: id, updateData })).unwrap();
      await dispatch(fetchSingleSubsectionContent(id));
      alert('Terms Saved Perfectly! ✅');
    } catch (err) { 
      alert('Error saving data'); 
    } finally { 
      setIsSaving(false); 
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#FDFDFD]">
      <nav className="p-4 border-b flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
          <h1 className="font-black uppercase italic tracking-tighter text-indigo-600">{formData.title}</h1>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-full text-[10px] font-bold">
            <button onClick={() => setViewMode('edit')} className={`px-4 py-1.5 rounded-full ${viewMode === 'edit' ? 'bg-white shadow text-indigo-600' : ''}`}>Edit</button>
            <button onClick={() => setViewMode('split')} className={`px-4 py-1.5 rounded-full ${viewMode === 'split' ? 'bg-white shadow text-indigo-600' : ''}`}>Split</button>
            <button onClick={() => setViewMode('preview')} className={`px-4 py-1.5 rounded-full ${viewMode === 'preview' ? 'bg-white shadow text-indigo-600' : ''}`}>Preview</button>
        </div>
        <button onClick={handleSave} disabled={isSaving} className="bg-slate-900 text-white px-6 py-2 rounded-full font-bold text-xs flex items-center gap-2">
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} SAVE CHANGES
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className="flex-1 p-8 space-y-6 overflow-y-auto border-r bg-white">
             <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full text-3xl font-black outline-none border-b-2 border-transparent focus:border-indigo-600 pb-2" />
             <textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full h-[70vh] p-4 bg-slate-50 rounded-2xl outline-none resize-none leading-relaxed" />
          </div>
        )}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className="flex-1 bg-slate-50 p-12 overflow-y-auto">
            <div className="max-w-2xl mx-auto bg-white p-12 shadow-2xl rounded-3xl min-h-full">
              <h2 className="text-4xl font-black mb-8">{formData.title}</h2>
              {/* ✅ whitespace-pre-wrap ADDS SPACE SUPPORT */}
              <div className="whitespace-pre-wrap text-slate-600 leading-8">{formData.content}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ContactTermsEditor;