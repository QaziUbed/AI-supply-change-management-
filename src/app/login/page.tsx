'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Loader2, Eye, EyeOff, Check, X, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/lib/features/authSlice';
import Link from 'next/link';

// Password strength rules
const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  { label: 'One special character', test: (p: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p) },
];

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const passed = PASSWORD_RULES.filter(r => r.test(password)).length;
  const strength = passed <= 2 ? 'Weak' : passed <= 4 ? 'Medium' : 'Strong';
  const color = passed <= 2 ? 'bg-red-500' : passed <= 4 ? 'bg-amber-500' : 'bg-green-500';

  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < passed ? color : 'bg-slate-200 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${
        passed <= 2 ? 'text-red-500' : passed <= 4 ? 'text-amber-500' : 'text-green-500'
      }`}>
        {strength} password
      </p>
      <ul className="space-y-1">
        {PASSWORD_RULES.map((rule) => (
          <li key={rule.label} className="flex items-center gap-1.5 text-xs">
            {rule.test(password) ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <X className="h-3 w-3 text-slate-300 dark:text-slate-600" />
            )}
            <span className={rule.test(password) ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500'}>
              {rule.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success('Signed in successfully');
      // Fetch profile to get role
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      dispatch(setAuth({
        session: data.session,
        user: profile || {
          id: data.user.id,
          email: data.user.email,
          full_name: data.user.user_metadata?.full_name || null,
          role: 'Planner' as const,
        },
      }));
      router.push('/dashboard');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      toast.error('Please fill in all fields');
      return;
    }

    // Validate password strength — all rules must pass
    const allPassed = PASSWORD_RULES.every(r => r.test(password));
    if (!allPassed) {
      toast.error('Please meet all password requirements before signing up');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      setEmailSent(true);
      setLoading(false);
      toast.success('Check your email to verify your account!');
    }
  };

  const handleGuestLogin = (role: 'Planner' | 'Manager') => {
    const roleLabels = { Planner: 'Demo Planner', Manager: 'Demo Manager' };
    dispatch(setAuth({
      session: { user: { id: 'guest', email: 'demo@scm-platform.com' } },
      user: {
        id: 'guest',
        full_name: roleLabels[role],
        role: role,
        email: 'demo@scm-platform.com',
        isGuest: true,
      }
    }));
    toast.success(`Signed in as ${roleLabels[role]} (demo mode)`);
    router.push('/dashboard');
  };

  // Email verification success screen
  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
        <Card className="w-full max-w-md shadow-xl border-none">
          <CardContent className="pt-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-950/30 mx-auto">
              <Mail className="h-8 w-8 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Check your email</h2>
            <p className="text-slate-500 text-sm">
              We&apos;ve sent a verification link to <strong className="text-slate-700 dark:text-slate-300">{email}</strong>.
              Click the link to activate your account.
            </p>
            <div className="pt-4 space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setEmailSent(false)}
              >
                Back to login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors text-sm font-medium">
        <Sparkles className="h-4 w-4" />
        Back to Home
      </Link>
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="bg-teal-600 p-2 rounded-xl shadow-lg shadow-teal-200 dark:shadow-teal-900/20">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">SCM AI</CardTitle>
          <CardDescription>Supply Chain Intelligence Platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="guest">Demo</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button className="w-full bg-teal-600 hover:bg-teal-700" type="submit" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <PasswordStrength password={password} />
                </div>
                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  type="submit"
                  disabled={loading || !PASSWORD_RULES.every(r => r.test(password))}
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Account'}
                </Button>
                <p className="text-xs text-slate-400 text-center">
                  You&apos;ll receive a verification email to activate your account.
                </p>
              </form>
            </TabsContent>

            {/* Guest/Demo Tab */}
            <TabsContent value="guest">
              <div className="grid gap-3">
                <p className="text-sm text-slate-500 mb-2">
                  Explore the platform with sample data. Demo accounts have limited permissions.
                </p>
                <Button variant="outline" className="justify-start gap-3 border-teal-100 hover:bg-teal-50 dark:border-slate-700 dark:hover:bg-slate-800" onClick={() => handleGuestLogin('Planner')}>
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Planner <span className="text-xs text-slate-400 font-normal ml-auto">(Forecasts &amp; Inventory)</span></span>
                </Button>
                <Button variant="outline" className="justify-start gap-3 border-teal-100 hover:bg-teal-50 dark:border-slate-700 dark:hover:bg-slate-800" onClick={() => handleGuestLogin('Manager')}>
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span>Manager <span className="text-xs text-slate-400 font-normal ml-auto">(Logistics &amp; Reports)</span></span>
                </Button>
                <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                    ⚠️ Admin access requires a real account. Demo users cannot access Settings or Procurement.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 border-t pt-4">
          <p className="text-xs text-center text-slate-400">
            Secure Enterprise Access · Encrypted Connections
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
