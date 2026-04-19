import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CustomerPolicy = () => {
  const navigate = useNavigate();

  // DUMMY DATA (Tricksy ke Customer, Refund aur Cancellation rules)
  const dummyData = {
    title: "Customer Policy",
    lastUpdated: "April 17, 2026",
    listItems: [
      {
        itemTitle: "Service Guarantee",
        itemDescription: "At Tricksy, your satisfaction is our top priority. If a service does not meet our professional standards, please report it within 24 hours, and we will arrange a free rework or adjustment."
      },
      {
        itemTitle: "Cancellation & Rescheduling",
        itemDescription: "You can cancel or reschedule any booking free of charge up to 24 hours before the scheduled time. Cancellations made within 24 hours may be subject to a nominal cancellation fee to compensate our professionals."
      },
      {
        itemTitle: "Refund Process",
        itemDescription: "Approved refunds for cancellations or disputed services will be processed back to your original payment method. Please allow 5-7 business days for the amount to reflect in your bank account."
      },
      {
        itemTitle: "Professional Conduct",
        itemDescription: "We expect mutual respect. Our professionals are trained to be polite and efficient. In return, we request customers to provide a safe and respectful working environment during the service."
      },
      {
        itemTitle: "Dispute Resolution",
        itemDescription: "In the rare event of damage to property during a service, Tricksy provides limited liability coverage. All claims must be submitted with photographic evidence within 48 hours of service completion."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
        
        {/* Header Section - Blue Theme for Trust & Support */}
        <div className="bg-blue-600 px-8 py-16 text-center relative">
          
          {/* BACK BUTTON */}
          <button 
            onClick={() => navigate(-1)} 
            className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-blue-100 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all text-sm font-semibold"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:block">Back</span>
          </button>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-4 sm:mt-0">
            {dummyData.title}
          </h1>
          <p className="mt-4 text-blue-100 font-medium text-sm uppercase tracking-widest">
            Last Updated: {dummyData.lastUpdated}
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-14 space-y-12">
          {dummyData.listItems.map((item, index) => (
            <div key={index} className="relative pl-6 md:pl-0">
              
              {/* Bullet Point Design */}
              <div className="absolute left-0 top-1.5 md:hidden w-2 h-2 bg-blue-600 rounded-full"></div>
              
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                <span className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-sm font-black">
                  {index + 1}
                </span>
                {item.itemTitle}
              </h2>
              
              {/* whitespace-pre-wrap zaroori hai spacing ke liye */}
              <p className="text-slate-600 leading-relaxed md:pl-11 text-lg whitespace-pre-wrap">
                {item.itemDescription}
              </p>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="bg-slate-50 px-8 py-8 text-center border-t border-slate-100">
          <p className="text-slate-500">
            Need help with an existing booking or refund? <br className="sm:hidden" />
            <a href="/contact" className="text-blue-600 font-bold hover:underline transition-all">
              Contact Customer Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerPolicy;