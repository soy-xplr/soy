import type { WesternResumeUi } from "../data/westernResume";
import { defaultV4Sections, resumeV4Data } from "../data/resumeV4Data";
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
  hintEdit: "텍스트를 클릭해 바로 수정 · **굵게** 표기 그대로 입력하면 강조됩니다",
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
  sectionOrder: ["summary", "capabilities", "experience", "education", "tools", "languages"],
  navLinks: [
    { href: "/resume-v5", label: "국문 v5 →" },
    { href: "/resume-v3", label: "국문 v3 →" },
    { href: "/resume-v2", label: "국문 v2 →" },
    { href: "/resume-en", label: "English →" },
  ],
  // 프로젝트 제목을 키우고 프로젝트 사이 여백을 넓힌 레이아웃
  variant: "spacious",
};

// /resume-v4 route: 국문 이력서 v4 (볼드 강조 + 프로젝트 구분 강화).
export function ResumeV4Page() {
  const state = useWesternResumeState({
    storageKey: "beautifulweb-resume-v4:v1",
    defaultData: resumeV4Data,
    defaultSections: defaultV4Sections,
    fileName: "resume-v4",
    importErrorMessage: "이력서 JSON 형식이 아닙니다.",
  });

  return <WesternResume state={state} ui={ui} />;
}
