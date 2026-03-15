'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    MessageCircle,
    Send,
    X,
    Minimize2,
    Maximize2,
    RotateCcw,
    Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const quickPrompts = [
    "What's my stock health?",
    "Show demand forecasts",
    "Supplier overview",
    "Any risks to flag?",
];

export function AIChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hey there 👋 I can help you with inventory, forecasting, suppliers — anything supply chain. What do you need?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSend = async (text: string = input) => {
        if (!text.trim() || isTyping) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            const data = await response.json();

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.content || "Sorry, something went wrong. Try again?",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "Couldn't connect right now. Check your connection and try again.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleReset = () => {
        setMessages([
            {
                id: Date.now().toString(),
                role: 'assistant',
                content: "Fresh start! What can I look into for you?",
                timestamp: new Date(),
            },
        ]);
    };

    const formatTime = (date: Date) =>
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <>
            {/* Floating trigger */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="fixed bottom-6 right-6 z-50"
                    >
                        <button
                            onClick={() => setIsOpen(true)}
                            className="group h-14 w-14 rounded-full bg-teal-600 text-white shadow-lg shadow-teal-600/25 hover:bg-teal-700 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center"
                        >
                            <MessageCircle className="h-6 w-6" />
                            <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.97 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                        className={cn(
                            "fixed z-50 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-200",
                            isExpanded
                                ? "inset-4 rounded-2xl"
                                : "bottom-6 right-6 w-[380px] h-[520px] rounded-2xl"
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-teal-600 flex items-center justify-center">
                                    <Sparkles className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white leading-none">SCM Assistant</h3>
                                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                                        Online
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-0.5">
                                <button
                                    className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
                                    onClick={handleReset}
                                    title="New conversation"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                >
                                    {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                                </button>
                                <button
                                    className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto px-5 py-4"
                            style={{ overscrollBehavior: 'contain' }}
                            onWheel={(e) => e.stopPropagation()}
                        >
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={cn(
                                            "flex flex-col gap-1",
                                            message.role === 'user' ? "items-end" : "items-start"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "px-3.5 py-2.5 text-[13px] leading-relaxed max-w-[85%]",
                                                message.role === 'user'
                                                    ? "bg-teal-600 text-white rounded-2xl rounded-br-md"
                                                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl rounded-bl-md"
                                            )}
                                        >
                                            {message.content.split('\n').map((line, i) => (
                                                <p key={i} className={i > 0 ? "mt-1.5" : ""}>
                                                    {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
                                                        if (part.startsWith('**') && part.endsWith('**')) {
                                                            return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>;
                                                        }
                                                        return <span key={j}>{part}</span>;
                                                    })}
                                                </p>
                                            ))}
                                        </div>
                                        <span className="text-[10px] text-slate-400 dark:text-slate-500 px-1">
                                            {formatTime(message.timestamp)}
                                        </span>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-md">
                                            <div className="flex gap-1 items-center">
                                                <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" />
                                                <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                                                <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick prompts */}
                        {messages.length <= 2 && !isTyping && (
                            <div className="px-5 pb-2">
                                <div className="flex flex-wrap gap-1.5">
                                    {quickPrompts.map((prompt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSend(prompt)}
                                            className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700 transition-colors"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2">
                                <Input
                                    ref={inputRef}
                                    placeholder="Type a message..."
                                    className="flex-1 h-10 rounded-full border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus-visible:ring-teal-500 text-sm px-4"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    disabled={isTyping}
                                />
                                <Button
                                    size="icon"
                                    className="h-10 w-10 rounded-full bg-teal-600 hover:bg-teal-700 active:scale-95 transition-all shrink-0"
                                    onClick={() => handleSend()}
                                    disabled={isTyping || !input.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
