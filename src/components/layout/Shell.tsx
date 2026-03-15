'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  ShoppingCart,
  Truck,
  MessageSquare,
  BarChart3,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  User,
  LogOut,
  Sparkles,
  Sun,
  Moon,
  Shield,
  Eye,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { clearAuth } from '@/lib/features/authSlice';
import { createClient } from '@/utils/supabase/client';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ROUTE_PERMISSIONS, type UserRole } from '@/lib/rbac';

// Map route paths to icons
const ROUTE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  '/dashboard': LayoutDashboard,
  '/forecasting': TrendingUp,
  '/inventory': Package,
  '/procurement': ShoppingCart,
  '/logistics': Truck,
  '/ai-assistant': MessageSquare,
  '/reports': BarChart3,
};

// Build navigation from centralized RBAC config (single source of truth)
const allNavigation = ROUTE_PERMISSIONS
  .filter(r => r.path !== '/settings') // Settings is handled separately below
  .map(r => ({
    name: r.label,
    href: r.path,
    icon: ROUTE_ICONS[r.path] || LayoutDashboard,
    roles: r.allowedRoles,
  }));

export function Shell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { theme, setTheme } = useTheme();
  const supabase = createClient();

  const isGuest = user?.isGuest === true;
  const userRole = user?.role || 'Planner';

  // Filter nav items based on role
  const navigation = useMemo(() => {
    return allNavigation.filter(item => item.roles.includes(userRole));
  }, [userRole]);

  // Only Admin can access settings
  const showSettings = userRole === 'Admin' && !isGuest;

  const handleSignOut = async () => {
    if (isGuest) {
      dispatch(clearAuth());
      router.push('/login');
    } else {
      await supabase.auth.signOut();
      dispatch(clearAuth());
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
      {/* Demo mode banner */}
      {isGuest && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-amber-500 text-amber-950 text-center py-1.5 px-4 text-xs font-semibold flex items-center justify-center gap-2">
          <Eye className="h-3.5 w-3.5" />
          <span>Demo Mode — You&apos;re viewing as <strong>{user?.full_name}</strong> ({userRole}). Some features are restricted.</span>
          <button
            onClick={handleSignOut}
            className="ml-2 underline underline-offset-2 hover:no-underline"
          >
            Exit demo
          </button>
        </div>
      )}

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cn(
                "fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 shadow-2xl flex flex-col",
                isGuest && "top-[36px]"
              )}
            >
              <div className="flex items-center justify-between h-20 px-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="bg-teal-600 p-2 rounded-xl shadow-lg shadow-teal-200 dark:shadow-none">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-black tracking-tight dark:text-white">SCM AI</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Role badge */}
              {isGuest && (
                <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs">
                    <Shield className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      Role: <strong className="text-slate-700 dark:text-slate-300">{userRole}</strong>
                    </span>
                  </div>
                </div>
              )}

              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-teal-600 text-white shadow-lg shadow-teal-100 dark:shadow-none"
                          : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-400")} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className={cn(
        "hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 transition-colors duration-300",
        isGuest && "lg:top-[36px]"
      )}>
        <div className="flex items-center h-20 px-8 border-b border-slate-100 dark:border-slate-800">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="bg-teal-600 p-2 rounded-xl shadow-lg shadow-teal-100 dark:shadow-none group-hover:scale-110 transition-transform">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">SCM AI</span>
          </Link>
        </div>

        {/* Role indicator for guests */}
        {isGuest && (
          <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <Shield className="h-4 w-4 text-slate-400" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-slate-400 font-medium">Current Role</p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{userRole}</p>
              </div>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 font-bold text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
                DEMO
              </Badge>
            </div>
          </div>
        )}

        <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-200 group",
                  isActive
                    ? "bg-teal-600 text-white shadow-xl shadow-teal-100 dark:shadow-none"
                    : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 hover:translate-x-1"
                )}
              >
                <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-teal-600")} />
                {item.name}
              </Link>
            );
          })}

          {/* Show locked items for guests so they know what they're missing */}
          {isGuest && (
            <>
              {allNavigation
                .filter(item => !item.roles.includes(userRole))
                .map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl text-slate-300 dark:text-slate-600 cursor-not-allowed"
                    title={`${item.name} is not available in the ${userRole} role`}
                  >
                    <item.icon className="h-5 w-5 text-slate-300 dark:text-slate-700" />
                    <span className="flex-1">{item.name}</span>
                    <Lock className="h-3.5 w-3.5 text-slate-300 dark:text-slate-700" />
                  </div>
                ))
              }
            </>
          )}
        </nav>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
          {showSettings ? (
            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-200 group",
                pathname === '/settings'
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
              )}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          ) : (
            <div className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl text-slate-300 dark:text-slate-600 cursor-not-allowed"
              title="Settings are not available in demo mode">
              <Settings className="h-5 w-5 text-slate-300 dark:text-slate-700" />
              <span className="flex-1">Settings</span>
              <Lock className="h-3.5 w-3.5 text-slate-300 dark:text-slate-700" />
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className={cn("flex-1 lg:pl-72 flex flex-col", isGuest && "mt-[36px]")}>
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 sticky top-0 z-40 transition-colors duration-300"
          style={isGuest ? { top: '36px' } : undefined}
        >
          <div className="h-full px-8 flex items-center justify-between">
            <div className="flex items-center flex-1">
              <Button variant="ghost" size="icon" className="lg:hidden mr-4 rounded-xl" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div className="max-w-md w-full hidden md:block group">
                <div className="relative">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                  <Input
                    placeholder="Search anything..."
                    className="pl-11 h-11 bg-slate-50/50 border-slate-100 dark:bg-slate-800/50 dark:border-slate-700 rounded-2xl focus-visible:ring-teal-600 focus-visible:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              {!isGuest && (
                <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-teal-600 rounded-full ring-4 ring-white dark:ring-slate-900" />
                </Button>
              )}
              <div className="h-8 w-px bg-slate-100 dark:bg-slate-800 mx-1" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <Avatar className="h-10 w-10 border-2 border-white dark:border-slate-800 shadow-sm">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'guest'}`} />
                      <AvatarFallback className="bg-teal-100 text-teal-700 font-bold">{user?.full_name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-bold leading-none text-slate-900 dark:text-white">{user?.full_name || 'Guest'}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{userRole}</span>
                        {isGuest && (
                          <Badge variant="outline" className="text-[8px] px-1 py-0 font-bold text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 leading-tight">
                            DEMO
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl border-slate-100 dark:border-slate-800">
                  <DropdownMenuLabel className="px-3 py-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {isGuest ? 'Demo Account' : 'Account Actions'}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {!isGuest && (
                    <>
                      <DropdownMenuItem className="rounded-xl py-2.5 cursor-pointer">
                        <User className="mr-3 h-4 w-4 text-slate-400" /> Profile Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-xl py-2.5 cursor-pointer">
                        <BarChart3 className="mr-3 h-4 w-4 text-slate-400" /> Usage Analytics
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 rounded-xl py-2.5 cursor-pointer font-bold" onClick={handleSignOut}>
                    <LogOut className="mr-3 h-4 w-4" /> {isGuest ? 'Exit demo' : 'Sign out'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
