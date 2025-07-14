import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

const VerificationResultPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        setStatus(searchParams.get('status'));
    }, [searchParams]);

    const renderContent = () => {
        switch (status) {
            case 'success':
                return (
                    <>
                        <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
                        <h1 className="text-2xl font-bold text-white mb-4">Email Verified Successfully!</h1>
                        <p className="text-gray-300 mb-8">
                            Thank you for verifying your email. You can now log in to access your account.
                        </p>
                        <Link to="/" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-8 rounded-xl">
                            Go to Login
                        </Link>
                    </>
                );
            case 'already-verified':
                return (
                    <>
                        <Clock className="h-16 w-16 text-blue-400 mx-auto mb-6" />
                        <h1 className="text-2xl font-bold text-white mb-4">Email Already Verified</h1>
                        <p className="text-gray-300 mb-8">
                            Your email address has already been verified. You can log in at any time.
                        </p>
                         <Link to="/" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-8 rounded-xl">
                            Go to Login
                        </Link>
                    </>
                );
            default:
                return (
                    <>
                        <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-6" />
                        <h1 className="text-2xl font-bold text-white mb-4">Verification Failed</h1>
                        <p className="text-gray-300 mb-8">
                            The verification link is invalid or has expired. Please try again or contact support.
                        </p>
                         <Link to="/" className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-3 px-8 rounded-xl">
                            Back to Home
                        </Link>
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-md w-full text-center animate-fade-in">
                {renderContent()}
            </div>
        </div>
    );
};

export default VerificationResultPage;
