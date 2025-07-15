import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader, Sparkles, Shield, Crown, Zap, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, initialMode = 'login' }) => {
    const [isLogin, setIsLogin] = useState(initialMode === 'login');
    const [showPassword, setShowPassword] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        name: '',
        username: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { login, register, isLoading } = useAuth();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (!isLogin && !formData.name) newErrors.name = 'Full Name is required';
        if (!isLogin && !formData.username) newErrors.username = 'Username is required';
        else if (!isLogin && formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
        if (!isLogin && formData.password !== formData.password_confirmation) newErrors.password_confirmation = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            if (isLogin) {
                await login({ email: formData.email, password: formData.password });
                onClose();
            } else {
                await register({
                    name: formData.name,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.password_confirmation
                });
                setRegistrationSuccess(true);
            }
        } catch (error: any) {
            setErrors({ submit: 'Authentication failed. Please check your credentials or try again.' });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name] || errors.submit) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                delete newErrors.submit;
                return newErrors;
            });
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setRegistrationSuccess(false);
        setFormData({ email: '', password: '', password_confirmation: '', name: '', username: '' });
    };

    if (registrationSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl" onClick={onClose} />
                <div className="relative glass-morphism rounded-3xl border border-white/20 w-full max-w-md p-8 shadow-2xl animate-fade-in text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-cyan-500 rounded-2xl mb-6 shadow-xl">
                        <Check className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-3">Registration Successful!</h2>
                    <p className="text-gray-300 text-lg mb-8">Welcome to C++ Hub! You can now start learning.</p>
                    <button onClick={onClose} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 rounded-xl">
                        Get Started!
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl" onClick={onClose} />
            <div className="relative glass-morphism rounded-3xl border border-white/20 w-full max-w-md p-8 shadow-2xl animate-fade-in overflow-hidden">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full z-10"><X className="h-5 w-5" /></button>
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6 shadow-xl">{isLogin ? <Shield className="h-8 w-8 text-white" /> : <Crown className="h-8 w-8 text-white" />}</div>
                    <h2 className="text-3xl font-black text-white mb-3">{isLogin ? 'Welcome Back!' : 'Join C++ Hub'}</h2>
                    <p className="text-gray-300 text-lg">{isLogin ? 'Continue your coding journey' : 'Start your programming adventure'}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div className="animate-slide-up">
                            <label className="block text-sm font-bold text-gray-300 mb-2">Full Name</label>
                            <div className="relative group"><User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400" />
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400" placeholder="Enter your full name" />
                            </div>
                            {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
                        </div>
                    )}
                    {!isLogin && (
                        <div className="animate-slide-up">
                            <label className="block text-sm font-bold text-gray-300 mb-2">Username</label>
                            <div className="relative group"><User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400" />
                                <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400" placeholder="Choose a unique username" />
                            </div>
                            {errors.username && <p className="text-red-400 text-sm mt-2">{errors.username}</p>}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Email Address</label>
                        <div className="relative group"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400" />
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400" placeholder="Enter your email" />
                        </div>
                        {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Password</label>
                        <div className="relative group"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400" />
                            <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 pr-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400" placeholder="Enter your password" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"><EyeOff className="h-5 w-5" /></button>
                        </div>
                        {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password}</p>}
                    </div>
                    {!isLogin && (
                        <div className="animate-slide-up">
                            <label className="block text-sm font-bold text-gray-300 mb-2">Confirm Password</label>
                            <div className="relative group"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400" />
                                <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleInputChange} className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400" placeholder="Confirm your password" />
                            </div>
                            {errors.password_confirmation && <p className="text-red-400 text-sm mt-2">{errors.password_confirmation}</p>}
                        </div>
                    )}
                    {errors.submit && <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3"><p className="text-red-400 text-sm text-center">{errors.submit}</p></div>}
                    <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center space-x-3 text-lg">{isLoading ? <><Loader className="h-5 w-5 animate-spin" /><span>Processing...</span></> : <><Sparkles className="h-5 w-5" /><span>{isLogin ? 'Sign In' : 'Create Account'}</span></>}</button>
                </form>
                <div className="text-center mt-8">
                    <p className="text-gray-300 text-lg">{isLogin ? "Don't have an account? " : 'Already have an account? '}<button onClick={toggleMode} className="text-blue-400 hover:text-blue-300 font-bold">{isLogin ? 'Sign Up' : 'Sign In'}</button></p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;