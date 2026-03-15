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
  RefreshCcw,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  TrendingUp,
  Zap,
  ChevronRight,
  MessageSquare,
  Package,
  Copy,
  Check,
  Search
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
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
    content: "Hey! I'm here to help you with anything supply chain — inventory checks, demand trends, supplier reviews, you name it.\n\nWhat would you like to look into?",
    timestamp: new Date(),
    suggestions: [
      "Check stock levels",
      "Review supplier performance",
      "Show demand trends",
      "Flag any risks",
      "Give me the overview",
    ]
  }
];

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    async function fetchInsights() {
      try {
        const res = await fetch('/api/ai/insights');
        const data = await res.json();
        if (Array.isArray(data)) setInsights(data);
      } catch (error) {
        console.error('Failed to fetch insights', error);
      }
    }
    fetchInsights();
  }, []);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isTyping) return;

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
        content: data.content || "Sorry, something went wrong. Mind trying again?",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Couldn't connect right now. Check your connection and try again.",
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setMessages(initialMessages);
  };

  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => (
      <p key={i} className={i > 0 ? "mt-1.5" : ""}>
        {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>;
          }
          return <span key={j}>{part}</span>;
        })}
      </p>
    ));
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="h-[calc(100vh-112px)] flex flex-col gap-6 -mt-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Assistant</h1>
          <p className="text-slate-500 dark:text-slate-400">Ask questions about your supply chain data in plain language.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
            <span className="h-2 w-2 bg-emerald-500 rounded-full" />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Connected to live data</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg text-sm"
            onClick={handleReset}
          >
            <RefreshCcw className="h-3.5 w-3.5 mr-2" />
            New chat
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Main chat */}
        <Card className="flex-1 flex flex-col min-h-0 rounded-2xl border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
          <CardContent className="flex-1 flex flex-col p-0 min-h-0 relative">
            <ScrollArea className="flex-1 px-6 py-6" ref={scrollRef}>
              <div className="space-y-6 pb-28 max-w-3xl mx-auto">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex gap-3",
                        message.role === 'user' ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      {message.role === 'assistant' && (
                        <Avatar className="h-8 w-8 shrink-0 mt-1">
                          <div className="bg-teal-600 h-full w-full flex items-center justify-center rounded-full">
                            <Sparkles className="h-4 w-4 text-white" />
                          </div>
                        </Avatar>
                      )}
                      <div className={cn(
                        "flex flex-col gap-1.5 max-w-[80%]",
                        message.role === 'user' ? "items-end" : "items-start"
                      )}>
                        <div className={cn(
                          "px-4 py-3 text-[14px] leading-relaxed",
                          message.role === 'user'
                            ? "bg-teal-600 text-white rounded-2xl rounded-br-md"
                            : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl rounded-bl-md border border-slate-100 dark:border-slate-700"
                        )}>
                          {renderContent(message.content)}
                        </div>

                        {/* Suggestions */}
                        {message.suggestions && (
                          <div className="flex flex-wrap gap-2 mt-1">
                            {message.suggestions.map((suggestion, i) => (
                              <button
                                key={i}
                                className="text-xs font-medium px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                onClick={() => handleSend(suggestion)}
                                disabled={isTyping}
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Actions */}
                        {message.role === 'assistant' && message.id !== '1' && (
                          <div className="flex items-center gap-3 px-1">
                            <button
                              className="text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 transition-colors"
                              onClick={() => handleCopy(message.content, message.id)}
                            >
                              {copiedId === message.id ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                            </button>
                            <button className="text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 transition-colors">
                              <ThumbsUp className="h-3.5 w-3.5" />
                            </button>
                            <button className="text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 transition-colors">
                              <ThumbsDown className="h-3.5 w-3.5" />
                            </button>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <div className="bg-teal-600 h-full w-full flex items-center justify-center rounded-full">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                    </Avatar>
                    <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-md border border-slate-100 dark:border-slate-700">
                      <div className="flex gap-1 items-center">
                        <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" />
                        <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                        <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Input bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-slate-900 via-white/95 dark:via-slate-900/95 to-transparent pt-16">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-2 pl-5 shadow-sm focus-within:border-teal-400 dark:focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-50 dark:focus-within:ring-teal-900/30 transition-all">
                  <Input
                    placeholder="Ask anything about your supply chain..."
                    className="flex-1 bg-transparent border-none focus-visible:ring-0 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 h-10 text-sm"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    disabled={isTyping}
                  />
                  <Button
                    size="icon"
                    className="h-10 w-10 rounded-lg bg-teal-600 hover:bg-teal-700 transition-all active:scale-95 shrink-0"
                    onClick={() => handleSend()}
                    disabled={isTyping || !input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right sidebar */}
        <div className="w-72 hidden xl:flex flex-col gap-4">
          {/* Alerts */}
          <Card className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <CardHeader className="py-4 px-5 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-xs font-semibold flex items-center gap-2 text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {insights.length > 0 ? (
                insights.map((insight) => (
                  <button
                    key={insight.id}
                    className={cn(
                      "w-full text-left p-3 rounded-xl border transition-colors",
                      insight.type === 'risk'
                        ? "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30 hover:border-red-200 dark:hover:border-red-800"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600"
                    )}
                    onClick={() => handleSend(`Tell me about: ${insight.title}`)}
                  >
                    <p className={cn(
                      "text-xs font-semibold mb-1",
                      insight.type === 'risk' ? "text-red-700 dark:text-red-400" : "text-slate-700 dark:text-slate-300"
                    )}>
                      {insight.title}
                    </p>
                    <p className={cn(
                      "text-[11px] leading-snug",
                      insight.type === 'risk' ? "text-red-600/70 dark:text-red-400/70" : "text-slate-500 dark:text-slate-400"
                    )}>{insight.content}</p>
                  </button>
                ))
              ) : (
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4">No active alerts</p>
              )}
            </CardContent>
          </Card>

          {/* Try asking */}
          <Card className="flex-1 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <CardHeader className="py-4 px-5 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-xs font-semibold flex items-center gap-2 text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <Search className="h-3.5 w-3.5" />
                Try asking
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {[
                { text: "What items are running low?", icon: Package },
                { text: "Forecast for next quarter", icon: TrendingUp },
                { text: "Which suppliers are slow?", icon: AlertTriangle },
                { text: "Recent sales breakdown", icon: MessageSquare },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(item.text)}
                  disabled={isTyping}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-colors group text-left"
                >
                  <item.icon className="h-4 w-4 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors shrink-0" />
                  <span className="text-xs text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">{item.text}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
