import type {
  Name,
  FirstName,
  LastName,
  FullName,
  MiddleName,
} from "@/types/person/personal_details/name.interface";
import type { ProfilePhoto } from "@/types/person/personal_details/visuals.interface";
import type { Url } from "@/types/person/network_signature/url.interface";

const BASE_NAME_KEYS = new Set(["f_name", "l_name", "mid_name", "full_name"]);
const INVALID_NAME_PREFIXES = new Set(["f", "l", "full", "mid"]);
export function normalizePlatformFromKey(key: string) {
  const parts = key.split("_");
  let p = parts[0] || key;
  if (p === "fb") p = "facebook";
  if (p === "tgm") p = "telegram";
  return p;
}

export function collectNamePlatforms(name?: Name): string[] {
  const platforms = new Set<string>();
  if (!name) return [];
  const examine = (obj?: FirstName | LastName | FullName | MiddleName) => {
    if (!obj) return;
    Object.keys(obj).forEach((k) => {
      if (BASE_NAME_KEYS.has(k)) return;
      if (!k.includes("_")) return;
      platforms.add(normalizePlatformFromKey(k));
    });
  };
  examine(name.first_name);
  examine(name.last_name);
  examine(name.full_name);
  examine(name.middle_name);
  return Array.from(platforms).filter((p) => !INVALID_NAME_PREFIXES.has(p));
}

export function collectVisualPlatforms(visuals?: ProfilePhoto): string[] {
  if (!visuals) return [];
  const platforms = new Set<string>();
  Object.keys(visuals).forEach((k) => {
    if (k.includes("_")) platforms.add(normalizePlatformFromKey(k));
  });
  return Array.from(platforms);
}

export function collectUrlPlatforms(urls?: Url): string[] {
  if (!urls) return [];
  const platforms = new Set<string>();
  Object.keys(urls).forEach((k) => {
    if (k.includes("_")) platforms.add(normalizePlatformFromKey(k));
  });
  return Array.from(platforms);
}

export const clean = <T>(value: T | null): T | undefined =>
  value === null ? undefined : value;
