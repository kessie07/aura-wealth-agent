"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building, CreditCard, Landmark, Sparkles } from "lucide-react";

type NodeConfig = {
  angleDeg: number;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
};

const SIZE = 220;
const CENTER = SIZE / 2;
const RADIUS = 78;

function polarToCartesian(angleDeg: number) {
  const angle = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

const nodes: NodeConfig[] = [
  { angleDeg: -90, Icon: Building, label: "Bank" },
  { angleDeg: 30, Icon: CreditCard, label: "Card rails" },
  { angleDeg: 150, Icon: Landmark, label: "Merchant / account" },
];

export default function ConnectionCard() {
  return (
    <div className="bg-neutral-900/50 rounded-3xl border border-white/10 min-h-[300px] flex flex-col items-center justify-center px-6 py-8">
      <div className="relative w-full max-w-[260px] h-[220px] flex items-center justify-center">
        {/* Animated dashed "sync" lines */}
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0"
          aria-hidden="true"
        >
          {nodes.map((n, i) => {
            const p = polarToCartesian(n.angleDeg);
            return (
              <motion.line
                key={`${n.label}-${i}`}
                x1={CENTER}
                y1={CENTER}
                x2={p.x}
                y2={p.y}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth={1.2}
                strokeDasharray="5 7"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: [0, -22] }}
                transition={{
                  duration: 2.4 + i * 0.35,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            );
          })}
        </svg>

        {/* Center node */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[54px] h-[54px] rounded-full bg-neutral-900/40 border border-white/10 flex items-center justify-center text-white"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute inset-0 rounded-full bg-emerald-400/10 blur-[10px] pointer-events-none" />
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>

        {/* Orbiting nodes */}
        {nodes.map((n, i) => {
          const p = polarToCartesian(n.angleDeg);
          const Icon = n.Icon;
          return (
            <motion.div
              key={n.label}
              className="absolute"
              style={{
                left: p.x,
                top: p.y,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: [1, 1.06, 1] }}
              transition={{
                duration: 2.1 + i * 0.25,
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut",
              }}
            >
              <div className="w-[42px] h-[42px] rounded-full bg-neutral-900/30 border border-white/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-neutral-200" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 text-center w-full">
        <h3 className="text-neutral-100 text-sm font-semibold tracking-tight">
          Zero Manual Entry
        </h3>
        <p className="text-neutral-500 text-xs mt-1">
          Live-synced via Open Banking APIs
        </p>
      </div>
    </div>
  );
}

