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
  LayoutTemplate, Phone, MessageSquare, MapPin, Box, 
  Mail, Smartphone, Send, Globe, Image as ImageIcon, ShieldCheck 
} from 'lucide-react';

const iconLibrary = {
  hero: LayoutTemplate, info: Phone, form: MessageSquare,
  map: MapPin, mail: Mail, mobile: Smartphone, send: Send,
  whyus: ShieldCheck, box: Box, globe: Globe, image: ImageIcon
};

const ContactPageOverview = () => {
  const dispatch = useDispatch();
  
  // 1. DYNAMIC SECTION ID
  const sidebarTree = useSelector((state) => state.adminData?.sidebarTree || []);
  const contactSectionInfo = sidebarTree.find(sec => sec.slug === 'contact');
  const dynamicSectionId = contactSectionInfo?.id || 6; 

  // 2. REDUX SELECTORS
  const sections = useSelector((state) => state.adminData?.pageSections || []);
  const isSectionsLoading = useSelector((state) => state.adminData?.isSectionsLoading);

  useEffect(() => {
    if (dynamicSectionId) {
      dispatch(fetchPageSections(dynamicSectionId));
    }
  }, [dispatch, dynamicSectionId]);

  // --- HANDLERS (CRUD & Ordering) ---

  const handleCreateModule = (newData) => {
    dispatch(createSubsection({ ...newData, section_id: dynamicSectionId }));
  };

  const handleUpdateModule = (dbId, currentSlug, updatedFields) => {
    dispatch(updateSubsectionConfig({ dbId, updatedFields }));
  };

  const handleDeleteModule = (dbId) => {
    if(window.confirm("Are you sure you want to delete this Contact module?")) {
        dispatch(deleteSubsection(dbId));
    }
  };

  const handleReorderModules = async (newOrderFromDnd) => {
    try {
      const orderedDbIds = newOrderFromDnd.map(item => Number(item.dbId));
      await AdminService.reorderSubsections(orderedDbIds);
      dispatch(fetchPageSections(dynamicSectionId)); 
    } catch (error) {
      console.error("Contact Reorder failed:", error);
    }
  };

  // 3. DATA FORMATTING (Mapping sections for PageManager)
  const formattedSections = useMemo(() => {
    if (!Array.isArray(sections)) return [];
    
    const sortedSections = [...sections].sort((a, b) => a.order - b.order);
    
    return sortedSections.map((item) => {
      const isTerms = item.slug === 'terms-and-conditions';
      const isPrivacy = item.slug === 'privacy-policy';

      let finalPath;
      if (isTerms) {
        finalPath = `/admin/pages/contact/terms-and-conditions/${item.id}`;
      } else if (isPrivacy) {
        finalPath = `/admin/pages/contact/privacy-policy/${item.id}`;
      } else {
        finalPath = item.isSystem 
          ? `/admin/pages/contact/${item.slug}/${item.id}` 
          : `/admin/pages/contact/custom/${item.slug}/${item.id}`;
      }

      return {
        id: item.slug || `contact-sec-${item.id}`,
        dbId: item.id,
        name: item.subsectionName,
        status: item.isActive ? 'Live' : 'Draft',
        iconKey: item.icon || 'mail',
        isSystem: item.isSystem,
        path: finalPath,
        theme: item.theme || 'rose'
      };
    });
  }, [sections]);

  // 4. LOADING STATE
  if (isSectionsLoading && sections.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
        <span className="ml-3 mt-4 text-xs font-black uppercase tracking-widest text-slate-400">
          Syncing Contact Modules...
        </span>
      </div>
    );
  }

  return (
    <div className="relative animate-in fade-in duration-500">
      <PageManager 
        sectionId={dynamicSectionId}
        title={<>CONTACT <span className="text-rose-500 italic uppercase">Sections.</span></>}
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

export default ContactPageOverview;