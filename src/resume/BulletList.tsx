import type { BulletNode } from "../data/resumeData";
import { EditableText } from "./EditableText";
import { useEditing } from "./EditContext";
import { AddButton, DeleteButton } from "./editControls";
import styles from "./Resume.module.css";

// 상세 업무를 불릿 목록으로 표현. 중첩 단계가 명확히 보이도록 들여쓰기.
// 편집 모드: 텍스트 인라인 편집, 항목 추가/삭제, 하위 항목 추가.
export function BulletList({
  items,
  nested = false,
  onChange,
}: {
  items: BulletNode[];
  nested?: boolean;
  onChange: (next: BulletNode[]) => void;
}) {
  const editing = useEditing();
  if (!items.length && !editing) return null;

  const replace = (index: number, node: BulletNode) =>
    onChange(items.map((it, i) => (i === index ? node : it)));
  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));

  const setText = (index: number, text: string) => {
    const item = items[index];
    replace(index, typeof item === "string" ? text : { ...item, text });
  };
  const setChildren = (index: number, children: BulletNode[]) => {
    const item = items[index];
    const text = typeof item === "string" ? item : item.text;
    replace(index, { text, children });
  };
  const addChild = (index: number) => {
    const item = items[index];
    const children = typeof item === "string" ? [] : item.children ?? [];
    setChildren(index, [...children, ""]);
  };

  return (
    <>
      <ul className={`${styles.bulletList} ${nested ? styles.bulletChildren : ""}`}>
        {items.map((item, index) => {
          const isNode = typeof item !== "string";
          const text = isNode ? item.text : item;
          const children = isNode ? item.children : undefined;

          return (
            <li key={index} className={styles.bulletItem}>
              <span className={styles.bulletRow}>
                <EditableText
                  value={text}
                  onChange={(next) => setText(index, next)}
                  placeholder="상세 업무"
                />
                {editing ? (
                  <span className={styles.bulletControls}>
                    {!nested ? (
                      <button
                        type="button"
                        className={styles.smallButton}
                        onClick={() => addChild(index)}
                        title="하위 항목 추가"
                      >
                        + 하위
                      </button>
                    ) : null}
                    <DeleteButton label="항목 삭제" onClick={() => remove(index)} />
                  </span>
                ) : null}
              </span>
              {children && (children.length > 0 || editing) ? (
                <BulletList
                  items={children ?? []}
                  nested
                  onChange={(next) => setChildren(index, next)}
                />
              ) : null}
            </li>
          );
        })}
      </ul>
      <AddButton label="항목" onClick={() => onChange([...items, ""])} />
    </>
  );
}
