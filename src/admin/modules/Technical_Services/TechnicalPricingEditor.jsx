import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, CheckCircle2, Star, Plus, Trash2, 
  DollarSign, Zap, LayoutGrid, ShieldCheck 
} from 'lucide-react';

const TechnicalPricingEditor = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [plans, setPlans] = useState([
    { name: "Basic Fix", price: "199", desc: "One-time technical visit for minor repairs.", features: ["1 Hour Service", "Basic Tools Required", "No Materials Included", "Standard Response (24h)"], popular: false },
    { name: "Pro AMC", price: "899", desc: "Annual maintenance for complete peace of mind.", features: ["Unlimited Emergency Visits", "Priority Response (45m)", "Free Consumables", "Quarterly Deep Checks"], popular: true },
    { name: "Premium Villa", price: "2499", desc: "Dedicated technical team for large properties.", features: ["24/7 Standby Squad", "Full Parts Coverage", "Smart Home Support", "Dedicated Manager"], popular: false }
  ]);

  const updatePlan = (index, field, value) => {
    const updated = [...plans];
    updated[index][field] = value;
    setPlans(updated);
  };

  const togglePopular = (index) => {
    const updated = plans.map((plan, i) => ({
      ...plan,
      popular: i === index
    }));
    setPlans(updated);
  };

  const updateFeature = (planIdx, featIdx, value) => {
    const updated = [...plans];
    updated[planIdx].features[featIdx] = value;
    setPlans(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    alert("Pricing Tiers Updated Live!");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col h-screen overflow-hidden text-slate-900 font-sans">
      <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-xl transition-all text-slate-400">
            <ArrowLeft size={20} />
          </button>
          <div className="h-6 w-[1px] bg-slate-200"></div>
          <h1 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <DollarSign size={18} className="text-emerald-500" /> Revenue & Plans
          </h1>
        </div>
        <button onClick={handleSave} disabled={isSaving} className="bg-zinc-950 text-white px-8 py-2.5 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg active:scale-95">
          <Save size={14} /> {isSaving ? 'SYNCING...' : 'PUBLISH PRICING'}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[480px] border-r border-slate-200 bg-white overflow-y-auto p-8 space-y-8 custom-scrollbar">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Package Config</h2>
            <Zap size={16} className="text-amber-400" />
          </div>

          {plans.map((plan, pIdx) => (
            <div key={pIdx} className={`p-6 border rounded-[2.5rem] transition-all ${plan.popular ? 'border-emerald-500 bg-emerald-50/20 ring-4 ring-emerald-50' : 'border-slate-100 bg-slate-50/50'}`}>
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => togglePopular(pIdx)} className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${plan.popular ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-slate-400 border-slate-200'}`}>
                  {plan.popular ? 'Active Popular' : 'Set as Popular'}
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Tier Name</label>
                    <input value={plan.name} onChange={(e) => updatePlan(pIdx, 'name', e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-100 rounded-xl text-sm font-bold outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Price (AED)</label>
                    <input value={plan.price} onChange={(e) => updatePlan(pIdx, 'price', e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-100 rounded-xl text-sm font-black outline-none focus:border-emerald-500 text-emerald-600" />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Short Description</label>
                  <input value={plan.desc} onChange={(e) => updatePlan(pIdx, 'desc', e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-medium text-slate-500 outline-none focus:border-emerald-500" />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">Key Features</label>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex gap-2">
                      <input value={feat} onChange={(e) => updateFeature(pIdx, fIdx, e.target.value)} className="flex-1 px-3 py-1.5 bg-white/50 border border-slate-100 rounded-lg text-[11px] font-bold text-slate-600 outline-none" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 bg-slate-50 p-12 overflow-y-auto flex items-center justify-center relative">
          <div className="w-full max-w-[1100px] scale-90 origin-center">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">
                Service <span className="text-emerald-500 italic">Packages_</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {plans.map((plan, i) => (
                <div key={i} className={`relative p-8 rounded-[3rem] transition-all duration-500 ${plan.popular ? 'bg-slate-950 text-white shadow-2xl scale-110 z-10 border border-emerald-500/30' : 'bg-white text-slate-900 border border-slate-200 shadow-sm opacity-80'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl animate-pulse">
                      <Star size={12} className="fill-white" /> Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{plan.name}</h3>
                  <p className={`text-xs mb-6 font-medium ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>{plan.desc}</p>
                  <div className="mb-8 flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tighter text-emerald-500">AED</span>
                    <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ml-2 ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>/ starting</span>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="font-bold text-[11px] leading-tight opacity-90 tracking-wide uppercase">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-lg ${plan.popular ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-slate-950 text-white'}`}>
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalPricingEditor;