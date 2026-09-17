import type { SkillGroup } from "../data/resumeData";
import { EditableText } from "./EditableText";
import { useEditing } from "./EditContext";
import { AddButton, DeleteButton } from "./editControls";
import styles from "./Resume.module.css";

// 카테고리 + 항목 목록. 편집 모드에서 그룹/항목 추가·삭제.
export function Skills({
  groups,
  onChange,
}: {
  groups: SkillGroup[];
  onChange: (next: SkillGroup[]) => void;
}) {
  const editing = useEditing();

  const updateGroup = (index: number, next: SkillGroup) =>
    onChange(groups.map((g, i) => (i === index ? next : g)));

  return (
    <div className={styles.skills}>
      {groups.map((group, gi) => (
        <div key={gi} className={styles.skillRow}>
          <span className={styles.skillCategoryCell}>
            <EditableText
              className={styles.skillCategory}
              value={group.category}
              onChange={(category) => updateGroup(gi, { ...group, category })}
              placeholder="분류"
              singleLine
            />
            <DeleteButton
              label="분류 삭제"
              onClick={() => onChange(groups.filter((_, i) => i !== gi))}
            />
          </span>
          <div className={styles.skillItems}>
            {group.items.map((item, ii) => (
              <span key={ii} className={styles.skillItem}>
                <EditableText
                  value={item}
                  onChange={(next) =>
                    updateGroup(gi, {
                      ...group,
                      items: group.items.map((it, i) => (i === ii ? next : it)),
                    })
                  }
                  placeholder="기술"
                  singleLine
                />
                <DeleteButton
                  label="기술 삭제"
                  onClick={() =>
                    updateGroup(gi, {
                      ...group,
                      items: group.items.filter((_, i) => i !== ii),
                    })
                  }
                />
              </span>
            ))}
            <AddButton
              label="기술"
              onClick={() => updateGroup(gi, { ...group, items: [...group.items, "새 기술"] })}
            />
          </div>
        </div>
      ))}
      {editing ? (
        <AddButton
          label="분류"
          onClick={() => onChange([...groups, { category: "새 분류", items: ["새 기술"] }])}
        />
      ) : null}
    </div>
  );
}
