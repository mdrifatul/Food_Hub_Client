"use client";

import { env } from "@/env";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = { id: string; role: "user" | "ai"; content: string };

export default function ChatKitWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello! How can I help you discover amazing meals today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to fetch");
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "ai",
        content: data.data.reply,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error(error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "ai",
        content: `Error: ${error.message || "Failed to connect to the backend."} Please check your OpenAI API billing.`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-100 w-100 h-130 shadow-2xl rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-background"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-orange-500 to-red-600 p-5 text-white flex items-center shadow-md">
              <div className="bg-white/20 p-2 rounded-full mr-3">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">
                  FoodHub Assistant
                </h3>
                <p className="text-orange-100 text-xs font-medium">
                  Powered by your Local AI
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-900/50">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3.5 text-sm shadow-sm ${msg.role === "user" ? "bg-orange-500 text-white rounded-br-sm" : "bg-white dark:bg-zinc-800 text-foreground border border-zinc-100 dark:border-zinc-700 rounded-bl-sm"}`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-3.5 rounded-2xl rounded-bl-sm shadow-sm">
                    <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
              <form
                onSubmit={handleSend}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our meals..."
                  className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-full py-3.5 pl-5 pr-14 text-sm focus:ring-2 focus:ring-orange-500 outline-none text-foreground"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 bg-orange-500 rounded-full text-white disabled:opacity-50 hover:bg-orange-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-100 p-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-xl hover:shadow-orange-500/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center border-0"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}
