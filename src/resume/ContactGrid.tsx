import type { Contact } from "../data/resumeData";
import { ContactIcon } from "./icons";
import styles from "./Resume.module.css";

// 연락처를 2열 그리드로 배치. 앞에는 작은 단색 아이콘, 텍스트는 연한 회색.
export function ContactGrid({ contacts }: { contacts: Contact[] }) {
  return (
    <div className={styles.contactGrid}>
      {contacts.map((contact) => (
        <div key={`${contact.type}-${contact.label}`} className={styles.contactItem}>
          <ContactIcon type={contact.type} className={styles.contactIcon} />
          {contact.href ? (
            <a href={contact.href} target="_blank" rel="noreferrer">
              {contact.label}
            </a>
          ) : (
            <span>{contact.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
