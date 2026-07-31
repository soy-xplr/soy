import { useRef, useState, type ChangeEvent } from "react";
import type { ProjectItemData, ResumeData } from "../data/resumeData";
import { EditContext } from "./EditContext";
import { useResumeState } from "./useResumeState";
import { Page } from "./Page";
import { Header } from "./Header";
import { Introduction } from "./Introduction";
import { Section } from "./Section";
import { ProjectItem } from "./ProjectItem";
import { ExperienceItem } from "./ExperienceItem";
import { EducationItem } from "./EducationItem";
import { Skills } from "./Skills";
import { AddButton } from "./editControls";
import styles from "./Resume.module.css";

// 프로젝트를 페이지별로 나눕니다: 1페이지 1개, 이후 페이지마다 2개.
// (프로젝트를 추가/삭제하면 페이지가 자동으로 늘거나 줄어듭니다.)
const FIRST_PAGE_PROJECTS = 1;
const PROJECTS_PER_PAGE = 2;

function chunkProjects(projects: ProjectItemData[]): ProjectItemData[][] {
  if (projects.length === 0) return [[]];
  const chunks: ProjectItemData[][] = [projects.slice(0, FIRST_PAGE_PROJECTS)];
  for (let i = FIRST_PAGE_PROJECTS; i < projects.length; i += PROJECTS_PER_PAGE) {
    chunks.push(projects.slice(i, i + PROJECTS_PER_PAGE));
  }
  return chunks;
}

const blankProject: ProjectItemData = {
  title: "새 프로젝트",
  summary: "한 줄 설명",
  period: "2025.01 - 2025.12",
  icon: "PJ",
  iconColors: ["#5b8def", "#a879f0"],
  highlights: [],
  bullets: [],
};

export function Resume({ data: initialData }: { data: ResumeData }) {
  const { data, update, exportJson, importJson, reset } = useResumeState();
  const [editing, setEditing] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);
  // initialData는 기본값 fallback 용도로만 사용(저장된 값이 있으면 그것을 우선).
  void initialData;

  const { profile, projects, experiences, education, skills } = data;
  const projectPages = chunkProjects(projects);
  const totalPages = projectPages.length + 1;

  const onImportFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      await importJson(file);
    } catch (error) {
      alert(error instanceof Error ? error.message : "불러오기에 실패했습니다.");
    }
  };

  // 프로젝트 인덱스는 페이지 묶음을 고려해 계산합니다.
  const pageStartIndex = (pageIndex: number) =>
    pageIndex === 0 ? 0 : FIRST_PAGE_PROJECTS + (pageIndex - 1) * PROJECTS_PER_PAGE;

  const footer = (index: number) => (
    <>
      <span>{profile.name}</span>
      <span>
        {index + 1} / {totalPages}
      </span>
    </>
  );

  return (
    <EditContext.Provider value={{ editing }}>
      <div className={`${styles.viewport} ${editing ? styles.viewportEditing : ""}`}>
        <div className={styles.toolbar}>
          <button
            type="button"
            className={`${styles.printButton} ${editing ? styles.toolbarActive : ""}`}
            onClick={() => setEditing((v) => !v)}
          >
            {editing ? "✓ 편집 완료" : "✎ 편집"}
          </button>

          {editing ? (
            <>
              <button type="button" className={styles.ghostButton} onClick={exportJson}>
                JSON 내보내기
              </button>
              <button
                type="button"
                className={styles.ghostButton}
                onClick={() => importRef.current?.click()}
              >
                JSON 불러오기
              </button>
              <button
                type="button"
                className={styles.ghostButton}
                onClick={() => {
                  if (confirm("모든 편집 내용을 지우고 기본값으로 되돌릴까요?")) reset();
                }}
              >
                초기화
              </button>
              <input
                ref={importRef}
                type="file"
                accept="application/json,.json"
                hidden
                onChange={onImportFile}
              />
            </>
          ) : (
            <button type="button" className={styles.printButton} onClick={() => window.print()}>
              PDF로 저장 / 인쇄
            </button>
          )}

          <span className={styles.toolbarHint}>
            {editing
              ? "텍스트를 클릭해 바로 수정 · 변경은 이 브라우저에 자동 저장됩니다"
              : "Chrome · Ctrl/⌘ + P → “PDF로 저장” → 여백 “없음”, 배율 100%"}
          </span>
        </div>

        {/* ── 1페이지: 헤더 + 자기소개 + 프로젝트(첫 묶음) ── */}
        <Page footer={footer(0)}>
          <Header
            profile={profile}
            onChange={(next) => update((d) => void (d.profile = next))}
          />
          <Introduction
            paragraphs={profile.introduction}
            onChange={(next) => update((d) => void (d.profile.introduction = next))}
          />
          <Section title="AI Projects">
            {projectPages[0].map((project, i) => (
              <ProjectItem
                key={pageStartIndex(0) + i}
                project={project}
                onChange={(next) => update((d) => void (d.projects[pageStartIndex(0) + i] = next))}
                onDelete={() =>
                  update((d) => d.projects.splice(pageStartIndex(0) + i, 1))
                }
              />
            ))}
            {projectPages.length === 1 ? (
              <AddButton
                label="프로젝트"
                onClick={() => update((d) => d.projects.push(structuredClone(blankProject)))}
              />
            ) : null}
          </Section>
        </Page>

        {/* ── 이어지는 프로젝트 페이지들 ── */}
        {projectPages.slice(1).map((pageProjects, sliceIndex) => {
          const pageIndex = sliceIndex + 1;
          const start = pageStartIndex(pageIndex);
          const isLastProjectPage = pageIndex === projectPages.length - 1;
          return (
            <Page key={`projects-${pageIndex}`} footer={footer(pageIndex)}>
              <Section title="AI Projects (이어서)">
                {pageProjects.map((project, i) => (
                  <ProjectItem
                    key={start + i}
                    project={project}
                    onChange={(next) => update((d) => void (d.projects[start + i] = next))}
                    onDelete={() => update((d) => d.projects.splice(start + i, 1))}
                  />
                ))}
                {isLastProjectPage ? (
                  <AddButton
                    label="프로젝트"
                    onClick={() => update((d) => d.projects.push(structuredClone(blankProject)))}
                  />
                ) : null}
              </Section>
            </Page>
          );
        })}

        {/* ── 마지막 페이지: 경력 + 학력 + 기술 ── */}
        <Page footer={footer(totalPages - 1)}>
          <Section title="Experience">
            {experiences.map((experience, i) => (
              <ExperienceItem
                key={i}
                experience={experience}
                onChange={(next) => update((d) => void (d.experiences[i] = next))}
                onDelete={() => update((d) => d.experiences.splice(i, 1))}
              />
            ))}
            <AddButton
              label="경력"
              onClick={() =>
                update((d) =>
                  d.experiences.push({
                    company: "회사명",
                    role: "직무",
                    period: "2024.01 - 재직 중",
                    summary: "",
                    bullets: [],
                  }),
                )
              }
            />
          </Section>

          <Section title="Education">
            {education.map((item, i) => (
              <EducationItem
                key={i}
                education={item}
                onChange={(next) => update((d) => void (d.education[i] = next))}
                onDelete={() => update((d) => d.education.splice(i, 1))}
              />
            ))}
            <AddButton
              label="학력"
              onClick={() =>
                update((d) =>
                  d.education.push({
                    school: "학교명",
                    degree: "학위/전공",
                    period: "2013.03 - 2019.02",
                  }),
                )
              }
            />
          </Section>

          <Section title="Skills">
            <Skills
              groups={skills}
              onChange={(next) => update((d) => void (d.skills = next))}
            />
          </Section>
        </Page>
      </div>
    </EditContext.Provider>
  );
}
