import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  const dummyData = {
    title: "Terms & Conditions",
    lastUpdated: "April 17, 2026",
    listItems: [
      {
        itemTitle: "Service Acceptance",
        itemDescription: "By accessing and using Tricksy's platform, you agree to abide by our professional service protocols, safety guidelines, and terms outlined below."
      },
      {
        itemTitle: "Booking & Payments",
        itemDescription: "All bookings are subject to the availability of our professionals. Payments must be processed securely via our approved gateways prior to the commencement of any service."
      },
      {
        itemTitle: "Cancellation Policy",
        itemDescription: "We offer a full refund for any cancellations made at least 24 hours in advance of the scheduled service. Cancellations made within 24 hours may incur a standard service fee."
      },
      {
        itemTitle: "Liability Limitation",
        itemDescription: "Tricksy acts solely as a service facilitator. While we ensure all professionals are background-verified, our liability is strictly limited to the extent of the specific service guarantee provided at booking."
      },
      {
        itemTitle: "Platform Integrity",
        itemDescription: "Any unauthorized tampering with the Tricksy platform, including its API, database, or UI elements, will result in immediate account termination and potential legal action."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
        
        {/* Header Section with Back Button */}
        <div className="bg-indigo-600 px-8 py-16 text-center relative">
          
          {/* BACK BUTTON YAHAN HAI */}
          <button 
            onClick={() => navigate(-1)} 
            className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-indigo-100 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all text-sm font-semibold"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:block">Back</span>
          </button>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-4 sm:mt-0">
            {dummyData.title}
          </h1>
          <p className="mt-4 text-indigo-200 font-medium text-sm uppercase tracking-widest">
            Last Updated: {dummyData.lastUpdated}
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-14 space-y-12">
          {dummyData.listItems.map((item, index) => (
            <div key={index} className="relative pl-6 md:pl-0">
              <div className="absolute left-0 top-1.5 md:hidden w-2 h-2 bg-indigo-600 rounded-full"></div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                <span className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 text-sm font-black">
                  {index + 1}
                </span>
                {item.itemTitle}
              </h2>
              <p className="text-slate-600 leading-relaxed md:pl-11 text-lg whitespace-pre-wrap">
                {item.itemDescription}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 px-8 py-8 text-center border-t border-slate-100">
          <p className="text-slate-500">
            Have questions about these terms? <br className="sm:hidden" />
            <a href="/contact" className="text-indigo-600 font-bold hover:underline transition-all">
              Contact our Support Team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;