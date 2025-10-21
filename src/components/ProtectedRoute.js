import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { canAccessDashboard } from '../utils/roles';

/**
 * ProtectedRoute Component - Role-Based Access Control Wrapper
 * 
 * This component protects routes by checking if the user is authenticated
 * and has the required role to access the route. It implements a hierarchical
 * role system where higher-level roles can access lower-level routes.
 * 
 * Role Hierarchy (from highest to lowest):
 * 1. super-admin - Full access to all routes
 * 2. moderator - Can access moderator, contributor, and user routes
 * 3. contributor - Can access contributor and user routes
 * 4. user - Can only access user routes
 * 
 * Usage Examples:
 * 
 * 1. Protect a route with a required role (hierarchical):
 *    <ProtectedRoute requiredRole={ROLES.CONTRIBUTOR}>
 *      <ContributorDashboard />
 *    </ProtectedRoute>
 * 
 * 2. Protect a route with specific allowed roles (exact match):
 *    <ProtectedRoute allowedRoles={[ROLES.MODERATOR, ROLES.SUPER_ADMIN]}>
 *      <ModerationPanel />
 *    </ProtectedRoute>
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - Child components to render if authorized
 * @param {string} props.requiredRole - Minimum required role (uses role hierarchy)
 * @param {string[]} props.allowedRoles - Array of specific allowed roles (exact match)
 * @param {string} props.redirectTo - Path to redirect if not authenticated (default: '/login')
 */
export function ProtectedRoute({ 
  children, 
  requiredRole = null, 
  allowedRoles = null,
  redirectTo = '/login' 
}) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Step 1: Check if user is authenticated
  // If not authenticated, redirect to login page with return location
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }
  
  const userRole = user.role;
  
  // Step 2: Check role-based access control
  // If requiredRole is specified, check using role hierarchy
  // Higher roles can access lower role routes (e.g., admin can access all)
  if (requiredRole && !canAccessDashboard(userRole, requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Step 3: Check specific allowed roles (exact match)
  // If allowedRoles is specified, user's role must be in the list
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Step 4: User is authenticated and authorized - render the protected content
  return <>{children}</>;
}

export default ProtectedRoute;
