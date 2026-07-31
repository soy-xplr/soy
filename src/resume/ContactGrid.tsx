import type { Contact, ContactType } from "../data/resumeData";
import { ContactIcon } from "./icons";
import { EditableText } from "./EditableText";
import { useEditing } from "./EditContext";
import { AddButton, DeleteButton } from "./editControls";
import styles from "./Resume.module.css";

const TYPE_ORDER: ContactType[] = ["phone", "email", "blog", "github"];

// 연락처를 2열 그리드로 배치. 앞에는 작은 단색 아이콘, 텍스트는 연한 회색.
// 편집 모드: 텍스트 인라인 편집, 아이콘 클릭 시 종류 순환, 항목 추가/삭제.
export function ContactGrid({
  contacts,
  onChange,
}: {
  contacts: Contact[];
  onChange: (next: Contact[]) => void;
}) {
  const editing = useEditing();

  const updateAt = (index: number, patch: Partial<Contact>) => {
    onChange(contacts.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  };
  const cycleType = (index: number) => {
    const current = contacts[index].type;
    const next = TYPE_ORDER[(TYPE_ORDER.indexOf(current) + 1) % TYPE_ORDER.length];
    updateAt(index, { type: next });
  };

  return (
    <div className={styles.contactGrid}>
      {contacts.map((contact, index) => (
        <div key={index} className={styles.contactItem}>
          {editing ? (
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => cycleType(index)}
              title="아이콘 종류 변경"
            >
              <ContactIcon type={contact.type} className={styles.contactIcon} />
            </button>
          ) : (
            <ContactIcon type={contact.type} className={styles.contactIcon} />
          )}

          {editing ? (
            <EditableText
              value={contact.label}
              onChange={(label) => updateAt(index, { label })}
              placeholder="연락처"
              singleLine
            />
          ) : contact.href ? (
            <a href={contact.href} target="_blank" rel="noreferrer">
              {contact.label}
            </a>
          ) : (
            <span>{contact.label}</span>
          )}

          <DeleteButton
            label="연락처 삭제"
            onClick={() => onChange(contacts.filter((_, i) => i !== index))}
          />
        </div>
      ))}
      <AddButton
        label="연락처"
        onClick={() => onChange([...contacts, { type: "email", label: "새 연락처" }])}
      />
    </div>
  );
}
