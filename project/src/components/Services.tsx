import React from 'react';
import { 
  Brain, 
  Fish, 
  Package, 
  Pill, 
  FlaskConical, 
  ChevronRight 
} from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => {
  return (
    <div 
      className="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 p-6 border border-slate-100 dark:border-slate-700 h-full"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background decoration */}
      <div className="absolute right-0 bottom-0 w-40 h-40 bg-blue-50 dark:bg-blue-900/20 rounded-tl-[100px] -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="mb-5 p-3 bg-blue-50 dark:bg-slate-700 rounded-xl inline-block text-blue-600 dark:text-blue-400">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 mb-5">{description}</p>
        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group">
          <span>Learn more</span>
          <ChevronRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Consultancy Services",
      description: "Expert consultancy services tailored to various types of aquaculture, including freshwater and marine systems with end-to-end guidance.",
    },
    {
      icon: <Fish className="w-6 h-6" />,
      title: "High-Quality Fish Seeds",
      description: "Top-tier fish seeds that are crucial for starting a successful fish farming operation, genetically healthy and disease-free.",
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Premium Fish Feeds",
      description: "Wide variety of premium fish feeds designed to meet the nutritional needs of different fish species at various growth stages.",
    },
    {
      icon: <Pill className="w-6 h-6" />,
      title: "Aqua Medicines",
      description: "Specialized aqua medicines to prevent and treat fish diseases throughout the culture period, ensuring fish remain healthy.",
    },
    {
      icon: <FlaskConical className="w-6 h-6" />,
      title: "Aqua Laboratory Services",
      description: "Advanced laboratory equipped to test vital water and soil parameters, ensuring optimal environment for fish farming.",
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            Our Comprehensive <span className="text-blue-600 dark:text-blue-400">Services</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            We provide end-to-end solutions for all types of aquaculture, ensuring the best results for our clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;