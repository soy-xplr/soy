import styles from "./Resume.module.css";

// 자기소개 문단: 작은 글씨 + 넉넉한 줄간격.
export function Introduction({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className={styles.introduction}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={styles.introParagraph}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
