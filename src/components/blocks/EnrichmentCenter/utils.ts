import { MatchedProfiles } from "@/types/person/network_signature/matched_profiles.interface";

export function extractNames(matchedProfiles?: MatchedProfiles | null) {
  if (!matchedProfiles || typeof matchedProfiles !== "object") {
    return [];
  }

  const result: { source: string; value: string }[] = [];

  for (const [source, data] of Object.entries(matchedProfiles)) {
    if (
      !data?.primary_candidate ||
      typeof data.primary_candidate !== "object"
    ) {
      continue;
    }

    for (const candidate of Object.values(data.primary_candidate)) {
      if (!candidate) continue;

      let name = candidate.full_name;

      if (!name) {
        const first = candidate.f_name ?? "";
        const last = candidate.l_name ?? "";
        name = `${first} ${last}`.trim();
      }

      if (!name) continue;

      result.push({
        source,
        value: name,
      });
    }
  }

  return result;
}

export function extractAllUrls(obj?: Record<string, any> | null): string[] {
  if (!obj || typeof obj !== "object") return [];
  return Object.entries(obj)
    .filter(([key]) => key.endsWith("_profile_url"))
    .flatMap(([_, value]) => {
      if (!value) return [];
      if (Array.isArray(value)) return value.filter(Boolean);
      return [value];
    });
}
