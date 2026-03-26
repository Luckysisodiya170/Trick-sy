import React from 'react';
import { 
  Plus, Trash2, ListOrdered, Type, AlignLeft, Hash
} from 'lucide-react';

import ServiceDetail from '../../../pages/Services/ServiceDetail'; 

const ServiceProcessEditor = ({ fullServiceData, setFullServiceData }) => {

  if (!fullServiceData) return <div className="p-10 text-center animate-pulse text-slate-400">Loading...</div>;

  const handleProcessChange = (index, field, value) => {
    const newProcess = [...fullServiceData.process];
    newProcess[index][field] = value;
    setFullServiceData({ ...fullServiceData, process: newProcess });
  };

  const handleAddStep = () => {
    const nextStepNum = ((fullServiceData.process?.length || 0) + 1).toString().padStart(2, '0');
    setFullServiceData({
      ...fullServiceData,
      process: [
        ...(fullServiceData.process || []), 
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
    <div className="flex flex-col lg:flex-row gap-8">
      
      {/* LEFT SIDE: FORM */}
      <div className="w-full lg:w-[400px] space-y-6 shrink-0">
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight mb-1 flex items-center gap-2">
                <ListOrdered size={20} className="text-emerald-500" /> Process Steps
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage workflow</p>
            </div>
            <button 
              onClick={handleAddStep}
              className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-200 hover:scale-105 transition-all shadow-sm"
            >
              <Plus size={14} /> Add
            </button>
          </div>

          <div className="space-y-5">
            {fullServiceData.process?.map((item, idx) => (
              <div key={idx} className="p-4 bg-white border border-slate-200 rounded-2xl relative group transition-all hover:border-emerald-200 shadow-sm hover:shadow-md">
                
                <button 
                  onClick={() => handleRemoveStep(idx)}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200 shadow-md opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
                >
                  <Trash2 size={14} />
                </button>

                <div className="grid grid-cols-12 gap-3 mb-4">
                  <div className="col-span-3">
                     <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">
                      <Hash size={12} /> Num
                    </label>
                    <input 
                      type="text" value={item.step} onChange={(e) => handleProcessChange(idx, 'step', e.target.value)}
                      className="w-full px-2 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-black text-emerald-600 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all shadow-inner text-center" 
                    />
                  </div>
                  <div className="col-span-9">
                     <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">
                      <Type size={12} /> Step Title
                    </label>
                    <input 
                      type="text" value={item.title} onChange={(e) => handleProcessChange(idx, 'title', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-800 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all shadow-inner" 
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">
                    <AlignLeft size={12} /> Description
                  </label>
                  <textarea 
                    value={item.desc} onChange={(e) => handleProcessChange(idx, 'desc', e.target.value)} rows="2"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-slate-600 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all shadow-inner resize-none leading-relaxed" 
                  ></textarea>
                </div>
              </div>
            ))}

            {(!fullServiceData.process || fullServiceData.process.length === 0) && (
              <div className="text-center p-8 bg-white border-2 border-dashed border-slate-200 rounded-2xl">
                <ListOrdered className="mx-auto text-slate-300 mb-3 w-8 h-8" />
                <p className="text-sm font-bold text-slate-500">No workflow steps yet.</p>
                <button onClick={handleAddStep} className="mt-3 text-emerald-500 font-black text-xs uppercase tracking-widest hover:underline">Add the first step</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: LIVE PREVIEW */}
      <div className="flex-1 bg-slate-100 rounded-[2rem] overflow-hidden relative border-4 border-slate-200 shadow-inner h-[600px] overflow-y-auto">
         <div className="w-full min-h-full bg-white relative">
            <div className="pointer-events-none transform scale-[0.8] origin-top-left w-[125%] h-[125%]">
               <ServiceDetail previewData={fullServiceData} previewSection="process" />
            </div>
         </div>
      </div>

    </div>
  );
};

export default ServiceProcessEditor;