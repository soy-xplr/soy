type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <label className="search-box">
      <span>찾기</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="찾고 싶은 프로젝트나 기술을 적어보세요"
      />
    </label>
  );
}
