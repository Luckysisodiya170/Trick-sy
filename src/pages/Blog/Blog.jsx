import React, { useState, useEffect } from 'react';
import BlogHero from './BlogHero';
import BlogCard from './BlogCard';
import { Loader2 } from 'lucide-react';

// Fallback Data
import { blogPosts as dummyPosts } from '../../data/blogData';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        // 🔥 PRODUCTION RULE: Pehle Backend API try karo
        const response = await fetch('https://api.tricksy.com/v1/blogs');
        if (!response.ok) throw new Error("Backend Error");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log("Using Fallback Dummy Data");
        setPosts(dummyPosts); // API fail hui toh dummy data dikhao
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-zinc-50 min-h-screen pt-20 pb-24">
      <BlogHero />

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-20 -mt-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] shadow-sm border border-zinc-100">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mb-4" />
            <p className="font-black text-zinc-950 uppercase tracking-widest text-sm">Fetching Insights...</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id || post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-zinc-200">
            <h3 className="text-2xl font-black text-zinc-950">No Articles Found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;