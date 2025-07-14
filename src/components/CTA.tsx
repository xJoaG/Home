import React from 'react';
import { ArrowRight, BookOpen, Users, Award, Sparkles, Crown, Zap, Star, Gift, Clock } from 'lucide-react';

const CTA: React.FC = () => {
  const benefits = [
    {
      icon: BookOpen,
      text: 'Access to 1000+ courses',
      color: 'text-blue-400'
    },
    {
      icon: Users,
      text: 'Expert mentorship',
      color: 'text-green-400'
    },
    {
      icon: Award,
      text: 'Industry certificates',
      color: 'text-yellow-400'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/15 to-pink-600/20"></div>
        {/* Animated elements */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <Sparkles className="h-3 w-3 text-white/20" />
          </div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative overflow-hidden">
          {/* Main CTA Container */}
          <div className="glass-morphism rounded-3xl border border-white/20 p-8 lg:p-12 relative overflow-hidden shadow-2xl">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            <div className="text-center max-w-4xl mx-auto relative z-10">
              {/* Enhanced Badge */}
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-full px-8 py-4 mb-8 border border-orange-500/30 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Gift className="h-6 w-6 text-orange-400 animate-bounce" />
                  <Clock className="h-5 w-5 text-red-400" />
                </div>
                <span className="text-white font-bold text-lg">Limited Time Offer</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current animate-pulse" />
                  <span className="text-yellow-400 font-bold">50% OFF</span>
                </div>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                Ready to Transform Your
                <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> 
                  Career?
                </span>
              </h2>
              
              <p className="text-xl lg:text-2xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto">
                Join over 50,000 learners who have accelerated their careers with our immersive learning platform. 
                <span className="text-gradient-secondary font-semibold"> Start your journey today and unlock your potential.</span>
              </p>

              {/* Enhanced Benefits */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 text-gray-200 glass-morphism rounded-2xl px-6 py-4 border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${
                      index === 0 ? 'from-blue-500/20 to-cyan-500/20' :
                      index === 1 ? 'from-green-500/20 to-emerald-500/20' :
                      'from-yellow-500/20 to-orange-500/20'
                    }`}>
                      <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                    </div>
                    <span className="font-semibold text-lg">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
                <button className="group bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:from-indigo-600 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-2xl shadow-indigo-500/25 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Crown className="h-6 w-6 relative z-10" />
                  <span className="relative z-10">Start Premium Trial</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
                </button>
                
                <button className="glass-morphism text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-300 border border-white/30 hover:scale-105 shadow-xl flex items-center justify-center space-x-3">
                  <Zap className="h-6 w-6 text-yellow-400" />
                  <span>View Pricing Plans</span>
                </button>
              </div>

              {/* Enhanced Trust indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-300 mb-8">
                <div className="flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">No credit card required</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">Cancel anytime</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">30-day money-back guarantee</span>
                </div>
              </div>

              {/* Enhanced Special offer countdown */}
              <div className="glass-morphism rounded-2xl p-6 border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-red-500/10 shadow-xl">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-2 text-orange-400">
                    <Gift className="h-6 w-6 animate-bounce" />
                    <span className="font-bold text-lg">Special Launch Offer</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-bold text-xl">50% OFF</span>
                    <span className="text-gray-300">- Limited Time!</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-red-400" />
                    <span className="text-red-400 font-semibold">Ends Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS for sparkle animation */}
      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
      `}</style>
    </section>
  );
};

export default CTA;