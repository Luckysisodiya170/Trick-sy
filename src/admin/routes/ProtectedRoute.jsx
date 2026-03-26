import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Read the token from browser memory
  const hasToken = localStorage.getItem('tricksyAdminToken');

  // If token is missing, send user back to login page
  if (!hasToken) {
    return <Navigate to="/admin-login" replace />;
  }

  // If token exists, show the requested admin page
  return <Outlet />;
};

export default ProtectedRoute;