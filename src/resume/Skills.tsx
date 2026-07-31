import type { SkillGroup } from "../data/resumeData";
import styles from "./Resume.module.css";

// 카테고리 + 항목 목록을 담백하게 표현.
export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className={styles.skills}>
      {groups.map((group) => (
        <div key={group.category} className={styles.skillRow}>
          <span className={styles.skillCategory}>{group.category}</span>
          <div className={styles.skillItems}>
            {group.items.map((item) => (
              <span key={item} className={styles.skillItem}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
