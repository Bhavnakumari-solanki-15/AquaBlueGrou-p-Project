import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Products from '../components/Products';
import Testimonials from '../components/Testimonials';

const Home: React.FC = () => {
  // Data from https://aquabluegroup.in/

  // Data for Services
  const services = [
    {
      title: "Aquaculture Consultancy Services",
      description: "End to end support and guidance from pond preparation to market access.",
      icon: "💡", // Replace with React Icon component
      link: "/services"
    },
    {
      title: "Aqua Blue Laboratories",
      description: "State-of-the-art lab for testing water and soil parameters.",
      icon: "🔬", // Replace with React Icon component
      link: "/services"
    },
    {
      title: "Aquaculture Technical Support",
      description: "Best technical team to help and guide you throughout the culture period.",
      icon: "⚙️", // Replace with React Icon component
      link: "/services"
    },
    {
      title: "Aqua Blue RAS Farm",
      description: "Recirculating Aquaculture System (RAS) farm for sustainable production.",
      icon: "🏢", // Replace with React Icon component
      link: "/services"
    },
    {
      title: "Aqua Blue Fisheries",
      description: "One of the largest fish production operations in the region.",
      icon: "🎣", // Replace with React Icon component
      link: "/services"
    },
    {
      title: "Fishwaale",
      description: "India's first online marketplace dedicated to fish and seafood.",
      icon: "📱", // Replace with React Icon component
      link: "/services"
    },
  ];

  // Data for Products (Using main categories)
  const products = [
    {
      name: "Aqua Blue Fish Seeds",
      image: "/images/product-seeds.jpg", // Placeholder - replace with actual product image
      description: "High-quality, genetically healthy, and disease-free fish seeds.",
      link: "/products/fish-seeds"
    },
    {
      name: "Fish Feed",
      image: "/images/product-feed.jpg", // Placeholder - replace with actual product image
      description: "Premium feeds designed to meet nutritional needs and optimize growth.",
      link: "/products/fish-feed"
    },
    {
      name: "Aqua Medicines",
      image: "/images/product-medicines.jpg", // Placeholder - replace with actual product image
      description: "Specialized medicines and supplements for fish health.",
      link: "/products/aqua-medicines"
    },
    {
      name: "Aquaculture Equipments",
      image: "/images/product-equipments.jpg", // Placeholder - replace with actual product image
      description: "Equipment for fishery, RAS, Biofloc, and testing kits.",
      link: "/products/equipments"
    },
    {
      name: "Fresh Fish",
      image: "/images/product-freshfish.jpg", // Placeholder - replace with actual product image
      description: "Freshly produced fish from our farming operations.",
      link: "/products/fresh-fish"
    },
  ];

  // Data for USP
  const usps = [
    {
      title: "24x7 Support",
      description: "Our dedicated team is here round-the-clock to serve you.",
      icon: "📞", // Replace with React Icon component
    },
    {
      title: "Expert Consultancy",
      description: "Best consultancy services for all types of aquaculture practices.",
      icon: "👨‍💼", // Replace with React Icon component
    },
    {
      title: "Premium Quality Products",
      description: "Providing high-quality fish seeds, feeds, and medicines.",
      icon: "⭐", // Replace with React Icon component
    },
    {
      title: "Advanced Lab Services",
      description: "State-of-the-art Aqua Laboratory for water and soil testing.",
      icon: "🧪", // Replace with React Icon component
    },
  ];

  // Data for Testimonials
  const testimonials = [
    {
      quote: "Technical Service is more way better than the other Aqua-Companies available in the Field. Management of Aqua Group of taken up the aquaculture sector a new height and brings revolution to the north-east state of India. Many educated people have join this sector by getting inspiration from ABG management team.",
      name: "Saidul Islam",
      title: "Farmer and Social Activites"
    },
    {
      quote: "Aqua Group has bring innovativeness and new technologies in the field of Aquaculture",
      name: "Mr.Ibrahim Khalil Ullah",
      title: "Farmer & Fish Trader"
    },
    {
      quote: "Come for the best fish feed, best aqua medecine and most important is best on field Service to Farmers all over Assam",
      name: "Mr. Aftabur Rahman",
      title: "ASM,ABIS EXPORTS(I) PVT.LTD"
    },
    {
      quote: "Yes I can Proudly say that AQUA BLUE GROUP always Provide great service to both fellow employee and the Framers. They always walk way with a smile",
      name: "Sariful Islam",
      title: "Farmer & Fresh fish Trader"
    },
  ];

  // Data for Certifications/Partners
  const partnerLogos = [
    "/images/logo-nfdb.png", // Placeholder for NFDB - replace with actual logo path
    "/images/logo-vedicaqua.png", // Placeholder for Vedic Aqua - replace with actual logo path
    // Add other partner logos here
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
        <video
          src="/images/home.mp4" // Ensure this path is correct and video exists
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Darker overlay for better text readability */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-20 px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Empowering Sustainable Aquaculture,<br/> Enriching Lives.</h1>
          <p className="text-xl md:text-2xl mb-10">Your Trusted Partner for Premium Aquaculture Solutions – Expert Consultancy, Quality Fish Seeds, Feeds, and Aqua Medicines for a Successful Culture Cycle.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 w-full md:w-auto mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                to="/services"
                className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-300 w-full md:w-auto text-center focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Explore Services
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                to="/contact"
                className="bg-white hover:bg-blue-50 text-blue-700 border-2 border-blue-700 px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-300 w-full md:w-auto text-center focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* New About Us Section (Redesigned) */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto px-6 py-24 bg-white shadow-xl rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Text Section (Left on md+) */}
            <div className="md:col-span-1 text-center md:text-left space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-2">About Us</h2>
              <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto md:mx-0 mb-4"></div>
              <div className="text-lg text-gray-600 mt-4 leading-relaxed space-y-4">
                <p className="text-justify">
                  <span className="font-semibold text-blue-700">Aqua Blue Global Aquaculture Solutions Private Limited</span> — your trusted partner in transforming aquaculture through innovation, integrity, and impact.
                </p>
                <p className="text-justify">
                  <span className="font-semibold text-blue-700">Since 2019</span>, we've been empowering fish farmers, traders, and stakeholders across India with comprehensive, end-to-end aquaculture solutions. Our dedicated team works 24×7 to ensure you receive unparalleled support, expert guidance, and tailored services for every stage of the aquaculture value chain.
                </p>
              </div>
              <Link
                to="/about"
                className="inline-block bg-blue-600 text-white px-6 py-3 mt-6 rounded-full hover:bg-blue-700 transition duration-300"
              >
                Read More
              </Link>
            </div>

            {/* Image Section (Right on md+) */}
            <div className="md:col-span-1 flex justify-center items-center relative">
              {/* Add layered graphic overlays here (e.g., absolute positioned SVGs or pseudo-elements) */}
              {/* Example: <div className="absolute w-40 h-40 bg-blue-200 rounded-full -top-8 -left-8 z-0"></div> */}

              <motion.img
                src="/images/About.svg"
                alt="About Aqua Blue Group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="w-full h-auto max-w-sm rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 relative z-10"
                // Add clip-path or mask-image here for custom shapes
                // style={{ clipPath: 'circle(50% at 50% 50%)' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {/* Statistic 1 */}
            <div className="flex flex-col items-center relative md:border-r md:border-blue-500 last:border-r-0">
              <div className="text-4xl md:text-5xl font-bold">2,500+</div>
              <div className="w-12 h-1 bg-white my-2"></div>
              <div className="text-sm uppercase tracking-wider">Happy Clients</div>
            </div>

            {/* Statistic 2 */}
            <div className="flex flex-col items-center relative md:border-r md:border-blue-500 last:border-r-0">
              <div className="text-4xl md:text-5xl font-bold">12,000+</div>
              <div className="w-12 h-1 bg-white my-2"></div>
              <div className="text-sm uppercase tracking-wider">Farmers Connected</div>
            </div>

            {/* Statistic 3 */}
            <div className="flex flex-col items-center relative md:border-r md:border-blue-500 last:border-r-0">
              <div className="text-4xl md:text-5xl font-bold">1742</div>
              <div className="w-12 h-1 bg-white my-2"></div>
              <div className="text-sm uppercase tracking-wider">Recognitions</div>
            </div>

            {/* Statistic 4 */}
            <div className="flex flex-col items-center relative">
              <div className="text-4xl md:text-5xl font-bold">23</div>
              <div className="w-12 h-1 bg-white my-2"></div>
              <div className="text-sm uppercase tracking-wider">No. of Franchise</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-blue-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">Our Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-5xl text-blue-600 mb-6">{service.icon}</div> {/* Replace with Icon component */}
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link
                  to={service.link}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Image and Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/reviews.jpg)' }}
        ></div>
        <div className="absolute inset-0 z-0 bg-black opacity-40"></div> {/* Dark Translucent Overlay */}

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-blue-100">Real feedback from our valued farmers and partners</p>
          </div>

          {/* Navigation Arrows Placeholder Removed */}
          {/* Consider a JavaScript library for full carousel functionality if more than 4 testimonials */}
          {/* <div className="flex justify-between mb-8 max-w-md mx-auto">
              <button className="text-white hover:text-blue-300 text-3xl transition-colors duration-200">←</button>
              <button className="text-white hover:text-blue-300 text-3xl transition-colors duration-200">→</button>
          </div> */}

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white bg-opacity-85 p-8 rounded-xl shadow-lg flex flex-col justify-between h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative"
              >
                {/* Quote Icon */}
                <div className="text-blue-600 text-4xl mb-4">❝</div>

                {/* Testimonial Text */}
                <div className="flex-grow mb-4">
                    <p className="text-gray-700 italic leading-relaxed">{testimonial.quote}</p>
                </div>

                {/* Client Info */}
                <div className="flex items-center mt-4">
                    {/* Client Photo Placeholder (replace with img if available) */}
                    <div className="w-12 h-12 rounded-full bg-blue-400 flex-shrink-0 mr-4 flex items-center justify-center text-white text-sm font-semibold">{testimonial.name.split(' ')[0][0]}{testimonial.name.split(' ').length > 1 ? testimonial.name.split(' ')[1][0] : ''}</div>
                    <div>
                        <p className="font-semibold text-blue-800">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.title}</p>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* See More Button Removed */}
          {/* <div className="mt-12 text-center">
              <Link
                to="/testimonials"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300 font-semibold"
              >
                See More
              </Link>
          </div> */}

        </div>
      </section>

      {/* Why Choose Us (USP) Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Image and Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/why.jpg)' }}
        ></div>
        <div className="absolute inset-0 z-0 bg-black opacity-50"></div> {/* Dark Translucent Overlay */}

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">Why Choose Aqua Blue Group?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {usps.map((usp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="p-6 bg-white bg-opacity-90 rounded-xl shadow-lg text-gray-800"
              >
                <div className="text-5xl mb-4 text-blue-600">{usp.icon}</div> {/* Replace with Icon component */}
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{usp.title}</h3>
                <p className="text-gray-600">{usp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-blue-600 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content (Left on md+) */}
          <div className="md:col-span-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a Solution? Let's Talk.</h2>
            <p className="text-xl mb-10">Get in touch with our experts to find the perfect water treatment solution for your needs.</p>
            <Link
              to="/contact"
              className="inline-block bg-white hover:bg-gray-200 text-blue-700 px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg"
            >
              Contact Us Today
            </Link>
          </div>

          {/* Image (Right on md+) */}
          <div className="md:col-span-1 flex justify-center items-center">
            <img
              src="/images/talk.svg"
              alt="Let's Talk Illustration"
              className="w-full h-auto max-w-sm"
            />
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;