import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle global errors (e.g., 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response.data, // Strip axios wrapper and return just the data
  (error) => {
    if (error.response) {
      // If 401, token is invalid or expired
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        // Simple redirect to login
        window.location.href = '/';
      }
      
      // Optionally handle other status codes globally
      // if (error.response.status >= 500) { alert("Server error"); }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
