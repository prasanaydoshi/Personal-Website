import Nav from "@/components/Nav";
import Link from "next/link";

export default function GeneralistInterviews() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="max-w-2xl mx-auto px-6 pt-32 pb-20 outline-none">
        <Link
          href="/"
          className="font-mono text-sm mb-8 inline-block transition-opacity hover:opacity-100"
          style={{ color: "var(--color-accent-thread)", opacity: 0.7 }}
        >
          &larr; Back to main page
        </Link>

        <header className="mb-10">
          <time
            dateTime="2026-01-28"
            className="font-mono text-[11px] tracking-wider uppercase"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            Jan 28, 2026
          </time>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mt-2 tracking-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            A Generalist&apos;s Guide to Technical Interviews
          </h1>
        </header>

        <article
          className="prose space-y-5 text-base leading-relaxed"
          style={{ color: "var(--color-text-primary)" }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu felis non velit lacinia ullamcorper. Suspendisse facilisis nisi at nisi hendrerit, vitae consequat ipsum condimentum. Nullam aliquet, eros non faucibus fermentum, nisi nunc varius velit, at tincidunt odio metus eget lorem.
          </p>
          <p>
            Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. In auctor lobortis lacus. Quisque libero metus, condimentum at, tempus in, eleifend ac, enim. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
          </p>
          <h2
            className="font-heading font-bold text-xl mt-8"
            style={{ color: "var(--color-text-primary)" }}
          >
            The Generalist&apos;s Dilemma
          </h2>
          <p>
            Praesent blandit laoreet nibh. Fusce convallis metus id felis luctus adipiscing. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Quisque id mi. Ut tincidunt tincidunt erat. Etiam vestibulum volutpat enim. Diam in magna bibendum sit amet, consectetuer adipiscing elit.
          </p>
          <p>
            Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Aenean viverra rhoncus pede. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut non enim eleifend felis pretium feugiat. Vivamus quis mi. Phasellus a est. Phasellus magna.
          </p>
          <h2
            className="font-heading font-bold text-xl mt-8"
            style={{ color: "var(--color-text-primary)" }}
          >
            My Approach After 30+ Mock Interviews
          </h2>
          <p>
            In hac habitasse platea dictumst. Cras id dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi.
          </p>
          <p>
            Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.
          </p>
        </article>
      </main>
    </>
  );
}
