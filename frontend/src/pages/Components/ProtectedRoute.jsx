import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = () => localStorage.getItem('token') !== null;
  const userRole = localStorage.getItem('role');
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Optionally render an "Unauthorized" component or redirect to a different page
    return <div>Unauthorized Access. You do not have permission to view this page.</div>;
    // Or: return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;