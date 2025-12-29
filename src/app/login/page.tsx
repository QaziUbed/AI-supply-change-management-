'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/lib/features/authSlice';

import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success('Logged in successfully');
      router.push('/dashboard');
    }
  };

  const handleGuestLogin = (role: 'Admin' | 'Planner' | 'Manager') => {
    // Mock login for demo purposes
    dispatch(setAuth({
      session: { user: { id: 'guest', email: 'guest@example.com' } },
      user: {
        id: 'guest',
        full_name: `Guest ${role}`,
        role: role,
        email: 'guest@example.com'
      }
    }));
    toast.success(`Logged in as Guest ${role}`);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-medium">
        <Sparkles className="h-4 w-4" />
        Back to Home
      </Link>
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">SCM AI</CardTitle>
          <CardDescription>Supply Chain Intelligence Platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="guest">Demo Access</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700" type="submit" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="guest">
              <div className="grid gap-3">
                <p className="text-sm text-slate-500 mb-2">Select a role to explore the system with mock data:</p>
                <Button variant="outline" className="justify-start gap-3 border-indigo-100 hover:bg-indigo-50" onClick={() => handleGuestLogin('Admin')}>
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span>Admin <span className="text-xs text-slate-400 font-normal ml-auto">(Full Control)</span></span>
                </Button>
                <Button variant="outline" className="justify-start gap-3 border-indigo-100 hover:bg-indigo-50" onClick={() => handleGuestLogin('Planner')}>
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Planner <span className="text-xs text-slate-400 font-normal ml-auto">(Forecasts & Inventory)</span></span>
                </Button>
                <Button variant="outline" className="justify-start gap-3 border-indigo-100 hover:bg-indigo-50" onClick={() => handleGuestLogin('Manager')}>
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span>Manager <span className="text-xs text-slate-400 font-normal ml-auto">(Logistics & Reports)</span></span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 border-t pt-4">
          <p className="text-xs text-center text-slate-400">
            Secure Enterprise Access with Generative AI Insights
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
