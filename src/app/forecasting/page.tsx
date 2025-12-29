'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Sparkles, TrendingUp, Calendar, Info, BrainCircuit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const forecastData = [
  { date: 'Jan 24', actual: 4200, forecast: 4200 },
  { date: 'Feb 24', actual: 4500, forecast: 4450 },
  { date: 'Mar 24', actual: 4800, forecast: 4700 },
  { date: 'Apr 24', actual: 4100, forecast: 4300 },
  { date: 'May 24', actual: 5200, forecast: 5100 },
  { date: 'Jun 24', actual: 5800, forecast: 5600 },
  { date: 'Jul 24', forecast: 6200 },
  { date: 'Aug 24', forecast: 6500 },
  { date: 'Sep 24', forecast: 6100 },
  { date: 'Oct 24', forecast: 5900 },
  { date: 'Nov 24', forecast: 7200 },
  { date: 'Dec 24', forecast: 8500 },
];

export default function ForecastingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Demand Forecasting</h1>
          <p className="text-slate-500">AI-driven predictions and seasonal trend analysis.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="ai-001">AI Processor X1</SelectItem>
              <SelectItem value="mem-123">Memory Module</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Calendar className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Forecast Model: Hybrid Transformer v4</CardTitle>
                <CardDescription>Predicting demand for the next 6 months with 94.2% confidence.</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100">
                Active Learning
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorActual)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#8b5cf6" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  fillOpacity={1} 
                  fill="url(#colorForecast)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-indigo-600 text-white border-none shadow-indigo-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BrainCircuit className="h-5 w-5" />
                AI Rationale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-indigo-100 leading-relaxed">
                The predicted 25% surge in December is driven by historical Q4 peak cycles and current market expansion in the APAC region. 
                <br /><br />
                Model suggests increasing safety stock for AI Processors by 15% starting mid-October.
              </p>
              <Button variant="secondary" className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border-white/20">
                Review Evidence
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Info className="h-4 w-4 text-slate-400" />
                Accuracy Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">MAPE</span>
                <span className="text-sm font-bold">4.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">RMSE</span>
                <span className="text-sm font-bold">128 units</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Bias</span>
                <span className="text-sm font-bold text-emerald-500">+0.8%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
