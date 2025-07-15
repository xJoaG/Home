import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  username: string | null;
  group: string;
  banned_until: string | null;
  ban_reason: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isVerifying: boolean;
  showVerificationPopup: boolean;
  setShowVerificationPopup: React.Dispatch<React.SetStateAction<boolean>>;
  resendVerificationEmail: () => Promise<void>;
  updateUser: (newUserData: Partial<User>) => void;
  hasPrivilege: (requiredGroups: string | string[]) => boolean;
  isBanned: () => boolean;
  showBanPopup: boolean;
  setShowBanPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define the hierarchy of groups for frontend authorization
const GROUP_HIERARCHY: { [key: string]: number } = {
    'Basic Plan': 0,
    'Premium Plan': 1,
    'Junior Support': 2,
    'Support': 3,
    'Senior Support': 4,
    'Admin': 5,
    'Owner': 6,
};

// Mock user data
const MOCK_USER: User = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    email_verified_at: new Date().toISOString(),
    bio: 'Passionate C++ developer with 5 years of experience. Love solving complex problems and learning new technologies.',
    nationality: 'United States',
    profile_picture_url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    is_profile_public: true,
    username: 'johndoe_cpp',
    group: 'Premium Plan',
    banned_until: null,
    ban_reason: null,
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
    const [isVerifying, setIsVerifying] = useState(false);
    const [showVerificationPopup, setShowVerificationPopup] = useState(false);
    const [showBanPopup, setShowBanPopup] = useState(false);

    // Helper to check if a given user object is currently banned
    const isUserObjectBanned = (userObj: User | null): boolean => {
        if (!userObj || !userObj.banned_until) {
            return false;
        }
        const bannedUntilDate = new Date(userObj.banned_until);
        return bannedUntilDate > new Date();
    };

    const login = async (credentials: any) => {
        setIsLoading(true);
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock login - always successful
            setUser(MOCK_USER);
            localStorage.setItem('mock_user', JSON.stringify(MOCK_USER));
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: any) => {
        setIsLoading(true);
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock registration - always successful
            const newUser = {
                ...MOCK_USER,
                name: data.name,
                email: data.email,
                username: data.username,
                email_verified_at: null, // New users need to verify
            };
            
            setUser(newUser);
            localStorage.setItem('mock_user', JSON.stringify(newUser));
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setShowVerificationPopup(false);
        setShowBanPopup(false);
        localStorage.removeItem('mock_user');
    };

    const resendVerificationEmail = async () => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock - always successful
    };

    // Function to update user data in context
    const updateUser = (newUserData: Partial<User>) => {
        setUser(prevUser => {
            if (!prevUser) return null;
            const updatedUser = { ...prevUser, ...newUserData };
            localStorage.setItem('mock_user', JSON.stringify(updatedUser));
            
            // Re-evaluate ban status if user data is updated
            if (isUserObjectBanned(updatedUser)) {
                setShowBanPopup(true);
            } else {
                setShowBanPopup(false);
            }
            return updatedUser;
        });
    };

    // Helper to check if the current user is banned
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

    // Initialize user from localStorage on mount
    React.useEffect(() => {
        const savedUser = localStorage.getItem('mock_user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                
                // Check verification status
                if (!parsedUser.email_verified_at) {
                    setShowVerificationPopup(true);
                }
                
                // Check ban status
                if (isUserObjectBanned(parsedUser)) {
                    setShowBanPopup(true);
                }
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('mock_user');
            }
        }
        setIsVerifying(false);
    }, []);

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
        showBanPopup,
        setShowBanPopup,
        hasPrivilege,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};