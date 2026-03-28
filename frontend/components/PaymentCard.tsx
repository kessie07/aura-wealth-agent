"use client";

import React from "react";

export default function PaymentCard() {
  return (
    <div className="paymentCard" aria-label="Payment card" role="img">
      <div className="paymentCard__inner">
        {/* Front */}
        <div className="paymentCard__face paymentCard__front">
          <div className="paymentCard__brandRow">
            <div className="paymentCard__mastercardText">MASTERCARD</div>
            <div className="paymentCard__mastercardLogo" aria-hidden="true">
              <svg
                width="62"
                height="32"
                viewBox="0 0 62 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="26" cy="16" r="10.5" fill="#EB001B" />
                <circle cx="36" cy="16" r="10.5" fill="#F79E1B" />
                <circle cx="26" cy="16" r="10.5" fill="rgba(0,0,0,0)" stroke="rgba(255,255,255,0.18)" />
                <circle cx="36" cy="16" r="10.5" fill="rgba(0,0,0,0)" stroke="rgba(255,255,255,0.18)" />
                <path
                  d="M31 5.6C26.3 5.6 22.5 9.4 22.5 14.1C22.5 18.8 26.3 22.6 31 22.6C35.7 22.6 39.5 18.8 39.5 14.1C39.5 9.4 35.7 5.6 31 5.6Z"
                  fill="rgba(255,255,255,0.06)"
                />
              </svg>
            </div>
          </div>

          <div className="paymentCard__chipWrap" aria-hidden="true">
            {/* Simplified EMV chip SVG */}
            <svg width="62" height="48" viewBox="0 0 62 48" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="chipGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#D6B15C" />
                  <stop offset="0.55" stopColor="#B9872F" />
                  <stop offset="1" stopColor="#F4D48A" />
                </linearGradient>
              </defs>
              <rect x="4.5" y="6" width="53" height="36" rx="7" fill="url(#chipGrad)" />
              <rect x="10.5" y="12" width="41" height="24" rx="5" fill="rgba(0,0,0,0.2)" />
              <rect x="8.5" y="8" width="45" height="32" rx="6" fill="none" stroke="rgba(255,255,255,0.25)" />
              {/* Contact pads */}
              <rect x="22" y="14" width="6" height="4.5" rx="1.2" fill="#F8E3A6" />
              <rect x="32" y="14" width="10" height="4.5" rx="1.2" fill="#F8E3A6" opacity="0.95" />
              <rect x="22" y="24" width="20" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
              {/* Inner lines */}
              <path d="M31 12V36" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" />
              <path d="M18.5 18H43.5" stroke="rgba(0,0,0,0.18)" strokeWidth="1.1" />
              <path d="M18.5 30H43.5" stroke="rgba(0,0,0,0.18)" strokeWidth="1.1" />
              {/* Etching */}
              <path
                d="M13 18C17 17 20 16 23.5 16C27 16 28 17.2 31 17.2C34 17.2 35 16 38.5 16C42 16 45 17 49 18"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1.1"
                fill="none"
              />
            </svg>
          </div>

          <div className="paymentCard__contactless" aria-hidden="true">
            <svg width="78" height="40" viewBox="0 0 78 40" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M39 30.2C48 30.2 55.4 22.8 55.4 13.8"
                stroke="rgba(255,255,255,0.65)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M39 23.8C44.7 23.8 49.4 19.1 49.4 13.4"
                stroke="rgba(173,95,255,0.8)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M39 17.4C41.6 17.4 43.7 15.3 43.7 12.7"
                stroke="rgba(214,10,71,0.85)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="39" cy="31" r="2.5" fill="rgba(255,255,255,0.78)" />
              <path
                d="M18 14C23.2 6.6 31 2.4 39 2.4C47 2.4 54.8 6.6 60 14"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          <div className="paymentCard__number">1234 5678 9012 3456</div>

          <div className="paymentCard__validThru">
            <div className="paymentCard__validLabel">VALID THRU</div>
            <div className="paymentCard__validDate">12/28</div>
          </div>

          <div className="paymentCard__holder">RAHUL SHARMA</div>

          {/* Decorative edge */}
          <div className="paymentCard__rim" aria-hidden="true" />
        </div>

        {/* Back */}
        <div className="paymentCard__face paymentCard__back">
          <div className="paymentCard__backMagStrip" aria-hidden="true" />
          <div className="paymentCard__backSignatureStrip" aria-hidden="true" />

          <div className="paymentCard__backCvv">
            CVV
            <span className="paymentCard__backCvvValue">123</span>
          </div>

          <div className="paymentCard__rim paymentCard__rim--back" aria-hidden="true" />
        </div>
      </div>

      <style>{`
        .paymentCard {
          width: 240px;
          height: 154px;
          perspective: 1200px;
          user-select: none;
        }

        .paymentCard__inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 850ms cubic-bezier(0.2, 0.8, 0.2, 1);
          transform: rotateY(0deg);
          border-radius: 18px;
        }

        /* Hover flip requirement */
        .paymentCard:hover .paymentCard__inner {
          transform: rotateY(180deg);
        }

        .paymentCard__face {
          position: absolute;
          inset: 0;
          border-radius: 18px;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          box-shadow:
            0 18px 40px rgba(0,0,0,0.35),
            0 2px 10px rgba(0,0,0,0.25);
        }

        .paymentCard__front {
          transform: rotateY(0deg);
          background: radial-gradient(120% 120% at 20% 0%, rgba(173,95,255,0.35), transparent 55%),
                      radial-gradient(120% 120% at 90% 20%, rgba(214,10,71,0.25), transparent 55%),
                      linear-gradient(135deg, #080C18 0%, #1B0830 55%, #090B16 100%);
        }

        .paymentCard__back {
          transform: rotateY(180deg);
          background: radial-gradient(120% 120% at 10% 10%, rgba(71,30,236,0.28), transparent 55%),
                      radial-gradient(120% 120% at 90% 20%, rgba(214,10,71,0.18), transparent 55%),
                      linear-gradient(135deg, #070A14 0%, #14081F 60%, #050710 100%);
        }

        .paymentCard__face::before {
          content: "";
          position: absolute;
          inset: -60px;
          background: linear-gradient(115deg,
            rgba(255,255,255,0) 30%,
            rgba(255,255,255,0.12) 45%,
            rgba(255,255,255,0) 60%);
          transform: translateX(-30%) rotate(8deg);
          pointer-events: none;
          opacity: 0.9;
        }

        /* Make text feel like a real card */
        .paymentCard__brandRow {
          position: absolute;
          top: 14px;
          left: 14px;
          right: 14px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          z-index: 2;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }

        .paymentCard__mastercardText {
          position: relative;
          font-size: 12px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.86);
          text-align: right;
          text-shadow: 0 0 14px rgba(173,95,255,0.25);
        }

        .paymentCard__mastercardLogo {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          transform: translateY(-2px);
          filter: drop-shadow(0 10px 14px rgba(0,0,0,0.25));
        }

        .paymentCard__chipWrap {
          position: absolute;
          top: 54px;
          left: 14px;
          z-index: 2;
        }

        .paymentCard__contactless {
          position: absolute;
          top: 48px;
          left: 96px;
          z-index: 2;
          opacity: 0.95;
          transform: scale(0.92);
        }

        .paymentCard__number {
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 48px;
          z-index: 2;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 14px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.88);
          text-shadow: 0 2px 16px rgba(0,0,0,0.35);
        }

        .paymentCard__validThru {
          position: absolute;
          left: 14px;
          bottom: 14px;
          z-index: 2;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .paymentCard__validLabel {
          font-size: 10px;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.72);
        }

        .paymentCard__validDate {
          font-size: 14px;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.9);
        }

        .paymentCard__holder {
          position: absolute;
          right: 14px;
          bottom: 14px;
          z-index: 2;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 13px;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.92);
          text-align: right;
        }

        .paymentCard__rim {
          position: absolute;
          inset: 0;
          border-radius: 18px;
          pointer-events: none;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.14),
            inset 0 0 18px rgba(255,255,255,0.06);
          z-index: 3;
        }

        .paymentCard__rim--back {
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.1),
            inset 0 0 20px rgba(71,30,236,0.08);
        }

        /* Back face details */
        .paymentCard__backMagStrip {
          position: absolute;
          top: 16px;
          left: 0;
          right: 0;
          height: 28px;
          background: linear-gradient(90deg, #050505 0%, #131313 50%, #050505 100%);
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.08),
            inset 0 10px 20px rgba(0,0,0,0.6);
        }

        .paymentCard__backSignatureStrip {
          position: absolute;
          top: 50px;
          left: 14px;
          width: 212px;
          height: 30px;
          background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(240,240,240,0.9));
          border-radius: 6px;
          box-shadow:
            inset 0 0 0 1px rgba(0,0,0,0.08),
            0 10px 20px rgba(0,0,0,0.15);
        }

        .paymentCard__backCvv {
          position: absolute;
          top: 55px;
          right: 18px;
          z-index: 2;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          color: rgba(0,0,0,0.75);
          font-size: 11px;
          letter-spacing: 0.04em;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }

        .paymentCard__backCvvValue {
          font-size: 15px;
          letter-spacing: 0.08em;
          font-weight: 700;
          color: rgba(0,0,0,0.86);
        }

        @media (prefers-reduced-motion: reduce) {
          .paymentCard__inner {
            transition: none;
          }
          .paymentCard:hover .paymentCard__inner {
            transform: rotateY(0deg);
          }
        }
      `}</style>
    </div>
  );
}

