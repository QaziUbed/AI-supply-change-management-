'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, MapPin, Navigation, Clock, AlertCircle } from 'lucide-react';

export default function LogisticsPage() {
  const shipments = [
    { id: 'SHP-9021', status: 'In Transit', origin: 'Shenzhen, CN', destination: 'Chicago, US', eta: '2025-12-30', progress: 65, carrier: 'FedEx' },
    { id: 'SHP-8812', status: 'Delivered', origin: 'London, UK', destination: 'Rotterdam, NL', eta: '2025-12-28', progress: 100, carrier: 'DHL' },
    { id: 'SHP-7741', status: 'Delayed', origin: 'Los Angeles, US', destination: 'Tokyo, JP', eta: '2026-01-05', progress: 40, carrier: 'Maersk' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Logistics Optimization</h1>
          <p className="text-slate-500">Track shipments and optimize distribution routes.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Navigation className="mr-2 h-4 w-4" /> Route Optimizer
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Shipments</CardTitle>
            <CardDescription>Real-time tracking of global freight movements.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {shipments.map((shipment) => (
                <div key={shipment.id} className="border rounded-xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-lg">
                        <Truck className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-bold">{shipment.id}</p>
                        <p className="text-xs text-slate-500">{shipment.carrier}</p>
                      </div>
                    </div>
                    <Badge variant={shipment.status === 'Delayed' ? 'destructive' : shipment.status === 'Delivered' ? 'secondary' : 'default'}>
                      {shipment.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-[10px] uppercase text-slate-500 font-bold">Origin</p>
                        <p className="text-sm">{shipment.origin}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-indigo-500 mt-0.5" />
                      <div>
                        <p className="text-[10px] uppercase text-slate-500 font-bold">Destination</p>
                        <p className="text-sm">{shipment.destination}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-bold">{shipment.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${shipment.status === 'Delayed' ? 'bg-amber-500' : 'bg-indigo-600'}`}
                        style={{ width: `${shipment.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      <span>ETA: {shipment.eta}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-indigo-600 text-xs">Full Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Logistics Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 p-3 rounded-lg bg-indigo-50 border border-indigo-100">
                <AlertCircle className="h-5 w-5 text-indigo-600 shrink-0" />
                <p className="text-xs text-indigo-700 leading-relaxed">
                  Weather alert in Pacific NorthWest may cause 24h delay for 4 incoming shipments. 
                  <br /><strong>Recommendation:</strong> Divert to Houston Hub.
                </p>
              </div>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-xs">
                Apply AI Rerouting
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
