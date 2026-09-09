import type { EducationData } from "../data/resumeData";
import { EditableText } from "./EditableText";
import { useEditing } from "./EditContext";
import { DeleteButton } from "./editControls";
import styles from "./Resume.module.css";

export function EducationItem({
  education,
  onChange,
  onDelete,
}: {
  education: EducationData;
  onChange: (next: EducationData) => void;
  onDelete?: () => void;
}) {
  const editing = useEditing();
  return (
    <article className={styles.education}>
      <div className={styles.educationHead}>
        <h3 className={styles.educationSchool}>
          <EditableText
            value={education.school}
            onChange={(school) => onChange({ ...education, school })}
            placeholder="학교명"
            singleLine
          />
          <EditableText
            className={styles.educationDegree}
            value={education.degree}
            onChange={(degree) => onChange({ ...education, degree })}
            placeholder="학위/전공"
            singleLine
          />
        </h3>
        <span className={styles.educationMeta}>
          <EditableText
            className={styles.educationPeriod}
            value={education.period}
            onChange={(period) => onChange({ ...education, period })}
            placeholder="기간"
            singleLine
          />
          {onDelete ? <DeleteButton label="학력 삭제" onClick={onDelete} /> : null}
        </span>
      </div>
      {editing || education.note ? (
        <EditableText
          as="p"
          className={styles.educationNote}
          value={education.note ?? ""}
          onChange={(note) => onChange({ ...education, note: note || undefined })}
          placeholder="비고"
        />
      ) : null}
    </article>
  );
}
