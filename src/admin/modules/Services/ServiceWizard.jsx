import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPageSections } from '../../redux/slices/adminSlice'; 
import { 
  ArrowLeft, Layout, ListChecks, CreditCard, MessageCircleQuestion, 
  PlayCircle, ArrowRight, Loader2, X 
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
    const { serviceId, id } = useParams(); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const editorRef = useRef();

    const [currentStep, setCurrentStep] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    const sidebarTree = useSelector((state) => state.adminData?.sidebarTree || []);
    const sections = useSelector((state) => state.adminData?.pageSections || []);
    
    // Dynamically find the section ID for Services
    const serviceSectionInfo = sidebarTree.find(sec => sec.slug === 'services');
    const dynamicSectionId = serviceSectionInfo?.id || 3;

    useEffect(() => { 
        if (dynamicSectionId) {
            dispatch(fetchPageSections(dynamicSectionId)); 
        }
    }, [dispatch, dynamicSectionId]);

    // Finding the specific service we are editing
    const currentService = sections.find(s => s.slug === serviceId || s.id == id);
    const numericId = id || currentService?.id; 

    const isLastStep = currentStep === (steps.length - 1);
    const activeModule = steps[currentStep];

    const handleNext = async () => {
        setIsSaving(true);
        if (editorRef.current && editorRef.current.handleAutoSave) {
            await editorRef.current.handleAutoSave();
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
                <p className="font-black text-[10px] uppercase tracking-[0.2em] animate-pulse">Initializing Lab Environment...</p>
            </div>
        );

        const commonProps = { numericId, ref: editorRef }; 
        
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
        <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col relative pb-28 overflow-hidden selection:bg-emerald-100">
            
            {/* TOP HEADER */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-[110] px-6 py-4 shadow-sm">
                <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-5 shrink-0">
                        <button onClick={() => navigate('/admin/pages/services')} className="p-2.5 bg-slate-50 hover:bg-rose-50 rounded-xl text-slate-400 border border-slate-100 transition-colors">
                            <X size={18} />
                        </button>
                        <div>
                            <h1 className="text-sm font-black text-slate-900 uppercase italic leading-none tracking-tight">Studio <span className="text-emerald-500">Service</span></h1>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ref ID: {numericId || '...'}</p>
                        </div>
                    </div>

                    <div className="hidden xl:flex items-center gap-1 bg-slate-100 p-1 rounded-[1.5rem] border border-slate-200/50 shadow-inner">
                        {steps.map((step, index) => (
                            <button 
                                key={step.id} 
                                onClick={() => index <= currentStep && setCurrentStep(index)} 
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-[1.1rem] transition-all ${
                                    index === currentStep 
                                    ? 'bg-white shadow-md text-emerald-600 scale-105' 
                                    : index < currentStep 
                                        ? 'text-slate-600 hover:text-emerald-500 hover:bg-slate-50' 
                                        : 'text-slate-400 cursor-not-allowed opacity-50'
                                }`}
                            >
                                <step.icon size={14} />
                                <span className="text-[10px] font-black uppercase tracking-tight">{step.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* DYNAMIC EDITOR AREA */}
            <main className="flex-1 w-full max-w-[1800px] mx-auto p-4 md:p-6 flex flex-col min-h-0 overflow-hidden">
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl flex flex-col flex-1 relative overflow-hidden">
                    {renderActiveEditor()}
                </div>
            </main>

            {/* BOTTOM NAVIGATION FOOTER */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-5 z-[1000] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                <div className="max-w-[1800px] mx-auto flex items-center justify-between px-4 lg:px-8">
                    
                    <div className="hidden md:flex items-center gap-3">
                         <div className="flex gap-1.5">
                             {steps.map((_, idx) => (
                                 <div key={idx} className={`w-8 h-1.5 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                             ))}
                         </div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic ml-2">Phase {currentStep + 1} of {steps.length}</span>
                    </div>

                    <div className="flex items-center gap-3 ml-auto w-full md:w-auto justify-between md:justify-end">
                        <button onClick={handlePrevious} className="px-6 md:px-8 py-3.5 rounded-2xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all">
                            <ArrowLeft size={16} />
                        </button>
                        <button onClick={handleNext} disabled={isSaving} className={`px-8 md:px-12 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] text-white shadow-2xl transition-all active:scale-95 flex items-center gap-2 ${
                            isLastStep ? 'bg-slate-900 shadow-slate-400/50 hover:bg-black' : 'bg-emerald-600 shadow-emerald-500/30 hover:bg-emerald-500'
                        }`}>
                            {isSaving ? <Loader2 size={16} className="animate-spin" /> : (<span>{isLastStep ? "Complete & Publish" : "Save & Continue"}</span>)}
                            {!isSaving && !isLastStep && <ArrowRight size={16} />}
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ServiceWizard;