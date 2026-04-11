import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSections, updateSubsection } from '../../../store/index';
import PageManager from '../../components/PageManager';
import { 
  Sparkles, Wind, Building2, Armchair, Paintbrush, 
  Wrench, Box, ShieldCheck, Zap, Star, LayoutTemplate,
  Target, Heart, Milestone, Users, Globe, FileText, PlayCircle, Code
} from 'lucide-react';

const iconLibrary = {
  sparkles: Sparkles, wind: Wind, building: Building2,
  armchair: Armchair, brush: Paintbrush, wrench: Wrench,
  box: Box, shield: ShieldCheck, zap: Zap, star: Star,
  hero: LayoutTemplate, target: Target, heart: Heart,
  milestone: Milestone, users: Users, globe: Globe,
  file: FileText, play: PlayCircle, code: Code
};

const ServicesPageOverview = () => {
  const dispatch = useDispatch();
  
  const sections = useSelector((state) => state.sections.items);
  const status = useSelector((state) => state.sections.status);

  useEffect(() => {
    dispatch(fetchSections(3));
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
      ? `/admin/pages/services/${item.slug}` 
      : `/admin/pages/services/${item.slug}/${item.id}`,
    theme: item.theme,
    color: `text-${item.theme}-500`,
    bg: `bg-${item.theme}-50`
  }));

  if (status === 'loading' && sections.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        <span className="ml-3 text-slate-400 font-medium">Loading Services...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <PageManager 
        sectionId={3}
        title="SERVICE MANAGER"
        storageKey="tricksy_services_manager"
        defaultSections={formattedSections}
        iconLibrary={iconLibrary}
        baseRoute="/admin/pages/services"
        itemLabel="Service"
        onUpdate={handleUpdateModule}
      />
    </div>
  );
};

export default ServicesPageOverview;