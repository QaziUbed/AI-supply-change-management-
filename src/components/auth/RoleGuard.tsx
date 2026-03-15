'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { hasAccess, type UserRole } from '@/lib/rbac';
import { usePathname, useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoleGuardProps {
  children: React.ReactNode;
  /** Optionally override the path check (defaults to current pathname) */
  requiredRoles?: UserRole[];
}

/**
 * Client-side role enforcement guard.
 * Works alongside server-side middleware for defense-in-depth.
 * Shows an access denied page if the user doesn't have the right role.
 */
export function RoleGuard({ children, requiredRoles }: RoleGuardProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();
  const router = useRouter();

  const userRole = user?.role;

  // If requiredRoles is provided, check directly
  if (requiredRoles) {
    const allowed = userRole && (userRole === 'Admin' || requiredRoles.includes(userRole));
    if (!allowed) {
      return <AccessDenied role={userRole} onGoBack={() => router.push('/dashboard')} />;
    }
    return <>{children}</>;
  }

  // Otherwise, check by pathname using RBAC config
  if (!hasAccess(userRole, pathname)) {
    return <AccessDenied role={userRole} onGoBack={() => router.push('/dashboard')} />;
  }

  return <>{children}</>;
}

function AccessDenied({
  role,
  onGoBack,
}: {
  role?: string | null;
  onGoBack: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-red-50 dark:bg-red-950/30 mb-2">
          <ShieldAlert className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Access Restricted
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
          Your current role{' '}
          <span className="font-bold text-slate-700 dark:text-slate-300">
            ({role || 'Unknown'})
          </span>{' '}
          doesn&apos;t have permission to access this section. Contact your
          administrator for access.
        </p>
        <Button
          onClick={onGoBack}
          className="bg-teal-600 hover:bg-teal-700 rounded-xl px-8"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
