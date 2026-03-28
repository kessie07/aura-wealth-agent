"use client";

import React from "react";

type AuraLoaderProps = {
  text?: string;
};

export default function AuraLoader({ text = "Loading..." }: AuraLoaderProps) {
  const letters = text.split("");

  return (
    <div className="auraLoader" role="status" aria-live="polite" aria-label={text}>
      <div className="auraLoader__ring" aria-hidden="true" />

      <div className="auraLoader__text" aria-hidden="true">
        {letters.map((char, index) => (
          <span
            key={`${char}-${index}`}
            className="auraLoader__letter"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      <style>{`
        .auraLoader {
          position: relative;
          width: 180px;
          height: 180px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
            Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
          color: rgba(255, 255, 255, 0.92);
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
        }

        .auraLoader__ring {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          animation: auraLoader-rotate 2s linear infinite;
          will-change: transform, box-shadow;
          transform: translateZ(0);

          /* start state (also acts as a fallback when animations are disabled) */
          box-shadow:
            inset 0 0 0 10px rgba(255, 255, 255, 0.25),
            inset 0 0 22px rgba(255, 255, 255, 0.55),
            inset 0 0 48px rgba(173, 95, 255, 0.55),
            inset 0 0 72px rgba(71, 30, 236, 0.45),
            0 0 24px rgba(173, 95, 255, 0.22),
            0 0 44px rgba(214, 10, 71, 0.18);
        }

        .auraLoader__text {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5px;
          font-size: 18px;
          font-weight: 300;
          letter-spacing: 0.02em;
        }

        .auraLoader__letter {
          display: inline-block;
          opacity: 0.4;
          transform: scale(1);
          animation: auraLoader-bounce 1.2s ease-in-out infinite;
          will-change: transform, opacity;
        }

        @keyframes auraLoader-rotate {
          0% {
            transform: rotate(0deg);
            box-shadow:
              inset 0 0 0 10px rgba(255, 255, 255, 0.28),
              inset 0 0 20px rgba(255, 255, 255, 0.7),
              inset 0 0 46px rgba(173, 95, 255, 0.6),
              inset 0 0 72px rgba(71, 30, 236, 0.45),
              0 0 26px rgba(255, 255, 255, 0.12),
              0 0 46px rgba(173, 95, 255, 0.2);
          }
          25% {
            transform: rotate(90deg);
            box-shadow:
              inset 0 0 0 10px rgba(255, 255, 255, 0.18),
              inset 0 0 22px rgba(173, 95, 255, 0.85),
              inset 0 0 52px rgba(173, 95, 255, 0.55),
              inset 0 0 78px rgba(71, 30, 236, 0.4),
              0 0 28px rgba(173, 95, 255, 0.24),
              0 0 54px rgba(71, 30, 236, 0.2);
          }
          50% {
            transform: rotate(180deg);
            box-shadow:
              inset 0 0 0 10px rgba(255, 255, 255, 0.14),
              inset 0 0 22px rgba(71, 30, 236, 0.85),
              inset 0 0 56px rgba(71, 30, 236, 0.55),
              inset 0 0 84px rgba(214, 10, 71, 0.35),
              0 0 26px rgba(71, 30, 236, 0.22),
              0 0 54px rgba(214, 10, 71, 0.18);
          }
          75% {
            transform: rotate(270deg);
            box-shadow:
              inset 0 0 0 10px rgba(255, 255, 255, 0.14),
              inset 0 0 22px rgba(214, 10, 71, 0.88),
              inset 0 0 54px rgba(214, 10, 71, 0.52),
              inset 0 0 80px rgba(173, 95, 255, 0.35),
              0 0 26px rgba(214, 10, 71, 0.22),
              0 0 54px rgba(173, 95, 255, 0.2);
          }
          100% {
            transform: rotate(360deg);
            box-shadow:
              inset 0 0 0 10px rgba(255, 255, 255, 0.28),
              inset 0 0 20px rgba(255, 255, 255, 0.7),
              inset 0 0 46px rgba(173, 95, 255, 0.6),
              inset 0 0 72px rgba(71, 30, 236, 0.45),
              0 0 26px rgba(255, 255, 255, 0.12),
              0 0 46px rgba(173, 95, 255, 0.2);
          }
        }

        @keyframes auraLoader-bounce {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          35% {
            opacity: 1;
            transform: scale(1.15);
          }
          70% {
            opacity: 0.55;
            transform: scale(1.02);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .auraLoader__ring,
          .auraLoader__letter {
            animation: none !important;
          }

          .auraLoader__letter {
            opacity: 0.85;
          }
        }
      `}</style>
    </div>
  );
}
