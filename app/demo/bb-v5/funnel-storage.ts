"use client";

import { FunnelData, MiniFormData, STORAGE_KEY, StepOneData } from "./funnel-data";

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

export function writeStepOne(data: StepOneData) {
  const current = readFunnelData();
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...current,
      stepOne: data,
    }),
  );
}

export function clearFunnelData() {
  window.localStorage.removeItem(STORAGE_KEY);
}
