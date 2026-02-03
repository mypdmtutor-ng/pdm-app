import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'pdm-tutor-auth';

// Mock users for demo
const mockUsers: Record<string, { password: string; user: User }> = {
  'student@demo.com': {
    password: 'demo123',
    user: {
      id: 'user-1',
      email: 'student@demo.com',
      name: 'Alex Johnson',
      role: 'student',
      avatar: '',
      coins: 750,
      level: 'practitioner',
      joinedAt: '2024-01-15',
    },
  },
  'admin@demo.com': {
    password: 'admin123',
    user: {
      id: 'admin-1',
      email: 'admin@demo.com',
      name: 'Sarah Admin',
      role: 'admin',
      avatar: '',
      coins: 9999,
      level: 'expert',
      joinedAt: '2023-06-01',
    },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUser = mockUsers[email.toLowerCase()];
    if (mockUser && mockUser.password === password) {
      setUser(mockUser.user);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser.user));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Check if user exists
    if (mockUsers[email.toLowerCase()]) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: email.toLowerCase(),
      name,
      role: 'student',
      avatar: '',
      coins: 100, // Welcome bonus
      level: 'novice',
      joinedAt: new Date().toISOString().split('T')[0],
    };

    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper hook for role checking
export function useRole(): UserRole | null {
  const { user } = useAuth();
  return user?.role ?? null;
}
