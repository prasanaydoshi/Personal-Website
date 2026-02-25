"use client";

import { useIntersectionReveal } from "@/hooks/useIntersectionReveal";
import Annotation from "./Annotation";

interface ProjectCardProps {
  title: string;
  context: string;
  approach: string;
  outcome: string;
  tech: string[];
  metrics?: { label: string; value: string }[];
  imageAlt?: string;
  link?: string;
  reverse?: boolean;
}

export default function ProjectCard({
  title,
  context,
  approach,
  outcome,
  tech,
  metrics = [],
  imageAlt = "Project screenshot",
  link,
  reverse = false,
}: ProjectCardProps) {
  const { ref, isVisible } = useIntersectionReveal({ threshold: 0.1 });

  return (
    <article
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Visual placeholder */}
      <div
        className={`lg:col-span-5 ${reverse ? "lg:order-1" : "lg:order-2"}`}
      >
        <div
          className="w-full aspect-[4/3] rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: "var(--color-bg-surface)",
            border: "1px solid var(--color-border-subtle)",
          }}
        >
          <span
            className="font-mono text-sm"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {imageAlt}
          </span>
        </div>

        {/* Metrics below visual on desktop */}
        {metrics.length > 0 && (
          <div className="hidden lg:block mt-6 space-y-3">
            {metrics.map((m, i) => (
              <Annotation key={i} type="metric" label={m.label}>
                {m.value}
              </Annotation>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`lg:col-span-7 ${reverse ? "lg:order-2" : "lg:order-1"}`}
      >
        <h3
          className="font-heading font-bold text-xl md:text-2xl mb-4 tracking-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </h3>

        <div className="space-y-4 mb-6">
          <div>
            <span
              className="font-mono text-[11px] uppercase tracking-wider block mb-1"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Context
            </span>
            <p
              className="text-md leading-relaxed"
              style={{ color: "var(--color-text-primary)" }}
            >
              {context}
            </p>
          </div>

          <div>
            <span
              className="font-mono text-[11px] uppercase tracking-wider block mb-1"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Approach
            </span>
            <p
              className="text-md leading-relaxed"
              style={{ color: "var(--color-text-primary)" }}
            >
              {approach}
            </p>
          </div>

          <div>
            <span
              className="font-mono text-[11px] uppercase tracking-wider block mb-1"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Outcome
            </span>
            <p
              className="text-md leading-relaxed font-medium"
              style={{ color: "var(--color-accent-thread)" }}
            >
              {outcome}
            </p>
          </div>
        </div>

        {/* Mobile metrics */}
        {metrics.length > 0 && (
          <div className="lg:hidden mb-6 space-y-3">
            {metrics.map((m, i) => (
              <Annotation key={i} type="metric" label={m.label}>
                {m.value}
              </Annotation>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tech.map((t) => (
            <Annotation key={t} type="tag">
              {t}
            </Annotation>
          ))}
        </div>

        {/* Link */}
        {link && (
          <a
            href={link}
            className="inline-flex items-center gap-2 font-body text-base font-medium transition-all duration-200 group"
            style={{ color: "var(--color-accent-thread)" }}
          >
            Read case study
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
