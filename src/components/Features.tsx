// src/components/Features.tsx

import React, { useState, useEffect } from 'react';
import { Rocket, Star, Lightbulb, TrendingUp, Users, Globe, HelpCircle } from 'lucide-react';
import ParticleNetwork from './ParticleNetwork'; // Assuming ParticleNetwork component path

// REVISED: ConsoleTerminal Component (ASCII art removed, adjusted for transparent background)
const ConsoleTerminal: React.FC = () => {
  // ASCII Art is REMOVED from here.

  // Define fun commands and their responses
  const commands = {
    "help": "Available commands: <span class='text-yellow-400'>features</span>, <span class='text-yellow-400'>speed</span>, <span class='text-yellow-400'>salary</span>, <span class='text-yellow-400'>magic</span>, <span class='text-yellow-400'>future</span>, <span class='text-yellow-400'>enroll</span>.",
    "features": "C++ Hub boasts AI-powered personalization and expert mentorship – designed for your success!",
    "speed": "Learn 3x faster, achieve mastery sooner, only at C++ Hub!",
    "salary": "Our graduates average a 150% salary boost within 12 months. C++ Hub delivers real career results!",
    "magic": "It's not magic, it's C++ Hub's revolutionary curriculum and supportive community!",
    "future": "Code your future with C++ Hub's cutting-edge courses and industry-aligned skills.",
    "enroll": "Ready to transform your career? C++ Hub is waiting to welcome you!"
  };

  // Initial messages for the console, without ASCII art
  const initialConsoleMessages = [
    `<span class="text-gray-400 text-center">Welcome to C++ Hub CLI. Type '<span class="text-yellow-400'>help</span>' to get started.</span>`
  ];

  const [consoleMessages, setConsoleMessages] = useState<string[]>(initialConsoleMessages);
  const [consoleInput, setConsoleInput] = useState('');

  // Handler for console input
  const handleConsoleInput = () => {
    const input = consoleInput.trim().toLowerCase();
    if (input === '') return;

    setConsoleMessages(prev => [...prev, `<span class="text-green-400 font-bold">$</span> <span class="text-white">${consoleInput}</span>`]);

    let response = "Command not found. Type '<span class='text-yellow-400'>help</span>' for available commands.";
    if (commands[input]) {
      response = commands[input];
    }

    setTimeout(() => {
      setConsoleMessages(prev => [...prev, `<span class="text-blue-400">C++_HUB_CLI:</span> ${response}`]);
    }, 500); 

    setConsoleInput('');
  };

  // Handler for the "Help" button
  const handleHelpButton = () => {
    setConsoleMessages(prev => [...prev, `<span class="text-green-400 font-bold">$</span> <span class="text-white">help</span>`]);
    setConsoleMessages(prev => [...prev, `<span class="text-blue-400">C++_HUB_CLI:</span> ${commands["help"]}`]);
    setConsoleInput('');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Console Output Area (Now transparent background so ParticleNetwork shows through) */}
      <div className="flex-1 p-3 font-mono text-xs text-gray-100 overflow-y-auto custom-scrollbar flex flex-col-reverse bg-transparent">
        {consoleMessages.map((msg, index) => (
          <div key={index} className="mb-1" dangerouslySetInnerHTML={{ __html: msg }}></div>
        )).reverse()}
      </div>

      {/* Console Input Area (Still glass-morphism) */}
      <div className="p-3 glass-morphism flex space-x-2 border-t border-white/10">
        <span className="text-green-400 font-bold">$</span>
        <input
          type="text"
          className="flex-1 bg-transparent text-gray-100 placeholder-gray-400 outline-none"
          placeholder="Enter command..."
          value={consoleInput}
          onChange={(e) => setConsoleInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleConsoleInput();
            }
          }}
        />
        <button
          onClick={handleConsoleInput}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-xs transition-colors"
        >
          Run
        </button>
        <button
          onClick={handleHelpButton}
          className="glass-morphism text-white px-3 py-1 rounded-md text-xs hover:bg-white/20 transition-colors flex items-center"
        >
          <HelpCircle className="h-3 w-3 mr-1" /> Help
        </button>
      </div>
    </div>
  );
};


const Features: React.FC = () => {
  const keyBenefits = [
    {
      icon: Rocket,
      title: 'Learn 3x Faster',
      description: 'AI-powered personalization accelerates your learning journey.'
    },
    {
      icon: TrendingUp,
      title: '150% Salary Boost',
      description: 'Our graduates see average salary increases within 12 months.'
    },
    {
      icon: Users,
      title: 'Expert Mentorship',
      description: 'Direct access to industry professionals and personalized career guidance.'
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/10 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Clean Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20 transform hover:scale-105 transition-transform duration-300">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-medium">Revolutionary Platform</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Revolutionary Learning
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> 
              Experience
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Experience the future of education with our cutting-edge platform designed to maximize your learning potential.
          </p>
          {/* Small text below the main description */}
          <p className="text-sm text-gray-400 mt-4 max-w-4xl mx-auto">
            Bring your vision to life with C++ Hub.
          </p>
        </div>

        {/* Main content grid with Console Terminal */}
        <div className="grid lg:grid-cols-2 gap-20 items-center"> 
          {/* Left Side - Benefits & Stats */}
          <div className="space-y-12"> 
            {/* Why Choose EduSphere */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
                <Star className="h-8 w-8 text-yellow-400" />
                <span>Why Choose EduSphere?</span>
              </h3>
              
              <div className="space-y-6">
                {keyBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="group glass-morphism rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-200">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-200">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-morphism rounded-2xl p-6 border border-white/10 text-center hover:border-white/20 transition-all duration-300">
                <div className="text-4xl font-black text-indigo-400 mb-2">50K+</div>
                <div className="text-gray-300 font-medium">Active Learners</div>
              </div>
              <div className="glass-morphism rounded-2xl p-6 border border-white/10 text-center hover:border-white/20 transition-all duration-300">
                <div className="text-4xl font-black text-green-400 mb-2">98%</div>
                <div className="text-gray-300 font-medium">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Side - Console Terminal Visual */}
          <div className="relative flex justify-center items-center py-10 lg:py-0 min-h-[300px] lg:min-h-[auto]">
            <div className="w-full h-[450px] max-w-lg rounded-xl glass-morphism border border-white/10 shadow-xl flex flex-col overflow-hidden relative">
              {/* Particle Network as background inside the glass-morphism container */}
              <div className="absolute inset-0 z-0">
                <ParticleNetwork />
              </div>

              {/* Editor Title Bar (on top of particles) */}
              <div className="flex items-center justify-between p-3 bg-white/10 border-b border-white/10 relative z-10">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <span className="text-gray-400 text-sm font-mono">C++_HUB_CLI</span>
                <div></div> {/* Spacer */}
              </div>

              {/* ConsoleTerminal component (on top of particles, with transparent background) */}
              <ConsoleTerminal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;