import { useRef, useState, type ChangeEvent } from "react";
import type { ProjectItemData, ResumeData } from "../data/resumeData";
import { EditContext } from "./EditContext";
import { useResumeState } from "./useResumeState";
import { Header } from "./Header";
import { Introduction } from "./Introduction";
import { Section } from "./Section";
import { ProjectItem } from "./ProjectItem";
import { ExperienceItem } from "./ExperienceItem";
import { EducationItem } from "./EducationItem";
import { Skills } from "./Skills";
import { AddButton } from "./editControls";
import styles from "./Resume.module.css";

// 콘텐츠를 하나의 연속 문서로 흘려보냅니다. 프로젝트를 페이지 단위로 미리
// 나누지 않으므로 페이지 하단에 빈 공간이 생기지 않고, 인쇄 시 자연스럽게
// 여러 A4 장으로 나뉩니다.
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

  const { profile, sections, projects, experiences, education, skills } = data;

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

          <a className={styles.navLink} href="/cover-letter">
            자기소개서 →
          </a>
          <a className={styles.navLink} href="/resume-en">
            English →
          </a>
          <a className={styles.navLink} href="/resume-v2">
            신규 포맷 →
          </a>

          <span className={styles.toolbarHint}>
            {editing
              ? "텍스트를 클릭해 바로 수정 · 변경은 이 브라우저에 자동 저장됩니다"
              : "Chrome · Ctrl/⌘ + P → “PDF로 저장” → 여백 “없음”, 배율 100%"}
          </span>
        </div>

        <div className={styles.sheet}>
          {/* 표의 thead/tfoot는 인쇄 시 각 페이지 상·하단에 반복되므로,
              빈 스페이서 행으로 모든 페이지에 일정한 상하 여백을 만듭니다.
              (@page margin: 0 이라 브라우저 머리글/바닥글은 붙지 않음) */}
          <table className={styles.frame}>
            <thead>
              <tr>
                <td>
                  <div className={styles.frameSpacer} aria-hidden="true" />
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Header
                    profile={profile}
                    onChange={(next) => update((d) => void (d.profile = next))}
                  />
                  <Introduction
                    paragraphs={profile.introduction}
                    onChange={(next) => update((d) => void (d.profile.introduction = next))}
                  />

                  <Section
                    title={sections.projects}
                    onChange={(t) => update((d) => void (d.sections.projects = t))}
                  >
                    {projects.map((project, i) => (
                      <ProjectItem
                        key={i}
                        project={project}
                        onChange={(next) => update((d) => void (d.projects[i] = next))}
                        onDelete={() => update((d) => d.projects.splice(i, 1))}
                      />
                    ))}
                    <AddButton
                      label="프로젝트"
                      onClick={() => update((d) => d.projects.push(structuredClone(blankProject)))}
                    />
                  </Section>

                  <Section
                    title={sections.experience}
                    onChange={(t) => update((d) => void (d.sections.experience = t))}
                  >
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

                  <Section
                    title={sections.education}
                    onChange={(t) => update((d) => void (d.sections.education = t))}
                  >
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

                  <Section
                    title={sections.skills}
                    onChange={(t) => update((d) => void (d.sections.skills = t))}
                  >
                    <Skills
                      groups={skills}
                      onChange={(next) => update((d) => void (d.skills = next))}
                    />
                  </Section>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <div className={styles.frameSpacer} aria-hidden="true" />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </EditContext.Provider>
  );
}
