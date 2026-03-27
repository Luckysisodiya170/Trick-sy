import React from 'react';
import PageManager from '../../components/PageManager';
import { 
  LayoutTemplate, Phone, MessageSquare, MapPin, Box, 
  Mail, Smartphone, Send, Globe, Image as ImageIcon, ShieldCheck 
} from 'lucide-react';

const iconLibrary = {
  hero: LayoutTemplate, info: Phone, form: MessageSquare,
  map: MapPin, mail: Mail, mobile: Smartphone, send: Send,
  whyus: ShieldCheck, box: Box, globe: Globe, image: ImageIcon
};

const defaultSections = [
  { id: 'contact-hero', name: 'Contact Hero', status: 'Live', iconKey: 'hero', path: '/admin/pages/contact/hero', color: 'text-blue-500', bg: 'bg-blue-50', theme: 'blue' },
  { id: 'contact-info', name: 'Contact Information', status: 'Live', iconKey: 'info', path: '/admin/pages/contact/info', color: 'text-emerald-500', bg: 'bg-emerald-50', theme: 'emerald' },
  { id: 'contact-form', name: 'Contact Form', status: 'Live', iconKey: 'form', path: '/admin/pages/contact/form', color: 'text-indigo-500', bg: 'bg-indigo-50', theme: 'indigo' },
  { id: 'contact-map', name: 'Location Map', status: 'Live', iconKey: 'map', path: '/admin/pages/contact/map', color: 'text-rose-500', bg: 'bg-rose-50', theme: 'rose' },
];

const ContactPageOverview = () => {
  return (
    <PageManager 
      title="CONTACT SECTIONS"
      storageKey="tricksy_contact_modules"
      defaultSections={defaultSections}
      iconLibrary={iconLibrary}
      baseRoute="/admin/pages/contact"
      itemLabel="Block"
    />
  );
};

export default ContactPageOverview;