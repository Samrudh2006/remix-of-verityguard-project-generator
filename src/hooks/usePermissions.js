import { useAuth } from '../contexts/AuthContext';
import { hasPermission, hasAnyPermission, hasAllPermissions, getDashboardPath } from '../utils/roles';

/**
 * Custom hook for permission checking and role management
 */
export function usePermissions() {
  const { user, isAuthenticated } = useAuth();
  
  const userRole = user?.role || null;
  
  /**
   * Check if user has a specific permission
   */
  const checkPermission = (permission) => {
    if (!isAuthenticated || !userRole) return false;
    return hasPermission(userRole, permission);
  };
  
  /**
   * Check if user has any of the specified permissions
   */
  const checkAnyPermission = (permissions) => {
    if (!isAuthenticated || !userRole) return false;
    return hasAnyPermission(userRole, permissions);
  };
  
  /**
   * Check if user has all of the specified permissions
   */
  const checkAllPermissions = (permissions) => {
    if (!isAuthenticated || !userRole) return false;
    return hasAllPermissions(userRole, permissions);
  };
  
  /**
   * Check if user has a specific role
   */
  const checkRole = (role) => {
    if (!isAuthenticated || !userRole) return false;
    return userRole === role;
  };
  
  /**
   * Check if user has any of the specified roles
   */
  const checkAnyRole = (roles) => {
    if (!isAuthenticated || !userRole) return false;
    return roles.includes(userRole);
  };
  
  /**
   * Get the dashboard path for current user
   */
  const getUserDashboardPath = () => {
    if (!userRole) return '/';
    return getDashboardPath(userRole);
  };
  
  return {
    userRole,
    isAuthenticated,
    checkPermission,
    checkAnyPermission,
    checkAllPermissions,
    checkRole,
    checkAnyRole,
    getUserDashboardPath,
  };
}

export default usePermissions;
