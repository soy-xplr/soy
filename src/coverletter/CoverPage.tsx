import type { ReactNode } from "react";
import styles from "./CoverLetter.module.css";

// 하나의 A4 페이지(210mm × 297mm).
export function CoverPage({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  return (
    <section className={styles.page}>
      <div className={styles.pageInner}>
        {children}
        {footer ? <div className={styles.pageFooter}>{footer}</div> : null}
      </div>
    </section>
  );
}
