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
  MousePointer2,
  CheckCircle2,
  Star,
  Activity,
  Layers,
  Cpu,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LiveStats } from '@/components/LiveStats';
import { ModeToggle } from '@/components/ModeToggle';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-100 selection:text-indigo-700 transition-colors duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5"
          >
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-400">
              SCM AI
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-bold text-slate-500 dark:text-slate-400">
            <Link href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</Link>
            <Link href="#solutions" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Solutions</Link>
            <Link href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">How it Works</Link>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <ModeToggle />
            <div className="hidden sm:block h-6 w-px bg-slate-100 dark:bg-slate-800" />
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" className="font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-slate-900 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-full px-8 py-6 font-bold text-base transition-all duration-300 shadow-xl hover:shadow-indigo-500/20 active:scale-95">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative pt-24 pb-40 overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 z-0 opacity-20 dark:opacity-[0.03]" 
            style={{ 
              backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} 
          />
          
          {/* Animated Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-indigo-200 dark:bg-indigo-600/30 rounded-full blur-[140px]" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.3, 0.15]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-200 dark:bg-blue-600/20 rounded-full blur-[140px]" 
            />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 mb-10 py-2 px-5 border border-indigo-100 dark:border-indigo-900/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-indigo-600 dark:text-indigo-400 font-bold tracking-tight shadow-sm rounded-full">
                <div className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                Next-Gen Supply Chain Intelligence
              </div>
              
              <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter text-slate-900 dark:text-white mb-10 leading-[0.85]">
                Master the <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 animate-gradient-x italic">
                  Unpredictable
                </span>
              </h1>
              
              <p className="text-xl md:text-3xl text-slate-500 dark:text-slate-400 mb-16 max-w-4xl mx-auto leading-tight font-medium">
                SCM AI leverages generative intelligence to anticipate disruptions, <br className="hidden md:block" />
                optimize logistics, and orchestrate your entire network in real-time.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-32">
                <Link href="/login">
                  <Button className="h-16 px-12 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold rounded-2xl shadow-2xl shadow-indigo-200 dark:shadow-none transition-all hover:-translate-y-1 hover:scale-105 active:scale-95">
                    Start Optimization <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="h-16 px-12 text-xl font-bold bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:border-slate-200 dark:hover:border-slate-700">
                    Watch Live Demo
                  </Button>
                </Link>
              </div>

              {/* Stats & Dashboard Preview Container */}
              <div className="relative max-w-6xl mx-auto">
                {/* Float elements for extra flair */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-12 -left-12 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 z-20 hidden lg:block"
                >
                  <Activity className="h-8 w-8 text-indigo-600" />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-12 -right-12 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 z-20 hidden lg:block"
                >
                  <BrainCircuit className="h-8 w-8 text-blue-600" />
                </motion.div>

                {/* Dashboard Mockup */}
                <div className="p-1.5 rounded-[3rem] bg-gradient-to-br from-indigo-100 via-slate-200 to-blue-100 dark:from-indigo-900/30 dark:via-slate-800/30 dark:to-blue-900/30 shadow-2xl overflow-hidden">
                  <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl rounded-[2.8rem] overflow-hidden border border-white/50 dark:border-slate-800/50">
                    <div className="p-10 border-b border-slate-100 dark:border-slate-800">
                       <LiveStats />
                    </div>
                    <div className="aspect-[16/9] relative group">
                      <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-900/50 flex flex-col p-8 gap-8">
                        <div className="grid grid-cols-4 gap-6">
                           {[1, 2, 3, 4].map(i => (
                             <div key={i} className="h-28 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm p-5 space-y-3">
                                <div className="h-4 w-1/3 bg-slate-100 dark:bg-slate-700 rounded" />
                                <div className="h-8 w-2/3 bg-slate-50 dark:bg-slate-700/50 rounded" />
                             </div>
                           ))}
                        </div>
                        <div className="flex-1 flex gap-6">
                           <div className="flex-1 bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm p-10 flex flex-col">
                              <div className="flex items-center justify-between mb-8">
                                <div className="h-8 w-48 bg-slate-50 dark:bg-slate-700 rounded-xl" />
                                <div className="h-8 w-24 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl" />
                              </div>
                              <div className="flex-1 w-full bg-slate-50/50 dark:bg-slate-900/30 rounded-3xl relative overflow-hidden flex items-end gap-3 px-8 pb-4">
                                 {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60, 75, 40].map((h, i) => (
                                   <motion.div 
                                     key={i}
                                     initial={{ height: 0 }}
                                     whileInView={{ height: `${h}%` }}
                                     transition={{ delay: i * 0.05, duration: 1 }}
                                     className="flex-1 bg-indigo-500/20 dark:bg-indigo-500/40 rounded-t-xl border-t-4 border-indigo-500" 
                                   />
                                 ))}
                              </div>
                           </div>
                           <div className="w-80 bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm p-8 space-y-6">
                              <div className="h-8 w-full bg-slate-50 dark:bg-slate-700 rounded-xl" />
                              <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map(i => (
                                  <div key={i} className="h-10 w-full bg-slate-50/50 dark:bg-slate-700/50 rounded-lg flex items-center px-4">
                                    <div className="h-3 w-3 rounded-full bg-indigo-400 mr-3" />
                                    <div className="h-3 w-1/2 bg-slate-100 dark:bg-slate-600 rounded" />
                                  </div>
                                ))}
                              </div>
                           </div>
                        </div>
                      </div>
                      
                      {/* Interaction Overlay */}
                      <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center backdrop-blur-md">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link href="/dashboard" className="bg-white text-indigo-600 px-10 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 text-xl font-black">
                            <MousePointer2 className="h-6 w-6" /> Explore Dashboard
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Logo Cloud - Social Proof */}
        <section className="py-20 border-y border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
             <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-12">Trusted by Global Leaders</p>
             <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 dark:opacity-20 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-3xl font-black italic">LogiSync</span>
                <span className="text-3xl font-black">SwiftFreight</span>
                <span className="text-3xl font-black lowercase tracking-tighter">ChainLink</span>
                <span className="text-3xl font-black uppercase tracking-widest">GlobalEX</span>
                <span className="text-3xl font-black tracking-widest underline decoration-4 decoration-indigo-500">NEXUS</span>
             </div>
          </div>
        </section>

        {/* Features Grid - Bento Style */}
        <section id="features" className="py-40 bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-24">
              <Badge className="bg-indigo-600 dark:bg-indigo-500 text-white font-black px-4 py-1.5 mb-6">CORE CAPABILITIES</Badge>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-[0.9]">
                The Operating System for <span className="text-indigo-600 italic">Modern</span> Logistics
              </h2>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
                We've combined the power of Generative AI with advanced supply chain optimization algorithms to give you unparalleled control.
              </p>
            </div>

            <div className="grid md:grid-cols-6 gap-6">
              {/* Featured Feature */}
              <div className="md:col-span-4 bg-white dark:bg-slate-800 rounded-[3rem] p-12 border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-20 transition-opacity">
                   <BrainCircuit className="h-64 w-64 text-indigo-600" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="h-14 w-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-indigo-200 dark:shadow-none">
                      <Sparkles className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Generative AI Copilot</h3>
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-lg mb-12">
                      Conversational intelligence that understands your network. Ask "How can we reduce lead times in Asia by 15%?" and get actionable strategies instantly.
                    </p>
                  </div>
                  <Link href="/ai-assistant">
                    <Button variant="link" className="p-0 h-auto text-indigo-600 dark:text-indigo-400 text-lg font-black group-hover:gap-4 transition-all">
                      Try the assistant <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Smaller Feature */}
              <div className="md:col-span-2 bg-indigo-600 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute -bottom-10 -right-10 opacity-20 group-hover:scale-110 transition-transform duration-500">
                    <TrendingUp className="h-48 w-48 text-white" />
                 </div>
                 <h3 className="text-3xl font-black mb-4 tracking-tight">Predictive <br/> Forecasting</h3>
                 <p className="font-medium opacity-80 mb-10 text-lg">Deep learning models that adjust to market volatility automatically.</p>
                 <Link href="/forecasting">
                    <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                 </Link>
              </div>

              {/* Grid 2 */}
              <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-700 shadow-sm group">
                 <div className="h-12 w-12 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Package className="h-6 w-6" />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Autonomous Stock</h3>
                 <p className="text-slate-500 dark:text-slate-400 font-medium">Self-healing systems that initiate reorders based on risk, not just levels.</p>
              </div>

              <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-700 shadow-sm group">
                 <div className="h-12 w-12 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Truck className="h-6 w-6" />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Digital Twin</h3>
                 <p className="text-slate-500 dark:text-slate-400 font-medium">Real-time map of your global chain with simulated 'what-if' scenarios.</p>
              </div>

              <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-700 shadow-sm group">
                 <div className="h-12 w-12 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Globe className="h-6 w-6" />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Unified Network</h3>
                 <p className="text-slate-500 dark:text-slate-400 font-medium">Visibility from tier-2 suppliers to the final mile customer delivery.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Scroll Progress Style */}
        <section id="how-it-works" className="py-40 bg-white dark:bg-slate-950">
           <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-24 items-center">
                 <div className="flex-1 space-y-12">
                    <div className="space-y-4">
                       <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
                          From Chaos to <span className="text-indigo-600 italic">Clarity</span> in Weeks
                       </h2>
                       <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-lg">
                          Our implementation process is designed to deliver immediate ROI without disrupting existing operations.
                       </p>
                    </div>
                    
                    <div className="space-y-10">
                       <HowItem 
                          num="01" 
                          title="Connect Data" 
                          desc="Ingest data from ERPs, WMS, and CRMs via our secure, high-speed API connectors."
                          active
                       />
                       <HowItem 
                          num="02" 
                          title="AI Training" 
                          desc="Our models ingest your historical data to understand lead times, seasonality, and risk patterns."
                       />
                       <HowItem 
                          num="03" 
                          title="Orchestrate" 
                          desc="Start receiving AI-driven insights and automated workflows across your entire network."
                       />
                    </div>
                 </div>
                 
                 <div className="flex-1 w-full max-w-2xl relative">
                    <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-[4rem] border border-slate-100 dark:border-slate-800 overflow-hidden p-12">
                       <div className="w-full h-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[3rem] flex items-center justify-center relative">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 p-20"
                          >
                             <div className="w-full h-full border-2 border-indigo-200/50 dark:border-indigo-500/20 rounded-full" />
                          </motion.div>
                          
                          <div className="relative z-10 flex flex-col items-center gap-8">
                             <div className="h-32 w-32 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-300 dark:shadow-none">
                                <Cpu className="h-16 w-16 text-white" />
                             </div>
                             <div className="text-center">
                                <div className="text-2xl font-black text-slate-900 dark:text-white">SCM AI CORE</div>
                                <div className="text-slate-500 font-bold tracking-widest text-xs mt-2">PROCESSING REAL-TIME DATA</div>
                             </div>
                             <div className="flex gap-4">
                                <div className="h-4 w-4 rounded-full bg-emerald-500 animate-pulse" />
                                <div className="h-4 w-4 rounded-full bg-indigo-500 animate-pulse delay-75" />
                                <div className="h-4 w-4 rounded-full bg-blue-500 animate-pulse delay-150" />
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Value Prop / Reasoning Engine */}
        <section id="solutions" className="py-40 bg-slate-900 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent" />
           <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-24">
                 <div className="flex-1 space-y-12">
                    <h2 className="text-5xl md:text-8xl font-black leading-[0.85] tracking-tighter">
                       Disruptions are <br />
                       <span className="text-indigo-500 italic">Inevitable.</span> <br />
                       Your response <br />
                       is our <span className="underline decoration-indigo-500 underline-offset-8">Priority.</span>
                    </h2>
                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <Zap className="h-8 w-8 text-indigo-500" />
                          <h4 className="text-2xl font-black">4s Latency</h4>
                          <p className="text-slate-400 font-medium">Real-time processing across 50,000+ global data points.</p>
                       </div>
                       <div className="space-y-4">
                          <Layers className="h-8 w-8 text-blue-500" />
                          <h4 className="text-2xl font-black">Multi-tier</h4>
                          <p className="text-slate-400 font-medium">Visibility deep into tier-3 supplier networks and ports.</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="flex-1 w-full max-w-xl">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-slate-800/50 backdrop-blur-3xl rounded-[3rem] p-12 border border-slate-700 shadow-2xl relative overflow-hidden group"
                    >
                      <div className="flex items-center gap-4 mb-10">
                         <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
                            <BrainCircuit className="h-7 w-7 text-white" />
                         </div>
                         <div>
                            <div className="font-black text-lg">AI Reasoning Engine</div>
                            <div className="text-indigo-400 text-xs font-black tracking-widest uppercase">Scenario Analysis Active</div>
                         </div>
                      </div>
                      
                      <div className="space-y-8">
                         <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700/50">
                            <p className="text-xl italic font-medium text-slate-300">"Panama Canal drought is slowing vessel throughput. What's the impact on our LAX port arrivals for November?"</p>
                         </div>
                         
                         <div className="flex gap-6">
                            <div className="h-12 w-12 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center font-black text-sm ring-4 ring-indigo-600/20">AI</div>
                            <div className="bg-white text-slate-900 rounded-[2rem] p-8 shadow-2xl space-y-4">
                              <p className="text-lg leading-relaxed font-bold">
                                <strong>High Alert:</strong> Expected 8-day delay for 15 inbound containers. Estimated stockout on SKU-782 in 12 days.
                              </p>
                              <div className="h-px bg-slate-100" />
                              <div className="space-y-3">
                                <div className="flex items-center gap-3 text-indigo-600 font-black text-sm">
                                  <CheckCircle2 className="h-5 w-5" /> RE-ROUTE VIA LONG BEACH PORT
                                </div>
                                <div className="flex items-center gap-3 text-indigo-600 font-black text-sm">
                                  <CheckCircle2 className="h-5 w-5" /> AIR FREIGHT 500 UNITS OF SKU-782
                                </div>
                              </div>
                            </div>
                         </div>
                      </div>
                    </motion.div>
                 </div>
              </div>
           </div>
        </section>

        {/* Testimonials */}
        <section className="py-40 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-24 tracking-tighter">Why Supply Chain Leaders <br/> <span className="text-indigo-600">Switch to SCM AI</span></h2>
            <div className="grid md:grid-cols-3 gap-10 text-left">
              <TestimonialCard 
                quote="The generative insights changed how our team works. We're no longer reacting to crises; we're preventing them."
                author="Sarah Jenkins"
                role="VP of Supply Chain, LogiSync"
              />
              <TestimonialCard 
                quote="Implementation was seamless. We connected our SAP data and had our first predictive model running in 48 hours."
                author="Marcus Thorne"
                role="Director of Logistics, SwiftFreight"
              />
              <TestimonialCard 
                quote="SCM AI paid for itself in the first quarter just by optimizing our safety stock levels during the holiday surge."
                author="Elena Rodriguez"
                role="COO, GlobalEX"
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 bg-white dark:bg-slate-950 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="bg-indigo-600 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 to-transparent opacity-50" />
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9]">
                    Ready to Build a <br />
                    <span className="italic">Resilient</span> Future?
                  </h2>
                  <p className="text-xl md:text-2xl opacity-80 mb-16 max-w-2xl mx-auto font-medium">
                    Join the world's most innovative supply chains. Start your 14-day premium trial today.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link href="/login">
                      <Button className="h-20 px-16 bg-white text-indigo-600 hover:bg-slate-50 text-2xl font-black rounded-3xl shadow-2xl transition-all hover:-translate-y-2 active:scale-95">
                        Get Started Free
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button variant="ghost" className="h-20 px-16 text-2xl font-black rounded-3xl border-2 border-white/30 hover:bg-white/10 transition-all">
                        Talk to Sales
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-32 text-slate-500 dark:text-slate-400 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
            <div className="col-span-1 md:col-span-2 space-y-10">
               <div className="flex items-center gap-3">
                  <div className="bg-indigo-600 p-2.5 rounded-2xl">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">SCM AI</span>
               </div>
               <p className="max-w-md text-xl font-medium leading-relaxed">
                  The world's first generative supply chain management platform designed for the modern enterprise.
               </p>
               <div className="flex gap-6">
                 {[1, 2, 3, 4].map(i => (
                   <div key={i} className="h-12 w-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-center hover:text-indigo-600 transition-colors cursor-pointer">
                      <Star className="h-5 w-5" />
                   </div>
                 ))}
               </div>
            </div>
            <div className="space-y-10">
               <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm">Product</h4>
               <ul className="space-y-6 font-bold text-lg">
                  <li><Link href="/forecasting" className="hover:text-indigo-600 transition-colors">Forecasting</Link></li>
                  <li><Link href="/inventory" className="hover:text-indigo-600 transition-colors">Inventory</Link></li>
                  <li><Link href="/logistics" className="hover:text-indigo-600 transition-colors">Logistics</Link></li>
                  <li><Link href="/ai-assistant" className="hover:text-indigo-600 transition-colors">AI Assistant</Link></li>
               </ul>
            </div>
            <div className="space-y-10">
               <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm">Resources</h4>
               <ul className="space-y-6 font-bold text-lg">
                  <li><Link href="#" className="hover:text-indigo-600 transition-colors">API Docs</Link></li>
                  <li><Link href="#" className="hover:text-indigo-600 transition-colors">Case Studies</Link></li>
                  <li><Link href="#" className="hover:text-indigo-600 transition-colors">Safety</Link></li>
                  <li><Link href="#" className="hover:text-indigo-600 transition-colors">Support</Link></li>
               </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-slate-200 dark:border-slate-800 gap-10">
            <p className="font-bold">© 2025 SCM AI Platform. All rights reserved.</p>
            <div className="flex gap-12 font-bold uppercase tracking-widest text-xs">
              <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">LinkedIn</Link>
              <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Instagram</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HowItem({ num, title, desc, active = false }: { num: string, title: string, desc: string, active?: boolean }) {
  return (
    <div className={`flex gap-8 group ${active ? 'opacity-100' : 'opacity-40 hover:opacity-100 transition-opacity'}`}>
       <div className="text-4xl font-black text-indigo-600/20 group-hover:text-indigo-600 transition-colors">{num}</div>
       <div>
          <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{title}</h4>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
       </div>
    </div>
  );
}

function TestimonialCard({ quote, author, role }: { quote: string, author: string, role: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 relative group hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl transition-all duration-500">
       <Star className="h-8 w-8 text-indigo-600 mb-8 fill-indigo-600/20" />
       <p className="text-xl font-medium text-slate-900 dark:text-white mb-10 leading-relaxed italic">"{quote}"</p>
       <div>
          <div className="font-black text-slate-900 dark:text-white">{author}</div>
          <div className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest">{role}</div>
       </div>
    </div>
  );
}
