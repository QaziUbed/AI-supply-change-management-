import { NextResponse } from 'next/server';
import type { UserRole } from '@/lib/rbac';
import { getSessionUserFromCookies } from '@/lib/simple-auth';

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

export async function validateApiAuth(requiredRoles?: UserRole[]): Promise<AuthResult | AuthError> {
  const user = await getSessionUserFromCookies();

  if (!user) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { error: 'Authentication required. Please sign in.' },
        { status: 401 }
      ),
    };
  }

  const userRole = user.role;

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
    email: user.email,
    role: userRole,
  };
}
