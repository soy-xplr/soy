import { useMemo, useState } from "react";
import type {
  BookmarkDetailContent,
  SubProject,
  SubProjectContentBlock,
} from "../data/bookmarkDetails";
import { getEffectiveContentBlocks } from "../utils/detailStorage";

type SubProjectEditorProps = {
  content: BookmarkDetailContent;
  subProjectIndex: number;
  onSave: (content: BookmarkDetailContent) => void;
};

type DraftSubProject = SubProject & {
  contentBlocks: SubProjectContentBlock[];
};

const toDraft = (subProject: SubProject): DraftSubProject => ({
  ...subProject,
  contentBlocks: getEffectiveContentBlocks(subProject),
});

const createTextBlock = (): SubProjectContentBlock => ({
  type: "text",
  text: "",
});

const createImageBlock = (): SubProjectContentBlock => ({
  type: "image",
  url: "",
  alt: "",
  caption: "",
});

export function SubProjectEditor({
  content,
  subProjectIndex,
  onSave,
}: SubProjectEditorProps) {
  const currentSubProject = useMemo(
    () => content.subProjects?.[subProjectIndex],
    [content.subProjects, subProjectIndex],
  );
  const [draft, setDraft] = useState<DraftSubProject | undefined>(() =>
    currentSubProject ? toDraft(currentSubProject) : undefined,
  );
  const [message, setMessage] = useState("");


  if (!draft) {
    return null;
  }

  const updateField = (
    field:
      | "title"
      | "summary"
      | "period"
      | "thumbnailUrl"
      | "thumbnailAlt",
    value: string,
  ) => {
    setDraft((currentDraft) =>
      currentDraft ? { ...currentDraft, [field]: value } : currentDraft,
    );
  };

  const updateTags = (value: string) => {
    setDraft((currentDraft) =>
      currentDraft
        ? {
            ...currentDraft,
            tags: value
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          }
        : currentDraft,
    );
  };

  const setThumbnailFromFile = (file?: File) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        return;
      }

      setDraft((currentDraft) =>
        currentDraft
          ? {
              ...currentDraft,
              thumbnailUrl: reader.result as string,
              thumbnailAlt: currentDraft.thumbnailAlt || file.name,
            }
          : currentDraft,
      );
      setMessage("카드 썸네일을 넣었어요. 저장 버튼을 눌러주세요.");
    };
    reader.readAsDataURL(file);
  };

  const updateBlocks = (
    updater: (blocks: SubProjectContentBlock[]) => SubProjectContentBlock[],
  ) => {
    setDraft((currentDraft) =>
      currentDraft
        ? { ...currentDraft, contentBlocks: updater(currentDraft.contentBlocks) }
        : currentDraft,
    );
  };

  const addTextBlock = () => {
    updateBlocks((blocks) => [...blocks, createTextBlock()]);
  };

  const addImageBlock = () => {
    updateBlocks((blocks) => [...blocks, createImageBlock()]);
  };

  const removeBlock = (index: number) => {
    updateBlocks((blocks) => blocks.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    updateBlocks((blocks) => {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= blocks.length) {
        return blocks;
      }
      const next = [...blocks];
      const [moved] = next.splice(index, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
  };

  const updateTextBlock = (index: number, text: string) => {
    updateBlocks((blocks) =>
      blocks.map((block, i) =>
        i === index && block.type === "text" ? { ...block, text } : block,
      ),
    );
  };

  const updateImageBlock = (
    index: number,
    field: "url" | "alt" | "caption",
    value: string,
  ) => {
    updateBlocks((blocks) =>
      blocks.map((block, i) =>
        i === index && block.type === "image" ? { ...block, [field]: value } : block,
      ),
    );
  };

  const setImageBlockFromFile = (index: number, file?: File) => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        return;
      }
      updateBlocks((blocks) =>
        blocks.map((block, i) =>
          i === index && block.type === "image"
            ? {
                ...block,
                url: reader.result as string,
                alt: block.alt || file.name,
              }
            : block,
        ),
      );
      setMessage("이미지를 본문 블록에 넣었어요. 저장 버튼을 눌러주세요.");
    };
    reader.readAsDataURL(file);
  };

  const saveDraft = () => {
    const updatedSubProjects = [...(content.subProjects ?? [])];
    // contentBlocks가 본문의 단일 진실 출처가 되도록 저장.
    // legacy body/imageUrl도 첫 텍스트/이미지 블록에 동기화해서 호환성 유지.
    const firstText = draft.contentBlocks.find((block) => block.type === "text");
    const firstImage = draft.contentBlocks.find((block) => block.type === "image");
    const synced: SubProject = {
      ...draft,
      body: firstText && firstText.type === "text" ? firstText.text : "",
      imageUrl: firstImage && firstImage.type === "image" ? firstImage.url : "",
      imageAlt:
        firstImage && firstImage.type === "image" ? firstImage.alt ?? "" : "",
      imageCaption:
        firstImage && firstImage.type === "image" ? firstImage.caption ?? "" : "",
    };
    updatedSubProjects[subProjectIndex] = synced;
    onSave({ ...content, subProjects: updatedSubProjects });
    setMessage("하위 작업 페이지 내용을 저장했어요.");
  };

  return (
    <section className="owner-editor" aria-label="하위 작업 페이지 편집 패널">
      <div className="owner-editor-heading">
        <div>
          <p className="eyebrow">Owner editor</p>
          <h2>하위 작업 페이지 편집</h2>
        </div>
        <button type="button" onClick={saveDraft}>
          저장
        </button>
      </div>

      {message ? <p className="owner-message">{message}</p> : null}

      <label className="editor-field">
        페이지 제목
        <input
          type="text"
          value={draft.title}
          onChange={(event) => updateField("title", event.target.value)}
        />
      </label>
      <label className="editor-field">
        한 줄 요약
        <input
          type="text"
          value={draft.summary}
          onChange={(event) => updateField("summary", event.target.value)}
        />
      </label>
      <label className="editor-field">
        기간
        <input
          type="text"
          value={draft.period}
          onChange={(event) => updateField("period", event.target.value)}
        />
      </label>
      <label className="editor-field">
        태그
        <input
          type="text"
          value={draft.tags.join(", ")}
          placeholder="쉼표로 구분해 입력하세요"
          onChange={(event) => updateTags(event.target.value)}
        />
      </label>

      <div className="editor-image-tools">
        <label className="editor-field">
          카드 썸네일 URL
          <input
            type="text"
            value={draft.thumbnailUrl ?? ""}
            placeholder="/images/projects/card.jpg 또는 https://..."
            onChange={(event) => updateField("thumbnailUrl", event.target.value)}
          />
        </label>
        <label className="editor-field">
          카드 썸네일 파일 선택
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setThumbnailFromFile(event.target.files?.[0])}
          />
        </label>
        <label className="editor-field">
          카드 썸네일 설명
          <input
            type="text"
            value={draft.thumbnailAlt ?? ""}
            onChange={(event) => updateField("thumbnailAlt", event.target.value)}
          />
        </label>
      </div>

      <fieldset className="editor-section content-blocks">
        <legend>본문 블록</legend>
        <p className="content-blocks-help">
          텍스트와 이미지 블록을 자유롭게 추가하고 순서를 바꿔 본문을 구성할 수 있어요.
        </p>

        {draft.contentBlocks.length === 0 ? (
          <p className="content-blocks-empty">
            아직 블록이 없어요. 아래 버튼으로 블록을 추가해주세요.
          </p>
        ) : null}

        <ol className="content-blocks-list">
          {draft.contentBlocks.map((block, index) => (
            <li key={index} className={`content-block content-block-${block.type}`}>
              <div className="content-block-header">
                <span className="content-block-label">
                  {index + 1}. {block.type === "text" ? "텍스트" : "이미지"}
                </span>
                <div className="content-block-controls">
                  <button
                    type="button"
                    onClick={() => moveBlock(index, -1)}
                    disabled={index === 0}
                    aria-label="블록 위로 이동"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveBlock(index, 1)}
                    disabled={index === draft.contentBlocks.length - 1}
                    aria-label="블록 아래로 이동"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeBlock(index)}
                    aria-label="블록 삭제"
                  >
                    삭제
                  </button>
                </div>
              </div>

              {block.type === "text" ? (
                <label className="editor-field">
                  내용
                  <textarea
                    value={block.text}
                    rows={6}
                    placeholder="이 블록의 내용을 적어주세요. 줄바꿈은 그대로 보여집니다."
                    onChange={(event) => updateTextBlock(index, event.target.value)}
                  />
                </label>
              ) : (
                <div className="editor-image-tools">
                  <label className="editor-field">
                    이미지 URL
                    <input
                      type="text"
                      value={block.url}
                      placeholder="/images/projects/example.jpg 또는 https://..."
                      onChange={(event) =>
                        updateImageBlock(index, "url", event.target.value)
                      }
                    />
                  </label>
                  <label className="editor-field">
                    이미지 파일 선택
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        setImageBlockFromFile(index, event.target.files?.[0])
                      }
                    />
                  </label>
                  {block.url ? (
                    <div className="content-block-preview">
                      <img
                        src={block.url}
                        alt={block.alt || "미리보기"}
                      />
                    </div>
                  ) : null}
                  <label className="editor-field">
                    이미지 설명 (alt)
                    <input
                      type="text"
                      value={block.alt ?? ""}
                      placeholder="화면을 설명하는 짧은 문장"
                      onChange={(event) =>
                        updateImageBlock(index, "alt", event.target.value)
                      }
                    />
                  </label>
                  <label className="editor-field">
                    이미지 캡션
                    <input
                      type="text"
                      value={block.caption ?? ""}
                      placeholder="이미지 아래에 보일 설명"
                      onChange={(event) =>
                        updateImageBlock(index, "caption", event.target.value)
                      }
                    />
                  </label>
                </div>
              )}
            </li>
          ))}
        </ol>

        <div className="content-blocks-actions">
          <button type="button" onClick={addTextBlock}>
            텍스트 블록 추가
          </button>
          <button type="button" onClick={addImageBlock}>
            이미지 블록 추가
          </button>
        </div>
      </fieldset>
    </section>
  );
}
