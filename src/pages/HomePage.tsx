import { useEffect, useMemo, useState } from "react";
import { BookmarkCard } from "../components/BookmarkCard";
import { BookmarkCardEditor } from "../components/BookmarkCardEditor";
import { SkillsSection } from "../components/SkillsSection";
import { bookmarks, categories } from "../data/bookmarks";
import {
  loadDetailContent,
  parseDetailContentJson,
  saveDetailContent,
} from "../utils/detailStorage";
import {
  loadBookmarkOverride,
  parseBookmarkOverride,
  saveBookmarkOverride,
  type BookmarkOverride,
} from "../utils/bookmarkStorage";
import {
  fetchRemoteCardOverride,
  fetchRemoteContent,
} from "../utils/githubSync";

const OWNER_PASSCODE = "beautifulweb";
const OWNER_SESSION_KEY = "beautifulweb-owner-unlocked";

type HomePageProps = {
  onOpenBookmark: (slug: string) => void;
  isOwnerMode: boolean;
};

export function HomePage({ onOpenBookmark, isOwnerMode }: HomePageProps) {
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [isOwnerUnlocked, setIsOwnerUnlocked] = useState(false);
  const [openEditorSlug, setOpenEditorSlug] = useState<string | null>(null);

  // slug → override 맵 (편집 후 카드 즉시 반영용)
  const [overrides, setOverrides] = useState<Record<string, BookmarkOverride>>(() => {
    const map: Record<string, BookmarkOverride> = {};
    bookmarks.forEach((b) => {
      const override = loadBookmarkOverride(b.slug);
      if (override) map[b.slug] = override;
    });
    return map;
  });
  // 원격 sync 완료 시마다 증가시켜 displayBookmarks 재계산 트리거
  const [syncTick, setSyncTick] = useState(0);

  useEffect(() => {
    setIsOwnerUnlocked(sessionStorage.getItem(OWNER_SESSION_KEY) === "true");
  }, []);

  // 모든 bookmark의 detail content + 카드 override를 GitHub에서 병렬로 fetch.
  // 각 항목별로 성공하는 즉시 localStorage에 반영하고 re-render 트리거.
  useEffect(() => {
    let cancelled = false;
    bookmarks.forEach((b) => {
      // 1. 상세 콘텐츠
      void fetchRemoteContent(b.slug).then((remote) => {
        if (cancelled || !remote) return;
        try {
          const parsed = parseDetailContentJson(JSON.stringify(remote));
          saveDetailContent(b.slug, parsed);
          setSyncTick((t) => t + 1);
        } catch {
          // 검증 실패 시 조용히 무시
        }
      });
      // 2. 카드 override (메인 페이지 카드 편집 내용)
      void fetchRemoteCardOverride(b.slug).then((remote) => {
        if (cancelled || !remote) return;
        const parsed = parseBookmarkOverride(remote);
        if (!parsed) return;
        saveBookmarkOverride(b.slug, parsed);
        setOverrides((prev) => ({ ...prev, [b.slug]: parsed }));
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

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

  const handleOverrideSaved = (slug: string, override: BookmarkOverride) => {
    setOverrides((prev) => ({ ...prev, [slug]: override }));
  };

  const displayBookmarks = useMemo(
    () =>
      bookmarks.map((bookmark) => {
        const detailContent = loadDetailContent(bookmark.slug);
        const override = overrides[bookmark.slug] ?? {};
        return {
          ...bookmark,
          title: override.title || bookmark.title,
          description: override.description || bookmark.description,
          tags: override.tags ?? bookmark.tags,
          note: override.note || bookmark.note,
          savedAt: override.savedAt || bookmark.savedAt,
          coverImageUrl: detailContent.coverImageUrl,
          coverImageAlt: detailContent.coverImageAlt,
        };
      }),
    [overrides, syncTick],
  );

  const categorySections = useMemo(
    () =>
      categories
        .filter((category) => category !== "전체")
        .map((category) => ({
          category,
          bookmarks: displayBookmarks.filter(
            (bookmark) => bookmark.category === category,
          ),
        }))
        .filter((section) => section.bookmarks.length > 0),
    [displayBookmarks],
  );

  return (
    <div className="page home-page">

      {/* ① 히어로: 신원 + 소개 + 핵심 역량 */}
      <header className="hero">
        <div className="hero-top">
          <p className="eyebrow">Portfolio</p>
        </div>
        <div className="hero-identity">
          <h1>박서영</h1>
        </div>
        <div className="hero-role-row">
          <p className="hero-role">PMㆍ서비스기획자ㆍ바이브코더</p>
          <span className="hero-experience" aria-label="경력 5년 4개월">
            경력 5년 4개월
          </span>
        </div>

        <div className="hero-copy">
          {/* 각 문장이 자기 줄을 가지도록 sentence 단위로 span 분리.
              span에 display:block을 줘서 줄바꿈이 항상 문장 끝에서만 일어남. */}
          <p>
            <span>
              모바일 앱부터 웹/플랫폼까지, 신규 서비스 기획과 운영을 End-to-End로 주도해 온 서비스 기획자이자 PM입니다.
            </span>
            <span>
              또한 Cursor, Claude 등 AI툴을 활용해 직접 개발도 하는 바이브 코더이기도 합니다.
            </span>
          </p>
        </div>

      </header>

      {/* 오너 모드: 패스코드 잠금 해제 */}
      {isOwnerMode ? (
        <aside className="owner-gate home-owner-gate" aria-label="카드 편집 모드">
          {isOwnerUnlocked ? (
            <p className="owner-gate-unlocked">
              ✏️ 편집 모드 활성화 — 각 카드 아래 편집 버튼을 눌러 수정하세요.
            </p>
          ) : (
            <>
              <h2>카드 편집 모드</h2>
              <p>카드 제목, 설명, 태그를 수정할 수 있습니다.</p>
              <label>
                패스코드
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") unlockOwnerMode(); }}
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

      {/* ③ 프로젝트 섹션 — 작은 eyebrow로 anchor */}
      <section className="projects-header" aria-label="프로젝트 섹션">
        <p className="eyebrow">Projects</p>
      </section>

      <section className="bookmark-section" aria-live="polite">
        {categorySections.length > 0 ? (
          <div className="category-sections">
            {categorySections.map((section) => (
              <section
                key={section.category}
                className="category-section"
                aria-labelledby={`category-${section.category}`}
              >
                <div className="category-section-heading">
                  <h3 id={`category-${section.category}`}>
                    {section.category}
                  </h3>
                  <p>{section.bookmarks.length}개의 프로젝트</p>
                </div>
                <div
                  className={
                    section.bookmarks.some((b) => b.featured)
                      ? "bookmark-grid hero-grid"
                      : "bookmark-grid"
                  }
                >
                  {section.bookmarks.map((bookmark) => (
                    <div key={bookmark.id} className="bookmark-card-wrapper">
                      <BookmarkCard
                        bookmark={bookmark}
                        onOpen={onOpenBookmark}
                      />
                      {isOwnerMode && isOwnerUnlocked ? (
                        <div className="bookmark-card-edit-row">
                          <button
                            type="button"
                            className="bookmark-card-edit-toggle"
                            onClick={() =>
                              setOpenEditorSlug(
                                openEditorSlug === bookmark.slug ? null : bookmark.slug,
                              )
                            }
                          >
                            {openEditorSlug === bookmark.slug ? "편집 닫기" : "카드 편집"}
                          </button>
                        </div>
                      ) : null}
                      {isOwnerMode && isOwnerUnlocked && openEditorSlug === bookmark.slug ? (
                        <BookmarkCardEditor
                          key={bookmark.slug}
                          slug={bookmark.slug}
                          initial={overrides[bookmark.slug] ?? {}}
                          onSaved={(override) => handleOverrideSaved(bookmark.slug, override)}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : null}
      </section>

      <SkillsSection />

      <section className="contact-card" aria-label="연락처와 외부 링크">
        <p className="eyebrow">Contact / Elsewhere</p>
        <h2>더 이야기하고 싶다면</h2>
        <div>
          <a href="mailto:soy.xplr@gmail.com">soy.xplr@gmail.com</a>
        </div>
      </section>
    </div>
  );
}
