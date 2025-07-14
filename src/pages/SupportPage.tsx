import React, { useState } from 'react';
import { Search, MessageCircle, Phone, Mail, BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SupportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I access my courses?",
      answer: "After enrollment, you can access your courses through your dashboard. Simply log in and click on 'My Courses' to view all your enrolled programs."
    },
    {
      question: "Can I download course materials?",
      answer: "Yes, most course materials including PDFs, slides, and resources can be downloaded for offline study. Look for the download icon next to each resource."
    },
    {
      question: "What if I'm not satisfied with a course?",
      answer: "We offer a 30-day money-back guarantee for all courses. If you're not satisfied, contact our support team within 30 days of purchase for a full refund."
    },
    {
      question: "How do I get a course certificate?",
      answer: "Complete all course modules and pass the final assessment with a score of 80% or higher to receive your certificate. Certificates are automatically generated upon completion."
    },
    {
      question: "Can I switch between courses?",
      answer: "Yes, you can pause one course and start another at any time. Your progress is automatically saved, and you can resume where you left off."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, our mobile app is available for both iOS and Android. You can download it from the App Store or Google Play Store to learn on the go."
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      action: 'Start Chat',
      availability: '24/7 Available',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      action: 'Send Email',
      availability: 'Response within 24h',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      action: 'Call Now',
      availability: 'Mon-Fri 9AM-6PM',
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const quickHelp = [
    { title: 'Getting Started Guide', icon: BookOpen },
    { title: 'Course Navigation', icon: BookOpen },
    { title: 'Account Settings', icon: BookOpen },
    { title: 'Payment Issues', icon: BookOpen },
    { title: 'Technical Problems', icon: BookOpen },
    { title: 'Mobile App Help', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            How can we
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> help you?</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Find answers to your questions or get in touch with our support team
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Contact Methods */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Get in Touch</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${method.color} mb-6`}>
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{method.title}</h3>
                <p className="text-gray-300 mb-4">{method.description}</p>
                <p className="text-sm text-gray-400 mb-6">{method.availability}</p>
                <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200">
                  {method.action}
                </button>
              </div>
            ))}
          </div>

          {/* Quick Help Links */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Quick Help</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickHelp.map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <item.icon className="h-6 w-6 text-indigo-400" />
                    <span className="text-white font-medium group-hover:text-indigo-300 transition-colors duration-200">
                      {item.title}
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-medium text-white pr-4">{faq.question}</h3>
                    <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${expandedFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Still need help?</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors duration-200"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    rows={6}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors duration-200 resize-none"
                    placeholder="Describe your issue or question in detail..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SupportPage;