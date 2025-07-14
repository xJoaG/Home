import React from 'react';
import { TrendingUp, Users, BookOpen, Award, Clock, Star } from 'lucide-react';

const Stats: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '50,000+',
      label: 'Active Students',
      description: 'Learning from around the world',
      color: 'text-blue-400',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      iconBg: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BookOpen,
      value: '1,200+',
      label: 'Expert Courses',
      description: 'Across 50+ categories',
      color: 'text-green-400',
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      iconBg: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      value: '98%',
      label: 'Success Rate',
      description: 'Course completion rate',
      color: 'text-yellow-400',
      bgGradient: 'from-yellow-500/20 to-orange-500/20',
      iconBg: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Clock,
      value: '2M+',
      label: 'Learning Hours',
      description: 'Total time invested',
      color: 'text-purple-400',
      bgGradient: 'from-purple-500/20 to-violet-500/20',
      iconBg: 'from-purple-500 to-violet-500'
    },
    {
      icon: TrendingUp,
      value: '150%',
      label: 'Career Growth',
      description: 'Average salary increase',
      color: 'text-rose-400',
      bgGradient: 'from-rose-500/20 to-pink-500/20',
      iconBg: 'from-rose-500 to-pink-500'
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Student Rating',
      description: 'Platform satisfaction',
      color: 'text-orange-400',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      iconBg: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-pink-900/30"></div>
        {/* Floating elements */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white/5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <span className="text-white font-medium">Our Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by Learners
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Worldwide</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful learners who have transformed their careers with our platform.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group text-center bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-4 hover:shadow-2xl relative overflow-hidden`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Animated background glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.iconBg} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className={`text-2xl lg:text-3xl font-bold ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-white font-semibold group-hover:text-indigo-300 transition-colors duration-200">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                    {stat.description}
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="mt-4 w-full bg-white/10 rounded-full h-1 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.iconBg} rounded-full transition-all duration-1000 group-hover:w-full`}
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional visual elements */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white/5 backdrop-blur-sm rounded-full px-8 py-4 border border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm">Live Learning Sessions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm">AI-Powered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(2deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
          75% { transform: translateY(-20px) rotate(1deg); }
        }
      `}</style>
    </section>
  );
};

export default Stats;