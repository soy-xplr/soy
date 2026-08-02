import type { EnProject } from "../data/resumeEnData";
import { EditableText } from "../resume/EditableText";
import { useEditing } from "../resume/EditContext";
import { BulletList } from "../resume/BulletList";
import { DeleteButton } from "../resume/editControls";
import styles from "./ResumeEn.module.css";

// One project under a company: name + role/period + description + bullets.
export function ProjectEntry({
  project,
  onChange,
  onDelete,
}: {
  project: EnProject;
  onChange: (next: EnProject) => void;
  onDelete?: () => void;
}) {
  const editing = useEditing();

  return (
    <>
      {editing || project.groupLabel ? (
        <EditableText
          as="p"
          className={styles.groupLabel}
          value={project.groupLabel ?? ""}
          onChange={(v) => onChange({ ...project, groupLabel: v || undefined })}
          placeholder="Group label (optional)"
          singleLine
        />
      ) : null}

      <article className={styles.project}>
        <div className={styles.projectHead}>
          <h4 className={styles.projectName}>
            <EditableText
              value={project.name}
              onChange={(name) => onChange({ ...project, name })}
              placeholder="Project name"
              singleLine
            />
            {editing || project.role ? (
              <EditableText
                className={styles.projectRole}
                value={project.role ?? ""}
                onChange={(role) => onChange({ ...project, role: role || undefined })}
                placeholder="Role"
                singleLine
              />
            ) : null}
          </h4>
          <span className={styles.projectPeriod}>
            <EditableText
              value={project.period ?? ""}
              onChange={(period) => onChange({ ...project, period: period || undefined })}
              placeholder="Period"
              singleLine
            />
            {onDelete ? <DeleteButton label="Remove project" onClick={onDelete} /> : null}
          </span>
        </div>

        {editing || project.description ? (
          <EditableText
            as="p"
            className={styles.projectDesc}
            value={project.description ?? ""}
            onChange={(description) => onChange({ ...project, description: description || undefined })}
            placeholder="One-line description"
          />
        ) : null}

        <BulletList
          items={project.bullets ?? []}
          onChange={(bullets) => onChange({ ...project, bullets })}
        />
      </article>
    </>
  );
}
