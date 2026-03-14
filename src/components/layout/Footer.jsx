import React from 'react';
import { Mail, MapPin, Phone, Clock, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 lg:pt-16 pb-8 font-sans border-t-[4px] border-primary-500">
      
      {/* Container - Strictly matched with Header & Hero for perfect left/right alignment */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 2xl:px-24">
        
        {/* Main Grid - Responsive gaps and columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 mb-12 lg:mb-16">
          
          {/* Company Column */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-5 lg:space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl lg:text-3xl font-black tracking-tighter text-white">
                TRICKSY
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-primary-500 mt-1.5"></span>
            </div>
            <p className="text-sm lg:text-[15px] leading-relaxed text-slate-400 max-w-md">
              Your trusted partner for professional home maintenance, cleaning, and technical services. We deliver excellence with every visit.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all hover:-translate-y-1">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all hover:-translate-y-1">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all hover:-translate-y-1">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all hover:-translate-y-1">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-5 lg:mb-6">Our Services</h3>
            <ul className="space-y-3 lg:space-y-4">
              <li><a href="#" className="text-sm hover:text-primary-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3.5 h-3.5 text-primary-500 transition-transform group-hover:translate-x-1" /> Deep Cleaning</a></li>
              <li><a href="#" className="text-sm hover:text-primary-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3.5 h-3.5 text-primary-500 transition-transform group-hover:translate-x-1" /> Plumbing Solutions</a></li>
              <li><a href="#" className="text-sm hover:text-primary-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3.5 h-3.5 text-primary-500 transition-transform group-hover:translate-x-1" /> Electrical Repairs</a></li>
              <li><a href="#" className="text-sm hover:text-primary-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3.5 h-3.5 text-primary-500 transition-transform group-hover:translate-x-1" /> AC Maintenance</a></li>
              <li><a href="#" className="text-sm hover:text-primary-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3.5 h-3.5 text-primary-500 transition-transform group-hover:translate-x-1" /> Handyman</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-lg mb-5 lg:mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">123 Service Stream Boulevard, Innovation District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <span className="text-sm font-medium group-hover:text-primary-400 transition-colors">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <span className="text-sm group-hover:text-primary-400 transition-colors">hello@tricksy.com</span>
              </li>
              <li className="flex items-start gap-3 pt-1">
                <Clock className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <div className="text-sm space-y-1">
                  <p className="text-white font-medium">Working Hours:</p>
                  <p className="text-slate-400">Mon - Fri: 8:00 AM - 8:00 PM</p>
                  <p className="text-slate-400">Sat - Sun: 9:00 AM - 5:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-lg mb-5 lg:mb-6">Newsletter</h3>
            <p className="text-sm mb-5 leading-relaxed text-slate-400">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-slate-800 border border-slate-700 text-white pl-10 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary-600 hover:bg-primary-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-primary-500/20 hover:-translate-y-0.5"
              >
                Subscribe Now
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar - Made flexible for mobile screens */}
        <div className="pt-6 lg:pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm text-slate-500 order-2 md:order-1">
            &copy; {new Date().getFullYear()} TRICKSY Services. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm order-1 md:order-2">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;