// src/pages/Blog/BlogCard.jsx
import React from 'react';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  // Defensive check to prevent crashes if data is missing
  if (!post) return null;

  return (
    <article className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden hover:shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
      
      {/* Dynamic Image */}
      <div className="relative h-60 overflow-hidden bg-zinc-100">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black text-zinc-950 uppercase tracking-widest shadow-sm">
          {post.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs font-bold text-zinc-500 mb-4">
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/> {post.date}</span>
          <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4"/> {post.readTime}</span>
        </div>

        <h3 className="text-2xl font-black text-zinc-950 mb-3 leading-tight group-hover:text-emerald-600 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-zinc-500 font-medium leading-relaxed mb-6 flex-grow">
          {post.excerpt}
        </p>

        {/* Read More Link (Production Safe routing) */}
        <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-zinc-950 font-black text-sm uppercase tracking-widest hover:text-emerald-600 transition-colors mt-auto">
          Read Article <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;