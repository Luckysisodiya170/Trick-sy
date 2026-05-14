import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../redux/slices/adminSlice';
import { AdminService } from '../../services/adminService';
import { 
  ArrowLeft, Save, Edit3, Columns, Eye, Settings2, Type, 
  Linkedin, Mail, ArrowUpRight, Upload, Trash2, Plus, Users, Sparkles, Twitter, Loader2
} from 'lucide-react';

const AboutTeamEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const subsectionId = id ? parseInt(id, 10) : 14; 

  // Fixed Redux Paths
  const content = useSelector((state) => state.adminData.activeSubsection);
  const status = useSelector((state) => state.adminData.status);

  const [viewMode, setViewMode] = useState('split');
  const [isDeploying, setIsDeploying] = useState(false);
  const [imageFiles, setImageFiles] = useState({});
  
  const [teamData, setTeamData] = useState({
    teamTitle: "Meet The",
    teamHighlight: "Masterminds",
    teamDescription: "A world-class team of certified professionals dedicated to bringing perfection to your space.",
    members: [
      { name: "Saurabh Sharma", role: "Founder & CEO", bio: "Visionary leader with 10+ years in home maintenance tech.", img: null, socials: { linkedin: "#", twitter: "#", mail: "saurabh@tricksy.com" } },
      { name: "John Doe", role: "Head of Operations", bio: "Ensuring flawless execution and extreme customer satisfaction.", img: null, socials: { linkedin: "#", twitter: "#", mail: "john@tricksy.com" } }
    ]
  });

  useEffect(() => {
    dispatch(fetchSingleSubsectionContent(subsectionId));
  }, [dispatch, subsectionId]);

  useEffect(() => {
    if (content && Object.keys(content).length > 0) {
      setTeamData({
        teamTitle: content.teamTitle || "Meet The",
        teamHighlight: content.teamHighlight || "Masterminds",
        teamDescription: content.teamDescription || "A world-class team of certified professionals dedicated to bringing perfection to your space.",
        members: content.members || [
          { name: "Saurabh Sharma", role: "Founder & CEO", bio: "Visionary leader with 10+ years in home maintenance tech.", img: null, socials: { linkedin: "#", twitter: "#", mail: "saurabh@tricksy.com" } },
          { name: "John Doe", role: "Head of Operations", bio: "Ensuring flawless execution and extreme customer satisfaction.", img: null, socials: { linkedin: "#", twitter: "#", mail: "john@tricksy.com" } }
        ]
      });
    }
  }, [content]);

  // Strict Limits Handlers
  const handleLimitChange = (field, val, limit) => {
    if (val.length <= limit) setTeamData({ ...teamData, [field]: val });
  };

  const handleMemberChange = (index, field, value, limit) => {
    if (value.length <= limit) {
      const updated = [...teamData.members];
      updated[index] = { ...updated[index], [field]: value };
      setTeamData({ ...teamData, members: updated });
    }
  };

  const handleSocialChange = (index, platform, value) => {
    const updated = [...teamData.members];
    updated[index] = { ...updated[index], socials: { ...updated[index].socials, [platform]: value } };
    setTeamData({ ...teamData, members: updated });
  };

  const addMember = () => {
    const newMember = { name: "New Member", role: "Position Name", bio: "Short professional bio goes here...", img: null, socials: { linkedin: "#", twitter: "#", mail: "" } };
    setTeamData({ ...teamData, members: [...teamData.members, newMember] });
  };

  const deleteMember = (index) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      const updatedMembers = teamData.members.filter((_, i) => i !== index);
      const newImageFiles = { ...imageFiles };
      delete newImageFiles[index];
      setImageFiles(newImageFiles);
      setTeamData({ ...teamData, members: updatedMembers });
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith('http') || imagePath.startsWith('blob:') || imagePath.startsWith('data:')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      if (teamData.members[index].img && teamData.members[index].img.startsWith('blob:')) {
        URL.revokeObjectURL(teamData.members[index].img);
      }
      setImageFiles(prev => ({ ...prev, [index]: file }));
      handleMemberChange(index, 'img', URL.createObjectURL(file), 500); // 500 is arbitrarily large for blob URL
    }
  };

  const handleSave = async () => {
    setIsDeploying(true);
    try {
      const finalMembers = teamData.members.map(member => ({...member}));

      // Centralized Upload Service
      const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('image', file); 
        const uploadData = await AdminService.uploadHeroImage(formData);
        if (!uploadData.success && !uploadData.imageUrl) throw new Error("Image Upload Failed");
        return uploadData.imageUrl;
      };

      for (let i = 0; i < finalMembers.length; i++) {
        if (imageFiles[i]) {
          finalMembers[i].img = await uploadFile(imageFiles[i]);
        } else if (finalMembers[i].img && finalMembers[i].img.startsWith('blob:')) {
          finalMembers[i].img = content.members?.[i]?.img || null;
        }
      }

      const finalImagesArray = finalMembers.map(member => member.img).filter(Boolean);

      const payload = {
        teamTitle: teamData.teamTitle,
        teamHighlight: teamData.teamHighlight,
        teamDescription: teamData.teamDescription,
        members: finalMembers,
        images: finalImagesArray 
      };

      await dispatch(updateSingleSubsectionContent({ subsectionId, updateData: payload })).unwrap();
      dispatch(fetchSingleSubsectionContent(subsectionId)); // Sync state
      
      alert("Team Section Deployed Successfully! 🚀");
      setImageFiles({});
    } catch (error) {
      alert(`Error: ${error.message || "Failed to deploy to database."}`);
    } finally { setIsDeploying(false); }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> SYNCING TEAM LAB...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans pb-20 selection:bg-emerald-100">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400 hover:text-slate-900"><ArrowLeft size={18} /></button>
          <h1 className="text-[12px] font-black italic flex items-center gap-2 uppercase tracking-[0.2em] text-slate-800">
            <Settings2 size={16} className="text-emerald-600" /> Team <span className="text-emerald-400">Lab</span>
          </h1>
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <mode.icon size={12} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button onClick={handleSave} disabled={isDeploying} className="bg-slate-900 text-white px-8 py-2 rounded-xl font-black text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50">
          {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
          <span>{isDeploying ? "DEPLOYING..." : "DEPLOY"}</span>
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-700 ${viewMode === 'split' ? 'max-w-[1800px] px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8' : 'max-w-4xl py-12 px-6'}`}>
        
        {/* --- EDITOR SIDE --- */}
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-4' : 'w-full'} space-y-6`}>
            
            {/* Header Configuration */}
            <section className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm space-y-5">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2 block flex items-center gap-2"><Type size={14} className="text-emerald-500" /> Header Styling</span>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input value={teamData.teamTitle} onChange={(e) => handleLimitChange('teamTitle', e.target.value, 40)} placeholder="Main Title" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl font-bold text-xs outline-none focus:border-emerald-500 transition-all" />
                  <input value={teamData.teamHighlight} onChange={(e) => handleLimitChange('teamHighlight', e.target.value, 40)} placeholder="Highlight" className="w-full px-4 py-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl font-black text-emerald-700 outline-none focus:border-emerald-300 transition-all" />
                </div>
                <textarea rows="2" value={teamData.teamDescription} onChange={(e) => handleLimitChange('teamDescription', e.target.value, 150)} placeholder="Section Description..." className="w-full px-4 py-3 bg-slate-50/50 border border-slate-100 rounded-xl text-xs font-medium outline-none resize-none focus:border-emerald-500 transition-all leading-relaxed" />
              </div>
            </section>

            {/* Team Members List */}
            <div className="space-y-4 pb-10">
              <div className="flex items-center justify-between px-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Team Roster ({teamData.members.length})</span>
                <button onClick={addMember} className="text-[9px] font-black text-emerald-600 hover:text-emerald-700">+ ADD MEMBER</button>
              </div>

              {teamData.members.map((member, i) => (
                <div key={i} className="bg-white rounded-[2rem] border border-slate-100 p-5 shadow-sm space-y-4 relative group animate-in slide-in-from-left-2 hover:border-emerald-200 transition-all">
                  <div className="flex items-center justify-between mb-2 border-b border-slate-50 pb-2">
                     <span className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em]">Member #{i+1}</span>
                     <button onClick={() => deleteMember(i)} className="text-slate-300 hover:text-rose-500 transition-colors p-1"><Trash2 size={14}/></button>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex-shrink-0 relative overflow-hidden group/img border border-slate-100 flex items-center justify-center">
                      {member.img ? <img src={getImageUrl(member.img)} className="w-full h-full object-cover" /> : <Users className="text-slate-300" size={24}/>}
                      <label htmlFor={`img-upload-${i}`} className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-10">
                        <Upload className="text-white" size={16} />
                      </label>
                      <input id={`img-upload-${i}`} type="file" className="hidden" onChange={(e) => handleImageUpload(i, e)} accept="image/*" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input value={member.name} onChange={(e) => handleMemberChange(i, 'name', e.target.value, 30)} className="w-full font-black text-slate-900 outline-none text-sm border-b border-transparent focus:border-slate-200 pb-1" placeholder="Full Name" />
                      <input value={member.role} onChange={(e) => handleMemberChange(i, 'role', e.target.value, 30)} className="w-full font-bold text-emerald-600 outline-none text-[9px] uppercase tracking-widest" placeholder="Role/Position" />
                    </div>
                  </div>

                  <textarea value={member.bio} onChange={(e) => handleMemberChange(i, 'bio', e.target.value, 150)} className="w-full text-[10px] font-medium text-slate-500 bg-slate-50 p-3 rounded-xl outline-none resize-none border border-transparent focus:border-emerald-100" rows="2" placeholder="Short bio..." />
                  
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="flex items-center gap-2 bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                      <Linkedin size={12} className="text-slate-400"/><input value={member.socials?.linkedin || ""} onChange={(e) => handleSocialChange(i, 'linkedin', e.target.value)} className="w-full bg-transparent text-[8px] outline-none text-slate-600" placeholder="LinkedIn"/>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                      <Twitter size={12} className="text-slate-400"/><input value={member.socials?.twitter || ""} onChange={(e) => handleSocialChange(i, 'twitter', e.target.value)} className="w-full bg-transparent text-[8px] outline-none text-slate-600" placeholder="Twitter"/>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                      <Mail size={12} className="text-slate-400"/><input value={member.socials?.mail || ""} onChange={(e) => handleSocialChange(i, 'mail', e.target.value)} className="w-full bg-transparent text-[8px] outline-none text-slate-600" placeholder="Email"/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- RIGHT: LIVE PREVIEW (MACBOOK MOCKUP) --- */}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-8' : 'w-full'} sticky top-24`}>
            
            {/* BLACK MACBOOK MOCKUP FRAME */}
            <div className="relative mx-auto bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-[10px] border-slate-800 overflow-hidden">
              
              {/* Browser Toolbar UI */}
              <div className="flex h-8 bg-slate-900 items-center px-4 gap-1.5 border-b border-slate-800/50">
                 <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                 </div>
                 <div className="flex-1 text-center"><span className="text-[6px] font-bold uppercase tracking-widest text-slate-500">Team Roster Preview</span></div>
              </div>

              {/* Inner Page Canvas */}
              <div className="bg-white rounded-xl overflow-hidden min-h-[520px] max-h-[75vh] overflow-y-auto custom-scrollbar relative">
                <div className="w-full scale-95 origin-top animate-in fade-in duration-500 pb-10">
                  
                  {/* USER'S DESIGN STARTS HERE */}
                  <section className="py-12 px-8 relative">
                    <div className="text-center mb-12">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-4 shadow-sm">
                        <Sparkles className="w-3 h-3 text-emerald-500" />
                        <span className="text-slate-900 font-black text-[9px] uppercase tracking-[0.2em]">Our Leadership</span>
                      </div> 
                      <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter">
                        {teamData.teamTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">{teamData.teamHighlight}</span>
                      </h2>
                      <p className="text-slate-500 font-medium max-w-xl mx-auto mt-4 text-xs leading-relaxed">
                        {teamData.teamDescription}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {teamData.members.map((member, i) => (
                        <div key={i} className="group bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 overflow-hidden">
                          
                          <div className="relative h-[160px] overflow-hidden">
                            {member.img ? (
                              <img src={getImageUrl(member.img)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            ) : (
                              <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400"><Users size={28}/></div>
                            )}
                          </div>

                          <div className="p-5">
                            <p className="text-emerald-600 text-[8px] font-black uppercase tracking-widest mb-1.5">{member.role}</p>
                            <h4 className="text-base font-black text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors leading-tight">{member.name}</h4>
                            <p className="text-slate-500 text-[10px] font-medium leading-relaxed line-clamp-2">{member.bio}</p>
                            
                            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                              <div className="flex gap-2">
                                 {member.socials?.linkedin && (<div className="w-7 h-7 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors"><Linkedin size={10}/></div>)}
                                 {member.socials?.twitter && (<div className="w-7 h-7 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 transition-colors"><Twitter size={10}/></div>)}
                                 {member.socials?.mail && (<div className="w-7 h-7 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"><Mail size={10}/></div>)}
                              </div>
                              <div className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-emerald-600 transition-all cursor-pointer">
                                <ArrowUpRight size={12}/>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 bg-slate-900 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
                       <div>
                          <h3 className="text-base font-black text-white">We're hiring!</h3>
                          <p className="text-slate-400 text-[8px] uppercase tracking-widest mt-1">Join our growing team</p>
                       </div>
                       <div className="px-5 py-2.5 bg-emerald-600 text-white font-black rounded-xl text-[9px] uppercase tracking-widest hover:bg-emerald-500 transition-all cursor-pointer">Apply Now</div>
                    </div>
                  </section>
                  {/* USER'S DESIGN ENDS HERE */}

                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AboutTeamEditor;