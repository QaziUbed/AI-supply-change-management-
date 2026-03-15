'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useDispatch } from 'react-redux';
import { setAuth, setLoading, clearAuth } from '@/lib/features/authSlice';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const supabaseRef = useRef(createClient());

  useEffect(() => {
    const supabase = supabaseRef.current;

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profile }) => {
            dispatch(setAuth({
              session,
              user: profile || {
                id: session.user.id,
                email: session.user.email,
                full_name: session.user.user_metadata?.full_name || null,
                role: 'Planner' as const,
              },
            }));
          });
      } else {
        dispatch(setLoading(false));
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (session) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          dispatch(setAuth({
            session,
            user: profile || {
              id: session.user.id,
              email: session.user.email,
              full_name: session.user.user_metadata?.full_name || null,
              role: 'Planner' as const,
            },
          }));
        } else {
          dispatch(clearAuth());
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
