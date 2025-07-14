import React, { useState } from 'react';
import { Check, Crown, Zap, Star, Code, Brain, Rocket, Shield, Users, BookOpen } from 'lucide-react';

const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      id: 'free',
      name: 'Free Explorer',
      icon: BookOpen,
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for getting started with C++ fundamentals',
      features: [
        '5 Free Courses',
        'Basic C++ Tutorials',
        'Community Access',
        'Code Playground',
        'Basic Support'
      ],
      color: 'from-gray-500 to-gray-600',
      bgColor: 'from-gray-500/10 to-gray-600/10',
      borderColor: 'border-gray-500/30',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Coder',
      icon: Crown,
      price: { monthly: 29, annual: 290 },
      description: 'Accelerate your C++ mastery with AI-powered learning',
      features: [
        'Unlimited Courses',
        'AI Tutor COSMOS',
        'Advanced Projects',
        'Code Review & Feedback',
        'Priority Support',
        'Certificates',
        'Live Coding Sessions',
        'Interview Preparation'
      ],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-500/30',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Pro',
      icon: Rocket,
      price: { monthly: 99, annual: 990 },
      description: 'Complete solution for teams and organizations',
      features: [
        'Everything in Premium',
        'Team Management',
        'Custom Learning Paths',
        'Advanced Analytics',
        'White-label Options',
        'Dedicated Support',
        'API Access',
        'Custom Integrations'
      ],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/30',
      popular: false
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Personalized curriculum adapted to your learning style'
    },
    {
      icon: Code,
      title: 'Interactive Coding',
      description: 'Real-time code execution and instant feedback'
    },
    {
      icon: Users,
      title: 'Expert Mentorship',
      description: 'Direct access to industry professionals'
    },
    {
      icon: Shield,
      title: 'Lifetime Access',
      description: 'Keep your courses forever, even after subscription ends'
    }
  ];

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/10 to-slate-900/20"></div>
        {/* Animated code symbols */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-blue-400/10 font-mono text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {['++', '{', '}', ';', '#', '<>', '[]', '()', '&&', '||'][Math.floor(Math.random() * 10)]}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 mb-8 border border-white/20 shadow-lg">
            <Crown className="h-6 w-6 text-yellow-400 animate-bounce" />
            <span className="text-white font-bold text-lg">Choose Your Plan</span>
            <Zap className="h-6 w-6 text-blue-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
            Unlock Your
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent"> 
              C++ Potential
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
            Choose the perfect plan to accelerate your programming journey with our cutting-edge learning platform.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-lg font-medium ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                isAnnual ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                  isAnnual ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg font-medium ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual
            </span>
            {isAnnual && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                Save 17%
              </div>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative glass-morphism rounded-3xl p-8 border transition-all duration-500 hover:transform hover:-translate-y-4 hover:shadow-2xl group ${
                plan.popular 
                  ? 'border-blue-500/50 ring-2 ring-blue-500/30 scale-105' 
                  : plan.borderColor
              }`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                    <Star className="h-4 w-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Enhanced background glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
              
              <div className="relative z-10">
                {/* Plan header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${plan.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-5xl font-black text-white">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-gray-400">
                        /{isAnnual ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {isAnnual && plan.price.monthly > 0 && (
                    <p className="text-sm text-gray-400 mt-2">
                      ${(plan.price.annual / 12).toFixed(0)}/month billed annually
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <div className={`p-1 rounded-full bg-gradient-to-r ${plan.color}`}>
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-blue-500/25'
                    : plan.id === 'free'
                    ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-purple-500/25'
                }`}>
                  {plan.id === 'free' ? 'Start Free' : 'Get Started'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center glass-morphism rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2 group"
            >
              <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-200">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <div className="text-center">
          <div className="glass-morphism rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
            <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">30-Day Money-Back Guarantee</h3>
            <p className="text-gray-300 leading-relaxed">
              Try C++ Hub risk-free. If you're not completely satisfied within 30 days, 
              we'll refund your money, no questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;