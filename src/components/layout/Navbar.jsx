import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom'; 
import { 
  Menu, X, Phone, Calendar, ChevronDown, CheckCircle2, 
  Sparkles, Wind, Building2, Armchair, Paintbrush, Wrench, MessageCircle 
} from 'lucide-react';

const Header = ({ navData, dropdownServices, contactInfo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  
  const location = useLocation();
  const currentPath = location?.pathname || '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true }); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const defaultNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Technical', path: '/technical' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const defaultServices = [
    { name: 'Deep Cleaning', path: '/services/deep-cleaning', icon: <Sparkles className="w-4 h-4 text-emerald-500" /> },
    { name: 'AC Duct Cleaning', path: '/services/ac-duct-cleaning', icon: <Wind className="w-4 h-4 text-emerald-500" /> },
    { name: 'Commercial Cleaning', path: '/services/commercial-cleaning', icon: <Building2 className="w-4 h-4 text-emerald-500" /> },
    { name: 'Upholstery Cleaning', path: '/services/upholstery-cleaning', icon: <Armchair className="w-4 h-4 text-emerald-500" /> },
    { name: 'Painting Services', path: '/services/painting-services', icon: <Paintbrush className="w-4 h-4 text-emerald-500" /> },
    { name: 'Handyman', path: '/services/handyman-services', icon: <Wrench className="w-4 h-4 text-emerald-500" /> },
  ];

  const phoneDetails = contactInfo?.phone || "+971501234567";
  const navLinks = navData?.length ? navData : defaultNavLinks;
  const services = dropdownServices?.length ? dropdownServices : defaultServices;
  const isServicesActive = currentPath.startsWith('/services');

  const getLinkStyle = (path) => {
    const isActive = currentPath === path;
    return `font-bold transition-all text-[13px] uppercase tracking-widest relative group flex items-center ${isActive ? 'text-emerald-500' : 'text-zinc-700 hover:text-emerald-500'}`;
  };

  const renderNavLinks = (linksArray) => {
    return linksArray.map((link, index) => (
      <Link key={index} to={link?.path || '/'} className={getLinkStyle(link?.path)}>
        {link?.name || "Link"}
        <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-500 transition-all ${currentPath === link?.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
      </Link>
    ));
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-zinc-100' : 'bg-white py-4 border-b border-zinc-100'}`}>
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 z-50 group">
            <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center transform group-hover:-rotate-12 transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(16,185,129,1)]">
              <span className="text-white font-black text-xl">T</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-zinc-900">
              TRICKSY<span className="text-emerald-500">.</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6 lg:space-x-8">
            {renderNavLinks(navLinks.slice(0, 2))}
            
            <div className="relative group" onMouseEnter={() => setServicesDropdownOpen(true)} onMouseLeave={() => setServicesDropdownOpen(false)}>
              <button className={`flex items-center gap-1.5 font-bold transition-colors py-1.5 text-[13px] uppercase tracking-widest relative group focus:outline-none ${isServicesActive ? 'text-emerald-500' : 'text-zinc-700 hover:text-emerald-500'}`}>
                Services <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-500 transition-all ${isServicesActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
              
              <div className={`absolute top-[120%] left-1/2 -translate-x-1/2 w-72 bg-white rounded-2xl shadow-xl border border-zinc-100 p-2.5 transition-all duration-200 origin-top ${servicesDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                {services.map((service, index) => (
                  <Link key={index} to={service?.path || '/services'} className="flex items-center gap-3 px-3 py-3 hover:bg-zinc-50 rounded-xl transition-colors group/item" onClick={() => setServicesDropdownOpen(false)}>
                    <span className="w-9 h-9 flex items-center justify-center bg-zinc-100 rounded-lg group-hover/item:bg-white group-hover/item:shadow-sm border border-transparent group-hover/item:border-zinc-200 transition-all">
                      {service?.icon || <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </span>
                    <span className="text-sm font-bold text-zinc-700 group-hover/item:text-emerald-600 transition-colors">
                      {service?.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {renderNavLinks(navLinks.slice(2))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <a href={`tel:${phoneDetails}`} className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center border border-zinc-200 hover:bg-zinc-950 hover:text-white transition-colors text-zinc-600">
              <Phone className="w-4 h-4" />
            </a>
            <a href={`https://wa.me/${phoneDetails.replace('+', '')}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-[#E8F8F5] flex items-center justify-center border border-[#A9DFD8] hover:bg-[#25D366] hover:text-white transition-colors text-[#25D366]">
              <MessageCircle className="w-5 h-5" />
            </a>
            <button className="flex items-center gap-2 bg-zinc-950 text-white px-6 py-2.5 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-[4px_4px_0px_0px_rgba(16,185,129,1)] hover:translate-y-1 hover:shadow-none hover:bg-emerald-500 border-2 border-transparent hover:border-zinc-950">
              <Calendar className="w-4 h-4" /> Book Now
            </button>
          </div>

          <button className="lg:hidden p-2 text-zinc-900 bg-zinc-100 rounded-xl transition-colors z-50 border border-zinc-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-100 shadow-xl transition-all duration-300 origin-top ${mobileMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'}`}>
        <div className="px-6 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
          {navLinks.slice(0, 2).map((link, idx) => (
            <Link key={idx} to={link?.path || '/'} className={`block font-black text-[18px] uppercase tracking-tight ${currentPath === link?.path ? 'text-emerald-500' : 'text-zinc-900'}`}>
              {link?.name}
            </Link>
          ))}
          
          <div className="space-y-2">
            <button className={`w-full font-black text-[18px] uppercase tracking-tight flex justify-between items-center ${isServicesActive ? 'text-emerald-500' : 'text-zinc-900'}`} onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}>
              Services <ChevronDown className={`w-5 h-5 transition-transform ${servicesDropdownOpen ? 'rotate-180 text-emerald-500' : ''}`} />
            </button>
            {servicesDropdownOpen && (
              <div className="pl-4 py-3 border-l-2 border-emerald-100 ml-2 space-y-3">
                {services.map((service, index) => (
                  <Link key={index} to={service?.path || '/services'} className="flex items-center gap-3 text-zinc-600 font-bold hover:text-emerald-600 text-[14px]">
                    <span className="p-1.5 bg-zinc-100 rounded-md">{service?.icon}</span>
                    <span>{service?.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {navLinks.slice(2).map((link, idx) => (
            <Link key={idx + 2} to={link?.path || '/'} className={`block font-black text-[18px] uppercase tracking-tight ${currentPath === link?.path ? 'text-emerald-500' : 'text-zinc-900'}`}>
              {link?.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;