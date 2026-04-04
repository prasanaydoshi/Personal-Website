"use client";

import { useState, useEffect } from "react";

interface TerminalBootProps {
  onComplete?: () => void;
}

const identities = [
  "diving into data pipelines at Munich Re",
  "building ML models that move the needle",
  "deep in data, deeper in curiosity",
  "analyzing equities",
  "planning my next dive trip",
  "prompting claude code",
  "120+ dives deep, still descending",
];

export default function TerminalBoot({ onComplete }: TerminalBootProps) {
  const [phase, setPhase] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [identityIndex, setIdentityIndex] = useState(0);
  const [identityVisible, setIdentityVisible] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReducedMotion(true);
      setPhase(3);
      onComplete?.();
      return;
    }

    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => {
        setPhase(3);
        onComplete?.();
      }, 1400),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Rotating identity text
  useEffect(() => {
    if (phase < 3) return;
    const interval = setInterval(() => {
      setIdentityVisible(false);
      setTimeout(() => {
        setIdentityIndex((prev) => (prev + 1) % identities.length);
        setIdentityVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, [phase]);

  const instant = reducedMotion;

  return (
    <div className="w-full max-w-[640px] mx-auto">
      {/* Accent line — normal flow with spacing */}
      <div
        style={{
          width: "2px",
          height: "40px",
          background: "linear-gradient(to bottom, var(--color-accent-thread), transparent)",
          opacity: phase >= 1 || instant ? 0.6 : 0,
          transition: instant ? "none" : "opacity 0.8s ease",
          marginBottom: "20px",
        }}
      />

      {/* Name */}
      <h1
        className="font-heading font-bold tracking-tight mb-5"
        style={{
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          lineHeight: 1.1,
          color: "var(--color-text-primary)",
          opacity: phase >= 1 || instant ? 1 : 0,
          transform: phase >= 1 || instant ? "translateY(0)" : "translateY(16px)",
          transition: instant ? "none" : "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        Hey, I am{" "}
        <span
          style={{
            color: "#7BBDA4",
            display: "inline-block",
          }}
        >
          Prasana Y Doshi
        </span>
      </h1>

      {/* Tagline */}
      <p
        className="text-lg md:text-xl leading-relaxed max-w-[480px]"
        style={{
          color: "var(--color-text-secondary)",
          opacity: phase >= 2 || instant ? 1 : 0,
          transform: phase >= 2 || instant ? "translateY(0)" : "translateY(12px)",
          transition: instant ? "none" : "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
        }}
      >
        Equal parts curious, caffeinated, and crafty.
      </p>

      {/* Rotating "currently:" line */}
      <div
        className="mt-4"
        style={{
          opacity: phase >= 3 || instant ? 1 : 0,
          transition: instant ? "none" : "opacity 0.5s ease 0.2s",
        }}
      >
        <span
          className="font-mono text-[12px] tracking-wider"
          style={{ color: "var(--color-accent-thread)" }}
        >
          currently:
        </span>
        <span
          className="font-mono text-[12px] ml-2"
          style={{
            color: "var(--color-text-secondary)",
            opacity: identityVisible ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          {identities[identityIndex]}
        </span>
      </div>
    </div>
  );
}
