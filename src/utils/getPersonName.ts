import type {
  Name,
  FirstName,
  MiddleName,
  LastName,
} from "@/types/person/personal_details/name.interface";

type NameType = "f_name" | "l_name" | "full_name" | "mid_name";

export function extractPrefixes(
  part: FirstName | MiddleName | LastName,
  type: NameType,
): string[] {
  const prefixes = new Set<string>();
  for (const key of Object.keys(part)) {
    if (key === type) {
      prefixes.add("");
      continue;
    }
    if (key.endsWith(`_${type}`)) {
      prefixes.add(key.replace(`_${type}`, ""));
    }
  }
  return Array.from(prefixes);
}

function findNamePartValue(
  part?: FirstName | MiddleName | LastName,
  type?: NameType,
  platform?: any,
): string | undefined {
  if (!part || !type) return undefined;
  const prefixes = platform ? [platform] : extractPrefixes(part, type);
  for (const prefix of prefixes) {
    const key = prefix ? `${prefix}_${type}` : type;
    const value = part[key as keyof typeof part] as string | undefined;
    if (value && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

export function getPersonName(
  name: Name | undefined,
  type: NameType,
  platform?: any,
): string | undefined {
  if (!name) return undefined;

  if (type === "f_name") {
    return findNamePartValue(name.first_name, "f_name", platform);
  }

  if (type === "l_name") {
    return findNamePartValue(name.last_name, "l_name", platform);
  }

  if (type === "mid_name") {
    return findNamePartValue(name.middle_name, "mid_name", platform);
  }

  if (type === "full_name") {
    const full = findNamePartValue(name.full_name, "full_name", platform);
    if (full) return full;
    const first = findNamePartValue(name.first_name, "f_name");
    const middle = findNamePartValue(name.middle_name, "mid_name");
    const last = findNamePartValue(name.last_name, "l_name");

    const parts = [first, middle, last].filter(Boolean);
    return parts.length ? parts.join(" ") : undefined;
  }

  return undefined;
}
