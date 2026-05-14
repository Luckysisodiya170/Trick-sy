// Tricksy/frontend/src/api/api.js

export const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api'; 

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('tricksyAdminToken');
  
  const headers = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...options.headers,
    ...(token && { 'Authorization': `Bearer ${token}` }) 
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

    if (response.status === 401) {
      localStorage.removeItem('tricksyAdminToken');
      localStorage.removeItem('tricksyAdminRole');
      window.location.href = '/admin-login';
      return null;
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Server Error');
    }

    return result;

  } catch (error) {
    console.error("🌐 API Error:", error.message);
    throw error;
  }
};