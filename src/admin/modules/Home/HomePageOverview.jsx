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
  LayoutTemplate, Type, Wrench, Star, ShieldCheck, 
  MessageSquare, HelpCircle, MousePointerClick, Globe, Box, 
  Image as ImageIcon, FileText, Smartphone, Camera, Calendar, 
  ShoppingBag, Tag, MapPin, Zap, Users, PlayCircle, Code 
} from 'lucide-react';

const iconLibrary = {
  layout: LayoutTemplate, type: Type, wrench: Wrench, star: Star, 
  shield: ShieldCheck, message: MessageSquare, help: HelpCircle, 
  click: MousePointerClick, globe: Globe, box: Box, image: ImageIcon, 
  file: FileText, phone: Smartphone, camera: Camera, calendar: Calendar, 
  shop: ShoppingBag, tag: Tag, map: MapPin, zap: Zap, users: Users, 
  play: PlayCircle, code: Code
};

const HomePageOverview = () => {
  const dispatch = useDispatch();
  
  // Dynamic Section ID Logic
  const sidebarTree = useSelector((state) => state.adminData?.sidebarTree || []);
  const homeSectionInfo = sidebarTree.find(sec => sec.slug === 'home');
  const dynamicSectionId = homeSectionInfo?.id || 1; 

  const sections = useSelector((state) => state.adminData?.pageSections || []); 
  const isSectionsLoading = useSelector((state) => state.adminData?.isSectionsLoading); 

  useEffect(() => {
    if (dynamicSectionId) {
      dispatch(fetchPageSections(dynamicSectionId));
    }
  }, [dispatch, dynamicSectionId]);

  // --- Handlers ---

  const handleCreateModule = (newData) => {
    dispatch(createSubsection({ ...newData, section_id: dynamicSectionId }));
  };

  const handleUpdateModule = (dbId, currentSlug, updatedFields) => {
    dispatch(updateSubsectionConfig({ dbId, updatedFields }));
  };

  const handleDeleteModule = (dbId) => {
    dispatch(deleteSubsection(dbId));
  };

  const handleReorderModules = async (newOrderFromDnd) => {
    try {
      const orderedDbIds = newOrderFromDnd.map(item => Number(item.dbId));
      await AdminService.reorderSubsections(orderedDbIds);
      dispatch(fetchPageSections(dynamicSectionId)); 
    } catch (error) {
      console.error("Order update failed:", error);
    }
  };

const formattedSections = useMemo(() => {
  if (!Array.isArray(sections)) return [];
  
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);
  
  return sortedSections.map((item) => ({
    id: item.slug || `module-${item.id}`,                
    dbId: item.id,                
    name: item.subsectionName,    
    status: item.isActive ? 'Live' : 'Draft', 
    iconKey: item.icon || 'box',  
    isSystem: item.isSystem, 
    path: item.isSystem 
      ? `/admin/pages/home/${item.slug}/${item.id}` 
      : `/admin/pages/home/custom/${item.slug}/${item.id}`,
    theme: item.theme || 'indigo'
  }));
}, [sections]);

  if (isSectionsLoading && sections.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
        <span className="ml-3 mt-4 t-subtitle">Fetching Modules...</span>
      </div>
    );
  }
  
  return (
    <div className="relative">
      <PageManager 
        sectionId={dynamicSectionId}
        title={<>HOME <span className="text-brand-primary italic">SECTIONS.</span></>}
        defaultSections={formattedSections} 
        iconLibrary={iconLibrary}
        itemLabel="Module"
        onCreate={handleCreateModule}
        onUpdate={handleUpdateModule} 
        onDelete={handleDeleteModule}
        onReorder={handleReorderModules}
      />
    </div>
  );
};

export default HomePageOverview;