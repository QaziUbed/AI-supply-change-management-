'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useDispatch } from 'react-redux';
import { setAuth, clearAuth } from '@/lib/features/authSlice';

const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
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
              full_name: session.user.user_metadata.full_name,
              role: 'Planner',
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
