import React, { useEffect } from 'react'; // <--- ADDED useEffect here
import { Ban, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BanModal: React.FC = () => {
    const { user, logout } = useAuth();

    // Prevent scrolling of the underlying page when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <div className="bg-white/10 rounded-3xl border border-red-500/50 p-8 max-w-md w-full text-center shadow-2xl animate-fade-in">
                <div className="bg-red-500/20 rounded-full p-4 w-24 h-24 mx-auto mb-6 flex items-center justify-center border border-red-500/30">
                    <Ban className="h-12 w-12 text-red-400" />
                </div>
                <h1 className="text-3xl font-bold text-red-400 mb-4">Account Banned!</h1>
                <p className="text-gray-300 text-lg mb-6">
                    Your account has been restricted from accessing the platform.
                </p>
                
                {user?.ban_reason && (
                    <div className="bg-white/5 border border-white/20 rounded-xl p-4 mb-4 text-left">
                        <p className="text-gray-400 text-sm font-medium mb-1">Reason:</p>
                        <p className="text-white leading-relaxed">{user.ban_reason}</p>
                    </div>
                )}

                {user?.banned_until && (
                    <div className="bg-white/5 border border-white/20 rounded-xl p-4 mb-6 text-left">
                        <p className="text-gray-400 text-sm font-medium mb-1">Banned Until:</p>
                        <p className="text-white leading-relaxed">{new Date(user.banned_until).toLocaleString()}</p>
                    </div>
                )}
                
                {!user?.banned_until && user?.ban_reason && (
                    <p className="text-gray-400 text-sm mb-6">This ban is permanent.</p>
                )}

                <button
                    onClick={logout}
                    className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-900 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default BanModal;
