import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // URL track karne ke liye add kiya
import { Menu, X, Phone, Calendar, Settings, Wrench, ChevronDown, CheckCircle2 } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  
  // Current page ka URL pata karne ke liye
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'Cleaning Services', icon: <CheckCircle2 className="w-4 h-4 text-primary-500" /> },
    { name: 'Home Maintenance', icon: <Wrench className="w-4 h-4 text-primary-500" /> },
    { name: 'Technical Services', icon: <Settings className="w-4 h-4 text-primary-500" /> },
  ];

  // Yeh function check karta hai ki link active hai ya nahi aur us hisaab se style deta hai
  const getLinkStyle = (path) => {
    const isActive = currentPath === path;
    return `font-semibold transition-all text-[15px] tracking-wide relative group ${isActive ? 'text-primary-600' : 'text-slate-700 hover:text-primary-600'}`;
  };

  const getUnderlineStyle = (path) => {
    const isActive = currentPath === path;
    return `absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`;
  };

  // Services dropdown tabhi highlight hoga jab URL '/services' se shuru ho
  const isServicesActive = currentPath.startsWith('/services');

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' 
          : 'bg-transparent py-3' 
      }`}
    >
      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 2xl:px-24">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-1.5">
            <span className="text-[22px] font-black tracking-tighter text-gray-900">
              TRICKSY
            </span>
            <span className="w-2 h-2 rounded-full bg-primary-500 mt-1"></span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="/" className={getLinkStyle('/')}>
              Home
              <span className={getUnderlineStyle('/')}></span>
            </a>
            
            <a href="/about" className={getLinkStyle('/about')}>
              About
              <span className={getUnderlineStyle('/about')}></span>
            </a>
            
            {/* Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button className={`flex items-center gap-1.5 font-semibold transition-colors py-1.5 text-[15px] tracking-wide relative group ${isServicesActive ? 'text-primary-600' : 'text-slate-700 hover:text-primary-600'}`}>
                Services <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all ${isServicesActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
              
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 w-60 bg-white rounded-xl shadow-lg border border-slate-100 p-2.5 transition-all duration-200 origin-top
                  ${servicesDropdownOpen ? 'opacity-100 scale-100 translate-y-2 visible' : 'opacity-0 scale-95 translate-y-0 invisible'}`}
              >
                {services.map((service, index) => (
                  <a key={index} href={`/services`} className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg transition-colors group/item">
                    <span className="p-1.5 bg-primary-50/50 rounded-md group-hover/item:bg-primary-100 transition-colors">
                      {service.icon}
                    </span>
                    <span className="text-[15px] font-semibold text-slate-700 group-hover/item:text-primary-600">{service.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <a href="/technical" className={getLinkStyle('/technical')}>
              Technical
              <span className={getUnderlineStyle('/technical')}></span>
            </a>
            
            <a href="/blog" className={getLinkStyle('/blog')}>
              Blog
              <span className={getUnderlineStyle('/blog')}></span>
            </a>
            
            <a href="/contact" className={getLinkStyle('/contact')}>
              Contact
              <span className={getUnderlineStyle('/contact')}></span>
            </a>
          </nav>

          {/* Call to Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <a href="tel:+18001234567" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm border border-slate-100 group-hover:border-primary-200 group-hover:bg-primary-50 transition-all">
                <Phone className="w-4 h-4 text-slate-600 group-hover:text-primary-600" />
              </div>
            </a>
            <button className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg text-[15px]">
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Isme bhi active page highlight hoga */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl transition-all duration-300 origin-top ${mobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 invisible'}`}>
        <div className="px-6 py-6 space-y-4 max-h-[85vh] overflow-y-auto w-full">
          <a href="/" className={`block font-bold text-[16px] ${currentPath === '/' ? 'text-primary-600' : 'text-slate-800'}`}>Home</a>
          <a href="/about" className={`block font-bold text-[16px] ${currentPath === '/about' ? 'text-primary-600' : 'text-slate-800'}`}>About</a>
          
          <div className="space-y-2">
            <div className={`font-bold text-[16px] flex justify-between items-center cursor-pointer ${isServicesActive ? 'text-primary-600' : 'text-slate-800'}`} onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}>
              Services
              <ChevronDown className={`w-5 h-5 transition-transform ${servicesDropdownOpen ? 'rotate-180 text-primary-600' : ''}`} />
            </div>
            {servicesDropdownOpen && (
              <div className="pl-4 space-y-3 py-2 border-l-2 border-primary-100 ml-2">
                {services.map((service, index) => (
                  <a key={index} href="/services" className="flex items-center gap-3 text-slate-600 font-semibold hover:text-primary-600 text-[15px]">
                    <span className="p-1.5 bg-primary-50 rounded-md">
                      {service.icon}
                    </span>
                    <span>{service.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          
          <a href="/technical" className={`block font-bold text-[16px] ${currentPath === '/technical' ? 'text-primary-600' : 'text-slate-800'}`}>Technical Services</a>
          <a href="/blog" className={`block font-bold text-[16px] ${currentPath === '/blog' ? 'text-primary-600' : 'text-slate-800'}`}>Blog</a>
          <a href="/contact" className={`block font-bold text-[16px] ${currentPath === '/contact' ? 'text-primary-600' : 'text-slate-800'}`}>Contact</a>
          
          <div className="pt-6 mt-4 border-t border-slate-100 flex flex-col gap-3">
            <button className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-slate-50 text-slate-800 font-bold border border-slate-200">
              <Phone className="w-4 h-4" />
              Call Us
            </button>
            <button className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-primary-600 text-white font-bold shadow-lg shadow-primary-500/25">
              <Calendar className="w-4 h-4" />
              Book Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;