import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Layout, ListChecks, CreditCard,
    MessageCircleQuestion, PlayCircle, ArrowRight, 
    Save, SkipForward, CheckCircle2
} from 'lucide-react';

import { servicesData as initialData } from '../../../data/servicesData';


import ServiceHeroEditor from './ServiceHeroEditor';
import ServiceIncludesEditor from './ServiceIncludesEditor';
import ServiceProcessEditor from './ServiceProcessEditor';
import ServicePricingEditor from './ServicePricingEditor';
import ServiceFaqEditor from './ServiceFaqEditor';

const steps = [
    { id: 'hero', name: 'Hero Banner', icon: Layout },
    { id: 'includes', name: 'What\'s Included', icon: ListChecks },
    { id: 'process', name: 'How It Works', icon: PlayCircle },
    { id: 'pricing', name: 'Pricing Plans', icon: CreditCard },
    { id: 'faq', name: 'Frequently Asked', icon: MessageCircleQuestion },
];

const ServiceWizard = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    
    const [currentStep, setCurrentStep] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    
    const [fullServiceData, setFullServiceData] = useState(null);

    const displayName = serviceId ? serviceId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Service';
    const isLastStep = currentStep === (steps.length - 1);
    const activeModule = steps[currentStep];

    const ActiveModuleIcon = activeModule.icon;

    useEffect(() => {
        if (serviceId) {
            const data = initialData[serviceId] || {};
            
            setFullServiceData({
                ...data,
                includes: data.includes ? data.includes.map(inc => ({ ...inc })) : [],
                process: data.process ? data.process.map(p => ({ ...p })) : [],
                faqs: data.faqs ? data.faqs.map(f => ({ ...f })) : [],
                pricing: data.pricing ? data.pricing.map(p => ({ 
                    ...p, 
                    features: p.features ? [...p.features] : [] 
                })) : []
            });
        }
    }, [serviceId]);

    const handleNext = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 800)); 
        setIsSaving(false);

        if (isLastStep) {
            alert("All changes saved successfully!");
            navigate('/admin/pages/services'); 
        } else {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSkip = () => {
        if (isLastStep) {
            navigate('/admin/pages/services'); 
        } else {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const renderActiveEditor = () => {
        if (!fullServiceData) {
            return (
                <div className="p-10 text-center font-black animate-pulse text-slate-400 uppercase tracking-widest text-xs flex-1 flex items-center justify-center">
                    Loading Editor Data...
                </div>
            );
        }

        switch (activeModule.id) {
            case 'hero':
                return <ServiceHeroEditor fullServiceData={fullServiceData} setFullServiceData={setFullServiceData} />;
            case 'includes':
                return <ServiceIncludesEditor fullServiceData={fullServiceData} setFullServiceData={setFullServiceData} />;
            case 'process':
                return <ServiceProcessEditor fullServiceData={fullServiceData} setFullServiceData={setFullServiceData} />;
            case 'pricing':
                return <ServicePricingEditor fullServiceData={fullServiceData} setFullServiceData={setFullServiceData} />;
            case 'faq':
                return <ServiceFaqEditor fullServiceData={fullServiceData} setFullServiceData={setFullServiceData} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col relative pb-24 overflow-x-hidden">
            
            {/* TOP NAVBAR  */}
            <div className="sticky top-0 z-[100] bg-white/95 backdrop-blur-md border-b border-slate-200 pt-4 pb-0 shadow-sm">
                <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <button onClick={() => navigate('/admin/pages/services')} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-900 transition-all uppercase text-[10px] tracking-widest">
                            <ArrowLeft size={16} /> Exit Editor
                        </button>
                        <h1 className="text-lg lg:text-xl font-black text-slate-900 tracking-tighter">
                            Editing: <span className="text-emerald-600">{displayName}</span>
                        </h1>
                        <div className="w-[100px]"></div>
                    </div>

                    {/* Progress  */}
                    <div className="flex items-center justify-between relative pb-4 overflow-x-auto no-scrollbar">
                        <div className="absolute left-0 top-3 w-full h-[2px] bg-slate-100 -z-10"></div>
                        {steps.map((step, index) => {
                            const isActive = index === currentStep;
                            const isCompleted = index < currentStep;
                            
                            return (
                                <div key={step.id} className="flex flex-col items-center gap-2 relative z-10 w-32 shrink-0 cursor-pointer" onClick={() => setCurrentStep(index)}>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        isActive ? 'bg-emerald-600 text-white ring-4 ring-emerald-50 shadow-md' : 
                                        isCompleted ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-400'
                                    }`}>
                                        {isCompleted ? (
                                            <CheckCircle2 size={12} strokeWidth={3} />
                                        ) : (
                                            <span className="text-[10px] font-black">{index + 1}</span>
                                        )}
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest text-center transition-colors ${isActive ? 'text-emerald-600' : isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                                        {step.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* MAIN EDITOR CONTENT */}
            <div className="flex-1 w-full max-w-[1800px] mx-auto p-4 lg:p-6 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col">
                
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 lg:p-8 min-h-[500px] overflow-hidden flex flex-col flex-1 relative">
                    
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100 shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                            <ActiveModuleIcon size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{activeModule.name}</h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Step {currentStep + 1} of {steps.length}</p>
                        </div>
                    </div>

                    {/* DYNAMIC COMPONENT LOADS HERE */}
                    <div className="flex-1 relative flex flex-col">
                        {renderActiveEditor()}
                    </div>

                </div>
            </div>

            {/* BOTTOM FLOATING ACTION BAR */}
            <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-[999]">
                <div className="max-w-[1800px] mx-auto flex items-center justify-between px-4 lg:px-8">
                    
                    <button 
                        onClick={handleSkip}
                        className="flex items-center ml-70 gap-2 px-6 py-3 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 font-bold text-xs uppercase tracking-widest transition-all"
                    >
                        Skip <SkipForward size={14} />
                    </button>

                    <button 
                        onClick={handleNext}
                        disabled={isSaving}
                        className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest text-white shadow-lg transition-all active:scale-95 ${
                            isLastStep ? 'bg-slate-900 hover:bg-black shadow-slate-900/30' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30'
                        } disabled:opacity-70 disabled:pointer-events-none`}
                    >
                        {isSaving ? (
                            <span className="flex items-center gap-2">
                                <Save size={16} className="animate-pulse" /> Saving...
                            </span>
                        ) : isLastStep ? (
                            <span className="flex items-center gap-2">
                                <CheckCircle2 size={16} /> Complete & Done
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Save size={16} /> Save & Next <ArrowRight size={16} />
                            </span>
                        )}
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ServiceWizard;