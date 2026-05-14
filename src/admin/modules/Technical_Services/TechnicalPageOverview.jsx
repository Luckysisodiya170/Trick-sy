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
  LayoutTemplate, PenTool, FileText, Activity, Layers, ListChecks,
  CreditCard, MessageCircleQuestion, ShieldCheck, Box,
  Wrench, Zap, Droplets, LayoutGrid, Scissors, Ruler, Loader2
} from 'lucide-react';

const iconLibrary = {
  hero: LayoutTemplate, cards: Layers, process: Activity,
  specs: ListChecks, pricing: CreditCard, faq: MessageCircleQuestion,
  footer: ShieldCheck, tool: PenTool, file: FileText, box: Box,
  wrench: Wrench, zap: Zap, droplets: Droplets, grid: LayoutGrid, 
  scissors: Scissors, ruler: Ruler
};

const getSafeThemeClasses = (theme) => {
  const themeMap = {
    indigo: { color: 'text-indigo-500', bg: 'bg-indigo-50' },
    emerald: { color: 'text-emerald-500', bg: 'bg-emerald-50' },
    rose: { color: 'text-rose-500', bg: 'bg-rose-50' },
    amber: { color: 'text-amber-500', bg: 'bg-amber-50' },
    blue: { color: 'text-blue-500', bg: 'bg-blue-50' },
    slate: { color: 'text-slate-500', bg: 'bg-slate-50' },
  };
  return themeMap[theme] || themeMap.emerald; // Defaulting to emerald for Tech
};

const TechnicalPageOverview = () => {
  const dispatch = useDispatch();
  
  // Dynamic Section ID Logic 
  const sidebarTree = useSelector((state) => state.adminData?.sidebarTree || []);
  const techSectionInfo = sidebarTree.find(sec => sec.slug === 'technical');
  const dynamicSectionId = techSectionInfo?.id || 4; // 4 is fallback for Technical

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

  // Memoized Sorting & Mapping
  const formattedSections = useMemo(() => {
    if (!Array.isArray(sections)) return [];
    
    const sortedSections = [...sections].sort((a, b) => a.order - b.order);
    
    return sortedSections.map((item) => {
      const safeTheme = getSafeThemeClasses(item.theme);
      
      return {
        id: item.slug || `module-${item.id}`,                
        dbId: item.id,                
        name: item.subsectionName,    
        status: item.isActive ? 'Live' : 'Draft', 
        iconKey: item.icon || 'tool',  
        isSystem: item.isSystem, 
        path: item.isSystem 
          ? `/admin/pages/technical/${item.slug}/${item.id}` 
          : `/admin/pages/technical/custom/${item.slug}/${item.id}`,
        theme: item.theme || 'emerald',
        color: safeTheme.color,
        bg: safeTheme.bg
      };
    });
  }, [sections]);

  if (isSectionsLoading && sections.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500 mb-3" size={32} />
        <span className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
          FETCHING TECH MODULES...
        </span>
      </div>
    );
  }
  
  return (
    <div className="relative selection:bg-emerald-100">
      <PageManager 
        sectionId={dynamicSectionId}
        title={<>TECHNICAL <span className="text-emerald-500 italic">SECTIONS.</span></>}
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

export default TechnicalPageOverview;