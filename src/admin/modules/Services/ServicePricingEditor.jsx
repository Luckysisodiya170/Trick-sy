import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../../store/index'; 
import { 
  Plus, Trash2, CreditCard, Type, DollarSign, X, Loader2, Sparkles, 
  Edit3, Columns, Eye, CheckCircle2, Zap, Star, Layout, MousePointer2
} from 'lucide-react';

const ServicePricingEditor = forwardRef(({ numericId }, ref) => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const [viewMode, setViewMode] = useState('split');
  const [sectionHeader, setSectionHeader] = useState({ title: "", description: "" });
  const [pricingPlans, setPricingPlans] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [activeField, setActiveField] = useState(null);

  useImperativeHandle(ref, () => ({
    handleAutoSave: async () => {
      return await handleSave();
    }
  }));

  useEffect(() => {
    if (numericId) { dispatch(fetchSingleSubsectionContent(numericId)); }
  }, [dispatch, numericId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setSectionHeader({
        title: content.pricingTitle || "Transparent Pricing",
        description: content.pricingDesc || "No hidden fees. Pay for what you get."
      });
      setPricingPlans(content.pricing || []);
    }
  }, [content]);

  const handlePricingChange = (index, field, value) => {
    const updated = [...pricingPlans];
    updated[index] = { ...updated[index], [field]: value };
    setPricingPlans(updated);
  };

  const handleAddPlan = () => {
    setPricingPlans([
      ...pricingPlans, 
      { plan: "New Package", price: "99", buttonText: "Select Plan", isPopular: false, features: ["Feature Detail"] }
    ]);
  };

  const handleRemovePlan = (index) => {
    setPricingPlans(pricingPlans.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (planIndex, featIndex, value) => {
    const updated = [...pricingPlans];
    const updatedFeats = [...updated[planIndex].features];
    updatedFeats[featIndex] = value;
    updated[planIndex] = { ...updated[planIndex], features: updatedFeats };
    setPricingPlans(updated);
  };

  const handleAddFeature = (planIndex) => {
    const updated = [...pricingPlans];
    updated[planIndex] = { 
      ...updated[planIndex], 
      features: [...updated[planIndex].features, "New Feature"] 
    };
    setPricingPlans(updated);
  };

  const handleRemoveFeature = (planIndex, featIndex) => {
    const updated = [...pricingPlans];
    updated[planIndex].features = updated[planIndex].features.filter((_, i) => i !== featIndex);
    setPricingPlans(updated);
  };

  const handleSave = async () => {
    if (!numericId) return false;
    setIsSaving(true);
    try {
      const payload = {
        pricingTitle: sectionHeader.title,
        pricingDesc: sectionHeader.description,
        pricing: pricingPlans 
      };
      await dispatch(updateSingleSubsectionContent({ subsectionId: numericId, updateData: payload })).unwrap();
      return true;
    } catch (error) { return false; } finally { setIsSaving(false); }
  };

  const IconRenderer = ({ iconName, className }) => {
    return <CheckCircle2 className={className} />;
  };

  if (status === 'loading' && (!content || Object.keys(content).length === 0)) {
    return <div className="h-full flex items-center justify-center font-black text-slate-300 uppercase text-xs tracking-widest italic">Syncing Pricing...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden">
      
      {/* TOOLBAR */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-emerald-50 rounded-xl"><CreditCard size={22} className="text-emerald-600" /></div>
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Pricing Lab</h2>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-2xl shadow-inner mx-2">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map(m => (
            <button key={m.id} onClick={() => setViewMode(m.id)} className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all duration-300 ${viewMode === m.id ? 'bg-white text-emerald-600 shadow-sm scale-105' : 'text-slate-500 hover:text-slate-700'}`}>
              <m.icon size={14} /> <span className="hidden md:inline">{m.label}</span>
            </button>
          ))}
        </div>
        
        <button onClick={handleAddPlan} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-lg active:scale-95">
          <Plus size={16} /> Add Plan
        </button>
      </div>

      <div className={`flex-1 transition-all duration-500 overflow-y-auto custom-scrollbar ${viewMode === 'split' ? 'grid grid-cols-1 xl:grid-cols-12 gap-0' : 'flex justify-center'}`}>
        
        {/* EDITOR SIDE */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-4 border-r border-slate-200' : 'w-full max-w-4xl'} bg-[#F8FAFC] p-6 sm:p-8 space-y-8 h-full overflow-y-auto custom-scrollbar`}>
            
            {/* Section Branding */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-xs uppercase tracking-tight border-b pb-5"><Sparkles size={18} className="text-emerald-500" /> Branding</h3>
              <div className="space-y-4">
                <input value={sectionHeader.title} onChange={e => setSectionHeader({...sectionHeader, title: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-800 text-sm focus:bg-white focus:border-emerald-400 outline-none transition-all shadow-inner"/>
                <textarea value={sectionHeader.description} onChange={e => setSectionHeader({...sectionHeader, description: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-slate-600 outline-none focus:bg-white focus:border-emerald-400 h-20 resize-none transition-all shadow-inner"/>
              </div>
            </div>

            {/* Pricing Cards Editor */}
            <div className="space-y-6 pb-20">
              {pricingPlans.map((plan, idx) => (
                <div key={idx} className={`bg-white rounded-[2.5rem] border-2 transition-all relative p-8 shadow-sm ${plan.isPopular ? 'border-emerald-500 ring-4 ring-emerald-50' : 'border-slate-100'}`}>
                  <button onClick={() => handleRemovePlan(idx)} className="absolute top-6 right-6 p-2 bg-slate-50 text-slate-300 hover:text-rose-500 rounded-full"><Trash2 size={16} /></button>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">Name</label>
                          <input value={plan.plan} onFocus={() => setActiveField(idx)} onBlur={() => setActiveField(null)} onChange={e => handlePricingChange(idx, 'plan', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-800 text-sm focus:bg-white outline-none" />
                       </div>
                       <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">Price</label>
                          <input value={plan.price} onFocus={() => setActiveField(idx)} onBlur={() => setActiveField(null)} onChange={e => handlePricingChange(idx, 'price', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-emerald-600 text-sm focus:bg-white outline-none" />
                       </div>
                    </div>

                    {/* 🔴 NEW: SELECT PLAN BUTTON EDIT */}
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1 mb-2 block tracking-widest">Button Text (CTA)</label>
                        <div className="relative">
                            <input value={plan.buttonText || "Select Plan"} onFocus={() => setActiveField(idx)} onBlur={() => setActiveField(null)} onChange={e => handlePricingChange(idx, 'buttonText', e.target.value)} className="w-full p-4 pl-10 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-800 text-sm focus:bg-white outline-none" />
                            <MousePointer2 className="absolute left-4 top-4 text-emerald-500" size={16} />
                        </div>
                    </div>

                    <button onClick={() => handlePricingChange(idx, 'isPopular', !plan.isPopular)} className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${plan.isPopular ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                        <Star size={14} className={plan.isPopular ? 'fill-emerald-500' : ''} />
                        <span className="text-[10px] font-black uppercase italic">Featured as Popular Choice</span>
                    </button>

                    <div className="pt-4 border-t border-slate-50">
                        <div className="flex items-center justify-between mb-4">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Features</label>
                           <button onClick={() => handleAddFeature(idx)} className="text-[10px] font-black uppercase text-emerald-600 hover:underline flex items-center gap-1"><Plus size={12}/> Add</button>
                        </div>
                        <div className="space-y-3">
                           {plan.features?.map((feat, fIdx) => (
                             <div key={fIdx} className="flex gap-2 group/feat">
                               <input value={feat} onChange={e => handleFeatureChange(idx, fIdx, e.target.value)} className="flex-1 p-3 bg-slate-50 border-none rounded-xl text-xs font-medium text-slate-600 focus:bg-white outline-none" />
                               <button onClick={() => handleRemoveFeature(idx, fIdx)} className="p-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover/feat:opacity-100 transition-all"><X size={14}/></button>
                             </div>
                           ))}
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREVIEW PANEL */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'xl:col-span-8 bg-[#F1F5F9] p-4 sm:p-12' : 'w-full p-4 sm:p-12'} flex items-start justify-center overflow-y-auto h-full`}>
             <div className="w-full max-w-[1200px] bg-zinc-50 rounded-[3rem] shadow-2xl overflow-hidden border-8 border-slate-900 relative flex flex-col shrink-0 scale-[0.95] xl:scale-100 origin-top">
              
              <div className="h-10 bg-slate-900 flex items-center px-6 gap-2 shrink-0 border-b border-white/5">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div></div>
                  <div className="mx-auto w-48 h-4 bg-slate-700 rounded text-[8px] text-slate-500 flex items-center justify-center font-bold tracking-widest uppercase italic tracking-tighter">tricksy-preview.io/pricing</div>
              </div>

              <section className="py-24 px-8 lg:px-16 bg-zinc-50 relative min-h-full">
                <div className={`text-center mb-16 transition-all duration-500 ${activeField === 'header' ? 'scale-105' : ''}`}>
                  <h2 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight">{sectionHeader.title}</h2>
                  <p className="text-zinc-500 mt-4 font-medium text-lg">{sectionHeader.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
                  {pricingPlans.map((plan, idx) => (
                    <div key={idx} className={`relative p-8 rounded-[2.5rem] transition-all duration-500 ${
                      plan.isPopular 
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl shadow-emerald-500/30 md:-translate-y-4 border-none z-10' 
                      : 'bg-white border border-zinc-200 text-zinc-950 mt-0 lg:mt-4'
                    } ${activeField === idx ? 'ring-8 ring-emerald-500/10' : ''}`}>
                      
                      {plan.isPopular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg whitespace-nowrap">
                          Most Popular Choice
                        </div>
                      )}

                      <h3 className="text-2xl font-black mb-2 mt-4">{plan.plan || "Plan Name"}</h3>
                      <div className="flex items-baseline gap-1 mb-8">
                        <span className="text-4xl lg:text-5xl font-black">{plan.price || "00"}</span>
                        {plan.price !== "Custom" && <span className={`text-sm font-bold ${plan.isPopular ? 'text-emerald-100' : 'text-zinc-400'}`}>/visit</span>}
                      </div>

                      <ul className="space-y-4 mb-10">
                        {plan.features?.map((feat, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.isPopular ? 'text-white' : 'text-emerald-500'}`} />
                            <span className={`font-medium text-sm ${plan.isPopular ? 'text-emerald-50' : 'text-zinc-600'}`}>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* 🔴 PREVIEW SHOWING CUSTOM TEXT */}
                      <button className={`w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${
                        plan.isPopular 
                        ? 'bg-white text-emerald-600 hover:bg-zinc-100' 
                        : 'bg-zinc-100 text-zinc-950 hover:bg-zinc-200'
                      }`}>
                        {plan.buttonText || "Select Plan"}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 5px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }`}</style>
    </div>
  );
});

export default ServicePricingEditor;