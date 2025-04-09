
import { apiRequest } from './api';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  // Register a new user
  register: async (username: string, email: string, password: string) => {
    const response = await apiRequest<AuthResponse>('/auth/register', 'POST', {
      username,
      email,
      password
    });
    
    if (response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response;
  },
  
  // Login user
  login: async (email: string, password: string) => {
    const response = await apiRequest<AuthResponse>('/auth/login', 'POST', {
      email,
      password
    });
    
    if (response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response;
  },
  
  // Apple OAuth callback
  appleCallback: async (code: string) => {
    const response = await apiRequest<AuthResponse>('/auth/apple/callback', 'POST', { code });
    
    if (response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response;
  },
  
  // Get user profile
  getProfile: async () => {
    return await apiRequest<User>('/auth/profile');
  },
  
  // Logout
  logout: async () => {
    const response = await apiRequest('/auth/logout', 'POST');
    localStorage.removeItem('authToken');
    return response;
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};
