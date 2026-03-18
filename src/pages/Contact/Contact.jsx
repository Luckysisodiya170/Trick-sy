import React, { useEffect } from 'react';
import ContactHero from './ContactHero';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import ContactMap from './ContactMap';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-zinc-50 min-h-screen pt-20">
      <ContactHero />
      
      {/* containing info and form */}
      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-20 -mt-16 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          
          {/* Left Side */}
          <div className="lg:col-span-2 pt-6">
            <ContactInfo />
          </div>

          {/* Right Side */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

        </div>
      </div>

      <ContactMap />
    </div>
  );
};

export default Contact;