import { useState } from "react";

/**
 * 메인 페이지의 Skills 섹션.
 * 아이콘은 iconify.design (logos / simple-icons 세트) CDN에서 SVG로 받아옴.
 * - 외부 의존성 없음(설치 필요 X)
 * - logos 세트: 브랜드 공식 색상 (슬랙, 피그마 등)
 * - simple-icons 세트: 단색 (브랜드가 logos에 없는 경우)
 * - 아이콘 누락 시 onError로 색상 이니셜 뱃지 표시
 */

type Tool = {
  name: string;
  /** iconify 경로 (예: logos:slack-icon, simple-icons:notion) */
  icon: string;
  /** 로컬 이미지 경로. 있으면 iconify보다 우선 적용 */
  customSrc?: string;
  /** 아이콘 로드 실패 시 fallback 색상 */
  fallbackColor?: string;
};

const tools: Tool[] = [
  // 디자인 / 프로토타이핑
  // Axure는 iconify에 없어서 로컬 PNG 사용 (public/skills/axure.png)
  {
    name: "Axure",
    icon: "carbon:diagram",
    customSrc: "/skills/axure.png",
    fallbackColor: "#FF6F00",
  },
  { name: "Figma", icon: "logos:figma" },
  // 프로젝트 매니징
  { name: "Jira", icon: "logos:jira" },
  { name: "Confluence", icon: "logos:confluence" },
  // 커뮤니케이션 / 문서
  { name: "Slack", icon: "logos:slack-icon" },
  { name: "Notion", icon: "logos:notion-icon" },
  // 개발 / 배포
  { name: "Vercel", icon: "logos:vercel-icon" },
  { name: "Cursor", icon: "simple-icons:cursor", fallbackColor: "#000000" },
  { name: "Claude Code", icon: "simple-icons:anthropic", fallbackColor: "#D97757" },
  // 영상 / 미디어
  { name: "Runway ML", icon: "simple-icons:runwayml", fallbackColor: "#000000" },
  { name: "Premiere Pro", icon: "logos:adobe-premiere" },
];

const languages = [
  { code: "EN", name: "English (영어)" },
  { code: "JP", name: "日本語 (일본어)" },
];

function SkillIcon({ tool }: { tool: Tool }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    // 색상 이니셜 뱃지로 fallback
    return (
      <span
        className="skill-icon-fallback"
        style={{
          backgroundColor: tool.fallbackColor ?? "#888",
          color: "#fff",
        }}
        aria-hidden="true"
      >
        {tool.name.slice(0, 2).toUpperCase()}
      </span>
    );
  }
  // customSrc가 있으면 우선 사용 (로컬 호스팅 PNG/SVG)
  const src = tool.customSrc ?? `https://api.iconify.design/${tool.icon}.svg`;
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      width={32}
      height={32}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export function SkillsSection() {
  return (
    <section className="skills-section" aria-label="Skills">
      <div className="skills-heading">
        <p className="eyebrow">Skills</p>
        <h2>도구와 언어</h2>
        <p className="skills-intro">
          기획부터 배포, 영상 편집까지 — 직접 사용하는 도구들과 외국어 능력입니다.
        </p>
      </div>

      <div className="skills-group">
        <h3 className="skills-subheading">Tools</h3>
        <ul className="skills-grid">
          {tools.map((t) => (
            <li className="skill-item" key={t.name}>
              <SkillIcon tool={t} />
              <span>{t.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="skills-group">
        <h3 className="skills-subheading">Languages</h3>
        <ul className="languages-list">
          {languages.map((l) => (
            <li key={l.code}>
              <span className="lang-badge">{l.code}</span>
              <span>{l.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
