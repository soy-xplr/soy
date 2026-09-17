import { EditableText } from "./EditableText";
import { useEditing } from "./EditContext";
import styles from "./Resume.module.css";

// 프로젝트 제목 옆의 작은 회색 배지.
export function ProjectBadge({
  label,
  onChange,
}: {
  label: string;
  onChange?: (next: string) => void;
}) {
  const editing = useEditing();

  if (editing && onChange) {
    return (
      <EditableText
        className={styles.badge}
        value={label}
        onChange={onChange}
        placeholder="배지"
        singleLine
      />
    );
  }
  return <span className={styles.badge}>{label}</span>;
}
