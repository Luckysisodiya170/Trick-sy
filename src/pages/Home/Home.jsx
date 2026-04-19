import React, { useState, useEffect } from 'react';
import SEO from '../../components/SEO'; 
import Hero from './Hero'; 
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import PopularServices from './PopularServices';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from "./Testimonials";
import FaqSection from "./FAQ";
import CtaSection from './CtaSection';
import GoogleReviews from './GoogleReviews';
import DynamicSection from '../../components/common/DynamicSection';

const Home = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [allContent, setAllContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/test/getHomeData`); 
        const result = await response.json();
        
        if (result.success) { 
          console.log(result.data);
          setAllContent(result.data);
        }
      } catch (error) {
        console.error("Home data fetch error:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchHomeContent();
  }, [BACKEND_URL]);

  // Loading state
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-brand-primary font-bold text-xl animate-bounce">Loading Tricksy...</div>
      </div>
    );
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) return undefined;
    return imagePath.startsWith('http') 
      ? imagePath 
      : `${BACKEND_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };
const knownSectionIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 

const dynamicExtraSections = allContent.filter(
  (item) => !knownSectionIds.includes(item.subsectionId)
);
  // 1. Hero
  const heroRaw = allContent.find(i => i.subsectionId === 1);
  console.log("Home Content: Hero", heroRaw);
  const heroProps = heroRaw ? {
    ...heroRaw.textContent, 
    backendImages: heroRaw.images?.map(img => getImageUrl(img)) || []
  } : null;
  

  // 2. About 
  const aboutRaw = allContent.find(i => i.subsectionId === 2);

  // 3. Services
  const servicesRaw = allContent.find(i => i.subsectionId === 3);
  const servicesProps = servicesRaw ? {
    ...servicesRaw.textContent, 
    backendImages: servicesRaw.images?.map(img => getImageUrl(img)) || []
  } : null;

  const popularServicesRaw = allContent.find(i => i.subsectionId === 4);
  const popularServicesProps = popularServicesRaw ? {
    ...popularServicesRaw.textContent, 
    backendImages: popularServicesRaw.images?.map(img => getImageUrl(img)) || []
  } : null;

  return (
    <div className="w-full flex flex-col">
      <SEO 
        title="Home | Tricksy" 
        description="Premium home and office maintenance services in Dubai." 
      />

      <Hero heroData={heroProps} />
      
      <AboutSection aboutData={aboutRaw} />
      
      <ServicesSection servicesData={servicesProps} />
      
      <PopularServices servicesData={popularServicesProps} />
      <WhyChooseUs />
      <Testimonials />
      <FaqSection />
      <CtaSection />
      <GoogleReviews />

      {dynamicExtraSections.map((extraSection) => (
      <DynamicSection 
        key={extraSection.id} 
        sectionData={extraSection} 
      />
    ))}
    </div>
  );
};

export default Home;