import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  const handleGetHelpClick = () => {
    setIsEmergencyModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEmergencyModalOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fcf9f5' }}>
      {/* Centered Heading */}
      <section className="py-20 text-center" style={{ backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#6a4da8] mb-12 mt-20">Contact</h1>
        </div>
      </section>

      {/* Two-Column Layout */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 justify-center">
            {/* Left Column: Image */}
            <div className="w-full md:w-5/12 rounded-md overflow-hidden shadow-md">
              {/* Placeholder Image - Replace with actual office image */}
              <img src="/placeholder-office.jpg" alt="Office Interior" className="w-full h-full object-cover" />
            </div>

            {/* Right Column: Info Card */}
            <div className="w-full md:w-5/12 bg-[#f3e8ff] rounded-md shadow-md p-8">
              {/* Fastest Way Box */}
              <div className="bg-[#e9d8fd] rounded-md p-4 mb-6">
                <p className="text-sm text-gray-800">
                  <span className="font-semibold mr-2">ℹ️</span> The fastest way to reach us is to <a href="#" className="text-[#6a4da8] underline">send us a message</a>.
                </p>
              </div>

              {/* Email Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#6a4da8] mb-3">✉️ Email</h3>
                <p className="text-sm text-gray-700 font-bold">Aqua Blue Group: <a href="mailto:abgroupassam@gmail.com" className="text-[#6a4da8] font-bold">abgroupassam@gmail.com</a></p>
              </div>

              {/* Office Addresses Section */}
              <div>
                <h3 className="text-lg font-semibold text-[#6a4da8] mb-3">📍 Office addresses</h3>
                <div className="flex flex-col gap-6">
                  {/* Assam Address */}
                  <div className="w-full md:w-1/2 text-sm text-gray-700">
                    <p className="font-semibold mb-1 font-bold">ASSAM</p>
                    <p className="font-bold">Aqua Blue Group Office</p>
                    <p className="font-bold">Paliguri, Jagiroad</p>
                    <p className="font-bold">Dist:- Morigaon (Assam)</p>
                    <p className="font-bold">India</p>
                    <p className="font-bold">0-8403938247 0-6001175252</p>
                  </div>
                </div>
              </div>

              {/* Area Covered Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-[#6a4da8] mb-1 font-bold">Area Covered</h3>
                <p className="text-sm text-gray-700 font-bold">Assam, Meghalaya, Nagaland, Mizoram, Arunachal Pradesh, Tripura, Manipur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support Card */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-[#f3e8ff] rounded-lg shadow-md p-12 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#6a4da8] mb-8 text-center">Contact support</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* General Queries Column */}
              <div>
                <h3 className="text-lg font-semibold text-[#6a4da8] mb-4">General queries</h3>
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="What's your question?"
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:border-[#6a4da8] focus:ring-[#6a4da8] bg-white px-3 py-2"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email *"
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:border-[#6a4da8] focus:ring-[#6a4da8] bg-white px-3 py-2"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Describe your issue"
                      rows={4}
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:border-[#6a4da8] focus:ring-[#6a4da8] bg-white px-3 py-2"
                    ></textarea>
                  </div>
                </div>

                {/* Attach File */}
                <div className="mt-6">
                  <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">Attach a file (optional)</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#d1d5db] border-dashed rounded-md bg-[#e9d8fd]">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-[#e9d8fd] rounded-md font-medium text-[#6a4da8] hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                          <span>Choose a file or drag and drop here</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">Size limit: 5 MB</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button and Agreement */}
                <div className="mt-6 flex items-center gap-4">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#6a4da8] hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Submit
                  </button>
                  <p className="text-xs text-gray-600 max-w-xs">
                    By filling out this form you agree to the terms and conditions in our <a href="#" className="text-[#6a4da8] underline">privacy notice</a>.
                  </p>
                </div>
              </div>

              {/* Emergencies */}
              <div>
                <h3 className="text-lg font-semibold text-[#6a4da8] mb-6">Emergencies</h3>
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
              </div>
            </div>
          </div>
        </div>
      </section>

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
}

export default Contact;