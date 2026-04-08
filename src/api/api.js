export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'; 

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('tricksyAdminToken');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token && { 'Authorization': `Bearer ${token}` }) 
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  
  if (response.status === 401) {
    localStorage.removeItem('tricksyAdminToken');
    window.location.href = '/admin-login';
  }
  return response;
};