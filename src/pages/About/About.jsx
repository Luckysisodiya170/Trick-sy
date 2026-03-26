import React from 'react';
import AboutHero from './AboutHero';
import AboutMission from './AboutMission';
import AboutValues from './AboutValues';
import AboutTimeline from './AboutTimeline';
import AboutTeam from './AboutTeam';
import SEO from '../../components/SEO';
import WhyChooseUs from '../Home/WhyChooseUs';

const AboutPage = () => {
  return (
    <div className="bg-white">
      <SEO 
        title="About Us" 
        description="Learn about Tricksy's journey, mission, and the team perfecting your spaces." 
      />
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutTimeline />
      <AboutTeam />
      <WhyChooseUs />
    </div>
  );
};

export default AboutPage;