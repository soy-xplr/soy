import type { WBulletGroup, WProject } from "../data/westernResume";
import { EditableText } from "../resume/EditableText";
import { useEditing } from "../resume/EditContext";
import { BulletList } from "../resume/BulletList";
import { AddButton, DeleteButton } from "../resume/editControls";
import styles from "./WesternResume.module.css";

// One labelled block of bullets (e.g. "Product & User Experience", "성과").
function BulletGroup({
  group,
  onChange,
  onDelete,
}: {
  group: WBulletGroup;
  onChange: (next: WBulletGroup) => void;
  onDelete: () => void;
}) {
  const editing = useEditing();
  const isImpact = group.variant === "impact";

  return (
    <div className={`${styles.bulletGroup} ${isImpact ? styles.impactGroup : ""}`}>
      {editing || group.label ? (
        <div className={styles.bulletGroupLabelRow}>
          <EditableText
            as="p"
            className={styles.bulletGroupLabel}
            value={group.label ?? ""}
            onChange={(label) => onChange({ ...group, label: label || undefined })}
            placeholder="Group label (optional)"
            singleLine
          />
          {editing ? (
            <>
              <button
                type="button"
                className={styles.smallToggle}
                onClick={() =>
                  onChange({ ...group, variant: isImpact ? undefined : "impact" })
                }
                title="성과 강조 박스 토글"
              >
                {isImpact ? "강조 해제" : "강조"}
              </button>
              <DeleteButton label="Remove group" onClick={onDelete} />
            </>
          ) : null}
        </div>
      ) : null}

      <BulletList
        items={group.bullets}
        onChange={(bullets) => onChange({ ...group, bullets })}
      />
    </div>
  );
}

// A project under a company: name + role/period + description + bullets/groups.
export function WProjectEntry({
  project,
  onChange,
  onDelete,
  addBulletGroupLabel,
}: {
  project: WProject;
  onChange: (next: WProject) => void;
  onDelete?: () => void;
  addBulletGroupLabel: string;
}) {
  const editing = useEditing();
  const groups = project.groups ?? [];
  const hasGroups = groups.length > 0;

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

        {editing || project.meta ? (
          <EditableText
            as="p"
            className={styles.projectMeta}
            value={project.meta ?? ""}
            onChange={(meta) => onChange({ ...project, meta: meta || undefined })}
            placeholder="Scale / scope (optional)"
            singleLine
          />
        ) : null}

        {editing || project.description ? (
          <EditableText
            as="p"
            className={styles.projectDesc}
            value={project.description ?? ""}
            onChange={(description) =>
              onChange({ ...project, description: description || undefined })
            }
            placeholder="One-line description"
          />
        ) : null}

        {/* Flat bullets for simple projects; hidden once groups are used. */}
        {!hasGroups ? (
          <BulletList
            items={project.bullets ?? []}
            onChange={(bullets) => onChange({ ...project, bullets })}
          />
        ) : null}

        {groups.map((group, i) => (
          <BulletGroup
            key={i}
            group={group}
            onChange={(next) =>
              onChange({ ...project, groups: groups.map((g, idx) => (idx === i ? next : g)) })
            }
            onDelete={() =>
              onChange({ ...project, groups: groups.filter((_, idx) => idx !== i) })
            }
          />
        ))}

        {editing ? (
          <AddButton
            label={addBulletGroupLabel}
            onClick={() => onChange({ ...project, groups: [...groups, { label: "", bullets: [] }] })}
          />
        ) : null}
      </article>
    </>
  );
}
