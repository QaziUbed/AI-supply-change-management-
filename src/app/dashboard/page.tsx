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
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const [demandData, setDemandData] = useState<any[]>([]);
  const [inventoryData, setInventoryData] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Sales History for demand chart
        const { data: sales } = await supabase
          .from('sales_history')
          .select('date, quantity_sold')
          .order('date', { ascending: true })
          .limit(7);

        // Fetch Forecasts for demand chart
        const { data: forecasts } = await supabase
          .from('demand_forecasts')
          .select('forecast_date, predicted_quantity')
          .order('forecast_date', { ascending: true })
          .limit(7);

        // Fetch Inventory Health
        const { data: inv } = await supabase
          .from('inventory')
          .select('quantity_on_hand, reorder_point, products(name)')
          .limit(5);

        // Fetch AI Insights
        const { data: aiIns } = await supabase
          .from('ai_insights')
          .select('*')
          .limit(3);

        if (sales) {
          setDemandData(sales.map(s => ({
            name: new Date(s.date).toLocaleDateString('en-US', { weekday: 'short' }),
            actual: s.quantity_sold,
            forecast: forecasts?.find(f => f.forecast_date === s.date)?.predicted_quantity || s.quantity_sold + 5
          })));
        }

        if (inv) {
          setInventoryData(inv.map(i => ({
            name: (i.products as any)?.name || 'Unknown',
            stock: i.quantity_on_hand,
            min: i.reorder_point,
            color: i.quantity_on_hand < i.reorder_point ? '#ef4444' : '#6366f1'
          })));
        }

        if (aiIns) {
          setInsights(aiIns.map(ins => ({
            id: ins.id,
            title: ins.category + ': ' + ins.insight_text.split('.')[0],
            description: ins.insight_text,
            type: ins.category,
            level: ins.severity,
            icon: ins.category === 'Inventory' ? AlertTriangle : ins.category === 'Demand' ? Sparkles : TrendingUp,
            color: ins.severity === 'High' ? 'text-red-600 bg-red-50' : 'text-indigo-600 bg-indigo-50'
          })));
        }
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
        <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-indigo-600 animate-spin" />
        </div>
        <p className="text-slate-500 font-medium">Loading Intelligent Dashboard...</p>
      </div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Supply Chain Dashboard</h1>
        <p className="text-slate-500">Real-time intelligence and demand forecasting for your global operations.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Demand</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,482</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12.5% from last week
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-red-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              2 high risk items
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Supplier Score</CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.8%</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +1.2% this month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
            <Truck className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.4%</div>
            <p className="text-xs text-slate-500 flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              Avg. 3.2 days delay
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        {/* Demand Forecast Chart */}
        <Card className="col-span-4 shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Demand Trends & Forecasting</CardTitle>
            <CardDescription>Comparison between actual sales and AI-predicted demand.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={demandData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#6366f1' }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#94a3b8" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Insights Panel */}
        <Card className="col-span-3 shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Generative AI generated recommendations.</CardDescription>
            </div>
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map((insight) => (
                <div key={insight.id} className="flex gap-4 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 transition-colors cursor-pointer">
                  <div className={`mt-0.5 p-2 rounded-lg ${insight.color}`}>
                    <insight.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-semibold">{insight.title}</h4>
                      <Badge variant={insight.level === 'High' ? 'destructive' : 'secondary'} className="text-[10px] h-4">
                        {insight.level}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {insight.description}
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs font-medium border-slate-200 dark:border-slate-800">
                View All Insights
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Inventory Levels */}
        <Card className="lg:col-span-3 shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Inventory Health</CardTitle>
            <CardDescription>Current stock vs. reorder points across key products.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} width={100} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="stock" radius={[0, 4, 4, 0]}>
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.stock < entry.min ? '#ef4444' : entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Logistics & Delivery Status */}
        <Card className="lg:col-span-4 shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Recent Logistics Activity</CardTitle>
            <CardDescription>Tracking real-time shipments and delivery status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'TRK-9021', status: 'In Transit', origin: 'Shenzhen, CN', destination: 'Chicago, US', time: '2h ago', progress: 65 },
                { id: 'TRK-8812', status: 'Delivered', origin: 'London, UK', destination: 'Rotterdam, NL', time: '5h ago', progress: 100 },
                { id: 'TRK-7741', status: 'Delayed', origin: 'Los Angeles, US', destination: 'Tokyo, JP', time: '8h ago', progress: 40 },
              ].map((shipment) => (
                <div key={shipment.id} className="flex flex-col gap-2 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-slate-400" />
                      <span className="text-sm font-semibold">{shipment.id}</span>
                    </div>
                    <Badge variant={shipment.status === 'Delivered' ? 'outline' : shipment.status === 'Delayed' ? 'destructive' : 'secondary'} className="text-[10px]">
                      {shipment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{shipment.origin} → {shipment.destination}</span>
                    <span>{shipment.time}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${shipment.status === 'Delayed' ? 'bg-amber-500' : 'bg-indigo-600'}`} 
                      style={{ width: `${shipment.progress}%` }}
                    />
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400">
                Manage Logistics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
