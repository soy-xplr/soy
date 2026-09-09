import type { WesternResumeUi } from "../data/westernResume";
import { defaultEnSections, resumeEnData } from "../data/resumeEnData";
import { WesternResume } from "../westernResume/WesternResume";
import { useWesternResumeState } from "../westernResume/useWesternResumeState";

const ui: WesternResumeUi = {
  edit: "✎ Edit",
  done: "✓ Done",
  print: "Save as PDF / Print",
  exportJson: "Export JSON",
  importJson: "Import JSON",
  reset: "Reset",
  confirmReset: "Discard all edits and reset to defaults?",
  importError: "Import failed.",
  hintEdit: "Click any text to edit · changes auto-save in this browser",
  hintPrint: "Chrome · Ctrl/⌘ + P → “Save as PDF” → Margins “None”, Scale 100%",
  add: {
    paragraph: "paragraph",
    capability: "capability",
    company: "company",
    project: "project",
    education: "education",
    language: "language",
    tool: "tool",
    toolGroup: "group",
    contact: "contact",
    bulletGroup: "bullet group",
  },
  sectionOrder: ["summary", "capabilities", "experience", "education", "languages", "tools"],
  navLinks: [
    { href: "/resume-v4", label: "국문 v4 →" },
    { href: "/resume-v3", label: "국문 v3 →" },
    { href: "/resume-v2", label: "국문 v2 →" },
  ],
};

// /resume-en route: A4 print-ready English résumé.
export function ResumeEnPage() {
  const state = useWesternResumeState({
    storageKey: "beautifulweb-resume-en:v1",
    defaultData: resumeEnData,
    defaultSections: defaultEnSections,
    fileName: "resume-en",
    importErrorMessage: "Not a valid résumé JSON file.",
  });

  return <WesternResume state={state} ui={ui} />;
}
