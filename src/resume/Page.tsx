import type { ReactNode } from "react";
import styles from "./Resume.module.css";

type PageProps = {
  children: ReactNode;
  footer?: ReactNode;
};

// 하나의 A4 페이지(210mm × 297mm). 콘텐츠는 명시적으로 배치합니다.
export function Page({ children, footer }: PageProps) {
  return (
    <section className={styles.page}>
      <div className={styles.pageInner}>
        {children}
        {footer ? <div className={styles.pageFooter}>{footer}</div> : null}
      </div>
    </section>
  );
}
