// flag-labels.ts
import { SEARCH_QURIES } from "@/constants/search";

export const FLAG_LABEL_MAP: Partial<Record<string, string>> = {
  sexual_misconduct: "Sexual Misconduct",
  substance: "Substance – Drugs",
  activism: "Activism – BDS",
  terror_conviction: "Terror Conviction",
  online_radicalization: "Online Radicalization",
};

export function autoLabel(flagKey: string): string {
  return flagKey.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getFlagLabel(flagKey: string): string {
  return FLAG_LABEL_MAP[flagKey] ?? autoLabel(flagKey);
}

export function getSelectedFlags(
  searchParams: URLSearchParams | null,
): string[] {
  const raw = searchParams?.get(SEARCH_QURIES.FLAGS);
  if (!raw) return [];
  return raw.split(",").filter(Boolean);
}
