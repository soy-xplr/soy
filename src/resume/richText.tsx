import type { ReactNode } from "react";

/**
 * Render `**bold**` spans inside otherwise plain résumé text.
 *
 * Content is stored as plain strings so it stays readable in the data files
 * and editable in place (edit mode shows the raw `**` markers); this only
 * affects how the text is displayed and printed.
 */
export function renderInlineBold(text: string): ReactNode {
  if (!text.includes("**")) return text;

  const pattern = /\*\*([^*]+)\*\*/g;
  const parts: ReactNode[] = [];
  let cursor = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) parts.push(text.slice(cursor, match.index));
    parts.push(<strong key={key++}>{match[1]}</strong>);
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));

  return parts;
}
