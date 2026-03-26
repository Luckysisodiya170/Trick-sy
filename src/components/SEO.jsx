import React from 'react';
import { Helmet } from 'react-helmet-async';
import logo from "../assets/logo.png"; 

const SEO = ({ title, description, keywords, image }) => {
  const siteTitle = "TRICKSY | Premium Maintenance Services";
  const defaultDesc = "Premium home, office, and AC duct cleaning maintenance services in Dubai.";
  const defaultKeywords = "deep cleaning services, home cleaning, office cleaning, AC duct cleaning, maintenance services";
  const defaultImage = logo; 
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Helmet>
      <title>{title ? `${title} | TRICKSY` : siteTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content="TRICKSY Dubai" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={currentUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image || defaultImage} />

      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default SEO;