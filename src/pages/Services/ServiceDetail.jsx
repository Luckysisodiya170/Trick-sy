import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import SEO from '../../components/SEO';
import { servicesData } from '../../data/servicesData';

import deepclean from "../../assets/serviceimage/Deep-cleaning.png";
import acmaintain from "../../assets/serviceimage/ac-maintainance.png";
import plumbing from "../../assets/serviceimage/plumbing.png";
import Electric from "../../assets/serviceimage/electric.png";
import pest from "../../assets/serviceimage/pest.png";
import handy from "../../assets/serviceimage/image.png";

// Import Components
import ServiceHero from './ServiceHero';
import ServiceIncludes from './ServiceIncludes';
import ServiceProcess from './ServiceProcess';
import ServicePricing from './ServicePricing';
import ServiceFaq from './ServiceFaq';

const ServiceDetail = ({ previewData, previewSection }) => {
  const { serviceId } = useParams(); 
  
  const [serviceInfo, setServiceInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getServiceImage = (id) => {
    switch (id) {
      case 'deep-cleaning': return deepclean;
      case 'ac-duct-cleaning': return acmaintain;
      case 'commercial-cleaning': return plumbing;
      case 'upholstery-cleaning': return Electric;
      case 'painting-services': return pest;
      case 'handyman-services': return handy;
      default: return deepclean;
    }
  };

  useEffect(() => {
    if (!previewSection) {
      window.scrollTo(0, 0);
    }
    
    let isMounted = true; 
    setIsLoading(true);
    
    if (previewData) {
      setServiceInfo(previewData);
      setIsLoading(false);
      return;
    }

    const fetchServiceData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 300)); 
        if (isMounted) {
          setServiceInfo(servicesData[serviceId] || null);
        }
      } catch (error) {
        console.log("Error loading service data:", error.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchServiceData();

    return () => { isMounted = false; };
  }, [serviceId, previewData, previewSection]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 pt-20">
         <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
            <p className="font-black text-zinc-950 uppercase tracking-widest text-sm animate-pulse">
              Loading Service...
            </p>
         </div>
      </div>
    );
  }

  if (!serviceInfo) return <Navigate to="/404" />;

  const currentHeroImage = getServiceImage(serviceId);

  return (
    <div className={`bg-white ${!previewSection ? 'min-h-screen pt-20' : ''}`}>
      {!previewSection && (
        <SEO 
          title={serviceInfo.title} 
          description={serviceInfo.description} 
          keywords={`${serviceInfo.title}, deep cleaning services, home cleaning`} 
        />
      )}

      {(!previewSection || previewSection === 'hero') && <ServiceHero serviceInfo={serviceInfo} currentHeroImage={currentHeroImage} />}
      {(!previewSection || previewSection === 'includes') && <ServiceIncludes serviceInfo={serviceInfo} />}
      {(!previewSection || previewSection === 'process') && <ServiceProcess serviceInfo={serviceInfo} />}
      {(!previewSection || previewSection === 'pricing') && <ServicePricing serviceInfo={serviceInfo} />}
      {(!previewSection || previewSection === 'faq') && <ServiceFaq serviceInfo={serviceInfo} />}
      
    </div>
  );
};

export default ServiceDetail;