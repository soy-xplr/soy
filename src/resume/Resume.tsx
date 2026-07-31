import type { ResumeData } from "../data/resumeData";
import { Page } from "./Page";
import { Header } from "./Header";
import { Introduction } from "./Introduction";
import { Section } from "./Section";
import { ProjectItem } from "./ProjectItem";
import { ExperienceItem } from "./ExperienceItem";
import { EducationItem } from "./EducationItem";
import { Skills } from "./Skills";
import styles from "./Resume.module.css";

// ─────────────────────────────────────────────────────────────
// 페이지 배치 규칙
// 자동 페이지 분할에 의존하지 않고, 각 A4 페이지에 들어갈 콘텐츠를
// 여기에서 명시적으로 나눕니다. 프로젝트가 많아지면 아래 pageBreaks
// 값만 조정하면 됩니다. (한 페이지에 안 들어가는 프로젝트는 통째로
// 다음 페이지로 이동)
//
//  - 1페이지: 헤더 + 자기소개 + "AI Projects"의 첫 프로젝트
//  - 2페이지: "AI Projects"의 나머지 프로젝트
//  - 3페이지: 경력 + 학력 + 기술
// ─────────────────────────────────────────────────────────────

// AI Projects 섹션을 페이지별로 몇 개씩 나눌지 정의합니다.
const PROJECTS_PER_PAGE = [1, 2];

function chunkProjects<T>(items: T[], sizes: number[]): T[][] {
  const chunks: T[][] = [];
  let cursor = 0;

  for (const size of sizes) {
    if (cursor >= items.length) break;
    chunks.push(items.slice(cursor, cursor + size));
    cursor += size;
  }
  // 정의된 크기를 초과하는 프로젝트는 마지막 페이지에 이어 붙입니다.
  if (cursor < items.length) {
    if (chunks.length === 0) chunks.push([]);
    chunks[chunks.length - 1].push(...items.slice(cursor));
  }
  return chunks;
}

export function Resume({ data }: { data: ResumeData }) {
  const { profile, projects, experiences, education, skills } = data;
  const projectPages = chunkProjects(projects, PROJECTS_PER_PAGE);
  const totalPages = projectPages.length + 1; // 프로젝트 페이지들 + 마지막(경력/학력/기술)

  const footer = (index: number) => (
    <>
      <span>{profile.name}</span>
      <span>
        {index + 1} / {totalPages}
      </span>
    </>
  );

  return (
    <div className={styles.viewport}>
      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.printButton}
          onClick={() => window.print()}
        >
          PDF로 저장 / 인쇄
        </button>
        <span className={styles.toolbarHint}>
          Chrome · Ctrl/⌘ + P → 대상을 “PDF로 저장” → 여백 “없음”, 배율 100%
        </span>
      </div>

      {/* ── 1페이지: 헤더 + 자기소개 + AI Projects(첫 묶음) ── */}
      <Page footer={footer(0)}>
        <Header profile={profile} />
        <Introduction paragraphs={profile.introduction} />
        {projectPages[0] && projectPages[0].length > 0 ? (
          <Section title="AI Projects">
            {projectPages[0].map((project) => (
              <ProjectItem key={project.title} project={project} />
            ))}
          </Section>
        ) : null}
      </Page>

      {/* ── 이어지는 프로젝트 페이지들 ── */}
      {projectPages.slice(1).map((pageProjects, pageIndex) => (
        <Page key={`projects-${pageIndex}`} footer={footer(pageIndex + 1)}>
          <Section title={pageIndex === 0 ? "AI Projects (이어서)" : "Projects"}>
            {pageProjects.map((project) => (
              <ProjectItem key={project.title} project={project} />
            ))}
          </Section>
        </Page>
      ))}

      {/* ── 마지막 페이지: 경력 + 학력 + 기술 ── */}
      <Page footer={footer(totalPages - 1)}>
        {experiences.length > 0 ? (
          <Section title="Experience">
            {experiences.map((experience) => (
              <ExperienceItem key={experience.company} experience={experience} />
            ))}
          </Section>
        ) : null}

        {education.length > 0 ? (
          <Section title="Education">
            {education.map((item) => (
              <EducationItem key={item.school} education={item} />
            ))}
          </Section>
        ) : null}

        {skills.length > 0 ? (
          <Section title="Skills">
            <Skills groups={skills} />
          </Section>
        ) : null}
      </Page>
    </div>
  );
}
