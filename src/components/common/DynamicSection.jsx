import React from 'react';

const DynamicSection = ({ sectionData }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  if (!sectionData) return null;

  const { subsection, textContent, images } = sectionData;

  const imageFields = textContent?.fields?.filter(f => f.type === 'image') || [];
  const contentFields = textContent?.fields?.filter(f => f.type !== 'image') || [];

  const imagesUsedInFields = imageFields.map(f => f.value);
  let extraImages = images?.filter(img => !imagesUsedInFields.includes(img)) || [];

  const mainImage = imageFields.length > 0 
    ? imageFields[0].value 
    : (extraImages.length > 0 ? extraImages[0] : null);

  if (imageFields.length === 0 && extraImages.length > 0) {
    extraImages = extraImages.slice(1);
  }

  const renderContentField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <h3 key={field.id} className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
            {field.value}
          </h3>
        );
      
      case 'textarea':
        return (
          <p key={field.id} className="text-lg text-slate-600 mb-8 leading-relaxed">
            {field.value}
          </p>
        );
      
      case 'button':
        return (
          <div key={field.id} className="mb-6">
            <a 
              href={field.link || "#"} 
              className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white px-8 py-3.5 rounded-full font-bold transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:-translate-y-1"
            >
              {field.value || "Click Here"}
            </a>
          </div>
        );
      
      case 'divider':
        return (
          <div key={field.id} className="w-full h-px bg-slate-200 my-6"></div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-10 lg:px-12">
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* --- LEFT SIDE: Main Image --- */}
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
                <span className="text-slate-400 font-medium">No Image Uploaded</span>
              </div>
            )}
          </div>

          {/* --- RIGHT SIDE: Title, Desc, Button --- */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            
            {/* Optional Category/Badge Tag */}
            {subsection && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-[11px] mb-6 shadow-sm uppercase tracking-wide">
                {subsection.subsectionName}
              </div>
            )}

            {/* Loop rendering Text, Textarea, Button from Backend */}
            {contentFields.map((field) => renderContentField(field))}

          </div>

        </div>

        {/* --- BOTTOM SECTION: Extra Images --- */}
        {extraImages.length > 0 && (
          <div className="mt-16 lg:mt-24 pt-12 border-t border-slate-100">
            <div className="flex flex-wrap gap-6 justify-center">
              {extraImages.map((img, idx) => (
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