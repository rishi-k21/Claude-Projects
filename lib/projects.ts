export type ProjectStatus = "live" | "building" | "planned";

export type Project = {
  /** Two-digit slot number shown on the card. Keep these sequential. */
  slot: string;
  title: string;
  /** One or two sentences. What it is, and what it taught me. */
  description: string;
  /** Internal route (e.g. "/projects/foo") or an external URL. Omit if not shipped. */
  href?: string;
  status: ProjectStatus;
  /** Tools, techniques or concepts practised. Keep to 2-4 items. */
  tags: string[];
  /** ISO date (YYYY-MM-DD) the project was last touched. */
  updated: string;
};

/*
 * ─────────────────────────────────────────────────────────────────────────
 * To add a project, copy this block to the top of the array and fill it in:
 *
 *   {
 *     slot: "02",
 *     title: "Project name",
 *     description: "What it does and what it taught me.",
 *     href: "/projects/project-name",
 *     status: "building",
 *     tags: ["Next.js", "Claude Code"],
 *     updated: "2026-08-21",
 *   },
 * ─────────────────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  {
    slot: "01",
    title: "Project Index",
    description:
      "This page. A Next.js app, a GitHub repo and a Vercel deployment set up end to end from a single Claude Code session — the home base every later project links back to.",
    href: "/",
    status: "live",
    tags: ["Next.js", "Tailwind CSS", "Vercel", "Claude Code"],
    updated: "2026-08-20",
  },
];

export const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  building: "In progress",
  planned: "Planned",
};
