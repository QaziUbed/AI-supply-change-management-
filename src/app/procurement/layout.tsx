'use client';

import { Shell } from '@/components/layout/Shell';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { AIChatWidget } from '@/components/ai/AIChatWidget';

export default function ProcurementLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <Shell>
        <RoleGuard requiredRoles={['Admin']}>
          {children}
        </RoleGuard>
        <AIChatWidget />
      </Shell>
    </AuthGuard>
  );
}
