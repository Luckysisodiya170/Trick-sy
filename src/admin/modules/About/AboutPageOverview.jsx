import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchPageSections, 
  updateSubsectionConfig, 
  createSubsection, 
  deleteSubsection 
} from '../../redux/slices/adminSlice';

import PageManager from '../../components/PageManager';
import { AdminService } from '../../services/adminService'; 
import { 
  LayoutTemplate, Target, Heart, Milestone, Users, 
  ShieldCheck, Box, Globe, Image as ImageIcon, FileText, 
  Zap, PlayCircle, Code, Award, Rocket
} from 'lucide-react';

const iconLibrary = {
  hero: LayoutTemplate, mission: Target, values: Heart,
  timeline: Milestone, team: Users, whyus: ShieldCheck, 
  box: Box, globe: Globe, image: ImageIcon, file: FileText, 
  zap: Zap, play: PlayCircle, code: Code, award: Award, rocket: Rocket
};

const AboutPageOverview = () => {
  const dispatch = useDispatch();
  
  // 1. DYNAMIC ID LOGIC
  const sidebarTree = useSelector((state) => state.adminData?.sidebarTree || []);
  const aboutSectionInfo = sidebarTree.find(sec => sec.slug === 'about');
  const dynamicSectionId = aboutSectionInfo?.id || 2; 

  const sections = useSelector((state) => state.adminData?.pageSections || []); 
  const isLoading = useSelector((state) => state.adminData?.isSectionsLoading); 

  useEffect(() => {
    if (dynamicSectionId) {
      dispatch(fetchPageSections(dynamicSectionId));
    }
  }, [dispatch, dynamicSectionId]);

  // --- Handlers (Sync with Redux & Backend) ---

  const handleCreateModule = (newData) => {
    dispatch(createSubsection({ ...newData, section_id: dynamicSectionId }));
  };

  const handleUpdateModule = (dbId, currentSlug, updatedFields) => {
    dispatch(updateSubsectionConfig({ dbId, updatedFields }));
  };

  const handleDeleteModule = (dbId) => {
    if(window.confirm("Are you sure you want to delete this About block?")) {
        dispatch(deleteSubsection(dbId));
    }
  };

  const handleReorderModules = async (newOrderFromDnd) => {
    try {
      const orderedDbIds = newOrderFromDnd.map(item => Number(item.dbId));
      await AdminService.reorderSubsections(orderedDbIds);
      // Refresh to sync local state with new order
      dispatch(fetchPageSections(dynamicSectionId)); 
    } catch (error) {
      console.error("About Reorder failed:", error);
    }
  };

  // 2. DATA FORMATTING FOR PAGEMANAGER
  const formattedSections = useMemo(() => {
    if (!Array.isArray(sections)) return [];
    
    const sortedSections = [...sections].sort((a, b) => a.order - b.order);
    
    return sortedSections.map((item) => ({
      id: item.slug || `about-sec-${item.id}`,                
      dbId: item.id,                
      name: item.subsectionName,    
      status: item.isActive ? 'Live' : 'Draft', 
      iconKey: item.icon || 'box',  
      isSystem: item.isSystem, 
      path: item.isSystem 
        ? `/admin/pages/about/${item.slug}/${item.id}` 
        : `/admin/pages/about/custom/${item.slug}/${item.id}`,
      theme: item.theme || 'emerald'
    }));
  }, [sections]);

  if (isLoading && sections.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        <span className="ml-3 mt-4 text-xs font-black uppercase tracking-widest text-slate-400">
            Syncing About Modules...
        </span>
      </div>
    );
  }
  
  return (
    <div className="relative animate-in fade-in duration-500">
      <PageManager 
        sectionId={dynamicSectionId}
        title={<>ABOUT <span className="text-emerald-500 italic uppercase">Sections.</span></>}
        defaultSections={formattedSections} 
        iconLibrary={iconLibrary}
        itemLabel="Block"
        onCreate={handleCreateModule}
        onUpdate={handleUpdateModule} 
        onDelete={handleDeleteModule}
        onReorder={handleReorderModules}
      />
    </div>
  );
};

export default AboutPageOverview;