import type { EducationData } from "../data/resumeData";
import styles from "./Resume.module.css";

export function EducationItem({ education }: { education: EducationData }) {
  return (
    <article className={styles.education}>
      <div className={styles.educationHead}>
        <h3 className={styles.educationSchool}>
          {education.school}
          <span className={styles.educationDegree}>{education.degree}</span>
        </h3>
        <span className={styles.educationPeriod}>{education.period}</span>
      </div>
      {education.note ? <p className={styles.educationNote}>{education.note}</p> : null}
    </article>
  );
}
