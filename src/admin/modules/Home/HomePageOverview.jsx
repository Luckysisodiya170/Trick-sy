import React, { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSections, updateSubsection } from '../../../store/index'; 
import PageManager from '../../components/PageManager';
import { 
  LayoutTemplate, Type, Wrench, Star, ShieldCheck, 
  MessageSquare, HelpCircle, MousePointerClick, Globe, Box, 
  Image as ImageIcon, FileText, Smartphone, Camera, Calendar, 
  ShoppingBag, Tag, MapPin, Zap, Users, PlayCircle, Code, LogOut
} from 'lucide-react';

const iconLibrary = {
  layout: LayoutTemplate, type: Type, wrench: Wrench, star: Star, 
  shield: ShieldCheck, message: MessageSquare, help: HelpCircle, 
  click: MousePointerClick, globe: Globe, box: Box, image: ImageIcon, 
  file: FileText, phone: Smartphone, camera: Camera, calendar: Calendar, 
  shop: ShoppingBag, tag: Tag, map: MapPin, zap: Zap, users: Users, 
  play: PlayCircle, code: Code
};

const HomePageOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  const sections = useSelector((state) => state.sections.items);
  const status = useSelector((state) => state.sections.status);

  useEffect(() => {
    // Fetching Home Page Sections (ID: 1)
    dispatch(fetchSections(1));
  }, [dispatch]);

  const handleUpdateModule = (dbId, currentSlug, updatedFields) => {
    dispatch(updateSubsection({ dbId, updatedFields }));
  };

  const handleLogout = () => {
    localStorage.removeItem('tricksyAdminToken');
    navigate('/admin/login');
  };


const formattedSections = sections.map((item) => ({
  id: item.slug,                
  dbId: item.id,                
  name: item.subsectionName,    
  status: item.isActive ? 'Live' : 'Draft', 
  iconKey: item.icon,  
  isSystem: item.isSystem,        
  
  
  path: item.isSystem 
    ? `/admin/pages/home/${item.slug}` 
    : `/admin/pages/home/${item.slug}/${item.id}`, 
  
  theme: item.theme,
  color: `text-${item.theme}-500`,         
  bg: `bg-${item.theme}-50`                
}));

  if (status === 'loading' && sections.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        <span className="ml-3 text-slate-400 font-medium">Loading Command Modules...</span>
      </div>
    );
  }
  
  return (
    <div className="relative">
     

      <PageManager 
      sectionId={1}
        title="HOME SECTIONS"
        storageKey="tricksy_home_modules"
        defaultSections={formattedSections} 
        iconLibrary={iconLibrary}
        baseRoute="/admin/pages/home"
        itemLabel="Module"
        onUpdate={handleUpdateModule} 
      />
    </div>
  );
};

export default HomePageOverview;