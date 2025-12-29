import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  id: string;
  full_name: string | null;
  role: 'Admin' | 'Planner' | 'Manager';
  email: string | null;
}

interface AuthState {
  user: UserProfile | null;
  session: unknown | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  session: null,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: UserProfile | null; session: unknown | null }>) => {
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.session = null;
      state.loading = false;
    },
  },
});

export const { setAuth, setLoading, clearAuth } = authSlice.actions;
export default authSlice.reducer;
