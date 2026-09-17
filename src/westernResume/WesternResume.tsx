import { Fragment, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import type { WExperience, WSectionKey, WesternResumeUi } from "../data/westernResume";
import { EditContext } from "../resume/EditContext";
import { EditableText } from "../resume/EditableText";
import { AddButton, DeleteButton } from "../resume/editControls";
import { WHeader } from "./WHeader";
import { WExperienceBlock } from "./WExperienceBlock";
import type { WesternResumeState } from "./useWesternResumeState";
import styles from "./WesternResume.module.css";

const blankExperience: WExperience = {
  company: "Company",
  role: "Role / Title",
  period: "2024 – Present",
  summary: "",
  bullets: [],
  projects: [],
};

// "corporate" replaces the default rhythm wholesale rather than layering on it.
const variantClass = (variant: WesternResumeUi["variant"]) => {
  if (variant === "spacious") return styles.spacious;
  if (variant === "corporate") return styles.corporate;
  return "";
};

/**
 * One renderer for every Western-format résumé page. Content, UI strings and
 * section order come from props, so /resume-en and /resume-v2 share this code.
 */
export function WesternResume({
  state,
  ui,
}: {
  state: WesternResumeState;
  ui: WesternResumeUi;
}) {
  const { data, update, exportJson, importJson, reset } = state;
  const [editing, setEditing] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);

  const { profile, sections, experiences, education, languages, tools } = data;

  const onImportFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      await importJson(file);
    } catch (error) {
      alert(error instanceof Error ? error.message : ui.importError);
    }
  };

  // A section renders only when it has content (or while editing).
  const section = (key: WSectionKey, isEmpty: boolean, body: ReactNode) => {
    if (isEmpty && !editing) return null;
    return (
      <section key={key} className={styles.section}>
        {editing || sections[key] ? (
          <EditableText
            as="h2"
            className={styles.sectionTitle}
            value={sections[key]}
            onChange={(t) => update((d) => void (d.sections[key] = t))}
            placeholder="Section title (optional)"
            singleLine
          />
        ) : null}
        {body}
      </section>
    );
  };

  const hasCapabilityDescriptions = profile.capabilities.some((c) => c.description);

  const renderers: Record<WSectionKey, () => ReactNode> = {
    summary: () =>
      section(
        "summary",
        profile.summary.length === 0,
        <>
          {profile.summary.map((para, i) => (
            <div key={i} className={styles.paragraphRow}>
              <EditableText
                as="p"
                className={styles.paragraph}
                value={para}
                onChange={(text) => update((d) => void (d.profile.summary[i] = text))}
                placeholder="Summary paragraph"
              />
              <DeleteButton
                label="Remove"
                onClick={() => update((d) => d.profile.summary.splice(i, 1))}
              />
            </div>
          ))}
          <AddButton
            label={ui.add.paragraph}
            onClick={() => update((d) => d.profile.summary.push(""))}
          />
        </>,
      ),

    capabilities: () =>
      section(
        "capabilities",
        profile.capabilities.length === 0,
        hasCapabilityDescriptions ? (
          <div className={styles.capabilityList}>
            {profile.capabilities.map((cap, i) => (
              <div key={i} className={styles.capabilityRow}>
                <EditableText
                  className={styles.capabilityLabel}
                  value={cap.label}
                  onChange={(label) => update((d) => void (d.profile.capabilities[i].label = label))}
                  placeholder="Capability"
                  singleLine
                />
                <span className={styles.capabilityDash}>—</span>
                <EditableText
                  value={cap.description ?? ""}
                  onChange={(description) =>
                    update((d) => void (d.profile.capabilities[i].description = description))
                  }
                  placeholder="Description"
                />
                <DeleteButton
                  label="Remove"
                  onClick={() => update((d) => d.profile.capabilities.splice(i, 1))}
                />
              </div>
            ))}
            <AddButton
              label={ui.add.capability}
              onClick={() =>
                update((d) => d.profile.capabilities.push({ label: "New", description: "" }))
              }
            />
          </div>
        ) : (
          <div className={styles.capabilities}>
            {profile.capabilities.map((cap, i) => (
              <span key={i} className={styles.capability}>
                <EditableText
                  value={cap.label}
                  onChange={(label) => update((d) => void (d.profile.capabilities[i].label = label))}
                  placeholder="Capability"
                  singleLine
                />
                <DeleteButton
                  label="Remove"
                  onClick={() => update((d) => d.profile.capabilities.splice(i, 1))}
                />
              </span>
            ))}
            <AddButton
              label={ui.add.capability}
              onClick={() => update((d) => d.profile.capabilities.push({ label: "New capability" }))}
            />
          </div>
        ),
      ),

    experience: () =>
      section(
        "experience",
        experiences.length === 0,
        <>
          {experiences.map((experience, i) => (
            <WExperienceBlock
              key={i}
              experience={experience}
              addProjectLabel={ui.add.project}
              addBulletGroupLabel={ui.add.bulletGroup}
              stackedHead={ui.variant === "corporate"}
              onChange={(next) => update((d) => void (d.experiences[i] = next))}
              onDelete={() => update((d) => d.experiences.splice(i, 1))}
            />
          ))}
          <AddButton
            label={ui.add.company}
            onClick={() => update((d) => d.experiences.push(structuredClone(blankExperience)))}
          />
        </>,
      ),

    education: () =>
      section(
        "education",
        education.length === 0,
        <>
          {education.map((item, i) => (
            <article key={i} className={styles.education}>
              <div className={styles.eduHead}>
                <h3 className={styles.eduSchool}>
                  <EditableText
                    value={item.school}
                    onChange={(school) => update((d) => void (d.education[i].school = school))}
                    placeholder="School"
                    singleLine
                  />
                </h3>
                <span className={styles.eduPeriod}>
                  <EditableText
                    value={item.period}
                    onChange={(period) => update((d) => void (d.education[i].period = period))}
                    placeholder="Period"
                    singleLine
                  />
                  <DeleteButton
                    label="Remove"
                    onClick={() => update((d) => d.education.splice(i, 1))}
                  />
                </span>
              </div>
              <EditableText
                as="p"
                className={styles.eduDegree}
                value={item.degree}
                onChange={(degree) => update((d) => void (d.education[i].degree = degree))}
                placeholder="Degree"
              />
            </article>
          ))}
          <AddButton
            label={ui.add.education}
            onClick={() =>
              update((d) =>
                d.education.push({ school: "School", degree: "Degree", period: "2014 – 2020" }),
              )
            }
          />
        </>,
      ),

    tools: () =>
      section(
        "tools",
        tools.length === 0,
        <div className={styles.tools}>
          {tools.map((group, gi) => (
            <div key={gi} className={styles.toolRow}>
              <span className={styles.toolCategoryCell}>
                <EditableText
                  className={styles.toolCategory}
                  value={group.category}
                  onChange={(category) => update((d) => void (d.tools[gi].category = category))}
                  placeholder="Category"
                  singleLine
                />
                <DeleteButton
                  label="Remove group"
                  onClick={() => update((d) => d.tools.splice(gi, 1))}
                />
              </span>
              <span className={styles.toolItems}>
                {group.items.map((item, ii) => (
                  <Fragment key={ii}>
                    {ii > 0 ? <span className={styles.toolSep}>·</span> : null}
                    <span className={styles.toolItemChip}>
                    <EditableText
                      value={item}
                      onChange={(text) => update((d) => void (d.tools[gi].items[ii] = text))}
                      placeholder="Tool"
                      singleLine
                    />
                    <DeleteButton
                      label="Remove"
                      onClick={() => update((d) => d.tools[gi].items.splice(ii, 1))}
                    />
                    </span>
                  </Fragment>
                ))}
                <AddButton
                  label={ui.add.tool}
                  onClick={() => update((d) => d.tools[gi].items.push("New tool"))}
                />
              </span>
            </div>
          ))}
          <AddButton
            label={ui.add.toolGroup}
            onClick={() => update((d) => d.tools.push({ category: "Category", items: ["Tool"] }))}
          />
        </div>,
      ),

    languages: () =>
      section(
        "languages",
        languages.length === 0,
        <div className={styles.langList}>
          {languages.map((lang, i) => (
            <span key={i} className={styles.langItem}>
              <EditableText
                value={lang}
                onChange={(text) => update((d) => void (d.languages[i] = text))}
                placeholder="Language — proficiency"
                singleLine
              />
              <DeleteButton label="Remove" onClick={() => update((d) => d.languages.splice(i, 1))} />
            </span>
          ))}
          <AddButton
            label={ui.add.language}
            onClick={() => update((d) => d.languages.push("Language — proficiency"))}
          />
        </div>,
      ),
  };

  return (
    <EditContext.Provider value={{ editing }}>
      <div className={`${styles.viewport} ${variantClass(ui.variant)}`}>
        <div className={styles.toolbar}>
          <button
            type="button"
            className={`${styles.primaryButton} ${editing ? styles.primaryActive : ""}`}
            onClick={() => setEditing((v) => !v)}
          >
            {editing ? ui.done : ui.edit}
          </button>

          {editing ? (
            <>
              <button type="button" className={styles.ghostButton} onClick={exportJson}>
                {ui.exportJson}
              </button>
              <button
                type="button"
                className={styles.ghostButton}
                onClick={() => importRef.current?.click()}
              >
                {ui.importJson}
              </button>
              <button
                type="button"
                className={styles.ghostButton}
                onClick={() => {
                  if (confirm(ui.confirmReset)) reset();
                }}
              >
                {ui.reset}
              </button>
              <input
                ref={importRef}
                type="file"
                accept="application/json,.json"
                hidden
                onChange={onImportFile}
              />
            </>
          ) : (
            <button type="button" className={styles.primaryButton} onClick={() => window.print()}>
              {ui.print}
            </button>
          )}

          {ui.navLinks.map((link) => (
            <a key={link.href} className={styles.navLink} href={link.href}>
              {link.label}
            </a>
          ))}

          <span className={styles.toolbarHint}>{editing ? ui.hintEdit : ui.hintPrint}</span>
        </div>

        <div className={styles.sheet}>
          {/* thead/tfoot spacers repeat on every printed page → even margins */}
          <table className={styles.frame}>
            <thead>
              <tr>
                <td>
                  <div className={styles.frameSpacer} aria-hidden="true" />
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <WHeader
                    profile={profile}
                    addContactLabel={ui.add.contact}
                    onChange={(next) => update((d) => void (d.profile = next))}
                  />
                  {ui.sectionOrder.map((key) => renderers[key]())}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <div className={styles.frameSpacer} aria-hidden="true" />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </EditContext.Provider>
  );
}
