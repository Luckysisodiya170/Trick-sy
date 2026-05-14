import React from 'react';

const DynamicSection = ({ sectionData }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  if (!sectionData) return null;

  const { subsection, textContent, images } = sectionData;

  const extraImages = images || [];
  const mainImage = extraImages.length > 0 ? extraImages[0] : null;
  const remainingImages = extraImages.length > 1 ? extraImages.slice(1) : [];

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-10 lg:px-12">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          <div className="w-full lg:w-1/2 relative">
            {mainImage ? (
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-slate-50">
                <img 
                  src={mainImage.startsWith('http') ? mainImage : `${BACKEND_URL}${mainImage}`} 
                  alt={subsection?.subsectionName || "Section Image"} 
                  className="w-full h-[400px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              </div>
            ) : (
              <div className="w-full h-[400px] sm:h-[500px] rounded-[2rem] bg-slate-100 flex items-center justify-center border-4 border-dashed border-slate-200">
                <span className="text-slate-400 font-medium">No Cover Image</span>
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            {subsection && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-[11px] mb-6 shadow-sm uppercase tracking-wide">
                {subsection.subsectionName}
              </div>
            )}

            <div 
              className="prose prose-lg prose-indigo w-full max-w-none text-slate-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: textContent || "" }} 
            />

          </div>

        </div>

        {remainingImages.length > 0 && (
          <div className="mt-16 lg:mt-24 pt-12 border-t border-slate-100">
            <div className="flex flex-wrap gap-6 justify-center">
              {remainingImages.map((img, idx) => (
                <img 
                  key={`extra-img-${idx}`} 
                  src={img.startsWith('http') ? img : `${BACKEND_URL}${img}`} 
                  alt="Gallery" 
                  className="w-full max-w-sm h-64 rounded-2xl shadow-md object-cover border-4 border-white hover:shadow-xl transition-shadow"
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default DynamicSection;