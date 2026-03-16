import React from 'react';
import AboutHero from './AboutHero';
import AboutMission from './AboutMission';
import AboutTimeline from './AboutTimeline';
import AboutValues from './AboutValues';
import AboutTeam from './AboutTeam';
import WhyChooseUs from '../../pages/Home/WhyChooseUs';

const AboutPage = () => {
  return (
    <div className="bg-white">
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