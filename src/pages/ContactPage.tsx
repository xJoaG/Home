import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleNetwork from '../components/ParticleNetwork';
import TutorWidget from '../components/TutorWidget';
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, Users, Award } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@cpphub.com',
      description: 'Send us an email anytime',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri 9AM-6PM PST',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'San Francisco, CA',
      description: 'Silicon Valley HQ',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      details: 'Available 24/7',
      description: 'Instant support',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleNetwork />
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get in
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions about our courses? Need help getting started? We're here to help you succeed.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="glass-morphism rounded-2xl p-8 border border-white/10 text-center hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${info.color} mb-6 shadow-lg`}>
                  <info.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                <p className="text-lg font-medium text-indigo-400 mb-2">{info.details}</p>
                <p className="text-gray-300 text-sm">{info.description}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-morphism rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors duration-200"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors duration-200"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors duration-200"
                    placeholder="What's this about?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors duration-200 resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Office Hours */}
              <div className="glass-morphism rounded-2xl p-8 border border-white/10">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="h-8 w-8 text-indigo-400" />
                  <h3 className="text-2xl font-bold text-white">Office Hours</h3>
                </div>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-white font-medium">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-white font-medium">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-gray-400">Closed</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="glass-morphism rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Support Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-6 w-6 text-green-400" />
                    <div>
                      <div className="text-white font-medium">Average Response Time</div>
                      <div className="text-green-400 text-sm">{"< 2 hours"}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-blue-400" />
                    <div>
                      <div className="text-white font-medium">Customer Satisfaction</div>
                      <div className="text-blue-400 text-sm">98.5%</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-6 w-6 text-yellow-400" />
                    <div>
                      <div className="text-white font-medium">Issues Resolved</div>
                      <div className="text-yellow-400 text-sm">First Contact: 94%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="glass-morphism rounded-2xl p-8 border border-white/10 text-center">
                <h3 className="text-xl font-bold text-white mb-4">Need Quick Answers?</h3>
                <p className="text-gray-300 mb-6">
                  Check out our comprehensive FAQ section for instant answers to common questions.
                </p>
                <a 
                  href="/support"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
                >
                  <span>Visit FAQ</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <TutorWidget />
    </div>
  );
};

export default ContactPage;