import { getGithubBranch, getGithubToken } from "./githubUpload";

const REPO_OWNER = "soy-xplr";
const REPO_NAME = "soy";
const DATA_DIR = "data/edits";

export type SyncResult = { ok: true } | { ok: false; error: string };

const filePath = (slug: string) => `${DATA_DIR}/${slug}.json`;

const rawUrl = (slug: string, branch: string) =>
  `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${branch}/${filePath(slug)}`;

const apiContentsUrl = (slug: string) =>
  `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath(slug)}`;

/**
 * GitHub raw URL에서 JSON을 fetch.
 * 인증 불필요 (public repo). 캐시 무효화를 위해 timestamp query param 추가.
 */
export const fetchRemoteContent = async (
  slug: string,
): Promise<unknown | null> => {
  const branch = getGithubBranch();
  // raw.githubusercontent.com에 약간의 캐시가 있어서 ?t=...로 우회
  const url = `${rawUrl(slug, branch)}?t=${Date.now()}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as unknown;
  } catch {
    return null;
  }
};

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
 * GitHub Contents API로 JSON 파일을 PUT.
 * 기존 파일이 있으면 SHA를 가져와서 update, 없으면 create.
 */
export const pushToRemote = async (
  slug: string,
  content: unknown,
): Promise<SyncResult> => {
  const token = getGithubToken();
  if (!token) {
    return { ok: false, error: "GitHub 토큰이 없어요. 먼저 토큰을 연결해주세요." };
  }
  const branch = getGithubBranch();

  // 기존 파일 SHA 조회 (없으면 신규 생성)
  let sha: string | undefined;
  try {
    const headRes = await fetch(
      `${apiContentsUrl(slug)}?ref=${branch}`,
      { headers: { Authorization: `token ${token}` } },
    );
    if (headRes.ok) {
      const data = (await headRes.json()) as { sha?: string };
      sha = data.sha;
    }
  } catch {
    // 네트워크 오류는 다음 단계에서 catch
  }

  const json = JSON.stringify(content, null, 2);
  const base64 = utf8ToBase64(json);

  try {
    const putRes = await fetch(apiContentsUrl(slug), {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `edit: ${slug}`,
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

/**
 * slug별로 push를 debounce. 같은 slug에 대한 빠른 연속 호출은 마지막 것만 commit.
 */
const pendingTimers = new Map<string, ReturnType<typeof setTimeout>>();

export const schedulePushToRemote = (
  slug: string,
  content: unknown,
  options: {
    delayMs?: number;
    onStart?: () => void;
    onResult?: (result: SyncResult) => void;
  } = {},
) => {
  const { delayMs = 5000, onStart, onResult } = options;
  const existing = pendingTimers.get(slug);
  if (existing) clearTimeout(existing);

  const timer = setTimeout(async () => {
    pendingTimers.delete(slug);
    onStart?.();
    const result = await pushToRemote(slug, content);
    onResult?.(result);
  }, delayMs);
  pendingTimers.set(slug, timer);
};
