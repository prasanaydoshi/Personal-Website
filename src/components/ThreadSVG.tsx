"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface ThreadNode {
  y: number; // percentage of total page height
}

const nodes: ThreadNode[] = [
  { y: 0.12 },
  { y: 0.3 },
  { y: 0.5 },
  { y: 0.65 },
  { y: 0.78 },
  { y: 0.9 },
];

export default function ThreadSVG() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { progress } = useScrollProgress();
  const [pathLength, setPathLength] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);

  // Calculate page height and path
  useEffect(() => {
    const updateHeight = () => {
      const h = document.documentElement.scrollHeight;
      setPageHeight(h);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setPathLength(len);
    }
  }, [pageHeight]);

  if (pageHeight === 0) return null;

  // Build a gentle sinusoidal path
  const cx = 30; // center x
  const amplitude = 12;
  const points: string[] = [];
  const segments = 60;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = cx + Math.sin(t * Math.PI * 4) * amplitude;
    const y = t * pageHeight;
    if (i === 0) {
      points.push(`M ${x} ${y}`);
    } else {
      points.push(`L ${x} ${y}`);
    }
  }
  const pathD = points.join(" ");

  const dashOffset = pathLength - progress * pathLength;

  return (
    <svg
      ref={svgRef}
      className="fixed left-[calc(50%-40rem)] top-0 w-[60px] pointer-events-none hidden lg:block"
      style={{
        height: "100vh",
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      {/* Background track */}
      <line
        x1={cx}
        y1="0"
        x2={cx}
        y2="100%"
        stroke="var(--color-border-subtle)"
        strokeWidth="1"
      />

      {/* Animated thread */}
      <path
        ref={pathRef}
        d={`M ${cx} 0 L ${cx} ${pageHeight}`}
        fill="none"
        stroke="var(--color-thread-stroke)"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          strokeDasharray: pathLength || 1,
          strokeDashoffset: pathLength ? dashOffset : 1,
          transition: "stroke-dashoffset 0.1s linear",
        }}
      />

      {/* Nodes at section breaks */}
      {nodes.map((node, i) => {
        const nodeY = node.y * 100;
        const isActive = progress >= node.y - 0.02;
        return (
          <g key={i}>
            {/* Pulse ring */}
            {isActive && (
              <circle
                cx={cx}
                cy={`${nodeY}%`}
                r="14"
                fill="none"
                stroke="var(--color-thread-node-pulse)"
                strokeWidth="1.5"
                className="animate-node-pulse"
                opacity="0"
              />
            )}
            {/* Node dot */}
            <circle
              cx={cx}
              cy={`${nodeY}%`}
              r={isActive ? "5" : "3"}
              fill={
                isActive
                  ? "var(--color-thread-node)"
                  : "var(--color-bg-surface)"
              }
              stroke="var(--color-thread-node)"
              strokeWidth="2"
              style={{
                transition: "r 0.3s ease, fill 0.3s ease",
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}
