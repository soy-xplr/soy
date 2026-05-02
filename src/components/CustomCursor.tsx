import { useEffect, useRef, useState } from "react";

/**
 * 마우스를 따라다니는 GIF 커서.
 * - 시스템 커서를 숨기고(전역 CSS에서 `cursor: none`), 화면 전체를 덮는 fixed 위치의
 *   img 엘리먼트로 마우스 위치를 따라가요.
 * - 클릭 가능한 요소(a, button, 카드 등) 위에 올라가면 click GIF로 교체돼요.
 * - 터치 디바이스에선 시스템 커서가 의미가 없으니 렌더링 자체를 건너뜁니다.
 */

const CLICKABLE_SELECTOR =
  'a, button, [role="button"], [type="button"], [type="submit"], [type="reset"], ' +
  'label, summary, .bookmark-card, .subproject-card-button';

const DEFAULT_SRC = "/cursors/littlestar.gif";
const CLICKABLE_SRC = "/cursors/littlestar-click.gif";

export function CustomCursor() {
  const cursorRef = useRef<HTMLImageElement>(null);
  const [isClickable, setIsClickable] = useState(false);
  const [enabled, setEnabled] = useState(false);

  // 마운트 시: hover가 가능한 환경(데스크톱)에서만 활성화
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mql.matches);
    const handler = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // 마우스 추적
  useEffect(() => {
    if (!enabled) return;

    let lastClickable = false;

    const handleMove = (e: MouseEvent) => {
      const el = cursorRef.current;
      if (el) {
        // translate(-50%,-50%)로 자기 중심을 마우스에 맞춤
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        el.style.opacity = "1";
      }
      const target = e.target as Element | null;
      const clickable = !!target?.closest?.(CLICKABLE_SELECTOR);
      if (clickable !== lastClickable) {
        lastClickable = clickable;
        setIsClickable(clickable);
      }
    };

    const hide = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <img
      ref={cursorRef}
      src={isClickable ? CLICKABLE_SRC : DEFAULT_SRC}
      alt=""
      aria-hidden="true"
      className="custom-cursor"
      draggable={false}
      style={{ opacity: 0 }}
    />
  );
}
