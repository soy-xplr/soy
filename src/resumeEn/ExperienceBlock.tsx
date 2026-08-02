import type { EnExperience, EnProject } from "../data/resumeEnData";
import { EditableText } from "../resume/EditableText";
import { useEditing } from "../resume/EditContext";
import { BulletList } from "../resume/BulletList";
import { AddButton, DeleteButton } from "../resume/editControls";
import { ProjectEntry } from "./ProjectEntry";
import styles from "./ResumeEn.module.css";

const blankProject: EnProject = {
  name: "New project",
  role: "Role",
  period: "2024 – 2025",
  description: "",
  bullets: [],
};

// A company entry: optional group label, company head, role, summary,
// optional direct bullets, and nested projects.
export function ExperienceBlock({
  experience,
  onChange,
  onDelete,
}: {
  experience: EnExperience;
  onChange: (next: EnExperience) => void;
  onDelete?: () => void;
}) {
  const editing = useEditing();
  const projects = experience.projects ?? [];

  return (
    <>
      {editing || experience.groupLabel ? (
        <EditableText
          as="p"
          className={styles.groupLabel}
          value={experience.groupLabel ?? ""}
          onChange={(v) => onChange({ ...experience, groupLabel: v || undefined })}
          placeholder="Group label (optional)"
          singleLine
        />
      ) : null}

      <section className={styles.experience}>
        <div className={styles.companyHead}>
          <EditableText
            as="h3"
            className={styles.company}
            value={experience.company}
            onChange={(company) => onChange({ ...experience, company })}
            placeholder="Company"
            singleLine
          />
          <span className={styles.companyPeriod}>
            <EditableText
              value={experience.period}
              onChange={(period) => onChange({ ...experience, period })}
              placeholder="Period"
              singleLine
            />
            {onDelete ? <DeleteButton label="Remove company" onClick={onDelete} /> : null}
          </span>
        </div>

        <EditableText
          as="p"
          className={styles.companyRole}
          value={experience.role}
          onChange={(role) => onChange({ ...experience, role })}
          placeholder="Role / Title"
          singleLine
        />

        {editing || experience.summary ? (
          <EditableText
            as="p"
            className={styles.companySummary}
            value={experience.summary ?? ""}
            onChange={(summary) => onChange({ ...experience, summary: summary || undefined })}
            placeholder="Short company/role summary"
          />
        ) : null}

        {/* Companies without sub-projects can carry bullets directly. */}
        {(experience.bullets && experience.bullets.length > 0) || (editing && projects.length === 0) ? (
          <BulletList
            items={experience.bullets ?? []}
            onChange={(bullets) => onChange({ ...experience, bullets })}
          />
        ) : null}

        {projects.length > 0 || editing ? (
          <div className={styles.projectList}>
            {projects.map((project, i) => (
              <ProjectEntry
                key={i}
                project={project}
                onChange={(next) =>
                  onChange({
                    ...experience,
                    projects: projects.map((p, idx) => (idx === i ? next : p)),
                  })
                }
                onDelete={() =>
                  onChange({ ...experience, projects: projects.filter((_, idx) => idx !== i) })
                }
              />
            ))}
            {editing ? (
              <AddButton
                label="project"
                onClick={() =>
                  onChange({ ...experience, projects: [...projects, structuredClone(blankProject)] })
                }
              />
            ) : null}
          </div>
        ) : null}
      </section>
    </>
  );
}
