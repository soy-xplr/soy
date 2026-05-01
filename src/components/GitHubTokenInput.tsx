import { useState } from "react";
import {
  clearGithubToken,
  getGithubBranch,
  getGithubToken,
  setGithubBranch,
  setGithubToken,
} from "../utils/githubUpload";

type GitHubTokenInputProps = {
  onTokenChange: () => void;
};

export function GitHubTokenInput({ onTokenChange }: GitHubTokenInputProps) {
  const [token, setToken] = useState("");
  const [branch, setBranch] = useState(getGithubBranch);
  const [isSet, setIsSet] = useState(() => !!getGithubToken());

  const handleSet = () => {
    if (!token.trim()) return;
    setGithubToken(token.trim());
    setGithubBranch(branch.trim() || "main");
    setIsSet(true);
    setToken("");
    onTokenChange();
  };

  const handleClear = () => {
    clearGithubToken();
    setIsSet(false);
    setBranch("main");
    onTokenChange();
  };

  if (isSet) {
    return (
      <div className="github-token-status">
        <span className="save-status save-status-saved">
          GitHub 업로드 연결됨 ✓ ({getGithubBranch()} 브랜치)
        </span>
        <button type="button" onClick={handleClear} className="reset-button">
          토큰 해제
        </button>
      </div>
    );
  }

  return (
    <div className="github-token-input">
      <div className="github-token-header">
        <p className="eyebrow">GitHub 이미지 업로드</p>
        <a
          href="https://github.com/settings/tokens/new?scopes=repo&description=beautifulweb-portfolio-editor"
          target="_blank"
          rel="noreferrer"
          className="github-token-link"
        >
          PAT 발급하기 →
        </a>
      </div>
      <p className="github-token-desc">
        파일 선택 시 GitHub 저장소에 바로 업로드돼요. repo scope 권한이 필요해요.
        <br />
        이번 세션에만 유지됩니다.
      </p>
      <div className="github-token-row">
        <input
          type="password"
          value={token}
          placeholder="ghp_..."
          className="github-token-field"
          onChange={(e) => setToken(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSet(); }}
        />
        <input
          type="text"
          value={branch}
          placeholder="브랜치 (main)"
          className="github-branch-field"
          onChange={(e) => setBranch(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSet(); }}
        />
        <button type="button" onClick={handleSet} disabled={!token.trim()}>
          연결
        </button>
      </div>
    </div>
  );
}
