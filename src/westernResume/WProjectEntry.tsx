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
  stackedHead = false,
}: {
  project: WProject;
  onChange: (next: WProject) => void;
  onDelete?: () => void;
  addBulletGroupLabel: string;
  /**
   * Put the role and the scale line on their own row under the title, so the
   * title row carries only the project name and its period.
   */
  stackedHead?: boolean;
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
        {/* The opening block stays together across page breaks, so a title
            never ends a page without its role, scale and first bullets. */}
        <div className={styles.projectOpen}>
          <div className={styles.projectHead}>
            <h4 className={styles.projectName}>
              <EditableText
                value={project.name}
                onChange={(name) => onChange({ ...project, name })}
                placeholder="Project name"
                singleLine
              />
              {!stackedHead && (editing || project.role) ? (
                <>
                  <span className={styles.projectSep}> | </span>
                  <EditableText
                    className={styles.projectRole}
                    value={project.role ?? ""}
                    onChange={(role) => onChange({ ...project, role: role || undefined })}
                    placeholder="Role"
                    singleLine
                  />
                </>
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

          {/* Stacked head: role and scale share one line at one size. */}
          {stackedHead && (editing || project.role || project.meta) ? (
            <p className={styles.projectSubline}>
              {editing || project.role ? (
                <EditableText
                  value={project.role ?? ""}
                  onChange={(role) => onChange({ ...project, role: role || undefined })}
                  placeholder="Role"
                  singleLine
                />
              ) : null}
              {(editing || project.role) && (editing || project.meta) ? (
                <span className={styles.sublineSep}> · </span>
              ) : null}
              {editing || project.meta ? (
                <EditableText
                  value={project.meta ?? ""}
                  onChange={(meta) => onChange({ ...project, meta: meta || undefined })}
                  placeholder="Scale / scope (optional)"
                  singleLine
                />
              ) : null}
            </p>
          ) : null}

          {!stackedHead && (editing || project.meta) ? (
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

          {/* First group travels with the head; the rest may flow onward. */}
          {hasGroups ? (
            <BulletGroup
              group={groups[0]}
              onChange={(next) =>
                onChange({ ...project, groups: groups.map((g, idx) => (idx === 0 ? next : g)) })
              }
              onDelete={() => onChange({ ...project, groups: groups.filter((_, idx) => idx !== 0) })}
            />
          ) : null}
        </div>

        {groups.slice(1).map((group, i) => (
          <BulletGroup
            key={i + 1}
            group={group}
            onChange={(next) =>
              onChange({
                ...project,
                groups: groups.map((g, idx) => (idx === i + 1 ? next : g)),
              })
            }
            onDelete={() =>
              onChange({ ...project, groups: groups.filter((_, idx) => idx !== i + 1) })
            }
          />
        ))}

        {editing ? (
          <AddButton
            label={addBulletGroupLabel}
            onClick={() => onChange({ ...project, groups: [...groups, { label: "", bullets: [] }] })}
          />
        ) : null}

        {editing || project.impact ? (
          <EditableText
            as="p"
            className={styles.impactLine}
            value={project.impact ?? ""}
            onChange={(impact) => onChange({ ...project, impact: impact || undefined })}
            placeholder="주요 성과 한 줄 (선택)"
          />
        ) : null}
      </article>
    </>
  );
}
