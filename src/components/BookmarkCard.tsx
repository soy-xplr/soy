import type { Bookmark } from "../data/bookmarks";

export type BookmarkCardItem = Bookmark & {
  coverImageUrl?: string;
  coverImageAlt?: string;
};

type BookmarkCardProps = {
  bookmark: BookmarkCardItem;
  onOpen: (slug: string) => void;
};

export function BookmarkCard({ bookmark, onOpen }: BookmarkCardProps) {
  const isFeatured = !!bookmark.featured;

  return (
    <article className={`bookmark-card${isFeatured ? " featured-card" : ""}`}>
      <button
        className="bookmark-card-link"
        type="button"
        onClick={() => onOpen(bookmark.slug)}
        aria-label={`${bookmark.title} 세부 페이지 열기`}
      >
        <div className="thumbnail">
          {bookmark.coverImageUrl ? (
            <img
              src={bookmark.coverImageUrl}
              alt={bookmark.coverImageAlt || `${bookmark.title} 대표 이미지`}
            />
          ) : null}
        </div>
        <div className="card-content">
          <h2>{bookmark.title}</h2>

          {/* Featured 카드는 description 한 줄 추가 표시 */}
          {isFeatured && bookmark.description ? (
            <p className="description">{bookmark.description}</p>
          ) : null}

          <p className="card-meta-line">
            <span>{bookmark.tags.map((tag) => `#${tag}`).join(" ")}</span>
            <span aria-hidden="true">|</span>
            <time dateTime={bookmark.savedAt}>{bookmark.savedAt}</time>
          </p>
        </div>
      </button>
    </article>
  );
}
