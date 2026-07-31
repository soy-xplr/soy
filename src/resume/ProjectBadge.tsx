import styles from "./Resume.module.css";

// 프로젝트 제목 옆의 작은 회색 배지.
export function ProjectBadge({ label }: { label: string }) {
  return <span className={styles.badge}>{label}</span>;
}
