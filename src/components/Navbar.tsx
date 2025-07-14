import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Globe, BookOpen, User, LogOut, Settings, CreditCard, Bell, ChevronDown, Crown, Zap, Code, Shield } from 'lucide-react'; // Added Shield icon
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isBanned, hasPrivilege } = useAuth(); // Use hasPrivilege from context
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const ProfileDropdown = () => (
    <div 
      ref={dropdownRef}
      className="absolute right-0 top-full mt-3 w-72 glass-morphism rounded-2xl border border-white/20 shadow-2xl z-[60] animate-fade-in overflow-hidden"
    >
      {/* User Info Header */}
      <div className="p-5 bg-gradient-to-r from-blue-500/10 to-green-500/10 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
              {/* Display user's profile picture if available, otherwise default icon */}
              {user?.profile_picture_url ? (
                <img src={user.profile_picture_url} alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/48x48/000000/FFFFFF?text=User'; }} />
              ) : (
                <User className="h-6 w-6 text-white" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white/20 animate-pulse"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg">{user?.username || user?.name || 'User'}</h3> {/* Display username */}
            <p className="text-gray-300 text-sm">{user?.email}</p>
            <div className="flex items-center mt-1">
              <Crown className="h-3 w-3 text-yellow-400 mr-1" />
              <span className="text-yellow-400 text-xs font-medium">{user?.group || 'Basic Plan'}</span> {/* Display group */}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-3">
        <a 
          href="/dashboard" 
          className="flex items-center space-x-3 px-3 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
        >
          <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors duration-200">
            <BookOpen className="h-4 w-4 text-blue-400" />
          </div>
          <span className="text-white font-medium">Dashboard</span>
        </a>
        
        {/* Link to Edit Profile Page */}
        <a 
          href="/profile/edit" 
          className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
          onClick={() => setShowProfileDropdown(false)} // Close dropdown on click
        >
          <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors duration-200">
            <Settings className="h-4 w-4 text-purple-400 group-hover:text-white transition-colors duration-200" />
          </div>
          <span className="text-white font-medium">Edit Profile</span>
        </a>
        
        {/* New: Link to Admin Panel (only for authorized users) */}
        {hasPrivilege(['Junior Support', 'Support', 'Senior Support', 'Admin', 'Owner']) && (
          <a
            href="/admin"
            className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
            onClick={() => setShowProfileDropdown(false)}
          >
            <div className="p-2 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors duration-200">
              <Shield className="h-4 w-4 text-red-400 group-hover:text-white transition-colors duration-200" />
            </div>
            <span className="text-white font-medium">Admin Panel</span>
          </a>
        )}

        <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group">
          <div className="p-2 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/30 transition-colors duration-200">
            <Crown className="h-4 w-4 text-yellow-400 group-hover:text-white transition-colors duration-200" />
          </div>
          <span className="text-white font-medium">Premium</span>
        </button>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={() => {
            logout();
            setShowProfileDropdown(false);
          }}
          className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl hover:bg-red-500/20 transition-all duration-200 group"
        >
          <div className="p-2 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors duration-200">
            <LogOut className="h-4 w-4 text-red-400" />
          </div>
          <span className="text-red-400 font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ${
        scrolled ? 'glass-morphism border-b border-white/10 py-2 shadow-2xl' : 'bg-transparent py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Enhanced Logo with C++ Hub branding */}
            <div className="flex items-center space-x-3 group cursor-pointer hover:scale-105 transition-all duration-300">
              <div className="relative">
                <img 
                  src="/src/assets/craiyon_215426_image.png" 
                  alt="C++ Hub Logo" 
                  className="w-10 h-10 rounded-lg shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  C++ Hub
                </span>
                <Code className="h-5 w-5 text-blue-400 group-hover:animate-pulse" />
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium group py-2"
                >
                  {item.name}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </div>

            {/* Enhanced Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* Notification Bell */}
                  <button className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-lg group">
                    <Bell className="h-5 w-5 group-hover:animate-bounce" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </button>
                  
                  {/* Profile Button */}
                  <div className="relative">
                    <button
                      onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                      className={`flex items-center space-x-2 glass-morphism rounded-xl px-3 py-2 hover:bg-white/20 transition-all duration-300 border border-white/10 group ${isBanned() ? 'border-red-500 ring-2 ring-red-500/50' : ''}`}
                    >
                      {/* Display user's profile picture here too */}
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center overflow-hidden">
                        {user.profile_picture_url ? (
                          <img src={user.profile_picture_url} alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/32x32/000000/FFFFFF?text=U'; }} />
                        ) : (
                          <User className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <span className="text-white font-medium text-sm">{user.username || user.name}</span> {/* Display username */}
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showProfileDropdown && <ProfileDropdown />}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="text-white font-medium px-6 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/20"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center space-x-2">
                      <Code className="h-4 w-4" />
                      <span>Start Learning</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-white/10 animate-slide-down">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                {user ? (
                  <div className="border-t border-white/10 pt-3 mt-3">
                    <div className="flex items-center space-x-3 px-3 py-2 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center overflow-hidden">
                        {user.profile_picture_url ? (
                          <img src={user.profile_picture_url} alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/32x32/000000/FFFFFF?text=U'; }} />
                        ) : (
                          <User className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.username || user.name}</div> {/* Display username */}
                        <div className="text-yellow-400 text-sm flex items-center">
                          <Crown className="h-3 w-3 mr-1" />
                          {user.group || 'Basic Plan'} {/* Display group */}
                        </div>
                      </div>
                    </div>
                    {/* Link to Edit Profile Page in mobile nav */}
                    <a 
                      href="/profile/edit" 
                      className="w-full flex items-center space-x-2 text-white hover:text-white transition-colors duration-200 px-3 py-2 text-left hover:bg-white/10"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      <span className="font-medium">Edit Profile</span>
                    </a>
                    {/* New: Link to Admin Panel (only for authorized users) */}
                    {hasPrivilege(['Junior Support', 'Support', 'Senior Support', 'Admin', 'Owner']) && (
                      <a
                        href="/admin"
                        className="w-full flex items-center space-x-2 text-white hover:text-white transition-colors duration-200 px-3 py-2 text-left hover:bg-white/10"
                        onClick={() => setIsOpen(false)}
                      >
                        <Shield className="h-4 w-4" />
                        <span className="font-medium">Admin Panel</span>
                      </a>
                    )}
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-200 px-3 py-2 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 pt-3 border-t border-white/10">
                    <button
                      onClick={() => {
                        openAuthModal('login');
                        setIsOpen(false);
                      }}
                      className="text-white font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-left"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        openAuthModal('register');
                        setIsOpen(false);
                      }}
                      className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-2 rounded-lg font-medium mx-3 flex items-center justify-center space-x-2"
                    >
                      <Code className="h-4 w-4" />
                      <span>Start Learning</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          initialMode={authMode}
        />
      )}
    </>
  );
};

export default Navbar;
