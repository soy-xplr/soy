const GITHUB_TOKEN_SESSION_KEY = "beautifulweb-github-token";
const GITHUB_BRANCH_SESSION_KEY = "beautifulweb-github-branch";
const REPO_OWNER = "soy-xplr";
const REPO_NAME = "soy";

export const getGithubToken = (): string | null =>
  sessionStorage.getItem(GITHUB_TOKEN_SESSION_KEY);

export const setGithubToken = (token: string) =>
  sessionStorage.setItem(GITHUB_TOKEN_SESSION_KEY, token);

export const getGithubBranch = (): string =>
  sessionStorage.getItem(GITHUB_BRANCH_SESSION_KEY) ?? "main";

export const setGithubBranch = (branch: string) =>
  sessionStorage.setItem(GITHUB_BRANCH_SESSION_KEY, branch);

export const clearGithubToken = () => {
  sessionStorage.removeItem(GITHUB_TOKEN_SESSION_KEY);
  sessionStorage.removeItem(GITHUB_BRANCH_SESSION_KEY);
};

export type UploadResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

const readFileAsBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const sanitizeFilename = (name: string): string =>
  name
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9가-힣._-]/g, "")
    .toLowerCase();

/**
 * 배포 완료될 때까지 URL에 HEAD 요청을 보내 폴링합니다.
 * 최대 maxAttempts × intervalMs 동안 시도합니다.
 */
export const pollUntilDeployed = (
  url: string,
  onReady: () => void,
  intervalMs = 5000,
  maxAttempts = 24, // 최대 2분
): (() => void) => {
  let attempts = 0;
  let stopped = false;

  const check = async () => {
    if (stopped) return;
    try {
      const res = await fetch(url, { method: "HEAD", cache: "no-store" });
      if (res.ok) {
        onReady();
        return;
      }
    } catch {
      // 네트워크 오류는 무시하고 재시도
    }
    attempts++;
    if (attempts < maxAttempts && !stopped) {
      setTimeout(() => void check(), intervalMs);
    }
  };

  setTimeout(() => void check(), intervalMs);
  return () => { stopped = true; };
};

export const uploadImageToGithub = async (
  slug: string,
  file: File,
): Promise<UploadResult> => {
  const token = getGithubToken();
  if (!token) {
    return { ok: false, error: "GitHub 토큰이 없어요. 토큰을 먼저 입력해주세요." };
  }

  const branch = getGithubBranch();

  let base64: string;
  try {
    base64 = await readFileAsBase64(file);
  } catch {
    return { ok: false, error: "파일을 읽는 데 실패했어요." };
  }

  const timestamp = Date.now();
  const ext = file.name.split(".").pop() ?? "png";
  const baseName = sanitizeFilename(file.name.replace(/\.[^.]+$/, ""));
  const filename = `${timestamp}-${baseName}.${ext}`;
  const repoPath = `public/images/projects/${slug}/${filename}`;
  const publicUrl = `/images/projects/${slug}/${filename}`;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${repoPath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `upload: add ${filename}`,
          content: base64,
          branch,
        }),
      },
    );

    if (response.status === 201) {
      return { ok: true, url: publicUrl };
    }

    const data = (await response.json()) as { message?: string };

    if (response.status === 401) {
      return { ok: false, error: "토큰이 유효하지 않아요. 다시 확인해주세요." };
    }
    if (response.status === 403) {
      return { ok: false, error: "저장소에 쓰기 권한이 없어요. 토큰 scope를 확인해주세요." };
    }
    if (response.status === 404) {
      return {
        ok: false,
        error: `저장소(${REPO_OWNER}/${REPO_NAME}) 또는 브랜치(${branch})를 찾을 수 없어요.`,
      };
    }
    if (response.status === 422) {
      return { ok: false, error: "같은 이름의 파일이 이미 있어요." };
    }
    return { ok: false, error: data.message ?? "업로드에 실패했어요." };
  } catch {
    return { ok: false, error: "네트워크 오류가 발생했어요." };
  }
};
