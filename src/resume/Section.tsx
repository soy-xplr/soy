import type { ReactNode } from "react";
import { EditableText } from "./EditableText";
import styles from "./Resume.module.css";

// 굵고 큰 섹션 제목 + 본문. 제목이 페이지 중간에서 잘리지 않도록 처리.
// - onChange를 넘기면 제목을 인라인 편집할 수 있습니다.
// - title이 없으면 제목 없이 본문만 렌더링합니다(예: 프로젝트 이어지는 페이지).
export function Section({
  title,
  onChange,
  children,
}: {
  title?: string;
  onChange?: (next: string) => void;
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      {title !== undefined ? (
        onChange ? (
          <EditableText
            as="h2"
            className={styles.sectionTitle}
            value={title}
            onChange={onChange}
            placeholder="섹션 제목"
            singleLine
          />
        ) : (
          <h2 className={styles.sectionTitle}>{title}</h2>
        )
      ) : null}
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}
