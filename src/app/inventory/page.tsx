'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical,
  ArrowUpDown,
  Warehouse,
  Loader2,
  Package,
  AlertTriangle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInventory() {
      try {
        const { data, error } = await supabase
          .from('inventory')
          .select(`
            id,
            quantity_on_hand,
            reorder_point,
            products (
              name,
              sku,
              categories (name)
            ),
            warehouses (name)
          `);

        if (error) throw error;
        if (data) {
          setInventory(data.map(item => ({
            id: item.id,
            name: (item.products as any).name,
            sku: (item.products as any).sku,
            category: (item.products as any).categories?.name || 'Uncategorized',
            stock: item.quantity_on_hand,
            warehouse: (item.warehouses as any).name,
            min: item.reorder_point,
            status: item.quantity_on_hand <= item.reorder_point / 2 ? 'Critical' : 
                    item.quantity_on_hand <= item.reorder_point ? 'Low Stock' : 'Healthy'
          })));
        }
      } catch (err) {
        console.error('Error fetching inventory:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchInventory();
  }, []);

  const filteredData = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const healthyCount = inventory.filter(i => i.status === 'Healthy').length;
  const alertCount = inventory.filter(i => i.status !== 'Healthy').length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="h-16 w-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
        </div>
        <p className="text-slate-500 font-bold text-lg">Synchronizing inventory data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Inventory Control</h1>
            <Badge className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 border-none font-bold text-[10px] px-2">{inventory.length} SKUs</Badge>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Real-time stock levels across all distribution centers.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl font-bold border-slate-200 dark:border-slate-700">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold shadow-lg shadow-indigo-100 dark:shadow-none">
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid gap-6 md:grid-cols-4">
        <MetricCard 
          title="Total SKUs" 
          value={inventory.length.toString()} 
          trend="Active items" 
          icon={<Package className="h-5 w-5 text-indigo-600" />} 
        />
        <MetricCard 
          title="Healthy Stock" 
          value={healthyCount.toString()} 
          trend={`${Math.round((healthyCount / inventory.length) * 100)}% of total`}
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />} 
        />
        <MetricCard 
          title="Alerts" 
          value={alertCount.toString()} 
          trend="Need attention" 
          icon={<AlertTriangle className="h-5 w-5 text-amber-500" />} 
          alert={alertCount > 0}
        />
        <MetricCard 
          title="Warehouses" 
          value="3" 
          trend="Global centers" 
          icon={<Warehouse className="h-5 w-5 text-violet-600" />} 
        />
      </div>

      <Card className="shadow-2xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900">
        <CardHeader className="px-8 pt-8 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative max-w-md w-full group">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <Input 
                placeholder="Search SKU or Product Name..." 
                className="pl-11 h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus-visible:ring-indigo-600 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-xl font-bold border-slate-200 dark:border-slate-700">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl font-bold border-slate-200 dark:border-slate-700">
                <Warehouse className="mr-2 h-4 w-4" /> All Warehouses
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
              <TableRow className="border-slate-100 dark:border-slate-800">
                <TableHead className="w-[300px] font-black text-slate-500 uppercase text-[11px] tracking-widest py-5 px-8">Product</TableHead>
                <TableHead className="font-black text-slate-500 uppercase text-[11px] tracking-widest">Category</TableHead>
                <TableHead className="font-black text-slate-500 uppercase text-[11px] tracking-widest">
                  <div className="flex items-center">
                    Stock Level <ArrowUpDown className="ml-2 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="font-black text-slate-500 uppercase text-[11px] tracking-widest">Warehouse</TableHead>
                <TableHead className="font-black text-slate-500 uppercase text-[11px] tracking-widest">Status</TableHead>
                <TableHead className="text-right font-black text-slate-500 uppercase text-[11px] tracking-widest px-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, i) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 border-slate-100 dark:border-slate-800 group cursor-pointer"
                >
                  <TableCell className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{item.name}</span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.sku}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-bold rounded-lg border-slate-200 dark:border-slate-700">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2 w-32">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-black text-slate-700 dark:text-slate-300">{item.stock} units</span>
                        <span className="font-bold text-slate-400">Min: {item.min}</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((item.stock / (item.min * 2)) * 100, 100)}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={cn(
                            "h-full rounded-full",
                            item.stock < item.min / 2 ? 'bg-rose-500' : 
                            item.stock < item.min ? 'bg-amber-500' : 'bg-emerald-500'
                          )}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-slate-600 dark:text-slate-400">{item.warehouse}</TableCell>
                  <TableCell>
                    <Badge 
                      className={cn(
                        "text-[10px] font-bold rounded-full px-3 py-1",
                        item.status === 'Healthy' && "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-none",
                        item.status === 'Low Stock' && "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-none",
                        item.status === 'Critical' && "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400 border-none"
                      )}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl p-2">
                        <DropdownMenuItem className="rounded-lg font-medium cursor-pointer">Edit Product</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg font-medium cursor-pointer">Adjust Stock</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg text-indigo-600 font-bold cursor-pointer">Reorder Now</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({ title, value, trend, icon, alert }: { title: string, value: string, trend: string, icon: React.ReactNode, alert?: boolean }) {
  return (
    <Card className={cn(
      "shadow-xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800 rounded-[1.5rem] bg-white dark:bg-slate-900 hover:-translate-y-1 transition-all group",
      alert && "border-amber-200 dark:border-amber-900/50"
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{title}</span>
          <div className={cn(
            "p-2 rounded-xl group-hover:scale-110 transition-transform",
            alert ? "bg-amber-50 dark:bg-amber-900/20" : "bg-slate-50 dark:bg-slate-800"
          )}>
            {icon}
          </div>
        </div>
        <div className={cn(
          "text-3xl font-black mb-1",
          alert ? "text-amber-600" : "text-slate-900 dark:text-white"
        )}>{value}</div>
        <div className={cn(
          "text-xs font-bold",
          alert ? "text-amber-600" : "text-indigo-600"
        )}>{trend}</div>
      </CardContent>
    </Card>
  );
}
