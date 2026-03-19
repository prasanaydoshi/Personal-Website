"use client";

import { useState, useEffect, useCallback } from "react";

const terminalLines = [
  "> initializing log...",
  "> name: Prasana",
  "> status: building things that matter",
  "> type: generalist — fintech · quant · full-stack",
  "> ready. ✓",
];

const CHAR_DELAY = 45; // ms per character
const LINE_PAUSE = 350; // ms between lines
const END_PAUSE = 600; // ms after final line before content reveals

interface TerminalBootProps {
  onComplete?: () => void;
}

export default function TerminalBoot({ onComplete }: TerminalBootProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Check reduced motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReducedMotion(true);
      setDisplayedLines(terminalLines);
      setIsComplete(true);
      onComplete?.();
    }
  }, [onComplete]);

  // Typing effect
  useEffect(() => {
    if (reducedMotion) return;
    if (currentLine >= terminalLines.length) {
      const timeout = setTimeout(() => {
        setIsComplete(true);
        onComplete?.();
      }, END_PAUSE);
      return () => clearTimeout(timeout);
    }

    const line = terminalLines[currentLine];
    if (currentChar <= line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[currentLine] = line.substring(0, currentChar);
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, currentChar === 0 ? LINE_PAUSE : CHAR_DELAY);
      return () => clearTimeout(timeout);
    } else {
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }
  }, [currentLine, currentChar, reducedMotion, onComplete]);

  // Cursor blink
  useEffect(() => {
    if (isComplete) return;
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, [isComplete]);

  return (
    <div
      className="w-full max-w-[560px] mx-auto rounded-lg overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-terminal)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Terminal header dots */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid var(--color-border-subtle)" }}
      >
        <span className="w-3 h-3 rounded-full bg-[#FF6058]" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <span className="w-3 h-3 rounded-full bg-[#27CA40]" />
        <span
          className="ml-3 font-mono text-[10px] tracking-wider uppercase"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          initializing log
        </span>
      </div>

      {/* Terminal body */}
      <div className="px-5 py-4 min-h-[180px]" aria-live="polite">
        {displayedLines.map((line, i) => (
          <div
            key={i}
            className="font-mono text-sm leading-relaxed"
            style={{ color: "var(--color-text-primary)" }}
          >
            {line}
            {/* Show cursor at end of current typing line */}
            {i === currentLine && !isComplete && (
              <span
                className="inline-block w-[8px] h-[16px] ml-[1px] align-middle"
                style={{
                  backgroundColor: showCursor
                    ? "var(--color-accent-thread)"
                    : "transparent",
                  transition: "background-color 0.1s",
                }}
              />
            )}
          </div>
        ))}
        {/* Cursor after completion */}
        {isComplete && (
          <div className="font-mono text-sm leading-relaxed mt-1">
            <span
              className="inline-block w-[8px] h-[16px] align-middle animate-cursor-blink"
              style={{ backgroundColor: "var(--color-accent-thread)" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
