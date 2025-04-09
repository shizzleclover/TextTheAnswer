
const API_BASE_URL = 'http://0.0.0.0:5000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export async function apiRequest<T>(
  endpoint: string, 
  method: 'GET' | 'POST' = 'GET',
  body?: any
): Promise<ApiResponse<T>> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { error: data.message || 'Something went wrong' };
    }
    
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    return { data };
  } catch (error) {
    console.error('API request failed:', error);
    return { error: 'Network error. Please try again later.' };
  }
}
