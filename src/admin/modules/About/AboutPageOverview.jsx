import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSections, updateSubsection } from '../../../store/index'; 
import PageManager from '../../components/PageManager'; 
import { 
  LayoutTemplate, Target, Heart, Milestone, Users, 
  ShieldCheck, Box, Globe, Image as ImageIcon, FileText, 
  Zap, PlayCircle, Code 
} from 'lucide-react';

const iconLibrary = {
  hero: LayoutTemplate, mission: Target, values: Heart,
  timeline: Milestone, team: Users, whyus: ShieldCheck, 
  box: Box, globe: Globe, image: ImageIcon, file: FileText, 
  zap: Zap, play: PlayCircle, code: Code
};

const AboutPageOverview = () => {
  const dispatch = useDispatch();
  
  // 1. Get data from Redux Store
  const sections = useSelector((state) => state.sections.items);
  const status = useSelector((state) => state.sections.status);

  // 2. Fetch About Page Sections 
  useEffect(() => {
    dispatch(fetchSections(2));
  }, [dispatch]);

  // 3. Reusable Update Handler
  const handleUpdateModule = (dbId, currentSlug, updatedFields) => {
    dispatch(updateSubsection({ dbId, updatedFields }));
  };



  

const formattedSections = sections.map((item) => ({
  id: item.slug,                
  dbId: item.id,                
  name: item.subsectionName,    
  status: item.isActive ? 'Live' : 'Draft', 
  iconKey: item.icon,  
  isSystem: item.isSystem,        
  
  path: item.isSystem 
    ? `/admin/pages/about/${item.slug}` 
    : `/admin/pages/about/${item.slug}/${item.id}`,
  
  theme: item.theme,
  color: `text-${item.theme}-500`,         
  bg: `bg-${item.theme}-50`                
}));

  if (status === 'loading' && sections.length === 0) {
    return <div className="p-8 text-center text-slate-400 font-bold uppercase tracking-widest">Loading About Modules...</div>;
  }

  return (
    <PageManager 
      title={<>ABOUT <span className="text-brand-primary">SECTIONS.</span></>}
      storageKey="tricksy_about_modules"
      sectionId={2} 
      defaultSections={formattedSections}
      iconLibrary={iconLibrary}
      baseRoute="/admin/pages/about"
      itemLabel="Block"
      onUpdate={handleUpdateModule}
    />
  );
};

export default AboutPageOverview;