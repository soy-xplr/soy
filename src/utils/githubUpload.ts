const GITHUB_TOKEN_SESSION_KEY = "beautifulweb-github-token";
const REPO_OWNER = "soy-xplr";
const REPO_NAME = "soy";
const BRANCH = "main";

export const getGithubToken = (): string | null =>
  sessionStorage.getItem(GITHUB_TOKEN_SESSION_KEY);

export const setGithubToken = (token: string) =>
  sessionStorage.setItem(GITHUB_TOKEN_SESSION_KEY, token);

export const clearGithubToken = () =>
  sessionStorage.removeItem(GITHUB_TOKEN_SESSION_KEY);

export type UploadResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

const readFileAsBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]); // strip data:...;base64, prefix
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const sanitizeFilename = (name: string): string =>
  name
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9가-힣._-]/g, "")
    .toLowerCase();

export const uploadImageToGithub = async (
  slug: string,
  file: File,
): Promise<UploadResult> => {
  const token = getGithubToken();
  if (!token) {
    return { ok: false, error: "GitHub 토큰이 없어요. 토큰을 먼저 입력해주세요." };
  }

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
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `upload: add ${filename}`,
          content: base64,
          branch: BRANCH,
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
      return { ok: false, error: "이 저장소에 쓰기 권한이 없어요." };
    }
    return { ok: false, error: data.message ?? "업로드에 실패했어요." };
  } catch {
    return { ok: false, error: "네트워크 오류가 발생했어요." };
  }
};
