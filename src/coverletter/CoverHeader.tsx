import type { CoverLetterData } from "../data/coverLetterData";
import { EditableText } from "../resume/EditableText";
import { useEditing } from "../resume/EditContext";
import { AddButton, DeleteButton } from "../resume/editControls";
import styles from "./CoverLetter.module.css";

type Profile = CoverLetterData["profile"];

// 문서 제목 + 이름 + 보조 정보(지원 회사/직무/연락처 등).
export function CoverHeader({
  profile,
  onChange,
}: {
  profile: Profile;
  onChange: (next: Profile) => void;
}) {
  const editing = useEditing();

  return (
    <header className={styles.header}>
      <EditableText
        as="p"
        className={styles.docTitle}
        value={profile.docTitle}
        onChange={(docTitle) => onChange({ ...profile, docTitle })}
        placeholder="자기소개서"
        singleLine
      />
      <EditableText
        as="h1"
        className={styles.name}
        value={profile.name}
        onChange={(name) => onChange({ ...profile, name })}
        placeholder="이름"
        singleLine
      />
      <div className={styles.meta}>
        {profile.meta.map((item, index) => (
          <span key={index} className={styles.metaItem}>
            <EditableText
              value={item}
              onChange={(text) =>
                onChange({ ...profile, meta: profile.meta.map((m, i) => (i === index ? text : m)) })
              }
              placeholder="보조 정보"
              singleLine
            />
            <DeleteButton
              label="항목 삭제"
              onClick={() =>
                onChange({ ...profile, meta: profile.meta.filter((_, i) => i !== index) })
              }
            />
          </span>
        ))}
        {editing ? (
          <AddButton
            label="정보"
            onClick={() => onChange({ ...profile, meta: [...profile.meta, "새 정보"] })}
          />
        ) : null}
      </div>
    </header>
  );
}
