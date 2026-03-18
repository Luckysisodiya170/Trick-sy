import React from 'react';
import Hero from './Hero'; 
import CtaSection from './CtaSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import PopularServices from './PopularServices';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from "./Testimonials"
import FaqSection from "./FAQ"
import GoogleReviews from './GoogleReviews';


const Home = () => {
  return (
    <div className="w-full flex flex-col">

      <Hero />


      <AboutSection />
      <ServicesSection />
      <PopularServices />
      <WhyChooseUs />
      <Testimonials />
      <FaqSection />

      <CtaSection />
      <GoogleReviews/>

    </div>
  );
};

export default Home;