import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const hasToken = localStorage.getItem('tricksyAdminToken');

  if (!hasToken) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;