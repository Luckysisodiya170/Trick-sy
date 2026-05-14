// Tricksy/frontend/src/admin/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('tricksyAdminToken');
  const role = localStorage.getItem('tricksyAdminRole');

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/admin" replace />; 
  }

  return <Outlet />;
};

export default ProtectedRoute;