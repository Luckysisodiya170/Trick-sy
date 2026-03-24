import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye,
  Monitor, Plus, Trash2, CreditCard, Type, DollarSign, X
} from 'lucide-react';

import { servicesData as initialData } from '../../../data/servicesData';
import ServiceDetail from '../../../pages/Services/ServiceDetail'; 

const ServicePricingEditor = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const [viewMode, setViewMode] = useState('split'); // 'edit', 'split', 'preview'
  const [isSaving, setIsSaving] = useState(false);
  const [fullServiceData, setFullServiceData] = useState(null);

  // Load Initial Data (Deep copy for nested arrays)
  useEffect(() => {
    const data = initialData[serviceId];
    if (data) {
      setFullServiceData({
        ...data,
        pricing: data.pricing ? data.pricing.map(p => ({ 
          ...p, 
          features: p.features ? [...p.features] : [] 
        })) : []
      });
    }
  }, [serviceId]);

  if (!fullServiceData) return <div className="p-10 text-center font-black text-slate-400 uppercase tracking-widest text-xs animate-pulse">Loading Editor...</div>;

  // --- HANDLERS ---
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`Saved Pricing for ${serviceId}:`, fullServiceData.pricing);
    setIsSaving(false);
    alert('Service Pricing Section Updated Successfully!');
  };

  const handlePricingChange = (index, field, value) => {
    const newPricing = [...fullServiceData.pricing];
    newPricing[index][field] = value;
    setFullServiceData({ ...fullServiceData, pricing: newPricing });
  };

  const handleAddPlan = () => {
    setFullServiceData({
      ...fullServiceData,
      pricing: [
        ...fullServiceData.pricing, 
        { plan: "New Plan", price: "$99", isPopular: false, features: ["Feature 1", "Feature 2"] }
      ]
    });
  };

  const handleRemovePlan = (index) => {
    const newPricing = [...fullServiceData.pricing];
    newPricing.splice(index, 1);
    setFullServiceData({ ...fullServiceData, pricing: newPricing });
  };

  // Nested Feature Handlers
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
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-3 lg:px-6 py-3 flex items-center justify-between shadow-sm gap-2 shrink-0">
        <div className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm lg:text-lg font-black tracking-tighter italic flex items-center gap-1.5">
            <Settings2 size={18} className="text-emerald-600 lg:w-5 lg:h-5" /> 
            <span className="tracking-tight uppercase">PRICING EDITOR</span> 
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
                    <CreditCard size={24} className="text-emerald-500" /> Pricing Plans
                  </h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage packages & tiers</p>
                </div>
                <button 
                  onClick={handleAddPlan}
                  className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-100 hover:scale-105 transition-all"
                >
                  <Plus size={14} /> Add Plan
                </button>
              </div>

              <div className="space-y-6">
                {fullServiceData.pricing?.map((plan, idx) => (
                  <div key={idx} className={`p-5 rounded-3xl relative group transition-all border ${plan.isPopular ? 'bg-emerald-50/30 border-emerald-200' : 'bg-slate-50 border-slate-100'}`}>
                    
                    {/* Delete Button */}
                    <button 
                      onClick={() => handleRemovePlan(idx)}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 shadow-sm opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
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
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all shadow-inner" 
                        />
                      </div>
                      <div className="col-span-5">
                         <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5">
                          <DollarSign size={12} /> Price
                        </label>
                        <input 
                          type="text" value={plan.price} onChange={(e) => handlePricingChange(idx, 'price', e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-black text-emerald-600 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all shadow-inner" 
                        />
                      </div>
                    </div>

                    {/* Popular Checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer mb-4 p-2 bg-white rounded-xl border border-slate-100 shadow-sm w-fit pr-4">
                      <input 
                        type="checkbox" checked={plan.isPopular || false} 
                        onChange={(e) => handlePricingChange(idx, 'isPopular', e.target.checked)}
                        className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500 border-slate-300 ml-1"
                      />
                      <span className="text-[11px] font-black uppercase tracking-widest text-slate-600">Mark as Popular</span>
                    </label>

                    {/* Features List */}
                    <div className="pt-4 border-t border-slate-200/60">
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Included Features</label>
                        <button onClick={() => handleAddFeature(idx)} className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-700 flex items-center gap-1">
                          <Plus size={12} /> Add Feature
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        {plan.features?.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2">
                            <input 
                              type="text" value={feat} onChange={(e) => handleFeatureChange(idx, fIdx, e.target.value)}
                              className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 outline-none focus:border-emerald-400 transition-all shadow-sm" 
                            />
                            <button onClick={() => handleRemoveFeature(idx, fIdx)} className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}

                {fullServiceData.pricing?.length === 0 && (
                  <div className="text-center p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                    <CreditCard className="mx-auto text-slate-300 mb-3 w-8 h-8" />
                    <p className="text-sm font-bold text-slate-500">No pricing plans yet.</p>
                    <button onClick={handleAddPlan} className="mt-3 text-emerald-500 font-black text-xs uppercase tracking-widest hover:underline">Add the first plan</button>
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
              
              <div className="w-full max-w-[1400px] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300/50 border-4 border-slate-200 bg-white origin-top animate-in zoom-in-95 duration-300">
                  
                  <div key={JSON.stringify(fullServiceData.pricing)} className="pointer-events-none">
                     <ServiceDetail previewData={fullServiceData} previewSection="pricing" />
                  </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ServicePricingEditor;