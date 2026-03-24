import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Layout, ListChecks, CreditCard,
    MessageCircleQuestion, PlayCircle, Settings2, ArrowRight
} from 'lucide-react';

const modules = [
    { id: 'hero', name: 'Hero Banner', desc: 'Main title, subtitle and background image.', icon: Layout, color: 'text-blue-500' },
    { id: 'includes', name: 'What\'s Included', desc: 'Manage the 4 main benefit cards.', icon: ListChecks, color: 'text-emerald-500' },
    { id: 'process', name: 'How It Works', desc: 'Step-by-step service procedure.', icon: PlayCircle, color: 'text-amber-500' },
    { id: 'pricing', name: 'Pricing Plans', desc: 'Edit rates and features for each plan.', icon: CreditCard, color: 'text-rose-500' },
    { id: 'faq', name: 'Frequently Asked', desc: 'Manage common customer questions.', icon: MessageCircleQuestion, color: 'text-indigo-500' },
];

const ServiceModulePicker = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();

    const displayName = serviceId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <div className="min-h-screen bg-[#F8F9FA] p-6 lg:p-12 font-sans">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate('/admin/pages/services')} className="mb-8 flex items-center gap-2 text-slate-400 font-bold hover:text-slate-900 transition-all uppercase text-[10px] tracking-widest">
                    <ArrowLeft size={16} /> Back to Services
                </button>

                <div className="mb-12">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{displayName}</h1>
                    <p className="text-slate-400 font-medium text-sm mt-1 italic">Choose a section to edit its live content.</p>
                </div>

                <div className="space-y-4">
                    {modules.map((mod) => (
                        <div
                            key={mod.id}
                            onClick={() => navigate(`/admin/pages/services/${serviceId}/${mod.id}`)}
                            className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-indigo-500 hover:shadow-xl transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center ${mod.color} group-hover:bg-indigo-50 transition-colors`}>
                                    <mod.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900 text-lg leading-tight">{mod.name}</h3>
                                    <p className="text-slate-400 text-xs font-medium mt-1">{mod.desc}</p>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                <ArrowRight size={18} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceModulePicker;