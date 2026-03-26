import React from 'react';
import PageManager from '../../components/PageManager';
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

const defaultSections = [
  { id: 'hero', name: 'Hero Banner', status: 'Live', iconKey: 'layout', path: '/admin/pages/home/hero', color: 'text-blue-500', bg: 'bg-blue-50', theme: 'blue' },
  { id: 'about', name: 'About Us', status: 'Live', iconKey: 'type', path: '/admin/pages/home/about', color: 'text-indigo-500', bg: 'bg-indigo-50', theme: 'indigo' },
  { id: 'services', name: 'Services Grid', status: 'Live', iconKey: 'wrench', path: '/admin/pages/home/services', color: 'text-emerald-500', bg: 'bg-emerald-50', theme: 'emerald' },
  { id: 'popular', name: 'Popular Services', status: 'Live', iconKey: 'star', path: '/admin/pages/home/popular', color: 'text-amber-500', bg: 'bg-amber-50', theme: 'amber' },
  { id: 'why-us', name: 'Why Us Section', status: 'Live', iconKey: 'shield', path: '/admin/pages/home/why-us', color: 'text-rose-500', bg: 'bg-rose-50', theme: 'rose' },
  { id: 'testimonials', name: 'Testimonials', status: 'Live', iconKey: 'message', path: '/admin/pages/home/testimonials', color: 'text-sky-500', bg: 'bg-sky-50', theme: 'sky' },
  { id: 'faq', name: 'FAQ Section', status: 'Live', iconKey: 'help', path: '/admin/pages/home/faq', color: 'text-violet-500', bg: 'bg-violet-50', theme: 'violet' },
  { id: 'cta', name: 'Call to Action', status: 'Live', iconKey: 'click', path: '/admin/pages/home/cta', color: 'text-fuchsia-500', bg: 'bg-fuchsia-50', theme: 'fuchsia' },
  { id: 'google', name: 'Google Reviews', status: 'Live', iconKey: 'globe', path: '/admin/pages/home/reviews', color: 'text-cyan-500', bg: 'bg-cyan-50', theme: 'cyan' },
];

const HomePageOverview = () => {
  return (
    <PageManager 
      title="Home Section"
      storageKey="tricksy_home_modules"
      defaultSections={defaultSections}
      iconLibrary={iconLibrary}
      baseRoute="/admin/pages/home"
      itemLabel="Module"
    />
  );
};

export default HomePageOverview;