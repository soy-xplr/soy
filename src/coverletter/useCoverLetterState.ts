import { useCallback, useEffect, useRef, useState } from "react";
import { coverLetterData as defaultData, type CoverLetterData } from "../data/coverLetterData";

const STORAGE_KEY = "beautifulweb-cover-letter:v1";

function isCoverLetterData(value: unknown): value is CoverLetterData {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.profile === "object" && v.profile !== null && Array.isArray(v.sections)
  );
}

function loadInitial(): CoverLetterData {
  if (typeof window === "undefined") return defaultData;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);
    return isCoverLetterData(parsed) ? parsed : defaultData;
  } catch {
    return defaultData;
  }
}

// 자기소개서 데이터 상태 + 브라우저 저장 + JSON 내보내기/불러오기/초기화.
export function useCoverLetterState() {
  const [data, setData] = useState<CoverLetterData>(loadInitial);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* 저장 실패는 조용히 무시 */
    }
  }, [data]);

  const update = useCallback((producer: (draft: CoverLetterData) => void) => {
    setData((prev) => {
      const next = structuredClone(prev);
      producer(next);
      return next;
    });
  }, []);

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cover-letter-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const importJson = useCallback(async (file: File) => {
    const text = await file.text();
    const parsed = JSON.parse(text);
    if (!isCoverLetterData(parsed)) throw new Error("자기소개서 JSON 형식이 아닙니다.");
    setData(parsed);
  }, []);

  const reset = useCallback(() => setData(structuredClone(defaultData)), []);

  return { data, update, exportJson, importJson, reset };
}
