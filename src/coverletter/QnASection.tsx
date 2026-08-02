import type { CoverSection } from "../data/coverLetterData";
import { EditableText } from "../resume/EditableText";
import { useEditing } from "../resume/EditContext";
import { AddButton, DeleteButton } from "../resume/editControls";
import styles from "./CoverLetter.module.css";

// 소제목(번호 + 제목) + 문단들. 편집 모드에서 문단 추가/삭제, 섹션 삭제.
export function QnASection({
  index,
  section,
  onChange,
  onDelete,
}: {
  index: number;
  section: CoverSection;
  onChange: (next: CoverSection) => void;
  onDelete?: () => void;
}) {
  const editing = useEditing();

  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionIndex}>{index + 1}</span>
        <EditableText
          as="h2"
          className={styles.sectionTitle}
          value={section.title}
          onChange={(title) => onChange({ ...section, title })}
          placeholder="소제목"
          singleLine
        />
        {onDelete ? <DeleteButton label="섹션 삭제" onClick={onDelete} /> : null}
      </div>

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
        <AddButton
          label="문단"
          onClick={() => onChange({ ...section, paragraphs: [...section.paragraphs, ""] })}
        />
      ) : null}
    </section>
  );
}
