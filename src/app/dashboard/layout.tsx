'use client';

import { Shell } from '@/components/layout/Shell';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { AIChatWidget } from '@/components/ai/AIChatWidget';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <Shell>
        <RoleGuard requiredRoles={['Admin', 'Planner', 'Manager']}>
          {children}
        </RoleGuard>
        <AIChatWidget />
      </Shell>
    </AuthGuard>
  );
}
