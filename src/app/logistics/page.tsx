'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, MapPin, Navigation, Clock, AlertCircle, Globe, Package, Plane, Ship, ChevronRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function LogisticsPage() {
  const shipments = [
    { id: 'SHP-9021', status: 'In Transit', origin: 'Shenzhen, CN', destination: 'Chicago, US', eta: 'Jan 2, 2025', progress: 65, carrier: 'FedEx', mode: 'air' },
    { id: 'SHP-8812', status: 'Delivered', origin: 'London, UK', destination: 'Rotterdam, NL', eta: 'Completed', progress: 100, carrier: 'DHL', mode: 'truck' },
    { id: 'SHP-7741', status: 'Delayed', origin: 'Los Angeles, US', destination: 'Tokyo, JP', eta: 'Jan 5, 2025', progress: 40, carrier: 'Maersk', mode: 'sea' },
  ];

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'air': return <Plane className="h-5 w-5" />;
      case 'sea': return <Ship className="h-5 w-5" />;
      default: return <Truck className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Logistics Command</h1>
            <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-none font-bold text-[10px] px-2">3 ACTIVE</Badge>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Global shipment tracking and route optimization.</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 rounded-xl font-bold shadow-lg shadow-teal-100 dark:shadow-none">
          <Navigation className="mr-2 h-4 w-4" /> AI Route Optimizer
        </Button>
      </div>

      {/* KPI Row */}
      <div className="grid gap-6 md:grid-cols-4">
        <MetricCard title="Active Shipments" value="127" trend="+12 today" icon={<Truck className="h-5 w-5 text-teal-600" />} />
        <MetricCard title="On-Time Rate" value="94.8%" trend="+2.3%" icon={<Clock className="h-5 w-5 text-emerald-600" />} />
        <MetricCard title="In Transit Value" value="$2.4M" trend="Global" icon={<Package className="h-5 w-5 text-amber-500" />} />
        <MetricCard title="Active Routes" value="34" trend="12 countries" icon={<Globe className="h-5 w-5 text-cyan-600" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-5 shadow-2xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900">
          <CardHeader className="px-8 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black">Live Shipment Tracker</CardTitle>
                <CardDescription className="font-medium">Real-time status of global freight movements.</CardDescription>
              </div>
              <Button variant="outline" className="rounded-xl font-bold border-slate-200 dark:border-slate-700">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="space-y-5">
              {shipments.map((shipment, i) => (
                <motion.div 
                  key={shipment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "p-6 rounded-[1.5rem] border transition-all hover:shadow-lg cursor-pointer group",
                    shipment.status === 'Delayed' 
                      ? "border-rose-100 dark:border-rose-900/30 bg-rose-50/30 dark:bg-rose-900/10" 
                      : "border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 hover:border-teal-100 dark:hover:border-teal-900/50"
                  )}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-3 rounded-xl transition-colors",
                        shipment.status === 'Delayed' 
                          ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600" 
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 group-hover:text-teal-600"
                      )}>
                        {getModeIcon(shipment.mode)}
                      </div>
                      <div>
                        <p className="text-lg font-black text-slate-900 dark:text-white">{shipment.id}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{shipment.carrier} • {shipment.mode.toUpperCase()}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={shipment.status === 'Delayed' ? 'destructive' : shipment.status === 'Delivered' ? 'secondary' : 'default'}
                      className={cn(
                        "rounded-full px-4 py-1.5 font-bold text-[11px]",
                        shipment.status === 'Delivered' && "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
                        shipment.status === 'In Transit' && "bg-teal-600"
                      )}
                    >
                      {shipment.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <div>
                        <p className="text-[10px] uppercase text-slate-400 font-black tracking-widest mb-1">Origin</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{shipment.origin}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-teal-500" />
                      <div>
                        <p className="text-[10px] uppercase text-slate-400 font-black tracking-widest mb-1">Destination</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{shipment.destination}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-400 uppercase tracking-wider">Progress</span>
                      <span className="font-black text-slate-700 dark:text-slate-300">{shipment.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${shipment.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={cn(
                          "h-full rounded-full",
                          shipment.status === 'Delayed' ? 'bg-rose-500' : shipment.status === 'Delivered' ? 'bg-emerald-500' : 'bg-teal-600'
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span>ETA: {shipment.eta}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-teal-600 font-bold text-xs rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20">
                      Track Details <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-none shadow-2xl shadow-amber-200 dark:shadow-none rounded-[2rem] overflow-hidden">
            <CardHeader className="pb-3 px-7 pt-7">
              <CardTitle className="text-lg font-black flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Active Alert
              </CardTitle>
            </CardHeader>
            <CardContent className="px-7 pb-7">
              <p className="text-sm text-amber-100 leading-relaxed mb-5">
                Weather disruption in <strong className="text-white">Pacific Northwest</strong> may cause 24h delay for 4 incoming shipments.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 mb-5">
                <p className="text-xs font-bold text-amber-200 mb-1 uppercase tracking-widest">AI Recommendation</p>
                <p className="text-sm font-bold">Reroute affected shipments through Houston Hub to save 18 hours.</p>
              </div>
              <Button className="w-full bg-white text-amber-600 hover:bg-white/90 rounded-xl font-bold shadow-lg">
                <Zap className="mr-2 h-4 w-4" /> Apply AI Rerouting
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-900">
            <CardHeader className="pb-3 px-7 pt-7">
              <CardTitle className="text-sm font-black flex items-center gap-2 uppercase tracking-widest text-slate-500">
                <Globe className="h-4 w-4" />
                Network Health
              </CardTitle>
            </CardHeader>
            <CardContent className="px-7 pb-7 space-y-5">
              <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Americas</span>
                <span className="text-lg font-black text-emerald-600">98.2%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">EMEA</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">95.4%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">APAC</span>
                <span className="text-lg font-black text-amber-600">87.1%</span>
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
