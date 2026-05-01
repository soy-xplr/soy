import { useEffect, useMemo, useRef, useState } from "react";
import type { BookmarkDetailContent, SubProject } from "../data/bookmarkDetails";
import {
  parseDetailContentJson,
  serializeDetailContent,
  type SaveResult,
} from "../utils/detailStorage";

type OwnerEditorProps = {
  content: BookmarkDetailContent;
  title: string;
  onSave: (content: BookmarkDetailContent) => SaveResult;
  onReset: () => void;
};

const createBlankSubProject = (): SubProject => ({
  slug: "new-work-stream",
  title: "새 하위 작업",
  summary: "이 작업을 한 줄로 요약해주세요.",
  tags: [],
  period: "",
  body: "여기에 자유롭게 내용을 적어주세요.",
  thumbnailUrl: "",
  thumbnailAlt: "",
  imageUrl: "",
  imageAlt: "",
  imageCaption: "",
});

export function OwnerEditor({
  content,
  title,
  onSave,
  onReset,
}: OwnerEditorProps) {
  const [draft, setDraft] = useState(content);
  const [importJson, setImportJson] = useState("");
  const [message, setMessage] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "pending" | "saved" | "error">("idle");
  const exportJson = useMemo(() => serializeDetailContent(draft), [draft]);

  // 자동저장: draft가 바뀌면 1.5초 후 저장
  const onSaveRef = useRef(onSave);
  useEffect(() => { onSaveRef.current = onSave; }, [onSave]);
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return; }
    setSaveStatus("pending");
    const timer = setTimeout(() => {
      const result = onSaveRef.current(draft);
      if (result.ok) {
        setSaveStatus("saved");
      } else {
        setSaveStatus("error");
        setMessage(result.error);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [draft]);

  const updateSection = (
    index: number,
    field: "title" | "body" | "imageUrl" | "imageAlt" | "imageCaption",
    value: string,
  ) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      sections: currentDraft.sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, [field]: value } : section,
      ),
    }));
  };

  const updateSubProject = (
    index: number,
    field:
      | "slug"
      | "title"
      | "summary"
      | "period"
      | "body"
      | "thumbnailUrl"
      | "thumbnailAlt"
      | "imageUrl"
      | "imageAlt"
      | "imageCaption",
    value: string,
  ) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      subProjects: (currentDraft.subProjects ?? []).map(
        (subProject, subProjectIndex) =>
          subProjectIndex === index
            ? { ...subProject, [field]: value }
            : subProject,
      ),
    }));
  };

  const updateSubProjectTags = (index: number, value: string) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      subProjects: (currentDraft.subProjects ?? []).map(
        (subProject, subProjectIndex) =>
          subProjectIndex === index
            ? {
                ...subProject,
                tags: value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean),
              }
            : subProject,
      ),
    }));
  };

  const addSection = () => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      sections: [
        ...currentDraft.sections,
        {
          title: "새 섹션",
          body: "여기에 내용을 적어주세요.",
          imageUrl: "",
          imageAlt: "",
          imageCaption: "",
        },
      ],
    }));
  };

  const addSubProject = () => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      subProjects: [...(currentDraft.subProjects ?? []), createBlankSubProject()],
    }));
  };

  const setCoverImageFromFile = (file?: File) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        return;
      }

      setDraft((currentDraft) => ({
        ...currentDraft,
        coverImageUrl: reader.result as string,
        coverImageAlt: currentDraft.coverImageAlt || file.name,
      }));
      setMessage("대표 이미지를 넣었어요. 저장하면 카드와 상세 상단에 함께 반영됩니다.");
    };
    reader.readAsDataURL(file);
  };

  const setSectionImageFromFile = (index: number, file?: File) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        return;
      }

      setDraft((currentDraft) => ({
        ...currentDraft,
        sections: currentDraft.sections.map((section, sectionIndex) =>
          sectionIndex === index
            ? {
                ...section,
                imageUrl: reader.result as string,
                imageAlt: section.imageAlt || file.name,
              }
            : section,
        ),
      }));
      setMessage("이미지를 본문 섹션에 넣었어요. 잠시 후 자동 저장됩니다.");
    };
    reader.readAsDataURL(file);
  };

  const setSubProjectImageFromFile = (index: number, file?: File) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        return;
      }

      setDraft((currentDraft) => ({
        ...currentDraft,
        subProjects: (currentDraft.subProjects ?? []).map(
          (subProject, subProjectIndex) =>
            subProjectIndex === index
              ? {
                  ...subProject,
                  imageUrl: reader.result as string,
                  imageAlt: subProject.imageAlt || file.name,
                }
              : subProject,
        ),
      }));
      setMessage("하위 작업 카드에 이미지를 넣었어요. 잠시 후 자동 저장됩니다.");
    };
    reader.readAsDataURL(file);
  };

  const setSubProjectThumbnailFromFile = (index: number, file?: File) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        return;
      }

      setDraft((currentDraft) => ({
        ...currentDraft,
        subProjects: (currentDraft.subProjects ?? []).map(
          (subProject, subProjectIndex) =>
            subProjectIndex === index
              ? {
                  ...subProject,
                  thumbnailUrl: reader.result as string,
                  thumbnailAlt: subProject.thumbnailAlt || file.name,
                }
              : subProject,
        ),
      }));
      setMessage("하위 작업 카드 썸네일을 넣었어요. 잠시 후 자동 저장됩니다.");
    };
    reader.readAsDataURL(file);
  };

  const removeSection = (index: number) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      sections: currentDraft.sections.filter((_, sectionIndex) => sectionIndex !== index),
    }));
  };

  const removeSubProject = (index: number) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      subProjects: (currentDraft.subProjects ?? []).filter(
        (_, subProjectIndex) => subProjectIndex !== index,
      ),
    }));
  };

  const importDraft = () => {
    try {
      const parsedContent = parseDetailContentJson(importJson);
      setDraft(parsedContent);
      const result = onSave(parsedContent);
      setImportJson("");
      setMessage(result.ok ? "JSON을 가져와 저장했어요." : result.error);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "JSON을 확인해주세요.");
    }
  };

  const copyExportJson = async () => {
    await navigator.clipboard.writeText(exportJson);
    setMessage("JSON을 클립보드에 복사했어요.");
  };

  const downloadExportJson = () => {
    const blob = new Blob([exportJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}-detail.json`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage("JSON 파일을 다운로드했어요.");
  };

  return (
    <section className="owner-editor" aria-label="상세 페이지 편집 패널">
      <div className="owner-editor-heading">
        <div>
          <p className="eyebrow">Owner editor</p>
          <h2>상세 페이지 편집</h2>
        </div>
        <div className="owner-editor-actions">
          {saveStatus === "pending" && (
            <span className="save-status save-status-pending">저장 중…</span>
          )}
          {saveStatus === "saved" && (
            <span className="save-status save-status-saved">자동 저장됐어요 ✓</span>
          )}
          {saveStatus === "error" && (
            <span className="save-status save-status-error">저장 실패</span>
          )}
          <button type="button" onClick={onReset}>
            기본값으로 되돌리기
          </button>
        </div>
      </div>

      {message ? <p className="owner-message">{message}</p> : null}

      <label className="editor-field">
        소개문
        <textarea
          value={draft.intro}
          rows={3}
          onChange={(event) =>
            setDraft((currentDraft) => ({
              ...currentDraft,
              intro: event.target.value,
            }))
          }
        />
      </label>

      <label className="editor-field">
        대표 이미지 라벨
        <input
          type="text"
          value={draft.imageLabel}
          onChange={(event) =>
            setDraft((currentDraft) => ({
              ...currentDraft,
              imageLabel: event.target.value,
            }))
          }
        />
      </label>

      <div className="editor-cover-tools">
        <label className="editor-field">
          대표 이미지 URL
          <input
            type="text"
            value={draft.coverImageUrl ?? ""}
            placeholder="/images/projects/cover.jpg 또는 https://..."
            onChange={(event) =>
              setDraft((currentDraft) => ({
                ...currentDraft,
                coverImageUrl: event.target.value,
              }))
            }
          />
        </label>
        <label className="editor-field">
          대표 이미지 파일 선택
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setCoverImageFromFile(event.target.files?.[0])}
          />
        </label>
        <label className="editor-field">
          대표 이미지 설명
          <input
            type="text"
            value={draft.coverImageAlt ?? ""}
            placeholder="카드 썸네일과 상세 커버를 설명하는 문장"
            onChange={(event) =>
              setDraft((currentDraft) => ({
                ...currentDraft,
                coverImageAlt: event.target.value,
              }))
            }
          />
        </label>
        {draft.coverImageUrl ? (
          <button
            type="button"
            onClick={() =>
              setDraft((currentDraft) => ({
                ...currentDraft,
                coverImageUrl: "",
              }))
            }
          >
            대표 이미지 제거
          </button>
        ) : null}
      </div>

      <div className="editor-sections">
        {draft.sections.map((section, index) => (
          <fieldset key={index} className="editor-section">
            <legend>섹션 {index + 1}</legend>
            <label className="editor-field">
              섹션 제목
              <input
                type="text"
                value={section.title}
                onChange={(event) =>
                  updateSection(index, "title", event.target.value)
                }
              />
            </label>
            <label className="editor-field">
              본문
              <textarea
                value={section.body}
                rows={6}
                onChange={(event) =>
                  updateSection(index, "body", event.target.value)
                }
              />
            </label>
            <div className="editor-image-tools">
              <label className="editor-field">
                본문 이미지 URL
                <input
                  type="text"
                  value={section.imageUrl ?? ""}
                  placeholder="/images/projects/example.jpg 또는 https://..."
                  onChange={(event) =>
                    updateSection(index, "imageUrl", event.target.value)
                  }
                />
              </label>
              <label className="editor-field">
                이미지 파일 선택
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setSectionImageFromFile(index, event.target.files?.[0])
                  }
                />
              </label>
              <label className="editor-field">
                이미지 설명
                <input
                  type="text"
                  value={section.imageAlt ?? ""}
                  placeholder="화면을 설명하는 짧은 문장"
                  onChange={(event) =>
                    updateSection(index, "imageAlt", event.target.value)
                  }
                />
              </label>
              <label className="editor-field">
                이미지 캡션
                <input
                  type="text"
                  value={section.imageCaption ?? ""}
                  placeholder="이미지 아래에 보일 설명"
                  onChange={(event) =>
                    updateSection(index, "imageCaption", event.target.value)
                  }
                />
              </label>
              {section.imageUrl ? (
                <button
                  type="button"
                  onClick={() => updateSection(index, "imageUrl", "")}
                >
                  이미지 제거
                </button>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => removeSection(index)}
              disabled={draft.sections.length === 1}
            >
              섹션 삭제
            </button>
          </fieldset>
        ))}
      </div>

      <button className="secondary-action" type="button" onClick={addSection}>
        섹션 추가
      </button>

      <div className="editor-subprojects">
        <div className="owner-editor-heading">
          <div>
            <p className="eyebrow">Work stream cards</p>
            <h2>하위 작업 카드</h2>
          </div>
          <button className="secondary-action" type="button" onClick={addSubProject}>
            하위 작업 카드 추가
          </button>
        </div>

        {(draft.subProjects ?? []).map((subProject, index) => (
          <fieldset key={index} className="editor-section">
            <legend>하위 작업 {index + 1}</legend>
            <label className="editor-field">
              URL slug
              <input
                type="text"
                value={subProject.slug ?? ""}
                placeholder="예: account-policy"
                onChange={(event) =>
                  updateSubProject(index, "slug", event.target.value)
                }
              />
            </label>
            <label className="editor-field">
              카드 제목
              <input
                type="text"
                value={subProject.title}
                onChange={(event) =>
                  updateSubProject(index, "title", event.target.value)
                }
              />
            </label>
            <label className="editor-field">
              한 줄 요약
              <input
                type="text"
                value={subProject.summary}
                onChange={(event) =>
                  updateSubProject(index, "summary", event.target.value)
                }
              />
            </label>
            <label className="editor-field">
              기간
              <input
                type="text"
                value={subProject.period}
                placeholder="예: 2024.03 - 2024.09"
                onChange={(event) =>
                  updateSubProject(index, "period", event.target.value)
                }
              />
            </label>
            <label className="editor-field">
              태그
              <input
                type="text"
                value={subProject.tags.join(", ")}
                placeholder="쉼표로 구분해 입력하세요"
                onChange={(event) => updateSubProjectTags(index, event.target.value)}
              />
            </label>
            <label className="editor-field">
              자유 본문 (간단 입력)
              <small style={{ color: "var(--muted)", fontWeight: 400 }}>
                본문에 텍스트와 이미지를 여러 개 자유롭게 섞으려면 하위 작업 카드를 열고
                "하위 작업 페이지 편집"에서 본문 블록을 추가해주세요.
              </small>
              <textarea
                value={subProject.body}
                rows={6}
                onChange={(event) =>
                  updateSubProject(index, "body", event.target.value)
                }
              />
            </label>
            <div className="editor-image-tools">
              <label className="editor-field">
                카드 썸네일 URL
                <input
                  type="text"
                  value={subProject.thumbnailUrl ?? ""}
                  placeholder="/images/projects/card.jpg 또는 https://..."
                  onChange={(event) =>
                    updateSubProject(index, "thumbnailUrl", event.target.value)
                  }
                />
              </label>
              <label className="editor-field">
                카드 썸네일 파일 선택
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setSubProjectThumbnailFromFile(index, event.target.files?.[0])
                  }
                />
              </label>
              <label className="editor-field">
                카드 썸네일 설명
                <input
                  type="text"
                  value={subProject.thumbnailAlt ?? ""}
                  placeholder="카드 이미지를 설명하는 짧은 문장"
                  onChange={(event) =>
                    updateSubProject(index, "thumbnailAlt", event.target.value)
                  }
                />
              </label>
              {subProject.thumbnailUrl ? (
                <button
                  type="button"
                  onClick={() => updateSubProject(index, "thumbnailUrl", "")}
                >
                  카드 썸네일 제거
                </button>
              ) : null}
            </div>
            <div className="editor-image-tools">
              <label className="editor-field">
                이미지 URL
                <input
                  type="text"
                  value={subProject.imageUrl ?? ""}
                  placeholder="/images/projects/example.jpg 또는 https://..."
                  onChange={(event) =>
                    updateSubProject(index, "imageUrl", event.target.value)
                  }
                />
              </label>
              <label className="editor-field">
                이미지 파일 선택
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setSubProjectImageFromFile(index, event.target.files?.[0])
                  }
                />
              </label>
              <label className="editor-field">
                이미지 설명
                <input
                  type="text"
                  value={subProject.imageAlt ?? ""}
                  placeholder="화면을 설명하는 짧은 문장"
                  onChange={(event) =>
                    updateSubProject(index, "imageAlt", event.target.value)
                  }
                />
              </label>
              <label className="editor-field">
                이미지 캡션
                <input
                  type="text"
                  value={subProject.imageCaption ?? ""}
                  placeholder="이미지 아래에 보일 설명"
                  onChange={(event) =>
                    updateSubProject(index, "imageCaption", event.target.value)
                  }
                />
              </label>
              {subProject.imageUrl ? (
                <button
                  type="button"
                  onClick={() => updateSubProject(index, "imageUrl", "")}
                >
                  이미지 제거
                </button>
              ) : null}
            </div>
            <button type="button" onClick={() => removeSubProject(index)}>
              하위 작업 삭제
            </button>
          </fieldset>
        ))}
      </div>

      <div className="json-tools">
        <label className="editor-field">
          JSON 내보내기
          <textarea readOnly value={exportJson} rows={8} />
        </label>
        <div className="owner-editor-actions">
          <button type="button" onClick={copyExportJson}>
            JSON 복사
          </button>
          <button type="button" onClick={downloadExportJson}>
            JSON 다운로드
          </button>
        </div>

        <label className="editor-field">
          JSON 가져오기
          <textarea
            value={importJson}
            rows={6}
            placeholder="내보낸 JSON을 여기에 붙여넣으세요"
            onChange={(event) => setImportJson(event.target.value)}
          />
        </label>
        <button type="button" onClick={importDraft} disabled={!importJson.trim()}>
          JSON 가져오기
        </button>
      </div>
    </section>
  );
}
