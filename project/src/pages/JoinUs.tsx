import React, { useState, useEffect } from 'react';

interface District {
  Code: string;
  State: string;
  District: string;
}

const JoinUs: React.FC = () => {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [allDistricts, setAllDistricts] = useState<District[]>([]);

  useEffect(() => {
    // Fetch the Indian states and districts data
    fetch('https://raw.githubusercontent.com/iaseth/data-for-india/master/data/readable/districts.json')
      .then(response => response.json())
      .then((data: District[]) => {
        setAllDistricts(data);
        const uniqueStates = Array.from(new Set(data.map(item => item.State))).sort();
        setStates(uniqueStates);
      })
      .catch(error => console.error('Error fetching state and district data:', error));
  }, []);

  useEffect(() => {
    if (selectedState) {
      const filteredDistricts = allDistricts
        .filter(item => item.State === selectedState)
        .map(item => item.District)
        .sort();
      setDistricts(filteredDistricts);
      setSelectedDistrict(''); // Reset district when state changes
    } else {
      setDistricts([]);
      setSelectedDistrict('');
    }
  }, [selectedState, allDistricts]);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(event.target.value);
  };

  const handleGetHelpClick = () => {
    setIsEmergencyModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEmergencyModalOpen(false);
  };

  const scrollToJoinUs = () => {
    const joinUsSection = document.getElementById('join-us');
    if (joinUsSection) {
      joinUsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Join Us Hero Section */}
      <div className="relative min-h-[80vh] py-32 bg-white overflow-hidden">
        {/* Dotted grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#2d215b 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />

        {/* Decorative Images - Responsive positioning */}
        <div className="absolute top-[10%] left-[5%] w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-2xl bg-[#c7f2d4] transform -rotate-12">
          <img src="/images/image6.png" alt="Decorative" className="w-full h-full object-cover rounded-2xl" />
        </div>
        <div className="absolute top-[15%] right-[5%] w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-2xl bg-[#fdd3e2] transform rotate-12">
          <img src="/images/image7.png" alt="Decorative" className="w-full h-full object-cover rounded-2xl" />
        </div>
        <div className="absolute bottom-[15%] left-[5%] w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-2xl bg-[#dec9f8] transform -rotate-6">
          <img src="/images/image8.png" alt="Decorative" className="w-full h-full object-cover rounded-2xl" />
        </div>
        <div className="absolute bottom-[10%] right-[5%] w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-2xl bg-[#ffe3c0] transform rotate-6">
          <img src="/images/image9.png" alt="Decorative" className="w-full h-full object-cover rounded-2xl" />
        </div>

        {/* Content - Improved spacing and responsiveness */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <span className="text-sm uppercase tracking-wider text-[#2d215b] font-semibold block">
                CAREERS
              </span>
            </div>
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2d215b] leading-tight">
                Join our team
              </h1>
            </div>
            <div className="mb-12">
              <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Become a member of Aqua Blue Group and connect with us. Get updates about new aquaculture technologies and exclusive benefits. Fill up the form below, and we'll get in touch with you within 24 hours.
              </p>
            </div>
            <div className="mt-8">
              <button
                onClick={scrollToJoinUs}
                className="bg-[#2d215b] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#3d2b6b] transition-colors duration-300 transform hover:-translate-y-1"
              >
                Join us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Join Us Form Section */}
      <div id="join-us" className="bg-white py-12 flex justify-center items-center">
        <div className="bg-[#f3ecf7] rounded-xl shadow-lg p-8 md:p-12 max-w-4xl w-full border border-gray-100">
          <h1 className="text-4xl font-semibold text-[#2d215b] mb-6">Join Us</h1>
          <div className="border-b border-gray-200 mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column: Join Us Form */}
            <div>
              <h2 className="text-2xl font-semibold text-[#2d215b] mb-6">Join Us Details</h2>
              <form className="space-y-6">
                {/* Original Join Us form fields */}
                <div>
                  <label htmlFor="fullName" className="block text-[#2d215b] text-sm font-bold mb-2">Your Full Name <span className="text-red-500">*</span></label>
                  <input type="text" id="fullName" name="fullName" placeholder="Your Full Name" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#2d215b]" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[#2d215b] text-sm font-bold mb-2">Your Phone Number <span className="text-red-500">*</span></label>
                  <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#2d215b]" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#2d215b] text-sm font-bold mb-2">Email ID (if Available)</label>
                  <input type="email" id="email" name="email" placeholder="Email ID" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#2d215b]" />
                </div>
                {/* State Dropdown */}
                <div>
                  <label htmlFor="state" className="block text-[#2d215b] text-sm font-bold mb-2">Name of your State <span className="text-red-500">*</span></label>
                  <select id="state" name="state" value={selectedState} onChange={handleStateChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#2d215b]" required>
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                {/* District Dropdown */}
                <div>
                  <label htmlFor="district" className="block text-[#2d215b] text-sm font-bold mb-2">Name of your District <span className="text-red-500">*</span></label>
                  <select id="district" name="district" value={selectedDistrict} onChange={handleDistrictChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#2d215b]" required disabled={!selectedState}>
                    <option value="">Select District</option>
                    {districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="area" className="block text-[#2d215b] text-sm font-bold mb-2">Area <span className="text-red-500">*</span></label>
                  <input type="text" id="area" name="area" placeholder="Area" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#2d215b]" required />
                </div>

                {/* Attach File */}
                <div className="pt-4 border-t border-gray-200">
                  <label htmlFor="file-upload" className="block text-[#2d215b] text-sm font-bold mb-2">Attach a file (optional)</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-[#2d215b] transition-colors">
                    <input type="file" id="file-upload" name="file-upload" className="hidden" />
                    <p className="text-[#2d215b]">Choose a file or drag and drop here</p>
                    <p className="text-sm text-gray-500">Size limit: 5 MB</p>
                  </div>
                </div>

                {/* Submit Button and Terms */}
                <div className="flex flex-col md:flex-row items-center md:justify-between pt-6">
                  <button type="submit" className="bg-[#2d215b] hover:bg-[#3d2b6b] text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 mb-4 md:mb-0">
                    Submit
                  </button>
                  <p className="text-sm text-gray-600 text-center md:text-right">
                    By filling out this form you agree to the terms<br /> and conditions in our <a href="#" className="text-[#2d215b] hover:underline">privacy notice</a>.
                  </p>
                </div>
              </form>
            </div>

            {/* Right Column */}
            <div className="pt-8 md:pt-0">
              {/* Emergencies */}
              <h2 className="text-2xl font-semibold text-[#2d215b] mb-6">Emergencies</h2>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8 flex items-center justify-between">
                <p className="text-orange-800 font-semibold flex items-center">
                  <span className="mr-2 text-xl">🔥</span> Is your tenant down?
                </p>
                <button
                  className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-bold py-2 px-4 rounded transition-colors duration-200"
                  onClick={handleGetHelpClick}
                >
                  Get help now
                </button>
              </div>

              {/* Learn More */}
              
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Modal */}
      {isEmergencyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleCloseModal}> {/* Overlay */}
          {/* Modal content - made broader, more curved, and removed close button/attach file */}
          <div
            className="bg-white rounded-xl shadow-xl p-8 md:p-12 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              msOverflowStyle: 'none', // IE and Edge
              scrollbarWidth: 'none', // Firefox
            }}
          >
            {/* Webkit scrollbar hide (Chrome, Safari) */}
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Illustration (Placeholder) */}
            <div className="flex justify-center mb-4">
              {/* Replace with your actual illustration component or img */}
              <img src="/images/image5.png" alt="Tenant down illustration" className="h-20 w-auto" />
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Tenant down</h2>
            <p className="text-sm text-center text-gray-600 mb-6">Please only submit a request if your tenant is unavailable or otherwise unusable.</p>

            <form className="space-y-4">
              <div>
                <label htmlFor="tenantName" className="block text-gray-700 text-sm font-bold mb-2">Your name <span className="text-red-500">*</span></label>
                <input type="text" id="tenantName" name="tenantName" placeholder="Your name *" className="shadow appearance-none border border-orange-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500 placeholder-gray-400" required />
              </div>
              <div>
                <label htmlFor="tenantEmail" className="block text-gray-700 text-sm font-bold mb-2">Your email <span className="text-red-500">*</span></label>
                <input type="email" id="tenantEmail" name="tenantEmail" placeholder="Your email *" className="shadow appearance-none border border-orange-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500 placeholder-gray-400" required />
              </div>
              <div>
                <label htmlFor="tenantURL" className="block text-gray-700 text-sm font-bold mb-2">Tenant URL <span className="text-red-500">*</span></label>
                <input type="text" id="tenantURL" name="tenantURL" placeholder="Tenant URL *" className="shadow appearance-none border border-orange-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500 placeholder-gray-400" required />
              </div>
              <div>
                <label htmlFor="moreInfo" className="block text-gray-700 text-sm font-bold mb-2">Add more information</label>
                <textarea id="moreInfo" name="moreInfo" rows={4} placeholder="Add more information" className="shadow appearance-none border border-orange-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500 placeholder-gray-400"></textarea>
              </div>

              {/* Submit Button and Terms */}
              <div className="flex flex-col md:flex-row items-center md:justify-between pt-6">
                <button type="submit" className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 mb-4 md:mb-0">
                  Submit
                </button>
                <p className="text-sm text-gray-600 text-center md:text-right">
                  By filling out this form you agree to the terms<br /> and conditions in our <a href="#" className="text-blue-600 hover:underline">privacy notice</a>.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinUs; 