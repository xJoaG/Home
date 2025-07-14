import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VerifyEmailPage: React.FC = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResendEmail = async () => {
    setIsResending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsResending(false);
    setCountdown(60);
  };

  const handleVerification = () => {
    setIsVerified(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-md w-full text-center">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">Email Verified!</h1>
          <p className="text-gray-300 mb-6">
            Your email has been successfully verified. Redirecting to dashboard...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-indigo-500/20 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Mail className="h-10 w-10 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
          <p className="text-gray-300">
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>
        </div>

        {/* Email sent to */}
        <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
          <p className="text-sm text-gray-400">Email sent to:</p>
          <p className="text-white font-medium">user@example.com</p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={handleVerification}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
          >
            I've Verified My Email
          </button>

          <button
            onClick={handleResendEmail}
            disabled={isResending || countdown > 0}
            className="w-full bg-white/10 backdrop-blur-sm text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isResending ? (
              <>
                <RotateCcw className="h-4 w-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : countdown > 0 ? (
              <span>Resend in {countdown}s</span>
            ) : (
              <>
                <RotateCcw className="h-4 w-4" />
                <span>Resend Email</span>
              </>
            )}
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Help text */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-center text-gray-400 text-sm">
            Didn't receive the email? Check your spam folder or contact{' '}
            <a href="/support" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
              support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;