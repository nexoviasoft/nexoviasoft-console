/**
 * Role-based access control utility
 * Defines which routes each role can access
 */

const rolePermissions = {
  admin: {
    // Admin has access to all routes
    access: 'all',
  },
  manager: {
    // Manager has access to most routes except sensitive admin settings
    allowedRoutes: [
      '/',
      '/admin/attendance',
      '/admin/schedule',
      '/admin/projects',
      '/admin/orders',
      '/admin/employees',
      '/admin/leave',
      '/admin/documents',
      '/admin/email-alerts',
      '/admin/recruitment',
      '/admin/payroll',
      '/admin/reports',
      '/admin/broadcast',
      '/admin/our-client',
      '/admin/service-request',
      '/admin/settings',
      '/admin/platform-settings',
      '/admin/our-team',
    ],
  },
  employee: {
    // Basic employee access
    allowedRoutes: [
      '/',
      '/admin/attendance',
      '/admin/schedule',
      '/admin/projects',
      '/admin/documents',
      '/admin/leave',
    ],
  },
  marketing: {
    // Marketing team access
    allowedRoutes: [
      '/',
      '/admin/projects',
      '/admin/broadcast',
      '/admin/our-client',
      '/admin/service-request',
      '/admin/platform-settings',
      '/admin/settings',
      '/admin/reports',
    ],
  },
  designer: {
    // Designer access
    allowedRoutes: [
      '/',
      '/admin/projects',
      '/admin/documents',
      '/admin/platform-settings',
      '/admin/settings',
    ],
  },
  product: {
    // Product team access
    allowedRoutes: [
      '/',
      '/admin/projects',
      '/admin/orders',
      '/admin/platform-settings',
      '/admin/settings',
      '/admin/reports',
    ],
  },
  viewer: {
    // Read-only access
    allowedRoutes: [
      '/',
      '/admin/reports',
      '/admin/documents',
      '/admin/projects',
    ],
  },
  client: {
    // Client access - very limited
    allowedRoutes: [
      '/',
      '/admin/projects',
      '/admin/orders',
    ],
  },
};

/**
 * Check if a user with a given role can access a route
 * @param {string} role - User role
 * @param {string} route - Route path
 * @returns {boolean} - Whether the user can access the route
 */
export function canAccessRoute(role, route) {
  if (!role) return false;

  const normalizedRole = role.toLowerCase();
  const permissions = rolePermissions[normalizedRole];

  if (!permissions) return false;

  // Admin has access to everything
  if (permissions.access === 'all') {
    return true;
  }

  // Check if route is in allowed routes
  if (permissions.allowedRoutes) {
    // Check exact match or if route starts with any allowed route
    return permissions.allowedRoutes.some((allowedRoute) => {
      if (route === allowedRoute) return true;
      if (route.startsWith(allowedRoute + '/')) return true;
      return false;
    });
  }

  return false;
}

/**
 * Filter navigation items based on user role
 * @param {Array} navItems - Navigation items array
 * @param {string} role - User role
 * @returns {Array} - Filtered navigation items
 */
export function filterNavItemsByRole(navItems, role) {
  if (!role) return [];

  return navItems
    .map((item) => {
      // Check if main item is accessible
      const canAccessMain = canAccessRoute(role, item.href || '#');

      // Filter children if they exist
      let filteredChildren = null;
      if (item.children && item.children.length > 0) {
        filteredChildren = filterNavItemsByRole(item.children, role);
        // If no children are accessible, don't show parent either (unless parent itself is accessible)
        if (filteredChildren.length === 0 && !canAccessMain) {
          return null;
        }
      }

      // Return item if accessible or has accessible children
      if (canAccessMain || (filteredChildren && filteredChildren.length > 0)) {
        return {
          ...item,
          children: filteredChildren,
        };
      }

      return null;
    })
    .filter((item) => item !== null);
}

/**
 * Get all accessible routes for a role
 * @param {string} role - User role
 * @returns {Array} - Array of accessible routes
 */
export function getAccessibleRoutes(role) {
  if (!role) return [];

  const normalizedRole = role.toLowerCase();
  const permissions = rolePermissions[normalizedRole];

  if (!permissions) return [];

  if (permissions.access === 'all') {
    return ['*']; // All routes
  }

  return permissions.allowedRoutes || [];
}
