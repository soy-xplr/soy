import type { ExperienceData } from "../data/resumeData";
import { BulletList } from "./BulletList";
import styles from "./Resume.module.css";

export function ExperienceItem({ experience }: { experience: ExperienceData }) {
  return (
    <article className={styles.experience}>
      <div className={styles.experienceHead}>
        <h3 className={styles.experienceTitle}>
          {experience.company}
          <span className={styles.experienceRole}>{experience.role}</span>
        </h3>
        <span className={styles.experiencePeriod}>{experience.period}</span>
      </div>

      {experience.summary ? (
        <p className={styles.experienceSummary}>{experience.summary}</p>
      ) : null}

      {experience.bullets && experience.bullets.length > 0 ? (
        <BulletList items={experience.bullets} />
      ) : null}
    </article>
  );
}
