import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Droplets, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

interface FooterProps {
  isWhiteFooterPage?: boolean;
  backgroundColor?: string;
}

const Footer: React.FC<FooterProps> = ({ isWhiteFooterPage, backgroundColor }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };

    updateTime(); // Update time immediately on mount
    const intervalId = setInterval(updateTime, 1000); // Update time every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []); // Empty dependency array means this effect runs only once on mount and cleans up on unmount

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
              <img src="/images/aquablue-logo.png" alt="Aqua Blue Group Logo" className="h-10" />
            </div>
            <p className="mb-6">
              Revolutionizing aquaculture with expert consultancy, premium products, and advanced laboratory services.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/aquabluegroupassam" className={`transition-colors ${isWhiteFooterPage ? 'hover:text-gray-700' : ''}`}>
                <Facebook className={`w-5 h-5 ${isWhiteFooterPage ? 'text-gray-700' : 'text-white'}`} />
              </a>
              <a href="https://www.instagram.com/aquabluegroupassam/" className={`transition-colors ${isWhiteFooterPage ? 'hover:text-gray-700' : ''}`}>
                <Instagram className={`w-5 h-5 ${isWhiteFooterPage ? 'text-gray-700' : 'text-white'}`} />
              </a>
              <a href="https://x.com/AquaBlueGroup1" className={`transition-colors ${isWhiteFooterPage ? 'hover:text-gray-700' : ''}`}>
                <Twitter className={`w-5 h-5 ${isWhiteFooterPage ? 'text-gray-700' : 'text-white'}`} />
              </a>
              <a href="https://www.linkedin.com/in/aqua-blue-group-assam-62a4b917a/" className={`transition-colors ${isWhiteFooterPage ? 'hover:text-gray-700' : ''}`}>
                <Linkedin className={`w-5 h-5 ${isWhiteFooterPage ? 'text-gray-700' : 'text-white'}`} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className={`transition-colors ${linkHoverClass}`}>Home</a>
              </li>
              <li>
                <a href="/about" className={`transition-colors ${linkHoverClass}`}>About Us</a>
              </li>
              <li>
                <a href="/services" className={`transition-colors ${linkHoverClass}`}>Services</a>
              </li>
              <li>
                <a href="/products" className={`transition-colors ${linkHoverClass}`}>Products</a>
              </li>
              <li>
                <a href="/contact" className={`transition-colors ${linkHoverClass}`}>Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="/services" className={`transition-colors ${linkHoverClass}`}>Consultancy Services</a>
              </li>
              <li>
                <a href="/services" className={`transition-colors ${linkHoverClass}`}>Fish Seeds</a>
              </li>
              <li>
                <a href="/services" className={`transition-colors ${linkHoverClass}`}>Fish Feeds</a>
              </li>
              <li>
                <a href="/services" className={`transition-colors ${linkHoverClass}`}>Aqua Medicines</a>
              </li>
              <li>
                <a href="/services" className={`transition-colors ${linkHoverClass}`}>Laboratory Services</a>
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
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-sm text-gray-900">
              <span>{currentTime}</span>
              <a href="/privacy-policy" className="hover:underline text-blue-700">Privacy Policy</a>
              <a href="/terms-and-conditions" className="hover:underline text-blue-700">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;