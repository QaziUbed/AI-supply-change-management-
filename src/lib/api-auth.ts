import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import type { UserRole } from '@/lib/rbac';

interface AuthResult {
  authenticated: true;
  userId: string;
  email: string;
  role: UserRole;
}

interface AuthError {
  authenticated: false;
  response: NextResponse;
}

/**
 * Server-side auth validation for API routes.
 * Checks the Supabase session and optionally validates role.
 * 
 * Usage:
 * ```ts
 * const auth = await validateApiAuth(requiredRoles);
 * if (!auth.authenticated) return auth.response;
 * // auth.userId, auth.email, auth.role are available
 * ```
 */
export async function validateApiAuth(
  requiredRoles?: UserRole[]
): Promise<AuthResult | AuthError> {
  try {
    const supabase = await createClient();
    
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return {
        authenticated: false,
        response: NextResponse.json(
          { error: 'Authentication required. Please sign in.' },
          { status: 401 }
        ),
      };
    }

    // Fetch user profile to get role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const userRole: UserRole = profile?.role || 'Planner';

    // Check role authorization if required
    if (requiredRoles && requiredRoles.length > 0) {
      if (userRole !== 'Admin' && !requiredRoles.includes(userRole)) {
        return {
          authenticated: false,
          response: NextResponse.json(
            { error: 'Insufficient permissions for this action.' },
            { status: 403 }
          ),
        };
      }
    }

    return {
      authenticated: true,
      userId: user.id,
      email: user.email || '',
      role: userRole,
    };
  } catch (err) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: 'Authentication service unavailable.' },
        { status: 500 }
      ),
    };
  }
}
