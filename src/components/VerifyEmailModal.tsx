import React, { useState, useEffect } from 'react';
import { Mail, RotateCcw, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const VerifyEmailModal: React.FC = () => {
    const { user, resendVerificationEmail, logout } = useAuth();
    const [isResending, setIsResending] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleResend = async () => {
        if (countdown > 0) return;
        setIsResending(true);
        setMessage('');
        try {
            await resendVerificationEmail();
            setMessage('A new verification link has been sent!');
        } catch (error) {
            setMessage('Failed to send link. Please try again.');
        } finally {
            setIsResending(false);
            setCountdown(60); // 60-second cooldown
        }
    };

    const handleVerify = () => {
        // Mock verification - simulate successful verification
        if (user) {
            const updatedUser = { ...user, email_verified_at: new Date().toISOString() };
            localStorage.setItem('mock_user', JSON.stringify(updatedUser));
            window.location.reload(); // Refresh to update auth state
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
            <div className="bg-white/10 rounded-2xl border border-white/20 p-8 max-w-md w-full text-center animate-fade-in">
                <div className="bg-indigo-500/20 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <Mail className="h-10 w-10 text-indigo-400" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Please Verify Your Email</h1>
                <p className="text-gray-300 mb-6">
                    We've sent a verification link to <strong>{user?.email}</strong>. Please check your inbox (and spam folder) to continue.
                </p>
                
                {message && <p className="text-green-400 mb-4">{message}</p>}

                <div className="space-y-4">
                    <button
                        onClick={handleVerify}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                        <span>I've Verified My Email</span>
                    </button>
                    
                    <button
                        onClick={handleResend}
                        disabled={isResending || countdown > 0}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                        {isResending ? (
                            <><RotateCcw className="h-4 w-4 animate-spin" /><span>Sending...</span></>
                        ) : countdown > 0 ? (
                            <span>Resend in {countdown}s</span>
                        ) : (
                            <><RotateCcw className="h-4 w-4" /><span>Resend Verification Email</span></>
                        )}
                    </button>
                    <button
                        onClick={logout}
                        className="w-full bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20 flex items-center justify-center space-x-2"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailModal;