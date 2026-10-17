'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import {
  TrendingUp,
  AlertTriangle,
  Users,
  Truck,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getDashboardDemandData, getDashboardInsights, getDashboardInventoryData } from '@/lib/mock-data';

interface DemandPoint {
  name: string;
  actual: number;
  forecast: number;
}

interface InventoryPoint {
  name: string;
  stock: number;
  min: number;
  color: string;
}

interface InsightPoint {
  id: string;
  title: string;
  description: string;
  type: string;
  level: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function DashboardPage() {
  const [demandData, setDemandData] = useState<DemandPoint[]>([]);
  const [inventoryData, setInventoryData] = useState<InventoryPoint[]>([]);
  const [insights, setInsights] = useState<InsightPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setDemandData(getDashboardDemandData());
        setInventoryData(getDashboardInventoryData());
        setInsights(
          getDashboardInsights().map((ins) => ({
            ...ins,
            icon: ins.type === 'Inventory' ? AlertTriangle : ins.type === 'Demand' ? Sparkles : TrendingUp,
            color: ins.level === 'High' ? 'text-red-600 bg-red-50' : 'text-teal-600 bg-teal-50',
          }))
        );
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-16 w-16 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center">
          <Sparkles className="h-8 w-8 text-teal-600 animate-spin" />
        </div>
        <p className="text-slate-500 font-bold text-lg">Synthesizing Real-time Data...</p>
      </div>
    </div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Supply Chain Intelligence</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Predictive oversight for global operations.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Demand"
          value="12,482"
          trend="+12.5%"
          trendType="up"
          icon={<TrendingUp className="h-5 w-5 text-teal-600" />}
          description="Total units sold across all channels"
        />
        <KPICard
          title="Stock Health"
          value="92%"
          trend="3 Alerts"
          trendType="down"
          icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
          description="Percentage of items above reorder point"
        />
        <KPICard
          title="Supplier Reliability"
          value="94.8%"
          trend="+1.2%"
          trendType="up"
          icon={<Users className="h-5 w-5 text-blue-600" />}
          description="On-time delivery performance"
        />
        <KPICard
          title="Fulfillment"
          value="98.2%"
          trend="0.5d avg"
          trendType="neutral"
          icon={<Truck className="h-5 w-5 text-emerald-600" />}
          description="Order processing efficiency"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Demand Forecast Chart */}
        <Card className="lg:col-span-4 shadow-2xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900 transition-all hover:shadow-teal-100 dark:hover:border-teal-900/50 group">
          <CardHeader className="px-8 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black">Demand Trends & Forecasting</CardTitle>
                <CardDescription className="font-medium">AI-predicted vs. actual sales metrics.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-teal-50 dark:hover:bg-teal-900/20 text-teal-600">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="h-[350px] px-4 pb-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={demandData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} dx={-10} />
                <Tooltip
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#6366f1"
                  strokeWidth={4}
                  dot={{ r: 6, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#cbd5e1"
                  strokeWidth={2}
                  strokeDasharray="8 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Insights Panel */}
        <Card className="lg:col-span-3 shadow-2xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900">
          <CardHeader className="px-8 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black">Intelligent Insights</CardTitle>
                <CardDescription className="font-medium">Real-time optimization suggestions.</CardDescription>
              </div>
              <div className="bg-teal-600 p-2 rounded-xl shadow-lg shadow-teal-100 dark:shadow-none">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6">
            <div className="space-y-4">
              {insights.map((insight, i) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-5 rounded-2xl border border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer group hover:shadow-lg"
                >
                  <div className={cn("mt-0.5 p-3 rounded-xl h-fit", insight.color)}>
                    <insight.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-black dark:text-white">{insight.title}</h4>
                      <Badge variant={insight.level === 'High' ? 'destructive' : 'secondary'} className="text-[10px] h-5 rounded-full px-2 font-bold">
                        {insight.level}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {insight.description}
                    </p>
                  </div>
                </motion.div>
              ))}
              <Button variant="ghost" className="w-full h-12 rounded-xl font-bold text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                Open AI Command Center <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Inventory Levels */}
        <Card className="lg:col-span-3 shadow-2xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800 rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
          <CardHeader className="px-8 pt-8">
            <CardTitle className="text-xl font-black">Inventory Health</CardTitle>
            <CardDescription className="font-medium">Top SKU availability vs reorder points.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] px-4 pb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} width={100} />
                <Tooltip
                  cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="stock" radius={[0, 8, 8, 0]} barSize={32}>
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.stock < entry.min ? '#f43f5e' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity / Logistics */}
        <Card className="lg:col-span-4 shadow-2xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800 rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
          <CardHeader className="px-8 pt-8">
            <CardTitle className="text-xl font-black">Live Logistics Network</CardTitle>
            <CardDescription className="font-medium">Global shipment status and transit times.</CardDescription>
          </CardHeader>
          <CardContent className="px-8">
            <div className="space-y-5">
              {[
                { id: 'SHP-9021', status: 'In Transit', origin: 'Shenzhen, CN', destination: 'Chicago, US', eta: 'Jan 2', progress: 65, color: 'bg-teal-600' },
                { id: 'SHP-8812', status: 'Delivered', origin: 'London, UK', destination: 'Rotterdam, NL', eta: 'Completed', progress: 100, color: 'bg-emerald-500' },
                { id: 'SHP-7741', status: 'Delayed', origin: 'Los Angeles, US', destination: 'Tokyo, JP', eta: 'Jan 5', progress: 40, color: 'bg-rose-500' },
              ].map((shipment) => (
                <div key={shipment.id} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-teal-100 dark:hover:border-teal-900 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl group-hover:bg-teal-50 dark:group-hover:bg-teal-900/30 transition-colors">
                        <Truck className="h-5 w-5 text-slate-500 group-hover:text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm font-black dark:text-white">{shipment.id}</p>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{shipment.origin} → {shipment.destination}</p>
                      </div>
                    </div>
                    <Badge variant={shipment.status === 'Delivered' ? 'outline' : shipment.status === 'Delayed' ? 'destructive' : 'secondary'} className="rounded-full px-3 py-1 font-bold text-[10px]">
                      {shipment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-tight">
                    <span>PROGRESS</span>
                    <span>ETA: {shipment.eta}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${shipment.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={cn("h-full rounded-full", shipment.color)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface KPICardProps {
  title: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  description: string;
}

function KPICard({ title, value, trend, trendType, icon, description }: KPICardProps) {
  return (
    <Card className="shadow-xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900 transition-all hover:-translate-y-1 hover:shadow-teal-100 dark:hover:border-teal-900/50 group">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 px-8 pt-8">
        <CardTitle className="text-sm font-black text-slate-500 uppercase tracking-widest">{title}</CardTitle>
        <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">{value}</div>
        <div className="flex items-center gap-2">
          <div className={cn(
            "flex items-center px-2 py-1 rounded-full text-[10px] font-black",
            trendType === 'up' ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20" :
              trendType === 'down' ? "bg-rose-50 text-rose-600 dark:bg-rose-900/20" :
                "bg-slate-50 text-slate-600 dark:bg-slate-800"
          )}>
            {trendType === 'up' && <ArrowUpRight className="h-3 w-3 mr-0.5" />}
            {trendType === 'down' && <ArrowDownRight className="h-3 w-3 mr-0.5" />}
            {trend}
          </div>
          <span className="text-[11px] font-medium text-slate-400">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
}
