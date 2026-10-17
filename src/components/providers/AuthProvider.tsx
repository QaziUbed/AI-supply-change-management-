'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuth, clearAuth } from '@/lib/features/authSlice';

const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;

    async function hydrateSession() {
      try {
        const response = await fetch('/api/auth/session', { cache: 'no-store' });
        if (!mounted) return;

        if (!response.ok) {
          dispatch(clearAuth());
          return;
        }

        const data = await response.json();
        if (data?.authenticated && data?.user) {
          dispatch(
            setAuth({
              session: { authenticated: true },
              user: data.user,
            })
          );
          return;
        }

        dispatch(clearAuth());
      } catch {
        if (mounted) dispatch(clearAuth());
      }
    }

    hydrateSession();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
