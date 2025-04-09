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
  register: async (username: string, email: string, password: string) => {
    return await apiRequest<AuthResponse>('/auth/register', 'POST', {
      username,
      email,
      password
    });
  },

  login: async (email: string, password: string) => {
    return await apiRequest<AuthResponse>('/auth/login', 'POST', {
      email,
      password
    });
  },

  appleCallback: async (code: string) => {
    return await apiRequest<AuthResponse>('/auth/apple/callback', 'POST', { code });
  },

  getProfile: async () => {
    return await apiRequest<User>('/auth/profile');
  },

  logout: async () => {
    const response = await apiRequest('/auth/logout', 'POST');
    localStorage.removeItem('authToken');
    return response;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};