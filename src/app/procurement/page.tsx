'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ProcurementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Procurement Planning</h1>
          <p className="text-slate-500">Manage purchase orders and supplier relationships.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="mr-2 h-4 w-4" /> Create Purchase Order
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: 'Active Orders', value: '24', color: 'text-blue-600' },
          { label: 'Pending Approval', value: '5', color: 'text-amber-600' },
          { label: 'Total Spend (MTD)', value: '$1.2M', color: 'text-emerald-600' },
          { label: 'Supplier Lead Time', value: '12.4 Days', color: 'text-slate-600' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium uppercase text-slate-500">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Purchase Orders</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input placeholder="Search POs..." className="pl-9" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 'PO-8812', supplier: 'TechFlow Solutions', date: '2025-12-25', amount: '$45,000', status: 'Approved' },
                { id: 'PO-8811', supplier: 'Global Parts Corp', date: '2025-12-24', amount: '$12,500', status: 'Shipped' },
                { id: 'PO-8810', supplier: 'EcoPack Ltd', date: '2025-12-22', amount: '$3,200', status: 'Delivered' },
                { id: 'PO-8809', supplier: 'TechFlow Solutions', date: '2025-12-20', amount: '$28,000', status: 'Pending' },
              ].map((po) => (
                <TableRow key={po.id}>
                  <TableCell className="font-medium">{po.id}</TableCell>
                  <TableCell>{po.supplier}</TableCell>
                  <TableCell>{po.date}</TableCell>
                  <TableCell>{po.amount}</TableCell>
                  <TableCell>
                    <Badge variant={po.status === 'Delivered' ? 'secondary' : po.status === 'Shipped' ? 'outline' : 'default'}>
                      {po.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
