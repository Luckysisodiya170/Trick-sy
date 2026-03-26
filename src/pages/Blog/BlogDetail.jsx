import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Clock, ArrowLeft, Loader2 } from 'lucide-react';
import SEO from '../../components/SEO'; 
import { blogPosts as dummyPosts } from '../../data/blogData';

const BlogDetail = ({ previewData }) => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (previewData) {
      setPost(previewData);
      setLoading(false);
      return;
    }

    const fetchSinglePost = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.tricksy.com/v1/blogs/${slug}`);
        if (!response.ok) throw new Error("Not found");
        const data = await response.json();
        setPost(data);
      } catch (error) {
        const fallback = dummyPosts.find((p) => p.slug === slug);
        setPost(fallback);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSinglePost();
  }, [slug, previewData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
      </div>
    );
  }
  
  if (!post) return <Navigate to="/404" />;

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <SEO title={post.title} description={post.excerpt} />
      
      <article className="w-full max-w-[900px] mx-auto px-6">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-10">
          <Link to="/blog" className="flex items-center gap-2 text-xs font-black text-zinc-400 hover:text-emerald-500 uppercase tracking-widest transition-all">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <span className="px-4 py-1.5 bg-zinc-950 text-white font-black text-[10px] uppercase tracking-widest rounded-full">
            {post.category}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-zinc-950 leading-[1.05] tracking-tighter mb-8">
          {post.title}
        </h1>

        {/* Author & Meta */}
        <div className="flex items-center gap-6 text-sm font-bold text-zinc-500 mb-12 border-y border-zinc-100 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black">T</div>
            <div className="flex flex-col">
              <span className="text-zinc-950 text-xs uppercase tracking-widest">TRICKSY Editor</span>
              <span className="text-[10px] text-zinc-400">{post.date}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto text-zinc-400">
            <Clock size={16} /> <span className="text-xs uppercase tracking-widest">{post.readTime}</span>
          </div>
        </div>

        {/* Hero Image */}
        <figure className="w-full aspect-video rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl bg-zinc-100">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </figure>

        {/* Post Content */}
        <div className="max-w-[750px] mx-auto space-y-10">
          <p className="text-xl md:text-2xl text-zinc-600 font-medium leading-relaxed first-letter:text-7xl first-letter:font-black first-letter:text-emerald-500 first-letter:mr-3 first-letter:float-left">
            {post.excerpt}
          </p>

          {/* Render dynamic blocks if they exist */}
          {post.blocks?.map((block, index) => (
            <div key={index}>
              {block.type === 'subheading' && <h2 className="text-3xl font-black text-zinc-950 tracking-tight mt-12">{block.value}</h2>}
              {block.type === 'paragraph' && <p className="text-zinc-600 leading-loose text-lg">{block.value}</p>}
              {block.type === 'quote' && (
                <blockquote className="border-l-8 border-emerald-500 bg-zinc-50 p-8 rounded-2xl text-2xl font-black text-zinc-950 italic">
                  "{block.value}"
                </blockquote>
              )}
              {block.type === 'image' && (
                <figure className="my-10 rounded-3xl overflow-hidden border border-zinc-100 shadow-lg">
                  <img src={block.value} alt="article segment" className="w-full" />
                </figure>
              )}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;