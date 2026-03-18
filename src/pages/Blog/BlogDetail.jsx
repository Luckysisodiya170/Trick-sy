import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, User, Loader2 } from 'lucide-react';
import SEO from '../../components/SEO';
import { blogPosts as dummyPosts } from '../../data/blogData';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchSinglePost = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.tricksy.com/v1/blogs/${slug}`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        setPost(data);
      } catch (error) {
        const fallbackPost = dummyPosts.find((p) => p.slug === slug);
        setPost(fallbackPost);
      } finally {
        setLoading(false);
      }
    };
    fetchSinglePost();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-20 bg-white">
      <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
    </div>
  );

  if (!post) return <Navigate to="/404" />;

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <SEO title={post.title} description={post.excerpt} />

      <article className="w-full max-w-[900px] mx-auto px-6">
        {/* Breadcrumb & Category */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <Link to="/blog" className="flex items-center gap-2 text-xs font-black text-zinc-400 hover:text-emerald-500 uppercase tracking-widest transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <span className="px-4 py-1.5 bg-zinc-950 text-white font-black text-[10px] uppercase tracking-widest rounded-full">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-black text-zinc-950 leading-[1.05] tracking-tighter mb-8 text-pretty">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-zinc-500 mb-12 border-y border-zinc-100 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black">T</div>
            <div className="flex flex-col">
               <span className="text-zinc-950 text-xs uppercase tracking-widest">TRICKSY Editor</span>
               <span className="text-[10px] text-zinc-400">{post.date}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto text-zinc-400">
            <Clock className="w-4 h-4" /> <span className="text-xs uppercase tracking-widest">{post.readTime}</span>
          </div>
        </div>

        {/* Image */}
        <figure className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </figure>

        <div className="max-w-[750px] mx-auto">
          <div className="prose prose-zinc prose-lg lg:prose-xl max-w-none">
            <p className="text-xl md:text-2xl text-zinc-600 font-medium leading-relaxed mb-10 first-letter:text-7xl first-letter:font-black first-letter:text-emerald-500 first-letter:mr-3 first-letter:float-left">
              {post.excerpt}
            </p>
            {/* remaining blog content */}
            <div className="text-zinc-700 leading-loose space-y-6">
              <p>Regular maintenance is the cornerstone of a healthy living environment. At Tricksy, we believe that a clean space fosters a clear mind and better productivity.</p>
              <blockquote className="border-l-8 border-emerald-500 bg-zinc-50 p-8 rounded-2xl text-2xl font-black text-zinc-950 italic">
                "Professional cleaning is not an expense; it's an investment in your well-being."
              </blockquote>
            </div>
          </div>

          {/* Social Share */}
          <div className="mt-16 pt-8 border-t border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-6 py-3 bg-zinc-50 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                 <Share2 className="w-4 h-4" /> Share Article
               </button>
            </div>
            <Link to="/contact" className="hidden sm:block text-emerald-600 font-black text-xs uppercase tracking-widest border-b-2 border-emerald-500">
              Book a session
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;