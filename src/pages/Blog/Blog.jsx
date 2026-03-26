import React, { useState, useEffect } from 'react';
import BlogHero from './BlogHero';
import BlogCard from './BlogCard';
import BlogCategories from './BlogCategories'; 
import { Loader2 } from 'lucide-react';
import { blogPosts as dummyPosts } from '../../data/blogData';
import SEO from '../../components/SEO'; 

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.tricksy.com/v1/blogs');
        if (!response.ok) throw new Error("Backend Error");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log("Using Fallback Dummy Data");
        setPosts(dummyPosts); 
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const categories = ['All', ...new Set(posts.map(post => post.category).filter(Boolean))];

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="bg-zinc-50 min-h-screen pt-20 pb-24">
      
      <SEO 
        title="Blog & Insights" 
        description="Discover expert tips, industry news, and comprehensive guides on premium maintenance from the TRICKSY professionals."
      />

      <BlogHero />

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-20 -mt-10">
        
        {!loading && posts.length > 0 && (
          <div className="mb-10 flex justify-center">
            <BlogCategories 
              categories={categories} 
              activeCategory={selectedCategory} 
              onCategorySelect={setSelectedCategory} 
            />
          </div>
        )}

        {/* Posts Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] shadow-sm border border-zinc-100">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mb-4" />
            <p className="font-black text-zinc-950 uppercase tracking-widest text-sm">Fetching Insights...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id || post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-zinc-200">
            <h3 className="text-2xl font-black text-zinc-950">No Articles Found</h3>
            <p className="text-zinc-500 mt-2 font-medium">Try selecting a different category.</p>
            <button 
               onClick={() => setSelectedCategory('All')}
               className="mt-6 px-6 py-2.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black uppercase tracking-widest"
            >
               View All Posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;