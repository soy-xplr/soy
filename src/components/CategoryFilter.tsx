type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="category-filter" aria-label="카테고리 필터">
      {categories.map((category) => {
        const isSelected = category === selectedCategory;

        return (
          <button
            key={category}
            className={isSelected ? "category-pill selected" : "category-pill"}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
