import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, CheckCircle2, Star, Plus, Trash2, 
  DollarSign, Zap, LayoutGrid, ShieldCheck, Edit3, 
  Columns, Eye, Monitor, Undo, Type, ListPlus
} from 'lucide-react';

const TechnicalPricingEditor = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('split'); 
  const [isSaving, setIsSaving] = useState(false);

  // Initial Data
  const defaultPlans = [
    { id: 1, name: "Basic Fix", price: "199", desc: "One-time technical visit for minor repairs.", features: ["1 Hour Service", "Basic Tools Required", "No Materials Included", "Standard Response (24h)"], popular: false },
    { id: 2, name: "Pro AMC", price: "899", desc: "Annual maintenance for complete peace of mind.", features: ["Unlimited Emergency Visits", "Priority Response (45m)", "Free Consumables", "Quarterly Deep Checks"], popular: true },
    { id: 3, name: "Premium Villa", price: "2499", desc: "Dedicated technical team for large properties.", features: ["24/7 Standby Squad", "Full Parts Coverage", "Smart Home Support", "Dedicated Manager"], popular: false }
  ];

  const [pageData, setPageData] = useState({
    mainHeading: "Service",
    highlightWord: "Packages_",
    plans: defaultPlans
  });

  // Handlers
  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setPageData(prev => ({ ...prev, [name]: value }));
  };

  const updatePlan = (id, field, value) => {
    setPageData(prev => ({
      ...prev,
      plans: prev.plans.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const togglePopular = (id) => {
    setPageData(prev => ({
      ...prev,
      plans: prev.plans.map(p => ({ ...p, popular: p.id === id }))
    }));
  };

  const updateFeature = (planId, featIdx, value) => {
    setPageData(prev => ({
      ...prev,
      plans: prev.plans.map(p => {
        if (p.id === planId) {
          const newFeats = [...p.features];
          newFeats[featIdx] = value;
          return { ...p, features: newFeats };
        }
        return p;
      })
    }));
  };

  const addFeature = (planId) => {
    setPageData(prev => ({
      ...prev,
      plans: prev.plans.map(p => p.id === planId ? { ...p, features: [...p.features, "New Feature"] } : p)
    }));
  };

  const deleteFeature = (planId, featIdx) => {
    setPageData(prev => ({
      ...prev,
      plans: prev.plans.map(p => p.id === planId ? { ...p, features: p.features.filter((_, i) => i !== featIdx) } : p)
    }));
  };

  const handleReset = () => {
    if(window.confirm('Reset pricing to default?')) {
      setPageData({ mainHeading: "Service", highlightWord: "Packages_", plans: defaultPlans });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-3 lg:px-6 py-3 flex items-center justify-between shadow-sm gap-2 shrink-0">
        <div className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm lg:text-lg font-black tracking-tighter italic flex items-center gap-1.5">
            <DollarSign size={18} className="text-emerald-600" /> 
            <span className="tracking-tight uppercase text-slate-800">PRICING EDITOR</span> 
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full flex-shrink-1 mx-2">
          {[
            { id: 'edit', icon: Edit3, label: 'Edit' }, 
            { id: 'split', icon: Columns, label: 'Split' }, 
            { id: 'preview', icon: Eye, label: 'Preview' }
          ].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} 
              className={`flex items-center gap-1.5 px-3 lg:px-5 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs font-bold transition-all ${
                viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'
              }`}>
              <mode.icon size={12} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className={`${viewMode === mode.id ? 'inline' : 'hidden sm:inline'}`}>{mode.label}</span>
            </button>
          ))}
        </div>

        <button onClick={() => setIsSaving(true)} className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-full font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-emerald-600 transition-all active:scale-95">
          <Save size={16} /> <span className="hidden md:inline">Publish Pricing</span>
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDE: EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-4xl mx-auto border-x' : 'w-full lg:w-[480px] border-r'} bg-white flex flex-col h-full shrink-0 z-20`}>
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 custom-scrollbar">
              
              {/* Header Editor */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Type size={12}/> Section Header
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input name="mainHeading" value={pageData.mainHeading} onChange={handleHeaderChange} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm outline-none" placeholder="Service" />
                  <input name="highlightWord" value={pageData.highlightWord} onChange={handleHeaderChange} className="w-full px-4 py-2.5 bg-white border border-emerald-100 text-emerald-600 rounded-xl font-bold text-sm outline-none" placeholder="Packages_" />
                </div>
              </div>

              {/* Plans Editor */}
              <div className="space-y-6">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pricing Tiers</h2>
                {pageData.plans.map((plan) => (
                  <div key={plan.id} className={`p-6 border rounded-[2.5rem] transition-all ${plan.popular ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-100 bg-white'}`}>
                    <div className="flex justify-between items-center mb-4">
                      <button onClick={() => togglePopular(plan.id)} className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full transition-all ${plan.popular ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {plan.popular ? '★ Most Popular' : 'Set Popular'}
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <input value={plan.name} onChange={(e) => updatePlan(plan.id, 'name', e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold outline-none" placeholder="Plan Name" />
                        <div className="relative">
                           <span className="absolute left-3 top-2 text-[10px] font-black text-emerald-500 uppercase">AED</span>
                           <input value={plan.price} onChange={(e) => updatePlan(plan.id, 'price', e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-black outline-none" />
                        </div>
                      </div>
                      <input value={plan.desc} onChange={(e) => updatePlan(plan.id, 'desc', e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-500 outline-none" />
                      
                      {/* Features Sub-Editor */}
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <label className="text-[9px] font-black uppercase text-slate-400">Features</label>
                        {plan.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex gap-2 group/feat">
                            <input value={feat} onChange={(e) => updateFeature(plan.id, fIdx, e.target.value)} className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-600 outline-none focus:bg-white" />
                            <button onClick={() => deleteFeature(plan.id, fIdx)} className="p-1 text-rose-300 hover:text-rose-500 opacity-0 group-hover/feat:opacity-100 transition-opacity"><Trash2 size={14}/></button>
                          </div>
                        ))}
                        <button onClick={() => addFeature(plan.id)} className="text-[9px] font-black text-emerald-600 hover:underline flex items-center gap-1 mt-1">
                          <Plus size={10}/> Add Feature
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-amber-600 transition-all">
                <Undo size={14} /> Reset Pricing
              </button>
            </div>
          </div>
        )}

       {/* RIGHT SIDE: PREVIEW - Optimized for Split View */}
{(viewMode === 'preview' || viewMode === 'split') && (
  <div className={`${viewMode === 'preview' ? 'w-full' : 'flex-1'} flex flex-col h-full bg-slate-100/50 transition-all duration-300`}>
    
    <div className="h-12 flex items-center justify-center gap-2 bg-white border-b border-slate-200 shrink-0">
      <Monitor size={14} className="text-slate-400" />
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Output</span>
    </div>

    <div className="flex-1 overflow-y-auto w-full p-4 lg:p-6 custom-scrollbar">
      {/* Container scaling: Split view mein 0.75 scale aur narrow gap use karega */}
      <div className={`w-full max-w-[1200px] mx-auto transition-all duration-500 transform 
        ${viewMode === 'preview' ? 'scale-100 mt-10' : 'scale-[0.72] origin-top -mt-4'}`}>
        
        <div className="text-center mb-10">
          <h2 className={`${viewMode === 'split' ? 'text-3xl' : 'text-5xl'} font-black text-slate-900 uppercase tracking-tighter transition-all`}>
            {pageData.mainHeading} <span className="text-emerald-500 italic">{pageData.highlightWord}</span>
          </h2>
        </div>

        {/* Dynamic Grid: Split mode mein gap kam kar diya */}
        <div className={`grid grid-cols-1 md:grid-cols-3 ${viewMode === 'split' ? 'gap-4' : 'gap-8'} items-center`}>
          {pageData.plans.map((plan) => (
            <div key={plan.id} className={`relative rounded-[2.5rem] transition-all duration-500 
              ${viewMode === 'split' ? 'p-6' : 'p-8'} 
              ${plan.popular ? 'bg-slate-950 text-white shadow-2xl scale-105 z-10' : 'bg-white text-slate-900 border border-slate-200'}`}>
              
              {plan.popular && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white rounded-full font-black uppercase tracking-widest flex items-center gap-2 shadow-xl whitespace-nowrap
                  ${viewMode === 'split' ? 'px-3 py-1 text-[8px]' : 'px-5 py-1.5 text-[10px]'}`}>
                  <Star size={viewMode === 'split' ? 10 : 12} className="fill-white" /> Most Popular
                </div>
              )}

              <h3 className={`${viewMode === 'split' ? 'text-lg' : 'text-2xl'} font-black uppercase mb-1`}>{plan.name}</h3>
              <p className={`font-medium mb-4 leading-tight ${viewMode === 'split' ? 'text-[9px]' : 'text-[11px]'} ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                {plan.desc}
              </p>
              
              <div className="mb-6 flex items-baseline gap-1">
                <span className={`${viewMode === 'split' ? 'text-2xl' : 'text-4xl'} font-black text-emerald-500`}>AED</span>
                <span className={`${viewMode === 'split' ? 'text-3xl' : 'text-5xl'} font-black`}>{plan.price}</span>
              </div>

              <ul className={`${viewMode === 'split' ? 'space-y-2' : 'space-y-4'} mb-8`}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={viewMode === 'split' ? 14 : 16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className={`font-bold uppercase leading-tight opacity-90 ${viewMode === 'split' ? 'text-[8px]' : 'text-[10px]'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full rounded-2xl font-black uppercase tracking-widest transition-all
                ${viewMode === 'split' ? 'py-3 text-[8px]' : 'py-4 text-[10px]'}
                ${plan.popular ? 'bg-emerald-500 text-white' : 'bg-slate-950 text-white'}`}>
                Select Plan
              </button>
            </div>
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

export default TechnicalPricingEditor;