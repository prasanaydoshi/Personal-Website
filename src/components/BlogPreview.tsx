import Annotation from "./Annotation";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  dateFormatted: string;
  category?: string;
  href: string;
}

interface BlogPreviewProps {
  posts: BlogPost[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <div className="space-y-8">
      {posts.map((post, i) => (
        <article
          key={i}
          className="pb-8"
          style={{
            borderBottom:
              i < posts.length - 1
                ? "1px solid var(--color-border-subtle)"
                : "none",
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <time
              dateTime={post.date}
              className="font-mono text-[11px] tracking-wider uppercase"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {post.dateFormatted}
            </time>
            {post.category && (
              <Annotation type="tag">{post.category}</Annotation>
            )}
          </div>

          <h3 className="mb-2">
            <a
              href={post.href}
              className="font-heading text-lg font-medium transition-colors duration-200 hover:underline hover:underline-offset-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              {post.title}
            </a>
          </h3>

          <p
            className="text-base leading-relaxed line-clamp-2"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {post.excerpt}
          </p>
        </article>
      ))}

      <a
        href="/blog"
        className="inline-flex items-center gap-2 font-body text-base font-medium transition-all duration-200 group"
        style={{ color: "var(--color-accent-thread)" }}
      >
        View all posts
        <span className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </a>
    </div>
  );
}
