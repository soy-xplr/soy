import type { ReactNode } from "react";

type RichTextProps = {
  text: string;
  className?: string;
};

/**
 * 한 줄 안의 인라인 서식을 파싱합니다.
 * 현재 지원: **굵게**
 * dangerouslySetInnerHTML을 쓰지 않고 React 노드로 직접 만들기 때문에 XSS 위험이 없습니다.
 */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const boldPattern = /\*\*([^*]+?)\*\*/g;
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = boldPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(<strong key={key++}>{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

/**
 * 마크다운-라이트 본문 렌더러.
 * - `# `, `## `, `### ` 로 시작하는 줄 → 제목(H1/H2/H3)
 * - `**굵게**` → <strong>
 * - 그 외 줄바꿈/공백 → white-space: pre-wrap 으로 그대로 보존
 *
 * 기존 순수 텍스트 콘텐츠는 특수 문법이 없으면 그대로 렌더링되므로 하위 호환됩니다.
 */
export function RichText({ text, className = "prose" }: RichTextProps) {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    // 완전히 비어있는 문단은 건너뛰고, 간격은 CSS 마진으로 처리
    if (paragraph.join("").trim() !== "") {
      const content = paragraph.join("\n");
      blocks.push(
        <p key={`p-${key++}`} className="prose-text">
          {renderInline(content)}
        </p>,
      );
    }
    paragraph = [];
  };

  for (const line of lines) {
    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      flushParagraph();
      const level = heading[1].length;
      const inner = renderInline(heading[2]);
      if (level === 1) {
        blocks.push(
          <h1 key={`h-${key++}`} className="prose-heading prose-h1">
            {inner}
          </h1>,
        );
      } else if (level === 2) {
        blocks.push(
          <h2 key={`h-${key++}`} className="prose-heading prose-h2">
            {inner}
          </h2>,
        );
      } else {
        blocks.push(
          <h3 key={`h-${key++}`} className="prose-heading prose-h3">
            {inner}
          </h3>,
        );
      }
    } else {
      paragraph.push(line);
    }
  }
  flushParagraph();

  return <div className={className}>{blocks}</div>;
}
