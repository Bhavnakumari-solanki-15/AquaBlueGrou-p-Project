import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { 
  Fish, 
  Microscope, 
  Pill, 
  Package, 
  Users, 
  Droplets,
  Waves,
  ChevronDown,
  Linkedin,
  Instagram,
  X
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { useLocation } from 'react-router-dom';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string;
  linkedin_url?: string;
}

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  quote: string;
  avatar?: string;
  bg_color?: string;
}

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoadingTeam(true);
      try {
        const { data, error } = await supabase.from('team_members').select('*');
        if (error) throw error;
        setTeam(data || []);
      } catch (error: any) {
        console.error("Failed to fetch team members:", error.message);
      } finally {
        setLoadingTeam(false);
      }
    };
    fetchTeam();
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoadingTestimonials(true);
      try {
        const { data, error } = await supabase.from('testimonials').select('*').order('created_at');
        if (error) throw error;
        setTestimonials(data || []);
      } catch (error: any) {
        console.error('Failed to fetch testimonials:', error.message);
      } finally {
        setLoadingTestimonials(false);
      }
    };
    fetchTestimonials();
  }, []);

  const toggleCard = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const services = [
    {
      title: "Consultancy Services for All Types of Aquaculture",
      description: "Aqua Blue Group offers expert consultancy services tailored to various types of aquaculture, including freshwater and marine systems. The consultancy covers end-to-end guidance on farming methods, water quality management, disease control, feeding strategies, and selecting suitable species.",
      icon: <Users className="w-12 h-12" />,
      bgColor: "bg-green-100 dark:bg-green-800",
    },
    {
      title: "Providing High-Quality Fish Seeds",
      description: "Aqua Blue Group supplies top-tier fish seeds that are crucial for starting a successful fish farming operation. They ensure that the fish seeds are genetically healthy, disease-free, and optimized for growth in different environmental conditions.",
      icon: <Fish className="w-12 h-12" />,
      bgColor: "bg-orange-100 dark:bg-orange-800",
    },
    {
      title: "Supplying Suitable and Premium Quality Fish Feeds",
      description: "The company offers a wide variety of premium fish feeds designed to meet the nutritional needs of different fish species at various growth stages. These feeds are formulated to enhance fish health, optimize growth, and improve feed conversion ratios.",
      icon: <Package className="w-12 h-12" />,
      bgColor: "bg-blue-100 dark:bg-blue-800",
    },
    {
      title: "Offering Aqua Medicines for the Entire Culture Period",
      description: "Aqua Blue Group provides specialized aqua medicines to prevent and treat fish diseases throughout the culture period. These include antibiotics, probiotics, and health supplements designed to ensure the fish remain disease-free and healthy.",
      icon: <Pill className="w-12 h-12" />,
      bgColor: "bg-purple-100 dark:bg-purple-800",
    },
    {
      title: "Aqua Laboratory Services for Testing Water and Soil Parameters",
      description: "To maintain the optimal environment for fish farming, Aqua Blue Group has an advanced laboratory equipped to test vital water and soil parameters. These services allow farmers to monitor and maintain appropriate pH levels, dissolved oxygen, and nutrient content.",
      icon: <Microscope className="w-12 h-12" />,
      bgColor: "bg-red-100 dark:bg-red-800",
    },
  ];

  // Scroll to testimonials or team section if hash is present
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const el = document.getElementById(hash.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash]);

  return (
    <div ref={containerRef} className="min-h-screen overflow-hidden">
      {/* Hero Section with Grid Background */}
      {/* Applied purple background color and grid overlay as requested */}
      <div className="relative py-20 flex items-center justify-center overflow-hidden"
           style={{
             backgroundColor: '#A78BFA',
             backgroundImage: 
               'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
             backgroundSize: '80px 80px',
           }}>
        {/* Removed old background layers */}
        {/* The wave pattern motion div can remain if desired, or be removed */}
        {/* <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 opacity-30 bg-[url('/wave-pattern.svg')]"
        /> */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="mb-8"
            >
              <Waves className="w-24 h-24 text-blue-600 dark:text-blue-400 mx-auto" />
            </motion.div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Welcome to Aqua Blue Global Aquaculture Solutions Private Limited — your trusted partner in transforming aquaculture through innovation, integrity, and impact.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Placeholder for Illustration Section */}
      {/* Add your custom SVG or illustration component here */}
      <div className="relative flex justify-center items-center py-10">
        {/* Illustration goes here */}
        {/* Please place your image file (e.g., image1.png) in a public directory (like public/images) and update the src below */}
        <img 
          src="/images/image1.png" 
          alt="About Us Illustration" 
          className="max-w-screen-lg h-auto"
        />
      </div>

      {/* New: AquaBlue, AquaBase, Fishwaale Mart Cards (Styled like screenshot) */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* AquaMart Card */}
          <div className="rounded-2xl shadow-lg flex flex-col justify-between bg-[#d1f5e1] border border-[#b6e7ce] p-8 min-h-[370px] max-w-md mx-auto" style={{background:'#d1f5e1'}}>
            <div className="text-lg font-bold text-[#2d7a5a] mb-1">AquaMart</div>
            <div className="italic text-[#2d7a5a] text-base mb-4">"Your Partner in Aquaculture Growth"</div>
            <div className="text-gray-800 text-base">
              A one-stop input hub offering farmers high-quality seeds, feed, equipment, and essential farming tools with expert advisory support.
            </div>
          </div>
          {/* AquaBase Card */}
          <div className="rounded-2xl shadow-lg flex flex-col justify-between bg-[#f7d6e0] border border-[#eec2d2] p-8 min-h-[370px] max-w-md mx-auto" style={{background:'#f7d6e0'}}>
            <div className="text-lg font-bold text-[#b05a7a] mb-1">AquaBase</div>
            <div className="italic text-[#b05a7a] text-base mb-4">"Streamlining Fish, Backed by Farmers"</div>
            <div className="text-gray-800 text-base">
              Our physical fish trading platforms that connect farmers directly to markets. These hubs ensure transparency, fair pricing, and cold-chain-enabled logistics to boost farmer income and reduce wastage.
            </div>
          </div>
          {/* Fishwaale Mart Card */}
          <div className="rounded-2xl shadow-lg flex flex-col justify-between bg-[#ffe3c7] border border-[#f7d6b6] p-8 min-h-[370px] max-w-md mx-auto" style={{background:'#ffe3c7'}}>
            <div className="text-lg font-bold text-[#b07a5a] mb-1">The Fishwaale Mart</div>
            <div className="italic text-[#b07a5a] text-base mb-4">"Fresh. Trusted. Local. (Where every fish tells a story)"</div>
            <div className="text-gray-800 text-base">
              Our retail franchise network that delivers fresh, locally-sourced fish to consumers while creating rural employment and promoting traceability from pond to plate.
            </div>
          </div>
        </div>
      </div>

      {/* Main content container with serif font */}
      {/* Applied font-serif class to all content sections below the hero */}
      <div className="font-serif">
        {/* Services Section with 3D Cards */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`relative group ${service.bgColor} rounded-3xl shadow-lg p-6 flex flex-col items-center`}
                style={{ minHeight: '320px', maxWidth: '340px', margin: '0 auto' }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 dark:from-blue-600 dark:to-cyan-600 mb-4 shadow-md">
                  {React.cloneElement(service.icon, { className: 'w-8 h-8 text-white' })}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center">
                  {service.title}
                </h3>
                <p className={`text-gray-700 dark:text-gray-200 mb-4 text-center flex-grow ${expandedCards.includes(index) ? 'line-clamp-none' : 'line-clamp-4'}`}>
                  {service.description}
                </p>
                <button
                  onClick={() => toggleCard(index)}
                  className="mt-auto text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1 text-sm font-medium"
                >
                  {expandedCards.includes(index) ? 'Show Less' : 'Read More'}
                  <ChevronDown 
                    className={`w-4 h-4 ${expandedCards.includes(index) ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel Section */}
        <div id="testimonials"></div>
        <section className="w-full max-w-5xl mx-auto px-4 pt-8 pb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            What our clients say
          </h2>
          {loadingTestimonials ? (
            <div className="text-center py-12 text-lg text-gray-500">Loading testimonials...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl shadow-lg p-8 pt-12 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl h-[340px] w-full justify-between"
                  style={{ background: t.bg_color || '#f7d6e0' }}
                >
                  <img src={t.avatar || '/images/avatar-placeholder.png'} alt={t.name} className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-900 -mt-12 mb-6 shadow-md" />
                  <div className="text-[15px] text-gray-800 dark:text-gray-200 mb-6 font-medium flex-1 flex items-center justify-center leading-relaxed line-clamp-4" style={{ minHeight: '60px' }}>{t.quote}</div>
                  <div className="mt-auto pt-4">
                    <div className="font-semibold text-blue-700 dark:text-blue-400 text-base">{t.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Team Section (moved from Team.tsx) */}
        <div id="team-section"></div>
        <section id="leadership" className="py-20 px-4 flex flex-col items-center">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-4">Our Leadership</h2>
          </div>
          {loadingTeam ? (
            <p className="text-center">Loading team...</p>
          ) : (
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8">
              {team.map((member) => (
                <div key={member.id} className="relative bg-white dark:bg-[#3c3a4c] rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
                  <div className="relative w-full h-[24rem] rounded-t-xl overflow-hidden rounded-b-none">
                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-[#32313BB3] bg-opacity-70 backdrop-blur-sm rounded-b-xl p-4 flex items-center justify-between">
                    <div className="flex flex-col text-left">
                      <div className="text-base font-semibold text-white mb-0.5">{member.name}</div>
                      <div className="text-xs text-gray-300">{member.role}</div>
                    </div>
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="bg-white rounded-[0.3rem] p-2.5 shadow-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                      >
                        <Linkedin size={20} className="text-gray-700" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Join Our Team Card */}
        {/* Styled to match the provided image with a light purple background and centered content */}
        <section className="py-20 px-4 flex justify-center">
          <div className="w-full max-w-4xl bg-purple-200 rounded-xl shadow-lg p-8 text-center">
            {/* Placeholder for Illustration - Replace with your SVG or image */}
            <div className="mb-6">
              <img src="/images/image2.png" alt="Join our team illustration" className="mx-auto h-32 w-auto" />
            </div>
            <h2 className="text-3xl font-bold text-purple-800 mb-4">Join us</h2>
            <p className="text-purple-700 mb-8 max-w-md mx-auto">
              Become a member of Aqua Blue Group and Connect with us.
              for other benifits from Aqua Blue Group
            </p>
            <a
              href="/join-us"
              className="inline-block bg-transparent border border-purple-800 text-purple-800 font-semibold py-3 px-8 rounded-lg"
            >
              Join
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

export default About;