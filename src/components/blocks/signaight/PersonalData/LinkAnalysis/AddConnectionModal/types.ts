import { socialMediaName } from "@/constants/socialMediaName";
import { getPersonName } from "@/utils/getPersonName";
import type { Person } from "@/types/person/index.interface";

// ── Platform types & constants ─────────────────────────────────────────────

// Only Facebook and Instagram are supported for link analysis connections.
const SUPPORTED_PLATFORM_KEYS = ["facebook", "instagram"] as const;
export type SocialPlatformKey = (typeof SUPPORTED_PLATFORM_KEYS)[number];
export type Platform = SocialPlatformKey;

export const PLATFORMS: { key: Platform; label: string }[] =
  SUPPORTED_PLATFORM_KEYS.map((key) => ({ key, label: socialMediaName[key] }));

// ── Relationship types & constants ─────────────────────────────────────────

export type RelationshipType =
  | "a_follows_b"
  | "b_follows_a"
  | "mutual_follow"
  | "friendship";

export const ALL_RELATIONSHIP_TYPES: {
  key: RelationshipType;
  label: string;
}[] = [
  { key: "a_follows_b", label: "A follows B" },
  { key: "b_follows_a", label: "B follows A" },
  { key: "mutual_follow", label: "Mutual follow" },
  { key: "friendship", label: "Friendship" },
];

/** Relationship types available per platform. */
export const PLATFORM_RELATIONSHIP_TYPES: Record<Platform, RelationshipType[]> =
  {
    facebook: ["a_follows_b", "b_follows_a", "mutual_follow", "friendship"],
    instagram: ["a_follows_b", "b_follows_a", "mutual_follow"],
  };

// ── Direction ──────────────────────────────────────────────────────────────

export type Direction = "bidirectional" | "unidirectional";

// ── Form types ─────────────────────────────────────────────────────────────

export type PlatformEntry = {
  platform: Platform | "";
  relationship_type: RelationshipType | "";
  evidence_url: string;
  note: string;
  /** candidate_id from Person B's matched_profiles primary_candidate key */
  candidate_id: string;
};

export type AddConnectionFormData = {
  profile_b_id: string;
  platforms: PlatformEntry[];
};

export const EMPTY_ENTRY: PlatformEntry = {
  platform: "facebook",
  relationship_type: "",
  evidence_url: "",
  note: "",
  candidate_id: "",
};

// ── Misc constants ─────────────────────────────────────────────────────────

export const SEARCH_DEBOUNCE_MS = 300;

// ── Shared helpers ─────────────────────────────────────────────────────────

export function deriveDirection(platforms: PlatformEntry[]): Direction {
  const hasBidirectionalType = platforms.some(
    (p) =>
      p.relationship_type === "mutual_follow" ||
      p.relationship_type === "friendship",
  );
  if (hasBidirectionalType) return "bidirectional";

  const hasAFollowsB = platforms.some(
    (p) => p.relationship_type === "a_follows_b",
  );
  const hasBFollowsA = platforms.some(
    (p) => p.relationship_type === "b_follows_a",
  );
  if (hasAFollowsB && hasBFollowsA) return "bidirectional";

  return "unidirectional";
}

/** Converts a HeroUI Select onChange value (possibly a Set) to a plain string. */
export function toKey(value: unknown): string {
  if (value instanceof Set)
    return ([...Array.from(value || [])][0] as string) ?? "";
  return (value as string) ?? "";
}

export function personDisplayName(person: Person): string {
  return (
    getPersonName(person.personal_details?.name, "full_name") ??
    person.id ??
    "Unknown"
  );
}

/**
 * Returns the best candidate_id for a given platform from a person's
 * matched_profiles, or "" if none exist.
 * Priority: has profile_url > has profile_id > most non-null fields.
 */
export function getBestCandidateId(
  person: Person | null | undefined,
  platform: SocialPlatformKey,
): string {
  const candidates =
    person?.network_signature?.matched_profiles?.[platform]?.primary_candidate;
  if (!candidates) return "";

  const entries = Object.entries(candidates);
  if (entries.length === 0) return "";
  if (entries.length === 1) return entries[0][0];

  const scored = entries.map(([id, info]) => {
    const hasUrl = Array.isArray(info.profile_url)
      ? info.profile_url.length > 0
      : !!info.profile_url;
    const nonNullCount = Object.values(info as Record<string, unknown>).filter(
      (v) => v !== null && v !== undefined,
    ).length;
    return {
      id,
      score: (hasUrl ? 100 : 0) + (!!info.profile_id ? 50 : 0) + nonNullCount,
    };
  });

  return scored.reduce((best, cur) => (cur.score > best.score ? cur : best)).id;
}

export type PlatformCandidate = {
  platform: SocialPlatformKey;
  candidateId: string;
  evidenceUrl: string;
};

function resolveCandidateUrl(
  platform: SocialPlatformKey,
  info: {
    profile_url?: string | string[] | null;
    profile_username?: string | null;
  },
): string {
  if (info.profile_url) {
    return Array.isArray(info.profile_url)
      ? (info.profile_url[0] ?? "")
      : info.profile_url;
  }
  if (platform === "instagram" && info.profile_username) {
    return `https://instagram.com/${info.profile_username}`;
  }
  return "";
}

/**
 * Returns one PlatformCandidate entry per candidate per platform.
 * If a platform has two candidates in primary_candidate the result will contain
 * two entries with platform = "facebook" (etc.), each with its own candidateId
 * and evidenceUrl.
 */
export function getPersonPlatformCandidates(
  person: Person | null | undefined,
): PlatformCandidate[] {
  const profiles = person?.network_signature?.matched_profiles;
  if (!profiles) return [];

  const result: PlatformCandidate[] = [];

  for (const key of SUPPORTED_PLATFORM_KEYS) {
    const sourceInfo = profiles[key];
    if (!sourceInfo?.primary_candidate) continue;

    for (const [candidateId, info] of Object.entries(
      sourceInfo.primary_candidate,
    )) {
      result.push({
        platform: key,
        candidateId,
        evidenceUrl: resolveCandidateUrl(key, info),
      });
    }
  }

  return result;
}

/**
 * Returns a flat array of platform keys — one entry per candidate, so the same
 * platform may appear multiple times if it has multiple candidates.
 * e.g. ["facebook", "facebook", "instagram"]
 */
export function getPersonPlatforms(
  person: Person | null | undefined,
): SocialPlatformKey[] {
  return getPersonPlatformCandidates(person).map((e) => e.platform);
}

/**
 * Returns all unique profile URLs for a person on a given platform,
 * collected from every candidate in primary_candidate.
 * Instagram falls back to constructing a URL from profile_username.
 */
export function getPersonPlatformUrls(
  person: Person | null | undefined,
  platform: SocialPlatformKey | "" | "other",
): string[] {
  if (!platform || platform === "other") return [];
  const candidates =
    person?.network_signature?.matched_profiles?.[platform as SocialPlatformKey]
      ?.primary_candidate;
  if (!candidates) return [];

  const urls: string[] = [];
  for (const info of Object.values(candidates)) {
    if (info.profile_url) {
      const raw = Array.isArray(info.profile_url)
        ? info.profile_url
        : [info.profile_url];
      urls.push(...(raw.filter(Boolean) as string[]));
    } else if (platform === "instagram" && info.profile_username) {
      urls.push(`https://instagram.com/${info.profile_username}`);
    } else if (platform === "facebook" && info.profile_id) {
      urls.push(`https://www.facebook.com/profile.php?id=${info.profile_id}`);
    }
  }
  return Array.from(new Set(urls));
}
