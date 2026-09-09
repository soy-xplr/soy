import { EditableText } from "./EditableText";
import { useEditing } from "./EditContext";
import { AddButton, DeleteButton } from "./editControls";
import styles from "./Resume.module.css";

// 핵심 성과: 연한 회색 배경(#f3f3f3)의 둥근 박스.
// 편집 모드에서는 비어 있어도 추가 버튼을 노출합니다.
export function HighlightBox({
  items,
  onChange,
}: {
  items: string[];
  onChange: (next: string[]) => void;
}) {
  const editing = useEditing();
  if (!items.length && !editing) return null;

  return (
    <div className={styles.highlightBox}>
      {items.map((item, index) => (
        <div key={index} className={styles.highlightRow}>
          <EditableText
            as="p"
            className={styles.highlightItem}
            value={item}
            onChange={(text) => onChange(items.map((it, i) => (i === index ? text : it)))}
            placeholder="핵심 성과"
          />
          <DeleteButton
            label="성과 삭제"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
          />
        </div>
      ))}
      <AddButton label="성과" onClick={() => onChange([...items, ""])} />
    </div>
  );
}
