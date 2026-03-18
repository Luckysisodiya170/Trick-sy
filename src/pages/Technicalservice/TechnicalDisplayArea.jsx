import React from 'react';
import { technicalServices } from '../../data/technicalData';
import TechnicalDisplay from './TechnicalDisplay';

const TechnicalDisplayArea = ({ activeTab }) => {
  return (
    <div className="lg:col-span-8 relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden bg-zinc-900 border-[8px] border-zinc-50 shadow-inner">
      {technicalServices?.map((service, index) => (
        <TechnicalDisplay 
          key={service.id || index}
          service={service}
          isActive={activeTab === index}
        />
      ))}
    </div>
  );
};

export default TechnicalDisplayArea;