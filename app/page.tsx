import { EmptySlotCard, ProjectCard } from "@/components/project-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

const lastUpdated = projects
  .map((project) => project.updated)
  .sort()
  .at(-1);

const shipped = projects.filter((p) => p.status === "live").length;
const nextSlot = String(projects.length + 1).padStart(2, "0");

function formatDate(iso?: string) {
  if (!iso) return "—";
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function Home() {
  return (
    <>
      {/* Soft light source behind the hero. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(60%_100%_at_50%_0%,var(--accent-soft),transparent_70%)]"
      />

      <header className="sticky top-0 z-10 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid size-6 place-items-center rounded-md bg-accent">
              <span className="size-2 rounded-[2px] bg-bg-elevated" />
            </span>
            <span className="text-sm font-medium tracking-[-0.01em]">
              {site.name}
            </span>
          </div>

          <nav className="flex items-center gap-1.5">
            {site.repoUrl && (
              <a
                href={site.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-3 py-1.5 text-sm text-text-muted transition-colors hover:text-text"
              >
                GitHub
              </a>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6">
        <section className="border-b border-border py-20 sm:py-28">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            Practice log
          </p>

          <h1 className="max-w-2xl text-balance text-4xl font-medium leading-[1.08] tracking-[-0.03em] sm:text-5xl">
            Learning to build with Claude, one project at a time.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            Every experiment gets its own page and its own entry below — kept
            here so I can retrace what I did, and so anyone else can follow
            along.
          </p>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6 sm:gap-6">
            <Stat label="Projects" value={String(projects.length)} />
            <Stat label="Shipped" value={String(shipped)} />
            <Stat label="Updated" value={formatDate(lastUpdated)} />
          </dl>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mb-8 flex items-baseline justify-between gap-4">
            <h2 className="text-sm font-medium uppercase tracking-[0.1em] text-text-muted">
              Projects
            </h2>
            <span className="font-mono text-xs text-text-subtle">
              {String(projects.length).padStart(2, "0")} total
            </span>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.slot}>
                <ProjectCard project={project} />
              </li>
            ))}
            <li>
              <EmptySlotCard slot={nextSlot} />
            </li>
          </ul>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.name} · {site.author}
          </p>
          <p className="font-mono text-xs">Built with Claude Code</p>
        </div>
      </footer>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-subtle">
        {label}
      </dt>
      <dd className="mt-1.5 text-base font-medium tracking-[-0.01em] sm:text-lg">
        {value}
      </dd>
    </div>
  );
}
