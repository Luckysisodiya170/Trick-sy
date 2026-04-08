import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleSubsectionContent, updateSingleSubsectionContent } from '../../../store/index';
import { 
  ArrowLeft, Save, Edit3, Columns, Eye, Settings2, Type, 
  Linkedin, Mail, ArrowUpRight, Upload, Trash2, Plus, Users, Sparkles, Twitter, Loader2
} from 'lucide-react';

const AboutTeamEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const subsectionId = id ? parseInt(id, 10) : 14; 

  const content = useSelector((state) => state.content.activeSubsection);
  const status = useSelector((state) => state.content.status);

  const [viewMode, setViewMode] = useState('split');
  const [isDeploying, setIsDeploying] = useState(false);
  const [imageFiles, setImageFiles] = useState({});
  
  const [teamData, setTeamData] = useState({
    teamTitle: "Meet The",
    teamHighlight: "Masterminds",
    teamDescription: "A world-class team of certified professionals dedicated to bringing perfection to your space.",
    members: [
      { 
        name: "Saurabh Sharma", 
        role: "Founder & CEO", 
        bio: "Visionary leader with 10+ years in home maintenance tech.",
        img: null,
        socials: { linkedin: "#", twitter: "#", mail: "saurabh@tricksy.com" }
      },
      { 
        name: "John Doe", 
        role: "Head of Operations", 
        bio: "Ensuring flawless execution and extreme customer satisfaction.",
        img: null,
        socials: { linkedin: "#", twitter: "#", mail: "john@tricksy.com" }
      }
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
          { 
            name: "Saurabh Sharma", 
            role: "Founder & CEO", 
            bio: "Visionary leader with 10+ years in home maintenance tech.",
            img: null,
            socials: { linkedin: "#", twitter: "#", mail: "saurabh@tricksy.com" }
          },
          { 
            name: "John Doe", 
            role: "Head of Operations", 
            bio: "Ensuring flawless execution and extreme customer satisfaction.",
            img: null,
            socials: { linkedin: "#", twitter: "#", mail: "john@tricksy.com" }
          }
        ]
      });
    }
  }, [content]);

  const handleMemberChange = (index, field, value) => {
    const updated = [...teamData.members];
    updated[index] = { ...updated[index], [field]: value };
    setTeamData({ ...teamData, members: updated });
  };

  const handleSocialChange = (index, platform, value) => {
    const updated = [...teamData.members];
    updated[index] = { 
        ...updated[index], 
        socials: { ...updated[index].socials, [platform]: value } 
    };
    setTeamData({ ...teamData, members: updated });
  };

  const addMember = () => {
    const newMember = {
      name: "New Member",
      role: "Position Name",
      bio: "Short professional bio goes here...",
      img: null,
      socials: { linkedin: "#", twitter: "#", mail: "" }
    };
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
    if (imagePath.startsWith('http') || imagePath.startsWith('blob:') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    return `http://localhost:5000${imagePath}`;
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      if (teamData.members[index].img && teamData.members[index].img.startsWith('blob:')) {
        URL.revokeObjectURL(teamData.members[index].img);
      }
      
      setImageFiles(prev => ({ ...prev, [index]: file }));
      handleMemberChange(index, 'img', URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setIsDeploying(true);
    try {
      const token = localStorage.getItem('tricksyAdminToken');
      const finalMembers = teamData.members.map(member => ({...member}));

      const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('heroImage', file); 
        const res = await fetch('http://localhost:5000/api/upload/upload-hero', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Upload Failed");
        return data.imageUrl;
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

      await dispatch(updateSingleSubsectionContent({ 
        subsectionId: subsectionId, 
        updateData: payload 
      })).unwrap();

      alert("Team Section Deployed Successfully! ✅");
      setImageFiles({});
      
    } catch (error) {
      console.error("Update failed:", error);
      alert(`Error: ${error.message || "Failed to deploy to database."}`);
    } finally {
      setIsDeploying(false);
    }
  };

  if (status === 'loading' && !content) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-widest text-xs">
        <Loader2 className="animate-spin mr-2" size={16} /> Loading Team Lab...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      <nav className="sticky top-0 z-[50] bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><ArrowLeft size={18} /></button>
          <h1 className="text-sm lg:text-lg font-black italic flex items-center gap-1.5 uppercase tracking-tighter text-slate-900">
            <Users size={18} className="text-emerald-500" /> TEAM EDITOR
          </h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-full">
          {[{ id: 'edit', icon: Edit3, label: 'Edit' }, { id: 'split', icon: Columns, label: 'Split' }, { id: 'preview', icon: Eye, label: 'Preview' }].map((mode) => (
            <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === mode.id ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}>
              <mode.icon size={14} /> <span className="hidden sm:inline">{mode.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave}
          disabled={isDeploying}
          className="bg-slate-900 text-white px-5 py-2 rounded-full font-extrabold text-xs flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 disabled:opacity-50"
        >
          {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
          <span className="hidden md:inline">{isDeploying ? "DEPLOYING..." : "Publish Team"}</span>
        </button>
      </nav>

      <div className={`mx-auto transition-all duration-500 ${viewMode === 'split' ? 'max-w-[1800px] p-6 grid grid-cols-1 lg:grid-cols-12 gap-10' : 'max-w-4xl p-6'}`}>
        
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-4' : ''} space-y-6`}>
            <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-4">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-xs uppercase tracking-widest border-b pb-4"><Type size={16} className="text-emerald-500" /> Page Header</h3>
              <div className="grid grid-cols-2 gap-3">
                <input value={teamData.teamTitle} onChange={(e) => setTeamData({...teamData, teamTitle: e.target.value})} placeholder="Title" className="p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none w-full" />
                <input value={teamData.teamHighlight} onChange={(e) => setTeamData({...teamData, teamHighlight: e.target.value})} placeholder="Highlight" className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl font-black text-emerald-700 outline-none w-full" />
              </div>
              <textarea rows="2" value={teamData.teamDescription} onChange={(e) => setTeamData({...teamData, teamDescription: e.target.value})} placeholder="Section Description..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium outline-none resize-none focus:bg-white focus:border-emerald-400 transition-all leading-relaxed" />
            </section>

            <div className="space-y-4">
              {teamData.members.map((member, i) => (
                <div key={i} className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm space-y-4 relative group animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center justify-between mb-2 border-b border-slate-50 pb-2">
                     <span className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em]">Member #{i+1}</span>
                     <button onClick={() => deleteMember(i)} className="text-slate-300 hover:text-red-500 transition-colors p-1"><Trash2 size={14}/></button>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex-shrink-0 relative overflow-hidden group/img border border-slate-100">
                      {member.img ? <img src={getImageUrl(member.img)} className="w-full h-full object-cover" /> : <Users className="m-auto mt-4 text-slate-300" size={24}/>}
                      
                      <label htmlFor={`img-upload-${i}`} className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-10">
                        <Upload className="text-white" size={16} />
                      </label>
                      <input id={`img-upload-${i}`} type="file" className="hidden" onChange={(e) => handleImageUpload(i, e)} accept="image/*" />
                    
                    </div>
                    <div className="flex-1 space-y-1">
                      <input value={member.name} onChange={(e) => handleMemberChange(i, 'name', e.target.value)} className="w-full font-black text-slate-900 outline-none text-sm" placeholder="Full Name" />
                      <input value={member.role} onChange={(e) => handleMemberChange(i, 'role', e.target.value)} className="w-full font-bold text-emerald-600 outline-none text-[9px] uppercase tracking-widest" placeholder="Role" />
                    </div>
                  </div>

                  <textarea value={member.bio} onChange={(e) => handleMemberChange(i, 'bio', e.target.value)} className="w-full text-[11px] font-medium text-slate-500 bg-slate-50 p-3 rounded-xl outline-none resize-none border border-transparent focus:border-emerald-100" rows="2" placeholder="Short bio..." />
                  
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-50">
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
                      <Linkedin size={12} className="text-slate-400"/>
                      <input value={member.socials?.linkedin || ""} onChange={(e) => handleSocialChange(i, 'linkedin', e.target.value)} className="w-full bg-transparent text-[9px] outline-none text-slate-600" placeholder="LinkedIn URL"/>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
                      <Twitter size={12} className="text-slate-400"/>
                      <input value={member.socials?.twitter || ""} onChange={(e) => handleSocialChange(i, 'twitter', e.target.value)} className="w-full bg-transparent text-[9px] outline-none text-slate-600" placeholder="Twitter URL"/>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
                      <Mail size={12} className="text-slate-400"/>
                      <input value={member.socials?.mail || ""} onChange={(e) => handleSocialChange(i, 'mail', e.target.value)} className="w-full bg-transparent text-[9px] outline-none text-slate-600" placeholder="Email"/>
                    </div>
                  </div>
                </div>
              ))}

              <button 
                onClick={addMember}
                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-bold text-xs hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16}/> Add Team Member
              </button>
            </div>
          </div>
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-8' : 'w-full'} h-fit sticky top-24`}>
            <div className="w-full bg-white rounded-[3.5rem] border-[10px] border-slate-950 shadow-2xl overflow-hidden relative pb-16">
              
              <section className="py-16 px-8 relative">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-4 shadow-sm">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span className="text-slate-900 font-black text-[11px] uppercase tracking-[0.2em]">Our Leadership</span>
                  </div> 
                  <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">
                    {teamData.teamTitle} 
                  </h2>
                  <span className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">{teamData.teamHighlight}</span>
                  
                  <p className="text-slate-500 font-medium max-w-2xl mx-auto mt-4 text-sm">
                    {teamData.teamDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {teamData.members.map((member, i) => (
                    <div key={i} className="group bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 overflow-hidden">
                      
                      <div className="relative h-[150px] overflow-hidden">
                        {member.img ? (
                          <img src={getImageUrl(member.img)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400"><Users size={32}/></div>
                        )}
                      </div>

                      <div className="p-5">
                        <p className="text-emerald-600 text-[8px] font-black uppercase tracking-widest mb-1">{member.role}</p>
                        <h4 className="text-lg font-black text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors leading-tight">{member.name}</h4>
                        <p className="text-slate-500 text-[10px] font-medium leading-relaxed line-clamp-2">{member.bio}</p>
                        
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex gap-2">
                             {member.socials?.linkedin && (<div className="w-7 h-7 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors"><Linkedin size={12}/></div>)}
                             {member.socials?.twitter && (<div className="w-7 h-7 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 transition-colors"><Twitter size={12}/></div>)}
                             {member.socials?.mail && (<div className="w-7 h-7 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"><Mail size={12}/></div>)}
                          </div>
                          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-emerald-600 transition-all cursor-pointer">
                            <ArrowUpRight size={14}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 bg-slate-900 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
                   <div>
                      <h3 className="text-lg font-black text-white">We're hiring!</h3>
                      <p className="text-slate-400 text-[8px] uppercase tracking-widest">Join our growing team</p>
                   </div>
                   <div className="px-5 py-2.5 bg-emerald-600 text-white font-black rounded-xl text-[9px] uppercase tracking-widest hover:bg-emerald-500 transition-all cursor-pointer">Apply Now</div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutTeamEditor;