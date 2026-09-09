import { Fragment } from "react";
import type { WesternResumeData } from "../data/westernResume";
import { EditableText } from "../resume/EditableText";
import { useEditing } from "../resume/EditContext";
import { AddButton, DeleteButton } from "../resume/editControls";
import styles from "./WesternResume.module.css";

type Profile = WesternResumeData["profile"];

// Name, optional location, title, and an inline contact line (no icons).
export function WHeader({
  profile,
  onChange,
  addContactLabel,
}: {
  profile: Profile;
  onChange: (next: Profile) => void;
  addContactLabel: string;
}) {
  const editing = useEditing();

  return (
    <header className={styles.header}>
      <EditableText
        as="h1"
        className={styles.name}
        value={profile.name}
        onChange={(name) => onChange({ ...profile, name })}
        placeholder="Name"
        singleLine
      />

      {editing || profile.location ? (
        <EditableText
          as="p"
          className={styles.location}
          value={profile.location}
          onChange={(location) => onChange({ ...profile, location })}
          placeholder="City, Country"
          singleLine
        />
      ) : null}

      <EditableText
        as="p"
        className={styles.title}
        value={profile.title}
        onChange={(title) => onChange({ ...profile, title })}
        placeholder="Title / positioning line"
      />

      <div className={styles.contacts}>
        {profile.contacts.map((contact, index) => (
          <Fragment key={index}>
            {index > 0 ? <span className={styles.contactSep}>|</span> : null}
            <span className={styles.contactItem}>
              {editing ? (
                <EditableText
                  value={contact.label}
                  onChange={(label) =>
                    onChange({
                      ...profile,
                      contacts: profile.contacts.map((c, i) =>
                        i === index ? { ...c, label } : c,
                      ),
                    })
                  }
                  placeholder="contact"
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
                label="Remove contact"
                onClick={() =>
                  onChange({
                    ...profile,
                    contacts: profile.contacts.filter((_, i) => i !== index),
                  })
                }
              />
            </span>
          </Fragment>
        ))}
        {editing ? (
          <AddButton
            label={addContactLabel}
            onClick={() =>
              onChange({ ...profile, contacts: [...profile.contacts, { label: "New contact" }] })
            }
          />
        ) : null}
      </div>
    </header>
  );
}
