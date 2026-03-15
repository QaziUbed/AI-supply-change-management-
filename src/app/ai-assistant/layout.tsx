'use client';

import { Shell } from '@/components/layout/Shell';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { RoleGuard } from '@/components/auth/RoleGuard';

export default function AiAssistantLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <Shell>
        <RoleGuard requiredRoles={['Admin', 'Planner', 'Manager']}>
          {children}
        </RoleGuard>
      </Shell>
    </AuthGuard>
  );
}
