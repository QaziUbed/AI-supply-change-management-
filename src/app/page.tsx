'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  TrendingUp,
  MessageSquare,
  FileText,
  Bell,
  Shield,
  Eye,
  Route,
  Calendar,
  Users,
  Target,
  Lightbulb,
  Play,
  ArrowUpRight,
  CircleDot,
  Boxes,
  ClipboardList,
  MapPin,
  Clock,
  AlertTriangle,
  Bot,
  Lock,
  Scale,
  Network
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ModeToggle } from '@/components/ModeToggle';
import { cn } from '@/lib/utils';
import { AIChatWidget } from '@/components/ai/AIChatWidget';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [liveMetric, setLiveMetric] = useState(94.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetric(prev => {
        const change = (Math.random() - 0.5) * 0.4;
        return Math.max(90, Math.min(99, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const coreCapabilities = [
    {
      icon: TrendingUp,
      title: "Demand Forecasting",
      subtitle: "Predictive Intelligence",
      description: "Generate accurate demand forecasts using historical sales, seasonal trends, and external factors like weather, events, and market signals.",
      color: "from-blue-500 to-teal-600",
      metrics: ["94.2% Accuracy", "30-day Horizon", "External Factors"],
      demo: "AI analyzing 2.4M data points to predict Q1 demand surge..."
    },
    {
      icon: Package,
      title: "Inventory Optimization",
      subtitle: "Smart Stock Management",
      description: "Recommend optimal inventory levels to minimize stockouts and overstocking using AI-driven safety stock calculations and demand sensing.",
      color: "from-emerald-500 to-teal-600",
      metrics: ["23% Less Stockouts", "18% Cost Reduction", "Dynamic Reorder"],
      demo: "Calculating optimal safety stock for 847 SKUs across 12 warehouses..."
    },
    {
      icon: ClipboardList,
      title: "Procurement Automation",
      subtitle: "AI-Generated Plans",
      description: "Automatically generate procurement plans, replenishment schedules, and supplier recommendations based on lead times and risk profiles.",
      color: "from-cyan-500 to-teal-600",
      metrics: ["Auto PO Generation", "Supplier Scoring", "Risk Assessment"],
      demo: "Generating Q2 procurement plan with 34 supplier recommendations..."
    },
    {
      icon: Route,
      title: "Logistics Optimization",
      subtitle: "Real-Time Routing",
      description: "Provide real-time insights for logistics optimization, including AI-powered route planning, delivery timeline predictions, and disruption alerts.",
      color: "from-amber-500 to-orange-600",
      metrics: ["15% Faster Delivery", "Route Optimization", "ETA Prediction"],
      demo: "Rerouting 23 shipments to avoid Pacific Northwest weather delay..."
    },
    {
      icon: MessageSquare,
      title: "Natural Language Interface",
      subtitle: "Conversational AI",
      description: "Use natural language to generate reports, alerts, and explanations for decision-makers. Ask questions in plain English and get actionable insights.",
      color: "from-pink-500 to-rose-600",
      metrics: ["Voice & Text", "Auto Reports", "Explainable AI"],
      demo: '"Why did we stockout on SKU-782?" → Generating root cause analysis...'
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      subtitle: "Scalable & Secure",
      description: "Ensure scalability, data security, and explainability for enterprise adoption with SOC 2 compliance, audit trails, and transparent AI reasoning.",
      color: "from-slate-500 to-zinc-600",
      metrics: ["SOC 2 Type II", "Full Audit Trail", "GDPR Compliant"],
      demo: "All AI decisions logged with explainable reasoning chains..."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-teal-100 selection:text-teal-700 transition-colors duration-500 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-100/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl blur-lg opacity-50" />
              <div className="relative bg-gradient-to-r from-teal-600 to-cyan-600 p-2.5 rounded-2xl shadow-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600">
                SCM AI
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase -mt-1">Generative Intelligence</span>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-500 dark:text-slate-400">
            <Link href="#capabilities" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Capabilities</Link>
            <Link href="#how-it-works" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">How It Works</Link>
            <Link href="#demo" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Live Demo</Link>
            <Link href="#enterprise" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Enterprise</Link>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <ModeToggle />
            <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-800" />
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" className="font-bold text-slate-600 dark:text-slate-400 hover:text-teal-600">
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-full px-8 py-6 font-bold text-base transition-all duration-300 shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 active:scale-95">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      <main className="flex-1 pt-20">
        {/* Hero Section - Completely Redesigned */}
        <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                rotate: [0, 90, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-gradient-to-r from-teal-300 to-cyan-300 dark:from-teal-600/20 dark:to-cyan-600/20 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
                rotate: [90, 0, 90]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-gradient-to-r from-blue-300 to-cyan-300 dark:from-blue-600/20 dark:to-cyan-600/20 rounded-full blur-[120px]"
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              {/* Announcement Banner */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="inline-flex items-center gap-3 py-2 px-5 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 border border-teal-100 dark:border-teal-800 rounded-full shadow-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                  </span>
                  <span className="text-sm font-bold text-teal-700 dark:text-teal-300">Generative AI-Powered Decision Support System</span>
                  <Badge className="bg-teal-600 text-white text-[10px] font-black">NEW</Badge>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter text-slate-900 dark:text-white mb-8 leading-[0.9]"
              >
                End-to-End Supply Chain
                <br />
                <span className="relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 animate-gradient-x">
                    Intelligence
                  </span>
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-4 -right-8 text-4xl"
                  >
                    ✨
                  </motion.span>
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
              >
                Predict demand. Optimize inventory. Generate procurement plans.
                <br className="hidden md:block" />
                <span className="text-teal-600 dark:text-teal-400 font-bold">All powered by Generative AI</span> with natural language interfaces.
              </motion.p>

              {/* Key Metrics Row */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-8 mb-12"
              >
                {[
                  { value: `${liveMetric.toFixed(1)}%`, label: "Forecast Accuracy", live: true },
                  { value: "23%", label: "Cost Reduction" },
                  { value: "4.2s", label: "AI Response Time" },
                  { value: "500+", label: "Enterprise Clients" }
                ].map((metric, i) => (
                  <div key={i} className="text-center group">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">{metric.value}</span>
                      {metric.live && (
                        <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-black rounded-full animate-pulse">LIVE</span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{metric.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
              >
                <Link href="/dashboard">
                  <Button className="h-16 px-10 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-lg font-bold rounded-2xl shadow-2xl shadow-teal-500/30 transition-all hover:-translate-y-1 hover:shadow-teal-500/50 active:scale-95 group">
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> Launch Dashboard
                  </Button>
                </Link>
                <Link href="/ai-assistant">
                  <Button variant="outline" className="h-16 px-10 text-lg font-bold bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:border-teal-300 dark:hover:border-teal-700 group">
                    <Bot className="mr-2 h-5 w-5 text-teal-600 group-hover:animate-bounce" /> Try AI Assistant
                  </Button>
                </Link>
              </motion.div>

              {/* Interactive Dashboard Preview */}
              <motion.div
                variants={itemVariants}
                className="relative max-w-6xl mx-auto"
              >
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-8 -left-8 z-20 hidden lg:block"
                >
                  <Card className="bg-white dark:bg-slate-900 shadow-2xl border-slate-100 dark:border-slate-800 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-500">Demand Forecast</p>
                        <p className="text-lg font-black text-slate-900 dark:text-white">+24% Q1</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-8 -right-8 z-20 hidden lg:block"
                >
                  <Card className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-2xl border-none rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <Bot className="h-8 w-8" />
                      <div>
                        <p className="text-xs font-bold opacity-80">AI Copilot</p>
                        <p className="text-sm font-black">Analyzing patterns...</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Main Dashboard Card */}
                <div className="relative p-2 rounded-[2.5rem] bg-gradient-to-br from-teal-100 via-cyan-100 to-teal-100 dark:from-teal-900/40 dark:via-cyan-900/40 dark:to-teal-900/40 shadow-2xl">
                  <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl rounded-[2.3rem] overflow-hidden border border-white/50 dark:border-slate-800/50">
                    {/* Mock Browser Header */}
                    <div className="flex items-center gap-2 px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-rose-400" />
                        <div className="h-3 w-3 rounded-full bg-amber-400" />
                        <div className="h-3 w-3 rounded-full bg-emerald-400" />
                      </div>
                      <div className="flex-1 flex justify-center">
                        <div className="px-4 py-1.5 bg-white dark:bg-slate-800 rounded-lg text-xs font-mono text-slate-500 border border-slate-200 dark:border-slate-700">
                          scm-ai.platform/dashboard
                        </div>
                      </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="p-8 grid grid-cols-12 gap-6 min-h-[500px]">
                      {/* Sidebar */}
                      <div className="col-span-2 space-y-4">
                        {['Dashboard', 'Forecasting', 'Inventory', 'Logistics', 'AI Chat'].map((item, i) => (
                          <div key={i} className={cn(
                            "h-10 rounded-xl flex items-center px-3 gap-2 text-xs font-bold transition-colors",
                            i === 0 ? "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300" : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                          )}>
                            <div className="h-2 w-2 rounded-full bg-current" />
                            <span className="hidden xl:inline">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Main Content */}
                      <div className="col-span-10 space-y-6">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-4 gap-4">
                          {[
                            { label: 'Forecast Accuracy', value: '94.2%', change: '+2.1%', color: 'indigo' },
                            { label: 'Stock Health', value: '87%', change: '+5%', color: 'emerald' },
                            { label: 'Order Fulfillment', value: '98.4%', change: '+1.2%', color: 'blue' },
                            { label: 'AI Insights Today', value: '127', change: '+34', color: 'violet' }
                          ].map((kpi, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700"
                            >
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{kpi.label}</p>
                              <div className="flex items-end justify-between">
                                <span className="text-2xl font-black text-slate-900 dark:text-white">{kpi.value}</span>
                                <span className={`text-xs font-bold text-${kpi.color}-600`}>{kpi.change}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Chart Area */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-sm font-black text-slate-700 dark:text-slate-300">Demand Forecast vs Actual</h3>
                              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px]">AI PREDICTION</Badge>
                            </div>
                            <div className="h-48 flex items-end gap-2">
                              {[65, 80, 55, 90, 70, 85, 60, 95, 75, 88, 92, 78].map((h, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ height: 0 }}
                                  animate={{ height: `${h}%` }}
                                  transition={{ delay: 0.8 + i * 0.05, duration: 0.8, ease: "easeOut" }}
                                  className="flex-1 bg-gradient-to-t from-teal-500 to-cyan-500 rounded-t-lg relative group cursor-pointer"
                                >
                                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap">
                                    {h * 100} units
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* AI Insights Panel */}
                          <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center gap-2 mb-4">
                              <BrainCircuit className="h-5 w-5" />
                              <h3 className="text-sm font-black">AI Insights</h3>
                            </div>
                            <div className="space-y-3">
                              {[
                                "Demand spike predicted for Week 12",
                                "Reorder SKU-445 within 48hrs",
                                "Route optimization saves $12K"
                              ].map((insight, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 1.2 + i * 0.2 }}
                                  className="flex items-start gap-2 text-xs bg-white/10 rounded-lg p-3"
                                >
                                  <Lightbulb className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                  <span className="font-medium">{insight}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Problem Statement Highlight */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 mb-6 text-xs font-black">THE CHALLENGE</Badge>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                Supply Chains Still Rely on Manual Coordination
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-10">
                Disconnected data sources, delayed decision-making, and reactive operations lead to
                <span className="text-rose-600 font-bold"> $1.1 trillion in annual losses</span> globally.
                It's time for AI-powered intelligence.
              </p>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: AlertTriangle, label: "Stockouts", value: "34%", desc: "miss opportunities" },
                  { icon: Clock, label: "Lead Times", value: "8+ days", desc: "average delays" },
                  { icon: FileText, label: "Manual Reports", value: "12hrs", desc: "per week wasted" },
                  { icon: Eye, label: "Visibility", value: "23%", desc: "blind spots" }
                ].map((stat, i) => (
                  <Card key={i} className="bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 rounded-2xl">
                    <CardContent className="p-6 text-center">
                      <stat.icon className="h-8 w-8 text-rose-500 mx-auto mb-3" />
                      <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</div>
                      <div className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">{stat.label}</div>
                      <div className="text-xs text-slate-500">{stat.desc}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6 Core Capabilities - Matching Problem Statement */}
        <section id="capabilities" className="py-32 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <Badge className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 mb-6 text-xs font-black">6 CORE CAPABILITIES</Badge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                Every Requirement. <span className="text-teal-600">Covered.</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 font-medium max-w-3xl mx-auto">
                Our platform addresses each aspect of the problem statement with purpose-built GenAI modules.
              </p>
            </motion.div>

            {/* Interactive Feature Showcase */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Feature List */}
              <div className="space-y-4">
                {coreCapabilities.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setActiveFeature(i)}
                    className={cn(
                      "p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2",
                      activeFeature === i
                        ? "bg-white dark:bg-slate-800 border-teal-500 shadow-xl shadow-teal-100 dark:shadow-none"
                        : "bg-slate-50 dark:bg-slate-900 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                        activeFeature === i
                          ? `bg-gradient-to-r ${feature.color} text-white shadow-lg`
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                      )}>
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg font-black text-slate-900 dark:text-white">{feature.title}</h3>
                          <ChevronRight className={cn(
                            "h-5 w-5 transition-transform",
                            activeFeature === i ? "rotate-90 text-teal-600" : "text-slate-400"
                          )} />
                        </div>
                        <p className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">{feature.subtitle}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>

                        <AnimatePresence>
                          {activeFeature === i && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700"
                            >
                              <div className="flex flex-wrap gap-2">
                                {feature.metrics.map((metric, j) => (
                                  <span key={j} className="px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-bold rounded-full">
                                    {metric}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Live Demo Panel */}
              <div className="sticky top-28">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "rounded-3xl p-8 text-white min-h-[600px] flex flex-col bg-gradient-to-br",
                    coreCapabilities[activeFeature].color
                  )}
                >
                  <div className="flex items-center gap-3 mb-8">
                    {React.createElement(coreCapabilities[activeFeature].icon, { className: "h-8 w-8" })}
                    <div>
                      <h3 className="text-2xl font-black">{coreCapabilities[activeFeature].title}</h3>
                      <p className="text-sm opacity-80 font-bold">{coreCapabilities[activeFeature].subtitle}</p>
                    </div>
                  </div>

                  {/* Demo Terminal */}
                  <div className="flex-1 bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 font-mono text-sm">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                      <div className="h-3 w-3 rounded-full bg-rose-400" />
                      <div className="h-3 w-3 rounded-full bg-amber-400" />
                      <div className="h-3 w-3 rounded-full bg-emerald-400" />
                      <span className="ml-4 text-xs text-white/50">SCM AI Terminal</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <span>$</span>
                        <motion.span
                          initial={{ width: 0 }}
                          animate={{ width: 'auto' }}
                          className="overflow-hidden whitespace-nowrap"
                        >
                          scm-ai analyze --module {coreCapabilities[activeFeature].title.toLowerCase().replace(' ', '-')}
                        </motion.span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-white/70"
                      >
                        <span className="text-teal-300">→</span> {coreCapabilities[activeFeature].demo}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex items-center gap-2 text-emerald-400"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Analysis complete. View results in dashboard.</span>
                      </motion.div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Link href="/dashboard" className="flex-1">
                      <Button className="w-full bg-white text-slate-900 hover:bg-white/90 font-bold rounded-xl">
                        View in Dashboard
                      </Button>
                    </Link>
                    <Link href="/ai-assistant">
                      <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 font-bold rounded-xl">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Natural Language Interface Demo */}
        <section id="demo" className="py-32 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/50 via-slate-900 to-slate-900" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-white/10 text-white border border-white/20 mb-6 text-xs font-black">NATURAL LANGUAGE AI</Badge>
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                Ask Anything. <span className="text-teal-400">Get Answers.</span>
              </h2>
              <p className="text-xl text-slate-400 font-medium max-w-3xl mx-auto">
                Our conversational AI understands supply chain context and generates reports, alerts, and explanations in plain English.
              </p>
            </motion.div>

            {/* Chat Demo */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700 overflow-hidden shadow-2xl">
                {/* Chat Header */}
                <div className="px-8 py-6 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg">SCM AI Assistant</h3>
                      <div className="flex items-center gap-2 text-sm text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        Online • Ready to help
                      </div>
                    </div>
                  </div>
                  <Link href="/ai-assistant">
                    <Button className="bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl">
                      Try Live <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                {/* Chat Messages */}
                <div className="p-8 space-y-6 min-h-[400px]">
                  {/* User Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-end"
                  >
                    <div className="bg-teal-600 text-white rounded-2xl rounded-tr-md px-6 py-4 max-w-lg">
                      <p className="font-medium">"Generate a demand forecast report for Q1 2025 and highlight any potential stockout risks"</p>
                    </div>
                  </motion.div>

                  {/* AI Response */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-4"
                  >
                    <div className="h-10 w-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex-shrink-0 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-slate-700/50 rounded-2xl rounded-tl-md px-6 py-5 max-w-2xl space-y-4">
                      <p className="text-slate-200 font-medium leading-relaxed">
                        I've analyzed your historical data and generated the Q1 2025 forecast. Here's what I found:
                      </p>

                      <div className="bg-slate-800/50 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-400">Total Predicted Demand</span>
                          <span className="text-xl font-black text-white">127,400 units</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full w-[78%] bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full" />
                        </div>
                        <p className="text-xs text-slate-400">78% confidence interval based on 24-month historical data</p>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                        <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-amber-300 font-bold text-sm">Stockout Risk Detected</p>
                          <p className="text-amber-200/70 text-sm">SKU-782 and SKU-1204 may face shortages in Week 8-10. Recommended action: Increase safety stock by 15%.</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700 rounded-lg text-xs font-bold">
                          <FileText className="mr-1 h-3 w-3" /> Export Report
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 rounded-lg text-xs font-bold">
                          <Bell className="mr-1 h-3 w-3" /> Set Alert
                        </Button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Follow-up */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-end"
                  >
                    <div className="bg-teal-600 text-white rounded-2xl rounded-tr-md px-6 py-4 max-w-lg">
                      <p className="font-medium">"Why do you predict a stockout for SKU-782?"</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                    className="flex gap-4"
                  >
                    <div className="h-10 w-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex-shrink-0 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-slate-700/50 rounded-2xl rounded-tl-md px-6 py-5 max-w-2xl">
                      <p className="text-slate-200 font-medium leading-relaxed">
                        <span className="text-teal-400 font-bold">Explainable AI reasoning:</span> SKU-782 shows a 34% demand increase pattern during late February (Valentine's season). Combined with current supplier lead time of 21 days and existing safety stock of only 850 units, the model predicts a 72% probability of stockout by Week 9.
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Input Area */}
                <div className="px-8 py-6 border-t border-slate-700 bg-slate-800/30">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Ask about demand, inventory, logistics, or procurement..."
                      className="flex-1 bg-slate-700/50 border border-slate-600 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 font-medium"
                    />
                    <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 rounded-xl px-8 font-bold">
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-32 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 mb-6 text-xs font-black">IMPLEMENTATION</Badge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                From Data to <span className="text-emerald-600">Decisions</span> in 3 Steps
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Connect Your Data",
                  description: "Ingest data from ERPs, WMS, CRMs, and external sources via secure API connectors. Our system handles structured and unstructured data.",
                  icon: Network,
                  color: "indigo"
                },
                {
                  step: "02",
                  title: "AI Training & Learning",
                  description: "Our GenAI models analyze historical patterns, seasonality, lead times, and risk factors to build your custom intelligence layer.",
                  icon: BrainCircuit,
                  color: "violet"
                },
                {
                  step: "03",
                  title: "Actionable Intelligence",
                  description: "Receive real-time forecasts, automated procurement plans, and natural language insights that drive better decisions.",
                  icon: Target,
                  color: "emerald"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative"
                >
                  <Card className="bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden h-full hover:shadow-2xl transition-all duration-500 group">
                    <CardContent className="p-8">
                      <div className={`h-16 w-16 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                      </div>
                      <div className="text-6xl font-black text-slate-100 dark:text-slate-800 mb-4">{item.step}</div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">{item.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>

                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-8 w-8 text-slate-300 dark:text-slate-700" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise Section */}
        <section id="enterprise" className="py-32 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge className="bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 mb-6 text-xs font-black">ENTERPRISE READY</Badge>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                  Scalable, Secure, and <span className="text-teal-600">Explainable</span>
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium mb-10 leading-relaxed">
                  Built for enterprise adoption with robust security, complete audit trails, and transparent AI reasoning that you can trust.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Lock, label: "SOC 2 Type II", desc: "Certified security" },
                    { icon: Scale, label: "GDPR Compliant", desc: "Data privacy" },
                    { icon: Eye, label: "Explainable AI", desc: "Transparent reasoning" },
                    { icon: Activity, label: "Full Audit Trail", desc: "Complete logging" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <div className="h-10 w-10 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-white">{item.label}</h4>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white">
                  <h3 className="text-xl font-black mb-6">AI Decision Audit Log</h3>
                  <div className="space-y-4 font-mono text-sm">
                    {[
                      { time: "14:23:45", action: "Demand forecast generated", reason: "Analyzed 2.4M data points" },
                      { time: "14:23:47", action: "Stockout risk detected", reason: "SKU-782 below safety threshold" },
                      { time: "14:23:48", action: "Procurement plan created", reason: "Auto-generated PO for 3 suppliers" },
                      { time: "14:23:49", action: "Alert sent to operations", reason: "Critical inventory notification" }
                    ].map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-4 p-3 bg-white/5 rounded-xl"
                      >
                        <span className="text-slate-500 text-xs">{log.time}</span>
                        <div>
                          <p className="text-emerald-400 font-bold text-xs">{log.action}</p>
                          <p className="text-slate-400 text-xs">{log.reason}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-slate-400 text-xs">All decisions logged with explainable reasoning</span>
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative max-w-5xl mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-[3rem] blur-2xl opacity-20" />
              <div className="relative bg-gradient-to-r from-teal-600 to-cyan-600 rounded-[3rem] p-12 md:p-20 text-center text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="inline-block mb-8"
                  >
                    <Sparkles className="h-16 w-16 text-white/80" />
                  </motion.div>

                  <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                    Ready to Transform Your <br className="hidden md:block" />
                    Supply Chain?
                  </h2>
                  <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium">
                    Join the next generation of AI-powered supply chain management. Start your free trial today.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/login">
                      <Button className="h-16 px-12 bg-white text-teal-600 hover:bg-white/90 text-xl font-black rounded-2xl shadow-2xl transition-all hover:-translate-y-1 active:scale-95">
                        Start Free Trial
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button variant="outline" className="h-16 px-12 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 text-xl font-black rounded-2xl transition-all">
                        View Demo
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm font-bold text-white/60">
                    <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> 14-day free trial</span>
                    <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> No credit card required</span>
                    <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Full feature access</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-2.5 rounded-2xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-black text-white tracking-tighter">SCM AI</span>
              </div>
              <p className="text-lg font-medium leading-relaxed max-w-md">
                The first Generative AI-powered supply chain management platform designed for modern enterprises.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                  <div key={social} className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer">
                    <span className="text-xs font-bold">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            {[
              { title: 'Product', links: ['Forecasting', 'Inventory', 'Logistics', 'AI Assistant'] },
              { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
              { title: 'Resources', links: ['Documentation', 'API Reference', 'Case Studies', 'Blog'] }
            ].map((col) => (
              <div key={col.title} className="space-y-6">
                <h4 className="font-black text-white uppercase tracking-widest text-sm">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="hover:text-white transition-colors font-medium">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-medium">© 2025 SCM AI Platform. All rights reserved.</p>
            <div className="flex gap-8 text-sm font-medium">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <AIChatWidget />
    </div>
  );
}
