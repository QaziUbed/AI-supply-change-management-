'use client';

import { Shell } from '@/components/layout/Shell';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function AiAssistantLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <Shell>
        {children}
      </Shell>
    </AuthGuard>
  );
}
