import React, { useState } from 'react';
import { Clock, Users, Star, ArrowRight, PlayCircle, BookOpen, Crown, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const Courses: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const allCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      description: 'Master modern React patterns, hooks, and state management with real-world projects.',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '8 weeks',
      students: 1250,
      rating: 4.9,
      level: 'Advanced',
      instructor: 'Sarah Chen',
      category: 'Frontend Development',
      language: 'English',
      type: 'premium',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      description: 'Learn the core concepts of ML and build your first predictive models.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '10 weeks',
      students: 890,
      rating: 4.8,
      level: 'Intermediate',
      instructor: 'Dr. Michael Rodriguez',
      category: 'Data Science',
      language: 'English',
      type: 'premium',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'Introduction to Web Development',
      description: 'Learn the basics of HTML, CSS, and JavaScript to start your web development journey.',
      image: 'https://images.pexels.com/photos/7130549/pexels-photo-7130549.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '4 weeks',
      students: 5200,
      rating: 4.6,
      level: 'Beginner',
      instructor: 'John Smith',
      category: 'Web Development',
      language: 'English',
      type: 'free',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Python Programming Basics',
      description: 'Start your programming journey with Python fundamentals and basic concepts.',
      image: 'https://images.pexels.com/photos/451844/pexels-photo-451844.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '3 weeks',
      students: 3800,
      rating: 4.5,
      level: 'Beginner',
      instructor: 'Lisa Wang',
      category: 'Programming',
      language: 'English',
      type: 'free',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      title: 'UI/UX Design Mastery',
      description: 'Learn design thinking, prototyping, and user research methodologies.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '8 weeks',
      students: 1800,
      rating: 4.8,
      level: 'Intermediate',
      instructor: 'Emma Wilson',
      category: 'Design',
      language: 'English',
      type: 'premium',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 6,
      title: 'Blockchain Development',
      description: 'Build decentralized applications and smart contracts on Ethereum.',
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '14 weeks',
      students: 650,
      rating: 4.9,
      level: 'Advanced',
      instructor: 'David Park',
      category: 'Blockchain',
      language: 'English',
      type: 'premium',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 7,
      title: 'Digital Marketing Fundamentals',
      description: 'Learn the basics of digital marketing, SEO, and social media strategies.',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '5 weeks',
      students: 2900,
      rating: 4.4,
      level: 'Beginner',
      instructor: 'Mark Johnson',
      category: 'Marketing',
      language: 'Spanish',
      type: 'free',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 8,
      title: 'Cloud Architecture on AWS',
      description: 'Design and deploy scalable cloud solutions using Amazon Web Services.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '6 weeks',
      students: 750,
      rating: 4.7,
      level: 'Advanced',
      instructor: 'Jennifer Kim',
      category: 'Cloud Computing',
      language: 'English',
      type: 'premium',
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Courses', count: allCourses.length },
    { id: 'free', label: 'Free', count: allCourses.filter(c => c.type === 'free').length },
    { id: 'premium', label: 'Premium', count: allCourses.filter(c => c.type === 'premium').length },
    { id: 'beginner', label: 'Beginner', count: allCourses.filter(c => c.level === 'Beginner').length },
    { id: 'intermediate', label: 'Intermediate', count: allCourses.filter(c => c.level === 'Intermediate').length },
    { id: 'advanced', label: 'Advanced', count: allCourses.filter(c => c.level === 'Advanced').length },
  ];

  const languages = ['English', 'Spanish', 'French', 'German'];

  const filteredCourses = allCourses.filter(course => {
    const matchesFilter = selectedFilter === 'all' || 
                         course.type === selectedFilter || 
                         course.level.toLowerCase() === selectedFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const coursesPerSlide = 5;
  const totalSlides = Math.ceil(filteredCourses.length / coursesPerSlide);
  const currentCourses = filteredCourses.slice(currentSlide * coursesPerSlide, (currentSlide + 1) * coursesPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section id="courses" className="py-20 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-purple-900/30 to-slate-900/50"></div>
        {/* Animated particles */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            <span className="text-white font-medium">Course Explorer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Choose Your Learning
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Path</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover courses tailored to your goals with our advanced filtering system.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, instructors, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors duration-200"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setSelectedFilter(filter.id);
                  setCurrentSlide(0);
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                <span>{filter.label}</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{filter.count}</span>
              </button>
            ))}
          </div>

          {/* Results Info */}
          <div className="text-center text-gray-300 mb-8">
            Showing {filteredCourses.length} courses
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        </div>

        {/* Course Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full border border-white/20 transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full border border-white/20 transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Course Cards */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="flex gap-6 min-w-full">
                  {filteredCourses
                    .slice(slideIndex * coursesPerSlide, (slideIndex + 1) * coursesPerSlide)
                    .map((course, index) => (
                      <div
                        key={course.id}
                        className="flex-1 min-w-0 group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-4 hover:shadow-2xl"
                        style={{
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        {/* Course Image */}
                        <div className="relative overflow-hidden h-48">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                          
                          {/* Gradient overlay */}
                          <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                          
                          {/* Play button overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                              <PlayCircle className="h-8 w-8 text-white" />
                            </div>
                          </div>

                          {/* Level badge */}
                          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getLevelColor(course.level)}`}>
                            {course.level}
                          </div>

                          {/* Type badge */}
                          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm flex items-center space-x-1 ${
                            course.type === 'premium' 
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-yellow-300' 
                              : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                          }`}>
                            {course.type === 'premium' && <Crown className="h-3 w-3" />}
                            <span>{course.type.toUpperCase()}</span>
                          </div>
                        </div>

                        {/* Course Content */}
                        <div className="p-6 space-y-4">
                          <div>
                            <div className={`text-sm font-medium mb-2 bg-gradient-to-r ${course.color} bg-clip-text text-transparent`}>
                              {course.category}
                            </div>
                            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors duration-200 mb-2 line-clamp-2">
                              {course.title}
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                              {course.description}
                            </p>
                          </div>

                          {/* Course stats */}
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{course.students.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-white font-medium">{course.rating}</span>
                            </div>
                          </div>

                          {/* Instructor */}
                          <div className="text-sm text-gray-400">
                            Instructor: <span className="text-white">{course.instructor}</span>
                          </div>

                          {/* Enroll button */}
                          <button className={`w-full ${
                            course.type === 'premium' 
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                              : 'bg-gradient-to-r from-gray-500 to-gray-600'
                          } text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 group/btn`}>
                            {course.type === 'premium' && <Crown className="h-4 w-4" />}
                            <span>{course.type === 'premium' ? 'Premium Access' : 'Start Free'}</span>
                            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide 
                      ? 'bg-indigo-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View all courses button */}
        <div className="text-center mt-12">
          <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 inline-flex items-center space-x-2 hover:scale-105 shadow-lg">
            <span>Explore All Courses</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Courses;