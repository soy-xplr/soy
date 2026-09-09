import type { ResumeData } from "../data/resumeData";
import { ContactGrid } from "./ContactGrid";
import { EditableText } from "./EditableText";
import styles from "./Resume.module.css";

type Profile = ResumeData["profile"];

// 페이지 상단 왼쪽에 이름을 크고 굵게, 그 아래 연락처 2열 그리드.
export function Header({
  profile,
  onChange,
}: {
  profile: Profile;
  onChange: (next: Profile) => void;
}) {
  return (
    <header className={styles.header}>
      <EditableText
        as="h1"
        className={styles.name}
        value={profile.name}
        onChange={(name) => onChange({ ...profile, name })}
        placeholder="이름"
        singleLine
      />
      <ContactGrid
        contacts={profile.contacts}
        onChange={(contacts) => onChange({ ...profile, contacts })}
      />
    </header>
  );
}
