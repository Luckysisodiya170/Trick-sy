import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSections, updateSubsection } from '../../../store/index';
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

const ContactPageOverview = () => {
  const dispatch = useDispatch();
  
  const sections = useSelector((state) => state.sections.items);
  const status = useSelector((state) => state.sections.status);

  useEffect(() => {
    dispatch(fetchSections(6));
  }, [dispatch]);

  const handleUpdateModule = (dbId, currentSlug, updatedFields) => {
    dispatch(updateSubsection({ dbId, updatedFields }));
  };

  const formattedSections = (sections || []).map((item) => {
    const isTerms = item.slug === 'terms-and-conditions';
    const isPrivacy = item.slug === 'privacy-policy';

    let finalPath;
    if (isTerms) {
      finalPath = `/admin/pages/contact/terms-and-conditions`;
    } else if (isPrivacy) {
      finalPath = `/admin/pages/contact/privacy-policy`;
    } else {
      finalPath = item.isSystem 
        ? `/admin/pages/contact/${item.slug}` 
        : `/admin/pages/contact/${item.slug}/${item.id}`;
    }

    return {
      id: item.slug,
      dbId: item.id,
      name: item.subsectionName,
      status: item.isActive ? 'Live' : 'Draft',
      iconKey: item.icon,
      isSystem: item.isSystem,
      path: finalPath,
      theme: item.theme,
      color: `text-${item.theme}-500`,
      bg: `bg-${item.theme}-50`
    };
  });

  if (status === 'loading' && sections.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        <span className="ml-3 text-slate-400 font-medium">Loading Contact Modules...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <PageManager 
        sectionId={6}
        title="CONTACT SECTIONS"
        storageKey="tricksy_contact_modules"
        defaultSections={formattedSections}
        iconLibrary={iconLibrary}
        baseRoute="/admin/pages/contact"
        itemLabel="Block"
        onUpdate={handleUpdateModule}
      />
    </div>
  );
};

export default ContactPageOverview;