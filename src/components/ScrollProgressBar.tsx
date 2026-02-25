"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

const sections = [
  { id: "entry-001", label: "001", position: 0.12 },
  { id: "entry-002", label: "002", position: 0.3 },
  { id: "entry-003", label: "003", position: 0.5 },
  { id: "entry-004", label: "004", position: 0.65 },
  { id: "entry-005", label: "005", position: 0.78 },
  { id: "entry-006", label: "006", position: 0.9 },
];

export default function ScrollProgressBar() {
  const { progress } = useScrollProgress();

  return (
    <div
      className="fixed top-[61px] md:top-[69px] left-0 right-0 z-[101] h-[2px] hidden md:block"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
      style={{ backgroundColor: "var(--color-border-subtle)" }}
    >
      {/* Fill */}
      <div
        className="h-full transition-none"
        style={{
          width: `${progress * 100}%`,
          backgroundColor: "var(--color-accent-thread)",
        }}
      />

      {/* Section ticks */}
      {sections.map((section) => {
        const proximity = Math.abs(progress - section.position);
        const isNear = proximity < 0.06;
        return (
          <span
            key={section.id}
            className="absolute top-[4px] font-mono transition-opacity duration-200 select-none pointer-events-none"
            style={{
              left: `${section.position * 100}%`,
              transform: "translateX(-50%)",
              fontSize: "9px",
              letterSpacing: "0.08em",
              color: "var(--color-text-tertiary)",
              opacity: isNear ? 1 : 0,
            }}
          >
            {section.label}
          </span>
        );
      })}
    </div>
  );
}
