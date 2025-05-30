import React from 'react';

const Services: React.FC = () => {
  return (
    <div className="min-h-screen" style={{
      backgroundColor: '#fcf9f5', // Light cream background
      backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', // Faint dotted pattern
      backgroundSize: '20px 20px'
    }}>
      <div className="container mx-auto px-4 pt-32 text-center">
        {/* Header Section */}
        <div className="mb-12">
          <p className="text-sm uppercase tracking-widest text-gray-600 mb-2">PROFESSIONAL SERVICES</p>
          <h1 className="text-6xl font-serif text-[#2d215b] mb-6">Realize your aquaculture<br />goals faster</h1>
          <p className="text-sm text-gray-700 max-w-2xl mx-auto">Our expert team provides comprehensive services and support to help you achieve<br />your aquaculture objectives efficiently and<br />effectively.</p>
        </div>

        {/* Book a Demo Button */}
        <div className="mb-12">
          <a href="/join-us#join-us" className="inline-block bg-[#6a4da8] hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
            Join us
          </a>
        </div>

        {/* Illustration Section */}
        <div className="flex justify-center mb-12">
          {/* Placeholder Illustration - Replace src with the uploaded image path */}
          <img 
            src="/images/services-workflow.svg" 
            alt="Workflow illustration" 
            className="max-w-4xl h-auto mx-auto" // Responsive, centered, and reduced max width
          />
        </div>
      </div>

      {/* Workflow Automation Maturity Section */}
      <div className="py-20" style={{
        backgroundColor: '#fcf9f5', // Light cream background
        backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', // Faint dotted pattern
        backgroundSize: '20px 20px'
      }}>
        <div className="container mx-auto px-4">
          {/* Main 3-column grid on medium+ screens, stacks on small */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-stretch">

            {/* Left Column - Heading and Illustration Box */}
            <div className="md:col-span-2 p-8 rounded-xl shadow-sm flex flex-col" style={{
              backgroundColor: '#ffffff', // White background for the box
              backgroundImage: 
                'linear-gradient(to right, rgba(209,213,219,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(209,213,219,0.5) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}>
              <h2 className="text-4xl md:text-5xl font-serif text-[#2d215b] leading-tight text-center md:text-left mb-8">
                Fine-tuning every stage of workflow automation maturity
              </h2>
              {/* Placeholder Illustration - Replace with actual SVG or image */}
              {/* Adjusted placeholder size and shape for a more vertical feel */}
              <div className="w-64 h-80 bg-purple-200 rounded-xl flex items-center justify-center text-purple-800 font-bold mt-auto mx-auto md:mx-0">
                  Illustration Placeholder
              </div>
            </div>

            {/* Right Column - Service Boxes in a single large card */}
            <div className="md:col-span-1 p-8 rounded-xl shadow-sm bg-white" style={{
              backgroundImage: 
                'linear-gradient(to right, rgba(209,213,219,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(209,213,219,0.5) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Service Box 1 */}
                <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col h-full">
                  <h3 className="font-bold text-[#2d215b] mb-2">Advisory</h3>
                  <p className="text-gray-700 text-sm">The path to workflow maturity is evolving as technologies change. Our advisory services provide coaching and consulting on how to optimize your workflows.</p>
                </div>
                {/* Service Box 2 */}
                <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col h-full">
                  <h3 className="font-bold text-[#2d215b] mb-2">Story building</h3>
                  <p className="text-gray-700 text-sm">We'll jump-start your journey by building a selection of end-to-end use cases while your team goes through onboarding and initial training.</p>
                </div>
                {/* Service Box 3 */}
                <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col h-full">
                  <h3 className="font-bold text-[#2d215b] mb-2">Automation workshop</h3>
                  <p className="text-gray-700 text-sm">These offer an assessment of your workflow environment to identify new use cases and iterate on your processes. We'll identify whitespace, develop a short-and long-term plan.</p>
                </div>
                {/* Service Box 4 */}
                <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col h-full">
                  <h3 className="font-bold text-[#2d215b] mb-2">Migration</h3>
                  <p className="text-gray-700 text-sm">Our experts provide the project management and technical expertise to support you. We look for opportunities to optimize your workflow strategy and embed your team into Tines.</p>
                </div>
                {/* Service Box 5 */}
                <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col h-full">
                  <h3 className="font-bold text-[#2d215b] mb-2">Technical training</h3>
                  <p className="text-gray-700 text-sm">At any stage in your automation journey, hands-on training provides your team with the guidance and coaching they need from our expert trainers.</p>
                </div>
                 {/* Service Box 6 */}
                 {/* Added a 6th placeholder box to match the 2x3 grid layout possibility */}
                 <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col h-full">
                  <h3 className="font-bold text-[#2d215b] mb-2">Service Title 6</h3>
                  <p className="text-gray-700 text-sm">Short description for service 6.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;