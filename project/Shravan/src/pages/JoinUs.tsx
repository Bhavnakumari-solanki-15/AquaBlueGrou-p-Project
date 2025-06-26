import React, { useState, useEffect } from 'react';
import { FormService } from '../services/formService';
import { JoinUsFormData } from '../types/forms';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

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
  
  // Form state
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    state: '',
    district: '',
    area: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Tenant Down form state
  const [tenantDownForm, setTenantDownForm] = useState({
    name: '',
    email: '',
    tenantUrl: '',
    description: ''
  });
  const [tenantDownStatus, setTenantDownStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isTenantSubmitting, setIsTenantSubmitting] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch the Indian states and districts data
    fetch('https://raw.githubusercontent.com/iaseth/data-for-india/master/data/readable/districts.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: any) => {
        // Ensure data is an array before processing
        if (Array.isArray(data)) {
          setAllDistricts(data);
          const uniqueStates = Array.from(new Set(data.map(item => item.State))).sort();
          setStates(uniqueStates);
        } else {
          console.error('Received data is not in expected format');
          setStates([]);
        }
      })
      .catch(error => {
        console.error('Error fetching state and district data:', error);
        setStates([]);
      });
  }, []);

  useEffect(() => {
    if (selectedState) {
      const filteredDistricts = allDistricts
        .filter(item => item.State === selectedState)
        .map(item => item.District)
        .sort();
      setDistricts(filteredDistricts);
      setSelectedDistrict(''); // Reset district when state changes
      setFormData(prev => ({ ...prev, state: selectedState, district: '' }));
    } else {
      setDistricts([]);
      setSelectedDistrict('');
      setFormData(prev => ({ ...prev, state: '', district: '' }));
    }
  }, [selectedState, allDistricts]);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(event.target.value);
    setFormData(prev => ({ ...prev, district: event.target.value }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign up or log in to continue.');
      navigate(`/signup?redirectTo=${encodeURIComponent(location.pathname)}`);
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await FormService.submitJoinUsForm({
        name: formData.full_name,
        phone: formData.phone,
        email: formData.email,
        state: formData.state,
        district: formData.district,
        area: formData.area,
        file: selectedFile || undefined
      });

      if (!result.success) {
        throw new Error(result.error || 'Form submission failed');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your application has been submitted successfully. We will get in touch with you within 24 hours.'
      });
      
      // Reset form
      setFormData({
        full_name: '',
        phone: '',
        email: '',
        state: '',
        district: '',
        area: '',
      });
      setSelectedFile(null);

    } catch (error: any) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTenantDownInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTenantDownForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTenantDownSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTenantSubmitting(true);
    setTenantDownStatus({ type: null, message: '' });
    try {
      const result = await FormService.submitTenantDownForm({
        name: tenantDownForm.name,
        email: tenantDownForm.email,
        tenantUrl: tenantDownForm.tenantUrl,
        description: tenantDownForm.description
      });
      if (result.success) {
        setTenantDownStatus({ type: 'success', message: 'Your emergency request has been submitted successfully!' });
        setTenantDownForm({ name: '', email: '', tenantUrl: '', description: '' });
        setTimeout(() => {
          setIsEmergencyModalOpen(false);
          setTenantDownStatus({ type: null, message: '' });
        }, 2000);
      } else {
        setTenantDownStatus({ type: 'error', message: result.error || 'Submission failed. Please try again.' });
      }
    } catch (err) {
      setTenantDownStatus({ type: 'error', message: 'An unexpected error occurred.' });
    } finally {
      setIsTenantSubmitting(false);
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

          {/* Status Messages - only show once */}
          {submitStatus.type && (
            <div className={`mb-6 p-4 rounded-lg ${
              submitStatus.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {submitStatus.message}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column: Join Us Form */}
            <div>
              <h2 className="text-2xl font-semibold text-[#2d215b] mb-6">Join Us Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6a4da8] focus:border-[#6a4da8] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6a4da8] focus:border-[#6a4da8] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6a4da8] focus:border-[#6a4da8] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                  <select
                    id="state"
                    name="state"
                    value={selectedState}
                    onChange={handleStateChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6a4da8] focus:border-[#6a4da8] sm:text-sm"
                  >
                    <option value="">Select your state</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
                  <select
                    id="district"
                    name="district"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    required
                    disabled={!selectedState}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6a4da8] focus:border-[#6a4da8] sm:text-sm"
                  >
                    <option value="">Select your district</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area</label>
                  <input
                    type="text"
                    name="area"
                    id="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6a4da8] focus:border-[#6a4da8] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700">Attach Resume (Optional)</label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#6a4da8] file:text-white hover:file:bg-[#5a3da0]"
                  />
                  {selectedFile && <p className="mt-2 text-sm text-gray-500">Selected file: {selectedFile.name}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6a4da8] hover:bg-[#5a3da0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6a4da8]"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>

            {/* Right Column */}
            <div className="pt-8 md:pt-0">
              {/* Emergencies */}
              <h2 className="text-2xl font-semibold text-[#2d215b] mb-6">Emergencies</h2>
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

            <form className="space-y-4" onSubmit={handleTenantDownSubmit}>
              {/* Status Message */}
              {tenantDownStatus.type && (
                <div className={`mb-4 p-3 rounded-lg text-center ${
                  tenantDownStatus.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {tenantDownStatus.message}
                </div>
              )}
              <div>
                <label htmlFor="tenantName" className="block text-gray-700 text-sm font-bold mb-2">Your name <span className="text-red-500">*</span></label>
                <input type="text" id="tenantName" name="name" placeholder="Your name *" value={tenantDownForm.name} onChange={handleTenantDownInputChange} className="shadow appearance-none border border-orange-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500 placeholder-gray-400" required />
              </div>
              <div>
                <label htmlFor="tenantEmail" className="block text-gray-700 text-sm font-bold mb-2">Your email <span className="text-red-500">*</span></label>
                <input type="email" id="tenantEmail" name="email" placeholder="Your email *" value={tenantDownForm.email} onChange={handleTenantDownInputChange} className="shadow appearance-none border border-orange-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500 placeholder-gray-400" required />
              </div>
              <div>
                <label htmlFor="tenantURL" className="block text-gray-700 text-sm font-bold mb-2">Tenant URL <span className="text-red-500">*</span></label>
                <input type="text" id="tenantURL" name="tenantUrl" placeholder="Tenant URL *" value={tenantDownForm.tenantUrl} onChange={handleTenantDownInputChange} className="shadow appearance-none border border-orange-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500 placeholder-gray-400" required />
              </div>
              <div>
                <label htmlFor="moreInfo" className="block text-gray-700 text-sm font-bold mb-2">Add more information</label>
                <textarea id="moreInfo" name="description" rows={4} placeholder="Add more information" value={tenantDownForm.description} onChange={handleTenantDownInputChange} className="shadow appearance-none border border-orange-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500 placeholder-gray-400"></textarea>
              </div>

              {/* Submit Button and Terms */}
              <div className="flex flex-col md:flex-row items-center md:justify-between pt-6">
                <button type="submit" disabled={isTenantSubmitting} className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 mb-4 md:mb-0">
                  {isTenantSubmitting ? 'Submitting...' : 'Submit'}
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