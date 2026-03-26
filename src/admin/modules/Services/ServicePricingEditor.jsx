import React from 'react';
import { 
  Plus, Trash2, CreditCard, Type, DollarSign, X
} from 'lucide-react';

import ServiceDetail from '../../../pages/Services/ServiceDetail'; 

const ServicePricingEditor = ({ fullServiceData, setFullServiceData }) => {

  if (!fullServiceData) return <div className="p-10 text-center animate-pulse text-slate-400">Loading...</div>;

  const handlePricingChange = (index, field, value) => {
    const newPricing = [...fullServiceData.pricing];
    newPricing[index][field] = value;
    setFullServiceData({ ...fullServiceData, pricing: newPricing });
  };

  const handleAddPlan = () => {
    setFullServiceData({
      ...fullServiceData,
      pricing: [
        ...(fullServiceData.pricing || []), 
        { plan: "New Plan", price: "$99", isPopular: false, features: ["Feature 1", "Feature 2"] }
      ]
    });
  };

  const handleRemovePlan = (index) => {
    const newPricing = [...fullServiceData.pricing];
    newPricing.splice(index, 1);
    setFullServiceData({ ...fullServiceData, pricing: newPricing });
  };

  const handleFeatureChange = (planIndex, featureIndex, value) => {
    const newPricing = [...fullServiceData.pricing];
    newPricing[planIndex].features[featureIndex] = value;
    setFullServiceData({ ...fullServiceData, pricing: newPricing });
  };

  const handleAddFeature = (planIndex) => {
    const newPricing = [...fullServiceData.pricing];
    newPricing[planIndex].features.push("New Feature");
    setFullServiceData({ ...fullServiceData, pricing: newPricing });
  };

  const handleRemoveFeature = (planIndex, featureIndex) => {
    const newPricing = [...fullServiceData.pricing];
    newPricing[planIndex].features.splice(featureIndex, 1);
    setFullServiceData({ ...fullServiceData, pricing: newPricing });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      
      <div className="w-full lg:w-[400px] space-y-6 shrink-0">
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight mb-1 flex items-center gap-2">
                <CreditCard size={20} className="text-emerald-500" /> Pricing Plans
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage packages</p>
            </div>
            <button 
              onClick={handleAddPlan}
              className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-200 hover:scale-105 transition-all shadow-sm"
            >
              <Plus size={14} /> Add
            </button>
          </div>

          <div className="space-y-6">
            {fullServiceData.pricing?.map((plan, idx) => (
              <div key={idx} className={`p-4 rounded-2xl relative group transition-all border ${plan.isPopular ? 'bg-emerald-50 border-emerald-200 shadow-md' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}`}>
                
                <button 
                  onClick={() => handleRemovePlan(idx)}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200 shadow-md opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
                >
                  <Trash2 size={14} />
                </button>

                <div className="grid grid-cols-12 gap-3 mb-4">
                  <div className="col-span-7">
                     <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">
                      <Type size={12} /> Plan Name
                    </label>
                    <input 
                      type="text" value={plan.plan} onChange={(e) => handlePricingChange(idx, 'plan', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-800 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all shadow-inner" 
                    />
                  </div>
                  <div className="col-span-5">
                     <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">
                      <DollarSign size={12} /> Price
                    </label>
                    <input 
                      type="text" value={plan.price} onChange={(e) => handlePricingChange(idx, 'price', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-black text-emerald-600 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all shadow-inner" 
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer mb-4 p-2 bg-slate-50 rounded-lg border border-slate-100 w-fit pr-4">
                  <input 
                    type="checkbox" checked={plan.isPopular || false} 
                    onChange={(e) => handlePricingChange(idx, 'isPopular', e.target.checked)}
                    className="w-3.5 h-3.5 text-emerald-500 rounded focus:ring-emerald-500 border-slate-300 ml-1"
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Mark as Popular</span>
                </label>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Features</label>
                    <button onClick={() => handleAddFeature(idx)} className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-700 flex items-center gap-1">
                      <Plus size={12} /> Add Feature
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {plan.features?.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <input 
                          type="text" value={feat} onChange={(e) => handleFeatureChange(idx, fIdx, e.target.value)}
                          className="flex-1 px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-slate-600 outline-none focus:border-emerald-400 transition-all shadow-inner" 
                        />
                        <button onClick={() => handleRemoveFeature(idx, fIdx)} className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}

            {(!fullServiceData.pricing || fullServiceData.pricing.length === 0) && (
              <div className="text-center p-8 bg-white border-2 border-dashed border-slate-200 rounded-2xl">
                <CreditCard className="mx-auto text-slate-300 mb-3 w-8 h-8" />
                <p className="text-xs font-bold text-slate-500">No pricing plans yet.</p>
                <button onClick={handleAddPlan} className="mt-3 text-emerald-500 font-black text-[10px] uppercase tracking-widest hover:underline">Add the first plan</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-100 rounded-[2rem] overflow-hidden relative border-4 border-slate-200 shadow-inner h-[600px] overflow-y-auto">
         <div className="w-full min-h-full bg-white relative">
            <div className="pointer-events-none transform scale-[0.8] origin-top-left w-[125%] h-[125%]">
               <ServiceDetail previewData={fullServiceData} previewSection="pricing" />
            </div>
         </div>
      </div>

    </div>
  );
};

export default ServicePricingEditor;