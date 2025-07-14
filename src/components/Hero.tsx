import React, { useState, useEffect } from 'react';
import { ArrowRight, PlayCircle, Users, BookOpen, Award, Sparkles, Zap, Globe, Crown, Star, Code, Cpu, Rocket, Brain } from 'lucide-react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Learners', color: 'from-blue-400 to-cyan-400' },
    { icon: BookOpen, value: '1000+', label: 'Expert Courses', color: 'from-green-400 to-emerald-400' },
    { icon: Award, value: '98%', label: 'Success Rate', color: 'from-yellow-400 to-orange-400' },
  ];

  const floatingElements = [
    { icon: Code, delay: '0s', duration: '20s', color: 'text-blue-400' },
    { icon: Cpu, delay: '2s', duration: '25s', color: 'text-purple-400' },
    { icon: Brain, delay: '4s', duration: '18s', color: 'text-green-400' },
    { icon: Rocket, delay: '6s', duration: '22s', color: 'text-pink-400' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Professional gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 transition-all duration-700"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.03) 0%, rgba(139, 92, 246, 0.02) 25%, rgba(15, 23, 42, 1) 50%)`
        }}
      />
      
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-[2]">
        {floatingElements.map((element, i) => (
          <div
            key={i}
            className={`absolute ${element.color} opacity-10`}
            style={{
              left: `${15 + (i * 20)}%`,
              top: `${25 + (i * 15)}%`,
              animation: `floatSubtle ${element.duration} ease-in-out infinite`,
              animationDelay: element.delay,
            }}
          >
            <element.icon className="w-6 h-6" />
          </div>
        ))}

        {/* Subtle geometric shapes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatSubtle ${15 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full blur-xl" />
          </div>
        ))}
      </div>

      {/* Professional grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-3 z-[3]" />

      {/* Content */}
      <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="text-center space-y-12">
          {/* Professional logo and badge */}
          <div className="inline-flex items-center space-x-6 glass-morphism rounded-full px-8 py-4 border border-white/20 shadow-xl animate-fade-in hover:scale-105 transition-all duration-500">
            <div className="relative">
              <img 
                src="/src/assets/craiyon_215426_image.png" 
                alt="C++ Hub Logo" 
                className="w-12 h-12 rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-green-400/10 rounded-lg blur-lg"></div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-bold text-xl">C++ Hub</span>
              <Code className="h-5 w-5 text-blue-400" />
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-yellow-400 font-semibold text-sm">Professional</span>
            </div>
          </div>

          {/* Fixed main heading with proper sizing and spacing */}
          <div className="space-y-8 animate-slide-up">
            <div className="relative">
              <h1 className="font-black text-white leading-tight tracking-tight relative mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl max-w-5xl">
                <div className="mb-2">
                  <span className="inline-block text-white">
                    Master
                  </span>
                </div>
                <div className="mb-2">
                  <span className="block text-gradient-primary bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_100%]"> 
                    C++ Programming
                  </span>
                </div>
                <div>
                  <span className="inline-block text-white/95">
                    Like Never Before
                  </span>
                </div>
              </h1>
              
              {/* Professional code snippet */}
              <div className="absolute -top-8 -right-8 opacity-15 animate-float hidden xl:block">
                <div className="bg-black/40 rounded-lg p-4 font-mono text-green-400 text-sm border border-green-400/20 backdrop-blur-sm">
                  <div>{'#include <iostream>'}</div>
                  <div>{'using namespace std;'}</div>
                  <div>{'int main() {'}</div>
                  <div className="ml-4">{'cout << "Hello World!";'}</div>
                  <div>{'}'}</div>
                </div>
              </div>
            </div>
            
            <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-delay">
              Experience professional-grade programming education with our 
              <span className="text-gradient-secondary font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> AI-powered interactive platform.</span>
              <br />
              From fundamentals to advanced concepts, master C++ with industry experts.
            </p>
          </div>

          {/* Professional CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white text-lg px-10 py-4 rounded-xl font-semibold shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105 transform-gpu">
              {/* Professional shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <div className="relative flex items-center space-x-3 z-10">
                <Rocket className="h-5 w-5" />
                <span>Start Learning Today</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
            
            <button className="group glass-morphism text-white text-lg px-10 py-4 rounded-xl font-semibold hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3 z-10">
                <PlayCircle className="h-5 w-5" />
                <span>Watch Demo</span>
              </div>
            </button>
          </div>

          {/* Professional stats with refined design */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.9s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center group perspective-1000">
                <div className="glass-morphism rounded-2xl p-6 border border-white/20 shadow-xl hover-lift transform-gpu transition-all duration-500 relative overflow-hidden">
                  {/* Subtle background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 transform-gpu`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300`}>
                      {stat.value}
                    </div>
                    <p className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Professional trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-16 pb-8 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <div className="flex items-center space-x-3 text-gray-300 glass-morphism rounded-full px-6 py-3 hover:scale-105 transition-all duration-300 border border-white/15 group">
              <Brain className="h-5 w-5 text-cyan-400" />
              <span className="font-medium">AI-Powered Learning</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 glass-morphism rounded-full px-6 py-3 hover:scale-105 transition-all duration-300 border border-white/15 group">
              <Award className="h-5 w-5 text-green-400" />
              <span className="font-medium">Industry Certified</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 glass-morphism rounded-full px-6 py-3 hover:scale-105 transition-all duration-300 border border-white/15 group">
              <Users className="h-5 w-5 text-blue-400" />
              <span className="font-medium">Global Community</span>
            </div>
          </div>
        </div>
      </div>

      {/* Professional scroll indicator */}
      {scrollY < 100 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-[10]">
          <div className="glass-morphism rounded-full p-3 border border-white/20 group hover:scale-110 transition-all duration-300">
            <div className="w-6 h-10 border-2 border-cyan-400/60 rounded-full flex justify-center relative overflow-hidden">
              <div className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* Professional CSS animations */}
      <style jsx>{`
        @keyframes floatSubtle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% { 
            transform: translateY(-15px) translateX(8px) rotate(45deg);
          }
          50% { 
            transform: translateY(-10px) translateX(-5px) rotate(90deg);
          }
          75% { 
            transform: translateY(-20px) translateX(10px) rotate(135deg);
          }
        }

        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }

        .animate-fade-in-delay {
          animation: fadeIn 1s ease-in-out 0.3s both;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-gpu {
          transform: translateZ(0);
          will-change: transform;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        /* Fixed responsive text sizing to prevent cutoff */
        h1 {
          line-height: 1.1 !important;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        @media (max-width: 640px) {
          h1 {
            font-size: 2.25rem !important; /* text-4xl */
            line-height: 1.2 !important;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          h1 {
            font-size: 3rem !important; /* text-5xl */
            line-height: 1.15 !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          h1 {
            font-size: 3.75rem !important; /* text-6xl */
            line-height: 1.1 !important;
          }
        }

        @media (min-width: 1025px) and (max-width: 1280px) {
          h1 {
            font-size: 4.5rem !important; /* text-7xl */
            line-height: 1.1 !important;
          }
        }

        @media (min-width: 1281px) {
          h1 {
            font-size: 6rem !important; /* text-8xl */
            line-height: 1.05 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;