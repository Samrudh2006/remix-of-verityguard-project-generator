import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { canAccessDashboard } from '../utils/roles';

/**
 * ProtectedRoute component for role-based access control
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string} props.requiredRole - Minimum required role to access the route
 * @param {string[]} props.allowedRoles - Array of allowed roles (alternative to requiredRole)
 * @param {string} props.redirectTo - Path to redirect if unauthorized (default: '/login')
 */
export function ProtectedRoute({ 
  children, 
  requiredRole = null, 
  allowedRoles = null,
  redirectTo = '/login' 
}) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Not authenticated - redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }
  
  const userRole = user.role;
  
  // Check if user has required role (using hierarchy)
  if (requiredRole && !canAccessDashboard(userRole, requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Check if user's role is in allowed roles list
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // User is authorized - render children
  return <>{children}</>;
}

export default ProtectedRoute;
