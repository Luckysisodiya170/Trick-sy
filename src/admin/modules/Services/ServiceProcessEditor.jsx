import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Monitor, Plus, Trash2, ListOrdered, Type, AlignLeft, Hash
} from 'lucide-react';

import { servicesData as initialData } from '../../../data/servicesData';
import ServiceDetail from '../../../pages/Services/ServiceDetail'; 

const ServiceProcessEditor = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const [viewMode, setViewMode] = useState('split'); // 'edit', 'split', 'preview'
  const [isSaving, setIsSaving] = useState(false);
  const [fullServiceData, setFullServiceData] = useState(null);

  // Load Initial Data
  useEffect(() => {
    const data = initialData[serviceId];
    if (data) {
      setFullServiceData({
        ...data,
        process: data.process ? data.process.map(p => ({ ...p })) : []
      });
    }
  }, [serviceId]);

  if (!fullServiceData) return <div className="p-10 text-center font-black text-slate-400 uppercase tracking-widest text-xs animate-pulse">Loading Editor...</div>;

  // --- HANDLERS ---
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`Saved Process for ${serviceId}:`, fullServiceData.process);
    setIsSaving(false);
    alert('Service Process Section Updated Successfully!');
  };

  const handleProcessChange = (index, field, value) => {
    const newProcess = [...fullServiceData.process];
    newProcess[index][field] = value;
    setFullServiceData({ ...fullServiceData, process: newProcess });
  };

  const handleAddStep = () => {
    // Auto-generate next step number like "01", "02"
    const nextStepNum = (fullServiceData.process.length + 1).toString().padStart(2, '0');
    
    setFullServiceData({
      ...fullServiceData,
      process: [
        ...fullServiceData.process, 
        { step: nextStepNum, title: "New Step", desc: "Describe what happens in this step of the service." }
      ]
    });
  };

  const handleRemoveStep = (index) => {
    const newProcess = [...fullServiceData.process];
    newProcess.splice(index, 1);
    setFullServiceData({ ...fullServiceData, process: newProcess });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-3 lg:px-6 py-3 flex items-center justify-between shadow-sm gap-2 shrink-0">
        <div className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm lg:text-lg font-black tracking-tighter italic flex items-center gap-1.5">
            <Settings2 size={18} className="text-emerald-600 lg:w-5 lg:h-5" /> 
            <span className="tracking-tight uppercase">PROCESS EDITOR</span> 
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full flex-shrink-1 mx-2">
          {[
            { id: 'edit', icon: Edit3, label: 'Edit' }, 
            { id: 'split', icon: Columns, label: 'Split' }, 
            { id: 'preview', icon: Eye, label: 'Preview' }
          ].map((mode) => (
            <button 
              key={mode.id} 
              onClick={() => setViewMode(mode.id)} 
              className={`flex items-center gap-1.5 px-3 lg:px-5 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs font-bold transition-all whitespace-nowrap ${
                viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <mode.icon size={12} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className={`${viewMode === mode.id ? 'inline' : 'hidden sm:inline'}`}>{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-emerald-600 transition-all flex-shrink-0 disabled:opacity-70 disabled:hover:bg-slate-900 active:scale-95"
        >
          {isSaving ? (
            <span className="animate-pulse">Saving...</span>
          ) : (
            <>
              <Save size={16} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className="hidden md:inline">Save Changes</span>
            </>
          )}
        </button>
      </nav>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT SIDE: FORM */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-4xl mx-auto border-x' : 'w-full lg:w-[480px] border-r'} bg-white border-slate-200 flex flex-col h-full relative z-20 shadow-2xl shadow-slate-200/50 transition-all duration-300 shrink-0`}>
            
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 custom-scrollbar">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1 flex items-center gap-2">
                    <ListOrdered size={24} className="text-emerald-500" /> Process Steps
                  </h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage service workflow</p>
                </div>
                <button 
                  onClick={handleAddStep}
                  className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-100 hover:scale-105 transition-all"
                >
                  <Plus size={14} /> Add Step
                </button>
              </div>

              <div className="space-y-5">
                {fullServiceData.process?.map((item, idx) => (
                  <div key={idx} className="p-5 bg-slate-50 border border-slate-100 rounded-3xl relative group transition-all hover:border-emerald-200 hover:shadow-md">
                    
                    {/* Delete Button */}
                    <button 
                      onClick={() => handleRemoveStep(idx)}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 shadow-sm opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
                    >
                      <Trash2 size={14} />
                    </button>

                    <div className="grid grid-cols-12 gap-3 mb-4">
                      <div className="col-span-3">
                         <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">
                          <Hash size={12} /> Number
                        </label>
                        <input 
                          type="text" value={item.step} onChange={(e) => handleProcessChange(idx, 'step', e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-black text-emerald-600 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all shadow-inner text-center" 
                        />
                      </div>
                      <div className="col-span-9">
                         <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">
                          <Type size={12} /> Step Title
                        </label>
                        <input 
                          type="text" value={item.title} onChange={(e) => handleProcessChange(idx, 'title', e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all shadow-inner" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">
                        <AlignLeft size={12} /> Description
                      </label>
                      <textarea 
                        value={item.desc} onChange={(e) => handleProcessChange(idx, 'desc', e.target.value)} rows="2"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all shadow-inner resize-none leading-relaxed" 
                      ></textarea>
                    </div>
                  </div>
                ))}

                {fullServiceData.process?.length === 0 && (
                  <div className="text-center p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                    <ListOrdered className="mx-auto text-slate-300 mb-3 w-8 h-8" />
                    <p className="text-sm font-bold text-slate-500">No workflow steps yet.</p>
                    <button onClick={handleAddStep} className="mt-3 text-emerald-500 font-black text-xs uppercase tracking-widest hover:underline">Add the first step</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* RIGHT SIDE: FULL WIDTH OR SPLIT PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'hidden lg:flex flex-1'} flex-col h-full bg-slate-100/50 relative transition-all duration-300`}>
            
            {/* Fake Browser Top Bar */}
            <div className="h-12 flex items-center justify-center gap-2 bg-white border-b border-slate-200 shadow-sm shrink-0">
              <Monitor size={14} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Output</span>
            </div>

            {/* Scrollable Preview Area */}
            <div className="flex-1 overflow-y-auto w-full flex items-start justify-center p-4 lg:p-8 custom-scrollbar">
              
              <div className="w-full max-w-[1400px] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300/50 border-4 border-white/50 bg-white origin-top animate-in zoom-in-95 duration-300">
                  
                  <div key={JSON.stringify(fullServiceData.process)} className="pointer-events-none">
                     <ServiceDetail previewData={fullServiceData} previewSection="process" />
                  </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ServiceProcessEditor;