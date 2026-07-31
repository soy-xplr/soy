import styles from "./Resume.module.css";

// 핵심 성과: 연한 회색 배경(#f3f3f3)의 둥근 박스.
// 콘텐츠(텍스트) 영역 안에 배치됩니다.
export function HighlightBox({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <div className={styles.highlightBox}>
      {items.map((item, index) => (
        <p key={index} className={styles.highlightItem}>
          {item}
        </p>
      ))}
    </div>
  );
}
