import type { WesternResumeUi } from "../data/westernResume";
import { defaultV3Sections, resumeV3Data } from "../data/resumeV3Data";
import { WesternResume } from "../westernResume/WesternResume";
import { useWesternResumeState } from "../westernResume/useWesternResumeState";

const ui: WesternResumeUi = {
  edit: "✎ 편집",
  done: "✓ 편집 완료",
  print: "PDF로 저장 / 인쇄",
  exportJson: "JSON 내보내기",
  importJson: "JSON 불러오기",
  reset: "초기화",
  confirmReset: "모든 편집 내용을 지우고 기본값으로 되돌릴까요?",
  importError: "불러오기에 실패했습니다.",
  hintEdit: "텍스트를 클릭해 바로 수정 · 변경은 이 브라우저에 자동 저장됩니다",
  hintPrint: "Chrome · Ctrl/⌘ + P → “PDF로 저장” → 여백 “없음”, 배율 100%",
  add: {
    paragraph: "문단",
    capability: "역량",
    company: "회사",
    project: "프로젝트",
    education: "학력",
    language: "언어",
    tool: "스킬",
    toolGroup: "분류",
    contact: "연락처",
    bulletGroup: "소제목 그룹",
  },
  // SKILLS를 LANGUAGE보다 먼저 노출
  sectionOrder: ["summary", "capabilities", "experience", "education", "tools", "languages"],
  navLinks: [
    { href: "/resume-v4", label: "국문 v4 →" },
    { href: "/resume-v2", label: "국문 v2 →" },
    { href: "/resume-en", label: "English →" },
  ],
};

// /resume-v3 route: 국문 이력서 v3 (서구식 회사→프로젝트 포맷).
export function ResumeV3Page() {
  const state = useWesternResumeState({
    storageKey: "beautifulweb-resume-v3:v1",
    defaultData: resumeV3Data,
    defaultSections: defaultV3Sections,
    fileName: "resume-v3",
    importErrorMessage: "이력서 JSON 형식이 아닙니다.",
  });

  return <WesternResume state={state} ui={ui} />;
}
