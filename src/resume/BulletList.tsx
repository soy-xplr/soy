import type { BulletNode } from "../data/resumeData";
import styles from "./Resume.module.css";

// 상세 업무를 불릿 목록으로 표현. 중첩 단계가 명확히 보이도록 들여쓰기 적용.
export function BulletList({ items, nested = false }: { items: BulletNode[]; nested?: boolean }) {
  if (!items.length) return null;

  return (
    <ul className={`${styles.bulletList} ${nested ? styles.bulletChildren : ""}`}>
      {items.map((item, index) => {
        const isNode = typeof item !== "string";
        const text = isNode ? item.text : item;
        const children = isNode ? item.children : undefined;

        return (
          <li key={index} className={styles.bulletItem}>
            {text}
            {children && children.length > 0 ? (
              <BulletList items={children} nested />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
