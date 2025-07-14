import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ParticleNetwork from '../components/ParticleNetwork';
import TutorWidget from '../components/TutorWidget';
import { ArrowRight, BookOpen, Users, Award, Star, Code, Rocket, Crown } from 'lucide-react';

const HomePage: React.FC = () => {
  const featuredCourses = [
    {
      title: 'Advanced C++ Programming',
      description: 'Master modern C++ with advanced concepts and real-world projects.',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Advanced',
      students: 1250,
      rating: 4.9,
      type: 'premium'
    },
    {
      title: 'C++ Fundamentals',
      description: 'Learn the basics of C++ programming from scratch.',
      image: 'https://images.pexels.com/photos/7130549/pexels-photo-7130549.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Beginner',
      students: 5200,
      rating: 4.6,
      type: 'free'
    },
    {
      title: 'Data Structures & Algorithms',
      description: 'Implement efficient algorithms and data structures in C++.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 'Intermediate',
      students: 890,
      rating: 4.8,
      type: 'premium'
    }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Learners' },
    { icon: BookOpen, value: '1000+', label: 'Expert Courses' },
    { icon: Award, value: '98%', label: 'Success Rate' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleNetwork />
      <Navbar />
      <Hero />
      
      {/* Featured Courses Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Featured
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Courses</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Start your C++ journey with our most popular courses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredCourses.map((course, index) => (
              <div key={index} className="glass-morphism rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="relative h-48">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {course.level}
                  </div>
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 ${
                    course.type === 'premium' 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' 
                      : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                  }`}>
                    {course.type === 'premium' && <Crown className="h-3 w-3" />}
                    <span>{course.type.toUpperCase()}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white">{course.rating}</span>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200">
                    Start Learning
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a 
              href="/courses"
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <span>View All Courses</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center glass-morphism rounded-2xl p-6 border border-white/10">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-morphism rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Master C++?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers who have transformed their careers with our comprehensive C++ courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/courses"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Rocket className="h-5 w-5" />
                <span>Start Learning</span>
              </a>
              <a 
                href="/pricing"
                className="glass-morphism text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/30 flex items-center justify-center space-x-2"
              >
                <Crown className="h-5 w-5" />
                <span>View Pricing</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <TutorWidget />
    </div>
  );
};

export default HomePage;