"use client";

import { useState } from "react"; // 1. Added this
import { motion, Variants, AnimatePresence } from "framer-motion";
import OracleChart from "../components/OracleChart";
import BrainChat from "../components/BrainChat";
import AuraLoader from "../components/AuraLoader";
import PaymentCard from "../components/PaymentCard";

export default function Home() {
  // 2. Added State Management
  const [appState, setAppState] = useState("landing"); // 'landing', 'syncing', or 'dashboard'

  const handleConnect = () => {
    setAppState("syncing");
    // Simulate the AI "thinking" and syncing for 3 seconds
    setTimeout(() => {
      setAppState("dashboard");
    }, 3000);
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    },
  };

  return (
    <main className="relative min-h-screen bg-neutral-950 text-white p-8 md:p-24 flex flex-col items-center font-sans overflow-hidden">
      
      {/* 🌌 Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <AnimatePresence mode="wait">
        {/* 🎬 Scene 1: The Hero Reveal (Only shows in 'landing' state) */}
        {appState === "landing" && (
          <motion.div 
            key="landing"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 text-center mt-12 mb-20 max-w-4xl flex flex-col items-center"
          >
            <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Anticipate your financial <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
                future with AI.
              </span>
            </motion.h1>
            
            <motion.p variants={item} className="text-neutral-400 text-lg md:text-xl mb-10">
              Unlock your dynamic Safety Zone.
            </motion.p>
            
            <motion.button 
              onClick={handleConnect} // 3. Attached the logic here
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-neutral-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]"
            >
              Connect Bank Account
            </motion.button>
          </motion.div>
        )}

        {/* 🎬 Scene 2: The Syncing State (Shows after clicking button) */}
        {appState === "syncing" && (
          <motion.div 
            key="syncing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center justify-center h-[60vh]"
          >
            <AuraLoader text="Ingesting Neural Patterns..." />
          </motion.div>
        )}

        {/* 🎬 Scene 3: The Bento Grid (The big reveal!) */}
        {appState === "dashboard" && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Card 1: The Oracle (Fixed height so Recharts works!) */}
            <div className="md:col-span-2 h-[450px] bg-neutral-900/40 rounded-3xl border border-white/5 overflow-hidden">
                <OracleChart />
            </div>

            {/* Card 2: The Brain Chat */}
            <div className="h-[450px]">
                <BrainChat />
            </div>

            {/* Card 3: Status / Security Card */}
            <div className="md:col-span-3 flex items-center justify-between bg-neutral-900/50 rounded-3xl border border-white/10 p-8">
                <div className="flex items-center gap-6">
                    <PaymentCard />
                    <div>
                        <h3 className="text-xl font-bold text-blue-400">Oracle Status: Active</h3>
                        <p className="text-neutral-400 text-sm">Neural network monitoring 14-day spending risk.</p>
                    </div>
                </div>
                <div className="hidden md:block">
                    <AuraLoader text="Encrypted" />
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}