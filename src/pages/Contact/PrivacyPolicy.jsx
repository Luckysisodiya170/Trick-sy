import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const dummyData = {
    title: "Privacy Policy",
    lastUpdated: "April 17, 2026",
    listItems: [
      {
        itemTitle: "Data Collection",
        itemDescription: "We collect essential personal information, such as your name, contact number, and service address, solely for the purpose of fulfilling your home maintenance bookings."
      },
      {
        itemTitle: "Secure Storage",
        itemDescription: "Your privacy is our priority. All user data is securely stored in our encrypted SQL databases and protected by industry-standard SSL protocols."
      },
      {
        itemTitle: "Data Usage",
        itemDescription: "The information we collect is used strictly for managing your service requests, processing secure payments, and providing customer support. We do not use your data for unauthorized advertising."
      },
      {
        itemTitle: "No Third-Party Sharing",
        itemDescription: "We do not sell, rent, or trade your personal information. Your details are only shared with our background-verified professionals assigned to complete your specific task."
      },
      {
        itemTitle: "User Rights & Control",
        itemDescription: "You maintain full control over your data. You can request to view, update, or permanently delete your account and associated information at any time through your profile settings."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
        
        {/* Header Section with Back Button */}
        <div className="bg-emerald-600 px-8 py-16 text-center relative">
          
          {/* BACK BUTTON YAHAN HAI */}
          <button 
            onClick={() => navigate(-1)} 
            className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-emerald-100 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all text-sm font-semibold"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:block">Back</span>
          </button>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-4 sm:mt-0">
            {dummyData.title}
          </h1>
          <p className="mt-4 text-emerald-100 font-medium text-sm uppercase tracking-widest">
            Last Updated: {dummyData.lastUpdated}
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-14 space-y-12">
          {dummyData.listItems.map((item, index) => (
            <div key={index} className="relative pl-6 md:pl-0">
              <div className="absolute left-0 top-1.5 md:hidden w-2 h-2 bg-emerald-600 rounded-full"></div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                <span className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 text-sm font-black">
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
            Have questions about your data security? <br className="sm:hidden" />
            <a href="/contact" className="text-emerald-600 font-bold hover:underline transition-all">
              Contact our Privacy Team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;