import React, { useState, useEffect, useRef } from 'react';
import qaData from '../qa-data.json'; // Placeholder for Q&A JSON import
import { useAuth } from '../context/AuthContext';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const [showQA, setShowQA] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [chat, setChat] = useState<{question: string, answer: string}[]>([]);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const { user } = useAuth();

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const closeChatbot = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the chatbot panel and not on the open button
      if (chatbotRef.current && !chatbotRef.current.contains(event.target as Node) && !(event.target as Element).closest('.chatbot-open-button')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Q&A search function (simple match, can be improved)
  const findAnswer = (input: string): string => {
    if (!input) return '';
    const lower = input.toLowerCase();
    // Exact match first
    let found = qaData.find((qa: any) => qa.question.toLowerCase() === lower);
    if (found) return found.answer;
    // Partial match
    found = qaData.find((qa: any) => lower.includes(qa.question.toLowerCase()) || qa.question.toLowerCase().includes(lower));
    if (found) return found.answer;
    // Fallback
    return (
      "Sorry, I don't have an answer for that. Please contact our team for more help.\n" +
      "\n" +
      "You can contact Aqua Blue Group:\n" +
      "Email: abgroupassam@gmail.com\n" +
      "Phone: 0-8403938247, 0-6001175252\n" +
      "Address: Aqua Blue Group Office, Paliguri, Jagiroad, Dist:- Morigaon (Assam), India"
    );
  };

  const handleAskClick = () => {
    setShowQA(true);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const answer = findAnswer(userInput.trim());
    setChat([...chat, { question: userInput, answer }]);
    setUserInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Icon Trigger (Open Button) */}
      {!isOpen && (
        <button
          className="chatbot-open-button bg-orange-500 text-white rounded-full p-4 shadow-lg hover:bg-orange-600 transition-colors duration-300 focus:outline-none"
          onClick={toggleChatbot}
          aria-label="Open chatbot"
        >
          {/* Placeholder Chat Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Floating Icon Trigger (Close Button) */}
      {isOpen && (
        <></>
      )}

      {/* Chatbot Panel */}
      {isOpen && (
        <div ref={chatbotRef} className="fixed bottom-20 right-6 w-[360px] max-w-[90vw] max-h-[80vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
           {/* Custom Scrollbar Styles */}
           <style>{`
            .chatbot-content::-webkit-scrollbar {
              width: 6px;
            }
            .chatbot-content::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }
            .chatbot-content::-webkit-scrollbar-thumb {
              background: #888;
              border-radius: 10px;
            }
            .chatbot-content::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
            .chatbot-content {
              scrollbar-width: thin;
              scrollbar-color: #888 #f1f1f1;
            }
          `}</style>
          {/* Panel Close Button (top right inside panel) */}
          <button
            className="absolute top-2 right-2 z-10 bg-orange-300 text-white rounded-full p-2 shadow-lg hover:bg-orange-400 transition-colors duration-300 focus:outline-none"
            onClick={closeChatbot}
            aria-label="Close chatbot"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#f97316] to-[#fcd34d] text-gray-900">
            <div className="flex items-center">
              {/* Placeholder Tines-like Logo */}
              <img src="/images/aquablue-logo.png" alt="Chatbot Logo" className="h-8 w-8 rounded-full mr-3" />
              <div>
                <span className="block text-base font-semibold leading-tight">Hi there 👋</span>
                 <span className="block text-lg font-bold leading-tight">How can we help?</span>
              </div>
            </div>
            {/* Profile Pictures */}
            <div className="flex items-center">
              {user?.user_metadata?.avatar_url ? (
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src={user.user_metadata.avatar_url}
                  alt="User Avatar"
                />
              ) : user?.email ? (
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-purple-200 flex items-center justify-center text-base font-bold text-purple-700">
                  {user.email[0].toUpperCase()}
                </div>
              ) : (
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-300 flex items-center justify-center text-base font-bold text-gray-700">?</div>
              )}
            </div>
          </div>

          {/* Main Menu or Q&A Chat */}
          {!showQA ? (
            <>
          <div className="chatbot-content flex-grow overflow-y-auto p-4 space-y-3 bg-gray-50">
            {/* Main Buttons */}
                <button className="w-full text-left p-4 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition-colors border border-gray-200" onClick={handleAskClick}>
              <span className="block font-semibold text-sm">Ask a question</span>
              <span className="block text-xs text-gray-500">AI Agent and team can help</span>
            </button>
            {/* About Aqua Blue Group Section */}
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold mb-2 text-base">About Aqua Blue Group</h3>
              <p className="text-sm text-gray-700 mb-3">Revolutionizing aquaculture with expert consultancy, premium products, and advanced laboratory services.</p>
              {/* Placeholder Image related to aquaculture - styled to fit card */}
              <img src="/images/aquablue-logo.png" alt="Aqua Blue Group Logo" className="w-full h-40 object-contain rounded-md mb-3" />
              <p className="text-sm text-gray-700">We offer a range of services including consultancy, high-quality fish seeds, suitable fish feeds, aqua medicines, and laboratory testing.</p>
            </div>
            
            {/* Additional placeholder cards related to services or contact */}
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold mb-2 text-base">Our Services</h3>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                <li>Consultancy Services</li>
                <li>High-Quality Fish Seeds</li>
                <li>Premium Fish Feeds</li>
                <li>Aqua Medicines</li>
                <li>Laboratory Services</li>
              </ul>
            </div>
             <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold mb-2 text-base">Contact Us</h3>
               <p className="text-sm text-gray-700">Find our contact information and office address on the <a href="/contact" className="text-blue-600 hover:underline">Contact Us page</a>.</p>
            </div>
          </div>
          {/* Bottom Navigation Bar */}
              <div className="flex justify-around items-center p-3 border-t border-gray-200 bg-white text-gray-600 text-xs relative">
            <div className="flex flex-col items-center text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7M19 10v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="mt-1">Home</span>
            </div>
                <div className="flex flex-col items-center cursor-pointer" onClick={() => setShowContactInfo(!showContactInfo)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9.247a4.002 4.002 0 014.085 1.182 4.002 4.002 0 01-.746 5.653m-3.346-3.346a4.002 4.002 0 015.653-.746c1.46-.755 3.14-.22 4.085 1.182A4.002 4.002 0 0121 16a4.002 4.002 0 01-1.182 2.818m-3.346-3.346l3.346 3.346m-5.653-5.653l5.653 5.653" />
              </svg>
              <span className="mt-1">Help</span>
            </div>
                {/* Contact Info Modal */}
                {showContactInfo && (
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-72 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 animate-fade-in">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-gray-800">Contact Aqua Blue Group</span>
                      <button className="text-gray-400 hover:text-gray-700" onClick={() => setShowContactInfo(false)} aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div><span className="font-semibold">Email:</span> abgroupassam@gmail.com</div>
                      <div><span className="font-semibold">Phone:</span> 0-8403938247, 0-6001175252</div>
                      <div><span className="font-semibold">Address:</span><br />Aqua Blue Group Office<br />Paliguri, Jagiroad<br />Dist:- Morigaon (Assam)<br />India</div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Q&A Chat Full Panel
            <div className="flex flex-col h-full bg-gray-50">
              {/* Q&A Header with Back Button */}
              <div className="flex items-center p-3 bg-gradient-to-r from-[#f97316] to-[#fcd34d]">
                <button className="mr-3 p-1 rounded hover:bg-orange-200" onClick={() => setShowQA(false)} aria-label="Back">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
                </button>
                <span className="font-bold text-lg text-gray-900">Ask a Question</span>
              </div>
              {/* Q&A Chat Body */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="mb-2 text-sm text-gray-700">Ask anything about our products, services, or company!</div>
                <div className="h-40 overflow-y-auto mb-2 bg-white rounded p-2 border border-gray-100 flex flex-col gap-2">
                  {chat.length === 0 && <div className="text-gray-400 text-xs">No questions yet. Try asking something!</div>}
                  {chat.map((msg, idx) => (
                    <React.Fragment key={idx}>
                      {/* User message (left) */}
                      <div className="flex justify-start mb-1">
                        <div className="bg-purple-100 text-gray-900 rounded-lg px-3 py-2 max-w-[70%] shadow-sm">
                          <span className="font-semibold text-purple-700">You:</span> <span className="font-normal">{msg.question}</span>
                        </div>
                      </div>
                      {/* Bot message (right) */}
                      <div className="flex justify-end mb-2">
                        <div className="bg-orange-100 text-gray-900 rounded-lg px-3 py-2 max-w-[70%] shadow-sm text-right">
                          <span className="font-semibold text-orange-700">Bot:</span> <span className="font-normal">{msg.answer || ''}</span>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              {/* Q&A Chat Input */}
              <form onSubmit={handleSend} className="flex gap-2 p-3 border-t bg-white">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:border-purple-500"
                  placeholder="Type your question..."
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                />
                <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm">Send</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget; 