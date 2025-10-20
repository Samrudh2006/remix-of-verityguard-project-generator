// Role definitions and permissions for VerityGuard

export const ROLES = {
  USER: 'user',
  CONTRIBUTOR: 'contributor',
  MODERATOR: 'moderator',
  SUPER_ADMIN: 'super-admin',
};

export const PERMISSIONS = {
  // User permissions
  READ_ARTICLES: 'read_articles',
  SET_LOCATION: 'set_location',
  VIEW_TRUST_SCORES: 'view_trust_scores',
  
  // Contributor permissions
  CREATE_CONTENT: 'create_content',
  EDIT_OWN_CONTENT: 'edit_own_content',
  DELETE_OWN_CONTENT: 'delete_own_content',
  VIEW_OWN_ANALYTICS: 'view_own_analytics',
  UPLOAD_MEDIA: 'upload_media',
  MANAGE_DRAFTS: 'manage_drafts',
  SUBMIT_FOR_REVIEW: 'submit_for_review',
  
  // Moderator permissions
  REVIEW_CONTENT: 'review_content',
  APPROVE_CONTENT: 'approve_content',
  REJECT_CONTENT: 'reject_content',
  FLAG_CONTENT: 'flag_content',
  VIEW_REPORTS: 'view_reports',
  MODERATE_USERS: 'moderate_users',
  VIEW_MODERATION_LOGS: 'view_moderation_logs',
  ESCALATE_CONTENT: 'escalate_content',
  
  // Super Admin permissions
  MANAGE_USERS: 'manage_users',
  MANAGE_ROLES: 'manage_roles',
  VIEW_AUDIT_LOGS: 'view_audit_logs',
  MANAGE_SETTINGS: 'manage_settings',
  VIEW_SYSTEM_HEALTH: 'view_system_health',
  MANAGE_CONTENT: 'manage_content',
  OVERRIDE_MODERATION: 'override_moderation',
  MANAGE_PLATFORM: 'manage_platform',
  VIEW_ALL_ANALYTICS: 'view_all_analytics',
  IMPERSONATE_USER: 'impersonate_user',
};

// Role-based permission mappings
export const ROLE_PERMISSIONS = {
  [ROLES.USER]: [
    PERMISSIONS.READ_ARTICLES,
    PERMISSIONS.SET_LOCATION,
    PERMISSIONS.VIEW_TRUST_SCORES,
  ],
  
  [ROLES.CONTRIBUTOR]: [
    PERMISSIONS.READ_ARTICLES,
    PERMISSIONS.SET_LOCATION,
    PERMISSIONS.VIEW_TRUST_SCORES,
    PERMISSIONS.CREATE_CONTENT,
    PERMISSIONS.EDIT_OWN_CONTENT,
    PERMISSIONS.DELETE_OWN_CONTENT,
    PERMISSIONS.VIEW_OWN_ANALYTICS,
    PERMISSIONS.UPLOAD_MEDIA,
    PERMISSIONS.MANAGE_DRAFTS,
    PERMISSIONS.SUBMIT_FOR_REVIEW,
  ],
  
  [ROLES.MODERATOR]: [
    PERMISSIONS.READ_ARTICLES,
    PERMISSIONS.SET_LOCATION,
    PERMISSIONS.VIEW_TRUST_SCORES,
    PERMISSIONS.REVIEW_CONTENT,
    PERMISSIONS.APPROVE_CONTENT,
    PERMISSIONS.REJECT_CONTENT,
    PERMISSIONS.FLAG_CONTENT,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.MODERATE_USERS,
    PERMISSIONS.VIEW_MODERATION_LOGS,
    PERMISSIONS.ESCALATE_CONTENT,
  ],
  
  [ROLES.SUPER_ADMIN]: [
    // Super admin has all permissions
    ...Object.values(PERMISSIONS),
  ],
};

/**
 * Check if a role has a specific permission
 * @param {string} role - User role
 * @param {string} permission - Permission to check
 * @returns {boolean}
 */
export const hasPermission = (role, permission) => {
  if (!role || !permission) return false;
  const rolePerms = ROLE_PERMISSIONS[role] || [];
  return rolePerms.includes(permission);
};

/**
 * Check if a role has any of the specified permissions
 * @param {string} role - User role
 * @param {string[]} permissions - Array of permissions
 * @returns {boolean}
 */
export const hasAnyPermission = (role, permissions) => {
  if (!role || !permissions || permissions.length === 0) return false;
  return permissions.some((permission) => hasPermission(role, permission));
};

/**
 * Check if a role has all of the specified permissions
 * @param {string} role - User role
 * @param {string[]} permissions - Array of permissions
 * @returns {boolean}
 */
export const hasAllPermissions = (role, permissions) => {
  if (!role || !permissions || permissions.length === 0) return false;
  return permissions.every((permission) => hasPermission(role, permission));
};

/**
 * Get all permissions for a role
 * @param {string} role - User role
 * @returns {string[]}
 */
export const getRolePermissions = (role) => {
  return ROLE_PERMISSIONS[role] || [];
};

/**
 * Get the dashboard path for a role
 * @param {string} role - User role
 * @returns {string}
 */
export const getDashboardPath = (role) => {
  const dashboardPaths = {
    [ROLES.SUPER_ADMIN]: '/admin/dashboard',
    [ROLES.MODERATOR]: '/moderator/dashboard',
    [ROLES.CONTRIBUTOR]: '/contributor/dashboard',
    [ROLES.USER]: '/',
  };
  
  return dashboardPaths[role] || '/';
};

/**
 * Check if a role can access a specific dashboard
 * @param {string} userRole - User's role
 * @param {string} requiredRole - Required role for the dashboard
 * @returns {boolean}
 */
export const canAccessDashboard = (userRole, requiredRole) => {
  const roleHierarchy = {
    [ROLES.SUPER_ADMIN]: 4,
    [ROLES.MODERATOR]: 3,
    [ROLES.CONTRIBUTOR]: 2,
    [ROLES.USER]: 1,
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

/**
 * Get display name for a role
 * @param {string} role - Role key
 * @returns {string}
 */
export const getRoleDisplayName = (role) => {
  const displayNames = {
    [ROLES.USER]: 'User',
    [ROLES.CONTRIBUTOR]: 'Contributor',
    [ROLES.MODERATOR]: 'Moderator',
    [ROLES.SUPER_ADMIN]: 'Super Admin',
  };
  
  return displayNames[role] || 'Unknown';
};

/**
 * Get role badge color
 * @param {string} role - Role key
 * @returns {object}
 */
export const getRoleBadgeColor = (role) => {
  const colors = {
    [ROLES.USER]: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
    [ROLES.CONTRIBUTOR]: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
    [ROLES.MODERATOR]: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
    [ROLES.SUPER_ADMIN]: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' },
  };
  
  return colors[role] || { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' };
};

const rolesExport = {
  ROLES,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  getRolePermissions,
  getDashboardPath,
  canAccessDashboard,
  getRoleDisplayName,
  getRoleBadgeColor,
};

export default rolesExport;
