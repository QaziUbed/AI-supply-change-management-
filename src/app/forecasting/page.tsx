'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Sparkles, TrendingUp, Calendar, Info, BrainCircuit, ArrowUpRight, ChevronRight, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const forecastData = [
  { date: 'Jan', actual: 4200, forecast: 4200 },
  { date: 'Feb', actual: 4500, forecast: 4450 },
  { date: 'Mar', actual: 4800, forecast: 4700 },
  { date: 'Apr', actual: 4100, forecast: 4300 },
  { date: 'May', actual: 5200, forecast: 5100 },
  { date: 'Jun', actual: 5800, forecast: 5600 },
  { date: 'Jul', forecast: 6200 },
  { date: 'Aug', forecast: 6500 },
  { date: 'Sep', forecast: 6100 },
  { date: 'Oct', forecast: 5900 },
  { date: 'Nov', forecast: 7200 },
  { date: 'Dec', forecast: 8500 },
];

export default function ForecastingPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Demand Forecasting</h1>
            <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-none font-bold text-[10px] px-2">LIVE</Badge>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Neural network predictions with 94.2% accuracy.</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold">
              <SelectValue placeholder="Select Product" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="ai-001">AI Processor X1</SelectItem>
              <SelectItem value="mem-123">Memory Module</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-teal-600 hover:bg-teal-700 rounded-xl font-bold shadow-lg shadow-teal-100 dark:shadow-none">
            <Calendar className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid gap-6 md:grid-cols-4">
        <MetricCard title="Forecast Accuracy" value="94.2%" trend="+2.1%" icon={<Target className="h-5 w-5 text-teal-600" />} />
        <MetricCard title="Total Predicted" value="72,400" trend="Next 6mo" icon={<TrendingUp className="h-5 w-5 text-emerald-600" />} />
        <MetricCard title="Peak Month" value="December" trend="8,500 units" icon={<Sparkles className="h-5 w-5 text-amber-500" />} />
        <MetricCard title="Model Version" value="v4.2" trend="Transformer" icon={<BrainCircuit className="h-5 w-5 text-cyan-600" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-5 shadow-2xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900">
          <CardHeader className="px-8 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black">Hybrid Transformer Model</CardTitle>
                <CardDescription className="font-medium">Actual vs. predicted demand with confidence intervals.</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 hover:bg-emerald-50 border-none font-bold rounded-full px-4 py-1">
                Active Learning
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="h-[420px] px-4 pb-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px', fontWeight: 600 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorActual)" 
                  dot={{ r: 6, fill: '#6366f1', strokeWidth: 3, stroke: '#fff' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#a78bfa" 
                  strokeWidth={3} 
                  strokeDasharray="8 5"
                  fillOpacity={1} 
                  fill="url(#colorForecast)" 
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white border-none shadow-2xl shadow-teal-200 dark:shadow-none rounded-[2rem] overflow-hidden">
            <CardHeader className="pb-3 px-7 pt-7">
              <CardTitle className="text-lg font-black flex items-center gap-2">
                <BrainCircuit className="h-5 w-5" />
                AI Reasoning
              </CardTitle>
            </CardHeader>
            <CardContent className="px-7 pb-7">
              <p className="text-sm text-teal-100 leading-relaxed mb-5">
                The predicted <strong className="text-white">25% surge</strong> in December is driven by historical Q4 cycles and APAC market expansion. 
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 mb-5">
                <p className="text-xs font-bold text-teal-200 mb-1 uppercase tracking-widest">Recommendation</p>
                <p className="text-sm font-bold">Increase AI Processor safety stock by 15% starting mid-October.</p>
              </div>
              <Button variant="secondary" className="w-full bg-white/15 hover:bg-white/25 text-white border-white/20 rounded-xl font-bold">
                Review Evidence <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-900">
            <CardHeader className="pb-3 px-7 pt-7">
              <CardTitle className="text-sm font-black flex items-center gap-2 uppercase tracking-widest text-slate-500">
                <Info className="h-4 w-4" />
                Model Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="px-7 pb-7 space-y-5">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">MAPE</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">4.2%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">RMSE</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">128 units</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Bias</span>
                <span className="text-lg font-black text-emerald-600">+0.8%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) {
  return (
    <Card className="shadow-xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800 rounded-[1.5rem] bg-white dark:bg-slate-900 hover:-translate-y-1 transition-all group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{title}</span>
          <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-xl group-hover:scale-110 transition-transform">
            {icon}
          </div>
        </div>
        <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{value}</div>
        <div className="text-xs font-bold text-teal-600">{trend}</div>
      </CardContent>
    </Card>
  );
}
