import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Products from '../components/Products';
import Testimonials from '../components/Testimonials';

const Home: React.FC = () => {
  return (
    <div className="pt-16">
      <Hero />
      <Services />
      <Products />
      <Testimonials />
    </div>
  );
};

export default Home;