import React from 'react';
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

const defaultServices = [
  { id: 'srv-deep-cleaning', name: 'Deep Cleaning', status: 'Live', iconKey: 'sparkles', path: '/admin/pages/services/deep-cleaning', color: 'text-emerald-500', bg: 'bg-emerald-50', theme: 'emerald' },
  { id: 'srv-ac-duct', name: 'AC Duct Cleaning', status: 'Live', iconKey: 'wind', path: '/admin/pages/services/ac-duct-cleaning', color: 'text-blue-500', bg: 'bg-blue-50', theme: 'blue' },
  { id: 'srv-commercial', name: 'Commercial Cleaning', status: 'Live', iconKey: 'building', path: '/admin/pages/services/commercial-cleaning', color: 'text-amber-500', bg: 'bg-amber-50', theme: 'amber' },
  { id: 'srv-upholstery', name: 'Upholstery Cleaning', status: 'Live', iconKey: 'armchair', path: '/admin/pages/services/upholstery-cleaning', color: 'text-rose-500', bg: 'bg-rose-50', theme: 'rose' },
  { id: 'srv-painting', name: 'Painting Services', status: 'Live', iconKey: 'brush', path: '/admin/pages/services/painting-services', color: 'text-violet-500', bg: 'bg-violet-50', theme: 'violet' },
  { id: 'srv-handyman', name: 'Handyman Services', status: 'Live', iconKey: 'wrench', path: '/admin/pages/services/handyman-services', color: 'text-orange-500', bg: 'bg-orange-50', theme: 'amber' }, 
];

const ServicesPageOverview = () => {
  return (
    <PageManager 
      title="Services Manager"
      storageKey="tricksy_services_manager"
      defaultSections={defaultServices}
      iconLibrary={iconLibrary}
      baseRoute="/admin/pages/services"
      itemLabel="Service"
    />
  );
};

export default ServicesPageOverview;