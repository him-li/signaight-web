import { socialMediaName } from "@/constants/socialMediaName";
import Capitalize from "./capitalize";
import type { Person } from "@/types/person/index.interface";
export function getSocialMedia(fieldName: string): string {
  if (!fieldName) return "";
  const prefix = fieldName.split("_")[0];
  return socialMediaName[prefix] ?? Capitalize(prefix);
}

export function getSocialMediaLabel(fieldName: string): string {
  if (!fieldName) return "";
  const parts = fieldName.split("_");
  const platform = parts[0];
  const field = parts.slice(1).join(" ");
  const platformLabel = socialMediaName[platform] ?? Capitalize(platform);
  return `${platformLabel} ${Capitalize(field)}`;
}

export function getMatchedProfilePlatforms(
  person?: Person | null,
): (keyof NonNullable<
  NonNullable<Person["network_signature"]>["matched_profiles"]
>)[] {
  const matched = person?.network_signature?.matched_profiles ?? {};
  return Object.keys(matched) as (keyof typeof matched)[];
}
