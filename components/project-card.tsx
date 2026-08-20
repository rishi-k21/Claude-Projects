import Link from "next/link";
import type { Project } from "@/lib/projects";
import { statusLabel } from "@/lib/projects";

const dotColor: Record<Project["status"], string> = {
  live: "bg-live",
  building: "bg-building",
  planned: "bg-text-subtle",
};

function StatusPill({ status }: { status: Project["status"] }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted">
      <span className={`size-1.5 rounded-full ${dotColor[status]}`} />
      {statusLabel[status]}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const interactive = Boolean(project.href);

  const card = (
    <article
      className={`group relative flex h-full flex-col gap-5 rounded-2xl border border-border bg-surface p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 ${
        interactive
          ? "hover:-translate-y-0.5 hover:border-border-strong hover:shadow-card-lift"
          : ""
      }`}
    >
      <header className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs tracking-[0.14em] text-text-subtle">
          {project.slot}
        </span>
        <StatusPill status={project.status} />
      </header>

      <div className="flex flex-1 flex-col gap-2.5">
        <h3 className="text-lg font-medium tracking-[-0.015em] text-text">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          {project.description}
        </p>
      </div>

      <footer className="flex items-end justify-between gap-4 border-t border-border pt-4">
        <ul className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-surface-muted px-2 py-0.5 font-mono text-[10px] text-text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
        {interactive && (
          <span
            aria-hidden="true"
            className="shrink-0 text-text-subtle transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        )}
      </footer>
    </article>
  );

  if (!project.href) return card;

  const external = project.href.startsWith("http");

  return (
    <Link
      href={project.href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="block rounded-2xl"
    >
      {card}
    </Link>
  );
}

export function EmptySlotCard({ slot }: { slot: string }) {
  return (
    <div className="flex h-full min-h-[13rem] flex-col justify-between rounded-2xl border border-dashed border-border-strong/70 p-6">
      <span className="font-mono text-xs tracking-[0.14em] text-text-subtle">
        {slot}
      </span>
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-text-muted">Next slot open</p>
        <p className="text-sm leading-relaxed text-text-subtle">
          The next practice project lands here — add an entry to{" "}
          <code className="font-mono text-[0.8em]">lib/projects.ts</code>.
        </p>
      </div>
    </div>
  );
}
