import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSections } from '../../../store/index'; 
import { 
    ArrowLeft, Layout, ListChecks, CreditCard, MessageCircleQuestion, 
    PlayCircle, ArrowRight, CheckCircle2, Loader2, X, Columns, Eye, Edit3
} from 'lucide-react';

import ServiceHeroEditor from './ServiceHeroEditor';
import ServiceIncludesEditor from './ServiceIncludesEditor';
import ServiceProcessEditor from './ServiceProcessEditor';
import ServicePricingEditor from './ServicePricingEditor';
import ServiceFaqEditor from './ServiceFaqEditor';

const steps = [
    { id: 'hero', name: 'Hero', icon: Layout },
    { id: 'includes', name: 'Includes', icon: ListChecks },
    { id: 'process', name: 'Process', icon: PlayCircle },
    { id: 'pricing', name: 'Pricing', icon: CreditCard },
    { id: 'faq', name: 'FAQ', icon: MessageCircleQuestion },
];

const ServiceWizard = () => {
    const { serviceId } = useParams(); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const editorRef = useRef();

    const [currentStep, setCurrentStep] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [viewMode, setViewMode] = useState('split'); // 🔴 Added ViewMode to Wizard level

    const sections = useSelector((state) => state.sections.items);
    
    useEffect(() => { dispatch(fetchSections(3)); }, [dispatch]);

    const currentService = sections.find(s => s.slug === serviceId);
    const numericId = currentService?.id; 

    const isLastStep = currentStep === (steps.length - 1);
    const activeModule = steps[currentStep];

    const handleNext = async () => {
        setIsSaving(true);
        if (editorRef.current && editorRef.current.handleAutoSave) {
            const success = await editorRef.current.handleAutoSave();
            if (!success) {
                alert("Auto-save failed. Please check inputs.");
                setIsSaving(false);
                return;
            }
        }

        if (isLastStep) {
            navigate('/admin/pages/services'); 
        } else {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }
        setIsSaving(false);
    };

    const handlePrevious = () => {
        if (currentStep === 0) navigate('/admin/pages/services'); 
        else setCurrentStep(prev => prev - 1);
    };

    const renderActiveEditor = () => {
        if (!numericId) return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-400">
                <Loader2 className="animate-spin text-emerald-500" size={40}/>
                <p className="font-black text-[10px] uppercase tracking-[0.2em] animate-pulse">Building Lab Environment...</p>
            </div>
        );
        // 🔴 Common Props passed to all editors including viewMode
        const commonProps = { numericId, ref: editorRef, viewMode }; 
        
        switch (activeModule.id) {
            case 'hero': return <ServiceHeroEditor {...commonProps} />;
            case 'includes': return <ServiceIncludesEditor {...commonProps} />;
            case 'process': return <ServiceProcessEditor {...commonProps} />;
            case 'pricing': return <ServicePricingEditor {...commonProps} />;
            case 'faq': return <ServiceFaqEditor {...commonProps} />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col relative pb-28 overflow-hidden">
            
            {/* STICKY HEADER */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-[110] px-6 py-4">
                <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-4">
                    
                    <div className="flex items-center gap-5 shrink-0">
                        <button onClick={() => navigate('/admin/pages/services')} className="p-2.5 bg-slate-50 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-500 transition-all group border border-slate-100">
                            <X size={18} className="group-hover:rotate-90 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-sm font-black text-slate-900 uppercase italic leading-none tracking-tight">Studio <span className="text-emerald-500">Service</span></h1>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ref: {serviceId?.replace('srv-', '')}</p>
                        </div>
                    </div>

                    {/* Progress Tabs */}
                    <div className="hidden xl:flex items-center gap-1 bg-slate-100 p-1 rounded-[1.5rem] border border-slate-200/50">
                        {steps.map((step, index) => (
                            <button 
                                key={step.id}
                                onClick={() => index <= currentStep && setCurrentStep(index)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-[1.1rem] transition-all ${index === currentStep ? 'bg-white shadow-lg shadow-slate-200 text-emerald-600 scale-105' : index < currentStep ? 'text-slate-900' : 'text-slate-400'}`}
                            >
                                <step.icon size={14} />
                                <span className="text-[10px] font-black uppercase tracking-tight">{step.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* 🔴 Global View Switcher (Solves sidebar clash) */}
                    <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/50">
                        {[ {id: 'edit', i: Edit3}, {id: 'split', i: Columns}, {id: 'preview', i: Eye} ].map(m => (
                            <button key={m.id} onClick={() => setViewMode(m.id)} className={`p-2.5 rounded-xl transition-all ${viewMode === m.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
                                <m.i size={16} />
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* MAIN EDITOR AREA */}
            <main className="flex-1 w-full max-w-[1800px] mx-auto p-4 md:p-6 flex flex-col min-h-0 overflow-hidden">
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/40 flex flex-col flex-1 relative overflow-hidden transition-all duration-500">
                    {renderActiveEditor()}
                </div>
            </main>

            {/* BOTTOM BAR: CONTROLS */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-5 z-[1000] shadow-[0_-15px_40px_rgba(0,0,0,0.04)]">
                <div className="max-w-[1800px] mx-auto flex items-center justify-between px-4 lg:px-8">
                    
                    <div className="hidden md:flex items-center gap-3">
                         <div className="w-10 h-1 bg-emerald-500 rounded-full" />
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step {currentStep + 1} of 5</span>
                    </div>

                    <div className="flex items-center gap-3 ml-auto w-full md:w-auto">
                        <button 
                            onClick={handlePrevious} 
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-100 text-slate-500 font-black text-[11px] uppercase tracking-widest hover:bg-slate-200 hover:text-slate-900 transition-all active:scale-95"
                        >
                            <ArrowLeft size={16} strokeWidth={3}/> <span>Back</span>
                        </button>

                        <button 
                            onClick={handleNext} 
                            disabled={isSaving} 
                            className={`flex-[2] md:flex-none flex items-center justify-center gap-3 px-12 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] text-white shadow-2xl transition-all active:scale-95 ${isLastStep ? 'bg-slate-900 shadow-slate-300' : 'bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700'}`}
                        >
                            {isSaving ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <>
                                    <span>{isLastStep ? "Complete & Done" : "Save & Continue"}</span>
                                    {isLastStep ? <CheckCircle2 size={16} strokeWidth={3} /> : <ArrowRight size={16} strokeWidth={3} />}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ServiceWizard;