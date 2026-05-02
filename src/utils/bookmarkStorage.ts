import type { SaveResult } from "./detailStorage";

export type BookmarkOverride = {
  title?: string;
  description?: string;
  tags?: string[];
  note?: string;
  savedAt?: string;
};

const STORAGE_PREFIX = "beautifulweb-bookmark:";
const getStorageKey = (slug: string) => `${STORAGE_PREFIX}${slug}`;

const isBookmarkOverride = (value: unknown): value is BookmarkOverride => {
  if (!value || typeof value !== "object") {
    return false;
  }
  const candidate = value as BookmarkOverride;
  return (
    (candidate.title === undefined || typeof candidate.title === "string") &&
    (candidate.description === undefined ||
      typeof candidate.description === "string") &&
    (candidate.tags === undefined ||
      (Array.isArray(candidate.tags) &&
        candidate.tags.every((tag) => typeof tag === "string"))) &&
    (candidate.note === undefined || typeof candidate.note === "string") &&
    (candidate.savedAt === undefined || typeof candidate.savedAt === "string")
  );
};

/** 외부(GitHub remote)에서 받은 데이터를 안전하게 검증해 반환 */
export const parseBookmarkOverride = (value: unknown): BookmarkOverride | null =>
  isBookmarkOverride(value) ? value : null;

export const loadBookmarkOverride = (slug: string): BookmarkOverride | null => {
  const rawValue = localStorage.getItem(getStorageKey(slug));
  if (!rawValue) {
    return null;
  }
  try {
    const parsedValue: unknown = JSON.parse(rawValue);
    return isBookmarkOverride(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
};

export const saveBookmarkOverride = (
  slug: string,
  override: BookmarkOverride,
): SaveResult => {
  try {
    localStorage.setItem(getStorageKey(slug), JSON.stringify(override));
    return { ok: true };
  } catch (e) {
    const isQuota =
      e instanceof DOMException &&
      (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED");
    if (isQuota) {
      return {
        ok: false,
        error: "저장 공간이 꽉 찼어요.",
      };
    }
    return { ok: false, error: "저장에 실패했어요. 다시 시도해 주세요." };
  }
};

export const resetBookmarkOverride = (slug: string) => {
  localStorage.removeItem(getStorageKey(slug));
};
