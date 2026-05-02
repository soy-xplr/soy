import { getGithubBranch, getGithubToken } from "./githubUpload";

const REPO_OWNER = "soy-xplr";
const REPO_NAME = "soy";

export type SyncResult = { ok: true } | { ok: false; error: string };

// 파일 경로 헬퍼 (slug별로 분리)
const detailPath = (slug: string) => `data/edits/${slug}.json`;
const cardPath = (slug: string) => `data/bookmarks/${slug}.json`;

const rawUrl = (path: string, branch: string) =>
  `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${branch}/${path}`;

const apiContentsUrl = (path: string) =>
  `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;

/**
 * UTF-8 안전한 base64 인코딩 (한글 포함).
 */
const utf8ToBase64 = (str: string): string => {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
};

/**
 * 공통: raw URL에서 JSON fetch (캐시 우회).
 */
const fetchJsonFromGithub = async (path: string): Promise<unknown | null> => {
  const branch = getGithubBranch();
  const url = `${rawUrl(path, branch)}?t=${Date.now()}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as unknown;
  } catch {
    return null;
  }
};

/**
 * 공통: GitHub Contents API로 JSON PUT (있으면 update, 없으면 create).
 */
const pushJsonToGithub = async (
  path: string,
  content: unknown,
  commitMessage: string,
): Promise<SyncResult> => {
  const token = getGithubToken();
  if (!token) {
    return { ok: false, error: "GitHub 토큰이 없어요. 먼저 토큰을 연결해주세요." };
  }
  const branch = getGithubBranch();

  // 기존 파일 SHA 조회
  let sha: string | undefined;
  try {
    const headRes = await fetch(`${apiContentsUrl(path)}?ref=${branch}`, {
      headers: { Authorization: `token ${token}` },
    });
    if (headRes.ok) {
      const data = (await headRes.json()) as { sha?: string };
      sha = data.sha;
    }
  } catch {
    // 다음 단계에서 catch
  }

  const json = JSON.stringify(content, null, 2);
  const base64 = utf8ToBase64(json);

  try {
    const putRes = await fetch(apiContentsUrl(path), {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: commitMessage,
        content: base64,
        branch,
        ...(sha ? { sha } : {}),
      }),
    });

    if (putRes.ok) return { ok: true };

    const data = (await putRes.json().catch(() => ({}))) as { message?: string };
    if (putRes.status === 401) return { ok: false, error: "토큰이 유효하지 않아요." };
    if (putRes.status === 403) return { ok: false, error: "쓰기 권한이 없어요." };
    if (putRes.status === 409) {
      return { ok: false, error: "동시 편집 충돌. 새로고침 후 다시 시도해주세요." };
    }
    return { ok: false, error: data.message ?? "동기화 실패" };
  } catch {
    return { ok: false, error: "네트워크 오류" };
  }
};

// ---------- Public API: 상세 페이지 콘텐츠 (detail) ----------

export const fetchRemoteContent = (slug: string) => fetchJsonFromGithub(detailPath(slug));
export const pushToRemote = (slug: string, content: unknown) =>
  pushJsonToGithub(detailPath(slug), content, `edit: ${slug}`);

// ---------- Public API: 메인 페이지 카드 override (card) ----------

export const fetchRemoteCardOverride = (slug: string) =>
  fetchJsonFromGithub(cardPath(slug));
export const pushCardOverrideToRemote = (slug: string, override: unknown) =>
  pushJsonToGithub(cardPath(slug), override, `card: ${slug}`);

// ---------- Debounced 스케줄러 ----------
// key 충돌 방지를 위해 'detail:' / 'card:' 프리픽스 사용

const pendingTimers = new Map<string, ReturnType<typeof setTimeout>>();

type ScheduleOptions = {
  delayMs?: number;
  onStart?: () => void;
  onResult?: (result: SyncResult) => void;
};

const scheduleGenericPush = (
  timerKey: string,
  doPush: () => Promise<SyncResult>,
  options: ScheduleOptions = {},
) => {
  const { delayMs = 5000, onStart, onResult } = options;
  const existing = pendingTimers.get(timerKey);
  if (existing) clearTimeout(existing);

  const timer = setTimeout(async () => {
    pendingTimers.delete(timerKey);
    onStart?.();
    const result = await doPush();
    onResult?.(result);
  }, delayMs);
  pendingTimers.set(timerKey, timer);
};

export const schedulePushToRemote = (
  slug: string,
  content: unknown,
  options: ScheduleOptions = {},
) => scheduleGenericPush(`detail:${slug}`, () => pushToRemote(slug, content), options);

export const scheduleCardOverridePush = (
  slug: string,
  override: unknown,
  options: ScheduleOptions = {},
) =>
  scheduleGenericPush(
    `card:${slug}`,
    () => pushCardOverrideToRemote(slug, override),
    options,
  );
