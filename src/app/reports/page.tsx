'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, PieChart, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-slate-500">Generate and export comprehensive supply chain reports.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Download className="mr-2 h-4 w-4" /> Export All Data
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ReportCard 
          title="Inventory Accuracy" 
          description="Monthly audit of physical vs system stock."
          icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
        />
        <ReportCard 
          title="Supplier Performance" 
          description="On-time delivery and quality metrics."
          icon={<TrendingUp className="h-5 w-5 text-emerald-600" />}
        />
        <ReportCard 
          title="Cost Analysis" 
          description="Breakdown of logistics and procurement spend."
          icon={<PieChart className="h-5 w-5 text-indigo-600" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>View and download your recently generated reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Q4 Logistics Optimization.pdf', date: '2025-12-28', size: '2.4 MB' },
              { name: 'Inventory Health Audit - Dec.csv', date: '2025-12-20', size: '1.1 MB' },
              { name: 'Supplier Risk Assessment.pdf', date: '2025-12-15', size: '4.8 MB' },
            ].map((report, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{report.name}</p>
                    <p className="text-xs text-slate-500">{report.date} • {report.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Download</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ReportCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <Card className="hover:border-indigo-200 transition-colors cursor-pointer group">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="link" className="p-0 h-auto text-indigo-600 group-hover:translate-x-1 transition-transform">
          Generate Report →
        </Button>
      </CardContent>
    </Card>
  );
}
