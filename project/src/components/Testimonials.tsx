import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  content: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Saidul Islam",
      title: "Farmer and Social Activities",
      content: "Technical Service is more way better than the other Aqua-Companies available in the Filed. Management of Aqua Group of taken up the aquaculture sector a new height and brings revolution to the north-east state of India. Many educated people have join this sector by getting inspiration from ABG management team. We wish bright future of AQUA BLUE GROUP & Aqua blue Global aquaculture pvt.Ltd",
      rating: 5
    },
    {
      id: 2,
      name: "Ibrahim Khalil Ullah",
      title: "Farmer & Fish Trader",
      content: "Aqua Group has bring innovativeness and new technologies in the field of Aquaculture",
      rating: 5
    },
    {
      id: 3,
      name: "Aftabur Rahman",
      title: "ASM, ABIS EXPORTS(I) PVT.LTD",
      content: "Come for the best fish feed, best aqua medecine and most important is best on field Service to Farmers all over Assam",
      rating: 5
    },
    {
      id: 4,
      name: "Sariful Islam",
      title: "Farmer & Fresh fish Trader",
      content: "Yes I can Proudly say that AQUA BLUE GROUP always Provide great service to both fellow employee and the Framers. They always walk way with a smile",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      next();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, next]);

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    setAutoplay(false);
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            What Our <span className="text-blue-600 dark:text-blue-400">Customers</span> Say
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Don't just take our word for it, hear from our satisfied customers about their experiences with Aqua Blue Group.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-50 dark:bg-blue-900/20 rounded-full opacity-70 dark:opacity-30" />
          <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-teal-50 dark:bg-teal-900/20 rounded-full opacity-70 dark:opacity-30" />
          
          {/* Quote icon */}
          <div className="absolute top-0 left-4 md:left-10">
            <Quote className="w-16 h-16 text-blue-100 dark:text-blue-900" />
          </div>
          
          <div className="relative p-4 md:p-10 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700">
            <div className="flex flex-col items-center">
              <div className="flex mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                ))}
              </div>
              
              <p className="text-lg md:text-xl text-center text-slate-700 dark:text-slate-300 mb-8 italic">
                "{testimonials[currentIndex].content}"
              </p>
              
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400">
                  {testimonials[currentIndex].title}
                </p>
              </div>
              
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleIndicatorClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentIndex === index 
                        ? 'bg-blue-600 dark:bg-blue-400 w-6' 
                        : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
            <button
              onClick={() => {
                prev();
                setAutoplay(false);
              }}
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                next();
                setAutoplay(false);
              }}
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;