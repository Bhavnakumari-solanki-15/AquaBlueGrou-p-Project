import React from 'react';
import { Mail, Phone, MapPin, Droplets, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

interface FooterProps {
  isWhiteFooterPage?: boolean;
  backgroundColor?: string;
}

const Footer: React.FC<FooterProps> = ({ isWhiteFooterPage, backgroundColor }) => {
  const footerBgClass = isWhiteFooterPage ? 'bg-white' : '';
  const textColorClass = isWhiteFooterPage ? 'text-gray-900' : 'text-white';

  // Determine social icon color based on the page
  const iconColorClass = isWhiteFooterPage ? 'text-[#2d215b]' : 'text-blue-400';
  // Determine link hover color based on the page
  const linkHoverClass = isWhiteFooterPage ? 'hover:text-[#2d215b]' : 'hover:text-blue-400';

  return (
    <footer className={`relative overflow-hidden pt-16 pb-8 ${footerBgClass}`} style={backgroundColor ? { backgroundColor } : (!isWhiteFooterPage ? { backgroundColor: '#A78BFA' } : {})}>
      {/* Footer content - positioned above the grid overlay */}
      <div className={`relative z-10 container mx-auto px-4 font-bold ${textColorClass}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Droplets className={`h-8 w-8 ${iconColorClass}`} />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
                Aqua Blue Group
              </span>
            </div>
            <p className="mb-6">
              Revolutionizing aquaculture with expert consultancy, premium products, and advanced laboratory services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`transition-colors ${isWhiteFooterPage ? 'hover:text-gray-700' : ''}`}>
                <Facebook className={`w-5 h-5 ${isWhiteFooterPage ? 'text-gray-700' : 'text-white'}`} />
              </a>
              <a href="#" className={`transition-colors ${isWhiteFooterPage ? 'hover:text-gray-700' : ''}`}>
                <Instagram className={`w-5 h-5 ${isWhiteFooterPage ? 'text-gray-700' : 'text-white'}`} />
              </a>
              <a href="#" className={`transition-colors ${isWhiteFooterPage ? 'hover:text-gray-700' : ''}`}>
                <Twitter className={`w-5 h-5 ${isWhiteFooterPage ? 'text-gray-700' : 'text-white'}`} />
              </a>
              <a href="#" className={`transition-colors ${isWhiteFooterPage ? 'hover:text-gray-700' : ''}`}>
                <Linkedin className={`w-5 h-5 ${isWhiteFooterPage ? 'text-gray-700' : 'text-white'}`} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className={`transition-colors ${linkHoverClass}`}>Home</a>
              </li>
              <li>
                <a href="#" className={`transition-colors ${linkHoverClass}`}>About Us</a>
              </li>
              <li>
                <a href="#" className={`transition-colors ${linkHoverClass}`}>Services</a>
              </li>
              <li>
                <a href="#" className={`transition-colors ${linkHoverClass}`}>Products</a>
              </li>
              <li>
                <a href="#" className={`transition-colors ${linkHoverClass}`}>Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className={`transition-colors ${linkHoverClass}`}>Consultancy Services</a>
              </li>
              <li>
                <a href="#" className={`transition-colors ${linkHoverClass}`}>Fish Seeds</a>
              </li>
              <li>
                <a href="#" className={`transition-colors ${linkHoverClass}`}>Fish Feeds</a>
              </li>
              <li>
                <a href="#" className={`transition-colors ${linkHoverClass}`}>Aqua Medicines</a>
              </li>
              <li>
                <a href="#" className={`transition-colors ${linkHoverClass}`}>Laboratory Services</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className={`w-5 h-5 ${iconColorClass} mt-0.5 mr-3 flex-shrink-0`} />
                <span>Aqua Blue Group Office, Paliguri, Jagiroad, Dist:- Morigaon (Assam)</span>
              </li>
              <li className="flex items-center">
                <Phone className={`w-5 h-5 ${iconColorClass} mr-3 flex-shrink-0`} />
                <span>0-8403938247 0-6001175252</span>
              </li>
              <li className="flex items-center">
                <Mail className={`w-5 h-5 ${iconColorClass} mr-3 flex-shrink-0`} />
                <span>abgrouppassam@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={`border-t pt-8 ${isWhiteFooterPage ? 'border-gray-300' : 'border-slate-800'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Aqua Blue Group. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className={`transition-colors text-sm ${linkHoverClass}`}>Privacy Policy</a>
              <a href="#" className={`transition-colors text-sm ${linkHoverClass}`}>Terms of Service</a>
              <a href="#" className={`transition-colors text-sm ${linkHoverClass}`}>Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;