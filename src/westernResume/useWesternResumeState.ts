import { useCallback, useEffect, useRef, useState } from "react";
import type { WCapability, WSections, WesternResumeData } from "../data/westernResume";

function isWesternResumeData(value: unknown): value is WesternResumeData {
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

// Fill in fields missing from older saved data (sections, capability objects).
function normalize(data: WesternResumeData, defaultSections: WSections): WesternResumeData {
  // Older exports stored capabilities as plain strings.
  const rawCapabilities: unknown[] = data.profile?.capabilities ?? [];
  const capabilities: WCapability[] = rawCapabilities.map((cap) =>
    typeof cap === "string" ? { label: cap } : (cap as WCapability),
  );
  return {
    ...data,
    profile: { ...data.profile, capabilities },
    sections: { ...defaultSections, ...(data.sections ?? {}) },
  };
}

export type WesternResumeState = {
  data: WesternResumeData;
  update: (producer: (draft: WesternResumeData) => void) => void;
  exportJson: () => void;
  importJson: (file: File) => Promise<void>;
  reset: () => void;
};

/**
 * Résumé state backed by localStorage. One hook serves every Western-format
 * page; each page passes its own storage key, defaults, and export filename.
 */
export function useWesternResumeState({
  storageKey,
  defaultData,
  defaultSections,
  fileName,
  importErrorMessage,
}: {
  storageKey: string;
  defaultData: WesternResumeData;
  defaultSections: WSections;
  fileName: string;
  importErrorMessage: string;
}): WesternResumeState {
  const loadInitial = (): WesternResumeData => {
    if (typeof window === "undefined") return defaultData;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return defaultData;
      const parsed = JSON.parse(raw);
      return isWesternResumeData(parsed) ? normalize(parsed, defaultSections) : defaultData;
    } catch {
      return defaultData;
    }
  };

  const [data, setData] = useState<WesternResumeData>(loadInitial);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(data));
    } catch {
      /* storage full / unavailable — ignore */
    }
  }, [data, storageKey]);

  const update = useCallback((producer: (draft: WesternResumeData) => void) => {
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
    a.download = `${fileName}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data, fileName]);

  const importJson = useCallback(
    async (file: File) => {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!isWesternResumeData(parsed)) throw new Error(importErrorMessage);
      setData(normalize(parsed, defaultSections));
    },
    [defaultSections, importErrorMessage],
  );

  const reset = useCallback(() => setData(structuredClone(defaultData)), [defaultData]);

  return { data, update, exportJson, importJson, reset };
}
