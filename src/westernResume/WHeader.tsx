import { Fragment } from "react";
import type { WContact, WesternResumeData } from "../data/westernResume";
import { EditableText } from "../resume/EditableText";
import { useEditing } from "../resume/EditContext";
import { AddButton, DeleteButton } from "../resume/editControls";
import styles from "./WesternResume.module.css";

type Profile = WesternResumeData["profile"];

// Name, optional location, title, and contacts. Contacts render as one inline
// line; any contact marked `highlight` gets its own emphasised line below it.
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

  const indexed = profile.contacts.map((contact, index) => ({ contact, index }));
  const inlineContacts = indexed.filter(({ contact }) => !contact.highlight);
  const featuredContacts = indexed.filter(({ contact }) => contact.highlight);

  const patchContact = (index: number, patch: Partial<WContact>) =>
    onChange({
      ...profile,
      contacts: profile.contacts.map((c, i) => (i === index ? { ...c, ...patch } : c)),
    });

  const removeContact = (index: number) =>
    onChange({ ...profile, contacts: profile.contacts.filter((_, i) => i !== index) });

  const contactBody = (contact: WContact, index: number) =>
    editing ? (
      <EditableText
        value={contact.label}
        onChange={(label) => patchContact(index, { label })}
        placeholder="contact"
        singleLine
      />
    ) : contact.href ? (
      <a href={contact.href} target="_blank" rel="noreferrer">
        {contact.label}
      </a>
    ) : (
      <span>{contact.label}</span>
    );

  const highlightToggle = (contact: WContact, index: number) =>
    editing ? (
      <button
        type="button"
        className={styles.smallToggle}
        onClick={() => patchContact(index, { highlight: contact.highlight ? undefined : true })}
        title="한 줄로 빼서 강조"
      >
        {contact.highlight ? "인라인" : "강조"}
      </button>
    ) : null;

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
        {inlineContacts.map(({ contact, index }, position) => (
          <Fragment key={index}>
            {position > 0 ? <span className={styles.contactSep}>|</span> : null}
            <span className={styles.contactItem}>
              {contactBody(contact, index)}
              {highlightToggle(contact, index)}
              <DeleteButton label="Remove contact" onClick={() => removeContact(index)} />
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

      {featuredContacts.map(({ contact, index }) => (
        <p key={index} className={styles.contactHighlight}>
          {contactBody(contact, index)}
          {highlightToggle(contact, index)}
          <DeleteButton label="Remove contact" onClick={() => removeContact(index)} />
        </p>
      ))}
    </header>
  );
}
