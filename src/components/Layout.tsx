import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import ChatbotWidget from './ChatbotWidget';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#A78BFA] text-gray-900">
      {/* Main content - Z-index might not be needed anymore without the custom background */}
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer isWhiteFooterPage={location.pathname === '/' || location.pathname === '/join-us' || location.pathname === '/blog' || location.pathname === '/contact' || location.pathname === '/services' || location.pathname === '/about'} backgroundColor={location.pathname === '/about' ? '#a78bfa' : (location.pathname === '/services' || location.pathname === '/contact' ? '#fcf9f5' : undefined)} />
      </div>
      <ChatbotWidget />
    </div>
  );
};

export default Layout;