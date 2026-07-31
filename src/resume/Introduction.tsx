import { EditableText } from "./EditableText";
import { AddButton, DeleteButton } from "./editControls";
import styles from "./Resume.module.css";

// 자기소개 문단: 작은 글씨 + 넉넉한 줄간격. 편집 모드에서 단락 추가/삭제.
export function Introduction({
  paragraphs,
  onChange,
}: {
  paragraphs: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className={styles.introduction}>
      {paragraphs.map((paragraph, index) => (
        <div key={index} className={styles.introRow}>
          <EditableText
            as="p"
            className={styles.introParagraph}
            value={paragraph}
            onChange={(text) => onChange(paragraphs.map((p, i) => (i === index ? text : p)))}
            placeholder="자기소개 문단"
          />
          <DeleteButton
            label="문단 삭제"
            onClick={() => onChange(paragraphs.filter((_, i) => i !== index))}
          />
        </div>
      ))}
      <AddButton label="문단" onClick={() => onChange([...paragraphs, ""])} />
    </div>
  );
}
