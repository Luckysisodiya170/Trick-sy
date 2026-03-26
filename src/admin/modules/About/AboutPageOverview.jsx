import React from 'react';
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

const defaultSections = [
  { id: 'about-hero', name: 'About Hero', status: 'Live', iconKey: 'hero', path: '/admin/pages/about/hero', color: 'text-blue-500', bg: 'bg-blue-50', theme: 'blue' },
  { id: 'about-mission', name: 'Our Mission', status: 'Live', iconKey: 'mission', path: '/admin/pages/about/mission', color: 'text-indigo-500', bg: 'bg-indigo-50', theme: 'indigo' },
  { id: 'about-values', name: 'Core Values', status: 'Live', iconKey: 'values', path: '/admin/pages/about/values', color: 'text-rose-500', bg: 'bg-rose-50', theme: 'rose' },
  { id: 'about-timeline', name: 'History Timeline', status: 'Live', iconKey: 'timeline', path: '/admin/pages/about/timeline', color: 'text-amber-500', bg: 'bg-amber-50', theme: 'amber' },
  { id: 'about-team', name: 'Our Team', status: 'Live', iconKey: 'team', path: '/admin/pages/about/team', color: 'text-emerald-500', bg: 'bg-emerald-50', theme: 'emerald' },
  { id: 'about-why-us', name: 'Why Choose Us', status: 'Live', iconKey: 'whyus', path: '/admin/pages/about/why-us', color: 'text-sky-500', bg: 'bg-sky-50', theme: 'sky' },
];

const AboutPageOverview = () => {
  return (
    <PageManager 
      title="About Sections"
      storageKey="tricksy_about_modules"
      defaultSections={defaultSections}
      iconLibrary={iconLibrary}
      baseRoute="/admin/pages/about"
      itemLabel="Block"
    />
  );
};

export default AboutPageOverview;