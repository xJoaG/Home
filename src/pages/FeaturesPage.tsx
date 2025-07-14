import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Features from '../components/Features';
import DeviceCompatibility from '../components/DeviceCompatibility';
import ParticleNetwork from '../components/ParticleNetwork';
import TutorWidget from '../components/TutorWidget';

const FeaturesPage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleNetwork />
      <Navbar />
      
      <div className="pt-20">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Platform
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Features</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the cutting-edge features that make C++ Hub the ultimate learning platform
          </p>
        </div>

        <Features />
        <DeviceCompatibility />
      </div>
      
      <Footer />
      <TutorWidget />
    </div>
  );
};

export default FeaturesPage;