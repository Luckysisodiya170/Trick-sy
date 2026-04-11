import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSections, updateSubsection } from '../../../store/index';
import PageManager from '../../components/PageManager';
import {
  LayoutTemplate, FileText, Tags, Search, Globe, Box,
  Rss, MessageSquare, TrendingUp, Palette
} from 'lucide-react';

const iconLibrary = {
  hero: LayoutTemplate, articles: FileText, tags: Tags,
  globe: Globe, search: Search, box: Box, rss: Rss,
  comments: MessageSquare, trending: TrendingUp, designer: Palette
};

const BlogPageOverview = () => {
  const dispatch = useDispatch();
  
  const sections = useSelector((state) => state.sections.items);
  const status = useSelector((state) => state.sections.status);

  useEffect(() => {
    dispatch(fetchSections(5));
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
      ? `/admin/pages/blog/${item.slug}` 
      : `/admin/pages/blog/${item.slug}/${item.id}`,
    theme: item.theme,
    color: `text-${item.theme}-500`,
    bg: `bg-${item.theme}-50`
  }));

  if (status === 'loading' && sections.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        <span className="ml-3 text-slate-400 font-medium">Loading Blog Modules...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <PageManager 
        sectionId={5}
        title="BLOG MODULES"
        storageKey="tricksy_blog_modules"
        defaultSections={formattedSections}
        iconLibrary={iconLibrary}
        baseRoute="/admin/pages/blog"
        itemLabel="Module"
        onUpdate={handleUpdateModule}
      />
    </div>
  );
};

export default BlogPageOverview;