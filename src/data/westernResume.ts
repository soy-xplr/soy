// ─────────────────────────────────────────────────────────────
// Shared types for the "Western format" résumé pages
// (Work Experience lists companies; each company introduces its projects.)
// Used by /resume-en (English) and /resume-v2 (Korean).
// ─────────────────────────────────────────────────────────────
import type { BulletNode } from "./resumeData";

export type WContact = {
  label: string;
  href?: string;
  /** Render on its own emphasised line below the inline contact row. */
  highlight?: boolean;
};

/** Core competency: a bold label with an optional description. */
export type WCapability = { label: string; description?: string };

/**
 * A labelled block of bullets inside a project.
 * `variant: "impact"` renders in a light box so metrics stand out (e.g. 성과).
 */
export type WBulletGroup = {
  label?: string;
  variant?: "impact";
  bullets: BulletNode[];
};

export type WProject = {
  groupLabel?: string; // subheading above this project
  name: string;
  role?: string;
  period?: string;
  /** Scale/scope line under the head, e.g. "MAU 170만 · 누적 가입자 700만". */
  meta?: string;
  description?: string;
  bullets?: BulletNode[]; // flat bullets (simple projects)
  groups?: WBulletGroup[]; // labelled bullet groups (richer projects)
  /** Single highlighted summary line closing the project, e.g. "주요 성과 | …". */
  impact?: string;
};

export type WExperience = {
  groupLabel?: string; // subheading above this company (e.g. "EARLIER EXPERIENCE")
  company: string;
  role: string;
  period: string;
  summary?: string;
  bullets?: BulletNode[]; // direct bullets for companies without sub-projects
  projects?: WProject[];
};

export type WEducation = {
  school: string;
  degree: string;
  period: string;
  note?: string;
};

export type WSkillGroup = { category: string; items: string[] };

export type WSectionKey =
  | "summary"
  | "capabilities"
  | "experience"
  | "education"
  | "tools"
  | "languages";

export type WSections = Record<WSectionKey, string>;

export type WesternResumeData = {
  profile: {
    name: string;
    location: string;
    title: string;
    contacts: WContact[];
    summary: string[];
    capabilities: WCapability[];
  };
  sections: WSections;
  experiences: WExperience[];
  education: WEducation[];
  languages: string[];
  tools: WSkillGroup[];
};

/** UI strings + section order, so one renderer serves both languages. */
export type WesternResumeUi = {
  edit: string;
  done: string;
  print: string;
  exportJson: string;
  importJson: string;
  reset: string;
  confirmReset: string;
  importError: string;
  hintEdit: string;
  hintPrint: string;
  add: {
    paragraph: string;
    capability: string;
    company: string;
    project: string;
    education: string;
    language: string;
    tool: string;
    toolGroup: string;
    contact: string;
    bulletGroup: string;
  };
  sectionOrder: WSectionKey[];
  navLinks: { href: string; label: string }[];
  /**
   * "spacious" enlarges headings and opens up spacing between projects.
   * "corporate" applies the single spacing scale, unified project hierarchy
   * and project-level page-break rules used by the submission résumé.
   */
  variant?: "spacious" | "corporate";
};
