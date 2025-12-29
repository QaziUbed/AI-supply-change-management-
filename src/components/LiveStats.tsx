'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Box, TrendingUp, RefreshCw } from 'lucide-react';

interface Stats {
  productCount: number;
  supplierCount: number;
  insightCount: number;
  inventoryHealth: number;
  lastUpdated: string;
}

export function LiveStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/landing-stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-slate-100 rounded-xl" />
        ))}
      </div>
    );
  }

  const statItems = [
    { label: 'Total Products', value: stats?.productCount, icon: Box, color: 'text-blue-600' },
    { label: 'Global Suppliers', value: stats?.supplierCount, icon: Activity, color: 'text-emerald-600' },
    { label: 'AI Insights Today', value: stats?.insightCount, icon: Brain, color: 'text-indigo-600' },
    { label: 'Inventory Health', value: `${stats?.inventoryHealth}%`, icon: TrendingUp, color: 'text-amber-600' },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <RefreshCw className="h-3 w-3" /> Live Network Pulse
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">
          Last sync: {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleTimeString() : 'N/A'}
        </span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <item.icon className={`h-5 w-5 ${item.color} mb-3`} />
            <div className="text-2xl font-bold text-slate-900">{item.value?.toLocaleString()}</div>
            <div className="text-xs font-medium text-slate-500 mt-1">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
