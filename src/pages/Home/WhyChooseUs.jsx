import React from 'react';
import { ShieldCheck, Leaf, BadgeDollarSign, Zap, Headphones, Sparkles, CheckCircle2 } from 'lucide-react';

const WhyChooseUs = ({ featuresData }) => {
  // 🔥 PRODUCTION RULE: Fallback Default Data
  const defaultFeatures = [
    { id: 1, title: 'Professional Team', iconName: 'shield', desc: 'Certified & verified experts.' },
    { id: 2, title: 'Eco-Friendly Products', iconName: 'leaf', desc: 'Safe for kids and pets.' },
    { id: 3, title: 'Affordable Prices', iconName: 'dollar', desc: 'No hidden or extra costs.' },
    { id: 4, title: 'Fast Service', iconName: 'zap', desc: 'Quick & on-time response.' },
    { id: 5, title: '24/7 Support', iconName: 'headphones', desc: 'Always here to help you.' },
  ];

  // Defensive Array Check
  const displayFeatures = Array.isArray(featuresData) && featuresData.length > 0 ? featuresData : defaultFeatures;

  // Safe Icon Mapping for Dynamic Data
  const getIcon = (iconName) => {
    switch(iconName?.toLowerCase()) {
      case 'shield': return ShieldCheck;
      case 'leaf': return Leaf;
      case 'dollar': return BadgeDollarSign;
      case 'zap': return Zap;
      case 'headphones': return Headphones;
      default: return CheckCircle2; // Fallback Icon
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.05),transparent)] pointer-events-none"></div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="w-full lg:w-5/12 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white font-bold text-[11px] mb-6 shadow-lg tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-primary-400" />
              The TRICKSY Standard
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
              Why People <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-500">Choose Us?</span>
            </h2>

            <p className="text-lg text-slate-500 font-medium max-w-md mx-auto lg:mx-0 leading-relaxed">
              We bring perfection to your doorstep with our certified process and a team that actually cares about your comfort.
            </p>
          </div>

          <div className="w-full lg:w-6/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {displayFeatures.map((f, index) => {
              const IconComponent = getIcon(f?.iconName);

              return (
                <div 
                  key={f?.id || `feature-${index}`} 
                  className={`group relative p-5 rounded-[2rem] transition-all duration-300 hover:-translate-y-1 ${
                    index === 0 
                    ? 'sm:col-span-2 bg-slate-900 text-white shadow-2xl shadow-slate-900/20' 
                    : 'bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                      index === 0 ? 'bg-primary-500 text-slate-900' : 'bg-white text-slate-900 shadow-sm group-hover:bg-primary-500 group-hover:text-white'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <div>
                      <h3 className={`font-bold tracking-tight ${index === 0 ? 'text-xl' : 'text-lg text-slate-900'}`}>
                        {f?.title || "Premium Feature"}
                      </h3>
                      {index === 0 && <p className="text-slate-400 text-sm font-medium mt-1">{f?.desc || "Guaranteed satisfaction."}</p>}
                    </div>

                    <div className="ml-auto">
                      <CheckCircle2 className={`w-5 h-5 ${index === 0 ? 'text-primary-400' : 'text-primary-600'}`} />
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="sm:col-span-2 bg-gradient-to-r from-primary-600 to-emerald-500 p-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-primary-500/20">
               <span className="text-white font-black text-sm uppercase tracking-widest">100% Satisfaction Guaranteed</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;