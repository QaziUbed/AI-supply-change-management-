// Centralized Role-Based Access Control (RBAC) configuration
// This is the single source of truth for all permission checks

export type UserRole = 'Admin' | 'Planner' | 'Manager';

export interface RoutePermission {
  path: string;
  allowedRoles: UserRole[];
  label: string;
}

/**
 * Route → Role mapping.
 * If a route is not listed here, it is considered public.
 * Admin has access to everything.
 */
export const ROUTE_PERMISSIONS: RoutePermission[] = [
  { path: '/dashboard',    allowedRoles: ['Admin', 'Planner', 'Manager'], label: 'Dashboard' },
  { path: '/forecasting',  allowedRoles: ['Admin', 'Planner'],           label: 'Demand Forecasting' },
  { path: '/inventory',    allowedRoles: ['Admin', 'Planner'],           label: 'Inventory Management' },
  { path: '/procurement',  allowedRoles: ['Admin'],                       label: 'Procurement Planning' },
  { path: '/logistics',    allowedRoles: ['Admin', 'Manager'],           label: 'Logistics Optimization' },
  { path: '/ai-assistant', allowedRoles: ['Admin', 'Planner', 'Manager'], label: 'AI Assistant' },
  { path: '/reports',      allowedRoles: ['Admin', 'Manager'],           label: 'Reports' },
  { path: '/settings',     allowedRoles: ['Admin'],                       label: 'Settings' },
];

/** Public routes that don't require authentication */
export const PUBLIC_ROUTES = ['/', '/login'];

/** API routes that don't require authentication */
export const PUBLIC_API_ROUTES = ['/api/landing-stats'];

/** Static/system paths that should never be intercepted */
export const SYSTEM_PATHS = ['/_next', '/favicon.ico', '/api/auth'];

/**
 * Check if a user role has access to a given path.
 * Returns true if:
 * - The path is public
 * - The user is Admin (full access)
 * - The user's role is in the allowedRoles for that path
 */
export function hasAccess(role: UserRole | undefined | null, path: string): boolean {
  if (!role) return false;
  
  // Admin override — full access to everything
  if (role === 'Admin') return true;

  // Find the matching route permission
  const permission = ROUTE_PERMISSIONS.find(r => path.startsWith(r.path));
  
  // If no permission rule exists, default deny for protected routes
  if (!permission) return false;
  
  return permission.allowedRoles.includes(role);
}

/**
 * Get all accessible routes for a given role
 */
export function getAccessibleRoutes(role: UserRole): RoutePermission[] {
  if (role === 'Admin') return ROUTE_PERMISSIONS;
  return ROUTE_PERMISSIONS.filter(r => r.allowedRoles.includes(role));
}

/**
 * Get all inaccessible routes for a given role (for showing locked items)
 */
export function getLockedRoutes(role: UserRole): RoutePermission[] {
  if (role === 'Admin') return [];
  return ROUTE_PERMISSIONS.filter(r => !r.allowedRoles.includes(role));
}
