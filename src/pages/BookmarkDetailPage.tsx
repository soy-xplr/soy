import { useEffect, useState } from "react";
import { OwnerEditor } from "../components/OwnerEditor";
import { SubProjectEditor } from "../components/SubProjectEditor";
import type { Bookmark } from "../data/bookmarks";
import {
  createBlankDetailContent,
  type BookmarkDetailContent,
} from "../data/bookmarkDetails";
import { Tag } from "../components/Tag";
import {
  getDefaultDetailContent,
  getEffectiveContentBlocks,
  loadDetailContent,
  parseDetailContentJson,
  resetDetailContent,
  saveDetailContent,
  type SaveResult,
} from "../utils/detailStorage";
import { loadBookmarkOverride } from "../utils/bookmarkStorage";
import {
  fetchRemoteContent,
  schedulePushToRemote,
  type SyncResult,
} from "../utils/githubSync";
import { getGithubToken } from "../utils/githubUpload";

const OWNER_PASSCODE = "beautifulweb";
const OWNER_SESSION_KEY = "beautifulweb-owner-unlocked";

type BookmarkDetailPageProps = {
  bookmark?: Bookmark;
  subProjectSlug: string | null;
  isOwnerMode: boolean;
  onBack: () => void;
  onBackToProject: (slug: string) => void;
  onOpenSubProject: (projectSlug: string, subProjectSlug: string) => void;
};

const getSubProjectSlug = (
  subProject: NonNullable<BookmarkDetailContent["subProjects"]>[number],
  index: number,
) => subProject.slug || `work-${index + 1}`;

export function BookmarkDetailPage({
  bookmark,
  subProjectSlug,
  isOwnerMode,
  onBack,
  onBackToProject,
  onOpenSubProject,
}: BookmarkDetailPageProps) {
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [isOwnerUnlocked, setIsOwnerUnlocked] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);
  const [detailContent, setDetailContent] = useState<BookmarkDetailContent>(
    () => (bookmark ? loadDetailContent(bookmark.slug) : createBlankDetailContent()),
  );
  const [syncStatus, setSyncStatus] = useState<
    "idle" | "fetching" | "pushing" | "synced" | "error"
  >("idle");
  const [syncError, setSyncError] = useState("");

  useEffect(() => {
    setIsOwnerUnlocked(sessionStorage.getItem(OWNER_SESSION_KEY) === "true");
  }, []);

  useEffect(() => {
    if (!bookmark) {
      return;
    }

    setDetailContent(loadDetailContent(bookmark.slug));
  }, [bookmark]);

  // 다른 디바이스에서 편집한 내용을 원격에서 가져와 반영
  useEffect(() => {
    if (!bookmark) return;
    let cancelled = false;
    setSyncStatus("fetching");
    fetchRemoteContent(bookmark.slug).then((remote) => {
      if (cancelled) return;
      if (!remote) {
        setSyncStatus("idle");
        return;
      }
      try {
        const parsed = parseDetailContentJson(JSON.stringify(remote));
        saveDetailContent(bookmark.slug, parsed);
        setDetailContent(parsed);
        setSyncStatus("synced");
      } catch {
        setSyncStatus("idle"); // 검증 실패 시 조용히 무시
      }
    });
    return () => {
      cancelled = true;
    };
  }, [bookmark]);

  // 카드 편집 오버라이드를 상세 페이지에도 반영
  const cardOverride = bookmark ? (loadBookmarkOverride(bookmark.slug) ?? {}) : {};
  const effectiveBookmark = bookmark
    ? {
        ...bookmark,
        title: cardOverride.title || bookmark.title,
        description: cardOverride.description || bookmark.description,
        tags: cardOverride.tags ?? bookmark.tags,
        note: cardOverride.note || bookmark.note,
        savedAt: cardOverride.savedAt || bookmark.savedAt,
      }
    : bookmark;

  if (!bookmark) {
    return (
      <div className="page detail-page not-found">
        <button className="back-link" type="button" onClick={onBack}>
          목록으로 돌아가기
        </button>
        <h1>이 서랍에는 없는 페이지예요.</h1>
        <p>주소를 다시 확인하거나 북마크 목록에서 다른 조각을 펼쳐보세요.</p>
      </div>
    );
  }

  const unlockOwnerMode = () => {
    if (passcode === OWNER_PASSCODE) {
      sessionStorage.setItem(OWNER_SESSION_KEY, "true");
      setIsOwnerUnlocked(true);
      setPasscode("");
      setPasscodeError("");
      return;
    }

    setPasscodeError("패스코드를 다시 확인해주세요.");
  };

  const saveOwnerContent = (content: BookmarkDetailContent): SaveResult => {
    const result = saveDetailContent(bookmark.slug, content);
    if (result.ok) {
      setDetailContent(content);
      // GitHub에도 푸시 (debounced 5초). 토큰 없으면 조용히 스킵.
      if (getGithubToken()) {
        schedulePushToRemote(bookmark.slug, content, {
          onStart: () => setSyncStatus("pushing"),
          onResult: (r: SyncResult) => {
            if (r.ok) {
              setSyncStatus("synced");
              setSyncError("");
            } else {
              setSyncStatus("error");
              setSyncError(r.error);
            }
          },
        });
      }
    }
    return result;
  };

  const resetOwnerContent = () => {
    resetDetailContent(bookmark.slug);
    setDetailContent(getDefaultDetailContent(bookmark.slug));
    setResetCounter((c) => c + 1);
  };

  const selectedSubProjectIndex = subProjectSlug
    ? (detailContent.subProjects ?? []).findIndex(
        (subProject, index) => getSubProjectSlug(subProject, index) === subProjectSlug,
      )
    : -1;
  const selectedSubProject =
    selectedSubProjectIndex >= 0
      ? detailContent.subProjects?.[selectedSubProjectIndex]
      : undefined;

  const syncBadge = (() => {
    if (syncStatus === "fetching")
      return <span className="sync-badge sync-badge-pending">최신 내용 가져오는 중…</span>;
    if (syncStatus === "pushing")
      return <span className="sync-badge sync-badge-pending">GitHub 동기화 중…</span>;
    if (syncStatus === "synced")
      return <span className="sync-badge sync-badge-ok">동기화됨 ✓</span>;
    if (syncStatus === "error")
      return (
        <span className="sync-badge sync-badge-err" title={syncError}>
          동기화 실패
        </span>
      );
    return null;
  })();

  if (subProjectSlug) {
    if (!selectedSubProject) {
      return (
        <div className="page detail-page not-found">
          <button
            className="back-link"
            type="button"
            onClick={() => onBackToProject(bookmark.slug)}
          >
            프로젝트 상세로 돌아가기
          </button>
          <h1>이 프로젝트에는 없는 하위 페이지예요.</h1>
          <p>담당 범위 카드에서 다시 선택해 주세요.</p>
        </div>
      );
    }

    return (
      <article className="page detail-page subproject-detail-page">
        <div className="page-top-bar">
          <button
            className="back-link"
            type="button"
            onClick={() => onBackToProject(bookmark.slug)}
          >
            프로젝트 상세로 돌아가기
          </button>
          {syncBadge}
        </div>

        <header className="detail-header">
          <p className="eyebrow">{effectiveBookmark!.title} / 담당 범위</p>
          <h1>{selectedSubProject.title}</h1>
          <p>{selectedSubProject.summary}</p>
          <div className="detail-meta">
            {selectedSubProject.period ? <span>{selectedSubProject.period}</span> : null}
            {selectedSubProject.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </header>

        {isOwnerMode ? (
          <aside className="owner-gate" aria-label="소유자 편집 모드">
            {isOwnerUnlocked ? (
              <SubProjectEditor
                key={`${bookmark.slug}-${subProjectSlug}-${resetCounter}`}
                slug={bookmark.slug}
                content={detailContent}
                subProjectIndex={selectedSubProjectIndex}
                onSave={saveOwnerContent}
              />
            ) : (
              <>
                <h2>소유자 편집 모드</h2>
                <p>이 하위 작업 페이지의 본문과 이미지를 편집할 수 있습니다.</p>
                <label>
                  패스코드
                  <input
                    type="password"
                    value={passcode}
                    onChange={(event) => setPasscode(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        unlockOwnerMode();
                      }
                    }}
                  />
                </label>
                {passcodeError ? <p className="form-error">{passcodeError}</p> : null}
                <button type="button" onClick={unlockOwnerMode}>
                  편집 열기
                </button>
              </>
            )}
          </aside>
        ) : null}

        <div className="subproject-body">
          <section className="subproject-prose">
            {getEffectiveContentBlocks(selectedSubProject).map((block, blockIndex) =>
              block.type === "text" ? (
                <div key={blockIndex} className="subproject-text-block">
                  {block.text.split("\n").map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <figure key={blockIndex} className="detail-section-image">
                  <img
                    src={block.url}
                    alt={block.alt || `${selectedSubProject.title} 이미지`}
                  />
                  {block.caption ? <figcaption>{block.caption}</figcaption> : null}
                </figure>
              ),
            )}
          </section>
        </div>
      </article>
    );
  }

  return (
    <article className="page detail-page">
      <div className="page-top-bar">
        <button className="back-link" type="button" onClick={onBack}>
          프로젝트 목록으로 돌아가기
        </button>
        {syncBadge}
      </div>

      <header className="detail-header">
        <p className="eyebrow">{effectiveBookmark!.category}</p>
        <h1>{effectiveBookmark!.title}</h1>
        <p>{detailContent?.intro ?? effectiveBookmark!.description}</p>
        <div className="detail-meta">
          <span>{effectiveBookmark!.savedAt}</span>
          {effectiveBookmark!.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </header>

      <div className="detail-cover">
        {detailContent.coverImageUrl ? (
          <img
            src={detailContent.coverImageUrl}
            alt={detailContent.coverImageAlt || `${effectiveBookmark!.title} 대표 이미지`}
          />
        ) : (
          <span>{detailContent?.imageLabel ?? `${effectiveBookmark!.title} 이미지 자리`}</span>
        )}
      </div>

      <aside className="detail-note">
        <strong>내 역할</strong>
        <p>{effectiveBookmark!.note}</p>
      </aside>

      {isOwnerMode ? (
        <aside className="owner-gate" aria-label="소유자 편집 모드">
          {isOwnerUnlocked ? (
            <OwnerEditor
              key={`${bookmark.slug}-${resetCounter}`}
              content={detailContent}
              title={bookmark.slug}
              onSave={saveOwnerContent}
              onReset={resetOwnerContent}
            />
          ) : (
            <>
              <h2>소유자 편집 모드</h2>
              <p>방문자에게는 보이지 않는 편집 영역입니다.</p>
              <label>
                패스코드
                <input
                  type="password"
                  value={passcode}
                  onChange={(event) => setPasscode(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      unlockOwnerMode();
                    }
                  }}
                />
              </label>
              {passcodeError ? <p className="form-error">{passcodeError}</p> : null}
              <button type="button" onClick={unlockOwnerMode}>
                편집 열기
              </button>
            </>
          )}
        </aside>
      ) : null}

      <div className="detail-body">
        {detailContent.sections.map((section, sectionIndex) => (
          <section key={`${section.title}-${sectionIndex}`}>
            <h2>{section.title}</h2>
            {section.body.split("\n").map((paragraph, paragraphIndex) => (
              <p key={`${sectionIndex}-${paragraphIndex}`}>{paragraph}</p>
            ))}
            {section.imageUrl ? (
              <figure className="detail-section-image">
                <img
                  src={section.imageUrl}
                  alt={section.imageAlt || `${section.title} 이미지`}
                />
                {section.imageCaption ? (
                  <figcaption>{section.imageCaption}</figcaption>
                ) : null}
              </figure>
            ) : null}
          </section>
        ))}
      </div>

      {detailContent.subProjects?.length ? (
        <section className="subproject-section" aria-label="담당 범위">
          <div className="subproject-section-heading">
            <p className="eyebrow">Work streams</p>
            <h2>담당 범위</h2>
            <p>
              큰 프로젝트 안에서 맡았던 하위 작업을 카드로 나누어 정리했습니다.
            </p>
          </div>

          <div className="subproject-grid">
            {detailContent.subProjects.map((subProject, subProjectIndex) => (
              <article className="subproject-card" key={`${subProject.title}-${subProjectIndex}`}>
                <button
                  type="button"
                  className="subproject-card-button"
                  onClick={() =>
                    onOpenSubProject(
                      bookmark.slug,
                      getSubProjectSlug(subProject, subProjectIndex),
                    )
                  }
                >
                  <span className="subproject-thumbnail" aria-hidden="true">
                    {subProject.thumbnailUrl || subProject.imageUrl ? (
                    <img
                      src={subProject.thumbnailUrl || subProject.imageUrl}
                      alt={subProject.thumbnailAlt || `${subProject.title} 썸네일`}
                    />
                    ) : (
                      <i>썸네일 이미지 자리</i>
                    )}
                  </span>
                  <span>{subProject.period}</span>
                  <strong>{subProject.title}</strong>
                  <em>{subProject.summary}</em>
                  {subProject.tags.length ? (
                    <small>{subProject.tags.map((tag) => `#${tag}`).join(" ")}</small>
                  ) : null}
                  <b>자세히 보기</b>
                </button>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <a
        className="external-link"
        href={effectiveBookmark!.url}
        target="_blank"
        rel="noreferrer"
      >
        프로젝트 링크 보기
      </a>
    </article>
  );
}
