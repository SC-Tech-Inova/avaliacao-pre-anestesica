const API_BASE_URL = 'http://localhost:5000';

export const api = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    try {
      const url = `${API_BASE_URL}/api${endpoint}`;
      
      const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to connect to server');
    }
  },

  login(username: string, password: string) {
    return this.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },
};
