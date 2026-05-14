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
  LayoutTemplate, FileText, Tags, Search, Globe, Box, 
  Rss, MessageSquare, TrendingUp, Palette 
} from 'lucide-react';

const iconLibrary = {
  hero: LayoutTemplate, articles: FileText, tags: Tags,
  globe: Globe, search: Search, box: Box, rss: Rss,
  comments: MessageSquare, trending: TrendingUp, designer: Palette
};

const BlogPageOverview = () => {
  const dispatch = useDispatch();
  
  // 1. DYNAMIC ID LOGIC
  const sidebarTree = useSelector((state) => state.adminData?.sidebarTree || []);
  const blogSectionInfo = sidebarTree.find(sec => sec.slug === 'blog');
  const dynamicSectionId = blogSectionInfo?.id || 5; 

  // 2. REDUX SELECTORS
  const sections = useSelector((state) => state.adminData?.pageSections || []);
  const isLoading = useSelector((state) => state.adminData?.isSectionsLoading);

  useEffect(() => {
    if (dynamicSectionId) {
      dispatch(fetchPageSections(dynamicSectionId));
    }
  }, [dispatch, dynamicSectionId]);

  // --- Handlers) ---

  const handleCreateModule = (newData) => {
    dispatch(createSubsection({ ...newData, section_id: dynamicSectionId }));
  };

  const handleUpdateModule = (dbId, currentSlug, updatedFields) => {
    dispatch(updateSubsectionConfig({ dbId, updatedFields }));
  };

  const handleDeleteModule = (dbId) => {
    if(window.confirm("Are you sure you want to delete this Blog module?")) {
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
      console.error("Blog Reorder failed:", error);
    }
  };

  // 3. DATA FORMATTING FOR PAGEMANAGER
const formattedSections = useMemo(() => {
    if (!Array.isArray(sections)) return [];
    
    const sortedSections = [...sections].sort((a, b) => a.order - b.order);
    
    return sortedSections.map((item) => ({
      id: item.slug || `blog-sec-${item.id}`,
      dbId: item.id,
      name: item.subsectionName,
      status: item.isActive ? 'Live' : 'Draft',
      iconKey: item.icon || 'file',
      isSystem: item.isSystem,
      
      path: item.isSystem 
        ? `/admin/pages/blog/${item.slug}/${item.id}` 
        : `/admin/pages/blog/custom/${item.slug}/${item.id}`,
        
      theme: item.theme || 'sky'
    }));
  }, [sections]);

  // 4. LOADING STATE
  if (isLoading && sections.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
        <span className="ml-3 mt-4 text-xs font-black uppercase tracking-widest text-slate-400">
          Syncing Blog Modules...
        </span>
      </div>
    );
  }

  return (
    <div className="relative animate-in fade-in duration-500">
      <PageManager 
        sectionId={dynamicSectionId}
        title={<>BLOG <span className="text-sky-500 italic uppercase">Modules.</span></>}
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

export default BlogPageOverview;