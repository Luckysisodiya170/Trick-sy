import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSections, updateSubsection } from '../../../store/index';
import PageManager from '../../components/PageManager';
import { 
  LayoutTemplate, PenTool, FileText, Activity, Layers, ListChecks,
  CreditCard, MessageCircleQuestion, ShieldCheck, Box,
  Wrench, Zap, Droplets, LayoutGrid, Scissors, Ruler
} from 'lucide-react';

const iconLibrary = {
  hero: LayoutTemplate, cards: Layers, process: Activity,
  specs: ListChecks, pricing: CreditCard, faq: MessageCircleQuestion,
  footer: ShieldCheck, tool: PenTool, file: FileText, box: Box,
  wrench: Wrench, zap: Zap, droplets: Droplets, grid: LayoutGrid, 
  scissors: Scissors, ruler: Ruler
};

const TechnicalPageOverview = () => {
  const dispatch = useDispatch();
  
  const sections = useSelector((state) => state.sections.items);
  const status = useSelector((state) => state.sections.status);

  useEffect(() => {
    dispatch(fetchSections(4));
  }, [dispatch]);

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
      ? `/admin/pages/technical/${item.slug}` 
      : `/admin/pages/technical/${item.slug}/${item.id}`,
    theme: item.theme,
    color: `text-${item.theme}-500`,
    bg: `bg-${item.theme}-50`
  }));

  if (status === 'loading' && sections.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        <span className="ml-3 text-slate-400 font-medium">Loading Technical Modules...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <PageManager 
        sectionId={4}
        title="TECHNICAL SERVICES"
        storageKey="tricksy_technical_modules"
        defaultSections={formattedSections} 
        iconLibrary={iconLibrary}
        baseRoute="/admin/pages/technical"
        itemLabel="Block"
        onUpdate={handleUpdateModule} 
      />
    </div>
  );
};

export default TechnicalPageOverview;