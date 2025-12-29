'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  Moon
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
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Demand Forecasting', href: '/forecasting', icon: TrendingUp },
  { name: 'Inventory Management', href: '/inventory', icon: Package },
  { name: 'Procurement Planning', href: '/procurement', icon: ShoppingCart },
  { name: 'Logistics Optimization', href: '/logistics', icon: Truck },
  { name: 'AI Assistant', href: '/ai-assistant', icon: MessageSquare },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useSelector((state: RootState) => state.auth);
  const { theme, setTheme } = useTheme();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
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
              className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between h-20 px-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-black tracking-tight dark:text-white">SCM AI</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>
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
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none" 
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
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="flex items-center h-20 px-8 border-b border-slate-100 dark:border-slate-800">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none group-hover:scale-110 transition-transform">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">SCM AI</span>
          </Link>
        </div>
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
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 dark:shadow-none" 
                    : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 hover:translate-x-1"
                )}
              >
                <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-600")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
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
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:pl-72 flex flex-col">
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 sticky top-0 z-40 transition-colors duration-300">
          <div className="h-full px-8 flex items-center justify-between">
            <div className="flex items-center flex-1">
              <Button variant="ghost" size="icon" className="lg:hidden mr-4 rounded-xl" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div className="max-w-md w-full hidden md:block group">
                <div className="relative">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <Input 
                    placeholder="Search anything..." 
                    className="pl-11 h-11 bg-slate-50/50 border-slate-100 dark:bg-slate-800/50 dark:border-slate-700 rounded-2xl focus-visible:ring-indigo-600 focus-visible:bg-white transition-all"
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
              <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-indigo-600 rounded-full ring-4 ring-white dark:ring-slate-900" />
              </Button>
              <div className="h-8 w-px bg-slate-100 dark:bg-slate-800 mx-1" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <Avatar className="h-10 w-10 border-2 border-white dark:border-slate-800 shadow-sm">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'guest'}`} />
                      <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">{user?.full_name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-black leading-none text-slate-900 dark:text-white">{user?.full_name || 'Guest User'}</p>
                      <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{user?.role || 'Planner'}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl border-slate-100 dark:border-slate-800">
                  <DropdownMenuLabel className="px-3 py-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account Actions</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-xl py-2.5 cursor-pointer">
                    <User className="mr-3 h-4 w-4 text-slate-400" /> Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl py-2.5 cursor-pointer">
                    <BarChart3 className="mr-3 h-4 w-4 text-slate-400" /> Usage Analytics
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 rounded-xl py-2.5 cursor-pointer font-bold" onClick={handleSignOut}>
                    <LogOut className="mr-3 h-4 w-4" /> Sign out
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
