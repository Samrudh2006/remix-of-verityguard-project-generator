import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getDashboardPath } from '../utils/roles';

/**
 * RedirectByRole Component
 * 
 * This component automatically redirects authenticated users to their
 * role-specific dashboard. It's useful for post-login redirection or
 * protecting routes that should redirect based on user role.
 * 
 * Usage:
 *   <RedirectByRole />
 * 
 * The component will:
 * - Check if user is authenticated
 * - Get the appropriate dashboard path based on user role
 * - Redirect to that dashboard
 * - If not authenticated, redirect to login page
 */
export default function RedirectByRole() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      // Not authenticated - redirect to login
      navigate('/login', { replace: true });
    } else {
      // Authenticated - redirect to role-specific dashboard
      const dashboardPath = getDashboardPath(user.role);
      navigate(dashboardPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
        <p className="text-white text-lg">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
