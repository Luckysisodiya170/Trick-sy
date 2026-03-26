import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { technicalServices } from '../../data/technicalData';
import { 
  ArrowLeft, ShieldCheck, Zap, ChevronRight, 
  Wrench, PlusCircle, Droplets, Cpu, Settings, Scissors, Maximize, Layout,
  Search, Hammer, Award, ArrowRight, MousePointerClick
} from 'lucide-react';
import ContactForm from '../Contact/ContactForm';  

const iconMap = {
  "Repair": <Wrench className="w-5 h-5" />, 
  "Installation": <PlusCircle className="w-5 h-5" />,
  "Maintenance": <ShieldCheck className="w-5 h-5" />,
  "Emergency": <Zap className="w-5 h-5" />,
  "Cleaning": <Droplets className="w-5 h-5" />,
  "Wiring": <Cpu className="w-5 h-5" />,
  "Curtain": <Scissors className="w-5 h-5" />,
  "Polishing": <Maximize className="w-5 h-5" />,
  "Wallpaper": <Layout className="w-5 h-5" />,
  "default": <Settings className="w-5 h-5" />
};

const getIcon = (feature) => {
  if (!feature) return iconMap.default;
  const key = Object.keys(iconMap).find(k => feature.includes(k));
  return iconMap[key] || iconMap.default;
};

const colorThemes = [
  { bg: 'bg-blue-500', text: 'text-blue-500', glow: 'shadow-blue-500/30', btn: 'group-hover:bg-blue-600' },
  { bg: 'bg-amber-400', text: 'text-amber-500', glow: 'shadow-amber-400/30', btn: 'group-hover:bg-amber-500' },
  { bg: 'bg-rose-500', text: 'text-rose-500', glow: 'shadow-rose-500/30', btn: 'group-hover:bg-rose-600' },
  { bg: 'bg-purple-500', text: 'text-purple-500', glow: 'shadow-purple-500/30', btn: 'group-hover:bg-purple-600' },
  { bg: 'bg-emerald-500', text: 'text-emerald-500', glow: 'shadow-emerald-500/30', btn: 'group-hover:bg-emerald-600' },
  { bg: 'bg-cyan-500', text: 'text-cyan-500', glow: 'shadow-cyan-500/30', btn: 'group-hover:bg-cyan-600' },
];

const TechnicalDetail = () => {
  const { serviceId } = useParams();
  const service = technicalServices.find(s => s.id === serviceId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [serviceId]);

  if (!service) return (
    <div className="h-screen bg-white flex items-center justify-center text-slate-400 font-bold tracking-widest uppercase">
      Loading Service Context...
    </div>
  );

  return (
    <div className="pt-18 min-h-screen bg-white text-slate-900 selection:bg-emerald-500 selection:text-white font-sans overflow-hidden">
      
      {/*TOP bar*/}
      <div className="bg-slate-950 text-white py-3 px-6 text-[10px] font-bold uppercase tracking-[0.3em] text-center relative z-10">
        Dubai Municipality Certified Technical Squad // Emergency Response Enabled
      </div>

      {/* 2. NAVIGATION & BREADCRUMB */}
      <nav className="py-8 px-6 max-w-[1400px] mx-auto flex items-center justify-between relative z-10">
        <Link to="/technical" className="group flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-all">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Directory</span>
        </Link>
        <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase italic">
          Services <ChevronRight size={10} /> Technical <ChevronRight size={10} /> <span className="text-emerald-500">{service.title}</span>
        </div>
      </nav>

      {/*HERO SECTION  */}
      <section className="py-12 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Premium Quality Guaranteed</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-slate-950 uppercase tracking-tight leading-[1.05]">
              Expert {service.title} <br/> 
              <span className="text-emerald-500 italic">Solutions.</span>
            </h1>
            
            <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
              {service.fullDescription || service.desc || "Comprehensive technical support designed for high-end residential and commercial properties in Dubai."}
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Avg Response</p>
                <p className="text-xl font-black text-slate-900">45 Minutes</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Service Area</p>
                <p className="text-xl font-black text-slate-900">Dubai / MP</p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 aspect-square md:aspect-video border-[8px] border-white ring-1 ring-slate-100 relative z-10">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-slate-950 text-white p-6 rounded-2xl hidden md:block shadow-xl border border-slate-800 z-20">
               <Zap className="text-emerald-500 mb-2" size={24} />
               <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Squad Status</p>
               <p className="text-sm font-black italic">DEPLOYMENT_READY</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SCOPE OF EXPERTISE */}
      <section className="bg-slate-50 py-24 px-6 mt-20 relative overflow-hidden border-y border-slate-100 selection:bg-rose-100 selection:text-rose-900">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                 <span className="w-10 h-1 bg-rose-500 rounded-full"></span>
                 <span className="text-rose-600 font-black text-xs uppercase tracking-[0.3em]">Technical Capabilities</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9] text-center md:text-left">
                Scope of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 italic">Expertise_</span>
              </h2>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-1">Total Protocols</p>
              <p className="text-3xl font-black text-slate-900 italic">0{service.features?.length || 0}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.features?.map((feature, i) => {
              const theme = colorThemes[i % colorThemes.length];
              return (
                <div 
                  key={i} 
                  className="group relative bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${theme.bg}`}></div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className={`w-12 h-12 rounded-xl ${theme.bg} flex items-center justify-center text-white transition-all duration-300 shadow ${theme.glow} group-hover:rotate-6 group-hover:scale-105`}>
                        {getIcon(feature)}
                      </div>
                      <span className={`text-4xl font-black opacity-10 transition-opacity italic ${theme.text}`}>
                        0{i + 1}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight mb-1 group-hover:text-slate-800 transition-colors">
                      {feature}
                    </h4>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed mt-2">
                      Precision execution using certified tools and expert technicians.
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                    <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${theme.text}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${theme.bg} animate-pulse`}></div>
                      SOP Active
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 ${theme.btn} group-hover:text-white transition-all`}>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              );
            })}

            {(!service.features || service.features.length === 0) && (
               <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-100">
                 <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Update technicalData.js with features array.</p>
               </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. PROCESS TIMELINE  */}
      <section className="bg-white py-32 px-6 relative overflow-hidden selection:bg-amber-100 selection:text-amber-900">
        <div className="max-w-[1300px] mx-auto relative z-10">
          
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-3 justify-center mb-6">
               <span className="w-10 h-1 bg-amber-400 rounded-full"></span>
               <span className="text-amber-500 font-black text-xs uppercase tracking-[0.3em]">Operational Flow</span>
               <span className="w-10 h-1 bg-amber-400 rounded-full"></span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9]">
              Deployment <span className="text-amber-400 italic">Lifecycle_</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Booking", desc: "Digital service reservation initiated instantly.", icon: <MousePointerClick className="w-8 h-8" />, color: "bg-blue-500", glow: "shadow-blue-500/40" },
              { step: "02", title: "Inspection", desc: "Experts deployed for on-site diagnosis.", icon: <Search className="w-8 h-8" />, color: "bg-amber-400", glow: "shadow-amber-400/40" },
              { step: "03", title: "Execution", desc: "Technical operation using advanced SOPs.", icon: <Hammer className="w-8 h-8" />, color: "bg-rose-500", glow: "shadow-rose-500/40" },
              { step: "04", title: "Guarantee", desc: "Verification and 6-month warranty activation.", icon: <Award className="w-8 h-8" />, color: "bg-emerald-500", glow: "shadow-emerald-500/40" }
            ].map((item, i) => (
              <div 
                key={i} 
                className="group relative bg-slate-50 p-10 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className={`w-20 h-20 rounded-[2rem] ${item.color} flex items-center justify-center text-white mb-8 shadow-xl ${item.glow} group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500`}>
                  {item.icon}
                </div>

                <div className="absolute top-6 left-6 px-3 py-1 bg-white rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 shadow-sm border border-slate-100 group-hover:text-slate-800 transition-colors">
                  Phase {item.step}
                </div>

                <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">
                  {item.title}
                </h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  {item.desc}
                </p>

                {i !== 3 && (
                  <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all z-20">
                    <ArrowRight size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BOOKING SECTION */}
      <section className="pb-32 px-6 bg-white relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-slate-950 rounded-[3.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
               <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
                 <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter">
                   Request Instant <br />
                   <span className="text-emerald-500 italic">Technical Quote_</span>
                 </h2>
                 <p className="text-slate-400 text-sm font-medium leading-relaxed italic max-w-sm mx-auto lg:mx-0">
                   Enter your details below. Our specialist will review your requirement and call you back within 4 minutes.
                 </p>
               </div>
               
               <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-2 shadow-2xl">
                 <ContactForm 
                   title="Secure" 
                   titleHighlight="Slot" 
                   subtitle={`Book your ${service.title} expert now.`}
                 />
               </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TechnicalDetail;