import React from 'react';
import { 
  Plus, Trash2, ListChecks, Type, AlignLeft
} from 'lucide-react';

import ServiceDetail from '../../../pages/Services/ServiceDetail'; 

const ServiceIncludesEditor = ({ fullServiceData, setFullServiceData }) => {

  if (!fullServiceData) return <div className="p-10 text-center animate-pulse text-slate-400">Loading...</div>;

  const handleIncludeChange = (index, field, value) => {
    const newIncludes = [...fullServiceData.includes];
    newIncludes[index][field] = value;
    setFullServiceData({ ...fullServiceData, includes: newIncludes });
  };

  const handleAddInclude = () => {
    setFullServiceData({
      ...fullServiceData,
      includes: [
        ...(fullServiceData.includes || []), 
        { title: "New Feature", desc: "Description for this new feature." }
      ]
    });
  };

  const handleRemoveInclude = (index) => {
    const newIncludes = [...fullServiceData.includes];
    newIncludes.splice(index, 1);
    setFullServiceData({ ...fullServiceData, includes: newIncludes });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      
      {/* LEFT SIDE: FORM */}
      <div className="w-full lg:w-[400px] space-y-6 shrink-0">
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight mb-1 flex items-center gap-2">
                <ListChecks size={20} className="text-emerald-500" /> Benefit Cards
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage service inclusions</p>
            </div>
            <button 
              onClick={handleAddInclude}
              className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-200 hover:scale-105 transition-all shadow-sm"
            >
              <Plus size={14} /> Add
            </button>
          </div>

          <div className="space-y-5">
            {fullServiceData.includes?.map((item, idx) => (
              <div key={idx} className="p-4 bg-white border border-slate-200 rounded-2xl relative group transition-all hover:border-emerald-200 shadow-sm hover:shadow-md">
                
                {/* Delete Button */}
                <button 
                  onClick={() => handleRemoveInclude(idx)}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200 shadow-md opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
                >
                  <Trash2 size={14} />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center text-[10px] shrink-0 shadow-md shadow-emerald-500/30">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                     <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">
                      <Type size={12} /> Card Title
                    </label>
                    <input 
                      type="text" value={item.title} onChange={(e) => handleIncludeChange(idx, 'title', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-800 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all shadow-inner" 
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">
                    <AlignLeft size={12} /> Description
                  </label>
                  <textarea 
                    value={item.desc} onChange={(e) => handleIncludeChange(idx, 'desc', e.target.value)} rows="2"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-slate-600 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all shadow-inner resize-none leading-relaxed" 
                  ></textarea>
                </div>
              </div>
            ))}

            {(!fullServiceData.includes || fullServiceData.includes.length === 0) && (
              <div className="text-center p-8 bg-white border-2 border-dashed border-slate-200 rounded-2xl">
                <ListChecks className="mx-auto text-slate-300 mb-3 w-8 h-8" />
                <p className="text-xs font-bold text-slate-500">No inclusion cards yet.</p>
                <button onClick={handleAddInclude} className="mt-3 text-emerald-500 font-black text-[10px] uppercase tracking-widest hover:underline">Add the first card</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: LIVE PREVIEW */}
      <div className="flex-1 bg-slate-100 rounded-[2rem] overflow-hidden relative border-4 border-slate-200 shadow-inner h-[600px] overflow-y-auto">
         {/* Live Preview Container */}
         <div className="w-full min-h-full bg-white relative">
            <div className="pointer-events-none transform scale-[0.8] origin-top-left w-[125%] h-[125%]">
               <ServiceDetail previewData={fullServiceData} previewSection="includes" />
            </div>
         </div>
      </div>

    </div>
  );
};

export default ServiceIncludesEditor;