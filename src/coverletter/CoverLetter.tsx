import { useRef, useState, type ChangeEvent } from "react";
import type { CoverSection } from "../data/coverLetterData";
import { EditContext } from "../resume/EditContext";
import { CoverPage } from "./CoverPage";
import { CoverHeader } from "./CoverHeader";
import { QnASection } from "./QnASection";
import { useCoverLetterState } from "./useCoverLetterState";
import styles from "./CoverLetter.module.css";

// 한 페이지에 담을 섹션 수. 섹션을 추가/삭제하면 페이지가 자동으로 늘거나 줍니다.
const SECTIONS_PER_PAGE = 2;

function chunk<T>(items: T[], size: number): T[][] {
  if (items.length === 0) return [[]];
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

const blankSection: CoverSection = {
  title: "새 소제목",
  paragraphs: ["내용을 입력하세요."],
};

export function CoverLetter() {
  const { data, update, exportJson, importJson, reset } = useCoverLetterState();
  const [editing, setEditing] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);

  const { profile, sections } = data;
  const pages = chunk(sections, SECTIONS_PER_PAGE);

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
            className={`${styles.primaryButton} ${editing ? styles.primaryActive : ""}`}
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
            <button type="button" className={styles.primaryButton} onClick={() => window.print()}>
              PDF로 저장 / 인쇄
            </button>
          )}

          <a className={styles.navLink} href="/resume">
            이력서 →
          </a>

          <span className={styles.toolbarHint}>
            {editing
              ? "텍스트를 클릭해 바로 수정 · 변경은 이 브라우저에 자동 저장됩니다"
              : "Chrome · Ctrl/⌘ + P → “PDF로 저장” → 여백 “없음”, 배율 100%"}
          </span>
        </div>

        {pages.map((pageSections, pageIndex) => {
          const start = pageIndex * SECTIONS_PER_PAGE;
          const isLast = pageIndex === pages.length - 1;
          return (
            <CoverPage key={pageIndex}>
              {pageIndex === 0 ? (
                <CoverHeader
                  profile={profile}
                  onChange={(next) => update((d) => void (d.profile = next))}
                />
              ) : null}

              {pageSections.map((section, i) => (
                <QnASection
                  key={start + i}
                  section={section}
                  onChange={(next) => update((d) => void (d.sections[start + i] = next))}
                  onDelete={() => update((d) => d.sections.splice(start + i, 1))}
                />
              ))}

              {editing && isLast ? (
                <button
                  type="button"
                  className={styles.addSection}
                  onClick={() => update((d) => d.sections.push(structuredClone(blankSection)))}
                >
                  + 문단 그룹 추가
                </button>
              ) : null}
            </CoverPage>
          );
        })}
      </div>
    </EditContext.Provider>
  );
}
