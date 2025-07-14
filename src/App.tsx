import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import SupportPage from './pages/SupportPage';
import VerifyEmailModal from './components/VerifyEmailModal';
import VerificationResultPage from './pages/VerificationResultPage';
import EditProfilePage from './pages/EditProfilePage';
import PublicProfilePage from './pages/PublicProfilePage';
import AdminPanelPage from './pages/AdminPanelPage';
import BanModal from './components/BanModal'; // Import BanModal

// A new component to handle rendering the popup globally
const AppContent: React.FC = () => {
    const { showVerificationPopup, showBanPopup, isBanned } = useAuth(); // Get showBanPopup and isBanned

    // Determine if the main app content should be interactive
    const isAppContentDisabled = showVerificationPopup || showBanPopup;

    return (
        <>
            {/* Ban Modal always on top if user is banned */}
            {showBanPopup && isBanned() && <BanModal />} 

            {/* Verification Modal (can be shown even if banned, but ban modal takes precedence) */}
            {showVerificationPopup && !showBanPopup && <VerifyEmailModal />}
            
            {/* Main application content */}
            <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${isAppContentDisabled ? 'pointer-events-none opacity-50' : ''}`}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route path="/features" element={<FeaturesPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="/verification-result" element={<VerificationResultPage />} />
                    {/* Profile Routes */}
                    <Route path="/profile/edit" element={<EditProfilePage />} />
                    <Route path="/profile/:id" element={<PublicProfilePage />} />
                    {/* Admin Panel Route */}
                    <Route path="/admin" element={<AdminPanelPage />} />
                </Routes>
            </div>
        </>
    );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
