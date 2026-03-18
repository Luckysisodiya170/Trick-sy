import React from 'react';
import { Helmet } from 'react-helmet-async';
import logo from "../assets/logo.png"
const SEO = ({ title, description, keywords, image }) => {
  const siteTitle = "TRICKSY | Premium Maintenance Services";
  const defaultDesc = "Premium home, office, and AC duct cleaning maintenance services in Dubai.";
  const defaultKeywords = "deep cleaning services, home cleaning, office cleaning, AC duct cleaning, maintenance services";
  const defaultImage = logo; 

  return (
    <Helmet>
      {/* 1. Basic Meta Tags */}
      <title>{title ? `${title} | TRICKSY` : siteTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content="TRICKSY Dubai" />

      {/* 2. Open Graph  */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={window.location.href} />

      {/* 3. Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* 4. Robots Tag */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default SEO;