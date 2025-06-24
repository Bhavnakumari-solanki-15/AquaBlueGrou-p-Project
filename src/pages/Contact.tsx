import React, { useState } from 'react';
import { FormService } from '../services/formService';
import { ContactUsFormData, TenantDownFormData } from '../types/forms';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Contact: React.FC = () => {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  
  // Contact form state
  const [contactFormData, setContactFormData] = useState<ContactUsFormData>({
    question: '',
    email: '',
    description: ''
  });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSubmitStatus, setContactSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetHelpClick = () => {
    setIsEmergencyModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEmergencyModalOpen(false);
  };

  const handleContactInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setContactFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleContactSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      alert('Please sign up or log in to continue.');
      navigate(`/signup?redirectTo=${encodeURIComponent(location.pathname)}`);
      return;
    }
    setIsContactSubmitting(true);
    setContactSubmitStatus({ type: null, message: '' });

    try {
      const result = await FormService.submitContactUsForm({
        ...contactFormData,
        file: selectedFile || undefined,
      });
      
      if (result.success) {
        setContactSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. We will get back to you soon.'
        });
        // Reset form
        setContactFormData({
          question: '',
          email: '',
          description: ''
        });
        setSelectedFile(null);
      } else {
        setContactSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      setContactSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsContactSubmitting(false);
    }
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
              <img src="/images/Contact.svg" alt="Contact Us Illustration" className="w-full h-full object-cover" />
            </div>

            {/* Right Column: Info Card */}
            <div className="w-full md:w-5/12 bg-[#f3e8ff] rounded-md shadow-md p-8">
              {/* Fastest Way Box */}
              <div className="bg-[#e9d8fd] rounded-md p-4 mb-6">
                <p className="text-sm text-gray-800">
                  <span className="font-semibold mr-2">ℹ️</span> The fastest way to reach us is to <a href="mailto:office.abgroupassam@gmail.com" className="text-[#6a4da8] underline">send us a message</a>.
                </p>
              </div>

              {/* Email Section */}
              {/* Removed Aqua Blue Group email section */}

              {/* Office Addresses Section */}
              {/* Removed Office addresses section (ASSAM address and phone numbers) */}

              {/* Grievance Officer Section */}
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold text-[#6a4da8] mb-3">👤 Grievance Officer</h3>
                <div className="text-sm text-gray-700">
                  <p className="font-bold mb-1">Ms. Avina Sultana</p>
                  <p className="font-bold text-gray-600">Senior Manager,</p>
                  <p className="font-bold text-gray-600 mb-2">Operations and Human Resource</p>
                  <p className="font-bold">Aqua Blue Global Aquaculture Solutions Private Limited</p>
                  <p className="mt-2">
                    <span className="font-semibold">Email: </span>
                    <a href="mailto:office.abgroupassam@gmail.com" className="text-[#6a4da8] font-bold">office.abgroupassam@gmail.com</a>
                  </p>
                  <p>
                    <span className="font-semibold">Phone: </span>
                    <a href="tel:+918403938247" className="text-[#6a4da8] font-bold">+91-8403938247</a>
                  </p>
                  <p className="font-bold mt-2">Address: Aqua Blue Corporate Office, Paliguri, Jagiroad, Morigaon (Assam), 782410</p>
                  <p className="mt-2">
                    <span className="font-semibold">Working Hours: </span>
                    <span className="font-bold">Monday to Saturday (10:00 AM to 6:00 PM IST)</span>
                  </p>
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
                
                {/* Status Messages */}
                {contactSubmitStatus.type && (
                  <div className={`mb-4 p-4 rounded-lg ${
                    contactSubmitStatus.type === 'success' 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                    {contactSubmitStatus.message}
                  </div>
                )}
                
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="question"
                      placeholder="What's your question?"
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:border-[#6a4da8] focus:ring-[#6a4da8] bg-white px-3 py-2"
                      value={contactFormData.question}
                      onChange={handleContactInputChange}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:border-[#6a4da8] focus:ring-[#6a4da8] bg-white px-3 py-2"
                      value={contactFormData.email}
                      onChange={handleContactInputChange}
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="description"
                      placeholder="Describe your issue"
                      rows={4}
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:border-[#6a4da8] focus:ring-[#6a4da8] bg-white px-3 py-2"
                      value={contactFormData.description}
                      onChange={handleContactInputChange}
                      required
                    ></textarea>
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
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">Size limit: 5 MB</p>
                        {selectedFile && <p className="mt-2 text-sm text-gray-500">Selected file: {selectedFile.name}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button and Agreement */}
                  <div className="mt-6 flex items-center gap-4">
                    <button
                      type="submit"
                      className={`inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md ${
                        isContactSubmitting 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'text-white bg-[#6a4da8] hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                      }`}
                      disabled={isContactSubmitting}
                    >
                      {isContactSubmitting ? 'Sending...' : 'Submit'}
                    </button>
                    <p className="text-xs text-gray-600 max-w-xs">
                      By filling out this form you agree to the terms and conditions in our <a href="#" className="text-[#6a4da8] underline">privacy notice</a>.
                    </p>
                  </div>
                </form>
              </div>

              {/* Emergencies */}
              <div>
                <h3 className="text-lg font-semibold text-[#6a4da8] mb-6">Emergencies</h3>
                {/* Contact Details */}
                <div className="bg-[#f3e8ff] rounded-md shadow-md p-8">
                  <h3 className="text-lg font-semibold text-[#6a4da8] mb-3">✉️ Email</h3>
                  <p className="text-sm text-gray-700 font-bold">Aqua Blue Group: <a href="mailto:abgroupassam@gmail.com" className="text-[#6a4da8] font-bold">abgroupassam@gmail.com</a></p>
                  <h3 className="text-lg font-semibold text-[#6a4da8] mb-3 mt-4">📞 Phone</h3>
                  <p className="text-sm text-gray-700 font-bold">0-8403938247, 0-6001175252</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;