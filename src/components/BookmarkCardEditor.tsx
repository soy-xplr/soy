import { useEffect, useRef, useState } from "react";
import type { BookmarkOverride } from "../utils/bookmarkStorage";
import { saveBookmarkOverride, resetBookmarkOverride } from "../utils/bookmarkStorage";

type BookmarkCardEditorProps = {
  slug: string;
  initial: BookmarkOverride;
  onSaved: (override: BookmarkOverride) => void;
};

export function BookmarkCardEditor({ slug, initial, onSaved }: BookmarkCardEditorProps) {
  const [draft, setDraft] = useState<BookmarkOverride>(initial);
  const [saveStatus, setSaveStatus] = useState<"idle" | "pending" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const onSavedRef = useRef(onSaved);
  useEffect(() => { onSavedRef.current = onSaved; }, [onSaved]);

  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return; }
    setSaveStatus("pending");
    const timer = setTimeout(() => {
      const result = saveBookmarkOverride(slug, draft);
      if (result.ok) {
        setSaveStatus("saved");
        onSavedRef.current(draft);
      } else {
        setSaveStatus("error");
        setErrorMessage(result.error);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [draft, slug]);

  const update = (field: keyof BookmarkOverride, value: string | string[]) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    resetBookmarkOverride(slug);
    const cleared: BookmarkOverride = {};
    setDraft(cleared);
    onSavedRef.current(cleared);
    setSaveStatus("idle");
  };

  return (
    <div className="bookmark-card-editor">
      <div className="owner-editor-heading">
        <div>
          <p className="eyebrow">Card editor</p>
        </div>
        <div className="owner-editor-actions">
          {saveStatus === "pending" && (
            <span className="save-status save-status-pending">저장 중…</span>
          )}
          {saveStatus === "saved" && (
            <span className="save-status save-status-saved">자동 저장됐어요 ✓</span>
          )}
          {saveStatus === "error" && (
            <span className="save-status save-status-error">{errorMessage}</span>
          )}
          <button type="button" onClick={handleReset} className="reset-button">
            원래대로
          </button>
        </div>
      </div>

      <label className="editor-field">
        카드 제목
        <input
          type="text"
          value={draft.title ?? ""}
          placeholder="코드에 입력된 기본값을 덮어씁니다"
          onChange={(e) => update("title", e.target.value)}
        />
      </label>

      <label className="editor-field">
        카드 설명
        <textarea
          rows={2}
          value={draft.description ?? ""}
          placeholder="카드 및 상세 페이지 상단에 표시되는 소개문"
          onChange={(e) => update("description", e.target.value)}
        />
      </label>

      <label className="editor-field">
        태그
        <input
          type="text"
          value={draft.tags ? draft.tags.join(", ") : ""}
          placeholder="쉼표로 구분해 입력하세요"
          onChange={(e) =>
            update(
              "tags",
              e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            )
          }
        />
      </label>

      <label className="editor-field">
        기간
        <input
          type="text"
          value={draft.savedAt ?? ""}
          placeholder="예: 2023-2025"
          onChange={(e) => update("savedAt", e.target.value)}
        />
      </label>

      <label className="editor-field">
        내 역할 (상세 페이지)
        <textarea
          rows={2}
          value={draft.note ?? ""}
          placeholder="상세 페이지 '내 역할' 영역에 표시됩니다"
          onChange={(e) => update("note", e.target.value)}
        />
      </label>
    </div>
  );
}
