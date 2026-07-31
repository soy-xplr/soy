import type { ResumeData } from "../data/resumeData";
import { ContactGrid } from "./ContactGrid";
import styles from "./Resume.module.css";

// 페이지 상단 왼쪽에 이름을 크고 굵게, 그 아래 연락처 2열 그리드.
export function Header({ profile }: { profile: ResumeData["profile"] }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.name}>{profile.name}</h1>
      {profile.tagline ? <p className={styles.tagline}>{profile.tagline}</p> : null}
      <ContactGrid contacts={profile.contacts} />
    </header>
  );
}
