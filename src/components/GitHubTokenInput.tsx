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
    onTokenChange();
  };

  if (isSet) {
    return (
      <div className="github-token-status">
        <span className="save-status save-status-saved">
          GitHub 연결됨 ✓ (soy-xplr/soy · {getGithubBranch()})
        </span>
        <button type="button" onClick={handleClear} className="reset-button">
          재설정
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
        파일 선택 시 GitHub 저장소(soy-xplr/soy)에 바로 업로드돼요. repo scope 권한이 필요해요.
        이번 세션에만 유지됩니다.
      </p>
      <div className="github-token-fields">
        <label className="github-token-label">
          브랜치
          <input
            type="text"
            value={branch}
            placeholder="main"
            className="github-input github-input-sm"
            onChange={(e) => setBranch(e.target.value)}
          />
        </label>
      </div>
      <div className="github-token-row">
        <input
          type="password"
          value={token}
          placeholder="ghp_... (Personal Access Token)"
          className="github-token-field"
          onChange={(e) => setToken(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSet(); }}
        />
        <button
          type="button"
          onClick={handleSet}
          disabled={!token.trim()}
        >
          연결
        </button>
      </div>
    </div>
  );
}
