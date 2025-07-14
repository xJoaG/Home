import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Search, Ban, UserCheck, Users, Loader, AlertCircle, CheckCircle, Eye, EyeOff, XCircle, Clock, MessageSquare, Mail, Globe, Image, Crown, Shield, Settings, Calendar, Activity, Filter, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Send } from 'lucide-react';
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

// Define the groups for dropdowns (should match backend's User::GROUP_HIERARCHY keys)
const ALL_GROUPS = ['Basic Plan', 'Premium Plan', 'Junior Support', 'Support', 'Senior Support', 'Admin', 'Owner'];

interface UserProfileData {
    id: number;
    username: string;
    name?: string; // Only if viewer has privilege or is owner
    email?: string; // Only if viewer has privilege or is owner
    bio: string | null;
    nationality: string | null;
    profile_picture_url: string | null;
    is_profile_public: boolean;
    group: string;
    banned_until: string | null;
    ban_reason: string | null;
    is_private?: boolean; // Used for private profiles in show endpoint
    message?: string; // Used for error/ban messages from show endpoint
    created_at?: string; // Added for sorting/display
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface AdminStats {
    total_users: number;
    active_today: number;
    active_bans: number;
}

const AdminPanelPage: React.FC = () => {
    const { user: currentUser, isLoading: authLoading, hasPrivilege } = useAuth();
    const navigate = useNavigate();

    // Main page tab state
    const [mainTab, setMainTab] = useState<'user_management' | 'send_email'>('user_management');

    // User list states
    const [users, setUsers] = useState<UserProfileData[]>([]);
    const [pagination, setPagination] = useState<PaginationMeta>({ current_page: 1, last_page: 1, per_page: 15, total: 0 });
    const [listLoading, setListLoading] = useState(false);
    const [listError, setListError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    
    // User details modal states
    const [selectedUser, setSelectedUser] = useState<UserProfileData | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Tab state for the modal
    const [modalActiveTab, setModalActiveTab] = useState<'info' | 'moderation' | 'permissions'>('info');

    // Admin action states (for modal)
    const [banReason, setBanReason] = useState('');
    const [bannedUntil, setBannedUntil] = useState('');
    const [newGroup, setNewGroup] = useState('');
    const [adminActionLoading, setAdminActionLoading] = useState(false);
    const [adminActionMessage, setAdminActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Admin stats states
    const [adminStats, setAdminStats] = useState<AdminStats>({ total_users: 0, active_today: 0, active_bans: 0 });
    const [statsLoading, setStatsLoading] = useState(true);
    const [statsError, setStatsError] = useState<string | null>(null);

    // Email sending states (for new tab)
    const [emailRecipientsType, setEmailRecipientsType] = useState<'all' | 'group' | 'specific_users'>('all');
    const [emailGroupNames, setEmailGroupNames] = useState<string[]>([]); // For multiple group selection
    const [emailSubject, setEmailSubject] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [emailSendingLoading, setEmailSendingLoading] = useState(false);
    const [emailSendingMessage, setEmailSendingMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [selectedUserIdsForEmail, setSelectedUserIdsForEmail] = useState<number[]>([]); // For specific users

    // Authorization checks
    const canAccessPanel = hasPrivilege(['Junior Support', 'Support', 'Senior Support', 'Admin', 'Owner']);
    const canBan = hasPrivilege(['Admin', 'Owner', 'Senior Support']);
    const canChangeGroup = hasPrivilege(['Admin', 'Owner']);
    const canSeeFullInfo = hasPrivilege(['Admin', 'Owner', 'Senior Support', 'Support']);
    const canSendEmail = hasPrivilege(['Admin', 'Owner']);

    // Redirect if not authorized
    useEffect(() => {
        if (!authLoading && !canAccessPanel) {
            navigate('/');
        }
    }, [authLoading, canAccessPanel, navigate]);

    // Fetch users function
    const fetchUsers = useCallback(async (page: number = 1, search: string = '') => {
        setListLoading(true);
        setListError(null);
        try {
            const response = await apiClient.get('/users', {
                params: { page, search }
            });
            setUsers(response.data.data);
            setPagination(response.data.meta);
        } catch (err: any) {
            console.error('Failed to fetch users:', err);
            setListError(err.response?.data?.message || 'Failed to load users. Check your permissions.');
        } finally {
            setListLoading(false);
        }
    }, []);

    // Fetch stats function
    const fetchStats = useCallback(async () => {
        setStatsLoading(true);
        setStatsError(null);
        try {
            const response = await apiClient.get('/admin/stats');
            setAdminStats(response.data);
        } catch (err: any) {
            console.error('Failed to fetch stats:', err);
            setStatsError(err.response?.data?.message || 'Failed to load stats.');
        } finally {
            setStatsLoading(false);
        }
    }, []);

    // Initial fetch on component mount and when mainTab changes
    useEffect(() => {
        if (canAccessPanel) {
            fetchStats(); // Always fetch stats
            if (mainTab === 'user_management' || mainTab === 'send_email') {
                fetchUsers(1, ''); // Fetch users for both user list tabs
            }
        }
    }, [canAccessPanel, fetchUsers, fetchStats, mainTab]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchUsers(1, searchQuery);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= pagination.last_page) {
            fetchUsers(page, searchQuery);
        }
    };

    const handleViewUserDetails = (user: UserProfileData) => {
        setSelectedUser(user);
        setModalOpen(true);
        setBanReason(user.ban_reason || '');
        setBannedUntil(user.banned_until ? new Date(user.banned_until).toISOString().slice(0, 16) : '');
        setNewGroup(user.group);
        setAdminActionMessage(null);
        setModalActiveTab('info');
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
        setAdminActionMessage(null);
        setBanReason('');
        setBannedUntil('');
        setNewGroup('');
        setModalActiveTab('info');
        fetchUsers(pagination.current_page, searchQuery); // Refresh current list after modal action
        fetchStats(); // Refresh stats after modal action
    };

    // Admin Action Handlers (for modal)
    const handleBanUser = async (permanent: boolean = false) => {
        if (!selectedUser?.id) return;
        if ((!permanent && !bannedUntil) || !banReason) {
            setAdminActionMessage({ type: 'error', text: 'Please fill all ban fields.' });
            return;
        }
        setAdminActionLoading(true);
        setAdminActionMessage(null);
        try {
            const data: { banned_until?: string; ban_reason: string } = {
                ban_reason: banReason,
            };
            if (!permanent) {
                data.banned_until = bannedUntil;
            }
            await apiClient.post(`/admin/users/${selectedUser.id}/ban`, data);
            setAdminActionMessage({ type: 'success', text: `User ${selectedUser.username} banned successfully!` });
            setSelectedUser(prev => prev ? { ...prev, banned_until: data.banned_until || null, ban_reason: banReason } : null);
        } catch (error: any) {
            console.error('Failed to ban user:', error);
            const errorMessage = error.response?.data?.message || 'Failed to ban user. Check privileges or user ID.';
            setAdminActionMessage({ type: 'error', text: errorMessage });
        } finally {
            setAdminActionLoading(false);
        }
    };

    const handleUnbanUser = async () => {
        if (!selectedUser?.id) return;
        setAdminActionLoading(true);
        setAdminActionMessage(null);
        try {
            await apiClient.post(`/admin/users/${selectedUser.id}/unban`);
            setAdminActionMessage({ type: 'success', text: `User ${selectedUser.username} unbanned successfully!` });
            setSelectedUser(prev => prev ? { ...prev, banned_until: null, ban_reason: null } : null);
        } catch (error: any) {
            console.error('Failed to unban user:', error);
            const errorMessage = error.response?.data?.message || 'Failed to unban user. Check privileges or user ID.';
            setAdminActionMessage({ type: 'error', text: errorMessage });
        } finally {
            setAdminActionLoading(false);
        }
    };

    const handleUpdateGroup = async () => {
        if (!selectedUser?.id || !newGroup) {
            setAdminActionMessage({ type: 'error', text: 'Please select a new group.' });
            return;
        }
        setAdminActionLoading(true);
        setAdminActionMessage(null);
        try {
            await apiClient.put(`/admin/users/${selectedUser.id}/group`, { group: newGroup });
            setAdminActionMessage({ type: 'success', text: `User ${selectedUser.username} group updated to ${newGroup}!` });
            setSelectedUser(prev => prev ? { ...prev, group: newGroup } : null);
        } catch (error: any) {
            console.error('Failed to update group:', error);
            const errorMessage = error.response?.data?.message || 'Failed to update group. Check privileges or user ID.';
            setAdminActionMessage({ type: 'error', text: errorMessage });
        } finally {
            setAdminActionLoading(false);
        }
    };

    // Email Sending Handlers (for new tab)
    const handleEmailSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailSendingLoading(true);
        setEmailSendingMessage(null);

        let userIdentifiers: string[] = [];
        if (emailRecipientsType === 'specific_users') {
            userIdentifiers = selectedUserIdsForEmail.map(id => id.toString()); // Convert IDs to strings
            if (userIdentifiers.length === 0) {
                setEmailSendingMessage({ type: 'error', text: 'Please select at least one user to send the email to.' });
                setEmailSendingLoading(false);
                return;
            }
        } else if (emailRecipientsType === 'group' && emailGroupNames.length === 0) {
            setEmailSendingMessage({ type: 'error', text: 'Please select at least one group.' });
            setEmailSendingLoading(false);
            return;
        }

        try {
            await apiClient.post('/admin/send-email', {
                recipients_type: emailRecipientsType,
                group_name: emailRecipientsType === 'group' ? emailGroupNames : null, // Send array for groups
                user_identifiers: emailRecipientsType === 'specific_users' ? userIdentifiers : null,
                subject: emailSubject,
                message: emailMessage,
            });
            setEmailSendingMessage({ type: 'success', text: 'Emails dispatched successfully!' });
            // Clear form after successful send
            setEmailSubject('');
            setEmailMessage('');
            setSelectedUserIdsForEmail([]);
            setEmailGroupNames([]);
        } catch (error: any) {
            console.error('Failed to send email:', error);
            const errorMessage = error.response?.data?.message || (error.response?.data?.errors ? Object.values(error.response.data.errors).flat().join(' ') : 'Failed to send email. Check your permissions or recipient criteria.');
            setEmailSendingMessage({ type: 'error', text: errorMessage });
        } finally {
            setEmailSendingLoading(false);
        }
    };

    const handleUserSelectionForEmail = (userId: number, isChecked: boolean) => {
        setSelectedUserIdsForEmail(prev => 
            isChecked ? [...prev, userId] : prev.filter(id => id !== userId)
        );
    };

    const handleGroupSelectionForEmail = (groupName: string, isChecked: boolean) => {
        setEmailGroupNames(prev =>
            isChecked ? [...prev, groupName] : prev.filter(name => name !== groupName)
        );
    };

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

    const isUserBanned = (user: UserProfileData) => {
        return user.banned_until && new Date(user.banned_until) > new Date();
    };

    if (authLoading || !canAccessPanel) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="glass-morphism rounded-2xl p-8 border border-white/20 flex items-center space-x-4">
                    <Loader className="h-8 w-8 text-indigo-400 animate-spin" />
                    <p className="text-white text-lg">Loading admin panel...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden">
            <ParticleNetwork />
            <Navbar />
            
            <div className="pt-20 pb-16">
                {/* Enhanced Header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center space-x-3 glass-morphism rounded-full px-8 py-4 mb-8 border border-white/20 shadow-lg">
                            <Shield className="h-6 w-6 text-red-400 animate-pulse" />
                            <span className="text-white font-bold text-lg">Admin Control Center</span>
                            <Settings className="h-6 w-6 text-blue-400" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            Admin
                            <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent"> 
                                Dashboard
                            </span>
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                            Manage users, permissions, and platform moderation with advanced administrative tools.
                        </p>
                    </div>

                    {/* Admin Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="glass-morphism rounded-2xl p-6 border border-white/20 hover:border-red-400/30 transition-all duration-300 group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Ban className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-2xl font-black text-red-400">{statsLoading ? <Loader className="h-6 w-6 animate-spin" /> : adminStats.active_bans}</span>
                            </div>
                            <h3 className="text-white font-semibold mb-1">Active Bans</h3>
                            <p className="text-gray-400 text-sm">Currently banned users</p>
                        </div>

                        <div className="glass-morphism rounded-2xl p-6 border border-white/20 hover:border-blue-400/30 transition-all duration-300 group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-2xl font-black text-blue-400">{statsLoading ? <Loader className="h-6 w-6 animate-spin" /> : adminStats.total_users}</span>
                            </div>
                            <h3 className="text-white font-semibold mb-1">Total Users</h3>
                            <p className="text-gray-400 text-sm">Registered members</p>
                        </div>

                        <div className="glass-morphism rounded-2xl p-6 border border-white/20 hover:border-green-400/30 transition-all duration-300 group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Activity className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-2xl font-black text-green-400">{statsLoading ? <Loader className="h-6 w-6 animate-spin" /> : adminStats.active_today}</span>
                            </div>
                            <h3 className="text-white font-semibold mb-1">Active Today</h3>
                            <p className="text-gray-400 text-sm">Users online now</p>
                        </div>
                    </div>
                    {statsError && (
                        <div className="mt-4 bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-center space-x-3 animate-fade-in max-w-fit mx-auto">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                            <span className="text-red-300">{statsError}</span>
                        </div>
                    )}
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass-morphism rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                        {/* Sidebar Navigation */}
                        <div className="lg:w-1/4 bg-white/5 border-b lg:border-b-0 lg:border-r border-white/10 p-6 flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 flex-shrink-0 overflow-x-auto custom-scrollbar">
                            <button
                                onClick={() => setMainTab('user_management')}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${
                                    mainTab === 'user_management'
                                        ? 'bg-blue-500/20 text-blue-400'
                                        : 'text-gray-300 hover:bg-white/10'
                                }`}
                            >
                                <Users className="h-5 w-5" />
                                <span>Manage Users</span>
                            </button>
                            {canSendEmail && (
                                <button
                                    onClick={() => setMainTab('send_email')}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${
                                        mainTab === 'send_email'
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'text-gray-300 hover:bg-white/10'
                                    }`}
                                >
                                    <Mail className="h-5 w-5" />
                                    <span>Send Email</span>
                                </button>
                            )}
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 p-8">
                            {mainTab === 'user_management' && (
                                <>
                                    {/* User Search Section */}
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                                            <Search className="h-6 w-6 text-blue-400" />
                                            <span>Search & Filter Users</span>
                                        </h2>
                                        
                                        <form onSubmit={handleSearchSubmit} className="space-y-4">
                                            <div className="relative">
                                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                                                    placeholder="Search by User ID, Username, or Email..."
                                                />
                                            </div>
                                            
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <button
                                                    type="submit"
                                                    disabled={listLoading}
                                                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105"
                                                >
                                                    {listLoading ? <Loader className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                                                    <span>{listLoading ? 'Searching...' : 'Search User'}</span>
                                                </button>
                                                
                                                <button
                                                    type="button"
                                                    className="px-6 py-4 glass-morphism-dark text-white font-semibold rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
                                                >
                                                    <Filter className="h-5 w-5" />
                                                    <span>Advanced Filters</span>
                                                </button>
                                            </div>
                                        </form>

                                        {listError && (
                                            <div className="mt-4 bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-center space-x-3 animate-fade-in">
                                                <AlertCircle className="h-5 w-5 text-red-400" />
                                                <span className="text-red-300">{listError}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* User List & Pagination */}
                                    <div className="p-8 -mx-8"> {/* Negative margin to compensate for padding */}
                                        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                                            <Users className="h-5 w-5 text-blue-400" />
                                            <span>All Users ({pagination.total})</span>
                                        </h3>
                                        
                                        {listLoading && users.length === 0 ? (
                                            <div className="flex items-center justify-center py-10">
                                                <Loader className="h-8 w-8 text-indigo-400 animate-spin" />
                                                <p className="text-white ml-4">Loading users...</p>
                                            </div>
                                        ) : users.length === 0 ? (
                                            <div className="text-center text-gray-400 py-10">
                                                <p>No users found matching your criteria.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {users.map(user => (
                                                    <div key={user.id} className="glass-morphism-dark rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                                                        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                                                            <div className="flex items-center space-x-4">
                                                                <div className="relative">
                                                                    <img
                                                                        src={user.profile_picture_url || 'https://placehold.co/64x64/000000/FFFFFF?text=U'}
                                                                        alt={user.username}
                                                                        className="w-16 h-16 rounded-xl object-cover border-2 border-white/20 shadow-lg"
                                                                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/64x64/000000/FFFFFF?text=U'; }}
                                                                    />
                                                                    {isUserBanned(user) && (
                                                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                                                                            <Ban className="h-3 w-3 text-white" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                
                                                                <div className="space-y-1 text-center sm:text-left">
                                                                    <div className="flex items-center space-x-3 justify-center sm:justify-start">
                                                                        <h4 className="text-white font-bold text-lg">{user.username}</h4>
                                                                        <div className={`flex items-center space-x-1 bg-gradient-to-r ${getGroupColor(user.group)} px-3 py-1 rounded-full shadow-lg`}>
                                                                            <Crown className="h-3 w-3 text-white" />
                                                                            <span className="text-white text-xs font-medium">{user.group}</span>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-gray-400 text-sm">ID: {user.id} | Joined: {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
                                                                    {isUserBanned(user) && (
                                                                        <div className="flex items-center space-x-2 text-red-400 text-xs justify-center sm:justify-start">
                                                                            <Ban className="h-3 w-3" />
                                                                            <span>Banned until {new Date(user.banned_until!).toLocaleDateString()}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            
                                                            <button
                                                                onClick={() => handleViewUserDetails(user)}
                                                                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:scale-105"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                <span>Manage User</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Pagination Controls */}
                                        {pagination.total > 0 && (
                                            <div className="flex items-center justify-center space-x-2 mt-8">
                                                <button
                                                    onClick={() => handlePageChange(1)}
                                                    disabled={pagination.current_page === 1 || listLoading}
                                                    className="glass-morphism-dark text-white p-2 rounded-full disabled:opacity-50 hover:bg-white/10 transition-colors duration-200"
                                                >
                                                    <ChevronsLeft className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handlePageChange(pagination.current_page - 1)}
                                                    disabled={pagination.current_page === 1 || listLoading}
                                                    className="glass-morphism-dark text-white p-2 rounded-full disabled:opacity-50 hover:bg-white/10 transition-colors duration-200"
                                                >
                                                    <ChevronLeft className="h-5 w-5" />
                                                </button>
                                                
                                                <span className="text-white font-medium px-4 py-2 bg-white/10 rounded-lg">
                                                    Page {pagination.current_page} of {pagination.last_page}
                                                </span>

                                                <button
                                                    onClick={() => handlePageChange(pagination.current_page + 1)}
                                                    disabled={pagination.current_page === pagination.last_page || listLoading}
                                                    className="glass-morphism-dark text-white p-2 rounded-full disabled:opacity-50 hover:bg-white/10 transition-colors duration-200"
                                                >
                                                    <ChevronRight className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handlePageChange(pagination.last_page)}
                                                    disabled={pagination.current_page === pagination.last_page || listLoading}
                                                    className="glass-morphism-dark text-white p-2 rounded-full disabled:opacity-50 hover:bg-white/10 transition-colors duration-200"
                                                >
                                                    <ChevronsRight className="h-5 w-5" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Email Tab */}
                            {mainTab === 'send_email' && canSendEmail && (
                                <div className="space-y-8">
                                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                                        <Mail className="h-6 w-6 text-green-400" />
                                        <span>Send Bulk Email</span>
                                    </h2>

                                    <form onSubmit={handleEmailSend} className="max-w-3xl mx-auto space-y-6">
                                        <div>
                                            <label htmlFor="emailRecipientsType" className="block text-sm font-bold text-gray-300 mb-3">Recipients</label>
                                            <select
                                                id="emailRecipientsType"
                                                value={emailRecipientsType}
                                                onChange={(e) => {
                                                    setEmailRecipientsType(e.target.value as 'all' | 'group' | 'specific_users');
                                                    setEmailGroupNames([]); // Clear group selection on type change
                                                    setSelectedUserIdsForEmail([]); // Clear user selection on type change
                                                }}
                                                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400 appearance-none pr-10"
                                            >
                                                <option value="all" className="bg-gray-800">All Users</option>
                                                <option value="group" className="bg-gray-800">Specific Group(s)</option>
                                                <option value="specific_users" className="bg-gray-800">Specific Users (from list below)</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                                                <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                            </div>
                                        </div>

                                        {emailRecipientsType === 'group' && (
                                            <div>
                                                <label className="block text-sm font-bold text-gray-300 mb-3">Select Group(s)</label>
                                                <div className="grid grid-cols-2 gap-2 bg-white/5 border border-white/20 rounded-xl p-4">
                                                    {ALL_GROUPS.map(group => (
                                                        <label key={group} className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                value={group}
                                                                checked={emailGroupNames.includes(group)}
                                                                onChange={(e) => handleGroupSelectionForEmail(group, e.target.checked)}
                                                                className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500 bg-white/10"
                                                            />
                                                            <span>{group}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                {emailGroupNames.length === 0 && <p className="text-red-400 text-xs mt-1">Please select at least one group.</p>}
                                            </div>
                                        )}

                                        {emailRecipientsType === 'specific_users' && (
                                            <div className="space-y-4">
                                                <label className="block text-sm font-bold text-gray-300 mb-3">Select Users from the List Below</label>
                                                <div className="h-64 overflow-y-auto custom-scrollbar bg-white/5 border border-white/20 rounded-xl p-4">
                                                    {listLoading ? (
                                                        <div className="flex items-center justify-center py-4">
                                                            <Loader className="h-6 w-6 text-indigo-400 animate-spin" />
                                                            <p className="text-white ml-2">Loading users...</p>
                                                        </div>
                                                    ) : users.length === 0 ? (
                                                        <p className="text-gray-400 text-center py-4">No users available to select. Adjust search or check permissions.</p>
                                                    ) : (
                                                        users.map(user => (
                                                            <label key={user.id} className="flex items-center space-x-3 py-2 border-b border-white/5 last:border-b-0 cursor-pointer hover:bg-white/5 rounded-md px-2 -mx-2">
                                                                <input
                                                                    type="checkbox"
                                                                    value={user.id}
                                                                    checked={selectedUserIdsForEmail.includes(user.id)}
                                                                    onChange={(e) => handleUserSelectionForEmail(user.id, e.target.checked)}
                                                                    className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500 bg-white/10"
                                                                />
                                                                <img
                                                                    src={user.profile_picture_url || 'https://placehold.co/32x32/000000/FFFFFF?text=U'}
                                                                    alt={user.username}
                                                                    className="w-8 h-8 rounded-full object-cover border border-white/10"
                                                                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/32x32/000000/FFFFFF?text=U'; }}
                                                                />
                                                                <span className="text-white font-medium">{user.username}</span>
                                                                <span className="text-gray-400 text-xs">({user.group})</span>
                                                            </label>
                                                        ))
                                                    )}
                                                </div>
                                                {selectedUserIdsForEmail.length === 0 && <p className="text-red-400 text-xs mt-1">Please select at least one user.</p>}
                                            </div>
                                        )}

                                        <div>
                                            <label htmlFor="emailSubject" className="block text-sm font-bold text-gray-300 mb-3">Subject</label>
                                            <input
                                                type="text"
                                                id="emailSubject"
                                                value={emailSubject}
                                                onChange={(e) => setEmailSubject(e.target.value)}
                                                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                                                placeholder="Email Subject"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="emailMessage" className="block text-sm font-bold text-gray-300 mb-3">Message</label>
                                            <textarea
                                                id="emailMessage"
                                                value={emailMessage}
                                                onChange={(e) => setEmailMessage(e.target.value)}
                                                rows={8}
                                                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 resize-y"
                                                placeholder="Your email message..."
                                                required
                                            />
                                        </div>
                                        
                                        {emailSendingMessage && (
                                            <div className={`flex items-center space-x-3 p-4 rounded-xl ${
                                                emailSendingMessage.type === 'success' 
                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                            }`}>
                                                {emailSendingMessage.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                                                <p className="font-medium">{emailSendingMessage.text}</p>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={emailSendingLoading || !emailSubject.trim() || !emailMessage.trim() || 
                                                      (emailRecipientsType === 'group' && emailGroupNames.length === 0) ||
                                                      (emailRecipientsType === 'specific_users' && selectedUserIdsForEmail.length === 0)}
                                            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center space-x-3 text-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                                        >
                                            {emailSendingLoading ? <Loader className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                                            <span>Send Email</span>
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />

            {/* User Management Modal (FIXED POSITION) */}
            {modalOpen && selectedUser && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
                    <div className="glass-morphism rounded-3xl border border-white/20 w-full max-w-6xl max-h-[90vh] shadow-2xl animate-fade-in relative flex flex-col">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 p-6 border-b border-white/10 flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <div className="relative">
                                        <img
                                            src={selectedUser.profile_picture_url || 'https://placehold.co/80x80/000000/FFFFFF?text=User'}
                                            alt={selectedUser.username}
                                            className="w-20 h-20 rounded-2xl object-cover border-3 border-white/30 shadow-xl"
                                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/80x80/000000/FFFFFF?text=User'; }}
                                        />
                                        {isUserBanned(selectedUser) && (
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <Ban className="h-3 w-3 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-2">{selectedUser.username}</h2>
                                        <div className="flex items-center space-x-4">
                                            <div className={`flex items-center space-x-2 bg-gradient-to-r ${getGroupColor(selectedUser.group)} px-4 py-2 rounded-full shadow-lg`}>
                                                <Crown className="h-4 w-4 text-white" />
                                                <span className="text-white font-medium">{selectedUser.group}</span>
                                            </div>
                                            <div className="text-gray-300 text-sm">
                                                ID: <span className="text-white font-mono">{selectedUser.id}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all duration-200"
                                >
                                    <XCircle className="h-7 w-7" />
                                </button>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex border-b border-white/10 bg-white/5 flex-shrink-0">
                            <button
                                onClick={() => setModalActiveTab('info')}
                                className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                                    modalActiveTab === 'info' 
                                        ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-500/10' 
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <User className="h-5 w-5" />
                                <span>User Information</span>
                            </button>
                            {canBan && (
                                <button
                                    onClick={() => setModalActiveTab('moderation')}
                                    className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                                        modalActiveTab === 'moderation' 
                                            ? 'text-red-400 border-b-2 border-red-400 bg-red-500/10' 
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <Shield className="h-5 w-5" />
                                    <span>Moderation</span>
                                </button>
                            )}
                            {canChangeGroup && (
                                <button
                                    onClick={() => setModalActiveTab('permissions')}
                                    className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                                        modalActiveTab === 'permissions' 
                                            ? 'text-purple-400 border-b-2 border-purple-400 bg-purple-500/10' 
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <Users className="h-5 w-5" />
                                    <span>Permissions</span>
                                </button>
                            )}
                        </div>

                        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                            {/* Ban Status Alert */}
                            {isUserBanned(selectedUser) && (
                                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 mb-8 flex items-center space-x-4 animate-fade-in">
                                    <div className="p-3 bg-red-500/30 rounded-xl">
                                        <Ban className="h-8 w-8 text-red-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-red-400 font-bold text-xl">User is currently banned</h3>
                                        <p className="text-red-300 text-lg">Reason: {selectedUser.ban_reason}</p>
                                        <p className="text-red-300">Until: {new Date(selectedUser.banned_until!).toLocaleString()}</p>
                                    </div>
                                </div>
                            )}

                            {/* Action Messages */}
                            {adminActionMessage && (
                                <div className={`flex items-center space-x-3 p-4 rounded-xl mb-6 animate-fade-in ${
                                    adminActionMessage.type === 'success' 
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}>
                                    {adminActionMessage.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                                    <p className="font-medium">{adminActionMessage.text}</p>
                                </div>
                            )}

                            {/* Tab Content: User Information */}
                            {modalActiveTab === 'info' && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Personal Information */}
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                                                <User className="h-6 w-6 text-blue-400" />
                                                <span>Personal Information</span>
                                            </h3>
                                            
                                            <div className="space-y-4">
                                                <div className="glass-morphism-dark rounded-xl p-4 border border-white/10">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <User className="h-5 w-5 text-blue-400" />
                                                        <p className="text-gray-400 text-sm font-medium">Username</p>
                                                    </div>
                                                    <p className="text-white font-semibold text-lg">{selectedUser.username}</p>
                                                </div>
                                                
                                                {selectedUser.name && canSeeFullInfo && (
                                                    <div className="glass-morphism-dark rounded-xl p-4 border border-white/10">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <User className="h-5 w-5 text-green-400" />
                                                            <p className="text-gray-400 text-sm font-medium">Full Name</p>
                                                        </div>
                                                        <p className="text-white font-semibold">{selectedUser.name}</p>
                                                    </div>
                                                )}
                                                
                                                {selectedUser.email && canSeeFullInfo && (
                                                    <div className="glass-morphism-dark rounded-xl p-4 border border-white/10">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <Mail className="h-5 w-5 text-purple-400" />
                                                            <p className="text-gray-400 text-sm font-medium">Email</p>
                                                        </div>
                                                        <p className="text-white font-semibold">{selectedUser.email}</p>
                                                    </div>
                                                )}

                                                {selectedUser.nationality && (
                                                    <div className="glass-morphism-dark rounded-xl p-4 border border-white/10">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <MapPin className="h-5 w-5 text-orange-400" />
                                                            <p className="text-gray-400 text-sm font-medium">Nationality</p>
                                                        </div>
                                                        <p className="text-white font-semibold">{selectedUser.nationality}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Profile Settings */}
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                                                <Settings className="h-6 w-6 text-purple-400" />
                                                <span>Profile Settings</span>
                                            </h3>
                                            
                                            <div className="space-y-4">
                                                <div className="glass-morphism-dark rounded-xl p-4 border border-white/10">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        {selectedUser.is_profile_public ? <Eye className="h-5 w-5 text-green-400" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
                                                        <p className="text-gray-400 text-sm font-medium">Profile Visibility</p>
                                                    </div>
                                                    <p className={`font-semibold ${selectedUser.is_profile_public ? 'text-green-400' : 'text-gray-400'}`}>
                                                        {selectedUser.is_profile_public ? 'Public' : 'Private'}
                                                    </p>
                                                </div>

                                                <div className="glass-morphism-dark rounded-xl p-4 border border-white/10">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <Crown className="h-5 w-5 text-yellow-400" />
                                                        <p className="text-gray-400 text-sm font-medium">User Group</p>
                                                    </div>
                                                    <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${getGroupColor(selectedUser.group)} px-3 py-1 rounded-full`}>
                                                        <Crown className="h-4 w-4 text-white" />
                                                        <span className="text-white font-medium">{selectedUser.group}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bio Section */}
                                    {selectedUser.bio && (
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                                                <MessageSquare className="h-6 w-6 text-green-400" />
                                                <span>Bio</span>
                                            </h3>
                                            <div className="glass-morphism-dark rounded-xl p-6 border border-white/10">
                                                <p className="text-gray-200 leading-relaxed text-lg">{selectedUser.bio}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Moderation Tab */}
                            {modalActiveTab === 'moderation' && canBan && (
                                <div className="space-y-8">
                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl font-bold text-red-400 mb-2">User Moderation</h3>
                                        <p className="text-gray-300">Manage user bans and restrictions</p>
                                    </div>

                                    <div className="max-w-2xl mx-auto space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-300 mb-3">Ban Reason</label>
                                            <textarea
                                                value={banReason}
                                                onChange={(e) => setBanReason(e.target.value)}
                                                rows={4}
                                                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-400 resize-none"
                                                placeholder="Specify the reason for this moderation action..."
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-bold text-gray-300 mb-3">Ban Duration (Optional)</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="datetime-local"
                                                    value={bannedUntil}
                                                    onChange={(e) => setBannedUntil(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-400"
                                                />
                                            </div>
                                            <p className="text-gray-400 text-sm mt-2">Leave empty for permanent ban</p>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                            <button
                                                type="button"
                                                onClick={() => handleBanUser(false)}
                                                disabled={adminActionLoading || !banReason.trim()} // Disable if no reason
                                                className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2 hover:from-red-600 hover:to-orange-600 transition-all duration-300"
                                            >
                                                {adminActionLoading ? <Loader className="h-5 w-5 animate-spin" /> : <Ban className="h-5 w-5" />}
                                                <span>{bannedUntil ? 'Temporary Ban' : 'Permanent Ban'}</span>
                                            </button>
                                            
                                            <button
                                                type="button"
                                                onClick={handleUnbanUser}
                                                disabled={adminActionLoading || !isUserBanned(selectedUser)} // Disable if user is not banned
                                                className="glass-morphism-dark text-white font-bold py-4 px-6 rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2 hover:bg-white/20 transition-all duration-300 border border-white/20"
                                            >
                                                {adminActionLoading ? <Loader className="h-5 w-5 animate-spin" /> : <UserCheck className="h-5 w-5 text-green-400" />}
                                                <span>Remove Ban</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Permissions Tab */}
                            {modalActiveTab === 'permissions' && canChangeGroup && (
                                <div className="space-y-8">
                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl font-bold text-purple-400 mb-2">Group Management</h3>
                                        <p className="text-gray-300">Assign user roles and permissions</p>
                                    </div>

                                    <div className="max-w-2xl mx-auto space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-300 mb-3">Current Group</label>
                                            <div className={`inline-flex items-center space-x-3 bg-gradient-to-r ${getGroupColor(selectedUser.group)} px-6 py-4 rounded-xl shadow-lg`}>
                                                <Crown className="h-6 w-6 text-white" />
                                                <span className="text-white font-bold text-lg">{selectedUser.group}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-300 mb-3">Assign New Group</label>
                                            <div className="relative">
                                                <select
                                                    value={newGroup}
                                                    onChange={(e) => setNewGroup(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-400 appearance-none pr-10"
                                                >
                                                    {ALL_GROUPS.map(group => (
                                                        <option key={group} value={group} className="bg-gray-800">{group}</option>
                                                    ))}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                                                    <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <button
                                            onClick={handleUpdateGroup}
                                            disabled={adminActionLoading || newGroup === selectedUser.group || newGroup === ''} // Disable if no change or empty
                                            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
                                        >
                                            {adminActionLoading ? <Loader className="h-5 w-5 animate-spin" /> : <Users className="h-5 w-5" />}
                                            <span>Update Group</span>
                                        </button>

                                        {/* Group Privileges Summary */}
                                        <div className="glass-morphism-dark rounded-xl p-6 border border-white/10">
                                            <h4 className="text-white font-bold mb-4">Group Privileges Summary</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                    <span className="text-gray-300">Basic Plan: Standard user access</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                                    <span className="text-gray-300">Premium Plan: Enhanced features</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                                    <span className="text-gray-300">Junior Support: View basic user info</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                                    <span className="text-gray-300">Support: View full user info</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                                    <span className="text-gray-300">Senior Support: View full info, Ban/Unban</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                                                    <span className="text-gray-300">Admin: All moderation, Change Group</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                                    <span className="text-gray-300">Owner: Full control</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanelPage;