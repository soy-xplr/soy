import { useCallback, useEffect, useRef, useState } from "react";
import {
  resumeEnData as defaultData,
  defaultEnSections,
  type ResumeEnData,
} from "../data/resumeEnData";

const STORAGE_KEY = "beautifulweb-resume-en:v1";

function isResumeEnData(value: unknown): value is ResumeEnData {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.profile === "object" &&
    v.profile !== null &&
    Array.isArray(v.experiences) &&
    Array.isArray(v.education) &&
    Array.isArray(v.languages) &&
    Array.isArray(v.tools)
  );
}

// 예전 저장 데이터에 없는 sections 필드를 기본값으로 보정.
function normalize(data: ResumeEnData): ResumeEnData {
  return { ...data, sections: { ...defaultEnSections, ...(data.sections ?? {}) } };
}

function loadInitial(): ResumeEnData {
  if (typeof window === "undefined") return defaultData;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);
    return isResumeEnData(parsed) ? normalize(parsed) : defaultData;
  } catch {
    return defaultData;
  }
}

export function useResumeEnState() {
  const [data, setData] = useState<ResumeEnData>(loadInitial);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [data]);

  const update = useCallback((producer: (draft: ResumeEnData) => void) => {
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
    a.download = `resume-en-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const importJson = useCallback(async (file: File) => {
    const text = await file.text();
    const parsed = JSON.parse(text);
    if (!isResumeEnData(parsed)) throw new Error("English résumé JSON 형식이 아닙니다.");
    setData(normalize(parsed));
  }, []);

  const reset = useCallback(() => setData(structuredClone(defaultData)), []);

  return { data, update, exportJson, importJson, reset };
}
