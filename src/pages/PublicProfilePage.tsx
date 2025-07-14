import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Globe, Image, Lock, Loader, AlertCircle, Ban, MessageSquare, Mail, Crown, Calendar, MapPin, Edit, Eye, EyeOff, Star, Award, BookOpen, Activity, Shield, Clock, Users, TrendingUp, Code, Zap, Target, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleNetwork from '../components/ParticleNetwork';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.cpp-hub.com/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

interface PublicProfileData {
    id: number;
    username: string | null;
    name?: string;
    email?: string;
    bio: string | null;
    nationality: string | null;
    profile_picture_url: string | null;
    is_profile_public: boolean;
    group: string;
    banned_until?: string | null;
    ban_reason?: string | null;
    is_private?: boolean;
    message?: string;
}

const PublicProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user: currentUser, hasPrivilege } = useAuth();
    const [profile, setProfile] = useState<PublicProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isTargetUserBanned, setIsTargetUserBanned] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            setIsTargetUserBanned(false);
            try {
                const response = await apiClient.get(`/users/${id}/profile`);
                setProfile(response.data);
                if (response.data.banned_until) {
                    const bannedUntilDate = new Date(response.data.banned_until);
                    if (bannedUntilDate > new Date()) {
                        setIsTargetUserBanned(true);
                    }
                }
            } catch (err: any) {
                console.error('Failed to fetch public profile:', err);
                if (err.response?.status === 403) {
                    if (err.response?.data?.is_private) {
                        setError('This profile is private.');
                    } else if (err.response?.data?.message && err.response?.data?.banned_until) {
                        setIsTargetUserBanned(true);
                        setProfile({
                            id: 0,
                            username: id,
                            bio: null, nationality: null, profile_picture_url: null, is_profile_public: false, group: 'Unknown',
                            banned_until: err.response.data.banned_until,
                            ban_reason: err.response.data.ban_reason,
                            message: err.response.data.message
                        });
                        setError(null);
                    } else {
                        setError('Access Denied.');
                    }
                } else if (err.response?.status === 404) {
                    setError('User not found.');
                } else {
                    setError('Failed to load profile. Please try again later.');
                }
                setProfile(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProfile();
        }
    }, [id, currentUser]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="glass-morphism rounded-2xl p-8 border border-white/20 flex items-center space-x-4">
                    <Loader className="h-8 w-8 text-indigo-400 animate-spin" />
                    <p className="text-white text-lg">Loading profile...</p>
                </div>
            </div>
        );
    }

    const isOwner = currentUser && profile && currentUser.id === profile.id;
    const canSeeFullInfo = hasPrivilege(['Admin', 'Owner', 'Senior Support']);

    const getGroupColor = (group: string) => {
        switch (group) {
            case 'Owner': return 'from-red-500 to-orange-500';
            case 'Admin': return 'from-purple-500 to-pink-500';
            case 'Senior Support': return 'from-blue-500 to-cyan-500';
            case 'Support': return 'from-green-500 to-emerald-500';
            case 'Junior Support': return 'from-yellow-500 to-orange-500';
            case 'Premium Plan': return 'from-indigo-500 to-purple-500';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    const achievements = [
        { icon: BookOpen, title: 'Course Completionist', description: 'Completed 10+ courses', color: 'text-blue-400' },
        { icon: Star, title: 'Top Performer', description: 'Maintained 95% average', color: 'text-yellow-400' },
        { icon: Users, title: 'Community Helper', description: 'Helped 50+ students', color: 'text-green-400' },
        { icon: Code, title: 'Code Master', description: 'Solved 100+ challenges', color: 'text-purple-400' },
    ];

    const stats = [
        { icon: BookOpen, value: '12', label: 'Courses Completed', color: 'text-blue-400', bgColor: 'from-blue-500/20 to-cyan-500/20' },
        { icon: Award, value: '5', label: 'Certificates Earned', color: 'text-yellow-400', bgColor: 'from-yellow-500/20 to-orange-500/20' },
        { icon: Clock, value: '89h', label: 'Learning Time', color: 'text-green-400', bgColor: 'from-green-500/20 to-emerald-500/20' },
        { icon: TrendingUp, value: '95%', label: 'Average Score', color: 'text-purple-400', bgColor: 'from-purple-500/20 to-pink-500/20' },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden">
            <ParticleNetwork />
            <Navbar />
            
            <div className="pt-20 pb-16">
                {/* Enhanced Header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 mb-8 border border-white/20 shadow-lg">
                            <User className="h-6 w-6 text-blue-400" />
                            <span className="text-white font-bold text-lg">Community Member</span>
                            <Eye className="h-6 w-6 text-green-400" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            Member
                            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent"> 
                                Profile
                            </span>
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                            Discover the journey and achievements of this C++ Hub community member.
                        </p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {error ? (
                        <div className="glass-morphism rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                            <div className="p-12 text-center">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-red-500/20 rounded-3xl mb-8">
                                    <AlertCircle className="h-12 w-12 text-red-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">Profile Unavailable</h2>
                                <p className="text-red-400 text-xl mb-8">{error}</p>
                                
                                {isTargetUserBanned && profile && (
                                    <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-8 max-w-md mx-auto mb-8">
                                        <div className="flex items-center justify-center space-x-3 mb-4">
                                            <Ban className="h-6 w-6 text-red-400" />
                                            <h3 className="text-red-400 font-bold text-xl">User Banned</h3>
                                        </div>
                                        <p className="text-red-300 mb-2">Reason: {profile.ban_reason}</p>
                                        <p className="text-red-300 text-sm">Until: {profile.banned_until ? new Date(profile.banned_until).toLocaleString() : 'Permanent'}</p>
                                    </div>
                                )}
                                
                                <Link 
                                    to="/" 
                                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg"
                                >
                                    <span>Back to Home</span>
                                </Link>
                            </div>
                        </div>
                    ) : profile ? (
                        <div className="space-y-8">
                            {/* Profile Header Card */}
                            <div className="glass-morphism rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 p-8 border-b border-white/10">
                                    <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
                                        <div className="relative">
                                            <img
                                                src={profile.profile_picture_url || 'https://placehold.co/200x200/000000/FFFFFF?text=User'}
                                                alt={profile.username || 'User'}
                                                className="w-48 h-48 rounded-3xl object-cover border-4 border-white/30 shadow-2xl"
                                                onError={(e) => { e.currentTarget.src = 'https://placehold.co/200x200/000000/FFFFFF?text=User'; }}
                                            />
                                            {isTargetUserBanned && (
                                                <div className="absolute -top-3 -right-3 w-10 h-10 bg-red-500 rounded-full border-4 border-white flex items-center justify-center shadow-xl">
                                                    <Ban className="h-5 w-5 text-white" />
                                                </div>
                                            )}
                                            {/* Online Status Indicator */}
                                            <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-400 rounded-full border-3 border-white shadow-lg animate-pulse"></div>
                                        </div>
                                        
                                        <div className="flex-1 text-center lg:text-left space-y-6">
                                            <div>
                                                <h2 className="text-4xl font-bold text-white mb-3">
                                                    {profile.username || 'Anonymous User'}
                                                </h2>
                                                
                                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-4">
                                                    <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${getGroupColor(profile.group)} px-4 py-2 rounded-full shadow-lg`}>
                                                        <Crown className="h-5 w-5 text-white" />
                                                        <span className="text-white font-bold">{profile.group}</span>
                                                    </div>
                                                    
                                                    <div className="flex items-center space-x-2 glass-morphism-dark px-4 py-2 rounded-full border border-white/20">
                                                        {profile.is_profile_public ? (
                                                            <>
                                                                <Eye className="h-4 w-4 text-green-400" />
                                                                <span className="text-green-400 text-sm font-medium">Public</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                                                <span className="text-gray-400 text-sm font-medium">Private</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Contact Information */}
                                            <div className="space-y-3">
                                                {(profile.name && (isOwner || canSeeFullInfo)) && (
                                                    <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-300">
                                                        <User className="h-5 w-5 text-blue-400" />
                                                        <span className="font-medium">{profile.name}</span>
                                                    </div>
                                                )}
                                                
                                                {(profile.email && (isOwner || canSeeFullInfo)) && (
                                                    <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-300">
                                                        <Mail className="h-5 w-5 text-green-400" />
                                                        <span className="font-medium">{profile.email}</span>
                                                    </div>
                                                )}

                                                {profile.nationality && (
                                                    <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-300">
                                                        <MapPin className="h-5 w-5 text-purple-400" />
                                                        <span className="font-medium">{profile.nationality}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                                {isOwner && (
                                                    <Link 
                                                        to="/profile/edit" 
                                                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:scale-105"
                                                    >
                                                        <Edit className="h-5 w-5" />
                                                        <span>Edit Profile</span>
                                                    </Link>
                                                )}
                                                
                                                <button className="inline-flex items-center space-x-2 glass-morphism-dark text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20">
                                                    <MessageSquare className="h-5 w-5 text-blue-400" />
                                                    <span>Send Message</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Ban Status Alert */}
                                {isTargetUserBanned && (
                                    <div className="p-6 border-b border-white/10">
                                        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 flex items-center space-x-4">
                                            <div className="p-3 bg-red-500/30 rounded-xl">
                                                <Ban className="h-8 w-8 text-red-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-red-400 font-bold text-xl">Account Restricted</h3>
                                                <p className="text-red-300 text-lg">Reason: {profile.ban_reason}</p>
                                                <p className="text-red-300">Until: {profile.banned_until ? new Date(profile.banned_until).toLocaleString() : 'Permanent'}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left Column - Bio and Info */}
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Bio Section */}
                                    {profile.bio ? (
                                        <div className="glass-morphism rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                                            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 border-b border-white/10">
                                                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                                                    <MessageSquare className="h-6 w-6 text-green-400" />
                                                    <span>About</span>
                                                </h3>
                                            </div>
                                            <div className="p-6">
                                                <p className="text-gray-200 leading-relaxed text-lg">{profile.bio}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="glass-morphism rounded-2xl border border-white/20 shadow-xl p-12 text-center">
                                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-500/20 rounded-2xl mb-4">
                                                <MessageSquare className="h-8 w-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Bio Available</h3>
                                            <p className="text-gray-500">This user hasn't shared their story yet.</p>
                                        </div>
                                    )}

                                    {/* Achievements Section */}
                                    <div className="glass-morphism rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                                        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 border-b border-white/10">
                                            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                                                <Award className="h-6 w-6 text-yellow-400" />
                                                <span>Achievements</span>
                                            </h3>
                                        </div>
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {achievements.map((achievement, index) => (
                                                    <div key={index} className="glass-morphism-dark rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="p-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg">
                                                                <achievement.icon className={`h-5 w-5 ${achievement.color}`} />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-white font-semibold text-sm">{achievement.title}</h4>
                                                                <p className="text-gray-400 text-xs">{achievement.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Stats and Activity */}
                                <div className="space-y-8">
                                    {/* Learning Stats */}
                                    <div className="glass-morphism rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                                        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6 border-b border-white/10">
                                            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                                                <TrendingUp className="h-6 w-6 text-blue-400" />
                                                <span>Learning Stats</span>
                                            </h3>
                                        </div>
                                        <div className="p-6 space-y-4">
                                            {stats.map((stat, index) => (
                                                <div key={index} className={`glass-morphism-dark rounded-xl p-4 border border-white/10 bg-gradient-to-r ${stat.bgColor}`}>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-3">
                                                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                                            <span className="text-gray-300 font-medium">{stat.label}</span>
                                                        </div>
                                                        <div className={`text-2xl font-bold ${stat.color}`}>
                                                            {stat.value}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Recent Activity */}
                                    <div className="glass-morphism rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                                        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 border-b border-white/10">
                                            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                                                <Activity className="h-6 w-6 text-purple-400" />
                                                <span>Recent Activity</span>
                                            </h3>
                                        </div>
                                        <div className="p-6 space-y-4">
                                            <div className="flex items-center space-x-3 text-sm">
                                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                <span className="text-gray-300">Completed "Advanced C++ Concepts"</span>
                                                <span className="text-gray-500 ml-auto">2 days ago</span>
                                            </div>
                                            <div className="flex items-center space-x-3 text-sm">
                                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                                <span className="text-gray-300">Earned "Problem Solver" badge</span>
                                                <span className="text-gray-500 ml-auto">1 week ago</span>
                                            </div>
                                            <div className="flex items-center space-x-3 text-sm">
                                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                                <span className="text-gray-300">Joined "C++ Study Group"</span>
                                                <span className="text-gray-500 ml-auto">2 weeks ago</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Member Since */}
                                    <div className="glass-morphism rounded-2xl border border-white/20 shadow-xl p-6 text-center">
                                        <Calendar className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
                                        <h4 className="text-white font-semibold mb-2">Member Since</h4>
                                        <p className="text-gray-300">January 2024</p>
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            <p className="text-gray-400 text-sm">
                                                Part of the C++ Hub community for 
                                                <span className="text-white font-semibold"> 11 months</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-morphism rounded-3xl border border-white/20 shadow-2xl p-12 text-center">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-500/20 rounded-3xl mb-8">
                                <User className="h-12 w-12 text-gray-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Profile Not Found</h2>
                            <p className="text-gray-400 text-xl">The requested profile could not be found or is not accessible.</p>
                        </div>
                    )}
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default PublicProfilePage;