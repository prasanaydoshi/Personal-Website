interface AnnotationProps {
  type?: "metric" | "tag" | "note" | "timestamp";
  label?: string;
  children: React.ReactNode;
}

export default function Annotation({
  type = "note",
  label,
  children,
}: AnnotationProps) {
  if (type === "tag") {
    return (
      <span
        className="inline-block font-mono text-[13px] px-3 py-1 rounded-full"
        style={{
          backgroundColor: "var(--color-accent-sky-muted)",
          color: "var(--color-text-secondary)",
        }}
      >
        {children}
      </span>
    );
  }

  if (type === "metric") {
    return (
      <div
        className="py-3 pl-4 mb-4"
        style={{ borderLeft: "2px solid var(--color-border-default)" }}
      >
        {label && (
          <span
            className="block font-mono text-[11px] uppercase tracking-wider mb-1"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {label}
          </span>
        )}
        <span
          className="font-mono text-sm font-medium"
          style={{ color: "var(--color-accent-thread)" }}
        >
          {children}
        </span>
      </div>
    );
  }

  if (type === "timestamp") {
    return (
      <span
        className="font-mono text-[11px] tracking-wider"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        {children}
      </span>
    );
  }

  // Default: note
  return (
    <div
      className="py-3 pl-4 mb-4"
      style={{ borderLeft: "2px solid var(--color-border-default)" }}
      role="note"
    >
      {label && (
        <span
          className="block font-mono text-[11px] uppercase tracking-wider mb-1"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {label}
        </span>
      )}
      <span
        className="text-sm leading-relaxed"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {children}
      </span>
    </div>
  );
}
