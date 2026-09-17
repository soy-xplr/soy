import { useCallback, useEffect, useRef, useState } from "react";
import {
  resumeData as defaultResumeData,
  defaultSectionTitles,
  type ResumeData,
} from "../data/resumeData";

const STORAGE_KEY = "beautifulweb-resume:v1";

// 예전에 저장된 데이터에 없는 필드(예: sections)를 기본값으로 채워 넣습니다.
function normalize(data: ResumeData): ResumeData {
  return {
    ...data,
    sections: { ...defaultSectionTitles, ...(data.sections ?? {}) },
  };
}

// 저장된 값이 최소한의 형태를 갖췄는지 가볍게 검증.
function isResumeData(value: unknown): value is ResumeData {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.profile === "object" &&
    v.profile !== null &&
    Array.isArray(v.projects) &&
    Array.isArray(v.experiences) &&
    Array.isArray(v.education) &&
    Array.isArray(v.skills)
  );
}

function loadInitial(): ResumeData {
  if (typeof window === "undefined") return defaultResumeData;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultResumeData;
    const parsed = JSON.parse(raw);
    return isResumeData(parsed) ? normalize(parsed) : defaultResumeData;
  } catch {
    return defaultResumeData;
  }
}

// 이력서 데이터 상태 + 브라우저 저장 + JSON 내보내기/불러오기/초기화.
export function useResumeState() {
  const [data, setData] = useState<ResumeData>(loadInitial);
  const firstRender = useRef(true);

  // 변경 시 localStorage에 자동 저장 (최초 렌더는 건너뜀).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* 저장 공간 초과 등은 조용히 무시 */
    }
  }, [data]);

  // 불변 업데이트 헬퍼: producer(draft)에서 draft를 직접 수정하면 됩니다.
  const update = useCallback((producer: (draft: ResumeData) => void) => {
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
    a.download = `resume-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const importJson = useCallback(async (file: File) => {
    const text = await file.text();
    const parsed = JSON.parse(text);
    if (!isResumeData(parsed)) {
      throw new Error("이력서 JSON 형식이 아닙니다.");
    }
    setData(normalize(parsed));
  }, []);

  const reset = useCallback(() => {
    setData(structuredClone(defaultResumeData));
  }, []);

  return { data, update, exportJson, importJson, reset };
}
