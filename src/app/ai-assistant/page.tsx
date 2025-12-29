'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Sparkles, 
  Send, 
  Paperclip, 
  RefreshCcw, 
  ThumbsUp, 
  ThumbsDown,
  Info,
  AlertTriangle,
  TrendingUp,
  BrainCircuit,
  Zap,
  ChevronRight,
  MessageSquare,
  Package
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  type?: 'text' | 'insight' | 'alert';
}

interface Insight {
  id: string;
  title: string;
  content: string;
  type: string;
  created_at: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm your SCM AI Assistant. I can help you analyze demand trends, optimize inventory, or provide logistics insights. What would you like to know today?",
    timestamp: new Date(),
    suggestions: [
      "What products are at risk of stockout next week?",
      "Analyze supplier performance for Q3",
      "Show me demand forecast for Memory Modules"
    ]
  }
];

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchInsights() {
      try {
        const res = await fetch('/api/ai/insights');
        const data = await res.json();
        setInsights(data);
      } catch (error) {
        console.error('Failed to fetch insights', error);
      }
    }
    fetchInsights();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });
      
      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content || "I'm sorry, I couldn't process that request.",
        timestamp: new Date(),
        type: 'insight'
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">AI Decision Support</h1>
            <Badge className="bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600/20 border-none px-2 py-0 text-[10px] font-bold">BETA</Badge>
          </div>
          <p className="text-slate-500 font-medium">Natural language interface for deep supply chain reasoning.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-slate-600">Model: SCM-Core-v4</span>
          </div>
          <Button variant="outline" size="icon" className="rounded-full bg-white shadow-sm border-slate-100">
            <RefreshCcw className="h-4 w-4 text-slate-500" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        <Card className="flex-1 flex flex-col min-h-0 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-xl rounded-[2rem] overflow-hidden">
          <CardHeader className="py-4 px-6 border-b border-slate-50 flex flex-row items-center gap-3 bg-white/50">
            <div className="bg-indigo-600 p-2 rounded-2xl shadow-lg shadow-indigo-100">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-black text-slate-900">Neural Workspace</CardTitle>
              <CardDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Reasoning Session</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0 min-h-0 relative">
            <ScrollArea className="flex-1 p-6" viewportRef={scrollRef}>
              <div className="space-y-8 pb-4">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div 
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={cn(
                        "flex gap-4",
                        message.role === 'user' ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <Avatar className="h-10 w-10 shrink-0 shadow-sm border-2 border-white">
                        {message.role === 'assistant' ? (
                          <div className="bg-slate-900 h-full w-full flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-indigo-400" />
                          </div>
                        ) : (
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=SCM" />
                        )}
                        <AvatarFallback className="font-bold">{message.role === 'assistant' ? 'AI' : 'U'}</AvatarFallback>
                      </Avatar>
                      <div className={cn(
                        "flex flex-col gap-3 max-w-[85%] md:max-w-[75%]",
                        message.role === 'user' ? "items-end" : "items-start"
                      )}>
                        <div className={cn(
                          "p-4 rounded-[2rem] text-[15px] leading-relaxed shadow-sm font-medium",
                          message.role === 'user' 
                            ? "bg-indigo-600 text-white rounded-tr-none shadow-indigo-100" 
                            : "bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-slate-100/50"
                        )}>
                          {message.content.split('\n').map((line, i) => (
                            <p key={i} className={i > 0 ? "mt-3" : ""}>{line}</p>
                          ))}
                        </div>
                        
                        {message.suggestions && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.suggestions.map((suggestion, i) => (
                              <Button 
                                key={i} 
                                variant="outline" 
                                size="sm" 
                                className="text-[11px] h-8 rounded-full border-slate-100 bg-white hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 shadow-sm transition-all font-bold px-4"
                                onClick={() => handleSend(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}

                        {message.role === 'assistant' && !isTyping && (
                          <div className="flex items-center gap-4 mt-1 px-2">
                            <button className="text-slate-300 hover:text-indigo-600 transition-colors">
                              <ThumbsUp className="h-4 w-4" />
                            </button>
                            <button className="text-slate-300 hover:text-red-600 transition-colors">
                              <ThumbsDown className="h-4 w-4" />
                            </button>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex gap-4"
                  >
                    <Avatar className="h-10 w-10 shrink-0 shadow-sm border-2 border-white">
                      <div className="bg-slate-900 h-full w-full flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-indigo-400" />
                      </div>
                    </Avatar>
                    <div className="bg-white p-4 rounded-[2rem] rounded-tl-none border border-slate-100 shadow-sm">
                      <div className="flex gap-1.5 items-center">
                        <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce" />
                        <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>
            
            <div className="p-6 bg-gradient-to-t from-white via-white/90 to-transparent absolute bottom-0 left-0 right-0 pt-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-indigo-600/5 rounded-[2.5rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative flex items-center bg-white rounded-[2.5rem] border-2 border-slate-50 shadow-2xl p-2 pl-6 focus-within:border-indigo-100 transition-all">
                  <Input 
                    placeholder="Ask about inventory, demand, or global logistics..." 
                    className="flex-1 bg-transparent border-none focus-visible:ring-0 text-slate-700 font-medium placeholder:text-slate-400 py-6 h-12"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <div className="flex items-center gap-1.5 pr-2">
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button 
                      size="icon" 
                      className="h-12 w-12 rounded-[1.5rem] bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95" 
                      onClick={() => handleSend()}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-center text-slate-400 mt-4 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <Info className="h-3 w-3 text-indigo-400" /> Neural engine uses live warehouse data.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="w-80 hidden xl:flex flex-col gap-6">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] bg-white overflow-hidden">
            <CardHeader className="py-5 px-6 border-b border-slate-50 bg-slate-50/30">
              <CardTitle className="text-sm font-black flex items-center gap-2 text-slate-900 tracking-tight uppercase">
                <AlertTriangle className="h-4 w-4 text-amber-500 fill-amber-500/20" />
                Live Network Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-4 space-y-4">
              <AnimatePresence>
                {insights.length > 0 ? (
                  insights.map((insight, idx) => (
                    <motion.div 
                      key={insight.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={cn(
                        "p-4 rounded-2xl border transition-all hover:scale-[1.02] cursor-default",
                        insight.type === 'risk' 
                          ? "bg-red-50 border-red-100/50" 
                          : "bg-indigo-50 border-indigo-100/50"
                      )}
                    >
                      <h4 className={cn(
                        "text-xs font-black mb-1 flex items-center gap-2",
                        insight.type === 'risk' ? "text-red-700" : "text-indigo-700"
                      )}>
                        {insight.type === 'risk' ? <AlertTriangle className="h-3 w-3" /> : <Zap className="h-3 w-3" />}
                        {insight.title}
                      </h4>
                      <p className={cn(
                        "text-[11px] font-medium leading-tight",
                        insight.type === 'risk' ? "text-red-600/80" : "text-indigo-600/80"
                      )}>{insight.content}</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <div className="h-2 w-1/2 bg-slate-50 rounded mx-auto mb-2 animate-pulse" />
                    <div className="h-2 w-1/3 bg-slate-50 rounded mx-auto animate-pulse" />
                  </div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          <Card className="flex-1 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] bg-white overflow-hidden">
            <CardHeader className="py-5 px-6 border-b border-slate-50 bg-slate-50/30">
              <CardTitle className="text-sm font-black flex items-center gap-2 text-slate-900 tracking-tight uppercase">
                <TrendingUp className="h-4 w-4 text-indigo-600" />
                System Pulse
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-4 overflow-y-auto">
              <div className="space-y-6">
                {[
                  { time: '10:42 AM', event: 'Inventory Sync', detail: 'Central Hub updated', icon: Package },
                  { time: '09:15 AM', event: 'Neural Forecast', detail: 'Demand prediction updated', icon: BrainCircuit },
                  { time: 'Yesterday', event: 'Context Update', detail: 'PO #8812 linked to chat', icon: MessageSquare }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 relative pb-2 group">
                    <div className="flex-shrink-0 h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                      <item.icon className="h-5 w-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{item.time}</p>
                      <p className="text-xs font-black text-slate-900 mb-0.5">{item.event}</p>
                      <p className="text-[11px] font-medium text-slate-500">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 text-xs font-black text-slate-400 hover:text-indigo-600 group rounded-2xl">
                VIEW FULL LOGS <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

