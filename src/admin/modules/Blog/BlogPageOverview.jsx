import React from 'react';
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

const defaultSections = [
  { id: 'blog-hero', name: 'Blog Header', status: 'Live', iconKey: 'hero', path: '/admin/pages/blog/hero', color: 'text-blue-500', bg: 'bg-blue-50', theme: 'blue' },
  { id: 'blog-posts', name: 'Manage Articles', status: 'Live', iconKey: 'articles', path: '/admin/pages/blog/posts', color: 'text-emerald-500', bg: 'bg-emerald-50', theme: 'emerald' },
  { id: 'blog-content', name: 'Article Designer', status: 'Live', iconKey: 'designer', path: '/admin/pages/blog/detail', color: 'text-violet-500', bg: 'bg-violet-50', theme: 'violet' },
  { id: 'blog-categories', name: 'Categories & Filters', status: 'Live', iconKey: 'tags', path: '/admin/pages/blog/categories', color: 'text-amber-500', bg: 'bg-amber-50', theme: 'amber' },
  { id: 'blog-seo', name: 'Blog SEO', status: 'Live', iconKey: 'globe', path: '/admin/pages/blog/seo', color: 'text-indigo-500', bg: 'bg-indigo-50', theme: 'indigo' },
];

const BlogPageOverview = () => {
  return (
    <PageManager 
      title="Blog Modules"
      storageKey="tricksy_blog_modules"
      defaultSections={defaultSections}
      iconLibrary={iconLibrary}
      baseRoute="/admin/pages/blog"
      itemLabel="Module"
    />
  );
};

export default BlogPageOverview;