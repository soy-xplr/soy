import { useEditing } from "./EditContext";
import styles from "./Resume.module.css";

// 항목 삭제 버튼 (편집 모드에서만 표시, 인쇄 시 숨김).
export function DeleteButton({ onClick, label }: { onClick: () => void; label?: string }) {
  const editing = useEditing();
  if (!editing) return null;
  return (
    <button
      type="button"
      className={styles.deleteButton}
      onClick={onClick}
      aria-label={label ?? "삭제"}
      title={label ?? "삭제"}
    >
      ×
    </button>
  );
}

// 항목 추가 버튼 (편집 모드에서만 표시).
export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  const editing = useEditing();
  if (!editing) return null;
  return (
    <button type="button" className={styles.addButton} onClick={onClick}>
      + {label}
    </button>
  );
}
