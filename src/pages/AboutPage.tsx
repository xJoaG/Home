import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import ParticleNetwork from '../components/ParticleNetwork';
import TutorWidget from '../components/TutorWidget';
import { Users, Award, BookOpen, Target, Heart, Lightbulb, Rocket, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Former Google engineer with 15+ years in C++ development and education.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Curriculum',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Ex-Microsoft architect specializing in modern C++ and software design patterns.'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'AI Learning Director',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'PhD in Computer Science, leading expert in AI-powered educational technology.'
    },
    {
      name: 'David Kim',
      role: 'Platform Engineer',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Full-stack developer passionate about creating seamless learning experiences.'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest quality in everything we do, from course content to user experience.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our love for programming and education drives us to create exceptional learning experiences.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously explore new technologies and methodologies to enhance learning outcomes.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Quality education should be accessible to everyone, regardless of background or location.'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleNetwork />
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              About
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> C++ Hub</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to revolutionize C++ education through cutting-edge technology, 
              expert instruction, and personalized learning experiences that empower developers worldwide.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="glass-morphism rounded-3xl p-12 border border-white/20 mb-20">
            <div className="text-center">
              <Rocket className="h-16 w-16 text-indigo-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                To democratize high-quality C++ education by combining artificial intelligence, 
                expert mentorship, and interactive learning environments that adapt to each student's 
                unique learning style and pace. We believe that mastering C++ should be an engaging, 
                efficient, and transformative experience.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="glass-morphism rounded-2xl p-8 border border-white/10 text-center hover:border-white/20 transition-all duration-300">
                  <div className="inline-flex p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl mb-6">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="glass-morphism rounded-2xl p-6 border border-white/10 text-center hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white/20"
                  />
                  <h3 className="text-lg font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-indigo-400 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Story Section */}
          <div className="glass-morphism rounded-3xl p-12 border border-white/20 mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white text-center mb-8">Our Story</h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  C++ Hub was born from a simple observation: traditional programming education wasn't keeping pace 
                  with the rapid evolution of technology and learning preferences. Our founders, seasoned C++ experts 
                  from leading tech companies, recognized that students needed more than just theoretical knowledge—they 
                  needed practical, hands-on experience with real-world applications.
                </p>
                <p>
                  In 2023, we set out to create something different. By combining cutting-edge AI technology with 
                  proven pedagogical methods, we developed a platform that adapts to each learner's unique style, 
                  pace, and goals. Our AI tutor, COSMOS, represents years of research in educational technology and 
                  natural language processing.
                </p>
                <p>
                  Today, C++ Hub serves thousands of students worldwide, from complete beginners to experienced 
                  developers looking to master advanced concepts. Our graduates work at top tech companies, lead 
                  innovative projects, and contribute to open-source communities around the globe.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Stats />
        <Testimonials />
      </div>
      
      <Footer />
      <TutorWidget />
    </div>
  );
};

export default AboutPage;