import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent, fetchPageSections } from '../../redux/slices/adminSlice';
import { 
  ArrowLeft, Save, Settings2, Edit3, Columns, Eye, Plus, Trash2, 
  DollarSign, Loader2, Star, CheckCircle2, Monitor, Undo, Type
} from 'lucide-react';

const TechnicalPricingEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const sidebarTree = useSelector((state) => state.adminData?.sidebarTree || []);
  const sections = useSelector((state) => state.adminData?.pageSections || []);
  const reduxContent = useSelector((state) => state.adminData?.activeSubsection);
  const status = useSelector((state) => state.adminData?.status || '');

  // Dynamic ID resolution
  const techSectionInfo = sidebarTree.find(sec => sec.slug === 'technical');
  const sectionId = techSectionInfo?.id || 4;

  const currentSection = sections.find(s => s.slug === 'tech-pricing');
  const subsectionId = id || currentSection?.id || 26;

  const [viewMode, setViewMode] = useState('split'); 
  const [isSaving, setIsSaving] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const defaultPlans = [
    { id: 1, name: "Basic Fix", currency: "AED", price: "199", desc: "One-time technical visit for minor repairs.", buttonText: "Select Plan", features: ["1 Hour Service", "Basic Tools Required", "No Materials Included", "Standard Response (24h)"], popular: false },
    { id: 2, name: "Pro AMC", currency: "AED", price: "899", desc: "Annual maintenance for complete peace of mind.", buttonText: "Select Plan", features: ["Unlimited Emergency Visits", "Priority Response (45m)", "Free Consumables", "Quarterly Deep Checks"], popular: true },
    { id: 3, name: "Premium Villa", currency: "AED", price: "2499", desc: "Dedicated technical team for large properties.", buttonText: "Contact Us", features: ["24/7 Standby Squad", "Full Parts Coverage", "Smart Home Support", "Dedicated Manager"], popular: false }
  ];

  const [pageData, setPageData] = useState({
    mainHeading: "Service",
    highlightWord: "Packages_",
    plans: defaultPlans
  });

  useEffect(() => {
    if (sections.length === 0) {
      dispatch(fetchPageSections(sectionId));
    }
  }, [dispatch, sections.length, sectionId]);

  useEffect(() => {
    if (subsectionId) {
      dispatch(fetchSingleSubsectionContent(subsectionId));
    }
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (reduxContent && Object.keys(reduxContent).length > 0 && !hasLoaded) {
      if (reduxContent.id == subsectionId || reduxContent.subsectionId == subsectionId) {
        let fetchedPlans = defaultPlans;
        
        if (reduxContent.listItems && reduxContent.listItems.length > 0) {
          fetchedPlans = reduxContent.listItems.map((item, i) => {
            let featuresList = [];
            try {
              featuresList = JSON.parse(item.itemFeatures);
            } catch (e) {
              featuresList = item.itemFeatures ? item.itemFeatures.split(',').map(f => f.trim()) : [];
            }

            return {
              id: item.id || Date.now() + i,
              dbId: item.id,
              name: item.itemTitle ?? '',
              currency: item.itemIcon ?? 'AED', 
              price: item.itemSubtitle ?? '0', 
              desc: item.itemDescription ?? '',
              buttonText: item.itemUrl ?? 'Select Plan', 
              features: Array.isArray(featuresList) ? featuresList : [],
              popular: item.isPopular || false
            };
          });
        }

        setPageData({
          mainHeading: reduxContent.titleLine1 ?? "Service",
          highlightWord: reduxContent.titleHighlight ?? "Packages_",
          plans: fetchedPlans
        });
        setHasLoaded(true);
      }
    }
  }, [reduxContent, subsectionId, hasLoaded]);

  // handlers
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
    if(window.confirm('Reset pricing to saved values?')) {
      if (reduxContent) {
        let fetchedPlans = defaultPlans;
        if (reduxContent.listItems && reduxContent.listItems.length > 0) {
          fetchedPlans = reduxContent.listItems.map((item, i) => {
            let featuresList = [];
            try {
              featuresList = JSON.parse(item.itemFeatures);
            } catch (e) {
              featuresList = item.itemFeatures ? item.itemFeatures.split(',').map(f => f.trim()) : [];
            }
            return {
              id: item.id || Date.now() + i,
              dbId: item.id,
              name: item.itemTitle ?? '',
              currency: item.itemIcon ?? 'AED',
              price: item.itemSubtitle ?? '0', 
              desc: item.itemDescription ?? '',
              buttonText: item.itemUrl ?? 'Select Plan',
              features: Array.isArray(featuresList) ? featuresList : [],
              popular: item.isPopular || false
            };
          });
        }
        setPageData({
          mainHeading: reduxContent.titleLine1 ?? "Service",
          highlightWord: reduxContent.titleHighlight ?? "Packages_",
          plans: fetchedPlans
        });
      } else {
        setPageData({ mainHeading: "Service", highlightWord: "Packages_", plans: defaultPlans });
      }
    }
  };

  const handleSave = async () => {
    if (!subsectionId) return alert("Error: Missing Subsection ID.");

    setIsSaving(true);
    try {
      const listItemsPayload = pageData.plans.map((plan, index) => ({
        id: plan.dbId || undefined,
        itemTitle: plan.name,
        itemSubtitle: plan.price,
        itemIcon: plan.currency, 
        itemUrl: plan.buttonText,
        itemDescription: plan.desc,
        itemFeatures: JSON.stringify(plan.features),
        isPopular: plan.popular,
        itemOrder: index + 1
      }));

      const payload = {
        titleLine1: pageData.mainHeading,
        titleHighlight: pageData.highlightWord,
        listItems: listItemsPayload
      };

      await dispatch(updateSingleSubsectionContent({
        subsectionId: subsectionId,
        updateData: payload
      })).unwrap();

      await dispatch(fetchSingleSubsectionContent(subsectionId)).unwrap();
      navigate('/admin/pages/technical');

      alert("Pricing Plans Deployed Successfully! 🚀");
    } catch (error) {
      console.error(error);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const safeText = (text) => text === '' ? '\u00A0' : text;

  if (status.includes('loading') && !hasLoaded) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest text-xs bg-[#F8FAFC]">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING PRICING LAB...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] font-sans h-screen overflow-hidden selection:bg-emerald-100">
      
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-3 lg:px-6 py-3 flex items-center justify-between shadow-sm gap-2 shrink-0">
        <div className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm lg:text-lg font-black tracking-tighter italic flex items-center gap-1.5">
            <DollarSign size={18} className="text-emerald-600" /> 
            <span className="tracking-tight uppercase text-slate-800">PRICING LAB</span> 
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100 flex-shrink-1 mx-2">
          {[
            { id: 'edit', icon: Edit3, label: 'Edit' }, 
            { id: 'split', icon: Columns, label: 'Split' }, 
            { id: 'preview', icon: Eye, label: 'Preview' }
          ].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} 
              className={`flex items-center gap-1.5 px-3 lg:px-5 py-1.5 lg:py-2 rounded-lg text-[10px] lg:text-xs font-bold transition-all uppercase tracking-widest ${
                viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'
              }`}>
              <mode.icon size={12} className="lg:w-[14px] lg:h-[14px]" /> 
              <span className={`${viewMode === mode.id ? 'inline' : 'hidden sm:inline'}`}>{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-slate-900 text-white p-2.5 lg:px-6 lg:py-2.5 rounded-xl font-extrabold text-[10px] lg:text-xs flex items-center gap-2 shadow-lg hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-70"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin lg:w-[14px] lg:h-[14px]" /> : <Save size={16} className="lg:w-[14px] lg:h-[14px]" />}
          <span className="hidden md:inline uppercase tracking-widest">{isSaving ? 'DEPLOYING...' : 'DEPLOY PRICING'}</span>
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDE: EDITOR */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'edit' ? 'w-full max-w-4xl mx-auto border-x' : 'w-full lg:w-[480px] border-r'} bg-white flex flex-col h-full shrink-0 z-20 shadow-2xl shadow-slate-200/50`}>
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 custom-scrollbar">
              
              <div className="space-y-4 bg-slate-50/50 p-5 rounded-[2rem] border border-slate-100 shadow-inner">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Type size={12}/> Section Header
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 ml-1">Main Text</label>
                    <input name="mainHeading" value={pageData.mainHeading} onChange={handleHeaderChange} className="w-full px-4 py-2.5 bg-white border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-emerald-500 shadow-sm transition-all" placeholder="Service" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 ml-1">Highlight</label>
                    <input name="highlightWord" value={pageData.highlightWord} onChange={handleHeaderChange} className="w-full px-4 py-2.5 bg-emerald-50/50 border border-emerald-100 text-emerald-600 rounded-xl font-bold text-sm outline-none focus:border-emerald-500 shadow-sm transition-all" placeholder="Packages_" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pricing Tiers</h2>
                {pageData.plans.map((plan) => (
                  <div key={plan.id} className={`p-6 border rounded-[2.5rem] transition-all ${plan.popular ? 'border-emerald-500 bg-emerald-50/30 shadow-md shadow-emerald-500/10' : 'border-slate-100 bg-white shadow-sm'}`}>
                    <div className="flex justify-between items-center mb-4">
                      <button onClick={() => togglePopular(plan.id)} className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full transition-all ${plan.popular ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>
                        {plan.popular ? '★ Most Popular' : 'Set Popular'}
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <label className="text-[9px] font-bold text-slate-400 ml-1 mb-[-8px]">Plan Name</label>
                        <input value={plan.name} onChange={(e) => updatePlan(plan.id, 'name', e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-100 rounded-xl text-sm font-bold outline-none focus:border-emerald-500 shadow-sm" placeholder="Plan Name" />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-1">
                           <label className="text-[9px] font-bold text-slate-400 ml-1 mb-[-8px]">Currency</label>
                           <input value={plan.currency} onChange={(e) => updatePlan(plan.id, 'currency', e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold text-emerald-600 uppercase outline-none focus:border-emerald-500 shadow-sm" placeholder="AED" />
                        </div>
                        <div className="col-span-2">
                           <label className="text-[9px] font-bold text-slate-400 ml-1 mb-[-8px]">Price</label>
                           <input value={plan.price} onChange={(e) => updatePlan(plan.id, 'price', e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-100 rounded-xl text-sm font-black outline-none focus:border-emerald-500 shadow-sm" placeholder="Price" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 ml-1">Description</label>
                        <input value={plan.desc} onChange={(e) => updatePlan(plan.id, 'desc', e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-medium text-slate-500 outline-none focus:border-emerald-500 shadow-sm" placeholder="Description" />
                      </div>
                      
                      <div className="pt-2 border-t border-slate-100">
                        <label className="text-[9px] font-black uppercase text-slate-400 mb-2 block">Action Button</label>
                        <input value={plan.buttonText} onChange={(e) => updatePlan(plan.id, 'buttonText', e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 outline-none focus:bg-white focus:border-emerald-500" placeholder="Button Text (e.g. Select Plan)" />
                      </div>
                      
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <label className="text-[9px] font-black uppercase text-slate-400">Features</label>
                        {plan.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex gap-2 group/feat">
                            <input value={feat} onChange={(e) => updateFeature(plan.id, fIdx, e.target.value)} className="flex-1 px-3 py-1.5 bg-white border border-slate-100 rounded-lg text-[10px] font-bold text-slate-600 outline-none focus:border-emerald-500 shadow-sm" />
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
              <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-widest font-black text-slate-400 hover:text-amber-600 transition-all">
                <Undo size={12} /> Reset Pricing
              </button>
            </div>
          </div>
        )}

        {/* RIGHT SIDE: PREVIEW */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'preview' ? 'w-full' : 'flex-1'} flex flex-col h-full bg-[#f1f5f9] transition-all duration-300 relative`}>
            
            <div className="h-12 flex items-center justify-center gap-2 bg-white border-b border-slate-200 shadow-sm shrink-0 z-10">
              <Monitor size={14} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Desktop Preview</span>
            </div>

            <div className="flex-1 overflow-y-auto w-full p-4 lg:p-6 custom-scrollbar flex flex-col items-center">
              <div 
                className="transition-all duration-500 origin-top"
                style={{
                  transform: viewMode === 'split' ? 'scale(0.85)' : 'scale(1)',
                  width: viewMode === 'split' ? '115%' : '100%',
                  maxWidth: '1400px'
                }}
              >
                
                {/* BLACK BROWSER BAR */}
                <div className="w-full bg-slate-900 rounded-[2.5rem] border-[10px] border-slate-900 shadow-2xl overflow-hidden relative mt-6">
                  
                  <div className="h-10 bg-slate-800 flex items-center px-6 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                    </div>
                    <div className="mx-auto w-64 h-5 bg-slate-700 rounded-md text-[9px] text-slate-500 flex items-center justify-center font-bold uppercase tracking-widest">
                      tricksy-tech.io/pricing
                    </div>
                  </div>

                  <div className="relative overflow-y-auto h-[80vh] bg-[#f1f5f9] custom-scrollbar p-8 lg:p-12 flex flex-col">

                    {/* LIVE PREVIEW COMPONENT */}
                    <div className="w-full max-w-[1200px] mx-auto transition-all duration-500">
                      
                      <div className="text-center mb-10">
                        <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter transition-all">
                          {safeText(pageData.mainHeading)} <span className="text-emerald-500 italic">{safeText(pageData.highlightWord)}</span>
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        {pageData.plans.map((plan) => (
                          <div key={plan.id} className={`relative rounded-[2.5rem] transition-all duration-500 p-8
                            ${plan.popular ? 'bg-slate-950 text-white shadow-2xl scale-105 z-10' : 'bg-white text-slate-900 border border-slate-200'}`}>
                            
                            {plan.popular && (
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white rounded-full font-black uppercase tracking-widest flex items-center gap-2 shadow-xl whitespace-nowrap px-5 py-1.5 text-[10px]">
                                <Star size={12} className="fill-white" /> Most Popular
                              </div>
                            )}

                            <h3 className="text-2xl font-black uppercase mb-1">{safeText(plan.name)}</h3>
                            <p className={`font-medium mb-4 leading-tight text-[11px] ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                              {safeText(plan.desc)}
                            </p>
                            
                            <div className="mb-6 flex items-baseline gap-1">
                              <span className="text-3xl font-black text-emerald-500">{safeText(plan.currency)}</span>
                              <span className="text-5xl font-black">{safeText(plan.price)}</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                              {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                  <span className="font-bold uppercase leading-tight opacity-90 text-[10px]">
                                    {safeText(feature)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            
                            <button className={`w-full rounded-2xl font-black uppercase tracking-widest transition-all py-4 text-[10px]
                              ${plan.popular ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'bg-slate-950 text-white hover:bg-slate-800'}`}>
                              {safeText(plan.buttonText)}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default TechnicalPricingEditor;