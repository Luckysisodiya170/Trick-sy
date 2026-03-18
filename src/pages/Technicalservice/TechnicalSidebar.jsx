import React from 'react';
import { technicalServices } from '../../data/technicalData';
import TechnicalCard from './TechnicalCard';

const TechnicalSidebar = ({ activeTab, setActiveTab, icons }) => {
  return (
    <div className="lg:col-span-4 space-y-3">
      <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 px-2">
        Expertise Domains
      </h2>
      {technicalServices?.map((service, index) => (
        <TechnicalCard 
          key={service.id || index}
          service={service}
          isActive={activeTab === index}
          onHover={() => setActiveTab(index)}
          icon={icons[index % icons.length]}
          index={index}
        />
      ))}
    </div>
  );
};

export default TechnicalSidebar;