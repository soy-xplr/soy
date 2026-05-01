import type {
  BookmarkDetailContent,
  SubProject,
  SubProjectContentBlock,
} from "../data/bookmarkDetails";
import {
  createBlankDetailContent,
  defaultBookmarkDetails,
} from "../data/bookmarkDetails";

const STORAGE_PREFIX = "beautifulweb-detail:";

const isStringOrUndefined = (value: unknown) =>
  value === undefined || typeof value === "string";

const isDetailSection = (
  section: BookmarkDetailContent["sections"][number],
) =>
  section &&
  typeof section.title === "string" &&
  typeof section.body === "string" &&
  isStringOrUndefined(section.imageUrl) &&
  isStringOrUndefined(section.imageAlt) &&
  isStringOrUndefined(section.imageCaption);

const isContentBlock = (block: unknown): block is SubProjectContentBlock => {
  if (!block || typeof block !== "object") {
    return false;
  }

  const candidate = block as { type?: unknown };
  if (candidate.type === "text") {
    const textBlock = block as { type: "text"; text?: unknown };
    return typeof textBlock.text === "string";
  }
  if (candidate.type === "image") {
    const imageBlock = block as {
      type: "image";
      url?: unknown;
      alt?: unknown;
      caption?: unknown;
    };
    return (
      typeof imageBlock.url === "string" &&
      isStringOrUndefined(imageBlock.alt) &&
      isStringOrUndefined(imageBlock.caption)
    );
  }
  return false;
};

const isSubProject = (
  subProject: NonNullable<BookmarkDetailContent["subProjects"]>[number],
) =>
  subProject &&
  isStringOrUndefined(subProject.slug) &&
  typeof subProject.title === "string" &&
  typeof subProject.summary === "string" &&
  Array.isArray(subProject.tags) &&
  subProject.tags.every((tag) => typeof tag === "string") &&
  typeof subProject.period === "string" &&
  typeof subProject.body === "string" &&
  isStringOrUndefined(subProject.thumbnailUrl) &&
  isStringOrUndefined(subProject.thumbnailAlt) &&
  isStringOrUndefined(subProject.imageUrl) &&
  isStringOrUndefined(subProject.imageAlt) &&
  isStringOrUndefined(subProject.imageCaption) &&
  (subProject.contentBlocks === undefined ||
    (Array.isArray(subProject.contentBlocks) &&
      subProject.contentBlocks.every(isContentBlock)));

const isDetailContent = (value: unknown): value is BookmarkDetailContent => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as BookmarkDetailContent;
  return (
    typeof candidate.intro === "string" &&
    typeof candidate.imageLabel === "string" &&
    (candidate.coverImageUrl === undefined ||
      typeof candidate.coverImageUrl === "string") &&
    (candidate.coverImageAlt === undefined ||
      typeof candidate.coverImageAlt === "string") &&
    Array.isArray(candidate.sections) &&
    candidate.sections.every(isDetailSection) &&
    (candidate.subProjects === undefined ||
      (Array.isArray(candidate.subProjects) &&
        candidate.subProjects.every(isSubProject)))
  );
};

const getStorageKey = (slug: string) => `${STORAGE_PREFIX}${slug}`;

export const getDefaultDetailContent = (slug: string): BookmarkDetailContent =>
  defaultBookmarkDetails[slug] ?? createBlankDetailContent();

export const loadStoredDetailContent = (
  slug: string,
): BookmarkDetailContent | null => {
  const rawValue = localStorage.getItem(getStorageKey(slug));

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue: unknown = JSON.parse(rawValue);
    return isDetailContent(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
};

export const loadDetailContent = (slug: string): BookmarkDetailContent =>
  loadStoredDetailContent(slug) ?? getDefaultDetailContent(slug);

export type SaveResult = { ok: true } | { ok: false; error: string };

export const saveDetailContent = (
  slug: string,
  content: BookmarkDetailContent,
): SaveResult => {
  try {
    localStorage.setItem(getStorageKey(slug), JSON.stringify(content));
    return { ok: true };
  } catch (e) {
    const isQuota =
      e instanceof DOMException &&
      (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED");
    if (isQuota) {
      return {
        ok: false,
        error:
          "저장 공간이 꽉 찼어요. 파일 업로드 대신 이미지 URL을 직접 입력해 주세요.",
      };
    }
    return { ok: false, error: "저장에 실패했어요. 다시 시도해 주세요." };
  }
};

export const resetDetailContent = (slug: string) => {
  localStorage.removeItem(getStorageKey(slug));
};

export const serializeDetailContent = (content: BookmarkDetailContent) =>
  JSON.stringify(content, null, 2);

/**
 * 하위 작업의 본문을 콘텐츠 블록 배열로 변환합니다.
 * contentBlocks가 명시적으로 정의되어 있으면 그대로 사용하고,
 * 그렇지 않으면 기존 body + imageUrl 조합을 자동으로 마이그레이션해서 반환합니다.
 */
export const getEffectiveContentBlocks = (
  subProject: SubProject,
): SubProjectContentBlock[] => {
  if (subProject.contentBlocks !== undefined) {
    return subProject.contentBlocks;
  }

  const migrated: SubProjectContentBlock[] = [];
  const trimmedBody = subProject.body?.trim();
  if (trimmedBody) {
    migrated.push({ type: "text", text: subProject.body });
  }
  if (subProject.imageUrl) {
    migrated.push({
      type: "image",
      url: subProject.imageUrl,
      alt: subProject.imageAlt,
      caption: subProject.imageCaption,
    });
  }
  return migrated;
};

export const parseDetailContentJson = (json: string): BookmarkDetailContent => {
  const parsedValue: unknown = JSON.parse(json);

  if (!isDetailContent(parsedValue)) {
    throw new Error("상세 콘텐츠 JSON 형식이 올바르지 않습니다.");
  }

  return parsedValue;
};
