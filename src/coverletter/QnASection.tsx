import type { CoverSection } from "../data/coverLetterData";
import { EditableText } from "../resume/EditableText";
import { useEditing } from "../resume/EditContext";
import { AddButton, DeleteButton } from "../resume/editControls";
import styles from "./CoverLetter.module.css";

// 문단 그룹. (번호 소제목 없이) 문단만 렌더링합니다.
// 편집 모드에서 문단 추가/삭제, 섹션(문단 그룹) 삭제.
export function QnASection({
  section,
  onChange,
  onDelete,
}: {
  section: CoverSection;
  onChange: (next: CoverSection) => void;
  onDelete?: () => void;
}) {
  const editing = useEditing();

  return (
    <section className={styles.section}>
      {section.paragraphs.map((paragraph, pi) => (
        <div key={pi} className={styles.paragraphRow}>
          <EditableText
            as="p"
            className={styles.paragraph}
            value={paragraph}
            onChange={(text) =>
              onChange({
                ...section,
                paragraphs: section.paragraphs.map((p, i) => (i === pi ? text : p)),
              })
            }
            placeholder="문단 내용"
          />
          <DeleteButton
            label="문단 삭제"
            onClick={() =>
              onChange({
                ...section,
                paragraphs: section.paragraphs.filter((_, i) => i !== pi),
              })
            }
          />
        </div>
      ))}

      {editing ? (
        <div className={styles.sectionTools}>
          <AddButton
            label="문단"
            onClick={() => onChange({ ...section, paragraphs: [...section.paragraphs, ""] })}
          />
          {onDelete ? (
            <button type="button" className={styles.sectionDelete} onClick={onDelete}>
              문단 그룹 삭제
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
