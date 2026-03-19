import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, ArrowLeft, Sparkles, Home, Building2, Briefcase, 
  Utensils, Dumbbell, Factory, Plus, Trash2, Upload, 
  ChevronDown, ChevronUp, Eye, Image as ImageIcon, MousePointer2 
} from 'lucide-react';

const PopularEditor = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0); 
  const [previewIndex, setPreviewIndex] = useState(0); 

  const [sectionData, setSectionData] = useState({
    badge: "Categories",
    title: "Popular",
    highlightText: "Services",
    description: "Choose from our highly-rated maintenance and cleaning categories tailored for your specific property needs.",
    services: [
      { id: 1, title: 'Villa Cleaning', desc: 'Premium deep cleaning for luxury homes.', icon: 'Home', image: null },
      { id: 2, title: 'Office Cleaning', desc: 'Sanitized workspaces to boost productivity.', icon: 'Briefcase', image: null },
      { id: 3, title: 'Apartment Cleaning', desc: 'Quick and flawless services for modern flats.', icon: 'Building2', image: null },
    ]
  });

  const iconMap = { Home, Briefcase, Building2, Utensils, Dumbbell, Factory, Sparkles };

  const updateService = (index, field, value) => {
    const updated = [...sectionData.services];
    updated[index][field] = value;
    setSectionData({ ...sectionData, services: updated });
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateService(index, 'image', imageUrl);
    }
  };

  const addService = () => {
    const newService = {
      id: Date.now(),
      title: 'New Service',
      desc: 'Description goes here...',
      icon: 'Sparkles',
      image: null
    };
    setSectionData({ ...sectionData, services: [...sectionData.services, newService] });
    setActiveTab(sectionData.services.length);
  };

  const removeService = (index) => {
    const updated = sectionData.services.filter((_, i) => i !== index);
    setSectionData({ ...sectionData, services: updated });
    setActiveTab(null);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-sans text-slate-900 pb-20">
      {/* Header */}
      <nav className="sticky top-0 z-[100] bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" /> 
            SERVICE<span className="text-indigo-600">PRO</span>
          </h1>
        </div>
        <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg">
          <Save size={16} /> SAVE CHANGES
        </button>
      </nav>

      <div className="max-w-[1600px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: Editor Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Config */}
          <section className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-6 flex items-center gap-2">
               <Sparkles size={14}/> Section Configuration
             </h3>
             <div className="space-y-4">
                <div className="flex flex-wrap md:flex-nowrap gap-3">
                    <input value={sectionData.title} onChange={(e) => setSectionData({...sectionData, title: e.target.value})} className="w-full md:flex-[2] p-3.5 bg-slate-50 rounded-xl font-bold outline-none border border-transparent focus:border-indigo-200 transition-all" placeholder="Title" />
                    <input value={sectionData.highlightText} onChange={(e) => setSectionData({...sectionData, highlightText: e.target.value})} className="w-full md:flex-1 p-3.5 bg-indigo-50 text-indigo-700 rounded-xl font-black outline-none border border-indigo-100" placeholder="Highlight" />
                </div>
                <textarea value={sectionData.description} onChange={(e) => setSectionData({...sectionData, description: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl text-sm font-medium outline-none h-24 resize-none border border-transparent focus:border-indigo-100" placeholder="Description..." />
             </div>
          </section>

          {/* Service List */}
          <div className="space-y-3">
             <div className="flex justify-between items-center px-2">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Services ({sectionData.services.length})</h3>
                <button onClick={addService} className="text-[10px] font-black bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-indigo-700 transition-all">
                    <Plus size={12}/> ADD NEW
                </button>
             </div>

             {sectionData.services.map((service, index) => (
                <div key={service.id} className={`bg-white rounded-[1.5rem] border transition-all duration-300 overflow-hidden ${activeTab === index ? 'ring-2 ring-indigo-500 border-transparent shadow-xl' : 'border-slate-200 hover:border-indigo-200 shadow-sm'}`}>
                    <div 
                        className="p-4 flex items-center justify-between cursor-pointer"
                        onClick={() => setActiveTab(activeTab === index ? null : index)}
                    >
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${activeTab === index ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                {React.createElement(iconMap[service.icon] || Sparkles, { size: 18 })}
                            </div>
                            <span className="font-bold text-slate-700 truncate">{service.title || "Untitled Service"}</span>
                        </div>
                        {activeTab === index ? <ChevronUp size={18} className="text-indigo-600 shrink-0"/> : <ChevronDown size={18} className="text-slate-300 shrink-0"/>}
                    </div>

                    {activeTab === index && (
                        <div className="p-5 border-t border-slate-50 bg-slate-50/50 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Service Name</label>
                                    <input value={service.title} onChange={(e) => updateService(index, 'title', e.target.value)} className="w-full p-3 bg-white rounded-xl font-bold text-sm border border-slate-200 outline-none focus:border-indigo-400" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Icon Style</label>
                                    <select value={service.icon} onChange={(e) => updateService(index, 'icon', e.target.value)} className="w-full p-3 bg-white rounded-xl font-bold text-sm border border-slate-200 outline-none focus:border-indigo-400 cursor-pointer">
                                        {Object.keys(iconMap).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Description</label>
                                <input value={service.desc} onChange={(e) => updateService(index, 'desc', e.target.value)} className="w-full p-3 bg-white rounded-xl text-sm border border-slate-200 outline-none focus:border-indigo-400" />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <label className="flex-1 h-24 bg-white border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 transition-all overflow-hidden group">
                                    <input type="file" hidden onChange={(e) => handleImageUpload(e, index)} accept="image/*" />
                                    {service.image ? (
                                        <img src={service.image} className="w-full h-full object-cover" alt="upload" />
                                    ) : (
                                        <div className="text-center">
                                          <Upload size={20} className="text-slate-300 mx-auto group-hover:text-indigo-400"/>
                                          <span className="text-[9px] font-black text-slate-400 mt-2 block">IMAGE</span>
                                        </div>
                                    )}
                                </label>
                                <button onClick={() => removeService(index)} className="shrink-0 w-24 flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all border border-red-100">
                                    <Trash2 size={20}/>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
             ))}
          </div>
        </div>

        {/* RIGHT: Laptop Mockup Preview */}
        <div className="lg:col-span-7 relative">
          <div className="sticky top-28">
             <div className="flex items-center justify-between px-6 mb-4">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"/>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Interactive Site Preview</span>
                </div>
                <div className="flex gap-1.5 bg-slate-200/50 p-1.5 rounded-full px-3">
                    <div className="w-2 h-2 rounded-full bg-red-400"/>
                    <div className="w-2 h-2 rounded-full bg-amber-400"/>
                    <div className="w-2 h-2 rounded-full bg-emerald-400"/>
                </div>
             </div>

             {/* UI Mockup Container */}
             <div className="bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[8px] border-slate-800">
                <div className="bg-white rounded-[1.8rem] overflow-hidden min-h-[550px] flex flex-col relative">
                  
                  {/* Mock Nav */}
                  <div className="p-6 border-b border-slate-50 flex justify-between items-center shrink-0">
                     <div className="w-24 h-4 bg-slate-100 rounded-full"/>
                     <div className="flex gap-4">
                        <div className="w-12 h-2 bg-slate-50 rounded-full"/>
                        <div className="w-12 h-2 bg-slate-50 rounded-full"/>
                     </div>
                  </div>

                  <div className="p-8 flex-1 overflow-y-auto max-h-[500px] scrollbar-hide">
                    <div className="text-center mb-10">
                        <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                            {sectionData.badge || "FEATURED"}
                        </span>
                        <h2 className="text-4xl font-black mt-4 tracking-tighter leading-none">
                            {sectionData.title} <span className="text-indigo-600">{sectionData.highlightText}</span>
                        </h2>
                        <p className="text-slate-400 text-xs max-w-sm mx-auto mt-4 font-medium leading-relaxed">
                          {sectionData.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-12 gap-8 items-start">
                        {/* List Items */}
                        <div className="col-span-12 md:col-span-5 space-y-2">
                            {sectionData.services.map((s, i) => (
                                <div 
                                    key={s.id}
                                    onMouseEnter={() => setPreviewIndex(i)}
                                    className={`p-4 rounded-2xl transition-all duration-500 cursor-pointer relative group ${previewIndex === i ? 'bg-indigo-600 shadow-xl translate-x-2' : 'hover:bg-slate-50 opacity-60 hover:opacity-100'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${previewIndex === i ? 'bg-white/20 text-white' : 'bg-white shadow-sm text-indigo-600'}`}>
                                            {React.createElement(iconMap[s.icon] || Sparkles, { size: 16 })}
                                        </div>
                                        <div className="overflow-hidden">
                                            <h4 className={`text-xs font-black tracking-tight ${previewIndex === i ? 'text-white' : 'text-slate-800'}`}>{s.title}</h4>
                                            {previewIndex === i && <p className="text-[10px] text-indigo-100 mt-0.5 line-clamp-1">{s.desc}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Image Preview Window */}
                        <div className="col-span-12 md:col-span-7 relative h-72 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                            {sectionData.services.map((s, i) => (
                                <div key={s.id} className={`absolute inset-0 transition-all duration-700 ease-in-out ${previewIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
                                    {s.image ? (
                                        <img src={s.image} className="w-full h-full object-cover" alt="service" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-300">
                                            <ImageIcon size={48} strokeWidth={1} />
                                            <span className="text-[9px] font-black mt-3 uppercase tracking-widest">Waiting for Image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-8 text-white">
                                        <p className="text-xl font-black">{s.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularEditor;