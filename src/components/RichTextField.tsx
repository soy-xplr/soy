import { useRef } from "react";

type RichTextFieldProps = {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
};

/**
 * 서식 툴바가 달린 textarea.
 * - 굵게: 선택 영역을 **...** 로 감쌉니다.
 * - H1/H2/H3: 커서가 있는 줄 앞에 #, ##, ### 를 붙입니다(이미 있으면 교체).
 * 저장 형식은 기존과 동일한 순수 문자열(마크다운-라이트)이라 하위 호환됩니다.
 */
export function RichTextField({
  value,
  onChange,
  rows = 6,
  placeholder,
}: RichTextFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const restoreSelection = (start: number, end: number) => {
    requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      textarea.focus();
      textarea.setSelectionRange(start, end);
    });
  };

  const applyBold = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const { selectionStart, selectionEnd } = textarea;
    const hasSelection = selectionEnd > selectionStart;
    const selected = hasSelection
      ? value.slice(selectionStart, selectionEnd)
      : "굵은 텍스트";
    const next =
      value.slice(0, selectionStart) +
      `**${selected}**` +
      value.slice(selectionEnd);
    onChange(next);
    // ** 두 글자 뒤부터 선택 영역을 다시 잡아 바로 이어서 편집할 수 있게 함
    restoreSelection(selectionStart + 2, selectionStart + 2 + selected.length);
  };

  const applyHeading = (level: 1 | 2 | 3) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const { selectionStart } = textarea;
    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
    let lineEnd = value.indexOf("\n", selectionStart);
    if (lineEnd === -1) lineEnd = value.length;

    const line = value.slice(lineStart, lineEnd);
    const stripped = line.replace(/^#{1,3}\s+/, "");
    const prefix = "#".repeat(level) + " ";
    const newLine = prefix + stripped;
    const next = value.slice(0, lineStart) + newLine + value.slice(lineEnd);
    onChange(next);
    const caret = lineStart + newLine.length;
    restoreSelection(caret, caret);
  };

  return (
    <div className="rich-text-field">
      <div className="rich-text-toolbar" role="toolbar" aria-label="글자 서식">
        <button type="button" onClick={applyBold} title="굵게" aria-label="굵게">
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => applyHeading(1)}
          title="제목 1 (가장 큼)"
          aria-label="제목 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => applyHeading(2)}
          title="제목 2"
          aria-label="제목 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => applyHeading(3)}
          title="제목 3"
          aria-label="제목 3"
        >
          H3
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
