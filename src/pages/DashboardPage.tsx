import React from 'react';
import { BookOpen, Clock, Award, TrendingUp, Play, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const enrolledCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      progress: 75,
      nextLesson: 'State Management with Context API',
      totalLessons: 24,
      completedLessons: 18,
      timeLeft: '2h 30m'
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      progress: 45,
      nextLesson: 'Linear Regression Implementation',
      totalLessons: 32,
      completedLessons: 14,
      timeLeft: '5h 15m'
    },
    {
      id: 3,
      title: '3D Design with Blender',
      progress: 90,
      nextLesson: 'Advanced Animation Techniques',
      totalLessons: 28,
      completedLessons: 25,
      timeLeft: '1h 45m'
    }
  ];

  const achievements = [
    { title: 'First Course Completed', icon: '🎓', date: '2 weeks ago' },
    { title: 'Study Streak: 7 days', icon: '🔥', date: 'Today' },
    { title: 'Quiz Master', icon: '🏆', date: '1 week ago' },
    { title: 'Fast Learner', icon: '⚡', date: '3 days ago' }
  ];

  const stats = [
    { label: 'Courses Enrolled', value: '12', icon: BookOpen, color: 'text-blue-400' },
    { label: 'Hours Learned', value: '89', icon: Clock, color: 'text-green-400' },
    { label: 'Certificates', value: '3', icon: Award, color: 'text-yellow-400' },
    { label: 'Skill Level', value: '85%', icon: TrendingUp, color: 'text-purple-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-300 text-lg">
            Continue your learning journey and achieve your goals.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
              </div>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Continue Learning</h2>
            <div className="space-y-6">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                      <p className="text-gray-300 text-sm">
                        Next: {course.nextLesson}
                      </p>
                    </div>
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg transition-colors duration-200">
                      <Play className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                      <span>{course.progress}% complete</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                      {course.timeLeft} remaining
                    </span>
                    <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center space-x-1 transition-colors duration-200">
                      <span>Continue</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Achievements */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Recent Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h3 className="text-white font-medium">{achievement.title}</h3>
                        <p className="text-gray-400 text-sm">{achievement.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Streak */}
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-500/30">
              <div className="text-center">
                <div className="text-4xl mb-2">🔥</div>
                <h3 className="text-xl font-bold text-white mb-2">7 Day Streak!</h3>
                <p className="text-gray-300 text-sm mb-4">
                  You're on fire! Keep up the great work.
                </p>
                <div className="text-2xl font-bold text-orange-400">7 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;