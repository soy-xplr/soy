import { useMemo, useState } from "react";
import { BookmarkCard } from "../components/BookmarkCard";
import { CategoryFilter } from "../components/CategoryFilter";
import { SearchBox } from "../components/SearchBox";
import { bookmarks, categories } from "../data/bookmarks";
import { loadDetailContent } from "../utils/detailStorage";

type HomePageProps = {
  onOpenBookmark: (slug: string) => void;
};

const searchFields = (bookmark: (typeof bookmarks)[number]) =>
  [
    bookmark.title,
    bookmark.description,
    bookmark.note,
    bookmark.category,
    bookmark.tags.join(" "),
  ]
    .join(" ")
    .toLowerCase();

export function HomePage({ onOpenBookmark }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");

  const displayBookmarks = useMemo(
    () =>
      bookmarks.map((bookmark) => {
        const detailContent = loadDetailContent(bookmark.slug);
        return {
          ...bookmark,
          coverImageUrl: detailContent.coverImageUrl,
          coverImageAlt: detailContent.coverImageAlt,
        };
      }),
    [],
  );

  const filteredBookmarks = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    return displayBookmarks.filter((bookmark) => {
      const matchesCategory =
        selectedCategory === "전체" || bookmark.category === selectedCategory;
      const matchesSearch =
        normalizedSearchTerm.length === 0 ||
        searchFields(bookmark).includes(normalizedSearchTerm);
      return matchesCategory && matchesSearch;
    });
  }, [displayBookmarks, searchTerm, selectedCategory]);

  const categorySections = useMemo(
    () =>
      categories
        .filter((category) => category !== "전체")
        .map((category) => ({
          category,
          bookmarks: filteredBookmarks.filter(
            (bookmark) => bookmark.category === category,
          ),
        }))
        .filter((section) => section.bookmarks.length > 0),
    [filteredBookmarks],
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
          <p>모바일 앱부터 웹/플랫폼까지, 신규 서비스 기획과 운영을 End-to-End로 주도해 온 서비스 기획자 겸 PM입니다.</p>
          <p>게임, 교육, AI 등 다양한 도메인에서 A-Z로 서비스를 직접 설계하고 런칭한 경험을 보유하고 있습니다.</p>
          <p>복잡한 이해관계를 구조화하여 실행 가능한 기획으로 만들고, 데이터를 기반으로 서비스를 지속적으로 개선합니다.</p>
        </div>

        <section className="hero-skills" aria-label="핵심 역량">
          <p className="eyebrow">핵심 역량</p>
          <ul>
            <li>
              <strong>신규 서비스 기획 및 런칭</strong>
              <span>0-1 기획, IA 설계, UX 설계, 정책 수립</span>
            </li>
            <li>
              <strong>프로젝트 매니징</strong>
              <span>로드맵 수립, 일정 관리, 스프린트 운영, 배포 팔로업</span>
            </li>
            <li>
              <strong>모바일 앱 및 웹 서비스 구조 설계</strong>
              <span>하이브리드 앱, 포털웹, 백오피스</span>
            </li>
            <li>
              <strong>데이터 기반 서비스 개선</strong>
              <span>GA, GTM, Power BI, Firebase, Snowflake</span>
            </li>
            <li>
              <strong>다부서 이해관계자 조율</strong>
              <span>법무, 정책, 사업, 운영, 개발, 디자인</span>
            </li>
            <li>
              <strong>글로벌 서비스 운영</strong>
              <span>다국어 지원, LQA 프로세스 설계, 해외 UX 최적화</span>
            </li>
          </ul>
        </section>
      </header>

      {/* ③ 프로젝트: 바로 연결 */}
      <section className="toolbar" aria-label="프로젝트 탐색">
        <div className="projects-heading">
          <p className="eyebrow">Projects</p>
          <h2>프로젝트</h2>
        </div>
        <SearchBox value={searchTerm} onChange={setSearchTerm} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
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
                    section.category === "대표 사례"
                      ? "bookmark-grid hero-grid"
                      : "bookmark-grid"
                  }
                >
                  {section.bookmarks.map((bookmark) => (
                    <BookmarkCard
                      key={bookmark.id}
                      bookmark={bookmark}
                      onOpen={onOpenBookmark}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>아직 맞는 프로젝트가 없어요.</h2>
            <p>다른 단어를 적거나 전체 카테고리로 돌아가 볼까요?</p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("전체");
              }}
            >
              전체 프로젝트 다시 보기
            </button>
          </div>
        )}
      </section>

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
