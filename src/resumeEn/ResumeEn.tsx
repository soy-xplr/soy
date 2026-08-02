import { useRef, useState, type ChangeEvent, type ReactNode } from "react";
import type { EnExperience } from "../data/resumeEnData";
import { EditContext } from "../resume/EditContext";
import { EditableText } from "../resume/EditableText";
import { AddButton, DeleteButton } from "../resume/editControls";
import { useResumeEnState } from "./useResumeEnState";
import { EnHeader } from "./EnHeader";
import { ExperienceBlock } from "./ExperienceBlock";
import styles from "./ResumeEn.module.css";

const blankExperience: EnExperience = {
  company: "Company",
  role: "Role / Title",
  period: "2024 – Present",
  summary: "",
  bullets: [],
  projects: [],
};

// Editable section title + body.
function Section({
  title,
  onChangeTitle,
  children,
}: {
  title: string;
  onChangeTitle: (t: string) => void;
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <EditableText
        as="h2"
        className={styles.sectionTitle}
        value={title}
        onChange={onChangeTitle}
        placeholder="Section title"
        singleLine
      />
      {children}
    </section>
  );
}

export function ResumeEn() {
  const { data, update, exportJson, importJson, reset } = useResumeEnState();
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
      alert(error instanceof Error ? error.message : "Import failed.");
    }
  };

  return (
    <EditContext.Provider value={{ editing }}>
      <div className={styles.viewport}>
        <div className={styles.toolbar}>
          <button
            type="button"
            className={`${styles.primaryButton} ${editing ? styles.primaryActive : ""}`}
            onClick={() => setEditing((v) => !v)}
          >
            {editing ? "✓ Done" : "✎ Edit"}
          </button>

          {editing ? (
            <>
              <button type="button" className={styles.ghostButton} onClick={exportJson}>
                Export JSON
              </button>
              <button
                type="button"
                className={styles.ghostButton}
                onClick={() => importRef.current?.click()}
              >
                Import JSON
              </button>
              <button
                type="button"
                className={styles.ghostButton}
                onClick={() => {
                  if (confirm("Discard all edits and reset to defaults?")) reset();
                }}
              >
                Reset
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
              Save as PDF / Print
            </button>
          )}

          <a className={styles.navLink} href="/resume">
            국문 이력서 →
          </a>

          <span className={styles.toolbarHint}>
            {editing
              ? "Click any text to edit · changes auto-save in this browser"
              : "Chrome · Ctrl/⌘ + P → “Save as PDF” → Margins “None”, Scale 100%"}
          </span>
        </div>

        <div className={styles.sheet}>
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
                  <EnHeader
                    profile={profile}
                    onChange={(next) => update((d) => void (d.profile = next))}
                  />

                  {/* Professional Summary */}
                  <Section
                    title={sections.summary}
                    onChangeTitle={(t) => update((d) => void (d.sections.summary = t))}
                  >
                    {profile.summary.map((para, i) => (
                      <div key={i} className={styles.paragraphRow}>
                        <EditableText
                          as="p"
                          className={styles.paragraph}
                          value={para}
                          onChange={(text) =>
                            update((d) => void (d.profile.summary[i] = text))
                          }
                          placeholder="Summary paragraph"
                        />
                        <DeleteButton
                          label="Remove paragraph"
                          onClick={() => update((d) => d.profile.summary.splice(i, 1))}
                        />
                      </div>
                    ))}
                    <AddButton
                      label="paragraph"
                      onClick={() => update((d) => d.profile.summary.push(""))}
                    />
                  </Section>

                  {/* Core Capabilities */}
                  <Section
                    title={sections.capabilities}
                    onChangeTitle={(t) => update((d) => void (d.sections.capabilities = t))}
                  >
                    <div className={styles.capabilities}>
                      {profile.capabilities.map((cap, i) => (
                        <span key={i} className={styles.capability}>
                          <EditableText
                            value={cap}
                            onChange={(text) =>
                              update((d) => void (d.profile.capabilities[i] = text))
                            }
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
                        label="capability"
                        onClick={() => update((d) => d.profile.capabilities.push("New capability"))}
                      />
                    </div>
                  </Section>

                  {/* Professional Experience */}
                  <Section
                    title={sections.experience}
                    onChangeTitle={(t) => update((d) => void (d.sections.experience = t))}
                  >
                    {experiences.map((experience, i) => (
                      <ExperienceBlock
                        key={i}
                        experience={experience}
                        onChange={(next) => update((d) => void (d.experiences[i] = next))}
                        onDelete={() => update((d) => d.experiences.splice(i, 1))}
                      />
                    ))}
                    <AddButton
                      label="company"
                      onClick={() => update((d) => d.experiences.push(structuredClone(blankExperience)))}
                    />
                  </Section>

                  {/* Education */}
                  <Section
                    title={sections.education}
                    onChangeTitle={(t) => update((d) => void (d.sections.education = t))}
                  >
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
                      label="education"
                      onClick={() =>
                        update((d) =>
                          d.education.push({ school: "School", degree: "Degree", period: "2014 – 2020" }),
                        )
                      }
                    />
                  </Section>

                  {/* Languages */}
                  <Section
                    title={sections.languages}
                    onChangeTitle={(t) => update((d) => void (d.sections.languages = t))}
                  >
                    <div className={styles.langList}>
                      {languages.map((lang, i) => (
                        <span key={i} className={styles.langItem}>
                          <EditableText
                            value={lang}
                            onChange={(text) => update((d) => void (d.languages[i] = text))}
                            placeholder="Language — proficiency"
                            singleLine
                          />
                          <DeleteButton
                            label="Remove"
                            onClick={() => update((d) => d.languages.splice(i, 1))}
                          />
                        </span>
                      ))}
                      <AddButton
                        label="language"
                        onClick={() => update((d) => d.languages.push("Language — proficiency"))}
                      />
                    </div>
                  </Section>

                  {/* Tools */}
                  <Section
                    title={sections.tools}
                    onChangeTitle={(t) => update((d) => void (d.sections.tools = t))}
                  >
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
                              <span key={ii} className={styles.toolItemChip}>
                                {ii > 0 ? ", " : ""}
                                <EditableText
                                  value={item}
                                  onChange={(text) =>
                                    update((d) => void (d.tools[gi].items[ii] = text))
                                  }
                                  placeholder="Tool"
                                  singleLine
                                />
                                <DeleteButton
                                  label="Remove"
                                  onClick={() => update((d) => d.tools[gi].items.splice(ii, 1))}
                                />
                              </span>
                            ))}
                            <AddButton
                              label="tool"
                              onClick={() => update((d) => d.tools[gi].items.push("New tool"))}
                            />
                          </span>
                        </div>
                      ))}
                      <AddButton
                        label="group"
                        onClick={() =>
                          update((d) => d.tools.push({ category: "Category", items: ["Tool"] }))
                        }
                      />
                    </div>
                  </Section>
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
