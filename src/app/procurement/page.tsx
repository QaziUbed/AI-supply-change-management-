'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Plus, 
  Filter, 
  Search, 
  Clock, 
  DollarSign, 
  FileCheck, 
  Users,
  ChevronRight,
  MoreVertical,
  Building2,
  CalendarDays
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export default function ProcurementPage() {
  const purchaseOrders = [
    { id: 'PO-8812', supplier: 'TechFlow Solutions', date: '2025-12-25', amount: '$45,000', status: 'Approved', items: 12 },
    { id: 'PO-8811', supplier: 'Global Parts Corp', date: '2025-12-24', amount: '$12,500', status: 'Shipped', items: 5 },
    { id: 'PO-8810', supplier: 'EcoPack Ltd', date: '2025-12-22', amount: '$3,200', status: 'Delivered', items: 8 },
    { id: 'PO-8809', supplier: 'TechFlow Solutions', date: '2025-12-20', amount: '$28,000', status: 'Pending', items: 3 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Procurement Hub</h1>
            <Badge className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 border-none font-bold text-[10px] px-2">24 ACTIVE</Badge>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Manage purchase orders and supplier relationships.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold shadow-lg shadow-indigo-100 dark:shadow-none">
          <Plus className="mr-2 h-4 w-4" /> Create Purchase Order
        </Button>
      </div>

      {/* KPI Row */}
      <div className="grid gap-6 md:grid-cols-4">
        <MetricCard 
          title="Active Orders" 
          value="24" 
          trend="+3 this week" 
          icon={<ShoppingCart className="h-5 w-5 text-indigo-600" />} 
        />
        <MetricCard 
          title="Pending Approval" 
          value="5" 
          trend="Awaiting review" 
          icon={<FileCheck className="h-5 w-5 text-amber-500" />} 
          alert
        />
        <MetricCard 
          title="Monthly Spend" 
          value="$1.2M" 
          trend="+8.2% vs last month" 
          icon={<DollarSign className="h-5 w-5 text-emerald-600" />} 
        />
        <MetricCard 
          title="Avg Lead Time" 
          value="12.4d" 
          trend="-1.2 days improved" 
          icon={<Clock className="h-5 w-5 text-violet-600" />} 
        />
      </div>

      <Card className="shadow-2xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900">
        <CardHeader className="px-8 pt-8 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-black">Purchase Orders</CardTitle>
              <CardDescription className="font-medium">Track and manage all procurement activities.</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-64 group">
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <Input 
                  placeholder="Search POs..." 
                  className="pl-11 h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus-visible:ring-indigo-600 font-medium"
                />
              </div>
              <Button variant="outline" size="sm" className="h-12 rounded-xl font-bold border-slate-200 dark:border-slate-700 px-5">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
              <TableRow className="border-slate-100 dark:border-slate-800">
                <TableHead className="font-black text-slate-500 uppercase text-[11px] tracking-widest py-5 px-8">PO Number</TableHead>
                <TableHead className="font-black text-slate-500 uppercase text-[11px] tracking-widest">Supplier</TableHead>
                <TableHead className="font-black text-slate-500 uppercase text-[11px] tracking-widest">Order Date</TableHead>
                <TableHead className="font-black text-slate-500 uppercase text-[11px] tracking-widest">Total Amount</TableHead>
                <TableHead className="font-black text-slate-500 uppercase text-[11px] tracking-widest">Status</TableHead>
                <TableHead className="text-right font-black text-slate-500 uppercase text-[11px] tracking-widest px-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((po, i) => (
                <motion.tr 
                  key={po.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 border-slate-100 dark:border-slate-800 group cursor-pointer"
                >
                  <TableCell className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-colors">
                        <ShoppingCart className="h-4 w-4 text-slate-500 group-hover:text-indigo-600" />
                      </div>
                      <div>
                        <span className="font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{po.id}</span>
                        <p className="text-xs font-bold text-slate-400">{po.items} items</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-slate-400" />
                      <span className="font-bold text-slate-700 dark:text-slate-300">{po.supplier}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-slate-400" />
                      <span className="font-medium text-slate-600 dark:text-slate-400">{po.date}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-lg font-black text-slate-900 dark:text-white">{po.amount}</span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={cn(
                        "text-[10px] font-bold rounded-full px-3 py-1",
                        po.status === 'Delivered' && "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-none",
                        po.status === 'Shipped' && "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-none",
                        po.status === 'Approved' && "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 border-none",
                        po.status === 'Pending' && "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-none"
                      )}
                    >
                      {po.status}
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
                        <DropdownMenuItem className="rounded-lg font-medium cursor-pointer">View Details</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg font-medium cursor-pointer">Edit Order</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg font-medium cursor-pointer">Track Shipment</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg text-indigo-600 font-bold cursor-pointer">Download Invoice</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Supplier Performance */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-900">
          <CardHeader className="px-7 pt-7">
            <CardTitle className="text-lg font-black flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
              Top Suppliers
            </CardTitle>
            <CardDescription className="font-medium">Performance metrics for key vendors.</CardDescription>
          </CardHeader>
          <CardContent className="px-7 pb-7">
            <div className="space-y-4">
              {[
                { name: 'TechFlow Solutions', score: 98, orders: 45, value: '$1.2M' },
                { name: 'Global Parts Corp', score: 94, orders: 32, value: '$840K' },
                { name: 'EcoPack Ltd', score: 91, orders: 28, value: '$520K' },
              ].map((supplier, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-100 dark:hover:border-indigo-900/50 transition-all group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 transition-colors">
                      {supplier.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 dark:text-white">{supplier.name}</p>
                      <p className="text-xs font-bold text-slate-400">{supplier.orders} orders • {supplier.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-black text-emerald-600">{supplier.score}%</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl shadow-slate-200/50 dark:shadow-none border-slate-100 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-900">
          <CardHeader className="px-7 pt-7">
            <CardTitle className="text-lg font-black">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="px-7 pb-7 space-y-3">
            <Button variant="outline" className="w-full justify-start h-14 rounded-xl font-bold border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 group">
              <Plus className="mr-3 h-5 w-5 text-slate-400 group-hover:text-indigo-600" />
              New Purchase Order
            </Button>
            <Button variant="outline" className="w-full justify-start h-14 rounded-xl font-bold border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 group">
              <Users className="mr-3 h-5 w-5 text-slate-400 group-hover:text-indigo-600" />
              Add Supplier
            </Button>
            <Button variant="outline" className="w-full justify-start h-14 rounded-xl font-bold border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 group">
              <FileCheck className="mr-3 h-5 w-5 text-slate-400 group-hover:text-indigo-600" />
              Review Pending
            </Button>
          </CardContent>
        </Card>
      </div>
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
