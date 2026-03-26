import React from 'react';
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

const defaultSections = [
  { id: 'tech-hero', name: 'Technical Hero', status: 'Live', iconKey: 'hero', path: '/admin/pages/technical/hero', color: 'text-blue-500', bg: 'bg-blue-50', theme: 'blue' },
  { id: 'tech-domains', name: 'Expertise Domains', status: 'Live', iconKey: 'cards', path: '/admin/pages/technical/domains', color: 'text-indigo-500', bg: 'bg-indigo-50', theme: 'indigo' },
  { id: 'tech-specs', name: 'Technical Specs', status: 'Live', iconKey: 'specs', path: '/admin/pages/technical/specs', color: 'text-emerald-500', bg: 'bg-emerald-50', theme: 'emerald' },
  { id: 'tech-process', name: 'Service Process', status: 'Live', iconKey: 'process', path: '/admin/pages/technical/process', color: 'text-amber-500', bg: 'bg-amber-50', theme: 'amber' },
  { id: 'tech-pricing', name: 'Pricing Packages', status: 'Live', iconKey: 'pricing', path: '/admin/pages/technical/pricing', color: 'text-rose-500', bg: 'bg-rose-50', theme: 'rose' },
  { id: 'tech-faq', name: 'Tech FAQs', status: 'Live', iconKey: 'faq', path: '/admin/pages/technical/faq', color: 'text-violet-500', bg: 'bg-violet-50', theme: 'violet' },
  { id: 'tech-footer', name: 'Trust Footer', status: 'Live', iconKey: 'footer', path: '/admin/pages/technical/footer', color: 'text-sky-500', bg: 'bg-sky-50', theme: 'sky' },
];

const TechnicalPageOverview = () => {
  return (
    <PageManager 
      title="Technical Services"
      storageKey="tricksy_technical_modules"
      defaultSections={defaultSections}
      iconLibrary={iconLibrary}
      baseRoute="/admin/pages/technical"
      itemLabel="Block"
    />
  );
};

export default TechnicalPageOverview;