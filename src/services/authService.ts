
const MOCK_USER = {
  id: 'mock-123',
  username: 'Demo User',
  email: 'demo@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'
};

export const authService = {
  register: async (username: string, email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { user: MOCK_USER, token: 'mock-token' } };
  },

  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { user: MOCK_USER, token: 'mock-token' } };
  },

  appleCallback: async (code: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { user: MOCK_USER, token: 'mock-token' } };
  },

  getProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: MOCK_USER };
  },

  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem('authToken');
    return { data: null };
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};
