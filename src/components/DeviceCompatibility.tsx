import React from 'react';
import Spline from '@splinetool/react-spline';
import { Smartphone, Tablet, Monitor, Laptop, Wifi, Zap, Globe, Shield, Download, Apple } from 'lucide-react';

const DeviceCompatibility: React.FC = () => {
  const devices = [
    {
      icon: Smartphone,
      name: 'Mobile',
      description: 'iOS & Android apps',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Tablet,
      name: 'Tablet',
      description: 'Optimized for tablets',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Laptop,
      name: 'Laptop',
      description: 'Windows & macOS',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Monitor,
      name: 'Desktop',
      description: 'Full desktop experience',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const features = [
    {
      icon: Wifi,
      title: 'Offline Learning',
      description: 'Download courses for offline access'
    },
    {
      icon: Zap,
      title: 'Instant Sync',
      description: 'Progress syncs across all devices'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Learn from anywhere in the world'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-slate-900/20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
            <Globe className="h-5 w-5 text-indigo-400" />
            <span className="text-white font-medium">Universal Access</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Learn on
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Any Device</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our platform adapts seamlessly to your device, ensuring the best learning experience wherever you are.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Phone with proper layering */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl relative z-20">
              <div className="flex justify-center items-center relative">
                <div style={{ width: '265px', height: '418px' }} className="rounded-2xl overflow-hidden relative z-30">
                  <Spline 
                    scene="https://prod.spline.design/p8MZXfLocd0gyn17/scene.splinecode"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>
            </div>

            {/* Content below phone */}
            <div className="mt-8 space-y-6 relative z-20">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-white mb-4">Cross-Platform Learning Experience</h4>
                <p className="text-gray-300 mb-6">
                  Access your courses seamlessly across mobile, tablet, laptop, and desktop with synchronized progress and premium features.
                </p>
              </div>

              {/* Coming Soon Apps */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h5 className="text-white font-semibold mb-4 text-center">Mobile Apps Coming Soon</h5>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {/* Google Play Store - Greyed Out */}
                  <div className="flex items-center justify-center bg-gray-600/30 text-gray-500 px-6 py-3 rounded-xl border border-gray-500/30 cursor-not-allowed opacity-60">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gray-500 rounded-sm flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">GET IT ON</div>
                        <div className="text-sm font-semibold">Google Play</div>
                      </div>
                    </div>
                  </div>

                  {/* App Store - Greyed Out */}
                  <div className="flex items-center justify-center bg-gray-600/30 text-gray-500 px-6 py-3 rounded-xl border border-gray-500/30 cursor-not-allowed opacity-60">
                    <div className="flex items-center space-x-3">
                      <Apple className="w-6 h-6 text-gray-500" />
                      <div>
                        <div className="text-xs text-gray-400">Download on the</div>
                        <div className="text-sm font-semibold">App Store</div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-400 text-sm mt-4">
                  Native mobile apps launching Q2 2024
                </p>
              </div>
            </div>
          </div>

          {/* Device Grid */}
          <div className="space-y-8 relative z-20">
            <div className="grid grid-cols-2 gap-6">
              {devices.map((device, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2 text-center group"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${device.color} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <device.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{device.name}</h3>
                  <p className="text-gray-300 text-sm">{device.description}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <div className="p-3 bg-indigo-500/20 rounded-lg">
                    <feature.icon className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{feature.title}</h4>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <span>Try Web App</span>
              </button>
              <button className="flex-1 bg-white/10 backdrop-blur-sm text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20 flex items-center justify-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Web Platform</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceCompatibility;