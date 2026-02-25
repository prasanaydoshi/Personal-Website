"use client";

import { useIntersectionReveal } from "@/hooks/useIntersectionReveal";

interface LogEntryProps {
  number: string; // e.g. "001"
  id: string;
  title?: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}

export default function LogEntry({
  number,
  id,
  title,
  children,
  aside,
  className = "",
}: LogEntryProps) {
  const { ref, isVisible } = useIntersectionReveal({ threshold: 0.08 });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-20 md:py-24 ${className}`}
      aria-labelledby={title ? `${id}-heading` : undefined}
    >
      {/* Entry divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-content"
        style={{ borderTop: "1px solid var(--color-border-subtle)" }}
      />

      <div className="max-w-content mx-auto px-4 md:px-8">
        {/* Entry number label */}
        <div
          className={`mb-6 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span
            className="font-mono text-[11px] uppercase tracking-[0.08em] inline-flex items-center gap-2"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            <span
              className="inline-block w-5 h-[1px]"
              style={{ backgroundColor: "var(--color-accent-thread)" }}
            />
            Entry {number}
          </span>
        </div>

        {/* Content grid: main + aside */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Main content */}
          <div
            className={`lg:col-span-7 transition-all duration-600 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
          >
            {title && (
              <h2
                id={`${id}-heading`}
                className="font-heading font-bold text-2xl md:text-3xl mb-6 tracking-tight"
                style={{ color: "var(--color-text-primary)" }}
              >
                {title}
              </h2>
            )}
            {children}
          </div>

          {/* Aside / Annotations */}
          {aside && (
            <aside
              className={`lg:col-span-4 lg:col-start-9 transition-all duration-500 delay-200 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-5"
              }`}
              style={{
                transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {aside}
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
