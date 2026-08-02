import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { bookmarks } from "./data/bookmarks";
import { BookmarkDetailPage } from "./pages/BookmarkDetailPage";
import { HomePage } from "./pages/HomePage";

// 이력서/자기소개서는 지연 로드하여 각자의 CSS(특히 전역 @page 규칙)가
// 해당 라우트에서만 적용되도록 격리합니다.
const ResumePage = lazy(() =>
  import("./pages/ResumePage").then((m) => ({ default: m.ResumePage })),
);
const CoverLetterPage = lazy(() =>
  import("./pages/CoverLetterPage").then((m) => ({ default: m.CoverLetterPage })),
);

const getCurrentRoute = () => {
  const match = window.location.pathname.match(/^\/bookmarks\/([^/]+)(?:\/([^/]+))?$/);

  return {
    slug: match ? decodeURIComponent(match[1]) : null,
    subProjectSlug: match?.[2] ? decodeURIComponent(match[2]) : null,
  };
};

const getIsOwnerMode = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("owner") === "1";
};

const normalizePath = () => window.location.pathname.replace(/\/$/, "");
const getIsResumeRoute = () => normalizePath() === "/resume";
const getIsCoverLetterRoute = () => normalizePath() === "/cover-letter";

function App() {
  const [currentRoute, setCurrentRoute] = useState(getCurrentRoute);
  const [isOwnerMode, setIsOwnerMode] = useState(getIsOwnerMode);
  const [isResumeRoute, setIsResumeRoute] = useState(getIsResumeRoute);
  const [isCoverLetterRoute, setIsCoverLetterRoute] = useState(getIsCoverLetterRoute);
  const currentSlug = currentRoute.slug;

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getCurrentRoute());
      setIsOwnerMode(getIsOwnerMode());
      setIsResumeRoute(getIsResumeRoute());
      setIsCoverLetterRoute(getIsCoverLetterRoute());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // 이력서/자기소개서는 인쇄용 독립 페이지로, 포트폴리오 상단바/푸터 없이 렌더링합니다.
  if (isResumeRoute) {
    return (
      <Suspense fallback={null}>
        <ResumePage />
      </Suspense>
    );
  }
  if (isCoverLetterRoute) {
    return (
      <Suspense fallback={null}>
        <CoverLetterPage />
      </Suspense>
    );
  }

  const selectedBookmark = useMemo(
    () => bookmarks.find((bookmark) => bookmark.slug === currentSlug),
    [currentSlug],
  );

  const openBookmark = (slug: string) => {
    window.history.pushState(null, "", `/bookmarks/${encodeURIComponent(slug)}`);
    setCurrentRoute({ slug, subProjectSlug: null });
    setIsOwnerMode(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openSubProject = (projectSlug: string, subProjectSlug: string) => {
    const search = isOwnerMode ? "?owner=1" : "";
    window.history.pushState(
      null,
      "",
      `/bookmarks/${encodeURIComponent(projectSlug)}/${encodeURIComponent(
        subProjectSlug,
      )}${search}`,
    );
    setCurrentRoute({ slug: projectSlug, subProjectSlug });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goProject = (slug: string) => {
    const search = isOwnerMode ? "?owner=1" : "";
    window.history.pushState(null, "", `/bookmarks/${encodeURIComponent(slug)}${search}`);
    setCurrentRoute({ slug, subProjectSlug: null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    const search = isOwnerMode ? "?owner=1" : "";
    window.history.pushState(null, "", `/${search}`);
    setCurrentRoute({ slug: null, subProjectSlug: null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="top-ribbon" aria-hidden="true" />
      <main className="app-shell">
        {currentSlug ? (
          <BookmarkDetailPage
            bookmark={selectedBookmark}
            subProjectSlug={currentRoute.subProjectSlug}
            isOwnerMode={isOwnerMode}
            onBack={goHome}
            onBackToProject={goProject}
            onOpenSubProject={openSubProject}
          />
        ) : (
          <HomePage onOpenBookmark={openBookmark} isOwnerMode={isOwnerMode} />
        )}
      </main>
      <footer className="site-footer">created by Soy.</footer>
      <Analytics />
    </>
  );
}

export default App;
