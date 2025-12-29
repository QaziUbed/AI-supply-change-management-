'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  BarChart3, 
  Package, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  BrainCircuit,
  Globe,
  Zap,
  ChevronRight,
  MousePointer2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LiveStats } from '@/components/LiveStats';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="bg-indigo-600 p-1.5 rounded-xl shadow-indigo-200 shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600">SCM AI</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
            <Link href="#features" className="hover:text-indigo-600 transition-colors">Features</Link>
            <Link href="#solutions" className="hover:text-indigo-600 transition-colors">Solutions</Link>
            <Link href="#about" className="hover:text-indigo-600 transition-colors">About</Link>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex font-bold text-slate-600 hover:text-indigo-600">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-slate-900 hover:bg-indigo-600 text-white rounded-full px-6 transition-all duration-300 shadow-lg hover:shadow-indigo-100">Get Started</Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          {/* Abstract background shapes */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none -z-10">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.4, 0.3]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-100/40 rounded-full blur-[120px]" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[120px]" 
            />
          </div>

          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-8 py-1.5 px-4 border-indigo-100 bg-white/50 backdrop-blur-sm text-indigo-600 font-bold tracking-wide animate-in fade-in slide-in-from-bottom-3 shadow-sm rounded-full">
                <Sparkles className="h-3.5 w-3.5 mr-2 fill-indigo-600" />
                ENTERPRISE GRADE AI FOR LOGISTICS
              </Badge>
              <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 max-w-5xl mx-auto leading-[0.95] md:leading-[1]">
                Master Your Supply Chain with <span className="text-indigo-600 italic">Predictive</span> Intelligence
              </h1>
              <p className="text-lg md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                Go beyond simple tracking. SCM AI leverages generative models to forecast disruptions before they happen, saving millions in operational costs.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
                <Link href="/login">
                  <Button size="lg" className="h-14 px-10 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold rounded-2xl shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1">
                    Start Optimizing <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold bg-white border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-all hover:border-slate-200">
                    Explore Demo
                  </Button>
                </Link>
              </div>

              {/* Live Backend Connection Section */}
              <div className="max-w-4xl mx-auto mb-32 p-1 rounded-[2.5rem] bg-gradient-to-br from-indigo-50 to-slate-100 shadow-inner">
                <div className="bg-white/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.4rem]">
                  <LiveStats />
                </div>
              </div>
            </motion.div>

            {/* Mock Dashboard Preview */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative mx-auto max-w-6xl rounded-[2rem] border-8 border-slate-100 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden group"
            >
              <div className="aspect-[16/10] bg-slate-50 flex flex-col items-center justify-center overflow-hidden">
                <div className="w-full flex justify-between items-center p-6 border-b bg-white">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-slate-200" />
                    <div className="h-3 w-3 rounded-full bg-slate-200" />
                    <div className="h-3 w-3 rounded-full bg-slate-200" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-32 bg-slate-100 rounded-lg animate-pulse" />
                    <div className="h-8 w-8 bg-slate-100 rounded-full animate-pulse" />
                  </div>
                </div>
                
                <div className="p-8 w-full h-full flex flex-col gap-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="h-32 bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                       <div className="h-4 w-1/2 bg-slate-50 rounded mb-2" />
                       <div className="h-8 w-3/4 bg-slate-50 rounded" />
                    </div>
                    <div className="h-32 bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                       <div className="h-4 w-1/2 bg-slate-50 rounded mb-2" />
                       <div className="h-8 w-3/4 bg-slate-50 rounded" />
                    </div>
                    <div className="h-32 bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                       <div className="h-4 w-1/2 bg-slate-50 rounded mb-2" />
                       <div className="h-8 w-3/4 bg-slate-50 rounded" />
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col gap-4">
                    <div className="h-8 w-48 bg-slate-50 rounded" />
                    <div className="flex-1 w-full bg-slate-50/50 rounded-2xl relative overflow-hidden">
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-[80%] h-[60%] flex items-end gap-2">
                             {[40, 70, 45, 90, 65, 80, 50, 85, 95].map((h, i) => (
                               <motion.div 
                                 key={i}
                                 initial={{ height: 0 }}
                                 whileInView={{ height: `${h}%` }}
                                 transition={{ delay: i * 0.05, duration: 1 }}
                                 className="flex-1 bg-indigo-500/20 rounded-t-lg border-t-4 border-indigo-500" 
                               />
                             ))}
                          </div>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                <Link href="/dashboard" className="w-full h-full flex items-center justify-center">
                   <div className="relative">
                      <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="bg-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-indigo-600"
                      >
                         <MousePointer2 className="h-5 w-5" /> Launch Dashboard
                      </motion.div>
                   </div>
                </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-24">
              <Badge className="bg-indigo-50 text-indigo-600 font-bold mb-4 hover:bg-indigo-100 transition-colors">THE SUITE</Badge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Supply Chain Superpowers</h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                Stop managing spreadsheets. Start managing possibilities with our integrated AI toolset.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              <FeatureCard 
                icon={<BrainCircuit className="h-7 w-7 text-indigo-600" />}
                title="AI Copilot"
                description="Conversational interface that queries your real-time data to solve complex logistics riddles."
                index={0}
                href="/ai-assistant"
              />
              <FeatureCard 
                icon={<BarChart3 className="h-7 w-7 text-indigo-600" />}
                title="Smart Forecast"
                description="Deep learning models that adjust to market volatility and seasonal shifts automatically."
                index={1}
                href="/forecasting"
              />
              <FeatureCard 
                icon={<Package className="h-7 w-7 text-indigo-600" />}
                title="Autonomous Stock"
                description="Self-healing inventory systems that initiate reorders based on risk, not just levels."
                index={2}
                href="/inventory"
              />
              <FeatureCard 
                icon={<Truck className="h-7 w-7 text-indigo-600" />}
                title="Digital Twin"
                description="Real-time map of your global supply chain with simulated 'what-if' scenarios."
                index={3}
                href="/logistics"
              />
            </div>
          </div>
        </section>

        {/* Value Prop */}
        <section id="solutions" className="py-32 bg-slate-50 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-24">
              <div className="flex-1 space-y-12">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                  Disruptions are <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Inevitable.</span> <br />
                  Our response isn't.
                </h2>
                <div className="space-y-10">
                  <ValueItem 
                    icon={<Zap className="h-6 w-6 text-white" />}
                    title="Hyper-Speed Processing"
                    description="Analyze 10,000+ SKUs across 50 locations in under 4 seconds for immediate action."
                  />
                  <ValueItem 
                    icon={<Globe className="h-6 w-6 text-white" />}
                    title="Border-to-Border View"
                    description="Unified visibility from tier-2 suppliers to the final mile customer delivery."
                  />
                  <ValueItem 
                    icon={<ShieldCheck className="h-6 w-6 text-white" />}
                    title="Resilience First"
                    description="Built-in risk scoring for every route and supplier in your global network."
                  />
                </div>
              </div>
              <div className="flex-1 w-full max-w-xl">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                       <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center">
                          <BrainCircuit className="h-6 w-6 text-white" />
                       </div>
                       <div className="font-bold text-sm tracking-widest text-indigo-400 uppercase">AI REASONING ENGINE</div>
                    </div>
                    
                    <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 mb-8 border border-slate-700/50 group-hover:border-indigo-500/50 transition-colors">
                      <p className="text-lg italic font-medium text-slate-300">"Suez canal delays are increasing. How does this affect our Q3 iPhone 16 stock in Europe?"</p>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center font-bold text-xs ring-4 ring-indigo-600/20">AI</div>
                      <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-2xl">
                        <p className="text-base leading-relaxed font-medium">
                          <strong>Analysis:</strong> High Impact. 12,000 units delayed by 14 days. <br/><br/>
                          <span className="text-indigo-600 font-bold">Recommendation:</span> Shift 2,500 units to air freight from Shenzhen factory. ROI: 4.2x vs stockout loss.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-40 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-10 tracking-tight">The future of logistics is <br/> <span className="text-indigo-600">Generative.</span></h2>
              <p className="text-slate-500 mb-14 max-w-2xl mx-auto text-xl font-medium">
                Don't get left behind by manual processes. Join 500+ enterprises optimizing their chains with SCM AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/login">
                  <Button size="lg" className="h-16 px-12 bg-indigo-600 hover:bg-indigo-700 text-xl font-bold rounded-2xl shadow-2xl shadow-indigo-100 transition-all hover:-translate-y-1">
                    Get Started for Free
                  </Button>
                </Link>
                <Link href="mailto:sales@scmai.com">
                  <Button size="lg" variant="ghost" className="h-16 px-12 text-xl font-bold rounded-2xl border-2 border-slate-100 hover:bg-slate-50">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-20 text-slate-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2 space-y-6">
               <div className="flex items-center gap-2">
                  <div className="bg-indigo-600 p-1.5 rounded-xl">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-2xl font-black text-slate-900 tracking-tight">SCM AI</span>
               </div>
               <p className="max-w-sm text-lg font-medium">The world's first generative supply chain management platform for the modern enterprise.</p>
            </div>
            <div className="space-y-6">
               <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Product</h4>
               <ul className="space-y-4 font-medium">
                  <li><Link href="#" className="hover:text-indigo-600 transition-colors">Forecasting</Link></li>
                  <li><Link href="#" className="hover:text-indigo-600 transition-colors">Inventory</Link></li>
                  <li><Link href="#" className="hover:text-indigo-600 transition-colors">Logistics</Link></li>
               </ul>
            </div>
            <div className="space-y-6">
               <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Company</h4>
               <ul className="space-y-4 font-medium">
                  <li><Link href="#" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
                  <li><Link href="#" className="hover:text-indigo-600 transition-colors">Careers</Link></li>
                  <li><Link href="#" className="hover:text-indigo-600 transition-colors">Privacy</Link></li>
               </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-slate-100 gap-8">
            <p className="text-sm font-semibold">© 2025 SCM AI Platform. All rights reserved.</p>
            <div className="flex gap-8 text-sm font-bold">
              <Link href="#" className="hover:text-slate-900 transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-slate-900 transition-colors">LinkedIn</Link>
              <Link href="#" className="hover:text-slate-900 transition-colors">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, index, href }: { icon: React.ReactNode, title: string, description: string, index: number, href: string }) {
  return (
    <Link href={href} className="block">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className="p-10 h-full rounded-[2rem] border border-slate-100 bg-white hover:border-indigo-100 hover:shadow-[0_24px_48px_-12px_rgba(79,70,229,0.08)] transition-all group relative overflow-hidden"
      >
        <div className="mb-8 bg-slate-50 p-4 rounded-2xl w-fit group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{title}</h3>
        <p className="text-slate-500 text-lg leading-relaxed font-medium mb-8">{description}</p>
        <div className="flex items-center text-indigo-600 font-bold text-sm tracking-wide group-hover:translate-x-2 transition-transform">
          EXPLORE <ChevronRight className="ml-1 h-4 w-4" />
        </div>
      </motion.div>
    </Link>
  );
}

function ValueItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="mt-1 bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-100 h-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-black text-slate-900 mb-2 tracking-tight">{title}</h4>
        <p className="text-slate-500 text-lg font-medium leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

