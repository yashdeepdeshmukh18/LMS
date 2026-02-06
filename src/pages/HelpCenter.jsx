import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, Mail, MessageCircle, FileQuestion } from "lucide-react";

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Go to the Settings page, scroll down to the Security section, and click on 'Change Password'. You will receive an email verification link."
  },
  {
    question: "Can I download course videos?",
    answer: "Currently, course videos are available for streaming only. However, you can download PDF notes and assignments for offline use."
  },
  {
    question: "Where can I find my certificate?",
    answer: "Once you complete 100% of a course, a 'Claim Certificate' button will appear on your dashboard and the course player page."
  },
  {
    question: "How do I contact an instructor?",
    answer: "You can post questions in the 'Q&A' tab below each video lesson. Instructors usually respond within 24-48 hours."
  }
];

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
  
      
      {/* Hero Search Section */}
      <div className="bg-white-100 py-16 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">How can we help you?</h1>
        <div className="max-w-2xl mx-auto relative ">
          <input 
            type="text" 
            placeholder="Search for help articles..." 
            className="w-full pl-12 pr-4 py-4 rounded-full border-1 shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-0"
          />
          <Search className="absolute left-4 top-4 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        
        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <SupportCard 
            icon={<FileQuestion size={32} className="text-purple-600"/>}
            title="Guides"
            desc="Detailed tutorials on how to use the platform."
          />
          <SupportCard 
            icon={<Mail size={32} className="text-blue-600"/>}
            title="Email Support"
            desc="Get answers within 24 hours. support@smaran.ai"
          />
          <SupportCard 
            icon={<MessageCircle size={32} className="text-green-600"/>}
            title="Live Chat"
            desc="Chat with our support team Mon-Fri."
          />
        </div>

        {/* FAQs */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button 
                onClick={() => toggleFAQ(idx)}
                className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                {openIndex === idx ? <ChevronUp className="text-purple-600" /> : <ChevronDown className="text-gray-400" />}
              </button>
              
              {openIndex === idx && (
                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

const SupportCard = ({ icon, title, desc }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition cursor-pointer">
    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{desc}</p>
  </div>
);

export default HelpCenter;