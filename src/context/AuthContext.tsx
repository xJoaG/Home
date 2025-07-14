import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// --- API Client Setup ---
// Create an axios instance to easily manage API calls
const apiClient = axios.create({
    baseURL: 'https://api.cpp-hub.com/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

// Use an interceptor to automatically add the auth token to every request
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


// --- Type Definitions ---
interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  bio: string | null;
  nationality: string | null;
  profile_picture_url: string | null;
  is_profile_public: boolean;
  // Add new profile fields
  username: string | null; // Username is now part of the user object
  group: string; // User's group/role
  banned_until: string | null; // ISO 8601 string or null
  ban_reason: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isVerifying: boolean; // For checking auth on initial page load
  showVerificationPopup: boolean;
  setShowVerificationPopup: React.Dispatch<React.SetStateAction<boolean>>;
  resendVerificationEmail: () => Promise<void>;
  updateUser: (newUserData: Partial<User>) => void;
  // New helper functions for roles and banning
  hasPrivilege: (requiredGroups: string | string[]) => boolean;
  isBanned: () => boolean;
  showBanPopup: boolean; // New: State to control ban modal visibility
  setShowBanPopup: React.Dispatch<React.SetStateAction<boolean>>; // New: Setter for ban modal
}

// Define the hierarchy of groups for frontend authorization
// This should match the backend's User::GROUP_HIERARCHY for consistency
const GROUP_HIERARCHY: { [key: string]: number } = {
    'Basic Plan': 0,
    'Premium Plan': 1,
    'Junior Support': 2,
    'Support': 3,
    'Senior Support': 4,
    'Admin': 5,
    'Owner': 6,
};

// --- Context Definition ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// --- AuthProvider Component ---
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);
    const [showVerificationPopup, setShowVerificationPopup] = useState(false);
    const [showBanPopup, setShowBanPopup] = useState(false); // New state for ban modal

    // Helper to check if a given user object is currently banned
    const isUserObjectBanned = (userObj: User | null): boolean => {
        if (!userObj || !userObj.banned_until) {
            return false;
        }
        const bannedUntilDate = new Date(userObj.banned_until);
        return bannedUntilDate > new Date(); // Check if banned_until is in the future
    };

    // On initial app load, check if a token exists and try to fetch the user
    useEffect(() => {
        const verifyAuth = async () => {
            const token = localStorage.getItem('auth_token');
            if (token) {
                try {
                    // Fetch user data including new profile fields
                    const { data } = await apiClient.get('/user');
                    setUser(data);
                    // If the user is fetched but not verified, show the popup
                    if (!data.email_verified_at) {
                        setShowVerificationPopup(true);
                    }
                    // If user is banned, show ban popup
                    if (isUserObjectBanned(data)) {
                        setShowBanPopup(true);
                    }
                } catch (error) {
                    console.error('Auth verification failed', error);
                    localStorage.removeItem('auth_token');
                    setUser(null); // Ensure user is null if verification fails
                    setShowBanPopup(false); // Hide ban popup if auth fails
                }
            }
            setIsVerifying(false);
        };
        verifyAuth();
    }, []);

    // Effect to react to user object changes (e.g., if banned by admin while logged in)
    useEffect(() => {
        if (!isVerifying && user) { // Only run after initial verification and if user is logged in
            if (isUserObjectBanned(user)) {
                setShowBanPopup(true);
            } else {
                setShowBanPopup(false); // Hide if unbanned
            }
        }
    }, [user, isVerifying]); // Dependency on user object and isVerifying status

    const login = async (credentials: any) => {
        setIsLoading(true);
        try {
            const { data } = await apiClient.post('/login', credentials);
            const { access_token, user: userData } = data;
            
            localStorage.setItem('auth_token', access_token);
            setUser(userData);

            // After login, if the user is not verified, show the popup
            if (!userData.email_verified_at) {
                setShowVerificationPopup(true);
            }
            // After login, if the user is banned, show the ban popup
            if (isUserObjectBanned(userData)) {
                setShowBanPopup(true);
            } else {
                setShowBanPopup(false); // Ensure it's hidden if not banned
            }
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: any) => {
        setIsLoading(true);
        try {
            // After registration, Laravel sends the verification email.
            // We don't log the user in; they must verify first.
            await apiClient.post('/register', data);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
        setShowVerificationPopup(false);
        setShowBanPopup(false); // Hide ban popup on logout
        // You could also call a backend /logout endpoint here if you have one
    };

    const resendVerificationEmail = async () => {
        if (!user) return;
        // You can set a specific loading state for this button if you want
        await apiClient.post('/email/verification-notification');
    };

    // Function to update user data in context, useful after profile edits
    const updateUser = (newUserData: Partial<User>) => {
        setUser(prevUser => {
            if (!prevUser) return null;
            const updatedUser = { ...prevUser, ...newUserData };
            // Re-evaluate ban status if user data is updated
            if (isUserObjectBanned(updatedUser)) {
                setShowBanPopup(true);
            } else {
                setShowBanPopup(false);
            }
            return updatedUser;
        });
    };

    // Helper to check if the current user is banned (publicly exposed)
    const isBanned = (): boolean => {
        return isUserObjectBanned(user);
    };

    // Helper to check if the current user has a specific privilege level
    const hasPrivilege = (requiredGroups: string | string[]): boolean => {
        if (!user) return false;

        const userPrivilege = GROUP_HIERARCHY[user.group] ?? -1;

        if (Array.isArray(requiredGroups)) {
            for (const group of requiredGroups) {
                const requiredPrivilege = GROUP_HIERARCHY[group] ?? -1;
                if (userPrivilege >= requiredPrivilege) {
                    return true;
                }
            }
            return false;
        }

        const requiredPrivilege = GROUP_HIERARCHY[requiredGroups] ?? -1;
        return userPrivilege >= requiredPrivilege;
    };


    const value = {
        user,
        login,
        register,
        logout,
        isLoading,
        isVerifying,
        showVerificationPopup,
        setShowVerificationPopup,
        resendVerificationEmail,
        updateUser,
        isBanned,
        showBanPopup, // Expose new state
        setShowBanPopup, // Expose new setter
        hasPrivilege,
    };

    return (
        <AuthContext.Provider value={value}>
            {!isVerifying && children}
        </AuthContext.Provider>
    );
};
