import React, { useState, useEffect } from 'react';
import { Brain, Fish, Package, Pill, FlaskConical, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string;
}

const Services: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const { data, error } = await supabase.from('team_members').select('*');
        if (error) {
          console.error('Error fetching team members:', error);
        } else {
          setTeamMembers(data || []);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoadingTeam(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const toggleCard = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const services = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Aquaculture Technical Support",
      description: "Our expert technical team is here to guide you through every stage of the culture cycle — from pond preparation to harvest. We provide personalized, on-ground and remote support completely free of cost, ensuring your success in every crop.\n\nAt Aqua Blue, your growth is our priority.",
    },
    {
      icon: <FlaskConical className="w-6 h-6" />,
      title: "Aqua Blue Laboratories",
      description: "Aqua Blue Laboratories is a state-of-the-art facility equipped with modern diagnostic tools to accurately detect fish diseases and recommend the right treatments. By ensuring timely and precise care, we help farmers reduce losses, lower input costs, and improve overall profitability.\n\nBetter diagnosis. Smarter treatment. Healthier harvests.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Aquaculture Technical Support",
      description: "Our experienced technical team is here to support you throughout the entire culture cycle — from pond preparation to harvest. We provide expert guidance tailored to your farm's needs, completely free of cost.\n\nWith Aqua Blue, you're never farming alone.",
    },
    {
      icon: <ChevronRight className="w-6 h-6" />,
      title: "Aqua Blue RAS Farm",
      description: "Aqua Blue Global Aquaculture Solutions Pvt. Ltd. operates a state-of-the-art Recirculating Aquaculture System (RAS) farm in collaboration with the Department of Fisheries, Government of Assam.\n\nWe also offer expert RAS installation and technical support across India — helping farmers adopt sustainable, high-yield fish farming systems.\n\nGet in touch with us to set up your own RAS farm.",
    },
    {
      icon: <Fish className="w-6 h-6" />,
      title: "Aqua Blue Fisheries",
      description: "Aqua Blue Fisheries, a key division of the Aqua Blue, is one of the largest fish producers in Assam. With over 250 bighas of water area, we focus on the large-scale cultivation of Indian Major Carps (IMC) and Catfish.\n\nOur goal is to ensure consistent, high-quality production while promoting sustainable aquaculture practices.",
    },
    {
      icon: <ChevronRight className="w-6 h-6" />,
      title: "Fishwaale",
      description: "FISHwaale is a pioneering venture by Aqua Blue Global Aquaculture Solutions Pvt. Ltd., launched as India's first e-fish market. The app serves as a unified marketplace for aquaculture, offering both quality inputs (like seed, feed, and equipment) and a platform to sell fish harvests directly.\n\nDesigned to empower farmers, traders, and consumers — FISHwaale is transforming how aquaculture connects and grows.",
    }
  ];

  const faqs = [
    {
      question: "What types of aquaculture do you provide consultancy for?",
      answer: "We offer expert consultancy services for various types of aquaculture, including freshwater and marine systems. Our guidance covers everything from pond preparation to finding the best market for your products.",
    },
    {
      question: "Are the fish seeds you provide disease-free?",
      answer: "Yes, we supply high-quality fish seeds that are genetically healthy and disease-free, crucial for starting a successful fish farming operation.",
    },
    {
      question: "Do you provide technical support after setting up a RAS farm?",
      answer: "Yes, we have a dedicated technical support team to help and guide you throughout the culture period. This support is provided free of cost.",
    },
    {
      question: "What parameters do you test in your Aqua Laboratory Services?",
      answer: "Our advanced laboratory is equipped to test vital water and soil parameters, ensuring an optimal environment for fish farming. This includes testing for pH levels, dissolved oxygen, and nutrient content.",
    },
    {
      question: "Can you help with finding a market for my aquaculture products?",
      answer: "Absolutely. Our consultancy services include guidance on finding the best markets to sell your aquaculture products for maximum profitability.",
    },
    {
      question: "What is the typical duration of your aquaculture consultancy service?",
      answer: "The duration of our consultancy services varies depending on the type and scale of your aquaculture operation. We provide end-to-end support tailored to your specific needs.",
    },
  ];

  return (
    <div className="min-h-screen bg-white" style={{
      backgroundColor: '#fcf9f5',
    }}>
      {/* Dotted grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#2d215b 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      <div className="container mx-auto px-4 pt-32 text-center relative z-10">
        {/* Header Section */}
        <div className="mb-12">
          <p className="text-sm uppercase tracking-widest text-gray-600 mb-2">OUR SERVICES</p>
          <h1 className="text-6xl font-serif text-[#2d215b] mb-6">Professional Aquaculture<br />Solutions</h1>
          <p className="text-sm text-gray-700 max-w-2xl mx-auto">We provide comprehensive aquaculture services and support<br />to help you achieve your farming objectives efficiently<br />and effectively.</p>
        </div>

        {/* Book a Demo Button */}
        <div className="mb-12">
          <a href="/join-us#join-us" className="inline-block bg-[#6a4da8] hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
            Join us
          </a>
        </div>

        {/* Illustration Section */}
        <div className="flex justify-center mb-12">
          <img 
            src="/images/services-workflow.svg" 
            alt="Workflow illustration" 
            className="max-w-4xl h-auto mx-auto"
          />
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            {/* Left Column - Heading and Illustration */}
            <div className="md:col-span-1 p-6 rounded-2xl shadow-sm flex flex-col" style={{
              backgroundColor: '#ffffff',
              backgroundImage: 
                'linear-gradient(to right, rgba(209,213,219,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(209,213,219,0.5) 1px, transparent 1px)',
              backgroundSize: '240px 240px'
            }}>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d215b] leading-tight text-center md:text-left mb-8">
                Comprehensive Aquaculture Services
              </h2>
              <div className="flex-grow flex items-center justify-center h-full">
                <img 
                  src="/images/services-cards.svg" 
                  alt="Services Illustration" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Right Column - Service Boxes */}
            <div className="md:col-span-1 p-8 rounded-2xl shadow-sm bg-white" style={{
              backgroundImage: 
                'linear-gradient(to right, rgba(209,213,219,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(209,213,219,0.5) 1px, transparent 1px)',
              backgroundSize: '240px 240px'
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-sm flex flex-col h-full">
                    <div className="text-[#6a4da8] mb-4">{service.icon}</div>
                    <h3 className="font-bold text-[#2d215b] mb-2">{service.title}</h3>
                    <div className="text-gray-700 text-sm">
                      <p className={`${!expandedCards.includes(index) ? 'line-clamp-3' : ''}`}>
                        {service.description}
                      </p>
                      {service.description.length > 100 && (
                        <button
                          onClick={() => toggleCard(index)}
                          className="text-[#6a4da8] hover:text-purple-700 font-medium mt-2"
                        >
                          {expandedCards.includes(index) ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why choose us? Section */}
      <div className="py-20" style={{ backgroundColor: '#fcf9f5' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2d215b] mb-4">Why choose us?</h2>
          <p className="text-sm text-gray-700 max-w-2xl mx-auto mb-16">
            Experience the Aqua Blue advantage for your aquaculture success.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Comprehensive Guidance */}
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 pt-20 pb-8 px-6 flex flex-col items-center text-center border border-slate-100 dark:border-slate-700">
              <div className="absolute -top-12">
                <div className="w-24 h-24 rounded-full bg-[#f3e8ff] dark:bg-purple-900/50 flex items-center justify-center shadow-lg">
                   <img 
                      src="/images/Comprehensive Guidance.png" 
                      alt="Comprehensive Guidance" 
                      className="w-16 h-16 object-contain"
                    />
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold mb-2 text-slate-900 dark:text-white mt-4">Comprehensive Guidance</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                End-to-end support from pond to market.
              </p>
            </div>

            {/* Card 2: Expert Laboratory Services */}
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 pt-20 pb-8 px-6 flex flex-col items-center text-center border border-slate-100 dark:border-slate-700">
              <div className="absolute -top-12">
                 <div className="w-24 h-24 rounded-full bg-[#f3e8ff] dark:bg-purple-900/50 flex items-center justify-center shadow-lg">
                    <img 
                      src="/images/Expert Laboratory Services.png" 
                      alt="Expert Laboratory Services" 
                      className="w-16 h-16 object-contain"
                    />
                 </div>
              </div>
              <h3 className="font-serif text-xl font-bold mb-2 text-slate-900 dark:text-white mt-4">Expert Laboratory Services</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Modern lab for precise disease diagnosis.
              </p>
            </div>

            {/* Card 3: Proven Experience */}
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 pt-20 pb-8 px-6 flex flex-col items-center text-center border border-slate-100 dark:border-slate-700">
              <div className="absolute -top-12">
                 <div className="w-24 h-24 rounded-full bg-[#f3e8ff] dark:bg-purple-900/50 flex items-center justify-center shadow-lg">
                    <img 
                      src="/images/Proven Experience.png" 
                      alt="Proven Experience" 
                      className="w-16 h-16 object-contain"
                    />
                 </div>
              </div>
              <h3 className="font-serif text-xl font-bold mb-2 text-slate-900 dark:text-white mt-4">Proven Experience</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Backed by our own RAS farm and large fisheries.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="py-20" style={{ backgroundColor: '#fcf9f5' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2d215b] mb-4">Meet the Team</h2>
          <p className="text-sm text-gray-700 max-w-2xl mx-auto mb-16">
            The driving force behind our success.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {loadingTeam ? (
              <p>Loading team...</p>
            ) : (
              teamMembers.map((member) => (
                <div key={member.id} className="text-center">
                  <img
                    className="mx-auto h-40 w-40 rounded-full object-cover mb-4 shadow-lg"
                    src={member.image_url}
                    alt={member.name}
                  />
                  <h3 className="text-lg font-bold text-[#2d215b]">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20" style={{ backgroundColor: '#fcf9f5' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 max-w-5xl mx-auto">
            {/* Heading */}
            <div className="md:w-1/2 mb-8 md:mb-0 pl-8">
              <p className="text-4xl font-serif text-gray-700 mb-0">FAQs about</p>
              <h2 className="text-4xl font-serif text-[#2d215b] leading-tight mt-0">Aqua Blue Professional Services</h2>
            </div>
            {/* Decorative Icon Stack */}
            <div className="md:w-1/2 flex justify-end">
              <img 
                src="/images/FAQ.svg" 
                alt="FAQ decorative icon" 
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>

          {/* Accordion */}
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 py-4">
                <button
                  className="flex justify-between items-center w-full text-left text-[#6a4da8] hover:text-purple-800 focus:outline-none font-semibold pr-2"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {openFaqIndex === index && (
                  <div className="mt-2 text-gray-700 text-sm pb-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;