"use client";

import { FunnelData, MiniFormData, STORAGE_KEY, FullApplicationData } from "./funnel-data";

export function readFunnelData(): FunnelData {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FunnelData) : {};
  } catch {
    return {};
  }
}

export function writeMiniForm(data: MiniFormData) {
  const current = readFunnelData();
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...current,
      miniForm: data,
    }),
  );
}

export function writeFullApplication(data: FullApplicationData) {
  const current = readFunnelData();
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...current,
      fullApplication: data,
    }),
  );
}

export function clearFunnelData() {
  window.localStorage.removeItem(STORAGE_KEY);
}
