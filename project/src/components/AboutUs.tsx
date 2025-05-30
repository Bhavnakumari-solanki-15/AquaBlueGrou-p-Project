import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import Testimonials from './Testimonials';
import Footer from './Footer';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      <Header />
      <Hero />
      <Services />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default AboutUs;