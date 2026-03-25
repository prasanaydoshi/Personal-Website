"use client";

import { useState, useEffect } from "react";

interface TerminalBootProps {
  onComplete?: () => void;
}

export default function TerminalBoot({ onComplete }: TerminalBootProps) {
  const [phase, setPhase] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

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

  const instant = reducedMotion;

  return (
    <div className="w-full max-w-[640px] mx-auto relative">
      {/* Decorative accent line */}
      <div
        className="absolute -left-4 top-0 bottom-0 w-[2px]"
        style={{
          background: `linear-gradient(to bottom, var(--color-accent-thread), transparent)`,
          opacity: phase >= 1 || instant ? 0.6 : 0,
          transition: instant ? "none" : "opacity 0.8s ease",
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
            color: "var(--color-accent-warm)",
            display: "inline-block",
          }}
        >
          Prasana Y Doshi
        </span>
        <span style={{ color: "var(--color-accent-thread)" }}>.</span>
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

      {/* Decorative dots */}
      <div
        className="flex items-center gap-2 mt-6"
        style={{
          opacity: phase >= 3 || instant ? 1 : 0,
          transition: instant ? "none" : "opacity 0.5s ease 0.2s",
        }}
      >
        {[
          "var(--color-accent-thread)",
          "var(--color-accent-warm)",
          "var(--color-accent-sky)",
        ].map((color, i) => (
          <span
            key={i}
            className="w-[6px] h-[6px] rounded-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
