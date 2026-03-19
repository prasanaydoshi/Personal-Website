import Nav from "@/components/Nav";
import Link from "next/link";

export default function DivingAndSystems() {
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
            dateTime="2026-02-10"
            className="font-mono text-[11px] tracking-wider uppercase"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            Feb 10, 2026
          </time>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mt-2 tracking-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            From Dive Logs to Data Pipelines: What Scuba Taught Me About Systems
          </h1>
        </header>

        <article
          className="prose space-y-5 text-base leading-relaxed"
          style={{ color: "var(--color-text-primary)" }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel magna eu libero consequat pharetra at nec urna. Vivamus at erat vel velit blandit volutpat eu non risus. Integer congue turpis id odio auctor, non tincidunt libero porttitor.
          </p>
          <p>
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce varius, lectus vitae facilisis vehicula, sem justo faucibus nibh, id eleifend lorem nulla vitae enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
          </p>
          <h2
            className="font-heading font-bold text-xl mt-8"
            style={{ color: "var(--color-text-primary)" }}
          >
            Preparation is Not Optional
          </h2>
          <p>
            Cras accumsan leo vel dolor interdum, nec varius lectus elementum. Maecenas vestibulum velit eu sapien tempor, ac porttitor eros sodales. Aliquam erat volutpat. Donec lacinia sem non elit mollis consequat. Nulla facilisi. Suspendisse potenti. Sed efficitur velit sit amet ligula hendrerit, in varius metus volutpat.
          </p>
          <p>
            Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
          </p>
          <h2
            className="font-heading font-bold text-xl mt-8"
            style={{ color: "var(--color-text-primary)" }}
          >
            The Pipeline Parallel
          </h2>
          <p>
            Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
          </p>
          <p>
            Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
          </p>
        </article>
      </main>
    </>
  );
}
