import Annotation from "./Annotation";

interface ProjectRowProps {
  name: string;
  description: string;
  tech: string[];
  href: string;
  external?: boolean;
}

export default function ProjectRow({
  name,
  description,
  tech,
  href,
  external = false,
}: ProjectRowProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group block py-4 transition-all duration-200 hover:pl-2"
      style={{
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
      aria-label={`${name} — ${description}`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md -z-10"
        style={{ backgroundColor: "var(--color-accent-sky-muted)" }}
      />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex-1 min-w-0">
          <span
            className="font-heading text-lg font-medium block md:inline"
            style={{ color: "var(--color-text-primary)" }}
          >
            {name}
          </span>
          <span
            className="text-base block md:inline md:ml-3"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {description}
          </span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex flex-wrap gap-1.5">
            {tech.map((t) => (
              <Annotation key={t} type="tag">
                {t}
              </Annotation>
            ))}
          </div>
          <span
            className="text-base transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: "var(--color-accent-thread)" }}
          >
            {external ? "↗" : "→"}
          </span>
        </div>
      </div>
    </a>
  );
}
