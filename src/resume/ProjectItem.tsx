import { useRef, type ChangeEvent } from "react";
import type { ProjectItemData } from "../data/resumeData";
import { ProjectBadge } from "./ProjectBadge";
import { HighlightBox } from "./HighlightBox";
import { BulletList } from "./BulletList";
import { EditableText } from "./EditableText";
import { useEditing } from "./EditContext";
import { DeleteButton } from "./editControls";
import styles from "./Resume.module.css";

// 아이콘 열(56px) + 본문 열의 2열 구조.
export function ProjectItem({
  project,
  onChange,
  onDelete,
}: {
  project: ProjectItemData;
  onChange: (next: ProjectItemData) => void;
  onDelete?: () => void;
}) {
  const editing = useEditing();
  const fileRef = useRef<HTMLInputElement>(null);

  const iconStyle = project.iconColors
    ? { background: `linear-gradient(135deg, ${project.iconColors[0]}, ${project.iconColors[1]})` }
    : undefined;

  const onPickImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ ...project, iconImage: String(reader.result) });
    reader.readAsDataURL(file);
  };

  return (
    <article className={styles.project}>
      <div className={styles.projectIconCol}>
        <div className={styles.iconWrap}>
          {project.iconImage ? (
            <img className={styles.projectIconImg} src={project.iconImage} alt="" />
          ) : (
            <div className={styles.projectIcon} style={iconStyle}>
              {editing ? (
                <EditableText
                  value={project.icon ?? ""}
                  onChange={(icon) => onChange({ ...project, icon })}
                  placeholder="AI"
                  singleLine
                />
              ) : (
                (project.icon ?? "")
              )}
            </div>
          )}

          {editing ? (
            <div className={styles.iconTools}>
              <button
                type="button"
                className={styles.smallButton}
                onClick={() => fileRef.current?.click()}
              >
                이미지
              </button>
              {project.iconImage ? (
                <button
                  type="button"
                  className={styles.smallButton}
                  onClick={() => onChange({ ...project, iconImage: undefined })}
                >
                  이미지 제거
                </button>
              ) : null}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={onPickImage}
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.projectContent}>
        <div className={styles.projectHead}>
          <EditableText
            as="h3"
            className={styles.projectTitle}
            value={project.title}
            onChange={(title) => onChange({ ...project, title })}
            placeholder="프로젝트 제목"
            singleLine
          />
          {project.badge || editing ? (
            <ProjectBadge
              label={project.badge ?? ""}
              onChange={(badge) => onChange({ ...project, badge: badge || undefined })}
            />
          ) : null}
          {onDelete ? <DeleteButton label="프로젝트 삭제" onClick={onDelete} /> : null}
        </div>

        <EditableText
          as="p"
          className={styles.projectSummary}
          value={project.summary}
          onChange={(summary) => onChange({ ...project, summary })}
          placeholder="프로젝트 한 줄 설명"
        />
        <EditableText
          as="p"
          className={styles.projectPeriod}
          value={project.period}
          onChange={(period) => onChange({ ...project, period })}
          placeholder="2025.01 - 2025.12"
          singleLine
        />

        <HighlightBox
          items={project.highlights ?? []}
          onChange={(highlights) => onChange({ ...project, highlights })}
        />

        <BulletList
          items={project.bullets ?? []}
          onChange={(bullets) => onChange({ ...project, bullets })}
        />
      </div>
    </article>
  );
}
