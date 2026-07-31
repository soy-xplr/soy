import type { ReactNode } from "react";
import styles from "./Resume.module.css";

// 굵고 큰 섹션 제목 + 본문. 제목이 페이지 중간에서 잘리지 않도록 처리.
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}
