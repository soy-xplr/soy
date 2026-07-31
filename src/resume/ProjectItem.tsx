import type { ProjectItemData } from "../data/resumeData";
import { ProjectBadge } from "./ProjectBadge";
import { HighlightBox } from "./HighlightBox";
import { BulletList } from "./BulletList";
import styles from "./Resume.module.css";

// 아이콘 열(56px) + 본문 열의 2열 구조.
// 페이지 중간에서 잘리지 않도록 break-inside: avoid 적용(CSS).
export function ProjectItem({ project }: { project: ProjectItemData }) {
  const iconStyle = project.iconColors
    ? { background: `linear-gradient(135deg, ${project.iconColors[0]}, ${project.iconColors[1]})` }
    : undefined;

  return (
    <article className={styles.project}>
      <div className={styles.projectIconCol}>
        <div className={styles.projectIcon} style={iconStyle}>
          {project.icon ?? ""}
        </div>
      </div>

      <div className={styles.projectContent}>
        <div className={styles.projectHead}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          {project.badge ? <ProjectBadge label={project.badge} /> : null}
        </div>

        <p className={styles.projectSummary}>{project.summary}</p>
        <p className={styles.projectPeriod}>{project.period}</p>

        {project.highlights && project.highlights.length > 0 ? (
          <HighlightBox items={project.highlights} />
        ) : null}

        {project.bullets && project.bullets.length > 0 ? (
          <BulletList items={project.bullets} />
        ) : null}
      </div>
    </article>
  );
}
