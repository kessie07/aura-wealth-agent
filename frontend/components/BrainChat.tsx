"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function BrainChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "I am Aura. I've analyzed your 14-day forecast. How can I help you stay in the Safety Zone?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      console.log("🌐 Calling Python Server...");
      
      // Using localhost instead of 127.0.0.1 to avoid browser CORS quirks
      // Force it to use exact IPv4 instead of 'localhost'
const response = await fetch("http://127.0.0.1:8001/api/chat",  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });

      console.log("📡 Server Status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      console.log("🧠 Data from Python:", data);

      // Looking specifically for the 'response' key we set in api.py
      const aiContent = data.response || "Aura processed the request but returned no text.";
      setMessages((prev) => [...prev, { role: "ai", content: aiContent }]);
      
    } catch (error) {
      console.error("❌ Connection Error:", error);
      setMessages((prev) => [...prev, { 
        role: "ai", 
        content: "⚠️ Connection failed. Please ensure your Python server is running on port 8000." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900/40 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-md">
      <div className="p-4 border-b border-white/5 bg-white/5 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Aura Intelligence</span>
      </div>

      <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] p-3 px-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user" 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "bg-white/5 text-neutral-300 border border-white/10"
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-3 px-4 rounded-2xl border border-white/10">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-black/40 border-t border-white/5 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about your forecast..."
          className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-neutral-600"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-blue-600/20"
        >
          Ask
        </button>
      </div>
    </div>
  );
}