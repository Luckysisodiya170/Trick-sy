import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Edit3, Columns, Eye, Settings2, Type, 
  Eye as EyeIcon, ShieldCheck, Zap, HeartHandshake, ArrowUpRight, Plus, Trash2 
} from 'lucide-react';

const AboutValuesEditor = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('split');
  
  const [valuesData, setValuesData] = useState({
    title: "The Principles That",
    highlight: "Drive TRICKSY.",
    subtitle: "Hum sirf kaam nahi karte, hum ek standard maintain karte hain jo humein doosron se alag banata hai.",
    values: [
      { title: "Transparency", desc: "No hidden costs. Detailed quotes provided upfront for total peace of mind.", color: "bg-blue-500", icon: <EyeIcon size={20} /> },
      { title: "Safety First", desc: "Every technician is background-verified and strictly follows safety protocols.", color: "bg-emerald-500", icon: <ShieldCheck size={20} /> },
      { title: "Speedy Service", desc: "We value your time. Our rapid response team ensures on-time arrival every time.", color: "bg-amber-500", icon: <Zap size={20} /> },
      { title: "Quality Care", desc: "Professional handling of your property with 100% satisfaction guarantee.", color: "bg-emerald-500", icon: <HeartHandshake size={20} /> }
    ]
  });

  const handleValueUpdate = (index, field, val) => {
    const updated = [...valuesData.values];
    updated[index][field] = val;
    setValuesData({ ...valuesData, values: updated });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><ArrowLeft size={18} /></button>
          <h1 className="text-sm lg:text-lg font-black italic flex items-center gap-1.5 uppercase tracking-tighter">
            <Settings2 size={18} className="text-blue-600" /> Values Editor
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>
              <mode.icon size={14} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button className="bg-slate-900 text-white px-5 py-2 rounded-full font-extrabold text-xs flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
          <Save size={14} /> <span className="hidden md:inline">Save Changes</span>
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-500 ${viewMode === 'split' ? 'max-w-[1800px] p-6 grid grid-cols-1 lg:grid-cols-12 gap-10' : 'max-w-4xl p-6'}`}>
        
        {/* --- EDITOR SIDE --- */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : ''} space-y-6`}>
            {/* Header Content */}
            <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-xs uppercase tracking-widest border-b pb-4">
                <Type size={16} className="text-blue-500" /> Header Styling
              </h3>
              <div className="space-y-4">
                <input value={valuesData.title} onChange={(e) => setValuesData({...valuesData, title: e.target.value})} placeholder="Main Title" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none" />
                <input value={valuesData.highlight} onChange={(e) => setValuesData({...valuesData, highlight: e.target.value})} placeholder="Highlight Text" className="w-full p-4 bg-blue-50/50 border border-blue-100 rounded-xl font-black text-emerald-700 outline-none" />
                <textarea rows="2" value={valuesData.subtitle} onChange={(e) => setValuesData({...valuesData, subtitle: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium outline-none resize-none" />
              </div>
            </section>

            {/* Values Cards Editor */}
            <div className="space-y-4">
              <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest px-2">Core Principles Cards</h3>
              {valuesData.values.map((v, i) => (
                <section key={i} className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm space-y-4 relative group">
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl ${v.color} flex items-center justify-center text-white flex-shrink-0 shadow-inner`}>
                      {v.icon}
                    </div>
                    <div className="flex-1 space-y-3">
                      <input value={v.title} onChange={(e) => handleValueUpdate(i, 'title', e.target.value)} className="w-full font-black text-slate-900 outline-none border-b border-transparent focus:border-slate-200 pb-1" placeholder="Card Title" />
                      <textarea value={v.desc} onChange={(e) => handleValueUpdate(i, 'desc', e.target.value)} className="w-full text-xs font-medium text-slate-500 bg-slate-50 p-3 rounded-xl outline-none resize-none" rows="2" placeholder="Description" />
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}

        {/* --- PREVIEW SIDE --- */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-7' : 'w-full'} h-fit sticky top-24`}>
            <div className="w-full bg-white rounded-[3rem] border-[8px] border-slate-950 shadow-2xl overflow-hidden min-h-[600px] relative">
              
              <section className="py-16 px-8 relative overflow-hidden">
                {/* Decorative Blur */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
                  
                  {/* Preview Left */}
                  <div className="lg:col-span-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-blue-600 font-bold text-[8px] uppercase tracking-widest mb-4">
                      Core Principles
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                      {valuesData.title} <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r bg-emerald-500">
                        {valuesData.highlight}
                      </span>
                    </h2>
                    <p className="text-slate-500 mt-6 text-sm lg:text-base font-medium leading-relaxed italic">
                      "{valuesData.subtitle}"
                    </p>

                    <div className="mt-8 p-5 rounded-[2rem] bg-slate-900 text-white flex items-center justify-between overflow-hidden relative">
                      <div className="relative z-10">
                        <p className="text-slate-400 text-[8px] font-bold uppercase tracking-widest mb-0.5">Our Commitment</p>
                        <p className="text-sm font-bold">100% Service Integrity</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Preview Right (Grid) */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {valuesData.values.map((v, i) => (
                      <div key={i} className="group p-6 rounded-[2rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl">
                        <div className={`w-10 h-10 rounded-xl ${v.color} text-white flex items-center justify-center mb-4 shadow-lg transition-transform group-hover:scale-110`}>
                          {v.icon}
                        </div>
                        <h4 className="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{v.title}</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-medium line-clamp-3">{v.desc}</p>
                        <div className="mt-4 flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-500">
                          Learn More <ArrowUpRight size={10} />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutValuesEditor;