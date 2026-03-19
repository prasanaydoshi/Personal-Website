import Nav from "@/components/Nav";
import Link from "next/link";

const posts = [
  {
    title: "Why Good Software Starts with the User, Not the Stack",
    excerpt:
      "Most dev portfolios showcase technologies. But the best software I've built started from a frustration, not a framework.",
    date: "2026-02-20",
    dateFormatted: "Feb 20, 2026",
    category: "Engineering",
    href: "/blog/user-centric-software",
  },
  {
    title: "From Dive Logs to Data Pipelines: What Scuba Taught Me About Systems",
    excerpt:
      "At 30 meters, you can't improvise. Every dive has a plan, a backup, and a checklist.",
    date: "2026-02-10",
    dateFormatted: "Feb 10, 2026",
    category: "Thinking",
    href: "/blog/diving-and-systems",
  },
  {
    title: "A Generalist's Guide to Technical Interviews",
    excerpt:
      "When your background spans ML, full-stack, and quant — how do you prepare for interviews that want you to be a specialist?",
    date: "2026-01-28",
    dateFormatted: "Jan 28, 2026",
    category: "Career",
    href: "/blog/generalist-interviews",
  },
];

export default function BlogArchive() {
  return (
    <>
      <Nav />
      <main className="max-w-2xl mx-auto px-6 pt-32 pb-20">
        <h1
          className="font-heading font-bold text-3xl mb-2 tracking-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          Transmissions
        </h1>
        <p
          className="text-base mb-12"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Thoughts on engineering, investing, and building things that matter.
        </p>

        <div className="space-y-10">
          {posts.map((post) => (
            <article key={post.href}>
              <time
                dateTime={post.date}
                className="font-mono text-[11px] tracking-wider uppercase"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {post.dateFormatted}
              </time>
              <h2 className="mt-1 mb-2">
                <Link
                  href={post.href}
                  className="font-heading text-xl font-medium hover:underline hover:underline-offset-4"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {post.title}
                </Link>
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
