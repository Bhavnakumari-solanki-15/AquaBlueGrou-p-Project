import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createBubble = () => {
      if (!bubbleRef.current) return;
      
      const bubble = document.createElement('div');
      const size = Math.random() * 20 + 10;
      const left = Math.random() * 100;
      const animDuration = Math.random() * 8 + 4;
      
      bubble.className = 'absolute bottom-0 rounded-full bg-blue-400/20 dark:bg-blue-500/20';
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.animation = `rise ${animDuration}s linear forwards`;
      
      bubbleRef.current.appendChild(bubble);
      
      setTimeout(() => {
        bubble.remove();
      }, animDuration * 1000);
    };
    
    const intervalId = setInterval(createBubble, 800);
    return () => clearInterval(intervalId);
  }, []);

  const scrollToContent = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute top-0 left-0 right-0 h-3/4 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-900 dark:to-blue-950"
        />
        <div 
          className="absolute bottom-0 left-0 w-full h-1/3 bg-white dark:bg-slate-900"
        />
        <div 
          className="absolute left-0 right-0 bottom-1/3 h-32 
                    bg-gradient-to-b from-transparent to-white dark:to-slate-900"
        />
        {/* Wave decoration */}
        <div className="absolute bottom-1/3 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path 
              fill="currentColor" 
              fillOpacity="1" 
              className="text-white dark:text-slate-900"
              d="M0,224L60,202.7C120,181,240,139,360,138.7C480,139,600,181,720,176C840,171,960,117,1080,90.7C1200,64,1320,64,1380,64L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </svg>
        </div>
        <div ref={bubbleRef} className="absolute inset-0" />
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 pt-16 md:pt-24 lg:pt-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300 bg-clip-text text-transparent leading-tight">
            Revolutionizing Aquaculture
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300 rounded-full mb-8"></div>
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-10 max-w-3xl">
            We, the Aqua Blue Group team is here 24×7 to serve you at our best, providing premium consultancy services and products for all types of aquaculture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 dark:from-blue-500 dark:to-teal-400 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Our Services
            </button>
            <button className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={scrollToContent}
          aria-label="Scroll to content"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all"
        >
          <ChevronDown className="text-blue-600 dark:text-blue-400" />
        </button>
      </div>
    </section>
  );
};

export default Hero;