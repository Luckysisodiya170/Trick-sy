import React from 'react';
import { LayoutGrid } from 'lucide-react';

const BlogCategories = ({ categories = [], activeCategory = 'All', onCategorySelect }) => {
  const displayCategories = categories.map(cat => typeof cat === 'string' ? cat : cat.name);
  
  const finalCategories = displayCategories.includes('All') ? displayCategories : ['All', ...displayCategories];

  return (
    <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-zinc-100 flex items-center overflow-x-auto no-scrollbar gap-3 mx-auto w-fit max-w-full">
      <div className="pl-2 pr-4 flex items-center gap-2 border-r border-zinc-100 text-zinc-400 shrink-0">
         <LayoutGrid size={16} />
         <span className="text-[10px] font-black uppercase tracking-widest">Filter:</span>
      </div>
      
      {finalCategories.map((catName, index) => (
        <button
          key={`${catName}-${index}`}
          onClick={() => onCategorySelect && onCategorySelect(catName)}
          className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shrink-0 ${
            activeCategory === catName 
              ? 'bg-zinc-950 text-white shadow-md' 
              : 'bg-zinc-50 text-zinc-500 hover:bg-emerald-50 hover:text-emerald-600'
          }`}
        >
          {catName}
        </button>
      ))}
    </div>
  );
};

export default BlogCategories;