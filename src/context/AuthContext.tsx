
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthenticating: boolean;
  isRegistering: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
const [isAuthenticating, setIsAuthenticating] = useState(false);
const [isRegistering, setIsRegistering] = useState(false);
  
  useEffect(() => {
    const loadUser = async () => {
      if (!authService.isAuthenticated()) {
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await authService.getProfile();
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to load user profile:', error);
        // Clear invalid token
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsAuthenticating(true);
    try {
      const response = await authService.login(email, password);
      
      if (response.error) {
        return { success: false, error: response.error };
      }
      
      if (response.data?.user) {
        setUser(response.data.user);
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setIsAuthenticating(false);
    }
  };
  
  const register = async (username: string, email: string, password: string) => {
    setIsRegistering(true);
    try {
      const response = await authService.register(username, email, password);
      
      if (response.error) {
        return { success: false, error: response.error };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setIsRegistering(false);
    }
  };
  
  const logout = async () => {
    await authService.logout();
    setUser(null);
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAuthenticating,
        isRegistering,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
