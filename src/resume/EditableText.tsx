import {
  useEffect,
  useRef,
  type ElementType,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { useEditing } from "./EditContext";
import { renderInlineBold } from "./richText";
import styles from "./Resume.module.css";

type EditableTextProps = {
  value: string;
  onChange: (next: string) => void;
  as?: ElementType;
  className?: string;
  placeholder?: string;
  singleLine?: boolean; // true면 Enter 입력을 막아 한 줄로 유지
};

// 클릭해서 그 자리에서 수정하는 인라인 편집 텍스트.
// - 편집 모드가 아니면 일반 텍스트로 렌더링(인쇄 결과와 동일)
// - 편집 모드에서는 contentEditable로 동작하며, 포커스가 빠질 때(onBlur) 값 반영
//   (입력 중에는 상태를 바꾸지 않아 커서 튐이 없습니다.)
export function EditableText({
  value,
  onChange,
  as,
  className,
  placeholder,
  singleLine,
}: EditableTextProps) {
  const editing = useEditing();
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "span") as ElementType;

  // 외부에서 값이 바뀌면(예: 불러오기/초기화) DOM 텍스트를 동기화.
  // 입력 중에는 상태를 갱신하지 않으므로 이 effect가 커서를 방해하지 않습니다.
  useEffect(() => {
    if (!editing) return;
    const el = ref.current;
    if (el && el.innerText !== value) {
      el.innerText = value;
    }
  }, [editing, value]);

  if (!editing) {
    // View/print shows `**bold**` rendered; edit mode keeps the raw markers.
    return <Tag className={className}>{renderInlineBold(value)}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      className={`${className ?? ""} ${styles.editable}`}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      data-placeholder={placeholder ?? ""}
      onKeyDown={(event: KeyboardEvent) => {
        if (singleLine && event.key === "Enter") {
          event.preventDefault();
          (event.currentTarget as HTMLElement).blur();
        }
      }}
      onBlur={(event: FocusEvent) => {
        const next = (event.currentTarget as HTMLElement).innerText.replace(/\n$/, "");
        if (next !== value) onChange(next);
      }}
    />
  );
}
