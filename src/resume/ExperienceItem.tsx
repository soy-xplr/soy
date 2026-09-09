import type { ExperienceData } from "../data/resumeData";
import { BulletList } from "./BulletList";
import { EditableText } from "./EditableText";
import { useEditing } from "./EditContext";
import { DeleteButton } from "./editControls";
import styles from "./Resume.module.css";

export function ExperienceItem({
  experience,
  onChange,
  onDelete,
}: {
  experience: ExperienceData;
  onChange: (next: ExperienceData) => void;
  onDelete?: () => void;
}) {
  const editing = useEditing();
  return (
    <article className={styles.experience}>
      <div className={styles.experienceHead}>
        <h3 className={styles.experienceTitle}>
          <EditableText
            value={experience.company}
            onChange={(company) => onChange({ ...experience, company })}
            placeholder="회사명"
            singleLine
          />
          <EditableText
            className={styles.experienceRole}
            value={experience.role}
            onChange={(role) => onChange({ ...experience, role })}
            placeholder="직무"
            singleLine
          />
        </h3>
        <span className={styles.experienceMeta}>
          <EditableText
            className={styles.experiencePeriod}
            value={experience.period}
            onChange={(period) => onChange({ ...experience, period })}
            placeholder="기간"
            singleLine
          />
          {onDelete ? <DeleteButton label="경력 삭제" onClick={onDelete} /> : null}
        </span>
      </div>

      {editing || experience.summary ? (
        <EditableText
          as="p"
          className={styles.experienceSummary}
          value={experience.summary ?? ""}
          onChange={(summary) => onChange({ ...experience, summary: summary || undefined })}
          placeholder="담당 업무 요약"
        />
      ) : null}

      <BulletList
        items={experience.bullets ?? []}
        onChange={(bullets) => onChange({ ...experience, bullets })}
      />
    </article>
  );
}
